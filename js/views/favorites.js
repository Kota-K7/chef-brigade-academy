import { state, toggleFavorite, isFavorite, ensureAllDataLoaded } from '../../app.js';

export function renderFavorites() {
  const container = document.createElement('div');
  
  const title = document.createElement('h2');
  title.className = 'section-title';
  title.innerText = "Coups de Cœur (Favorites)";
  container.appendChild(title);
  
  const subtitle = document.createElement('p');
  subtitle.className = 'section-subtitle';
  subtitle.innerText = "Your bookmarked vocabulary terms, grammar guides, and culinary theories.";
  container.appendChild(subtitle);
  
  const favIds = Array.from(state.favorites);
  
  if (favIds.length === 0) {
    container.innerHTML += `
      <div class="alert alert-info">
        <p>No favorites saved yet. Browse Vocabulary, Grammar, or Cuisine and click the star (☆) button to save items here.</p>
      </div>
    `;
    return container;
  }

  const loading = document.createElement('div');
  loading.className = 'loading-placeholder';
  loading.innerText = "Chargement des favoris... (Loading favorites...)";
  container.appendChild(loading);
  
  ensureAllDataLoaded().then(() => {
    loading.remove();
    renderFavoritesContent(container, favIds);
  });
  
  return container;
}

function renderFavoritesContent(container, favIds) {
  // Find matches across db
  const vocabs = (state.db?.vocabulary || []).filter(item => favIds.includes(item.id));
  const grammars = (state.db?.grammar || []).filter(item => favIds.includes(item.id));
  const cuisines = (state.db?.cuisine || []).filter(item => favIds.includes(item.id));
  
  const cardGrid = document.createElement('div');
  cardGrid.className = 'card-grid';
  container.appendChild(cardGrid);
  
  function renderAll() {
    cardGrid.innerHTML = '';
    
    // Render Vocabulary Favorites
    vocabs.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div>
          <div class="card-category">Vocabulary: ${item.category}</div>
          <div class="term-header">
            <h3 class="term-title">${item.french}</h3>
            <button class="fav-btn active" data-id="${item.id}">★</button>
          </div>
          <div class="term-translations">
            <div class="trans-en">${item.english}</div>
            <div class="trans-ja">${item.japanese}</div>
          </div>
        </div>
        <div class="term-context">
          <div class="context-fr">"${item.context_fr}"</div>
          <div class="context-ja">${item.context_ja}</div>
        </div>
      `;
      
      card.querySelector('.fav-btn').addEventListener('click', (e) => {
        toggleFavorite(item.id);
        renderFavorites(); // Rerender
        // Switch tab updates or redraws
        container.innerHTML = '';
        container.appendChild(renderFavorites());
      });
      
      cardGrid.appendChild(card);
    });
    
    // Render Grammar Favorites
    grammars.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div>
          <div class="card-category">Grammar: ${item.level}</div>
          <div class="term-header">
            <h3 class="term-title" style="font-size: 1.25rem;">${item.topic}</h3>
            <button class="fav-btn active" data-id="${item.id}">★</button>
          </div>
          <p style="font-size: 0.85rem; margin-bottom: 1rem; color: var(--color-text-main);">${item.explanation_en.substring(0, 100)}...</p>
        </div>
        <div style="font-size: 0.8rem; font-weight: bold; text-transform: uppercase; color: var(--color-accent);">Example:</div>
        <div class="term-context" style="margin-top: 0.5rem;">
          <div class="context-fr">"${item.examples[0]?.fr || ''}"</div>
          <div class="context-ja">${item.examples[0]?.ja || ''}</div>
        </div>
      `;
      
      card.querySelector('.fav-btn').addEventListener('click', (e) => {
        toggleFavorite(item.id);
        container.innerHTML = '';
        container.appendChild(renderFavorites());
      });
      
      cardGrid.appendChild(card);
    });
    
    // Render Cuisine Favorites
    cuisines.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div>
          <div class="card-category">Cuisine: ${item.category}</div>
          <div class="term-header">
            <h3 class="term-title" style="font-size: 1.25rem;">${item.topic}</h3>
            <button class="fav-btn active" data-id="${item.id}">★</button>
          </div>
          <p style="font-size: 0.85rem; margin-bottom: 1rem; color: var(--color-text-main);">${item.content_en.substring(0, 100)}...</p>
        </div>
      `;
      
      card.querySelector('.fav-btn').addEventListener('click', (e) => {
        toggleFavorite(item.id);
        container.innerHTML = '';
        container.appendChild(renderFavorites());
      });
      
      cardGrid.appendChild(card);
    });
  }
  
  renderAll();
}
