# 🍪 OREO — TWIST. DIP. LOVE.
### An Immersive, Cinematic Web Experience Built with React 18 & HTML5 Canvas

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Canvas](https://img.shields.io/badge/Canvas-60%20FPS-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/)
[![Audio](https://img.shields.io/badge/Web%20Audio%20API-Enabled-8A2BE2)](#)

> **"Twist, Dip, Love"** — Explore the iconic Oreo cookie in an award-winning cinematic format featuring butter-smooth 60 FPS scroll-driven frame animation, interactive physics-based cookie twisting, a dynamic flavor gallery, and handcrafted dessert recipes.

---

## ✨ Key Features

### 🎬 1. 300-Frame Cinematic Scroll Experience (`Experience`)
- **Butter-Smooth Frame Scroller**: Synchronized 300-frame sequence rendered onto high-DPI HTML5 canvas using optimized WebP & JPG fallbacks.
- **Story-Driven Ritual**: As you scroll, witness the cookie fly apart, reveal the velvet creme, take a plunge into fresh milk, and snap back into place.
- **Adaptive Quality**: Instant pre-caching ensures zero dropped frames across all display refresh rates (60Hz / 120Hz / 144Hz).

### 🌀 2. Interactive Cookie Twist Laboratory (`The Twist Lab`)
- **Physics Simulation**: Drag and twist the cookie halves in real-time with responsive mouse and touch physics.
- **Haptic Sound Feedback**: Dynamic crunch, twist, and creme separation sounds powered by the custom Web Audio API engine.
- **Ritual Completion**: Complete the twist to unlock interactive easter eggs.

### 🎨 3. Dynamic Flavor Vault (`Flavors`)
- Explore the complete portfolio: **Original**, **Double Stuf**, **Golden Oreo**, **Cool Mint**, **Fresh Strawberry**, and **Birthday Cake**.
- **Dynamic Ambient Color Shift**: The entire website background, glow, and particle fields seamlessly morph to reflect each flavor's signature palette.
- Nutritional highlights, flavor profile notes, and interactive preview cards.

### 🧑‍🍳 4. Gourmet Recipe Studio (`Recipes`)
- Curated desserts crafted around Oreo:
  - *No-Bake Velvet Oreo Cheesecake*
  - *Mega Cookie Thickshake*
  - *Fudgy Oreo Dream Brownies*
  - *60-Second Oreo Mug Cake*
- Complete with prep time badges, difficulty meters, ingredient checklists, and step-by-step instructions.

### 📜 5. Heritage & Legacy Timeline (`Heritage`)
- Journey through time from the first Oreo sold at Chelsea Market in **1912** to modern global icon status.
- Key historical milestones, design evolution, and fun brand trivia.

### 🔊 6. Ambient Sound Engine & Visual FX
- **Synthesized Audio**: Procedural sound effects for clicks, hovers, cookie snaps, twists, and milk splashes (toggleable anytime).
- **Custom Interactive Cursor**: Magnetic cursor with trailing particle crumbs and interactive hover states.
- **Glassmorphic UI**: Ultra-modern obsidian & milk creme aesthetic with glowing cyan accents.

---

## 🚀 Quick Start & Local Setup

This project is built to run smoothly with zero heavy build steps required!

### Method 1: Using the Included Python Server (Recommended)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Likethan/Oreo-Website.git
   cd Oreo-Website
   ```

2. **Start the local server:**
   ```bash
   python server.py
   ```
   *(Or on Windows with Python launcher: `py server.py`)*

3. **Open in browser:**
   Navigate to:
   ```
   http://localhost:8080
   ```

---

### Method 2: VS Code Live Server
1. Open the project folder in **Visual Studio Code**.
2. Right-click [`index.html`](index.html) and select **"Open with Live Server"**.

---

## 📁 Project Architecture

```plaintext
Oreo-Website/
├── assets/
│   ├── frames/                 # 300 optimized WebP & JPG sequence frames
│   ├── images/                 # High-resolution cookie, flavor & recipe photography
│   └── videos/                 # Hero background video loops
├── css/
│   ├── main.css                # Core typography, color variables & layout
│   ├── animations.css          # Keyframes, glow shaders & micro-interactions
│   └── components.css          # Glassmorphism cards, buttons & modals
├── js/
│   ├── pages/
│   │   ├── home.js             # Hero showcase & entry experience
│   │   ├── experience.js       # 60 FPS 300-frame canvas scroll engine
│   │   ├── twist.js            # Interactive twist physics laboratory
│   │   ├── flavors.js          # Dynamic flavor vault & ambient lighting
│   │   ├── recipes.js          # Culinary dessert studio
│   │   └── about.js            # Heritage timeline & history
│   ├── cursor.js               # Magnetic particle cursor
│   ├── soundEngine.js          # Web Audio sound synthesis & controls
│   ├── particles.js            # Canvas crumb & milk bubble floating particles
│   ├── reactApp.js             # React 18 single-page application router
│   └── vendor/                 # Local offline vendor fallbacks (React, Babel, Lucide)
├── extract_and_optimize.py     # High-speed PIL frame sequence optimization pipeline
├── server.py                   # Custom Python dev server with full MIME & CORS support
├── index.html                  # Single-page application entry point
├── .gitignore                  # Git ignore rules for scratch & cache files
└── README.md                   # Project documentation
```

---

## 🛠️ Built With

- **[React 18](https://react.dev/)**: Component-driven UI architecture and reactive state management.
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first styling with customized obsidian and brand color palette.
- **[HTML5 Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)**: 60 FPS requestAnimationFrame rendering for frame sequence.
- **[Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)**: Browser-native interactive audio effects.
- **[Lucide Icons](https://lucide.dev/)**: Crisp, modern icon set.
- **[Python](https://www.python.org/)**: Local development server and image sequence optimization scripts.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/Likethan/Oreo-Website/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">
  Crafted with ❤️ for Oreo lovers worldwide. <strong>Twist. Dip. Love.</strong>
</div>
