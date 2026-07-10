import { state, toggleFavorite, isFavorite, ensureDataLoaded } from '../../../app.js';
import { speakFrench } from '../../utils/audio.js';

// SUB-TAB 1: CLASSICAL TEXT GUIDES
export function renderTheoryList(contentWrapper) {
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
