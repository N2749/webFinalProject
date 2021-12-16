const bigImg = document.getElementById("bigImage");
const originSrc = bigImg.getAttribute("src");
const box = document.getElementById("container");

box.onmouseover = function (event) {
    let img = event.target.closest("img");

    if (!img) return;

    if (!box.contains(img)) return;

    let newSource = event.target.getAttribute("src");
    bigImg.setAttribute("src", newSource);
};
box.onmouseout = function (event) {
    bigImg.setAttribute("src", originSrc);
};

/*
test.addEventListener(
    "mouseover",
    function (event) {
        // highlight the mouseover target
        event.target.style.color = "orange";

        // reset the color after a short delay
        setTimeout(function () {
            event.target.style.color = "";
        }, 500);
    },
    false
);
*/
