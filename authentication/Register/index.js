/*
 * Registration
 *
 * This file handles:
 * - Form validation
 * - Password strength
 * - Duplicate email checking
 * - Saving the new user
 */


const registerForm =
    document.getElementById("registerForm");


const nameInput =
    document.getElementById("name");


const emailInput =
    document.getElementById("email");


const passwordInput =
    document.getElementById("password");


const confirmPasswordInput =
    document.getElementById("confirmPassword");


const terms =
    document.getElementById("terms");


const message =
    document.getElementById("message");


const showPassword =
    document.getElementById("showPassword");


const strengthBar =
    document.getElementById("strengthBar");


const strengthText =
    document.getElementById("strengthText");



/*
 * Get users from browser storage
 */

function getUsers() {

    const savedUsers =
        localStorage.getItem("users");

    if (!savedUsers) {

        return [];

    }

    return JSON.parse(savedUsers);

}



/*
 * Save users
 */

function saveUsers(users) {

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

}



/*
 * Show message
 */

function showMessage(text, type) {

    message.textContent = text;

    message.className =
        "message " + type;

}



/*
 * Show / hide password
 */

showPassword.addEventListener(
    "click",
    function () {

        const isPassword =
            passwordInput.type === "password";


        if (isPassword) {

            passwordInput.type = "text";

            confirmPasswordInput.type = "text";

            showPassword.textContent = "Hide";

        } else {

            passwordInput.type = "password";

            confirmPasswordInput.type = "password";

            showPassword.textContent = "Show";

        }

    }
);



/*
 * Password strength
 */

passwordInput.addEventListener(
    "input",
    function () {

        const password =
            passwordInput.value;


        let strength = 0;


        if (password.length >= 6) {

            strength++;

        }


        if (password.length >= 8) {

            strength++;

        }


        if (/[A-Z]/.test(password)) {

            strength++;

        }


        if (/[0-9]/.test(password)) {

            strength++;

        }


        if (/[^A-Za-z0-9]/.test(password)) {

            strength++;

        }


        const widths = [
            "0%",
            "20%",
            "40%",
            "60%",
            "80%",
            "100%"
        ];


        const labels = [
            "Password strength",
            "Very weak",
            "Weak",
            "Fair",
            "Good",
            "Strong"
        ];


        strengthBar.style.width =
            widths[strength];


        strengthText.textContent =
            labels[strength];

    }
);



/*
 * Registration
 */

registerForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            nameInput.value.trim();


        const email =
            emailInput.value.trim().toLowerCase();


        const password =
            passwordInput.value;


        const confirmPassword =
            confirmPasswordInput.value;



        /*
         * Name validation
         */

        if (name.length < 2) {

            showMessage(
                "Please enter your full name.",
                "error"
            );

            nameInput.focus();

            return;

        }



        /*
         * Email validation
         */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

            showMessage(
                "Please enter a valid email address.",
                "error"
            );

            emailInput.focus();

            return;

        }



        /*
         * Password validation
         */

        if (password.length < 6) {

            showMessage(
                "Password must contain at least 6 characters.",
                "error"
            );

            passwordInput.focus();

            return;

        }



        /*
         * Confirm password
         */

        if (password !== confirmPassword) {

            showMessage(
                "Passwords do not match.",
                "error"
            );

            confirmPasswordInput.focus();

            return;

        }



        /*
         * Terms
         */

        if (!terms.checked) {

            showMessage(
                "Please accept the terms before continuing.",
                "error"
            );

            return;

        }



        /*
         * Get existing accounts
         */

        const users = getUsers();



        /*
         * Check duplicate email
         */

        const emailAlreadyExists =
            users.some(function (user) {

                return user.email === email;

            });


        if (emailAlreadyExists) {

            showMessage(
                "An account with this email already exists.",
                "error"
            );

            emailInput.focus();

            return;

        }



        /*
         * Create new user
         */

        const newUser = {

            id: Date.now(),

            name: name,

            email: email,

            password: password,

            createdAt:
                new Date().toISOString()

        };



        /*
         * Add user to the array
         */

        users.push(newUser);



        /*
         * Save users
         */

        saveUsers(users);



        /*
         * Success
         */

        showMessage(
            "Account created successfully. Redirecting to login...",
            "success"
        );



        /*
         * Clear form
         */

        registerForm.reset();

        strengthBar.style.width = "0%";

        strengthText.textContent =
            "Password strength";



        /*
         * Go to login
         */

        setTimeout(function () {

            window.location.href =
                "../login/index.html";

        }, 1200);

    }
);