/**
 * Authentication Module
 * Handles login, logout, and user session management
 */

// Configuration for allowed schools
const SCHOOLS_CONFIG = [
  {
    id: "iktmc",
    name: "IKTMC",
    emailDomain: "@learn.iktmc.edu.hk",
    enabled: true
  }
  // Future schools can be added here
  // {
  //   id: "other-school",
  //   name: "Other School",
  //   emailDomain: "@learn.otherschool.edu.hk",
  //   enabled: true
  // }
];

// User storage key
const USER_SESSION_KEY = "hkdse_user_session";
const USER_PROGRESS_KEY = "hkdse_user_progress";

/**
 * Validate email against allowed schools
 */
function isValidEmail(email) {
  const trimmedEmail = email.trim().toLowerCase();
  
  for (const school of SCHOOLS_CONFIG) {
    if (!school.enabled) continue;
    
    if (trimmedEmail.endsWith(school.emailDomain)) {
      return {
        valid: true,
        school: school.id,
        schoolName: school.name
      };
    }
  }
  
  return { valid: false };
}

/**
 * Validate password (minimum 6 characters for now)
 */
function isValidPassword(password) {
  return password.length >= 6;
}

/**
 * Register/Login a user
 */
function loginUser(email, password) {
  const validation = isValidEmail(email);
  
  if (!validation.valid) {
    return {
      success: false,
      message: "Email not from an allowed school. Please use your school email."
    };
  }
  
  if (!isValidPassword(password)) {
    return {
      success: false,
      message: "Password must be at least 6 characters long."
    };
  }
  
  // Create user session
  const user = {
    email: email.trim().toLowerCase(),
    school: validation.school,
    schoolName: validation.schoolName,
    joinedAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  };
  
  // Store user session
  localStorage.setItem(USER_SESSION_KEY, JSON.stringify(user));
  
  // Initialize progress if not exists
  const progress = getProgress() || {
    email: user.email,
    topics: {}
  };
  localStorage.setItem(USER_PROGRESS_KEY, JSON.stringify(progress));
  
  return {
    success: true,
    message: "Login successful!",
    user: user
  };
}

/**
 * Get current logged-in user
 */
function getCurrentUser() {
  const userJson = localStorage.getItem(USER_SESSION_KEY);
  return userJson ? JSON.parse(userJson) : null;
}

/**
 * Check if user is logged in
 */
function isLoggedIn() {
  return getCurrentUser() !== null;
}

/**
 * Logout user
 */
function logoutUser() {
  localStorage.removeItem(USER_SESSION_KEY);
  localStorage.removeItem(USER_PROGRESS_KEY);
}

/**
 * Get user progress data
 */
function getProgress() {
  const progressJson = localStorage.getItem(USER_PROGRESS_KEY);
  return progressJson ? JSON.parse(progressJson) : null;
}

/**
 * Update progress for a specific topic
 */
function updateTopicProgress(topicId, score, total) {
  const progress = getProgress();
  
  if (!progress) {
    console.error("No progress data found");
    return false;
  }
  
  if (!progress.topics) {
    progress.topics = {};
  }
  
  // Store the latest attempt
  progress.topics[topicId] = {
    score: score,
    total: total,
    percentage: Math.round((score / total) * 100),
    lastAttempt: new Date().toISOString(),
    attempts: (progress.topics[topicId]?.attempts || 0) + 1
  };
  
  localStorage.setItem(USER_PROGRESS_KEY, JSON.stringify(progress));
  return true;
}

/**
 * Get all available topics (from the main index)
 */
function getAllTopics() {
  return [
    // Core A - Data Processing
    { id: "information-age", name: "Information Age", core: "A" },
    { id: "data-processing", name: "Data Processing", core: "A" },
    { id: "number-system", name: "Number System", core: "A" },
    { id: "twos-complement", name: "Two's Complement", core: "A" },
    { id: "character-coding", name: "Character Coding", core: "A" },
    { id: "data-control", name: "Data Control", core: "A" },
    { id: "parity-check-digit", name: "Parity Bit & Check Digit", core: "A" },
    { id: "data-compression", name: "Data Compression", core: "A" },
    { id: "spreadsheet", name: "Spreadsheet", core: "A" },
    { id: "presentation-software", name: "Presentation & Software", core: "A" },
    { id: "database", name: "Database Management", core: "A" },
    { id: "data-organisation", name: "Data Organisation", core: "A" },
    { id: "text-images", name: "Text and Images", core: "A" },
    
    // Core B - Computer System
    { id: "computer-system", name: "Computer System", core: "B" },
    { id: "processing-mode", name: "Mode of Processing", core: "B" },
    { id: "system-hardware", name: "System Hardware & CPU", core: "B" },
    { id: "main-memory", name: "Main Memory", core: "B" },
    { id: "io-devices", name: "I/O Devices", core: "B" },
    { id: "system-software", name: "System Software", core: "B" },
    { id: "storage", name: "Storage", core: "B" }
  ];
}

/**
 * Calculate overall progress
 */
function getOverallProgress() {
  const progress = getProgress();
  
  if (!progress || !progress.topics || Object.keys(progress.topics).length === 0) {
    return {
      topicsAttempted: 0,
      topicsTotal: getAllTopics().length,
      averageScore: 0,
      overallPercentage: 0
    };
  }
  
  const topics = progress.topics;
  const topicsAttempted = Object.keys(topics).length;
  const totalPercentage = Object.values(topics).reduce((sum, t) => sum + t.percentage, 0);
  const averageScore = Math.round(totalPercentage / topicsAttempted);
  
  return {
    topicsAttempted: topicsAttempted,
    topicsTotal: getAllTopics().length,
    averageScore: averageScore,
    overallPercentage: averageScore
  };
}

/**
 * Get topic progress
 */
function getTopicProgress(topicId) {
  const progress = getProgress();
  return progress?.topics?.[topicId] || null;
}

/**
 * Add a new school to the configuration
 * This function allows the system to be extended with new schools
 */
function addSchool(schoolId, schoolName, emailDomain) {
  const existingSchool = SCHOOLS_CONFIG.find(s => s.id === schoolId);
  
  if (existingSchool) {
    console.warn(`School with id "${schoolId}" already exists`);
    return false;
  }
  
  SCHOOLS_CONFIG.push({
    id: schoolId,
    name: schoolName,
    emailDomain: emailDomain,
    enabled: true
  });
  
  return true;
}

/**
 * Enable/disable a school
 */
function setSchoolEnabled(schoolId, enabled) {
  const school = SCHOOLS_CONFIG.find(s => s.id === schoolId);
  
  if (!school) {
    console.warn(`School with id "${schoolId}" not found`);
    return false;
  }
  
  school.enabled = enabled;
  return true;
}

/**
 * Get all enabled schools
 */
function getEnabledSchools() {
  return SCHOOLS_CONFIG.filter(s => s.enabled);
}
