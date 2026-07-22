"use strict";

const currentYear = document.querySelector("#current-year");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navigationLinks = document.querySelectorAll(".nav-links a");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("nav-open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });
}

navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks?.classList.remove("nav-open");
        menuToggle?.setAttribute("aria-expanded", "false");
        menuToggle?.setAttribute(
            "aria-label",
            "Open navigation menu"
        );
    });
});