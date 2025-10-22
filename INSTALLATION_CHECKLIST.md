# Installation Checklist

Use this checklist to ensure your sentiment analysis platform is properly set up.

## ✅ Pre-Installation

- [ ] Node.js 18+ installed (`node --version`)
- [ ] Python 3.10+ installed (`python3 --version`)
- [ ] Git installed (`git --version`)
- [ ] AWS account created
- [ ] Stripe account created (for payments)
- [ ] 8GB+ RAM available
- [ ] 5GB+ disk space available

## ✅ Project Setup

### 1. Clone Repository
- [ ] Repository cloned: `git clone https://github.com/UtkarsHMer05/sentiment-analysis.git`
- [ ] Changed to project directory: `cd sentiment-analysis`

### 2. Node.js Setup
- [ ] Dependencies installed: `npm install`
- [ ] No errors during installation
- [ ] `node_modules/` folder created

### 3. Environment Configuration
- [ ] `.env.local` file created
- [ ] All environment variables filled out (see checklist below)

### 4. Database Setup
- [ ] Prisma client generated: `npx prisma generate`
- [ ] Database schema pushed: `npx prisma db push`
- [ ] `prisma/dev.db` created (for SQLite)

### 5. Python Service Setup
- [ ] Changed to service directory: `cd pdf-analyzer-service`
- [ ] Setup script executed: `./setup.sh` (or manual setup for Windows)
- [ ] Virtual environment created: `venv/` folder exists
- [ ] Dependencies installed successfully
- [ ] spaCy model downloaded: `en_core_web_sm`
- [ ] Health check passed: `curl http://localhost:8001/health`

## ✅ Environment Variables

### Required Variables
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

### Optional Variables
- [ ] `STRIPE_WEBHOOK_SECRET` - For Stripe webhooks
- [ ] `PYTHON_BACKEND_URL` - Python service URL (default: `http://localhost:8001`)
- [ ] `NODE_ENV` - Set to `development` or `production`

## ✅ AWS Setup

### S3 Bucket
- [ ] S3 bucket created
- [ ] Bucket name added to `.env.local`
- [ ] CORS configuration applied
- [ ] Test upload successful

### IAM User
- [ ] IAM user created with programmatic access
- [ ] Permissions attached:
  - [ ] AmazonS3FullAccess (or custom policy)
  - [ ] AmazonSageMakerFullAccess
- [ ] Access keys generated
- [ ] Keys added to `.env.local`

### SageMaker Endpoint
- [ ] ML model deployed to SageMaker (or using existing endpoint)
- [ ] Endpoint name added to `.env.local`
- [ ] Test inference successful

## ✅ Stripe Setup

- [ ] Stripe account created
- [ ] Test mode keys obtained
- [ ] Keys added to `.env.local`
- [ ] Webhook endpoint created (for production)
- [ ] Webhook secret added (if applicable)

## ✅ Service Verification

### Next.js Server
- [ ] Server starts: `npm run dev`
- [ ] Accessible at `http://localhost:3000`
- [ ] No console errors
- [ ] Landing page loads

### WebSocket Server
- [ ] Server starts: `npm run websocket`
- [ ] Listening on port 8080
- [ ] No connection errors

### Python Service
- [ ] Service starts: `python main.py` (in pdf-analyzer-service)
- [ ] Accessible at `http://localhost:8001`
- [ ] Health check returns: `{"status": "healthy"}`
- [ ] All models loaded successfully

### Database
- [ ] Prisma Studio opens: `npx prisma studio`
- [ ] Can view tables
- [ ] No connection errors

## ✅ Functionality Tests

### Authentication
- [ ] Signup page accessible at `/signup`
- [ ] Can create new account
- [ ] Login page accessible at `/login`
- [ ] Can login with credentials
- [ ] Dashboard accessible after login

### Video Analysis
- [ ] Can access dashboard at `/dashboard`
- [ ] Can request upload URL
- [ ] Can upload test video
- [ ] Can trigger analysis
- [ ] Results displayed correctly

### Live Detection
- [ ] Can access `/live-detection`
- [ ] Camera permission granted
- [ ] Can start/stop recording
- [ ] Can upload recording
- [ ] Results displayed on `/live-results`

### PDF Analysis
- [ ] Can access `/pdf-analysis`
- [ ] Can upload PDF file
- [ ] Analysis completes successfully
- [ ] Results include sentiment + wordcloud

### API Access
- [ ] Can retrieve API key from dashboard
- [ ] API key works with endpoints
- [ ] Quota tracking functions correctly
- [ ] Rate limiting works

## ✅ Production Readiness

### Security
- [ ] All `.env` files in `.gitignore`
- [ ] Strong `AUTH_SECRET` generated
- [ ] AWS credentials secured
- [ ] Stripe keys secured
- [ ] HTTPS enabled (production)

### Performance
- [ ] Production build successful: `npm run build`
- [ ] No build errors
- [ ] Bundle size acceptable
- [ ] Page load times < 3 seconds

### Database
- [ ] Using PostgreSQL for production (not SQLite)
- [ ] Database migrations applied
- [ ] Backups configured
- [ ] Connection pooling configured

### Monitoring
- [ ] Error tracking setup (e.g., Sentry)
- [ ] Logging configured
- [ ] Health checks implemented
- [ ] Alerts configured

### Deployment
- [ ] Environment variables set in hosting platform
- [ ] Python service deployed separately
- [ ] WebSocket server configured
- [ ] CDN configured
- [ ] Domain configured with SSL

## ✅ Documentation

- [ ] README.md reviewed
- [ ] QUICK_REFERENCE.md reviewed
- [ ] API documentation understood
- [ ] Known limitations understood

## 🚨 Common Issues Checklist

If something isn't working, check:

- [ ] All services are running (Next.js, WebSocket, Python)
- [ ] `.env.local` file exists and is complete
- [ ] No typos in environment variables
- [ ] Ports 3000, 8001, and 8080 are not in use by other apps
- [ ] Node modules are installed
- [ ] Python virtual environment is activated
- [ ] Database is accessible
- [ ] AWS credentials are valid
- [ ] Internet connection is stable

## 📝 Notes

Use this space to note any custom configurations or issues:

```
[Your notes here]




```

---

## ✅ Final Check

- [ ] All checklist items completed
- [ ] Platform fully functional
- [ ] Ready for development/production
- [ ] Team members onboarded (if applicable)

**Setup completed on:** _______________

**Completed by:** _______________

**Platform version:** _______________

---

<div align="center">

🎉 **Congratulations!** Your sentiment analysis platform is ready to use!

[🏠 Back to README](./README.md) • [📖 Quick Reference](./QUICK_REFERENCE.md)

</div>
