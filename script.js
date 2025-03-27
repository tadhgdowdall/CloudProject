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
    return; // Exit the function early
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



// Getting Dom for other button 
const otherButton = document.getElementById('other-button');

//  Modal is the pop up 
const modal = document.getElementById('agent-modal');
const closeModal = document.querySelector('.close-modal');

//Confirm and cancell buttons
const confirmAgent = document.getElementById('confirm-agent');
const cancelAgent = document.getElementById('cancel-agent');

// Open modal when "Other" button is clicked
otherButton.addEventListener('click', () => {
  modal.style.display = 'flex'; // Show modal
});

// Close modal when X or "No" is clicked
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

cancelAgent.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Handle "Yes" button (send to agent)
confirmAgent.addEventListener('click', () => {
  modal.style.display = 'none';
  alert('Your request has been sent to an agent. They will contact you shortly.');
  //sendToAgentAPI();
});



// Function to send to alert to agent 

function sendToAgentAPI() {

  fetch('https://030ab7z575.execute-api.us-east-1.amazonaws.com/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    userQuery: 'User requested human assistance',
    contactInfo: 'user@example.com' // for collecting user email, not implemented 
  })
});
  

}