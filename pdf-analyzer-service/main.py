import os
import io
import base64
import asyncio
from typing import List, Dict, Optional, Union
import logging
from contextlib import asynccontextmanager

import pdfplumber
import pandas as pd
import numpy as np
from openpyxl import load_workbook
import matplotlib
matplotlib.use('Agg')  # Use non-interactive backend
import matplotlib.pyplot as plt
from wordcloud import WordCloud
from PIL import Image

from fastapi import FastAPI, UploadFile, File, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Global variables for models
sentiment_classifier = None
summarizer = None
nlp = None

class ModelLoadError(Exception):
    """Custom exception for model loading errors"""
    pass

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Load ML models on startup"""
    global sentiment_classifier, summarizer, nlp
    
    try:
        logger.info("Loading ML models...")
        
        # Load models with error handling
        try:
            from transformers import pipeline
            logger.info("Loading sentiment classifier...")
            sentiment_classifier = pipeline(
                "zero-shot-classification", 
                model="nlpaueb/legal-bert-base-uncased",
                device=-1  # Use CPU for M2 Mac compatibility
            )
            logger.info("✅ Sentiment classifier loaded successfully")
        except Exception as e:
            logger.error(f"❌ Failed to load sentiment classifier: {e}")
            sentiment_classifier = None
        
        try:
            logger.info("Loading summarizer...")
            summarizer = pipeline(
                "summarization", 
                model="sshleifer/distilbart-cnn-12-6",
                device=-1  # Use CPU for M2 Mac compatibility
            )
            logger.info("✅ Summarizer loaded successfully")
        except Exception as e:
            logger.error(f"❌ Failed to load summarizer: {e}")
            summarizer = None
        
        try:
            import spacy
            logger.info("Loading spaCy model...")
            nlp = spacy.load("en_core_web_sm")
            logger.info("✅ spaCy model loaded successfully")
        except Exception as e:
            logger.error(f"❌ Failed to load spaCy model: {e}")
            nlp = None
            
        logger.info("Model loading completed")
        
    except Exception as e:
        logger.error(f"Critical error during model loading: {e}")
    
    yield
    
    # Cleanup on shutdown
    logger.info("Shutting down PDF analyzer service...")

# Create FastAPI app with lifespan
app = FastAPI(
    title="PDF Sentiment Analyzer",
    description="PDF text extraction and sentiment analysis service",
    version="1.0.0",
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def extract_text_from_pdf(pdf_content: bytes) -> pd.DataFrame:
    """Extract text from PDF file content using pdfplumber, splitting by lines"""
    try:
        text_list = []
        line_numbers = []
        page_references = []
        
        with pdfplumber.open(io.BytesIO(pdf_content)) as pdf:
            line_counter = 1
            for page_num, page in enumerate(pdf.pages, 1):
                text = page.extract_text()
                if text and text.strip():
                    # Split text into lines and process each line individually
                    lines = text.split('\n')
                    for line in lines:
                        line = line.strip()
                        if line and len(line) > 10:  # Only include meaningful lines (more than 10 chars)
                            text_list.append(line)
                            line_numbers.append(line_counter)
                            page_references.append(page_num)
                            line_counter += 1
        
        if not text_list:
            raise ValueError("No meaningful text found in PDF")
            
        df = pd.DataFrame({
            'line_number': line_numbers,
            'page': page_references,
            'feedback': text_list
        })
        return df
    except Exception as e:
        logger.error(f"PDF extraction error: {e}")
        raise HTTPException(status_code=400, detail=f"Failed to extract text from PDF: {str(e)}")

def extract_text_from_excel(excel_content: bytes) -> pd.DataFrame:
    """Extract text from Excel file content using pandas and openpyxl, splitting by rows"""
    try:
        text_list = []
        line_numbers = []
        sheet_references = []
        
        # Read the Excel file
        excel_file = io.BytesIO(excel_content)
        
        # Get all sheet names
        xl = pd.ExcelFile(excel_file)
        sheet_names = xl.sheet_names
        
        line_counter = 1
        
        for sheet_num, sheet_name in enumerate(sheet_names, 1):
            try:
                # Read the sheet
                df = pd.read_excel(excel_file, sheet_name=sheet_name)
                
                # Process each row individually
                for index, row in df.iterrows():
                    # Combine all non-empty cells in the row
                    row_text_parts = []
                    for column in df.columns:
                        cell_value = row[column]
                        if pd.notna(cell_value) and str(cell_value).strip() and str(cell_value) != 'nan':
                            row_text_parts.append(f"{column}: {str(cell_value).strip()}")
                    
                    if row_text_parts:
                        combined_row_text = ' | '.join(row_text_parts)
                        if len(combined_row_text) > 10:  # Only include meaningful rows
                            text_list.append(combined_row_text)
                            line_numbers.append(line_counter)
                            sheet_references.append(sheet_num)
                            line_counter += 1
                            
            except Exception as sheet_error:
                logger.warning(f"Error reading sheet '{sheet_name}': {sheet_error}")
                continue
        
        if not text_list:
            raise ValueError("No meaningful text found in Excel file")
            
        df_result = pd.DataFrame({
            'line_number': line_numbers,
            'page': sheet_references,  # Using 'page' for consistency (refers to sheet number)
            'feedback': text_list
        })
        return df_result
    except Exception as e:
        logger.error(f"Excel extraction error: {e}")
        raise HTTPException(status_code=400, detail=f"Failed to extract text from Excel: {str(e)}")

def get_sentiment(text: str) -> Optional[str]:
    """Get sentiment using zero-shot classification"""
    if not sentiment_classifier:
        return None
        
    try:
        if isinstance(text, str) and text.strip():
            candidate_labels = ["positive", "negative", "neutral"]
            result = sentiment_classifier(text, candidate_labels)
            return result['labels'][0]
    except Exception as e:
        logger.error(f"Sentiment analysis error: {e}")
        return None
    return None

def get_summary(text: str) -> Optional[str]:
    """Get summary using summarization pipeline"""
    if not summarizer:
        return None
        
    try:
        if isinstance(text, str) and text.strip():
            # Handle input length limits
            max_input_length = 1024  # Conservative limit for DistilBART
            words = text.split()
            if len(words) > max_input_length:
                text = " ".join(words[:max_input_length])
            
            # Skip very short texts
            if len(words) < 30:
                return f"Text too short for summarization: {text[:100]}..."
                
            summary = summarizer(text, max_length=150, min_length=30, do_sample=False)
            return summary[0]['summary_text']
    except Exception as e:
        logger.error(f"Summarization error: {e}")
        return None
    return None

def get_entities(text: str) -> List[tuple]:
    """Extract named entities using spaCy"""
    if not nlp:
        return []
        
    try:
        if not isinstance(text, str) or not text.strip():
            return []
        doc = nlp(text)
        return [(ent.text, ent.label_) for ent in doc.ents]
    except Exception as e:
        logger.error(f"NER error: {e}")
        return []

def create_wordcloud(text: str) -> Optional[str]:
    """Create word cloud and return as base64 encoded image"""
    try:
        if not text or not text.strip():
            logger.warning("Empty text provided for word cloud generation")
            return None

        # Clean the text - remove special characters and extra whitespace
        import re
        cleaned_text = re.sub(r'[^\w\s]', ' ', text)
        cleaned_text = ' '.join(cleaned_text.split())

        if len(cleaned_text) < 10:
            logger.warning("Text too short for word cloud generation")
            return None

        # Create WordCloud with dark background and light words
        wordcloud = WordCloud(
            width=800,
            height=400,
            background_color='black',
            max_words=100,
            colormap='Pastel1',  # Light colors
            relative_scaling=0.5,
            min_font_size=10
        ).generate(cleaned_text)

        # Check if wordcloud was generated successfully
        if not wordcloud.words_:
            logger.warning("No words found for word cloud generation")
            return None

        # Save to bytes buffer
        img_buffer = io.BytesIO()

        # Create matplotlib figure
        fig, ax = plt.subplots(figsize=(10, 5))
        ax.imshow(wordcloud, interpolation='bilinear')
        ax.axis('off')
        # Save the figure with black facecolor
        plt.tight_layout(pad=0)
        plt.savefig(img_buffer, format='png', bbox_inches='tight', dpi=150,
                   facecolor='black', edgecolor='none')
        plt.close(fig)  # Important: close the figure to free memory

        # Convert to base64
        img_buffer.seek(0)
        img_data = img_buffer.getvalue()
        img_buffer.close()

        if len(img_data) == 0:
            logger.error("Generated image is empty")
            return None

        img_base64 = base64.b64encode(img_data).decode()
        return f"data:image/png;base64,{img_base64}"

    except Exception as e:
        logger.error(f"Word cloud generation error: {e}")
        import traceback
        logger.error(f"Traceback: {traceback.format_exc()}")
        return None

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    model_status = {
        "sentiment_classifier": sentiment_classifier is not None,
        "summarizer": summarizer is not None,
        "nlp": nlp is not None
    }
    
    return {
        "status": "healthy",
        "models_loaded": model_status,
        "all_models_ready": all(model_status.values())
    }

@app.post("/analyze-document")
async def analyze_document(
    file: UploadFile = File(...),
    analysis_type: str = "both"  # "individual", "combined", or "both"
):
    """Analyze PDF or Excel file for sentiment, summary, and entities"""
    
    # Validate file type
    filename_lower = file.filename.lower()
    if not (filename_lower.endswith('.pdf') or filename_lower.endswith('.xlsx') or filename_lower.endswith('.xls')):
        raise HTTPException(status_code=400, detail="File must be a PDF or Excel file (.pdf, .xlsx, .xls)")
    
    # Check file size (50MB limit)
    MAX_SIZE = 50 * 1024 * 1024  # 50MB in bytes
    content = await file.read()
    if len(content) > MAX_SIZE:
        raise HTTPException(status_code=413, detail="File size exceeds 50MB limit")
    
    try:
        # Extract text based on file type
        logger.info(f"Processing file: {file.filename}")
        
        if filename_lower.endswith('.pdf'):
            df_feedback = extract_text_from_pdf(content)
            file_type = "PDF"
        else:  # Excel files
            df_feedback = extract_text_from_excel(content)
            file_type = "Excel"
        
        # Check if models are available
        models_available = {
            "sentiment": sentiment_classifier is not None,
            "summary": summarizer is not None,
            "entities": nlp is not None
        }
        
        results = {
            "filename": file.filename,
            "total_lines": len(df_feedback),
            "total_pages": df_feedback['page'].nunique() if 'page' in df_feedback.columns else 1,
            "models_available": models_available,
            "analysis_type": analysis_type
        }
        
        # Individual line analysis (this is what the user wants - each line analyzed separately)
        if analysis_type in ["individual", "both"]:
            logger.info("Performing individual line analysis...")
            individual_results = []
            
            for idx, row in df_feedback.iterrows():
                line_result = {
                    "line_number": row.get('line_number', idx + 1),
                    "page": row.get('page', 1),
                    "text": row['feedback'][:300] + "..." if len(row['feedback']) > 300 else row['feedback'],
                    "full_text": row['feedback'],  # Include full text for frontend
                    "full_text_length": len(row['feedback'])
                }
                
                # Add sentiment if model available
                if models_available["sentiment"]:
                    line_result["sentiment"] = get_sentiment(row['feedback'])
                
                # Add summary if model available (always try to summarize, fallback to text if too short)
                if models_available["summary"]:
                    summary = get_summary(row['feedback'])
                    if summary:
                        line_result["summary"] = summary
                    else:
                        # If summary is None or too short, just use the original text
                        line_result["summary"] = row['feedback']
                else:
                    line_result["summary"] = row['feedback']
                
                # Add entities if model available
                if models_available["entities"]:
                    line_result["entities"] = get_entities(row['feedback'])
                
                individual_results.append(line_result)
            
            results["individual_analysis"] = individual_results
        
        # Combined analysis
        if analysis_type in ["combined", "both"]:
            logger.info("Performing combined analysis...")
            combined_text = ' '.join(df_feedback['feedback'].astype(str))
            
            combined_result = {
                "total_text_length": len(combined_text),
                "preview": combined_text[:1000] + "..." if len(combined_text) > 1000 else combined_text
            }
            
            # Combined sentiment analysis
            if models_available["sentiment"]:
                # Get sentiment for each page and aggregate
                sentiments = [get_sentiment(text) for text in df_feedback['feedback']]
                sentiment_counts = pd.Series([s for s in sentiments if s]).value_counts().to_dict()
                combined_result["sentiment_distribution"] = sentiment_counts
                combined_result["overall_sentiment"] = max(sentiment_counts, key=sentiment_counts.get) if sentiment_counts else None
            
            # Combined summary
            if models_available["summary"]:
                summary = get_summary(combined_text)
                if summary:
                    combined_result["summary"] = summary
                else:
                    combined_result["summary"] = combined_text
            
            # Combined entities
            if models_available["entities"]:
                all_entities = []
                for text in df_feedback['feedback']:
                    entities = get_entities(text)
                    all_entities.extend(entities)
                
                # Count entity occurrences
                entity_counts = {}
                for entity, label in all_entities:
                    key = f"{entity} ({label})"
                    entity_counts[key] = entity_counts.get(key, 0) + 1
                
                # Get top entities
                top_entities = sorted(entity_counts.items(), key=lambda x: x[1], reverse=True)[:20]
                combined_result["top_entities"] = top_entities
                combined_result["total_entities"] = len(all_entities)
            
            # Generate word cloud
            wordcloud_image = create_wordcloud(combined_text)
            if wordcloud_image:
                combined_result["wordcloud"] = wordcloud_image
            
            results["combined_analysis"] = combined_result
        
        logger.info(f"✅ Analysis completed for {file.filename}")
        return JSONResponse(content=results)
        
    except Exception as e:
        logger.error(f"Analysis error: {e}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

# Backward compatibility endpoint for PDF-only analysis
@app.post("/analyze-pdf")
async def analyze_pdf(
    file: UploadFile = File(...),
    analysis_type: str = "both"
):
    """Backward compatibility endpoint for PDF analysis only"""
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="File must be a PDF")
    return await analyze_document(file, analysis_type)

@app.get("/models/status")
async def get_model_status():
    """Get current status of loaded models"""
    return {
        "sentiment_classifier": {
            "loaded": sentiment_classifier is not None,
            "model": "nlpaueb/legal-bert-base-uncased" if sentiment_classifier else None
        },
        "summarizer": {
            "loaded": summarizer is not None,
            "model": "sshleifer/distilbart-cnn-12-6" if summarizer else None
        },
        "nlp": {
            "loaded": nlp is not None,
            "model": "en_core_web_sm" if nlp else None
        }
    }

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="127.0.0.1",
        port=8001,
        reload=True,
        log_level="info"
    )