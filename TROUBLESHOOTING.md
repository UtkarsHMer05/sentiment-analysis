# 🔧 Troubleshooting Guide

Common issues and their solutions for the Sentiment Analysis Platform.

---

## 🗄️ Database Issues

### Error: Database doesn't exist or can't be accessed

```bash
Error: P1003: Database does not exist
```

**Solution:**
```bash
# Delete existing database
rm prisma/dev.db

# Recreate database
npm run db:push
```

### Error: Prisma Client is out of sync

```bash
Error: @prisma/client did not initialize yet
```

**Solution:**
```bash
# Regenerate Prisma client
npx prisma generate

# Restart application
npm run dev:full
```

### Error: Migration failed

```bash
Error: P3009: Failed to apply migration
```

**Solution:**
```bash
# Reset database (development only!)
npx prisma migrate reset

# Or use db push for schema changes
npm run db:push
```

---

## 🌐 Port & Network Issues

### Error: Port already in use

```bash
EADDRINUSE: address already in use :::3000
```

**Solution:**
```bash
# Find and kill process on port 3000
lsof -ti:3000
kill -9 $(lsof -ti:3000)

# Or use a different port
PORT=3001 npm run dev
```

### Error: WebSocket connection failed

```bash
WebSocket connection to 'ws://localhost:8080' failed
```

**Solution:**
```bash
# Ensure WebSocket server is running
npm run websocket

# Or start full stack
npm run dev:full

# Check if port 8080 is available
lsof -ti:8080
```

---

## 🐍 Python & Backend Issues

### Error: Module not found (Python)

```bash
ModuleNotFoundError: No module named 'fastapi'
```

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

### Error: Python version incompatible

```bash
Python 3.8+ required
```

**Solution:**
```bash
# Check Python version
python3 --version

# Install Python 3.10+ from python.org
# Or use pyenv:
brew install pyenv
pyenv install 3.10.11
pyenv local 3.10.11
```

### Error: Virtual environment not found

```bash
bash: venv/bin/activate: No such file or directory
```

**Solution:**
```bash
cd pdf-analyzer-service

# Recreate virtual environment
python3 -m venv venv

# Activate it
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Error: spaCy model not found

```bash
Can't find model 'en_core_web_sm'
```

**Solution:**
```bash
source venv/bin/activate
python -m spacy download en_core_web_sm
```

---

## ☁️ AWS Issues

### Error: Invalid AWS credentials

```bash
The security token included in the request is invalid
```

**Solution:**
```bash
# Verify AWS credentials
aws sts get-caller-identity

# If error, reconfigure AWS CLI
aws configure

# Update .env.local with correct credentials
nano .env.local
```

### Error: S3 bucket not found

```bash
NoSuchBucket: The specified bucket does not exist
```

**Solution:**
```bash
# Create S3 bucket
aws s3 mb s3://your-bucket-name --region us-east-1

# Or verify bucket name in .env.local
cat .env.local | grep AWS_INFERENCE_BUCKET
```

### Error: Access denied to S3

```bash
AccessDenied: Access Denied
```

**Solution:**
1. Check IAM user has S3 permissions
2. Verify bucket policy allows your IAM user
3. Ensure correct AWS credentials in `.env.local`

---

## 💳 Stripe Issues

### Error: Invalid API key

```bash
Error: Invalid API Key provided
```

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

### Error: Webhook signature verification failed

```bash
Webhook signature verification failed
```

**Solution:**
```bash
# Start Stripe CLI listener
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Copy the webhook signing secret
# Update STRIPE_WEBHOOK_SECRET in .env.local

# Restart application
npm run dev:full
```

### Error: Stripe CLI not installed

```bash
stripe: command not found
```

**Solution:**
```bash
# macOS
brew install stripe/stripe-cli/stripe

# Verify installation
stripe --version

# Login to Stripe
stripe login
```

---

## 📦 NPM & Dependencies Issues

### Error: Node version mismatch

```bash
The engine "node" is incompatible with this module
```

**Solution:**
```bash
# Check Node version
node --version

# Install nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install and use Node 18
nvm install 18
nvm use 18

# Reinstall dependencies
rm -rf node_modules
npm install
```

### Error: Package installation failed

```bash
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock
rm -rf node_modules package-lock.json

# Reinstall with legacy peer deps
npm install --legacy-peer-deps

# Or use exact versions
npm ci
```

### Error: Peer dependency issues

```bash
npm WARN ERESOLVE overriding peer dependency
```

**Solution:**
```bash
# Usually safe to ignore warnings, but if issues persist:
npm install --legacy-peer-deps
```

---

## 🏗️ Build & Compilation Issues

### Error: TypeScript compilation failed

```bash
Type error: Property 'X' does not exist on type 'Y'
```

**Solution:**
```bash
# Run type check to see all errors
npm run typecheck

# Clear Next.js cache
rm -rf .next

# Rebuild
npm run build
```

### Error: Module not found (Next.js)

```bash
Module not found: Can't resolve 'module-name'
```

**Solution:**
```bash
# Ensure module is installed
npm list module-name

# If not installed
npm install module-name

# If still error, clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Error: Out of memory during build

```bash
FATAL ERROR: Reached heap limit Allocation failed
```

**Solution:**
```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build

# Or add to package.json scripts:
# "build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
```

---

## 🔐 Authentication Issues

### Error: NextAuth session error

```bash
Error: [next-auth][error] SessionRequired
```

**Solution:**
```bash
# Ensure AUTH_SECRET is set
cat .env.local | grep AUTH_SECRET

# Generate new secret if needed
openssl rand -base64 32

# Update .env.local
nano .env.local

# Restart application
npm run dev:full
```

### Error: CSRF token mismatch

```bash
Error: CSRF token verification failed
```

**Solution:**
```bash
# Clear browser cookies for localhost:3000
# Restart application
npm run dev:full

# Ensure NEXTAUTH_URL is correct in .env.local
NEXTAUTH_URL="http://localhost:3000"
```

---

## 🎥 Media & File Upload Issues

### Error: File size too large

```bash
Error: File size exceeds maximum allowed
```

**Solution:**
- Check file size limits in your code
- For PDF analyzer: max 50MB
- For video uploads: check S3 bucket settings
- Increase limits if needed in respective API routes

### Error: Unsupported file format

```bash
Error: File type not supported
```

**Solution:**
- PDF Analyzer accepts: `.pdf`
- Video analysis accepts: `.mp4`, `.webm`, `.mov`
- Check file extension and MIME type

---

## 🔧 Environment & Configuration Issues

### Error: Environment variable not found

```bash
Error: NEXT_PUBLIC_* is not defined
```

**Solution:**
```bash
# Ensure .env.local exists
ls -la .env.local

# Check variable is defined
cat .env.local | grep VARIABLE_NAME

# Variables must be prefixed with NEXT_PUBLIC_ for client-side access

# Restart application after .env changes
npm run dev:full
```

### Error: Invalid environment configuration

```bash
Error: Invalid environment variables
```

**Solution:**
```bash
# Check env.js for validation schema
cat src/env.js

# Ensure all required variables are set
# Use .env.example as reference
cp .env.example .env.local
```

---

## 📊 Performance Issues

### Application running slowly

**Solutions:**
```bash
# 1. Clear Next.js cache
rm -rf .next

# 2. Disable Turbopack (if causing issues)
npm run dev # instead of npm run dev --turbo

# 3. Check system resources
# Close unnecessary applications

# 4. Use production build for better performance
npm run build
npm run start
```

### Database queries slow

**Solutions:**
```bash
# 1. Use Prisma Studio to check data
npm run db:studio

# 2. Add database indexes (check schema.prisma)

# 3. For production, use PostgreSQL instead of SQLite
# Update DATABASE_URL in .env.local
```

---

## 🐛 General Debugging Tips

### Enable Debug Mode

```bash
# Enable Next.js debug mode
DEBUG=* npm run dev

# Enable Node.js debugging
NODE_OPTIONS='--inspect' npm run dev
```

### Check Logs

```bash
# Check terminal output for errors
# Look for red error messages

# Check browser console (F12)
# Look for network errors

# Check Network tab for failed requests
```

### Reset Everything

```bash
# Nuclear option - reset everything
rm -rf node_modules .next prisma/dev.db
npm install
npm run db:push
npm run dev:full
```

---

## 🆘 Still Having Issues?

### Collect Debug Information

```bash
# System information
node --version
npm --version
python3 --version

# Project information
npm list --depth=0
git status
git log --oneline -5

# Environment check
cat .env.local | grep -v SECRET | grep -v KEY
```

### Get Help

1. **Search existing issues**: [GitHub Issues](https://github.com/UtkarsHMer05/sentiment-analysis/issues)
2. **Create new issue**: Include debug information above
3. **Email support**: utkarshkhajuria7@gmail.com
4. **Check documentation**: [SETUP_GUIDE.md](./SETUP_GUIDE.md)

---

## 📝 Reporting Bugs

When reporting issues, please include:

- ✅ Error message (full stack trace)
- ✅ Steps to reproduce
- ✅ System information (OS, Node version, etc.)
- ✅ What you've already tried
- ✅ Screenshots (if applicable)

---

**Most issues can be resolved by following this guide. Good luck! 🍀**
