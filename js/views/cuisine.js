import { state, toggleFavorite, isFavorite, ensureDataLoaded } from '../../app.js';
import { speakFrench } from '../utils/audio.js';

import { beefCuts, poultryCuts, porcCuts, fishCuts, otherCuts } from './cuisine_ingredients.js';
import { regions } from './cuisine_regions.js';
import { regionRelations, cutRelations } from './cuisine_core.js';
import { dishes } from './cuisine_dishes.js';
import { techniques } from './cuisine_techniques.js';
import { sauces } from './cuisine_sauces.js';
import { science as scienceData } from './cuisine_science.js';

// Helper to generate HTML for relational links
function getRelationBadges(id, type) {
  const rels = type === 'region' ? regionRelations[id] : cutRelations[id];
  if (!rels) return '';
  
  let html = '';
  
  if (rels.dishes && rels.dishes.length > 0) {
    html += `<div style="margin-top: 0.6rem;"><span style="font-size: 0.75rem; font-weight: 700; color: var(--color-accent-hover); text-transform: uppercase; display: block; margin-bottom: 0.2rem;">🍽️ 代表料理 (Classic Dishes):</span> `;
    html += rels.dishes.map(dId => {
      const d = dishes[dId];
      const name = d ? `${d.name_fr} (${d.name_ja})` : dId;
      return `<span class="relation-badge" style="display: inline-block; background-color: rgba(0, 0, 145, 0.05); color: var(--color-primary); padding: 0.25rem 0.5rem; font-size: 0.8rem; border-radius: 4px; margin-right: 0.4rem; margin-top: 0.25rem; border: 1px solid rgba(0, 0, 145, 0.15); font-weight: 500;">${name}</span>`;
    }).join('');
    html += `</div>`;
  }
  
  if (rels.techniques && rels.techniques.length > 0) {
    html += `<div style="margin-top: 0.6rem;"><span style="font-size: 0.75rem; font-weight: 700; color: var(--color-accent-hover); text-transform: uppercase; display: block; margin-bottom: 0.2rem;">🔥 調理技法 (Techniques):</span> `;
    html += rels.techniques.map(tId => {
      const t = techniques[tId];
      const name = t ? `${t.name_fr} (${t.name_ja})` : tId;
      return `<span class="relation-badge" style="display: inline-block; background-color: rgba(220, 38, 38, 0.05); color: var(--color-secondary); padding: 0.25rem 0.5rem; font-size: 0.8rem; border-radius: 4px; margin-right: 0.4rem; margin-top: 0.25rem; border: 1px solid rgba(220, 38, 38, 0.15); font-weight: 500;">${name}</span>`;
    }).join('');
    html += `</div>`;
  }
  
  if (rels.sauces && rels.sauces.length > 0) {
    html += `<div style="margin-top: 0.6rem;"><span style="font-size: 0.75rem; font-weight: 700; color: var(--color-accent-hover); text-transform: uppercase; display: block; margin-bottom: 0.2rem;">🥫 ソース (Sauces):</span> `;
    html += rels.sauces.map(sId => {
      const s = sauces[sId];
      const name = s ? `${s.name_fr} (${s.name_ja})` : sId;
      return `<span class="relation-badge" style="display: inline-block; background-color: rgba(197, 168, 128, 0.1); color: var(--color-text-main); padding: 0.25rem 0.5rem; font-size: 0.8rem; border-radius: 4px; margin-right: 0.4rem; margin-top: 0.25rem; border: 1px solid rgba(197, 168, 128, 0.3); font-weight: 500;">${name}</span>`;
    }).join('');
    html += `</div>`;
  }
  
  if (rels.science && rels.science.length > 0) {
    html += `<div style="margin-top: 0.6rem;"><span style="font-size: 0.75rem; font-weight: 700; color: var(--color-accent-hover); text-transform: uppercase; display: block; margin-bottom: 0.2rem;">🧪 料理科学 (Science):</span> `;
    html += rels.science.map(sId => {
      const s = scienceData[sId];
      const name = s ? `${s.name_fr} (${s.name_ja})` : sId;
      return `<span class="relation-badge" style="display: inline-block; background-color: rgba(107, 156, 104, 0.05); color: var(--color-success); padding: 0.25rem 0.5rem; font-size: 0.8rem; border-radius: 4px; margin-right: 0.4rem; margin-top: 0.25rem; border: 1px solid rgba(107, 156, 104, 0.15); font-weight: 500;">${name}</span>`;
    }).join('');
    html += `</div>`;
  }
  
  if (rels.ingredients && rels.ingredients.length > 0) {
    html += `<div style="margin-top: 0.6rem;"><span style="font-size: 0.75rem; font-weight: 700; color: var(--color-accent-hover); text-transform: uppercase; display: block; margin-bottom: 0.2rem;">🥬 主要食材 (Ingredients):</span> `;
    html += rels.ingredients.map(iId => {
      return `<span class="relation-badge" style="display: inline-block; background-color: rgba(10, 25, 49, 0.05); color: var(--color-text-muted); padding: 0.25rem 0.5rem; font-size: 0.8rem; border-radius: 4px; margin-right: 0.4rem; margin-top: 0.25rem; border: 1px solid rgba(10, 25, 49, 0.15); font-weight: 500;">${iId}</span>`;
    }).join('');
    html += `</div>`;
  }
  
  return html;
}

export function renderCuisine() {
  const container = document.createElement('div');
  
  const title = document.createElement('h2');
  title.className = 'section-title';
  title.innerText = "Théorie de l'Art Culinaire";
  container.appendChild(title);
  
  const subtitle = document.createElement('p');
  subtitle.className = 'section-subtitle';
  subtitle.innerText = "Classical French culinary theory, stock making, classical sauces, and interactive gastronomy diagrams.";
  container.appendChild(subtitle);
  
  // Render sub-tabs navigation
  const tabsNav = document.createElement('div');
  tabsNav.className = 'cuisine-tabs';
  tabsNav.innerHTML = `
    <button class="cuisine-tab-btn active" data-tab="theory">📖 Théorie Classique</button>
    <button class="cuisine-tab-btn" data-tab="meat">🥩 Viandes (お肉)</button>
    <button class="cuisine-tab-btn" data-tab="map">🗺️ Carte Gastronomique</button>
  `;
  container.appendChild(tabsNav);
  
  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'cuisine-content-wrapper';
  container.appendChild(contentWrapper);

  // Tab switching logic
  tabsNav.querySelectorAll('.cuisine-tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      tabsNav.querySelectorAll('.cuisine-tab-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const targetTab = e.target.getAttribute('data-tab');
      renderCuisineSubTab(targetTab);
    });
  });

  function renderCuisineSubTab(tab) {
    contentWrapper.innerHTML = '';
    
    if (tab === 'theory') {
      renderTheoryList();
    } else if (tab === 'meat') {
      renderMeatSection();
    } else if (tab === 'map') {
      renderGastronomyMap();
    }
  }

  // SUB-TAB 1: CLASSICAL TEXT GUIDES
  function renderTheoryList() {
    contentWrapper.innerHTML = `<div style="text-align: center; padding: 2rem; color: var(--color-text-muted);">Chargement de la théorie... (Loading theory...)</div>`;
    
    const activeLevel = state.settings?.targetLevel || 'ALL';
    ensureDataLoaded('knowledge', activeLevel).then(() => {
      contentWrapper.innerHTML = '';
      const theoryItems = (state.db?.knowledge || [])
        .filter(item => item.cuisine)
        .map(item => ({
          id: item.id,
          level: item.level,
          category: item.category || "Theory",
          topic: item.cuisine.topic,
          content_fr: item.cuisine.content_fr,
          content_en: item.cuisine.content_en,
          content_ja: item.cuisine.content_ja
        }));
      const filteredItems = theoryItems.filter(item => activeLevel === 'ALL' || item.level === activeLevel);
      
      if (filteredItems.length === 0) {
        contentWrapper.innerHTML = `<p style="color: var(--color-text-muted);">Aucun document de théorie culinaire disponible pour ce niveau.</p>`;
        return;
      }
      
      const listContainer = document.createElement('div');
      listContainer.style.display = 'flex';
      listContainer.style.flexDirection = 'column';
      listContainer.style.gap = '2rem';
      
      filteredItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.display = 'block';
        card.style.padding = '2rem';
        
        const isFav = isFavorite(item.id);
        const frMatch = item.topic.match(/^([^(]+)/);
        const frTitle = frMatch ? frMatch[1].trim() : item.topic;
        
        card.innerHTML = `
          <div class="card-category" style="margin-bottom: 0.5rem;">${item.category}</div>
          <div class="term-header" style="border-bottom: 1px solid rgba(197, 168, 128, 0.15); padding-bottom: 0.8rem; margin-bottom: 1.5rem;">
            <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
              <h3 style="font-family: var(--font-serif); font-size: 1.6rem; color: var(--color-primary); margin: 0;">${item.topic}</h3>
              <button class="audio-btn" data-text="${frTitle}" title="Listen topic pronunciation" style="background: none; border: none; font-size: 1.1rem; cursor: pointer; color: var(--color-accent); padding: 0.15rem; line-height: 1;">🔊</button>
            </div>
            <button class="fav-btn ${isFav ? 'active' : ''}" data-id="${item.id}" style="font-size: 1.3rem;">
              ${isFav ? '★' : '☆'}
            </button>
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.3rem;">
                <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-accent); font-weight: 600;">Français</h4>
                <button class="audio-btn" data-text="${item.content_fr}" title="Listen paragraph" style="background: none; border: none; font-size: 0.95rem; cursor: pointer; color: var(--color-accent); padding: 0.15rem; line-height: 1;">🔊</button>
              </div>
              <p style="font-size: 0.95rem; color: var(--color-primary); font-style: italic; text-align: justify; line-height: 1.6;">${item.content_fr}</p>
            </div>
            <div>
              <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-accent); font-weight: 600; margin-bottom: 0.3rem;">English Explanation</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-main); text-align: justify; line-height: 1.6;">${item.content_en}</p>
            </div>
            <div style="background-color: rgba(10, 25, 49, 0.03); padding: 1.2rem; border-radius: var(--radius-sm); border-left: 3px solid var(--color-secondary);">
              <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-primary); font-weight: 600; margin-bottom: 0.3rem;">解説（日本語）</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-main); text-align: justify; line-height: 1.6;">${item.content_ja}</p>
            </div>
          </div>
        `;
        
        // Favorite toggle
        card.querySelector('.fav-btn').addEventListener('click', (e) => {
          e.stopPropagation();
          toggleFavorite(item.id);
          const button = e.target;
          const nowFav = isFavorite(item.id);
          button.classList.toggle('active', nowFav);
          button.innerText = nowFav ? '★' : '☆';
        });
        
        // Audio trigger
        card.querySelectorAll('.audio-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const text = e.target.closest('.audio-btn').getAttribute('data-text');
            speakFrench(text);
          });
        });
        
        listContainer.appendChild(card);
      });
      
      contentWrapper.appendChild(listContainer);
    });
  }

  // SUB-TAB 2: INTERACTIVE MEAT SECTION
  function renderMeatSection() {
    const sectionContainer = document.createElement('div');
    sectionContainer.className = 'meat-section-container';
    
    // Sub-sub tabs (Beef, Pork, Poultry)
    const subTabs = document.createElement('div');
    subTabs.className = 'meat-type-tabs';
    subTabs.innerHTML = `
      <button class="meat-tab-btn active" data-type="beef">🐂 Bœuf (牛)</button>
      <button class="meat-tab-btn" data-type="porc">🐖 Porc (豚)</button>
      <button class="meat-tab-btn" data-type="volaille">🐓 Volaille (鶏)</button>
      <button class="meat-tab-btn" data-type="poisson">🐟 Poisson (魚介)</button>
      <button class="meat-tab-btn" data-type="autre">🦌 Autres (その他肉)</button>
    `;
    sectionContainer.appendChild(subTabs);
    
    const displayArea = document.createElement('div');
    displayArea.className = 'meat-display-area';
    sectionContainer.appendChild(displayArea);
    
    contentWrapper.appendChild(sectionContainer);
    
    // Inner Tab switching
    subTabs.querySelectorAll('.meat-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        subTabs.querySelectorAll('.meat-tab-btn').forEach(b => b.classList.remove('active'));
        const activeBtn = e.target.closest('.meat-tab-btn');
        activeBtn.classList.add('active');
        const meatType = activeBtn.getAttribute('data-type');
        renderMeatType(meatType, displayArea);
      });
    });
    
    // Initial display
    renderMeatType('beef', displayArea);
  }

  function renderMeatType(type, wrapper) {
    wrapper.innerHTML = '';
    
    // Define parameters and source arrays for each type
    const config = {
      beef: {
        cuts: beefCuts,
        pdf: 'beef_maff_guide.pdf',
        pdfText: '📄 日本農水省 牛肉部位基準 (PDF)',
        quote: '',
        img: 'assets/beef_cuts.png',
        alt: 'French Beef Cuts Diagram',
        placeholder: 'Coupe+de+Boeuf',
        label: 'Coupe de Bœuf',
        propName: 'beef'
      },
      porc: {
        cuts: porcCuts,
        pdf: 'pork_maff_guide.pdf',
        pdfText: '📄 日本農水省 豚肉部位基準 (PDF)',
        quote: '"Tout est bon dans le cochon" (豚はすべてが使える食材である)',
        img: 'assets/porc_cuts.png',
        alt: 'French Pork Cuts Diagram',
        placeholder: 'Coupe+de+Porc',
        label: 'Coupe de Porc',
        propName: 'pork'
      },
      volaille: {
        cuts: poultryCuts,
        pdf: 'poultry_maff_guide.pdf',
        pdfText: '📄 日本農水省 鶏肉部位基準 (PDF)',
        quote: '"La volaille est la reine des cuisines et la directrice des banquets" (鶏肉は厨房の女王であり、宴の演出家である)',
        img: 'assets/poultry_cuts.png',
        alt: 'French Poultry Cuts Diagram',
        placeholder: 'Coupe+de+Volaille',
        label: 'Coupe de Volaille',
        propName: 'poultry'
      },
      poisson: {
        cuts: fishCuts,
        pdf: '',
        pdfText: '',
        quote: '',
        img: 'assets/fish_cuts.png',
        alt: 'French Fish Cuts Diagram',
        placeholder: 'Coupe+de+Poisson',
        label: 'Coupe de Poisson',
        propName: 'fish'
      },
      autre: {
        cuts: otherCuts,
        pdf: '',
        pdfText: '',
        quote: '',
        img: 'assets/other_cuts.png',
        alt: 'French Other Meats Cuts Diagram',
        placeholder: 'Autres+Viandes',
        label: 'Autres Viandes',
        propName: 'other'
      }
    };

    const cfg = config[type];
    if (!cfg) return;

    const panel = document.createElement('div');
    
    let html = '';
    
    // 1. Quote header if available
    if (cfg.quote) {
      html += `
        <div style="background-color: rgba(197, 168, 128, 0.05); padding: 1rem; border-radius: var(--radius-sm); border-left: 3px solid var(--color-accent); margin-bottom: 1.5rem; text-align: center;">
          <span style="font-family: var(--font-serif); font-size: 1.1rem; font-style: italic; color: var(--color-primary);">${cfg.quote}</span>
        </div>
      `;
    }

    // 2. PDF link if available
    if (cfg.pdf) {
      html += `
        <div style="display: flex; justify-content: flex-end; margin-bottom: 0.8rem;">
          <a href="${cfg.pdf}" target="_blank" class="next-btn" style="text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; padding: 0.4rem 0.8rem; background-color: rgba(197, 168, 128, 0.08); color: var(--color-primary); border: 1px solid rgba(197, 168, 128, 0.3); border-radius: var(--radius-sm); font-weight: 600; cursor: pointer; transition: var(--transition);">
            ${cfg.pdfText}
          </a>
        </div>
      `;
    }

    // 3. Interactive image map
    html += `
      <div class="interactive-canvas-container" style="position: relative;">
        <img src="${cfg.img}" alt="${cfg.alt}" class="interactive-image" onerror="this.src='https://placehold.co/700x450/F4EAD4/0a1931?text=${cfg.placeholder}'">
        <svg class="interactive-svg-overlay" viewBox="0 0 100 100">
          ${cfg.cuts.map(cut => `
            <polygon class="interactive-area" points="${cut.points}" data-id="${cut.id}" />
          `).join('')}
        </svg>
      </div>
      
      <div class="cuisine-detail-drawer" id="${cfg.propName}-detail-drawer">
        <div class="detail-drawer-header">
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <h3 class="detail-drawer-title" id="${cfg.propName}-cut-title">Select a Cut</h3>
            <button class="audio-btn" id="${cfg.propName}-audio-title-btn" style="background: none; border: none; font-size: 1.1rem; cursor: pointer; color: var(--color-accent); display: none;">🔊</button>
          </div>
          <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; color: var(--color-text-muted); font-weight: 600;" id="${cfg.propName}-cut-sub">${cfg.label}</span>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <!-- Properties Grid -->
          <div class="meat-properties-grid">
            <div class="meat-prop-item">
              <span class="meat-prop-label">柔らかさ (Tendreté)</span>
              <strong class="meat-prop-val" id="${cfg.propName}-prop-tenderness">-</strong>
            </div>
            <div class="meat-prop-item">
              <span class="meat-prop-label">脂 (Gras)</span>
              <strong class="meat-prop-val" id="${cfg.propName}-prop-fat">-</strong>
            </div>
            <div class="meat-prop-item">
              <span class="meat-prop-label">コラーゲン (Collagène)</span>
              <strong class="meat-prop-val" id="${cfg.propName}-prop-collagen">-</strong>
            </div>
          </div>

          <!-- Basic Details -->
          <div class="meat-detail-grid">
            <div class="meat-detail-block">
              <h4 class="meat-block-title">向く調理</h4>
              <p class="meat-block-text" id="${cfg.propName}-cooking"></p>
            </div>
            <div class="meat-detail-block">
              <h4 class="meat-block-title">${cfg.propName === 'poultry' ? '代表料理 (Plat Classique)' : (type === 'poisson' || type === 'autre' ? '特徴・分類' : 'フランス的分類')}</h4>
              <p class="meat-block-text" id="${cfg.propName}-classification"></p>
            </div>
          </div>

          <!-- Logic & Science -->
          <div class="meat-detail-grid">
            <div class="meat-detail-block">
              <h4 class="meat-block-title">Cooking Logic</h4>
              <p class="meat-block-text highlight-code" id="${cfg.propName}-logic"></p>
            </div>
            <div class="meat-detail-block">
              <h4 class="meat-block-title">料理科学 (Science)</h4>
              <p class="meat-block-text" id="${cfg.propName}-science"></p>
            </div>
          </div>

          <!-- Chef's Note -->
          <div class="chef-note-box">
            <h4 class="chef-note-title">👨‍🍳 Chef's Note</h4>
            <p class="chef-note-text" id="${cfg.propName}-chef-note"></p>
          </div>

          <!-- Relations -->
          <div id="${cfg.propName}-relations-container" style="display: none; border-top: 1px solid rgba(197, 168, 128, 0.15); padding-top: 1.2rem;">
            <h4 class="meat-block-title">🔗 関連知識とのつながり (Relations)</h4>
            <div id="${cfg.propName}-relations-content"></div>
          </div>
        </div>
      </div>
    `;

    panel.innerHTML = html;
    wrapper.appendChild(panel);

    const drawer = panel.querySelector(`#${cfg.propName}-detail-drawer`);
    const spots = panel.querySelectorAll('.interactive-area');

    spots.forEach(spot => {
      spot.addEventListener('click', (e) => {
        spots.forEach(s => s.classList.remove('active'));
        e.target.classList.add('active');

        const cutId = e.target.getAttribute('data-id');
        const cut = cfg.cuts.find(c => c.id === cutId);
        
        if (cut) {
          panel.querySelector(`#${cfg.propName}-cut-title`).innerText = `${cut.name_fr} (${cut.name_ja})`;
          panel.querySelector(`#${cfg.propName}-cut-sub`).innerText = `Cut #${cut.number} • ${cut.name_en}`;
          
          panel.querySelector(`#${cfg.propName}-prop-tenderness`).innerText = cut.properties.tenderness;
          panel.querySelector(`#${cfg.propName}-prop-fat`).innerText = cut.properties.fat;
          panel.querySelector(`#${cfg.propName}-prop-collagen`).innerText = cut.properties.collagen;
          
          panel.querySelector(`#${cfg.propName}-cooking`).innerText = cut.cooking;
          panel.querySelector(`#${cfg.propName}-classification`).innerText = cut.classification;
          panel.querySelector(`#${cfg.propName}-logic`).innerText = cut.logic;
          panel.querySelector(`#${cfg.propName}-science`).innerText = cut.science;
          panel.querySelector(`#${cfg.propName}-chef-note`).innerText = cut.chef_note;

          // Render relations
          const relsContainer = panel.querySelector(`#${cfg.propName}-relations-container`);
          const relsContent = panel.querySelector(`#${cfg.propName}-relations-content`);
          const relsHtml = getRelationBadges(cutId, 'cut');
          if (relsHtml) {
            relsContent.innerHTML = relsHtml;
            relsContainer.style.display = 'block';
          } else {
            relsContainer.style.display = 'none';
          }

          // Wire up audio
          const titleAudioBtn = panel.querySelector(`#${cfg.propName}-audio-title-btn`);
          titleAudioBtn.style.display = 'inline-block';
          titleAudioBtn.onclick = () => speakFrench(cut.name_fr);

          drawer.style.display = 'block';
        }
      });
    });
  }

  // SUB-TAB 3: GEOGRAPHIC CULINARY MAP
  function renderGastronomyMap() {
    const panel = document.createElement('div');
    panel.innerHTML = `
      <div class="interactive-canvas-container" style="position: relative;">
        <img src="assets/france_map.png" alt="Gastronomic Map of France" class="interactive-image" onerror="this.src='https://placehold.co/700x450/F4EAD4/0a1931?text=Carte+Gastronomique'">
        <svg class="interactive-svg-overlay" viewBox="0 0 100 100">
          ${regions.map(reg => `
            <polygon class="interactive-area" points="${reg.points}" data-id="${reg.id}" />
          `).join('')}
        </svg>
      </div>
      
      <div class="cuisine-detail-drawer" id="map-detail-drawer">
        <div class="detail-drawer-header">
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <h3 class="detail-drawer-title" id="map-region-title">Select a Region</h3>
            <button class="audio-btn" id="map-audio-title-btn" style="background: none; border: none; font-size: 1.1rem; cursor: pointer; color: var(--color-accent); display: none;">🔊</button>
          </div>
          <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; color: var(--color-text-muted); font-weight: 600;" id="map-region-sub">Région Gastronomique</span>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 1.2rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.3rem;">
              <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-accent); font-weight: 600;">Français</h4>
              <button class="audio-btn" id="map-audio-desc-btn" style="background: none; border: none; font-size: 0.95rem; cursor: pointer; color: var(--color-accent); display: none;">🔊</button>
            </div>
            <p style="font-size: 0.95rem; color: var(--color-primary); font-style: italic; line-height: 1.5; text-align: justify;" id="map-desc-fr"></p>
          </div>
          <div>
            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-accent); font-weight: 600; margin-bottom: 0.3rem;">English Description</h4>
            <p style="font-size: 0.9rem; color: var(--color-text-main); line-height: 1.5; text-align: justify;" id="map-desc-en"></p>
          </div>
          <div>
            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-accent); font-weight: 600; margin-bottom: 0.3rem;">日本語解説</h4>
            <p style="font-size: 0.9rem; color: var(--color-text-main); line-height: 1.5; text-align: justify;" id="map-desc-ja"></p>
          </div>
          
          <!-- Relations -->
          <div id="map-relations-container" style="display: none; border-top: 1px solid rgba(197, 168, 128, 0.15); padding-top: 1.2rem;">
            <h4 class="meat-block-title">🔗 地域と食・技術のつながり (Relations)</h4>
            <div id="map-relations-content"></div>
          </div>
        </div>
      </div>
    `;

    contentWrapper.appendChild(panel);

    const drawer = panel.querySelector('#map-detail-drawer');
    const spots = panel.querySelectorAll('.interactive-area');

    spots.forEach(spot => {
      spot.addEventListener('click', (e) => {
        spots.forEach(s => s.classList.remove('active'));
        e.target.classList.add('active');

        const regId = e.target.getAttribute('data-id');
        const reg = regions.find(r => r.id === regId);
        
        if (reg) {
          panel.querySelector('#map-region-title').innerText = `${reg.name_fr} (${reg.name_ja})`;
          panel.querySelector('#map-region-sub').innerText = `${reg.name_en} Region`;
          
          panel.querySelector('#map-desc-fr').innerText = reg.desc_fr;
          panel.querySelector('#map-desc-en').innerText = reg.desc_en;
          panel.querySelector('#map-desc-ja').innerText = reg.desc_ja;

          // Render relations
          const relsContainer = panel.querySelector('#map-relations-container');
          const relsContent = panel.querySelector('#map-relations-content');
          const relsHtml = getRelationBadges(regId, 'region');
          if (relsHtml) {
            relsContent.innerHTML = relsHtml;
            relsContainer.style.display = 'block';
          } else {
            relsContainer.style.display = 'none';
          }

          // Wire up audio
          const titleAudioBtn = panel.querySelector('#map-audio-title-btn');
          titleAudioBtn.style.display = 'inline-block';
          titleAudioBtn.onclick = () => speakFrench(reg.name_fr);

          const descAudioBtn = panel.querySelector('#map-audio-desc-btn');
          descAudioBtn.style.display = 'inline-block';
          descAudioBtn.onclick = () => speakFrench(reg.desc_fr);

          drawer.style.display = 'block';
        }
      });
    });
  }

  // Load default tab
  renderCuisineSubTab('theory');
  
  return container;
}
