# 🔐 Authentication & Student Dashboard System

## Overview

This system provides a complete authentication and progress tracking solution for the HKDSE ICT Practice platform. It allows students to:

- **Login** with their school email
- **Track progress** across all topics
- **View detailed statistics** on their dashboard
- **Automatically save** quiz results

## Features

### 1. Email-Based Authentication
- Only students with emails ending in `@learn.iktmc.edu.hk` can login
- Passwords are stored locally (client-side) and encrypted if needed in the future
- Simple, secure login flow

### 2. Scalable School Management
- Easily add new schools without changing code
- Enable/disable schools as needed
- Each school has its own email domain

### 3. Student Dashboard
- **Overall Progress**: View average score across all attempted topics
- **Topic Breakdown**: See individual scores, attempts, and timestamps
- **Visual Progress Bars**: Easy-to-understand progress visualization
- **Practice Again**: Quickly re-practice topics

### 4. Automatic Progress Tracking
- Quiz scores automatically saved after completion
- Tracks number of attempts per topic
- Records timestamps for each attempt
- Calculates percentages and averages

## File Structure

```
auth.js                 - Core authentication and progress functions
login.html             - Login page for students
dashboard.html         - Student progress dashboard
quiz.html              - Updated to save progress
index.html             - Updated with auth navigation
config/schools.json    - School configuration (reference)
```

## How to Use

### For Students

#### First Time Login
1. Click "Login" on the home page
2. Enter your IKTMC email: `yourname@learn.iktmc.edu.hk`
3. Enter a password (minimum 6 characters)
4. You'll be redirected to your dashboard

#### After Login
- View your overall progress on the dashboard
- See which topics you've attempted
- View your score for each topic
- Click "Start Practice" or "Practice Again" to take a quiz
- Your score will automatically be saved after you finish

#### Logout
- Click "Logout" in the navigation menu
- Your progress will be retained for next login

### For Admins

#### Adding a New School

Open `auth.js` and find the `SCHOOLS_CONFIG` array. Add a new school:

```javascript
const SCHOOLS_CONFIG = [
  {
    id: "iktmc",
    name: "IKTMC",
    emailDomain: "@learn.iktmc.edu.hk",
    enabled: true
  },
  // Add new school here:
  {
    id: "other-school",
    name: "Other School Name",
    emailDomain: "@learn.otherschool.edu.hk",
    enabled: true
  }
];
```

#### Using the `addSchool()` Function

You can programmatically add schools:

```javascript
addSchool("newschool", "New School", "@learn.newschool.edu.hk");
```

#### Disabling a School

```javascript
setSchoolEnabled("iktmc", false);  // Disable IKTMC temporarily
setSchoolEnabled("iktmc", true);   // Re-enable
```

## API Reference

### Authentication Functions

#### `loginUser(email, password)`
Authenticate a user and create a session.

**Parameters:**
- `email` (string): Student's school email
- `password` (string): Password (min 6 characters)

**Returns:**
```javascript
{
  success: boolean,
  message: string,
  user: {
    email: string,
    school: string,
    schoolName: string,
    joinedAt: ISO8601 timestamp,
    lastLogin: ISO8601 timestamp
  }
}
```

#### `getCurrentUser()`
Get the currently logged-in user.

**Returns:** User object or `null` if not logged in

#### `isLoggedIn()`
Check if a user is currently logged in.

**Returns:** Boolean

#### `logoutUser()`
Clear user session and progress data.

**Returns:** None

### Progress Functions

#### `updateTopicProgress(topicId, score, total)`
Save a student's quiz result.

**Parameters:**
- `topicId` (string): Topic identifier (e.g., "number-system")
- `score` (number): Points earned
- `total` (number): Total points available

**Returns:** Boolean (success/failure)

#### `getProgress()`
Get all progress data for current user.

**Returns:**
```javascript
{
  email: string,
  topics: {
    "topic-id": {
      score: number,
      total: number,
      percentage: number,
      lastAttempt: ISO8601 timestamp,
      attempts: number
    }
  }
}
```

#### `getTopicProgress(topicId)`
Get progress for a specific topic.

**Parameters:**
- `topicId` (string): Topic identifier

**Returns:** Topic progress object or `null`

#### `getOverallProgress()`
Get aggregate progress statistics.

**Returns:**
```javascript
{
  topicsAttempted: number,
  topicsTotal: number,
  averageScore: number,
  overallPercentage: number
}
```

### School Management Functions

#### `addSchool(schoolId, schoolName, emailDomain)`
Add a new school to the system.

**Parameters:**
- `schoolId` (string): Unique identifier
- `schoolName` (string): Display name
- `emailDomain` (string): Email domain (e.g., "@learn.school.edu.hk")

**Returns:** Boolean (success/failure)

#### `setSchoolEnabled(schoolId, enabled)`
Enable or disable a school.

**Parameters:**
- `schoolId` (string): School identifier
- `enabled` (boolean): Enable/disable status

**Returns:** Boolean (success/failure)

#### `getEnabledSchools()`
Get list of all enabled schools.

**Returns:** Array of school objects

#### `isValidEmail(email)`
Validate email against allowed schools.

**Parameters:**
- `email` (string): Email to validate

**Returns:**
```javascript
{
  valid: boolean,
  school: string,      // Only if valid
  schoolName: string   // Only if valid
}
```

## Data Storage

All data is stored in the browser's **localStorage**:

- `hkdse_user_session`: Current user session
- `hkdse_user_progress`: User's progress data

**Note:** This is client-side storage. For production:
1. Implement a backend server
2. Use secure authentication (OAuth, JWT)
3. Store data in a database
4. Add proper encryption

## Future Enhancements

### Backend Integration
```javascript
// Example: Implement these functions to call a server

async function loginUserBackend(email, password) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  return await response.json();
}

async function saveProgressBackend(topicId, score, total) {
  const user = getCurrentUser();
  return await fetch("/api/progress/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      email: user.email, 
      topicId, 
      score, 
      total 
    })
  });
}
```

### Password Security
- Hash passwords using bcrypt or similar
- Store hashed passwords, never plain text
- Implement password reset functionality
- Add 2FA for added security

### Email Verification
- Send verification email on first signup
- Prevent access until email is verified
- Allow password reset via email

### Analytics
- Track login frequency
- Monitor most attempted topics
- Identify struggling students
- Generate class reports

## Troubleshooting

### "Email not from an allowed school"
- Check that you're using your school email
- Verify the email ends with `@learn.iktmc.edu.hk`
- Contact your administrator if domain is different

### "Password must be at least 6 characters"
- Enter a password with 6 or more characters

### Progress not saving
- Ensure you complete the quiz fully
- Check that you're logged in
- Check browser console for errors

### Forgot password
- Currently: Clear browser cache/cookies and re-login
- Future: Implement password reset via email

## Security Notes

⚠️ **Current Implementation Notes:**
- This is a client-side authentication system
- **NOT suitable for production use**
- Passwords are stored as plain text in localStorage
- No encryption or hashing implemented

✅ **Before Production:**
1. Implement a backend server
2. Use proper password hashing (bcrypt)
3. Implement JWT or OAuth2 authentication
4. Use HTTPS everywhere
5. Add rate limiting on login attempts
6. Implement proper CORS policies
7. Add audit logging
8. Regular security audits

## Support

For questions or issues:
1. Check the console (F12) for error messages
2. Review this documentation
3. Contact your administrator
