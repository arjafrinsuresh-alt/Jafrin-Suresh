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
    
    // New overlay elements
    const overlayRole = document.getElementById('overlay-role');
    const overlayLocation = document.getElementById('overlay-location');
    const overlayScope = document.getElementById('overlay-scope');
    const overlayContributions = document.getElementById('overlay-contributions');
    const overlayDrawings = document.getElementById('overlay-drawings-gallery');

    const projectData = {
        1: {
            title: "Professional Experience — A&N Architects",
            year: "October 2025 – Present",
            role: "",
            location: "",
            desc: `
<div style="font-size: 14px; font-weight: 600; color: #1A1814; margin-bottom: 16px;">A&N Architects, London, UK</div>
<p style="font-size: 14px; line-height: 1.9; color: #555; margin-bottom: 10px;">Produced 15+ drawing sheets per project across 2 live schemes — a residential unit and a pub refurbishment — including floor plans, sections, elevations and proposed drawings across RIBA Stages 0–4. Carried out on-site surveys and translated findings into accurate existing and proposed drawing packages for planning application submissions, preparing full packages including design and access statements, location plans and proposed drawings in line with local planning authority requirements, alongside client-facing visualisation.</p>

<div class="software-row" style="display: flex; flex-wrap: wrap; gap: 8px; margin: 20px 0;">
    <span style="background: #1A1814; color: #F0ECE4; font-size: 11px; letter-spacing: 1.5px; padding: 5px 14px; border-radius: 20px;">AutoCAD</span>
    <span style="background: #1A1814; color: #F0ECE4; font-size: 11px; letter-spacing: 1.5px; padding: 5px 14px; border-radius: 20px;">Revit</span>
    <span style="background: #1A1814; color: #F0ECE4; font-size: 11px; letter-spacing: 1.5px; padding: 5px 14px; border-radius: 20px;">SketchUp</span>
    <span style="background: #1A1814; color: #F0ECE4; font-size: 11px; letter-spacing: 1.5px; padding: 5px 14px; border-radius: 20px;">V-Ray</span>
    <span style="background: #1A1814; color: #F0ECE4; font-size: 11px; letter-spacing: 1.5px; padding: 5px 14px; border-radius: 20px;">Lumion</span>
</div>

<div class="proj-img-grid">
    <div class="proj-img-slot" style="border-radius: 8px; overflow: hidden; aspect-ratio: 16/9; background: #E8E4DD;"><img src="images/1.1.jpg" alt="Project design plan 1" style="width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s ease; cursor: pointer;" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'"></div>
    <div class="proj-img-slot" style="border-radius: 8px; overflow: hidden; aspect-ratio: 16/9; background: #E8E4DD;"><img src="images/1.2.jpg" alt="Project design 2" style="width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s ease; cursor: pointer;" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'"></div>
    <div class="proj-img-slot" style="border-radius: 8px; overflow: hidden; aspect-ratio: 16/9; background: #E8E4DD;"><img src="images/1.3.jpg" alt="Project design 3" style="width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s ease; cursor: pointer;" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'"></div>
    <div class="proj-img-slot" style="border-radius: 8px; overflow: hidden; aspect-ratio: 16/9; background: #E8E4DD;"><img src="images/1.4.jpg" alt="Project design 4" style="width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s ease; cursor: pointer;" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'"></div>
    <div class="proj-img-slot" style="border-radius: 8px; overflow: hidden; aspect-ratio: 16/9; background: #E8E4DD;"><img src="images/1.5.jpg" alt="Project design 5" style="width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s ease; cursor: pointer;" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'"></div>
</div>
<p class="replace-note" style="font-size: 10px; color: #aaa; margin-top: 8px; font-style: italic;">Images shown are actual project process and floor plan documents.</p>`,
            scope: [],
            contributions: [],
            software: [],
            mainMedia: { src: "images/Project 1.0.jpeg", type: "image" },
            thumbs: [],
            drawings: []
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
        
        if (overlayRole) overlayRole.textContent = data.role ? `· ${data.role}` : "";
        if (overlayLocation) overlayLocation.textContent = data.location ? `· ${data.location}` : "";
        
        overlayDesc.innerHTML = data.desc;
        
        if (overlayScope) {
            overlayScope.innerHTML = "";
            if (data.scope && data.scope.length) {
                overlayScope.parentElement.style.display = 'block';
                data.scope.forEach(s => {
                    const li = document.createElement('li');
                    li.textContent = s;
                    overlayScope.appendChild(li);
                });
            } else {
                overlayScope.parentElement.style.display = 'none';
            }
        }
        
        if (overlayContributions) {
            overlayContributions.innerHTML = "";
            if (data.contributions && data.contributions.length) {
                overlayContributions.parentElement.style.display = 'block';
                data.contributions.forEach(c => {
                    const li = document.createElement('li');
                    li.textContent = c;
                    overlayContributions.appendChild(li);
                });
            } else {
                overlayContributions.parentElement.style.display = 'none';
            }
        }
        
        if (data.software && data.software.length > 0) {
            overlaySoftware.style.display = 'block';
            overlaySoftware.innerHTML = "<strong>Software used:</strong>";
            data.software.forEach(sw => {
                const span = document.createElement('span');
                span.className = 'software-pill';
                span.textContent = sw;
                overlaySoftware.appendChild(span);
            });
        } else {
            overlaySoftware.style.display = 'none';
        }

        overlayThumbs.innerHTML = "";
        if (data.thumbs && data.thumbs.length > 0) {
            data.thumbs.forEach(thumb => {
                const div = document.createElement('div');
                div.className = 'thumb-item';
                div.title = thumb.title;
                const thumbImg = thumb.type === 'video' ? 'images/project1-thumb.jpg' : thumb.src;
                div.innerHTML = `<img src="${thumbImg}" alt="thumbnail" onerror="this.src='images/project1-thumb.jpg';">`;
                div.addEventListener('click', () => swapOverlayMedia(thumb.src, thumb.type));
                overlayThumbs.appendChild(div);
            });
            overlayThumbs.style.display = 'flex';
        } else {
            overlayThumbs.style.display = 'none';
        }

        const overlayMediaContainer = document.getElementById('overlay-media-container');
        if (data.mainMedia && data.mainMedia.src) {
            overlayMediaContainer.style.display = 'block';
            swapOverlayMedia(data.mainMedia.src, data.mainMedia.type);
        } else if (data.video) {
            overlayMediaContainer.style.display = 'block';
            swapOverlayMedia(data.video, 'video');
        } else {
            overlayMediaContainer.style.display = 'none';
        }

        const detailsGrid = document.querySelector('.overlay-details-grid');
        const infoCol = document.querySelector('.overlay-info-col');
        
        if (!data.thumbs || data.thumbs.length === 0) {
            if (detailsGrid) detailsGrid.style.display = 'block';
            if (infoCol) {
                infoCol.style.textAlign = 'center';
                infoCol.style.margin = '0 auto';
                infoCol.style.maxWidth = '900px';
                overlaySoftware.style.justifyContent = 'center';
            }
        } else {
            if (detailsGrid) detailsGrid.style.display = 'grid';
            if (infoCol) {
                infoCol.style.textAlign = 'left';
                infoCol.style.margin = '0';
                infoCol.style.maxWidth = 'none';
                overlaySoftware.style.justifyContent = 'flex-start';
            }
        }

        if (overlayDrawings) {
            overlayDrawings.innerHTML = "";
            if (data.drawings && data.drawings.length) {
                overlayDrawings.style.display = 'flex';
                
                const heading = document.createElement('h3');
                heading.textContent = "Technical Drawings";
                heading.style.fontSize = "28px";
                heading.style.borderBottom = "1px solid rgba(255,255,255,0.1)";
                heading.style.paddingBottom = "15px";
                heading.style.marginBottom = "20px";
                overlayDrawings.appendChild(heading);

                data.drawings.forEach(dwg => {
                    const wrap = document.createElement('div');
                    wrap.style.background = "#fff";
                    wrap.style.padding = "20px";
                    wrap.style.borderRadius = "8px";
                    wrap.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5)";
                    
                    if (dwg.title) {
                        const title = document.createElement('h4');
                        title.textContent = dwg.title;
                        title.style.color = "#111";
                        title.style.fontSize = "16px";
                        title.style.marginBottom = "15px";
                        wrap.appendChild(title);
                    }

                    const img = document.createElement('img');
                    img.src = dwg.src;
                    img.alt = dwg.title || "Drawing";
                    img.style.width = "100%";
                    img.style.height = "auto";
                    img.style.display = "block";
                    img.onerror = () => { wrap.style.display = 'none'; };
                    
                    wrap.appendChild(img);
                    overlayDrawings.appendChild(wrap);
                });
            } else {
                overlayDrawings.style.display = 'none';
            }
        }
        
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
    // DARK MODE TOGGLE (Moon icon functionality)
    // ----------------------------------------------------------------------
    const darkToggle = document.getElementById('dark-mode-toggle');
    if (darkToggle) {
        const moonSvg = darkToggle.querySelector('.moon-svg');
        const sunSvg = darkToggle.querySelector('.sun-svg');
        
        function updateThemeIcon(isDark) {
            if (isDark) {
                if (moonSvg) moonSvg.style.display = 'none';
                if (sunSvg) sunSvg.style.display = 'block';
            } else {
                if (sunSvg) sunSvg.style.display = 'none';
                if (moonSvg) moonSvg.style.display = 'block';
            }
        }

        // Load theme from localStorage
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            updateThemeIcon(true);
        } else {
            updateThemeIcon(false);
        }

        darkToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            
            if (isDark) {
                localStorage.setItem('theme', 'dark');
                updateThemeIcon(true);
            } else {
                localStorage.setItem('theme', 'light');
                updateThemeIcon(false);
            }
        });
    }

    // ----------------------------------------------------------------------
    // TASK 8: RESUME PREVIEW MODAL
    // ----------------------------------------------------------------------
    const resumePreviewModal = document.getElementById('resume-preview-modal');
    const resumePreviewContent = document.getElementById('resume-preview-content');
    const resumeGlow = document.getElementById('resume-glow');
    const resumeCanvasWrapper = document.getElementById('resume-canvas-wrapper');
    let pdfRendered = false;

    window.openResumePreview = function() {
        if (!resumePreviewModal) return;
        resumePreviewModal.classList.remove('overlay-hidden');
        document.body.style.overflow = 'hidden';
        
        // Render PDF if not rendered yet
        if (!pdfRendered && typeof pdfjsLib !== 'undefined' && typeof resumePdfBase64 !== 'undefined') {
            const pdfData = atob(resumePdfBase64);
            const loadingTask = pdfjsLib.getDocument({data: pdfData});
            loadingTask.promise.then(pdf => {
                resumeCanvasWrapper.innerHTML = ''; // Clear loading text
                
                // Fetch pages sequentially to maintain order
                let promise = Promise.resolve();
                for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                    promise = promise.then(() => pdf.getPage(pageNum).then(page => {
                        const scale = 1.5; // High resolution
                        const viewport = page.getViewport({ scale });
                        
                        const canvas = document.createElement('canvas');
                        canvas.style.maxWidth = '100%';
                        canvas.style.height = 'auto';
                        canvas.style.display = 'block';
                        canvas.style.margin = '0 auto 20px auto';
                        canvas.style.borderRadius = '4px';
                        canvas.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
                        
                        const context = canvas.getContext('2d');
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;
                        
                        const renderContext = {
                            canvasContext: context,
                            viewport: viewport
                        };
                        page.render(renderContext);
                        resumeCanvasWrapper.appendChild(canvas);
                    }));
                }
                pdfRendered = true;
            }).catch(err => {
                console.error("Error rendering PDF:", err);
                resumeCanvasWrapper.innerHTML = '<p style="color:white; padding: 20px;">Could not load preview. Please download the resume using the button above.</p>';
            });
        }
    };

    window.closeResumePreview = function() {
        if (!resumePreviewModal) return;
        resumePreviewModal.classList.add('overlay-hidden');
        document.body.style.overflow = 'auto';
    };

    // Luminous Effect Tracking over the entire modal
    if (resumePreviewModal && resumeGlow) {
        resumePreviewModal.addEventListener('mousemove', (e) => {
            const rect = resumePreviewContent.getBoundingClientRect();
            // Calculate mouse position relative to the modal content box
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            resumeGlow.style.left = `${x}px`;
            resumeGlow.style.top = `${y}px`;
        });
    }

});

(function() {
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lightbox-img');
  var imgs = [];
  var current = 0;

  function openLightbox(index) {
    imgs = Array.from(document.querySelectorAll('.exp-img-slot img, .exp-gallery img, .proj-img-slot img'));
    current = index;
    lbImg.src = imgs[current].src;
    lb.style.display = 'flex';
  }

  function closeLightbox() {
    lb.style.display = 'none';
    lbImg.src = '';
  }

  function showPrev() {
    current = (current - 1 + imgs.length) % imgs.length;
    lbImg.src = imgs[current].src;
  }

  function showNext() {
    current = (current + 1) % imgs.length;
    lbImg.src = imgs[current].src;
  }

  document.addEventListener('click', function(e) {
    var imgEl = e.target.closest('.exp-img-slot img, .exp-gallery img, .proj-img-slot img');
    if (imgEl) {
      imgs = Array.from(document.querySelectorAll('.exp-img-slot img, .exp-gallery img, .proj-img-slot img'));
      current = imgs.indexOf(imgEl);
      openLightbox(current);
    }
  });

  var btnPrev = document.getElementById('lb-prev');
  var btnNext = document.getElementById('lb-next');
  var btnClose = document.getElementById('lb-close');

  if(btnPrev) btnPrev.addEventListener('click', showPrev);
  if(btnNext) btnNext.addEventListener('click', showNext);
  if(btnClose) btnClose.addEventListener('click', closeLightbox);

  if(lb) lb.addEventListener('click', function(e) {
    if (e.target === lb) closeLightbox();
  });

  document.addEventListener('keydown', function(e) {
    if (lb && lb.style.display === 'flex') {
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'Escape') closeLightbox();
    }
  });

  if(btnPrev) {
      btnPrev.addEventListener('mouseover', function() { this.style.opacity = '1'; });
      btnPrev.addEventListener('mouseout', function() { this.style.opacity = '0.7'; });
  }
  if(btnNext) {
      btnNext.addEventListener('mouseover', function() { this.style.opacity = '1'; });
      btnNext.addEventListener('mouseout', function() { this.style.opacity = '0.7'; });
  }
  if(btnClose) {
      btnClose.addEventListener('mouseover', function() { this.style.opacity = '1'; });
      btnClose.addEventListener('mouseout', function() { this.style.opacity = '0.7'; });
  }
})();
