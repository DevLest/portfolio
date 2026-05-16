(function () {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: prefersReducedMotion ? 0 : 850,
            easing: "ease-out-cubic",
            once: true,
            offset: 40,
            disable: prefersReducedMotion ? true : false
        });
    }

    function qs(sel, root) {
        return (root || document).querySelector(sel);
    }

    function qsa(sel, root) {
        return Array.prototype.slice.call((root || document).querySelectorAll(sel));
    }

    document.addEventListener("DOMContentLoaded", function () {
        const header = qs("#siteHeader");
        const hero = qs(".hero-parallax");
        const navbarToggle = qs("#navbarToggle");
        const mobileNav = qs("#mobileNav");
        const mobileLinks = qsa("[data-mobile-link]");
        const navLinks = qsa("[data-nav-link]");
        const sections = ["home", "about", "experience", "projects", "contact"].map(function (id) {
            return document.getElementById(id);
        });

        function syncMobileNav(open) {
            if (!mobileNav || !navbarToggle) return;
            mobileNav.classList.toggle("is-open", open);
            navbarToggle.classList.toggle("active", open);
            navbarToggle.setAttribute("aria-expanded", open ? "true" : "false");
            mobileNav.setAttribute("aria-hidden", open ? "false" : "true");
            document.body.classList.toggle("mobile-menu-open", open);
        }

        if (navbarToggle && mobileNav) {
            navbarToggle.addEventListener("click", function () {
                var open = !mobileNav.classList.contains("is-open");
                syncMobileNav(open);
            });
            mobileLinks.forEach(function (link) {
                link.addEventListener("click", function () {
                    syncMobileNav(false);
                });
            });
        }

        function updateHeaderTheme() {
            if (!header || !hero) return;
            var heroRect = hero.getBoundingClientRect();
            var inHero = heroRect.bottom > 96;
            header.classList.toggle("site-header--hero", inHero);
            header.classList.toggle("site-header--solid", !inHero);
        }

        updateHeaderTheme();
        window.addEventListener("scroll", updateHeaderTheme, { passive: true });
        window.addEventListener("resize", updateHeaderTheme);

        function scrollPadPx() {
            var raw = getComputedStyle(document.documentElement).scrollPaddingTop;
            var n = parseFloat(raw);
            return Number.isFinite(n) ? n : 88;
        }

        function setActiveNav(id) {
            var slug = "#" + id;
            navLinks.forEach(function (a) {
                a.classList.toggle("is-active", a.getAttribute("href") === slug);
            });
            mobileLinks.forEach(function (a) {
                a.classList.toggle("is-active", a.getAttribute("href") === slug);
            });
        }

        /** Pick section aligned with scroll-padding “activation line” (stable while smooth-scrolling). */
        function syncNavFromScroll() {
            if (!sections.length || !sections[0]) return;
            var trigger = window.scrollY + scrollPadPx() + 1;
            var activeId = sections[0].id || "home";
            sections.forEach(function (sec) {
                if (!sec || !sec.id) return;
                var secTop = sec.getBoundingClientRect().top + window.scrollY;
                if (secTop <= trigger) activeId = sec.id;
            });
            setActiveNav(activeId);
        }

        var scrollSpyTicking = false;
        window.addEventListener(
            "scroll",
            function () {
                if (!scrollSpyTicking) {
                    scrollSpyTicking = true;
                    requestAnimationFrame(function () {
                        scrollSpyTicking = false;
                        syncNavFromScroll();
                    });
                }
            },
            { passive: true }
        );

        window.addEventListener("resize", function () {
            syncNavFromScroll();
        });

        if ("onscrollend" in window) {
            window.addEventListener("scrollend", syncNavFromScroll);
        }

        syncNavFromScroll();

        var typedName = qs("#typed-name");
        var contactDetails = qs("#contact-details");
        var locationEl = qs(".hero-footer .location");
        var roleEl = qs(".hero-footer .role");

        if (typedName && contactDetails && locationEl && roleEl && !prefersReducedMotion) {
            var text = "LESTER\nBON BIONO";
            var charIndex = 0;

            function typeWriter() {
                if (charIndex < text.length) {
                    typedName.textContent += text.charAt(charIndex);
                    charIndex++;
                    window.setTimeout(typeWriter, 95);
                } else {
                    window.setTimeout(function () {
                        contactDetails.classList.add("visible");
                        window.setTimeout(function () {
                            locationEl.classList.add("animate");
                            roleEl.classList.add("animate");
                        }, 420);
                    }, 380);
                }
            }

            typeWriter();
        } else if (typedName && contactDetails && locationEl && roleEl) {
            typedName.textContent = "LESTER\nBON BIONO";
            contactDetails.classList.add("visible");
            locationEl.classList.add("animate");
            roleEl.classList.add("animate");
        }

        var backToTopButton = qs("#backToTop");
        if (backToTopButton) {
            window.addEventListener(
                "scroll",
                function () {
                    backToTopButton.classList.toggle("visible", window.scrollY > 320);
                },
                { passive: true }
            );
            backToTopButton.addEventListener("click", function () {
                window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
            });
        }

        var yearCopy = qs("#yearCopy");
        if (yearCopy) {
            yearCopy.textContent = String(new Date().getFullYear());
        }

        qsa("[data-exp-card]").forEach(function (card) {
            var toggle = qs(".exp-card__toggle", card);
            var panel = qs(".exp-card__panel", card);
            if (!toggle || !panel) return;

            toggle.addEventListener("click", function () {
                var open = !card.classList.contains("is-open");
                qsa("[data-exp-card].is-open").forEach(function (other) {
                    if (other === card) return;
                    other.classList.remove("is-open");
                    var ot = qs(".exp-card__toggle", other);
                    var op = qs(".exp-card__panel", other);
                    if (ot) ot.setAttribute("aria-expanded", "false");
                    if (op) op.setAttribute("hidden", "");
                });

                card.classList.toggle("is-open", open);
                toggle.setAttribute("aria-expanded", open ? "true" : "false");
                if (open) {
                    panel.removeAttribute("hidden");
                } else {
                    panel.setAttribute("hidden", "");
                }

                if (!prefersReducedMotion && typeof AOS !== "undefined" && typeof AOS.refresh === "function") {
                    window.requestAnimationFrame(function () {
                        AOS.refresh();
                    });
                }
            });

            var initiallyOpen = toggle.getAttribute("aria-expanded") === "true";
            card.classList.toggle("is-open", initiallyOpen);
            if (initiallyOpen) {
                panel.removeAttribute("hidden");
            } else {
                panel.setAttribute("hidden", "");
            }
        });

        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener("click", function (e) {
                var href = anchor.getAttribute("href");
                if (!href || href === "#") return;
                var target = document.querySelector(href);
                if (!target) return;
                var sectionId = href.slice(1);
                e.preventDefault();
                setActiveNav(sectionId);
                target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
                syncMobileNav(false);
                window.setTimeout(syncNavFromScroll, prefersReducedMotion ? 0 : 720);
            });
        });
    });

    if (typeof emailjs !== "undefined") {
        emailjs.init("I-YFHStMwz3rLPTQ9");
    }

    var contactForm = document.getElementById("contactForm");
    if (contactForm && typeof emailjs !== "undefined") {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            var submitButton = document.getElementById("submitButton");
            var spinner = submitButton ? submitButton.querySelector(".spinner-border") : null;
            var alertMessage = document.getElementById("alertMessage");

            if (submitButton) submitButton.disabled = true;
            if (spinner) spinner.classList.remove("d-none");
            if (alertMessage) alertMessage.classList.add("d-none");

            var templateParams = {
                from_name: document.getElementById("name").value,
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                phone: document.getElementById("phone").value,
                subject: document.getElementById("subject").value,
                message: document.getElementById("message").value,
                reply_to: document.getElementById("email").value
            };

            emailjs
                .send("service_k50zcxm", "template_8gixqxa", templateParams)
                .then(function () {
                    if (alertMessage) {
                        alertMessage.textContent = "Thank you for reaching out — I will reply shortly.";
                        alertMessage.classList.remove("d-none", "alert-danger");
                        alertMessage.classList.add("alert-success");
                    }
                    contactForm.reset();
                })
                .catch(function (error) {
                    if (alertMessage) {
                        alertMessage.textContent = "Unable to send right now. Please email directly.";
                        alertMessage.classList.remove("d-none", "alert-success");
                        alertMessage.classList.add("alert-danger");
                    }
                    console.error("EmailJS error:", error);
                })
                .finally(function () {
                    if (submitButton) submitButton.disabled = false;
                    if (spinner) spinner.classList.add("d-none");
                });
        });
    }

    var appHeight = function () {
        document.documentElement.style.setProperty("--app-height", window.innerHeight + "px");
    };
    window.addEventListener("resize", appHeight);
    appHeight();
})();
