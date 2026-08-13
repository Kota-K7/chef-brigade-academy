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

function filterQuestionsByCategory(questions, category) {
  if (category === 'ALL') return questions;
  
  const tagMapping = {
    meat: ['meat', 'beef', 'pork', 'poultry'],
    sauces: ['sauce', 'sauces', 'stocks'],
    cuts: ['cutting', 'cuts', 'vegetables'],
    science: ['science'],
    map: ['map', 'region', 'regional_culture'],
    grammar: ['grammar', 'greetings', 'dialogue', 'verbs'],
    vocabulary: ['vocabulary', 'vegetables', 'cooking', 'ingredients']
  };
  
  const targetTags = tagMapping[category] || [category];
  return questions.filter(q => 
    q.tags && q.tags.some(tag => 
      targetTags.some(t => tag.toLowerCase().includes(t.toLowerCase()))
    )
  );
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
  const knowledge = state.db?.knowledge || [];
  
  const vocabs = knowledge.filter(item => item.french && item.japanese);
  const grammars = knowledge.filter(item => item.grammar);
  const cuisines = knowledge.filter(item => item.cuisine);

  function getRandomDummies(arr, count, excludeId, resolver) {
    const pool = arr.filter(x => x.id !== excludeId).map(resolver);
    const shuffled = pool.sort(() => 0.5 - Math.random());
    const unique = [...new Set(shuffled)].filter(Boolean).slice(0, count);
    while (unique.length < count) {
      unique.push("Autre option " + (unique.length + 1));
    }
    return unique;
  }

  // 1. Vocabulary Quizzes
  vocabs.forEach(item => {
    let category = 'vocabulary';
    if (item.tags?.includes('meat')) category = 'meat';
    else if (item.tags?.includes('sauces') || item.tags?.includes('sauce')) category = 'sauces';
    else if (item.tags?.includes('cutting')) category = 'cuts';
    else if (item.tags?.includes('science')) category = 'science';

    // Q1: French -> Japanese
    const dummiesJa = getRandomDummies(vocabs, 3, item.id, x => x.japanese);
    const ctxFr = item.examples && item.examples[0] ? item.examples[0].fr : "";
    dynamicQuizzes.push({
      id: `dyn_vocab_fr_ja_${item.id}`,
      type: "choice",
      category: category,
      question: `Que signifie le mot français "${item.french}" ? / What does the French word "${item.french}" mean?`,
      question_fr: `Que signifie le mot français "${item.french}" ?`,
      question_en: `What does the French word "${item.french}" mean?`,
      context: item.definition_fr || `Usage: ${ctxFr}`,
      options: shuffle([item.japanese, ...dummiesJa]),
      answer: item.japanese
    });

    // Q2: Japanese -> French
    const dummiesFr = getRandomDummies(vocabs, 3, item.id, x => x.french);
    dynamicQuizzes.push({
      id: `dyn_vocab_ja_fr_${item.id}`,
      type: "choice",
      category: category,
      question: `Quel est le mot français pour "${item.japanese}" ? / What is the French word for "${item.japanese}"?`,
      question_fr: `Quel est le mot français pour "${item.japanese}" ?`,
      question_en: `What is the French word for "${item.japanese}"?`,
      context: item.definition_fr || `Usage: ${ctxFr}`,
      options: shuffle([item.french, ...dummiesFr]),
      answer: item.french
    });
  });

  // 2. Grammar Quizzes
  grammars.forEach(item => {
    if (!item.grammar.topic || !item.examples || item.examples.length === 0) return;

    // Q1: Match Topic Description
    const dummiesTopic = getRandomDummies(grammars, 3, item.id, x => x.grammar.topic);
    dynamicQuizzes.push({
      id: `dyn_gram_topic_${item.id}`,
      type: "choice",
      category: "grammar",
      question: `De quel concept de grammaire s'agit-il : "${item.grammar.explanation_ja}" ? / Which grammar concept is this: "${item.grammar.explanation_en}"?`,
      question_fr: `De quel concept de grammaire s'agit-il ?`,
      question_en: `Which grammar concept is this: "${item.grammar.explanation_en}"?`,
      context: `Niveau : ${item.level}. Indispensable pour la cuisine.`,
      options: shuffle([item.grammar.topic, ...dummiesTopic]),
      answer: item.grammar.topic
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
        context: `Grammaire: ${item.grammar.topic} (${item.level})`,
        options: shuffle([ex.ja, ...dummiesExJa]),
        answer: ex.ja
      });
    });
  });

  // 3. Cuisine Quizzes
  cuisines.forEach(item => {
    if (!item.cuisine.topic || !item.cuisine.content_ja) return;

    const dummiesCuis = getRandomDummies(cuisines, 3, item.id, x => x.cuisine.topic);
    let category = 'sauces';
    if (item.tags?.includes('knife-cuts') || item.tags?.includes('cuts')) category = 'cuts';
    else if (item.tags?.includes('meat')) category = 'meat';
    else if (item.tags?.includes('molecular') || item.tags?.includes('chemistry') || item.tags?.includes('science')) category = 'science';

    dynamicQuizzes.push({
      id: `dyn_cuis_topic_${item.id}`,
      type: "choice",
      category: category,
      question: `De quel concept culinaire s'agit-il : "${item.cuisine.content_ja.substring(0, 120)}..." ? / Which culinary concept is described: "${item.cuisine.content_en.substring(0, 120)}..."?`,
      question_fr: `De quel concept culinaire s'agit-il ?`,
      question_en: `Which culinary concept is described here?`,
      context: `Niveau : ${item.level}. Mots-clés : ${item.tags.join(', ')}`,
      options: shuffle([item.cuisine.topic, ...dummiesCuis]),
      answer: item.cuisine.topic
    });
  });

  return dynamicQuizzes;
}

function generateTakingPairs() {
  const pairs = [];
  const knowledge = state.db?.knowledge || [];
  const candidates = [];
  
  knowledge.forEach(item => {
    (item.examples || []).forEach(ex => {
      candidates.push({ fr: ex.fr, ja: ex.ja });
    });
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
    ensureDataLoaded('cuisine', 'ALL'),
    fetch('rpg/questions_db.json').then(r => r.json()).then(data => {
      state.questionsDb = data;
    }).catch(err => {
      console.error("Failed to load questions_db in quiz:", err);
      state.questionsDb = [];
    })
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
    <button class="mode-tab-btn" data-mode="association">🤝 Association (Matching)</button>
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
      
      startSelectedGame();
    });
  });

  function startSelectedGame() {
    gameWrapper.innerHTML = '';
    if (activeMode === 'multiple') {
      runMultipleChoiceGame();
    } else if (activeMode === 'association') {
      runAssociationGame();
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
  // GAME 2: ASSOCIATION (Matching)
  // ==========================================
  function runAssociationGame() {
    let pool = [];
    if (state.questionsDb && state.questionsDb.length > 0) {
      const allMatching = state.questionsDb.filter(q => q.type === 'matching');
      pool = filterQuestionsByCategory(allMatching, selectedCategory);
    }

    // Fallback matching generation if pool is empty
    if (pool.length === 0) {
      const includeGeneral = state.settings?.includeGeneral || false;
      const allVocabulary = state.db?.vocabulary || [];
      let vocabularyList = allVocabulary.filter(item => includeGeneral || item.is_professional);
      
      if (selectedCategory !== 'ALL') {
        if (selectedCategory === 'meat') {
          vocabularyList = vocabularyList.filter(item => item.tags?.includes('meat') || /viande|boeuf/i.test(item.french));
        } else if (selectedCategory === 'sauces') {
          vocabularyList = vocabularyList.filter(item => item.tags?.includes('sauce') || /sauce|fond/i.test(item.french));
        } else if (selectedCategory === 'cuts') {
          vocabularyList = vocabularyList.filter(item => item.tags?.includes('cutting') || /coupe|tailler/i.test(item.french));
        } else if (selectedCategory === 'science') {
          vocabularyList = vocabularyList.filter(item => item.tags?.includes('science') || /réaction|émulsion/i.test(item.french));
        } else if (selectedCategory === 'map') {
          vocabularyList = vocabularyList.filter(item => item.tags?.includes('map') || /région|ville/i.test(item.french));
        }
      }

      if (vocabularyList.length >= 4) {
        const selectedTerms = shuffle(vocabularyList).slice(0, 4);
        pool = [{
          id: "dyn_match_vocab",
          tags: ["vocabulary"],
          text: "Associez les paires correctes. (正しいペアを結びつけてください。)",
          pairs: selectedTerms.map(t => ({ left: t.french, right: t.japanese })),
          explanation: "単語のペアを正しくマッチさせました。"
        }];
      }
    }

    if (pool.length === 0) {
      gameWrapper.innerHTML = `
        <div class="quiz-card" style="text-align: center; padding: 2rem;">
          <p style="color: var(--color-text-muted); font-style: italic;">Il faut au moins 4 termes de vocabulaire dans cette catégorie pour jouer l'Association.</p>
        </div>
      `;
      return;
    }

    const quizzes = shuffle(pool).slice(0, 5);
    let currentIndex = 0;

    function renderCurrentAssociation() {
      gameWrapper.innerHTML = '';

      if (currentIndex >= quizzes.length) {
        // Results
        gameWrapper.innerHTML = `
          <div class="quiz-card" style="text-align: center;">
            <h3 style="font-family: var(--font-serif); font-size: 2rem; color: var(--color-primary); margin-bottom: 1rem;">Session Terminée !</h3>
            <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">Félicitations, vous avez complété toutes les associations de cette session !</p>
            <button class="next-btn" id="restart-assoc-btn" style="margin: 0 auto; display: block;">Restart Session</button>
          </div>
        `;
        gameWrapper.querySelector('#restart-assoc-btn').addEventListener('click', () => {
          runAssociationGame();
        });
        return;
      }

      const matchItem = quizzes[currentIndex];
      const leftTerms = shuffle(matchItem.pairs.map(p => p.left));
      const rightTerms = shuffle(matchItem.pairs.map(p => p.right));
      
      const badge = matchItem.tags && matchItem.tags.length > 0 ? matchItem.tags[0] : 'association';

      const card = document.createElement('div');
      card.className = 'quiz-card';
      card.innerHTML = `
        <div class="quiz-meta" style="margin-bottom: 1rem;">
          <span>Question ${currentIndex + 1} of ${quizzes.length}</span>
          <span class="grammar-badge" style="background-color: var(--color-primary);">${badge}</span>
        </div>
        <p style="font-size: 1rem; color: var(--color-primary); font-family: var(--font-serif); margin-bottom: 1.2rem; font-weight: 500;">
          ${matchItem.text}
        </p>
        
        <div class="matching-board">
          <div class="matching-column" id="left-column">
            ${leftTerms.map((term, i) => `
              <div class="drag-card" draggable="true" data-val="${term}" id="drag-${currentIndex}-${i}">
                <span>${term}</span>
                <span style="font-size: 1rem; opacity: 0.3;">☰</span>
              </div>
            `).join('')}
          </div>
          
          <div class="matching-column" id="right-column">
            ${rightTerms.map((term, i) => `
              <div class="drop-zone" data-val="${term}">
                ${term}
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="quiz-feedback" style="display: none; margin-top: 1.5rem; background-color: rgba(10,25,49,0.03); padding: 1rem; border-radius: var(--radius-sm); border-left: 3px solid var(--color-success);">
          <strong>Explanation:</strong>
          <p style="margin-top: 0.4rem; font-style: italic; font-size: 0.9rem;">${matchItem.explanation || '正しいペアをマッチさせました。'}</p>
        </div>
        
        <div id="matching-completion-panel" style="display: none; text-align: center; margin-top: 1.5rem;">
          <button class="next-btn" id="next-assoc-btn" style="margin: 0 auto; display: block;">Continue →</button>
        </div>
      `;

      gameWrapper.appendChild(card);
      setupAssociationHandlers(card, matchItem, () => {
        const feedback = card.querySelector('.quiz-feedback');
        const completionPanel = card.querySelector('#matching-completion-panel');
        feedback.style.display = 'block';
        completionPanel.style.display = 'block';
      });

      card.querySelector('#next-assoc-btn').addEventListener('click', () => {
        currentIndex++;
        renderCurrentAssociation();
      });
    }

    renderCurrentAssociation();
  }

  function setupAssociationHandlers(cardContainer, matchItem, onComplete) {
    let draggedVal = null;
    let selectedLeftVal = null;
    let matchesCount = 0;
    const totalMatches = matchItem.pairs.length;

    const dragCards = cardContainer.querySelectorAll('.drag-card');
    const dropZones = cardContainer.querySelectorAll('.drop-zone');

    dragCards.forEach(drag => {
      drag.addEventListener('dragstart', (e) => {
        draggedVal = e.target.closest('.drag-card').getAttribute('data-val');
        e.target.closest('.drag-card').classList.add('dragging');
      });

      drag.addEventListener('dragend', (e) => {
        e.target.closest('.drag-card').classList.remove('dragging');
      });
      
      drag.addEventListener('click', (e) => {
        const item = e.target.closest('.drag-card');
        if (item.classList.contains('matched')) return;

        dragCards.forEach(c => c.style.borderColor = 'rgba(10,25,49,0.08)');
        selectedLeftVal = item.getAttribute('data-val');
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
        const targetVal = zone.getAttribute('data-val');

        const correctPair = matchItem.pairs.find(p => p.left === draggedVal && p.right === targetVal);
        if (correctPair) {
          applyMatch(draggedVal, zone);
        } else {
          shakeElementByVal(draggedVal);
        }
      });

      zone.addEventListener('click', () => {
        if (zone.classList.contains('matched') || !selectedLeftVal) return;

        const targetVal = zone.getAttribute('data-val');
        const correctPair = matchItem.pairs.find(p => p.left === selectedLeftVal && p.right === targetVal);
        if (correctPair) {
          applyMatch(selectedLeftVal, zone);
          selectedLeftVal = null;
        } else {
          shakeElementByVal(selectedLeftVal);
          selectedLeftVal = null;
          dragCards.forEach(c => c.style.borderColor = 'rgba(10,25,49,0.08)');
        }
      });
    });

    function shakeElementByVal(val) {
      const wrongCard = Array.from(dragCards).find(c => c.getAttribute('data-val') === val);
      if (wrongCard) {
        wrongCard.style.animation = 'shake-anim 0.4s ease-in-out';
        setTimeout(() => wrongCard.style.animation = '', 400);
      }
    }

    function applyMatch(val, zone) {
      const leftCard = Array.from(dragCards).find(c => c.getAttribute('data-val') === val);
      leftCard.classList.add('matched');
      leftCard.style.borderColor = 'var(--color-success)';
      leftCard.draggable = false;
      zone.classList.add('matched');
      
      matchesCount++;
      if (matchesCount === totalMatches) {
        onComplete();
      }
    }
  }

  // ==========================================
  // GAME 3: SPELLING CHALLENGE (Orthographe)
  // ==========================================
  function runSpellingGame() {
    let pool = [];
    if (state.questionsDb && state.questionsDb.length > 0) {
      const allTyping = state.questionsDb.filter(q => q.type === 'typing');
      pool = filterQuestionsByCategory(allTyping, selectedCategory);
    }
    
    // Fallback to legacy vocabulary spelling if no questions found in pool
    if (pool.length === 0) {
      const includeGeneral = state.settings?.includeGeneral || false;
      const allVocabulary = state.db?.vocabulary || [];
      let vocabularyList = allVocabulary.filter(item => includeGeneral || item.is_professional);
      
      if (selectedCategory !== 'ALL') {
        if (selectedCategory === 'meat') {
          vocabularyList = vocabularyList.filter(item => item.tags?.includes('meat') || /viande|boeuf/i.test(item.french));
        } else if (selectedCategory === 'sauces') {
          vocabularyList = vocabularyList.filter(item => item.tags?.includes('sauce') || /sauce|fond/i.test(item.french));
        } else if (selectedCategory === 'cuts') {
          vocabularyList = vocabularyList.filter(item => item.tags?.includes('cutting') || /coupe|tailler/i.test(item.french));
        } else if (selectedCategory === 'science') {
          vocabularyList = vocabularyList.filter(item => item.tags?.includes('science') || /réaction|émulsion/i.test(item.french));
        } else if (selectedCategory === 'map') {
          vocabularyList = vocabularyList.filter(item => item.tags?.includes('map') || /région|ville/i.test(item.french));
        }
      }
      
      pool = vocabularyList.map(item => ({
        id: item.id,
        text: `${item.definition_fr}\n(Hint Japanese: ${item.japanese})`,
        acceptedAnswers: [item.french, item.french.toLowerCase()],
        explanation: `${item.french}: ${item.japanese}`,
        tags: [item.category]
      }));
    }

    if (pool.length === 0) {
      gameWrapper.innerHTML = `
        <div class="quiz-card" style="text-align: center; padding: 2rem;">
          <p style="color: var(--color-text-muted); font-style: italic;">Aucun terme disponible dans cette catégorie pour jouer l'Orthographe.</p>
        </div>
      `;
      return;
    }

    const quizzes = shuffle(pool).slice(0, 10);
    let currentIndex = 0;
    let score = 0;
    let answered = false;

    function speakSpelledWord(phrase) {
      const cleanPhrase = phrase.trim();
      const letters = cleanPhrase.split('').map(c => {
        if (/[a-zA-ZàâäéèêëïîôöùûüçÀÂÄÉÈÊËÏÎÔÖÙÛÜÇ]/.test(c)) {
          return c.toUpperCase();
        }
        return null;
      }).filter(c => c !== null);
      
      const spellText = letters.join(', ');
      const fullText = `${cleanPhrase}. ${spellText}.`;
      
      if (typeof window.speechSynthesis !== 'undefined') {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(fullText);
        u.lang = 'fr-FR';
        u.rate = 0.8;
        window.speechSynthesis.speak(u);
      }
    }

    function generateToothCavityHint(phrase) {
      return phrase.split(' ').map(word => {
        const cleanWord = word.replace(/['".,?!();]/g, '');
        const N = cleanWord.length;
        if (N === 0) return word;
        
        let maskedWord = "";
        if (N === 1) {
          maskedWord = "_";
        } else if (N === 2) {
          maskedWord = cleanWord[0] + " _";
        } else if (N === 3) {
          maskedWord = cleanWord[0] + " _ " + cleanWord[2];
        } else if (N === 4) {
          maskedWord = cleanWord[0] + " _ _ " + cleanWord[3];
        } else if (N === 5) {
          maskedWord = cleanWord[0] + " _ " + cleanWord[2] + " _ " + cleanWord[4];
        } else {
          let parts = [];
          for (let i = 0; i < N; i++) {
            if (i === 0 || i === N - 1) {
              parts.push(cleanWord[i]);
            } else if (i % 3 === 2) {
              parts.push("_");
            } else {
              parts.push(cleanWord[i]);
            }
          }
          maskedWord = parts.join(' ');
        }
        return maskedWord;
      }).join('   ');
    }

    function renderCurrentSpelling() {
      gameWrapper.innerHTML = '';
      answered = false;

      if (currentIndex >= quizzes.length) {
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
            <button class="next-btn" id="restart-spelling-btn" style="margin: 0 auto; display: block;">Restart Session</button>
          </div>
        `;
        gameWrapper.querySelector('#restart-spelling-btn').addEventListener('click', () => {
          runSpellingGame();
        });
        return;
      }

      const item = quizzes[currentIndex];
      const card = document.createElement('div');
      card.className = 'quiz-card';
      
      const badge = item.tags && item.tags.length > 0 ? item.tags[0] : 'orthographe';

      card.innerHTML = `
        <div class="quiz-meta" style="margin-bottom: 1.2rem;">
          <span>Question ${currentIndex + 1} of ${quizzes.length}</span>
          <span class="grammar-badge" style="background-color: var(--color-secondary);">${badge}</span>
        </div>
        
        <div class="spelling-box" style="margin-bottom: 1.5rem; background-color: rgba(10,25,49,0.02); padding: 1.2rem; border-radius: var(--radius-sm); border-left: 3px solid var(--color-accent);">
          <p style="font-size: 1.05rem; color: var(--color-primary); line-height: 1.45; font-family: var(--font-serif); white-space: pre-line;">${item.text}</p>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
          <label style="font-size: 0.8rem; font-weight: 600; display: block; margin-bottom: 0.5rem; color: var(--color-text-muted);">Écrivez le mot en français (Write the French word):</label>
          <input type="text" class="spelling-input" id="spelling-input-field" placeholder="Tapez ici..." autocomplete="off" style="width: 100%; padding: 0.7rem; border-radius: var(--radius-sm); border: 1px solid rgba(0,0,0,0.15); font-size: 1.1rem; outline: none;" autofocus>
        </div>

        <div class="spelling-hints-container" style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem;">
          <button class="action-btn" id="spelling-hint-voice-btn" style="flex: 1; padding: 0.5rem 0.8rem; font-size: 0.85rem; display: flex; align-items: center; justify-content: center; gap: 0.4rem; border-radius: var(--radius-sm); border: 1px solid var(--color-accent); background: rgba(197, 168, 128, 0.1); color: var(--color-primary); cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='rgba(197, 168, 128, 0.2)'" onmouseout="this.style.background='rgba(197, 168, 128, 0.1)'">🔊 音声ヒント</button>
          <button class="action-btn" id="spelling-hint-text-btn" style="flex: 1; padding: 0.5rem 0.8rem; font-size: 0.85rem; display: flex; align-items: center; justify-content: center; gap: 0.4rem; border-radius: var(--radius-sm); border: 1px solid var(--color-accent); background: rgba(197, 168, 128, 0.1); color: var(--color-primary); cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='rgba(197, 168, 128, 0.2)'" onmouseout="this.style.background='rgba(197, 168, 128, 0.1)'">📝 文字ヒント</button>
        </div>
        
        <div id="spelling-text-hint-display" style="display: none; margin-bottom: 1.5rem; background-color: rgba(197, 168, 128, 0.1); border: 1px dashed var(--color-accent); padding: 0.8rem; border-radius: var(--radius-sm); font-size: 1.2rem; font-family: monospace; letter-spacing: 2px; text-align: center; color: var(--color-primary);">
        </div>
        
        <div id="spelling-feedback-panel" style="display: none; margin-bottom: 1.5rem; padding: 1rem; border-radius: var(--radius-sm);">
          <strong id="spelling-feedback-title"></strong>
          <p id="spelling-feedback-msg" style="margin-top: 0.3rem; font-size: 0.95rem;"></p>
        </div>
        
        <div style="display: flex; gap: 1rem;">
          <button class="next-btn" id="spelling-submit-btn">Vérifier (Check)</button>
          <button class="next-btn" id="spelling-next-btn" style="display: none; margin-left: auto;">Continue →</button>
        </div>
      `;

      gameWrapper.appendChild(card);

      const inputField = card.querySelector('#spelling-input-field');
      const submitBtn = card.querySelector('#spelling-submit-btn');
      const nextBtn = card.querySelector('#spelling-next-btn');
      const feedbackPanel = card.querySelector('#spelling-feedback-panel');
      const feedbackTitle = card.querySelector('#spelling-feedback-title');
      const feedbackMsg = card.querySelector('#spelling-feedback-msg');

      const voiceHintBtn = card.querySelector('#spelling-hint-voice-btn');
      const textHintBtn = card.querySelector('#spelling-hint-text-btn');
      const textHintDisplay = card.querySelector('#spelling-text-hint-display');

      const correctText = (item.acceptedAnswers && item.acceptedAnswers.length > 0) ? item.acceptedAnswers[0] : "";

      voiceHintBtn.addEventListener('click', (e) => {
        e.preventDefault();
        speakSpelledWord(correctText);
      });

      textHintBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const hint = generateToothCavityHint(correctText);
        textHintDisplay.innerText = hint;
        textHintDisplay.style.display = 'block';
      });

      setTimeout(() => inputField.focus(), 150);

      inputField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          submitBtn.click();
        }
      });

      submitBtn.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const userText = inputField.value;
        const normUser = normalizeString(userText);
        
        const isCorrect = item.acceptedAnswers.some(ans => normalizeString(ans) === normUser);
        const correctText = item.acceptedAnswers[0];

        inputField.disabled = true;
        submitBtn.style.display = 'none';
        nextBtn.style.display = 'block';

        feedbackPanel.style.display = 'block';

        if (isCorrect) {
          score++;
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
        currentIndex++;
        renderCurrentSpelling();
      });
    }

    renderCurrentSpelling();
  }

  // Load default game mode
  startSelectedGame();
}
