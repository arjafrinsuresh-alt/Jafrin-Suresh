document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------------------------
    // TASK 1: INTRO OVERLAY
    // ----------------------------------------------------------------------
    const introOverlay = document.getElementById('intro-overlay');
    const heroName = document.querySelector('.hero-name');
    
    setTimeout(() => {
        if (introOverlay) {
            introOverlay.classList.add('hide');
        }
        // Run hero text animation after intro finishes
        setTimeout(() => {
            if (heroName) {
                heroName.classList.add('animate');
                // Apply stagger
                const words = heroName.querySelectorAll('.word');
                words.forEach((word, index) => {
                    word.style.animationDelay = `${0.3 + index * 0.15}s`;
                });
            }
        }, 300);
    }, 2400); // Intro lasts 2.5s (matching CSS progress bar)


    // ----------------------------------------------------------------------
    // TASK 3: ARCHITECTURAL CUSTOM CURSOR
    // ----------------------------------------------------------------------
    const cursorDot = document.getElementById('cursor-dot');
    const cursorSquare = document.getElementById('cursor-square');
    const links = document.querySelectorAll('a, button, .project-card-dark, .photo-container');

    if (cursorDot && cursorSquare) {
        window.addEventListener('mousemove', (e) => {
            const { clientX: x, clientY: y } = e;
            
            // Immediate position for dot
            cursorDot.style.left = `${x}px`;
            cursorDot.style.top = `${y}px`;
            
            // Lag/smooth position for square trailing
            // Using requestAnimationFrame for better performance
            cursorSquare.style.left = `${x}px`;
            cursorSquare.style.top = `${y}px`;
        });

        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursorSquare.classList.add('hover-diamond');
            });
            link.addEventListener('mouseleave', () => {
                cursorSquare.classList.remove('hover-diamond');
            });
        });
    }


    // ----------------------------------------------------------------------
    // TASK 4: WIPE PANEL (Cinematic Page Transition)
    // ----------------------------------------------------------------------
    const wipePanel = document.getElementById('wipe-panel');
    const navLinks = document.querySelectorAll('.nav-link, .nav-logo');

    // Smooth page transitions or section transitions
    function pageTransition(href) {
        if (wipePanel) {
            wipePanel.classList.add('start-wipe');
            setTimeout(() => {
                window.location.href = href;
                // Since this might be same-page hash, handle reset
                setTimeout(() => {
                    wipePanel.classList.remove('start-wipe');
                }, 800);
            }, 500);
        } else {
            window.location.href = href;
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                // For same page anchors, maybe just smooth scroll but let's do the cinematic effect
                e.preventDefault();
                // If intro is still active, don't wipe
                if (!introOverlay.classList.contains('hide')) return;
                
                wipePanel.classList.add('start-wipe');
                setTimeout(() => {
                    const targetEl = document.querySelector(href);
                    if (targetEl) {
                        targetEl.scrollIntoView({ behavior: 'auto' });
                    }
                    setTimeout(() => {
                        wipePanel.classList.remove('start-wipe');
                    }, 500);
                }, 500);
            }
        });
    });


    // ----------------------------------------------------------------------
    // NAVBAR SCROLL EFFECT
    // ----------------------------------------------------------------------
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    // ----------------------------------------------------------------------
    // DARK MODE TOGGLE
    // ----------------------------------------------------------------------
    const darkToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    if (darkToggle) {
        darkToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            darkToggle.innerHTML = isDark ? '☀️' : '🌙';
            
            // Update CSS variables for dark mode if needed (or handle in CSS with .dark-mode selector)
        });
    }


    // ----------------------------------------------------------------------
    // INTERSECTION OBSERVER - REVEAL SYSTEM
    // ----------------------------------------------------------------------
    const revealOptions = { threshold: 0.15 };

    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Handle staggered children if needed
                if (entry.target.classList.contains('reveal-stagger')) {
                    const items = entry.target.querySelectorAll('.skill-item');
                    items.forEach((item, idx) => {
                        setTimeout(() => {
                            item.classList.add('active');
                        }, idx * 50);
                    });
                }
                
                if (entry.target.classList.contains('reveal-item')) {
                    // Staggering within a container? 
                    // This handled by direct class addition
                }

                // Photo reveal logic
                if (entry.target.classList.contains('reveal-photo')) {
                    // Already adds 'active' which triggers CSS animation
                }
            }
        });
    }, revealOptions);

    const revealElements = document.querySelectorAll('.reveal-up, .reveal-stagger, .reveal-photo');
    revealElements.forEach(el => revealOnScroll.observe(el));

    // Handle Timeline staggered reveal carefully
    const timelineEntries = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, idx * 150); // Small stagger
            }
        });
    }, { threshold: 0.3 });
    
    timelineEntries.forEach(item => timelineObserver.observe(item));

});
