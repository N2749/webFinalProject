var toggleButton = document.querySelector('.toggle-btn');
var navBar = document.querySelector('.nav-bar');
toggleButton.addEventListener('click', function () {
    navBar.classList.toggle('toggle');
});