# HKDSE ICT Practice Website

A simple, copy-paste ready website for HKDSE ICT Core A practice (A1 & A2 topics).

## 📁 File Structure

```
hkdse-ict-site/
├── index.html              # Main page with topic selection
├── quiz.html               # Quiz page
├── script.js               # Quiz logic
├── style.css               # Styling
├── ai-helper.js            # AI integration (optional)
├── data/                   # Question files (JSON)
│   ├── questions-number-system.json
│   ├── questions-information-system.json
│   ├── questions-data-organisation.json
│   ├── questions-database.json
│   └── questions-text-images.json
└── README.md               # This file
```

## 🚀 Quick Start

1. **Open the website**: Just open `index.html` in your browser (double-click it)
2. **No installation needed**: This is pure HTML/CSS/JavaScript - works offline!

## ✏️ How to Add Questions

### Step 1: Create a JSON file
Create a new file in the `data/` folder: `questions-YOUR-TOPIC.json`

### Step 2: Copy-paste this template:

```json
[
  {
    "id": 1,
    "type": "mc",
    "question": "Your question here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": "Option A",
    "explanation": "Why this is correct..."
  },
  {
    "id": 2,
    "type": "short",
    "question": "Your short answer question?",
    "answer": "Correct answer",
    "explanation": "Explanation here..."
  }
]
```

### Step 3: Add button in index.html
Find the section for A1 or A2, and add:
```html
<button onclick="startTopic('YOUR-TOPIC')">
  Practice Your Topic Name
</button>
```

**That's it!** The quiz will automatically load your questions.

## 🤖 Adding AI (Optional)

### What AI Can Do:
- Generate better explanations for wrong answers
- Create practice questions automatically
- Provide personalized hints

### How to Enable:

1. **Get an API key** from OpenAI: https://platform.openai.com/api-keys
2. **Edit `ai-helper.js`**:
   - Replace `YOUR_API_KEY_HERE` with your actual key
   - Set `AI_ENABLED = true`
3. **Add to quiz.html** (before `</body>`):
   ```html
   <script src="ai-helper.js"></script>
   ```
4. **Update `script.js`** to use AI (see example in `ai-helper.js`)

### ⚠️ Important:
- **Never share your API key** - it costs money!
- **Don't commit it to GitHub** - add `ai-helper.js` to `.gitignore`
- AI is optional - the site works perfectly without it

## 🎯 Topics Included

### A1 - Information Processing (1)
- ✅ 1.1 Information System
- ✅ 3.1 Number System and Representation

### A2 - Information Processing (2)
- ✅ 2.1 Data Organisation
- ✅ 2.2 Database
- ✅ 3.2 Text and Images

## ⚠️ Potential Difficulties & Solutions

### 1. **Questions not loading?**
- **Problem**: Browser blocks local files (CORS error)
- **Solution**: Use a local server:
  ```bash
  # Python 3
  python -m http.server 8000
  
  # Then open: http://localhost:8000
  ```

### 2. **AI not working?**
- **Problem**: API key invalid or no credits
- **Solution**: Check your OpenAI account balance. AI is optional anyway!

### 3. **Styling looks broken?**
- **Problem**: CSS file not linked
- **Solution**: Check that `style.css` is in the same folder as `index.html`

### 4. **Questions appear blank?**
- **Problem**: JSON syntax error
- **Solution**: Use a JSON validator: https://jsonlint.com/

### 5. **Button doesn't work?**
- **Problem**: Topic name mismatch
- **Solution**: Make sure the button's `onclick` topic matches the JSON filename:
  - Button: `startTopic('my-topic')`
  - File: `questions-my-topic.json`

## 📝 Question Types

### Multiple Choice (`"type": "mc"`)
```json
{
  "type": "mc",
  "question": "What is 2+2?",
  "options": ["3", "4", "5", "6"],
  "answer": "4",
  "explanation": "Basic addition: 2+2=4"
}
```

### Short Answer (`"type": "short"`)
```json
{
  "type": "short",
  "question": "What is the capital of France?",
  "answer": "Paris",
  "explanation": "Paris is the capital and largest city of France."
}
```

## 🛠️ Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling
- **JavaScript (ES6+)** - Logic
- **JSON** - Data storage
- **OpenAI API** (optional) - AI features

## 📚 Next Steps

1. **Add more questions** - Copy the JSON template and fill it in
2. **Customize styling** - Edit `style.css` to match your preferences
3. **Add more topics** - Follow the same pattern for A3, A4, etc.
4. **Enable AI** - When ready, add your API key for enhanced features

## 💡 Tips

- **Start simple**: Add 2-3 questions per topic first, test it, then add more
- **Test locally**: Always test in your browser before deploying
- **Keep backups**: Save your JSON files somewhere safe
- **Use a code editor**: VS Code or Cursor makes editing easier

## 🆘 Need Help?

- Check browser console (F12) for errors
- Validate JSON files before adding them
- Test one topic at a time
- Keep the structure simple - it's easier to maintain!

---

**Remember**: This is designed to be ultra-simple. Copy, paste, edit, and you're done! 🎉
