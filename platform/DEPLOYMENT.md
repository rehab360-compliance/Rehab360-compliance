# Rehab360 Platform Deployment Guide

This guide covers deploying the Rehab360 therapy platform to various hosting providers.

## Prerequisites

- Node.js 20.x or later
- npm 10.x or later
- Git

## Build for Production

```bash
cd platform
npm install
npm run build
```

This creates an optimized production build in the `dist/` directory.

## Deployment Options

### 1. Vercel (Recommended)

Vercel offers zero-configuration deployment with automatic HTTPS, global CDN, and instant rollbacks.

#### Deploy via Vercel CLI

```bash
npm install -g vercel
cd platform
vercel
```

#### Deploy via Git Integration

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com) and sign in
3. Click "Add New Project"
4. Import your repository
5. Set root directory to `platform`
6. Deploy!

Configuration is automatically detected from `vercel.json`.

### 2. Netlify

#### Deploy via Netlify CLI

```bash
npm install -g netlify-cli
cd platform
npm run build
netlify deploy --prod --dir=dist
```

#### Deploy via Git Integration

1. Push your code to GitHub
2. Visit [netlify.com](https://netlify.com) and sign in
3. Click "Add new site" → "Import an existing project"
4. Connect your repository
5. Set base directory to `platform`
6. Set build command to `npm run build`
7. Set publish directory to `dist`
8. Deploy!

Configuration is automatically detected from `netlify.toml`.

### 3. GitHub Pages

GitHub Pages deployment is automated via GitHub Actions.

#### Setup

1. Go to your repository → Settings → Pages
2. Under "Build and deployment", select:
   - **Source**: GitHub Actions
3. Push to `main` branch (or manually trigger workflow)
4. Platform will be available at `https://<username>.github.io/<repo>/`

The deployment workflow is defined in `.github/workflows/deploy-platform.yml`.

### 4. Docker

Deploy using Docker for containerized deployment on any platform.

#### Build and Run Locally

```bash
cd platform

# Build the Docker image
docker build -t rehab360-platform .

# Run the container
docker run -d -p 8080:80 --name rehab360 rehab360-platform

# Visit http://localhost:8080
```

#### Using Docker Compose

```bash
cd platform
docker-compose up -d

# Visit http://localhost:8080

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

#### Deploy to Cloud

**AWS ECS/Fargate**
```bash
# Build and tag
docker build -t rehab360-platform .
docker tag rehab360-platform:latest <account-id>.dkr.ecr.<region>.amazonaws.com/rehab360:latest

# Push to ECR
aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <account-id>.dkr.ecr.<region>.amazonaws.com
docker push <account-id>.dkr.ecr.<region>.amazonaws.com/rehab360:latest

# Deploy via ECS
```

**Google Cloud Run**
```bash
# Build and push
gcloud builds submit --tag gcr.io/<project-id>/rehab360-platform

# Deploy
gcloud run deploy rehab360-platform \
  --image gcr.io/<project-id>/rehab360-platform \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

**Azure Container Instances**
```bash
# Build and push to ACR
az acr build --registry <registry-name> --image rehab360-platform:latest .

# Deploy
az container create \
  --resource-group <resource-group> \
  --name rehab360-platform \
  --image <registry-name>.azurecr.io/rehab360-platform:latest \
  --dns-name-label rehab360 \
  --ports 80
```

### 5. Manual Static Hosting

You can deploy the `dist/` folder to any static hosting provider:

```bash
cd platform
npm run build
# Upload contents of dist/ to your hosting provider
```

Popular options:
- **AWS S3 + CloudFront**
- **Google Cloud Storage**
- **Azure Static Web Apps**
- **Firebase Hosting**
- **Cloudflare Pages**

## Environment Variables

Currently, the platform runs entirely client-side with no environment variables required. Future features (e.g., API integration) may require:

- `VITE_API_URL` - Backend API endpoint
- `VITE_WS_URL` - WebSocket server for real-time features

Add environment variables via your hosting provider's dashboard or `.env.production` file (not committed to git).

## Production Checklist

- [ ] Run `npm run lint` - ensure no linting errors
- [ ] Run `npm run build` - verify build succeeds
- [ ] Test production build locally: `npm run preview`
- [ ] Verify all routes work (SPA routing)
- [ ] Check performance with Lighthouse
- [ ] Test on mobile devices
- [ ] Verify HTTPS is enabled
- [ ] Configure custom domain (if needed)
- [ ] Set up monitoring/analytics

## Local Preview

To preview the production build locally:

```bash
npm run build
npm run preview
# Visit http://localhost:4173
```

## Troubleshooting

### Build Fails

- Ensure Node.js version is 20.x or later: `node --version`
- Clear cache: `rm -rf node_modules package-lock.json && npm install`
- Check for TypeScript errors: `npx tsc --noEmit`

### Routing Issues (404 on Refresh)

The platform uses client-side routing. Configure your hosting provider to redirect all requests to `index.html`:

- **Vercel**: Already configured in `vercel.json`
- **Netlify**: Already configured in `netlify.toml`
- **Nginx**: `try_files $uri $uri/ /index.html;`
- **Apache**: Use `.htaccess` with rewrite rules

### Assets Not Loading

Check that the base path is configured correctly in `vite.config.ts`. For subdirectory deployments, set:

```ts
export default defineConfig({
  base: '/your-subdirectory/',
  // ...
})
```

## Performance Optimization

The production build includes:

- **Code splitting**: React, Router, and app code are separated
- **Minification**: JavaScript and CSS are minified
- **Tree shaking**: Unused code is removed
- **Compression**: Gzip/Brotli compression (server-side)
- **Cache headers**: Static assets cached for 1 year

## Monitoring

Consider adding:

- **Error tracking**: Sentry, Rollbar
- **Analytics**: Google Analytics, Plausible
- **Performance monitoring**: Vercel Analytics, Lighthouse CI
- **Uptime monitoring**: UptimeRobot, Pingdom

## Support

For deployment issues, check:
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
