import Swal from "../node_modules/sweetalert2/src/sweetalert2.js";

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
        <a href="#">
        <span class="users-name">${users[i].username}</span>
        </a>
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
        let message = prompt("Ban Reason:");
        users[idInt].ban = true;
        users[idInt].banReason = message;
    } else {
        users[idInt].ban = false;
        swal("User unbanned");
    }
    localStorage.setItem("users", JSON.stringify(users));
}

function changeUser(button) {
    let user = button.parentNode.parentNode;
    let idInt = parseInt(user.id);
    let users = JSON.parse(localStorage.getItem("users"));
    let choice = prompt(
        `What do you whant to change in the ${users[idInt].username}'s account? 
        \n1. Username 
        \n2. Email
        \n3. Password`
    );
    switch (choice) {
        case "1":
            (async () => {
                const { value: newUserName } = await Swal.fire({
                    title: `Enter new username for ${users[idInt].username}`,
                    input: "text",
                });
                if (newUserName) users[idInt].username = newUserName;
                else
                    Swal.fire({
                        icon: "error",
                        title: "Wrong Username",
                    });
            })();
            break;
        case "2":
            let email = prompt(`Type new email for ${users[idInt].email}`);
            users[parseInt(user.id)].email = email;
            break;

        case "3":
            let password = prompt(
                `Type new password for ${users[idInt].password}`
            );
            users[parseInt(user.id)].password = password;
            break;
    }
    localStorage.setItem("users", JSON.stringify(users));
    showUsers();
}

function deleteUser(button) {
    let user = button.parentNode.parentNode;
    let listOfUsers = user.parentNode;
    if (confirm("Are you sure? The data will be lost forever")) {
        let users = JSON.parse(localStorage.getItem("users"));
        users.splice(parseInt(user.id), 1);
        localStorage.setItem("users", JSON.stringify(users));
        listOfUsers.removeChild(user);
    }
    showUsers();
}
