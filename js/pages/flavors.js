// ==========================================================================
// PAGE 3: FLAVORS — INTERACTIVE FLAVOR GALLERY
// Features: Dynamic ambient shifts, 3D card tilt, cinematic modal detail view
// ==========================================================================

import { sound } from '../soundEngine.js';

export const FLAVORS_DATA = [
  {
    id: "original",
    name: "ORIGINAL OREO",
    tagline: "The Timeless Classic",
    color: "#0070F3",
    accentGlow: "rgba(0, 112, 243, 0.4)",
    waferColor: "#181512",
    cremeColor: "#FFFFFF",
    description: "The iconic sandwich cookie that started a global ritual in 1912. Rich chocolate cocoa wafers filled with our signature smooth vanilla sweet creme.",
    tastingNotes: ["Bittersweet Dutch Cocoa", "Velvety Vanilla", "Signature Snap"],
    sweetness: 85,
    cocoaIntensity: 90,
    cremeRatio: "1x Standard",
    pairWith: "Ice-cold Whole Milk (3.5%)"
  },
  {
    id: "golden",
    name: "GOLDEN OREO",
    tagline: "Sunlit Vanilla Dream",
    color: "#E5B25D",
    accentGlow: "rgba(229, 178, 93, 0.4)",
    waferColor: "#D4A359",
    cremeColor: "#FFFFFF",
    description: "A luminous twist for vanilla lovers. Golden-baked, light and buttery vanilla biscuits embracing our legendary sweet creme core.",
    tastingNotes: ["Golden Biscuit", "Warm Madagascar Vanilla", "Subtle Butter Cream"],
    sweetness: 88,
    cocoaIntensity: 10,
    cremeRatio: "1x Standard",
    pairWith: "Oat Milk or Vanilla Latte"
  },
  {
    id: "double-stuf",
    name: "DOUBLE STUF",
    tagline: "Twice the Velvet Creme",
    color: "#00D4FF",
    accentGlow: "rgba(0, 212, 255, 0.45)",
    waferColor: "#181512",
    cremeColor: "#FFFFFF",
    description: "Engineered for creme devotees who crave maximum luxury. 200% more luscious vanilla creme packed between our classic cocoa wafers.",
    tastingNotes: ["Extra Silkiness", "Rich Cocoa Counterpoint", "Maximum Dip Soak"],
    sweetness: 95,
    cocoaIntensity: 80,
    cremeRatio: "2x Extra Thick",
    pairWith: "Chilled Heavy Cream Splash"
  },
  {
    id: "strawberry",
    name: "STRAWBERRY DELIGHT",
    tagline: "Summer Berry Bliss",
    color: "#FF4D79",
    accentGlow: "rgba(255, 77, 121, 0.45)",
    waferColor: "#181512",
    cremeColor: "#FF8DA1",
    description: "Sun-ripened strawberry essence swirled into dreamy sweet creme, nestled between dark chocolate cookies for a chocolate-dipped strawberry experience.",
    tastingNotes: ["Fresh Strawberries", "Fruity Brightness", "Dark Fudge Finish"],
    sweetness: 90,
    cocoaIntensity: 75,
    cremeRatio: "1x Standard",
    pairWith: "Iced Berry Herbal Tea or Almond Milk"
  },
  {
    id: "mint",
    name: "COOL MINT",
    tagline: "Crisp Refreshment",
    color: "#00E599",
    accentGlow: "rgba(0, 229, 153, 0.45)",
    waferColor: "#181512",
    cremeColor: "#5CE6B0",
    description: "An invigorating burst of cooling peppermint creme enveloped in rich cocoa wafers. Refreshing, sophisticated, and deeply satisfying.",
    tastingNotes: ["Cool Peppermint", "Dark Cocoa Harmony", "Crisp Alpine Finish"],
    sweetness: 82,
    cocoaIntensity: 85,
    cremeRatio: "1x Standard",
    pairWith: "Iced Cold Brew Coffee"
  },
  {
    id: "birthday",
    name: "BIRTHDAY CAKE",
    tagline: "Party in Every Bite",
    color: "#FF6584",
    accentGlow: "rgba(255, 101, 132, 0.45)",
    waferColor: "#181512",
    cremeColor: "#FFF275",
    description: "Celebration-ready sweet frosting creme studded with festive multi-colored rainbow confetti sprinkles between classic dark chocolate wafers.",
    tastingNotes: ["Birthday Frosting", "Confetti Crunch", "Celebration Sparkle"],
    sweetness: 98,
    cocoaIntensity: 70,
    cremeRatio: "1.5x Celebration",
    pairWith: "Sparkling Milk Float"
  }
];

export function renderFlavors(container) {
  container.innerHTML = `
    <!-- FLAVORS HERO -->
    <section class="relative pt-36 pb-16 px-6 md:px-16 text-center bg-gradient-to-b from-obsidian via-oreo-dark to-obsidian overflow-hidden">
      <!-- Dynamic Ambient Glow that reacts to hovered flavor -->
      <div id="flavors-ambient-glow" class="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-oreo-blue-electric/20 rounded-full blur-[160px] pointer-events-none transition-colors duration-700"></div>

      <div class="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        <span class="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-oreo-blue-cyan uppercase tracking-widest mb-4">
          <i data-lucide="compass" class="w-3.5 h-3.5"></i>
          <span>THE FLAVOR VAULT</span>
        </span>
        <h1 class="font-heading text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight mb-4">
          THERE'S AN OREO FOR EVERY MOOD.
        </h1>
        <p class="text-lg sm:text-xl text-creme/75 font-light tracking-wide max-w-xl">
          From the timeless original to vibrant berry fusions. Click any flavor to inspect tasting notes.
        </p>
      </div>
    </section>

    <!-- FLAVORS GRID GALLERY -->
    <section class="py-12 pb-28 px-6 md:px-16 bg-obsidian">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${FLAVORS_DATA.map((flavor) => `
          <div 
            class="flavor-card group" 
            style="--card-glow: ${flavor.accentGlow};"
            data-flavor-id="${flavor.id}"
            data-flavor-color="${flavor.color}"
            data-cursor-label="VIEW"
          >
            <!-- Top Tag -->
            <div class="flex items-center justify-between mb-8">
              <span class="text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full bg-white/10 text-white border border-white/10">
                ${flavor.tagline}
              </span>
              <span class="w-3 h-3 rounded-full" style="background-color: ${flavor.color}; box-shadow: 0 0 10px ${flavor.color};"></span>
            </div>

            <!-- Cookie 3D Visual Graphic -->
            <div class="flavor-cookie-visual mb-8 flex items-center justify-center">
              <div class="relative w-36 h-36 rounded-full flex items-center justify-center shadow-2xl">
                <!-- Top Cookie Wafer -->
                <div class="absolute inset-0 rounded-full border border-white/20 flex items-center justify-center" style="background: radial-gradient(circle at 35% 35%, #2a2420, ${flavor.waferColor} 70%, #0d0b0a 100%);">
                  <div class="cookie-emboss-pattern opacity-40"></div>
                </div>
                <!-- Creme Peek Ring -->
                <div class="absolute inset-2 rounded-full scale-105 opacity-90" style="background-color: ${flavor.cremeColor}; filter: drop-shadow(0 0 8px ${flavor.color});"></div>
              </div>
            </div>

            <!-- Typography & Description -->
            <div class="flex flex-col gap-2">
              <h3 class="font-heading text-2xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[${flavor.color}] transition-all">
                ${flavor.name}
              </h3>
              <p class="text-sm text-creme/70 line-clamp-2 leading-relaxed">
                ${flavor.description}
              </p>
            </div>

            <!-- Action Prompt -->
            <div class="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50 group-hover:text-white transition-colors">
              <span>EXPLORE PROFILE</span>
              <i data-lucide="arrow-up-right" class="w-4 h-4 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `;

  setupFlavorsInteractivity();
}

function setupFlavorsInteractivity() {
  const cards = document.querySelectorAll('.flavor-card');
  const ambientGlow = document.getElementById('flavors-ambient-glow');
  const modal = document.getElementById('flavor-modal');
  const modalContent = document.getElementById('flavor-modal-content');
  const closeBtn = modal?.querySelector('.modal-close-btn');

  cards.forEach((card) => {
    const flavorId = card.getAttribute('data-flavor-id');
    const color = card.getAttribute('data-flavor-color');
    const flavor = FLAVORS_DATA.find(f => f.id === flavorId);

    // Hover background color shift
    card.addEventListener('mouseenter', () => {
      if (ambientGlow) {
        ambientGlow.style.backgroundColor = color;
        ambientGlow.style.opacity = '0.35';
      }
    });

    card.addEventListener('mouseleave', () => {
      if (ambientGlow) {
        ambientGlow.style.backgroundColor = 'var(--oreo-blue-electric)';
        ambientGlow.style.opacity = '0.2';
      }
    });

    // Click to open flavor modal
    card.addEventListener('click', () => {
      if (!flavor || !modal || !modalContent) return;
      sound.playClick();

      modalContent.innerHTML = `
        <div class="flex flex-col md:flex-row gap-8 items-center">
          <!-- Left Visual Column -->
          <div class="w-full md:w-1/2 flex flex-col items-center justify-center p-6 bg-white/5 rounded-2xl border border-white/10">
            <div class="relative w-48 h-48 rounded-full flex items-center justify-center animate-spin-slow mb-6">
              <div class="w-40 h-40 rounded-full border-2 border-white/30 shadow-2xl flex items-center justify-center" style="background: radial-gradient(circle, #2a2420, ${flavor.waferColor} 80%, #0d0b0a);">
                <div class="cookie-emboss-pattern opacity-50"></div>
              </div>
              <div class="absolute inset-4 rounded-full -z-10" style="background-color: ${flavor.cremeColor}; filter: blur(4px);"></div>
            </div>
            <span class="text-xs font-mono tracking-widest text-white/50 uppercase">CREME RATIO: ${flavor.cremeRatio}</span>
          </div>

          <!-- Right Details Column -->
          <div class="w-full md:w-1/2 flex flex-col gap-4 text-left">
            <span class="text-xs font-mono tracking-widest uppercase" style="color: ${flavor.color}">${flavor.tagline}</span>
            <h2 class="font-heading text-3xl sm:text-4xl font-black text-white">${flavor.name}</h2>
            <p class="text-sm text-creme/80 leading-relaxed">${flavor.description}</p>

            <!-- Tasting Profile Bars -->
            <div class="flex flex-col gap-3 my-2 pt-3 border-t border-white/10 text-xs font-mono">
              <div>
                <div class="flex justify-between mb-1">
                  <span>SWEETNESS</span>
                  <span class="text-white font-bold">${flavor.sweetness}%</span>
                </div>
                <div class="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div class="h-full rounded-full" style="width: ${flavor.sweetness}%; background-color: ${flavor.color};"></div>
                </div>
              </div>

              <div>
                <div class="flex justify-between mb-1">
                  <span>COCOA INTENSITY</span>
                  <span class="text-white font-bold">${flavor.cocoaIntensity}%</span>
                </div>
                <div class="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div class="h-full bg-white rounded-full" style="width: ${flavor.cocoaIntensity}%;"></div>
                </div>
              </div>
            </div>

            <!-- Pairing Recommendation -->
            <div class="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center gap-3">
              <i data-lucide="milk" class="w-5 h-5 text-oreo-blue-cyan"></i>
              <div class="text-xs">
                <span class="font-bold text-white block">PAIRING RECOMMENDATION</span>
                <span class="text-creme/70">${flavor.pairWith}</span>
              </div>
            </div>

            <button class="mt-2 w-full py-3.5 rounded-full font-heading font-bold text-xs uppercase tracking-widest text-white shadow-neon-blue transition-transform hover:scale-102" style="background: linear-gradient(90deg, #00205B, ${flavor.color});">
              ADD TO MY RITUAL
            </button>
          </div>
        </div>
      `;

      if (window.lucide) window.lucide.createIcons();
      modal.classList.add('active');
    });
  });

  const closeModal = () => {
    if (modal) modal.classList.remove('active');
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
}
