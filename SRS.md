# SOFTWARE REQUIREMENTS SPECIFICATION (SRS)
## FOR SENTIMENT ANALYSIS PLATFORM

**Version:** 1.0
**Date:** October 26, 2023
**Prepared by:** Jules (AI Software Engineer)

---

# 1. INTRODUCTION

## 1.1 PURPOSE
The purpose of this Software Requirements Specification (SRS) is to document the full scope, functional and non-functional requirements, and design constraints for the **Sentiment Analysis Platform**. This platform is a multimodal AI system designed to analyze human sentiment and emotion through text, audio, and video processing. It aims to bridge the gap in traditional sentiment analysis by incorporating non-verbal cues (facial expressions, tone of voice) alongside textual content.

The intended audience for this document includes the development team, project stakeholders, quality assurance testers, and future maintainers of the software.

## 1.2 SCOPE
The software is named **"Sentiment Analysis Platform"**.
This is a SaaS (Software as a Service) application that provides:
1.  **Offline Video/Audio Analysis**: Users upload video or audio files, which are processed to detect emotions (e.g., joy, sadness, anger) and sentiment (positive, negative, neutral) using advanced AI models deployed on cloud infrastructure.
2.  **Live Emotion Detection**: A real-time feature that captures video and audio streams from the user's device (via WebRTC) and provides instantaneous feedback on the detected emotions.
3.  **Document Analysis**: Users upload PDF or Excel documents containing feedback or text. The system extracts text, performs sentiment analysis, extractive summarization, Named Entity Recognition (NER), and generates word clouds.
4.  **Dashboard & Analytics**: A central hub for users to view their analysis history, manage API keys, track quota usage, and manage subscriptions.
5.  **API Access**: A developer-friendly REST API to integrate the sentiment analysis capabilities into third-party applications.

The system utilizes a modern tech stack including **Next.js** for the frontend/backend, **Python (FastAPI)** for the document analysis service, **AWS SageMaker** for scalable video inference, **AWS S3** for storage, and **Stripe** for payment processing.

## 1.3 DEFINITIONS, ACRONYMS, AND ABBREVIATIONS
*   **SRS**: Software Requirements Specification
*   **SaaS**: Software as a Service
*   **API**: Application Programming Interface
*   **UI/UX**: User Interface / User Experience
*   **AWS**: Amazon Web Services
*   **S3**: Simple Storage Service (AWS)
*   **SageMaker**: AWS service for building, training, and deploying ML models
*   **JWT**: JSON Web Token
*   **ORM**: Object-Relational Mapping (Prisma)
*   **NER**: Named Entity Recognition
*   **NLP**: Natural Language Processing
*   **WebRTC**: Web Real-Time Communication
*   **WebSocket**: A computer communications protocol, providing full-duplex communication channels over a single TCP connection.
*   **BERT**: Bidirectional Encoder Representations from Transformers (Language Model)
*   **CNN**: Convolutional Neural Network
*   **ResNet**: Residual Neural Network

## 1.4 REFERENCES
1.  Project Repository: GitHub - `UtkarsHMer05/sentiment-analysis`
2.  IEEE Std 830-1998: IEEE Recommended Practice for Software Requirements Specifications
3.  Next.js Documentation: https://nextjs.org/docs
4.  AWS SageMaker Documentation: https://docs.aws.amazon.com/sagemaker/

## 1.5 OVERVIEW
The remainder of this document is organized as follows:
*   **Section 2** describes the general factors that affect the product and its requirements, including user characteristics and constraints.
*   **Section 3** details the specific functional and non-functional requirements of the system, including interfaces, performance, and security.
*   **Section 4** outlines the system models and architecture.
*   **Section 5** discusses future requirements and roadmap items.

---

# 2. OVERALL DESCRIPTION

## 2.1 PRODUCT PERSPECTIVE
The **Sentiment Analysis Platform** is an independent, self-contained web application that interacts with several external services:
*   **Cloud Infrastructure**: Relies on AWS S3 for secure file storage and AWS SageMaker for hosting and invoking the heavy-weight video sentiment analysis models.
*   **Database**: Uses a relational database (SQLite for dev, PostgreSQL for prod) managed via Prisma ORM to store user data, analysis results, and quotas.
*   **Microservices**: Includes a dedicated Python-based FastAPI service (`pdf-analyzer-service`) for processing text-heavy documents (PDFs/Excel), keeping the main application lightweight.
*   **Payment Gateway**: Integrates with Stripe to handle subscriptions (Basic, Professional, Premium) and billing events via webhooks.
*   **Real-time Server**: Utilizes a WebSocket server for low-latency communication required by the Live Detection feature.

## 2.2 PRODUCT FUNCTIONALITY
The major functions of the system include:

### 2.2.1 User Management & Authentication
*   User Registration and Login (Email/Password).
*   Secure Session Management using NextAuth.js.
*   Role-based access (implied by API quotas and subscription tiers).

### 2.2.2 Dashboard & Quota System
*   Visual dashboard displaying recent activities and usage statistics.
*   API Key generation, revocation, and management.
*   Real-time tracking of API quota usage (requests remaining).
*   Visual indicators for subscription plans.

### 2.2.3 Multimodal Video Analysis (Offline)
*   Secure generation of pre-signed upload URLs for large video files.
*   Direct upload to AWS S3.
*   Asynchronous triggering of AWS SageMaker endpoints for inference.
*   Analysis of video (facial expressions), audio (tone/prosody), and text (transcription).
*   Detailed result visualization: Emotion distribution, Sentiment score, Confidence levels.

### 2.2.4 Live Emotion Detection
*   Access to user's webcam and microphone via WebRTC.
*   Real-time streaming of video frames and audio chunks to the WebSocket server.
*   Instantaneous feedback on detected emotions (Joy, Sadness, Anger, Fear, Surprise, Disgust, Neutral).
*   Live transcription and keyword-based sentiment analysis.

### 2.2.5 Document Sentiment Analysis
*   Upload support for PDF and Excel (`.xlsx`, `.xls`) files.
*   Text extraction from documents (line-by-line or row-by-row).
*   **Sentiment Analysis**: Classification of text into Positive, Negative, or Neutral using `legal-bert-base-uncased`.
*   **Summarization**: Generation of concise summaries using `distilbart-cnn-12-6`.
*   **NER**: Identification of key entities (Persons, Orgs, Locations) using `spaCy`.
*   **Visualization**: Generation of Word Clouds representing most frequent terms.
*   Support for both "Individual Line" analysis and "Combined" document analysis.

### 2.2.6 Billing & Subscriptions
*   Integration with Stripe Checkout for plan upgrades.
*   Handling of Stripe Webhooks to automatically update user quotas and subscription status.
*   Tiered access (Basic, Professional, Premium) with different quota limits.

## 2.3 USER CHARACTERISTICS
*   **General Users/Content Creators**: Individuals looking to analyze the sentiment of their content or videos. No technical expertise required.
*   **Developers**: Users who wish to integrate the sentiment analysis API into their own applications. Required knowledge of REST APIs and API Keys.
*   **Data Analysts**: Users processing batches of documents (PDFs/Excel) for feedback analysis or market research.
*   **Researchers**: Users interested in the multimodal emotion detection capabilities.

## 2.4 CONSTRAINTS
*   **Hardware**: The Live Detection feature requires a device with a functional webcam and microphone. The server requires sufficient RAM (8GB+) for running Python ML models if self-hosted.
*   **Network**: High-speed internet connection is required for uploading large video files and for low-latency live streaming.
*   **Browser**: Modern web browsers (Chrome, Firefox, Safari, Edge) supporting WebRTC and WebSocket.
*   **Cost**: Dependence on AWS SageMaker and S3 implies operational costs that scale with usage.
*   **Regulatory**: Compliance with data privacy laws (e.g., GDPR) when handling user-uploaded videos and documents.

## 2.5 ASSUMPTIONS AND DEPENDENCIES
*   **AWS Account**: An active AWS account with S3 and SageMaker permissions is required for video analysis.
*   **Stripe Account**: A Stripe account is required for processing payments.
*   **Python Environment**: The PDF Analyzer Service assumes a Python 3.10+ environment with specific ML libraries (PyTorch, Transformers, spaCy) installed.
*   **Model Availability**: It is assumed that the required Hugging Face models (`nlpaueb/legal-bert-base-uncased`, `sshleifer/distilbart-cnn-12-6`) remain publicly available.
*   **Video Model**: It is assumed the video sentiment model (Modified 3D ResNet) is trained and deployed to the specified SageMaker endpoint.

---

# 3. SPECIFIC REQUIREMENTS

## 3.1 EXTERNAL INTERFACE REQUIREMENTS

### 3.1.1 User Interfaces
*   **Landing Page**: Informative page with "Quick Start", "Features", and "Pricing" sections. Responsive design using Tailwind CSS.
*   **Auth Screens**: Clean forms for Login and Signup with validation feedback.
*   **Dashboard**:
    *   Sidebar navigation (Overview, Analyze Video, Live Detection, PDF Analysis, API Keys, Settings).
    *   Usage cards showing "Requests Used", "Plan Details".
    *   Recent history table.
*   **Analysis Results**:
    *   **Video**: Charts/Graphs showing emotion probabilities over time.
    *   **PDF**: Interactive tables for line-by-line results, word cloud images, and summary text blocks.
    *   **Live**: Overlay of detected emotion on the video feed.

### 3.1.2 Hardware Interfaces
*   **Input**: Webcam and Microphone for live data capture.
*   **Server**: CPU/GPU resources for running the Python `pdf-analyzer-service` and Node.js server.

### 3.1.3 Software Interfaces
*   **Database**: Prisma Client connecting to SQLite (Dev) or PostgreSQL (Prod).
*   **OS**: Linux/Unix-based environment recommended for deployment (Docker support).
*   **Libraries**:
    *   Frontend: React, Next.js, Framer Motion, Radix UI.
    *   Backend: NextAuth.js, Stripe SDK, AWS SDK v3.
    *   ML/Python: PyTorch, Transformers, spaCy, pdfplumber, pandas.

### 3.1.4 Communication Interfaces
*   **HTTPS**: All REST API traffic must be encrypted over HTTPS (Port 3000/443).
*   **WebSocket**: Secure WebSocket (WSS) for live analysis (Port 8080).
*   **Internal HTTP**: Communication between Next.js app and Python PDF service (Port 8001).

## 3.2 FUNCTIONAL REQUIREMENTS

### 3.2.1 Authentication Module
*   **REQ-AUTH-01**: System shall allow users to sign up with Email and Password.
*   **REQ-AUTH-02**: System shall encrypt passwords using `bcrypt` before storage.
*   **REQ-AUTH-03**: System shall generate a session token upon successful login.
*   **REQ-AUTH-04**: System shall protect private routes (`/dashboard`, `/api/*`) requiring a valid session.

### 3.2.2 Video Sentiment Analysis (Offline)
*   **REQ-VID-01**: System shall provide an endpoint `/api/upload-url` to grant S3 upload permission.
*   **REQ-VID-02**: System shall validate file types (e.g., `.mp4`, `.mov`) and size limits.
*   **REQ-VID-03**: System shall provide an endpoint `/api/sentiment-inference` that triggers the AWS SageMaker endpoint.
*   **REQ-VID-04**: System shall deduct API quota (e.g., 2 points) upon successful analysis initiation.
*   **REQ-VID-05**: System shall handle SageMaker errors (timeout, unavailable) and automatically refund the user's quota.
*   **REQ-VID-06**: System shall store analysis results (JSON) and update the `VideoFile` record in the database.

### 3.2.3 Live Analysis (Real-time)
*   **REQ-LIVE-01**: System shall establish a WebSocket connection authenticated via JWT.
*   **REQ-LIVE-02**: System shall accept `video_frame`, `audio_chunk`, and `text_input` messages.
*   **REQ-LIVE-03**: System shall process text input using keyword matching to determine sentiment (Positive/Negative/Neutral) and Emotion.
*   **REQ-LIVE-04**: System shall broadcast analysis results back to the client with low latency (< 1 sec).
*   **REQ-LIVE-05**: System shall support `start_analysis` and `stop_analysis` control messages.

### 3.2.4 Document Analysis
*   **REQ-DOC-01**: System shall accept PDF and Excel file uploads via `/api/pdf-analysis`.
*   **REQ-DOC-02**: System shall forward the file to the local Python service running on port 8001.
*   **REQ-DOC-03**: The Python service shall extract text from PDF pages or Excel rows.
*   **REQ-DOC-04**: The Python service shall perform Zero-Shot Classification for sentiment (labels: positive, negative, neutral).
*   **REQ-DOC-05**: The Python service shall perform Abstractive Summarization on the text.
*   **REQ-DOC-06**: The Python service shall extract Named Entities (NER) and return a frequency count.
*   **REQ-DOC-07**: The Python service shall generate a Word Cloud image (Base64 encoded).
*   **REQ-DOC-08**: System shall return a combined JSON response with individual line analysis and overall document statistics.

### 3.2.5 Quota & Billing
*   **REQ-BILL-01**: System shall maintain a `ApiQuota` record for each user.
*   **REQ-BILL-02**: System shall block API requests if the user has insufficient quota.
*   **REQ-BILL-03**: System shall create Stripe Checkout sessions for subscription upgrades.
*   **REQ-BILL-04**: System shall listen for Stripe Webhooks (`customer.subscription.created`, `invoice.payment_succeeded`) to reset or upgrade quotas.

### 3.2.6 API Key Management
*   **REQ-KEY-01**: System shall allow users to generate a unique API Key (starting with `sa_live_`).
*   **REQ-KEY-02**: System shall allow users to revoke/delete their API Key.
*   **REQ-KEY-03**: API endpoints must validate the `Authorization: Bearer <KEY>` header against the database.

## 3.3 NON-FUNCTIONAL REQUIREMENTS

### 3.3.1 Performance requirements
*   **Latency**: Live analysis feedback must appear within 1 second of the event.
*   **Throughput**: The PDF service should handle files up to 50MB within reasonable time (e.g., < 30s for 10 pages).
*   **Scalability**: The video analysis must leverage AWS SageMaker's auto-scaling capabilities to handle concurrent requests.

### 3.3.2 Security Requirements
*   **Data Protection**: API Keys must be stored securely (hashed/encrypted where possible, though often displayed once).
*   **Transmission**: All data in transit must be encrypted via TLS 1.2+.
*   **Access Control**: Resources (videos, analysis results) must be accessible only by the owner (UserId check).
*   **Input Validation**: All file uploads must be validated for type and malicious content (basic extension/MIME check).

### 3.3.3 Reliability & Availability
*   **Uptime**: The platform should target 99.9% availability.
*   **Failover**: If the Python service is down, the main app should gracefully degrade (disable PDF features) and notify the user.
*   **Error Handling**: The system must provide meaningful error messages to the user (e.g., "Quota Exceeded", "File too large") rather than generic 500 errors.

### 3.3.4 Maintainability
*   **Code Style**: The codebase adheres to strict ESLint and Prettier configurations.
*   **Modularity**: Separation of concerns between Next.js (Web/API), Python (ML Service), and WebSocket (Real-time).
*   **Type Safety**: Full use of TypeScript for the frontend and backend to prevent runtime type errors.

---

# 4. SYSTEM MODELS AND ARCHITECTURE

## 4.1 ARCHITECTURE DIAGRAM DESCRIPTION
The system follows a **Microservices-based Hybrid Architecture**:

1.  **Frontend Client**: Browser-based React application (Next.js App Router). Handles UI, WebRTC capture, and state management.
2.  **API Gateway / Backend**: Next.js API Routes serve as the primary entry point. It handles Authentication, Database operations, and orchestrates calls to other services.
3.  **ML Service (Text)**: A dedicated FastAPI (Python) service. It loads the BERT and BART models into memory to provide low-latency inference for documents. It exposes HTTP endpoints consumed by the Next.js backend.
4.  **ML Service (Video)**: Hosted on AWS SageMaker. The Next.js backend invokes the endpoint using the AWS SDK. The model itself (3D ResNet) runs in the cloud.
5.  **Real-time Service**: A Node.js WebSocket server. It maintains persistent connections for live data streaming. Currently utilizes lightweight logic but is architected to forward frames to an ML inference engine.
6.  **Data Layer**:
    *   **Prisma + DB**: Stores relational data (Users, Sessions, Quotas).
    *   **AWS S3**: Stores large binary assets (User Videos).

## 4.2 DATA FLOW
1.  **Video Analysis**: User -> Next.js (Get Upload URL) -> S3 (Upload Video) -> Next.js (Trigger Inference) -> AWS SageMaker (Process) -> Next.js (Receive Result) -> Database (Save).
2.  **PDF Analysis**: User -> Next.js (Upload) -> Python Service (Analyze) -> Next.js (Receive Result) -> User (Display).
3.  **Live Detection**: User (Webcam) -> WebSocket -> Server (Analyze) -> WebSocket -> User (Display).

---

# 5. FUTURE REQUIREMENTS

## 5.1 MOBILE APPLICATION
*   Development of a React Native mobile app to allow users to record and analyze videos on the go.

## 5.2 ADVANCED ANALYTICS
*   Implementation of "Aggregate Analytics" to show sentiment trends over time for a user.
*   Comparative analysis between different video files.

## 5.3 GRAPHQL API
*   Transition from REST API to GraphQL to allow clients to request specific data fields, reducing over-fetching.

## 5.4 MULTI-LANGUAGE SUPPORT
*   Upgrade the NLP models to support multilingual sentiment analysis (e.g., Spanish, French, German).

## 5.5 WAITLIST & SCHEDULING
*   (From Example SRS) Implementation of a waitlist system for high-demand processing times or enterprise consulting slots.

## 5.6 NOTIFICATION SYSTEM
*   Email or SMS notifications when a long-running video analysis is complete.

---
**End of SRS**
