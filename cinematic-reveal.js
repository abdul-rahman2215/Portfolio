/**
 * Cinematic OS Entrance Animation System, Custom Floating Cursor & Elegant Balanced Stardust Canvas
 * Minimal, Premium, Hardware-Accelerated (GSAP + Canvas)
 */

(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initCinematicEntrance() {
    const overlay = document.getElementById('cinematicEntranceOverlay');
    const heroSection = document.querySelector('.hero');
    const heroBadge = document.querySelector('.eyebrow');
    const heroTitle = document.querySelector('h1.name');
    const heroPitch = document.querySelector('.pitch');
    const heroCtas = document.querySelector('.hero-ctas');
    const heroHub = document.querySelector('.hub-row');
    const heroPhoto = document.querySelector('.hero-photo');

    // Ensure ambient glow backdrop element behind hero
    let ambientGlow = document.querySelector('.hero-ambient-glow');
    if (!ambientGlow && heroSection) {
      ambientGlow = document.createElement('div');
      ambientGlow.className = 'hero-ambient-glow';
      heroSection.prepend(ambientGlow);
    }

    if (prefersReduced) {
      document.body.classList.remove('intro-active');
      if (overlay) overlay.style.display = 'none';
      if (heroSection) heroSection.style.filter = 'none';
      initScrollReveals();
      initFloatingCursor();
      initMilkyWayStardust();
      return;
    }

    // Generate elegant translucent square masks
    const cellSize = 64;
    const cols = Math.ceil(window.innerWidth / cellSize);
    const rows = Math.ceil(window.innerHeight / cellSize);

    let gridContainer = overlay ? overlay.querySelector('.cinematic-grid-container') : null;
    if (!gridContainer && overlay) {
      gridContainer = document.createElement('div');
      gridContainer.className = 'cinematic-grid-container';
      overlay.appendChild(gridContainer);
    }

    if (gridContainer) {
      gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
      gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
      gridContainer.innerHTML = '';

      const fragment = document.createDocumentFragment();
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cell = document.createElement('div');
          cell.className = 'cinematic-grid-cell';
          fragment.appendChild(cell);
        }
      }
      gridContainer.appendChild(fragment);
    }

    // Initial GPU hardware states
    gsap.set('body', { opacity: 1 });
    gsap.set('main', { opacity: 0, scale: 1.015 });
    gsap.set(heroBadge, { opacity: 0, y: 18 });
    gsap.set(heroTitle, { opacity: 0, y: 25 });
    gsap.set(heroPitch, { opacity: 0, y: 18 });
    gsap.set(heroCtas, { opacity: 0, y: 18 });
    gsap.set(heroHub, { opacity: 0, y: 18 });
    gsap.set(heroPhoto, { opacity: 0, scale: 0.95, rotate: 0.5 });
    if (ambientGlow) gsap.set(ambientGlow, { opacity: 0 });
    
    // Lens blur initial state (12px)
    if (heroSection) {
      gsap.set(heroSection, { filter: 'blur(12px)' });
    }

    // Slow atmospheric blur resolution (1.5 SECONDS)
    if (heroSection) {
      gsap.to(heroSection, {
        filter: 'blur(0px)',
        duration: 1.5,
        ease: 'power1.out',
        onComplete: () => {
          heroSection.style.filter = 'none';
        }
      });
    }

    // Master Entrance Timeline
    const tl = gsap.timeline({
      onComplete: () => {
        if (overlay) overlay.style.display = 'none';
        document.body.classList.remove('intro-active');
        initScrollReveals();
      }
    });

    // 1. Background entrance (0.55s)
    tl.to('main', {
      opacity: 1,
      scale: 1,
      duration: 0.55,
      ease: 'power2.out'
    });

    // 2. Soft radial glow (0.45s)
    if (ambientGlow) {
      tl.to(ambientGlow, {
        opacity: 0.85,
        duration: 0.45,
        ease: 'power2.out'
      }, '-=0.35');
    }

    // 3. Center-out square mask grid reveal (amount: 0.45s, duration: 0.5s)
    if (gridContainer) {
      const cells = gridContainer.querySelectorAll('.cinematic-grid-cell');
      tl.to(cells, {
        opacity: 0,
        scale: 0.75,
        duration: 0.5,
        ease: 'power2.inOut',
        stagger: {
          grid: [rows, cols],
          from: 'center',
          amount: 0.45
        }
      }, '-=0.35');
    }

    // 4. Smooth Staggered Hero Sequence
    tl.to(heroBadge, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '-=0.35');
    tl.to(heroTitle, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, '-=0.3');
    tl.to(heroPitch, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '-=0.35');
    tl.to(heroCtas, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '-=0.3');
    tl.to(heroHub, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '-=0.3');
    tl.to(heroPhoto, { opacity: 1, scale: 1, rotate: 0, duration: 0.6, ease: 'power2.out' }, '-=0.5');

    // 5. Ambient lighting settles naturally
    if (ambientGlow) {
      tl.to(ambientGlow, { opacity: 0.35, duration: 0.7, ease: 'power1.inOut' }, '-=0.25');
    }
  }

  // Section Viewport Scroll Reveals
  function initScrollReveals() {
    const sections = document.querySelectorAll('main > section:not(.hero)');

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sec = entry.target;
          gsap.to(sec, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' });

          const cards = sec.querySelectorAll('.stat-card, .t-item, .card, .project-card, .toolkit-card');
          if (cards.length > 0) {
            gsap.to(cards, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.05 });
          }

          obs.unobserve(sec);
        }
      });
    }, { threshold: 0.12 });

    sections.forEach(sec => {
      gsap.set(sec, { opacity: 0, y: 35 });
      const cards = sec.querySelectorAll('.stat-card, .t-item, .card, .project-card, .toolkit-card');
      if (cards.length > 0) {
        gsap.set(cards, { opacity: 0, y: 25 });
      }
      observer.observe(sec);
    });
  }

  /**
   * Floating Concentric Custom Cursor
   */
  function initFloatingCursor() {
    if (window.matchMedia('(hover: none) or (pointer: coarse)').matches) return;

    let dot = document.getElementById('customCursorDot');
    let ring = document.getElementById('customCursorRing');

    if (!dot) {
      dot = document.createElement('div');
      dot.id = 'customCursorDot';
      dot.className = 'custom-cursor-dot';
      dot.style.cssText = 'position:fixed;top:0;left:0;width:8px;height:8px;margin-top:-4px;margin-left:-4px;border-radius:50%;background:#7c3aed;pointer-events:none;z-index:10000;will-change:transform;';
      document.body.appendChild(dot);
    }

    if (!ring) {
      ring = document.createElement('div');
      ring.id = 'customCursorRing';
      ring.className = 'custom-cursor-ring';
      ring.style.cssText = 'position:fixed;top:0;left:0;width:36px;height:36px;margin-top:-18px;margin-left:-18px;border-radius:50%;border:1.5px solid rgba(124,58,237,0.85);pointer-events:none;z-index:9999;will-change:transform;';
      document.body.appendChild(ring);
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

      if (dot.classList.contains('custom-cursor-hidden')) {
        dot.classList.remove('custom-cursor-hidden');
        ring.classList.remove('custom-cursor-hidden');
      }
    });

    document.addEventListener('mouseleave', () => {
      dot.classList.add('custom-cursor-hidden');
      ring.classList.add('custom-cursor-hidden');
    });

    document.addEventListener('mouseenter', () => {
      dot.classList.remove('custom-cursor-hidden');
      ring.classList.remove('custom-cursor-hidden');
    });

    document.addEventListener('mousedown', () => {
      ring.classList.add('cursor-active');
    });

    document.addEventListener('mouseup', () => {
      ring.classList.remove('cursor-active');
    });

    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest('a, button, input, select, textarea, .btn, .card, .stat-card, .t-item, .hub-pill, .photo-frame, [role="button"]');
      if (target) {
        ring.classList.add('cursor-hover');
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target.closest('a, button, input, select, textarea, .btn, .card, .stat-card, .t-item, .hub-pill, .photo-frame, [role="button"]');
      if (target) {
        ring.classList.remove('cursor-hover');
      }
    });

    function loop() {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  /**
   * Balanced Milky Way Stardust & Cosmic Nebula Background System
   */
  function initMilkyWayStardust() {
    let canvas = document.getElementById('subtleParticleCanvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'subtleParticleCanvas';
      canvas.className = 'subtle-particle-canvas';
      canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:0;pointer-events:none;opacity:0.85;';
      document.body.prepend(canvas);
    }

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    let mouseX = width / 2;
    let mouseY = height / 2;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // 1. Swirling Cosmic Nebulae (Softened background light pools)
    const nebulae = [
      { x: width * 0.25, y: height * 0.3, radius: 520, angle: 0, speed: 0.003 },
      { x: width * 0.78, y: height * 0.6, radius: 560, angle: Math.PI / 2, speed: 0.002 },
      { x: width * 0.50, y: height * 0.85, radius: 440, angle: Math.PI, speed: 0.004 }
    ];

    // 2. High Density Stardust Particles (Rich cosmic star field)
    const particleCount = Math.min(420, Math.floor((width * height) / 4200));
    const stardust = [];

    const colors = [
      '28, 158, 147',   // Turquoise / Cyan Glow
      '124, 58, 237',  // Electric Violet Glow
      '215, 205, 163',  // Cosmic Gold Glow
      '255, 255, 255'   // Starlight White
    ];

    for (let i = 0; i < particleCount; i++) {
      const depth = Math.random();
      const angle = Math.random() * Math.PI * 2;
      const speed = (0.15 + depth * 0.45);
      const rad = depth > 0.75 ? (Math.random() * 1.5 + 1.0) : (Math.random() * 0.9 + 0.5);

      stardust.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: rad,
        glowRadius: rad * 2.2,
        baseAlpha: depth > 0.75 ? (Math.random() * 0.30 + 0.20) : (Math.random() * 0.16 + 0.06),
        alpha: 0,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        color: colors[Math.floor(Math.random() * colors.length)],
        depth: depth
      });
    }

    let time = 0;

    function render() {
      ctx.clearRect(0, 0, width, height);
      time += 0.007;

      const isLight = document.documentElement.getAttribute('data-theme') === 'light';

      // 1. Render Soft Swirling Nebulae
      nebulae.forEach((neb, idx) => {
        neb.angle += neb.speed;
        const nx = neb.x + Math.sin(neb.angle) * 60;
        const ny = neb.y + Math.cos(neb.angle * 0.8) * 45;

        const grad = ctx.createRadialGradient(nx, ny, 0, nx, ny, neb.radius);
        if (idx === 0) {
          grad.addColorStop(0, isLight ? 'rgba(18, 117, 108, 0.10)' : 'rgba(28, 158, 147, 0.14)');
          grad.addColorStop(0.5, isLight ? 'rgba(18, 117, 108, 0.03)' : 'rgba(28, 158, 147, 0.05)');
        } else if (idx === 1) {
          grad.addColorStop(0, isLight ? 'rgba(124, 58, 237, 0.08)' : 'rgba(124, 58, 237, 0.11)');
          grad.addColorStop(0.5, isLight ? 'rgba(124, 58, 237, 0.02)' : 'rgba(124, 58, 237, 0.04)');
        } else {
          grad.addColorStop(0, isLight ? 'rgba(183, 168, 119, 0.09)' : 'rgba(215, 205, 163, 0.09)');
          grad.addColorStop(0.5, isLight ? 'rgba(183, 168, 119, 0.02)' : 'rgba(215, 205, 163, 0.03)');
        }
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(nx, ny, neb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Render Refined Sparkling Stardust
      for (let i = 0; i < stardust.length; i++) {
        const p = stardust[i];

        p.x += p.vx + Math.sin(time + i) * 0.12;
        p.y += p.vy + Math.cos(time * 0.7 + i) * 0.12;

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        const mdx = mouseX - p.x;
        const mdy = mouseY - p.y;
        const dist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (dist < 160) {
          const force = (1 - dist / 160) * 0.35;
          p.x += mdx * force * 0.03;
          p.y += mdy * force * 0.03;
        }

        p.twinklePhase += p.twinkleSpeed;
        const twinkle = Math.sin(p.twinklePhase) * 0.3 + 0.7;
        p.alpha = p.baseAlpha * twinkle;

        ctx.save();

        // Layer A: Soft subtle outer glow
        const glowGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.glowRadius);
        glowGrad.addColorStop(0, `rgba(${p.color}, ${p.alpha * 0.35})`);
        glowGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Layer B: Refined Core Star Node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;

        if (p.depth > 0.75) {
          ctx.shadowBlur = 6;
          ctx.shadowColor = `rgba(${p.color}, 0.6)`;
        }
        ctx.fill();

        ctx.restore();

        // Layer C: Subtle connecting starlight threads
        if (p.depth > 0.65) {
          for (let j = i + 1; j < stardust.length; j += 2) {
            const p2 = stardust[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const d = Math.sqrt(dx * dx + dy * dy);

            if (d < 85) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              const threadAlpha = (1 - d / 85) * 0.1 * p.alpha;
              ctx.strokeStyle = `rgba(${p.color}, ${threadAlpha})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      requestAnimationFrame(render);
    }

    render();
  }

  // Auto-init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initCinematicEntrance();
      initFloatingCursor();
      initMilkyWayStardust();
    });
  } else {
    initCinematicEntrance();
    initFloatingCursor();
    initMilkyWayStardust();
  }
})();
