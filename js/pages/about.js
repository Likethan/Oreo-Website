// ==========================================================================
// PAGE 6: ABOUT OREO — "THE COOKIE THAT BECAME A RITUAL"
// Features: Interactive heritage timeline, 1952 Emboss pattern inspector, Oreo Quiz
// ==========================================================================

import { sound } from '../soundEngine.js';

export function renderAbout(container) {
  container.innerHTML = `
    <!-- ABOUT HERO -->
    <section class="relative pt-36 pb-20 px-6 md:px-16 text-center bg-gradient-to-b from-obsidian via-oreo-dark to-obsidian overflow-hidden">
      <!-- Ambient Glow -->
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-oreo-blue-electric/20 rounded-full blur-[160px] pointer-events-none"></div>

      <div class="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        <span class="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-oreo-blue-cyan uppercase tracking-widest mb-4">
          <i data-lucide="history" class="w-3.5 h-3.5"></i>
          <span>OVER A CENTURY OF WONDER</span>
        </span>
        <h1 class="font-heading text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight mb-4">
          THE COOKIE THAT BECAME A RITUAL.
        </h1>
        <p class="text-lg sm:text-xl text-creme/75 font-light tracking-wide max-w-xl">
          From a bakery in Manhattan in 1912 to the world's favorite biscuit in over 100 countries.
        </p>
      </div>
    </section>

    <!-- HISTORICAL TIMELINE -->
    <section class="py-16 px-6 md:px-16 bg-obsidian relative">
      <div class="max-w-5xl mx-auto flex flex-col gap-20 relative">
        
        <!-- Timeline Line -->
        <div class="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-oreo-blue-electric via-white/20 to-transparent"></div>

        <!-- 1912: ORIGIN -->
        <div class="flex flex-col md:flex-row items-center gap-10 relative z-10">
          <div class="w-full md:w-1/2 text-left md:text-right">
            <span class="text-xs font-mono text-oreo-blue-cyan tracking-widest uppercase block mb-1">1912 — CHELSEA MARKET, NYC</span>
            <h2 class="font-heading text-3xl font-black text-white mb-3">THE BIRTH OF WONDER</h2>
            <p class="text-sm text-creme/70 leading-relaxed">
              First developed and produced by the National Biscuit Company (Nabisco) at its factory on Ninth Avenue in New York City. Sold in bulk tin cans for 30 cents a pound.
            </p>
          </div>
          <div class="w-full md:w-1/2 flex justify-center">
            <div class="w-56 h-56 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center shadow-neon-blue">
              <span class="font-mono text-5xl font-black text-white">1912</span>
              <span class="text-[10px] font-mono text-oreo-blue-cyan tracking-widest uppercase mt-2">ORIGINAL RECIPE</span>
            </div>
          </div>
        </div>

        <!-- 1952: EVOLUTION -->
        <div class="flex flex-col md:flex-row items-center gap-10 relative z-10">
          <div class="w-full md:w-1/2 flex justify-center order-2 md:order-1">
            <div class="w-56 h-56 rounded-full bg-gradient-to-br from-[#26211D] to-[#0A0908] border-2 border-white/20 shadow-2xl flex items-center justify-center relative p-6 animate-spin-slow">
              <div class="cookie-emboss-pattern"></div>
            </div>
          </div>
          <div class="w-full md:w-1/2 text-left order-1 md:order-2">
            <span class="text-xs font-mono text-flavor-golden tracking-widest uppercase block mb-1">1952 — THE ICONIC DESIGN</span>
            <h2 class="font-heading text-3xl font-black text-white mb-3">WILLIAM A. TURNIER EMBOSS</h2>
            <p class="text-sm text-creme/70 leading-relaxed">
              Design engineer William A. Turnier creates the timeless relief pattern featuring 12 four-leaf clovers, the cross of Lorraine, and concentric serrations still stamped onto every cookie today.
            </p>
          </div>
        </div>

        <!-- 1990s-2000s: CULTURE -->
        <div class="flex flex-col md:flex-row items-center gap-10 relative z-10">
          <div class="w-full md:w-1/2 text-left md:text-right">
            <span class="text-xs font-mono text-flavor-strawberry tracking-widest uppercase block mb-1">1990s — GLOBAL MOVEMENT</span>
            <h2 class="font-heading text-3xl font-black text-white mb-3">THE TWIST, LICK, DUNK</h2>
            <p class="text-sm text-creme/70 leading-relaxed">
              The ritual transcends cultures and languages. From Tokyo matcha editions to Latin American dulce de leche, Oreo becomes an international symbol of playful connection.
            </p>
          </div>
          <div class="w-full md:w-1/2 flex justify-center">
            <div class="w-56 h-56 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center shadow-neon-blue">
              <span class="font-heading text-3xl font-black text-white">100+</span>
              <span class="text-[10px] font-mono text-flavor-strawberry tracking-widest uppercase mt-2">NATIONS UNITED</span>
            </div>
          </div>
        </div>

        <!-- TODAY: INNOVATION -->
        <div class="flex flex-col md:flex-row items-center gap-10 relative z-10">
          <div class="w-full md:w-1/2 flex justify-center order-2 md:order-1">
            <div class="w-56 h-56 rounded-3xl bg-gradient-to-tr from-oreo-blue-primary to-oreo-blue-electric border border-white/20 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center shadow-neon-blue">
              <i data-lucide="sparkles" class="w-10 h-10 text-white mb-2 animate-bounce"></i>
              <span class="font-heading text-2xl font-black text-white">FUTURE OF PLAY</span>
            </div>
          </div>
          <div class="w-full md:w-1/2 text-left order-1 md:order-2">
            <span class="text-xs font-mono text-oreo-blue-cyan tracking-widest uppercase block mb-1">TODAY — DIGITAL CAMPAIGNS</span>
            <h2 class="font-heading text-3xl font-black text-white mb-3">STAY PLAYFUL</h2>
            <p class="text-sm text-creme/70 leading-relaxed">
              Pop culture collaborations, space vault vaults, digital interactive web campaigns, and culinary innovations continue to inspire generations of cookie dreamers.
            </p>
          </div>
        </div>

      </div>
    </section>

    <!-- INTERACTIVE OREO TRIVIA & PERSONALITY QUIZ -->
    <section class="py-24 px-6 md:px-16 bg-gradient-to-b from-obsidian via-oreo-dark/90 to-black text-center border-t border-white/10">
      <div class="max-w-3xl mx-auto flex flex-col items-center">
        <span class="text-xs font-mono tracking-widest text-oreo-blue-cyan uppercase mb-3 block">INTERACTIVE PERSONALITY DISCOVERY</span>
        <h2 class="font-heading text-4xl sm:text-5xl font-black text-white mb-4">
          WHICH OREO RITUAL ARE YOU?
        </h2>
        <p class="text-creme/75 text-sm sm:text-base mb-10 max-w-md">
          Answer a quick 2-question personality check to reveal your ultimate Oreo ritual badge.
        </p>

        <!-- Quiz Container -->
        <div id="oreo-quiz-box" class="w-full bg-white/5 border border-white/15 rounded-3xl p-6 sm:p-10 backdrop-blur-xl text-left">
          
          <div id="quiz-question-1" class="quiz-step flex flex-col gap-4">
            <span class="text-xs font-mono text-oreo-blue-cyan uppercase tracking-wider">QUESTION 01 OF 02</span>
            <h3 class="font-heading text-xl sm:text-2xl font-bold text-white">When you open a brand new pack of Oreos, what is your first instinct?</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              <button class="quiz-option-btn" data-score="twist">
                <span>Carefully twist open the first cookie</span>
                <i data-lucide="chevron-right" class="w-4 h-4 text-white/40"></i>
              </button>
              <button class="quiz-option-btn" data-score="dip">
                <span>Pour a fresh glass of ice-cold milk immediately</span>
                <i data-lucide="chevron-right" class="w-4 h-4 text-white/40"></i>
              </button>
              <button class="quiz-option-btn" data-score="stack">
                <span>Stack 3 cookies together for a mega bite</span>
                <i data-lucide="chevron-right" class="w-4 h-4 text-white/40"></i>
              </button>
              <button class="quiz-option-btn" data-score="share">
                <span>Offer cookies to friends and family first</span>
                <i data-lucide="chevron-right" class="w-4 h-4 text-white/40"></i>
              </button>
            </div>
          </div>

          <div id="quiz-question-2" class="quiz-step hidden flex flex-col gap-4">
            <span class="text-xs font-mono text-oreo-blue-cyan uppercase tracking-wider">QUESTION 02 OF 02</span>
            <h3 class="font-heading text-xl sm:text-2xl font-bold text-white">How do you describe your personality when trying new things?</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              <button class="quiz-option-btn" data-final="master">
                <span>Methodical, artistic, detail-driven perfectionist</span>
                <i data-lucide="sparkles" class="w-4 h-4 text-white/40"></i>
              </button>
              <button class="quiz-option-btn" data-final="dipper">
                <span>Relaxed, smooth, enjoys timeless classics</span>
                <i data-lucide="sparkles" class="w-4 h-4 text-white/40"></i>
              </button>
              <button class="quiz-option-btn" data-final="innovator">
                <span>Experimental, playful, always pushing boundaries</span>
                <i data-lucide="sparkles" class="w-4 h-4 text-white/40"></i>
              </button>
              <button class="quiz-option-btn" data-final="heart">
                <span>Joyful, warm, brings everyone together</span>
                <i data-lucide="sparkles" class="w-4 h-4 text-white/40"></i>
              </button>
            </div>
          </div>

          <!-- Result Container -->
          <div id="quiz-result" class="quiz-step hidden text-center flex flex-col items-center py-4">
            <div class="w-20 h-20 rounded-full bg-oreo-blue-electric flex items-center justify-center shadow-neon-blue mb-4">
              <i data-lucide="award" class="w-10 h-10 text-white"></i>
            </div>
            <span class="text-xs font-mono text-oreo-blue-cyan uppercase tracking-widest">YOUR RITUAL ARCHETYPE</span>
            <h3 id="quiz-badge-title" class="font-heading text-3xl font-black text-white mt-1 mb-2">THE OREO GRANDMASTER</h3>
            <p id="quiz-badge-desc" class="text-sm text-creme/80 max-w-md mb-6 leading-relaxed">
              You honor the timeless craft of the twist, savor the creme with culinary appreciation, and never rush the dunk.
            </p>
            <button id="quiz-restart-btn" class="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono tracking-widest text-white uppercase border border-white/20 transition-colors">
              RETAKE QUIZ ↺
            </button>
          </div>

        </div>
      </div>
    </section>

    <!-- GRAND FINALE BANNER -->
    <section class="py-28 px-6 md:px-16 text-center bg-black relative overflow-hidden">
      <div class="max-w-4xl mx-auto flex flex-col items-center relative z-10">
        <h2 class="font-heading text-5xl sm:text-7xl font-black text-white mb-6">
          KEEP TWISTING.
        </h2>
        <p class="text-creme/75 text-base sm:text-lg mb-10 max-w-md">
          Rediscover the wonder every single day.
        </p>

        <a href="#experience" class="px-10 py-5 rounded-full bg-gradient-to-r from-oreo-blue-primary via-oreo-blue-electric to-oreo-blue-cyan text-white font-heading font-bold text-sm tracking-widest uppercase shadow-neon-blue hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20 magnetic-btn flex items-center gap-3">
          <span>BACK TO THE OREO EXPERIENCE</span>
          <i data-lucide="sparkles" class="w-4 h-4"></i>
        </a>
      </div>
    </section>
  `;

  setupQuizLogic();
}

function setupQuizLogic() {
  const q1 = document.getElementById('quiz-question-1');
  const q2 = document.getElementById('quiz-question-2');
  const result = document.getElementById('quiz-result');
  const badgeTitle = document.getElementById('quiz-badge-title');
  const badgeDesc = document.getElementById('quiz-badge-desc');
  const restartBtn = document.getElementById('quiz-restart-btn');

  const q1Btns = q1?.querySelectorAll('.quiz-option-btn');
  const q2Btns = q2?.querySelectorAll('.quiz-option-btn');

  const outcomes = {
    master: {
      title: "THE OREO GRANDMASTER 👑",
      desc: "You honor the timeless craft of the twist, savor the creme with culinary appreciation, and never rush the dunk. A true legend of the biscuit world!"
    },
    dipper: {
      title: "THE ZEN MILK DIPPER 🥛",
      desc: "Calm, composed, and patient. You know the exact 4.2 seconds needed for the milk to transform the wafer into an ethereal chocolate cloud."
    },
    innovator: {
      title: "THE FLAVOR ALCHEMIST ⚡",
      desc: "Rules are meant to be rewritten! You blend Oreos into mug cakes, freeze them into ice cream gelato towers, and invent new rituals on the fly."
    },
    heart: {
      title: "THE JOY SPREADER 💖",
      desc: "For you, the Oreo is a bond of friendship. You love sharing packs, twisting together with friends, and lighting up the room with sweet smiles."
    }
  };

  q1Btns?.forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playClick();
      if (q1) q1.classList.add('hidden');
      if (q2) q2.classList.remove('hidden');
      if (window.lucide) window.lucide.createIcons();
    });
  });

  q2Btns?.forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playCrunch();
      const finalKey = btn.getAttribute('data-final') || 'master';
      const data = outcomes[finalKey] || outcomes.master;

      if (badgeTitle) badgeTitle.textContent = data.title;
      if (badgeDesc) badgeDesc.textContent = data.desc;

      if (q2) q2.classList.add('hidden');
      if (result) result.classList.remove('hidden');
      if (window.lucide) window.lucide.createIcons();
    });
  });

  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      sound.playClick();
      if (result) result.classList.add('hidden');
      if (q2) q2.classList.add('hidden');
      if (q1) q1.classList.remove('hidden');
    });
  }
}
