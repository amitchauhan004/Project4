function validateForm() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "") {
        alert("Please enter your username.");
        return false;
    }

    if (password === "") {
        alert("Please enter your password.");
        return false;
    }

    return true;
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector(".input-field");
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (validateForm()) {
            console.log("Form submitted successfully.");
        }
    });

    document.querySelector('button[type="submit"]').addEventListener('click', (event) => {
        event.preventDefault(); // Prevent form submission

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!username || !password) {
            alert('Please fill in both username and password.');
            return;
        }

        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === 'Login successful!') {
                    alert('Login successful!');
                    
                    window.location.href = 'dashboard.html';
                } else {
                    alert(data.message || 'Invalid credentials.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('An error occurred. Please try again later.');
            });
    });

  
    document.getElementById('remember-me').addEventListener('change', (event) => {
        const username = document.getElementById('username').value.trim();

        if (event.target.checked && username) {
            localStorage.setItem('rememberedUsername', username);
        } else {
            localStorage.removeItem('rememberedUsername');
        }
    });

   
    window.onload = () => {
        const rememberedUsername = localStorage.getItem('rememberedUsername');
        if (rememberedUsername) {
            document.getElementById('username').value = rememberedUsername;
            document.getElementById('remember-me').checked = true;
        }
    };
});