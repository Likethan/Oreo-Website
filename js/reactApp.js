// ==========================================================================
// OREO CINEMATIC REACT 18 APPLICATION — 50-FRAME VIDEO SCRUB & SEAMLESS MULTI-SECTION
// 60-120 FPS Canvas Frame Scrubbing, Sound Synthesizer, & Continuous Scroll Experience
// ==========================================================================

const { useState, useEffect, useRef, useMemo, useCallback } = React;

// --------------------------------------------------------------------------
// 1. PROCEDURAL WEB AUDIO SYNTHESIZER
// --------------------------------------------------------------------------
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.initialized = true;
    } catch (e) {
      console.warn("Web Audio not supported", e);
    }
  }

  toggle() {
    if (!this.initialized) this.init();
    this.enabled = !this.enabled;
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
    return this.enabled;
  }

  ensure() {
    if (!this.initialized) this.init();
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  }

  playHover() {
    if (!this.enabled || !this.ctx) return;
    this.ensure();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(480, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(720, this.ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playClick() {
    if (!this.enabled || !this.ctx) return;
    this.ensure();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(560, this.ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  playTwist(intensity = 1.0) {
    if (!this.enabled || !this.ctx) return;
    this.ensure();
    const bufSize = Math.floor(this.ctx.sampleRate * 0.07);
    const buf = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) d[i] = Math.random() * 2 - 1;
    const noise = this.ctx.createBufferSource();
    noise.buffer = buf;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, this.ctx.currentTime);
    filter.Q.setValueAtTime(4, this.ctx.currentTime);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2 * intensity, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.07);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start();
    noise.stop(this.ctx.currentTime + 0.07);
  }

  playCrunch() {
    if (!this.enabled || !this.ctx) return;
    this.ensure();
    const now = this.ctx.currentTime;
    for (let i = 0; i < 3; i++) {
      const offset = i * 0.025;
      const bufSize = Math.floor(this.ctx.sampleRate * 0.06);
      const buf = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let j = 0; j < bufSize; j++) d[j] = (Math.random() * 2 - 1) * Math.exp(-j / (bufSize * 0.3));
      const noise = this.ctx.createBufferSource();
      noise.buffer = buf;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(800 + i * 400, now + offset);
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.18 - i * 0.03, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.06);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(now + offset);
      noise.stop(now + offset + 0.06);
    }
  }

  playDip() {
    if (!this.enabled || !this.ctx) return;
    this.ensure();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.3);
    oscGain.gain.setValueAtTime(0.24, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    osc.connect(oscGain);
    oscGain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.3);
  }
}

const sound = new SoundEngine();

// --------------------------------------------------------------------------
// 2. FLAVORS, RECIPES & CONTENT DATA
// --------------------------------------------------------------------------
const FLAVORS_DATA = [
  {
    id: "original",
    category: "classics",
    name: "ORIGINAL OREO",
    tagline: "The Timeless Classic",
    image: "assets/images/flavor_original.jpg",
    color: "#0070F3",
    accentGlow: "rgba(0, 112, 243, 0.4)",
    waferColor: "#181512",
    cremeColor: "#FFFFFF",
    description: "The iconic sandwich cookie that started a global ritual in 1912. Rich chocolate cocoa wafers filled with signature smooth vanilla sweet creme.",
    sweetness: 85,
    cocoaIntensity: 90,
    cremeRatio: "1x Standard",
    pairWith: "Ice-cold Whole Milk (3.5%)"
  },
  {
    id: "golden",
    category: "classics",
    name: "GOLDEN OREO",
    tagline: "Sunlit Vanilla Dream",
    image: "assets/images/flavor_golden.jpg",
    color: "#E5B25D",
    accentGlow: "rgba(229, 178, 93, 0.4)",
    waferColor: "#D4A359",
    cremeColor: "#FFFFFF",
    description: "A luminous twist for vanilla lovers. Golden-baked, light and buttery vanilla biscuits embracing our legendary sweet creme core.",
    sweetness: 88,
    cocoaIntensity: 10,
    cremeRatio: "1x Standard",
    pairWith: "Oat Milk or Vanilla Latte"
  },
  {
    id: "double-stuf",
    category: "classics",
    name: "DOUBLE STUF",
    tagline: "Twice the Velvet Creme",
    image: "assets/images/flavor_doublestuf.jpg",
    color: "#00D4FF",
    accentGlow: "rgba(0, 212, 255, 0.45)",
    waferColor: "#181512",
    cremeColor: "#FFFFFF",
    description: "Engineered for creme devotees who crave maximum luxury. 200% more luscious vanilla creme packed between our classic cocoa wafers.",
    sweetness: 95,
    cocoaIntensity: 80,
    cremeRatio: "2x Extra Thick",
    pairWith: "Chilled Heavy Cream Splash"
  },
  {
    id: "strawberry",
    category: "fruity",
    name: "STRAWBERRY DELIGHT",
    tagline: "Summer Berry Bliss",
    image: "assets/images/flavor_strawberry.jpg",
    color: "#FF4D79",
    accentGlow: "rgba(255, 77, 121, 0.45)",
    waferColor: "#181512",
    cremeColor: "#FF8DA1",
    description: "Sun-ripened strawberry essence swirled into dreamy sweet creme, nestled between dark chocolate cookies for a chocolate-dipped berry sensation.",
    sweetness: 90,
    cocoaIntensity: 75,
    cremeRatio: "1x Standard",
    pairWith: "Iced Berry Herbal Tea"
  },
  {
    id: "mint",
    category: "specialty",
    name: "COOL MINT",
    tagline: "Crisp Refreshment",
    image: "assets/images/flavor_mint.jpg",
    color: "#00E599",
    accentGlow: "rgba(0, 229, 153, 0.45)",
    waferColor: "#181512",
    cremeColor: "#5CE6B0",
    description: "An invigorating burst of cooling peppermint creme enveloped in rich cocoa wafers. Refreshing, sophisticated, and deeply satisfying.",
    sweetness: 82,
    cocoaIntensity: 85,
    cremeRatio: "1x Standard",
    pairWith: "Iced Cold Brew Coffee"
  },
  {
    id: "birthday",
    category: "specialty",
    name: "BIRTHDAY CAKE",
    tagline: "Party in Every Bite",
    image: "assets/images/flavor_birthday.jpg",
    color: "#FF6584",
    accentGlow: "rgba(255, 101, 132, 0.45)",
    waferColor: "#181512",
    cremeColor: "#FFF275",
    description: "Celebration-ready sweet frosting creme studded with festive multi-colored rainbow confetti sprinkles between classic dark chocolate wafers.",
    sweetness: 98,
    cocoaIntensity: 70,
    cremeRatio: "1.5x Celebration",
    pairWith: "Sparkling Milk Float"
  }
];

const RECIPES_DATA = [
  {
    id: "shake",
    category: "shakes",
    title: "Velvety Oreo Milkshake",
    tagline: "The Ultimate Classic Diner Blend",
    image: "assets/images/recipe_milkshake.jpg",
    prepTime: "10 mins",
    difficulty: "Easy",
    servings: "2 glasses",
    calories: "480 kcal",
    summary: "Thick vanilla bean ice cream spun with crushed Oreo cookies, a splash of heavy cream, topped with homemade whipped cream and cookie dust.",
    ingredients: [
      "8 Original Oreo cookies (crushed)",
      "3 large scoops premium vanilla bean ice cream",
      "1/2 cup cold whole milk",
      "1/4 cup heavy cream",
      "Whipped cream & extra mini Oreos for garnish"
    ],
    steps: [
      "Place 6 Oreo cookies into a blender and pulse into coarse crumbs.",
      "Add vanilla bean ice cream, whole milk, and heavy cream.",
      "Blend on medium-high speed for 30-45 seconds until thick and velvety smooth.",
      "Pour into chilled tall glasses.",
      "Top with generous whipped cream swirl and remaining crushed Oreo cookie crumbles."
    ],
    chefTip: "Chill the serving glasses in the freezer for 15 minutes before pouring for maximum frosting retention."
  },
  {
    id: "cheesecake",
    category: "nobake",
    title: "No-Bake Oreo Dream Cheesecake",
    tagline: "Decadent Velvet Cloud",
    image: "assets/images/recipe_cheesecake.jpg",
    prepTime: "25 mins + Chill",
    difficulty: "Medium",
    servings: "8-10 slices",
    calories: "520 kcal",
    summary: "A buttery Oreo crumb crust filled with a lush whipped cream cheese and crushed cookie folded mousse, crowned with glossy dark chocolate ganache.",
    ingredients: [
      "24 Oreo cookies (crushed finely for crust)",
      "4 tbsp unsalted butter (melted)",
      "16 oz (450g) cream cheese (softened)",
      "1 cup powdered sugar",
      "1 tsp pure vanilla bean paste",
      "1 1/2 cups heavy whipping cream",
      "10 additional Oreos (chopped roughly for filling)"
    ],
    steps: [
      "Mix finely crushed Oreo crumbs with melted butter; press firmly into the base of an 8-inch springform pan.",
      "In a large bowl, beat softened cream cheese, powdered sugar, and vanilla paste until fluffy and lump-free.",
      "In a separate bowl, whip heavy cream to stiff peaks. Gently fold whipped cream into cream cheese mixture.",
      "Fold in roughly chopped Oreo pieces.",
      "Spread evenly over the prepared crust and refrigerate for at least 6 hours (or overnight) to set."
    ],
    chefTip: "Use room temperature cream cheese to ensure a 100% silky, lump-free cheesecake texture."
  },
  {
    id: "brownie",
    category: "baked",
    title: "Fudgy Oreo Truffle Brownies",
    tagline: "Molten Fudge & Cookie Crunch",
    image: "assets/images/recipe_brownie.jpg",
    prepTime: "35 mins",
    difficulty: "Medium",
    servings: "12 squares",
    calories: "390 kcal",
    summary: "Ultra-fudgy 70% dark chocolate brownie batter layered with a hidden core of whole Oreo cookies and chocolate ganache swirl.",
    ingredients: [
      "16 Original Oreo cookies",
      "1/2 cup unsalted butter",
      "7 oz (200g) dark chocolate (70% cocoa)",
      "3/4 cup granulated sugar",
      "2 large eggs (room temp)",
      "1/3 cup all-purpose flour",
      "2 tbsp Dutch-process cocoa powder",
      "1/2 tsp sea salt"
    ],
    steps: [
      "Preheat oven to 350°F (175°C) and line an 8x8 inch pan with baking parchment.",
      "Melt dark chocolate and butter together in a heatproof bowl over simmering water; cool slightly.",
      "Whisk eggs and sugar until pale and frothy, then fold in melted chocolate mixture.",
      "Sift in flour, cocoa powder, and sea salt. Fold until just combined.",
      "Pour half batter into pan, arrange whole Oreos in a single layer, cover with remaining batter, and bake for 22-25 mins."
    ],
    chefTip: "Do not overbake! Brownies should have a slight molten jiggle in the center when removed from the oven."
  },
  {
    id: "mugcake",
    category: "hacks",
    title: "Midnight 2-Minute Oreo Mug Cake",
    tagline: "Instant Dorm & Late Night Magic",
    image: "assets/images/recipe_mugcake.jpg",
    prepTime: "2 mins",
    difficulty: "Super Easy",
    servings: "1 mug",
    calories: "280 kcal",
    summary: "The viral two-ingredient sensation: Oreo cookies crushed with milk and microwaved into a warm, molten soufflé-like chocolate sponge.",
    ingredients: [
      "4-5 Original Oreo cookies",
      "3 tablespoons milk (dairy or plant-based)",
      "1/2 tbsp flour (optional)",
      "1/2 tsp baking powder (optional)",
      "1 scoop vanilla ice cream for serving"
    ],
    steps: [
      "Place 4 Oreo cookies in a microwave-safe mug.",
      "Add 3 tablespoons of milk and mash thoroughly with a fork until a smooth batter forms.",
      "Push 1 whole Oreo cookie into the center of the batter.",
      "Microwave on high for 60 to 75 seconds until risen and set. Top with cold vanilla ice cream!"
    ],
    chefTip: "Enjoy immediately while hot and steaming with the cold ice cream melting over the top."
  }
];

// --------------------------------------------------------------------------
// 3. AMBIENT PARTICLE BACKGROUND CANVAS
// --------------------------------------------------------------------------
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animId = null;

    const maxParticles = window.innerWidth < 768 ? 20 : 45;
    const particles = [];
    const mouse = { x: -1000, y: -1000 };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const createParticle = () => {
      const types = ['crumb', 'cream', 'gold'];
      const type = types[Math.floor(Math.random() * types.length)];
      let color = '#26211D';
      let size = Math.random() * 3 + 1;
      let alpha = Math.random() * 0.35 + 0.15;
      if (type === 'cream') {
        color = '#FFFFFF';
        size = Math.random() * 2 + 0.8;
        alpha = Math.random() * 0.4 + 0.2;
      } else if (type === 'gold') {
        color = '#E5B25D';
        size = Math.random() * 2.2 + 1;
        alpha = Math.random() * 0.35 + 0.15;
      }

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: Math.random() * 0.3 + 0.15,
        size,
        color,
        alpha,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 1.2
      };
    };

    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle());
    }

    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      const heroHeight = window.innerHeight * 1.8;
      const scrollOpacity = Math.min(1, Math.max(0, (window.scrollY - window.innerHeight * 0.6) / (window.innerHeight * 0.6)));

      if (scrollOpacity > 0.01) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.rotation += p.rotSpeed;

          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const force = (100 - dist) / 100;
            p.x -= (dx / dist) * force * 2;
            p.y -= (dy / dist) * force * 2;
          }

          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          }
          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha * scrollOpacity;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      animId = requestAnimationFrame(loop);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
}

// --------------------------------------------------------------------------
// 4. CUSTOM MAGNETIC CURSOR COMPONENT
// --------------------------------------------------------------------------
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [label, setLabel] = useState('');
  const [cursorState, setCursorState] = useState('');

  useEffect(() => {
    if (window.innerWidth < 768) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let animId = null;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const handleMouseDown = () => setCursorState(prev => prev + ' cursor-click');
    const handleMouseUp = () => setCursorState(prev => prev.replace(' cursor-click', ''));

    const handleMouseOver = (e) => {
      const target = e.target.closest('button, a, [data-cursor], .oreo-cookie-interactive, input');
      if (target) {
        if (target.classList.contains('oreo-cookie-interactive') || target.hasAttribute('data-cursor-drag')) {
          setLabel('TWIST');
          setCursorState('cursor-drag');
        } else {
          setCursorState('cursor-hover');
          setLabel(target.getAttribute('data-cursor-label') || '');
        }
      } else {
        setCursorState('');
        setLabel('');
      }
    };

    const loop = () => {
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      animId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

  return (
    <div className={`custom-cursor pointer-events-none fixed inset-0 z-50 ${cursorState}`}>
      <div ref={dotRef} className="cursor-dot fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
      <div ref={ringRef} className="cursor-ring fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        {label && (
          <span className="text-[9px] font-mono font-black tracking-widest text-obsidian bg-white px-1.5 py-0.5 rounded shadow">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 5. BUTTER-SMOOTH 300-FRAME CANVAS SCRUBBER COMPONENT (HERO SECTION)
// --------------------------------------------------------------------------
const TOTAL_FRAMES = 300;

function CanvasFrameScrubber() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [scrubProgress, setScrubProgress] = useState(0);
  const [scrollStarted, setScrollStarted] = useState(false);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const lastDrawnFrameRef = useRef(-1);
  const animFrameIdRef = useRef(null);
  const lastTimeRef = useRef(performance.now());
  const lastAudioMilestone = useRef(-1);

  // Preload 300 landscape frames with async decoding & WebP + JPG fallback
  useEffect(() => {
    let loaded = 0;
    const imgs = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const numStr = String(i).padStart(3, '0');
      
      const onImageLoaded = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === 1 || loaded === TOTAL_FRAMES) {
          drawFrame(0);
        }
        if (loaded >= 12) {
          setIsReady(true);
        }
      };

      img.onload = () => {
        if ('decode' in img) {
          img.decode().then(onImageLoaded).catch(onImageLoaded);
        } else {
          onImageLoaded();
        }
      };

      img.onerror = () => {
        img.onerror = () => {
          img.onerror = null;
          img.src = `assets/frames/ezgif-frame-${numStr}.png`;
        };
        img.src = `assets/frames/frame_${numStr}.jpg`;
      };

      img.src = `assets/frames/frame_${numStr}.webp`;
      imgs.push(img);
    }
    imagesRef.current = imgs;

    // Safety timeout
    const fallbackTimer = setTimeout(() => setIsReady(true), 2500);
    return () => clearTimeout(fallbackTimer);
  }, []);

  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    if (!ctx) return;

    // Direct frame lookup with instant neighbor fallback for fast scrubs
    let img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset <= 5; offset++) {
        const prev = imagesRef.current[index - offset];
        if (prev && prev.complete && prev.naturalWidth > 0) { img = prev; break; }
        const next = imagesRef.current[index + offset];
        if (next && next.complete && next.naturalWidth > 0) { img = next; break; }
      }
    }
    if (!img || !img.complete || img.naturalWidth === 0) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'medium';

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Responsive Canvas Scale (Full cover center fit across any screen size)
    const scale = Math.max(cw / iw, ch / ih);
    const nw = Math.round(iw * scale);
    const nh = Math.round(ih * scale);
    const cx = Math.round((cw - nw) / 2);
    const cy = Math.round((ch - nh) / 2);

    ctx.drawImage(img, cx, cy, nw, nh);
    lastDrawnFrameRef.current = index;
  }, []);

  // Resize canvas with Retina DPR
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      lastDrawnFrameRef.current = -1; // Force redraw on resize
      drawFrame(Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentFrameRef.current))));
    };
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);

  // Velocity-Adaptive High-FPS Smooth Physics Render Loop (Butter-Smooth on fast & slow scrolls)
  useEffect(() => {
    const renderLoop = (time) => {
      const delta = Math.min((time - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = time;

      const diff = targetFrameRef.current - currentFrameRef.current;
      const absDiff = Math.abs(diff);
      
      if (absDiff > 0.005) {
        // Dynamically accelerate when scrolling fast so frames never lag or freeze, glide gently on stop
        const dynamicSpeed = Math.min(3.2, 1 + absDiff / 35);
        const smoothRate = 1 - Math.exp(-14 * dynamicSpeed * delta);
        currentFrameRef.current += diff * smoothRate;

        const frameIdx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentFrameRef.current)));
        if (frameIdx !== lastDrawnFrameRef.current) {
          drawFrame(frameIdx);
        }
      }

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    lastTimeRef.current = performance.now();
    animFrameIdRef.current = requestAnimationFrame(renderLoop);
    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [drawFrame]);

  // High-Precision Passive Scroll Listener for Pinned Track with 10% deceleration cushion
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const container = containerRef.current;
        if (container) {
          const scrollY = window.scrollY;
          const trackTop = container.offsetTop;
          const trackHeight = container.offsetHeight - window.innerHeight;

          if (trackHeight > 0) {
            const scrollInside = scrollY - trackTop;
            // 90% travel mapping ensures full 300-frame animation completes smoothly before leaving section
            const progress = Math.min(1, Math.max(0, scrollInside / (trackHeight * 0.90)));
            
            targetFrameRef.current = progress * (TOTAL_FRAMES - 1);
            setScrubProgress(progress);

            if (progress > 0.01 && !scrollStarted) {
              setScrollStarted(true);
            }

            // Audio milestones during scroll scrub
            const currentMilestone = Math.floor(progress * 4);
            if (currentMilestone !== lastAudioMilestone.current && progress > 0.05 && progress < 0.98) {
              lastAudioMilestone.current = currentMilestone;
              sound.playTwist(0.35);
            } else if (progress >= 0.98 && lastAudioMilestone.current !== 4) {
              lastAudioMilestone.current = 4;
              sound.playCrunch();
            }
          }
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollStarted]);

  const loadPercent = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  const currentFrameDisplay = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(scrubProgress * (TOTAL_FRAMES - 1)) + 1));
  const scrubPercent = Math.round(scrubProgress * 100);

  const phaseData = [
    {
      step: "01",
      tag: "ORIGIN & RELIEF",
      eyebrow: "EST. 1912 • THE ICONIC RITUAL",
      title: "THE TIMELESS COOKIE",
      desc: "Two dark cocoa wafers crafted with precision embossed details, embracing signature vanilla sweet creme.",
      badge: "100% Cocoa Heritage",
      status: "EMBOSS INSPECTION"
    },
    {
      step: "02",
      tag: "MECHANICAL SNAP",
      eyebrow: "THE RITUAL • STAGE 02",
      title: "THE ART OF THE TWIST",
      desc: "A gentle counter-rotational snap breaks the wafer seal, unlocking pure sweet vanilla velvet.",
      badge: "65° Optimal Rotation",
      status: "COUNTER-ROTATION ACTIVE"
    },
    {
      step: "03",
      tag: "SIGNATURE VELVET",
      eyebrow: "TEXTURE PROFILE • STAGE 03",
      title: "AIRY SWEET CREME",
      desc: "Microscopic perfection — silky, whipped, and rich with authentic vanilla bean notes.",
      badge: "2:1 Wafer-Creme Ratio",
      status: "CREME CORE EXPOSED"
    },
    {
      step: "04",
      tag: "COLD MILK DUNK",
      eyebrow: "THE CLIMAX • STAGE 04",
      title: "TWIST. DIP. LOVE.",
      desc: "Submerged for 3 to 5 seconds in ice-cold milk. The worldwide ritual that unites generations.",
      badge: "3-5s Optimum Dunk",
      status: "PERFECT MILK HARMONY"
    }
  ];

  const phaseIndex = scrubProgress < 0.25 ? 0 : scrubProgress < 0.55 ? 1 : scrubProgress < 0.82 ? 2 : 3;
  const currentPhase = phaseData[phaseIndex];

  return (
    <div ref={containerRef} id="home" className="relative w-full h-[420vh] bg-[#f8ed55]">
      {/* Loading Overlay */}
      {!isReady && (
        <div className="fixed inset-0 z-50 bg-[#f8ed55] flex flex-col items-center justify-center gap-4">
          <div className="w-14 h-14 rounded-full border-4 border-obsidian/20 border-t-obsidian animate-spin"></div>
          <span className="font-mono text-xs tracking-widest text-obsidian/90 uppercase font-bold">
            LOADING CINEMATIC FRAMES... {loadPercent}%
          </span>
        </div>
      )}

      {/* Sticky Fullscreen Canvas Stage */}
      <div className="sticky top-0 left-0 w-full h-screen min-h-[600px] overflow-hidden flex items-center justify-center bg-[#f8ed55]">
        <canvas ref={canvasRef} className="w-full h-full block transform-gpu will-change-transform"></canvas>

        {/* Dynamic High-End Cinematic HUD & Editorial Layout */}
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-end p-4 sm:p-8 md:p-12 pb-8 md:pb-12">
          
          {/* BOTTOM SPLIT EDITORIAL CARD & LIVE TELEMETRY HUD */}
          <div className="w-full flex flex-col md:flex-row items-end justify-between gap-4 pointer-events-auto">
            
            {/* Left: Dynamic Editorial Glass Card */}
            <div className="w-full md:max-w-md bg-obsidian/85 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 sm:p-7 shadow-2xl text-left transition-all duration-500 transform hover:scale-[1.01]">
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-oreo-blue-electric/20 border border-oreo-blue-cyan/40 text-[10px] font-mono tracking-widest text-oreo-blue-cyan uppercase font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-oreo-blue-cyan animate-pulse"></span>
                  {currentPhase.eyebrow}
                </span>
                <span className="text-[10px] font-mono text-white/50 tracking-wider">
                  {currentPhase.badge}
                </span>
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight mb-2">
                {currentPhase.title}
              </h2>

              <p className="text-xs sm:text-sm text-creme/80 leading-relaxed font-body mb-4">
                {currentPhase.desc}
              </p>

              {/* Interactive Scrub Visual Bar */}
              <div className="w-full pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
                <span className="text-white/50">RITUAL STATUS:</span>
                <span className="text-oreo-blue-cyan font-bold">{currentPhase.status}</span>
              </div>
            </div>

            {/* Right: Live Telemetry & Scrub Cue HUD */}
            <div className="hidden sm:flex flex-col gap-2.5 items-end">
              
              {/* Telemetry Card */}
              <div className="bg-obsidian/85 backdrop-blur-2xl border border-white/15 rounded-2xl p-4 shadow-2xl flex items-center gap-5 text-xs font-mono">
                <div className="flex flex-col text-right">
                  <span className="text-[10px] text-white/40">FRAME SEQUENCE</span>
                  <span className="text-white font-black text-sm tracking-widest">
                    {String(currentFrameDisplay).padStart(3, '0')} <span className="text-white/30 font-normal">/ {TOTAL_FRAMES}</span>
                  </span>
                </div>

                {/* Circular Scrub Progress Ring */}
                <div className="relative w-11 h-11 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-white/10"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-oreo-blue-cyan transition-all duration-75"
                      strokeDasharray={`${scrubPercent}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute text-[10px] font-bold text-white font-mono">{scrubPercent}%</span>
                </div>
              </div>

              {/* Scroll Cue Pill */}
              <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full bg-obsidian/80 backdrop-blur-xl border border-white/10 text-creme text-[10px] font-mono tracking-widest uppercase transition-opacity duration-500 shadow-lg ${scrollStarted ? 'opacity-40 hover:opacity-90' : 'opacity-90 animate-bounce'}`}>
                <span>SCROLL TO SCRUB RITUAL</span>
                <span className="text-oreo-blue-cyan">↓</span>
              </div>
            </div>

          </div>
        </div>

        {/* Smooth Gradient Transition into Obsidian Dark Mode */}
        <div className="absolute bottom-0 left-0 w-full h-36 bg-gradient-to-b from-transparent to-obsidian pointer-events-none z-30"></div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 6. EXPERIENCE SECTION
// --------------------------------------------------------------------------
function ExperienceSection({ onNavigate }) {
  const [selectedRitual, setSelectedRitual] = useState('twist');

  const rituals = {
    twist: { title: "THE TWIST PURIST", desc: "You believe the journey is just as sweet as the destination. You savor every single layer.", sound: () => sound.playTwist(1) },
    dip: { title: "THE QUICK DIPPER", desc: "Exact balance! 3 seconds in cold milk for optimal soft-crunch harmony.", sound: () => sound.playDip() },
    dunk: { title: "THE DEEP DUNKER", desc: "Bold and patient. You let bubbles rise until it becomes an ethereal chocolate cloud.", sound: () => sound.playDip() },
    bite: { title: "THE CRUNCH REBEL", desc: "Direct and confident! Straight to the legendary dual-texture crunch.", sound: () => sound.playCrunch() }
  };

  const handleRitual = (key) => {
    setSelectedRitual(key);
    rituals[key].sound();
  };

  return (
    <section id="experience" className="relative py-28 px-6 md:px-16 max-w-6xl mx-auto border-t border-white/10">
      <div className="text-center mb-20">
        <span className="text-xs font-mono text-oreo-blue-cyan tracking-widest uppercase mb-2 block">THE 5-STEP RITUAL</span>
        <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl font-black text-white mb-4">THE OREO EXPERIENCE</h2>
        <p className="text-creme/80 max-w-xl mx-auto text-base sm:text-lg">Every bite has a story. Follow the century-old ritual that unites millions across the globe.</p>
      </div>

      <div className="space-y-8 relative mb-24">
        {[
          { 
            num: "01", 
            title: "PICK IT UP", 
            eyebrow: "THE EMBOSSED EMBLEM",
            desc: "Reach in and pick up the iconic biscuit. Feel the crisp 1952 relief emboss and balanced weight before the twist.",
            image: "assets/images/ritual_01_pickup.jpg",
            badge: "100% Cocoa Heritage",
            soundEffect: () => sound.playClick()
          },
          { 
            num: "02", 
            title: "TWIST IT", 
            eyebrow: "COUNTER-ROTATIONAL SNAP",
            desc: "With a gentle counter-rotational snap, the top wafer breaks free, unveiling sweet vanilla velvet.",
            image: "assets/images/ritual_02_twist.jpg",
            badge: "65° Optimum Snap",
            soundEffect: () => sound.playTwist(1)
          },
          { 
            num: "03", 
            title: "SEE THE CREME", 
            eyebrow: "PURE VANILLA VELVET",
            desc: "Silky smooth, sweetened with real vanilla notes, spread with microscopic perfection.",
            image: "assets/images/ritual_03_creme.jpg",
            badge: "Silky Whipped Core",
            soundEffect: () => sound.playHover()
          },
          { 
            num: "04", 
            title: "DIP IT", 
            eyebrow: "COLD MILK HARMONY",
            desc: "Submerge for 3 to 5 seconds into cold milk as the biscuit softens into pure bliss.",
            image: "assets/images/ritual_04_dip.jpg",
            badge: "3-5s Golden Dunk",
            soundEffect: () => sound.playDip()
          },
          { 
            num: "05", 
            title: "ENJOY IT", 
            eyebrow: "THE ULTIMATE CRUNCH",
            desc: "Take the first bite. The crunch, the cream, and the cocoa bouquet awaken pure childhood joy.",
            image: "assets/images/ritual_05_enjoy.jpg",
            badge: "Dual-Texture Euphoria",
            soundEffect: () => sound.playCrunch()
          }
        ].map((step, idx) => (
          <div 
            key={idx} 
            onClick={() => step.soundEffect()}
            className="flex flex-col md:flex-row items-center justify-between gap-8 p-6 sm:p-8 bg-white/5 rounded-3xl border border-white/10 hover:border-oreo-blue-cyan/60 hover:bg-white/[0.08] transition-all group cursor-pointer shadow-lg hover:shadow-neon-blue"
          >
            <div className="flex-1 text-left">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono text-oreo-blue-cyan font-bold px-2.5 py-0.5 rounded-full bg-oreo-blue-electric/20 border border-oreo-blue-cyan/30">
                  STAGE {step.num}
                </span>
                <span className="text-[10px] font-mono text-white/50 tracking-wider uppercase">
                  {step.eyebrow}
                </span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-black text-white mb-2 group-hover:text-oreo-blue-cyan transition-colors">
                {step.title}
              </h3>
              <p className="text-sm text-creme/75 max-w-lg leading-relaxed mb-3">
                {step.desc}
              </p>
              <span className="inline-block text-[10px] font-mono text-white/40 group-hover:text-oreo-blue-cyan transition-colors">
                {step.badge}
              </span>
            </div>
            
            {/* Step-Specific Image Container */}
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl shrink-0 group-hover:scale-105 group-hover:border-oreo-blue-cyan transition-all duration-500 bg-[#161311]">
              <img 
                src={step.image} 
                alt={step.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-95 group-hover:brightness-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-[9px] font-mono text-oreo-blue-cyan font-bold border border-white/10">
                {step.num}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ritual Selector */}
      <div className="text-center p-8 sm:p-12 bg-white/5 rounded-3xl border border-white/15 backdrop-blur-xl">
        <span className="text-xs font-mono text-oreo-blue-cyan tracking-widest uppercase mb-2 block">PERSONALITY AUDIT</span>
        <h3 className="font-heading text-3xl sm:text-5xl font-black text-white mb-6">HOW DO YOU OREO?</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {Object.keys(rituals).map((k) => (
            <button
              key={k}
              onClick={() => handleRitual(k)}
              className={`p-4 rounded-2xl border font-heading text-xs font-bold uppercase transition-all cursor-pointer ${selectedRitual === k ? 'bg-oreo-blue-electric border-oreo-blue-cyan text-white shadow-neon-blue scale-105' : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'}`}
            >
              {k}
            </button>
          ))}
        </div>
        <div className="p-6 bg-black/50 border border-white/10 rounded-2xl max-w-md mx-auto">
          <h4 className="font-heading font-bold text-lg text-white mb-1">{rituals[selectedRitual].title}</h4>
          <p className="text-xs text-creme/75 leading-relaxed">{rituals[selectedRitual].desc}</p>
        </div>
      </div>
    </section>
  );
}

// --------------------------------------------------------------------------
// 7. FLAVORS SECTION
// --------------------------------------------------------------------------
function FlavorsSection({ onSelectFlavor }) {
  const [filter, setFilter] = useState('all');
  const filtered = useMemo(() => filter === 'all' ? FLAVORS_DATA : FLAVORS_DATA.filter(f => f.category === filter), [filter]);

  return (
    <section id="flavors" className="relative py-28 px-6 md:px-16 max-w-7xl mx-auto border-t border-white/10">
      <div className="text-center mb-16">
        <span className="text-xs font-mono text-oreo-blue-cyan tracking-widest uppercase mb-2 block">THE FLAVOR VAULT</span>
        <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl font-black text-white mb-4">FOR EVERY MOOD.</h2>
        <p className="text-creme/80 max-w-xl mx-auto text-base sm:text-lg mb-8">Click any flavor to inspect tasting notes, sweetness indexes, and milk pairings.</p>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2">
          {['all', 'classics', 'fruity', 'specialty'].map((cat) => (
            <button
              key={cat}
              onClick={() => { sound.playClick(); setFilter(cat); }}
              className={`px-5 py-2 rounded-full font-mono text-xs uppercase transition-all cursor-pointer ${filter === cat ? 'bg-oreo-blue-electric text-white shadow-neon-blue' : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'}`}
            >
              {cat === 'all' ? 'ALL FLAVORS' : cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((f) => (
          <div
            key={f.id}
            onClick={() => { sound.playClick(); onSelectFlavor(f); }}
            className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/30 backdrop-blur-xl cursor-pointer transition-all hover:-translate-y-2 hover:shadow-neon-blue group"
          >
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full bg-white/10 text-white block w-fit" style={{ color: f.color }}>
                {f.tagline}
              </span>
              <span className="text-[10px] font-mono text-white/50">{f.cremeRatio}</span>
            </div>

            <div 
              className="relative w-36 h-36 mx-auto mb-6 rounded-full overflow-hidden flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border-2 border-white/20 bg-[#161311]" 
              style={{ boxShadow: `0 0 30px ${f.accentGlow}` }}
            >
              <img src={f.image} alt={f.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
            </div>

            <h3 className="font-heading text-2xl font-black text-white mb-2 group-hover:text-oreo-blue-cyan transition-colors">{f.name}</h3>
            <p className="text-xs text-creme/70 line-clamp-2 leading-relaxed mb-4">{f.description}</p>
            
            <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono text-oreo-blue-cyan">
              <span className="font-bold">INSPECT TASTING NOTES</span>
              <span>→</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// --------------------------------------------------------------------------
// 8. THE TWIST INTERACTIVE PHYSICS SANDBOX SECTION
// --------------------------------------------------------------------------
function TwistSection() {
  const [rotation, setRotation] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isDipped, setIsDipped] = useState(false);
  const isDragging = useRef(false);
  const startX = useRef(0);

  const onStart = (clientX) => {
    isDragging.current = true;
    startX.current = clientX;
    sound.playTwist(0.5);
  };

  const onMove = (clientX) => {
    if (!isDragging.current) return;
    const delta = (clientX - startX.current) * 0.75;
    setRotation(delta);
    if (Math.abs(delta) > 60 && !isDone) {
      setIsDone(true);
      sound.playCrunch();
    }
  };

  const onEnd = () => {
    isDragging.current = false;
  };

  const resetTwist = () => {
    setRotation(0);
    setIsDone(false);
    setIsDipped(false);
    sound.playClick();
  };

  return (
    <section id="twist" className="relative py-28 px-6 md:px-16 max-w-5xl mx-auto border-t border-white/10 text-center select-none" onMouseUp={onEnd} onTouchEnd={onEnd}>
      <div className="mb-12">
        <span className="text-xs font-mono text-oreo-blue-cyan tracking-widest uppercase mb-2 block">INTERACTIVE SANDBOX</span>
        <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl font-black text-white mb-3">MASTER THE TWIST.</h2>
        <p className="text-sm text-creme/75 max-w-md mx-auto">
          {isDone ? "PERFECT SNAP! Now click the milk below to dunk." : "Click and drag horizontally across the cookie to twist the wafer."}
        </p>
      </div>

      <div className="my-8 flex flex-col items-center">
        {/* Interactive Cookie */}
        <div
          onMouseDown={(e) => onStart(e.clientX)}
          onMouseMove={(e) => onMove(e.clientX)}
          onTouchStart={(e) => onStart(e.touches[0].clientX)}
          onTouchMove={(e) => onMove(e.touches[0].clientX)}
          className="oreo-cookie-interactive w-72 h-72 sm:w-80 sm:h-80 relative cursor-grab active:cursor-grabbing mb-8 group"
        >
          <div className="cookie-wafer-top" style={{ transform: `rotate(${rotation}deg)` }}>
            <div className="cookie-emboss-pattern"></div>
          </div>
          <div className="cookie-creme-layer" style={{ transform: `scale(${1 + Math.min(Math.abs(rotation) * 0.003, 0.18)})` }}></div>
          <div className="cookie-wafer-bottom"></div>
        </div>

        {/* Milk Dunk Target / Reset */}
        {isDone ? (
          <div className="flex flex-col items-center gap-4 animate-bounce">
            <button
              onClick={() => { setIsDipped(true); sound.playDip(); }}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-oreo-blue-electric to-oreo-blue-cyan text-obsidian font-heading font-black text-sm uppercase shadow-neon-blue hover:scale-105 transition-transform cursor-pointer"
            >
              {isDipped ? "DUNKED IN COLD MILK! 🥛✨" : "DIP IN MILK NOW 🥛"}
            </button>
            <button onClick={resetTwist} className="text-xs font-mono text-white/50 hover:text-white underline cursor-pointer">
              RESET SANDBOX ↺
            </button>
          </div>
        ) : (
          <div className="text-xs font-mono text-white/40 tracking-wider">
            ↔ DRAG HORIZONTALLY TO SNAP
          </div>
        )}
      </div>

      {/* Physics Telemetry */}
      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl font-mono text-xs text-white/70 max-w-md w-full mx-auto flex justify-between">
        <span>ROTATION: {Math.round(rotation)}°</span>
        <span className="text-oreo-blue-cyan">{isDone ? (isDipped ? "CREME SAVORED 🥛" : "CREME UNLOCKED ✨") : "AWAITING TWIST..."}</span>
      </div>
    </section>
  );
}

// --------------------------------------------------------------------------
// 9. RECIPES SECTION
// --------------------------------------------------------------------------
function RecipesSection({ onSelectRecipe }) {
  const [filter, setFilter] = useState('all');
  const filtered = useMemo(() => filter === 'all' ? RECIPES_DATA : RECIPES_DATA.filter(r => r.category === filter), [filter]);

  return (
    <section id="recipes" className="relative py-28 px-6 md:px-16 max-w-7xl mx-auto border-t border-white/10">
      <div className="text-center mb-16">
        <span className="text-xs font-mono text-oreo-blue-cyan tracking-widest uppercase mb-2 block">CULINARY CREATIONS</span>
        <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl font-black text-white mb-4">MAKE IT YOURS.</h2>
        <p className="text-creme/80 max-w-xl mx-auto text-base sm:text-lg mb-8">From velvety classic milkshakes to 2-minute dorm mug hacks.</p>

        <div className="flex flex-wrap justify-center gap-2">
          {['all', 'shakes', 'nobake', 'baked', 'hacks'].map((c) => (
            <button
              key={c}
              onClick={() => { sound.playClick(); setFilter(c); }}
              className={`px-5 py-2 rounded-full font-mono text-xs uppercase transition-all cursor-pointer ${filter === c ? 'bg-oreo-blue-electric text-white shadow-neon-blue' : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'}`}
            >
              {c === 'all' ? 'ALL RECIPES' : c.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filtered.map((r) => (
          <div 
            key={r.id} 
            onClick={() => { sound.playClick(); onSelectRecipe(r); }} 
            className="p-5 rounded-3xl bg-white/5 border border-white/10 hover:border-oreo-blue-cyan cursor-pointer transition-all hover:-translate-y-2 hover:shadow-neon-blue group overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 rounded-2xl overflow-hidden mb-4 border border-white/10 group-hover:border-oreo-blue-cyan/60 transition-all bg-[#161311]">
                <img
                  src={r.image}
                  alt={r.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent pointer-events-none"></div>
                <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-obsidian/85 backdrop-blur-md text-[10px] font-mono text-oreo-blue-cyan border border-white/15 font-bold">
                  {r.servings}
                </span>
                <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[9px] font-mono text-white/80 border border-white/10 uppercase">
                  {r.difficulty}
                </span>
              </div>
              <span className="text-[10px] font-mono text-white/50 uppercase block mb-1">{r.prepTime} &bull; {r.calories}</span>
              <h3 className="font-heading text-lg font-bold text-white mb-2 group-hover:text-oreo-blue-cyan transition-colors leading-snug">{r.title}</h3>
              <p className="text-xs text-creme/70 line-clamp-2 leading-relaxed mb-4">{r.summary}</p>
            </div>
            <span className="text-xs font-mono text-oreo-blue-cyan font-bold block pt-3 border-t border-white/10">VIEW RECIPE DIRECTIONS →</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// --------------------------------------------------------------------------
// 10. ABOUT & HERITAGE SECTION
// --------------------------------------------------------------------------
function AboutSection() {
  const [quizScore, setQuizScore] = useState(null);

  return (
    <section id="about" className="relative py-28 px-6 md:px-16 max-w-5xl mx-auto border-t border-white/10">
      <div className="text-center mb-16">
        <span className="text-xs font-mono text-oreo-blue-cyan tracking-widest uppercase mb-2 block">OVER A CENTURY OF WONDER</span>
        <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl font-black text-white mb-4">THE RITUAL HERITAGE.</h2>
        <p className="text-creme/80 max-w-xl mx-auto text-base sm:text-lg">From Chelsea Market NYC in 1912 to the world's favorite biscuit.</p>
      </div>

      <div className="space-y-8 mb-20">
        {[
          { year: "1912", title: "THE BIRTH OF WONDER", desc: "First crafted by Nabisco in Manhattan, sold in bulk tin cans for 30 cents a pound." },
          { year: "1952", title: "WILLIAM A. TURNIER EMBOSS", desc: "Design engineer William A. Turnier creates the 12 four-leaf clover pattern still stamped today." },
          { year: "1990s", title: "THE TWIST, LICK, DUNK", desc: "The campaign expands to over 100 countries, becoming a global childhood ritual." },
          { year: "TODAY", title: "STAY PLAYFUL", desc: "Limited drops, space vaults, and digital interactive rituals celebrate daily wonder." }
        ].map((t, i) => (
          <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 bg-white/5 rounded-3xl border border-white/10 hover:border-white/20 transition-colors">
            <span className="font-mono text-3xl sm:text-4xl font-black text-oreo-blue-cyan shrink-0">{t.year}</span>
            <div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-1">{t.title}</h3>
              <p className="text-xs sm:text-sm text-creme/75 leading-relaxed">{t.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Interactive Quiz */}
      <div className="p-8 sm:p-10 bg-white/5 border border-white/15 rounded-3xl text-center max-w-xl mx-auto backdrop-blur-xl">
        <span className="text-xs font-mono text-oreo-blue-cyan tracking-widest uppercase mb-1 block">INTERACTIVE TRIVIA</span>
        <h3 className="font-heading text-2xl sm:text-3xl font-black text-white mb-4">WHICH OREO ARCHETYPE ARE YOU?</h3>
        {!quizScore ? (
          <div className="space-y-3">
            <button onClick={() => { sound.playCrunch(); setQuizScore("THE GRANDMASTER TWISTER"); }} className="w-full p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-oreo-blue-primary/50 text-xs font-mono text-white text-left transition-all cursor-pointer">
              1. I always twist and inspect the smooth creme first
            </button>
            <button onClick={() => { sound.playDip(); setQuizScore("THE ZEN MILK DIPPER"); }} className="w-full p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-oreo-blue-primary/50 text-xs font-mono text-white text-left transition-all cursor-pointer">
              2. I immediately dunk in cold milk for 4 seconds
            </button>
            <button onClick={() => { sound.playCrunch(); setQuizScore("THE CRUNCH PURIST"); }} className="w-full p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-oreo-blue-primary/50 text-xs font-mono text-white text-left transition-all cursor-pointer">
              3. Straight to the double-cookie crunch bite
            </button>
          </div>
        ) : (
          <div>
            <div className="p-6 bg-gradient-to-r from-oreo-blue-primary to-oreo-blue-electric text-white font-heading font-black text-xl rounded-2xl mb-4 shadow-neon-blue animate-float-slow">
              🎉 YOUR BADGE: {quizScore}
            </div>
            <button onClick={() => setQuizScore(null)} className="text-xs font-mono text-white/50 hover:text-white uppercase tracking-wider cursor-pointer">
              RETAKE AUDIT ↺
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// --------------------------------------------------------------------------
// 11. MAIN APP ROOT (CONTINUOUS SCROLL + SCROLL-SPY NAVIGATION)
// --------------------------------------------------------------------------
function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [soundActive, setSoundActive] = useState(true);
  const [activeModalFlavor, setActiveModalFlavor] = useState(null);
  const [activeModalRecipe, setActiveModalRecipe] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const navItems = [
    { id: 'home', label: 'VIDEO' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'flavors', label: 'FLAVORS' },
    { id: 'twist', label: 'THE TWIST' },
    { id: 'recipes', label: 'RECIPES' },
    { id: 'about', label: 'HERITAGE' }
  ];

  // Smooth Scroll to Section
  const scrollToSection = (id) => {
    sound.playClick();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Scroll Spy to track active section in navigation
  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i];
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  const toggleSound = () => {
    const active = sound.toggle();
    setSoundActive(active);
  };

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      sound.playCrunch();
      setNewsletterSubscribed(true);
      setEmailInput('');
    }
  };

  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  }, [activeModalFlavor, activeModalRecipe]);

  return (
    <div className="relative min-h-screen bg-obsidian text-creme">
      {/* Ambient Particle Layer */}
      <ParticleCanvas />

      {/* Custom Magnetic Cursor */}
      <CustomCursor />

      {/* Floating Minimalist Aesthetic Header */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl z-40 py-2.5 px-6 rounded-full flex items-center justify-between transition-all backdrop-blur-xl bg-obsidian/75 border border-white/15 shadow-2xl">
        <button onClick={() => scrollToSection('home')} className="flex items-center gap-2.5 group focus:outline-none cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-oreo-dark border-2 border-oreo-blue-electric flex items-center justify-center shadow-neon-blue group-hover:rotate-45 transition-transform duration-500">
            <span className="text-[10px] font-black text-white">O</span>
          </div>
          <span className="font-heading font-black text-lg md:text-xl text-white tracking-wider">OREO<span className="text-oreo-blue-electric">.</span></span>
        </button>

        <nav className="hidden lg:flex items-center gap-1 bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-1.5 rounded-full">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-3.5 py-1 rounded-full font-heading text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${activeSection === item.id ? 'bg-oreo-blue-electric text-white shadow-neon-blue' : 'text-white/70 hover:text-white'}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Sound Synthesizer Toggle */}
          <button 
            onClick={toggleSound} 
            className={`flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/15 backdrop-blur-lg sound-toggle-btn cursor-pointer ${soundActive ? 'active' : ''}`} 
            title="Toggle Procedural Audio"
          >
            <div className="sound-wave-icon flex items-center gap-[3px] h-3.5">
              <span className="bar bar-1"></span>
              <span className="bar bar-2"></span>
              <span className="bar bar-3"></span>
              <span className="bar bar-4"></span>
            </div>
          </button>

          <button 
            onClick={() => scrollToSection('twist')} 
            className="hidden sm:inline-flex px-5 py-2 rounded-full bg-gradient-to-r from-oreo-blue-primary to-oreo-blue-electric text-white text-xs font-bold tracking-wider uppercase shadow-neon-blue hover:scale-105 transition-all cursor-pointer"
          >
            TRY THE TWIST
          </button>

          {/* Mobile Menu Hamburger */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden flex flex-col justify-center items-center w-9 h-9 rounded-full bg-white/10 border border-white/15 cursor-pointer">
            <span className="w-4 h-0.5 bg-white mb-1"></span>
            <span className="w-4 h-0.5 bg-white mb-1"></span>
            <span className="w-2.5 h-0.5 bg-white ml-auto mr-2"></span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-50 bg-oreo-dark/95 backdrop-blur-2xl flex flex-col justify-between p-8 pt-24 transition-transform duration-500 lg:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col gap-6">
          {navItems.map((item, i) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-left font-heading text-3xl font-black tracking-tight text-white hover:text-oreo-blue-cyan cursor-pointer"
            >
              0{i + 1}. {item.label}
            </button>
          ))}
        </div>
        <button onClick={() => setMobileMenuOpen(false)} className="w-full py-4 rounded-full bg-white/10 text-white font-mono text-xs uppercase cursor-pointer">
          CLOSE MENU ✕
        </button>
      </div>

      {/* ================================================================ */}
      {/* SEAMLESS CONTINUOUS SCROLL CONTENT */}
      {/* ================================================================ */}
      <main className="relative z-20">
        {/* 1. First: 50-Frame Butter-Smooth Video Canvas Scrubber */}
        <CanvasFrameScrubber />

        {/* 2. Next: The 5-Step Experience Ritual */}
        <ExperienceSection onNavigate={scrollToSection} />

        {/* 3. Next: The Flavor Vault */}
        <FlavorsSection onSelectFlavor={(f) => setActiveModalFlavor(f)} />

        {/* 4. Next: Interactive Twist Sandbox */}
        <TwistSection />

        {/* 5. Next: Culinary Creations & Recipes */}
        <RecipesSection onSelectRecipe={(r) => setActiveModalRecipe(r)} />

        {/* 6. Next: Heritage & Wonder Timeline */}
        <AboutSection />
      </main>

      {/* Flavor Detail Modal */}
      {activeModalFlavor && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-oreo-dark/95 border border-white/20 rounded-3xl p-8 shadow-2xl">
            <button onClick={() => setActiveModalFlavor(null)} className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer">✕</button>
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <div 
                className="relative w-40 h-40 rounded-full overflow-hidden border-2 border-white/25 shadow-2xl shrink-0 bg-[#161311]" 
                style={{ boxShadow: `0 0 35px ${activeModalFlavor.accentGlow}` }}
              >
                <img src={activeModalFlavor.image} alt={activeModalFlavor.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col gap-2 text-left">
                <span className="text-xs font-mono tracking-widest uppercase" style={{ color: activeModalFlavor.color }}>{activeModalFlavor.tagline}</span>
                <h3 className="font-heading text-3xl font-black text-white">{activeModalFlavor.name}</h3>
                <p className="text-xs text-creme/80 leading-relaxed">{activeModalFlavor.description}</p>
                
                <div className="grid grid-cols-2 gap-3 mt-3 text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-white/50 block text-[10px]">SWEETNESS</span>
                    <span className="text-white font-bold">{activeModalFlavor.sweetness}%</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-white/50 block text-[10px]">COCOA PROFILE</span>
                    <span className="text-white font-bold">{activeModalFlavor.cocoaIntensity}%</span>
                  </div>
                </div>

                <div className="mt-2 p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                  <span className="font-bold text-white block">PAIRING RECOMMENDATION</span>
                  <span className="text-creme/70">{activeModalFlavor.pairWith}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recipe Detail Modal */}
      {activeModalRecipe && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-oreo-dark/95 border border-white/20 rounded-3xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button onClick={() => setActiveModalRecipe(null)} className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer">✕</button>
            <div className="flex flex-col gap-4 text-left">
              <div className="relative h-56 w-full rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                <img src={activeModalRecipe.image} alt={activeModalRecipe.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-oreo-dark via-transparent to-transparent"></div>
                <span className="absolute bottom-3 left-4 px-3 py-1 rounded-full bg-obsidian/85 backdrop-blur-md text-xs font-mono text-oreo-blue-cyan border border-white/15 font-bold">
                  {activeModalRecipe.servings} &bull; {activeModalRecipe.prepTime}
                </span>
              </div>
              <span className="text-xs font-mono text-oreo-blue-cyan uppercase font-bold">{activeModalRecipe.tagline}</span>
              <h3 className="font-heading text-3xl font-black text-white">{activeModalRecipe.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                  <h4 className="font-heading font-bold text-white mb-3">INGREDIENTS</h4>
                  <ul className="text-xs space-y-2 text-creme/80">
                    {activeModalRecipe.ingredients.map((ing, i) => (
                      <li key={i} className="flex items-center gap-2">✓ {ing}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-white mb-3">DIRECTIONS</h4>
                  <div className="space-y-3 text-xs text-creme/80">
                    {activeModalRecipe.steps.map((st, i) => (
                      <p key={i}><strong className="text-white">Step {i + 1}:</strong> {st}</p>
                    ))}
                  </div>
                  {activeModalRecipe.chefTip && (
                    <div className="mt-4 p-3 bg-oreo-blue-electric/10 border border-oreo-blue-cyan/30 rounded-xl text-xs">
                      <strong className="text-oreo-blue-cyan block">CHEF'S SECRET:</strong>
                      <span className="text-creme/80">{activeModalRecipe.chefTip}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Cinematic Footer */}
      <footer id="footer" className="relative bg-black border-t border-white/10 pt-24 pb-16 px-6 md:px-16 text-center">
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="font-heading text-5xl md:text-8xl font-black text-white mb-6 tracking-tight">
            TWIST. DIP. <span className="text-transparent bg-clip-text bg-gradient-to-r from-oreo-blue-electric via-white to-creme">LOVE.</span>
          </h2>
          <p className="text-sm sm:text-base text-creme/70 max-w-lg mx-auto mb-8">
            Join millions who celebrate the daily ritual of wonder. Milk cold, cookies ready.
          </p>

          {/* Newsletter Club */}
          <form onSubmit={handleNewsletter} className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email for limited drops..."
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-xs text-white placeholder-white/40 focus:outline-none focus:border-oreo-blue-cyan"
            />
            <button type="submit" className="px-6 py-3 rounded-full bg-oreo-blue-electric text-white text-xs font-bold font-heading uppercase hover:bg-oreo-blue-cyan hover:text-obsidian transition-colors cursor-pointer">
              JOIN
            </button>
          </form>
          {newsletterSubscribed && (
            <p className="text-xs font-mono text-oreo-blue-cyan mt-3">✨ WELCOME TO THE OREO WONDER CLUB!</p>
          )}
        </div>

        {/* Footer Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs font-mono text-white/50 mb-12">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => scrollToSection(item.id)} className="hover:text-white uppercase transition-colors cursor-pointer">
              {item.label}
            </button>
          ))}
          <button onClick={() => scrollToSection('home')} className="hover:text-white uppercase text-oreo-blue-cyan cursor-pointer">
            TOP ↑
          </button>
        </div>

        <p className="text-xs font-mono text-white/40">&copy; 2026 OREO &bull; INTERACTIVE DIGITAL CAMPAIGN EXPERIENCE</p>
      </footer>
    </div>
  );
}

// --------------------------------------------------------------------------
// 12. MOUNT REACT ROOT
// --------------------------------------------------------------------------
function mountOreoApp() {
  const rootEl = document.getElementById('root');
  if (!rootEl) return;
  try {
    const root = ReactDOM.createRoot(rootEl);
    root.render(<App />);
  } catch (err) {
    console.error("Mount error:", err);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountOreoApp);
} else {
  mountOreoApp();
}
