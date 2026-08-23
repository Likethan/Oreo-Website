// ==========================================================================
// PAGE 4: THE TWIST — FULL-SCREEN INTERACTIVE OREO PLAYGROUND
// Features: Full drag physics, angular momentum, cream stretch, "PERFECT", milk dunk
// ==========================================================================

import { sound } from '../soundEngine.js';

export function renderTwist(container) {
  container.innerHTML = `
    <section class="relative min-h-screen pt-28 pb-16 px-6 md:px-12 flex flex-col items-center justify-between bg-gradient-to-b from-obsidian via-oreo-dark to-obsidian overflow-hidden select-none">
      <!-- Ambient Lighting -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-oreo-blue-electric/15 rounded-full blur-[180px] pointer-events-none"></div>

      <!-- Top Header & Instructions -->
      <div class="relative z-10 text-center max-w-2xl mx-auto flex flex-col items-center">
        <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-oreo-blue-cyan uppercase tracking-widest mb-3">
          <i data-lucide="gamepad-2" class="w-3.5 h-3.5"></i>
          <span>EXPERIMENTAL INTERACTIVE LAB</span>
        </span>
        <h1 class="font-heading text-4xl sm:text-6xl font-black text-white tracking-tight">
          MASTER THE TWIST.
        </h1>
        <p id="twist-instruction-text" class="text-sm sm:text-base text-creme/75 mt-2 transition-all">
          Click and drag horizontally to twist the top cookie wafer and unlock the secret creme.
        </p>
      </div>

      <!-- MAIN INTERACTIVE STAGE -->
      <div class="relative z-10 my-auto flex flex-col items-center justify-center w-full max-w-xl">
        
        <!-- Celebration Milestone Overlay -->
        <div id="twist-milestone-banner" class="absolute -top-16 opacity-0 scale-50 transition-all duration-500 pointer-events-none flex flex-col items-center z-30">
          <span class="font-heading text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-oreo-blue-cyan via-white to-creme animate-bounce">
            PERFECT.
          </span>
          <span class="text-xs font-mono tracking-widest text-white/90 bg-oreo-blue-primary/80 px-4 py-1 rounded-full border border-white/20 uppercase mt-1">
            NOW DRAG DOWN TO DIP ↓
          </span>
        </div>

        <!-- 3D Interactive Cookie Element -->
        <div id="twist-sandbox-cookie" class="oreo-cookie-interactive w-72 h-72 sm:w-80 sm:h-80 relative cursor-grab active:cursor-grabbing" data-cursor-label="DRAG TO TWIST">
          <!-- Top Wafer -->
          <div id="twist-top-wafer" class="cookie-wafer-top absolute inset-0 z-10">
            <div class="cookie-emboss-pattern"></div>
          </div>
          <!-- Creme Layer with dynamic stretch -->
          <div id="twist-creme-layer" class="cookie-creme-layer absolute inset-2 z-5"></div>
          <!-- Bottom Wafer -->
          <div id="twist-bottom-wafer" class="cookie-wafer-bottom absolute inset-0 z-1"></div>
        </div>

        <!-- Milk Glass Target (Appears after Twist is achieved) -->
        <div id="twist-milk-target" class="relative mt-8 opacity-0 translate-y-12 transition-all duration-700 pointer-events-none flex flex-col items-center">
          <div class="milk-glass-container relative w-48 h-48 sm:w-56 sm:h-56">
            <div class="milk-surface-wave"></div>
            <div id="milk-splash-ring" class="absolute inset-0 flex items-center justify-center pointer-events-none"></div>
          </div>
          <span class="text-[10px] font-mono tracking-widest text-white/60 uppercase mt-3">GLASS OF ICE COLD MILK</span>
        </div>

      </div>

      <!-- BOTTOM TELEMETRY HUD -->
      <div class="relative z-10 w-full max-w-2xl bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-4 flex flex-wrap items-center justify-around gap-4 text-xs font-mono text-white/70">
        <div class="flex items-center gap-2">
          <span class="text-white/40">ROTATION:</span>
          <span id="hud-angle" class="text-white font-bold">0.0°</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-white/40">CREME EXPOSURE:</span>
          <span id="hud-exposure" class="text-oreo-blue-cyan font-bold">0%</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-white/40">STAGE:</span>
          <span id="hud-stage" class="text-flavor-golden font-bold">1/2 TWIST</span>
        </div>
        <button id="twist-reset-btn" class="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-[10px] uppercase transition-colors" title="Reset Interaction">
          RESET ↺
        </button>
      </div>
    </section>
  `;

  setupTwistPhysics();
}

function setupTwistPhysics() {
  const cookie = document.getElementById('twist-sandbox-cookie');
  const topWafer = document.getElementById('twist-top-wafer');
  const creme = document.getElementById('twist-creme-layer');
  const milestone = document.getElementById('twist-milestone-banner');
  const milkTarget = document.getElementById('twist-milk-target');
  const hudAngle = document.getElementById('hud-angle');
  const hudExposure = document.getElementById('hud-exposure');
  const hudStage = document.getElementById('hud-stage');
  const resetBtn = document.getElementById('twist-reset-btn');
  const instruction = document.getElementById('twist-instruction-text');

  if (!cookie || !topWafer) return;

  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let rotation = 0;
  let offsetY = 0;
  let twistCompleted = false;
  let dipCompleted = false;

  const onStart = (clientX, clientY) => {
    isDragging = true;
    startX = clientX;
    startY = clientY;
  };

  const onMove = (clientX, clientY) => {
    if (!isDragging) return;

    const deltaX = clientX - startX;
    const deltaY = clientY - startY;

    if (!twistCompleted) {
      // Stage 1: Twist
      rotation = deltaX * 0.65;
      topWafer.style.transform = `rotate(${rotation}deg) translate3d(${deltaX * 0.1}px, ${Math.abs(deltaX * 0.05)}px, 0)`;

      const absRot = Math.min(Math.abs(rotation), 90);
      const exposurePercent = Math.round((absRot / 90) * 100);

      if (hudAngle) hudAngle.textContent = `${Math.round(rotation)}°`;
      if (hudExposure) hudExposure.textContent = `${exposurePercent}%`;

      if (creme) {
        creme.style.transform = `scale(${1 + exposurePercent * 0.002})`;
      }

      if (Math.abs(rotation) > 65 && !twistCompleted) {
        twistCompleted = true;
        sound.playCrunch();

        // Reveal milestone banner
        if (milestone) {
          milestone.classList.remove('opacity-0', 'scale-50');
          milestone.classList.add('opacity-100', 'scale-100');
        }

        // Reveal Milk Target
        if (milkTarget) {
          milkTarget.classList.remove('opacity-0', 'translate-y-12', 'pointer-events-none');
          milkTarget.classList.add('opacity-100', 'translate-y-0');
        }

        if (hudStage) {
          hudStage.textContent = "2/2 DIP IN MILK";
          hudStage.className = "text-oreo-blue-cyan font-bold animate-pulse";
        }

        if (instruction) {
          instruction.textContent = "Great twist! Now drag the cookie down to dunk it into the cold milk.";
        }
      }
    } else if (!dipCompleted) {
      // Stage 2: Dunk in milk
      offsetY = Math.max(0, deltaY * 0.8);
      cookie.style.transform = `translate3d(0, ${offsetY}px, 0) scale(${1 - offsetY * 0.001})`;

      if (offsetY > 120 && !dipCompleted) {
        dipCompleted = true;
        sound.playDip();

        if (instruction) {
          instruction.innerHTML = "<span class='text-oreo-blue-cyan font-bold'>RITUAL MASTERED!</span> Savor the rich harmony of crunchy biscuit and velvety milk.";
        }

        if (hudStage) {
          hudStage.textContent = "PERFECTLY DUNKED! 🥛";
          hudStage.className = "text-white font-bold";
        }

        // Trigger milk ripples
        const splashRing = document.getElementById('milk-splash-ring');
        if (splashRing) {
          splashRing.innerHTML = `
            <div class="milk-ripple-circle"></div>
            <div class="milk-ripple-circle"></div>
            <div class="milk-ripple-circle"></div>
          `;
        }
      }
    }
  };

  const onEnd = () => {
    isDragging = false;
    if (!twistCompleted) {
      topWafer.style.transition = 'transform 0.4s ease';
      topWafer.style.transform = 'rotate(0deg) translate3d(0, 0, 0)';
      setTimeout(() => {
        topWafer.style.transition = '';
      }, 400);
    }
  };

  // Reset Button
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      sound.playClick();
      twistCompleted = false;
      dipCompleted = false;
      rotation = 0;
      offsetY = 0;

      topWafer.style.transform = 'rotate(0deg) translate3d(0, 0, 0)';
      cookie.style.transform = 'translate3d(0, 0, 0)';
      if (creme) creme.style.transform = 'scale(1)';

      if (milestone) {
        milestone.classList.add('opacity-0', 'scale-50');
        milestone.classList.remove('opacity-100', 'scale-100');
      }

      if (milkTarget) {
        milkTarget.classList.add('opacity-0', 'translate-y-12', 'pointer-events-none');
        milkTarget.classList.remove('opacity-100', 'translate-y-0');
      }

      if (hudAngle) hudAngle.textContent = "0.0°";
      if (hudExposure) hudExposure.textContent = "0%";
      if (hudStage) {
        hudStage.textContent = "1/2 TWIST";
        hudStage.className = "text-flavor-golden font-bold";
      }
      if (instruction) {
        instruction.textContent = "Click and drag horizontally to twist the top cookie wafer and unlock the secret creme.";
      }
    });
  }

  // Pointer & Touch events
  cookie.addEventListener('mousedown', (e) => onStart(e.clientX, e.clientY));
  window.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY));
  window.addEventListener('mouseup', onEnd);

  cookie.addEventListener('touchstart', (e) => {
    if (e.touches[0]) onStart(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches[0]) onMove(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  window.addEventListener('touchend', onEnd);
}
