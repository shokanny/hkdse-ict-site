// Simple AI Helper - Copy-paste ready structure
// This shows how to integrate AI (OpenAI API) for explanations

// IMPORTANT: You need an API key from OpenAI
// Get one at: https://platform.openai.com/api-keys
// Store it securely - NEVER commit it to GitHub!

const AI_API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your actual key
const AI_ENABLED = false; // Set to true when you have an API key

/**
 * Get AI explanation for a question
 * @param {string} question - The question text
 * @param {string} userAnswer - The user's answer
 * @param {string} correctAnswer - The correct answer
 * @returns {Promise<string>} - AI-generated explanation
 */
async function getAIExplanation(question, userAnswer, correctAnswer) {
  if (!AI_ENABLED || !AI_API_KEY || AI_API_KEY === 'YOUR_API_KEY_HERE') {
    return null; // AI not configured
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful HKDSE ICT tutor. Provide clear, concise explanations for students.'
          },
          {
            role: 'user',
            content: `Question: ${question}\n\nUser answered: ${userAnswer}\nCorrect answer: ${correctAnswer}\n\nProvide a brief, educational explanation.`
          }
        ],
        max_tokens: 150
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('AI API Error:', error);
    return null; // Fallback to regular explanation
  }
}

/**
 * Alternative: Use AI to generate practice questions
 * This is more advanced - uncomment if you want to try it
 */
/*
async function generateAIQuestion(topic) {
  if (!AI_ENABLED) return null;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a HKDSE ICT question generator. Create multiple choice questions in JSON format.'
          },
          {
            role: 'user',
            content: `Generate a multiple choice question about ${topic} for HKDSE ICT students.`
          }
        ]
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('AI Generation Error:', error);
    return null;
  }
}
*/

// Export for use in script.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { getAIExplanation };
}
