// Initialize AOS animation library
AOS.init({
    duration: 1000,
    once: true
});

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

// Initialize EmailJS
(function() {
    emailjs.init('I-YFHStMwz3rLPTQ9');
})();

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the form elements
    const submitButton = document.getElementById('submitButton');
    const spinner = submitButton.querySelector('.spinner-border');
    const buttonText = submitButton.querySelector('span');
    const alertMessage = document.getElementById('alertMessage');

    // Show loading state
    submitButton.disabled = true;
    spinner.classList.remove('d-none');
    buttonText.textContent = 'Sending...';
    alertMessage.classList.add('d-none');

    // Prepare the email parameters to match your portfolio template
    const templateParams = {
        from_name: document.getElementById('name').value,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        reply_to: document.getElementById('email').value,
        to_email: 'lesterbonbiono@gmail.com'
    };

    // Send the email using your portfolio template
    emailjs.send('service_k50zcxm', 'template_8gixqxa', templateParams)
        .then(function() {
            // Show success message
            alertMessage.textContent = 'Thank you for reaching out! I will get back to you soon.';
            alertMessage.classList.remove('d-none', 'alert-danger');
            alertMessage.classList.add('alert-success');

            // Reset form
            document.getElementById('contactForm').reset();
        }, function(error) {
            // Show error message
            alertMessage.textContent = 'Failed to send message. Please try again.';
            alertMessage.classList.remove('d-none', 'alert-success');
            alertMessage.classList.add('alert-danger');
            console.error('EmailJS error:', error);
        })
        .finally(function() {
            // Reset button state
            submitButton.disabled = false;
            spinner.classList.add('d-none');
            buttonText.textContent = 'Send Message';
        });
});

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