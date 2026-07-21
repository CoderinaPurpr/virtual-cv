"use strict";

const currentYear = new Date().getFullYear();
const footerText = document.querySelector("footer p");

if (footerText) {
    footerText.textContent = `© ${currentYear} Rudi van Vuuren`;
}