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
    ensureDataLoaded('cuisine', activeLevel).then(() => {
      contentWrapper.innerHTML = '';
      const theoryItems = state.db?.cuisine || [];
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
    
    if (type === 'beef') {
      const panel = document.createElement('div');
      panel.innerHTML = `
        <div style="display: flex; justify-content: flex-end; margin-bottom: 0.8rem;">
          <a href="beef_maff_guide.pdf" target="_blank" class="next-btn" style="text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; padding: 0.4rem 0.8rem; background-color: rgba(197, 168, 128, 0.08); color: var(--color-primary); border: 1px solid rgba(197, 168, 128, 0.3); border-radius: var(--radius-sm); font-weight: 600; cursor: pointer; transition: var(--transition);">
            📄 日本農水省 牛肉部位基準 (PDF)
          </a>
        </div>
        <div class="interactive-canvas-container" style="position: relative;">
          <img src="assets/beef_cuts.png" alt="French Beef Cuts Diagram" class="interactive-image" onerror="this.src='https://placehold.co/700x450/F4EAD4/0a1931?text=Coupe+de+Boeuf'">
          <svg class="interactive-svg-overlay" viewBox="0 0 100 100">
            ${beefCuts.map(cut => `
              <polygon class="interactive-area" points="${cut.points}" data-id="${cut.id}" />
            `).join('')}
          </svg>
        </div>
        
        <div class="cuisine-detail-drawer" id="beef-detail-drawer">
          <div class="detail-drawer-header">
            <div style="display: flex; align-items: center; gap: 0.6rem;">
              <h3 class="detail-drawer-title" id="beef-cut-title">Select a Cut</h3>
              <button class="audio-btn" id="beef-audio-title-btn" style="background: none; border: none; font-size: 1.1rem; cursor: pointer; color: var(--color-accent); display: none;">🔊</button>
            </div>
            <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; color: var(--color-text-muted); font-weight: 600;" id="beef-cut-sub">Coupe de Bœuf</span>
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <!-- Properties Grid -->
            <div class="meat-properties-grid">
              <div class="meat-prop-item">
                <span class="meat-prop-label">柔らかさ (Tendreté)</span>
                <strong class="meat-prop-val" id="beef-prop-tenderness">-</strong>
              </div>
              <div class="meat-prop-item">
                <span class="meat-prop-label">脂 (Gras)</span>
                <strong class="meat-prop-val" id="beef-prop-fat">-</strong>
              </div>
              <div class="meat-prop-item">
                <span class="meat-prop-label">コラーゲン (Collagène)</span>
                <strong class="meat-prop-val" id="beef-prop-collagen">-</strong>
              </div>
            </div>

            <!-- Basic Details -->
            <div class="meat-detail-grid">
              <div class="meat-detail-block">
                <h4 class="meat-block-title">向く調理</h4>
                <p class="meat-block-text" id="beef-cooking"></p>
              </div>
              <div class="meat-detail-block">
                <h4 class="meat-block-title">フランス的分類</h4>
                <p class="meat-block-text" id="beef-classification"></p>
              </div>
            </div>

            <!-- Logic & Science -->
            <div class="meat-detail-grid">
              <div class="meat-detail-block">
                <h4 class="meat-block-title">Cooking Logic</h4>
                <p class="meat-block-text highlight-code" id="beef-logic"></p>
              </div>
              <div class="meat-detail-block">
                <h4 class="meat-block-title">料理科学 (Science)</h4>
                <p class="meat-block-text" id="beef-science"></p>
              </div>
            </div>

            <!-- Chef's Note -->
            <div class="chef-note-box">
              <h4 class="chef-note-title">👨‍🍳 Chef's Note</h4>
              <p class="chef-note-text" id="beef-chef-note"></p>
            </div>

            <!-- Relations -->
            <div id="beef-relations-container" style="display: none; border-top: 1px solid rgba(197, 168, 128, 0.15); padding-top: 1.2rem;">
              <h4 class="meat-block-title">🔗 関連知識とのつながり (Relations)</h4>
              <div id="beef-relations-content"></div>
            </div>
          </div>
        </div>
      `;

      wrapper.appendChild(panel);

      const drawer = panel.querySelector('#beef-detail-drawer');
      const spots = panel.querySelectorAll('.interactive-area');

      spots.forEach(spot => {
        spot.addEventListener('click', (e) => {
          spots.forEach(s => s.classList.remove('active'));
          e.target.classList.add('active');

          const cutId = e.target.getAttribute('data-id');
          const cut = beefCuts.find(c => c.id === cutId);
          
          if (cut) {
            panel.querySelector('#beef-cut-title').innerText = `${cut.name_fr} (${cut.name_ja})`;
            panel.querySelector('#beef-cut-sub').innerText = `Cut #${cut.number} • ${cut.name_en}`;
            
            panel.querySelector('#beef-prop-tenderness').innerText = cut.properties.tenderness;
            panel.querySelector('#beef-prop-fat').innerText = cut.properties.fat;
            panel.querySelector('#beef-prop-collagen').innerText = cut.properties.collagen;
            
            panel.querySelector('#beef-cooking').innerText = cut.cooking;
            panel.querySelector('#beef-classification').innerText = cut.classification;
            panel.querySelector('#beef-logic').innerText = cut.logic;
            panel.querySelector('#beef-science').innerText = cut.science;
            panel.querySelector('#beef-chef-note').innerText = cut.chef_note;

            // Render relations
            const relsContainer = panel.querySelector('#beef-relations-container');
            const relsContent = panel.querySelector('#beef-relations-content');
            const relsHtml = getRelationBadges(cutId, 'cut');
            if (relsHtml) {
              relsContent.innerHTML = relsHtml;
              relsContainer.style.display = 'block';
            } else {
              relsContainer.style.display = 'none';
            }

            // Wire up audio
            const titleAudioBtn = panel.querySelector('#beef-audio-title-btn');
            titleAudioBtn.style.display = 'inline-block';
            titleAudioBtn.onclick = () => speakFrench(cut.name_fr);

            drawer.style.display = 'block';
          }
        });
      });

    } else if (type === 'porc') {
      const panel = document.createElement('div');
      panel.innerHTML = `
        <div style="background-color: rgba(197, 168, 128, 0.05); padding: 1rem; border-radius: var(--radius-sm); border-left: 3px solid var(--color-accent); margin-bottom: 1.5rem; text-align: center;">
          <span style="font-family: var(--font-serif); font-size: 1.1rem; font-style: italic; color: var(--color-primary);">"Tout est bon dans le cochon" (豚はすべてが使える食材である)</span>
        </div>
        <div style="display: flex; justify-content: flex-end; margin-bottom: 0.8rem;">
          <a href="pork_maff_guide.pdf" target="_blank" class="next-btn" style="text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; padding: 0.4rem 0.8rem; background-color: rgba(197, 168, 128, 0.08); color: var(--color-primary); border: 1px solid rgba(197, 168, 128, 0.3); border-radius: var(--radius-sm); font-weight: 600; cursor: pointer; transition: var(--transition);">
            📄 日本農水省 豚肉部位基準 (PDF)
          </a>
        </div>
        <div class="interactive-canvas-container" style="position: relative;">
          <img src="assets/porc_cuts.png" alt="French Pork Cuts Diagram" class="interactive-image" onerror="this.src='https://placehold.co/700x450/F4EAD4/0a1931?text=Coupe+de+Porc'">
          <svg class="interactive-svg-overlay" viewBox="0 0 100 100">
            ${porcCuts.map(cut => `
              <polygon class="interactive-area" points="${cut.points}" data-id="${cut.id}" />
            `).join('')}
          </svg>
        </div>
        
        <div class="cuisine-detail-drawer" id="pork-detail-drawer">
          <div class="detail-drawer-header">
            <div style="display: flex; align-items: center; gap: 0.6rem;">
              <h3 class="detail-drawer-title" id="pork-cut-title">Select a Cut</h3>
              <button class="audio-btn" id="pork-audio-title-btn" style="background: none; border: none; font-size: 1.1rem; cursor: pointer; color: var(--color-accent); display: none;">🔊</button>
            </div>
            <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; color: var(--color-text-muted); font-weight: 600;" id="pork-cut-sub">Coupe de Porc</span>
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <!-- Properties Grid -->
            <div class="meat-properties-grid">
              <div class="meat-prop-item">
                <span class="meat-prop-label">柔らかさ (Tendreté)</span>
                <strong class="meat-prop-val" id="pork-prop-tenderness">-</strong>
              </div>
              <div class="meat-prop-item">
                <span class="meat-prop-label">脂 (Gras)</span>
                <strong class="meat-prop-val" id="pork-prop-fat">-</strong>
              </div>
              <div class="meat-prop-item">
                <span class="meat-prop-label">コラーゲン (Collagène)</span>
                <strong class="meat-prop-val" id="pork-prop-collagen">-</strong>
              </div>
            </div>

            <!-- Basic Details -->
            <div class="meat-detail-grid">
              <div class="meat-detail-block">
                <h4 class="meat-block-title">向く調理</h4>
                <p class="meat-block-text" id="pork-cooking"></p>
              </div>
              <div class="meat-detail-block">
                <h4 class="meat-block-title">フランス的分類</h4>
                <p class="meat-block-text" id="pork-classification"></p>
              </div>
            </div>

            <!-- Logic & Science -->
            <div class="meat-detail-grid">
              <div class="meat-detail-block">
                <h4 class="meat-block-title">Cooking Logic</h4>
                <p class="meat-block-text highlight-code" id="pork-logic"></p>
              </div>
              <div class="meat-detail-block">
                <h4 class="meat-block-title">料理科学 (Science)</h4>
                <p class="meat-block-text" id="pork-science"></p>
              </div>
            </div>

            <!-- Chef's Note -->
            <div class="chef-note-box">
              <h4 class="chef-note-title">👨‍🍳 Chef's Note</h4>
              <p class="chef-note-text" id="pork-chef-note"></p>
            </div>

            <!-- Relations -->
            <div id="pork-relations-container" style="display: none; border-top: 1px solid rgba(197, 168, 128, 0.15); padding-top: 1.2rem;">
              <h4 class="meat-block-title">🔗 関連知識とのつながり (Relations)</h4>
              <div id="pork-relations-content"></div>
            </div>
          </div>
        </div>
      `;

      wrapper.appendChild(panel);

      const drawer = panel.querySelector('#pork-detail-drawer');
      const spots = panel.querySelectorAll('.interactive-area');

      spots.forEach(spot => {
        spot.addEventListener('click', (e) => {
          spots.forEach(s => s.classList.remove('active'));
          e.target.classList.add('active');

          const cutId = e.target.getAttribute('data-id');
          const cut = porcCuts.find(c => c.id === cutId);
          
          if (cut) {
            panel.querySelector('#pork-cut-title').innerText = `${cut.name_fr} (${cut.name_ja})`;
            panel.querySelector('#pork-cut-sub').innerText = `Cut #${cut.number} • ${cut.name_en}`;
            
            panel.querySelector('#pork-prop-tenderness').innerText = cut.properties.tenderness;
            panel.querySelector('#pork-prop-fat').innerText = cut.properties.fat;
            panel.querySelector('#pork-prop-collagen').innerText = cut.properties.collagen;
            
            panel.querySelector('#pork-cooking').innerText = cut.cooking;
            panel.querySelector('#pork-classification').innerText = cut.classification;
            panel.querySelector('#pork-logic').innerText = cut.logic;
            panel.querySelector('#pork-science').innerText = cut.science;
            panel.querySelector('#pork-chef-note').innerText = cut.chef_note;

            // Render relations
            const relsContainer = panel.querySelector('#pork-relations-container');
            const relsContent = panel.querySelector('#pork-relations-content');
            const relsHtml = getRelationBadges(cutId, 'cut');
            if (relsHtml) {
              relsContent.innerHTML = relsHtml;
              relsContainer.style.display = 'block';
            } else {
              relsContainer.style.display = 'none';
            }

            // Wire up audio
            const titleAudioBtn = panel.querySelector('#pork-audio-title-btn');
            titleAudioBtn.style.display = 'inline-block';
            titleAudioBtn.onclick = () => speakFrench(cut.name_fr);

            drawer.style.display = 'block';
          }
        });
      });

    } else if (type === 'volaille') {
      const panel = document.createElement('div');
      panel.innerHTML = `
        <div style="display: flex; justify-content: flex-end; margin-bottom: 0.8rem;">
          <a href="poultry_maff_guide.pdf" target="_blank" class="next-btn" style="text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; padding: 0.4rem 0.8rem; background-color: rgba(197, 168, 128, 0.08); color: var(--color-primary); border: 1px solid rgba(197, 168, 128, 0.3); border-radius: var(--radius-sm); font-weight: 600; cursor: pointer; transition: var(--transition);">
            📄 日本農水省 鶏肉部位基準 (PDF)
          </a>
        </div>
        <div class="interactive-canvas-container" style="position: relative;">
          <img src="assets/poultry_cuts.png" alt="French Poultry Cuts Diagram" class="interactive-image" onerror="this.src='https://placehold.co/700x450/F4EAD4/0a1931?text=Coupe+de+Volaille'">
          <svg class="interactive-svg-overlay" viewBox="0 0 100 100">
            ${poultryCuts.map(cut => `
              <polygon class="interactive-area" points="${cut.points}" data-id="${cut.id}" />
            `).join('')}
          </svg>
        </div>
        
        <div class="cuisine-detail-drawer" id="poultry-detail-drawer">
          <div class="detail-drawer-header">
            <div style="display: flex; align-items: center; gap: 0.6rem;">
              <h3 class="detail-drawer-title" id="poultry-cut-title">Select a Cut</h3>
              <button class="audio-btn" id="poultry-audio-title-btn" style="background: none; border: none; font-size: 1.1rem; cursor: pointer; color: var(--color-accent); display: none;">🔊</button>
            </div>
            <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; color: var(--color-text-muted); font-weight: 600;" id="poultry-cut-sub">Coupe de Volaille</span>
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <!-- Properties Grid -->
            <div class="meat-properties-grid">
              <div class="meat-prop-item">
                <span class="meat-prop-label">柔らかさ (Tendreté)</span>
                <strong class="meat-prop-val" id="poultry-prop-tenderness">-</strong>
              </div>
              <div class="meat-prop-item">
                <span class="meat-prop-label">脂 (Gras)</span>
                <strong class="meat-prop-val" id="poultry-prop-fat">-</strong>
              </div>
              <div class="meat-prop-item">
                <span class="meat-prop-label">コラーゲン (Collagène)</span>
                <strong class="meat-prop-val" id="poultry-prop-collagen">-</strong>
              </div>
            </div>

            <!-- Basic Details -->
            <div class="meat-detail-grid">
              <div class="meat-detail-block">
                <h4 class="meat-block-title">向く調理</h4>
                <p class="meat-block-text" id="poultry-cooking"></p>
              </div>
              <div class="meat-detail-block">
                <h4 class="meat-block-title">代表料理 (Plat Classique)</h4>
                <p class="meat-block-text" id="poultry-classification"></p>
              </div>
            </div>

            <!-- Logic & Science -->
            <div class="meat-detail-grid">
              <div class="meat-detail-block">
                <h4 class="meat-block-title">Cooking Logic</h4>
                <p class="meat-block-text highlight-code" id="poultry-logic"></p>
              </div>
              <div class="meat-detail-block">
                <h4 class="meat-block-title">料理科学 (Science)</h4>
                <p class="meat-block-text" id="poultry-science"></p>
              </div>
            </div>

            <!-- Chef's Note -->
            <div class="chef-note-box">
              <h4 class="chef-note-title">👨‍🍳 Chef's Note</h4>
              <p class="chef-note-text" id="poultry-chef-note"></p>
            </div>

            <!-- Relations -->
            <div id="poultry-relations-container" style="display: none; border-top: 1px solid rgba(197, 168, 128, 0.15); padding-top: 1.2rem;">
              <h4 class="meat-block-title">🔗 関連知識とのつながり (Relations)</h4>
              <div id="poultry-relations-content"></div>
            </div>
          </div>
        </div>
      `;

      wrapper.appendChild(panel);

      const drawer = panel.querySelector('#poultry-detail-drawer');
      const spots = panel.querySelectorAll('.interactive-area');

      spots.forEach(spot => {
        spot.addEventListener('click', (e) => {
          spots.forEach(s => s.classList.remove('active'));
          e.target.classList.add('active');

          const cutId = e.target.getAttribute('data-id');
          const cut = poultryCuts.find(c => c.id === cutId);
          
          if (cut) {
            panel.querySelector('#poultry-cut-title').innerText = `${cut.name_fr} (${cut.name_ja})`;
            panel.querySelector('#poultry-cut-sub').innerText = `Cut #${cut.number} • ${cut.name_en}`;
            
            panel.querySelector('#poultry-prop-tenderness').innerText = cut.properties.tenderness;
            panel.querySelector('#poultry-prop-fat').innerText = cut.properties.fat;
            panel.querySelector('#poultry-prop-collagen').innerText = cut.properties.collagen;
            
            panel.querySelector('#poultry-cooking').innerText = cut.cooking;
            panel.querySelector('#poultry-classification').innerText = cut.classification;
            panel.querySelector('#poultry-logic').innerText = cut.logic;
            panel.querySelector('#poultry-science').innerText = cut.science;
            panel.querySelector('#poultry-chef-note').innerText = cut.chef_note;

            // Render relations
            const relsContainer = panel.querySelector('#poultry-relations-container');
            const relsContent = panel.querySelector('#poultry-relations-content');
            const relsHtml = getRelationBadges(cutId, 'cut');
            if (relsHtml) {
              relsContent.innerHTML = relsHtml;
              relsContainer.style.display = 'block';
            } else {
              relsContainer.style.display = 'none';
            }

            // Wire up audio
            const titleAudioBtn = panel.querySelector('#poultry-audio-title-btn');
            titleAudioBtn.style.display = 'inline-block';
            titleAudioBtn.onclick = () => speakFrench(cut.name_fr);

            drawer.style.display = 'block';
          }
        });
      });

    } else if (type === 'poisson') {
      const panel = document.createElement('div');
      panel.innerHTML = `
        <div class="interactive-canvas-container" style="position: relative;">
          <img src="assets/fish_cuts.png" alt="French Fish Cuts Diagram" class="interactive-image" onerror="this.src='https://placehold.co/700x450/0A1931/ffffff?text=Coupe+de+Poisson'">
          <svg class="interactive-svg-overlay" viewBox="0 0 100 100">
            ${fishCuts.map(cut => `
              <polygon class="interactive-area" points="${cut.points}" data-id="${cut.id}" />
            `).join('')}
          </svg>
        </div>
        
        <div class="cuisine-detail-drawer" id="fish-detail-drawer">
          <div class="detail-drawer-header">
            <div style="display: flex; align-items: center; gap: 0.6rem;">
              <h3 class="detail-drawer-title" id="fish-cut-title">Select a Cut</h3>
              <button class="audio-btn" id="fish-audio-title-btn" style="background: none; border: none; font-size: 1.1rem; cursor: pointer; color: var(--color-accent); display: none;">🔊</button>
            </div>
            <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; color: var(--color-text-muted); font-weight: 600;" id="fish-cut-sub">Coupe de Poisson</span>
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <!-- Properties Grid -->
            <div class="meat-properties-grid">
              <div class="meat-prop-item">
                <span class="meat-prop-label">柔らかさ (Tendreté)</span>
                <strong class="meat-prop-val" id="fish-prop-tenderness">-</strong>
              </div>
              <div class="meat-prop-item">
                <span class="meat-prop-label">脂 (Gras)</span>
                <strong class="meat-prop-val" id="fish-prop-fat">-</strong>
              </div>
              <div class="meat-prop-item">
                <span class="meat-prop-label">コラーゲン (Collagène)</span>
                <strong class="meat-prop-val" id="fish-prop-collagen">-</strong>
              </div>
            </div>

            <!-- Basic Details -->
            <div class="meat-detail-grid">
              <div class="meat-detail-block">
                <h4 class="meat-block-title">向く調理</h4>
                <p class="meat-block-text" id="fish-cooking"></p>
              </div>
              <div class="meat-detail-block">
                <h4 class="meat-block-title">特徴・分類</h4>
                <p class="meat-block-text" id="fish-classification"></p>
              </div>
            </div>

            <!-- Logic & Science -->
            <div class="meat-detail-grid">
              <div class="meat-detail-block">
                <h4 class="meat-block-title">Cooking Logic</h4>
                <p class="meat-block-text highlight-code" id="fish-logic"></p>
              </div>
              <div class="meat-detail-block">
                <h4 class="meat-block-title">料理科学 (Science)</h4>
                <p class="meat-block-text" id="fish-science"></p>
              </div>
            </div>

            <!-- Chef's Note -->
            <div class="chef-note-box">
              <h4 class="chef-note-title">👨‍🍳 Chef's Note</h4>
              <p class="chef-note-text" id="fish-chef-note"></p>
            </div>

            <!-- Relations -->
            <div id="fish-relations-container" style="display: none; border-top: 1px solid rgba(197, 168, 128, 0.15); padding-top: 1.2rem;">
              <h4 class="meat-block-title">🔗 関連知識とのつながり (Relations)</h4>
              <div id="fish-relations-content"></div>
            </div>
          </div>
        </div>
      `;

      wrapper.appendChild(panel);

      const drawer = panel.querySelector('#fish-detail-drawer');
      const spots = panel.querySelectorAll('.interactive-area');

      spots.forEach(spot => {
        spot.addEventListener('click', (e) => {
          spots.forEach(s => s.classList.remove('active'));
          e.target.classList.add('active');

          const cutId = e.target.getAttribute('data-id');
          const cut = fishCuts.find(c => c.id === cutId);
          
          if (cut) {
            panel.querySelector('#fish-cut-title').innerText = `${cut.name_fr} (${cut.name_ja})`;
            panel.querySelector('#fish-cut-sub').innerText = `Cut #${cut.number} • ${cut.name_en}`;
            
            panel.querySelector('#fish-prop-tenderness').innerText = cut.properties.tenderness;
            panel.querySelector('#fish-prop-fat').innerText = cut.properties.fat;
            panel.querySelector('#fish-prop-collagen').innerText = cut.properties.collagen;
            
            panel.querySelector('#fish-cooking').innerText = cut.cooking;
            panel.querySelector('#fish-classification').innerText = cut.classification;
            panel.querySelector('#fish-logic').innerText = cut.logic;
            panel.querySelector('#fish-science').innerText = cut.science;
            panel.querySelector('#fish-chef-note').innerText = cut.chef_note;

            // Render relations
            const relsContainer = panel.querySelector('#fish-relations-container');
            const relsContent = panel.querySelector('#fish-relations-content');
            const relsHtml = getRelationBadges(cutId, 'cut');
            if (relsHtml) {
              relsContent.innerHTML = relsHtml;
              relsContainer.style.display = 'block';
            } else {
              relsContainer.style.display = 'none';
            }

            // Wire up audio
            const titleAudioBtn = panel.querySelector('#fish-audio-title-btn');
            titleAudioBtn.style.display = 'inline-block';
            titleAudioBtn.onclick = () => speakFrench(cut.name_fr);

            drawer.style.display = 'block';
          }
        });
      });

    } else if (type === 'autre') {
      const panel = document.createElement('div');
      panel.innerHTML = `
        <div class="interactive-canvas-container" style="position: relative;">
          <img src="assets/other_cuts.png" alt="French Other Meats Cuts Diagram" class="interactive-image" onerror="this.src='https://placehold.co/700x450/0A1931/ffffff?text=Autres+Viandes'">
          <svg class="interactive-svg-overlay" viewBox="0 0 100 100">
            ${otherCuts.map(cut => `
              <polygon class="interactive-area" points="${cut.points}" data-id="${cut.id}" />
            `).join('')}
          </svg>
        </div>
        
        <div class="cuisine-detail-drawer" id="other-detail-drawer">
          <div class="detail-drawer-header">
            <div style="display: flex; align-items: center; gap: 0.6rem;">
              <h3 class="detail-drawer-title" id="other-cut-title">Select a Cut</h3>
              <button class="audio-btn" id="other-audio-title-btn" style="background: none; border: none; font-size: 1.1rem; cursor: pointer; color: var(--color-accent); display: none;">🔊</button>
            </div>
            <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; color: var(--color-text-muted); font-weight: 600;" id="other-cut-sub">Autres Viandes</span>
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <!-- Properties Grid -->
            <div class="meat-properties-grid">
              <div class="meat-prop-item">
                <span class="meat-prop-label">柔らかさ (Tendreté)</span>
                <strong class="meat-prop-val" id="other-prop-tenderness">-</strong>
              </div>
              <div class="meat-prop-item">
                <span class="meat-prop-label">脂 (Gras)</span>
                <strong class="meat-prop-val" id="other-prop-fat">-</strong>
              </div>
              <div class="meat-prop-item">
                <span class="meat-prop-label">コラーゲン (Collagène)</span>
                <strong class="meat-prop-val" id="other-prop-collagen">-</strong>
              </div>
            </div>

            <!-- Basic Details -->
            <div class="meat-detail-grid">
              <div class="meat-detail-block">
                <h4 class="meat-block-title">向く調理</h4>
                <p class="meat-block-text" id="other-cooking"></p>
              </div>
              <div class="meat-detail-block">
                <h4 class="meat-block-title">特徴・分類</h4>
                <p class="meat-block-text" id="other-classification"></p>
              </div>
            </div>

            <!-- Logic & Science -->
            <div class="meat-detail-grid">
              <div class="meat-detail-block">
                <h4 class="meat-block-title">Cooking Logic</h4>
                <p class="meat-block-text highlight-code" id="other-logic"></p>
              </div>
              <div class="meat-detail-block">
                <h4 class="meat-block-title">料理科学 (Science)</h4>
                <p class="meat-block-text" id="other-science"></p>
              </div>
            </div>

            <!-- Chef's Note -->
            <div class="chef-note-box">
              <h4 class="chef-note-title">👨‍🍳 Chef's Note</h4>
              <p class="chef-note-text" id="other-chef-note"></p>
            </div>

            <!-- Relations -->
            <div id="other-relations-container" style="display: none; border-top: 1px solid rgba(197, 168, 128, 0.15); padding-top: 1.2rem;">
              <h4 class="meat-block-title">🔗 関連知識とのつながり (Relations)</h4>
              <div id="other-relations-content"></div>
            </div>
          </div>
        </div>
      `;

      wrapper.appendChild(panel);

      const drawer = panel.querySelector('#other-detail-drawer');
      const spots = panel.querySelectorAll('.interactive-area');

      spots.forEach(spot => {
        spot.addEventListener('click', (e) => {
          spots.forEach(s => s.classList.remove('active'));
          e.target.classList.add('active');

          const cutId = e.target.getAttribute('data-id');
          const cut = otherCuts.find(c => c.id === cutId);
          
          if (cut) {
            panel.querySelector('#other-cut-title').innerText = `${cut.name_fr} (${cut.name_ja})`;
            panel.querySelector('#other-cut-sub').innerText = `Cut #${cut.number} • ${cut.name_en}`;
            
            panel.querySelector('#other-prop-tenderness').innerText = cut.properties.tenderness;
            panel.querySelector('#other-prop-fat').innerText = cut.properties.fat;
            panel.querySelector('#other-prop-collagen').innerText = cut.properties.collagen;
            
            panel.querySelector('#other-cooking').innerText = cut.cooking;
            panel.querySelector('#other-classification').innerText = cut.classification;
            panel.querySelector('#other-logic').innerText = cut.logic;
            panel.querySelector('#other-science').innerText = cut.science;
            panel.querySelector('#other-chef-note').innerText = cut.chef_note;

            // Render relations
            const relsContainer = panel.querySelector('#other-relations-container');
            const relsContent = panel.querySelector('#other-relations-content');
            const relsHtml = getRelationBadges(cutId, 'cut');
            if (relsHtml) {
              relsContent.innerHTML = relsHtml;
              relsContainer.style.display = 'block';
            } else {
              relsContainer.style.display = 'none';
            }

            // Wire up audio
            const titleAudioBtn = panel.querySelector('#other-audio-title-btn');
            titleAudioBtn.style.display = 'inline-block';
            titleAudioBtn.onclick = () => speakFrench(cut.name_fr);

            drawer.style.display = 'block';
          }
        });
      });
    }
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
