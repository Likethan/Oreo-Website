// ==========================================================================
// PAGE 2: THE OREO EXPERIENCE — 5-STAGE VERTICAL NARRATIVE
// Features: 01 Pick, 02 Twist, 03 See Creme, 04 Dip, 05 Enjoy + Ritual Selector
// ==========================================================================

import { sound } from '../soundEngine.js';

export function renderExperience(container) {
  container.innerHTML = `
    <!-- EXPERIENCE HERO -->
    <section class="relative pt-36 pb-16 px-6 md:px-16 text-center bg-gradient-to-b from-obsidian via-oreo-dark to-obsidian overflow-hidden">
      <!-- Ambient Lights -->
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-oreo-blue-electric/20 rounded-full blur-[140px] pointer-events-none"></div>

      <div class="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        <span class="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-oreo-blue-cyan uppercase tracking-widest mb-4">
          <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
          <span>WELCOME TO THE RITUAL</span>
        </span>
        <h1 class="font-heading text-5xl sm:text-7xl font-black text-white tracking-tight mb-4">
          THE OREO EXPERIENCE
        </h1>
        <p class="text-xl sm:text-2xl text-creme/80 font-light tracking-wide max-w-xl">
          A little ritual. <span class="text-white font-semibold">A lot of magic.</span>
        </p>
      </div>
    </section>

    <!-- STORY PHILOSOPHY -->
    <section class="py-16 px-6 md:px-16 bg-obsidian text-center">
      <div class="max-w-4xl mx-auto reveal-up">
        <span class="text-xs font-mono tracking-widest text-oreo-blue-electric uppercase mb-3 block">THE PHILOSOPHY</span>
        <h2 class="font-heading text-4xl sm:text-6xl font-black text-white mb-6">
          MORE THAN A COOKIE.<br>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-white via-creme to-oreo-blue-cyan">IT'S A RITUAL.</span>
        </h2>
        <p class="text-creme/75 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          Since 1912, the world has shared a singular childhood wonder: holding two chocolate embossed wafers, twisting with anticipation, and tasting pure creamy perfection.
        </p>
      </div>
    </section>

    <!-- 5-STAGE VERTICAL STORYTELLING TIMELINE -->
    <section class="relative py-20 px-6 md:px-16 bg-obsidian">
      <div class="max-w-5xl mx-auto flex flex-col gap-28 relative">
        
        <!-- Center Connecting Line Track (Desktop) -->
        <div class="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-white/10 rounded-full overflow-hidden">
          <div id="experience-timeline-fill" class="w-full bg-gradient-to-b from-oreo-blue-electric via-oreo-blue-cyan to-flavor-strawberry h-0 transition-all duration-300 shadow-neon-blue"></div>
        </div>

        <!-- STAGE 01: PICK IT UP -->
        <div class="experience-stage-row reveal-up flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div class="w-full md:w-1/2 text-left md:text-right order-2 md:order-1">
            <span class="text-xs font-mono tracking-widest text-oreo-blue-cyan uppercase block mb-2">STAGE 01</span>
            <h2 class="font-heading text-3xl sm:text-4xl font-black text-white mb-4">PICK IT UP</h2>
            <p class="text-creme/75 text-base leading-relaxed">
              Feel the iconic embossed relief designed in 1952. Two rich dark cocoa biscuits engineered with the exact density to hold sweet vanilla cream.
            </p>
          </div>
          <!-- Visual -->
          <div class="w-full md:w-1/2 flex justify-center order-1 md:order-2">
            <div class="relative w-64 h-64 rounded-full bg-white/5 border border-white/15 backdrop-blur-xl flex items-center justify-center p-6 group hover:border-oreo-blue-electric transition-all duration-500 animate-float-slow">
              <div class="w-44 h-44 rounded-full bg-gradient-to-br from-[#26211D] to-[#0A0908] border-2 border-white/20 shadow-2xl flex items-center justify-center relative group-hover:scale-105 transition-transform">
                <div class="cookie-emboss-pattern"></div>
              </div>
              <span class="absolute -bottom-3 px-4 py-1 rounded-full bg-oreo-blue-primary text-[10px] font-mono tracking-widest uppercase border border-white/20">TACTILE EMBOSS</span>
            </div>
          </div>
        </div>

        <!-- STAGE 02: TWIST IT -->
        <div class="experience-stage-row reveal-up flex flex-col md:flex-row items-center gap-12 relative z-10">
          <!-- Visual -->
          <div class="w-full md:w-1/2 flex justify-center">
            <div id="exp-twist-card" class="relative w-72 h-72 rounded-3xl bg-white/5 border border-white/15 backdrop-blur-xl flex items-center justify-center cursor-pointer group hover:border-oreo-blue-cyan transition-all" data-cursor-label="CLICK TO TWIST">
              <!-- Split Cookie Graphic -->
              <div class="relative w-48 h-48 flex items-center justify-center">
                <div id="exp-split-top" class="absolute w-40 h-40 rounded-full bg-[#181512] border border-white/20 shadow-2xl flex items-center justify-center -translate-x-4 -translate-y-4 group-hover:-translate-x-8 group-hover:-translate-y-8 group-hover:-rotate-12 transition-all duration-500">
                  <span class="text-xs font-black text-white/30 tracking-widest">TOP</span>
                </div>
                <div id="exp-split-creme" class="absolute w-36 h-36 rounded-full bg-white shadow-neon-blue flex items-center justify-center scale-95 group-hover:scale-110 transition-transform duration-500">
                  <span class="text-[10px] font-mono font-bold text-oreo-dark uppercase">CREME</span>
                </div>
              </div>
              <span class="absolute -bottom-3 px-4 py-1 rounded-full bg-oreo-blue-electric text-[10px] font-mono tracking-widest uppercase border border-white/20">INTERACTIVE SPLIT</span>
            </div>
          </div>
          <div class="w-full md:w-1/2 text-left">
            <span class="text-xs font-mono tracking-widest text-oreo-blue-cyan uppercase block mb-2">STAGE 02</span>
            <h2 class="font-heading text-3xl sm:text-4xl font-black text-white mb-4">TWIST IT</h2>
            <p class="text-creme/75 text-base leading-relaxed">
              With a gentle counter-rotational twist, the top wafer breaks free. Listen closely for the signature microscopic snap that signals the creme is ready.
            </p>
          </div>
        </div>

        <!-- STAGE 03: SEE THE CREME -->
        <div class="experience-stage-row reveal-up flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div class="w-full md:w-1/2 text-left md:text-right order-2 md:order-1">
            <span class="text-xs font-mono tracking-widest text-oreo-blue-cyan uppercase block mb-2">STAGE 03</span>
            <h2 class="font-heading text-3xl sm:text-4xl font-black text-white mb-4">SEE THE CREME</h2>
            <p class="text-creme/75 text-base leading-relaxed">
              The debate of the century: which side does the creme stay on? Silky smooth, sweetened with real vanilla notes, spread with culinary precision.
            </p>
          </div>
          <!-- Visual -->
          <div class="w-full md:w-1/2 flex justify-center order-1 md:order-2">
            <div class="relative w-64 h-64 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl flex items-center justify-center p-4 shadow-neon-blue">
              <div class="w-48 h-48 rounded-full bg-gradient-to-br from-white via-[#faf9f5] to-[#ece8d9] shadow-2xl flex flex-col items-center justify-center text-center p-4 text-obsidian border-4 border-white/40">
                <i data-lucide="sparkles" class="w-6 h-6 text-oreo-blue-electric mb-1"></i>
                <span class="font-heading font-black text-lg tracking-wider">SILKY VANILLA</span>
                <span class="text-[10px] font-mono uppercase text-black/60">PURE ESSENCE</span>
              </div>
            </div>
          </div>
        </div>

        <!-- STAGE 04: DIP IT -->
        <div class="experience-stage-row reveal-up flex flex-col md:flex-row items-center gap-12 relative z-10">
          <!-- Visual -->
          <div class="w-full md:w-1/2 flex justify-center">
            <div class="relative w-72 h-72 rounded-3xl bg-white/5 border border-white/15 backdrop-blur-xl flex items-center justify-center overflow-hidden group">
              <!-- Virtual Milk Glass with Ripple -->
              <div class="milk-glass-container relative flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                <div class="milk-surface-wave"></div>
                <div class="relative z-10 w-24 h-24 rounded-full bg-[#181512] border-2 border-white/50 shadow-2xl group-hover:translate-y-4 transition-transform duration-500 flex items-center justify-center">
                  <span class="text-[9px] font-bold text-white tracking-widest uppercase">OREO</span>
                </div>
              </div>
              <span class="absolute -bottom-3 px-4 py-1 rounded-full bg-oreo-blue-midnight text-[10px] font-mono tracking-widest uppercase border border-white/20">MILK DUNK</span>
            </div>
          </div>
          <div class="w-full md:w-1/2 text-left">
            <span class="text-xs font-mono tracking-widest text-oreo-blue-cyan uppercase block mb-2">STAGE 04</span>
            <h2 class="font-heading text-3xl sm:text-4xl font-black text-white mb-4">DIP IT</h2>
            <p class="text-creme/75 text-base leading-relaxed">
              Submerge for 3 to 5 seconds. The cold milk infiltrates the porous cocoa matrix, converting crisp biscuit into an ethereal melt-in-mouth confection.
            </p>
          </div>
        </div>

        <!-- STAGE 05: ENJOY IT -->
        <div class="experience-stage-row reveal-up flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div class="w-full md:w-1/2 text-left md:text-right order-2 md:order-1">
            <span class="text-xs font-mono tracking-widest text-flavor-strawberry uppercase block mb-2">STAGE 05</span>
            <h2 class="font-heading text-3xl sm:text-4xl font-black text-white mb-4">ENJOY IT</h2>
            <p class="text-creme/75 text-base leading-relaxed">
              Take the first bite. The crunch, the creamy softness, and the rich chocolate bouquet awaken your inner child. Pure timeless joy.
            </p>
          </div>
          <!-- Visual -->
          <div class="w-full md:w-1/2 flex justify-center order-1 md:order-2">
            <div class="relative w-64 h-64 rounded-full bg-gradient-to-br from-oreo-blue-electric/20 to-flavor-strawberry/20 border border-white/20 backdrop-blur-xl flex items-center justify-center p-6 shadow-neon-blue">
              <div class="w-44 h-44 rounded-full bg-gradient-to-tr from-oreo-blue-primary via-oreo-blue-electric to-flavor-strawberry flex flex-col items-center justify-center text-center text-white shadow-2xl animate-float-delayed">
                <i data-lucide="heart" class="w-8 h-8 text-white mb-2 animate-pulse"></i>
                <span class="font-heading font-black text-xl tracking-wider">PURE JOY</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- INTERACTIVE RITUAL SIMULATOR: HOW DO YOU OREO? -->
    <section class="py-28 px-6 md:px-16 bg-gradient-to-b from-obsidian via-oreo-dark/90 to-black text-center border-t border-white/10">
      <div class="max-w-4xl mx-auto flex flex-col items-center">
        <span class="text-xs font-mono tracking-widest text-oreo-blue-cyan uppercase mb-3 block">INTERACTIVE SELECTOR</span>
        <h2 class="font-heading text-4xl sm:text-6xl font-black text-white tracking-tight mb-4">
          HOW DO YOU OREO?
        </h2>
        <p class="text-creme/75 text-base sm:text-lg mb-10 max-w-lg">
          Choose your personal ritual style below to see your cookie respond with custom animation and sound.
        </p>

        <!-- Ritual Option Buttons -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl mb-12">
          <button class="ritual-choice-btn p-5 rounded-2xl bg-white/5 border border-white/15 hover:border-oreo-blue-cyan backdrop-blur-md flex flex-col items-center gap-2 group transition-all" data-ritual="twist">
            <i data-lucide="repeat" class="w-6 h-6 text-oreo-blue-cyan group-hover:rotate-180 transition-transform duration-500"></i>
            <span class="font-heading font-bold text-sm text-white">THE TWIST</span>
            <span class="text-[10px] font-mono text-white/50">Creme First</span>
          </button>

          <button class="ritual-choice-btn p-5 rounded-2xl bg-white/5 border border-white/15 hover:border-oreo-blue-cyan backdrop-blur-md flex flex-col items-center gap-2 group transition-all" data-ritual="dip">
            <i data-lucide="droplet" class="w-6 h-6 text-white group-hover:scale-125 transition-transform duration-300"></i>
            <span class="font-heading font-bold text-sm text-white">THE DIP</span>
            <span class="text-[10px] font-mono text-white/50">Quick Submerge</span>
          </button>

          <button class="ritual-choice-btn p-5 rounded-2xl bg-white/5 border border-white/15 hover:border-oreo-blue-cyan backdrop-blur-md flex flex-col items-center gap-2 group transition-all" data-ritual="dunk">
            <i data-lucide="waves" class="w-6 h-6 text-oreo-blue-electric group-hover:translate-y-1 transition-transform duration-300"></i>
            <span class="font-heading font-bold text-sm text-white">THE DUNK</span>
            <span class="text-[10px] font-mono text-white/50">Deep Soak</span>
          </button>

          <button class="ritual-choice-btn p-5 rounded-2xl bg-white/5 border border-white/15 hover:border-oreo-blue-cyan backdrop-blur-md flex flex-col items-center gap-2 group transition-all" data-ritual="bite">
            <i data-lucide="zap" class="w-6 h-6 text-flavor-golden group-hover:scale-125 transition-transform duration-300"></i>
            <span class="font-heading font-bold text-sm text-white">THE BITE</span>
            <span class="text-[10px] font-mono text-white/50">Instant Crunch</span>
          </button>
        </div>

        <!-- Dynamic Feedback Display Area -->
        <div id="ritual-feedback-box" class="w-full max-w-lg p-8 rounded-3xl bg-white/5 border border-white/20 backdrop-blur-xl flex flex-col items-center text-center transition-all duration-300">
          <div id="ritual-anim-target" class="w-32 h-32 rounded-full bg-gradient-to-br from-[#26211D] to-[#0A0908] border-2 border-white/30 shadow-2xl flex items-center justify-center mb-4 transition-all duration-500">
            <span class="font-heading font-black text-white/40 tracking-widest text-sm">OREO</span>
          </div>
          <h3 id="ritual-feedback-title" class="font-heading text-2xl font-bold text-white mb-2">Select a ritual above</h3>
          <p id="ritual-feedback-desc" class="text-sm text-creme/70">Discover how your personality connects with the world's most beloved cookie ritual.</p>
        </div>

        <div class="mt-12">
          <a href="#flavors" class="px-8 py-4 rounded-full bg-gradient-to-r from-oreo-blue-primary to-oreo-blue-electric text-white font-heading font-bold text-xs uppercase tracking-widest hover:shadow-neon-blue transition-all">
            NOW CHOOSE YOUR FLAVOR →
          </a>
        </div>
      </div>
    </section>
  `;

  setupRitualSelector();
}

function setupRitualSelector() {
  const buttons = document.querySelectorAll('.ritual-choice-btn');
  const target = document.getElementById('ritual-anim-target');
  const title = document.getElementById('ritual-feedback-title');
  const desc = document.getElementById('ritual-feedback-desc');

  const ritualData = {
    twist: {
      title: "THE TWIST PURIST",
      desc: "You are analytical, methodical, and believe the journey is just as sweet as the destination. You savor every layer.",
      sound: () => sound.playTwist(1.0),
      animClass: "rotate-45 scale-110 border-oreo-blue-cyan"
    },
    dip: {
      title: "THE QUICK DIPPER",
      desc: "You know exact balance. 3 seconds in cold milk for that optimal soft crunch harmony. Never soggy, always perfect.",
      sound: () => sound.playDip(),
      animClass: "translate-y-3 scale-95 border-white shadow-neon-blue"
    },
    dunk: {
      title: "THE DEEP DUNKER",
      desc: "Bold and patient. You let the bubbles rise until the cookie becomes a rich chocolate-milk cloud that melts effortlessly.",
      sound: () => sound.playDip(),
      animClass: "scale-90 opacity-90 border-oreo-blue-electric"
    },
    bite: {
      title: "THE CRUNCH REBEL",
      desc: "Direct, confident, and action-oriented! No waiting around — just straight to the legendary dual-texture crunch.",
      sound: () => sound.playCrunch(),
      animClass: "scale-105 border-flavor-golden rotate-6"
    }
  };

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const ritualKey = btn.getAttribute('data-ritual');
      const data = ritualData[ritualKey];
      if (!data) return;

      buttons.forEach(b => b.classList.remove('border-oreo-blue-cyan', 'bg-oreo-blue-primary/40'));
      btn.classList.add('border-oreo-blue-cyan', 'bg-oreo-blue-primary/40');

      data.sound();

      if (title) title.textContent = data.title;
      if (desc) desc.textContent = data.desc;

      if (target) {
        target.className = `w-32 h-32 rounded-full bg-gradient-to-br from-[#26211D] to-[#0A0908] border-2 shadow-2xl flex items-center justify-center mb-4 transition-all duration-500 ${data.animClass}`;
      }
    });
  });
}
