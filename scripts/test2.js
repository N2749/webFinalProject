document.getElementById("button").addEventListener("click", () => {
    swal({
        title: "You have succesfully registered",
        text: "You will automatically redirected to login page after 3 seconds.",
        icon: "success",
        position: "center",
    });
    setTimeout(() => {
        document.location.href = "start.html";
    }, 3000);
});
