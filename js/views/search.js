import { state, toggleFavorite, isFavorite, ensureAllDataLoaded } from '../../app.js';

export function renderSearch() {
  const container = document.createElement('div');
  
  const title = document.createElement('h2');
  title.className = 'section-title';
  title.innerText = "Recherche Globale";
  container.appendChild(title);
  
  const subtitle = document.createElement('p');
  subtitle.className = 'section-subtitle';
  subtitle.innerText = "Search terms across the entire curriculum: Vocabulary, Grammar, and Culinary Theory.";
  container.appendChild(subtitle);
  
  // Search bar wrapper
  const searchBox = document.createElement('div');
  searchBox.className = 'search-box-wrapper';
  searchBox.style.marginBottom = '2rem';
  searchBox.style.position = 'relative';
  
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Chargement de la base de données... (Loading database...)';
  input.className = 'search-input';
  input.style.width = '100%';
  input.style.padding = '1rem 1.5rem';
  input.style.fontSize = '1.1rem';
  input.style.borderRadius = 'var(--radius-md)';
  input.style.border = '2px solid rgba(197, 168, 128, 0.2)';
  input.style.backgroundColor = 'var(--color-bg)';
  input.style.fontFamily = 'var(--font-sans)';
  input.style.transition = 'var(--transition)';
  input.style.outline = 'none';
  input.disabled = true;
  
  input.addEventListener('focus', () => {
    input.style.borderColor = 'var(--color-accent)';
    input.style.boxShadow = '0 0 10px rgba(212, 175, 55, 0.15)';
  });
  
  input.addEventListener('blur', () => {
    input.style.borderColor = 'rgba(197, 168, 128, 0.2)';
    input.style.boxShadow = 'none';
  });
  
  searchBox.appendChild(input);
  container.appendChild(searchBox);
  
  // Results Container
  const resultsContainer = document.createElement('div');
  resultsContainer.className = 'search-results';
  container.appendChild(resultsContainer);
  
  resultsContainer.innerHTML = `
    <div style="text-align: center; padding: 3rem; color: var(--color-text-muted);">
      <p>Préparation de la recherche... (Preparing search database...)</p>
    </div>
  `;
  
  ensureAllDataLoaded().then(() => {
    input.disabled = false;
    input.placeholder = 'Rechercher... (e.g. sauce, roux, cut, culer, 刻む)';
    
    function executeSearch(query) {
      resultsContainer.innerHTML = '';
      
      if (!query.trim()) {
        resultsContainer.innerHTML = `
          <div style="text-align: center; padding: 3rem; color: var(--color-text-muted);">
            <span style="font-size: 3rem;">🔍</span>
            <p style="margin-top: 1rem;">Tapez un mot-clé pour commencer votre recherche.</p>
          </div>
        `;
        return;
      }
      
      const normalizedQuery = query.toLowerCase().trim();
      
      // Search pools
      const vocabs = state.db?.vocabulary || [];
      const grammars = state.db?.grammar || [];
      const cuisines = state.db?.cuisine || [];
      
      const matches = [];
      
      // 1. Vocabulary Search
      vocabs.forEach(item => {
        const matchText = `${item.french} ${item.english} ${item.japanese} ${item.category} ${item.context_fr} ${item.context_en} ${item.context_ja} ${(item.tags || []).join(' ')}`.toLowerCase();
        if (matchText.includes(normalizedQuery)) {
          matches.push({ ...item, type: 'vocabulary', title: item.french, subtitle: `${item.category} • Vocabulary` });
        }
      });
      
      // 2. Grammar Search
      grammars.forEach(item => {
        const matchText = `${item.topic} ${item.explanation_en} ${item.explanation_ja} ${item.level} ${(item.tags || []).join(' ')} ${item.examples.map(ex => `${ex.fr} ${ex.en} ${ex.ja}`).join(' ')}`.toLowerCase();
        if (matchText.includes(normalizedQuery)) {
          matches.push({ ...item, type: 'grammar', title: item.topic, subtitle: `${item.level} • Grammar Lesson` });
        }
      });
      
      // 3. Culinary Theory Search
      cuisines.forEach(item => {
        const matchText = `${item.topic} ${item.category} ${item.content_fr} ${item.content_en} ${item.content_ja} ${(item.tags || []).join(' ')}`.toLowerCase();
        if (matchText.includes(normalizedQuery)) {
          matches.push({ ...item, type: 'cuisine', title: item.topic, subtitle: `${item.category} • Culinary Theory` });
        }
      });
      
      if (matches.length === 0) {
        resultsContainer.innerHTML = `
          <div style="text-align: center; padding: 3rem; color: var(--color-text-muted);">
            <p>Aucun résultat trouvé pour "<strong>${query}</strong>".</p>
            <p style="font-size: 0.9rem; margin-top: 0.5rem;">Check your spelling or try another keyword.</p>
          </div>
        `;
        return;
      }
      
      // Render Matches
      matches.forEach(match => {
        const card = document.createElement('div');
        card.className = 'card search-result-card';
        card.style.marginBottom = '1.2rem';
        card.style.borderLeft = `4px solid ${
          match.type === 'vocabulary' ? 'var(--color-primary)' :
          match.type === 'grammar' ? 'var(--color-secondary)' :
          'var(--color-accent)'
        }`;
        
        const isFav = isFavorite(match.id);
        
        let detailHTML = '';
        if (match.type === 'vocabulary') {
          detailHTML = `
            <div class="term-translations" style="margin-top: 0.5rem;">
              <div class="trans-en">${match.english}</div>
              <div class="trans-ja">${match.japanese}</div>
            </div>
            <div class="term-context" style="margin-top: 1rem;">
              <div class="context-fr">"${match.context_fr}"</div>
              <div class="context-ja">${match.context_ja}</div>
            </div>
          `;
        } else if (match.type === 'grammar') {
          detailHTML = `
            <p style="font-size: 0.9rem; margin-top: 0.5rem; color: var(--color-text-main);">${match.explanation_en}</p>
            <p style="font-size: 0.85rem; margin-top: 0.3rem; color: var(--color-text-muted);">${match.explanation_ja}</p>
            <div class="examples-list" style="margin-top: 1rem; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 0.8rem;">
              ${match.examples.slice(0, 2).map(ex => `
                <div class="example-item" style="margin-bottom: 0.5rem;">
                  <div class="example-fr" style="font-weight: 500;">➔ ${ex.fr}</div>
                  <div class="example-ja" style="font-size: 0.8rem; color: var(--color-text-muted);">${ex.ja}</div>
                </div>
              `).join('')}
            </div>
          `;
        } else if (match.type === 'cuisine') {
          detailHTML = `
            <p style="font-size: 0.9rem; margin-top: 0.5rem; font-style: italic; color: var(--color-primary);">${match.content_fr.substring(0, 150)}...</p>
            <p style="font-size: 0.85rem; margin-top: 0.5rem; color: var(--color-text-main);">${match.content_ja.substring(0, 120)}...</p>
          `;
        }
        
        // Render Tags
        const tagsHTML = (match.tags || []).map(t => `<span class="tag-badge" style="background-color: rgba(197, 168, 128, 0.12); color: var(--color-accent); font-size: 0.75rem; padding: 0.2rem 0.6rem; border-radius: 20px; font-weight: 500;">#${t}</span>`).join(' ');
        
        card.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem;">
            <div>
              <div class="card-category" style="margin: 0; font-size: 0.75rem;">${match.subtitle}</div>
              <h3 class="term-title" style="margin-top: 0.2rem; font-size: 1.4rem;">${match.title}</h3>
            </div>
            <button class="fav-btn ${isFav ? 'active' : ''}" data-id="${match.id}">
              ${isFav ? '★' : '☆'}
            </button>
          </div>
          ${detailHTML}
          ${match.tags && match.tags.length > 0 ? `<div style="margin-top: 1rem; display: flex; flex-wrap: wrap; gap: 0.4rem;">${tagsHTML}</div>` : ''}
        `;
        
        card.querySelector('.fav-btn').addEventListener('click', (e) => {
          e.stopPropagation();
          toggleFavorite(match.id);
          const button = e.target;
          const nowFav = isFavorite(match.id);
          button.classList.toggle('active', nowFav);
          button.innerText = nowFav ? '★' : '☆';
        });
        
        resultsContainer.appendChild(card);
      });
    }

    // Real-time search handler
    input.addEventListener('input', (e) => {
      executeSearch(e.target.value);
    });
    
    // Initialize placeholder message
    executeSearch('');
  });
  
  return container;
}
