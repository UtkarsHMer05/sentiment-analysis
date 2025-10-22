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

[🚀 Quick Start](#-quick-start) • [📖 Documentation](#-table-of-contents) • [🐛 Report Bug](https://github.com/UtkarsHMer05/sentiment-analysis/issues) • [💡 Request Feature](https://github.com/UtkarsHMer05/sentiment-analysis/issues)

</div>

---

## 📸 Platform Screenshots

<details>
  <summary><b>🏠 Landing</b></summary>![Landing Page](https://github.com/user-attachments/assets/b1601972-3300-4629-b844-dd380b1fcff6)
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
- [📦 Core Services](#core-services)
- [🚀 Creative Stepwise Quick Start](#-creative-stepwise-quick-start)
- [⚙️ Installation & Configuration](#installation--configuration)
- [🔌 API Documentation](#api-documentation)
- [🎯 Feature Deep Dive](#features-deep-dive)
- [🧪 Testing](#-testing)
- [🚢 Deployment](#-deployment)
- [🛣️ Roadmap](#-roadmap)
- [📄 License](#-license)
- [🙏 Acknowledgments](#acknowledgments)
- [📞 Support](#support)

---

## 🌟 Overview
**Sentiment Analysis Platform** delivers multimodal, real-time emotion and sentiment intelligence over video, audio, and documents.  
Built with Next.js, FastAPI, and AWS SageMaker for production-ready inference, it powers SaaS subscription features, live dashboard, quotas, and robust deployment.

---

## ✨ Key Features
- **Live Multimodal AI**: Sub-second fusion across text, audio, video (BERT, CNN, Mel-Spectrograms)
- **WebSocket Streaming**: Live emotion overlays in dashboard
- **Drag-drop Document Sentiment**: PDF/Excel with per-page analytics
- **Stripe SaaS Billing**: Customer plans, quota boost, refunds, webhook activation
- **Secure Auth & RBAC**: NextAuth, JWT, roles, audit logs
- **Monitoring & Uptime**: 99.2% uptime, data encryption, GDPR ready
- **Responsive, Mobile-first UI**: Tailwind, Framer, rad animations

---

## 🛠️ Tech Stack

| Frontend         | Backend         | ML/Inference      | Infra & DevOps      |
|------------------|----------------|-------------------|---------------------|
| Next.js 15.x     | API Routes     | Python 3.10+      | AWS SageMaker       |
| TypeScript 5.5   | FastAPI (8001) | PyTorch, HF       | AWS S3/CloudWatch   |
| Tailwind CSS 3.x | WebSocket (8080)| spaCy, Whisper    | Vercel, Docker      |
| Framer Motion    | Prisma, DB     | OpenCV            | Stripe, GitHub CI   |

---

## 🏗️ Architecture
```
flowchart LR
  User[User Browser] -->|HTTPS| Next[Next.js App]
  Next -- ORM --> Prisma[(Prisma + Database)]
  Next -->|REST| Stripe[(Stripe)]
  Next -->|REST| AWS[(AWS S3 & SageMaker)]
  Next -->|REST| PDFService[(FastAPI PDF Analyzer)]
  Next -->|WS| LiveWS[(Live Analysis WebSocket)]
  PDFService -->|Models| HF[Transformers & spaCy]
```

---

## 📦 Core Services
| Service | Port | Description |
|---------|------|-------------|
| Next.js Frontend + API | `3000` | Marketing site, dashboard, REST + NextAuth + Prisma |
| WebSocket Live Analysis | `8080` | Streams live emotion analysis updates (JWT protected) |
| FastAPI PDF Analyzer | `8001` | PDF/Excel extraction, summarisation, sentiment |
| Stripe Webhooks | `3000`/`8787` | Receives subscription events at `/api/stripe/webhooks` |

---

## 🚀 Creative Stepwise Quick Start

<details>
<summary><b>🌈 1-Minute Project Launch (Visual Stepwise Checklist)</b> ⬇️</summary>

**✅ Prerequisites**
- Node.js 18+, npm 10+
- Python 3.10+
- Stripe & AWS credentials

**🔨 Clone & Install**
```
git clone https://github.com/UtkarsHMer05/sentiment-analysis.git
cd sentiment-analysis
npm install
```

**🔒 Configure Environment**
```
cp .env.example .env.local
# Add DB (SQLite/PostgreSQL), Auth Secret, Stripe keys, AWS keys to .env.local
```
> _Tip: Use `.env.local` for dev/local and Vercel project env for production._

**🗄️ Setup Database**
```
npx prisma generate
npx prisma migrate dev
# Optional UI: npx prisma studio
```

**🧠 Prepare Python ML Backend**
```
cd pdf-analyzer-service
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

**💽 Start Local Services (3 Terminals)**
```
# App
npm run dev
# WebSocket
npm run websocket:dev
# FastAPI (in service directory, with venv active)
uvicorn main:app --reload --host 0.0.0.0 --port 8001
```

**🌐 Try It Out!**
- Open [localhost:3000](http://localhost:3000), sign up, upload files, use API keys, test live analysis.
- Send PDF/Excel to [localhost:8001/health](http://localhost:8001/health).
- Try streaming to `ws://localhost:8080?token=<jwt>` from dashboard.
- Check quotas in dashboard settings.

**❓ Advanced**
- Add Stripe webhook to `/api/stripe/webhooks` endpoint with CLI or ngrok.
- Deploy to Vercel or Docker using provided configs.
- Use Prisma/Studio for DB insights.

</details>

---

## ⚙️ Installation & Configuration

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | SQLite/PostgreSQL for Prisma |
| `AUTH_SECRET` | ✅ | JWT Secret |
| `NEXTAUTH_URL` | ✅ | URL for NextAuth sessions |
| `AWS_...` | ✅ | S3/SageMaker keys, bucket, region |
| `STRIPE_...` | ✅ | Stripe secret, public, webhook keys |
| `PYTHON_BACKEND_URL` | ➖ | FastAPI (default: `http://localhost:8001`) |
| `NODE_ENV` | ➖ | `development`/`production` |
| `SKIP_ENV_VALIDATION` | ➖ | `true` for CI |

---

## 🔌 API Documentation

> **All endpoints require:**  
`Authorization: Bearer sa_live_your_api_key_here`

| Route | Method | Purpose         | Auth |
|-------|--------|-----------------|------|
| `/api/upload-url` | POST | S3 upload URL | API key |
| `/api/sentiment-inference` | POST | SageMaker | API key |
| `/api/pdf-analysis` | POST | PDF/Excel via FastAPI | Session |
| `/api/user/api-key` | POST/DEL | Manage keys | Session |
| `/api/user/quota` | GET | Quota status | Session |
| `/api/stripe/checkout` | POST | Stripe upgrade | Session |
| `/api/stripe/webhooks` | POST | Subscription events | Stripe |

**WebSocket:**  
`ws://localhost:8080?token=<jwt>`
```
{
  "type": "video_analysis",
  "emotion": "joy",
  "sentiment": "positive",
  "confidence": 0.92,
  "timestamp": 1734882712345
}
```

---

## 🎯 Feature Deep Dive

- Fusion (BERT, 3D-CNN, Audio CNN, cross-modal attention).
- Batch file analytics and quota auto-refund.
- Real-time ML streaming (WebRTC/MediaRecorder).
- Stripe upgrades, quota boosts, auto-rollback for failed requests.
- Full RBAC, audit logs, advanced UX.

---

## 🧪 Testing

- `npm run lint` (ESLint)
- `npm run typecheck` (TS strict)
- `npm test` (Jest+Playwright)
- `npm run check` (combined)
- Load, integration, ML, and payment test scripts provided.

---

## 🚢 Deployment

### Vercel
- Push repo, set env vars in dashboard
- Deploy UI (`3000`). Run sockets/ML backend on AWS/Docker.

### Docker Compose Example
```
version: '3'
services:
  web:
    build: .
    ports: ["3000:3000"]
    env_file: .env.local
  websocket:
    build: .
    command: npm run websocket:start
    ports: ["8080:8080"]
  fastapi:
    build:
      context: ./pdf-analyzer-service
      dockerfile: Dockerfile
    ports: ["8001:8001"]
```

---

## 🛣️ Roadmap

- [x] Modern dashboard UI
- [x] Live analysis
- [x] Quota/keys billing
- [ ] Mobile app, GraphQL, AR/VR
- [ ] AI-powered feedback features

---

## 📄 License
MIT License — see [LICENSE](LICENSE)

---

## 👥 Core Contributors

<table>
<tr>
<td align="center">
<img src="https://github.com/UtkarsHMer05.png" width="100px;" />
<br />
<b>Utkarsh Khajuria</b>
<br />
<small>Creator / AI/ML / Fullstack</small>
</td>
</tr>
</table>

---

## 🙏 Acknowledgments
- [MELD Dataset](https://affective-meld.github.io/)
- [Hugging Face](https://huggingface.co/)
- [AWS](https://aws.amazon.com/)
- [Stripe](https://stripe.com/)
- Open Source Community

---

## 🆘 Support

- [GitHub Issues](https://github.com/UtkarsHMer05/sentiment-analysis/issues)
- [Email](mailto:utkarshkhajuria7@gmail.com)
- ⭐ Star us on GitHub!

---

<div align="center">
<b>Made with ❤️ by Utkarsh Khajuria</b>
</div>
```

***

**What’s improved:**
- Unified/fixed missing and repeated content.
- The quick start is stepwise, visually clear, and creative (checklist boxes + code).
- All technical, feature, and contributor blocks and advanced details included.
- Ready for direct copy-paste, with collapses, emoji, and clear major steps.

Let me know if you’d like even more creative onboarding, infographics, or callouts!
