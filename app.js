document.addEventListener('DOMContentLoaded', () => {
  let portfolioData = null;

  // --- HTML Elements ---
  const header = document.querySelector('header');
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const statsContainer = document.getElementById('stats-container');
  const skillsContainer = document.getElementById('skills-container');
  const projectsGrid = document.getElementById('projects-grid');
  const filterContainer = document.getElementById('filter-container');
  const experienceTimeline = document.getElementById('experience-timeline');
  const educationTimeline = document.getElementById('education-timeline');

  // Contact Form elements
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const btnText = document.getElementById('btn-text');
  const btnSpinner = document.getElementById('btn-spinner');

  // --- THEME MANAGEMENT ---
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeToggleUI(savedTheme);
  };

  const updateThemeToggleUI = (theme) => {
    // Canvas particles color will update dynamically
    if (window.particleSystem) {
      window.particleSystem.updateColors(theme);
    }
  };

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggleUI(newTheme);
  });

  // --- HEADER SCROLL EFFECT & MOBILE NAV ---
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  mobileNavToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const icon = mobileNavToggle.querySelector('i');
    if (navMenu.classList.contains('open')) {
      icon.className = 'fas fa-times';
    } else {
      icon.className = 'fas fa-bars';
    }
  });

  // Close menu on link click (mobile)
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      const icon = mobileNavToggle.querySelector('i');
      if (icon) icon.className = 'fas fa-bars';
    });
  });

  // --- FETCH AND RENDER PORTFOLIO DATA ---
  const fallbackData = {
    "personal": {
      "name": "Abdul Rahman M",
      "title": "Creative Full-Stack Developer",
      "subtitle": "UI/UX Designer",
      "tagline": "Crafting immersive digital experiences through clean code, modern aesthetics, and interactive technologies.",
      "avatar": "",
      "resumeUrl": "#",
      "socials": {
        "github": "https://github.com",
        "linkedin": "https://www.linkedin.com/in/abdul-rahmanmuthafa/",
        "twitter": "https://twitter.com",
        "email": "itzmeabdul1114@gmail.com"
      },
      "location": "Coimbatore",
      "email": "itzmeabdul1114@gmail.com"
    },
    "stats": [
      { "value": "4+", "label": "Years of Experience" },
      { "value": "25+", "label": "Projects Completed" },
      { "value": "15+", "label": "Happy Clients" },
      { "value": "99%", "label": "Client Satisfaction" }
    ],
    "about": {
      "bioParagraphs": [
        "I am a passionate digital craftsman specializing in bridging the gap between functional engineering and beautiful design. My goal is to build high-performance web applications that are not only robust under the hood but also provide intuitive, delightful, and memorable user experiences.",
        "With a strong foundation in both frontend creativity and backend architecture, I thrive in environments that challenge me to solve complex technical problems while maintaining a pixel-perfect eye for detail. I believe every animation should have a purpose and every line of code should be optimized for performance."
      ]
    },
    "skills": [
      {
        "category": "Frontend",
        "items": [
          { "name": "React / Next.js", "level": 90 },
          { "name": "JavaScript (ES6+)", "level": 95 },
          { "name": "HTML5 / CSS3", "level": 95 },
          { "name": "Tailwind CSS / Sass", "level": 90 },
          { "name": "Three.js / WebGL", "level": 60 }
        ]
      },
      {
        "category": "Backend",
        "items": [
          { "name": "Node.js / Express", "level": 85 },
          { "name": "PostgreSQL / MongoDB", "level": 80 },
          { "name": "GraphQL / REST APIs", "level": 90 },
          { "name": "TypeScript", "level": 85 }
        ]
      },
      {
        "category": "Tools & Design",
        "items": [
          { "name": "Figma (UI/UX Design)", "level": 85 },
          { "name": "Git / GitHub", "level": 90 },
          { "name": "Docker & AWS", "level": 75 },
          { "name": "CI/CD & Testing", "level": 80 }
        ]
      }
    ],
    "projects": [
      {
        "title": "Aether Analytics Dashboard",
        "description": "A high-performance SaaS analytics suite displaying real-time data flow with interactive visual graphics and customizable user dashboards.",
        "category": "Web App",
        "tags": ["Next.js", "TypeScript", "Node.js", "D3.js"],
        "image": "aether",
        "demoUrl": "#",
        "codeUrl": "https://github.com"
      },
      {
        "title": "Luminary Headless E-Commerce",
        "description": "A blazing fast, modular, headless commerce solution featuring swift instant page transitions, custom CMS integrations, and Stripe payment gateways.",
        "category": "Full Stack",
        "tags": ["React", "GraphQL", "Stripe", "Tailwind CSS"],
        "image": "luminary",
        "demoUrl": "#",
        "codeUrl": "https://github.com"
      },
      {
        "title": "Vortex Audio Visualizer",
        "description": "An interactive, browser-based synthesizer with custom HTML5 canvas-rendered real-time audio visualization maps reacting to custom beats.",
        "category": "Creative Code",
        "tags": ["JavaScript", "Web Audio API", "HTML5 Canvas"],
        "image": "vortex",
        "demoUrl": "#",
        "codeUrl": "https://github.com"
      },
      {
        "title": "Zenith Productivity Orchestrator",
        "description": "A sleek, minimalist productivity application with real-time background database synchronization, drag-and-drop workflow, and offline PWA support.",
        "category": "Web App",
        "tags": ["JavaScript", "Tailwind CSS", "IndexedDB", "PWA"],
        "image": "zenith",
        "demoUrl": "#",
        "codeUrl": "https://github.com"
      }
    ],
    "experience": [
      {
        "role": "Senior Full-Stack Engineer",
        "company": "TechNova Solutions",
        "period": "2024 - Present",
        "description": "Spearheaded the redesign of the core analytics platform, migrating legacy systems to Next.js. Guided a team of 4 developers, achieving a 45% increase in site responsiveness and reducing load times by 1.2s.",
        "tags": ["Next.js", "GraphQL", "Node.js", "AWS"]
      },
      {
        "role": "Front-End Developer",
        "company": "PixelForge Agency",
        "period": "2022 - 2024",
        "description": "Created bespoke, high-converting interactive marketing campaigns and user portals for startup clients. Collaborated closely with UI/UX designers to implement pixel-perfect micro-interactions.",
        "tags": ["React", "Sass", "Figma", "GSAP"]
      },
      {
        "role": "UI/UX & Web Developer",
        "company": "Freelance",
        "period": "2020 - 2022",
        "description": "Delivered end-to-end design and coding services directly to startup clients worldwide. Specialized in launching responsive Shopify sites, WordPress blogs, and custom JavaScript landing pages.",
        "tags": ["Figma", "JavaScript", "HTML/CSS", "UI/UX"]
      }
    ],
    "education": [
      {
        "degree": "B.S. in Computer Science",
        "school": "Metro State University",
        "period": "2016 - 2020",
        "description": "Specialized in Software Engineering and Human-Computer Interaction. Graduated with Honors."
      }
    ]
  };

  const loadPortfolioData = async () => {
    try {
      const response = await fetch('./portfolio-data.json');
      if (!response.ok) throw new Error('Network response was not ok');
      portfolioData = await response.json();
    } catch (error) {
      console.warn('Fetch failed or blocked by CORS. Using local fallback data.', error);
      portfolioData = fallbackData;
    }

    renderPersonalDetails(portfolioData.personal);
    renderStats(portfolioData.stats);
    renderAbout(portfolioData.about);
    renderSkills(portfolioData.skills);
    renderProjects(portfolioData.projects);
    renderExperience(portfolioData.experience);
    renderEducation(portfolioData.education);

    // Initialize systems dependent on loaded elements
    initScrollAnimations();
  };

  // --- SVG ILLUSTRATION PLACEHOLDERS FOR PROJECTS ---
  const getProjectSvg = (imageName, title) => {
    const gradients = {
      aether: `
        <defs>
          <linearGradient id="grad-aether" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#6366f1" />
            <stop offset="100%" stop-color="#06b6d4" />
          </linearGradient>
        </defs>
      `,
      luminary: `
        <defs>
          <linearGradient id="grad-luminary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#a855f7" />
            <stop offset="100%" stop-color="#ec4899" />
          </linearGradient>
        </defs>
      `,
      vortex: `
        <defs>
          <linearGradient id="grad-vortex" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ec4899" />
            <stop offset="100%" stop-color="#f59e0b" />
          </linearGradient>
        </defs>
      `,
      zenith: `
        <defs>
          <linearGradient id="grad-zenith" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#10b981" />
            <stop offset="100%" stop-color="#6366f1" />
          </linearGradient>
        </defs>
      `
    };

    const designs = {
      aether: `
        ${gradients.aether}
        <rect width="100%" height="100%" fill="url(#grad-aether)" opacity="0.15" />
        <path d="M 30,180 Q 70,80 110,140 T 190,70 T 270,120 T 350,50" fill="none" stroke="url(#grad-aether)" stroke-width="4" stroke-linecap="round" />
        <circle cx="110" cy="140" r="6" fill="#06b6d4" />
        <circle cx="190" cy="70" r="6" fill="#6366f1" />
        <circle cx="350" cy="50" r="6" fill="#06b6d4" />
        <rect x="40" y="200" width="40" height="20" rx="3" fill="#6366f1" opacity="0.3" />
        <rect x="100" y="200" width="60" height="20" rx="3" fill="#6366f1" opacity="0.3" />
        <rect x="180" y="200" width="50" height="20" rx="3" fill="#6366f1" opacity="0.3" />
        <rect x="250" y="200" width="70" height="20" rx="3" fill="#6366f1" opacity="0.3" />
      `,
      luminary: `
        ${gradients.luminary}
        <rect width="100%" height="100%" fill="url(#grad-luminary)" opacity="0.15" />
        <g transform="translate(140, 60)" stroke="url(#grad-luminary)" stroke-width="3" fill="none">
          <rect x="10" y="10" width="80" height="80" rx="10" />
          <path d="M 10,40 L 90,40 M 10,70 L 90,70" />
          <circle cx="50" cy="50" r="15" />
          <path d="M 50,15 L 50,85 M 15,50 L 85,50" opacity="0.3" />
        </g>
        <circle cx="60" cy="180" r="30" fill="url(#grad-luminary)" opacity="0.4" />
        <circle cx="300" cy="100" r="20" fill="url(#grad-luminary)" opacity="0.4" />
      `,
      vortex: `
        ${gradients.vortex}
        <rect width="100%" height="100%" fill="url(#grad-vortex)" opacity="0.15" />
        <path d="M 50,120 C 80,40 120,200 150,120 C 180,40 220,200 250,120 C 280,40 320,200 350,120" fill="none" stroke="url(#grad-vortex)" stroke-width="4" stroke-linecap="round" />
        <path d="M 50,120 C 80,80 120,160 150,120 C 180,80 220,160 250,120 C 280,80 320,160 350,120" fill="none" stroke="url(#grad-vortex)" stroke-width="1.5" stroke-dasharray="5,5" opacity="0.6" />
        <circle cx="200" cy="120" r="50" fill="none" stroke="url(#grad-vortex)" stroke-width="2" opacity="0.2" />
        <circle cx="200" cy="120" r="70" fill="none" stroke="url(#grad-vortex)" stroke-width="1" stroke-dasharray="10,5" opacity="0.1" />
      `,
      zenith: `
        ${gradients.zenith}
        <rect width="100%" height="100%" fill="url(#grad-zenith)" opacity="0.15" />
        <rect x="80" y="60" width="240" height="120" rx="8" fill="none" stroke="url(#grad-zenith)" stroke-width="3" />
        <line x1="80" y1="100" x2="320" y2="100" stroke="url(#grad-zenith)" stroke-width="2" />
        <circle cx="110" cy="80" r="6" fill="#10b981" />
        <circle cx="130" cy="80" r="6" fill="#6366f1" />
        <g transform="translate(110, 120)" stroke="#10b981" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M 0,5 L 5,10 L 15,0" />
          <line x1="25" y1="5" x2="150" y2="5" stroke="var(--text-secondary)" stroke-width="2" opacity="0.7" />
        </g>
        <g transform="translate(110, 150)" stroke="#6366f1" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M 0,5 L 5,10 L 15,0" opacity="0.5" />
          <line x1="25" y1="5" x2="120" y2="5" stroke="var(--text-secondary)" stroke-width="2" opacity="0.7" />
        </g>
      `
    };

    const design = designs[imageName] || `
      <rect width="100%" height="100%" fill="var(--scrollbar-thumb)" opacity="0.2"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="var(--text-secondary)" font-size="16" font-family="var(--font-heading)">${title}</text>
    `;

    return `<svg width="100%" height="100%" viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">${design}</svg>`;
  };

  // --- RENDERING HELPERS ---
  const renderPersonalDetails = (personal) => {
    // Set Document Title
    document.title = `${personal.name} | ${personal.title}`;

    // Set Logo
    document.getElementById('nav-logo-text').textContent = personal.name;

    // Set Hero details
    document.getElementById('hero-name').textContent = personal.name;
    document.getElementById('hero-tagline').textContent = personal.tagline;

    // Setup typing animation for subtitle
    const roles = [personal.title, personal.subtitle, "Problem Solver"];
    initTypingAnimation(document.getElementById('hero-typewrite'), roles);

    // Resume download link
    const resumeBtn = document.getElementById('resume-btn');
    if (resumeBtn) resumeBtn.setAttribute('href', personal.resumeUrl);

    // Contact Info details
    document.getElementById('contact-email-link').setAttribute('href', personal.socials.email);
    document.getElementById('contact-email-text').textContent = personal.email;
    document.getElementById('contact-location').textContent = personal.location;

    // Social Links
    const renderSocials = (socialSelector) => {
      const container = document.querySelector(socialSelector);
      if (!container) return;
      container.innerHTML = `
        <a href="${personal.socials.github}" target="_blank" class="social-icon" aria-label="GitHub"><i class="fab fa-github"></i></a>
        <a href="${personal.socials.linkedin}" target="_blank" class="social-icon" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
        <a href="${personal.socials.twitter}" target="_blank" class="social-icon" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
        <a href="${personal.socials.email}" class="social-icon" aria-label="Email"><i class="far fa-envelope"></i></a>
      `;
    };
    renderSocials('#about-socials');
    renderSocials('#contact-socials');
  };

  const renderStats = (stats) => {
    if (!statsContainer) return;
    statsContainer.innerHTML = stats.map(stat => `
      <div class="stat-card glass-panel">
        <div class="stat-number" data-target="${stat.value.replace(/[^0-9]/g, '')}" data-suffix="${stat.value.replace(/[0-9]/g, '')}">0</div>
        <div class="stat-label">${stat.label}</div>
      </div>
    `).join('');
  };

  const renderAbout = (about) => {
    const aboutParagraphsContainer = document.getElementById('about-paragraphs');
    if (!aboutParagraphsContainer) return;
    aboutParagraphsContainer.innerHTML = about.bioParagraphs.map(p => `<p>${p}</p>`).join('');
  };

  const renderSkills = (skills) => {
    if (!skillsContainer) return;
    skillsContainer.innerHTML = skills.map(cat => `
      <div class="skills-category">
        <h3 class="skills-category-title">
          <span class="logo-dot"></span>
          ${cat.category}
        </h3>
        <div class="skill-list">
          ${cat.items.map(skill => `
            <div class="skill-item">
              <div class="skill-info">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-pct">${skill.level}%</span>
              </div>
              <div class="skill-bar">
                <div class="skill-progress" data-level="${skill.level}"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  };

  const renderProjects = (projects) => {
    if (!projectsGrid) return;

    // Draw projects
    projectsGrid.innerHTML = projects.map(proj => `
      <div class="project-card glass-panel" data-category="${proj.category}">
        <div class="project-image-wrapper">
          <div class="project-image-placeholder">
            ${getProjectSvg(proj.image, proj.title)}
          </div>
          <div class="project-image-overlay">
            <a href="${proj.codeUrl}" target="_blank" class="project-link-icon" title="View Source Code"><i class="fab fa-github"></i></a>
            <a href="${proj.demoUrl}" target="_blank" class="project-link-icon" title="Live Preview"><i class="fas fa-external-link-alt"></i></a>
          </div>
        </div>
        <div class="project-info">
          <h3 class="project-title">${proj.title}</h3>
          <p class="project-description">${proj.description}</p>
          <div class="project-tags">
            ${proj.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('');

    // Setup filtering tabs
    const categories = ['All', ...new Set(projects.map(p => p.category))];
    if (filterContainer) {
      filterContainer.innerHTML = categories.map((cat, index) => `
        <button class="filter-btn ${index === 0 ? 'active' : ''}" data-filter="${cat}">${cat}</button>
      `).join('');

      // Bind filter events
      document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelector('.filter-btn.active').classList.remove('active');
          btn.classList.add('active');
          filterProjects(btn.getAttribute('data-filter'));
        });
      });
    }
  };

  const filterProjects = (category) => {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
      const cardCat = card.getAttribute('data-category');
      if (category === 'All' || cardCat === category) {
        card.style.display = 'flex';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 50);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  };

  const renderExperience = (experience) => {
    if (!experienceTimeline) return;
    experienceTimeline.innerHTML = experience.map(exp => `
      <div class="timeline-item">
        <div class="timeline-marker">
          <div class="timeline-marker-dot"></div>
        </div>
        <div class="timeline-card glass-panel">
          <div class="timeline-header">
            <div>
              <h3 class="timeline-role">${exp.role}</h3>
              <span class="timeline-company">${exp.company}</span>
            </div>
            <span class="timeline-period">${exp.period}</span>
          </div>
          <p class="timeline-desc">${exp.description}</p>
          <div class="timeline-tags">
            ${exp.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('');
  };

  const renderEducation = (education) => {
    if (!educationTimeline) return;
    educationTimeline.innerHTML = education.map(edu => `
      <div class="timeline-item">
        <div class="timeline-marker">
          <div class="timeline-marker-dot"></div>
        </div>
        <div class="timeline-card glass-panel">
          <div class="timeline-header">
            <div>
              <h3 class="timeline-role">${edu.degree}</h3>
              <span class="timeline-company">${edu.school}</span>
            </div>
            <span class="timeline-period">${edu.period}</span>
          </div>
          <p class="timeline-desc">${edu.description}</p>
        </div>
      </div>
    `).join('');
  };

  // --- TYPING ANIMATION ---
  const initTypingAnimation = (element, words) => {
    if (!element) return;
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 150;

    const type = () => {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        element.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 75;
      } else {
        element.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 150;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typingDelay = 2000; // Pause at end of word
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingDelay = 500; // Pause before typing next word
      }

      setTimeout(type, typingDelay);
    };

    type();
  };

  // --- ANIMATIONS & INTERSECTION OBSERVER ---
  const initScrollAnimations = () => {
    // Skill progress bars animation
    const animateSkills = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bars = entry.target.querySelectorAll('.skill-progress');
          bars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            bar.style.width = `${level}%`;
          });
          observer.unobserve(entry.target);
        }
      });
    };

    const skillsObserver = new IntersectionObserver(animateSkills, {
      threshold: 0.1
    });

    if (skillsContainer) {
      skillsObserver.observe(skillsContainer);
    }

    // Numbers count-up animation
    const countUp = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const numbers = entry.target.querySelectorAll('.stat-number');
          numbers.forEach(num => {
            const target = parseInt(num.getAttribute('data-target'));
            const suffix = num.getAttribute('data-suffix') || '';
            let current = 0;
            const duration = 2000; // ms
            const steps = 50;
            const increment = target / steps;
            const stepTime = duration / steps;

            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                num.textContent = target + suffix;
                clearInterval(timer);
              } else {
                num.textContent = Math.floor(current) + suffix;
              }
            }, stepTime);
          });
          observer.unobserve(entry.target);
        }
      });
    };

    const statsObserver = new IntersectionObserver(countUp, {
      threshold: 0.1
    });

    if (statsContainer) {
      statsObserver.observe(statsContainer);
    }
  };

  // --- CONTACT FORM SUBMISSION ---
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Simple client side loading animation simulation
      btnText.style.display = 'none';
      btnSpinner.style.display = 'inline-block';
      contactForm.style.opacity = '0.7';

      // Simulate API call
      setTimeout(() => {
        contactForm.reset();
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
        formSuccess.style.opacity = '0';
        setTimeout(() => {
          formSuccess.style.opacity = '1';
          formSuccess.style.transition = 'opacity 0.5s ease';
        }, 50);
      }, 1500);
    });
  }

  // Run initialization
  initTheme();
  loadPortfolioData();
});

// --- CUSTOM INTERACTIVE PARTICLES SYSTEM (CANVAS ENGINE) ---
class ParticleSystem {
  constructor() {
    this.canvas = document.getElementById('particles-js');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 120 };

    this.themeColors = {
      dark: { particle: 'rgba(99, 102, 241, 0.45)', line: 'rgba(99, 102, 241, 0.08)' },
      light: { particle: 'rgba(79, 70, 229, 0.3)', line: 'rgba(79, 70, 229, 0.05)' }
    };

    this.activeTheme = document.documentElement.getAttribute('data-theme') || 'dark';

    this.init();
    this.animate();

    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.x;
      this.mouse.y = e.y;
    });
    window.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  init() {
    this.resize();
    this.particles = [];

    // Density logic
    const numberOfParticles = Math.floor((this.canvas.width * this.canvas.height) / 11000);
    for (let i = 0; i < Math.min(numberOfParticles, 120); i++) {
      const size = Math.random() * 2 + 1;
      const x = Math.random() * (this.canvas.width - size * 2) + size;
      const y = Math.random() * (this.canvas.height - size * 2) + size;
      const directionX = (Math.random() * 0.4) - 0.2;
      const directionY = (Math.random() * 0.4) - 0.2;

      this.particles.push({
        x, y, directionX, directionY, size
      });
    }
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  updateColors(theme) {
    this.activeTheme = theme;
  }

  draw() {
    const colors = this.themeColors[this.activeTheme] || this.themeColors.dark;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw Particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2, false);
      this.ctx.fillStyle = colors.particle;
      this.ctx.fill();
    }

    // Draw Connection Lines
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const p1 = this.particles[i];
        const p2 = this.particles[j];

        const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

        if (dist < 100) {
          const opacity = (1 - (dist / 100)) * 0.8;
          this.ctx.strokeStyle = colors.line.replace('0.08', (0.08 * opacity).toString()).replace('0.05', (0.05 * opacity).toString());
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }
    }
  }

  animate() {
    this.draw();

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Normal movement
      p.x += p.directionX;
      p.y += p.directionY;

      // Screen edge bounce
      if (p.x < 0 || p.x > this.canvas.width) p.directionX = -p.directionX;
      if (p.y < 0 || p.y > this.canvas.height) p.directionY = -p.directionY;

      // Mouse interaction (push particles away gently)
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < this.mouse.radius) {
          const force = (this.mouse.radius - dist) / this.mouse.radius;
          const angle = Math.atan2(dy, dx);

          p.x += Math.cos(angle) * force * 1.5;
          p.y += Math.sin(angle) * force * 1.5;
        }
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

// Instantiate particles
window.addEventListener('DOMContentLoaded', () => {
  window.particleSystem = new ParticleSystem();
});
const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  formData.append("access_key", "818c9b8a-25ab-4b33-979a-2195e3e2baba");

  const originalText = submitBtn.textContent;

  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (response.ok) {
      alert("Success! Your message has been sent.");
      form.reset();
    } else {
      alert("Error: " + data.message);
    }

  } catch (error) {
    alert("Something went wrong. Please try again.");
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
});
document.querySelectorAll('.field input, .field textarea').forEach(el => {
  const field = el.closest('.field');
  el.addEventListener('focus', () => field.classList.add('focused'));
  el.addEventListener('blur', () => field.classList.remove('focused'));
});

const form = document.getElementById('contactForm');
const status = document.getElementById('status');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // TODO: Hook this up to your backend or a form service
  // (e.g. Formspree, EmailJS, Netlify Forms, or your own API route).
  // Example with fetch:
  // fetch('/api/contact', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(Object.fromEntries(new FormData(form)))
  // });

  status.textContent = "Thanks — your message is on its way.";
  status.classList.add('sent');
  form.reset();
});
const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append("access_key", "818c9b8a-25ab-4b33-979a-2195e3e2baba");

    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("Success! Your message has been sent.");
            form.reset();
        } else {
            alert("Error: " + data.message);
        }

    } catch (error) {
        alert("Something went wrong. Please try again.");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});