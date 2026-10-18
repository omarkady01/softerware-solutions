
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    // Mobile navigation
    if (menuToggle && navLinks) {
        menuToggle.setAttribute("aria-controls", "nav-links");

        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("active");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );
        });

        // Close menu when a navigation link is clicked
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation");
            });
        });

        // Close menu with Escape
        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                navLinks.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation");
            }
        });
    }

    // Reveal sections as the user scrolls
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

        const revealObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -30px 0px"
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {
        revealElements.forEach(element => {
            element.classList.add("visible");
        });
    }


    // Terminal typing animation
    const typingElement = document.getElementById("typing-text");
    const message = "You imagine it. We build it.";

    if (typingElement) {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            typingElement.textContent = message;
        } else {
            let characterIndex = 0;

            function typeMessage() {
                if (characterIndex < message.length) {
                    typingElement.textContent += message.charAt(characterIndex);
                    characterIndex++;

                    setTimeout(typeMessage, 85);
                }
            }

            setTimeout(typeMessage, 500);
        }
    }

    // Automatically update footer copyright year
    const footerYear = document.getElementById("footer-year");

    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }

});
