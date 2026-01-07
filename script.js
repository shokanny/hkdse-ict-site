// read ?topic=number-system from URL
function getTopicFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("topic") || "number-system";
}

let questions = [];
let currentIndex = 0;
let totalPoints = 0;
let answered = false;

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
  
  // Show options as reference but use text box for answer
  if (q.type === "mc" && q.options) {
    const optionsList = document.createElement("ul");
    optionsList.style.listStyle = "none";
    optionsList.style.padding = "0";
    optionsList.style.margin = "12px 0";
    q.options.forEach((opt, idx) => {
      const li = document.createElement("li");
      li.textContent = `${String.fromCharCode(65 + idx)}. ${opt}`;
      li.style.padding = "4px 0";
      optionsDiv.appendChild(li);
    });
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

  // Normalize answer comparison
  const userAns = normalise(userAnswer);
  const correctAns = normalise(q.answer);
  
  // For MC questions, also check if they typed the option letter or full text
  let isCorrect = userAns === correctAns;
  
  if (q.type === "mc" && q.options) {
    // Check if they typed the letter (A, B, C, D)
    const optionIndex = q.options.findIndex(opt => normalise(opt) === correctAns);
    if (optionIndex >= 0) {
      const optionLetter = String.fromCharCode(65 + optionIndex).toLowerCase();
      if (userAns === optionLetter || userAns === optionLetter.toUpperCase()) {
        isCorrect = true;
      }
    }
    // Check if they typed the full option text
    if (!isCorrect) {
      isCorrect = q.options.some(opt => normalise(opt) === userAns);
    }
  }

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

  updateScore();
  nextBtn.style.display = "inline-block";
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

// Submit button handler
document.getElementById("submit-btn")?.addEventListener("click", () => {
  const val = document.getElementById("short-answer").value.trim();
  if (val === "") {
    alert("Please enter an answer");
    return;
  }
  checkAnswer(val);
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
