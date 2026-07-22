"use strict";

/* =========================================================
   Element references
   ========================================================= */

const currentYear = document.querySelector("#current-year");
const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navActions = document.querySelector(".nav-actions");
const navLinks = document.querySelector(".nav-links");
const navigationLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id]");
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");

/* =========================================================
   Current year
   ========================================================= */

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

/* =========================================================
   Mobile navigation
   ========================================================= */

function closeMobileMenu() {
    navActions?.classList.remove("nav-open");
    menuToggle?.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation menu");
}

if (menuToggle && navActions) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navActions.classList.toggle("nav-open");

        menuToggle.classList.toggle("menu-open", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });
}

navigationLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMobileMenu();
    }
});

document.addEventListener("click", (event) => {
    const clickedInsideNavigation =
        event.target.closest(".navbar");

    if (!clickedInsideNavigation) {
        closeMobileMenu();
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
        closeMobileMenu();
    }
});

/* =========================================================
   Header scroll state
   ========================================================= */

function updateHeaderState() {
    if (!siteHeader) {
        return;
    }

    siteHeader.classList.toggle(
        "header-scrolled",
        window.scrollY > 20
    );
}

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, {
    passive: true
});

/* =========================================================
   Active navigation link
   ========================================================= */

function updateActiveNavigation() {
    const scrollPosition =
        window.scrollY + window.innerHeight * 0.3;

    let activeSectionId = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionBottom =
            sectionTop + section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionBottom
        ) {
            activeSectionId = section.id;
        }
    });

    navigationLinks.forEach((link) => {
        const targetId = link
            .getAttribute("href")
            ?.replace("#", "");

        const isActive = targetId === activeSectionId;

        link.classList.toggle("active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

updateActiveNavigation();

window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);

/* =========================================================
   Scroll-reveal animations
   ========================================================= */

const revealElements = document.querySelectorAll(
    [
        ".section-heading",
        ".about-grid > div",
        ".skill-card",
        ".project-card",
        ".timeline-item",
        ".education-card",
        ".contact-card",
        ".terminal-card"
    ].join(",")
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
});

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion) {
    revealElements.forEach((element) => {
        element.classList.add("reveal-visible");
    });
} else {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("reveal-visible");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -50px 0px"
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
}

/* =========================================================
   Theme management
   ========================================================= */

const THEME_STORAGE_KEY = "portfolio-theme";

function getPreferredTheme() {
    const savedTheme =
        localStorage.getItem(THEME_STORAGE_KEY);

    if (
        savedTheme === "light" ||
        savedTheme === "dark"
    ) {
        return savedTheme;
    }

    return window.matchMedia(
        "(prefers-color-scheme: light)"
    ).matches
        ? "light"
        : "dark";
}

function applyTheme(theme) {
    const isLightTheme = theme === "light";

    document.documentElement.dataset.theme = theme;

    if (themeIcon) {
        themeIcon.textContent = isLightTheme ? "☾" : "☀";
    }

    if (themeToggle) {
        themeToggle.setAttribute(
            "aria-label",
            isLightTheme
                ? "Switch to dark theme"
                : "Switch to light theme"
        );
    }
}

const initialTheme = getPreferredTheme();
applyTheme(initialTheme);

themeToggle?.addEventListener("click", () => {
    const currentTheme =
        document.documentElement.dataset.theme;

    const nextTheme =
        currentTheme === "light" ? "dark" : "light";

    localStorage.setItem(
        THEME_STORAGE_KEY,
        nextTheme
    );

    applyTheme(nextTheme);
});