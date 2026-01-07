# 🔧 Troubleshooting: Questions Not Showing

## Problem: Questions don't appear in quiz.html

This is usually a **CORS (Cross-Origin Resource Sharing) error** when opening HTML files directly.

## ✅ Solution 1: Use a Local Server (Recommended)

### Option A: Python (Easiest)
1. Open Terminal/Command Prompt
2. Navigate to your project folder:
   ```bash
   cd /Users/shokannakan/Desktop/hkdse-ict-site
   ```
3. Start a server:
   ```bash
   # Python 3
   python3 -m http.server 8000
   
   # Or Python 2
   python -m SimpleHTTPServer 8000
   ```
4. Open browser and go to: `http://localhost:8000`

### Option B: VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Option C: Node.js (if you have it)
```bash
npx http-server -p 8000
```

## ✅ Solution 2: Check Browser Console

1. Open quiz.html
2. Press `F12` (or right-click → Inspect)
3. Go to "Console" tab
4. Look for red error messages
5. Share the error message if you need help

## ✅ Solution 3: Verify File Structure

Make sure your files are organized like this:
```
hkdse-ict-site/
├── index.html
├── quiz.html
├── script.js
├── style.css
└── data/
    ├── questions-number-system.json
    ├── questions-database.json
    └── ... (other JSON files)
```

## ✅ Solution 4: Test with a Simple Question File

Try opening this URL directly in browser:
- `http://localhost:8000/data/questions-number-system.json`

If you see JSON data, the file is loading correctly!

## Common Errors:

### "Failed to fetch" or "CORS policy"
→ Use Solution 1 (local server)

### "404 Not Found"
→ Check file path and name match exactly

### "Unexpected token" or JSON error
→ Validate JSON at https://jsonlint.com/

---

**Quick Test**: After starting a server, go to:
`http://localhost:8000/quiz.html?topic=number-system`

You should see the first question!
