# 🚀 Quick Start Guide

## Step 1: Open the Website
Just double-click `index.html` - it opens in your browser!

## Step 2: Test It
- Click any "Practice" button
- Answer a question
- See if it works!

## Step 3: Add Your First Question

1. Open `data/questions-number-system.json`
2. Copy this block:
```json
  {
    "id": 3,
    "type": "mc",
    "question": "Convert 15 to binary",
    "options": ["1110", "1111", "1010", "1100"],
    "answer": "1111",
    "explanation": "15 = 8+4+2+1 = 1111 in binary"
  }
```
3. Paste it after the last `}` (add a comma before it!)
4. Save the file
5. Refresh the browser
6. Your new question appears!

## Step 4: Add a New Topic (Optional)

1. Create `data/questions-YOUR-TOPIC.json` (copy from existing file)
2. Add a button in `index.html`:
```html
<button onclick="startTopic('YOUR-TOPIC')">Practice Your Topic</button>
```

## That's It! 🎉

The website is ready to use. Everything else is optional.

---

## Optional: Enable AI

1. Get API key from https://platform.openai.com/api-keys
2. Open `ai-helper.js`
3. Replace `YOUR_API_KEY_HERE` with your key
4. Change `AI_ENABLED = false` to `AI_ENABLED = true`
5. Done! (But it costs money, so only enable if you need it)
