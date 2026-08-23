// ==========================================================================
// PAGE 5: RECIPES / WAYS TO ENJOY — "MAKE IT YOURS."
// Features: Filterable gourmet cards, interactive recipe modal with checklist & timer
// ==========================================================================

import { sound } from '../soundEngine.js';

export const RECIPES_DATA = [
  {
    id: "shake",
    category: "shakes",
    title: "Velvety Oreo Milkshake",
    tagline: "The Ultimate Classic Diner Blend",
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
    id: "icecream",
    category: "nobake",
    title: "Artisanal Oreo Ice Cream Sandwich",
    tagline: "Double-Stuffed Frozen Luxury",
    prepTime: "15 mins + Freeze",
    difficulty: "Easy",
    servings: "6 sandwiches",
    calories: "340 kcal",
    summary: "Thick gourmet cookies and cream churned gelato pressed between two oversized house-baked dark cocoa wafers.",
    ingredients: [
      "12 large Oreo cookies or chocolate wafer rounds",
      "1 pint Cookies & Cream artisan ice cream (slightly softened)",
      "1/2 cup mini chocolate chips",
      "Crushed Oreo crumbs for rim rolling"
    ],
    steps: [
      "Place 6 wafers flat side up on a parchment-lined baking sheet.",
      "Scoop a generous round of softened ice cream onto each base.",
      "Top with remaining wafers and press gently to spread ice cream to edges.",
      "Roll the exposed ice cream edges in crushed Oreo crumbs and mini chocolate chips.",
      "Freeze for 2 hours until firm before serving."
    ],
    chefTip: "Dip a butter knife in hot water to smooth the edges before rolling in sprinkles."
  },
  {
    id: "brownie",
    category: "baked",
    title: "Fudgy Oreo Truffle Brownies",
    tagline: "Molten Fudge & Cookie Crunch",
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
    prepTime: "2 mins",
    difficulty: "Super Easy",
    servings: "1 mug",
    calories: "280 kcal",
    summary: "The viral two-ingredient sensation: Oreo cookies crushed with milk and microwaved into a warm, molten soufflé-like chocolate sponge.",
    ingredients: [
      "4-5 Original Oreo cookies",
      "3 tablespoons milk (dairy or plant-based)",
      "1/2 tbsp flour (optional, for firmer cake)",
      "1/2 tsp baking powder (optional, for extra fluff)",
      "1 scoop vanilla ice cream for serving"
    ],
    steps: [
      "Place 4 Oreo cookies in a microwave-safe mug.",
      "Add 3 tablespoons of milk and mash thoroughly with a fork until a smooth batter forms.",
      "Optional: stir in flour and baking powder for a lighter crumb.",
      "Push 1 whole Oreo cookie into the center of the batter.",
      "Microwave on high for 60 to 75 seconds until risen and set. Top with cold vanilla ice cream!"
    ],
    chefTip: "Enjoy immediately while hot and steaming with the cold ice cream melting over the top."
  },
  {
    id: "parfait",
    category: "nobake",
    title: "Layered Oreo Parfait Cups",
    tagline: "Elegant Party Dessert",
    prepTime: "12 mins",
    difficulty: "Easy",
    servings: "4 parfait glasses",
    calories: "310 kcal",
    summary: "Alternating layers of crushed dark cocoa biscuit crumbs, Greek yogurt or mascarpone cream, and fresh raspberry compote.",
    ingredients: [
      "12 Oreo cookies (coarsely chopped)",
      "1 cup Greek yogurt or mascarpone cream",
      "2 tbsp honey or maple syrup",
      "1 cup fresh raspberries or strawberries",
      "Fresh mint sprigs for garnish"
    ],
    steps: [
      "Whip mascarpone cream or Greek yogurt with honey until light and airy.",
      "In dessert glasses, add a base layer of crushed Oreo crumbs.",
      "Pipe or spoon a layer of sweet cream over the crumbs.",
      "Add a layer of fresh raspberries, then repeat layers to the top.",
      "Garnish with a whole mini Oreo and mint sprig. Serve chilled."
    ],
    chefTip: "Layer in stemless wine glasses for an upscale dinner party presentation."
  }
];

export function renderRecipes(container) {
  container.innerHTML = `
    <!-- RECIPES HERO -->
    <section class="relative pt-36 pb-16 px-6 md:px-16 text-center bg-gradient-to-b from-obsidian via-oreo-dark to-obsidian overflow-hidden">
      <!-- Ambient Light -->
      <div class="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-oreo-blue-electric/20 rounded-full blur-[150px] pointer-events-none"></div>

      <div class="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        <span class="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-oreo-blue-cyan uppercase tracking-widest mb-4">
          <i data-lucide="chef-hat" class="w-3.5 h-3.5"></i>
          <span>CREATIVE CULINARY LAB</span>
        </span>
        <h1 class="font-heading text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight mb-4">
          MAKE IT YOURS.
        </h1>
        <p class="text-lg sm:text-xl text-creme/75 font-light tracking-wide max-w-xl">
          From decadent milkshakes to 2-minute midnight hacks. Discover chef-crafted Oreo recipes.
        </p>

        <!-- Category Filter Pills -->
        <div class="flex flex-wrap items-center justify-center gap-2 mt-8">
          <button class="recipe-filter-btn active px-5 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-all bg-oreo-blue-electric text-white border border-oreo-blue-cyan" data-category="all">ALL RECIPES</button>
          <button class="recipe-filter-btn px-5 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-all bg-white/5 text-white/70 hover:text-white border border-white/10" data-category="shakes">SHAKES & DRINKS</button>
          <button class="recipe-filter-btn px-5 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-all bg-white/5 text-white/70 hover:text-white border border-white/10" data-category="nobake">NO-BAKE DESSERTS</button>
          <button class="recipe-filter-btn px-5 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-all bg-white/5 text-white/70 hover:text-white border border-white/10" data-category="baked">BAKED TREATS</button>
          <button class="recipe-filter-btn px-5 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-all bg-white/5 text-white/70 hover:text-white border border-white/10" data-category="hacks">5-MIN HACKS</button>
        </div>
      </div>
    </section>

    <!-- RECIPES GRID -->
    <section class="py-12 pb-28 px-6 md:px-16 bg-obsidian">
      <div id="recipes-grid-container" class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${RECIPES_DATA.map((recipe) => renderRecipeCard(recipe)).join('')}
      </div>
    </section>
  `;

  setupRecipesInteractivity();
}

function renderRecipeCard(recipe) {
  return `
    <div class="recipe-card group" data-recipe-id="${recipe.id}" data-category="${recipe.category}" data-cursor-label="COOK">
      <!-- Card Image Header Graphic -->
      <div class="recipe-card-img-wrapper bg-gradient-to-br from-oreo-dark to-[#161311] flex items-center justify-center p-8 relative">
        <div class="w-32 h-32 rounded-full bg-gradient-to-tr from-[#26211D] to-[#0A0908] border-2 border-white/20 shadow-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
          <i data-lucide="sparkles" class="w-8 h-8 text-oreo-blue-cyan"></i>
        </div>
        <span class="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-white tracking-widest uppercase border border-white/10">
          ${recipe.prepTime}
        </span>
        <span class="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-oreo-blue-primary/80 backdrop-blur-md text-[10px] font-mono text-oreo-blue-cyan tracking-widest uppercase border border-white/15">
          ${recipe.difficulty}
        </span>
      </div>

      <!-- Card Body -->
      <div class="p-6 flex flex-col gap-3">
        <span class="text-[10px] font-mono text-white/50 uppercase tracking-widest">${recipe.tagline}</span>
        <h3 class="font-heading text-2xl font-bold text-white group-hover:text-oreo-blue-cyan transition-colors">
          ${recipe.title}
        </h3>
        <p class="text-xs text-creme/70 line-clamp-2 leading-relaxed">
          ${recipe.summary}
        </p>

        <!-- Footer Metric -->
        <div class="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
          <span>SERVINGS: <span class="text-white font-bold">${recipe.servings}</span></span>
          <span class="text-oreo-blue-cyan flex items-center gap-1 font-bold group-hover:translate-x-1 transition-transform">
            VIEW RECIPE →
          </span>
        </div>
      </div>
    </div>
  `;
}

function setupRecipesInteractivity() {
  const filterBtns = document.querySelectorAll('.recipe-filter-btn');
  const cards = document.querySelectorAll('.recipe-card');
  const modal = document.getElementById('recipe-modal');
  const modalContent = document.getElementById('recipe-modal-content');
  const closeBtn = modal?.querySelector('.modal-close-btn');

  // Filter Buttons
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      sound.playClick();
      const category = btn.getAttribute('data-category');

      filterBtns.forEach(b => {
        b.classList.remove('active', 'bg-oreo-blue-electric', 'border-oreo-blue-cyan');
        b.classList.add('bg-white/5', 'text-white/70');
      });
      btn.classList.add('active', 'bg-oreo-blue-electric', 'border-oreo-blue-cyan');
      btn.classList.remove('bg-white/5', 'text-white/70');

      cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Open Recipe Modal
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const recipeId = card.getAttribute('data-recipe-id');
      const recipe = RECIPES_DATA.find(r => r.id === recipeId);
      if (!recipe || !modal || !modalContent) return;

      sound.playClick();

      modalContent.innerHTML = `
        <div class="flex flex-col gap-6 text-left">
          <!-- Header -->
          <div class="pb-6 border-b border-white/10">
            <span class="text-xs font-mono text-oreo-blue-cyan tracking-widest uppercase">${recipe.tagline}</span>
            <h2 class="font-heading text-3xl sm:text-4xl font-black text-white mt-1">${recipe.title}</h2>
            <div class="flex flex-wrap gap-4 mt-4 text-xs font-mono">
              <span class="px-3 py-1 rounded-full bg-white/10 text-white">⏱ PREP: ${recipe.prepTime}</span>
              <span class="px-3 py-1 rounded-full bg-white/10 text-white">★ DIFFICULTY: ${recipe.difficulty}</span>
              <span class="px-3 py-1 rounded-full bg-white/10 text-white">🍽 SERVINGS: ${recipe.servings}</span>
              <span class="px-3 py-1 rounded-full bg-white/10 text-oreo-blue-cyan">🔥 CALORIES: ${recipe.calories}</span>
            </div>
          </div>

          <!-- Recipe Columns -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Left: Ingredients Checklist -->
            <div class="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h3 class="font-heading text-lg font-bold text-white mb-4 flex items-center gap-2">
                <i data-lucide="check-square" class="w-4 h-4 text-oreo-blue-cyan"></i>
                <span>INGREDIENTS CHECKLIST</span>
              </h3>
              <div class="flex flex-col gap-3">
                ${recipe.ingredients.map((ing, i) => `
                  <label class="flex items-start gap-3 cursor-pointer text-xs sm:text-sm text-creme/80 hover:text-white transition-colors">
                    <input type="checkbox" class="mt-1 rounded bg-white/10 border-white/30 text-oreo-blue-electric focus:ring-0">
                    <span>${ing}</span>
                  </label>
                `).join('')}
              </div>
            </div>

            <!-- Right: Step-by-Step Directions -->
            <div class="flex flex-col gap-4">
              <h3 class="font-heading text-lg font-bold text-white flex items-center gap-2">
                <i data-lucide="list-ordered" class="w-4 h-4 text-oreo-blue-cyan"></i>
                <span>PREPARATION STEPS</span>
              </h3>
              <div class="flex flex-col gap-4">
                ${recipe.steps.map((step, idx) => `
                  <div class="flex items-start gap-3 text-xs sm:text-sm text-creme/80">
                    <span class="w-6 h-6 rounded-full bg-oreo-blue-primary/60 border border-white/20 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      ${idx + 1}
                    </span>
                    <p class="leading-relaxed">${step}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Chef Tip Box -->
          <div class="p-4 rounded-xl bg-oreo-blue-primary/30 border border-oreo-blue-electric/40 flex items-start gap-3 text-xs">
            <i data-lucide="lightbulb" class="w-5 h-5 text-flavor-golden shrink-0 mt-0.5"></i>
            <div>
              <span class="font-bold text-white block mb-0.5">CHEF'S PRO SECRET</span>
              <p class="text-creme/80 leading-relaxed">${recipe.chefTip}</p>
            </div>
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
