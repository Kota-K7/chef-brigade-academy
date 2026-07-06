import { state } from '../../app.js';
import { speakFrench } from '../utils/audio.js';

export function renderHome() {
  const container = document.createElement('div');
  
  // Header section
  const title = document.createElement('h2');
  title.className = 'section-title';
  title.innerText = "Tableau de Bord"; // Board/Dashboard
  container.appendChild(title);
  
  const subtitle = document.createElement('p');
  subtitle.className = 'section-subtitle';
  subtitle.innerText = "Welcome back, Commis. Here is your kitchen curriculum status.";
  container.appendChild(subtitle);
  
  // Calculate SRS stats
  const now = new Date().toISOString().split('T')[0];
  const srsItems = Object.values(state.srs);
  const dueCardsCount = srsItems.filter(item => item.dueDate <= now).length;
  const activeSrsCount = srsItems.length;
  
  // Dashboard Grid
  const grid = document.createElement('div');
  grid.className = 'dashboard-grid';
  
  // Left Column - Tasks and Stats
  const leftCol = document.createElement('div');
  leftCol.style.display = 'flex';
  leftCol.style.flexDirection = 'column';
  leftCol.style.gap = '1.5rem';
  
  // Today's Missions Card
  const missionsCard = document.createElement('div');
  missionsCard.className = 'card';
  missionsCard.style.padding = '1.5rem';
  missionsCard.innerHTML = `
    <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--color-primary); margin-bottom: 1rem;">Missions du Jour (Today's Tasks)</h3>
    <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.8rem;">
      <li style="display: flex; align-items: center; gap: 0.8rem; font-size: 0.95rem;">
        <input type="checkbox" id="mission-vocab" style="transform: scale(1.2); cursor: pointer;" ${activeSrsCount > 0 ? 'checked' : ''}>
        <label for="mission-vocab" style="cursor: pointer;">Study new terms in the Vocabulary deck</label>
      </li>
      <li style="display: flex; align-items: center; gap: 0.8rem; font-size: 0.95rem;">
        <input type="checkbox" id="mission-srs" style="transform: scale(1.2); cursor: pointer;" ${dueCardsCount === 0 && activeSrsCount > 0 ? 'checked' : ''}>
        <label for="mission-srs" style="cursor: pointer;">
          Clear due SRS cards in Review Deck 
          ${dueCardsCount > 0 ? `<span style="background-color: var(--color-error); color: white; padding: 0.1rem 0.5rem; border-radius: 10px; font-size: 0.75rem; font-weight: bold; margin-left: 0.5rem;">${dueCardsCount} due</span>` : ''}
        </label>
      </li>
      <li style="display: flex; align-items: center; gap: 0.8rem; font-size: 0.95rem;">
        <input type="checkbox" id="mission-quiz" style="transform: scale(1.2); cursor: pointer;">
        <label for="mission-quiz" style="cursor: pointer;">Take a kitchen verification quiz</label>
      </li>
    </ul>
  `;
  leftCol.appendChild(missionsCard);
  
  // Academy Wisdom Card
  const wisdomCard = document.createElement('div');
  wisdomCard.className = 'card';
  wisdomCard.style.padding = '1.5rem';
  
  // Get featured vocabulary from metadata
  const randomVocab = state.meta?.featured || null;
  
  wisdomCard.innerHTML = `
    <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--color-primary); margin-bottom: 1rem;">Vocabulaire Vedette (Featured Vocabulary)</h3>
    ${randomVocab ? `
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
        <div style="font-size: 1.25rem; font-weight: 600; color: var(--color-accent);">${randomVocab.french}</div>
        <button class="audio-btn" data-text="${randomVocab.french}" title="Listen pronunciation" style="background: none; border: none; font-size: 1.1rem; cursor: pointer; color: var(--color-accent); padding: 0.1rem; line-height: 1;">🔊</button>
      </div>
      <div style="font-size: 0.9rem; color: var(--color-text-main); font-weight: 500; margin-bottom: 0.5rem;">${randomVocab.english} / ${randomVocab.japanese}</div>
      <div style="background-color: rgba(197, 168, 128, 0.08); border-left: 2px solid var(--color-accent); padding: 0.8rem; font-size: 0.85rem; border-radius: 0 var(--radius-sm) var(--radius-sm) 0;">
        <div style="display: flex; align-items: flex-start; gap: 0.4rem; font-style: italic; color: var(--color-secondary); font-weight: 500;">
          <span style="flex: 1;">"${randomVocab.context_fr}"</span>
          <button class="audio-btn" data-text="${randomVocab.context_fr}" title="Listen context sentence" style="background: none; border: none; font-size: 0.9rem; cursor: pointer; color: var(--color-text-muted); padding: 0.15rem; margin-top: 0.1rem; line-height: 1;">🔊</button>
        </div>
        <div style="color: var(--color-text-muted); margin-top: 0.2rem;">${randomVocab.context_ja}</div>
      </div>
    ` : '<p>No data loaded.</p>'}
  `;
  
  // Wire up audio buttons
  if (randomVocab) {
    wisdomCard.querySelectorAll('.audio-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const text = e.target.closest('.audio-btn').getAttribute('data-text');
        speakFrench(text);
      });
    });
  }
  
  leftCol.appendChild(wisdomCard);
  
  grid.appendChild(leftCol);
  
  // Right Column - Streak & quick overview
  const rightCol = document.createElement('div');
  rightCol.style.display = 'flex';
  rightCol.style.flexDirection = 'column';
  rightCol.style.gap = '1.5rem';
  
  // Streak Card
  const streakCard = document.createElement('div');
  streakCard.className = 'streak-card';
  streakCard.innerHTML = `
    <div class="streak-left">
      <h2>Série</h2>
      <h2>d'Études</h2>
      <div class="streak-subtitle">Daily Study Streak</div>
    </div>
    <div class="streak-right">
      <span class="streak-number">${state.streak}</span>
      <span class="streak-flame">🔥</span>
    </div>
  `;
  rightCol.appendChild(streakCard);
  
  // Quick Stats Card
  const statsCard = document.createElement('div');
  statsCard.className = 'card';
  statsCard.style.padding = '1.5rem';
  
  const vocabCount = state.meta?.counts?.vocabulary || 0;
  const grammarCount = state.meta?.counts?.grammar || 0;
  const cuisineCount = state.meta?.counts?.cuisine || 0;
  
  statsCard.innerHTML = `
    <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--color-primary); margin-bottom: 1rem;">Progrès de la Brigade</h3>
    <div style="display: flex; flex-direction: column; gap: 0.8rem; font-size: 0.9rem;">
      <div style="display: flex; justify-content: space-between;">
        <span>Vocabulaire:</span>
        <strong>${vocabCount} terms</strong>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span>Grammaire:</span>
        <strong>${grammarCount} items</strong>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span>Théorie Culinaire:</span>
        <strong>${cuisineCount} guides</strong>
      </div>
      
      <div style="border-top: 1px solid rgba(0,0,0,0.05); padding-top: 0.8rem; display: flex; justify-content: space-between; align-items: center;">
        <span>★ Coups de Cœur (Favorites):</span>
        <strong style="color: var(--color-accent);">${state.favorites.size} items</strong>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span>Deck SRS Actif (Active SRS):</span>
        <strong style="color: var(--color-primary);">${activeSrsCount} cards</strong>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span>À réviser aujourd'hui (Due Today):</span>
        <strong style="${dueCardsCount > 0 ? 'color: var(--color-error);' : 'color: var(--color-success);'}">${dueCardsCount} cards</strong>
      </div>
    </div>
  `;
  rightCol.appendChild(statsCard);
  
  grid.appendChild(rightCol);
  container.appendChild(grid);
  
  return container;
}
