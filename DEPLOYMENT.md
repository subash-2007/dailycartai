# 🚀 DailyCartAI Deployment Guide

## Quick Deploy Options

### 1. **Vercel (Recommended) - 5 minutes**

**Step 1: Install Vercel CLI**
```bash
npm install -g vercel
```

**Step 2: Deploy**
```bash
# From your project directory
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name: dailycart-ai
# - Directory: ./
# - Override settings? No
```

**Step 3: Set up automatic deployments**
```bash
# Connect to GitHub for auto-deploy
vercel --prod
```

**Benefits:**
- ✅ Free hosting
- ✅ Automatic deployments from GitHub
- ✅ Built-in CDN
- ✅ Perfect for Next.js
- ✅ Custom domains

### 2. **Netlify - Alternative**

**Step 1: Build the project**
```bash
npm run build
```

**Step 2: Deploy to Netlify**
- Go to [netlify.com](https://netlify.com)
- Drag and drop the `.next` folder
- Or connect your GitHub repository

### 3. **Railway - Simple**

**Step 1: Install Railway CLI**
```bash
npm install -g @railway/cli
```

**Step 2: Deploy**
```bash
railway login
railway init
railway up
```

## 🐳 Docker Deployment

### Create Dockerfile
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

### Deploy with Docker
```bash
# Build image
docker build -t dailycart-ai .

# Run container
docker run -p 3000:3000 dailycart-ai
```

## ☁️ Cloud Deployment

### AWS Amplify
1. Connect GitHub repository
2. Build settings: `npm run build`
3. Output directory: `.next`

### Google Cloud Run
```bash
# Build and deploy
gcloud run deploy dailycart-ai \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Azure Static Web Apps
1. Install Azure CLI
2. Create static web app
3. Deploy from GitHub

## 🔧 Environment Setup

### Create `.env.local` for production
```env
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_API_URL=https://api.your-domain.com
```

### Update `next.config.js` for production
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // For Docker
  images: {
    domains: ['images.unsplash.com'],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
}

module.exports = nextConfig
```

## 📱 Mobile App Deployment

### PWA Setup
Add to `next.config.js`:
```javascript
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
})

module.exports = withPWA(nextConfig)
```

### Install PWA dependencies
```bash
npm install next-pwa
```

## 🔒 Security & Performance

### Security Headers
Add to `next.config.js`:
```javascript
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'origin-when-cross-origin',
        },
      ],
    },
  ]
}
```

### Performance Optimization
```javascript
// In next.config.js
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  // ... other config
}
```

## 📊 Monitoring & Analytics

### Add Google Analytics
```bash
npm install @next/third-parties
```

In `app/layout.tsx`:
```typescript
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  )
}
```

## 🚀 One-Click Deploy

### Deploy to Vercel with one command:
```bash
npx vercel --prod
```

### Deploy to Netlify:
```bash
npm run build
netlify deploy --prod --dir=.next
```

## 📋 Pre-deployment Checklist

- [ ] Test all features locally
- [ ] Update environment variables
- [ ] Check build process: `npm run build`
- [ ] Test production build: `npm start`
- [ ] Update README with deployment info
- [ ] Set up custom domain (optional)
- [ ] Configure SSL certificate
- [ ] Set up monitoring and analytics

## 🆘 Troubleshooting

### Common Issues:

1. **Build fails**: Check Node.js version (18+ required)
2. **Environment variables**: Ensure all required vars are set
3. **Image optimization**: Add domains to `next.config.js`
4. **API routes**: Check CORS settings for production

### Debug Commands:
```bash
# Check build
npm run build

# Test production
npm start

# Check dependencies
npm audit

# Update packages
npm update
```

## 🌐 Custom Domain Setup

### Vercel:
1. Go to project settings
2. Add custom domain
3. Update DNS records
4. Wait for SSL certificate

### Netlify:
1. Site settings → Domain management
2. Add custom domain
3. Update DNS
4. SSL certificate auto-provisioned

---

**🎉 Your DailyCartAI is ready to go live!**

Choose Vercel for the easiest deployment experience, or follow the other options based on your needs. 