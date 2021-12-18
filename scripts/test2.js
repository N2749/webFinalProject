import Swal from "/node_modules/sweetalert2/src/sweetalert2.js";
document.getElementById("button").addEventListener("click", () => {
    Swal.fire(
        'You have succesfully registered?',
        'You will automatically redirected to login page after 3 seconds.',
        'success'
      )
    Swal.fire({
        title: "You have succesfully registered",
        text: "You will automatically redirected to login page after 3 seconds.",
        //icon: "success",
        confirmButtonText: "OK"
    });
    /*setTimeout(() => {
        document.location.href = "start.html";
    }, 3000);*/
});
