# Quick Start: Deploy Rehab360 Platform

Get the platform deployed in under 5 minutes.

## Prerequisites

- Node.js 20+ installed
- Git repository cloned
- Choose one: Vercel, Netlify, Docker, or GitHub Pages

## Option 1: Vercel (Fastest - 2 minutes) ⚡

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to platform directory
cd platform

# Deploy
vercel

# Follow prompts, then access your deployed site!
```

✅ **Done!** Your site is live with HTTPS, CDN, and auto-deployments.

## Option 2: Netlify (Fast - 3 minutes) 🚀

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Navigate to platform directory
cd platform

# Build
npm install
npm run build

# Deploy
netlify deploy --prod --dir=dist

# Follow prompts, your site is live!
```

✅ **Done!** Live with HTTPS and global CDN.

## Option 3: Docker (Self-hosted - 5 minutes) 🐳

```bash
# Navigate to platform directory
cd platform

# Build and run with Docker Compose
docker-compose up -d

# Access at http://localhost:8080
```

✅ **Done!** Running in a container. Deploy this image anywhere!

## Option 4: GitHub Pages (Free - 5 minutes) 📄

1. Push your code to GitHub
2. Go to **Settings → Pages**
3. Under "Build and deployment", select:
   - **Source**: GitHub Actions
4. Push to `main` branch or trigger manually
5. Wait ~2 minutes for deployment

✅ **Done!** Live at `https://<username>.github.io/<repo>/`

## Next Steps

### Configure Custom Domain

**Vercel:**
```bash
vercel domains add yourdomain.com
# Follow DNS instructions
```

**Netlify:**
```bash
netlify domains:add yourdomain.com
# Follow DNS instructions
```

### Add Environment Variables

1. Copy `.env.example` to `.env.production`
2. Fill in your values
3. Add to hosting provider:

**Vercel:**
```bash
vercel env add VITE_API_URL
# Enter your API URL
```

**Netlify:**
- Go to Site settings → Environment variables
- Add your variables

**Docker:**
- Edit `docker-compose.yml` environment section

### Enable Analytics

Add to `.env.production`:
```env
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

Then add to hosting provider environment.

### Monitor Your Site

- **Uptime**: [UptimeRobot](https://uptimerobot.com/) (free)
- **Errors**: [Sentry](https://sentry.io/) (free tier)
- **Analytics**: [Plausible](https://plausible.io/) or Google Analytics

## Troubleshooting

### Build fails
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Routes don't work (404 on refresh)
- Configuration files (`vercel.json`, `netlify.toml`) handle this automatically
- For manual hosting, configure server to serve `index.html` for all routes

### Slow loading
- Check bundle size: `npm run build` (should be < 500KB)
- Enable CDN (automatic on Vercel/Netlify)
- Check Lighthouse score: Chrome DevTools → Lighthouse

## Support

- 📖 Full guide: [DEPLOYMENT.md](DEPLOYMENT.md)
- ✅ Pre-deployment: [PRODUCTION-CHECKLIST.md](PRODUCTION-CHECKLIST.md)
- 🐛 Issues: Open an issue on GitHub

---

**Production URL**: _________________  
**Deployed on**: _________________  
**Hosting**: Vercel | Netlify | Docker | GitHub Pages | Other: _______
