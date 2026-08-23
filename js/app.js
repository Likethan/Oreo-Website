// ==========================================================================
// OREO CINEMATIC APPLICATION COORDINATOR & SPA ROUTER
// "TWIST. DIP. LOVE." — Precision Scroll Video Frame Scrubbing Engine
// ==========================================================================

import { sound } from './soundEngine.js';
import { ParticleEngine } from './particles.js';
import { CustomCursor } from './cursor.js';

import { renderHome } from './pages/home.js';
import { renderExperience } from './pages/experience.js';
import { renderFlavors } from './pages/flavors.js';
import { renderTwist } from './pages/twist.js';
import { renderRecipes } from './pages/recipes.js';
import { renderAbout } from './pages/about.js';

class App {
  constructor() {
    this.currentPage = null;
    this.isTransitioning = false;
    this.soundEngine = sound;
    this.particles = null;
    this.cursor = null;
    this.scrollObserver = null;

    // Video Scrub State
    this.targetVideoTime = 0;
    this.currentVideoTime = 0;
    this.videoDuration = 5.0; // fallback duration until loaded
    this.scrubAnimationFrame = null;

    this.pages = {
      home: { id: 'page-home', render: renderHome, title: 'OREO — TWIST. DIP. LOVE.' },
      experience: { id: 'page-experience', render: renderExperience, title: 'THE OREO EXPERIENCE' },
      flavors: { id: 'page-flavors', render: renderFlavors, title: 'OREO FLAVORS — FOR EVERY MOOD' },
      twist: { id: 'page-twist', render: renderTwist, title: 'MASTER THE TWIST — INTERACTIVE LAB' },
      recipes: { id: 'page-recipes', render: renderRecipes, title: 'OREO RECIPES — MAKE IT YOURS' },
      about: { id: 'page-about', render: renderAbout, title: 'ABOUT OREO — THE RITUAL HERITAGE' }
    };

    this.init();
  }

  init() {
    // 1. Initialize Visual Engines
    this.particles = new ParticleEngine('particle-canvas');
    this.cursor = new CustomCursor();

    // 2. Setup Global UI Listeners (Nav, Sound, Mobile Menu, Scroll Engine)
    this.setupHeaderScroll();
    this.setupSoundToggle();
    this.setupMobileMenu();
    this.setupScrollEngine();
    this.setupRouting();

    // 3. Initial Route Load
    const initialRoute = window.location.hash.replace('#', '') || 'home';
    this.navigateTo(initialRoute, false);

    // 4. Global Click Sound & In-page Anchor Navigation
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link && link.getAttribute('href')?.startsWith('#')) {
        const href = link.getAttribute('href');
        // If anchor within current page (e.g. #story-section), smooth scroll to it
        if (href.startsWith('#') && href.length > 1 && !this.pages[href.replace('#', '')]) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            sound.playClick();
          }
        } else {
          sound.playClick();
        }
      }
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  setupHeaderScroll() {
    const header = document.getElementById('main-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  setupScrollEngine() {
    const progressBar = document.getElementById('scroll-progress-bar');
    let ticking = false;

    // Start video scrub interpolation loop
    this.startVideoScrubLoop();

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

          // 1. Top Progress Bar
          if (progressBar && maxScroll > 0) {
            const progressPercent = Math.min(100, Math.max(0, (scrollY / maxScroll) * 100));
            progressBar.style.width = `${progressPercent}%`;
          }

          // 2. Video Frame Scrub Controller (Home Page)
          this.updateHomeVideoFrameScrub(scrollY);

          // 3. Parallax Floating Badges & Pillars
          const parallaxElements = document.querySelectorAll('[data-parallax-speed]');
          parallaxElements.forEach((el) => {
            const speed = parseFloat(el.getAttribute('data-parallax-speed') || '0.1');
            el.style.transform = `translate3d(0, ${-scrollY * speed}px, 0)`;
          });

          // 4. Experience Page Vertical Step Fill
          this.updateExperienceScrollProgress(scrollY);

          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // Precision Video Frame Scrub Engine for Pure Video First Page
  updateHomeVideoFrameScrub(scrollY) {
    if (this.currentPage !== 'home') return;

    const scrubTrack = document.getElementById('hero-scrub-container');
    const heroVideo = document.getElementById('hero-commercial-video');
    if (!scrubTrack || !heroVideo) return;

    const trackTop = scrubTrack.offsetTop;
    const trackHeight = scrubTrack.offsetHeight - window.innerHeight;

    if (trackHeight <= 0) return;

    // Calculate normalized progress from 0.0 to 1.0
    const scrollWithinTrack = scrollY - trackTop;
    const scrubProgress = Math.min(1, Math.max(0, scrollWithinTrack / trackHeight));

    // Target video timestamp
    if (heroVideo.duration && !isNaN(heroVideo.duration)) {
      this.videoDuration = heroVideo.duration;
    }
    this.targetVideoTime = scrubProgress * this.videoDuration;

    // Fade scroll prompt as soon as scrolling begins
    const scrollPrompt = document.getElementById('scroll-prompt-indicator');
    if (scrollPrompt) {
      if (scrubProgress > 0.04) {
        scrollPrompt.style.opacity = '0';
      } else {
        scrollPrompt.style.opacity = '1';
      }
    }

    // Bottom progress line
    const progressLine = document.getElementById('video-frame-progress-line');
    if (progressLine) {
      progressLine.style.width = `${scrubProgress * 100}%`;
    }

    // Auto-advance to Next Page (Experience) when animation is finished
    if (scrubProgress >= 0.96 && !this.isTransitioning && !this.hasAutoAdvanced) {
      this.hasAutoAdvanced = true;
      sound.playCrunch();
      this.navigateTo('experience', true);
    }
  }

  // Smooth video playback / seeking interpolation loop
  startVideoScrubLoop() {
    const loop = () => {
      const heroVideo = document.getElementById('hero-commercial-video');
      if (heroVideo && !isNaN(heroVideo.duration)) {
        // Smooth lerp towards target video time
        const diff = this.targetVideoTime - this.currentVideoTime;
        if (Math.abs(diff) > 0.01) {
          this.currentVideoTime += diff * 0.25;
          if (heroVideo.fastSeek) {
            heroVideo.fastSeek(this.currentVideoTime);
          } else {
            heroVideo.currentTime = this.currentVideoTime;
          }
        }
      }
      this.scrubAnimationFrame = requestAnimationFrame(loop);
    };
    loop();
  }

  updateExperienceScrollProgress(scrollY) {
    const expLine = document.getElementById('experience-timeline-fill');
    if (!expLine) return;

    const stages = document.querySelectorAll('.experience-stage-row');
    if (stages.length === 0) return;

    const firstStageTop = stages[0].offsetTop;
    const lastStageTop = stages[stages.length - 1].offsetTop;
    const totalHeight = lastStageTop - firstStageTop;

    if (totalHeight > 0) {
      const currentProgress = (scrollY + window.innerHeight * 0.5 - firstStageTop) / totalHeight;
      const clampedProgress = Math.min(1, Math.max(0, currentProgress));
      expLine.style.height = `${clampedProgress * 100}%`;
    }
  }

  setupIntersectionObserver(container = document) {
    if (this.scrollObserver) {
      this.scrollObserver.disconnect();
    }

    const options = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.12
    };

    this.scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, options);

    const targets = container.querySelectorAll('.reveal-up, .flavor-card, .recipe-card, .quiz-option-btn');
    targets.forEach((el) => this.scrollObserver.observe(el));
  }

  setupSoundToggle() {
    const soundBtn = document.getElementById('sound-toggle-btn');
    if (!soundBtn) return;

    soundBtn.classList.add('active'); // active by default

    soundBtn.addEventListener('click', () => {
      const isEnabled = this.soundEngine.toggle();
      const badge = soundBtn.querySelector('.sound-badge');
      if (isEnabled) {
        soundBtn.classList.add('active');
        if (badge) badge.textContent = 'SFX ON';
      } else {
        soundBtn.classList.remove('active');
        if (badge) badge.textContent = 'SFX OFF';
      }
    });
  }

  setupMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const drawer = document.getElementById('mobile-menu-drawer');
    const mobileLinks = document.querySelectorAll('.mobile-nav-item');

    if (!menuBtn || !drawer) return;

    const toggleMenu = () => {
      const isOpen = drawer.classList.contains('translate-x-0');
      if (isOpen) {
        drawer.classList.remove('translate-x-0');
        drawer.classList.add('translate-x-full');
      } else {
        drawer.classList.remove('translate-x-full');
        drawer.classList.add('translate-x-0');
      }
    };

    menuBtn.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('translate-x-0');
        drawer.classList.add('translate-x-full');
      });
    });
  }

  setupRouting() {
    window.addEventListener('hashchange', () => {
      const rawHash = window.location.hash.replace('#', '') || 'home';
      // If the hash is an internal element on the current page, don't re-route
      if (document.getElementById(rawHash) && !this.pages[rawHash]) {
        return;
      }
      this.navigateTo(rawHash);
    });
  }

  async navigateTo(pageKey, withTransition = true) {
    const pageConfig = this.pages[pageKey] || this.pages.home;
    const cleanKey = this.pages[pageKey] ? pageKey : 'home';

    if (this.currentPage === cleanKey && !withTransition) return;
    if (this.isTransitioning) return;

    this.isTransitioning = true;
    const transitionLayer = document.getElementById('page-transition');

    // Update active nav indicators
    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.getAttribute('data-page') === cleanKey) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    if (withTransition && transitionLayer) {
      transitionLayer.classList.add('active');
      sound.playClick();
      await new Promise(r => setTimeout(r, 400));
    }

    // Hide all pages
    Object.values(this.pages).forEach(p => {
      const el = document.getElementById(p.id);
      if (el) {
        el.classList.add('hidden');
        el.innerHTML = ''; // clean unmounted page
      }
    });

    // Render target page
    const targetElement = document.getElementById(pageConfig.id);
    if (targetElement) {
      pageConfig.render(targetElement);
      targetElement.classList.remove('hidden');
      window.scrollTo(0, 0);
      document.title = pageConfig.title;
    }

    this.currentPage = cleanKey;

    // Setup scroll reveals for newly injected elements
    if (targetElement) {
      this.setupIntersectionObserver(targetElement);
    }

    // Refresh Lucide Icons & Cursor listeners on newly injected DOM
    if (window.lucide) {
      window.lucide.createIcons();
    }
    if (this.cursor && targetElement) {
      this.cursor.setupHoverListeners(targetElement);
    }

    // Reset video scrub values on Home load
    if (cleanKey === 'home') {
      this.targetVideoTime = 0;
      this.currentVideoTime = 0;
      this.hasAutoAdvanced = false;
      const vid = document.getElementById('hero-commercial-video');
      if (vid) {
        vid.pause();
        vid.currentTime = 0;
      }
    }

    // Reset progress bar on page transition
    const progressBar = document.getElementById('scroll-progress-bar');
    if (progressBar) progressBar.style.width = '0%';

    if (withTransition && transitionLayer) {
      await new Promise(r => setTimeout(r, 180));
      transitionLayer.classList.remove('active');
    }

    this.isTransitioning = false;
  }
}

// Instantiate on DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
  window.oreoApp = new App();
});
