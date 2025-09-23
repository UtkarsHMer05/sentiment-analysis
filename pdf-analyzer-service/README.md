# PDF Analyzer Service

This service provides PDF text extraction and sentiment analysis capabilities for the main sentiment analysis application.

## Setup

1. Run the setup script:
```bash
chmod +x setup.sh
./setup.sh
```

2. Start the service:
```bash
source venv/bin/activate
python main.py
```

The service will be available at `http://127.0.0.1:8001`

## API Endpoints

- `GET /health` - Health check and model status
- `GET /models/status` - Detailed model loading status  
- `POST /analyze-pdf` - Analyze PDF file

## Models Used

- **Sentiment Analysis**: `nlpaueb/legal-bert-base-uncased`
- **Summarization**: `sshleifer/distilbart-cnn-12-6`  
- **Named Entity Recognition**: `en_core_web_sm` (spaCy)

## Features

- PDF text extraction (up to 50MB)
- Sentiment analysis per page and combined
- Extractive summarization
- Named Entity Recognition (NER)
- Word cloud generation
- Individual and combined analysis modes
- Error handling for M2 Mac compatibility

## Environment

- Python 3.8+
- macOS M2 optimized (CPU-only inference)
- Memory efficient model loading