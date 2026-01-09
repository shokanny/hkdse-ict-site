# Student Experience Guide

## What Students Will See

### 1. Home Page (index.html)

#### Not Logged In
```
┌─────────────────────────────────────────┐
│  HKDSE ICT Practice        [Login]      │
│  Core A & B Practice                    │
│  📚 Ready for exams · ✨ Student-friendly│
└─────────────────────────────────────────┘

[Core A Topics]
[Choose a topic to practice...]

[Core B Topics]  
[Choose a topic to practice...]

[Or Continue as Guest]
```

#### Logged In
```
┌─────────────────────────────────────────┐
│  HKDSE ICT Practice   [Dashboard|Logout]│
│  Core A & B Practice                    │
│  📚 Ready for exams · ✨ Student-friendly│
└─────────────────────────────────────────┘

[All topics available - click to practice]
```

### 2. Login Page (login.html)

```
┌──────────────────────────────────────┐
│              Login                   │
│       HKDSE ICT Practice            │
│                                      │
│  📚 Note: Only IKTMC students with   │
│  @learn.iktmc.edu.hk email can login │
│                                      │
│  School Email                        │
│  [student@learn.iktmc.edu.hk       ] │
│                                      │
│  Password                            │
│  [••••••••••••••••••••••••••••••••  ] │
│                                      │
│        [ Sign In ]                   │
│                                      │
│  ─────────────────────────────────   │
│  Continue as Guest                   │
│  (Practice without saving progress)  │
└──────────────────────────────────────┘
```

#### Login Examples
✅ **Valid**
- Email: `john@learn.iktmc.edu.hk`
- Password: `MyPassword123`

❌ **Invalid**
- Email: `john@gmail.com` → "Email not from allowed school"
- Email: `john@learn.iktmc.edu.hk`, Password: `abc` → "Password must be 6+ chars"

### 3. Student Dashboard (dashboard.html)

```
┌──────────────────────────────────────────────────────────┐
│  📊 Student Dashboard        john@learn.iktmc.edu.hk     │
│                              [ Logout ]                  │
└──────────────────────────────────────────────────────────┘

PROGRESS SUMMARY
┌────────────┐  ┌────────────┐  ┌────────────┐
│ Overall    │  │ Topics     │  │ Current    │
│ Progress   │  │ Completed  │  │ Average    │
│            │  │            │  │            │
│    75%     │  │     12     │  │    75%     │
│  average   │  │   of 21    │  │  across    │
│            │  │  topics    │  │ 12 topics  │
└────────────┘  └────────────┘  └────────────┘

CORE A – DATA PROCESSING
┌─────────────────┬─────────────────┬─────────────────┐
│ A - Number      │ A - Character   │ A - Data        │
│   System        │   Coding        │   Compression   │
│                 │                 │                 │
│ Score: 8/10     │ Score: 9/10     │ Not attempted   │
│ ████████░░ 80%  │ █████████░ 90%  │ ██████████░ 0%  │
│                 │                 │                 │
│ 📝 2 attempts   │ 📝 1 attempt     │ 📝 0 attempts   │
│                 │                 │                 │
│ [ Practice ... ]│ [Practice Again]│ [Start Practice]│
└─────────────────┴─────────────────┴─────────────────┘

[More Core A topics...]

CORE B – COMPUTER SYSTEM
┌─────────────────┬─────────────────┬─────────────────┐
│ B - Computer    │ B - Processing  │ B - System      │
│   System        │   Mode          │   Hardware      │
│                 │                 │                 │
│ Score: 7/10     │ Not attempted   │ Score: 10/10    │
│ ███████░░░ 70%  │ ██████████░ 0%  │ ██████████ 100% │
│                 │                 │                 │
│ 📝 3 attempts   │ 📝 0 attempts   │ 📝 1 attempt    │
│                 │                 │                 │
│ [Practice Again]│ [Start Practice]│ [Practice Again]│
└─────────────────┴─────────────────┴─────────────────┘

[More Core B topics...]
```

#### Dashboard Features
- **Overall Progress**: Quick glance at average performance
- **Topic Cards**: Each topic shows:
  - Score (if attempted)
  - Progress bar with percentage
  - Number of attempts
  - Quick action button
  
- **Organized by Core**: Core A and Core B separated for clarity
- **Progress Persistence**: Data saved even after logout

### 4. Quiz Page (quiz.html) - Logged In

```
┌──────────────────────────────────────────────────┐
│ Topic Quiz   [← Back | Dashboard | Logout]     │
│              💡 Answer letters or full text     │
│                           Score: 3 / 10         │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│ Question 4: What is 15 in binary?               │
│                                                  │
│ Choose an option or type your answer:           │
│ A. 1110                                         │
│ B. 1111                      ← [Selected]       │
│ C. 1010                                         │
│ D. 1100                                         │
│                                                  │
│ [Submit Answer]  [Next Question →]             │
│                                                  │
│ ✓ Correct! 15 = 8+4+2+1 = 1111 in binary     │
└──────────────────────────────────────────────────┘
```

#### Quiz Flow
1. Student answers questions
2. Submit → Get feedback + explanation
3. Next → Move to next question
4. Last question → Shows "Review all answers" option
5. After quiz → Results saved automatically
6. Can go back to dashboard to see updated progress

### 5. End of Quiz - Results Saved

```
┌──────────────────────────────────────────────────┐
│                 Quiz Complete!                  │
│                                                  │
│            Your Score: 8 / 10                   │
│                      80%                        │
│                                                  │
│            🎉 Excellent work!                   │
│                                                  │
│         [Back to Topics]  [Try Again]           │
│                                                  │
│  Note: Your score has been saved to your       │
│        dashboard!                               │
└──────────────────────────────────────────────────┘
```

When student goes back to dashboard → See updated score!

## Complete Student Journey

```
1. ARRIVE AT HOME PAGE
   ↓
2. Click "Login"
   ↓
3. ENTER CREDENTIALS
   john@learn.iktmc.edu.hk / MyPassword123
   ↓
4. REDIRECTED TO DASHBOARD
   ✓ Session saved: localStorage
   ✓ Progress loaded (if exists)
   ↓
5. VIEW PROGRESS
   ├─ 12 topics attempted
   ├─ 75% average score
   └─ 9 remaining topics
   ↓
6. CLICK "START PRACTICE" on Number System
   ↓
7. TAKE QUIZ
   ├─ Answer 10 questions
   ├─ Get instant feedback
   └─ See explanations
   ↓
8. SUBMIT QUIZ
   ├─ Score calculated: 8/10
   ├─ Progress saved: ✓
   └─ Redirected to dashboard
   ↓
9. DASHBOARD UPDATED
   ├─ Number System now shows 8/10
   ├─ Progress bar updated to 80%
   ├─ Attempts: 2
   └─ Overall progress: 76%
   ↓
10. CLICK "LOGOUT"
    ├─ Session cleared
    ├─ Redirected to login
    └─ Progress still saved!
    ↓
11. NEXT DAY - LOGIN AGAIN
    ├─ Same email/password
    ├─ All previous progress loaded
    └─ Can continue learning
```

## Data That Gets Saved

### When Student Logs In
```javascript
{
  email: "john@learn.iktmc.edu.hk",
  school: "iktmc",
  schoolName: "IKTMC",
  joinedAt: "2026-01-09T10:30:00Z",
  lastLogin: "2026-01-09T14:45:00Z"
}
```

### After Taking Quizzes
```javascript
{
  email: "john@learn.iktmc.edu.hk",
  topics: {
    "number-system": {
      score: 8,
      total: 10,
      percentage: 80,
      lastAttempt: "2026-01-09T14:45:00Z",
      attempts: 2
    },
    "character-coding": {
      score: 9,
      total: 10,
      percentage: 90,
      lastAttempt: "2026-01-09T15:20:00Z",
      attempts: 1
    }
  }
}
```

## Common Student Actions

### Trying Multiple Attempts
```
1st Attempt: Number System - 6/10 (60%)
   ↓ [Practice Again]
2nd Attempt: Number System - 8/10 (80%)
   ↓ Dashboard shows latest: 8/10 ✓
   ✓ Attempts counter: 2
```

### Returning After Days Off
```
Monday: Login, see previous scores
Tuesday: Not logged in, progress saved
Wednesday: Login again, all scores there! ✓
```

### Switching Between Topics
```
Take Quiz 1: Save score ✓
Back to Dashboard
Take Quiz 2: Save score ✓
Back to Dashboard
See both scores updated!
```

## Access Control

### Can Login
✅ `student@learn.iktmc.edu.hk` with valid password
✅ `teacher@learn.iktmc.edu.hk` with valid password (if added)

### Cannot Login
❌ `student@gmail.com` → Error shown
❌ `student@otherschool.edu.hk` → Error shown
❌ Valid email, wrong password → Error shown
❌ Valid email, short password (< 6 chars) → Error shown

### Can Always
✅ Continue as Guest (no login needed)
✅ Practice all topics as guest (progress not saved)

---

**Student Experience Summary**:
- Clean, intuitive interface
- Instant feedback on quizzes
- Progress automatically saved
- Beautiful progress visualization
- Easy navigation between dashboard and quizzes
- Secure authentication per school
