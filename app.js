// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initSmoothScrolling();
    initAnimatedCounters();
    initForms();
    initScrollAnimations();
    initMobileMenu();
});

// Navigation scroll effect
function initNavigation() {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add/remove scrolled class based on scroll position
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                navMenu.classList.remove('active');
            }
        });
    });
}

// Scroll to section function for CTA button
function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);

    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;

        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Animated counters for statistics
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.7,
        rootMargin: '0px 0px -100px 0px'
    };

    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                let current = 0;
                const increment = target / 50; // Animation speed

                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + (target === 45 ? '+' : '');
                    }
                };

                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Form handling
function initForms() {
    const membershipForm = document.getElementById('membership-form');

    if (membershipForm) {
        membershipForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Simple form validation
            if (!validateForm(formObject)) {
                return;
            }

            // Show success message
            showSuccessMessage();

            // Reset form
            this.reset();
        });
    }
}

// Form validation
function validateForm(data) {
    const required = ['name', 'email', 'phone', 'major'];

    for (let field of required) {
        if (!data[field] || data[field].trim() === '') {
            alert(`Please fill in the ${field} field.`);
            return false;
        }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    // Phone validation (basic)
    const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
    if (!phoneRegex.test(data.phone)) {
        alert('Please enter a valid phone number.');
        return false;
    }

    // Safety checkbox validation
    if (!data.safety) {
        alert('You must agree to complete the safety orientation program.');
        return false;
    }

    return true;
}

// Show success message
function showSuccessMessage() {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #DC143C, #FF1744);
        color: white;
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        z-index: 10000;
        font-family: 'Inter', sans-serif;
        box-shadow: 0 10px 30px rgba(220, 20, 60, 0.5);
        border: 2px solid #000;
    `;

    message.innerHTML = `
        <h3 style="font-family: 'Orbitron', monospace; margin-bottom: 1rem; font-size: 1.5rem;">🏎️ Application Submitted!</h3>
        <p style="margin-bottom: 1rem;">Thank you for your interest in GS Motorsports. We'll review your application and get back to you soon!</p>
        <button onclick="this.parentNode.remove()" style="
            background: white;
            color: #DC143C;
            border: none;
            padding: 0.8rem 1.5rem;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            font-size: 1rem;
            transition: all 0.3s ease;
        " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">Close</button>
    `;

    document.body.appendChild(message);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, 5000);
}

// Scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.team-member, .event-card, .news-article, .stat-card');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        scrollObserver.observe(element);
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            // Animate hamburger menu
            const spans = navToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(6px, 6px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(6px, -6px)';
                } else {
                    span.style.transform = '';
                    span.style.opacity = '1';
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '1';
                });
            }
        });
    }
}

// Add loading class removal after page loads
window.addEventListener('load', function() {
    document.body.classList.remove('loading');

    // Add entrance animation to hero text
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const ctaButton = document.querySelector('.cta-button');

    setTimeout(() => {
        if (heroTitle) heroTitle.style.opacity = '1';
    }, 300);

    setTimeout(() => {
        if (heroDescription) heroDescription.style.opacity = '1';
    }, 600);

    setTimeout(() => {
        if (ctaButton) ctaButton.style.opacity = '1';
    }, 900);
});

// Console message for developers
console.log('%c🏎️ GS MOTORSPORTS F1 WEBSITE 🏁', 'color: #DC143C; font-size: 20px; font-weight: bold; font-family: Orbitron;');
console.log('%cF1 Scrollbar Active! Racing red track with car thumb.', 'color: #FF1744; font-size: 14px;');
console.log('%cWebsite by Racing Enthusiasts for Racing Enthusiasts', 'color: #FFFFFF; font-size: 12px;');