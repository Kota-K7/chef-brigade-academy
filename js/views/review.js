import { state, updateSRS, removeWrongAnswer, ensureAllDataLoaded } from '../../app.js';
import { speakFrench } from '../utils/audio.js';

export function renderReview() {
  const container = document.createElement('div');
  
  const title = document.createElement('h2');
  title.className = 'section-title';
  title.innerText = "Pont d'Études (SRS Review Deck)";
  container.appendChild(title);
  
  const subtitle = document.createElement('p');
  subtitle.className = 'section-subtitle';
  subtitle.innerText = "Review and grade yourself on items scheduled for active recall today.";
  container.appendChild(subtitle);
  
  const loading = document.createElement('div');
  loading.className = 'loading-placeholder';
  loading.innerText = "Chargement des révisions... (Loading reviews...)";
  container.appendChild(loading);
  
  ensureAllDataLoaded().then(() => {
    loading.remove();
    renderReviewContent(container);
  });
  
  return container;
}

function renderReviewContent(container) {
  const now = new Date().toISOString().split('T')[0];
  
  // Collect all items from the db (including quizzes for missed question review)
  const allItems = [
    ...(state.db?.vocabulary || []).map(x => ({ ...x, type: 'vocabulary', front: x.french })),
    ...(state.db?.grammar || []).map(x => ({ ...x, type: 'grammar', front: x.topic })),
    ...(state.db?.cuisine || []).map(x => ({ ...x, type: 'cuisine', front: x.topic })),
    ...(state.db?.quizzes || []).map(x => ({ ...x, type: 'quiz', front: x.question_fr || x.question || '' }))
  ];
  
  // Filter items that are due OR are explicitly in the wrong answers list
  const dueItems = allItems.filter(item => {
    const srsInfo = state.srs[item.id];
    const isWrong = state.wrongAnswers.includes(item.id);
    return isWrong || (srsInfo && srsInfo.dueDate <= now);
  });
  
  const totalDue = dueItems.length;
  let currentIndex = 0;
  
  const cardContainer = document.createElement('div');
  cardContainer.className = 'srs-review-container';
  container.appendChild(cardContainer);
  
  function renderCard() {
    cardContainer.innerHTML = '';
    
    if (dueItems.length === 0 || currentIndex >= dueItems.length) {
      cardContainer.innerHTML = `
        <div class="alert alert-info" style="background-color: #E8F5E9; border-left-color: var(--color-success); color: var(--color-success); padding: 2rem; text-align: center;">
          <h3 style="font-family: var(--font-serif); font-size: 1.8rem; margin-bottom: 0.5rem;">Tout est propre !</h3>
          <p>No cards due for review today. Excellent job keeping up with your kitchen training!</p>
        </div>
      `;
      return;
    }
    
    const item = dueItems[currentIndex];
    const srsInfo = state.srs[item.id] || { interval: 0, repetitions: 0 };
    const isWrongSource = state.wrongAnswers.includes(item.id);
    
    const card = document.createElement('div');
    card.className = 'card srs-flip-card';
    card.style.padding = '2rem';
    card.style.minHeight = '300px';
    card.style.display = 'flex';
    card.style.flexDirection = 'column';
    card.style.justifyContent = 'space-between';
    
    // Front view content
    let categoryText = item.category || item.level || 'Theory';
    if (item.type === 'quiz') categoryText = 'Quiz Mistake';
    
    let frontHTML = `
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
          <span class="card-category">${categoryText} • ${item.type.toUpperCase()}</span>
          <span style="font-size: 0.8rem; color: var(--color-text-muted);">
            Card ${currentIndex + 1} of ${totalDue}
            ${isWrongSource ? ' <span style="color: var(--color-error); font-weight: bold;">(Wrong Answer)</span>' : ''}
          </span>
        </div>
        <div style="text-align: center; margin: 2rem 0;">
          <h1 style="font-family: var(--font-serif); font-size: 1.8rem; color: var(--color-primary); font-style: italic; line-height: 1.3;">${item.front}</h1>
          ${item.type === 'grammar' ? `<p style="color: var(--color-text-muted); margin-top: 0.5rem;">French Grammar Topic</p>` : ''}
          ${item.type === 'cuisine' ? `<p style="color: var(--color-text-muted); margin-top: 0.5rem;">Culinary Theory Guide</p>` : ''}
          ${item.type === 'quiz' && item.question_en ? `<p style="font-family: var(--font-sans); color: var(--color-text-muted); font-size: 0.95rem; font-style: normal; font-weight: normal; margin-top: 0.8rem;">${item.question_en}</p>` : ''}
        </div>
      </div>
      <button class="next-btn" id="reveal-btn" style="width: 100%; font-size: 1.1rem; padding: 0.8rem;">
        Afficher la réponse (Reveal Answer)
      </button>
    `;
    
    card.innerHTML = frontHTML;
    
    // Back view HTML builder
    let backHTMLContent = '';
    if (item.type === 'vocabulary') {
      backHTMLContent = `
        <div style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.8rem;">
          <div style="background-color: rgba(197, 168, 128, 0.04); border-left: 3px solid var(--color-accent); padding: 0.8rem 1rem; border-radius: var(--radius-sm);">
            <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-accent); font-weight: 600; margin-bottom: 0.2rem; display: flex; align-items: center; gap: 0.4rem;">
              <span>Définition Monolingue (FR)</span>
              <button class="audio-btn" data-text="${item.definition_fr}" title="Listen definition" style="background: none; border: none; font-size: 0.85rem; cursor: pointer; color: var(--color-accent); padding: 0;">🔊</button>
            </div>
            <p style="font-size: 0.95rem; line-height: 1.4; color: var(--color-text-main); font-weight: 500; font-style: italic;">${item.definition_fr || 'Pas de définition.'}</p>
          </div>
          
          <div class="flip-translation-container">
            <div class="flip-translation-card">
              <div class="flip-front">🇬🇧 Afficher l'anglais (Show English Translation)</div>
              <div class="flip-back" style="color: var(--color-secondary); justify-content: center; font-weight: 600;">🇬🇧 ${item.english}</div>
            </div>
          </div>
          
          <div class="trans-ja" style="font-size: 1.1rem; color: var(--color-text-main); font-weight: 500;">${item.japanese}</div>
        </div>
        <div class="term-context" style="margin-top: 1.2rem; background-color: rgba(197, 168, 128, 0.05); padding: 1rem; border-radius: var(--radius-sm);">
          <div class="context-fr" style="display: flex; align-items: flex-start; gap: 0.4rem; font-style: italic; color: var(--color-primary);">
            <span style="flex: 1;">"${item.context_fr}"</span>
            <button class="audio-btn" data-text="${item.context_fr}" title="Listen context" style="background: none; border: none; font-size: 0.85rem; cursor: pointer; color: var(--color-text-muted); padding: 0.15rem;">🔊</button>
          </div>
          <div class="context-ja" style="color: var(--color-text-muted); margin-top: 0.3rem;">${item.context_ja}</div>
        </div>
      `;
    } else if (item.type === 'grammar') {
      backHTMLContent = `
        <div style="margin-top: 1rem;">
          <p style="font-weight: 600; color: var(--color-primary);">Explanation (EN):</p>
          <p style="font-size: 0.9rem; margin-bottom: 0.8rem;">${item.explanation_en}</p>
          <p style="font-weight: 600; color: var(--color-primary);">説明 (JA):</p>
          <p style="font-size: 0.9rem; margin-bottom: 1rem;">${item.explanation_ja}</p>
          <div class="examples-list" style="border-top: 1px solid rgba(0,0,0,0.05); padding-top: 0.8rem;">
            ${item.examples.map(ex => `
              <div class="example-item" style="margin-bottom: 0.5rem;">
                <div class="example-fr">➔ ${ex.fr}</div>
                <div class="example-ja" style="font-size: 0.8rem; color: var(--color-text-muted);">${ex.ja}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } else if (item.type === 'cuisine') {
      backHTMLContent = `
        <div style="margin-top: 1rem; display: flex; flex-direction: column; gap: 1rem;">
          <div>
            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-accent); font-weight: 600;">Français</h4>
            <p style="font-size: 0.95rem; font-style: italic; color: var(--color-primary); line-height: 1.5;">${item.content_fr}</p>
          </div>
          <div>
            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-accent); font-weight: 600;">English</h4>
            <p style="font-size: 0.9rem; color: var(--color-text-main); line-height: 1.5;">${item.content_en}</p>
          </div>
          <div style="background-color: rgba(10, 25, 49, 0.03); padding: 0.8rem; border-radius: var(--radius-sm); border-left: 3px solid var(--color-secondary);">
            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-primary); font-weight: 600;">日本語解説</h4>
            <p style="font-size: 0.85rem; color: var(--color-text-main); line-height: 1.5;">${item.content_ja}</p>
          </div>
        </div>
      `;
    } else if (item.type === 'quiz') {
      backHTMLContent = `
        <div style="margin-top: 1rem; display: flex; flex-direction: column; gap: 1rem;">
          <div style="background-color: rgba(70, 163, 73, 0.08); border-left: 3px solid var(--color-success); padding: 1rem; border-radius: var(--radius-sm);">
            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-success); font-weight: 600; margin-bottom: 0.2rem;">Correct Solution</h4>
            <p style="font-size: 1.1rem; color: var(--color-text-main); font-weight: 600;">${item.answer}</p>
          </div>
          <div>
            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-accent); font-weight: 600; margin-bottom: 0.2rem;">Kitchen Context / Explanation</h4>
            <p style="font-size: 0.9rem; color: var(--color-text-main); line-height: 1.5;">${item.context}</p>
          </div>
        </div>
      `;
    }
    
    // Wire up Reveal event
    card.querySelector('#reveal-btn').addEventListener('click', () => {
      card.innerHTML = `
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <span class="card-category">${categoryText} • ${item.type.toUpperCase()}</span>
            <span style="font-size: 0.8rem; color: var(--color-text-muted);">Card ${currentIndex + 1} of ${totalDue}</span>
          </div>
          
          <h2 style="font-family: var(--font-serif); font-size: 1.8rem; color: var(--color-primary); font-style: italic; text-align: center; margin-bottom: 1rem; line-height: 1.3;">${item.front}</h2>
          ${item.type === 'quiz' && item.question_en ? `<p style="font-family: var(--font-sans); color: var(--color-text-muted); font-size: 0.9rem; text-align: center; margin-bottom: 1.5rem;">${item.question_en}</p>` : ''}
          
          <div style="max-height: 300px; overflow-y: auto; padding-right: 0.5rem; margin-bottom: 2rem;">
            ${backHTMLContent}
          </div>
        </div>
        
        <!-- Score buttons (SM-2 options) -->
        <div>
          <div style="font-size: 0.85rem; font-weight: 600; text-align: center; margin-bottom: 0.8rem; color: var(--color-text-muted);">How well did you recall this?</div>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.4rem;">
            <button class="next-btn srs-score-btn" data-score="1" style="background-color: var(--color-error); font-size: 0.8rem; padding: 0.6rem 0.2rem;">
              Again
            </button>
            <button class="next-btn srs-score-btn" data-score="3" style="background-color: #FFA726; font-size: 0.8rem; padding: 0.6rem 0.2rem;">
              Hard
            </button>
            <button class="next-btn srs-score-btn" data-score="4" style="background-color: var(--color-primary); font-size: 0.8rem; padding: 0.6rem 0.2rem;">
              Good
            </button>
            <button class="next-btn srs-score-btn" data-score="5" style="background-color: var(--color-success); font-size: 0.8rem; padding: 0.6rem 0.2rem;">
              Easy
            </button>
          </div>
        </div>
      `;
      
      // English Translation Flip Handler (for vocabulary card on the back)
      const flipContainer = card.querySelector('.flip-translation-container');
      if (flipContainer) {
        flipContainer.addEventListener('click', (e) => {
          e.stopPropagation();
          const flipCard = flipContainer.querySelector('.flip-translation-card');
          flipCard.classList.toggle('flipped');
        });
      }

      // Audio click handler in review card
      card.querySelectorAll('.audio-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const text = e.target.closest('.audio-btn').getAttribute('data-text');
          speakFrench(text);
        });
      });

      // Wire up Score buttons
      card.querySelectorAll('.srs-score-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const score = parseInt(e.target.getAttribute('data-score'));
          
          // Execute SRS algorithm
          updateSRS(item.id, score);
          
          // If rated good or easy (q >= 4) and was in wrong list, remove it
          if (score >= 4 && isWrongSource) {
            removeWrongAnswer(item.id);
          }
          
          currentIndex++;
          renderCard();
        });
      });
    });
    
    cardContainer.appendChild(card);
  }
  
  renderCard();
}
