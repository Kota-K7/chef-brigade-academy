import { state, addWrongAnswer, ensureDataLoaded, ensureQuizzesLoaded } from '../../app.js';

// Helper to shuffle arrays
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Accent normalization helper for lenient spelling comparison
function normalizeString(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .toLowerCase()
    .trim()
    .replace(/[-\s]+/g, ' '); // normalize hyphens and spaces
}

export function renderQuiz() {
  const container = document.createElement('div');
  
  const title = document.createElement('h2');
  title.className = 'section-title';
  title.innerText = "Vérification des Connaissances";
  container.appendChild(title);
  
  const subtitle = document.createElement('p');
  subtitle.className = 'section-subtitle';
  subtitle.innerText = "Test your professional French vocabulary, kitchen commands, and classical cuisine theory.";
  container.appendChild(subtitle);

  const loading = document.createElement('div');
  loading.className = 'loading-placeholder';
  loading.innerText = "Chargement du quiz... (Loading quiz...)";
  container.appendChild(loading);

  const targetLevel = state.settings?.targetLevel || 'ALL';
  Promise.all([
    ensureQuizzesLoaded(),
    ensureDataLoaded('vocabulary', targetLevel)
  ]).then(() => {
    loading.remove();
    renderQuizContent(container);
  });

  return container;
}

function renderQuizContent(container) {
  // Active mode state: 'multiple' (default) | 'matching' | 'spelling'
  let activeMode = 'multiple';
  let selectedCategory = 'ALL';
  
  // Render Mode Selector Tabs
  const selector = document.createElement('div');
  selector.className = 'quiz-mode-selector';
  selector.innerHTML = `
    <button class="mode-tab-btn active" data-mode="multiple">✍️ Choix Multiple</button>
    <button class="mode-tab-btn" data-mode="matching">🤝 Association (Match)</button>
    <button class="mode-tab-btn" data-mode="spelling">📖 Orthographe (Spelling)</button>
  `;
  container.appendChild(selector);

  // Render Category Selector
  const catFilter = document.createElement('div');
  catFilter.className = 'quiz-category-filter-wrapper';
  catFilter.style.margin = '1rem auto 1.5rem auto';
  catFilter.style.display = 'flex';
  catFilter.style.justifyContent = 'center';
  catFilter.style.alignItems = 'center';
  catFilter.style.gap = '0.8rem';
  
  catFilter.innerHTML = `
    <span style="font-size: 0.9rem; font-weight: 600; color: var(--color-primary);">Catégorie :</span>
    <select id="quiz-cat-select" style="padding: 0.5rem 1rem; border-radius: var(--radius-sm); border: 1px solid rgba(0,0,0,0.15); background-color: var(--color-bg); color: var(--color-text-main); font-size: 0.9rem; font-family: var(--font-serif); cursor: pointer; min-width: 220px; outline: none; box-shadow: var(--shadow-sm); transition: border-color 0.2s;">
      <option value="ALL">All (Tout)</option>
      <option value="vocabulary">単語 (Vocabulary)</option>
      <option value="grammar">会話・文法 (Grammar & Dialogues)</option>
      <option value="meat">お肉 (Meat Cuts)</option>
      <option value="map">美食マップ (Gastronomy Map)</option>
      <option value="science">料理科学 (Culinary Science)</option>
      <option value="sauces">ソース部門 (Sauces & Stocks)</option>
      <option value="cuts">切り方 (Knife Cuts)</option>
    </select>
  `;
  container.appendChild(catFilter);
  
  const selectEl = catFilter.querySelector('#quiz-cat-select');
  selectEl.addEventListener('change', (e) => {
    selectedCategory = e.target.value;
    startSelectedGame();
  });
  
  const gameWrapper = document.createElement('div');
  gameWrapper.className = 'quiz-game-wrapper';
  container.appendChild(gameWrapper);
  
  // Selector click handler
  selector.querySelectorAll('.mode-tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      selector.querySelectorAll('.mode-tab-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      activeMode = e.target.getAttribute('data-mode');
      startSelectedGame();
    });
  });

  // Game launchers
  function startSelectedGame() {
    gameWrapper.innerHTML = '';
    if (activeMode === 'multiple') {
      runMultipleChoiceGame();
    } else if (activeMode === 'matching') {
      runMatchingGame();
    } else if (activeMode === 'spelling') {
      runSpellingGame();
    }
  }

  // ==========================================
  // GAME 1: MULTIPLE CHOICE (Choix Multiple)
  // ==========================================
  function runMultipleChoiceGame() {
    let quizzes = state.db?.quizzes || [];
    if (selectedCategory !== 'ALL') {
      quizzes = quizzes.filter(q => q.category === selectedCategory);
    }
    if (quizzes.length === 0) {
      gameWrapper.innerHTML = `
        <div class="quiz-card" style="text-align: center; padding: 2rem;">
          <p style="color: var(--color-text-muted); font-style: italic;">Aucune question trouvée dans cette catégorie. Essayez un autre filtre !</p>
        </div>
      `;
      return;
    }

    let currentIndex = 0;
    let score = 0;
    let answered = false;

    function renderCurrentChoice() {
      gameWrapper.innerHTML = '';
      answered = false;

      if (currentIndex >= quizzes.length) {
        // Results
        const successRate = Math.round((score / quizzes.length) * 100);
        let rank = "Apprenti (Apprentice)";
        if (successRate >= 90) rank = "Chef de Partie (Station Chef)";
        else if (successRate >= 70) rank = "Commis de Cuisine (Line Cook)";

        gameWrapper.innerHTML = `
          <div class="quiz-card" style="text-align: center;">
            <h3 style="font-family: var(--font-serif); font-size: 2rem; color: var(--color-primary); margin-bottom: 1rem;">Session Terminée !</h3>
            <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">Your Score: <strong>${score} / ${quizzes.length}</strong> (${successRate}%)</p>
            <div style="background-color: rgba(197, 168, 128, 0.1); border: 1px solid var(--color-accent); padding: 1.5rem; border-radius: var(--radius-md); margin-bottom: 2rem;">
              <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--color-text-muted); letter-spacing: 1px;">Assigned Rank</div>
              <div style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--color-primary); font-weight: 700; margin-top: 0.3rem;">${rank}</div>
            </div>
            <button class="next-btn" id="restart-choice-btn">Restart Session</button>
          </div>
        `;
        gameWrapper.querySelector('#restart-choice-btn').addEventListener('click', () => {
          currentIndex = 0;
          score = 0;
          renderCurrentChoice();
        });
        return;
      }

      const quizItem = quizzes[currentIndex];
      const card = document.createElement('div');
      card.className = 'quiz-card';
      card.innerHTML = `
        <div class="quiz-meta">
          <span>Question ${currentIndex + 1} of ${quizzes.length}</span>
          <span class="grammar-badge" style="background-color: var(--color-secondary);">${quizItem.category}</span>
        </div>
        
        <div class="quiz-question" style="display: flex; flex-direction: column; gap: 0.8rem; margin-bottom: 1.5rem;">
          <div class="q-fr" style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--color-primary); font-style: italic; line-height: 1.3;">${quizItem.question_fr || quizItem.question || ''}</div>
          ${quizItem.question_en ? `
            <div class="quiz-hint-flip-container">
              <div class="q-en-card">
                <div class="q-en-front">💡 Traduire en anglais (Show English Hint)</div>
                <div class="q-en-back">${quizItem.question_en}</div>
              </div>
            </div>
          ` : ''}
        </div>
        
        <div class="quiz-options">
          ${quizItem.options.map((opt, i) => `
            <button class="quiz-btn" data-index="${i}">${opt}</button>
          `).join('')}
        </div>
        
        <div class="quiz-feedback" style="display: none; margin-top: 1.5rem;">
          <strong>Contexte Culinaire:</strong>
          <p style="margin-top: 0.4rem; font-style: italic;">${quizItem.context}</p>
        </div>
        
        <div style="margin-top: 1.5rem; display: flex; gap: 1rem;">
          <button class="next-btn" id="next-q-btn" style="display: none;">Continue</button>
        </div>
      `;

      // Flip Listener
      const hintContainer = card.querySelector('.quiz-hint-flip-container');
      if (hintContainer) {
        hintContainer.addEventListener('click', (e) => {
          e.stopPropagation();
          const hintCard = hintContainer.querySelector('.q-en-card');
          hintCard.classList.toggle('flipped');
        });
      }

      // Answer Click Listeners
      const optionBtns = card.querySelectorAll('.quiz-btn');
      const feedback = card.querySelector('.quiz-feedback');
      const nextBtn = card.querySelector('#next-q-btn');

      optionBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          if (answered) return;
          answered = true;
          const selectedOption = e.target.innerText;
          const correct = selectedOption === quizItem.answer;

          optionBtns.forEach(b => {
            b.disabled = true;
            if (b.innerText === quizItem.answer) {
              b.classList.add('correct');
            }
          });

          if (correct) {
            score++;
          } else {
            e.target.classList.add('incorrect');
            addWrongAnswer(quizItem.id);
          }

          feedback.style.display = 'block';
          nextBtn.style.display = 'block';
        });
      });

      nextBtn.addEventListener('click', () => {
        currentIndex++;
        renderCurrentChoice();
      });

      gameWrapper.appendChild(card);
    }

    renderCurrentChoice();
  }

  // ==========================================
  // GAME 2: DRAG-AND-DROP MATCHING (Association)
  // ==========================================
  function runMatchingGame() {
    const includeGeneral = state.settings?.includeGeneral || false;
    const allVocabulary = state.db?.vocabulary || [];
    let vocabularyList = allVocabulary.filter(item => includeGeneral || item.is_professional);
    
    if (selectedCategory !== 'ALL') {
      if (selectedCategory === 'meat') {
        vocabularyList = vocabularyList.filter(item => 
          item.tags?.includes('meat') || 
          item.tags?.includes('beef') || 
          item.tags?.includes('pork') || 
          item.tags?.includes('poultry') || 
          /viande|boeuf|porc|poulet|animal/i.test(item.french)
        );
      } else if (selectedCategory === 'sauces') {
        vocabularyList = vocabularyList.filter(item => 
          item.tags?.includes('sauce') || 
          item.tags?.includes('sauces') || 
          item.tags?.includes('stocks') || 
          /sauce|fond|jus|bouillon/i.test(item.french)
        );
      } else if (selectedCategory === 'cuts') {
        vocabularyList = vocabularyList.filter(item => 
          item.tags?.includes('cutting') || 
          item.tags?.includes('vegetables') || 
          /coupe|tailler|ciseler|mincer|brunoise|julienne/i.test(item.french)
        );
      } else if (selectedCategory === 'science') {
        vocabularyList = vocabularyList.filter(item => 
          item.tags?.includes('science') || 
          /réaction|émulsion|liaison|amidon/i.test(item.french)
        );
      } else if (selectedCategory === 'grammar') {
        vocabularyList = [];
      }
    }

    if (vocabularyList.length < 4) {
      gameWrapper.innerHTML = `
        <div class="quiz-card" style="text-align: center; padding: 2rem;">
          <p style="color: var(--color-text-muted); font-style: italic;">Il faut au moins 4 termes de vocabulaire dans cette catégorie pour jouer l'Association.</p>
        </div>
      `;
      return;
    }

    // Select 4 random terms
    const selectedTerms = shuffle(vocabularyList).slice(0, 4);

    // Left column: French terms (shuffled)
    const leftTerms = shuffle(selectedTerms);
    // Right column: Japanese terms (shuffled)
    const rightTerms = shuffle(selectedTerms);

    const card = document.createElement('div');
    card.className = 'quiz-card';
    card.innerHTML = `
      <div class="quiz-meta" style="margin-bottom: 1rem;">
        <span>Association de Vocabulaire</span>
        <span class="grammar-badge" style="background-color: var(--color-primary);">Game</span>
      </div>
      <p style="font-size: 0.9rem; color: var(--color-text-muted); margin-bottom: 1.5rem;">
        Drag a French term from the left, and drop it onto the correct Japanese translation on the right. 
        <em>(Or click a card on the left, then click its match on the right)</em>
      </p>
      
      <div class="matching-board">
        <div class="matching-column" id="left-column">
          ${leftTerms.map(term => `
            <div class="drag-card" draggable="true" data-id="${term.id}" id="drag-${term.id}">
              <span>${term.french}</span>
              <span style="font-size: 1rem; opacity: 0.3;">☰</span>
            </div>
          `).join('')}
        </div>
        
        <div class="matching-column" id="right-column">
          ${rightTerms.map(term => `
            <div class="drop-zone" data-id="${term.id}">
              ${term.japanese}
            </div>
          `).join('')}
        </div>
      </div>
      
      <div id="matching-completion-panel" style="display: none; text-align: center; margin-top: 1.5rem; animation: pulse-matched 0.5s ease-in-out;">
        <div style="color: var(--color-success); font-weight: 700; font-size: 1.2rem; margin-bottom: 1rem;">🤝 Excellent ! Tous les termes ont été associés avec succès.</div>
        <button class="next-btn" id="restart-match-btn" style="margin: 0 auto;">Play Again</button>
      </div>
    `;

    gameWrapper.appendChild(card);

    let draggedId = null;
    let selectedLeftId = null;
    let matchesCount = 0;

    const dragCards = card.querySelectorAll('.drag-card');
    const dropZones = card.querySelectorAll('.drop-zone');
    const completionPanel = card.querySelector('#matching-completion-panel');

    // 1. Drag & Drop Event Listeners
    dragCards.forEach(drag => {
      drag.addEventListener('dragstart', (e) => {
        draggedId = e.target.closest('.drag-card').getAttribute('data-id');
        e.target.closest('.drag-card').classList.add('dragging');
      });

      drag.addEventListener('dragend', (e) => {
        e.target.closest('.drag-card').classList.remove('dragging');
      });
      
      // Tap-to-match selection listener (for mobile accessibility)
      drag.addEventListener('click', (e) => {
        const item = e.target.closest('.drag-card');
        if (item.classList.contains('matched')) return;

        dragCards.forEach(c => c.style.borderColor = 'rgba(0,0,0,0.08)');
        selectedLeftId = item.getAttribute('data-id');
        item.style.borderColor = 'var(--color-accent)';
      });
    });

    dropZones.forEach(zone => {
      zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (!zone.classList.contains('matched')) {
          zone.classList.add('hovered');
        }
      });

      zone.addEventListener('dragleave', () => {
        zone.classList.remove('hovered');
      });

      zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('hovered');
        const targetId = zone.getAttribute('data-id');

        if (draggedId === targetId) {
          applyMatch(draggedId, zone);
        } else {
          // Play shake feedback
          const wrongCard = card.querySelector(`#drag-${draggedId}`);
          if (wrongCard) {
            wrongCard.style.animation = 'shake-anim 0.4s ease-in-out';
            setTimeout(() => wrongCard.style.animation = '', 400);
          }
        }
      });

      // Tap-to-match drop target listener
      zone.addEventListener('click', () => {
        if (zone.classList.contains('matched') || !selectedLeftId) return;

        const targetId = zone.getAttribute('data-id');
        if (selectedLeftId === targetId) {
          applyMatch(selectedLeftId, zone);
          selectedLeftId = null;
        } else {
          // Play shake feedback
          const wrongCard = card.querySelector(`#drag-${selectedLeftId}`);
          if (wrongCard) {
            wrongCard.style.animation = 'shake-anim 0.4s ease-in-out';
            setTimeout(() => wrongCard.style.animation = '', 400);
          }
          selectedLeftId = null;
          dragCards.forEach(c => c.style.borderColor = 'rgba(0,0,0,0.08)');
        }
      });
    });

    function applyMatch(id, zone) {
      const leftCard = card.querySelector(`#drag-${id}`);
      leftCard.classList.add('matched');
      leftCard.style.borderColor = 'var(--color-success)';
      zone.classList.add('matched');
      
      matchesCount++;
      if (matchesCount === 4) {
        completionPanel.style.display = 'block';
      }
    }

    card.querySelector('#restart-match-btn').addEventListener('click', () => {
      runMatchingGame();
    });
  }

  // ==========================================
  // GAME 3: SPELLING CHALLENGE (Orthographe)
  // ==========================================
  function runSpellingGame() {
    const includeGeneral = state.settings?.includeGeneral || false;
    const allVocabulary = state.db?.vocabulary || [];
    let vocabularyList = allVocabulary.filter(item => includeGeneral || item.is_professional);

    if (selectedCategory !== 'ALL') {
      if (selectedCategory === 'meat') {
        vocabularyList = vocabularyList.filter(item => 
          item.tags?.includes('meat') || 
          item.tags?.includes('beef') || 
          item.tags?.includes('pork') || 
          item.tags?.includes('poultry') || 
          /viande|boeuf|porc|poulet|animal/i.test(item.french)
        );
      } else if (selectedCategory === 'sauces') {
        vocabularyList = vocabularyList.filter(item => 
          item.tags?.includes('sauce') || 
          item.tags?.includes('sauces') || 
          item.tags?.includes('stocks') || 
          /sauce|fond|jus|bouillon/i.test(item.french)
        );
      } else if (selectedCategory === 'cuts') {
        vocabularyList = vocabularyList.filter(item => 
          item.tags?.includes('cutting') || 
          item.tags?.includes('vegetables') || 
          /coupe|tailler|ciseler|mincer|brunoise|julienne/i.test(item.french)
        );
      } else if (selectedCategory === 'science') {
        vocabularyList = vocabularyList.filter(item => 
          item.tags?.includes('science') || 
          /réaction|émulsion|liaison|amidon/i.test(item.french)
        );
      } else if (selectedCategory === 'grammar') {
        vocabularyList = [];
      }
    }

    if (vocabularyList.length === 0) {
      gameWrapper.innerHTML = `
        <div class="quiz-card" style="text-align: center; padding: 2rem;">
          <p style="color: var(--color-text-muted); font-style: italic;">Aucun terme de vocabulaire disponible dans cette catégorie pour jouer l'Orthographe.</p>
        </div>
      `;
      return;
    }

    let item = shuffle(vocabularyList)[0];

    const card = document.createElement('div');
    card.className = 'quiz-card';
    card.innerHTML = `
      <div class="quiz-meta" style="margin-bottom: 1.2rem;">
        <span>Orthographe de Cuisine</span>
        <span class="grammar-badge" style="background-color: var(--color-secondary);">${item.category}</span>
      </div>
      
      <div class="spelling-box" style="margin-bottom: 1.5rem;">
        <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-accent); font-weight: 600; margin-bottom: 0.4rem;">Définition en Français (Monolingual Clue):</div>
        <p style="font-size: 1.05rem; font-style: italic; color: var(--color-primary); line-height: 1.4; font-family: var(--font-serif);">${item.definition_fr}</p>
        
        <div style="margin-top: 1rem; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 0.8rem; font-size: 0.85rem; color: var(--color-text-muted);">
          <strong>Hint (Japanese):</strong> ${item.japanese}
        </div>
      </div>
      
      <div style="margin-bottom: 1.5rem;">
        <label style="font-size: 0.8rem; font-weight: 600; display: block; margin-bottom: 0.5rem; color: var(--color-text-muted);">Écrivez le mot en français (Write the French word):</label>
        <input type="text" class="spelling-input" id="spelling-input-field" placeholder="Tapez ici..." autocomplete="off" autofocus>
      </div>
      
      <div id="spelling-feedback-panel" style="display: none; margin-bottom: 1.5rem; padding: 1rem; border-radius: var(--radius-sm);">
        <strong id="spelling-feedback-title"></strong>
        <p id="spelling-feedback-msg" style="margin-top: 0.3rem; font-size: 0.95rem;"></p>
      </div>
      
      <div style="display: flex; gap: 1rem;">
        <button class="next-btn" id="spelling-submit-btn">Vérifier (Check)</button>
        <button class="next-btn" id="spelling-next-btn" style="display: none;">Next Term</button>
      </div>
    `;

    gameWrapper.appendChild(card);

    const inputField = card.querySelector('#spelling-input-field');
    const submitBtn = card.querySelector('#spelling-submit-btn');
    const nextBtn = card.querySelector('#spelling-next-btn');
    const feedbackPanel = card.querySelector('#spelling-feedback-panel');
    const feedbackTitle = card.querySelector('#spelling-feedback-title');
    const feedbackMsg = card.querySelector('#spelling-feedback-msg');

    inputField.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        submitBtn.click();
      }
    });

    submitBtn.addEventListener('click', () => {
      const userText = inputField.value;
      const correctText = item.french;

      const normUser = normalizeString(userText);
      const normCorrect = normalizeString(correctText);

      const isCorrect = normUser === normCorrect;

      inputField.disabled = true;
      submitBtn.style.display = 'none';
      nextBtn.style.display = 'block';

      feedbackPanel.style.display = 'block';

      if (isCorrect) {
        inputField.classList.add('correct');
        feedbackPanel.style.backgroundColor = '#E8F5E9';
        feedbackPanel.style.color = 'var(--color-success)';
        feedbackTitle.innerText = "✓ Félicitations ! (Correct)";
        feedbackMsg.innerText = `You correctly spelled: "${correctText}"`;
      } else {
        inputField.classList.add('incorrect');
        feedbackPanel.style.backgroundColor = '#FFEBEE';
        feedbackPanel.style.color = 'var(--color-error)';
        feedbackTitle.innerText = "✗ Incorrect";
        feedbackMsg.innerHTML = `Correct spelling is: <strong>${correctText}</strong>.<br><em style="font-size:0.85rem;">You typed: "${userText}"</em>`;
        addWrongAnswer(item.id);
      }
    });

    nextBtn.addEventListener('click', () => {
      runSpellingGame();
    });
  }

  // Load default game mode
  startSelectedGame();
}
