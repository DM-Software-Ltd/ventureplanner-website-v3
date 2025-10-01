document.addEventListener("DOMContentLoaded", function () {
    console.log("Django static JS loaded ✅");

    const footer = document.querySelector("footer p");
    if (footer) {
        footer.style.color = "lightgreen";
        footer.innerHTML += " | JS is working!";
    }
});