var burgerMenuButton = document.getElementById("burger-button");
var burgerMenuContent = document.getElementById("burger-menu-content");

document.addEventListener("DOMContentLoaded", (event) => {
    burgerMenuButton.addEventListener("click", () => {
        burgerMenuContent.classList.toggle("hidden");
    });
    console.log(burgerMenuButton, "button");
    console.log(burgerMenuContent, "content");
});