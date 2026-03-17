document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------------------------
    // TASK 1: INTRO OVERLAY & HERO SEQUENCING
    // ----------------------------------------------------------------------
    const introOverlay = document.getElementById('intro-overlay');
    const heroName = document.querySelector('.hero-name');
    const heroTagline = document.querySelector('.hero-tagline');
    
    setTimeout(() => {
        if (introOverlay) {
            introOverlay.classList.add('hide');
        }
        
        // Sequence the hero reveal after intro exits
        setTimeout(() => {
            if (heroName) {
                heroName.classList.add('animate');
                const words = heroName.querySelectorAll('.word');
                words.forEach((word, idx) => {
                    word.style.animationDelay = `${0.3 + idx * 0.15}s`;
                });
            }
            
            // Tagline follows name
            setTimeout(() => {
                if (heroTagline) {
                    heroTagline.classList.add('animate');
                    const tags = heroTagline.querySelectorAll('.tag-word');
                    tags.forEach((tag, idx) => {
                        tag.style.animationDelay = `${0.4 + idx * 0.1}s`;
                    });
                }
            }, 600);
            
        }, 500);
    }, 2500);


    // ----------------------------------------------------------------------
    // ARCHITECTURAL CUSTOM CURSOR (DOT + SQUARE)
    // ----------------------------------------------------------------------
    const cursorDot = document.getElementById('cursor-dot');
    const cursorSquare = document.getElementById('cursor-square');
    const interactive = document.querySelectorAll('a, button, .project-card-dark, .photo-container, .mobile-nav-toggle');

    if (cursorDot && cursorSquare) {
        // Track mouse with high performance
        window.addEventListener('mousemove', (e) => {
            const { clientX: x, clientY: y } = e;
            
            // Immediate dot
            cursorDot.style.left = `${x}px`;
            cursorDot.style.top = `${y}px`;
            
            // Lagging square via CSS transition (0.1s lag in CSS)
            cursorSquare.style.left = `${x}px`;
            cursorSquare.style.top = `${y}px`;
        });

        // Toggle state on hover
        interactive.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorSquare.classList.add('hover-diamond');
            });
            el.addEventListener('mouseleave', () => {
                cursorSquare.classList.remove('hover-diamond');
            });
        });
    }


    // ----------------------------------------------------------------------
    // MOBILE MENU TOGGLE
    // ----------------------------------------------------------------------
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-center');
    const navLinksList = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isVisible = navMenu.style.display === 'flex';
            navMenu.style.display = isVisible ? 'none' : 'flex';
            
            // Hamburger animation would go here if needed
        });

        navLinksList.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 900) {
                    navMenu.style.display = 'none';
                }
            });
        });
    }


    // ----------------------------------------------------------------------
    // NAVBAR SCROLL & BLUR
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
    // DARK MODE TOGGLE (Moon icon functionality)
    // ----------------------------------------------------------------------
    const darkToggle = document.getElementById('dark-mode-toggle');
    if (darkToggle) {
        darkToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            darkToggle.querySelector('.icon-moon').textContent = isDark ? '☀️' : '🌙';
        });
    }


    // ----------------------------------------------------------------------
    // INTERSECTION OBSERVER - PROFESSIONAL REVEAL SYSTEM
    // ----------------------------------------------------------------------
    const baseOptions = { threshold: 0.15, rootMargin: "0px 0px -20px 0px" };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Specific Staggers
                if (entry.target.closest('.skills-grid-columns')) {
                    const skillItems = entry.target.querySelectorAll('.skill-item');
                    skillItems.forEach((item, idx) => {
                        setTimeout(() => {
                            item.classList.add('active');
                        }, idx * 60);
                    });
                }
            }
        });
    }, baseOptions);

    // Apply to standard reveals
    document.querySelectorAll('.reveal-up, .photo-container').forEach(el => scrollObserver.observe(el));

    // Staggered lists (Skills columns)
    document.querySelectorAll('.skill-column').forEach(col => scrollObserver.observe(col));

    // Staggered Timeline Items
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
                // Ensure they sequence properly even if arriving at once
                const visibleEntries = [...timelineItems].filter(ti => ti.classList.contains('active')).length;
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, visibleEntries * 150);
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => timelineObserver.observe(item));

});
