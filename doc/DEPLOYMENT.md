# Deployment Guide - shirinprajapati.com

## Prerequisites

- GitHub account
- Vercel account (free tier works perfectly)
- Domain: shirinprajapati.com (already owned)

---

## Step 1: Push Code to GitHub

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Windows XP Portfolio"
   ```

2. **Create GitHub Repository**:
   - Go to https://github.com/new
   - Name: `Personal_Portfolio` (or any name)
   - Make it Public or Private
   - Don't initialize with README (already have one)

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/Personal_Portfolio.git
   git branch -M main
   git push -u origin main
   ```

---

## Step 2: Deploy to Vercel

### Option A: Vercel CLI (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```
   - Follow prompts
   - Confirm project settings
   - Accept defaults (Vite framework auto-detected)

4. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

### Option B: Vercel Dashboard (Easier for First Time)

1. **Go to Vercel**:
   - Visit https://vercel.com
   - Sign up/Login with GitHub

2. **Import Project**:
   - Click "Add New..." → "Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Project**:
   - Framework Preset: **Vite** (auto-detected)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Deploy**:
   - Click "Deploy"
   - Wait ~2-3 minutes
   - You'll get a URL like: `your-project.vercel.app`

---

## Step 3: Configure Custom Domain

1. **Add Domain in Vercel**:
   - Go to your project dashboard
   - Click "Settings" → "Domains"
   - Add domain: `shirinprajapati.com`
   - Also add: `www.shirinprajapati.com`

2. **Configure DNS** (at your domain registrar):

   **For root domain (shirinprajapati.com):**
   - Type: `A`
   - Name: `@`
   - Value: `76.76.21.21` (Vercel's IP)

   **For www subdomain:**
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`

   **Alternative (recommended):**
   - Type: `CNAME`
   - Name: `@`
   - Value: `cname.vercel-dns.com` (if your registrar supports CNAME flattening)

3. **Wait for DNS Propagation**:
   - Usually takes 5-60 minutes
   - Check status in Vercel dashboard
   - Vercel auto-issues SSL certificate

---

## Step 4: Environment Variables (if needed)

1. **In Vercel Dashboard**:
   - Go to Settings → Environment Variables
   - Add any needed variables (currently none required)

---

## Step 5: Verify Deployment

1. **Check Site**:
   - Visit `https://shirinprajapati.com`
   - Test all windows and interactions
   - Verify analytics tracking in console

2. **Performance Check**:
   - Run Lighthouse audit
   - Target: LCP <1.2s, all scores ≥90

3. **Analytics Setup** (optional):
   - Add Plausible script to `index.html` if using
   - Or keep console logging for now

---

## Continuous Deployment

Once connected to GitHub:

1. **Automatic Deploys**:
   - Every push to `main` → deploys to production
   - Pull requests → preview deployments

2. **Manual Deploy**:
   ```bash
   git add .
   git commit -m "Update: description"
   git push
   ```
   - Vercel auto-deploys in ~2 minutes

---

## Troubleshooting

### Build Fails
```bash
# Test build locally first
npm run build
npm run preview
```

### Domain Not Working
- Check DNS propagation: https://dnschecker.org
- Verify A/CNAME records
- Check Vercel domain status (should show green checkmark)

### 404 Errors
- Vercel.json handles routing (already configured)
- All routes point to index.html for SPA

### Large Bundle Size
- Mermaid.js is large (~700KB)
- Consider lazy-loading if needed
- Already using code splitting

---

## Production Checklist

- [x] Build succeeds locally
- [x] All windows function correctly
- [x] Analytics tracking works
- [x] Keyboard shortcuts active
- [x] Mobile responsive (partial)
- [ ] GitHub repository created
- [ ] Vercel deployment configured
- [ ] Custom domain connected
- [ ] SSL certificate issued (auto by Vercel)
- [ ] DNS propagated

---

## Quick Commands

```bash
# Local development
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Deploy to Vercel (if using CLI)
vercel --prod

# Check deployment status
vercel ls
```

---

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Vite Docs**: https://vitejs.dev/guide/static-deploy.html
- **Domain Issues**: Contact your domain registrar

---

*Deployment configured: 2025-10-02*
