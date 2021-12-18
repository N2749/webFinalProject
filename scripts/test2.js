//import Swal from "../node_modules/sweetalert2/src/sweetalert2.min.js";
import Swal from "../node_modules/sweetalert2/src/sweetalert2.js";

document.getElementById("button").addEventListener("click", () => {
    (async () => {
        const { value: username } = await Swal.fire({
            title: 'Input email address',
            input: 'text',
          })
          
          if (username) {
            Swal.fire(`Entered email: ${username}`)
          }
    })();
});
