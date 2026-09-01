
/* =========================================================
   ANAND FOUNDATION
   YOGA • MEDITATION • SPIRITUAL LANDING PAGE
   SCRIPT.JS
========================================================= */

"use strict";


/* =========================================================
   01. DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initPreloader();

    initHeader();

    initMobileMenu();

    initSmoothScroll();

    initRevealAnimations();

    initActiveNavigation();

    initBackToTop();

    initWhatsAppForm();

    initWhatsAppButtons();

});


/* =========================================================
   02. PRELOADER
========================================================= */

function initPreloader() {

    const preloader =
        document.querySelector(".preloader");

    if (!preloader) return;

    window.addEventListener("load", () => {

        setTimeout(() => {

            preloader.classList.add("hidden");

        }, 500);

    });

}


/* =========================================================
   03. HEADER SCROLL
========================================================= */

function initHeader() {

    const header =
        document.querySelector(".header");

    if (!header) return;

    const updateHeader = () => {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    };

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

}


/* =========================================================
   04. MOBILE MENU
========================================================= */

function initMobileMenu() {

    const menuToggle =
        document.querySelector(".menu-toggle");

    const navigation =
        document.querySelector(".navigation");

    if (!menuToggle || !navigation) return;


    function closeMenu() {

        navigation.classList.remove("open");

        menuToggle.classList.remove("active");

        document.body.classList.remove("menu-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    function openMenu() {

        navigation.classList.add("open");

        menuToggle.classList.add("active");

        document.body.classList.add("menu-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

    }


    menuToggle.addEventListener("click", () => {

        const isOpen =
            navigation.classList.contains("open");

        if (isOpen) {

            closeMenu();

        } else {

            openMenu();

        }

    });


    navigation
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMenu
            );

        });


    document.addEventListener("click", event => {

        if (
            navigation.classList.contains("open") &&
            !navigation.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            closeMenu();

        }

    });


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                navigation.classList.contains("open")
            ) {

                closeMenu();

            }

        }
    );


    window.addEventListener("resize", () => {

        if (window.innerWidth > 900) {

            closeMenu();

        }

    });

}


/* =========================================================
   05. SMOOTH SCROLL
========================================================= */

function initSmoothScroll() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    links.forEach(link => {

        link.addEventListener("click", event => {

            const targetID =
                link.getAttribute("href");

            if (
                !targetID ||
                targetID === "#"
            ) {

                return;

            }

            const target =
                document.querySelector(targetID);

            if (!target) return;

            event.preventDefault();

            const header =
                document.querySelector(".header");

            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        });

    });

}


/* =========================================================
   06. REVEAL ANIMATIONS
========================================================= */

function initRevealAnimations() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );

    if (!elements.length) return;


    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(element => {

            element.classList.add("visible");

        });

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target
                            .classList
                            .add("visible");

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   07. ACTIVE NAVIGATION
========================================================= */

function initActiveNavigation() {

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            '.navigation a[href^="#"]'
        );

    if (
        !sections.length ||
        !navLinks.length
    ) {

        return;

    }


    const setActiveLink = id => {

        navLinks.forEach(link => {

            const linkID =
                link.getAttribute("href");

            if (linkID === `#${id}`) {

                link.classList.add("active");

            } else {

                link.classList.remove("active");

            }

        });

    };


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        setActiveLink(
                            entry.target.id
                        );

                    }

                });

            },
            {
                rootMargin:
                    "-30% 0px -60% 0px"
            }
        );


    sections.forEach(section => {

        observer.observe(section);

    });

}


/* =========================================================
   08. BACK TO TOP
========================================================= */

function initBackToTop() {

    const button =
        document.querySelector(
            ".back-to-top"
        );

    if (!button) return;


    const toggleButton = () => {

        if (window.scrollY > 600) {

            button.classList.add("visible");

        } else {

            button.classList.remove("visible");

        }

    };


    toggleButton();


    window.addEventListener(
        "scroll",
        toggleButton,
        { passive: true }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* =========================================================
   09. WHATSAPP FORM
========================================================= */

function initWhatsAppForm() {

    const form =
        document.querySelector(
            "#contactForm"
        );

    if (!form) return;


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                getFieldValue(
                    form,
                    "name"
                );


            const phone =
                getFieldValue(
                    form,
                    "phone"
                );


            const email =
                getFieldValue(
                    form,
                    "email"
                );


            const interest =
                getFieldValue(
                    form,
                    "interest"
                );


            const message =
                getFieldValue(
                    form,
                    "message"
                );


            /* -----------------------------------------
               VALIDATION
            ----------------------------------------- */

            if (!name) {

                showFormMessage(
                    "Please enter your name."
                );

                focusField(
                    form,
                    "name"
                );

                return;

            }


            if (!phone) {

                showFormMessage(
                    "Please enter your phone number."
                );

                focusField(
                    form,
                    "phone"
                );

                return;

            }


            if (
                phone.replace(
                    /\D/g,
                    ""
                ).length < 10
            ) {

                showFormMessage(
                    "Please enter a valid phone number."
                );

                focusField(
                    form,
                    "phone"
                );

                return;

            }


            if (!interest) {

                showFormMessage(
                    "Please select a programme."
                );

                focusField(
                    form,
                    "interest"
                );

                return;

            }


            /* -----------------------------------------
               WHATSAPP MESSAGE
            ----------------------------------------- */

            const whatsappNumber =
                "919827167330";


            const whatsappMessage =
`Namaste Anand Foundation 

I would like to know more about your Yoga & Meditation programmes.

Name: ${name}
Phone: ${phone}
Email: ${email || "Not provided"}
Interested In: ${interest}

Message:
${message || "No additional message."}

Thank you. `;


            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                encodeURIComponent(
                    whatsappMessage
                );


            /* -----------------------------------------
               OPEN WHATSAPP
            ----------------------------------------- */

            window.open(
                whatsappURL,
                "_blank",
                "noopener,noreferrer"
            );


            /* -----------------------------------------
               OPTIONAL SUCCESS MESSAGE
            ----------------------------------------- */

            showFormMessage(
                "Opening WhatsApp… ",
                true
            );


            setTimeout(() => {

                form.reset();

            }, 1000);

        }
    );

}


/* =========================================================
   10. FORM FIELD HELPER
========================================================= */

function getFieldValue(
    form,
    fieldName
) {

    const field =
        form.querySelector(
            `[name="${fieldName}"]`
        );

    if (!field) return "";

    return field.value.trim();

}


/* =========================================================
   11. FOCUS FIELD
========================================================= */

function focusField(
    form,
    fieldName
) {

    const field =
        form.querySelector(
            `[name="${fieldName}"]`
        );

    if (!field) return;

    field.focus();

}


/* =========================================================
   12. FORM MESSAGE
========================================================= */

function showFormMessage(
    message,
    success = false
) {

    let box =
        document.querySelector(
            ".form-message"
        );


    if (!box) {

        box =
            document.createElement(
                "div"
            );

        box.className =
            "form-message";


        const form =
            document.querySelector(
                "#contactForm"
            );

        if (form) {

            form.prepend(box);

        }

    }


    box.textContent = message;


    box.style.cssText = `

        display: block;
        grid-column: 1 / -1;
        padding: 11px 14px;
        margin-bottom: 2px;
        background: ${
            success
                ? "rgba(28,140,80,.09)"
                : "rgba(184,121,53,.09)"
        };
        border-left: 2px solid ${
            success
                ? "#1c8c50"
                : "#b87935"
        };
        color: ${
            success
                ? "#1c8c50"
                : "#8c5a27"
        };
        font-size: 10px;
        line-height: 1.5;

    `;


    clearTimeout(
        box._timeout
    );


    box._timeout =
        setTimeout(() => {

            box.style.display =
                "none";

        }, 4500);

}


/* =========================================================
   13. WHATSAPP BUTTONS
========================================================= */

function initWhatsAppButtons() {

    const whatsappNumber =
        "919827167330";


    const buttons =
        document.querySelectorAll(
            "[data-whatsapp]"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                event.preventDefault();


                const customMessage =
                    button.dataset.whatsapp ||
                    "Namaste Anand Foundation 🙏 I would like to know more about your Yoga & Meditation programmes.";


                const url =
                    "https://wa.me/" +
                    whatsappNumber +
                    "?text=" +
                    encodeURIComponent(
                        customMessage
                    );


                window.open(
                    url,
                    "_blank",
                    "noopener,noreferrer"
                );

            }
        );

    });

}


/* =========================================================
   14. PHONE LINKS
========================================================= */




/* =========================================================
   15. IMAGE ERROR HANDLING
========================================================= */

function initImageFallbacks() {

    const images =
        document.querySelectorAll(
            "img"
        );


    images.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.style.opacity = "0";

            }
        );

    });

}


/* =========================================================
   16. INITIALIZE OPTIONAL HELPERS
========================================================= */



initImageFallbacks();


/* =========================================================
   17. CONSOLE MESSAGE
========================================================= */

console.log(
    "%cAnand Foundation 🙏",
    "font-size:18px;font-weight:bold;"
);

console.log(
    "%cYoga • Meditation • Inner Peace",
    "font-size:12px;"
);
 
