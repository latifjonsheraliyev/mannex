const form = document.forms[0];  // Access the first form directly
const url = 'https://api-generator.retool.com/jTwbvX/data';

// Function to send the request and handle user authentication
async function sendRequest() {
  try {
    const response = await fetch(url);
    const users = await response.json();

    // Filter user based on the entered email
    const user = users.find((user) => user.email === form[0].value);

    if (user) {
      console.log(user);
      localStorage.setItem('user', JSON.stringify(user));

      // Check if user is saved and redirect
      if (localStorage.getItem('user')) {
        window.location.pathname = 'myinfo.html';
      }
    } else {
      console.error('User not found');
      alert('Invalid email or user does not exist.');
    }
  } catch (error) {
    console.error('Error fetching user:', error);
  }
}

// Prevent form submission and handle button click to send the request
form.addEventListener('submit', (event) => event.preventDefault());
form[2].addEventListener('click', sendRequest);
