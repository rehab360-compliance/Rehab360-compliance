# Production Deployment Checklist

Use this checklist before deploying the Rehab360 platform to production.

## Pre-Deployment

### Code Quality
- [ ] All tests pass (when tests exist)
- [ ] ESLint passes: `npm run lint`
- [ ] TypeScript compiles without errors: `npx tsc --noEmit`
- [ ] Production build succeeds: `npm run build`
- [ ] No console errors or warnings in production build

### Security
- [ ] No hardcoded secrets, API keys, or credentials in code
- [ ] Environment variables configured correctly (.env.production)
- [ ] HTTPS enabled on hosting provider
- [ ] Security headers configured (CSP, X-Frame-Options, etc.)
- [ ] Dependencies scanned for vulnerabilities: `npm audit`
- [ ] Sensitive routes/pages require authentication (future)
- [ ] POPIA compliance verified for data handling

### Performance
- [ ] Lighthouse score > 90 (Performance, Accessibility, Best Practices, SEO)
- [ ] Images optimized and properly sized
- [ ] Bundle size acceptable (< 500KB initial load)
- [ ] Code splitting implemented (React, Router chunks)
- [ ] Static assets have long cache headers
- [ ] Gzip/Brotli compression enabled

### Functionality
- [ ] All pages/routes load correctly
- [ ] Navigation works (forward/back, direct URLs)
- [ ] Forms submit correctly
- [ ] Client-side routing (SPA) configured correctly
- [ ] 404 page displays for invalid routes (future)
- [ ] Error boundaries catch and display errors gracefully (future)

### Cross-Browser Testing
- [ ] Chrome/Edge (latest 2 versions)
- [ ] Firefox (latest 2 versions)
- [ ] Safari (latest 2 versions)
- [ ] Mobile browsers (iOS Safari, Chrome Android)

### Responsive Design
- [ ] Mobile (320px - 767px)
- [ ] Tablet (768px - 1023px)
- [ ] Desktop (1024px+)
- [ ] Large screens (1920px+)

## Deployment Configuration

### Hosting Provider Setup
- [ ] Hosting account created (Vercel/Netlify/AWS/etc.)
- [ ] Custom domain configured (if applicable)
- [ ] SSL/TLS certificate provisioned
- [ ] DNS records updated and propagated
- [ ] CDN configured (if applicable)

### CI/CD Pipeline
- [ ] GitHub Actions workflow configured
- [ ] Automated builds on push to main
- [ ] Automated deployments (or manual approval)
- [ ] Environment variables set in CI/CD
- [ ] Secrets configured securely

### Monitoring & Logging
- [ ] Error tracking configured (Sentry/Rollbar)
- [ ] Analytics configured (Google Analytics/Plausible)
- [ ] Uptime monitoring configured (UptimeRobot/Pingdom)
- [ ] Performance monitoring (Vercel Analytics/Lighthouse CI)
- [ ] Log aggregation (if using containers/servers)

## Post-Deployment

### Verification
- [ ] Production URL loads correctly
- [ ] All routes accessible
- [ ] SSL certificate valid
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Analytics tracking events
- [ ] Error monitoring receiving events

### Documentation
- [ ] Deployment process documented
- [ ] Environment variables documented
- [ ] Runbook for common issues created
- [ ] Team notified of deployment
- [ ] Changelog/release notes updated

### Backup & Recovery
- [ ] Backup strategy in place
- [ ] Rollback procedure tested
- [ ] Previous version tagged in git
- [ ] Recovery time objective (RTO) defined

## UTC/SAQA Compliance Specific

### POPIA Compliance
- [ ] Data encryption in transit (HTTPS)
- [ ] No PII stored in client-side storage without encryption
- [ ] Cookie consent banner (if tracking cookies used)
- [ ] Privacy policy linked and accessible
- [ ] Data retention policies implemented

### Accessibility (SAQA Requirements)
- [ ] WCAG 2.1 Level AA compliance
- [ ] Keyboard navigation works
- [ ] Screen reader tested (NVDA/JAWS/VoiceOver)
- [ ] Color contrast meets requirements
- [ ] Alt text for images
- [ ] Proper heading hierarchy
- [ ] Form labels and error messages accessible

### Clinical Standards
- [ ] UTC module alignment verified
- [ ] NQF Level 4/5 content accuracy verified
- [ ] Therapist credentials properly displayed
- [ ] Session documentation features working
- [ ] Client confidentiality maintained

## Rollback Plan

If issues arise post-deployment:

1. **Immediate**: Revert to previous deployment via hosting provider
2. **Git**: `git revert <commit>` and redeploy
3. **Hosting**: Use platform's rollback feature (Vercel/Netlify one-click)
4. **Communication**: Notify users via status page/email
5. **Investigation**: Review logs, errors, and metrics
6. **Fix**: Address issues in development
7. **Redeploy**: Follow this checklist again

## Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Developer | | | |
| QA/Tester | | | |
| Project Manager | | | |
| Clinical Lead | | | |
| Compliance Officer | | | |

---

**Deployment Date**: _______________  
**Deployment Time**: _______________  
**Deployed By**: _______________  
**Environment**: [ ] Staging [ ] Production  
**Version/Tag**: _______________  
