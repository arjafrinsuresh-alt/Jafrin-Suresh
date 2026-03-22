/**
 * TASK 7: TOP NAVIGATION LOGIC
 */
const navLinks = document.querySelectorAll('.nav-link[data-section]');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 120) { // Adjusted for top nav
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
            link.classList.add('active');
        }
    });
});


/**
 * TASK 5: PROJECT OVERLAY SYSTEM
 */
const projectData = {
    'ui-revamp': {
        title: 'Residential Extensions & Refurbishments',
        year: '2024–Present',
        role: 'Architectural Designer @ A&N Architects',
        overview: 'Leading technical design and coordination for high-end residential extensions in London, managing end-to-end planning applications.',
        details: [
            'Authoring 20+ drawing sheets per project across 3–5 live residential schemes.',
            'Maintaining ISO 19650-compliant federated BIM models in Revit.',
            'Coordinating with structural engineers to resolve cross-discipline clashes.',
            'Prepared Design & Access Statements compliant with UK Building Regulations.'
        ],
        media: [
            { type: 'image', src: 'images/1.1.jpg', caption: 'Technical Drawing 1.1' },
            { type: 'image', src: 'images/1.2.jpg', caption: 'Technical Drawing 1.2' },
            { type: 'image', src: 'images/1.3.jpg', caption: 'Technical Drawing 1.3' },
            { type: 'image', src: 'images/1.4.jpg', caption: 'Technical Drawing 1.4' },
            { type: 'image', src: 'images/1.5.jpg', caption: 'Technical Drawing 1.5' }
        ]
    },
    'load-balancer': {
        title: 'MSc Advanced Construction & BIM',
        year: '2024',
        role: 'MSc Student @ Strathclyde',
        overview: 'Specialized in advanced BIM workflows, clash detection, and sustainable design integration.',
        details: [
            'Enhanced Green Roof Design through 15-step BIM integration framework.',
            'Analyzed international case studies including Bloomberg London (BREEAM 98.5%).',
            'Full ISO 19650-compliant BIM workflow implementation in Revit.',
            'Applied digital construction methods to residential extension projects.'
        ],
        media: [
            { type: 'image', src: 'images/3.5.png', caption: 'Clash Detection Analysis' }
        ]
    },
    'red-dhalia': {
        title: 'Airport Terminal Expansion Masterplan',
        year: '2022',
        role: 'Research Intern @ AAI',
        overview: 'Conducted masterplan research and passenger flow analysis for a major international terminal hub.',
        details: [
            'Analyzing passenger flow, wayfinding, and security screening capacity.',
            'Produced 2 conceptual masterplan layout packages and diagrams.',
            'Benchmarked against IATA terminal planning guidelines.',
            'Visualized phased infrastructure delivery through technical documentation.'
        ],
        media: [
            { type: 'image', src: 'images/3.0.png', caption: 'Terminal Concept Rendering' },
            { type: 'image', src: 'images/3.1.png', caption: 'Interior Flow Analysis' },
            { type: 'image', src: 'images/3.2.jpg', caption: 'Technical Section' },
            { type: 'image', src: 'images/3.3.jpg', caption: 'Phasing Diagram' },
            { type: 'image', src: 'images/3.4.jpg', caption: 'Materiality Detail' },
            { type: 'image', src: 'images/3.5.png', caption: 'BIM Model View' },
            { type: 'image', src: 'images/3.6.png', caption: 'Structural Analysis' }
        ]
    }
};

function openProject(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    const overlay = document.getElementById('project-overlay');
    const content = document.getElementById('overlay-content');
    
    // Inject Content
    content.innerHTML = `
        <div class="overlay-details-grid">
            <div class="details-text">
                <p class="overlay-meta">${data.year} · ${data.role}</p>
                <h2 class="overlay-title">${data.title}</h2>
                <p class="overlay-overview">${data.overview}</p>
                <ul class="overlay-bullets">
                    ${data.details.map(detail => `<li>${detail}</li>`).join('')}
                </ul>
            </div>
            <div class="details-media" id="overlay-media-container">
                <img src="${data.media[0].src}" alt="${data.media[0].caption}" class="main-media-item">
                <div class="media-thumbnails">
                    ${data.media.map((item, index) => `
                        <div class="media-thumb ${index === 0 ? 'active' : ''}" onclick="swapOverlayMedia('${item.src}', '${item.caption}', this)">
                            <img src="${item.src}" alt="${item.caption}">
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProject() {
    const overlay = document.getElementById('project-overlay');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

function swapOverlayMedia(src, caption, thumb) {
    const mainImg = document.querySelector('.main-media-item');
    mainImg.src = src;
    mainImg.alt = caption;
    
    document.querySelectorAll('.media-thumb').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
}

/**
 * REVEAL ANIMATIONS ON SCROLL
 */
const revealCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
};

const revealObserver = new IntersectionObserver(revealCallback, { threshold: 0.1 });
document.querySelectorAll('.reveal-up, .reveal-stagger, .reveal-photo').forEach(el => revealObserver.observe(el));

/**
 * TASK 4: PARALLAX BLUR EFFECT
 */
window.addEventListener('scroll', () => {
    const blurContainer = document.getElementById('projects-blur');
    const images = blurContainer.querySelectorAll('img');
    const scrollPos = window.scrollY;
    
    const projectsSection = document.getElementById('projects');
    const sectionTop = projectsSection.offsetTop;
    const sectionHeight = projectsSection.clientHeight;
    
    if (scrollPos > sectionTop - 500 && scrollPos < sectionTop + sectionHeight) {
        const relativePos = (scrollPos - sectionTop + 500) / (sectionHeight + 500);
        const index = Math.floor(relativePos * images.length);
        
        images.forEach((img, i) => {
            img.classList.remove('active');
            if (i === index) img.classList.add('active');
        });
    }
});

/**
 * TASK 8: RESUME PREVIEW MODAL
 */

/**
 * TASK 8: RESUME PREVIEW MODAL
 */
function openResumePreview() {
    document.getElementById('resume-preview-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
    renderResume();
}

function closeResumePreview() {
    document.getElementById('resume-preview-modal').classList.remove('active');
    document.body.style.overflow = '';
}

async function renderResume() {
    const container = document.getElementById('resume-canvas-wrapper');
    if (container.getAttribute('data-loaded') === 'true') return;

    try {
        // resumePdfBase64 is provided in pdfBase64.js
        const pdfData = atob(resumePdfBase64);
        const loadingTask = pdfjsLib.getDocument({data: pdfData});
        const pdf = await loadingTask.promise;
        
        container.innerHTML = ''; // Clear loading text
        
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({scale: 1.5});
            
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            
            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            await page.render(renderContext).promise;
            container.appendChild(canvas);
        }
        
        container.setAttribute('data-loaded', 'true');
    } catch (error) {
        console.error('Error rendering PDF:', error);
        container.innerHTML = '<div style="color: white; padding: 40px;">Failed to load resume preview. Please download the file instead.</div>';
    }
}
