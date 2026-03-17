/**
 * main.js
 * Handles interactivity for the Jafrin Suretha Suresh Portfolio.
 * Written in Vanilla JavaScript for easy maintenance.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ----------------------------------------------------------------------
    // 1. DARK MODE TOGGLE
    // ----------------------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');
    const body = document.body;

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
        if (window.scrollY > 50) {
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
            // Simple toggle for mobile view
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = 'var(--color-bg-primary)';
                navLinks.style.padding = '20px';
                navLinks.style.alignItems = 'center';
            }
        });
    }

    // ----------------------------------------------------------------------
    // 4. SCROLL ANIMATIONS (Intersection Observer)
    // Reveals elements as they scroll into view
    // ----------------------------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal-up, .zoom-in');

    const revealOptions = {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits bottom of viewport
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target); 
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // ----------------------------------------------------------------------
    // 5. PARALLAX HERO BACKGROUND
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
