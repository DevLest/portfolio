// Initialize AOS animation library
AOS.init({
    duration: 1000,
    once: true
});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Mobile nav functionality
    const navbarToggle = document.getElementById('navbarToggle');
    const mobileNav = document.getElementById('mobileNav');

    if (navbarToggle && mobileNav) {
        navbarToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });

        // Close mobile nav when clicking a link
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navbarToggle.classList.remove('active');
                mobileNav.classList.remove('active');
            });
        });
    }

    // Typing effect and animations
    const text = "LESTER\nBON BIONO";
    const typedName = document.getElementById('typed-name');
    const contactDetails = document.getElementById('contact-details');
    const location = document.querySelector('.hero-footer .location');
    const role = document.querySelector('.hero-footer .role');
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < text.length) {
            typedName.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        } else {
            setTimeout(() => {
                contactDetails.classList.add('visible');
                setTimeout(() => {
                    location.classList.add('animate');
                    role.classList.add('animate');
                }, 500);
            }, 500);
        }
    }

    typeWriter();

    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            backToTopButton.classList.toggle('visible', window.scrollY > 300);
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Initialize EmailJS
emailjs.init('I-YFHStMwz3rLPTQ9');

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const submitButton = document.getElementById('submitButton');
        const spinner = submitButton.querySelector('.spinner-border');
        const alertMessage = document.getElementById('alertMessage');

        submitButton.disabled = true;
        spinner.classList.remove('d-none');
        alertMessage.classList.add('d-none');

        const templateParams = {
            from_name: document.getElementById('name').value,
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            reply_to: document.getElementById('email').value
        };

        emailjs.send('service_k50zcxm', 'template_8gixqxa', templateParams)
            .then(() => {
                alertMessage.textContent = 'Thank you for reaching out! I will get back to you soon.';
                alertMessage.classList.remove('d-none', 'alert-danger');
                alertMessage.classList.add('alert-success');
                contactForm.reset();
            })
            .catch(error => {
                alertMessage.textContent = 'Failed to send message. Please try again.';
                alertMessage.classList.remove('d-none', 'alert-success');
                alertMessage.classList.add('alert-danger');
                console.error('EmailJS error:', error);
            })
            .finally(() => {
                submitButton.disabled = false;
                spinner.classList.add('d-none');
            });
    });
}

// Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Change navbar background on scroll
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        document.querySelector('.navbar').classList.add('bg-dark');
    } else {
        document.querySelector('.navbar').classList.remove('bg-dark');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
        }
    });
});

// Handle mobile browser address bar hiding
const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty('--app-height', `${window.innerHeight}px`);
};
window.addEventListener('resize', appHeight);
appHeight();

// Prevent rubber-band scrolling on iOS
document.body.addEventListener('touchmove', function(e) {
    if (e.target.closest('.contact-form')) return;
    if (this.scrollTop === 0) {
        this.scrollTop = 1;
    } else if (this.scrollHeight === this.scrollTop + this.offsetHeight) {
        this.scrollTop -= 1;
    }
}, false);

// Add loading animation to contact form
document.querySelectorAll('.contact-form .form-control').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Parallax effect
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxImage = document.querySelector('.parallax-image');
    if (parallaxImage) {
        parallaxImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});