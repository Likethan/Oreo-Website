// ==========================================================================
// PAGE 1: HOME — PURE CINEMATIC VIDEO ANIMATION EXPERIENCE
// Full-screen video frame scrub. Scrolling plays animation. Finishes -> Experience.
// ==========================================================================

export function renderHome(container) {
  container.innerHTML = `
    <!-- PURE FULLSCREEN VIDEO SCROLL SCRUB TRACK -->
    <div id="hero-scrub-container" class="relative w-full h-[260vh] bg-obsidian">
      <div class="sticky top-0 left-0 w-full h-screen min-h-[600px] overflow-hidden flex items-center justify-center bg-obsidian">
        
        <!-- Centerpiece Google Flow Commercial Video -->
        <video 
          id="hero-commercial-video" 
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover filter brightness-[0.96] contrast-[1.06]" 
          muted 
          playsinline 
          preload="auto"
        >
          <source src="assets/videos/oreo-hero.mp4" type="video/mp4">
        </video>

        <!-- Subtle Ambient Vignette -->
        <div class="absolute inset-0 bg-radial-gradient pointer-events-none z-[2]" style="background: radial-gradient(circle at center, transparent 40%, rgba(10, 9, 8, 0.6) 80%, rgba(10, 9, 8, 0.95) 100%);"></div>

        <!-- Minimalist Initial Scroll Prompt (Fades on Scroll) -->
        <div id="scroll-prompt-indicator" class="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-white/70 transition-opacity duration-500 pointer-events-none">
          <span class="text-[11px] font-mono tracking-widest uppercase text-creme/80">SCROLL DOWN TO PLAY</span>
          <div class="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-1.5 backdrop-blur-sm bg-black/20">
            <span class="w-1.5 h-2.5 rounded-full bg-oreo-blue-cyan animate-bounce"></span>
          </div>
        </div>

        <!-- Bottom Frame Progress Bar -->
        <div class="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-10">
          <div id="video-frame-progress-line" class="h-full bg-gradient-to-r from-oreo-blue-primary via-oreo-blue-electric to-oreo-blue-cyan w-0 transition-all duration-75"></div>
        </div>

      </div>
    </div>
  `;
}
