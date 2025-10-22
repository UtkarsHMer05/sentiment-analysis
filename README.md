# 🎭 Sentiment Analysis Platform

<div align="center">

![Platform Banner](https://img.shields.io/badge/Sentiment_Analysis-AI_Platform-blueviolet?style=for-the-badge&logo=brain&logoColor=white)

[![Next.js](https://img.shields.io/badge/Next.js-15.0.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.10+-green?style=flat-square&logo=python)](https://www.python.org/)
[![AWS](https://img.shields.io/badge/AWS-SageMaker-orange?style=flat-square&logo=amazon-aws)](https://aws.amazon.com/sagemaker/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-6772e5?style=flat-square&logo=stripe)](https://stripe.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

**Real-time multimodal AI sentiment analysis platform combining video, audio, and text processing with live emotion detection.**

[🚀 Quick Start](#-5-minute-quick-start) • [📖 Complete Setup](#-complete-setup-guide) • [🐛 Report Bug](https://github.com/UtkarsHMer05/sentiment-analysis/issues) • [💡 Request Feature](https://github.com/UtkarsHMer05/sentiment-analysis/issues)

</div>

---

## 📸 Platform Screenshots

<details>
  <summary><b>🏠 Landing</b></summary>
  
  ![Landing Page](https://github.com/user-attachments/assets/b1601972-3300-4629-b844-dd380b1fcff6)
</details>

<details>
  <summary><b>🔐 Auth Screens</b></summary>
  
  ![Login](https://github.com/user-attachments/assets/acd41eed-066d-4966-a7e0-0f8af20b52c3)
  ![Signup](https://github.com/user-attachments/assets/bc2143fe-476c-4405-82d8-b92b4acad322)
</details>

<details>
  <summary><b>📊 Dashboard & Analysis</b></summary>
  
  ![Dashboard](https://github.com/user-attachments/assets/6338cf07-e3ca-4a74-b964-1559dad0d2a9)
  ![Results 1](https://github.com/user-attachments/assets/f0ecda1e-39d7-4ed2-a635-efcf66348456)
  ![Results 2](https://github.com/user-attachments/assets/d4b293ad-2a63-4c15-b75e-536e1e52b650)
  ![Results 3](https://github.com/user-attachments/assets/15fa9613-ef52-4b9b-ace5-57aa78db54bb)
  ![Results 4](https://github.com/user-attachments/assets/3ede5f58-c754-4fec-a9d9-39cc610acb75)
</details>

<details>
  <summary><b>📹 Live Detection & Results</b></summary>
  
  ![Live Detection](https://github.com/user-attachments/assets/559e0407-9d7b-4061-a053-273755f1ba36)
  ![Live Results 1](https://github.com/user-attachments/assets/576e24f0-1671-4bc9-a1e3-8efe91a18930)
  ![Live Results 2](https://github.com/user-attachments/assets/d27ac8cc-aa95-4cff-bf90-462050149621)
  ![Live Results 3](https://github.com/user-attachments/assets/a3973568-c6ee-4ff3-a58b-bfc0a26b03da)
  ![Live Results 4](https://github.com/user-attachments/assets/bb1e2d0f-29b9-4b1b-be85-5f6607cf06bd)
</details>

---

## 📚 Table of Contents

- [🌟 Overview](#-overview)
- [✨ Key Features](#-key-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ Architecture](#️-architecture)
- [⚡ 5-Minute Quick Start](#-5-minute-quick-start)
- [📖 Complete Setup Guide](#-complete-setup-guide)
  - [Prerequisites](#-prerequisites)
  - [Initial Setup](#-initial-setup)
  - [Environment Configuration](#️-environment-configuration)
  - [Database Setup](#️-database-setup)
  - [Python Backend Setup](#-python-backend-setup)
  - [AWS Configuration](#️-aws-configuration)
  - [Stripe Configuration](#-stripe-configuration)
  - [Running the Application](#-running-the-application)
  - [Verification](#-verification)
- [🔌 API Documentation](#-api-documentation)
- [🎯 Feature Deep Dive](#-feature-deep-dive)
- [🔧 Troubleshooting](#-troubleshooting)
- [🧪 Testing](#-testing)
- [🚀 Deployment](#-deployment)
- [🛣️ Roadmap](#️-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [📞 Support](#-support)

---

## 🌟 Overview

**Sentiment Analysis Platform** delivers multimodal, real-time emotion and sentiment intelligence over video, audio, and documents. Built with Next.js, FastAPI, and AWS SageMaker for production-ready inference, it powers SaaS subscription features, live dashboard, quotas, and robust deployment.

### 🎯 Problem We Solve

Traditional sentiment analysis tools only process text, missing crucial emotional cues from voice tone, facial expressions, and body language. This platform bridges this gap by analyzing all modalities simultaneously, providing:

- **78.4% emotion recognition accuracy** (vs 65% industry standard)
- **Real-time processing** with <1s latency
- **Production-ready scalability** on AWS infrastructure
- **Developer-friendly APIs** with comprehensive documentation

---

## ✨ Key Features

### 🤖 AI & Machine Learning
- **Multimodal Analysis**: Simultaneous text, audio, and video processing
- **Real-time Inference**: Sub-second response times via AWS SageMaker
- **7 Emotion Classes**: Anger, disgust, fear, joy, neutral, sadness, surprise
- **3 Sentiment Categories**: Positive, negative, neutral
- **Live Video Processing**: Stream analysis with WebRTC integration

### 🎨 User Experience
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Dashboard**: Live analytics and processing status
- **Interactive Animations**: Smooth transitions with Framer Motion
- **Dark/Light Themes**: Customizable UI preferences
- **Progress Tracking**: Visual feedback for long-running processes

### 🔐 Enterprise Features
- **Secure Authentication**: NextAuth.js with multiple providers
- **API Key Management**: Secure access with quota controls
- **Payment Integration**: Stripe subscription management
- **Usage Analytics**: Comprehensive quota and billing tracking
- **Role-based Access**: User permission management

### ☁️ Cloud Infrastructure
- **AWS SageMaker**: Scalable ML model deployment
- **S3 Storage**: Secure file storage and retrieval
- **Auto-scaling**: Dynamic resource allocation
- **Cost Optimization**: Smart instance management
- **Global CDN**: Fast content delivery worldwide

---

## 🛠️ Tech Stack

<table>
<tr>
<td align="center"><strong>Frontend</strong></td>
<td align="center"><strong>Backend</strong></td>
<td align="center"><strong>AI/ML</strong></td>
<td align="center"><strong>Infrastructure</strong></td>
</tr>
<tr>
<td>

- Next.js 15.0.1
- TypeScript 5.5.3
- Tailwind CSS 3.4.3
- Framer Motion 11.18.2
- React Hook Form 7.57.0
- Radix UI Components

</td>
<td>

- Node.js API Routes
- Prisma ORM 5.14.0
- NextAuth.js 5.0.0
- WebSocket (ws 8.18.2)
- BCrypt.js 2.4.3
- Zod Validation 3.25.47

</td>
<td>

- Python 3.10+
- PyTorch 2.5.1
- Transformers 4.46.3
- OpenCV 4.10.0.84
- AWS SageMaker 2.237.0
- Whisper (OpenAI)

</td>
<td>

- AWS SageMaker
- AWS S3
- AWS CloudWatch
- Stripe Payments
- SQLite/PostgreSQL
- Vercel/Docker

</td>
</tr>
</table>

---

## 🏗️ Architecture

### System Overview

```mermaid
flowchart LR
  User[User Browser] -->|HTTPS| Next[Next.js App]
  Next -- ORM --> Prisma[(Prisma + Database)]
  Next -->|REST| Stripe[(Stripe)]
  Next -->|REST| AWS[(AWS S3 & SageMaker)]
  Next -->|REST| PDFService[(FastAPI PDF Analyzer)]
  Next -->|WS| LiveWS[(Live Analysis WebSocket)]
  PDFService -->|Models| HF[Transformers & spaCy]
```

### Core Services

| Service | Port | Description |
|---------|------|-------------|
| Next.js Frontend + API | `3000` | Marketing site, dashboard, REST + NextAuth + Prisma |
| WebSocket Live Analysis | `8080` | Streams live emotion analysis updates (JWT protected) |
| FastAPI PDF Analyzer | `8001` | PDF/Excel extraction, summarisation, sentiment |
| Stripe Webhooks | `3000` | Receives subscription events at `/api/stripe/webhooks` |

---

## ⚡ 5-Minute Quick Start

### Prerequisites Check

```bash
# Verify installations
node --version    # Should be v18+ 
python3 --version # Should be v3.10+
npm --version     # Should be v10.2.4+
git --version     # Any recent version
```

### One-Command Setup

```bash
# Clone and enter directory
git clone https://github.com/UtkarsHMer05/sentiment-analysis.git && cd sentiment-analysis

# Install Node.js dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Generate auth secret and add to .env.local
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

### Manual Step-by-Step

<details>
<summary><b>Click to expand manual setup steps</b></summary>

#### 1️⃣ Clone & Install (2 min)

```bash
git clone https://github.com/UtkarsHMer05/sentiment-analysis.git
cd sentiment-analysis
npm install
```

#### 2️⃣ Configure Environment (1 min)

```bash
cp .env.example .env.local
nano .env.local
```

**Minimum required in `.env.local`:**
```bash
DATABASE_URL="file:./dev.db"
AUTH_SECRET="paste-output-from-next-command"
NEXTAUTH_URL="http://localhost:3000"
```

**Generate AUTH_SECRET:**
```bash
openssl rand -base64 32
# Copy output and paste in .env.local
```

#### 3️⃣ Setup Database (30 sec)

```bash
npm run db:push
```

#### 4️⃣ Setup Python Backend (1 min)

```bash
cd pdf-analyzer-service
chmod +x setup.sh
./setup.sh
cd ..
```

#### 5️⃣ Start Application (30 sec)

```bash
npm run dev:full
```

**Access:** http://localhost:3000

</details>

### Verify It Works

1. Open http://localhost:3000
2. Click **Sign Up**
3. Create account: `test@example.com` / `password123`
4. You should see the Dashboard ✨

---

## 📖 Complete Setup Guide

This comprehensive guide walks you through setting up the entire platform from scratch.

### 🔧 Prerequisites

Before you begin, ensure you have the following installed:

#### Required Software

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (v10.2.4 or higher) - Comes with Node.js
- **Python** (v3.10 or higher) - [Download](https://www.python.org/downloads/)
- **pip** (Python package manager) - Comes with Python
- **Git** - [Download](https://git-scm.com/)

#### Optional but Recommended

- **VSCode** - [Download](https://code.visualstudio.com/)
- **Postman** - For API testing - [Download](https://www.postman.com/)

#### Required Accounts

- **AWS Account** - For SageMaker and S3 services
- **Stripe Account** - For payment processing
- **GitHub Account** - For version control

#### Verify Installations

```bash
# Check Node.js version
node --version
# Should output: v18.x.x or higher

# Check npm version
npm --version
# Should output: 10.x.x or higher

# Check Python version
python3 --version
# Should output: Python 3.10.x or higher

# Check pip version
pip3 --version
# Should output: pip 23.x.x or higher

# Check Git version
git --version
# Should output: git version 2.x.x or higher
```

---

### 📥 Initial Setup

#### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/UtkarsHMer05/sentiment-analysis.git

# Navigate to the project directory
cd sentiment-analysis

# Verify you're in the correct directory
ls -la
# You should see package.json, README.md, etc.
```

#### Step 2: Install Node.js Dependencies

```bash
# Install all Node.js packages
npm install

# This will take 2-5 minutes depending on your internet speed
# The postinstall script will automatically run: prisma generate
```

**Expected output:**
```
added 500+ packages in 2m
✔ Generated Prisma Client
```

---

### ⚙️ Environment Configuration

#### Step 3: Create Environment File

```bash
# Copy the example environment file
cp .env.example .env.local

# Open the file for editing
nano .env.local
# Or use your preferred editor: code .env.local
```

#### Step 4: Configure Environment Variables

Edit `.env.local` with your specific values:

```bash
# ===========================================
# DATABASE CONFIGURATION
# ===========================================
# For local development (SQLite - easiest to start)
DATABASE_URL="file:./dev.db"

# For production (PostgreSQL - recommended)
# DATABASE_URL="postgresql://user:password@localhost:5432/sentiment_db?schema=public"

# ===========================================
# NEXTAUTH CONFIGURATION
# ===========================================
# Generate a secure secret (run this command):
# openssl rand -base64 32
AUTH_SECRET="your-generated-secret-here"

# For local development
NEXTAUTH_URL="http://localhost:3000"

# For production, change to your domain
# NEXTAUTH_URL="https://yourdomain.com"

# ===========================================
# AWS CONFIGURATION
# ===========================================
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="your_aws_access_key_id"
AWS_SECRET_ACCESS_KEY="your_aws_secret_access_key"
AWS_INFERENCE_BUCKET="your-s3-bucket-name"
AWS_ENDPOINT_NAME="your-sagemaker-endpoint-name"

# ===========================================
# STRIPE CONFIGURATION
# ===========================================
# Test keys (start with pk_test_ and sk_test_)
STRIPE_PUBLIC_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# For production, use live keys (pk_live_, sk_live_)

# ===========================================
# OPTIONAL CONFIGURATIONS
# ===========================================
# Python Backend URL (if using separate PDF analyzer service)
PYTHON_BACKEND_URL="http://localhost:8001"

# Node Environment
NODE_ENV="development"
```

#### Step 5: Generate AUTH_SECRET

```bash
# Generate a secure random secret
openssl rand -base64 32

# Copy the output and paste it as AUTH_SECRET in .env.local
```

---

### 🗄️ Database Setup

#### Step 6: Initialize Database

```bash
# Option A: Push schema to database (recommended for development)
npm run db:push

# Option B: Create and run migrations (recommended for production)
npm run db:generate

# Expected output:
# ✔ Generated Prisma Client
# ✔ Database schema applied successfully
```

#### Step 7: Verify Database Setup

```bash
# Open Prisma Studio to view your database
npm run db:studio

# This will open http://localhost:5555 in your browser
# You should see your database tables:
# - User, Account, Session, ApiQuota, VideoFile, Purchase, Post
```

**Database is now ready!** 🎉

---

### 🐍 Python Backend Setup

The PDF Analyzer Service provides sentiment analysis capabilities for PDF documents.

#### Step 8: Navigate to PDF Analyzer Service

```bash
# From the project root directory
cd pdf-analyzer-service
```

#### Step 9: Run Setup Script

```bash
# Make the setup script executable
chmod +x setup.sh

# Run the setup script
./setup.sh

# This script will:
# 1. Create a Python virtual environment
# 2. Install all required Python packages
# 3. Download spaCy language model
# 4. Verify installations
```

**Expected output:**
```
Creating virtual environment...
Installing dependencies...
Downloading spaCy model...
✓ Setup complete!
```

#### Step 10: Verify Python Installation

```bash
# Activate the virtual environment
source venv/bin/activate

# Your terminal prompt should now show (venv)

# Verify installations
python -c "import fastapi; import torch; import transformers; print('✓ All packages installed')"

# Test the service
python main.py

# Expected output:
# INFO: Started server process
# INFO: Uvicorn running on http://127.0.0.1:8001
```

**Keep this terminal running** or stop it with `Ctrl+C` for now.

#### Step 11: Return to Project Root

```bash
# Open a new terminal window/tab
cd ..
# You should now be back in the sentiment-analysis directory
```

---

### ☁️ AWS Configuration

#### Step 12: Set Up AWS Services

##### A. Create AWS Account
1. Go to [AWS Console](https://aws.amazon.com/)
2. Sign up for a free account or sign in

##### B. Create IAM User with Permissions
1. Navigate to **IAM** → **Users** → **Add User**
2. Username: `sentiment-analysis-app`
3. Access type: **Programmatic access**
4. Permissions: Attach policies:
   - `AmazonS3FullAccess`
   - `AmazonSageMakerFullAccess`
5. **Save the Access Key ID and Secret Access Key** - you'll need these!

##### C. Create S3 Bucket
```bash
# Option 1: Using AWS CLI
aws s3 mb s3://your-sentiment-analysis-bucket --region us-east-1

# Option 2: Using AWS Console
# 1. Go to S3 → Create bucket
# 2. Bucket name: your-sentiment-analysis-bucket
# 3. Region: us-east-1
# 4. Block all public access: Disabled (for signed URLs)
# 5. Create bucket
```

##### D. Deploy SageMaker Endpoint (Optional for MVP)

**Note:** For initial development, you can skip SageMaker and use local inference.

If you want to use SageMaker:
1. Navigate to **SageMaker** → **Endpoints** → **Create endpoint**
2. Upload your trained model to S3
3. Create endpoint configuration
4. Deploy endpoint
5. Copy the endpoint name to your `.env.local`

##### E. Update .env.local with AWS Credentials

```bash
# Edit .env.local
nano .env.local

# Add your AWS credentials:
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="AKIAIOSFODNN7EXAMPLE"
AWS_SECRET_ACCESS_KEY="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
AWS_INFERENCE_BUCKET="your-sentiment-analysis-bucket"
AWS_ENDPOINT_NAME="your-sagemaker-endpoint" # Optional
```

---

### 💳 Stripe Configuration

#### Step 13: Set Up Stripe

##### A. Create Stripe Account
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Sign up for a free account
3. Activate your account (you can use test mode initially)

##### B. Get API Keys
1. In Stripe Dashboard, go to **Developers** → **API keys**
2. Copy your **Publishable key** (starts with `pk_test_`)
3. Copy your **Secret key** (starts with `sk_test_`)

##### C. Create Products and Prices
1. Go to **Products** → **Add product**
2. Create three products:

**Basic Plan:**
- Name: Basic
- Price: $9.99/month
- Features: 30 requests/month
- Copy the **Price ID** (starts with `price_`)

**Professional Plan:**
- Name: Professional  
- Price: $29.99/month
- Features: 100 requests/month
- Copy the **Price ID**

**Premium Plan:**
- Name: Premium
- Price: $99.99/month
- Features: 1000 requests/month
- Copy the **Price ID**

##### D. Set Up Webhooks
1. Go to **Developers** → **Webhooks**
2. Add endpoint: `http://localhost:3000/api/stripe/webhook` (for local testing)
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy the **Signing secret** (starts with `whsec_`)

##### E. Update .env.local with Stripe Credentials

```bash
nano .env.local

# Add Stripe credentials:
STRIPE_PUBLIC_KEY="pk_test_51..."
STRIPE_SECRET_KEY="sk_test_51..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

##### F. Install Stripe CLI (for local webhook testing)

```bash
# macOS
brew install stripe/stripe-cli/stripe

# Verify installation
stripe --version

# Login to your Stripe account
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/stripe/webhook
# Keep this running in a separate terminal
```

---

### 🚀 Running the Application

#### Step 14: Start All Services

You have multiple options to run the application:

##### Option A: Full Development Mode (Recommended)

This starts both the Next.js app and WebSocket server:

```bash
# From the project root directory
npm run dev:full
```

**Expected output:**
```
[0] ▲ Next.js 15.0.1
[0] - Local:        http://localhost:3000
[1] 🚀 Starting WebSocket server with TypeScript...
[1] WebSocket server running on port 8080
```

##### Option B: Run Services Separately

**Terminal 1 - Next.js App:**
```bash
npm run dev
```

**Terminal 2 - WebSocket Server:**
```bash
npm run websocket
```

**Terminal 3 - PDF Analyzer Service:**
```bash
cd pdf-analyzer-service
source venv/bin/activate
python main.py
```

**Terminal 4 - Stripe Webhook Listener:**
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

##### Option C: Production Build

```bash
# Build the application
npm run build

# Start production server
npm run start
```

#### Step 15: Access the Application

Open your browser and navigate to:

- **Main App:** http://localhost:3000
- **PDF Analyzer:** http://localhost:8001
- **WebSocket:** ws://localhost:8080
- **Database Studio:** http://localhost:5555 (if running `npm run db:studio`)

---

### ✅ Verification

#### Step 16: Test the Application

##### 1. Health Check

```bash
# Test Next.js app
curl http://localhost:3000/api/health

# Test PDF analyzer service
curl http://localhost:8001/health
```

##### 2. Sign Up for an Account

1. Go to http://localhost:3000
2. Click **Sign Up**
3. Fill in the form:
   - Name: Test User
   - Email: test@example.com
   - Password: SecurePassword123!
4. Click **Create Account**
5. You should be redirected to the dashboard

##### 3. Test API Key Generation

1. Go to **Dashboard**
2. Navigate to **API Keys** section
3. Click **Generate API Key**
4. Copy the generated key (starts with `sa_live_`)
5. Store it securely

##### 4. Test Video Upload (if AWS configured)

1. Go to **Dashboard** → **Analyze Video**
2. Upload a short video file (< 10MB)
3. Click **Analyze**
4. Wait for processing
5. View results

##### 5. Test PDF Analysis (if PDF service running)

1. Go to **PDF Analysis** page
2. Upload a PDF file
3. View sentiment analysis results

---

## 🔌 API Documentation

> **All endpoints require:**  
> `Authorization: Bearer sa_live_your_api_key_here`

### REST Endpoints (Next.js)

| Route | Method | Purpose | Auth |
|-------|--------|---------|------|
| `/api/upload-url` | `POST` | Generate S3 presigned URL for video uploads | API key (Bearer) |
| `/api/live-recording-upload` | `POST` | Persist live-recorded media chunks | API key |
| `/api/sentiment-inference` | `POST` | Trigger SageMaker video sentiment analysis | API key |
| `/api/pdf-analysis` | `POST` | Proxy PDF/Excel to FastAPI service | Session |
| `/api/live-emotion` | `POST` | Process recorded live detection sessions | Session |
| `/api/user/api-key` | `POST/DELETE` | Create or revoke user API keys | Session |
| `/api/user/quota` | `GET` | Inspect quota consumption | Session |
| `/api/stripe/checkout` | `POST` | Create Stripe checkout session for plan upgrades | Session |
| `/api/stripe/webhooks` | `POST` | Handle Stripe subscription events | Stripe |

### WebSocket Events

**Endpoint:** `ws://localhost:8080?token=<jwt>`

**Event Format:**
```json
{
  "type": "video_analysis",
  "emotion": "joy",
  "sentiment": "positive",
  "confidence": 0.92,
  "timestamp": 1734882712345
}
```

### Example API Calls

#### Get Upload URL
```bash
curl -X POST "http://localhost:3000/api/upload-url" \
  -H "Authorization: Bearer <api-key>" \
  -H "Content-Type: application/json" \
  -d '{"fileType":"video/mp4"}'
```

#### Start Sentiment Analysis
```bash
curl -X POST "http://localhost:3000/api/sentiment-inference" \
  -H "Authorization: Bearer <api-key>" \
  -H "Content-Type: application/json" \
  -d '{"key":"inference/video-id.mp4"}'
```

#### Analyze PDF
```bash
curl -X POST "http://localhost:8001/analyze-pdf" \
  -F "file=@document.pdf" \
  -F "mode=combined"
```

---

## 🎯 Feature Deep Dive

### Multimodal AI Pipeline

#### Text Processing (BERT)
- **Model**: BERT-base-uncased fine-tuned on emotional dialogue
- **Features**: Contextual embeddings, attention weights
- **Performance**: 72.5% accuracy (text-only baseline)

#### Video Processing (3D CNN)
- **Architecture**: Modified 3D ResNet with temporal modeling
- **Input**: 16 frames at 224x224 resolution
- **Features**: Spatiotemporal facial expression patterns
- **Performance**: 67.8% accuracy (video-only baseline)

#### Audio Processing (Mel-Spectrogram CNN)
- **Features**: Mel-frequency cepstral coefficients
- **Sampling**: 16kHz with 128 mel filters
- **Analysis**: Prosodic patterns, vocal intensity
- **Performance**: 63.4% accuracy (audio-only baseline)

#### Multimodal Fusion
- **Method**: Attention-based cross-modal fusion
- **Architecture**: Multi-head attention with learned weights
- **Performance**: **78.4% emotion accuracy, 85.2% sentiment accuracy**

---

## 🔧 Troubleshooting

### Database Issues

#### Error: Database doesn't exist

**Error:** `Error: P1003: Database does not exist`

**Solution:**
```bash
# Delete existing database
rm prisma/dev.db

# Recreate database
npm run db:push
```

#### Error: Prisma Client is out of sync

**Error:** `Error: @prisma/client did not initialize yet`

**Solution:**
```bash
# Regenerate Prisma client
npx prisma generate

# Restart application
npm run dev:full
```

### Port & Network Issues

#### Error: Port already in use

**Error:** `EADDRINUSE: address already in use :::3000`

**Solution:**
```bash
# Find and kill process on port 3000
lsof -ti:3000
kill -9 $(lsof -ti:3000)

# Or use a different port
PORT=3001 npm run dev
```

#### Error: WebSocket connection failed

**Error:** `WebSocket connection to 'ws://localhost:8080' failed`

**Solution:**
```bash
# Ensure WebSocket server is running
npm run websocket

# Or start full stack
npm run dev:full

# Check if port 8080 is available
lsof -ti:8080
```

### Python & Backend Issues

#### Error: Module not found (Python)

**Error:** `ModuleNotFoundError: No module named 'fastapi'`

**Solution:**
```bash
cd pdf-analyzer-service

# Ensure virtual environment is activated
source venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt

# Verify installation
pip list | grep fastapi
```

#### Error: spaCy model not found

**Error:** `Can't find model 'en_core_web_sm'`

**Solution:**
```bash
source venv/bin/activate
python -m spacy download en_core_web_sm
```

### AWS Issues

#### Error: Invalid AWS credentials

**Error:** `The security token included in the request is invalid`

**Solution:**
```bash
# Verify AWS credentials
aws sts get-caller-identity

# If error, reconfigure AWS CLI
aws configure

# Update .env.local with correct credentials
nano .env.local
```

#### Error: S3 bucket not found

**Error:** `NoSuchBucket: The specified bucket does not exist`

**Solution:**
```bash
# Create S3 bucket
aws s3 mb s3://your-bucket-name --region us-east-1

# Or verify bucket name in .env.local
cat .env.local | grep AWS_INFERENCE_BUCKET
```

### Stripe Issues

#### Error: Invalid API key

**Error:** `Error: Invalid API Key provided`

**Solution:**
```bash
# Verify Stripe keys in .env.local
cat .env.local | grep STRIPE

# Keys should start with:
# pk_test_ (public key)
# sk_test_ (secret key)
# whsec_ (webhook secret)

# Get fresh keys from: https://dashboard.stripe.com/test/apikeys
```

#### Error: Webhook signature verification failed

**Error:** `Webhook signature verification failed`

**Solution:**
```bash
# Start Stripe CLI listener
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Copy the webhook signing secret
# Update STRIPE_WEBHOOK_SECRET in .env.local

# Restart application
npm run dev:full
```

### General Debugging Tips

#### Reset Everything

```bash
# Nuclear option - reset everything
rm -rf node_modules .next prisma/dev.db
npm install
npm run db:push
npm run dev:full
```

#### Enable Debug Mode

```bash
# Enable Next.js debug mode
DEBUG=* npm run dev

# Enable Node.js debugging
NODE_OPTIONS='--inspect' npm run dev
```

---

## 🧪 Testing

```bash
# Run lint checks
npm run lint

# Fix linting errors
npm run lint:fix

# Type checking
npm run typecheck

# Format code
npm run format:write

# Run all checks
npm run check
```

---

## 🚀 Deployment

### Vercel (Recommended for Web)

1. Connect repository to Vercel
2. Set environment variables in Vercel dashboard
3. Use Vercel Postgres or Neon for production database
4. Deploy WebSocket server separately (AWS ECS, GCP Cloud Run, or Render)

### Docker / Self-Hosting

```dockerfile
# Dockerfile
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
# Build and run
docker build -t sentiment-app .
docker run -p 3000:3000 sentiment-app
```

---

## � Quick Reference

### Common Commands

#### Development

```bash
# Start everything (Next.js + WebSocket)
npm run dev:full

# Start Next.js only
npm run dev

# Start WebSocket only
npm run websocket

# Start Python service
cd pdf-analyzer-service && source venv/bin/activate && python main.py

# Database studio
npx prisma studio
```

#### Database

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Create migration
npx prisma migrate dev --name your_migration_name

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

#### Code Quality

```bash
# Lint code
npm run lint

# Fix lint issues
npm run lint:fix

# Type check
npm run type-check

# Format code
npm run format:write

# Check formatting
npm run format:check
```

#### Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Preview production build
npm run preview

# Deploy to Vercel
vercel --prod
```

### Port Reference

| Service | Port | URL |
|---------|------|-----|
| Next.js | 3000 | http://localhost:3000 |
| WebSocket | 8080 | ws://localhost:8080 |
| Python API | 8001 | http://localhost:8001 |
| Prisma Studio | 5555 | http://localhost:5555 |

### Project Structure Quick Reference

```
src/
├── app/
│   ├── api/          # API endpoints
│   ├── dashboard/    # Main dashboard
│   ├── live-detection/  # Live emotion capture
│   └── pdf-analysis/    # Document analysis
├── components/       # React components
├── lib/             # Utilities
│   ├── quota.ts     # Quota management
│   └── stripe.ts    # Stripe config
├── server/
│   ├── auth/        # NextAuth config
│   └── websocket/   # WebSocket server
└── styles/          # Global styles
```

### API Quick Reference

#### Get API Key

```bash
curl http://localhost:3000/api/user/api-key \
  -H "Cookie: next-auth.session-token=YOUR_SESSION"
```

#### Check Quota

```bash
curl http://localhost:3000/api/user/quota-status \
  -H "Authorization: Bearer YOUR_API_KEY"
```

#### Upload Video

```bash
# 1. Get upload URL
curl -X POST http://localhost:3000/api/upload-url \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"fileType": ".mp4"}'

# 2. Upload to S3
curl -X PUT "PRESIGNED_URL" --upload-file video.mp4

# 3. Analyze
curl -X POST http://localhost:3000/api/sentiment-inference \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"key": "inference/uuid.mp4"}'
```

---

## ✅ Installation Checklist

Use this checklist to track your setup progress:

### Pre-Installation

- [ ] Node.js 18+ installed (`node --version`)
- [ ] Python 3.10+ installed (`python3 --version`)
- [ ] Git installed (`git --version`)
- [ ] AWS account created
- [ ] Stripe account created (for payments)
- [ ] 8GB+ RAM available
- [ ] 5GB+ disk space available

### Project Setup

#### 1. Clone Repository
- [ ] Repository cloned: `git clone https://github.com/UtkarsHMer05/sentiment-analysis.git`
- [ ] Changed to project directory: `cd sentiment-analysis`

#### 2. Node.js Setup
- [ ] Dependencies installed: `npm install`
- [ ] No errors during installation
- [ ] `node_modules/` folder created

#### 3. Environment Configuration
- [ ] `.env.local` file created
- [ ] All environment variables filled out

#### 4. Database Setup
- [ ] Prisma client generated: `npx prisma generate`
- [ ] Database schema pushed: `npx prisma db push`
- [ ] `prisma/dev.db` created (for SQLite)

#### 5. Python Service Setup
- [ ] Changed to service directory: `cd pdf-analyzer-service`
- [ ] Setup script executed: `./setup.sh`
- [ ] Virtual environment created: `venv/` folder exists
- [ ] Dependencies installed successfully
- [ ] spaCy model downloaded: `en_core_web_sm`
- [ ] Health check passed: `curl http://localhost:8001/health`

### Environment Variables

#### Required Variables
- [ ] `DATABASE_URL` - Database connection string
- [ ] `AUTH_SECRET` - Generated with `openssl rand -base64 32`
- [ ] `NEXTAUTH_URL` - Set to `http://localhost:3000`
- [ ] `AWS_REGION` - AWS region (e.g., `us-east-1`)
- [ ] `AWS_ACCESS_KEY_ID` - Your AWS access key
- [ ] `AWS_SECRET_ACCESS_KEY` - Your AWS secret key
- [ ] `AWS_INFERENCE_BUCKET` - S3 bucket name
- [ ] `AWS_ENDPOINT_NAME` - SageMaker endpoint name
- [ ] `STRIPE_PUBLIC_KEY` - Stripe publishable key
- [ ] `STRIPE_SECRET_KEY` - Stripe secret key

#### Optional Variables
- [ ] `STRIPE_WEBHOOK_SECRET` - For Stripe webhooks
- [ ] `PYTHON_BACKEND_URL` - Python service URL (default: `http://localhost:8001`)
- [ ] `NODE_ENV` - Set to `development` or `production`

### AWS Setup

#### S3 Bucket
- [ ] S3 bucket created
- [ ] Bucket name added to `.env.local`
- [ ] CORS configuration applied
- [ ] Test upload successful

#### IAM User
- [ ] IAM user created with programmatic access
- [ ] Permissions attached (AmazonS3FullAccess, AmazonSageMakerFullAccess)
- [ ] Access keys generated
- [ ] Keys added to `.env.local`

#### SageMaker Endpoint
- [ ] ML model deployed to SageMaker (or using existing endpoint)
- [ ] Endpoint name added to `.env.local`
- [ ] Test inference successful

### Stripe Setup

- [ ] Stripe account created
- [ ] Test mode keys obtained
- [ ] Keys added to `.env.local`
- [ ] Webhook endpoint created (for production)
- [ ] Webhook secret added (if applicable)

### Service Verification

#### Next.js Server
- [ ] Server starts: `npm run dev`
- [ ] Accessible at `http://localhost:3000`
- [ ] No console errors
- [ ] Landing page loads

#### WebSocket Server
- [ ] Server starts: `npm run websocket`
- [ ] Listening on port 8080
- [ ] No connection errors

#### Python Service
- [ ] Service starts: `python main.py` (in pdf-analyzer-service)
- [ ] Accessible at `http://localhost:8001`
- [ ] Health check returns: `{"status": "healthy"}`
- [ ] All models loaded successfully

#### Database
- [ ] Prisma Studio opens: `npx prisma studio`
- [ ] Can view tables
- [ ] No connection errors

### Functionality Tests

#### Authentication
- [ ] Signup page accessible at `/signup`
- [ ] Can create new account
- [ ] Login page accessible at `/login`
- [ ] Can login with credentials
- [ ] Dashboard accessible after login

#### Video Analysis
- [ ] Can access dashboard at `/dashboard`
- [ ] Can request upload URL
- [ ] Can upload test video
- [ ] Can trigger analysis
- [ ] Results displayed correctly

#### Live Detection
- [ ] Can access `/live-detection`
- [ ] Camera permission granted
- [ ] Can start/stop recording
- [ ] Can upload recording
- [ ] Results displayed on `/live-results`

#### PDF Analysis
- [ ] Can access `/pdf-analysis`
- [ ] Can upload PDF file
- [ ] Analysis completes successfully
- [ ] Results include sentiment + wordcloud

#### API Access
- [ ] Can retrieve API key from dashboard
- [ ] API key works with endpoints
- [ ] Quota tracking functions correctly
- [ ] Rate limiting works

### Production Readiness

#### Security
- [ ] All `.env` files in `.gitignore`
- [ ] Strong `AUTH_SECRET` generated
- [ ] AWS credentials secured
- [ ] Stripe keys secured
- [ ] HTTPS enabled (production)

#### Performance
- [ ] Production build successful: `npm run build`
- [ ] No build errors
- [ ] Bundle size acceptable
- [ ] Page load times < 3 seconds

#### Database
- [ ] Using PostgreSQL for production (not SQLite)
- [ ] Database migrations applied
- [ ] Backups configured
- [ ] Connection pooling configured

#### Monitoring
- [ ] Error tracking setup (e.g., Sentry)
- [ ] Logging configured
- [ ] Health checks implemented
- [ ] Alerts configured

#### Deployment
- [ ] Environment variables set in hosting platform
- [ ] Python service deployed separately
- [ ] WebSocket server configured
- [ ] CDN configured
- [ ] Domain configured with SSL

### Common Issues Check

If something isn't working, verify:

- [ ] All services are running (Next.js, WebSocket, Python)
- [ ] `.env.local` file exists and is complete
- [ ] No typos in environment variables
- [ ] Ports 3000, 8001, and 8080 are not in use by other apps
- [ ] Node modules are installed
- [ ] Python virtual environment is activated
- [ ] Database is accessible
- [ ] AWS credentials are valid
- [ ] Internet connection is stable

---

## �🛣️ Roadmap

- [x] Modern dashboard UI
- [x] Live analysis
- [x] Quota/keys billing
- [x] PDF/Excel sentiment analysis
- [ ] Mobile app (React Native)
- [ ] GraphQL API
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] AR/VR integration

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

</div>
