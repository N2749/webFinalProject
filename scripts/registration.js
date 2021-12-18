import Swal from "../node_modules/sweetalert2/src/sweetalert2.js";

const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
var correctCounter;

if (localStorage.getItem("users") == null) {
    let usersArray = [];
    localStorage.setItem("users", JSON.stringify(usersArray));
}
form.addEventListener("submit", (e) => {
    e.preventDefault();

    correctCounter = 0;

    checkInputs();
    if (correctCounter == 4) {
        addUser();
        success();
    }
});

function checkInputs() {
    const usernameValue = username.value;
    const emailValue = email.value;
    const passwordValue = password.value;
    const password2Value = password2.value;
    if (usernameValue === "") {
        setErrorFor(username, "Username cannot be blank");
    } else if (!isUsername(usernameValue)) {
        setErrorFor(username, "Not a valid username");
    } else if (userPresence()) {
        setErrorFor(username, "Username is taken");
    } else {
        setSuccessFor(username);
    }

    if (emailValue === "") {
        setErrorFor(email, "Email cannot be blank");
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, "Not a valid email");
    } else if (userPresence()) {
        setErrorFor(email, "Email is taken");
    } else {
        setSuccessFor(email);
    }

    if (passwordValue === "") {
        setErrorFor(password, "Password cannot be blank");
    } else if (passwordValue.length < 8) {
        setErrorFor(
            password,
            "Password must be equal or more than 8 characters"
        );
    } else if (!isPassword(passwordValue)) {
        setErrorFor(password, "Not a valid Password");
    } else {
        setSuccessFor(password);
    }

    if (password2Value === "") {
        setErrorFor(password2, "Password2 cannot be blank");
    } else if (passwordValue !== password2Value) {
        setErrorFor(password2, "Passwords does not match");
    } else {
        setSuccessFor(password2);
    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    formControl.className = "form-control error";
    small.innerText = message;
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
    correctCounter++;
}

function isUsername(username) {
    return /^[a-zA-Z0-9]+$/.test(username);
}

function isEmail(email) {
    return (
        /^([\.\_\-a-zA-Z0-9]+)@([a-zA-Z0-9]+)\.([a-zA-Z]+)$/.test(email) ||
        /^([\.\_\-a-zA-Z0-9]+)@([a-zA-Z0-9]+)\.([a-zA-Z]+)\.([a-zA-Z]+)$/.test(
            email
        )
    );
}

function isPassword(password) {
    return (
        !/^\@\!\#\$\%\^\&\*\(\)\+\=$/.test(password) &&
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z_-]{8,}$/.test(password)
    );
}

function userPresence() {
    let users = JSON.parse(localStorage.getItem("users"));
    for (let user of users)
        if (user.username == username.value || user.email == email.value)
            return true;
}

function addUser() {
    let users = JSON.parse(localStorage.getItem("users"));
    users.push({
        username: username.value,
        email: email.value,
        password: password.value,
        ban: false,
        banReason: ""
    });
    localStorage.setItem("users", JSON.stringify(users));
}

function success() {
    swal(
        "You have succesfully registered?",
        "You will automatically redirected to login page after 3 seconds.",
        "success"
    );
    setTimeout(() => {
        document.location.href = "start.html";
    }, 3000);
}
