// API Gateway endpoint URL
const apiUrl = 'https://030ab7z575.execute-api.us-east-1.amazonaws.com/';

// Get references to DOM elements
const questionButtons = document.querySelectorAll('.question-button');
const answerText = document.getElementById('answer-text');

// Add click event listeners to question buttons
questionButtons.forEach(button => {
  button.addEventListener('click', () => {
    const question = button.getAttribute('data-question');
    sendQuestionToBackend(question);
  });
});

// Function to send question to backend
function sendQuestionToBackend(question) {
  // Show loading state
  answerText.textContent = 'Loading...';

  if (question === 'other') {
    answerText.textContent = ''; 
    return; // Exit the function if other is selected 
  }

  // Send question to API Gateway
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question }),
  })
    .then(response => response.json())
    .then(data => {
      // Display the response
      answerText.textContent = data.answer;
      console.log(data.answer);
      console.log(data);
      console.log(data.json);
      console.log(response);

    })
    .catch(error => {
      console.error('Error:', error);
      answerText.textContent = 'Sorry, something went wrong. Please try again.';
    });
}


// Toggles dark mode
// Get references to DOM elements
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

// Check for saved theme in localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  body.setAttribute('data-theme', savedTheme);
  updateToggleIcon(savedTheme);
}

// Add click event listener to dark mode toggle
darkModeToggle.addEventListener('click', () => {
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateToggleIcon(newTheme);
});

// Function to update the toggle icon
function updateToggleIcon(theme) {
  darkModeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}



// Getting DOM elements
const modal = document.getElementById('agent-modal');
const closeModal = document.querySelector('.close-modal');
const confirmAgent = document.getElementById('confirm-agent');
const cancelAgent = document.getElementById('cancel-agent');
const userInput = document.getElementById('user-input');
const submitCustomQuestion = document.getElementById('submit-custom-question');

// Open modal when submit button is clicked
submitCustomQuestion.addEventListener('click', () => {
  const question = userInput.value.trim();
  
  if (!question) {
    alert('Please enter your question first!');
    return;
  }
  
  // Set the question on the confirm button
  confirmAgent.dataset.question = question;
  
  // Update modal message to show the actual question
  document.querySelector('.modal-message').textContent = 
    `Send this question to agent: "${question}"?`;
  
  modal.style.display = 'flex';
});

// Close modal handlers
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

cancelAgent.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Handle confirm button click
confirmAgent.addEventListener('click', () => {
  // Get the question from the confirm button's data attribute
  const question = confirmAgent.dataset.question;
  
  if (!question) {
    alert('No question found!');
    return;
  }
  
  modal.style.display = 'none';
  alert(`Your question "${question}" has been sent to an agent. They will contact you shortly.`);
  
  
  // Clear the input field
  userInput.value = '';
});