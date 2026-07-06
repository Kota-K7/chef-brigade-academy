import { state, toggleFavorite, isFavorite, ensureDataLoaded } from '../../app.js';
import { speakFrench } from '../utils/audio.js';

export function renderGrammar() {
  const container = document.createElement('div');
  
  const title = document.createElement('h2');
  title.className = 'section-title';
  title.innerText = "Grammaire de la Cuisine";
  container.appendChild(title);
  
  const subtitle = document.createElement('p');
  subtitle.className = 'section-subtitle';
  subtitle.innerText = "French grammar concepts framed through recipe instructions and professional dialogues.";
  container.appendChild(subtitle);
  
  const loading = document.createElement('div');
  loading.className = 'loading-placeholder';
  loading.innerText = "Chargement de la grammaire... (Loading grammar...)";
  container.appendChild(loading);
  
  const activeLevel = state.settings?.targetLevel || 'ALL';
  
  ensureDataLoaded('grammar', activeLevel).then(() => {
    loading.remove();
    renderGrammarContent(container, activeLevel);
  });
  
  return container;
}

function renderGrammarContent(container, activeLevel) {
  const grammarItems = state.db?.grammar || [];
  
  const filteredItems = grammarItems.filter(item => activeLevel === 'ALL' || item.level === activeLevel);
  
  if (filteredItems.length === 0) {
    const emptyMsg = document.createElement('p');
    emptyMsg.style.color = 'var(--color-text-muted)';
    emptyMsg.innerText = "Aucune leçon de grammaire chargée pour ce niveau.";
    container.appendChild(emptyMsg);
    return;
  }
  
  filteredItems.forEach(item => {
    const card = document.createElement('div');
    card.className = 'grammar-card';
    
    const isFav = isFavorite(item.id);
    
    const frMatch = item.topic.match(/\(([^)]+)\)/);
    const frTitle = frMatch ? frMatch[1] : item.topic;
    
    card.innerHTML = `
      <div class="grammar-header">
        <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
          <span class="grammar-badge">${item.level}</span>
          <span class="grammar-title">${item.topic}</span>
          <button class="audio-btn" data-text="${frTitle}" title="Listen topic pronunciation" style="background: none; border: none; font-size: 0.9rem; cursor: pointer; color: var(--color-accent); padding: 0.15rem; line-height: 1;">🔊</button>
        </div>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <button class="fav-btn ${isFav ? 'active' : ''}" data-id="${item.id}" style="font-size: 1.1rem; padding: 0.2rem;">
            ${isFav ? '★' : '☆'}
          </button>
          <span class="toggle-icon" style="font-size: 1rem; color: var(--color-text-muted); font-weight: bold;">▼</span>
        </div>
      </div>
      <div class="grammar-body">
        <div class="grammar-expl">
          <p style="margin-bottom: 0.6rem; font-weight: 500; color: var(--color-secondary);">Explanation (EN):</p>
          <p style="margin-bottom: 1rem;">${item.explanation_en}</p>
          <p style="margin-bottom: 0.6rem; font-weight: 500; color: var(--color-secondary);">説明 (JA):</p>
          <p style="margin-bottom: 1.2rem;">${item.explanation_ja}</p>
        </div>
        <div class="grammar-examples">
          <p style="font-size: 0.8rem; font-weight: 600; text-transform: uppercase; color: var(--color-accent); letter-spacing: 1px; margin-bottom: 0.8rem;">Exemples de Cuisine (Examples):</p>
          <div class="examples-list">
            ${item.examples.map(ex => `
              <div class="example-item" style="margin-bottom: 0.8rem;">
                <div class="example-fr" style="display: flex; align-items: center; gap: 0.4rem;">
                  <span style="flex: 1;">➔ ${ex.fr}</span>
                  <button class="audio-btn" data-text="${ex.fr}" title="Listen pronunciation" style="background: none; border: none; font-size: 0.9rem; cursor: pointer; color: var(--color-accent); padding: 0.15rem; line-height: 1;">🔊</button>
                </div>
                <div class="example-en">${ex.en}</div>
                <div class="example-ja">${ex.ja}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
    
    // Toggle body expansion
    const header = card.querySelector('.grammar-header');
    const body = card.querySelector('.grammar-body');
    const toggleIcon = card.querySelector('.toggle-icon');
    
    header.addEventListener('click', (e) => {
      if (e.target.classList.contains('fav-btn') || e.target.closest('.audio-btn')) return;
      
      const isOpen = body.classList.toggle('open');
      toggleIcon.innerText = isOpen ? '▲' : '▼';
    });
    
    // Favorite handler
    card.querySelector('.fav-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFavorite(item.id);
      const button = e.target;
      const nowFav = isFavorite(item.id);
      button.classList.toggle('active', nowFav);
      button.innerText = nowFav ? '★' : '☆';
    });
    
    // Audio handler
    card.querySelectorAll('.audio-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const text = e.target.closest('.audio-btn').getAttribute('data-text');
        speakFrench(text);
      });
    });
    
    container.appendChild(card);
  });
}
