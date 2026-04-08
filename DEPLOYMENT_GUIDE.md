# AxioTools - Deployment Guide

## Pre-Deployment Checklist

### Frontend (React) - Vercel
```bash
cd frontend
npm run build
npm install -g vercel
vercel
```

**Steps:**
1. Login with GitHub/Google account
2. Select this project
3. Accept defaults or customize:
   - Production branch: main
   - Root directory: frontend
4. Get your URL: `https://your-project.vercel.app`

### Backend (Express) - Railway
1. Go to [railway.app](https://railway.app)
2. Create new project → Deploy from Git
3. Connect GitHub repository
4. Select branch: main
5. Create environment variables:

```
NODE_ENV=production
PORT=5000
```

6. Deploy
7. Get backend URL: `https://your-project-api.railway.app`

### Update Frontend API Calls

**File:** `frontend/src/App.jsx` or wherever you make API calls

**Find/Replace:**
```javascript
// Before
const API_URL = 'http://localhost:5000';

// After
const API_URL = 'https://your-project-api.railway.app';
```

### Domain Configuration

1. Get domain (FREE from Freenom or cheap from Namecheap)
2. Go to Vercel → Project Settings → Domains
3. Add your domain
4. Update DNS records (Vercel provides these)
5. Wait 5-10 minutes for activation

### SEO & Analytics Setup

**Google Analytics:**
1. Go to [analytics.google.com](https://analytics.google.com)
2. Create new property
3. Get Measurement ID (GA-XXXXXXXXX)
4. Update `public/index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"></script>
<script>
  gtag('config', 'YOUR_GA_ID');
</script>
```

**Google AdSense:**
1. Go to [google.com/adsense](https://www.google.com/adsense)
2. Sign up with your site
3. Wait for approval (1-3 days)
4. Get Publisher ID
5. Update `public/index.html`:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"></script>
```

### Submit to Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add your domain
3. Verify ownership (DNS record or HTML file)
4. Submit `/sitemap.xml`
5. Monitor performance

### Environment Variables

**Frontend (.env in frontend root):**
```
REACT_APP_API_URL=https://your-api.railway.app
```

**Backend (.env in backend root):**
```
NODE_ENV=production
PORT=5000
CORS_ORIGIN=https://your-domain.com
```

### Build & Test Locally

```bash
# Frontend
cd frontend
npm run build
npm start

# Backend
cd backend
npm start
```

### Performance Optimization

- [x] CSS minified
- [x] Images optimized
- [x] Code splitting done
- [x] SEO tags added
- [x] Sitemap created
- [x] Robots.txt configured

### Post-Deployment

1. Test all tools on production
2. Monitor Google Analytics
3. Check Search Console for errors
4. Share on social media
5. Request feedback

## Support

- Check backend logs: Railway dashboard
- Check frontend logs: Browser console
- Check errors: Google Search Console

---

**URLs After Deployment:**
- Frontend: `https://your-domain.com`
- Backend: `https://your-api.railway.app`
- Sitemap: `https://your-domain.com/sitemap.xml`
- Privacy: `https://your-domain.com/PRIVACY_POLICY.md`
