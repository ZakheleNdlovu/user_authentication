document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const card = document.querySelector('.card');
    const toRegister = document.getElementById('to-register');
    const toLogin = document.getElementById('to-login');
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const loginMessage = document.getElementById('login-message');
    const registerMessage = document.getElementById('register-message');

    // Switch to Register Form
    toRegister.addEventListener('click', () => {
        card.classList.add('flipped');
        clearMessages();
    });

    // Switch to Login Form
    toLogin.addEventListener('click', () => {
        card.classList.remove('flipped');
        clearMessages();
    });

    // Clear all messages
    function clearMessages() {
        loginMessage.style.display = 'none';
        registerMessage.style.display = 'none';
    }

    // Show message with animation
    function showMessage(element, text, type) {
        element.textContent = text;
        element.className = `message ${type}`;
        element.style.display = 'block';

        // Auto hide message after 5 seconds
        setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    }

    // Validate email format
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Register Button Click
    registerBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const username = document.getElementById('register-username').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;

        // Validate inputs
        if (!username || !email || !password || !confirmPassword) {
            showMessage(registerMessage, 'Please fill in all fields', 'error');
            document.querySelector('.card').classList.add('shake');
            setTimeout(() => document.querySelector('.card').classList.remove('shake'), 500);
            return;
        }

        if (!isValidEmail(email)) {
            showMessage(registerMessage, 'Please enter a valid email address', 'error');
            document.querySelector('.card').classList.add('shake');
            setTimeout(() => document.querySelector('.card').classList.remove('shake'), 500);
            return;
        }

        if (password !== confirmPassword) {
            showMessage(registerMessage, 'Passwords do not match', 'error');
            document.querySelector('.card').classList.add('shake');
            setTimeout(() => document.querySelector('.card').classList.remove('shake'), 500);
            return;
        }

        if (password.length < 6) {
            showMessage(registerMessage, 'Password must be at least 6 characters', 'error');
            document.querySelector('.card').classList.add('shake');
            setTimeout(() => document.querySelector('.card').classList.remove('shake'), 500);
            return;
        }

        // Check if user already exists
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.some(user => user.username === username)) {
            showMessage(registerMessage, 'Username already exists', 'error');
            document.querySelector('.card').classList.add('shake');
            setTimeout(() => document.querySelector('.card').classList.remove('shake'), 500);
            return;
        }

        if (users.some(user => user.email === email)) {
            showMessage(registerMessage, 'Email already registered', 'error');
            document.querySelector('.card').classList.add('shake');
            setTimeout(() => document.querySelector('.card').classList.remove('shake'), 500);
            return;
        }

        // Save user to localStorage
        users.push({ username, email, password });
        localStorage.setItem('users', JSON.stringify(users));

        // Show success message
        showMessage(registerMessage, 'Registration successful! You can now login.', 'success');

        // Clear form
        document.getElementById('register-username').value = '';
        document.getElementById('register-email').value = '';
        document.getElementById('register-password').value = '';
        document.getElementById('register-confirm-password').value = '';

        // Switch to login form after 2 seconds
        setTimeout(() => {
            card.classList.remove('flipped');
        }, 2000);
    });

    // Login Button Click
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        // Validate inputs
        if (!username || !password) {
            showMessage(loginMessage, 'Please fill in all fields', 'error');
            document.querySelector('.card').classList.add('shake');
            setTimeout(() => document.querySelector('.card').classList.remove('shake'), 500);
            return;
        }

        // Check if user exists
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            // Save current user to localStorage
            localStorage.setItem('currentUser', JSON.stringify(user));

            // Show success message
            showMessage(loginMessage, 'Login successful! Redirecting...', 'success');

            // Clear form
            document.getElementById('login-username').value = '';
            document.getElementById('login-password').value = '';

            // Redirect to dashboard (simulated)
            setTimeout(() => {
                alert(`Welcome back, ${user.username}! You are now logged in.`);
            }, 1500);
        } else {
            showMessage(loginMessage, 'Invalid username or password', 'error');
            document.querySelector('.card').classList.add('shake');
            setTimeout(() => document.querySelector('.card').classList.remove('shake'), 500);
        }
    });

    // Check if user is already logged in
    if (localStorage.getItem('currentUser')) {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        showMessage(loginMessage, `Welcome back, ${user.username}! You are already logged in.`, 'success');
    }
});