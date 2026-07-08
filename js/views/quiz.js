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

// Global Injectable Styles for premium quiz experience
function injectQuizStyles() {
  if (document.getElementById('quiz-dynamic-styles')) return;
  const styleEl = document.createElement('style');
  styleEl.id = 'quiz-dynamic-styles';
  styleEl.innerHTML = `
    .quiz-mode-selector {
      display: flex;
      justify-content: center;
      gap: 0.8rem;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
    }
    .mode-tab-btn {
      padding: 0.6rem 1.2rem;
      border-radius: 30px;
      border: 1px solid rgba(197, 168, 128, 0.3);
      background-color: rgba(197, 168, 128, 0.05);
      color: var(--color-primary);
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
    }
    .mode-tab-btn.active, .mode-tab-btn:hover {
      background-color: var(--color-primary);
      color: #ffffff;
      border-color: var(--color-primary);
      box-shadow: var(--shadow-sm);
    }
    .matching-board {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      margin-top: 1.5rem;
    }
    .matching-column {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }
    .drag-card {
      padding: 1rem;
      background-color: var(--color-bg);
      border: 1px solid rgba(10, 25, 49, 0.08);
      border-radius: var(--radius-sm);
      box-shadow: var(--shadow-sm);
      cursor: grab;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 500;
      transition: transform 0.2s, border-color 0.2s, background-color 0.2s;
    }
    .drag-card:active {
      cursor: grabbing;
    }
    .drag-card.dragging {
      opacity: 0.4;
      transform: scale(0.98);
    }
    .drag-card.matched {
      background-color: #E8F5E9;
      color: #2E7D32;
      border-color: #A5D6A7;
      cursor: default;
      pointer-events: none;
    }
    .drop-zone {
      padding: 1rem;
      background-color: rgba(10, 25, 49, 0.02);
      border: 2px dashed rgba(10, 25, 49, 0.12);
      border-radius: var(--radius-sm);
      min-height: 52px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-weight: 500;
      transition: all 0.25s ease;
      color: var(--color-text-main);
    }
    .drop-zone.hovered {
      background-color: rgba(197, 168, 128, 0.1);
      border-color: var(--color-accent);
      transform: scale(1.02);
    }
    .drop-zone.matched {
      background-color: #E8F5E9;
      color: #2E7D32;
      border: 2px solid #A5D6A7;
      pointer-events: none;
    }
    @keyframes shake-anim {
      0%, 100% { transform: translateX(0); }
      20%, 60% { transform: translateX(-8px); }
      40%, 80% { transform: translateX(8px); }
    }
    @keyframes pulse-matched {
      0% { transform: scale(1); }
      50% { transform: scale(1.03); }
      100% { transform: scale(1); }
    }
  `;
  document.head.appendChild(styleEl);
}

// Generate dynamic multiple choice quizzes on the fly
function generateDynamicQuizzes() {
  const dynamicQuizzes = [];
  const vocabs = state.db?.vocabulary || [];
  const grammars = state.db?.grammar || [];
  const cuisines = state.db?.cuisine || [];

  function getRandomDummies(arr, count, excludeId, field = 'japanese') {
    const pool = arr.filter(x => x.id !== excludeId).map(x => x[field]);
    const shuffled = pool.sort(() => 0.5 - Math.random());
    const unique = [...new Set(shuffled)].filter(Boolean).slice(0, count);
    while (unique.length < count) {
      unique.push("Autre option " + (unique.length + 1));
    }
    return unique;
  }

  // 1. Vocabulary Quizzes
  vocabs.forEach(item => {
    if (!item.french || !item.japanese) return;
    
    let category = 'vocabulary';
    if (item.tags?.includes('meat')) category = 'meat';
    else if (item.tags?.includes('sauces') || item.tags?.includes('sauce')) category = 'sauces';
    else if (item.tags?.includes('cutting')) category = 'cuts';
    else if (item.tags?.includes('science')) category = 'science';

    // Q1: French -> Japanese
    const dummiesJa = getRandomDummies(vocabs, 3, item.id, 'japanese');
    dynamicQuizzes.push({
      id: `dyn_vocab_fr_ja_${item.id}`,
      type: "choice",
      category: category,
      question: `Que signifie le mot français "${item.french}" ? / What does the French word "${item.french}" mean?`,
      question_fr: `Que signifie le mot français "${item.french}" ?`,
      question_en: `What does the French word "${item.french}" mean?`,
      context: item.definition_fr || `Usage: ${item.context_fr}`,
      options: shuffle([item.japanese, ...dummiesJa]),
      answer: item.japanese
    });

    // Q2: Japanese -> French
    const dummiesFr = getRandomDummies(vocabs, 3, item.id, 'french');
    dynamicQuizzes.push({
      id: `dyn_vocab_ja_fr_${item.id}`,
      type: "choice",
      category: category,
      question: `Quel est le mot français pour "${item.japanese}" ? / What is the French word for "${item.japanese}"?`,
      question_fr: `Quel est le mot français pour "${item.japanese}" ?`,
      question_en: `What is the French word for "${item.japanese}"?`,
      context: item.definition_fr || `Usage: ${item.context_fr}`,
      options: shuffle([item.french, ...dummiesFr]),
      answer: item.french
    });
  });

  // 2. Grammar Quizzes
  grammars.forEach(item => {
    if (!item.topic || !item.examples || item.examples.length === 0) return;

    // Q1: Match Topic Description
    const dummiesTopic = getRandomDummies(grammars, 3, item.id, 'topic');
    dynamicQuizzes.push({
      id: `dyn_gram_topic_${item.id}`,
      type: "choice",
      category: "grammar",
      question: `De quel concept de grammaire s'agit-il : "${item.explanation_ja}" ? / Which grammar concept is this: "${item.explanation_en}"?`,
      question_fr: `De quel concept de grammaire s'agit-il ?`,
      question_en: `Which grammar concept is this: "${item.explanation_en}"?`,
      context: `Niveau : ${item.level}. Indispensable pour la cuisine.`,
      options: shuffle([item.topic, ...dummiesTopic]),
      answer: item.topic
    });

    // Q2: Example Translation
    item.examples.forEach((ex, idx) => {
      const allExamples = grammars.flatMap(g => g.examples || []).filter(e => e.fr !== ex.fr);
      const dummiesExJa = allExamples.sort(() => 0.5 - Math.random()).map(e => e.ja).slice(0, 3);
      while (dummiesExJa.length < 3) {
        dummiesExJa.push("Option de traduction " + (dummiesExJa.length + 1));
      }

      dynamicQuizzes.push({
        id: `dyn_gram_ex_${item.id}_${idx}`,
        type: "choice",
        category: "grammar",
        question: `Traduisez la phrase : "${ex.fr}" / Translate the sentence: "${ex.fr}"`,
        question_fr: `Traduisez la phrase : "${ex.fr}"`,
        question_en: `Translate the sentence: "${ex.fr}"`,
        context: `Grammaire: ${item.topic} (${item.level})`,
        options: shuffle([ex.ja, ...dummiesExJa]),
        answer: ex.ja
      });
    });
  });

  // 3. Cuisine Quizzes
  cuisines.forEach(item => {
    if (!item.topic || !item.content_ja) return;

    const dummiesCuis = getRandomDummies(cuisines, 3, item.id, 'topic');
    let category = 'sauces';
    if (item.tags?.includes('knife-cuts') || item.tags?.includes('cuts')) category = 'cuts';
    else if (item.tags?.includes('meat')) category = 'meat';
    else if (item.tags?.includes('molecular') || item.tags?.includes('chemistry') || item.tags?.includes('science')) category = 'science';

    dynamicQuizzes.push({
      id: `dyn_cuis_topic_${item.id}`,
      type: "choice",
      category: category,
      question: `De quel concept culinaire s'agit-il : "${item.content_ja.substring(0, 120)}..." ? / Which culinary concept is described: "${item.content_en.substring(0, 120)}..."?`,
      question_fr: `De quel concept culinaire s'agit-il ?`,
      question_en: `Which culinary concept is described here?`,
      context: `Niveau : ${item.level}. Mots-clés : ${item.tags.join(', ')}`,
      options: shuffle([item.topic, ...dummiesCuis]),
      answer: item.topic
    });
  });

  return dynamicQuizzes;
}

// Generate dynamic pairs for taking / dialogue / sentences matching
function generateTakingPairs() {
  const pairs = [];
  const grammars = state.db?.grammar || [];
  const vocabs = state.db?.vocabulary || [];

  const candidates = [];
  
  grammars.forEach(g => {
    (g.examples || []).forEach(ex => {
      candidates.push({ fr: ex.fr, ja: ex.ja });
    });
  });

  vocabs.forEach(v => {
    if (v.context_fr && !v.context_fr.includes("Exemple avec le mot")) {
      candidates.push({ fr: v.context_fr, ja: v.context_ja });
    }
  });

  const shuffledCandidates = candidates.sort(() => 0.5 - Math.random());

  for (const item of shuffledCandidates) {
    if (pairs.length >= 4) break;

    const frClean = item.fr.replace(/^➔\s*/, '').trim();

    // 1. Check Dialogue style (" - ")
    if (frClean.includes(' - ')) {
      const parts = frClean.split(' - ');
      pairs.push({
        id: `pair_${pairs.length}`,
        left: `🗣️ ${parts[0].trim()}`,
        right: `💬 ${parts[1].trim()}`,
        context: item.ja
      });
    } 
    // 2. Check conditional style ("si") or complex sentence with a comma
    else if (frClean.includes(',')) {
      const parts = frClean.split(',');
      pairs.push({
        id: `pair_${pairs.length}`,
        left: `${parts[0].trim()} ,`,
        right: `... ${parts[1].trim()}`,
        context: item.ja
      });
    }
    // 3. Fallback: split in the middle
    else {
      const words = frClean.split(' ');
      if (words.length >= 4) {
        const splitIdx = Math.floor(words.length / 2);
        const leftPart = words.slice(0, splitIdx).join(' ');
        const rightPart = words.slice(splitIdx).join(' ');
        pairs.push({
          id: `pair_${pairs.length}`,
          left: `${leftPart} ...`,
          right: `... ${rightPart}`,
          context: item.ja
        });
      }
    }
  }

  // Fallbacks if not enough pairs generated
  const defaults = [
    { left: "🗣️ Chaud devant !", right: "💬 Oui, chef !", context: "お通りです！ / はい、シェフ！" },
    { left: "🗣️ Entrée prête ?", right: "💬 Oui, j'envoie.", context: "前菜はできていますか？ / はい、送ります。" },
    { left: "🗣️ Combien de couverts ?", right: "💬 Vingt couverts.", context: "何名様（何席）ですか？ / 20席です。" },
    { left: "🗣️ Envoyez la sauce !", right: "💬 Tout de suite !", context: "ソースを出して！ / ただちに！" }
  ];

  while (pairs.length < 4) {
    const d = defaults[pairs.length % defaults.length];
    pairs.push({
      id: `default_${pairs.length}`,
      left: d.left,
      right: d.right,
      context: d.context
    });
  }

  return pairs;
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

  injectQuizStyles();

  const targetLevel = state.settings?.targetLevel || 'ALL';
  Promise.all([
    ensureQuizzesLoaded(),
    ensureDataLoaded('vocabulary', 'ALL'),
    ensureDataLoaded('grammar', 'ALL'),
    ensureDataLoaded('cuisine', 'ALL')
  ]).then(() => {
    loading.remove();
    renderQuizContent(container);
  });

  return container;
}

function renderQuizContent(container) {
  let activeMode = 'multiple';
  let selectedCategory = 'ALL';
  
  // Render Mode Selector Tabs
  const selector = document.createElement('div');
  selector.className = 'quiz-mode-selector';
  selector.innerHTML = `
    <button class="mode-tab-btn active" data-mode="multiple">✍️ Choix Multiple</button>
    <button class="mode-tab-btn" data-mode="matching_vocab">🤝 Association (vocabulary)</button>
    <button class="mode-tab-btn" data-mode="matching_taking">🤝 Association (taking)</button>
    <button class="mode-tab-btn" data-mode="spelling">📖 Orthographe (Spelling)</button>
  `;
  container.appendChild(selector);

  // Category Selector
  const catFilter = document.createElement('div');
  catFilter.className = 'quiz-category-filter-wrapper';
  catFilter.style.margin = '1rem auto 1.5rem auto';
  catFilter.style.display = 'flex';
  catFilter.style.justifyContent = 'center';
  catFilter.style.alignItems = 'center';
  catFilter.style.gap = '0.8rem';
  
  catFilter.innerHTML = `
    <span style="font-size: 0.9rem; font-weight: 600; color: var(--color-primary);">Catégorie :</span>
    <select id="quiz-cat-select" style="padding: 0.5rem 1rem; border-radius: var(--radius-sm); border: 1px solid rgba(0,0,0,0.15); background-color: var(--color-bg); color: var(--color-text-main); font-size: 0.9rem; font-family: var(--font-serif); cursor: pointer; min-width: 220px; outline: none; box-shadow: var(--shadow-sm);">
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

  selector.querySelectorAll('.mode-tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      selector.querySelectorAll('.mode-tab-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      activeMode = e.target.getAttribute('data-mode');
      
      // Category filter is not relevant for Matching (taking), disable selection
      if (activeMode === 'matching_taking') {
        selectEl.disabled = true;
        selectEl.style.opacity = '0.5';
      } else {
        selectEl.disabled = false;
        selectEl.style.opacity = '1.0';
      }

      startSelectedGame();
    });
  });

  function startSelectedGame() {
    gameWrapper.innerHTML = '';
    if (activeMode === 'multiple') {
      runMultipleChoiceGame();
    } else if (activeMode === 'matching_vocab') {
      runMatchingVocabGame();
    } else if (activeMode === 'matching_taking') {
      runMatchingTakingGame();
    } else if (activeMode === 'spelling') {
      runSpellingGame();
    }
  }

  // ==========================================
  // GAME 1: MULTIPLE CHOICE (Choix Multiple)
  // ==========================================
  function runMultipleChoiceGame() {
    const staticQuizzes = state.db?.quizzes || [];
    const dynQuizzes = generateDynamicQuizzes();
    
    // Combine static and dynamically generated quizzes
    let allQuizzes = [...staticQuizzes, ...dynQuizzes];
    
    if (selectedCategory !== 'ALL') {
      allQuizzes = allQuizzes.filter(q => q.category === selectedCategory);
    }
    
    if (allQuizzes.length === 0) {
      gameWrapper.innerHTML = `
        <div class="quiz-card" style="text-align: center; padding: 2rem;">
          <p style="color: var(--color-text-muted); font-style: italic;">Aucune question trouvée dans cette catégorie. Essayez un autre filtre !</p>
        </div>
      `;
      return;
    }

    // Pick a subset of 10 shuffled questions for the session
    const quizzes = shuffle(allQuizzes).slice(0, 10);

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
            <button class="next-btn" id="restart-choice-btn" style="margin: 0 auto; display: block;">Restart Session</button>
          </div>
        `;
        gameWrapper.querySelector('#restart-choice-btn').addEventListener('click', () => {
          runMultipleChoiceGame();
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
            <div class="quiz-hint-flip-container" style="cursor: pointer; margin-top: 0.5rem;">
              <div class="q-en-card" style="padding: 0.5rem; border-radius: var(--radius-sm); border: 1px dashed rgba(197, 168, 128, 0.4); text-align: center; background-color: rgba(197, 168, 128, 0.02); font-size: 0.85rem; color: var(--color-accent); font-weight: 500;">
                💡 Translate (Show English Hint)
              </div>
              <div class="q-en-hint-text" style="display: none; padding: 0.5rem; margin-top: 0.3rem; font-style: italic; color: var(--color-text-muted); font-size: 0.9rem;">${quizItem.question_en}</div>
            </div>
          ` : ''}
        </div>
        
        <div class="quiz-options">
          ${quizItem.options.map((opt, i) => `
            <button class="quiz-btn" data-index="${i}">${opt}</button>
          `).join('')}
        </div>
        
        <div class="quiz-feedback" style="display: none; margin-top: 1.5rem; background-color: rgba(10,25,49,0.03); padding: 1rem; border-radius: var(--radius-sm); border-left: 3px solid var(--color-primary);">
          <strong>Contexte Culinaire:</strong>
          <p style="margin-top: 0.4rem; font-style: italic; font-size: 0.9rem;">${quizItem.context}</p>
        </div>
        
        <div style="margin-top: 1.5rem;">
          <button class="next-btn" id="next-q-btn" style="display: none; margin-left: auto;">Continue →</button>
        </div>
      `;

      // Hint Toggle
      const hintContainer = card.querySelector('.quiz-hint-flip-container');
      if (hintContainer) {
        hintContainer.addEventListener('click', () => {
          const hintText = hintContainer.querySelector('.q-en-hint-text');
          const isHidden = hintText.style.display === 'none';
          hintText.style.display = isHidden ? 'block' : 'none';
          hintContainer.querySelector('.q-en-card').innerText = isHidden ? '💡 Hide English Hint' : '💡 Translate (Show English Hint)';
        });
      }

      // Option selection
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
  // GAME 2: ASSOCIATION (vocabulary)
  // ==========================================
  function runMatchingVocabGame() {
    const includeGeneral = state.settings?.includeGeneral || false;
    const allVocabulary = state.db?.vocabulary || [];
    let vocabularyList = allVocabulary.filter(item => includeGeneral || item.is_professional);
    
    if (selectedCategory !== 'ALL') {
      if (selectedCategory === 'meat') {
        vocabularyList = vocabularyList.filter(item => 
          item.tags?.includes('meat') || item.tags?.includes('beef') || item.tags?.includes('pork') || item.tags?.includes('poultry') || /viande|boeuf|porc|poulet/i.test(item.french)
        );
      } else if (selectedCategory === 'sauces') {
        vocabularyList = vocabularyList.filter(item => 
          item.tags?.includes('sauce') || item.tags?.includes('sauces') || item.tags?.includes('stocks') || /sauce|fond|jus|bouillon/i.test(item.french)
        );
      } else if (selectedCategory === 'cuts') {
        vocabularyList = vocabularyList.filter(item => 
          item.tags?.includes('cutting') || item.tags?.includes('vegetables') || /coupe|tailler|ciseler|mincer|brunoise|julienne/i.test(item.french)
        );
      } else if (selectedCategory === 'science') {
        vocabularyList = vocabularyList.filter(item => 
          item.tags?.includes('science') || /réaction|émulsion|liaison/i.test(item.french)
        );
      } else if (selectedCategory === 'grammar') {
        vocabularyList = []; // Vocabulary is separate from grammar lessons
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

    const selectedTerms = shuffle(vocabularyList).slice(0, 4);
    const leftTerms = shuffle(selectedTerms);
    const rightTerms = shuffle(selectedTerms);

    const card = document.createElement('div');
    card.className = 'quiz-card';
    card.innerHTML = `
      <div class="quiz-meta" style="margin-bottom: 1rem;">
        <span>🤝 Association (vocabulary)</span>
        <span class="grammar-badge" style="background-color: var(--color-primary);">Game</span>
      </div>
      <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 1.5rem;">
        Drag a French term from the left, and drop it onto its Japanese translation on the right. (Or click left card, then click match).
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
      
      <div id="matching-completion-panel" style="display: none; text-align: center; margin-top: 1.5rem;">
        <div style="color: var(--color-success); font-weight: 700; font-size: 1.1rem; margin-bottom: 1rem;">🤝 Excellent ! Tous les termes ont été associés avec succès.</div>
        <button class="next-btn" id="restart-match-btn" style="margin: 0 auto; display: block;">Play Again</button>
      </div>
    `;

    gameWrapper.appendChild(card);
    setupMatchingHandlers(card, 4, runMatchingVocabGame);
  }

  // ==========================================
  // GAME 3: ASSOCIATION (taking)
  // ==========================================
  function runMatchingTakingGame() {
    const selectedPairs = generateTakingPairs();

    const card = document.createElement('div');
    card.className = 'quiz-card';
    card.innerHTML = `
      <div class="quiz-meta" style="margin-bottom: 1rem;">
        <span>🤝 Association (taking) - Conversation & Cloze</span>
        <span class="grammar-badge" style="background-color: var(--color-success);">Dialogue</span>
      </div>
      <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 1.5rem;">
        Match dialogues or sentence fragments. Drag a card from the left, and drop it onto the correct continuation or response on the right.
      </p>
      
      <div class="matching-board">
        <div class="matching-column" id="left-column">
          ${shuffle(selectedPairs).map(p => `
            <div class="drag-card" draggable="true" data-id="${p.id}" id="drag-${p.id}" style="font-size: 0.9rem; padding: 0.8rem;">
              <span>${p.left}</span>
              <span style="font-size: 1rem; opacity: 0.3;">☰</span>
            </div>
          `).join('')}
        </div>
        
        <div class="matching-column" id="right-column">
          ${shuffle(selectedPairs).map(p => `
            <div class="drop-zone" data-id="${p.id}" style="font-size: 0.9rem; padding: 0.8rem; min-height: 48px;">
              ${p.right}
            </div>
          `).join('')}
        </div>
      </div>
      
      <div id="matching-completion-panel" style="display: none; text-align: center; margin-top: 1.5rem;">
        <div style="color: var(--color-success); font-weight: 700; font-size: 1.1rem; margin-bottom: 1rem;">🗣️ Parfait ! Vous maîtrisez la communication en cuisine.</div>
        <button class="next-btn" id="restart-match-btn" style="margin: 0 auto; display: block;">Play Again</button>
      </div>
    `;

    gameWrapper.appendChild(card);
    setupMatchingHandlers(card, 4, runMatchingTakingGame);
  }

  // Matching board interaction handlers (handles vocab & taking games)
  function setupMatchingHandlers(cardContainer, totalMatches, restartFn) {
    let draggedId = null;
    let selectedLeftId = null;
    let matchesCount = 0;

    const dragCards = cardContainer.querySelectorAll('.drag-card');
    const dropZones = cardContainer.querySelectorAll('.drop-zone');
    const completionPanel = cardContainer.querySelector('#matching-completion-panel');

    dragCards.forEach(drag => {
      drag.addEventListener('dragstart', (e) => {
        draggedId = e.target.closest('.drag-card').getAttribute('data-id');
        e.target.closest('.drag-card').classList.add('dragging');
      });

      drag.addEventListener('dragend', (e) => {
        e.target.closest('.drag-card').classList.remove('dragging');
      });
      
      drag.addEventListener('click', (e) => {
        const item = e.target.closest('.drag-card');
        if (item.classList.contains('matched')) return;

        dragCards.forEach(c => c.style.borderColor = 'rgba(10,25,49,0.08)');
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
          shakeElement(draggedId);
        }
      });

      zone.addEventListener('click', () => {
        if (zone.classList.contains('matched') || !selectedLeftId) return;

        const targetId = zone.getAttribute('data-id');
        if (selectedLeftId === targetId) {
          applyMatch(selectedLeftId, zone);
          selectedLeftId = null;
        } else {
          shakeElement(selectedLeftId);
          selectedLeftId = null;
          dragCards.forEach(c => c.style.borderColor = 'rgba(10,25,49,0.08)');
        }
      });
    });

    function shakeElement(id) {
      const wrongCard = cardContainer.querySelector(`#drag-${id}`);
      if (wrongCard) {
        wrongCard.style.animation = 'shake-anim 0.4s ease-in-out';
        setTimeout(() => wrongCard.style.animation = '', 400);
      }
    }

    function applyMatch(id, zone) {
      const leftCard = cardContainer.querySelector(`#drag-${id}`);
      leftCard.classList.add('matched');
      leftCard.style.borderColor = 'var(--color-success)';
      zone.classList.add('matched');
      
      matchesCount++;
      if (matchesCount === totalMatches) {
        completionPanel.style.display = 'block';
      }
    }

    cardContainer.querySelector('#restart-match-btn').addEventListener('click', () => {
      restartFn();
    });
  }

  // ==========================================
  // GAME 4: SPELLING CHALLENGE (Orthographe)
  // ==========================================
  function runSpellingGame() {
    const includeGeneral = state.settings?.includeGeneral || false;
    const allVocabulary = state.db?.vocabulary || [];
    let vocabularyList = allVocabulary.filter(item => includeGeneral || item.is_professional);

    if (selectedCategory !== 'ALL') {
      if (selectedCategory === 'meat') {
        vocabularyList = vocabularyList.filter(item => 
          item.tags?.includes('meat') || item.tags?.includes('beef') || item.tags?.includes('pork') || item.tags?.includes('poultry') || /viande|boeuf|porc|poulet/i.test(item.french)
        );
      } else if (selectedCategory === 'sauces') {
        vocabularyList = vocabularyList.filter(item => 
          item.tags?.includes('sauce') || item.tags?.includes('sauces') || item.tags?.includes('stocks') || /sauce|fond|jus|bouillon/i.test(item.french)
        );
      } else if (selectedCategory === 'cuts') {
        vocabularyList = vocabularyList.filter(item => 
          item.tags?.includes('cutting') || item.tags?.includes('vegetables') || /coupe|tailler|ciseler|mincer|brunoise|julienne/i.test(item.french)
        );
      } else if (selectedCategory === 'science') {
        vocabularyList = vocabularyList.filter(item => 
          item.tags?.includes('science') || /réaction|émulsion|liaison/i.test(item.french)
        );
      } else if (selectedCategory === 'grammar') {
        vocabularyList = []; // Spelling is based on vocabulary words
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
        <span>📖 Orthographe de Cuisine</span>
        <span class="grammar-badge" style="background-color: var(--color-secondary);">${item.category}</span>
      </div>
      
      <div class="spelling-box" style="margin-bottom: 1.5rem; background-color: rgba(10,25,49,0.02); padding: 1.2rem; border-radius: var(--radius-sm); border-left: 3px solid var(--color-accent);">
        <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-accent); font-weight: 600; margin-bottom: 0.4rem;">Définition en Français (Monolingual Clue):</div>
        <p style="font-size: 1.05rem; font-style: italic; color: var(--color-primary); line-height: 1.4; font-family: var(--font-serif);">${item.definition_fr}</p>
        
        <div style="margin-top: 1rem; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 0.8rem; font-size: 0.85rem; color: var(--color-text-muted);">
          <strong>Hint (Japanese):</strong> ${item.japanese}
        </div>
      </div>
      
      <div style="margin-bottom: 1.5rem;">
        <label style="font-size: 0.8rem; font-weight: 600; display: block; margin-bottom: 0.5rem; color: var(--color-text-muted);">Écrivez le mot en français (Write the French word):</label>
        <input type="text" class="spelling-input" id="spelling-input-field" placeholder="Tapez ici..." autocomplete="off" style="width: 100%; padding: 0.7rem; border-radius: var(--radius-sm); border: 1px solid rgba(0,0,0,0.15); font-size: 1.1rem; outline: none;" autofocus>
      </div>
      
      <div id="spelling-feedback-panel" style="display: none; margin-bottom: 1.5rem; padding: 1rem; border-radius: var(--radius-sm);">
        <strong id="spelling-feedback-title"></strong>
        <p id="spelling-feedback-msg" style="margin-top: 0.3rem; font-size: 0.95rem;"></p>
      </div>
      
      <div style="display: flex; gap: 1rem;">
        <button class="next-btn" id="spelling-submit-btn">Vérifier (Check)</button>
        <button class="next-btn" id="spelling-next-btn" style="display: none; margin-left: auto;">Next Term →</button>
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
        inputField.style.borderColor = 'var(--color-success)';
        inputField.style.backgroundColor = '#E8F5E9';
        feedbackPanel.style.backgroundColor = '#E8F5E9';
        feedbackPanel.style.color = 'var(--color-success)';
        feedbackTitle.innerText = "✓ Félicitations ! (Correct)";
        feedbackMsg.innerText = `You correctly spelled: "${correctText}"`;
      } else {
        inputField.style.borderColor = 'var(--color-error)';
        inputField.style.backgroundColor = '#FFEBEE';
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
