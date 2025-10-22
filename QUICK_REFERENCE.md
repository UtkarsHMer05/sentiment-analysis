# Quick Reference Guide

## Common Commands

### Development

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

### Database

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

### Code Quality

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

### Build & Deploy

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

## Troubleshooting

### Common Issues

#### 1. "Module not found" errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 2. Prisma client errors

```bash
# Regenerate Prisma client
npx prisma generate
```

#### 3. Python models not loading

```bash
cd pdf-analyzer-service
source venv/bin/activate
python -m spacy download en_core_web_sm
```

#### 4. WebSocket connection fails

- Ensure WebSocket server is running: `npm run websocket`
- Check if port 8080 is available
- Verify firewall settings

#### 5. AWS SageMaker errors

- Verify AWS credentials in `.env.local`
- Check endpoint name is correct
- Ensure IAM permissions are properly configured

#### 6. Stripe webhook issues

- Use Stripe CLI for local testing: `stripe listen --forward-to localhost:3000/api/stripe/webhooks`
- Verify webhook secret in `.env.local`

### Environment Variables Checklist

- [ ] `DATABASE_URL` set
- [ ] `AUTH_SECRET` generated (use `openssl rand -base64 32`)
- [ ] `AWS_ACCESS_KEY_ID` set
- [ ] `AWS_SECRET_ACCESS_KEY` set
- [ ] `AWS_INFERENCE_BUCKET` set
- [ ] `AWS_ENDPOINT_NAME` set
- [ ] `STRIPE_SECRET_KEY` set
- [ ] `STRIPE_PUBLIC_KEY` set

## API Quick Reference

### Get API Key

```bash
curl http://localhost:3000/api/user/api-key \
  -H "Cookie: next-auth.session-token=YOUR_SESSION"
```

### Check Quota

```bash
curl http://localhost:3000/api/user/quota-status \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Upload Video

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

## Port Reference

| Service | Port | URL |
|---------|------|-----|
| Next.js | 3000 | http://localhost:3000 |
| WebSocket | 8080 | ws://localhost:8080 |
| Python API | 8001 | http://localhost:8001 |
| Prisma Studio | 5555 | http://localhost:5555 |

## Project Structure Quick Reference

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

## Useful npm Scripts

```json
{
  "dev": "Next.js dev server",
  "dev:full": "Next.js + WebSocket",
  "build": "Production build",
  "start": "Production server",
  "lint": "Run ESLint",
  "lint:fix": "Fix ESLint issues",
  "type-check": "TypeScript validation",
  "db:push": "Push Prisma schema",
  "db:studio": "Open Prisma Studio",
  "websocket": "Start WebSocket server"
}
```
