import { state, updateSettings } from '../../app.js';

export function renderSettings() {
  const container = document.createElement('div');
  
  const title = document.createElement('h2');
  title.className = 'section-title';
  title.innerText = "Configuration de l'Académie";
  container.appendChild(title);
  
  const subtitle = document.createElement('p');
  subtitle.className = 'section-subtitle';
  subtitle.innerText = "Customize your learning goals, target CEFR levels, and database options.";
  container.appendChild(subtitle);
  
  const settingsCard = document.createElement('div');
  settingsCard.className = 'card';
  settingsCard.style.padding = '2rem';
  
  const currentSettings = state.settings;
  
  settingsCard.innerHTML = `
    <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--color-primary); border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 0.8rem; margin-bottom: 1.5rem;">Study Profile</h3>
    
    <div style="display: flex; flex-direction: column; gap: 1.8rem;">
      <!-- 1. Target Level Selection -->
      <div>
        <label style="font-weight: 600; display: block; margin-bottom: 0.5rem; color: var(--color-text-main);">Niveau Cible (Target Level)</label>
        <span style="font-size: 0.85rem; color: var(--color-text-muted); display: block; margin-bottom: 0.8rem;">Select your culinary French proficiency level. Vocabulary and Grammar filters will adapt.</span>
        <select id="target-level-select" style="padding: 0.6rem 1rem; font-size: 0.95rem; border-radius: var(--radius-sm); border: 1px solid rgba(0,0,0,0.15); width: 100%; max-width: 300px; background-color: var(--color-bg); cursor: pointer;">
          <option value="ALL" ${currentSettings.targetLevel === 'ALL' ? 'selected' : ''}>ALL LEVELS (Tout)</option>
          <option value="A1" ${currentSettings.targetLevel === 'A1' ? 'selected' : ''}>A1 - Beginner (Apprenti)</option>
          <option value="A2" ${currentSettings.targetLevel === 'A2' ? 'selected' : ''}>A2 - Intermediate (Commis)</option>
          <option value="B1" ${currentSettings.targetLevel === 'B1' ? 'selected' : ''}>B1 - Advanced (Chef de Partie)</option>
          <option value="B2" ${currentSettings.targetLevel === 'B2' ? 'selected' : ''}>B2 - Upper Intermediate (Sous Chef)</option>
          <option value="C1" ${currentSettings.targetLevel === 'C1' ? 'selected' : ''}>C1 - Expert (Chef de Cuisine)</option>
          <option value="C2" ${currentSettings.targetLevel === 'C2' ? 'selected' : ''}>C2 - Master (Directeur de Cuisine)</option>
        </select>
      </div>
      
      <!-- 2. Daily Goal - New Cards -->
      <div>
        <label style="font-weight: 600; display: block; margin-bottom: 0.5rem; color: var(--color-text-main);">Daily Goal: New Cards/Day</label>
        <span style="font-size: 0.85rem; color: var(--color-text-muted); display: block; margin-bottom: 0.8rem;">Number of new culinary vocabulary items to introduce per day.</span>
        <input type="number" id="new-cards-goal" min="1" max="50" value="${currentSettings.newCardsPerDay}" style="padding: 0.6rem 1rem; font-size: 0.95rem; border-radius: var(--radius-sm); border: 1px solid rgba(0,0,0,0.15); width: 100%; max-width: 120px;">
      </div>
      
      <!-- 3. Daily Goal - Max Reviews -->
      <div>
        <label style="font-weight: 600; display: block; margin-bottom: 0.5rem; color: var(--color-text-main);">Daily Goal: Max Reviews/Day</label>
        <span style="font-size: 0.85rem; color: var(--color-text-muted); display: block; margin-bottom: 0.8rem;">Maximum number of scheduled SRS reviews to show per day.</span>
        <input type="number" id="max-reviews-goal" min="5" max="200" value="${currentSettings.maxReviewsPerDay}" style="padding: 0.6rem 1rem; font-size: 0.95rem; border-radius: var(--radius-sm); border: 1px solid rgba(0,0,0,0.15); width: 100%; max-width: 120px;">
      </div>

      <!-- 4. Include General Vocabulary -->
      <div>
        <label style="font-weight: 600; display: block; margin-bottom: 0.5rem; color: var(--color-text-main);">Vocabulaire Général (General Vocabulary)</label>
        <span style="font-size: 0.85rem; color: var(--color-text-muted); display: block; margin-bottom: 0.8rem;">Include basic French vocabulary (non-cooking related) in your learning.</span>
        <div style="display: flex; align-items: center; gap: 0.8rem; margin-bottom: 0.5rem;">
          <input type="checkbox" id="include-general-checkbox" style="transform: scale(1.3); cursor: pointer;" ${currentSettings.includeGeneral ? 'checked' : ''}>
          <label for="include-general-checkbox" style="font-size: 0.95rem; cursor: pointer; user-select: none;">Include daily general terms (A1-B1)</label>
        </div>
      </div>
      
      <!-- Action status notification -->
      <div id="settings-status" style="display: none; padding: 0.8rem; background-color: #E8F5E9; border-left: 3px solid var(--color-success); color: var(--color-success); font-size: 0.9rem; border-radius: 0 var(--radius-sm) var(--radius-sm) 0;">
        ✓ Paramètres enregistrés avec succès ! (Settings saved successfully!)
      </div>

      <!-- 5. Share App -->
      <div style="border-top: 1px solid rgba(0,0,0,0.05); padding-top: 1.5rem; margin-top: 1rem;">
        <h4 style="font-family: var(--font-serif); font-size: 1.3rem; color: var(--color-primary); margin-bottom: 0.5rem;">Partager l'Académie</h4>
        <span style="font-size: 0.85rem; color: var(--color-text-muted); display: block; margin-bottom: 0.8rem;">Share this integrated learning app with your fellow chefs.</span>
        <button id="share-app-btn" class="next-btn" style="background-color: var(--color-accent); font-size: 0.95rem; padding: 0.6rem 1.5rem; display: flex; align-items: center; gap: 0.5rem; border-color: var(--color-accent-hover);">
          🔗 Share with Friends
        </button>
      </div>
      
      <!-- 4. Data Maintenance -->
      <div style="border-top: 1px solid rgba(0,0,0,0.05); padding-top: 1.5rem; margin-top: 1rem;">
        <h4 style="font-family: var(--font-serif); font-size: 1.3rem; color: var(--color-error); margin-bottom: 1rem;">Zone de Danger</h4>
        
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <button id="reset-srs-btn" class="next-btn" style="background-color: var(--color-error); font-size: 0.9rem; padding: 0.6rem 1.2rem;">
            Reset SRS Memory Deck
          </button>
          
          <button id="clear-favs-btn" class="next-btn" style="background-color: transparent; border: 2px solid var(--color-error); color: var(--color-error); font-size: 0.9rem; padding: 0.5rem 1.2rem;">
            Clear All Favorites
          </button>
        </div>
      </div>
    </div>
  `;
  
  // Handlers
  const levelSelect = settingsCard.querySelector('#target-level-select');
  const newCardsInput = settingsCard.querySelector('#new-cards-goal');
  const maxReviewsInput = settingsCard.querySelector('#max-reviews-goal');
  const includeGeneralCheckbox = settingsCard.querySelector('#include-general-checkbox');
  const statusAlert = settingsCard.querySelector('#settings-status');
  
  function triggerSave() {
    const targetLevel = levelSelect.value;
    const newCardsPerDay = parseInt(newCardsInput.value) || 5;
    const maxReviewsPerDay = parseInt(maxReviewsInput.value) || 20;
    const includeGeneral = includeGeneralCheckbox.checked;
    
    updateSettings({
      targetLevel,
      newCardsPerDay,
      maxReviewsPerDay,
      includeGeneral
    });
    
    statusAlert.style.display = 'block';
    setTimeout(() => {
      statusAlert.style.display = 'none';
    }, 3000);
  }
  
  levelSelect.addEventListener('change', triggerSave);
  newCardsInput.addEventListener('input', triggerSave);
  maxReviewsInput.addEventListener('input', triggerSave);
  includeGeneralCheckbox.addEventListener('change', triggerSave);
  
  // Danger Buttons
  settingsCard.querySelector('#reset-srs-btn').addEventListener('click', () => {
    if (confirm("Voulez-vous vraiment réinitialiser toutes vos données de progression SRS ? Cette action est irréversible.")) {
      localStorage.removeItem('cba_srs');
      state.srs = {};
      alert("Spaced Repetition System progress has been reset.");
      window.location.reload();
    }
  });
  
  settingsCard.querySelector('#clear-favs-btn').addEventListener('click', () => {
    if (confirm("Voulez-vous vraiment supprimer tous vos favoris ?")) {
      localStorage.removeItem('cba_favorites');
      state.favorites = new Set();
      alert("All favorites have been cleared.");
      window.location.reload();
    }
  });

  // Share Application Listener
  settingsCard.querySelector('#share-app-btn').addEventListener('click', () => {
    const shareData = {
      title: 'Académie de la Brigade',
      text: 'フランス料理・厨房フランス語の統合学習PWAアプリ「Académie de la Brigade」で一緒に料理と語学を学びましょう！',
      url: window.location.origin + window.location.pathname
    };
    if (navigator.share) {
      navigator.share(shareData)
        .then(() => console.log('Shared successfully'))
        .catch((err) => console.log('Error sharing:', err));
    } else {
      navigator.clipboard.writeText(shareData.url).then(() => {
        alert("App link copied to clipboard! Share it with your friends.");
      }).catch((err) => {
        console.error("Failed to copy link:", err);
      });
    }
  });
  
  container.appendChild(settingsCard);
  return container;
}
