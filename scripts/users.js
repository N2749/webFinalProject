import Swal from "./node_modules/sweetalert2/src/sweetalert2.js";

window.onload = () => {
    showUsers();
};

window.disableUser = disableUser;
window.changeUser = changeUser;
window.deleteUser = deleteUser;

function showUsers() {
    let userList = document.getElementById("userList");
    userList.innerHTML = ``;
    let users = JSON.parse(localStorage.getItem("users"));
    for (let i = 0; i < users.length; i++) {
        userList.innerHTML += `<li id="${i}">
        <span class="users-number">${i + 1}. </span>
        <span class="users-name">${users[i].username}</span>
        <span class="users-email">${users[i].email}</span>
        <div class="button-part">
        <button class="blockbtn floating-button" onclick="disableUser(this)"><span class="text">(un)ban</span></button>
        <button class="changebtn floating-button" onclick="changeUser(this)"><span class="text">Change</span></button>
        <button class="delbtn floating-button" onclick="deleteUser(this)"><span class="text">Delete</span></button>
        </div>
        </li>`;
    }
}

function disableUser(button) {
    let user = button.parentNode.parentNode;
    let users = JSON.parse(localStorage.getItem("users"));
    let idInt = parseInt(user.id);
    if (!users[idInt].ban) {
        Swal.fire({
            text: "Ban Reason:",
            input: "text",
            confirmButtonColor: "#bc002d ",
        }).then((output) => {
            if (output.value) {
                users[idInt].ban = true;
                users[idInt].banReason = output.value;
                localStorage.setItem("users", JSON.stringify(users));
            }
        });
    } else {
        users[idInt].ban = false;
        Swal.fire({
            title: "User unbanned",
            icon: "success",
            confirmButtonColor: "#bc002d ",
        });
        localStorage.setItem("users", JSON.stringify(users));
    }
}

function changeUser(button) {
    let user = button.parentNode.parentNode;
    let idInt = parseInt(user.id);
    let users = JSON.parse(localStorage.getItem("users"));
    Swal.fire({
        title: `What do you whant to change in the ${users[idInt].username}'s account?`,
        confirmButtonText: "Username",
        showCancelButton: true,
        cancelButtonText: "email",
        showDenyButton: true,
        denyButtonText: "password",
        confirmButtonColor: "#bc002d ",
        cancelButtonColor: "#bc002d ",
        denyButtonColor: "#bc002d ",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: `Enter new username for ${users[idInt].username}`,
                input: "text",
                confirmButtonColor: "#bc002d ",
            }).then((output) => {
                if (output.value && isUsername(output.value)) {
                    users[idInt].username = output.value;
                    localStorage.setItem("users", JSON.stringify(users));
                    Swal.fire({
                        title: "The username was updated!",
                        icon: "success",
                        confirmButtonColor: "#bc002d ",
                    });
                    showUsers();
                } else if (!output.isDismissed)
                    Swal.fire({
                        icon: "error",
                        title: "Invalid username!",
                        confirmButtonColor: "#bc002d ",
                    });
            });
        } else if (result.isDenied) {
            Swal.fire({
                title: `Enter new password for ${users[idInt].username}`,
                input: "text",
                confirmButtonColor: "#bc002d ",
            }).then((output) => {
                if (output.value && isPassword(output.value)) {
                    users[idInt].password = output.value;
                    localStorage.setItem("users", JSON.stringify(users));
                    Swal.fire({
                        title: "The password was updated!",
                        icon: "success",
                        confirmButtonColor: "#bc002d ",
                    });
                    showUsers();
                } else if (!output.isDismissed)
                    Swal.fire({
                        icon: "error",
                        title: "Invalid password!",
                        confirmButtonColor: "#bc002d ",
                    });
            });
        } else if (result.dismiss === "cancel") {
            Swal.fire({
                title: `Enter new email for ${users[idInt].username}`,
                input: "text",
                confirmButtonColor: "#bc002d ",
            }).then((output) => {
                if (output.value && isEmail(output.value)) {
                    users[idInt].email = output.value;
                    localStorage.setItem("users", JSON.stringify(users));
                    Swal.fire({
                        title: "The email was updated!",
                        icon: "success",
                        confirmButtonColor: "#bc002d ",
                    });
                    showUsers();
                } else if (!output.isDismissed)
                    Swal.fire({
                        icon: "error",
                        title: "Invalid password!",
                        confirmButtonColor: "#bc002d ",
                    });
            });
        }
    });
}

function deleteUser(button) {
    let user = button.parentNode.parentNode;
    let listOfUsers = user.parentNode;
    let users = JSON.parse(localStorage.getItem("users"));
    Swal.fire({
        title: "Are you sure? The data will be lost forever",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        confirmButtonColor: "#bc002d ",
    }).then((output) => {
        if (output.isConfirmed) {
            users.splice(parseInt(user.id), 1);
            localStorage.setItem("users", JSON.stringify(users));
            showUsers();
            Swal.fire({
                title: "The user has been deleted!",
                icon: "success",
                confirmButtonColor: "#bc002d ",
            });
        }
    });
}

function isUsername(username) {
    return /^[a-zA-Z0-9]+$/.test(username);
}

function isPassword(password) {
    return (
        !/^\@\!\#\$\%\^\&\*\(\)\+\=$/.test(password) &&
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z_-]{8,}$/.test(password)
    );
}

function isEmail(email) {
    return (
        /^([\.\_\-a-zA-Z0-9]+)@([a-zA-Z0-9]+)\.([a-zA-Z]+)$/.test(email) ||
        /^([\.\_\-a-zA-Z0-9]+)@([a-zA-Z0-9]+)\.([a-zA-Z]+)\.([a-zA-Z]+)$/.test(
            email
        )
    );
}
