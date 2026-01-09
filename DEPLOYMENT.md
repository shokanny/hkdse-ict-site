# Deployment & Setup Guide

## Installation

### No Installation Needed! 🎉

This system is pure HTML/CSS/JavaScript. Just copy the files to a web server.

## Deployment Steps

### Step 1: Prepare Files

Make sure you have these files in your project folder:

```
✓ auth.js
✓ login.html
✓ dashboard.html
✓ quiz.html (updated)
✓ index.html (updated)
✓ style.css
✓ script.js
✓ ai-helper.js
✓ All files in data/ folder
✓ config/schools.json
```

### Step 2: Deploy to Web Server

#### Option A: Local Testing (Python)
```bash
# In the project folder:
python -m http.server 8000

# Then visit:
http://localhost:8000
```

#### Option B: GitHub Pages
1. Push to GitHub
2. Settings → Pages → Deploy from branch
3. Select main branch
4. Wait for deployment
5. Site live at: `https://username.github.io/repo-name`

#### Option C: Web Hosting (Netlify/Vercel)
1. Connect GitHub repo
2. Auto-deploys on push
3. No configuration needed

#### Option D: Traditional Hosting
1. Upload files to FTP/SFTP
2. Point domain to folder
3. Done!

### Step 3: Test

1. **Open home page**: `https://yoursite.com` or `localhost:8000`
2. **Click Login**
3. **Test with sample data**:
   - Email: `test@learn.iktmc.edu.hk`
   - Password: `password123`
4. **Verify dashboard loads**
5. **Take a quiz and check progress saves**
6. **Logout and login again** - progress should persist

## Configuration

### Add Your School(s)

Edit `auth.js` line ~5:

```javascript
const SCHOOLS_CONFIG = [
  {
    id: "iktmc",
    name: "IKTMC",
    emailDomain: "@learn.iktmc.edu.hk",
    enabled: true
  },
  // Add your schools here
];
```

### Customize Login Page

Edit `login.html` to match your brand:

```html
<!-- Line ~20: Change title -->
<h1>Login</h1>

<!-- Line ~21: Change info message -->
<div class="info-box">
  <strong>📚 Note:</strong> Only IKTMC students with @learn.iktmc.edu.hk email can login.
</div>
```

### Customize Colors

Edit `style.css`:

```css
:root {
  --brand: #2563eb;           /* Primary blue */
  --brand-dark: #1d4ed8;      /* Darker blue */
  --surface: #0f172a;         /* Dark background */
  --card: #ffffff;            /* White cards */
  --muted: #6b7280;           /* Gray text */
}
```

## Browser Compatibility

| Browser | Status | Version |
|---------|--------|---------|
| Chrome | ✅ Fully supported | Latest |
| Edge | ✅ Fully supported | Latest |
| Firefox | ✅ Fully supported | Latest |
| Safari | ✅ Fully supported | Latest 2 versions |
| Mobile | ✅ Fully supported | Modern browsers |

## Performance

### Load Times
- Home page: < 1 second
- Login: < 0.5 seconds
- Dashboard: < 0.5 seconds
- Quiz: < 1 second

### Data Size
- Total: ~150 KB (with all questions)
- auth.js: ~8 KB
- dashboard.html: ~15 KB
- One quiz page: ~5 KB

### Storage
- Per student session: ~2 KB
- Per student progress: ~5-10 KB (grows with attempts)
- No server storage required

## Security Checklist

- [ ] Changed default school config
- [ ] Added your school email domains
- [ ] Tested login with your email format
- [ ] Tested guest mode works
- [ ] Tested logout clears session
- [ ] Tested progress saves
- [ ] Removed any test accounts

## Production Deployment

### Before Going Live

1. **Test thoroughly**
   - [ ] All login scenarios
   - [ ] All quiz scenarios
   - [ ] Progress tracking
   - [ ] Mobile/tablet view
   - [ ] All browsers

2. **Security**
   - [ ] Use HTTPS (not HTTP)
   - [ ] SSL certificate installed
   - [ ] No sensitive info in code

3. **Performance**
   - [ ] Minify CSS/JS (optional)
   - [ ] Enable gzip compression
   - [ ] Set cache headers
   - [ ] CDN for assets (optional)

4. **Monitoring**
   - [ ] Set up error tracking
   - [ ] Monitor page load times
   - [ ] Track user signups
   - [ ] Monitor storage usage

### HTTPS Setup

Essential for production!

#### Using Let's Encrypt (Free)
```bash
# Certbot for Apache/Nginx
sudo apt install certbot
sudo certbot certonly --standalone -d yourdomain.com
```

#### Using Cloud Providers
- Netlify: Automatic ✓
- Vercel: Automatic ✓
- AWS/CloudFlare: Dashboard setup

### Environment Variables (Optional)

For future backend integration:

```javascript
// Create config file: config.js
const CONFIG = {
  apiUrl: process.env.API_URL || "http://localhost:3000",
  environment: process.env.NODE_ENV || "development"
};
```

## Scaling Considerations

### Current Limits
- No server = no real limit
- Each user's storage: ~20 KB
- Browser localStorage limit: 5-10 MB per site
- Supports thousands of simultaneous users

### To Scale Further

Implement a backend:

```
Frontend (Current)     Backend (New)
─────────────────     ─────────────
auth.js       ────→   auth-server.js
login.html    ────→   API endpoints
dashboard.html ────→  Database
quiz.html     ────→   User sessions
```

## Backup Strategy

### Important Files to Backup
```
auth.js              (authentication)
login.html           (login page)
dashboard.html       (dashboard page)
quiz.html            (quiz page)
data/                (all questions)
config/              (school config)
```

### Regular Backups
```bash
# Weekly backup
tar -czf backup-$(date +%Y%m%d).tar.gz /path/to/project

# Or use GitHub
git add .
git commit -m "Weekly backup"
git push
```

## Troubleshooting Deployment

### 404 Error - Page Not Found
- [ ] Check all files are uploaded
- [ ] Check file paths (case-sensitive on Linux)
- [ ] Check index.html is the root file
- [ ] Check .htaccess for rewrites

### 403 Error - Permission Denied
- [ ] Check file permissions (644 for files, 755 for folders)
- [ ] Check folder ownership
- [ ] Check .htaccess restrictions

### CSS/JS Not Loading
- [ ] Check file paths in HTML
- [ ] Check MIME types (should be text/css, text/javascript)
- [ ] Check .htaccess doesn't block them
- [ ] Check browser cache (Ctrl+Shift+R)

### localStorage Not Working
- [ ] Check incognito/private browsing
- [ ] Check if site is over HTTPS
- [ ] Check browser privacy settings
- [ ] Check browser storage limits

### Login Not Working
- [ ] Check auth.js is loaded (F12 console)
- [ ] Check SCHOOLS_CONFIG has your domain
- [ ] Check email format exactly
- [ ] Check no typos in email domain

## Monitoring

### Set Up Error Tracking

Option 1: Sentry (Free)
```javascript
// In login.html and dashboard.html
<script src="https://browser.sentry-cdn.com/7.84.0/bundle.min.js"></script>
<script>
Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: "production"
});
</script>
```

Option 2: Console Logs
```javascript
// Add to auth.js for debugging
console.log("User logged in:", user);
console.log("Progress saved:", progress);
```

Option 3: Analytics
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
```

## Update Process

### To Update in Future

1. Make changes locally
2. Test thoroughly
3. Backup old version
4. Upload new files
5. Test on live site
6. Monitor for issues

### Version Control with Git

```bash
# Push to main branch
git add .
git commit -m "Update: Add schools, fix login"
git push origin main

# If deployed to GitHub Pages/Netlify, auto-deploys!
```

## Support for Users

### Help Page (Optional)

Create `help.html` with:
```html
<h1>How to Login</h1>
<ol>
  <li>Go to login page</li>
  <li>Use your school email</li>
  <li>Create a password (6+ chars)</li>
  <li>See your progress on dashboard</li>
</ol>
```

### Email Address

Provide support email for students:
```html
<!-- In login.html footer -->
Questions? Email support@yourschool.edu
```

## Migration (If Switching Servers)

### From Old System
```bash
# Export old data if exists
1. Backup old progress files
2. Import to new localStorage
3. Test old user can login
4. Verify progress transfers
```

## Cost Analysis

| Hosting | Cost | Storage | Bandwidth |
|---------|------|---------|-----------|
| Localhost | Free | Unlimited | N/A |
| GitHub Pages | Free | Unlimited | Unlimited |
| Netlify | Free | Unlimited | 100GB/mo |
| Vercel | Free | Unlimited | Unlimited |
| AWS | $0.50-3/mo | 1GB included | 1GB free |
| DigitalOcean | $5/mo | 25GB | Unlimited |

**Recommended**: GitHub Pages (free, automatic)

## SSL Certificate

### For HTTPS (Essential!)

```
Netlify/Vercel: ✓ Automatic
GitHub Pages: ✓ Automatic (https://username.github.io)
Traditional Host: 
  - Use certbot (Let's Encrypt)
  - Use cPanel/Plesk
  - Buy from certificate provider
```

## CDN Setup (Optional)

For faster global delivery:

```
CloudFlare:
1. Add domain
2. Update nameservers
3. Enable caching
4. Automatically includes HTTPS

Cost: Free tier available
```

## Final Checklist

- [ ] All files uploaded
- [ ] auth.js configured with your schools
- [ ] HTTPS enabled
- [ ] Tested login works
- [ ] Tested dashboard works
- [ ] Tested progress saves
- [ ] Mobile view tested
- [ ] Logout tested
- [ ] Error pages working
- [ ] Monitoring set up
- [ ] Backup process established
- [ ] Support contact info provided

---

**Deployment Complete!** Your system is live and ready for students. 🚀
