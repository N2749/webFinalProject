const form = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("password");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    checkInputs();
    userExistence();
});

function checkInputs() {
    //trim is used to remove spaces
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    if (emailValue === "") {
        setErrorFor(email, "Email cannot be blank");
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, "Not a valid email");
    } else if (!localStorage.getItem(emailValue)) {
        setErrorFor(email, "User does not exist");
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

function userExistence() {
    if (localStorage.getItem(email.value.trim())) {
        let user = JSON.parse(localStorage.getItem(email.value.trim()));
        if (user.password === password.value.trim()) 
            success();
        else 
            setErrorFor(password, "Incorrect Password");
        return true;
    }
    setErrorFor(password, "Type email first");
}

function success() {
    document.location.href = "mainpage.html";
}
