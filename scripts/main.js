document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------------------------
    // HERO SEQUENCING
    // ----------------------------------------------------------------------
    const heroNameSelector = document.querySelector('.hero-name');
    const heroTaglineSelector = document.querySelector('.hero-tagline');
    
    setTimeout(() => {
        if (heroNameSelector) {
            heroNameSelector.classList.add('animate');
            const words = heroNameSelector.querySelectorAll('.word');
            words.forEach((word, idx) => {
                word.style.animationDelay = `${0.3 + idx * 0.15}s`;
            });
        }
        
        setTimeout(() => {
            if (heroTaglineSelector) {
                heroTaglineSelector.classList.add('animate');
                const tags = heroTaglineSelector.querySelectorAll('.tag-word');
                tags.forEach((tag, idx) => {
                    tag.style.animationDelay = `${0.4 + idx * 0.1}s`;
                });
            }
        }, 600);
    }, 1000);


    // ----------------------------------------------------------------------
    // TASK 7: SIDEBAR NAVIGATION & SECTION TRACKING
    // ----------------------------------------------------------------------
    const sidebar = document.getElementById('sidebar-nav');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const allSections = document.querySelectorAll('section, header');

    const sidebarObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                if (!id) return;
                
                sidebarLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === id) {
                        link.classList.add('active');
                    }
                });

                // Detect dark background for inversion
                const bgColor = window.getComputedStyle(entry.target).backgroundColor;
                const rgb = bgColor.match(/\d+/g);
                if (rgb) {
                    const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
                    if (brightness < 80) {
                        sidebar.classList.add('inverted');
                    } else {
                        sidebar.classList.remove('inverted');
                    }
                }
            }
        });
    }, { threshold: 0.3 });

    allSections.forEach(section => sidebarObserver.observe(section));


    // ----------------------------------------------------------------------
    // TASK 2: BUFFER MARQUEE SPEED-UP & FADE
    // ----------------------------------------------------------------------
    const bufferSection = document.getElementById('buffer');
    const marquee = document.getElementById('marquee-text');

    const bufferObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                marquee.classList.add('fast');
                bufferSection.style.opacity = '1';
            } else {
                marquee.classList.remove('fast');
                if (entry.boundingClientRect.top < 0) {
                    bufferSection.style.opacity = '0';
                }
            }
        });
    }, { threshold: 0.2 });

    if (bufferSection) bufferObserver.observe(bufferSection);


    // ----------------------------------------------------------------------
    // TASK 4: PROJECTS PARALLAX BLUR
    // ----------------------------------------------------------------------
    const projectsSection = document.getElementById('projects');
    const projectsBlur = document.getElementById('projects-blur');
    let projectsActive = false;

    const projectsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            projectsActive = entry.isIntersecting;
            if (projectsBlur) {
                projectsBlur.style.display = projectsActive ? 'flex' : 'none';
            }
        });
    }, { threshold: 0 });

    if (projectsSection) projectsObserver.observe(projectsSection);

    function animateProjectsBlur() {
        if (projectsActive && projectsSection && projectsBlur) {
            const rect = projectsSection.getBoundingClientRect();
            const scrolledFromTop = window.innerHeight - rect.top;
            const yPos = scrolledFromTop * 0.2; // Optimized Parallax Speed
            projectsBlur.style.transform = `scale(1.1) translateY(${-yPos}px)`;
        }
        requestAnimationFrame(animateProjectsBlur);
    }
    animateProjectsBlur();


    // ----------------------------------------------------------------------
    // TASK 5: PROJECT OVERLAY SYSTEM
    // ----------------------------------------------------------------------
    const projectOverlay = document.getElementById('project-overlay');
    const overlayVideo = document.getElementById('overlay-video');
    const overlayImg = document.getElementById('overlay-img');
    const overlayTitle = document.getElementById('overlay-title');
    const overlayYear = document.getElementById('overlay-year');
    const overlayDesc = document.getElementById('overlay-description');
    const overlaySoftware = document.getElementById('overlay-software');
    const overlayThumbs = document.getElementById('overlay-thumbnails');

    const projectData = {
        1: {
            title: "Architectural Design Development & Visualization",
            year: "2023",
            desc: "This design explores sustainable architecture and environmental performance through advanced BIM workflows. The project integrated detailed energy modeling and clash detection to ensure optimal lifecycle efficiency.",
            software: ["Revit", "AutoCAD", "Lumion", "Photoshop"],
            video: "videos/project-1.mp4",
            thumbs: [
                { src: "videos/project-1.mp4", type: "video", title: "Project walkthrough — Lumion" },
                { src: "images/gallery-1.jpg", type: "image", title: "Ground floor plan — AutoCAD" },
                { src: "images/gallery-2.jpg", type: "image", title: "Exterior render — Lumion 2024" },
                { src: "images/gallery-3.jpg", type: "image", title: "Structural detail — Revit" }
            ]
        },
        2: {
            title: "Residential Extension Planning",
            year: "2023",
            desc: "Focusing on urban adaptation, this project involved 5 planning applications for residential extension and refurbishment in London. Each design balanced heritage constraints with modern living requirements.",
            software: ["AutoCAD", "Enscape", "Rhino", "SketchUp"],
            video: "videos/project-1.mp4",
            thumbs: [
                { src: "videos/project-1.mp4", type: "video", title: "Site Animation" },
                { src: "images/project2-thumb.jpg", type: "image", title: "Proposed Elevation" }
            ]
        },
        3: {
            title: "Airport Terminal Expansion Concept",
            year: "2022",
            desc: "Focused on passenger flow modelling and spatial planning. This concept utilizes modular construction techniques and high-performance glazed facades to create an intuitive gateway experience.",
            software: ["Rhino", "Navisworks", "Lumion", "Grasshopper"],
            video: "videos/project-1.mp4",
            thumbs: [
                { src: "videos/project-1.mp4", type: "video", title: "Terminal flow simulation" },
                { src: "images/project3-thumb.jpg", type: "image", title: "Interior Perspective" }
            ]
        }
    };

    window.openProject = function(id) {
        const data = projectData[id];
        if (!data) return;

        overlayTitle.textContent = data.title;
        overlayYear.textContent = data.year;
        overlayDesc.textContent = data.desc;
        
        overlaySoftware.innerHTML = "<strong>Software used:</strong>";
        data.software.forEach(sw => {
            const span = document.createElement('span');
            span.className = 'software-pill';
            span.textContent = sw;
            overlaySoftware.appendChild(span);
        });

        overlayThumbs.innerHTML = "";
        data.thumbs.forEach(thumb => {
            const div = document.createElement('div');
            div.className = 'thumb-item';
            div.title = thumb.title;
            const thumbImg = thumb.type === 'video' ? 'images/project1-thumb.jpg' : thumb.src;
            div.innerHTML = `<img src="${thumbImg}" alt="thumbnail">`;
            div.addEventListener('click', () => swapOverlayMedia(thumb.src, thumb.type));
            overlayThumbs.appendChild(div);
        });

        swapOverlayMedia(data.video, 'video');
        projectOverlay.classList.remove('overlay-hidden');
        document.body.style.overflow = 'hidden';
    };

    window.closeProject = function() {
        projectOverlay.classList.add('overlay-hidden');
        document.body.style.overflow = 'auto';
        overlayVideo.pause();
    };

    function swapOverlayMedia(src, type) {
        if (type === 'video') {
            overlayVideo.src = src;
            overlayVideo.classList.remove('hidden');
            overlayImg.classList.add('hidden');
            overlayVideo.play();
        } else {
            overlayImg.src = src;
            overlayImg.classList.remove('hidden');
            overlayVideo.classList.add('hidden');
            overlayVideo.pause();
        }
    }


    // ----------------------------------------------------------------------
    // REVEAL SYSTEM & CURSOR HOVERS
    // ----------------------------------------------------------------------
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal-up, .photo-container, .timeline-item').forEach(el => revealObserver.observe(el));


    // ----------------------------------------------------------------------
    // ARCHITECTURAL CUSTOM CURSOR
    // ----------------------------------------------------------------------
    const cursorDot = document.getElementById('cursor-dot');
    const cursorSquare = document.getElementById('cursor-square');

    window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        cursorDot.style.left = `${clientX}px`;
        cursorDot.style.top = `${clientY}px`;
        cursorSquare.style.left = `${clientX}px`;
        cursorSquare.style.top = `${clientY}px`;
    });

    function updateCursorHovers() {
        const hoverTargets = 'a, button, .project-card-dark, .photo-container, .thumb-item, .sidebar-link';
        document.querySelectorAll(hoverTargets).forEach(el => {
            el.addEventListener('mouseenter', () => cursorSquare.classList.add('hover-diamond'));
            el.addEventListener('mouseleave', () => cursorSquare.classList.remove('hover-diamond'));
        });
    }
    updateCursorHovers();


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

});
