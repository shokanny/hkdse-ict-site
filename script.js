// read ?topic=number-system from URL
function getTopicFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("topic") || "number-system";
}

let questions = [];
let currentIndex = 0;
let totalPoints = 0;
let answered = false;

// Results array for the current quiz session. Each entry will store:
// { questionId, questionText, options, correctAnswer, userAnswer, isCorrect, explanation }
const results = []; // Collecting results (see comments below)

async function loadQuestions() {
  try {
    const topic = getTopicFromUrl();
    const res = await fetch(`data/questions-${topic}.json`);
    
    if (!res.ok) {
      throw new Error(`Failed to load questions: ${res.status}`);
    }
    
    questions = await res.json();
    
    if (!questions || questions.length === 0) {
      throw new Error("No questions found in file");
    }
    
    currentIndex = 0;
    totalPoints = 0;
    updateScore();
    showQuestion();
  } catch (error) {
    console.error("Error loading questions:", error);
    document.getElementById("question-text").textContent = 
      "Error loading questions. Please check the console or try a different topic.";
    document.getElementById("question-text").style.color = "red";
  }
}

function updateScore() {
  const scoreElement = document.getElementById("score");
  if (scoreElement) {
    scoreElement.textContent = `Score: ${totalPoints} / ${questions.length}`;
  }
}

function showQuestion() {
  if (currentIndex >= questions.length) {
    showFinalResults();
    return;
  }

  const q = questions[currentIndex];
  const qText = document.getElementById("question-text");
  const optionsDiv = document.getElementById("options");
  const shortInput = document.getElementById("short-answer");
  const feedback = document.getElementById("feedback");
  const nextBtn = document.getElementById("next-btn");
  const submitBtn = document.getElementById("submit-btn");

  // Reset state
  answered = false;
  qText.textContent = `Question ${currentIndex + 1}: ${q.question}`;
  feedback.textContent = "";
  feedback.className = "";
  nextBtn.style.display = "none";
  submitBtn.style.display = "inline-block";
  shortInput.value = "";
  shortInput.disabled = false;
  shortInput.style.display = "block";
  shortInput.focus();

  // Clear options (for MC questions, we'll still show text box)
  optionsDiv.innerHTML = "";
  document.getElementById("warning-msg").style.display = "none";
  
  // Show options as reference but use text box for answer
  if (q.type === "mc" && q.options) {
    // Show radio buttons for MC questions
    const optionsList = document.createElement("ul");
    optionsList.style.listStyle = "none";
    optionsList.style.padding = "0";
    optionsList.style.margin = "12px 0";
    q.options.forEach((opt, idx) => {
      const li = document.createElement("li");
      li.className = "radio-option";
      const id = `opt-${currentIndex}-${idx}`;
      li.innerHTML = `\n        <label for="${id}" style="display:flex; gap:12px; align-items:center; width:100%; cursor:pointer;">\n          <input type=\"radio\" name=\"mc-choice\" id=\"${id}\" value=\"${idx}\">\n          <span class=\"opt-label\">${String.fromCharCode(65 + idx)}. ${opt}</span>\n        </label>\n      `;
      optionsDiv.appendChild(li);
    });
    // Hide short-answer input for MC questions
    shortInput.style.display = "none";
  } else {
    // non-MC: show short input and hide radio options
    shortInput.style.display = "block";
  }
}

function normalise(text) {
  return String(text).trim().toLowerCase();
}

function checkAnswer(userAnswer) {
  if (answered) return; // Prevent double submission
  
  answered = true;
  const q = questions[currentIndex];
  const feedback = document.getElementById("feedback");
  const nextBtn = document.getElementById("next-btn");
  const submitBtn = document.getElementById("submit-btn");
  const shortInput = document.getElementById("short-answer");

  // Allow different input shapes for MC questions:
  // - If userAnswer is a letter (A/B/C) or an index ("0"/"1"), map it to the option text.
  // This keeps answer comparison consistent (always compare option text when possible).
  let originalUserAnswer = userAnswer;
  if (q.type === "mc" && q.options) {
    const s = String(userAnswer).trim();
    if (/^[a-zA-Z]$/.test(s)) {
      // letter -> index
      const idx = s.toUpperCase().charCodeAt(0) - 65;
      if (q.options[idx] !== undefined) {
        userAnswer = q.options[idx];
      }
    } else if (/^\d+$/.test(s)) {
      const idx = parseInt(s, 10);
      if (q.options[idx] !== undefined) {
        userAnswer = q.options[idx];
      }
    }
  }

  // Normalize answer comparison
  const userAns = normalise(userAnswer);
  const correctAns = normalise(q.answer);
  
  // Simple direct comparison: does normalized user answer match normalized correct answer?
  let isCorrect = userAns === correctAns;

  shortInput.disabled = true;
  submitBtn.style.display = "none";

  if (isCorrect) {
    totalPoints++;
    feedback.textContent = "✓ Correct! " + q.explanation;
    feedback.className = "feedback-correct";
  } else {
    feedback.textContent = "✗ Incorrect. Correct answer: " + q.answer + ". " + q.explanation;
    feedback.className = "feedback-wrong";
  }

  // --- Collecting results for review ---
  // Store current question result into the `results` array
  // This is the code section responsible for collecting results.
  const resultEntry = {
    questionId: q.id || (currentIndex + 1),
    questionText: q.question,
    options: q.options || [],
    correctAnswer: q.answer,
    userAnswer: userAnswer,
    isCorrect: !!isCorrect,
    explanation: q.explanation || ""
  };
  results[currentIndex] = resultEntry; // keep index aligned with question order
  // --- end collecting results ---

  updateScore();
  // If this was the last question, show finished options instead of only next
  if (currentIndex >= questions.length - 1) {
    // Show finish screen with review button
    showFinishScreen();
  } else {
    nextBtn.style.display = "inline-block";
  }
}

function showFinalResults() {
  const quizBox = document.getElementById("quiz-box");
  const percentage = Math.round((totalPoints / questions.length) * 100);
  
  quizBox.innerHTML = `
    <h2>Quiz Complete!</h2>
    <div style="text-align: center; padding: 20px;">
      <p style="font-size: 24px; margin: 20px 0;">
        Your Score: <strong>${totalPoints} / ${questions.length}</strong>
      </p>
      <p style="font-size: 20px; color: ${percentage >= 70 ? 'green' : percentage >= 50 ? 'orange' : 'red'};">
        ${percentage}%
      </p>
      <p style="margin-top: 20px;">
        ${percentage >= 70 ? '🎉 Excellent work!' : percentage >= 50 ? '👍 Good effort!' : '💪 Keep practicing!'}
      </p>
      <button onclick="window.location.href='index.html'" style="margin-top: 20px; padding: 12px 24px; font-size: 16px;">
        Back to Topics
      </button>
      <button onclick="location.reload()" style="margin-top: 20px; padding: 12px 24px; font-size: 16px; margin-left: 10px;">
        Try Again
      </button>
    </div>
  `;
}

// Shows a small finish screen when the last question has been answered.
// This function provides a "Review all answers" button that switches to the review view.
function showFinishScreen() {
  const quizBox = document.getElementById("quiz-box");
  quizBox.innerHTML = `
    <h2>You have finished this quiz.</h2>
    <p style="margin-top:8px;">Well done — you can review all answers below.</p>
    <div style="margin-top:18px; display:flex; gap:12px; align-items:center;">
      <button id="review-btn">Review all answers</button>
      <button onclick="window.location.href='index.html'">Back to Topics</button>
      <button onclick="location.reload()">Try Again</button>
    </div>
    <div id="review-container" style="margin-top:18px;"></div>
  `;

  // Switch to review view when clicked. This is the code section responsible for switching to the review view.
  document.getElementById("review-btn").addEventListener("click", () => {
    renderReview();
  });
}

// Render the review list into the quiz box.
// This function is responsible for rendering the review list (questions, options, user choice, correct answer, explanation).
function renderReview() {
  const quizBox = document.getElementById("quiz-box");
  const total = questions.length;
  const scoreHtml = `<div class=\"review-summary\">Score: <strong>${totalPoints} / ${total}</strong></div>`;

  let listHtml = '';
  results.forEach((res, idx) => {
    const q = questions[idx];
    const isCorrect = res && res.isCorrect;
    const userAns = res ? res.userAnswer : '';
    const options = q.options || [];

    let optsHtml = '';
    if (options.length) {
      options.forEach((opt, i) => {
        const letter = String.fromCharCode(65 + i);
        const optText = `${letter}. ${opt}`;
        const correct = normalise(opt) === normalise(q.answer);
        const chosen = res && (String(i) === String(userAns) || normalise(userAns) === normalise(opt) || normalise(userAns) === letter.toLowerCase());
        const cls = correct ? 'correct' : (chosen && !correct ? 'incorrect' : '');
        const marker = chosen ? `<span class=\"user-choice\">Your choice</span>` : '';
        optsHtml += `<li class=\"review-option ${cls}\">${optText} ${marker}</li>`;
      });
    }

    const resultText = isCorrect ? '<span class="result-badge correct">Correct</span>' : '<span class="result-badge incorrect">Incorrect</span>';

    listHtml += `
      <div class="review-card">
        <h3>Question ${idx + 1}: ${q.question}</h3>
        ${options.length ? `<ul>${optsHtml}</ul>` : `<p><em>No options</em></p>`}
        <p style="margin-top:8px;">${resultText} ${!options.length ? `<strong>Your answer:</strong> ${res ? res.userAnswer : ''}` : ''}</p>
        <p class="explanation"><strong>Explanation:</strong> ${res ? res.explanation : (q.explanation || '')}</p>
      </div>
    `;
  });

  quizBox.innerHTML = `
    <h2>Review: All Answers</h2>
    ${scoreHtml}
    <div id="review-list">${listHtml}</div>
    <div style="margin-top:18px;">
      <button onclick="window.location.href='index.html'">Back to Topics</button>
      <button onclick="location.reload()">Try Again</button>
    </div>
  `;
}

// Submit button handler
document.getElementById("submit-btn")?.addEventListener("click", () => {
  const shortVal = document.getElementById("short-answer").value.trim();
  const warning = document.getElementById("warning-msg");
  const q = questions[currentIndex];

  // If MC, read selected radio; otherwise read short input
  if (q.type === "mc" && q.options) {
    const selected = document.querySelector('input[name="mc-choice"]:checked');
    if (!selected) {
      // show small warning message instead of alert
      warning.style.display = "inline";
      return;
    }
    warning.style.display = "none";
    // Pass the chosen option text to checkAnswer to avoid index/letter mismatches
    const idx = Number(selected.value);
    const chosenText = (q.options && q.options[idx]) ? q.options[idx] : selected.value;
    checkAnswer(chosenText);
  } else {
    if (shortVal === "") {
      warning.style.display = "inline";
      return;
    }
    warning.style.display = "none";
    checkAnswer(shortVal);
  }
});

// Enter key handler
document.getElementById("short-answer")?.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !answered) {
    const val = document.getElementById("short-answer").value.trim();
    if (val !== "") {
      checkAnswer(val);
    }
  }
});

// Next button handler
document.getElementById("next-btn")?.addEventListener("click", () => {
  currentIndex++;
  showQuestion();
});

window.addEventListener("load", loadQuestions);
