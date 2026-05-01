# Deployment Guide - Sweet N 4

This guide covers multiple deployment options for the Sweet N 4 Recipe Profit Calculator.

---

## 🚀 Quick Deploy (5 minutes)

### Vercel (Recommended)

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Deploy:**
```bash
cd platform/sweet-n4
vercel
```

3. **Follow prompts:**
   - Set up and deploy? **Y**
   - Which scope? (Select your account)
   - Link to existing project? **N**
   - Project name: **sweet-n4**
   - Directory: **./**
   - Override settings? **N**

4. **Done!** Your app is live at `https://sweet-n4-xxx.vercel.app`

### Production Deploy:
```bash
vercel --prod
```

---

## 🌐 Deployment Options

### 1. Vercel

**Pros:** Free tier, auto SSL, global CDN, instant deploys
**Best for:** Production apps with custom domains

**Steps:**

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import project from GitHub
4. Set build settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Deploy!

**Custom Domain:**
- Add domain in Vercel dashboard
- Update DNS records as instructed
- SSL auto-configured

---

### 2. Netlify

**Pros:** Free tier, form handling, serverless functions
**Best for:** Projects needing backend features

**Steps:**

1. **Install Netlify CLI:**
```bash
npm install -g netlify-cli
```

2. **Build locally:**
```bash
npm run build
```

3. **Deploy:**
```bash
netlify deploy --prod --dir=dist
```

**Or use Netlify dashboard:**
1. Drag `dist` folder to [netlify.com/drop](https://netlify.com/drop)
2. Done!

**Configuration file** (`netlify.toml`):
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### 3. GitHub Pages

**Pros:** Free hosting for public repos
**Best for:** Open source projects, demos

**Steps:**

1. **Install gh-pages:**
```bash
npm install --save-dev gh-pages
```

2. **Add to `package.json`:**
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/sweet-n4"
}
```

3. **Update `vite.config.ts`:**
```typescript
export default defineConfig({
  base: '/sweet-n4/', // Your repo name
  // ... rest of config
})
```

4. **Deploy:**
```bash
npm run deploy
```

5. **Enable GitHub Pages:**
   - Go to repo **Settings → Pages**
   - Source: **gh-pages** branch
   - Save

---

### 4. Docker

**Pros:** Portable, consistent across environments
**Best for:** Self-hosted or enterprise deployments

**Dockerfile:**
```dockerfile
# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf:**
```nginx
server {
  listen 80;
  server_name _;
  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  # Cache static assets
  location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
}
```

**Build and run:**
```bash
docker build -t sweet-n4 .
docker run -p 8080:80 sweet-n4
```

**Docker Compose:**
```yaml
version: '3.8'
services:
  sweet-n4:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
```

```bash
docker-compose up -d
```

---

### 5. AWS S3 + CloudFront

**Pros:** Scalable, cheap, global CDN
**Best for:** High-traffic applications

**Steps:**

1. **Build:**
```bash
npm run build
```

2. **Create S3 bucket:**
```bash
aws s3 mb s3://sweet-n4-app
```

3. **Enable static website hosting:**
```bash
aws s3 website s3://sweet-n4-app \
  --index-document index.html \
  --error-document index.html
```

4. **Upload build:**
```bash
aws s3 sync dist/ s3://sweet-n4-app --delete
```

5. **Set bucket policy:**
```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadGetObject",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::sweet-n4-app/*"
  }]
}
```

6. **Create CloudFront distribution** (optional, for HTTPS + CDN)

---

### 6. Google Cloud Storage + CDN

Similar to AWS S3. Use `gsutil` for deployment:

```bash
gsutil -m rsync -r -d dist/ gs://sweet-n4-app
```

---

### 7. Azure Static Web Apps

1. Go to [Azure Portal](https://portal.azure.com)
2. Create **Static Web App**
3. Connect GitHub repo
4. Set build details:
   - **App location:** `/platform/sweet-n4`
   - **Output location:** `dist`
5. Deploy automatically via GitHub Actions

---

## 🔒 Security Checklist

Before deploying to production:

- [ ] Use HTTPS (most platforms auto-configure)
- [ ] Set secure headers in server config
- [ ] Enable CORS if needed
- [ ] Review browser console for errors
- [ ] Test on multiple devices
- [ ] Set up monitoring/analytics

**Security Headers (nginx example):**
```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
```

---

## 📊 Performance Optimization

### Build Optimization

Already configured in `vite.config.ts`:
- Code splitting
- Tree shaking
- Minification
- Vendor chunk separation

### Additional Tips:

1. **Enable gzip/brotli compression** (nginx example):
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

2. **Set cache headers:**
```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}
```

3. **Use CDN** for global distribution

---

## 🔄 CI/CD Setup

### GitHub Actions (Example)

`.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]
    paths:
      - 'platform/sweet-n4/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Install dependencies
        working-directory: ./platform/sweet-n4
        run: npm ci
        
      - name: Build
        working-directory: ./platform/sweet-n4
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./platform/sweet-n4
```

---

## 🌍 Custom Domain Setup

### Vercel:
1. Go to project settings → Domains
2. Add your domain (e.g., `app.sweetn4.com`)
3. Update DNS:
   - **Type:** CNAME
   - **Name:** app (or @)
   - **Value:** cname.vercel-dns.com

### Netlify:
1. Go to domain settings
2. Add custom domain
3. Update DNS:
   - **Type:** CNAME
   - **Name:** app
   - **Value:** your-site.netlify.app

---

## 📈 Monitoring

### Recommended Tools:

- **Vercel Analytics** - Built-in, free
- **Google Analytics** - Add tracking code to `index.html`
- **Sentry** - Error tracking
- **LogRocket** - Session replay

### Add Google Analytics:

In `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🆘 Troubleshooting

### Build fails:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### App shows blank page:
- Check browser console for errors
- Verify `base` in `vite.config.ts` matches deployment path
- Check server redirects for SPA routing

### 404 on refresh:
- Configure server to serve `index.html` for all routes
- See platform-specific SPA configuration above

---

## 📞 Support

For deployment issues:
- Check platform documentation
- Review build logs
- Test build locally first: `npm run build && npm run preview`

---

**Ready to deploy? Choose your platform and follow the steps above!** 🚀
