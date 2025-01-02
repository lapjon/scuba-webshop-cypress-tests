// Load the header dynamically to reuse it across multiple pages
document.addEventListener("DOMContentLoaded", function () {
    fetch('/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));
});
// Handle the signup form submission
document.getElementById('signup-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Extract form values
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();

    const messageDiv = document.getElementById('signup-message');
    const submitButton = document.querySelector('#signup-form button[type="submit"]');

    // Clear previous messages
    messageDiv.textContent = ''; 
    clearErrors();

    let isValid = true;

    // Validate Email
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        showError('email', 'Please enter a valid email address.');
        isValid = false;
    }

    // Validate Password
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
        showError(
            'password',
            'Password must be at least 8 characters long, include an uppercase letter, and a number.'
        );
        isValid = false;
    }

    // Validate Confirm Password
    if (password !== confirmPassword) {
        showError('confirm-password', 'Passwords do not match!');
        isValid = false;
    }

    if (!isValid) return;

    // Disable the submit button to prevent multiple submissions
    submitButton.disabled = true;

    try {
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Success case
            messageDiv.textContent = data.message; // e.g., "User registered successfully!"
            messageDiv.style.color = 'green';
        
            // Redirect to the Gear page after 3 seconds
            setTimeout(() => {
                window.location.href = '/gear.html';
            }, 3000);
        } else if (response.status === 409) {
            // Duplicate email case
            messageDiv.textContent = data.message || 'Email already in use.';
            messageDiv.style.color = 'red';
        
            // Optionally, re-enable the submit button for retry
            submitButton.disabled = false;
        } else {
            // General error case
            messageDiv.textContent = 'Something went wrong!';
            messageDiv.style.color = 'red';

            // Re-enable the button for retry on error
            submitButton.disabled = false;
        }
    } catch (error) {
        console.error('Error:', error);
        messageDiv.textContent = 'An error occurred. Please try again later.';
        messageDiv.style.color = 'red';

        // Re-enable the button for retry on error
        submitButton.disabled = false;
    }
});

function showError(inputId, message) {
    const errorSpan = document.getElementById(`${inputId}-error`);
    if (errorSpan) {
        errorSpan.textContent = message;
        errorSpan.style.display = 'block';
        document.getElementById(inputId).classList.add('invalid');
    }
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach((span) => {
        span.textContent = '';
        span.style.display = 'none';
    });
    document.querySelectorAll('input').forEach((input) => input.classList.remove('invalid'));
}