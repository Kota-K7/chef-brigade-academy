import { renderTheoryList } from './cuisine/theory.js';
import { renderIngredientsSection } from './cuisine/ingredients.js';
import { renderGastronomyMap } from './cuisine/map.js';

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
    <button class="cuisine-tab-btn" data-tab="ingredients">🥦 Ingrédients (食材)</button>
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
      renderTheoryList(contentWrapper);
    } else if (tab === 'ingredients') {
      renderIngredientsSection(contentWrapper);
    } else if (tab === 'map') {
      renderGastronomyMap(contentWrapper);
    }
  }

  // Load default tab
  renderCuisineSubTab('theory');
  
  return container;
}
