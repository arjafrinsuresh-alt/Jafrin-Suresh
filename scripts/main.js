/**
 * main.js
 * Redesign: Apple-style Interactivity
 * Handles scroll reveals, accordion transitions, and sticky navigations.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ----------------------------------------------------------------------
    // 1. SCROLL REVEAL ANIMATIONS (Intersection Observer)
    // ----------------------------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal-up, .timeline-entry');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal', 'active');
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // ----------------------------------------------------------------------
    // 2. SKILLS ACCORDION LOGIC
    // ----------------------------------------------------------------------
    const accordionItems = document.querySelectorAll('.accordion-item');
    const skillImg = document.getElementById('skill-display-img');

    if (accordionItems.length > 0 && skillImg) {
        accordionItems.forEach(item => {
            item.addEventListener('click', () => {
                // Deactivate all others
                accordionItems.forEach(i => i.classList.remove('active'));
                
                // Activate clicked
                item.classList.add('active');
                
                // Change image with smooth fade
                const newImgSrc = item.getAttribute('data-img');
                skillImg.style.opacity = '0';
                
                setTimeout(() => {
                    skillImg.src = newImgSrc;
                    skillImg.style.opacity = '1';
                }, 400);
            });
        });
    }

    // ----------------------------------------------------------------------
    // 3. SUB-NAV CHIP SCROLLING (Auto-scroll container when active)
    // ----------------------------------------------------------------------
    const subNav = document.querySelector('.sub-nav');
    const sections = document.querySelectorAll('section, header');
    const navChips = document.querySelectorAll('.nav-chip');

    window.addEventListener('scroll', () => {
        let current = "";
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navChips.forEach(chip => {
            chip.classList.remove('active');
            if (chip.getAttribute('href').includes(current)) {
                chip.classList.add('active');
            }
        });
    });

    // Optional: Smooth scroll for nav chips
    navChips.forEach(chip => {
        chip.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = chip.getAttribute('href');
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                window.scrollTo({
                    top: targetEl.offsetTop - 88, // Navbar + Sub-nav height
                    behavior: 'smooth'
                });
            }
        });
    });

});
