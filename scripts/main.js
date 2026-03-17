/**
 * main.js
 * Redesign: Apple-style + Shiv's Motion Interactivity
 * Handles scroll reveals, accordion, intro transitions, and page wipes.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ----------------------------------------------------------------------
    // TASK 1 & 6: INTRO SCREEN & HERO SCROLL SCALE
    // ----------------------------------------------------------------------
    const introOverlay = document.getElementById('intro-overlay');
    const progressBar = document.querySelector('.intro-progress-bar');
    const heroH1 = document.querySelector('.hero-headline');

    if (introOverlay) {
        // Start progress bar animation
        setTimeout(() => {
            progressBar.style.width = '100%';
            progressBar.style.transition = 'width 2.5s linear';
        }, 10);

        // Slide up after 2.5s
        setTimeout(() => {
            introOverlay.classList.add('exit');
            // Initial check for reveal-up animations in hero
            document.querySelectorAll('.hero-section .reveal-up').forEach(el => el.classList.add('active'));
        }, 2500);
    }

    // Scroll-Linked Text Scale for Hero Headline
    window.addEventListener('scroll', () => {
        if (!heroH1) return;
        window.requestAnimationFrame(() => {
            const progress = Math.min(window.scrollY / 400, 1);
            heroH1.style.transform = `scale(${1 - progress * 0.4})`;
            heroH1.style.opacity = 1 - progress;
        });
    });

    // ----------------------------------------------------------------------
    // TASK 4: FULL-PAGE SECTION WIPE TRANSITION
    // ----------------------------------------------------------------------
    function pageTransition(targetId) {
        const wipe = document.getElementById('wipe-panel');
        const target = document.querySelector(targetId);
        
        if (wipe) {
            // First: Reset panel to left
            wipe.style.transition = 'none';
            wipe.style.transform = 'translateX(-100%)';
            
            // Trigger animation
            setTimeout(() => {
                wipe.style.transition = 'transform 0.4s cubic-bezier(0.76, 0, 0.24, 1)';
                wipe.style.transform = 'translateX(0)';
                
                setTimeout(() => {
                    // Midway point (covered by black): scroll instantly
                    if (target) {
                        window.scrollTo({
                            top: target.offsetTop - 80,
                            behavior: 'auto'
                        });
                    }
                    
                    // Slide panel out to the right
                    wipe.style.transform = 'translateX(100%)';
                }, 400);
            }, 10);
        }
    }

    // Intercept nav links (nav-chips and nav-logo)
    const links = document.querySelectorAll('.nav-chip, .nav-logo');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                pageTransition(href);
            }
        });
    });

    // ----------------------------------------------------------------------
    // SCROLL REVEAL ANIMATIONS (Intersection Observer)
    // ----------------------------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal-up, .timeline-entry');

    const revealOptions = {
        threshold: 0.1,
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
    // SKILLS ACCORDION LOGIC
    // ----------------------------------------------------------------------
    const accordionItems = document.querySelectorAll('.accordion-item');
    const skillImg = document.getElementById('skill-display-img');

    if (accordionItems.length > 0 && skillImg) {
        accordionItems.forEach(item => {
            item.addEventListener('click', () => {
                accordionItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                
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
    // TASK 3: ARCHITECTURAL CUSTOM CURSOR
    // ----------------------------------------------------------------------
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');
    const interactiveElements = document.querySelectorAll('a, button, .nav-chip, .explore-card, .feature-card, .btn-brass-pill, .btn-primary, .btn-outline');

    if (cursorDot && cursorRing) {
        window.addEventListener('mousemove', (e) => {
            const { clientX: x, clientY: y } = e;
            cursorDot.style.left = `${x}px`;
            cursorDot.style.top = `${y}px`;
            
            cursorRing.style.left = `${x}px`;
            cursorRing.style.top = `${y}px`;
        });

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorRing.classList.add('active');
                if (el.classList.contains('explore-card')) {
                    cursorRing.classList.add('diamond');
                }
            });
            el.addEventListener('mouseleave', () => {
                cursorRing.classList.remove('active');
                cursorRing.classList.remove('diamond');
            });
        });
    }

});
