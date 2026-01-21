# 🎭 Multimodal Sentiment Analysis Platform

<div align="center">

![Platform Banner](https://img.shields.io/badge/Multimodal_Sentiment_Analysis-AI_Platform-blueviolet?style=for-the-badge&logo=brain&logoColor=white)

[![Next.js](https://img.shields.io/badge/Next.js-15.0.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.10+-green?style=flat-square&logo=python)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![AWS](https://img.shields.io/badge/AWS-SageMaker-orange?style=flat-square&logo=amazon-aws)](https://aws.amazon.com/sagemaker/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-6772e5?style=flat-square&logo=stripe)](https://stripe.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

**Enterprise-grade AI platform for real-time multimodal sentiment analysis combining video, audio, text, and document processing with live emotion detection, summary generation, and word cloud visualization.**

[🚀 Quick Start](#-quick-start) • [📖 Documentation](#-complete-setup-guide) • [🎯 Use Cases](#-real-world-use-case-econsultation-module) • [🐛 Report Bug](https://github.com/UtkarsHMer05/sentiment-analysis/issues) • [💡 Request Feature](https://github.com/UtkarsHMer05/sentiment-analysis/issues)

</div>

---

## 📸 Platform Screenshots

<details>
  <summary><b>🏠 Landing Page</b></summary>
  
  ![Landing Page](https://github.com/user-attachments/assets/b1601972-3300-4629-b844-dd380b1fcff6)
</details>

<details>
  <summary><b>🔐 Authentication</b></summary>
  
  ![Login](https://github.com/user-attachments/assets/acd41eed-066d-4966-a7e0-0f8af20b52c3)
  ![Signup](https://github.com/user-attachments/assets/bc2143fe-476c-4405-82d8-b92b4acad322)
</details>

<details>
  <summary><b>📊 Dashboard & Analysis Results</b></summary>
  
  ![Dashboard](https://github.com/user-attachments/assets/6338cf07-e3ca-4a74-b964-1559dad0d2a9)
  ![Results 1](https://github.com/user-attachments/assets/f0ecda1e-39d7-4ed2-a635-efcf66348456)
  ![Results 2](https://github.com/user-attachments/assets/d4b293ad-2a63-4c15-b75e-536e1e52b650)
  ![Results 3](https://github.com/user-attachments/assets/15fa9613-ef52-4b9b-ace5-57aa78db54bb)
  ![Results 4](https://github.com/user-attachments/assets/3ede5f58-c754-4fec-a9d9-39cc610acb75)
</details>

<details>
  <summary><b>📹 Live Detection & Real-time Results</b></summary>
  
  ![Live Detection](https://github.com/user-attachments/assets/559e0407-9d7b-4061-a053-273755f1ba36)
  ![Live Results 1](https://github.com/user-attachments/assets/576e24f0-1671-4bc9-a1e3-8efe91a18930)
  ![Live Results 2](https://github.com/user-attachments/assets/d27ac8cc-aa95-4cff-bf90-462050149621)
  ![Live Results 3](https://github.com/user-attachments/assets/a3973568-c6ee-4ff3-a58b-bfc0a26b03da)
  ![Live Results 4](https://github.com/user-attachments/assets/bb1e2d0f-29b9-4b1b-be85-5f6607cf06bd)
</details>

---

## 📚 Table of Contents

- [🌟 Overview](#-overview)
- [🎯 Real-World Use Case](#-real-world-use-case-econsultation-module)
- [✨ Complete Feature Set](#-complete-feature-set)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ System Architecture](#️-system-architecture)
- [⚡ Quick Start](#-quick-start)
- [📖 Complete Setup Guide](#-complete-setup-guide)
- [🔌 API Documentation](#-api-documentation)
- [🎯 Feature Deep Dive](#-feature-deep-dive)
- [🔧 Troubleshooting](#-troubleshooting)
- [🚀 Deployment](#-deployment)
- [🛣️ Roadmap](#️-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🌟 Overview

The **Multimodal Sentiment Analysis Platform** is a comprehensive AI-powered solution designed to analyze sentiments, emotions, and feedback from multiple modalities including:

- **📄 Documents** (PDF, Excel) - Stakeholder feedback, comments, surveys
- **📹 Video** - Facial expressions, body language, visual cues
- **🎙️ Audio** - Voice tone, prosodic patterns, emotional speech
- **📝 Text** - Written comments, suggestions, observations

### 🎯 Problem We Solve

Traditional sentiment analysis tools only process text, missing crucial emotional cues from voice tone, facial expressions, and body language. Large volumes of feedback (such as public consultation comments) often risk being inadequately analyzed or overlooked.

This platform bridges this gap by:

| Challenge | Our Solution |
|-----------|--------------|
| Analyzing large volumes of stakeholder comments | Batch PDF/Excel processing with individual line analysis |
| Understanding emotional context beyond text | Multimodal fusion (video + audio + text) |
| Summarizing lengthy feedback | AI-powered abstractive summarization |
| Identifying key themes | Word cloud visualization & entity extraction |
| Processing in real-time | WebSocket-based live emotion detection |

### 📊 Performance Metrics

| Metric | Score |
|--------|-------|
| Emotion Recognition Accuracy | **78.4%** |
| Sentiment Classification | **85.2%** |
| Real-time Latency | **< 1 second** |
| Supported Emotions | **7 Classes** |
| Document Processing | **PDF, XLSX, XLS** |

---

## 🎯 Real-World Use Case: eConsultation Module

> **Government Use Case: Ministry of Corporate Affairs (MoCA)**

### 📋 Problem Statement

The **eConsultation module** is an online platform where proposed amendments and draft legislations are posted on the MCA website. External users can submit their comments and suggestions through the MCA21 portal.

#### The Challenge

When a substantial volume of comments is received on draft legislation:
- ❌ Certain observations may be **inadvertently overlooked**
- ❌ Feedback may be **inadequately analyzed**
- ❌ Manual review of thousands of comments is **time-consuming**
- ❌ Identifying the **overall sentiment** across all feedback is difficult
- ❌ Understanding **key themes** and frequently mentioned topics is challenging

### ✅ How This Platform Solves It

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     eConsultation Feedback Analysis Flow                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  📥 Upload Comments        →  🤖 AI Analysis         →  📊 Results          │
│  (PDF/Excel file with         (Automated processing      (Dashboard with    │
│   stakeholder feedback)        of each comment)           insights)          │
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                              OUTPUT INCLUDES:                                │
│                                                                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐             │
│  │ 📈 Sentiment    │  │ 📝 Summaries    │  │ ☁️ Word Cloud   │             │
│  │    Analysis     │  │    Per Comment  │  │    Keywords     │             │
│  │                 │  │                 │  │                 │             │
│  │ • Positive      │  │ • Concise       │  │ • Visual        │             │
│  │ • Negative      │  │   meaning       │  │   representation│             │
│  │ • Neutral       │  │ • Key points    │  │ • Density map   │             │
│  │   for EACH line │  │   extracted     │  │   of themes     │             │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘             │
│                                                                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐             │
│  │ 🏷️ Named Entity │  │ 📊 Overall      │  │ 📁 Export       │             │
│  │    Recognition  │  │    Statistics   │  │    Options      │             │
│  │                 │  │                 │  │                 │             │
│  │ • Organizations │  │ • Total comments│  │ • JSON          │             │
│  │ • Persons       │  │ • Distribution  │  │ • Download      │             │
│  │ • Locations     │  │ • Page-by-page  │  │   results       │             │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘             │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 🎯 Expected Outcomes Delivered

| Requirement | Platform Feature |
|-------------|------------------|
| **Sentiment Analysis** | ✅ Legal-BERT based zero-shot classification for positive/negative/neutral sentiment on each comment |
| **Summary Generation** | ✅ DistilBART abstractive summarization to convey meaning precisely |
| **Word Cloud** | ✅ Visual density representation of keywords used by stakeholders |
| **Reduce Analysis Effort** | ✅ Automated batch processing of entire documents |
| **Individual & Overall** | ✅ Both per-line analysis AND combined document analysis |

### 💡 Example Workflow

1. **Upload** the Excel/PDF export of eConsultation comments
2. **Automatic Processing** - Each line is analyzed individually for:
   - Sentiment (positive/negative/neutral)
   - AI-generated summary
   - Named entities (organizations, persons, locations mentioned)
3. **Combined Analysis** - Overall document analysis generates:
   - Sentiment distribution chart
   - Word cloud of all keywords
   - Top mentioned entities
4. **Export Results** - Download complete analysis as JSON

---

## ✨ Complete Feature Set

### 🤖 AI & Machine Learning

<table>
<tr>
<td width="50%">

#### 📄 Document Analysis (PDF/Excel)
- **Legal-BERT** zero-shot classification for sentiment
- **DistilBART** abstractive summarization
- **spaCy NER** for entity extraction
- **Word Cloud** generation with keyword density
- Line-by-line AND combined analysis modes
- Supports PDF, XLSX, XLS formats
- Max file size: 50MB

</td>
<td width="50%">

#### 📹 Video Analysis
- **7 Emotion Classes**: Joy, Sadness, Anger, Fear, Surprise, Disgust, Neutral
- **3D CNN** with temporal modeling for facial expressions
- Real-time WebSocket streaming
- Frame-by-frame analysis
- Confidence scores for each detection

</td>
</tr>
<tr>
<td>

#### 🎙️ Audio Analysis
- **Mel-Spectrogram CNN** for voice analysis
- **Whisper (OpenAI)** for transcription
- Prosodic pattern detection
- Vocal intensity analysis
- 16kHz sampling with 128 mel filters

</td>
<td>

#### 🔗 Multimodal Fusion
- **Attention-based cross-modal fusion**
- Multi-head attention with learned weights
- Combined emotion + sentiment scoring
- **78.4% emotion accuracy**
- **85.2% sentiment accuracy**

</td>
</tr>
</table>

### 🎥 Live Emotion Detection

```
┌──────────────────────────────────────────────────────────────┐
│                    Live Detection System                      │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  📹 Camera Input  ──→  🔄 WebSocket Server  ──→  📊 Results  │
│                         (Port 8080)                           │
│                                                               │
│  Features:                                                    │
│  • Real-time emotion detection                                │
│  • JWT-authenticated connections                              │
│  • Video frame processing                                     │
│  • Audio chunk analysis                                       │
│  • Text input sentiment                                       │
│  • Periodic analysis updates (every 2 seconds)                │
│  • Upload recorded sessions for batch analysis                │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### 💼 Enterprise Features

| Feature | Description |
|---------|-------------|
| **🔐 Authentication** | NextAuth.js with secure password hashing (BCrypt) |
| **🔑 API Key Management** | Generate, revoke, and manage API keys (`sa_live_*` format) |
| **📊 Quota System** | Track usage with per-operation costs (2 points each for sentiment, live detection, PDF analysis) |
| **💳 Stripe Payments** | Subscription management with quota stacking |
| **📈 Usage Analytics** | Real-time quota tracking and billing |
| **🔄 Auto-Upload** | Automatic session upload after live detection |

### 💰 Pricing Plans

| Plan | Price | Quota | Features |
|------|-------|-------|----------|
| **Basic** | $9.99/mo | 30 requests | Standard processing, Email support |
| **Pro** | $29.99/mo | 100 requests | Priority processing, API access |
| **Premium** | $99.99/mo | 1000 requests | Unlimited features, Priority support |
| **Enterprise** | Contact Sales | Custom | SLA, Custom integrations, Dedicated manager |

### 🎨 User Experience

- **Responsive Design** - Mobile-first with Tailwind CSS
- **Animated UI** - Smooth transitions with Framer Motion
- **Real-time Dashboard** - Live analytics and processing status
- **Progress Tracking** - Visual feedback for long-running processes
- **Interactive Results** - Expandable analysis cards, sentiment charts

---

## 🛠️ Tech Stack

<table>
<tr>
<td align="center"><strong>🎨 Frontend</strong></td>
<td align="center"><strong>⚙️ Backend</strong></td>
<td align="center"><strong>🤖 AI/ML</strong></td>
<td align="center"><strong>☁️ Infrastructure</strong></td>
</tr>
<tr>
<td valign="top">

- Next.js 15.0.1
- TypeScript 5.5.3
- Tailwind CSS 3.4.3
- Framer Motion 11.18
- React Hook Form
- Radix UI Components
- Lucide Icons

</td>
<td valign="top">

- Node.js API Routes
- FastAPI (Python)
- Prisma ORM 5.14
- NextAuth.js 5.0.0
- WebSocket (ws 8.18)
- BCrypt.js 2.4.3
- Zod Validation

</td>
<td valign="top">

- **Legal-BERT** (sentiment)
- **DistilBART** (summary)
- **spaCy** (NER)
- PyTorch 2.5.1
- Transformers 4.46
- OpenCV 4.10
- Whisper (OpenAI)
- WordCloud

</td>
<td valign="top">

- AWS SageMaker
- AWS S3
- AWS EC2/IAM
- Stripe Payments
- PostgreSQL/SQLite
- Vercel/Docker

</td>
</tr>
</table>

---

## 🏗️ System Architecture

### High-Level Overview

```mermaid
flowchart TB
    subgraph Client["🖥️ Client Layer"]
        Browser[Web Browser]
        Camera[📹 Camera]
        Mic[🎙️ Microphone]
    end

    subgraph NextJS["⚡ Next.js Application (Port 3000)"]
        Pages[React Pages & Components]
        API[API Routes]
        Auth[NextAuth.js]
    end

    subgraph WebSocket["🔄 WebSocket Server (Port 8080)"]
        LiveServer[Live Analysis Server]
        JWT[JWT Authentication]
    end

    subgraph Python["🐍 FastAPI Service (Port 8001)"]
        PDFAnalyzer[PDF/Excel Analyzer]
        LegalBERT[Legal-BERT Classifier]
        Summarizer[DistilBART Summarizer]
        NER[spaCy NER]
        WordCloud[Word Cloud Generator]
    end

    subgraph Database["🗄️ Database Layer"]
        Prisma[(Prisma ORM)]
        PostgreSQL[(PostgreSQL/SQLite)]
    end

    subgraph External["☁️ External Services"]
        S3[(AWS S3)]
        SageMaker[AWS SageMaker]
        Stripe[Stripe API]
    end

    Browser --> Pages
    Camera --> LiveServer
    Mic --> LiveServer
    
    Pages --> API
    API --> Auth
    API --> Prisma
    API --> PDFAnalyzer
    API --> S3
    API --> Stripe
    
    LiveServer --> JWT
    LiveServer --> SageMaker
    
    PDFAnalyzer --> LegalBERT
    PDFAnalyzer --> Summarizer
    PDFAnalyzer --> NER
    PDFAnalyzer --> WordCloud
    
    Prisma --> PostgreSQL
```

### Core Services

| Service | Port | Description |
|---------|------|-------------|
| **Next.js Frontend + API** | `3000` | Marketing site, dashboard, REST APIs, NextAuth, Prisma |
| **WebSocket Live Analysis** | `8080` | Real-time emotion streaming (JWT protected) |
| **FastAPI PDF Analyzer** | `8001` | Document extraction, sentiment, summarization, NER, word cloud |
| **Stripe Webhooks** | `3000` | Subscription events at `/api/stripe/webhooks` |

### Database Schema

```
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│     User     │   │   ApiQuota   │   │   Purchase   │
├──────────────┤   ├──────────────┤   ├──────────────┤
│ id           │◄──│ userId       │   │ id           │
│ name         │   │ requestsUsed │   │ userId       │
│ email        │   │ maxRequests  │   │ stripeSession│
│ password     │   │ resetDate    │   │ amount       │
│ stripeId     │   │ secretKey    │   │ planType     │
│ isActive     │   └──────────────┘   │ requestsGrant│
│ subscriptionId                       └──────────────┘
└──────────────┘
        │
        ▼
┌──────────────┐   ┌──────────────┐
│  VideoFile   │   │   Session    │
├──────────────┤   ├──────────────┤
│ id           │   │ id           │
│ userId       │   │ sessionToken │
│ key          │   │ userId       │
│ analyzed     │   │ expires      │
└──────────────┘   └──────────────┘
```

---

## ⚡ Quick Start

### Prerequisites

```bash
# Verify installations
node --version    # v18+ required
python3 --version # v3.10+ required
npm --version     # v10.2.4+
```

### One-Command Setup

```bash
# Clone and enter directory
git clone https://github.com/UtkarsHMer05/sentiment-analysis.git && cd sentiment-analysis

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
echo "AUTH_SECRET=\"$(openssl rand -base64 32)\"" >> .env.local
echo "NEXTAUTH_URL=\"http://localhost:3000\"" >> .env.local
echo "DATABASE_URL=\"file:./dev.db\"" >> .env.local

# Setup database
npm run db:push

# Setup Python service
cd pdf-analyzer-service && chmod +x setup.sh && ./setup.sh && cd ..

# Start everything
npm run dev:full
```

🎉 **Open http://localhost:3000**

### Quick Verification

1. Open http://localhost:3000
2. Click **Sign Up** → Create account
3. Navigate to **Dashboard**
4. Test PDF Analysis or Live Detection

---

## 📖 Complete Setup Guide

### 🔧 Prerequisites

| Software | Version | Download |
|----------|---------|----------|
| Node.js | v18+ | [nodejs.org](https://nodejs.org/) |
| Python | v3.10+ | [python.org](https://www.python.org/downloads/) |
| Git | Latest | [git-scm.com](https://git-scm.com/) |

### 📥 Step-by-Step Installation

<details>
<summary><b>Step 1: Clone & Install Node Dependencies</b></summary>

```bash
git clone https://github.com/UtkarsHMer05/sentiment-analysis.git
cd sentiment-analysis
npm install
```

**Expected output:**
```
added 500+ packages
✔ Generated Prisma Client
```
</details>

<details>
<summary><b>Step 2: Configure Environment Variables</b></summary>

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```bash
# Database (SQLite for dev, PostgreSQL for production)
DATABASE_URL="file:./dev.db"

# Authentication (generate with: openssl rand -base64 32)
AUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# AWS (Optional - for video analysis)
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="your-key"
AWS_SECRET_ACCESS_KEY="your-secret"
AWS_INFERENCE_BUCKET="your-bucket"
AWS_ENDPOINT_NAME="your-endpoint"

# Stripe (Optional - for payments)
STRIPE_PUBLIC_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Python Backend
PYTHON_BACKEND_URL="http://localhost:8001"
```
</details>

<details>
<summary><b>Step 3: Setup Database</b></summary>

```bash
npm run db:push

# View database (optional)
npm run db:studio
```
</details>

<details>
<summary><b>Step 4: Setup Python Backend</b></summary>

```bash
cd pdf-analyzer-service
chmod +x setup.sh
./setup.sh
cd ..
```

This installs:
- FastAPI & Uvicorn
- PyTorch & Transformers
- Legal-BERT, DistilBART models
- spaCy with en_core_web_sm
- WordCloud, pdfplumber, openpyxl
</details>

<details>
<summary><b>Step 5: Start All Services</b></summary>

```bash
# Full development mode (Next.js + WebSocket)
npm run dev:full

# Or run separately:
npm run dev          # Terminal 1: Next.js (port 3000)
npm run websocket    # Terminal 2: WebSocket (port 8080)
cd pdf-analyzer-service && source venv/bin/activate && python main.py  # Terminal 3: Python (port 8001)
```
</details>

---

## 🔌 API Documentation

### Authentication

All protected endpoints require:
```
Authorization: Bearer sa_live_your_api_key_here
```

### REST Endpoints

| Route | Method | Description | Auth |
|-------|--------|-------------|------|
| `/api/upload-url` | POST | Generate S3 presigned URL for video upload | API Key |
| `/api/sentiment-inference` | POST | Trigger SageMaker video analysis | API Key |
| `/api/pdf-analysis` | POST | Analyze PDF/Excel document | Session |
| `/api/live-emotion` | POST | Process live recording session | Session |
| `/api/live-recording-upload` | POST | Upload live-recorded media chunks | API Key |
| `/api/user/api-key` | POST/DELETE | Create or revoke API keys | Session |
| `/api/user/quota` | GET | Get quota status | Session |
| `/api/stripe/checkout` | POST | Create Stripe checkout session | Session |
| `/api/stripe/webhooks` | POST | Handle Stripe subscription events | Stripe |

### PDF Analysis API

```bash
# Analyze PDF document
curl -X POST "http://localhost:8001/analyze-document" \
  -F "file=@feedback.pdf" \
  -F "analysis_type=both"

# Response includes:
# - individual_analysis: Array of per-line results
# - combined_analysis: Overall document analysis with word cloud
```

### WebSocket Events

**Connect:** `ws://localhost:8080?token=<jwt>`

**Send:**
```json
{
  "type": "start_analysis" | "stop_analysis" | "video_frame" | "audio_chunk" | "text_input",
  "data": {},
  "timestamp": 1734882712345
}
```

**Receive:**
```json
{
  "type": "video_analysis",
  "data": {
    "emotion": "joy",
    "sentiment": "positive",
    "confidence": 0.92,
    "keywords": ["happy", "excited"]
  },
  "timestamp": 1734882712345
}
```

---

## 🎯 Feature Deep Dive

### Document Analysis Pipeline

```
                              PDF/Excel Upload
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │      Text Extraction          │
                    │   (pdfplumber / openpyxl)     │
                    └───────────────────────────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              ▼                     ▼                     ▼
    ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
    │  Legal-BERT     │   │  DistilBART     │   │   spaCy NER     │
    │  Zero-Shot      │   │  Summarization  │   │   Entities      │
    │  Classification │   │                 │   │                 │
    └─────────────────┘   └─────────────────┘   └─────────────────┘
              │                     │                     │
              │           ┌─────────────────┐             │
              │           │   Word Cloud    │             │
              │           │   Generation    │             │
              │           └─────────────────┘             │
              │                     │                     │
              └─────────────────────┼─────────────────────┘
                                    ▼
                          Analysis Results JSON
```

### Quota Cost System

| Operation | Cost | Description |
|-----------|------|-------------|
| `sentiment_analysis` | 2 points | Video sentiment analysis |
| `live_detection` | 2 points | Live emotion detection session |
| `pdf_analysis` | 2 points | PDF/Excel document analysis |

---

## 🔧 Troubleshooting

<details>
<summary><b>Database Issues</b></summary>

```bash
# Reset database
rm prisma/dev.db
npm run db:push

# Regenerate Prisma client
npx prisma generate
```
</details>

<details>
<summary><b>Port Conflicts</b></summary>

```bash
# Kill process on port
lsof -ti:3000 | xargs kill -9
lsof -ti:8001 | xargs kill -9
lsof -ti:8080 | xargs kill -9
```
</details>

<details>
<summary><b>Python Backend Issues</b></summary>

```bash
cd pdf-analyzer-service
source venv/bin/activate
pip install -r requirements.txt
python -m spacy download en_core_web_sm
```
</details>

<details>
<summary><b>Reset Everything</b></summary>

```bash
rm -rf node_modules .next prisma/dev.db
npm install
npm run db:push
npm run dev:full
```
</details>

---

## 🚀 Deployment

### Vercel (Web Application)

1. Connect repository to Vercel
2. Set environment variables
3. Use Vercel Postgres or Neon for database
4. Deploy WebSocket server separately (AWS ECS, Cloud Run, or Render)

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build -t sentiment-app .
docker run -p 3000:3000 sentiment-app
```

---

## 📋 Quick Reference

### Common Commands

```bash
# Development
npm run dev:full     # Start all services
npm run dev          # Next.js only
npm run websocket    # WebSocket only

# Database
npm run db:push      # Apply schema
npm run db:studio    # Visual editor

# Code Quality
npm run lint         # Check linting
npm run lint:fix     # Fix issues
npm run typecheck    # Type checking
npm run format:write # Format code

# Production
npm run build        # Build app
npm run start        # Start production
```

### Port Reference

| Service | Port | URL |
|---------|------|-----|
| Next.js | 3000 | http://localhost:3000 |
| WebSocket | 8080 | ws://localhost:8080 |
| Python API | 8001 | http://localhost:8001 |
| Prisma Studio | 5555 | http://localhost:5555 |

### Project Structure

```
sentiment-analysis/
├── src/
│   ├── app/
│   │   ├── api/              # API routes
│   │   ├── dashboard/        # Main dashboard
│   │   ├── live-detection/   # Live emotion capture
│   │   ├── live-results/     # Live analysis results
│   │   └── pdf-analysis/     # Document analysis
│   ├── components/           # React components
│   │   ├── LiveEmotionCapture.tsx
│   │   ├── PdfAnalysisCapture.tsx
│   │   ├── PdfAnalysisResults.tsx
│   │   └── AnalysisResultsModal.tsx
│   ├── lib/
│   │   ├── quota.ts          # Quota management
│   │   └── stripe.ts         # Stripe config
│   ├── server/
│   │   ├── auth/             # NextAuth config
│   │   └── websocket/        # Live analysis server
│   └── sections/             # Landing page sections
├── pdf-analyzer-service/     # Python FastAPI backend
│   ├── main.py               # API & ML models
│   ├── requirements.txt
│   └── setup.sh
├── prisma/
│   └── schema.prisma         # Database schema
└── package.json
```

---

## 🛣️ Roadmap

- [x] Modern dashboard UI
- [x] Live emotion detection
- [x] PDF/Excel sentiment analysis
- [x] Word cloud generation
- [x] Summary generation
- [x] Named entity recognition
- [x] Quota & billing system
- [x] API key management
- [ ] Mobile app (React Native)
- [ ] GraphQL API
- [ ] Multi-language support
- [ ] Video conference integration
- [ ] Batch processing queue
- [ ] Advanced analytics dashboard

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/amazing-feature`
3. Commit changes: `git commit -m "feat: add amazing feature"`
4. Run checks: `npm run check`
5. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

- [GitHub Issues](https://github.com/UtkarsHMer05/sentiment-analysis/issues)
- Email: utkarshkhajuria7@gmail.com
- ⭐ Star us on GitHub!

---

<div align="center">

**Made with ❤️ by [Utkarsh Khajuria](https://github.com/UtkarsHMer05)**

*A comprehensive AI solution for analyzing stakeholder feedback, public consultations, and multimodal sentiment detection.*

</div>
