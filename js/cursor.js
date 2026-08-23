// ==========================================================================
// OREO CUSTOM MAGNETIC CURSOR & INTERACTION ENGINE
// Smooth lerp tracking, magnetic button snapping, and context badges
// ==========================================================================

import { sound } from './soundEngine.js';

export class CustomCursor {
  constructor() {
    this.cursor = document.getElementById('custom-cursor');
    if (!this.cursor) return;
    this.dot = this.cursor.querySelector('.cursor-dot');
    this.ring = this.cursor.querySelector('.cursor-ring');
    this.label = this.cursor.querySelector('.cursor-label');

    this.pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.speed = 0.18;
    this.isHovering = false;
    this.isDragging = false;
    this.magneticTarget = null;
    this.animationFrame = null;

    this.init();
  }

  init() {
    if (window.innerWidth < 768) return; // Disable on touch/mobile

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      if (this.dot) {
        this.dot.style.transform = `translate3d(${this.mouse.x}px, ${this.mouse.y}px, 0)`;
      }
    });

    window.addEventListener('mousedown', () => {
      document.body.classList.add('cursor-click');
    });

    window.addEventListener('mouseup', () => {
      document.body.classList.remove('cursor-click');
    });

    this.setupHoverListeners();
    this.render();
  }

  setupHoverListeners(container = document) {
    // Interactive buttons & links
    const hoverElements = container.querySelectorAll('a, button, [data-cursor="hover"]');
    hoverElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
        sound.playHover();
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
        this.setLabel('');
      });
    });

    // Magnetic buttons
    const magneticBtns = container.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.25;
        const deltaY = (e.clientY - centerY) * 0.25;
        btn.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = `translate3d(0px, 0px, 0)`;
      });
    });

    // Custom badges
    const taggedElements = container.querySelectorAll('[data-cursor-label]');
    taggedElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        const text = el.getAttribute('data-cursor-label');
        this.setLabel(text);
        if (text === 'DRAG' || text === 'TWIST') {
          document.body.classList.add('cursor-drag');
        } else {
          document.body.classList.add('cursor-hover');
        }
      });
      el.addEventListener('mouseleave', () => {
        this.setLabel('');
        document.body.classList.remove('cursor-drag', 'cursor-hover');
      });
    });
  }

  setLabel(text) {
    if (this.label) {
      this.label.textContent = text;
    }
  }

  render() {
    // Lerp outer ring
    this.pos.x += (this.mouse.x - this.pos.x) * this.speed;
    this.pos.y += (this.mouse.y - this.pos.y) * this.speed;

    if (this.ring) {
      this.ring.style.transform = `translate3d(${this.pos.x}px, ${this.pos.y}px, 0)`;
    }

    this.animationFrame = requestAnimationFrame(() => this.render());
  }

  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }
}
