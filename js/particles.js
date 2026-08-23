// ==========================================================================
// OREO AMBIENT PARTICLE ENGINE (CANVAS 2D)
// Floating cookie crumbs, chocolate flakes, and cream sparkles
// ==========================================================================

export class ParticleEngine {
  constructor(canvasId = 'particle-canvas') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.maxParticles = window.innerWidth < 768 ? 25 : 60;
    this.mouse = { x: -1000, y: -1000, radius: 120 };
    this.width = 0;
    this.height = 0;
    this.animationFrame = null;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
    window.addEventListener('mouseleave', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });

    // Create initial particle pool
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push(this.createParticle());
    }

    this.loop();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  createParticle(x = null, y = null, isBurst = false) {
    const types = ['crumb', 'cream', 'gold'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    let color, size, alpha;
    if (type === 'crumb') {
      color = '#26211D'; // chocolate wafer
      size = Math.random() * 3.5 + 1.2;
      alpha = Math.random() * 0.4 + 0.2;
    } else if (type === 'cream') {
      color = '#FFFFFF'; // vanilla creme
      size = Math.random() * 2 + 0.8;
      alpha = Math.random() * 0.5 + 0.3;
    } else {
      color = '#E5B25D'; // golden biscuit flake
      size = Math.random() * 2.5 + 1;
      alpha = Math.random() * 0.4 + 0.2;
    }

    const angle = Math.random() * Math.PI * 2;
    const speed = isBurst ? Math.random() * 5 + 2 : Math.random() * 0.4 + 0.1;

    return {
      x: x !== null ? x : Math.random() * this.width,
      y: y !== null ? y : Math.random() * this.height,
      vx: Math.cos(angle) * speed,
      vy: isBurst ? Math.sin(angle) * speed : Math.random() * 0.3 + 0.1,
      size,
      color,
      alpha,
      baseAlpha: alpha,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 1.5,
      isBurst,
      life: 1.0,
      decay: isBurst ? Math.random() * 0.03 + 0.015 : 0
    };
  }

  // Trigger burst explosion on twist / bite
  burst(x, y, count = 25) {
    for (let i = 0; i < count; i++) {
      this.particles.push(this.createParticle(x, y, true));
    }
  }

  loop() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      // Update position
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotSpeed;

      // Mouse repulsion / attraction
      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < this.mouse.radius && !p.isBurst) {
        const force = (1 - dist / this.mouse.radius) * 1.5;
        p.x -= (dx / dist) * force;
        p.y -= (dy / dist) * force;
      }

      if (p.isBurst) {
        p.life -= p.decay;
        p.vy += 0.08; // gravity
        p.alpha = p.baseAlpha * p.life;
        if (p.life <= 0) {
          this.particles.splice(i, 1);
          continue;
        }
      } else {
        // Natural wrapping
        if (p.y > this.height + 20) {
          p.y = -20;
          p.x = Math.random() * this.width;
        }
        if (p.x < -20) p.x = this.width + 20;
        if (p.x > this.width + 20) p.x = -20;
      }

      // Draw particle
      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = Math.max(0, p.alpha);

      // Irregular crumb polygon
      this.ctx.beginPath();
      this.ctx.ellipse(0, 0, p.size, p.size * 0.7, 0, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    // Keep base pool filled
    while (this.particles.filter(p => !p.isBurst).length < this.maxParticles) {
      this.particles.push(this.createParticle());
    }

    this.animationFrame = requestAnimationFrame(() => this.loop());
  }

  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }
}
