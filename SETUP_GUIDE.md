# 🚀 Complete Setup Guide - Sentiment Analysis Platform

This guide will walk you through setting up and running the entire Sentiment Analysis Platform from scratch.

---

## 📋 Table of Contents

1. [Prerequisites](#-prerequisites)
2. [Initial Setup](#-initial-setup)
3. [Environment Configuration](#-environment-configuration)
4. [Database Setup](#-database-setup)
5. [Python Backend Setup](#-python-backend-setup)
6. [AWS Configuration](#-aws-configuration)
7. [Stripe Configuration](#-stripe-configuration)
8. [Running the Application](#-running-the-application)
9. [Verification](#-verification)
10. [Troubleshooting](#-troubleshooting)

---

## 🔧 Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (v10.2.4 or higher) - Comes with Node.js
- **Python** (v3.10 or higher) - [Download](https://www.python.org/downloads/)
- **pip** (Python package manager) - Comes with Python
- **Git** - [Download](https://git-scm.com/)

### Optional but Recommended

- **VSCode** - [Download](https://code.visualstudio.com/)
- **Postman** - For API testing - [Download](https://www.postman.com/)

### Required Accounts

- **AWS Account** - For SageMaker and S3 services
- **Stripe Account** - For payment processing
- **GitHub Account** - For version control

### Verify Installations

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

## 📥 Initial Setup

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/UtkarsHMer05/sentiment-analysis.git

# Navigate to the project directory
cd sentiment-analysis

# Verify you're in the correct directory
ls -la
# You should see package.json, README.md, etc.
```

### Step 2: Install Node.js Dependencies

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

## ⚙️ Environment Configuration

### Step 3: Create Environment File

```bash
# Copy the example environment file
cp .env.example .env.local

# Open the file for editing
nano .env.local
# Or use your preferred editor: code .env.local
```

### Step 4: Configure Environment Variables

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

### Step 5: Generate AUTH_SECRET

```bash
# Generate a secure random secret
openssl rand -base64 32

# Copy the output and paste it as AUTH_SECRET in .env.local
```

---

## 🗄️ Database Setup

### Step 6: Initialize Database

```bash
# Option A: Push schema to database (recommended for development)
npm run db:push

# Option B: Create and run migrations (recommended for production)
npm run db:generate

# Expected output:
# ✔ Generated Prisma Client
# ✔ Database schema applied successfully
```

### Step 7: Verify Database Setup

```bash
# Open Prisma Studio to view your database
npm run db:studio

# This will open http://localhost:5555 in your browser
# You should see your database tables:
# - User, Account, Session, ApiQuota, VideoFile, Purchase, Post
```

**Database is now ready!** 🎉

---

## 🐍 Python Backend Setup

The PDF Analyzer Service provides sentiment analysis capabilities for PDF documents.

### Step 8: Navigate to PDF Analyzer Service

```bash
# From the project root directory
cd pdf-analyzer-service
```

### Step 9: Run Setup Script

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

### Step 10: Verify Python Installation

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

### Step 11: Return to Project Root

```bash
# Open a new terminal window/tab
cd ..
# You should now be back in the sentiment-analysis directory
```

---

## ☁️ AWS Configuration

### Step 12: Set Up AWS Services

#### A. Create AWS Account
1. Go to [AWS Console](https://aws.amazon.com/)
2. Sign up for a free account or sign in

#### B. Create IAM User with Permissions
1. Navigate to **IAM** → **Users** → **Add User**
2. Username: `sentiment-analysis-app`
3. Access type: **Programmatic access**
4. Permissions: Attach policies:
   - `AmazonS3FullAccess`
   - `AmazonSageMakerFullAccess`
5. **Save the Access Key ID and Secret Access Key** - you'll need these!

#### C. Create S3 Bucket
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

#### D. Deploy SageMaker Endpoint (Optional for MVP)

**Note:** For initial development, you can skip SageMaker and use local inference.

If you want to use SageMaker:
1. Navigate to **SageMaker** → **Endpoints** → **Create endpoint**
2. Upload your trained model to S3
3. Create endpoint configuration
4. Deploy endpoint
5. Copy the endpoint name to your `.env.local`

#### E. Update .env.local with AWS Credentials

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

## 💳 Stripe Configuration

### Step 13: Set Up Stripe

#### A. Create Stripe Account
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Sign up for a free account
3. Activate your account (you can use test mode initially)

#### B. Get API Keys
1. In Stripe Dashboard, go to **Developers** → **API keys**
2. Copy your **Publishable key** (starts with `pk_test_`)
3. Copy your **Secret key** (starts with `sk_test_`)

#### C. Create Products and Prices
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

#### D. Set Up Webhooks
1. Go to **Developers** → **Webhooks**
2. Add endpoint: `http://localhost:3000/api/stripe/webhook` (for local testing)
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy the **Signing secret** (starts with `whsec_`)

#### E. Update .env.local with Stripe Credentials

```bash
nano .env.local

# Add Stripe credentials:
STRIPE_PUBLIC_KEY="pk_test_51..."
STRIPE_SECRET_KEY="sk_test_51..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

#### F. Install Stripe CLI (for local webhook testing)

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

## 🚀 Running the Application

### Step 14: Start All Services

You have multiple options to run the application:

#### Option A: Full Development Mode (Recommended)

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

#### Option B: Run Services Separately

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

#### Option C: Production Build

```bash
# Build the application
npm run build

# Start production server
npm run start
```

### Step 15: Access the Application

Open your browser and navigate to:

- **Main App:** http://localhost:3000
- **PDF Analyzer:** http://localhost:8001
- **WebSocket:** ws://localhost:8080
- **Database Studio:** http://localhost:5555 (if running `npm run db:studio`)

---

## ✅ Verification

### Step 16: Test the Application

#### 1. Health Check

```bash
# Test Next.js app
curl http://localhost:3000/api/health

# Test PDF analyzer service
curl http://localhost:8001/health
```

#### 2. Sign Up for an Account

1. Go to http://localhost:3000
2. Click **Sign Up**
3. Fill in the form:
   - Name: Test User
   - Email: test@example.com
   - Password: SecurePassword123!
4. Click **Create Account**
5. You should be redirected to the dashboard

#### 3. Test API Key Generation

1. Go to **Dashboard**
2. Navigate to **API Keys** section
3. Click **Generate API Key**
4. Copy the generated key (starts with `sa_live_`)
5. Store it securely

#### 4. Test Video Upload (if AWS configured)

1. Go to **Dashboard** → **Analyze Video**
2. Upload a short video file (< 10MB)
3. Click **Analyze**
4. Wait for processing
5. View results

#### 5. Test PDF Analysis (if PDF service running)

1. Go to **PDF Analysis** page
2. Upload a PDF file
3. View sentiment analysis results

---

## 🐛 Troubleshooting

### Common Issues and Solutions

#### Issue 1: Database Connection Error

**Error:** `Error: P1003: Database does not exist`

**Solution:**
```bash
# Delete existing database
rm prisma/dev.db

# Recreate database
npm run db:push
```

#### Issue 2: Port Already in Use

**Error:** `EADDRINUSE: address already in use :::3000`

**Solution:**
```bash
# Find process using port 3000
lsof -ti:3000

# Kill the process
kill -9 $(lsof -ti:3000)

# Or use a different port
PORT=3001 npm run dev
```

#### Issue 3: Python Dependencies Not Found

**Error:** `ModuleNotFoundError: No module named 'fastapi'`

**Solution:**
```bash
cd pdf-analyzer-service
source venv/bin/activate
pip install -r requirements.txt
```

#### Issue 4: Prisma Client Out of Sync

**Error:** `Error: @prisma/client did not initialize yet`

**Solution:**
```bash
# Regenerate Prisma client
npx prisma generate

# Restart the application
npm run dev
```

#### Issue 5: AWS Credentials Invalid

**Error:** `The security token included in the request is invalid`

**Solution:**
```bash
# Verify AWS credentials
aws sts get-caller-identity

# If error, reconfigure AWS CLI
aws configure
```

#### Issue 6: Stripe Webhook Signature Verification Failed

**Error:** `Webhook signature verification failed`

**Solution:**
```bash
# Ensure Stripe CLI is running
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Copy the webhook signing secret
# Update STRIPE_WEBHOOK_SECRET in .env.local
```

#### Issue 7: Node Version Mismatch

**Error:** `The engine "node" is incompatible`

**Solution:**
```bash
# Check your Node.js version
node --version

# Install Node Version Manager (nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install and use Node.js 18
nvm install 18
nvm use 18
```

#### Issue 8: Build Errors

**Error:** Various TypeScript compilation errors

**Solution:**
```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules and reinstall
rm -rf node_modules
npm install

# Run type check
npm run typecheck

# Rebuild
npm run build
```

---

## 🔄 Daily Development Workflow

Once everything is set up, use these commands:

```bash
# Start development (one command)
npm run dev:full

# Or start services individually:

# Terminal 1: Next.js
npm run dev

# Terminal 2: WebSocket
npm run websocket:dev

# Terminal 3: PDF Analyzer (if needed)
cd pdf-analyzer-service && source venv/bin/activate && python main.py

# Terminal 4: Stripe webhooks (if testing payments)
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Terminal 5: Database viewer (if needed)
npm run db:studio
```

---

## 📚 Additional Commands

```bash
# Linting and Formatting
npm run lint              # Check for linting errors
npm run lint:fix          # Fix linting errors automatically
npm run format:check      # Check code formatting
npm run format:write      # Format code automatically
npm run typecheck         # Check TypeScript types

# Database Commands
npm run db:push           # Push schema changes to database
npm run db:generate       # Generate Prisma client and create migration
npm run db:migrate        # Run migrations in production
npm run db:studio         # Open Prisma Studio

# Testing
npm test                  # Run tests (if configured)
npm run test:coverage     # Run tests with coverage

# Building and Running
npm run build             # Build for production
npm run start             # Start production server
npm run preview           # Build and start production server

# Checking
npm run check             # Run lint and typecheck together
```

---

## 🎯 Next Steps

After successful setup:

1. **Explore the Dashboard** - Familiarize yourself with the UI
2. **Test All Features** - Try video upload, PDF analysis, live detection
3. **Read API Documentation** - Test API endpoints with Postman
4. **Customize Settings** - Adjust configuration as needed
5. **Deploy to Production** - Follow deployment guide for Vercel/AWS

---

## 📞 Getting Help

If you encounter issues:

1. **Check Troubleshooting Section** - Most common issues are covered
2. **Review Logs** - Check terminal output for error messages
3. **Verify Environment** - Ensure all environment variables are correct
4. **GitHub Issues** - [Report bugs](https://github.com/UtkarsHMer05/sentiment-analysis/issues)
5. **Email Support** - utkarshkhajuria7@gmail.com

---

## ✅ Setup Checklist

Use this checklist to track your progress:

- [ ] Prerequisites installed (Node.js, Python, Git)
- [ ] Repository cloned
- [ ] Node.js dependencies installed
- [ ] `.env.local` created and configured
- [ ] AUTH_SECRET generated
- [ ] Database initialized and schema pushed
- [ ] Python virtual environment created
- [ ] PDF analyzer dependencies installed
- [ ] AWS account created and configured
- [ ] S3 bucket created
- [ ] IAM user created with proper permissions
- [ ] Stripe account created
- [ ] Stripe products created
- [ ] Stripe webhooks configured
- [ ] Application running locally
- [ ] Sign up/login tested
- [ ] API key generation tested
- [ ] Video upload tested (if AWS configured)
- [ ] PDF analysis tested (if service running)

---

**Congratulations! 🎉 Your Sentiment Analysis Platform is now up and running!**

For deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md) (if available).

---

*Last updated: January 2025*
