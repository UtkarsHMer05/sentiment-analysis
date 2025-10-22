# ⚡ Quick Start Guide

Get the Sentiment Analysis Platform running in **5 minutes**!

---

## 🚀 Prerequisites Check

```bash
# Verify installations
node --version    # Should be v18+ 
python3 --version # Should be v3.10+
npm --version     # Should be v10.2.4+
git --version     # Any recent version
```

---

## 📦 One-Command Setup

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

🎉 Open http://localhost:3000

---

## 🔧 Manual Step-by-Step

### 1️⃣ Clone & Install (2 min)

```bash
git clone https://github.com/UtkarsHMer05/sentiment-analysis.git
cd sentiment-analysis
npm install
```

### 2️⃣ Configure Environment (1 min)

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

### 3️⃣ Setup Database (30 sec)

```bash
npm run db:push
```

### 4️⃣ Setup Python Backend (1 min)

```bash
cd pdf-analyzer-service
chmod +x setup.sh
./setup.sh
cd ..
```

### 5️⃣ Start Application (30 sec)

```bash
npm run dev:full
```

**Access:** http://localhost:3000

---

## ✅ Verify It Works

1. Open http://localhost:3000
2. Click **Sign Up**
3. Create account: `test@example.com` / `password123`
4. You should see the Dashboard ✨

---

## 🆘 Common Issues

### Port 3000 Already in Use?
```bash
# Kill process on port 3000
kill -9 $(lsof -ti:3000)
# Or use different port
PORT=3001 npm run dev:full
```

### Database Error?
```bash
rm prisma/dev.db
npm run db:push
```

### Python Dependencies Failed?
```bash
cd pdf-analyzer-service
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Prisma Client Out of Sync?
```bash
npx prisma generate
npm run dev:full
```

---

## 🎯 Next Steps

### For Full Features, Configure:

**AWS (for video processing):**
- Create S3 bucket
- Get IAM credentials
- Add to `.env.local`:
  ```bash
  AWS_REGION="us-east-1"
  AWS_ACCESS_KEY_ID="your-key"
  AWS_SECRET_ACCESS_KEY="your-secret"
  AWS_INFERENCE_BUCKET="your-bucket"
  ```

**Stripe (for payments):**
- Create account at stripe.com
- Get test API keys
- Add to `.env.local`:
  ```bash
  STRIPE_PUBLIC_KEY="pk_test_..."
  STRIPE_SECRET_KEY="sk_test_..."
  STRIPE_WEBHOOK_SECRET="whsec_..."
  ```

**Test webhooks locally:**
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

---

## 📚 Full Documentation

- **Complete Setup:** [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- **Main README:** [README.md](./README.md)
- **API Docs:** See README.md → API Documentation section

---

## 🎨 What You Can Do Now

✅ **Without AWS/Stripe:**
- User authentication (Sign up/Login)
- Dashboard interface
- API key management
- Database operations
- PDF text analysis (local)

⏳ **Requires AWS:**
- Video sentiment analysis
- Live emotion detection
- Cloud file storage

⏳ **Requires Stripe:**
- Subscription payments
- Quota management
- Premium features

---

## 💡 Development Tips

```bash
# Start with auto-reload
npm run dev:full

# View database
npm run db:studio

# Check for errors
npm run lint
npm run typecheck

# Format code
npm run format:write
```

---

## 📞 Need Help?

1. Check [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed instructions
2. Review troubleshooting section
3. [Open an issue](https://github.com/UtkarsHMer05/sentiment-analysis/issues)
4. Email: utkarshkhajuria7@gmail.com

---

**Happy Coding! 🚀**
