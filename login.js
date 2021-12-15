const form = document.getElementById("form");
const login = document.getElementById("login");
const password = document.getElementById("password");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    checkInputs();
    if (userExistence()) checkPassword();
    if(isAdmin()) document.location.href = "admin1.html";
});
//validation of inputs
function checkInputs() {
    const loginValue = login.value;
    const passwordValue = password.value;

    if (loginValue === "") {
        setErrorFor(login, "Field cannot be blank");
    } else if (!userExistence()) {
        setErrorFor(login, "User does not exist");
    } else {
        setSuccessFor(login);
    }

    if (loginValue === "" && passwordValue !== "") {
        setErrorFor(login, "Type login first");
    } else {
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

function isPassword(password) {
    return (
        !/^\@\!\#\$\%\^\&\*\(\)\+\=$/.test(password) &&
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z_-]{8,}$/.test(password)
    );
}

function userExistence() {
    let users = JSON.parse(localStorage.getItem("users"));
    for (let user of users)
        if (user.username == login.value || user.email == login.value)
            return true;
}

function checkPassword() {
    let users = JSON.parse(localStorage.getItem("users"));
    for (let user of users)
        if (user.password == password.value)
            document.location.href = "mainpage.html";
        else setErrorFor(password, "Incorrect Password");
}

function isAdmin() {
    if (login.value === "admin" && password.value === "admin")
        return true;
}