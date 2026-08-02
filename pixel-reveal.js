/**
 * Swiss Pixel Reveal Animation System
 * High-contrast, interactive pixel matrix grid disassembly
 */

(function () {
  'use strict';

  const SwissPixelReveal = {
    config: {
      cellSize: 42, // Block size in px
      staggerDelay: 22, // Delay step between diagonal cells in ms
      animationDuration: 450, // Duration of cell dissolve in ms
    },

    /**
     * Initialize Fullscreen Swiss Pixel Screen Wipe
     */
    initScreenWipe: function () {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const introContainer = document.getElementById('introScreen') || document.getElementById('swissPixelIntro');
      
      if (!introContainer) return;

      if (prefersReduced) {
        introContainer.style.display = 'none';
        document.body.classList.remove('intro-active');
        return;
      }

      // Ensure intro container structure
      introContainer.classList.add('swiss-pixel-intro');

      // Create or reuse grid overlay
      let gridOverlay = introContainer.querySelector('.swiss-pixel-grid-overlay');
      if (!gridOverlay) {
        gridOverlay = document.createElement('div');
        gridOverlay.className = 'swiss-pixel-grid-overlay';
        introContainer.appendChild(gridOverlay);
      }

      // Calculate grid dimensions dynamically
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const cols = Math.ceil(viewportWidth / this.config.cellSize);
      const rows = Math.ceil(viewportHeight / this.config.cellSize);

      gridOverlay.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
      gridOverlay.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
      gridOverlay.innerHTML = '';

      const fragment = document.createDocumentFragment();
      const cells = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cell = document.createElement('div');
          cell.className = 'swiss-pixel-cell';
          
          // Randomize cell tone for a rich Swiss pixel mosaic effect
          const rand = Math.random();
          if (rand > 0.93) {
            cell.classList.add('swiss-accent-violet');
          } else if (rand > 0.86) {
            cell.classList.add('swiss-accent-amber');
          } else if (rand > 0.55) {
            cell.classList.add('swiss-cell-alt');
          }

          // Staggered diagonal math delay with tiny organic jitter
          const delay = (r + c) * this.config.staggerDelay + (Math.random() * 20);

          cell.style.transitionDelay = `${delay}ms`;
          fragment.appendChild(cell);
          cells.push({ el: cell, delay: delay });
        }
      }

      gridOverlay.appendChild(fragment);

      const introText = introContainer.querySelector('.intro-content');
      if (introText) {
        introText.classList.add('swiss-text-active');
      }

      // Hold intro text briefly, then trigger pixel dissolve
      const holdTime = 900;

      setTimeout(() => {
        if (introText) {
          introText.classList.add('swiss-text-fadeout');
        }

        // Dissolve pixel cells row-by-row / diagonally
        cells.forEach(item => {
          item.el.classList.add('dissolve');
        });

        const maxDelay = Math.max(...cells.map(c => c.delay));
        const totalWipeTime = maxDelay + this.config.animationDuration + 100;

        setTimeout(() => {
          introContainer.classList.add('swiss-intro-complete');
          document.body.classList.remove('intro-active');
          setTimeout(() => {
            introContainer.style.display = 'none';
          }, 450);
        }, totalWipeTime);
      }, holdTime);
    },

    /**
     * Re-trigger Full Screen Wipe (e.g. via Replay button)
     */
    replay: function () {
      let introContainer = document.getElementById('introScreen');
      if (!introContainer) return;

      introContainer.style.display = 'flex';
      introContainer.classList.remove('swiss-intro-complete', 'intro-hide');
      document.body.classList.add('intro-active');

      const introText = introContainer.querySelector('.intro-content');
      if (introText) {
        introText.classList.remove('swiss-text-fadeout');
      }

      this.initScreenWipe();
    },

    /**
     * Initialize Scroll-triggered Element Pixel Reveals
     */
    initElementReveals: function () {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      const targetElements = document.querySelectorAll('[data-pixel-reveal]');
      if (!targetElements.length) return;

      const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      };

      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.revealElement(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, observerOptions);

      targetElements.forEach(el => observer.observe(el));
    },

    /**
     * Reveal an element with a distinct pixel grid wipe
     */
    revealElement: function (element) {
      const rect = element.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const cellSize = parseInt(element.getAttribute('data-pixel-size')) || 32;
      const cols = Math.max(3, Math.ceil(rect.width / cellSize));
      const rows = Math.max(3, Math.ceil(rect.height / cellSize));

      element.style.position = 'relative';

      const overlay = document.createElement('div');
      overlay.className = 'swiss-element-pixel-overlay';
      overlay.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
      overlay.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

      const fragment = document.createDocumentFragment();
      const cells = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cell = document.createElement('div');
          cell.className = 'swiss-element-pixel-cell';
          if (Math.random() > 0.85) cell.classList.add('swiss-accent-violet');
          else if (Math.random() > 0.7) cell.classList.add('swiss-cell-alt');

          const delay = (r + c) * 24 + (Math.random() * 25);
          cell.style.transitionDelay = `${delay}ms`;
          fragment.appendChild(cell);
          cells.push({ el: cell, delay: delay });
        }
      }

      overlay.appendChild(fragment);
      element.appendChild(overlay);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          cells.forEach(item => item.el.classList.add('dissolve'));
          element.classList.add('pixel-revealed');
          const maxDelay = Math.max(...cells.map(c => c.delay));
          setTimeout(() => {
            overlay.remove();
          }, maxDelay + 450);
        });
      });
    }
  };

  window.SwissPixelReveal = SwissPixelReveal;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      SwissPixelReveal.initScreenWipe();
      SwissPixelReveal.initElementReveals();
    });
  } else {
    SwissPixelReveal.initScreenWipe();
    SwissPixelReveal.initElementReveals();
  }
})();
