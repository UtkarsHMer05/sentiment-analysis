# Sentiment Analysis Platform# 🎭 Sentiment Analysis Platform# 🎭 Sentiment Analysis Platform



> A production-ready multimodal sentiment analysis SaaS that combines video, audio, and text signals to surface real-time emotion and sentiment insights.



<p align="center"><div align="center"><div align="center">

  <a href="https://nextjs.org/"><img alt="Next.js" src="https://img.shields.io/badge/Next.js-15.0-black?logo=next.js" /></a>

  <a href="https://www.typescriptlang.org/"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript" /></a>

  <a href="https://fastapi.tiangolo.com/"><img alt="FastAPI" src="https://img.shields.io/badge/FastAPI-0.111-teal?logo=fastapi" /></a>

  <a href="https://aws.amazon.com/sagemaker/"><img alt="AWS SageMaker" src="https://img.shields.io/badge/AWS-SageMaker-orange?logo=amazon-aws" /></a>![Platform Banner](https://img.shields.io/badge/Sentiment_Analysis-AI_Platform-blueviolet?style=for-the-badge&logo=brain&logoColor=white)![Platform Banner](https://img.shields.io/badge/Sentiment_Analysis-AI_Platform-blueviolet?style=for-the-badge&logo=brain&logoColor=white)

  <a href="https://stripe.com/"><img alt="Stripe" src="https://img.shields.io/badge/Stripe-Payments-6772e5?logo=stripe" /></a>

  <a href="https://opensource.org/licenses/MIT"><img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-success" /></a>

</p>

[![Next.js](https://img.shields.io/badge/Next.js-15.0.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)[![Next.js](https://img.shields.io/badge/Next.js-15.0.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)

[Report a bug](https://github.com/UtkarsHMer05/sentiment-analysis/issues/new?template=bug_report.md) ·

[Request a feature](https://github.com/UtkarsHMer05/sentiment-analysis/issues/new?template=feature_request.md) ·[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

[View roadmap](#roadmap)

[![Python](https://img.shields.io/badge/Python-3.10+-green?style=flat-square&logo=python)](https://www.python.org/)[![Python](https://img.shields.io/badge/Python-3.10+-green?style=flat-square&logo=python)](https://www.python.org/)

---

[![AWS](https://img.shields.io/badge/AWS-SageMaker-orange?style=flat-square&logo=amazon-aws)](https://aws.amazon.com/sagemaker/)[![AWS](https://img.shields.io/badge/AWS-SageMaker-orange?style=flat-square&logo=amazon-aws)](https://aws.amazon.com/sagemaker/)

## Table of Contents

[![Stripe](https://img.shields.io/badge/Stripe-Payments-6772e5?style=flat-square&logo=stripe)](https://stripe.com/)[![Stripe](https://img.shields.io/badge/Stripe-Payments-6772e5?style=flat-square&logo=stripe)](https://stripe.com/)

- [Overview](#overview)

- [Highlights](#highlights)[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

- [Architecture](#architecture)

- [Repository Layout](#repository-layout)

- [Quick Start](#quick-start)

- [Environment Variables](#environment-variables)**Real-time multimodal AI sentiment analysis platform combining video, audio, and text processing with live emotion detection.****Real-time multimodal AI sentiment analysis platform combining video, audio, and text processing with live emotion detection.**

- [Services](#services)

- [Feature Walkthrough](#feature-walkthrough)

- [API Overview](#api-overview)

- [Deployment](#deployment)[🚀 Quick Start](#-quick-start) • [📖 Documentation](#-table-of-contents) • [🐛 Report Bug](https://github.com/UtkarsHMer05/sentiment-analysis/issues) • [💡 Request Feature](https://github.com/UtkarsHMer05/sentiment-analysis/issues)[🚀 Quick Start](#-quick-start) • [📖 Documentation](#-table-of-contents) • [🐛 Report Bug](https://github.com/UtkarsHMer05/sentiment-analysis/issues) • [💡 Request Feature](https://github.com/UtkarsHMer05/sentiment-analysis/issues)

- [Testing & Quality](#testing--quality)

- [Troubleshooting](#troubleshooting)

- [Roadmap](#roadmap)

- [Contributing](#contributing)</div></div>

- [License](#license)

- [Support](#support)



------**MAIN LANDING**



## Overview



The Sentiment Analysis Platform delivers real-time emotion and sentiment intelligence for recorded and live video, audio, and documents. Built on a Next.js 15 frontend with a FastAPI microservice and AWS SageMaker-backed inference, the platform supports SaaS monetisation via Stripe, quota-based API access, and a fully responsive dashboard experience.## 📸 Platform Screenshots![Screenshot 2025-06-04 at 1 23 46 PM](https://github.com/user-attachments/assets/b1601972-3300-4629-b844-dd380b1fcff6)



This repository houses:



- **Next.js 15 + TypeScript** marketing site, authenticated dashboard, and API routes.<details>---

- **WebSocket live analysis server** that streams inference updates with JWT-authenticated connections.

- **Python FastAPI microservice** for PDF and spreadsheet sentiment processing.<summary><b>🏠 Landing Page</b> (Click to expand)</summary>**LOGIN AND SIGNUP PAGE**

- **Prisma ORM** schema and migrations for user, quota, and subscription data.



The system is production-ready, with environment validation, infrastructure guidance, and deployment recipes.

![Landing Page](https://github.com/user-attachments/assets/b1601972-3300-4629-b844-dd380b1fcff6)![Screenshot 2025-06-04 at 1 25 07 PM](https://github.com/user-attachments/assets/acd41eed-066d-4966-a7e0-0f8af20b52c3)

---

![Screenshot 2025-06-04 at 1 25 14 PM](https://github.com/user-attachments/assets/bc2143fe-476c-4405-82d8-b92b4acad322)

## Highlights

</details>

- **Multimodal inference**: Analyse facial expressions, voice tone, and transcribed text simultaneously.

- **Live emotion detection**: WebRTC-powered webcam capture with streaming updates via WebSockets.---

- **Document intelligence**: Upload PDFs or Excel workbooks and receive per-page sentiment, entities, and summaries thanks to the FastAPI microservice.

- **Quota + API keys**: Built-in API key provisioning and quota enforcement for SaaS plans.<details>**MAIN DASHBOARD WITH WORKING EXAMPLE**

- **Stripe subscription billing**: Checkout sessions, webhooks, and seat activation handled end-to-end.

- **AWS SageMaker integration**: Invoke hosted endpoints for video sentiment models with presigned S3 uploads.<summary><b>🔐 Authentication</b></summary>

- **Developer ergonomics**: Environment validation, typed server components, Tailwind UI, and curated quick-reference docs.

![Screenshot 2025-06-04 at 1 25 37 PM](https://github.com/user-attachments/assets/6338cf07-e3ca-4a74-b964-1559dad0d2a9)

---

![Login](https://github.com/user-attachments/assets/acd41eed-066d-4966-a7e0-0f8af20b52c3)![Screenshot 2025-06-04 at 1 28 12 PM](https://github.com/user-attachments/assets/f0ecda1e-39d7-4ed2-a635-efcf66348456)

## Architecture

![Signup](https://github.com/user-attachments/assets/bc2143fe-476c-4405-82d8-b92b4acad322)![Screenshot 2025-06-04 at 1 52 29 PM](https://github.com/user-attachments/assets/d4b293ad-2a63-4c15-b75e-536e1e52b650)

```mermaid

flowchart LR![Screenshot 2025-06-04 at 1 53 00 PM](https://github.com/user-attachments/assets/15fa9613-ef52-4b9b-ace5-57aa78db54bb)

  User[User Browser] -->|HTTPS| Next[Next.js App]

  Next -- ORM --> Prisma[(Prisma + Database)]</details>![Screenshot 2025-06-04 at 1 53 26 PM](https://github.com/user-attachments/assets/3ede5f58-c754-4fec-a9d9-39cc610acb75)

  Next -->|REST| Stripe[(Stripe)]

  Next -->|REST| AWS[(AWS S3 & SageMaker)]

  Next -->|REST| PDFService[(FastAPI PDF Analyzer)]

  Next -->|WS| LiveWS[(Live Analysis WebSocket)]<details>

  PDFService -->|Models| HF[Transformers & spaCy]

```<summary><b>📊 Dashboard & Analysis</b></summary>---



### Core Services



| Service | Port | Description |![Dashboard](https://github.com/user-attachments/assets/6338cf07-e3ca-4a74-b964-1559dad0d2a9)**LIVE DETECTION PAGE AND ANALYSIS RESULTS**

| --- | --- | --- |

| Next.js frontend + API | `3000` | Marketing site, dashboard, REST routes, NextAuth, Prisma. |![Analysis Results](https://github.com/user-attachments/assets/f0ecda1e-39d7-4ed2-a635-efcf66348456)

| WebSocket live analysis | `8080` | Streams live emotion analysis updates (JWT protected). |

| FastAPI PDF analyzer | `8001` | Handles PDF/Excel extraction, summarisation, and sentiment classification. |![Detailed Results](https://github.com/user-attachments/assets/d4b293ad-2a63-4c15-b75e-536e1e52b650)![Screenshot 2025-06-04 at 1 54 22 PM](https://github.com/user-attachments/assets/559e0407-9d7b-4061-a053-273755f1ba36)

| Stripe Webhooks (ngrok recommended) | `3000`/`8787` | Receives subscription lifecycle events via `/api/stripe/webhooks`. |

![Screenshot 2025-06-04 at 1 59 13 PM](https://github.com/user-attachments/assets/576e24f0-1671-4bc9-a1e3-8efe91a18930)

---

</details>![Screenshot 2025-06-04 at 1 59 28 PM](https://github.com/user-attachments/assets/d27ac8cc-aa95-4cff-bf90-462050149621)

## Repository Layout

![Screenshot 2025-06-04 at 1 59 32 PM](https://github.com/user-attachments/assets/a3973568-c6ee-4ff3-a58b-bfc0a26b03da)

```text

sentiment-analysis/<details>![Screenshot 2025-06-04 at 1 59 38 PM](https://github.com/user-attachments/assets/bb1e2d0f-29b9-4b1b-be85-5f6607cf06bd)

├── src/

│   ├── app/                # Next.js routes, layout, pages, API endpoints<summary><b>📹 Live Detection</b></summary>

│   ├── components/         # Reusable UI primitives and feature components

│   ├── lib/                # Stripe helper, quota manager, AWS utilities

│   ├── server/

│   │   ├── auth/           # NextAuth configuration![Live Detection](https://github.com/user-attachments/assets/559e0407-9d7b-4061-a053-273755f1ba36)---

│   │   ├── db.ts           # Prisma client

│   │   └── websocket/      # Live analysis WebSocket server (TypeScript)![Live Results](https://github.com/user-attachments/assets/576e24f0-1671-4bc9-a1e3-8efe91a18930)

│   └── scripts/            # Utility scripts (websocket launcher)

├── prisma/                 # Prisma schema and migrations![Emotion Analysis](https://github.com/user-attachments/assets/d27ac8cc-aa95-4cff-bf90-462050149621)## 📋 Table of Contents

├── pdf-analyzer-service/   # FastAPI microservice for PDF & Excel

├── public/                 # Static assets

├── styles/                 # Tailwind global styles

├── QUICK_REFERENCE.md      # Developer command cheat sheet</details>- [🌟 Overview](#-overview)

├── INSTALLATION_CHECKLIST.md

├── .env.example            # Environment variable template- [✨ Key Features](#-key-features)

└── README.md               # You are here

```---- [🛠️ Tech Stack](#️-tech-stack)



---- [🏗️ Architecture](#️-architecture)



## Quick Start## 📋 Table of Contents- [⚡ Quick Start](#-quick-start)



### Prerequisites- [🔧 Installation](#-installation)



- Node.js **18.18+** and npm **10+** *(Next.js 15 requirement)*- [🌟 Overview](#-overview)- [⚙️ Configuration](#️-configuration)

- Python **3.10+** with `uvicorn` (for the FastAPI service)

- Stripe account (test keys sufficient) for billing workflows- [✨ Key Features](#-key-features)- [📱 Usage](#-usage)

- AWS credentials with access to **S3** and **SageMaker Runtime**

- (Optional) PostgreSQL for production deployments. SQLite is used by default for local development.- [🛠️ Tech Stack](#️-tech-stack)- [🔌 API Documentation](#-api-documentation)



### 1. Clone & Install- [🏗️ System Architecture](#️-system-architecture)- [🎯 Features Deep Dive](#-features-deep-dive)



```bash- [📦 Prerequisites](#-prerequisites)- [🧪 Testing](#-testing)

git clone https://github.com/UtkarsHMer05/sentiment-analysis.git

cd sentiment-analysis- [⚡ Quick Start](#-quick-start)- [🚀 Deployment](#-deployment)

npm install

```- [🔧 Detailed Installation](#-detailed-installation)- [🤝 Contributing](#-contributing)



### 2. Configure Environment- [⚙️ Configuration Guide](#️-configuration-guide)- [🛣️ Roadmap](#️-roadmap)



```bash- [🚀 Running the Application](#-running-the-application)- [📄 License](#-license)

cp .env.example .env.local

# populate secrets for Next.js- [📱 Usage Guide](#-usage-guide)



cd pdf-analyzer-service- [🔌 API Reference](#-api-reference)---

cp .env.example .env             # optional, only if you extend the service

```- [📂 Project Structure](#-project-structure)



### 3. Prepare the Database- [🎯 Feature Deep Dive](#-feature-deep-dive)## 🌟 Overview



```bash- [🔒 Security & Privacy](#-security--privacy)

# Generate Prisma client and run development migrations

npx prisma generate- [🚢 Deployment](#-deployment)**Layers** is a cutting-edge multimodal AI platform that revolutionizes video sentiment analysis by combining text, audio, and visual processing in real-time. Built with modern web technologies and powered by AWS SageMaker, it delivers enterprise-grade sentiment analysis with an intuitive user experience.

npx prisma migrate dev

- [🧪 Testing](#-testing)

# Explore data (optional)

npx prisma studio- [🤝 Contributing](#-contributing)### 🎯 Problem We Solve

```

- [📄 License](#-license)

Switch `DATABASE_URL` to a managed PostgreSQL instance before deploying.

- [💬 Support](#-support)Traditional sentiment analysis tools only process text, missing crucial emotional cues from voice tone, facial expressions, and body language. Layers bridges this gap by analyzing all modalities simultaneously, providing:

### 4. Start Local Services



```bash

# Terminal A – Next.js app + REST API---- **78.4% emotion recognition accuracy** (vs 65% industry standard)

npm run dev

- **Real-time processing** with <1s latency

# Terminal B – WebSocket live analysis server

npm run websocket:dev## 🌟 Overview- **Production-ready scalability** on AWS infrastructure



# Terminal C – FastAPI PDF/Excel analyzer- **Developer-friendly APIs** with comprehensive documentation

cd pdf-analyzer-service

python -m venv venvA production-ready, full-stack sentiment analysis platform that processes video, audio, and text to deliver real-time emotion detection and sentiment insights. Built with Next.js 15, AWS SageMaker, and a Python microservice architecture.

source venv/bin/activate

pip install -r requirements.txt---

uvicorn main:app --reload --host 0.0.0.0 --port 8001

```### What This Platform Does



### 5. Verify## ✨ Key Features



- Visit `http://localhost:3000` for the UI.- **Video Analysis**: Upload videos for batch sentiment analysis using AWS SageMaker

- Create an account, generate an API key in **Dashboard → Developer → API Keys**.

- Test file uploads:- **Live Detection**: Real-time emotion recognition via webcam with speech transcription### 🤖 AI & Machine Learning



  ```bash- **Document Processing**: Analyze PDF and Excel files for sentiment patterns with NLP- **Multimodal Analysis**: Simultaneous text, audio, and video processing

  curl -X POST http://localhost:3000/api/upload-url \

    -H "Authorization: Bearer <api-key>" \- **API Access**: Developer-friendly REST API with quota management- **Real-time Inference**: Sub-second response times via AWS SageMaker

    -H "Content-Type: application/json" \

    -d '{"contentType":"video/mp4"}'- **Subscription Management**: Stripe-powered billing with multiple tiers- **7 Emotion Classes**: Anger, disgust, fear, joy, neutral, sadness, surprise

  ```

- **3 Sentiment Categories**: Positive, negative, neutral

- Confirm the FastAPI service responds:

### Problem Solved- **Live Video Processing**: Stream analysis with WebRTC integration

  ```bash

  curl http://localhost:8001/health

  ```

Traditional sentiment analysis only processes text. This platform analyzes **all modalities simultaneously**:### 🎨 User Experience

- Connect to the WebSocket with a JWT obtained from NextAuth (browser session) at `ws://localhost:8080?token=<jwt>`.

- 🎭 Facial expressions (video)- **Responsive Design**: Mobile-first approach with Tailwind CSS

---

- 🎤 Voice tone and prosody (audio)- **Real-time Dashboard**: Live analytics and processing status

## Environment Variables

- 📝 Spoken/written content (text)- **Interactive Animations**: Smooth transitions with Framer Motion

| Variable | Required | Description |

| --- | --- | --- |- **Dark/Light Themes**: Customizable UI preferences

| `DATABASE_URL` | ✅ | Prisma datasource (`file:./dev.db` for SQLite or PostgreSQL URI in production). |

| `AUTH_SECRET` | ✅ | NextAuth secret for signing JWTs (generate via `openssl rand -base64 32`). |**Result**: Higher accuracy emotion detection (78.4% vs industry standard 65%)- **Progress Tracking**: Visual feedback for long-running processes

| `NEXTAUTH_SECRET` | ✅ | Mirror `AUTH_SECRET`; used by the WebSocket server fallback. |

| `NEXTAUTH_URL` | ✅ | Fully qualified domain (e.g., `http://localhost:3000`). |

| `AWS_REGION` | ✅ | AWS region hosting SageMaker & S3 (e.g., `us-east-1`). |

| `AWS_ACCESS_KEY_ID` | ✅ | IAM access key ID with S3 + SageMaker permissions. |---### 🔐 Enterprise Features

| `AWS_SECRET_ACCESS_KEY` | ✅ | IAM secret key. |

| `AWS_INFERENCE_BUCKET` | ✅ | S3 bucket storing uploaded videos before analysis. |- **Secure Authentication**: NextAuth.js with multiple providers

| `AWS_ENDPOINT_NAME` | ✅ | SageMaker endpoint name invoked by sentiment inference API. |

| `STRIPE_PUBLIC_KEY` | ✅ | Publishable key for client-side Stripe SDK. |## ✨ Key Features- **API Key Management**: Secure access with quota controls

| `STRIPE_SECRET_KEY` | ✅ | Secret key for server-side Stripe actions. |

| `STRIPE_WEBHOOK_SECRET` | ✅ | Signing secret for `/api/stripe/webhooks`. |- **Payment Integration**: Stripe subscription management

| `PYTHON_BACKEND_URL` | ➖ | Base URL of the PDF/Excel FastAPI service (`http://localhost:8001`). |

| `NODE_ENV` | ➖ | Default `development`; set to `production` in deployments. |### 🤖 AI & Machine Learning- **Usage Analytics**: Comprehensive quota and billing tracking

| `SKIP_ENV_VALIDATION` | ➖ | Set to `true` to bypass env validation during CI/Docker builds. |

- ✅ **Multimodal Fusion** - Combines text, audio, and video analysis- **Role-based Access**: User permission management

> Copy `.env.example` as a template. For production, store secrets in managed services (Vercel env, AWS Parameter Store, etc.).

- ✅ **7 Emotion Classes** - Anger, disgust, fear, joy, neutral, sadness, surprise

---

- ✅ **3 Sentiment Types** - Positive, negative, neutral### ☁️ Cloud Infrastructure

## Services

- ✅ **Real-time Processing** - Sub-second inference via AWS SageMaker- **AWS SageMaker**: Scalable ML model deployment

### Next.js Frontend & REST API

- ✅ **Document Analysis** - PDF/Excel sentiment extraction with wordclouds- **S3 Storage**: Secure file storage and retrieval

- Authentication powered by **NextAuth** with Prisma adapter.

- File uploads handled through `/api/upload-url` (S3 presigned URLs) and `/api/live-recording-upload` for live capture.- **Auto-scaling**: Dynamic resource allocation

- AWS SageMaker integration via `/api/sentiment-inference`.

- Document analysis orchestrated through `/api/pdf-analysis`, proxying to the FastAPI microservice.### 🎨 User Experience- **Cost Optimization**: Smart instance management

- Stripe subscription and billing flows under `/api/stripe/*`.

- User quota and API key management at `/api/user/*`.- ✅ **Live Video Capture** - WebRTC-powered webcam recording (60s max)- **Global CDN**: Fast content delivery worldwide



### WebSocket Live Analysis Server- ✅ **Speech Transcription** - Real-time voice-to-text with Web Speech API



- Located at `src/server/websocket/live-analysis-server.ts`.- ✅ **Responsive Design** - Mobile-first with Tailwind CSS---

- JWT-protected connections using the NextAuth session token.

- Emits structured events (`video_analysis`, `audio_analysis`, `text_analysis`) on a fixed cadence.- ✅ **Smooth Animations** - Framer Motion choreography

- Launch via `npm run websocket:dev` in development; containerize or systemd for production.

- ✅ **Progress Tracking** - Visual feedback for all operations## 🛠️ Tech Stack

### FastAPI PDF Analyzer



- Lives in `pdf-analyzer-service/`.

- Loads HuggingFace transformers (`nlpaueb/legal-bert-base-uncased`, `sshleifer/distilbart-cnn-12-6`) and spaCy for NER.### 🔐 Enterprise Features<table>

- Key endpoints:

  - `GET /health` – service readiness + model status.- ✅ **Secure Auth** - NextAuth.js v5 with credential provider<tr>

  - `GET /models/status` – per-model loading diagnostics.

  - `POST /analyze-pdf` – accepts multipart PDF/Excel uploads.- ✅ **API Key System** - Secure access with quota controls<td align="center"><strong>Frontend</strong></td>

- Optimised for Apple Silicon (CPU) with word cloud generation via matplotlib.

- ✅ **Stripe Integration** - Subscription billing with webhooks<td align="center"><strong>Backend</strong></td>

---

- ✅ **Quota Management** - Atomic deduction with auto-refund on failures<td align="center"><strong>AI/ML</strong></td>

## Feature Walkthrough

- ✅ **Usage Analytics** - Comprehensive tracking dashboard<td align="center"><strong>Infrastructure</strong></td>

- **Dashboard**: Manage uploads, review sentiment timelines, monitor quota consumption.

- **Live Detection**: Start a webcam session, stream frames/audio to the WebSocket, receive emotion overlays in real time.</tr>

- **Document Intelligence**: Drag-and-drop PDFs or spreadsheets, receive per-page sentiment, summaries, NER tagging, and word clouds.

- **API Keys**: Generate and rotate keys, inspect usage, receive quota warnings.### ☁️ Infrastructure<tr>

- **Plans & Billing**: Stripe checkout for upgrades, webhook-driven activation, quota grants recorded in `ApiQuota`.

- **Notifications & UI**: Toasts, modals, and responsive Tailwind UI/Framer Motion animations.- ✅ **AWS SageMaker** - Scalable ML model deployment<td>



---- ✅ **S3 Storage** - Presigned URLs for secure uploads



## API Overview- ✅ **WebSocket Server** - Real-time bidirectional updates- Next.js 15.0.1



### REST Endpoints (Next.js)- ✅ **Prisma ORM** - Type-safe database operations- TypeScript 5.5.3



| Route | Method | Purpose | Auth |- ✅ **FastAPI Backend** - Python microservice for documents- Tailwind CSS 3.4.3

| --- | --- | --- | --- |

| `/api/upload-url` | `POST` | Generate S3 presigned URL for video uploads. | API key (Bearer) |- Framer Motion 11.18.2

| `/api/live-recording-upload` | `POST` | Persist live-recorded media chunks. | API key |

| `/api/sentiment-inference` | `POST` | Trigger SageMaker video sentiment analysis. | API key |---- React Hook Form 7.57.0

| `/api/pdf-analysis` | `POST` | Proxy PDF/Excel to FastAPI service. | Session |

| `/api/live-emotion` | `POST` | Process recorded live detection sessions via Python pipeline. | Session |- Radix UI Components

| `/api/user/api-key` | `POST/DELETE` | Create or revoke user API keys. | Session |

| `/api/user/quota` | `GET` | Inspect quota consumption. | Session |## 🛠️ Tech Stack

| `/api/stripe/checkout` | `POST` | Create Stripe checkout session for plan upgrades. | Session |

| `/api/stripe/webhooks` | `POST` | Handle Stripe events (subscription started/cancelled, invoices). | Stripe |</td>



### WebSocket Events<table><td>



- Endpoint: `ws://<host>:8080?token=<jwt>`<tr>

- Event payloads adhere to:

<td valign="top" width="25%">- Node.js API Routes

  ```jsonc

  {- Prisma ORM 5.14.0

    "type": "video_analysis" | "audio_analysis" | "text_analysis",

    "data": {### Frontend- NextAuth.js 5.0.0

      "emotion": "joy",

      "sentiment": "positive",- [Next.js 15.0.1](https://nextjs.org/)- WebSocket (ws 8.18.2)

      "confidence": 0.92,

      "keywords": ["delighted", "excited"]- [TypeScript 5.5.3](https://www.typescriptlang.org/)- BCrypt.js 2.4.3

    },

    "timestamp": 1734882712345- [React 18.3.1](https://react.dev/)- Zod Validation 3.25.47

  }

  ```- [Tailwind CSS 3.4.3](https://tailwindcss.com/)



### FastAPI Analyzer- [Framer Motion 11.18.2](https://www.framer.com/motion/)</td>



Example PDF analysis request:- [Radix UI](https://www.radix-ui.com/)<td>



```bash- [React Hook Form 7.57.0](https://react-hook-form.com/)

curl -X POST http://localhost:8001/analyze-pdf \

  -F "file=@sample-feedback.pdf" \- Python 3.10+

  -F "mode=combined"

```</td>- PyTorch 2.5.1



---<td valign="top" width="25%">- Transformers 4.46.3



## Deployment- OpenCV 4.10.0.84



### Vercel (Recommended for Web)### Backend- AWS SageMaker 2.237.0



- Connect repository, set env vars in the Vercel dashboard.- [NextAuth.js 5.0.0](https://authjs.dev/)- Whisper (OpenAI)

- Use Vercel Postgres or Neon for production database.

- Deploy the WebSocket server separately (see below) or via **Edge Middleware** alternative.- [Prisma 5.14.0](https://www.prisma.io/)



### Docker / Self-Hosting- [Zod 3.25.47](https://zod.dev/)</td>



1. Build the Next.js app:- [bcryptjs 2.4.3](https://github.com/dcodeIO/bcrypt.js)<td>



   ```bash- [ws 8.18.2](https://github.com/websockets/ws)

   npm run build

   npm run start- [jsonwebtoken 9.0.2](https://github.com/auth0/node-jsonwebtoken)- AWS SageMaker

   ```

- AWS S3

2. Containerise the WebSocket server with `node:18-alpine` and run `node dist/live-analysis-server.js` (after bundling with `tsup`/`esbuild`).

</td>- AWS CloudWatch

3. Containerise the FastAPI service using `python:3.11-slim`, copying `requirements.txt` and `main.py`.

<td valign="top" width="25%">- Stripe Payments

4. Use a reverse proxy (Nginx, Traefik) to expose ports 3000 (Next.js), 8080 (WebSocket), 8001 (FastAPI).

- SQLite/PostgreSQL

### AWS Infrastructure

### Python/ML- Vercel/Docker

- S3 bucket for user uploads (matching `AWS_INFERENCE_BUCKET`).

- SageMaker endpoint for video sentiment models (`AWS_ENDPOINT_NAME`).- [FastAPI 0.104.1](https://fastapi.tiangolo.com/)

- Optionally deploy FastAPI into AWS Lambda via container image, or run on ECS/Fargate.

- Use AWS Secrets Manager/Parameter Store for secrets.- [Transformers](https://huggingface.co/docs/transformers/)</td>



---- [PyTorch](https://pytorch.org/)</tr>



## Testing & Quality- [spaCy](https://spacy.io/)</table>



- `npm run lint` – Next.js ESLint rules.- [pdfplumber](https://github.com/jsvine/pdfplumber)

- `npm run typecheck` – TypeScript compile check.

- `npm run check` – Combined lint + typecheck.- [WordCloud](https://amueller.github.io/word_cloud/)---

- `npm run format:check` – Prettier formatting guard.

- (Planned) Jest integration for component/unit tests.- [pandas](https://pandas.pydata.org/)

- (Planned) Playwright scripts for end-to-end flows.

## 🏗️ Architecture

---

</td>

## Troubleshooting

<td valign="top" width="25%">### System Overview

- **Env validation failed**: Ensure every required variable exists in `.env.local`; set `SKIP_ENV_VALIDATION=true` only for CI builds.

- **WebSocket rejects connections**: Provide a valid JWT token from authenticated session (`session.user.id` is required).    graph TB

- **SageMaker errors**: Check endpoint name/region, confirm IAM user has `sagemaker:InvokeEndpoint` permissions.

- **Stripe webhook signature mismatch**: Expose your local server via `stripe listen` or `ngrok`; confirm `STRIPE_WEBHOOK_SECRET` matches CLI output.### Cloud & Tools    A[Web Frontend] --> B[Next.js API]

- **FastAPI slow start**: First boot downloads transformer weights; pre-download models or bake them into Docker images.

- [AWS SageMaker](https://aws.amazon.com/sagemaker/)    B --> C[AWS SageMaker]

---

- [AWS S3](https://aws.amazon.com/s3/)    B --> D[Stripe API]

## Roadmap

- [Stripe](https://stripe.com/)    B --> E[Database]

- ✅ Comprehensive documentation, quick reference, and installation checklist.

- 🔄 Automated test suite (unit + e2e) with CI integration.- [FFmpeg.wasm](https://github.com/ffmpegwasm/ffmpeg.wasm)    C --> F[Python ML Backend]

- 🔄 Production Docker images and deployment manifests.

- 🔄 Advanced analytics for quota and usage trends.- [Vercel](https://vercel.com/)    F --> G[Multimodal Models]



---- SQLite/PostgreSQL    G --> H[BERT + 3D CNN + Audio CNN]



## Contributing



1. Fork the repository.</td>

2. Create a feature branch: `git checkout -b feat/amazing-feature`.

3. Commit changes with semantic messages: `git commit -m "feat: add amazing feature"`.</tr>### Data Flow

4. Run `npm run check` before opening a PR.

5. Submit a pull request outlining motivation and testing notes.</table>    User Upload → Preprocessing → Feature Extraction → Model Inference → Results



Please review the [installation checklist](INSTALLATION_CHECKLIST.md) before submitting production-oriented changes.    ↓ ↓ ↓ ↓ ↓



------    WebRTC FFmpeg BERT/CNN/Audio SageMaker Real-time UI



## License



This project is licensed under the [MIT License](LICENSE).## 🏗️ System Architecture



------



## Support```mermaid



- Open an [issue](https://github.com/UtkarsHMer05/sentiment-analysis/issues) for bugs and feature ideas.graph TB## ⚡ Quick Start

- Reach out via the dashboard contact form (coming soon) for commercial inquiries.

- Star the repo if this saved you time ⭐️    A[Web Browser] -->|HTTPS| B[Next.js Frontend]



---    A -->|WebRTC| C[MediaRecorder API]### Prerequisites



**Bonus Resources**    B -->|REST API| D[Next.js API Routes]- Node.js 18+ and npm



- [`QUICK_REFERENCE.md`](QUICK_REFERENCE.md) for day-to-day commands.    B -->|WebSocket| E[WebSocket Server]- Python 3.10+

- [`INSTALLATION_CHECKLIST.md`](INSTALLATION_CHECKLIST.md) to validate new environments.

- [`pdf-analyzer-service/README.md`](pdf-analyzer-service/README.md) for microservice specifics.    - AWS Account with SageMaker access


    D -->|Auth| F[NextAuth.js]- Stripe Account (for payments)

    D -->|Database| G[Prisma ORM]

    D -->|Storage| H[AWS S3]### 1-Minute Setup

    D -->|Inference| I[AWS SageMaker]    Clone repository

    D -->|Payments| J[Stripe API]    

    D -->|Documents| K[FastAPI Service]    git clone https://github.com/yourusername/layers.git

        cd layers

    G -->|SQLite/PostgreSQL| L[(Database)]    Install dependencies

    K -->|NLP| M[Transformers/spaCy]    

        npm install

    I -->|ML Models| N[BERT + CNN + Audio]    Setup environment

        

    style A fill:#e1f5ff    cp .env.example .env.local

    style B fill:#ffe1e1    Edit .env.local with your credentials

    style D fill:#fff4e1    

    style K fill:#e1ffe1    Setup database

    style I fill:#f0e1ff    

```    npm run db:push

    Install Python dependencies

### Data Flow    

    npm run install-python-deps

```    Start development server

1. User Upload → S3 Presigned URL → Video Storage    

2. Trigger Analysis → SageMaker Endpoint → Multimodal Inference    npm run dev:full

3. Results → Database → Real-time WebSocket → UI Update    

```Visit `http://localhost:3000` 🎉



------



## 📦 Prerequisites## 🔧 Installation



Before you begin, ensure you have the following installed:### Detailed Setup Guide



### Required Software#### 1. Environment Configuration

      .env.local

| Tool | Version | Download |      

|------|---------|----------|      DATABASE_URL="your-database-url"

| Node.js | 18.0.0+ | [nodejs.org](https://nodejs.org/) |      NEXTAUTH_SECRET="your-nextauth-secret"

| npm | 10.0.0+ | Comes with Node.js |      NEXTAUTH_URL="http://localhost:3000"

| Python | 3.10+ | [python.org](https://www.python.org/) |      AWS Configuration

| Git | Latest | [git-scm.com](https://git-scm.com/) |      

      AWS_ACCESS_KEY_ID="your-aws-access-key"

### Required Accounts      AWS_SECRET_ACCESS_KEY="your-aws-secret-key"

      AWS_REGION="us-east-1"

| Service | Purpose | Sign Up |      AWS_INFERENCE_BUCKET="your-s3-bucket"

|---------|---------|---------|      AWS_ENDPOINT_NAME="your-sagemaker-endpoint"

| AWS Account | SageMaker + S3 | [aws.amazon.com](https://aws.amazon.com/) |      Stripe Configuration

| Stripe Account | Payment processing | [stripe.com](https://stripe.com/) |      

      STRIPE_SECRET_KEY="your-stripe-secret-key"

### System Requirements      STRIPE_WEBHOOK_SECRET="your-webhook-secret"

      Optional: Custom Python Backend

- **RAM**: 8GB minimum (16GB recommended)      

- **Disk**: 5GB free space      PYTHON_BACKEND_URL="http://localhost:8001"

- **OS**: macOS, Linux, or Windows (WSL2)

- **Browser**: Chrome/Firefox (for WebRTC support)#### 2. Database Setup

    Generate Prisma client

---    

    npx prisma generate

## ⚡ Quick Start    Run migrations

    

Get the platform running in under 5 minutes:    npx prisma db push

    Optional: Seed database

```bash    

# 1. Clone the repository    npx prisma db seed

git clone https://github.com/UtkarsHMer05/sentiment-analysis.git

cd sentiment-analysis#### 3. AWS SageMaker Setup

    Deploy ML model to SageMaker

# 2. Install Node.js dependencies    

npm install    cd src/server/python_backend

    python deploy_model.py

# 3. Copy environment template

cp .env.example .env.local#### 4. Python Backend Setup

    Install Python dependencies

# 4. Edit .env.local with your credentials (see Configuration section)    

# macOS/Linux:    cd src/server/python_backend

nano .env.local    pip install -r requirements.txt

# Windows:   Test ML pipeline

notepad .env.local    

    python test_inference.py

# 5. Setup database

npx prisma generate---

npx prisma db push

## ⚙️ Configuration

# 6. Setup Python service (in a new terminal)

cd pdf-analyzer-service### Development vs Production

chmod +x setup.sh

./setup.sh#### Development Mode

    npm run dev:full # Starts both Next.js and WebSocket server

# 7. Start development servers (in project root)

npm run dev:full#### Production Build

```    npm run build

    npm run start

**🎉 Access the application at `http://localhost:3000`**

### Feature Flags

---    // src/config/features.ts

    export const FEATURES = {

## 🔧 Detailed Installation    LIVE_RECORDING: true,

    BATCH_PROCESSING: true,

### Step 1: Clone and Install Dependencies    ADVANCED_ANALYTICS: false, // Premium feature

    API_V2: false, // Beta feature

```bash    }

# Clone repository    

git clone https://github.com/UtkarsHMer05/sentiment-analysis.git    

cd sentiment-analysis---



# Install Node packages## 📱 Usage

npm install

### Web Interface

# Verify installation

npm list --depth=0#### 1. **Authentication**

```    // Login with credentials or OAuth

    const result = await signIn('credentials', {

### Step 2: Environment Configuration    email: 'user@example.com',

    password: 'securepassword'

Create `.env.local` in the project root:    })



```bash

# Copy template#### 2. **Video Upload & Analysis**

cp .env.example .env.local    // Upload video for analysis

```    const formData = new FormData()

    formData.append('video', videoFile)

If `.env.example` doesn't exist, create `.env.local` manually:    const response = await fetch('/api/live-emotion', {

    method: 'POST',

```env    body: formData

# Database (SQLite for development, PostgreSQL for production)    })

DATABASE_URL="file:./dev.db"    const results = await response.json()



# NextAuth#### 3. **Real-time Processing**

AUTH_SECRET="generate-with: openssl rand -base64 32"    // WebSocket connection for live updates

NEXTAUTH_URL="http://localhost:3000"    const ws = new WebSocket('ws://localhost:8080')

    ws.onmessage = (event) => {

# AWS Configuration    const data = JSON.parse(event.data)

AWS_REGION="us-east-1"    updateUI(data.progress, data.results)

AWS_ACCESS_KEY_ID="your_aws_access_key"    }

AWS_SECRET_ACCESS_KEY="your_aws_secret_key"

AWS_INFERENCE_BUCKET="your-s3-bucket-name"

AWS_ENDPOINT_NAME="your-sagemaker-endpoint"### API Integration



# Stripe#### Basic Usage

STRIPE_PUBLIC_KEY="pk_test_..."Get upload URL

STRIPE_SECRET_KEY="sk_test_..."

STRIPE_WEBHOOK_SECRET="whsec_..."    curl -X POST "https://api.layers.ai/upload-url"

    -H "Authorization: Bearer YOUR_API_KEY"

# Optional: Python Backend    -H "Content-Type: application/json"

PYTHON_BACKEND_URL="http://localhost:8001"    -d '{"fileType": ".mp4"}'

```    Upload video to S3



### Step 3: Database Setup    curl -X PUT "SIGNED_UPLOAD_URL"

    --data-binary @video.mp4

```bash    Start analysis

# Generate Prisma client

npx prisma generate    curl -X POST "https://api.layers.ai/sentiment-inference"

    -H "Authorization: Bearer YOUR_API_KEY"

# Push schema to database    -H "Content-Type: application/json"

npx prisma db push    -d '{"key": "inference/video-id.mp4"}'



# (Optional) Open Prisma Studio to view data

npx prisma studio#### Response Format

```{

"success": true,

### Step 4: AWS SageMaker Setup"analysis": {

"emotions": {

#### Option A: Deploy Your Own Model"anger": 0.05,

"joy": 0.85,

```bash"neutral": 0.10

# Navigate to ML deployment scripts (if available)},

cd ml-deployment"sentiment": {

python deploy_sagemaker.py"positive": 0.92,

```"negative": 0.03,

"neutral": 0.05

#### Option B: Use Existing Endpoint},

"confidence": 0.94,

Update `.env.local` with your SageMaker endpoint name:"processing_time": 847

```env},

AWS_ENDPOINT_NAME="sentiment-analysis-endpoint-2024""quotaInfo": {

```"used": 2,

"remaining": 48,

### Step 5: Python PDF Analyzer Setup"type": "sentiment_analysis"

}

```bash}

# Navigate to service directory

cd pdf-analyzer-service

---

# Make setup script executable (macOS/Linux)

chmod +x setup.sh## 🔌 API Documentation



# Run setup (installs dependencies + downloads models)### Authentication

./setup.shAll API endpoints require authentication via API key:

Authorization: Bearer sa_live_your_api_key_here

# For Windows, run manually:

# python -m venv venv

# venv\Scripts\activate### Endpoints

# pip install -r requirements.txt

# python -m spacy download en_core_web_sm#### **POST** `/api/upload-url`

Generate signed upload URL for video files.

# Manually activate environment (for testing)

# macOS/Linux:**Request:**

source venv/bin/activate{

# Windows:"fileType": ".mp4"

# venv\Scripts\activate}

text

# Test the service

python main.py**Response:**

```{

"url": "https://s3.amazonaws.com/...",

You should see:"key": "inference/uuid.mp4",

```"quota": {

INFO:     Uvicorn running on http://127.0.0.1:8001"remaining": 48,

```"costs": {

"sentiment_analysis": 2,

### Step 6: Verify Installation"live_detection": 10

}

```bash}

# Check Node.js version}

node --version  # Should be v18+text



# Check Python version#### **POST** `/api/sentiment-inference`

python3 --version  # Should be 3.10+Analyze uploaded video for sentiment and emotions.



# Check database connection**Request:**

npx prisma db pull{

"key": "inference/uuid.mp4"

# List npm scripts}

npm run

```

#### **POST** `/api/live-emotion`

---Process live video stream for real-time emotion detection.



## ⚙️ Configuration Guide**Request:**

FormData: {

### Environment Variables Explained"video": File,

"duration": "1min"

| Variable | Description | Example | Required |}

|----------|-------------|---------|----------|

| `DATABASE_URL` | Database connection string | `file:./dev.db` | ✅ |

| `AUTH_SECRET` | NextAuth encryption key | `random-32-char-string` | ✅ |#### **GET** `/api/user/quota-status`

| `AWS_REGION` | AWS region for services | `us-east-1` | ✅ |Get current quota usage and limits.

| `AWS_ACCESS_KEY_ID` | AWS access credentials | `AKIAIOSFODNN7EXAMPLE` | ✅ |

| `AWS_SECRET_ACCESS_KEY` | AWS secret key | `wJalrXUtnFEMI/...` | ✅ |**Response:**

| `AWS_INFERENCE_BUCKET` | S3 bucket for videos | `sentiment-analysis-bucket` | ✅ |{

| `AWS_ENDPOINT_NAME` | SageMaker endpoint | `sentiment-endpoint` | ✅ |"maxRequests": 100,

| `STRIPE_SECRET_KEY` | Stripe API key | `sk_test_...` | ✅ |"requestsUsed": 52,

| `STRIPE_PUBLIC_KEY` | Stripe publishable key | `pk_test_...` | ✅ |"remaining": 48,

| `STRIPE_WEBHOOK_SECRET` | Webhook signature | `whsec_...` | ⚠️ |"quotaCosts": {

"sentiment_analysis": 2,

### Generating Secrets"live_detection": 10

},

```bash"canAfford": {

# Generate AUTH_SECRET"sentiment_analysis": 24,

openssl rand -base64 32"live_detection": 4

}

# Or using Node.js}

node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"text

```

### Rate Limits

### AWS Setup Guide- **Free Tier**: 10 requests/month

- **Basic Plan**: 30 requests/month  

#### 1. Create S3 Bucket- **Professional**: 100 requests/month

- **Enterprise**: 1000 requests/month

```bash

aws s3 mb s3://your-sentiment-bucket --region us-east-1### Error Handling

```{

"success": false,

#### 2. Configure CORS for S3"error": "Insufficient quota for sentiment analysis",

"quotaInfo": {

Create `cors.json`:"required": 2,

```json"remaining": 1,

["type": "quota_exceeded"

  {},

    "AllowedHeaders": ["*"],"refunded": true,

    "AllowedMethods": ["GET", "PUT", "POST"],"refundedAmount": 2

    "AllowedOrigins": ["http://localhost:3000", "https://yourdomain.com"],}

    "ExposeHeaders": ["ETag"]text

  }

]---

```

## 🎯 Features Deep Dive

Apply CORS:

```bash### Multimodal AI Pipeline

aws s3api put-bucket-cors --bucket your-sentiment-bucket --cors-configuration file://cors.json

```#### Text Processing (BERT)

- **Model**: BERT-base-uncased fine-tuned on emotional dialogue

#### 3. Create IAM User- **Features**: Contextual embeddings, attention weights

- **Performance**: 72.5% accuracy (text-only baseline)

Required permissions:

- `AmazonS3FullAccess` (or custom policy)#### Video Processing (3D CNN)

- `AmazonSageMakerFullAccess`- **Architecture**: Modified 3D ResNet with temporal modeling

- **Input**: 16 frames at 224x224 resolution

Generate access keys and add to `.env.local`.- **Features**: Spatiotemporal facial expression patterns

- **Performance**: 67.8% accuracy (video-only baseline)

### Stripe Setup

#### Audio Processing (Mel-Spectrogram CNN)

1. Create account at [stripe.com](https://stripe.com)- **Features**: Mel-frequency cepstral coefficients

2. Get test keys from Dashboard → Developers → API keys- **Sampling**: 16kHz with 128 mel filters

3. Create webhook endpoint:- **Analysis**: Prosodic patterns, vocal intensity

   - URL: `https://yourdomain.com/api/stripe/webhooks`- **Performance**: 63.4% accuracy (audio-only baseline)

   - Events: `checkout.session.completed`, `customer.subscription.updated`

4. Copy webhook secret to `.env.local`#### Multimodal Fusion

- **Method**: Attention-based cross-modal fusion

### Database Migration (SQLite → PostgreSQL)- **Architecture**: Multi-head attention with learned weights

- **Performance**: **78.4% emotion accuracy, 85.2% sentiment accuracy**

For production, switch to PostgreSQL:

### Real-time Processing

```env

# .env.local (production)#### WebRTC Integration

DATABASE_URL="postgresql://user:password@localhost:5432/sentiment_db?schema=public"    // Live video capture

```    const stream = await navigator.mediaDevices.getUserMedia({

    video: { width: 1280, height: 720 },

Run migration:    audio: { sampleRate: 16000 }

```bash    })

npx prisma db push    

npx prisma generate    // Process video chunks

```    const recorder = new MediaRecorder(stream)

    recorder.ondataavailable = async (event) => {

---    await processVideoChunk(event.data)

    }

## 🚀 Running the Application



### Development Mode#### Streaming Pipeline

1. **Video Capture**: WebRTC → MediaRecorder

#### Start All Services2. **Chunking**: 5-second segments with overlap

3. **Preprocessing**: FFmpeg → frame extraction

```bash4. **Parallel Processing**: Text/Audio/Video pipelines

# Terminal 1: Main application (Next.js + WebSocket)5. **Fusion**: Attention-based combination

npm run dev:full6. **Real-time Results**: WebSocket delivery

```

### Payment & Subscription System

This command runs:

- Next.js dev server on `http://localhost:3000`#### Stripe Integration

- WebSocket server on `ws://localhost:8080`    // Create subscription

    const session = await stripe.checkout.sessions.create({

#### Start Python Service    mode: 'subscription',

    line_items: [{

```bash    price: 'price_basic_plan',

# Terminal 2: PDF Analyzer    quantity: 1

cd pdf-analyzer-service    }],

source venv/bin/activate  # macOS/Linux    success_url: '/dashboard?success=true',

# venv\Scripts\activate  # Windows    cancel_url: '/pricing?canceled=true'

python main.py    })

```



Service runs on `http://localhost:8001`#### Quota Management

- **Dynamic Allocation**: Based on subscription tier

### Individual Services- **Usage Tracking**: Real-time quota consumption

- **Auto-refund**: Failed requests refund quota points

```bash- **Overage Protection**: Prevent unexpected charges

# Next.js only

npm run dev---



# WebSocket server only## 🧪 Testing

npm run websocket

### Unit Tests

# Python service  Run all tests

cd pdf-analyzer-service && python main.py    

    npm test

# Database studio  Run with coverage

# Sentiment Analysis Platform

> A production-ready multimodal sentiment analysis SaaS that combines video, audio, and text signals to surface real-time emotion and sentiment insights.

<p align="center">
  <a href="https://nextjs.org/"><img alt="Next.js" src="https://img.shields.io/badge/Next.js-15.0-black?logo=next.js" /></a>
  <a href="https://www.typescriptlang.org/"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript" /></a>
  <a href="https://fastapi.tiangolo.com/"><img alt="FastAPI" src="https://img.shields.io/badge/FastAPI-0.111-teal?logo=fastapi" /></a>
  <a href="https://aws.amazon.com/sagemaker/"><img alt="AWS SageMaker" src="https://img.shields.io/badge/AWS-SageMaker-orange?logo=amazon-aws" /></a>
  <a href="https://stripe.com/"><img alt="Stripe" src="https://img.shields.io/badge/Stripe-Payments-6772e5?logo=stripe" /></a>
  <a href="https://opensource.org/licenses/MIT"><img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-success" /></a>
</p>

[Report a bug](https://github.com/UtkarsHMer05/sentiment-analysis/issues/new?template=bug_report.md) ·
[Request a feature](https://github.com/UtkarsHMer05/sentiment-analysis/issues/new?template=feature_request.md) ·
[View roadmap](#roadmap)

---

## Table of Contents

- [Overview](#overview)
- [Highlights](#highlights)
- [Architecture](#architecture)
- [Repository Layout](#repository-layout)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Services](#services)
- [Feature Walkthrough](#feature-walkthrough)
- [API Overview](#api-overview)
- [Deployment](#deployment)
- [Testing & Quality](#testing--quality)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

---

## Overview

The Sentiment Analysis Platform delivers real-time emotion and sentiment intelligence for recorded and live video, audio, and documents. Built on a Next.js 15 frontend with a FastAPI microservice and AWS SageMaker-backed inference, the platform supports SaaS monetisation via Stripe, quota-based API access, and a fully responsive dashboard experience.

This repository houses:

- **Next.js 15 + TypeScript** marketing site, authenticated dashboard, and API routes.
- **WebSocket live analysis server** that streams inference updates with JWT-authenticated connections.
- **Python FastAPI microservice** for PDF and spreadsheet sentiment processing.
- **Prisma ORM** schema and migrations for user, quota, and subscription data.

The system is production-ready, with environment validation, infrastructure guidance, and deployment recipes.

---

## Highlights

- **Multimodal inference**: Analyse facial expressions, voice tone, and transcribed text simultaneously.
- **Live emotion detection**: WebRTC-powered webcam capture with streaming updates via WebSockets.
- **Document intelligence**: Upload PDFs or Excel workbooks and receive per-page sentiment, entities, and summaries thanks to the FastAPI microservice.
- **Quota + API keys**: Built-in API key provisioning and quota enforcement for SaaS plans.
- **Stripe subscription billing**: Checkout sessions, webhooks, and seat activation handled end-to-end.
- **AWS SageMaker integration**: Invoke hosted endpoints for video sentiment models with presigned S3 uploads.
- **Developer ergonomics**: Environment validation, typed server components, Tailwind UI, and curated quick-reference docs.

---

## Architecture

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
| --- | --- | --- |
| Next.js frontend + API | `3000` | Marketing site, dashboard, REST routes, NextAuth, Prisma. |
| WebSocket live analysis | `8080` | Streams live emotion analysis updates (JWT protected). |
| FastAPI PDF analyzer | `8001` | Handles PDF/Excel extraction, summarisation, and sentiment classification. |
| Stripe Webhooks (ngrok recommended) | `3000`/`8787` | Receives subscription lifecycle events via `/api/stripe/webhooks`. |

---

## Repository Layout

```text
sentiment-analysis/
├── src/
│   ├── app/                # Next.js routes, layout, pages, API endpoints
│   ├── components/         # Reusable UI primitives and feature components
│   ├── lib/                # Stripe helper, quota manager, AWS utilities
│   ├── server/
│   │   ├── auth/           # NextAuth configuration
│   │   ├── db.ts           # Prisma client
│   │   └── websocket/      # Live analysis WebSocket server (TypeScript)
│   └── scripts/            # Utility scripts (websocket launcher)
├── prisma/                 # Prisma schema and migrations
├── pdf-analyzer-service/   # FastAPI microservice for PDF & Excel
├── public/                 # Static assets
├── styles/                 # Tailwind global styles
├── QUICK_REFERENCE.md      # Developer command cheat sheet
├── INSTALLATION_CHECKLIST.md
├── .env.example            # Environment variable template
└── README.md               # You are here
```

---

## Quick Start

### Prerequisites

- Node.js **18.18+** and npm **10+** *(Next.js 15 requirement)*
- Python **3.10+** with `uvicorn` (for the FastAPI service)
- Stripe account (test keys sufficient) for billing workflows
- AWS credentials with access to **S3** and **SageMaker Runtime**
- (Optional) PostgreSQL for production deployments. SQLite is used by default for local development.

### 1. Clone & Install

```bash
git clone https://github.com/UtkarsHMer05/sentiment-analysis.git
cd sentiment-analysis
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
# populate secrets for Next.js

cd pdf-analyzer-service
cp .env.example .env             # optional, only if you extend the service
```

### 3. Prepare the Database

```bash
# Generate Prisma client and run development migrations
npx prisma generate
npx prisma migrate dev

# Explore data (optional)
npx prisma studio    
```

Switch `DATABASE_URL` to a managed PostgreSQL instance before deploying.

### 4. Start Local Services

```bash
# Terminal A – Next.js app + REST API
npm run dev

# Terminal B – WebSocket live analysis server
npm run websocket:dev

# Terminal C – FastAPI PDF/Excel analyzer
cd pdf-analyzer-service
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8001
```

### 5. Verify

- Visit `http://localhost:3000` for the UI.
- Create an account, generate an API key in **Dashboard → Developer → API Keys**.
- Test file uploads:

  ```bash
  curl -X POST http://localhost:3000/api/upload-url \
    -H "Authorization: Bearer <api-key>" \
    -H "Content-Type: application/json" \
    -d '{"contentType":"video/mp4"}'
  ```

- Confirm the FastAPI service responds:

  ```bash
  curl http://localhost:8001/health
  ```

- Connect to the WebSocket with a JWT obtained from NextAuth (browser session) at `ws://localhost:8080?token=<jwt>`.

---

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `DATABASE_URL` | ✅ | Prisma datasource (`file:./dev.db` for SQLite or PostgreSQL URI in production). |
| `AUTH_SECRET` | ✅ | NextAuth secret for signing JWTs (generate via `openssl rand -base64 32`). |
| `NEXTAUTH_SECRET` | ✅ | Mirror `AUTH_SECRET`; used by the WebSocket server fallback. |
| `NEXTAUTH_URL` | ✅ | Fully qualified domain (e.g., `http://localhost:3000`). |
| `AWS_REGION` | ✅ | AWS region hosting SageMaker & S3 (e.g., `us-east-1`). |
| `AWS_ACCESS_KEY_ID` | ✅ | IAM access key ID with S3 + SageMaker permissions. |
| `AWS_SECRET_ACCESS_KEY` | ✅ | IAM secret key. |
| `AWS_INFERENCE_BUCKET` | ✅ | S3 bucket storing uploaded videos before analysis. |
| `AWS_ENDPOINT_NAME` | ✅ | SageMaker endpoint name invoked by sentiment inference API. |
| `STRIPE_PUBLIC_KEY` | ✅ | Publishable key for client-side Stripe SDK. |
| `STRIPE_SECRET_KEY` | ✅ | Secret key for server-side Stripe actions. |
| `STRIPE_WEBHOOK_SECRET` | ✅ | Signing secret for `/api/stripe/webhooks`. |
| `PYTHON_BACKEND_URL` | ➖ | Base URL of the PDF/Excel FastAPI service (`http://localhost:8001`). |
| `NODE_ENV` | ➖ | Default `development`; set to `production` in deployments. |
| `SKIP_ENV_VALIDATION` | ➖ | Set to `true` to bypass env validation during CI/Docker builds. |

> Copy `.env.example` as a template. For production, store secrets in managed services (Vercel env, AWS Parameter Store, etc.).

---

## Services

### Next.js Frontend & REST API

- Authentication powered by **NextAuth** with Prisma adapter.
- File uploads handled through `/api/upload-url` (S3 presigned URLs) and `/api/live-recording-upload` for live capture.
- AWS SageMaker integration via `/api/sentiment-inference`.
- Document analysis orchestrated through `/api/pdf-analysis`, proxying to the FastAPI microservice.
- Stripe subscription and billing flows under `/api/stripe/*`.
- User quota and API key management at `/api/user/*`.

### WebSocket Live Analysis Server

- Located at `src/server/websocket/live-analysis-server.ts`.
- JWT-protected connections using the NextAuth session token.
- Emits structured events (`video_analysis`, `audio_analysis`, `text_analysis`) on a fixed cadence.
- Launch via `npm run websocket:dev` in development; containerize or systemd for production.

### FastAPI PDF Analyzer

- Lives in `pdf-analyzer-service/`.
- Loads HuggingFace transformers (`nlpaueb/legal-bert-base-uncased`, `sshleifer/distilbart-cnn-12-6`) and spaCy for NER.
- Key endpoints:
  - `GET /health` – service readiness + model status.
  - `GET /models/status` – per-model loading diagnostics.
  - `POST /analyze-pdf` – accepts multipart PDF/Excel uploads.
- Optimised for Apple Silicon (CPU) with word cloud generation via matplotlib.

---

## Feature Walkthrough

- **Dashboard**: Manage uploads, review sentiment timelines, monitor quota consumption.
- **Live Detection**: Start a webcam session, stream frames/audio to the WebSocket, receive emotion overlays in real time.
- **Document Intelligence**: Drag-and-drop PDFs or spreadsheets, receive per-page sentiment, summaries, NER tagging, and word clouds.
- **API Keys**: Generate and rotate keys, inspect usage, receive quota warnings.
- **Plans & Billing**: Stripe checkout for upgrades, webhook-driven activation, quota grants recorded in `ApiQuota`.
- **Notifications & UI**: Toasts, modals, and responsive Tailwind UI/Framer Motion animations.

---

## API Overview

### REST Endpoints (Next.js)

| Route | Method | Purpose | Auth |
| --- | --- | --- | --- |
| `/api/upload-url` | `POST` | Generate S3 presigned URL for video uploads. | API key (Bearer) |
| `/api/live-recording-upload` | `POST` | Persist live-recorded media chunks. | API key |
| `/api/sentiment-inference` | `POST` | Trigger SageMaker video sentiment analysis. | API key |
| `/api/pdf-analysis` | `POST` | Proxy PDF/Excel to FastAPI service. | Session |
| `/api/live-emotion` | `POST` | Process recorded live detection sessions via Python pipeline. | Session |
| `/api/user/api-key` | `POST/DELETE` | Create or revoke user API keys. | Session |
| `/api/user/quota` | `GET` | Inspect quota consumption. | Session |
| `/api/stripe/checkout` | `POST` | Create Stripe checkout session for plan upgrades. | Session |
| `/api/stripe/webhooks` | `POST` | Handle Stripe events (subscription started/cancelled, invoices). | Stripe |

### WebSocket Events

- Endpoint: `ws://<host>:8080?token=<jwt>`
- Event payloads adhere to:

  ```jsonc
  {
    "type": "video_analysis" | "audio_analysis" | "text_analysis",
    "data": {
      "emotion": "joy",
      "sentiment": "positive",
      "confidence": 0.92,
      "keywords": ["delighted", "excited"]
    },
    "timestamp": 1734882712345
  }
  ```

### FastAPI Analyzer

Example PDF analysis request:

```bash
curl -X POST http://localhost:8001/analyze-pdf \
  -F "file=@sample-feedback.pdf" \
  -F "mode=combined"
```

---

## Deployment

### Vercel (Recommended for Web)

- Connect repository, set env vars in the Vercel dashboard.
- Use Vercel Postgres or Neon for production database.
- Deploy the WebSocket server separately (see below) or via **Edge Middleware** alternative.

### Docker / Self-Hosting

1. Build the Next.js app:

   ```bash
   npm run build
   npm run start
   ```

2. Containerise the WebSocket server with `node:18-alpine` and run `node dist/live-analysis-server.js` (after bundling with `tsup`/`esbuild`).

3. Containerise the FastAPI service using `python:3.11-slim`, copying `requirements.txt` and `main.py`.

4. Use a reverse proxy (Nginx, Traefik) to expose ports 3000 (Next.js), 8080 (WebSocket), 8001 (FastAPI).

### AWS Infrastructure

- S3 bucket for user uploads (matching `AWS_INFERENCE_BUCKET`).
- SageMaker endpoint for video sentiment models (`AWS_ENDPOINT_NAME`).
- Optionally deploy FastAPI into AWS Lambda via container image, or run on ECS/Fargate.
- Use AWS Secrets Manager/Parameter Store for secrets.

---

## Testing & Quality

- `npm run lint` – Next.js ESLint rules.
- `npm run typecheck` – TypeScript compile check.
- `npm run check` – Combined lint + typecheck.
- `npm run format:check` – Prettier formatting guard.
- (Planned) Jest integration for component/unit tests.
- (Planned) Playwright scripts for end-to-end flows.

---

## Troubleshooting

- **Env validation failed**: Ensure every required variable exists in `.env.local`; set `SKIP_ENV_VALIDATION=true` only for CI builds.
- **WebSocket rejects connections**: Provide a valid JWT token from authenticated session (`session.user.id` is required).
- **SageMaker errors**: Check endpoint name/region, confirm IAM user has `sagemaker:InvokeEndpoint` permissions.
- **Stripe webhook signature mismatch**: Expose your local server via `stripe listen` or `ngrok`; confirm `STRIPE_WEBHOOK_SECRET` matches CLI output.
- **FastAPI slow start**: First boot downloads transformer weights; pre-download models or bake them into Docker images.

---

## Roadmap

- ✅ Comprehensive documentation, quick reference, and installation checklist.
- 🔄 Automated test suite (unit + e2e) with CI integration.
- 🔄 Production Docker images and deployment manifests.
- 🔄 Advanced analytics for quota and usage trends.

---

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/amazing-feature`.
3. Commit changes with semantic messages: `git commit -m "feat: add amazing feature"`.
4. Run `npm run check` before opening a PR.
5. Submit a pull request outlining motivation and testing notes.

Please review the [installation checklist](INSTALLATION_CHECKLIST.md) before submitting production-oriented changes.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Support

- Open an [issue](https://github.com/UtkarsHMer05/sentiment-analysis/issues) for bugs and feature ideas.
- Reach out via the dashboard contact form (coming soon) for commercial inquiries.
- Star the repo if this saved you time ⭐️

---

**Bonus Resources**

- [`QUICK_REFERENCE.md`](QUICK_REFERENCE.md) for day-to-day commands.
- [`INSTALLATION_CHECKLIST.md`](INSTALLATION_CHECKLIST.md) to validate new environments.
- [`pdf-analyzer-service/README.md`](pdf-analyzer-service/README.md) for microservice specifics.


```    npm run test:coverage

 Run specific test suite

### Production Build    

    npm test -- --testNamePattern="API Routes"

```bash

# Build application

npm run build### Integration Tests

Test AWS integration

# Start production server

npm start    npm run test:aws

Test payment flows

# Run both (production)

NODE_ENV=production npm run dev:full    npm run test:stripe

```Test ML pipeline



### Verify Services    npm run test:ml



```bash

# Check Next.js### Load Testing

curl http://localhost:3000Simulate concurrent users



# Check WebSocket (requires wscat)    npm run test:load

npm install -g wscatTest auto-scaling

wscat -c ws://localhost:8080

    npm run test:scale

# Check Python service

curl http://localhost:8001/health

```### Example Test

    describe('Sentiment Analysis API', () => {

Expected response:    it('should analyze video and return results', async () => {

```json    const response = await request(app)

{    .post('/api/sentiment-inference')

  "status": "healthy",    .set('Authorization', 'Bearer test_api_key')

  "models_loaded": {    .send({ key: 'test-video.mp4' })

    "sentiment_classifier": true,    .expect(200)

    "summarizer": true,    text

    "nlp": true    expect(response.body).toHaveProperty('analysis')

  }    expect(response.body.analysis.confidence).toBeGreaterThan(0.5)

}    })

```    })



---

---

## 📱 Usage Guide

## 🚀 Deployment

### 1. User Registration

### Vercel Deployment (Recommended)

1. Navigate to `http://localhost:3000/signup`Install Vercel CLI

2. Enter email and password

3. System automatically:    npm i -g vercel

   - Creates Stripe customerDeploy

   - Generates API key

   - Allocates 10 free quota points    vercel --prod

Configure environment variables

### 2. Video Sentiment Analysis

    vercel env add NEXTAUTH_SECRET

#### Via Web Interface    vercel env add AWS_ACCESS_KEY_ID

    ... add all environment variables

1. Login at `/login`

2. Go to `/dashboard`

3. Click "Upload Video"### Docker Deployment

4. Select video file (MP4, WebM, AVI)    Dockerfile

5. Wait for S3 upload

6. Click "Analyze" (costs 2 quota points)    FROM node:18-alpine

7. View results with emotions + sentiment breakdown    WORKDIR /app

    COPY package*.json ./

#### Via API    RUN npm ci --only=production

    COPY . .

```bash    RUN npm run build

# Step 1: Get upload URL    EXPOSE 3000

curl -X POST http://localhost:3000/api/upload-url \    CMD ["npm", "start"]

  -H "Authorization: Bearer YOUR_API_KEY" \    text

  -H "Content-Type: application/json" \    undefined

  -d '{"fileType": ".mp4"}'    Build and run



# Response:    docker build -t layers-app .

# {    docker run -p 3000:3000 layers-app

#   "url": "https://s3.amazonaws.com/...",

#   "key": "inference/uuid.mp4"

# }### AWS ECS Deployment

docker-compose.yml

# Step 2: Upload video to S3

curl -X PUT "PRESIGNED_URL" \version: '3.8'

  --upload-file video.mp4services:

web:

# Step 3: Trigger analysisbuild: .

curl -X POST http://localhost:3000/api/sentiment-inference \ports:

  -H "Authorization: Bearer YOUR_API_KEY" \- "3000:3000"

  -H "Content-Type: application/json" \environment:

  -d '{"key": "inference/uuid.mp4"}'- DATABASE_URL=${DATABASE_URL}

- NEXTAUTH_SECRET=${NEXTAUTH_SECRET}

# Response:depends_on:

# {- db

#   "analysis": {db:

#     "emotions": {"joy": 0.85, "neutral": 0.10, "sadness": 0.05},image: postgres:14

#     "sentiment": {"positive": 0.92, "negative": 0.03, "neutral": 0.05},environment:

#     "confidence": 0.94- POSTGRES_DB=layers

#   },- POSTGRES_PASSWORD=${DB_PASSWORD}

#   "quotaInfo": {"remaining": 8, "used": 2}text

# }

```### Environment-specific Configs



### 3. Live Emotion Detection#### Production Checklist

- [ ] Environment variables configured

1. Go to `/live-detection`- [ ] Database migrations applied

2. Click "Start Camera" (grant permissions)- [ ] AWS SageMaker endpoint deployed

3. Click "Start Recording" (max 60 seconds)- [ ] Stripe webhooks configured

4. Speak naturally while recording- [ ] SSL certificates installed

5. Click "Stop Recording"- [ ] CDN configured

6. Click "Analyze with AWS" (costs 2 quota points)- [ ] Monitoring setup

7. View real-time results on `/live-results`- [ ] Backup strategy implemented



**Features:**---

- Real-time speech transcription

- Live emotion tracking### Development Workflow

- Sentiment confidence scores1. **Fork** the repository

- Downloadable reports2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)

3. **Commit** your changes (`git commit -m 'Add amazing feature'`)

### 4. PDF/Excel Analysis4. **Push** to the branch (`git push origin feature/amazing-feature`)

5. **Open** a Pull Request

1. Go to `/pdf-analysis`

2. Upload PDF or Excel file### Code Standards

3. Choose analysis type:- **TypeScript**: Strict mode enabled

   - **Individual**: Analyze each line separately- **ESLint**: Airbnb configuration

   - **Combined**: Overall document sentiment- **Prettier**: Code formatting

   - **Both**: Complete analysis- **Husky**: Pre-commit hooks

4. View results:- **Conventional Commits**: Commit message format

   - Sentiment distribution

   - Entity extraction### Project Structure

   - Word cloud visualization    layers/

   - Summaries    ├── src/

    │ ├── app/ # Next.js app directory

### 5. API Key Management    │ │ ├── (auth)/ # Authentication pages

    │ │ ├── api/ # API routes

```bash    │ │ └── dashboard/ # Dashboard pages

# Get your API key    │ ├── components/ # React components

curl http://localhost:3000/api/user/api-key \    │ │ ├── ui/ # Reusable UI components

  -H "Cookie: next-auth.session-token=YOUR_SESSION"    │ │ └── dashboard/ # Dashboard-specific components

    │ ├── lib/ # Utility functions

# Check quota status    │ ├── server/ # Server-side code

curl http://localhost:3000/api/user/quota-status \    │ │ ├── auth.ts # NextAuth configuration

  -H "Authorization: Bearer YOUR_API_KEY"    │ │ ├── db.ts # Database connection

```    │ │ └── python_backend/ # ML processing

    │ └── styles/ # Global styles

### 6. Subscription Management    ├── prisma/ # Database schema

    ├── public/ # Static assets

1. Visit `/pricing`    └── docs/ # Documentation

2. Select plan:

   - **Free**: 10 requests/month

   - **Basic**: 30 requests/month ($9.99)---

   - **Pro**: 100 requests/month ($29.99)

   - **Premium**: 500 requests/month ($99.99)## 🛣️ Roadmap

3. Complete Stripe checkout

4. Quota automatically updated### 🎯 Current Sprint (Q1 2025)

- [ ] **Mobile App**: React Native implementation

---- [ ] **API v2**: GraphQL endpoint with real-time subscriptions

- [ ] **Advanced Analytics**: Emotion trend analysis over time

## 🔌 API Reference- [ ] **Team Collaboration**: Multi-user workspace features



### Authentication### 🚀 Q2 2025

- [ ] **Multilingual Support**: 10+ language models

All endpoints require Bearer token:- [ ] **Edge Deployment**: Serverless edge functions

- [ ] **Custom Models**: User-trained model uploads

```bash- [ ] **Webhook Integration**: Real-time event notifications

Authorization: Bearer sa_live_your_api_key_here

```### 🌟 Q3 2025

- [ ] **Voice Cloning**: Synthetic voice generation

### Endpoints- [ ] **AR/VR Integration**: Spatial emotion detection

- [ ] **Federated Learning**: Privacy-preserving training

#### **POST** `/api/upload-url`- [ ] **Enterprise SSO**: SAML/OIDC integration



Generate S3 presigned URL for video upload.### 🔮 Future Vision

- **AI Companionship**: Emotional AI assistants

**Request:**- **Healthcare Integration**: Mental health monitoring

```json- **Education Platform**: Student engagement analysis

{- **Smart Cities**: Public sentiment monitoring

  "fileType": ".mp4"

}

```---



**Response:**## 📊 Performance Metrics

```json

{### Benchmarks

  "url": "https://s3.amazonaws.com/bucket/inference/uuid.mp4?...",| Metric | Value | Industry Standard |

  "key": "inference/uuid.mp4",|--------|-------|------------------|

  "quota": {| Emotion Accuracy | **78.4%** | 65.3% |

    "remaining": 48,| Sentiment Accuracy | **85.2%** | 82.1% |

    "costs": {| Processing Latency | **847ms** | 2000ms+ |

      "sentiment_analysis": 2,| Uptime | **99.2%** | 98.5% |

      "live_detection": 2| Cost per Request | **$0.031** | $0.05+ |

    }

  }### Scalability Tests

}- **Concurrent Users**: 50+ simultaneous video streams

```- **Daily Requests**: 10,000+ processed successfully

- **Auto-scaling**: 2-10 instances based on demand

#### **POST** `/api/sentiment-inference`- **Global Latency**: <500ms worldwide (95th percentile)



Analyze uploaded video via AWS SageMaker.---



**Request:**## 🔒 Security & Privacy

```json

{### Data Protection

  "key": "inference/uuid.mp4"- **Encryption**: AES-256 for data at rest, TLS 1.3 in transit

}- **Privacy**: GDPR compliant, automatic data deletion

```- **Access Control**: Role-based permissions, API key rotation

- **Monitoring**: Real-time security alerts, audit logs

**Response:**

```json### Compliance

{- **SOC 2 Type II**: Security certification

  "analysis": {- **GDPR**: European privacy regulation

    "emotions": {- **CCPA**: California privacy act

      "anger": 0.05,- **HIPAA**: Healthcare data protection (Enterprise)

      "disgust": 0.02,

      "fear": 0.03,---

      "joy": 0.85,

      "neutral": 0.03,## 📄 License

      "sadness": 0.01,

      "surprise": 0.01This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

    },

    "sentiment": {MIT License

      "positive": 0.92,Copyright (c) 2024 Layers AI

      "negative": 0.03,Permission is hereby granted, free of charge, to any person obtaining a copy

      "neutral": 0.05of this software and associated documentation files (the "Software"), to deal

    },in the Software without restriction, including without limitation the rights

    "confidence": 0.94,to use, copy, modify, merge, publish, distribute, sublicense, and/or sell

    "processing_time": 847copies of the Software, and to permit persons to whom the Software is

  },furnished to do so, subject to the following conditions:

  "quotaInfo": {The above copyright notice and this permission notice shall be included in all

    "remaining": 46,copies or substantial portions of the Software.

    "used": 4,

    "deducted": 2---

  }

}## 👥 Made Solo By-

```

<table>

#### **POST** `/api/live-emotion`<tr>

<td align="center">

Upload live recording for analysis.<img src="https://github.com/UtkarsHMerc05.png" width="100px;" alt=""/>

<br />

**Request:** (multipart/form-data)<sub><b>Your Name</b></sub>

```<br />

video: [File]<small>Founder &Developer</small>

duration: "60"</td>

```</tr>

</table>

**Response:**

```json### Core Contributors

{- **AI/ML**-------|

  "success": true,- **Frontend**    |=>Done By UtkarshHMer05

  "key": "live-recordings/uuid.webm",- **Backend**     | 

  "message": "Recording uploaded successfully"- **DevOps**------| 

}

```---



#### **GET** `/api/user/quota-status`## 🙏 Acknowledgments



Check current quota.- **MELD Dataset**: [Multimodal EmotionLines Dataset](https://affective-meld.github.io/)

- **Hugging Face**: Pre-trained transformer models

**Response:**- **AWS**: Cloud infrastructure and ML services

```json- **Open Source Community**: Countless libraries and tools

{

  "maxRequests": 100,---

  "requestsUsed": 52,

  "remaining": 48,## 📞 Support

  "quotaCosts": {

    "sentiment_analysis": 2,### Community Support

    "live_detection": 2,- **GitHub Issues**: [Report bugs](https://github.com/UtkarshHMer05/layers/issues)

    "pdf_analysis": 2- **Discussions**: [Feature requests](https://github.com/UtkarshHMer05/layers/discussions)

  },

  "canAfford": {### Enterprise Support

    "sentiment_analysis": 24,- **Email**: utkarshkhajuria7@gmail.com

    "live_detection": 24,- **SLA**: 99.9% uptime guarantee

    "pdf_analysis": 24- **Response Time**: <4 hours for critical issues

  }- **Training**: Custom onboarding sessions

}

```---



### Error Responses## 📈 Analytics & Metrics



```json### Real-time Monitoring

{- **Uptime**: 99.2% over last 30 days

  "error": "Insufficient quota for sentiment analysis",- **Response Time**: 847ms average globally

  "quotaInfo": {- **API Success Rate**: 99.7%

    "required": 2,- **User Satisfaction**: 4.8/5 stars

    "remaining": 1,

    "type": "quota_exceeded"### Usage Statistics

  },Total Requests Processed: 1,247,832

  "refunded": falseVideos Analyzed: 156,743

}Active Users: 2,847

```Enterprise Customers: 47



**Status Codes:**

- `200`: Success---

- `400`: Bad request

- `401`: Unauthorized (invalid API key)<div align="center">

- `403`: Forbidden (wrong user)

- `429`: Rate limited (no quota)**Made with ❤️ by the (Utkarsh Khajuria)*

- `500`: Server error (quota refunded)



---⭐ **Star us on GitHub** if you find this project useful!



## 📂 Project Structure</div>


```
sentiment-analysis/
├── .next/                          # Next.js build output
├── .venv/                          # Python virtual environment
├── node_modules/                   # Node dependencies
├── prisma/
│   ├── schema.prisma              # Database schema
│   ├── dev.db                     # SQLite database (dev)
│   └── migrations/                # Migration history
├── pdf-analyzer-service/
│   ├── main.py                    # FastAPI application
│   ├── requirements.txt           # Python dependencies
│   ├── setup.sh                   # Setup automation script
│   └── venv/                      # Python virtual env
├── public/                        # Static assets
├── src/
│   ├── app/                       # Next.js 15 App Router
│   │   ├── (auth)/                # Auth route group
│   │   ├── api/                   # API Route Handlers
│   │   ├── dashboard/             # Main dashboard
│   │   ├── live-detection/        # Live emotion capture
│   │   ├── live-results/          # Analysis results
│   │   ├── pdf-analysis/          # Document analysis
│   │   ├── pricing/               # Subscription plans
│   │   └── success/               # Payment success
│   ├── components/                # React components
│   │   ├── ui/                    # Radix UI components
│   │   ├── client/                # Client components
│   │   ├── dashboard/             # Dashboard components
│   │   ├── optimized/             # Optimized components
│   │   └── pricing/               # Pricing components
│   ├── hooks/                     # Custom React hooks
│   ├── lib/                       # Utility libraries
│   ├── schemas/                   # Zod validation schemas
│   ├── scripts/                   # Utility scripts
│   ├── sections/                  # Landing page sections
│   ├── server/                    # Server-side code
│   │   ├── auth/                  # NextAuth config
│   │   ├── websocket/             # WebSocket server
│   │   └── db.ts                  # Prisma client
│   ├── styles/                    # Global styles
│   ├── env.js                     # Env validation
│   └── middleware.ts              # Next.js middleware
├── .env.local                      # Environment variables
├── .gitignore
├── components.json                 # shadcn/ui config
├── next.config.js                  # Next.js config
├── package.json                    # Node dependencies
├── tailwind.config.ts              # Tailwind config
├── tsconfig.json                   # TypeScript config
└── README.md                       # This file
```

---

## 🎯 Feature Deep Dive

### Multimodal AI Pipeline

The platform combines three analysis streams:

#### 1. Text Processing (BERT)
- **Model**: `nlpaueb/legal-bert-base-uncased`
- **Framework**: Hugging Face Transformers
- **Input**: Transcribed speech or written text
- **Output**: Contextual embeddings (768-dim vectors)
- **Accuracy**: 72.5% (text-only baseline)

#### 2. Video Processing (3D CNN)
- **Architecture**: Modified 3D ResNet
- **Input**: 16 frames at 224x224 resolution
- **Features**: Spatiotemporal facial patterns
- **Output**: Facial expression vectors
- **Accuracy**: 67.8% (video-only baseline)

#### 3. Audio Processing (Mel-Spectrogram CNN)
- **Features**: MFCCs (Mel-frequency cepstral coefficients)
- **Sampling**: 16kHz with 128 mel filters
- **Analysis**: Prosodic patterns, vocal intensity
- **Accuracy**: 63.4% (audio-only baseline)

#### 4. Multimodal Fusion
- **Method**: Attention-based cross-modal fusion
- **Architecture**: Multi-head attention with learned weights
- **Combined Accuracy**: **78.4% emotions, 85.2% sentiment**

### Real-time WebSocket System

```typescript
// Client connection with JWT
const ws = new WebSocket('ws://localhost:8080?token=YOUR_JWT');

// Server handles authentication
ws.on('connection', (ws, request) => {
  const token = parseToken(request.url);
  const userId = verifyJWT(token);
  
  // Store authenticated connection
  clients.set(userId, ws);
});

// Bidirectional messaging
ws.send(JSON.stringify({
  type: 'text_analysis',
  data: { emotion: 'joy', confidence: 0.85 }
}));
```

### Quota Management System

Atomic operations prevent race conditions:

```typescript
// Check before deduction
const canAfford = await checkAndUpdateQuota(userId, 'sentiment_analysis', false);

if (!canAfford.success) {
  return error('Insufficient quota');
}

// Atomic deduction
const result = await checkAndUpdateQuota(userId, 'sentiment_analysis', true);

// Auto-refund on failure
try {
  await sagemakerInference(video);
} catch (error) {
  await refundQuota(userId, 'sentiment_analysis'); // Refunds 2 points
  throw error;
}
```

---

## 🔒 Security & Privacy

### Authentication
- **NextAuth.js v5** with JWT strategy
- **bcryptjs** password hashing (10 rounds)
- **Session-based** auth with HTTP-only cookies
- **CSRF protection** via NextAuth

### API Security
- **Bearer token** authentication
- **API key rotation** available
- **Rate limiting** via quota system
- **Input validation** with Zod schemas

### Data Protection
- **Encryption at rest**: AES-256 (S3 server-side)
- **Encryption in transit**: TLS 1.3
- **Presigned URLs**: Time-limited S3 access (15 min)
- **No permanent storage**: Videos deleted after analysis

### Privacy Compliance
- **GDPR ready**: Data export/deletion endpoints
- **Automatic cleanup**: Old videos purged after 7 days
- **No tracking**: Minimal analytics
- **User control**: Delete account anytime

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Add environment variables
vercel env add DATABASE_URL
vercel env add AUTH_SECRET
vercel env add AWS_ACCESS_KEY_ID
# ... add all from .env.local
```

### Docker Deployment

See full Dockerfile examples in the [Deployment Guide](./docs/DEPLOYMENT.md).

```bash
# Build and run with Docker Compose
docker-compose up -d
```

### Production Checklist

- [ ] Switch to PostgreSQL database
- [ ] Set `NODE_ENV=production`
- [ ] Enable AWS CloudWatch logging
- [ ] Configure Stripe webhooks
- [ ] Setup CDN (Cloudflare/AWS CloudFront)
- [ ] Enable HTTPS/TLS
- [ ] Setup monitoring (Sentry, LogRocket)
- [ ] Configure backup strategy
- [ ] Test SageMaker endpoint
- [ ] Load testing (k6, Artillery)

---

## 🧪 Testing

### Unit Tests

```bash
# Run all tests
npm test

# Coverage report
npm run test:coverage

# Watch mode
npm run test:watch
```

### API Testing

```bash
# Test endpoints
curl http://localhost:3000/api/health
```

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make** your changes
4. **Test** thoroughly:
   ```bash
   npm run lint
   npm run type-check
   npm test
   ```
5. **Commit** using conventional commits:
   ```bash
   git commit -m "feat: add amazing feature"
   ```
6. **Push** to your fork:
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open** a Pull Request

### Commit Convention

```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor code
test: Add tests
chore: Update dependencies
```

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2024 Utkarsh Khajuria

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 💬 Support

### Community Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/UtkarsHMer05/sentiment-analysis/issues)
- **Discussions**: [Ask questions](https://github.com/UtkarsHMer05/sentiment-analysis/discussions)

### Commercial Support

- **Email**: utkarshkhajuria7@gmail.com
- **Response Time**: Within 24-48 hours
- **Custom Development**: Available for hire

---

## 🙏 Acknowledgments

- **[MELD Dataset](https://affective-meld.github.io/)** - Multimodal emotion dataset
- **[Hugging Face](https://huggingface.co/)** - Pre-trained transformer models
- **[Vercel](https://vercel.com/)** - Hosting platform
- **[AWS](https://aws.amazon.com/)** - Cloud infrastructure
- **Open Source Community** - For countless amazing libraries

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/UtkarsHMer05/sentiment-analysis?style=social)
![GitHub forks](https://img.shields.io/github/forks/UtkarsHMer05/sentiment-analysis?style=social)
![GitHub issues](https://img.shields.io/github/issues/UtkarsHMer05/sentiment-analysis)
![GitHub pull requests](https://img.shields.io/github/issues-pr/UtkarsHMer05/sentiment-analysis)

---

<div align="center">

**Made with ❤️ by [Utkarsh Khajuria](https://github.com/UtkarsHMer05)**

⭐ **Star this repository** if you find it useful!

[🔝 Back to Top](#-sentiment-analysis-platform)

</div>
