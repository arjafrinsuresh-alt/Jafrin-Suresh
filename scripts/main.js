/**
 * main.js
 * Handles interactivity for the Jafrin Suretha Suresh Portfolio.
 * Written in Vanilla JavaScript for easy maintenance.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ----------------------------------------------------------------------
    // 0. LOADING SCREEN (Task 7)
    // ----------------------------------------------------------------------
    const loader = document.getElementById('loader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 800);
            }, 2000); // 2 seconds loading
        });
    }

    // ----------------------------------------------------------------------
    // 1. DARK MODE TOGGLE
    // ----------------------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');
    const body = document.body;

    // ----------------------------------------------------------------------
    // TYPEWRITER EFFECT
    // ----------------------------------------------------------------------
    const taglineElement = document.getElementById('typewriter-tagline');
    const textToType = "Designing spaces that shape experiences.";
    let charIndex = 0;

    function typeText() {
        if (charIndex < textToType.length) {
            taglineElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 70); // Speed of typing
        }
    }

    // Start typewriter after a short delay (for hero entrance)
    setTimeout(typeText, 800);

    // Check saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.replace('light-mode', 'dark-mode');
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    }

    // Toggle theme on button click
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            if (body.classList.contains('light-mode')) {
                body.classList.replace('light-mode', 'dark-mode');
                localStorage.setItem('theme', 'dark');
                moonIcon.style.display = 'none';
                sunIcon.style.display = 'block';
            } else {
                body.classList.replace('dark-mode', 'light-mode');
                localStorage.setItem('theme', 'light');
                moonIcon.style.display = 'block';
                sunIcon.style.display = 'none';
            }
        });
    }

    // ----------------------------------------------------------------------
    // 2. STICKY NAVBAR ON SCROLL
    // ----------------------------------------------------------------------
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ----------------------------------------------------------------------
    // 3. MOBILE MENU TOGGLE
    // ----------------------------------------------------------------------
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // ----------------------------------------------------------------------
    // 4. SCROLL ANIMATIONS (Intersection Observer)
    // ----------------------------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal-up, .zoom-in, .skill-category');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // ----------------------------------------------------------------------
    // 5. CUSTOM CURSOR (Task 9)
    // ----------------------------------------------------------------------
    const cursorDot = document.createElement('div');
    const cursorRing = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    cursorRing.className = 'cursor-ring';
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorRing);

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    function animateRing() {
        // Lag effect
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
        requestAnimationFrame(animateRing);
    }
    animateRing();

    // Scale on interaction
    const interactables = document.querySelectorAll('a, button, .project-card');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
    });

    // ----------------------------------------------------------------------
    // 6. PARALLAX HERO BACKGROUND
    // ----------------------------------------------------------------------
    const parallaxBg = document.querySelector('.parallax');
    
    if (parallaxBg) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const speed = parallaxBg.getAttribute('data-speed') || 0.5;
            // Move background slower than foreground
            parallaxBg.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    }
});
