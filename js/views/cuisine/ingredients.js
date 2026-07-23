import { speakFrench } from '../../utils/audio.js';
import { getRelationBadges } from './relations.js';

import { beefCuts, porcCuts, poultryCuts } from '../ingredients/primary_meats.js';
import { lambCuts, vealCuts, duckCuts } from '../ingredients/other_livestock.js';
import { deerCuts, boarCuts, pigeonCuts, hareCuts } from '../ingredients/game_meats.js';
import { fishCuts, crustaceanCuts, shellfishCuts, molluskCuts } from '../ingredients/seafood.js';
import { cheeseCutsFr, cheeseCutsWorld, cheeseClassifications, wineCuts } from '../ingredients/cheese_wine.js';
import { vegetableCuts } from '../ingredients/vegetables.js';
import { herbCuts, spiceCuts } from '../ingredients/herbs_spices.js';
import { fruitCuts, mushroomCuts } from '../ingredients/fruits_mushrooms.js';

// SUB-TAB 2: INTERACTIVE INGREDIENTS SECTION
export function renderIngredientsSection(contentWrapper) {
  const sectionContainer = document.createElement('div');
  sectionContainer.className = 'meat-section-container';
  
  // Category tabs
  const categoryTabs = document.createElement('div');
  categoryTabs.className = 'meat-type-tabs';
  categoryTabs.innerHTML = `
    <button class="meat-tab-btn active" data-category="primary">🥩 主要食肉</button>
    <button class="meat-tab-btn" data-category="livestock">🍖 家畜肉</button>
    <button class="meat-tab-btn" data-category="game">🦌 ジビエ</button>
    <button class="meat-tab-btn" data-category="seafood">🐟 魚介類</button>
    <button class="meat-tab-btn" data-category="cheese_wine">🧀 チーズ/ワイン</button>
    <button class="meat-tab-btn" data-category="vegetables">🥦 野菜</button>
    <button class="meat-tab-btn" data-category="herbs_spices">🌿 ハーブ/スパイス</button>
    <button class="meat-tab-btn" data-category="fruits_mushrooms">🍄 果物/きのこ</button>
  `;
  sectionContainer.appendChild(categoryTabs);
  
  // Nested sub-navigation for sub-categories
  const nestedTabs = document.createElement('div');
  nestedTabs.className = 'meat-type-tabs';
  nestedTabs.style.marginTop = '0.5rem';
  nestedTabs.style.borderBottom = 'none';
  sectionContainer.appendChild(nestedTabs);
  
  const displayArea = document.createElement('div');
  displayArea.className = 'meat-display-area';
  sectionContainer.appendChild(displayArea);
  
  contentWrapper.appendChild(sectionContainer);
  
  // Config mapping categories to sub-categories and their data sources
  const categoryConfig = {
    primary: {
      title: "主要食肉 (Primary Meats)",
      subCategories: [
        { key: "beef", label: "🐂 Bœuf (牛)", cuts: beefCuts, img: "assets/beef_cuts.png", placeholder: "Coupe+de+Boeuf", pdf: "beef_maff_guide.pdf", pdfText: "📄 日本農水省 牛肉部位基準 (PDF)" },
        { key: "porc", label: "🐖 Porc (豚)", cuts: porcCuts, img: "assets/porc_cuts.png", placeholder: "Coupe+de+Porc", pdf: "pork_maff_guide.pdf", pdfText: "📄 日本農水省 豚肉部位基準 (PDF)", quote: '"Tout est bon dans le cochon" (豚はすべてが使える食材である)' },
        { key: "volaille", label: "🐓 Volaille (鶏)", cuts: poultryCuts, img: "assets/poultry_cuts.png", placeholder: "Coupe+de+Volaille", pdf: "poultry_maff_guide.pdf", pdfText: "📄 日本農水省 鶏肉部位基準 (PDF)", quote: '"La volaille est la reine des cuisines et la directrice des banquets" (鶏肉は厨房の女王であり、宴の演出家である)' }
      ]
    },
    livestock: {
      title: "その他の家畜肉 (Other Livestock)",
      subCategories: [
        { key: "agneau", label: "🐏 Agneau (羊)", cuts: lambCuts, img: "assets/agneau_cuts.png", placeholder: "Agneau" },
        { key: "veau", label: "🐂 Veau (仔牛)", cuts: vealCuts, img: "assets/veal_cuts.png", placeholder: "Veau" },
        { key: "canard", label: "🦆 Canard (鴨)", cuts: duckCuts, img: "assets/canard_cuts.png", placeholder: "Canard" }
      ]
    },
    game: {
      title: "ジビエ (Game Meats)",
      subCategories: [
        { key: "chevreuil", label: "🦌 Chevreuil (鹿)", cuts: deerCuts, img: "assets/game_cuts.png", placeholder: "Chevreuil" },
        { key: "sanglier", label: "🐗 Sanglier (猪)", cuts: boarCuts, img: "assets/game_cuts.png", placeholder: "Sanglier" },
        { key: "pigeon", label: "🕊️ Pigeon (鳩)", cuts: pigeonCuts, img: "assets/game_cuts.png", placeholder: "Pigeon" },
        { key: "lievre", label: "🐇 Lièvre (野ウサギ)", cuts: hareCuts, img: "assets/game_cuts.png", placeholder: "Lievre" }
      ]
    },
    seafood: {
      title: "魚介類 (Seafood)",
      subCategories: [
        { key: "poisson", label: "🐟 Poisson (魚)", cuts: fishCuts, img: "assets/seafood_cuts.png", placeholder: "Poisson" },
        { key: "crustaces", label: "🦞 Crustacés (甲殻類)", cuts: crustaceanCuts, img: "assets/seafood_cuts.png", placeholder: "Crustaces" },
        { key: "coquillages", label: "🐚 Coquillages (貝類)", cuts: shellfishCuts, img: "assets/seafood_cuts.png", placeholder: "Coquillages" },
        { key: "mollusques", label: "🐙 Mollusques (軟体類)", cuts: molluskCuts, img: "assets/seafood_cuts.png", placeholder: "Mollusques" }
      ]
    },
    cheese_wine: {
      title: "チーズ・ワイン (Cheese & Wine)",
      subCategories: [
        { key: "fromages_fr", label: "🇫🇷 France (仏チーズ)", cuts: cheeseCutsFr, img: "assets/cheese_wine.png", placeholder: "Fromages" },
        { key: "fromages_world", label: "🌐 Monde (世界チーズ)", cuts: cheeseCutsWorld, img: "assets/cheese_wine.png", placeholder: "Fromages", hidePins: true },
        { key: "fromages_classif", label: "🔬 Classification (製法分類)", cuts: cheeseClassifications, img: "assets/cheese_wine.png", placeholder: "Fromages", hidePins: true },
        { key: "vins", label: "🍷 Vins (ワイン)", cuts: wineCuts, img: "assets/cheese_wine.png", placeholder: "Vins" }
      ]
    },
    vegetables: {
      title: "野菜 (Vegetables)",
      subCategories: [
        { key: "legumes", label: "🥦 Légumes (野菜全般)", cuts: vegetableCuts, img: "assets/vegetables.png", placeholder: "Legumes" }
      ]
    },
    herbs_spices: {
      title: "ハーブ・スパイス (Herbs & Spices)",
      subCategories: [
        { key: "herbes", label: "🌿 Herbes (香草)", cuts: herbCuts, img: "assets/herbs_spices.png", placeholder: "Herbes" },
        { key: "epices", label: "🌶️ Épices (香辛料)", cuts: spiceCuts, img: "assets/herbs_spices.png", placeholder: "Epices" }
      ]
    },
    fruits_mushrooms: {
      title: "果物・きのこ (Fruits & Mushrooms)",
      subCategories: [
        { key: "fruits", label: "🍎 Fruits (果物)", cuts: fruitCuts, img: "assets/fruits_mushrooms.png", placeholder: "Fruits" },
        { key: "champignons", label: "🍄 Champignons (きのこ)", cuts: mushroomCuts, img: "assets/fruits_mushrooms.png", placeholder: "Champignons" }
      ]
    }
  };

  function selectCategory(catKey) {
    const cfg = categoryConfig[catKey];
    nestedTabs.innerHTML = '';
    
    // Render nested tabs
    cfg.subCategories.forEach((sub, idx) => {
      const btn = document.createElement('button');
      btn.className = `meat-tab-btn ${idx === 0 ? 'active' : ''}`;
      btn.setAttribute('data-sub', sub.key);
      btn.innerText = sub.label;
      btn.style.fontSize = '0.8rem';
      btn.style.padding = '0.3rem 0.8rem';
      btn.addEventListener('click', (e) => {
        nestedTabs.querySelectorAll('.meat-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderIngredientView(sub, displayArea);
      });
      nestedTabs.appendChild(btn);
    });

    // Show/hide nested tabs row if there's only 1 item
    if (cfg.subCategories.length <= 1) {
      nestedTabs.style.display = 'none';
    } else {
      nestedTabs.style.display = 'flex';
    }

    // Initial subcategory display
    renderIngredientView(cfg.subCategories[0], displayArea);
  }

  // Category click listeners
  categoryTabs.querySelectorAll('.meat-tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      categoryTabs.querySelectorAll('.meat-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-category');
      selectCategory(cat);
    });
  });

  // Initial load
  selectCategory('primary');
}

function renderIngredientView(sub, wrapper) {
  wrapper.innerHTML = '';
  
  const panel = document.createElement('div');
  panel.style.display = 'flex';
  panel.style.flexDirection = 'column';
  panel.style.gap = '1.5rem';
  
  let html = '';
  
  // 1. Quote header if available
  if (sub.quote) {
    html += `
      <div style="background-color: rgba(197, 168, 128, 0.05); padding: 1rem; border-radius: var(--radius-sm); border-left: 3px solid var(--color-accent); margin-bottom: 0.5rem; text-align: center;">
        <span style="font-family: var(--font-serif); font-size: 1.1rem; font-style: italic; color: var(--color-primary);">${sub.quote}</span>
      </div>
    `;
  }

  // 2. PDF link if available
  if (sub.pdf) {
    html += `
      <div style="display: flex; justify-content: flex-end; margin-bottom: 0.5rem;">
        <a href="${sub.pdf}" target="_blank" class="next-btn" style="text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; padding: 0.4rem 0.8rem; background-color: rgba(197, 168, 128, 0.08); color: var(--color-primary); border: 1px solid rgba(197, 168, 128, 0.3); border-radius: var(--radius-sm); font-weight: 600; cursor: pointer; transition: var(--transition);">
          ${sub.pdfText}
        </a>
      </div>
    `;
  }

  // 3. Layout Grid for Interactive Canvas and Items List side-by-side
  html += `
    <div class="ingredient-grid-layout">
      <!-- Left: Interactive Canvas -->
      <div class="interactive-canvas-container" style="position: relative; width: 100%; margin: 0;">
        <img src="${sub.img}" alt="${sub.label}" class="interactive-image" onerror="this.src='https://placehold.co/700x450/F4EAD4/0a1931?text=${sub.placeholder}'">
        
        <!-- Polygons overlay (only for those items that specify points coordinates) -->
        <svg class="interactive-svg-overlay" viewBox="0 0 100 100">
          ${sub.cuts.filter(cut => cut.points).map(cut => `
            <polygon class="interactive-area" points="${cut.points}" data-id="${cut.id}" />
          `).join('')}
        </svg>
        
        <!-- Hotspots overlay (for items that specify pin x/y percentages) -->
        <div class="hotspots-overlay-container" style="position: absolute; top:0; left:0; width:100%; height:100%; pointer-events:none;">
          ${sub.hidePins ? '' : sub.cuts.filter(cut => cut.pin).map(cut => `
            <div class="interactive-hotspot" style="left: ${cut.pin.x}%; top: ${cut.pin.y}%; pointer-events: auto;" data-id="${cut.id}" title="${cut.name_fr || cut.name_it || cut.name_local || cut.name_ja}">${cut.number}</div>
          `).join('')}
        </div>
      </div>
      
      <!-- Right: Clickable Text List -->
      <div style="background: rgba(10, 25, 49, 0.02); border: 1px solid rgba(197, 168, 128, 0.25); border-radius: var(--radius-md); padding: 1.2rem; max-height: 450px; overflow-y: auto;">
        <h4 style="font-size: 0.85rem; text-transform: uppercase; color: var(--color-primary); font-weight: 700; margin-bottom: 0.8rem; border-bottom: 1px solid rgba(197, 168, 128, 0.2); padding-bottom: 0.4rem;">📖 部位・食材リスト</h4>
        <div class="ingredient-list-group" style="display: flex; flex-direction: column; gap: 0.4rem;">
          ${sub.cuts.map(cut => `
            <button class="list-item-btn" data-id="${cut.id}">
              <span><span style="display: inline-block; background-color: var(--color-accent); color: var(--color-primary); width: 18px; height: 18px; line-height: 18px; text-align: center; border-radius: 50%; font-size: 0.65rem; font-weight: 700; margin-right: 0.4rem;">${cut.number}</span> ${cut.name_fr || cut.name_it || cut.name_local || cut.name_ja}</span>
              <span style="font-size: 0.75rem; color: var(--color-text-muted); font-style: italic;">${cut.name_ja}${cut.region ? ` (${cut.region})` : ''}</span>
            </button>
          `).join('')}
        </div>
      </div>
    </div>
    
    <!-- Detail Drawer -->
    <div class="cuisine-detail-drawer" id="ingredient-detail-drawer">
      <div class="detail-drawer-header">
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <h3 class="detail-drawer-title" id="ingredient-cut-title">Select an Item</h3>
          <button class="audio-btn" id="ingredient-audio-title-btn" style="background: none; border: none; font-size: 1.1rem; cursor: pointer; color: var(--color-accent); display: none;">🔊</button>
        </div>
        <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; color: var(--color-text-muted); font-weight: 600;" id="ingredient-cut-sub">${sub.label}</span>
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <!-- Properties Grid -->
        <div class="meat-properties-grid">
          <div class="meat-prop-item">
            <span class="meat-prop-label">柔らかさ (Tendreté)</span>
            <strong class="meat-prop-val" id="ingredient-prop-tenderness">-</strong>
          </div>
          <div class="meat-prop-item">
            <span class="meat-prop-label">脂 (Gras)</span>
            <strong class="meat-prop-val" id="ingredient-prop-fat">-</strong>
          </div>
          <div class="meat-prop-item">
            <span class="meat-prop-label">コラーゲン (Collagène)</span>
            <strong class="meat-prop-val" id="ingredient-prop-collagen">-</strong>
          </div>
        </div>

        <!-- Basic Details -->
        <div class="meat-detail-grid">
          <div class="meat-detail-block">
            <h4 class="meat-block-title">向く調理</h4>
            <p class="meat-block-text" id="ingredient-cooking"></p>
          </div>
          <div class="meat-detail-block">
            <h4 class="meat-block-title">特徴・分類</h4>
            <p class="meat-block-text" id="ingredient-classification"></p>
          </div>
        </div>

        <!-- Logic & Science -->
        <div class="meat-detail-grid">
          <div class="meat-detail-block">
            <h4 class="meat-block-title">Cooking Logic</h4>
            <p class="meat-block-text highlight-code" id="ingredient-logic"></p>
          </div>
          <div class="meat-detail-block">
            <h4 class="meat-block-title">料理科学 (Science)</h4>
            <p class="meat-block-text" id="ingredient-science"></p>
          </div>
        </div>

        <!-- Chef's Note -->
        <div class="chef-note-box">
          <h4 class="chef-note-title">👨‍🍳 Chef's Note</h4>
          <p class="chef-note-text" id="ingredient-chef-note"></p>
        </div>

        <!-- Relations -->
        <div id="ingredient-relations-container" style="display: none; border-top: 1px solid rgba(197, 168, 128, 0.15); padding-top: 1.2rem;">
          <h4 class="meat-block-title">🔗 関連知識とのつながり (Relations)</h4>
          <div id="ingredient-relations-content"></div>
        </div>
      </div>
    </div>
  `;

  panel.innerHTML = html;
  wrapper.appendChild(panel);

  const drawer = panel.querySelector('#ingredient-detail-drawer');
  const spots = panel.querySelectorAll('.interactive-area');
  const pins = panel.querySelectorAll('.interactive-hotspot');
  const listBtns = panel.querySelectorAll('.list-item-btn');

  function selectItem(itemId, targetEl) {
    // Clear active states
    spots.forEach(s => s.classList.remove('active'));
    pins.forEach(p => p.classList.remove('active'));
    listBtns.forEach(b => b.classList.remove('active'));

    if (targetEl) {
      targetEl.classList.add('active');
    } else {
      // Find by data-id if not directly clicked
      const poly = panel.querySelector(`.interactive-area[data-id="${itemId}"]`);
      if (poly) poly.classList.add('active');
      const pin = panel.querySelector(`.interactive-hotspot[data-id="${itemId}"]`);
      if (pin) pin.classList.add('active');
    }
    
    const btn = panel.querySelector(`.list-item-btn[data-id="${itemId}"]`);
    if (btn) btn.classList.add('active');

    const cut = sub.cuts.find(c => c.id === itemId);
    if (cut) {
      const displayName = cut.name_fr || cut.name_it || cut.name_local || cut.name_ja;
      panel.querySelector('#ingredient-cut-title').innerText = `${displayName} (${cut.name_ja})`;
      const regionText = cut.region ? ` • Region/Country: ${cut.region}` : '';
      panel.querySelector('#ingredient-cut-sub').innerText = `Cut #${cut.number} • ${cut.name_en || ''}${regionText}`;
      
      // Dynamic property labels and values depending on subcategory
      const prop1Label = panel.querySelector('.meat-prop-item:nth-child(1) .meat-prop-label');
      const prop1Val = panel.querySelector('#ingredient-prop-tenderness');
      const prop2Label = panel.querySelector('.meat-prop-item:nth-child(2) .meat-prop-label');
      const prop2Val = panel.querySelector('#ingredient-prop-fat');
      const prop3Label = panel.querySelector('.meat-prop-item:nth-child(3) .meat-prop-label');
      const prop3Val = panel.querySelector('#ingredient-prop-collagen');

      if (sub.key === 'vins') {
        prop1Label.innerText = "甘み (Douceur)";
        prop1Val.innerText = cut.properties?.sweetness || '-';
        prop2Label.innerText = "アルコール (Alcool)";
        prop2Val.innerText = cut.properties?.alcohol || '-';
        prop3Label.innerText = "ボディ (Corps)";
        prop3Val.innerText = cut.properties?.body || '-';
      } else if (sub.key === 'fromages_fr') {
        prop1Label.innerText = "塩気 (Salinité)";
        prop1Val.innerText = cut.properties?.saltiness || '-';
        prop2Label.innerText = "アロマ (Arôme)";
        prop2Val.innerText = cut.properties?.aroma || '-';
        prop3Label.innerText = "希少度 (Rareté)";
        prop3Val.innerText = cut.properties?.rarity || '-';
      } else if (sub.key.startsWith('fromages')) {
        prop1Label.innerText = "柔らかさ/水分 (Humidité)";
        prop1Val.innerText = cut.properties?.tenderness || cut.properties?.moisture || '-';
        prop2Label.innerText = "脂肪分 (M.G.)";
        prop2Val.innerText = cut.properties?.fat || '-';
        prop3Label.innerText = "熟成/コラーゲン (Affinage)";
        prop3Val.innerText = cut.properties?.matured || cut.properties?.collagen || '-';
      } else {
        prop1Label.innerText = "柔らかさ (Tendreté)";
        prop1Val.innerText = cut.properties?.tenderness || '-';
        prop2Label.innerText = "脂 (Gras)";
        prop2Val.innerText = cut.properties?.fat || '-';
        prop3Label.innerText = "コラーゲン (Collagène)";
        prop3Val.innerText = cut.properties?.collagen || '-';
      }
      
      panel.querySelector('#ingredient-cooking').innerText = cut.cooking || '-';
      panel.querySelector('#ingredient-classification').innerText = cut.classification || '-';
      panel.querySelector('#ingredient-logic').innerText = cut.logic || '-';
      panel.querySelector('#ingredient-science').innerText = cut.science || '-';
      panel.querySelector('#ingredient-chef-note').innerText = cut.chef_note || '-';

      // Render relations
      const relsContainer = panel.querySelector('#ingredient-relations-container');
      const relsContent = panel.querySelector('#ingredient-relations-content');
      const relsHtml = getRelationBadges(itemId, 'cut');
      if (relsHtml) {
        relsContent.innerHTML = relsHtml;
        relsContainer.style.display = 'block';
      } else {
        relsContainer.style.display = 'none';
      }

      // Wire up audio
      const titleAudioBtn = panel.querySelector('#ingredient-audio-title-btn');
      if (cut.name_fr) {
        titleAudioBtn.style.display = 'inline-block';
        titleAudioBtn.onclick = () => speakFrench(cut.name_fr);
      } else {
        titleAudioBtn.style.display = 'none';
      }

      drawer.style.display = 'block';
      
      // Scroll to drawer on mobile
      if (window.innerWidth <= 600) {
        drawer.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  spots.forEach(spot => {
    spot.addEventListener('click', (e) => {
      const itemId = e.target.getAttribute('data-id');
      selectItem(itemId, e.target);
    });
  });

  pins.forEach(pin => {
    pin.addEventListener('click', (e) => {
      const itemId = e.target.getAttribute('data-id');
      selectItem(itemId, e.target);
    });
  });

  listBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const itemId = e.target.closest('.list-item-btn').getAttribute('data-id');
      selectItem(itemId, e.target.closest('.list-item-btn'));
    });
  });
}
