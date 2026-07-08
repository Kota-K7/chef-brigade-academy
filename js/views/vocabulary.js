import { state, toggleFavorite, isFavorite, updateSRS, ensureDataLoaded } from '../../app.js';
import { speakFrench } from '../utils/audio.js';

export function renderVocabulary() {
  const container = document.createElement('div');
  
  const title = document.createElement('h2');
  title.className = 'section-title';
  title.innerText = "Vocabulaire Professionnel";
  container.appendChild(title);
  
  const subtitle = document.createElement('p');
  subtitle.className = 'section-subtitle';
  subtitle.innerText = "Essential culinary terminology for kitchen brigade communications. Filter by category, tag, or difficulty level.";
  container.appendChild(subtitle);
  
  const loading = document.createElement('div');
  loading.className = 'loading-placeholder';
  loading.innerText = "Chargement du vocabulaire... (Loading vocabulary...)";
  container.appendChild(loading);
  
  const activeLevel = state.settings?.targetLevel || 'ALL';
  
  ensureDataLoaded('knowledge', activeLevel).then(() => {
    loading.remove();
    renderVocabContent(container, activeLevel);
  });
  
  return container;
}

function renderVocabContent(container, initialLevel) {
  const includeGeneral = state.settings?.includeGeneral || false;
  const allVocabs = (state.db?.knowledge || []).filter(item => item.french && item.japanese);
  const vocabs = allVocabs.filter(item => includeGeneral || item.is_professional);
  const categories = ['ALL', ...new Set(vocabs.map(item => item.category))];
  const tags = ['ALL', ...new Set(vocabs.flatMap(item => item.tags || []))];
  const levels = ['ALL', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  
  let activeCategory = 'ALL';
  let activeTag = 'ALL';
  let activeLevel = initialLevel;
  
  const filterPanel = document.createElement('div');
  filterPanel.className = 'card';
  filterPanel.style.padding = '1.2rem';
  filterPanel.style.marginBottom = '2rem';
  filterPanel.style.display = 'flex';
  filterPanel.style.flexDirection = 'column';
  filterPanel.style.gap = '1rem';
  
  filterPanel.innerHTML = `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
      <div>
        <label style="font-size: 0.8rem; font-weight: 600; display: block; margin-bottom: 0.3rem; color: var(--color-text-muted);">Catégorie (Category)</label>
        <select id="vocab-category-select" style="padding: 0.5rem; font-size: 0.9rem; border-radius: var(--radius-sm); border: 1px solid rgba(0,0,0,0.1); width: 100%; background: var(--color-bg);">
          ${categories.map(c => `<option value="${c}" ${c === activeCategory ? 'selected' : ''}>${c}</option>`).join('')}
        </select>
      </div>
      <div>
        <label style="font-size: 0.8rem; font-weight: 600; display: block; margin-bottom: 0.3rem; color: var(--color-text-muted);">Étiquettes (Tag)</label>
        <select id="vocab-tag-select" style="padding: 0.5rem; font-size: 0.9rem; border-radius: var(--radius-sm); border: 1px solid rgba(0,0,0,0.1); width: 100%; background: var(--color-bg);">
          ${tags.map(t => `<option value="${t}" ${t === activeTag ? 'selected' : ''}>${t === 'ALL' ? 'ALL TAGS' : '#' + t}</option>`).join('')}
        </select>
      </div>
      <div>
        <label style="font-size: 0.8rem; font-weight: 600; display: block; margin-bottom: 0.3rem; color: var(--color-text-muted);">Niveau (Level)</label>
        <select id="vocab-level-select" style="padding: 0.5rem; font-size: 0.9rem; border-radius: var(--radius-sm); border: 1px solid rgba(0,0,0,0.1); width: 100%; background: var(--color-bg);">
          ${levels.map(l => `<option value="${l}" ${l === activeLevel ? 'selected' : ''}>${l === 'ALL' ? 'ALL LEVELS' : l}</option>`).join('')}
        </select>
      </div>
    </div>
  `;
  container.appendChild(filterPanel);
  
  const cardGrid = document.createElement('div');
  cardGrid.className = 'card-grid';
  container.appendChild(cardGrid);
  
  function updateGrid() {
    cardGrid.innerHTML = '';
    
    // Apply filters
    const currentVocabs = (state.db?.knowledge || []).filter(item => item.french && item.japanese);
    const usableVocabs = currentVocabs.filter(item => includeGeneral || item.is_professional);
    const filteredVocabs = usableVocabs.filter(item => {
      const matchCat = activeCategory === 'ALL' || item.category === activeCategory;
      const matchTag = activeTag === 'ALL' || (item.tags && item.tags.includes(activeTag));
      const matchLvl = activeLevel === 'ALL' || item.level === activeLevel;
      return matchCat && matchTag && matchLvl;
    });
      
    if (filteredVocabs.length === 0) {
      cardGrid.innerHTML = `<p style="color: var(--color-text-muted); grid-column: 1 / -1; text-align: center; padding: 2rem;">Aucun terme trouvé correspondant à vos critères de filtrage.</p>`;
      return;
    }
    
    filteredVocabs.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';
      
      const isFav = isFavorite(item.id);
      const srsInfo = state.srs[item.id];
      const isSrsActive = !!srsInfo;
      
      const ctxFr = item.examples && item.examples[0] ? item.examples[0].fr : "";
      const ctxJa = item.examples && item.examples[0] ? item.examples[0].ja : "";

      card.innerHTML = `
        <div style="display: flex; flex-direction: column; height: 100%; justify-content: space-between; gap: 1.5rem;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <span class="card-category" style="margin:0;">${item.category}</span>
              <span class="grammar-badge" style="background-color: var(--color-primary);">${item.level}</span>
            </div>
            
            <div class="term-header">
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <h3 class="term-title">${item.french}</h3>
                <button class="audio-btn" data-text="${item.french}" title="Listen pronunciation" style="background: none; border: none; font-size: 1.15rem; cursor: pointer; color: var(--color-accent); transition: var(--transition); padding: 0.2rem;">🔊</button>
              </div>
              <button class="fav-btn ${isFav ? 'active' : ''}" data-id="${item.id}">
                ${isFav ? '★' : '☆'}
              </button>
            </div>
            
            <div class="term-translations" style="margin-top: 0.6rem; display: flex; flex-direction: column; gap: 0.4rem;">
              <div class="flip-translation-container">
                <div class="flip-translation-card">
                  <div class="flip-front" style="display: flex; align-items: center; gap: 0.4rem; justify-content: flex-start; padding: 0.4rem 0.6rem; text-align: left;">
                    <button class="audio-btn" data-text="${item.definition_fr}" title="Listen definition" style="background: none; border: none; font-size: 0.9rem; cursor: pointer; color: var(--color-accent); padding: 0.1rem; line-height: 1; flex-shrink: 0;">🔊</button>
                    <span style="font-size: 0.76rem; line-height: 1.25; color: var(--color-text-main); font-weight: 500;">${item.definition_fr || 'No definition loaded.'}</span>
                  </div>
                  <div class="flip-back" style="font-size: 0.85rem; font-weight: 600; padding: 0.4rem 0.6rem; justify-content: center; text-align: center; color: var(--color-secondary);">
                     🇬🇧 ${item.english}
                  </div>
                </div>
              </div>
              <div class="trans-ja" style="margin-top: 0.2rem; font-weight: 500;">${item.japanese}</div>
            </div>
            
            <div class="term-context" style="margin-top: 1rem;">
              <div class="context-fr" style="display: flex; align-items: flex-start; gap: 0.4rem; font-style: italic; color: var(--color-secondary);">
                <span style="flex: 1;">"${ctxFr}"</span>
                <button class="audio-btn" data-text="${ctxFr}" title="Listen context sentence" style="background: none; border: none; font-size: 0.9rem; cursor: pointer; color: var(--color-text-muted); padding: 0.15rem; margin-top: 0.15rem;">🔊</button>
              </div>
              <div class="context-ja">${ctxJa}</div>
            </div>
            
            ${item.tags && item.tags.length > 0 ? `
              <div style="margin-top: 1rem; display: flex; flex-wrap: wrap; gap: 0.3rem;">
                ${item.tags.map(t => `<span class="tag-badge" style="background-color: rgba(197, 168, 128, 0.08); color: var(--color-accent); font-size: 0.75rem; padding: 0.1rem 0.5rem; border-radius: 12px;">#${t}</span>`).join('')}
              </div>
            ` : ''}
          </div>
          
          <!-- SRS status in card footer -->
          <div style="border-top: 1px solid rgba(0,0,0,0.05); padding-top: 1rem; font-size: 0.8rem; display: flex; flex-direction: column; gap: 0.5rem;">
            ${isSrsActive ? `
              <div style="display: flex; justify-content: space-between; color: var(--color-text-muted);">
                <span>Interval: <strong>${srsInfo.interval} days</strong></span>
                <span>Due: <strong>${srsInfo.dueDate}</strong></span>
              </div>
              <div style="display: flex; gap: 0.5rem;">
                <button class="next-btn srs-action-btn" data-id="${item.id}" data-action="memorized" style="background-color: var(--color-success); font-size: 0.75rem; padding: 0.3rem 0.6rem; flex: 1;">
                  ✓ Memorized
                </button>
                <button class="next-btn srs-action-btn" data-id="${item.id}" data-action="reset" style="background-color: transparent; border: 1px solid var(--color-error); color: var(--color-error); font-size: 0.75rem; padding: 0.3rem 0.6rem;">
                  Forget
                </button>
              </div>
            ` : `
              <div style="color: var(--color-text-muted); font-style: italic; margin-bottom: 0.2rem;">Not yet added to SRS memory deck.</div>
              <button class="next-btn srs-action-btn" data-id="${item.id}" data-action="start" style="font-size: 0.75rem; padding: 0.4rem 0.8rem; width: 100%;">
                Start Memorizing (Add to SRS)
              </button>
            `}
          </div>
        </div>
      `;
      
      // English Translation Flip Handler
      const flipContainer = card.querySelector('.flip-translation-container');
      flipContainer.addEventListener('click', (e) => {
        e.stopPropagation();
        const flipCard = flipContainer.querySelector('.flip-translation-card');
        flipCard.classList.toggle('flipped');
      });

      // Favorite click handler
      card.querySelector('.fav-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(item.id);
        const button = e.target;
        const nowFav = isFavorite(item.id);
        button.classList.toggle('active', nowFav);
        button.innerText = nowFav ? '★' : '☆';
      });
      
      // Audio click handler
      card.querySelectorAll('.audio-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const text = e.target.closest('.audio-btn').getAttribute('data-text');
          speakFrench(text);
        });
      });
      
      // SRS Actions click handler
      card.querySelectorAll('.srs-action-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const action = e.target.getAttribute('data-action');
          const id = e.target.getAttribute('data-id');
          
          if (action === 'start') {
            updateSRS(id, 4);
          } else if (action === 'memorized') {
            updateSRS(id, 5);
          } else if (action === 'reset') {
            updateSRS(id, 0);
          }
          
          updateGrid();
        });
      });
      
      cardGrid.appendChild(card);
    });
  }
  
  // Set up listeners for select inputs
  filterPanel.querySelector('#vocab-category-select').addEventListener('change', (e) => {
    activeCategory = e.target.value;
    updateGrid();
  });
  
  filterPanel.querySelector('#vocab-tag-select').addEventListener('change', (e) => {
    activeTag = e.target.value;
    updateGrid();
  });
  
  filterPanel.querySelector('#vocab-level-select').addEventListener('change', async (e) => {
    activeLevel = e.target.value;
    cardGrid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--color-text-muted);">Chargement (Loading level ${activeLevel})...</div>`;
    await ensureDataLoaded('knowledge', activeLevel);
    
    // Update select option for categories and tags based on newly loaded data
    const currentVocabs = (state.db?.knowledge || []).filter(item => item.french && item.japanese);
    const usableVocabs = currentVocabs.filter(item => includeGeneral || item.is_professional);
    const newCategories = ['ALL', ...new Set(usableVocabs.map(item => item.category))];
    const newTags = ['ALL', ...new Set(usableVocabs.flatMap(item => item.tags || []))];
    
    const catSelect = filterPanel.querySelector('#vocab-category-select');
    const oldCat = catSelect.value;
    catSelect.innerHTML = newCategories.map(c => `<option value="${c}" ${c === oldCat ? 'selected' : ''}>${c}</option>`).join('');
    activeCategory = catSelect.value;
    
    const tagSelect = filterPanel.querySelector('#vocab-tag-select');
    const oldTag = tagSelect.value;
    tagSelect.innerHTML = newTags.map(t => `<option value="${t}" ${t === oldTag ? 'selected' : ''}>${t === 'ALL' ? 'ALL TAGS' : '#' + t}</option>`).join('');
    activeTag = tagSelect.value;
    
    updateGrid();
  });
  
  // Initial render
  updateGrid();
}
