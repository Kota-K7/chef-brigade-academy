import { state, ensureDataLoaded } from '../../app.js';
import { speakFrench } from '../utils/audio.js';

let activeArticle = null;
let currentMode = 'preview'; // 'preview', 'practice', or 'complete'
let currentSessionIdx = 0; // index of active session (0-based) for practice mode
let activeTooltip = null;

export function renderReading() {
  const container = document.createElement('div');
  container.className = 'reading-container-view';
  
  // Set default helper settings if they don't exist
  if (!state.settings) state.settings = {};
  if (!state.settings.readingHelper) {
    state.settings.readingHelper = {
      outlines: true,
      translations: true,
      targetOnly: false,
      pureText: false
    };
  }

  const title = document.createElement('h2');
  title.className = 'section-title';
  title.innerText = "Lecture de Cuisine (Culinary Reading)";
  container.appendChild(title);
  
  const subtitle = document.createElement('p');
  subtitle.className = 'section-subtitle';
  subtitle.innerText = "Immerse yourself in authentic French culinary articles. Decode grammar and vocabulary interactively as you read.";
  container.appendChild(subtitle);
  
  const loading = document.createElement('div');
  loading.className = 'loading-placeholder';
  loading.innerText = "Chargement des articles... (Loading articles...)";
  container.appendChild(loading);
  
  // Ensure all vocabulary databases are loaded for lookup
  ensureDataLoaded('knowledge', 'ALL').then(() => {
    fetch('data/articles.json')
      .then(res => {
        if (!res.ok) throw new Error("Could not load articles");
        return res.json();
      })
      .then(articles => {
        state.db.articles = articles; // Cache in state for knowledge graph lookup!
        loading.remove();
        if (activeArticle) {
          const currentArt = articles.find(a => a.id === activeArticle.id) || articles[0];
          renderArticleReader(container, currentArt);
        } else {
          renderArticlesList(container, articles);
        }
      })
      .catch(err => {
        loading.innerText = "Erreur de chargement. (Loading error.)";
        console.error(err);
      });
  });
  
  document.addEventListener('click', handleGlobalClick);
  
  return container;
}

function handleGlobalClick(e) {
  if (activeTooltip && !e.target.closest('.anatomy-tooltip') && !e.target.closest('.anatomy-token') && !e.target.closest('.learning-badge')) {
    activeTooltip.remove();
    activeTooltip = null;
  }
}

function renderArticlesList(container, articles) {
  activeArticle = null;
  currentMode = 'preview';
  currentSessionIdx = 0;
  
  const grid = document.createElement('div');
  grid.className = 'magazine-grid';
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(320px, 1fr))';
  grid.style.gap = '2rem';
  grid.style.marginTop = '2rem';
  
  articles.forEach(art => {
    const card = document.createElement('div');
    card.className = 'magazine-card';
    card.style.cursor = 'pointer';
    
    const coverHtml = art.image 
      ? `<img src="${art.image}" class="magazine-cover" style="width: 100%; height: 200px; object-fit: cover; border-radius: var(--radius-md) var(--radius-md) 0 0;" onerror="this.src='assets/cheese_wine.png'">`
      : `<div class="magazine-cover-placeholder" style="width: 100%; height: 200px; background-color: var(--color-primary); border-radius: var(--radius-md) var(--radius-md) 0 0; display: flex; align-items: center; justify-content: center; color: white; font-family: var(--font-serif); font-size: 1.5rem; font-weight: bold;">Cuisine</div>`;
      
    card.innerHTML = `
      ${coverHtml}
      <div style="padding: 1.5rem; display: flex; flex-direction: column; gap: 0.8rem;">
        <span class="card-category" style="margin: 0; width: fit-content;">${art.category}</span>
        <h3 class="magazine-card-title" style="font-family: var(--font-serif); font-size: 1.35rem; color: var(--color-primary);">${art.title_fr}</h3>
        <p style="font-size: 0.85rem; color: var(--color-text-muted); font-style: italic;">${art.title_ja}</p>
        <p style="font-size: 0.9rem; line-height: 1.5; color: var(--color-text-main);">${art.overview.context_ja}</p>
        <button class="next-btn" style="width: fit-content; padding: 0.4rem 1rem; font-size: 0.8rem; margin-top: 0.5rem;">Lire l'article (Read)</button>
      </div>
    `;
    
    card.addEventListener('click', () => {
      activeArticle = art;
      currentMode = 'preview';
      currentSessionIdx = 0;
      renderArticleReader(container, art);
    });
    
    grid.appendChild(card);
  });
  
  container.appendChild(grid);
}

function renderArticleReader(container, article) {
  container.innerHTML = '';
  
  if (currentMode === 'preview') {
    renderPreviewMode(container, article);
  } else if (currentMode === 'practice') {
    renderPracticeMode(container, article);
  } else if (currentMode === 'complete') {
    renderCompleteMode(container, article);
  }
}

// Function to apply helper modifiers based on current panel toggle settings
function applyReadingHelperStyles(bodyContainer) {
  const helper = state.settings.readingHelper;
  bodyContainer.classList.toggle('hide-outlines', !helper.outlines || helper.pureText);
  bodyContainer.classList.toggle('hide-translations', !helper.translations || helper.pureText);
  bodyContainer.classList.toggle('highlight-target-only', helper.targetOnly);
  bodyContainer.classList.toggle('pure-text-mode', helper.pureText);
}

function renderPreviewMode(container, article) {
  // Get target level to adapt UI scaffolding (simplified into débutant/intermédiaire/avancé)
  const rawLevel = state.settings?.targetLevel || 'ALL';
  let simplifiedLevel = 'débutant';
  if (['B1', 'B2', 'intermédiaire'].includes(rawLevel)) simplifiedLevel = 'intermédiaire';
  else if (['C1', 'C2', 'avancé'].includes(rawLevel)) simplifiedLevel = 'avancé';
  
  const isBeginner = simplifiedLevel === 'débutant';
  const isAdvanced = simplifiedLevel === 'intermédiaire';
  const isExpert = simplifiedLevel === 'avancé';

  // Back to Magazine button
  const backBtn = document.createElement('button');
  backBtn.className = 'next-btn';
  backBtn.style.backgroundColor = 'transparent';
  backBtn.style.border = '1px solid var(--color-primary)';
  backBtn.style.color = 'var(--color-primary)';
  backBtn.style.padding = '0.4rem 1rem';
  backBtn.style.marginBottom = '1.5rem';
  backBtn.innerText = "← Retour aux articles (Back)";
  backBtn.addEventListener('click', () => {
    renderArticlesList(container, [article]);
  });
  container.appendChild(backBtn);
  
  // Editorial Newspaper Header
  const header = document.createElement('div');
  header.className = 'magazine-header';
  header.style.textAlign = 'center';
  header.style.marginBottom = '2.5rem';
  header.innerHTML = `
    <div style="font-family: var(--font-serif); font-size: 0.85rem; letter-spacing: 2px; text-transform: uppercase; color: var(--color-text-muted); margin-bottom: 0.5rem; border-bottom: 2px double rgba(0,0,91,0.1); padding-bottom: 0.4rem; font-weight: bold;">
      L’Anatomie du Français, de la Cuisine et de la Culture
    </div>
    <span style="display: block; font-size: 0.8rem; font-weight: bold; letter-spacing: 1.5px; text-transform: uppercase; color: var(--color-accent); margin: 0.5rem auto 0.6rem auto; width: fit-content;">${article.category}</span>
    <h1 style="font-family: var(--font-serif); font-size: 2.2rem; font-weight: 700; color: var(--color-primary); line-height: 1.25; margin-bottom: 0.5rem;">${article.title_fr}</h1>
    <h2 style="font-size: 1.1rem; color: var(--color-text-muted); font-weight: 500; font-style: italic; margin-bottom: 1rem;">${article.title_ja}</h2>
    <div style="font-size: 0.78rem; font-style: italic; color: var(--color-text-muted); margin-bottom: 1.5rem;">
      Par Chef Brigade &nbsp;|&nbsp; Publié le 1 août 2026
    </div>
  `;
  container.appendChild(header);
  
  // Reading Helper Panel (Checkbox toggles)
  const helperPanel = document.createElement('div');
  helperPanel.className = 'reading-helper-panel';
  helperPanel.innerHTML = `
    <h4 style="font-family: var(--font-serif); font-size: 0.95rem; margin-bottom: 0.6rem; color: var(--color-primary); border-bottom: 1px solid rgba(0,0,91,0.1); padding-bottom: 0.3rem;">🛡️ Panneau d'Assistance (学習サポート)</h4>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem; font-size: 0.8rem; font-weight: 500;">
      <label style="display: flex; align-items: center; gap: 0.3rem; cursor: pointer;">
        <input type="checkbox" id="helper-toggle-outlines" ${state.settings.readingHelper.outlines ? 'checked' : ''}>
        <span>品詞色分け下線</span>
      </label>
      <label style="display: flex; align-items: center; gap: 0.3rem; cursor: pointer;">
        <input type="checkbox" id="helper-toggle-translations" ${state.settings.readingHelper.translations ? 'checked' : ''}>
        <span>日本語訳の表示</span>
      </label>
      <label style="display: flex; align-items: center; gap: 0.3rem; cursor: pointer;">
        <input type="checkbox" id="helper-toggle-target" ${state.settings.readingHelper.targetOnly ? 'checked' : ''}>
        <span>学習重要ワードのみ</span>
      </label>
      <label style="display: flex; align-items: center; gap: 0.3rem; cursor: pointer;">
        <input type="checkbox" id="helper-toggle-pure" ${state.settings.readingHelper.pureText ? 'checked' : ''}>
        <span>ピュア読解モード (全て非表示)</span>
      </label>
    </div>
  `;
  container.appendChild(helperPanel);
  
  // Extract Study Points dynamically from tokens
  const studyVocabs = new Map();
  const studyGrammars = new Map();
  article.sessions.forEach(s => {
    s.tokens.forEach(t => {
      if (t.vocab_id) {
        const item = state.db.knowledge.find(k => k.id === t.vocab_id);
        if (item) studyVocabs.set(t.vocab_id, item.french);
      }
      if (t.gram_id) {
        const item = state.db.knowledge.find(k => k.id === t.gram_id);
        if (item && item.grammar) studyGrammars.set(t.gram_id, item.grammar.topic);
      }
    });
  });
  
  // Study Points panel
  const pointsPanel = document.createElement('div');
  pointsPanel.className = 'card';
  pointsPanel.style.backgroundColor = '#f7f9fc';
  pointsPanel.style.border = '1px solid rgba(0,0,91,0.06)';
  pointsPanel.style.padding = '1.5rem';
  pointsPanel.style.borderRadius = '10px';
  pointsPanel.style.marginBottom = '2rem';
  
  let vocabBadges = '';
  studyVocabs.forEach((french, id) => {
    vocabBadges += `<button class="learning-badge" data-id="${id}" style="margin: 0.2rem; padding: 0.25rem 0.6rem; font-size: 0.78rem; border-radius: 4px; border: 1px solid rgba(0,0,91,0.1); background-color: #ffffff; color: var(--color-primary); font-weight: 600; cursor: pointer; transition: all 0.2s;">${french}</button>`;
  });
  
  let grammarBadges = '';
  studyGrammars.forEach((topic, id) => {
    grammarBadges += `<button class="learning-badge" data-id="${id}" style="margin: 0.2rem; padding: 0.25rem 0.6rem; font-size: 0.78rem; border-radius: 4px; border: 1px solid rgba(107,156,104,0.15); background-color: #ffffff; color: var(--color-success); font-weight: 600; cursor: pointer; transition: all 0.2s;">${topic}</button>`;
  });
  
  pointsPanel.innerHTML = `
    <h3 style="font-family: var(--font-serif); font-size: 1.15rem; color: var(--color-primary); margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.5rem;">📖 Points Clés d'Apprentissage (主要学習要点)</h3>
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div>
        <p style="font-size: 0.85rem; font-weight: bold; color: var(--color-text-muted); margin-bottom: 0.3rem;">🍳 Vocabulaire clé (重要単語):</p>
        <div style="display: flex; flex-wrap: wrap;">${vocabBadges || '<span style="font-size:0.8rem; color:#888;">Aucun vocabulaire</span>'}</div>
      </div>
      <div>
        <p style="font-size: 0.85rem; font-weight: bold; color: var(--color-text-muted); margin-bottom: 0.3rem;">📕 Points de grammaire (文法ポイント):</p>
        <div style="display: flex; flex-wrap: wrap;">${grammarBadges || '<span style="font-size:0.8rem; color:#888;">Aucune grammaire</span>'}</div>
      </div>
    </div>
  `;
  
  pointsPanel.querySelectorAll('.learning-badge').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      const mockToken = id.startsWith('gram_') ? { gram_id: id } : { vocab_id: id };
      showAnatomyTooltip(btn, mockToken, "");
    });
  });
  
  container.appendChild(pointsPanel);
  
  // Call to Action (Practice Mode)
  const ctaContainer = document.createElement('div');
  ctaContainer.style.textAlign = 'center';
  ctaContainer.style.marginTop = '3.5rem';
  ctaContainer.style.marginBottom = '3.5rem';
  
  const flexWrapper = document.createElement('div');
  flexWrapper.style.display = 'inline-flex';
  flexWrapper.style.alignItems = 'center';
  flexWrapper.style.justifyContent = 'center';
  flexWrapper.style.gap = '1.2rem';
  flexWrapper.style.flexWrap = 'wrap';
  
  const practiceBtn = document.createElement('button');
  practiceBtn.className = 'start-practice-btn';
  practiceBtn.innerText = "🎓 Commencer l'entraînement (問題を解くモードに入る)";
  practiceBtn.addEventListener('click', () => {
    currentMode = 'practice';
    currentSessionIdx = 0;
    renderArticleReader(container, article);
  });
  
  // Quick Level Select Container
  const levelSelectContainer = document.createElement('div');
  levelSelectContainer.style.display = 'inline-flex';
  levelSelectContainer.style.alignItems = 'center';
  levelSelectContainer.style.gap = '0.5rem';
  
  const levelSelectLabel = document.createElement('span');
  levelSelectLabel.style.fontSize = '0.8rem';
  levelSelectLabel.style.fontWeight = 'bold';
  levelSelectLabel.style.color = 'var(--color-text-muted)';
  levelSelectLabel.innerText = "Niveau (Level) :";
  
  const levelSelect = document.createElement('select');
  levelSelect.style.padding = '0.6rem 1.2rem';
  levelSelect.style.fontSize = '0.9rem';
  levelSelect.style.borderRadius = '50px';
  levelSelect.style.border = '1px solid rgba(0,0,0,0.15)';
  levelSelect.style.backgroundColor = '#FFFFFF';
  levelSelect.style.cursor = 'pointer';
  levelSelect.style.fontFamily = 'var(--font-sans)';
  levelSelect.style.fontWeight = '600';
  levelSelect.style.color = 'var(--color-primary)';
  levelSelect.style.outline = 'none';
  
  const levelsOptions = [
    { val: 'débutant', label: 'Débutant (初級)' },
    { val: 'intermédiaire', label: 'Intermédiaire (中級)' },
    { val: 'avancé', label: 'Avancé (上級)' }
  ];
  
  levelsOptions.forEach(l => {
    const opt = document.createElement('option');
    opt.value = l.val;
    opt.text = l.label;
    if (l.val === simplifiedLevel) opt.selected = true;
    levelSelect.appendChild(opt);
  });
  
  levelSelect.addEventListener('change', (e) => {
    state.settings.targetLevel = e.target.value;
    renderArticleReader(container, article);
  });
  
  levelSelectContainer.appendChild(levelSelectLabel);
  levelSelectContainer.appendChild(levelSelect);
  
  flexWrapper.appendChild(practiceBtn);
  flexWrapper.appendChild(levelSelectContainer);
  ctaContainer.appendChild(flexWrapper);
  container.appendChild(ctaContainer);
  
  // Editorial Full Article Reader (Read-only + Anatomy + Level-adapted translation)
  const bodyContainer = document.createElement('div');
  bodyContainer.className = 'magazine-body-container';
  bodyContainer.style.maxWidth = '720px';
  bodyContainer.style.margin = '0 auto';
  bodyContainer.style.display = 'flex';
  bodyContainer.style.flexDirection = 'column';
  bodyContainer.style.gap = '2.2rem';
  
  article.sessions.forEach((session, index) => {
    const sCard = document.createElement('div');
    sCard.className = 'ref-session-card';
    sCard.style.borderLeft = '4px solid var(--color-accent)';
    sCard.style.padding = '1.8rem';
    sCard.style.backgroundColor = '#ffffff';
    
    const titleSpan = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
        <span style="font-size: 0.72rem; text-transform: uppercase; font-weight: bold; letter-spacing: 1px; color: var(--color-text-muted);">Section ${index + 1}: ${session.title}</span>
        <button class="section-audio-btn" data-text="${session.text_fr.replace(/"/g, '&quot;')}" style="background: none; border: none; font-size: 1.15rem; cursor: pointer; color: var(--color-accent); padding: 0.2rem; line-height: 1;" title="Lire la section">🔊</button>
      </div>
    `;
    
    const paraFr = document.createElement('div');
    paraFr.className = 'ref-para-fr';
    paraFr.style.fontSize = '1.18rem';
    paraFr.style.lineHeight = '1.8';
    paraFr.style.fontFamily = 'var(--font-serif)';
    paraFr.style.marginBottom = '1rem';
    paraFr.style.color = 'var(--color-primary)';
    
    // Add Dropcap for first section first letter for premium newspaper aesthetic
    if (index === 0) {
      paraFr.classList.add('editorial-dropcap');
    }
    
    // Add POS interactive tokens
    session.tokens.forEach((tok, tokIdx) => {
      const span = document.createElement('span');
      span.className = `anatomy-token token-pos-${tok.pos} has-definition`;
      span.innerText = tok.word + ' ';
      
      const substringFr = session.tokens.slice(tokIdx).map(t => t.word).join(' ');
      
      if (tok.vocab_id || tok.gram_id) {
        span.setAttribute('data-has-db', 'true');
        if (isBeginner) {
          // Thick category-specific colors
          if (tok.pos === 'noun') span.style.borderBottom = '2px solid rgba(0, 0, 91, 0.25)';
          else if (tok.pos === 'verb') span.style.borderBottom = '2px solid rgba(107, 156, 104, 0.35)';
          else if (tok.pos === 'article_partitive') span.style.borderBottom = '2px dashed rgba(220, 38, 38, 0.35)';
          else if (tok.pos === 'preposition') span.style.borderBottom = '2px dotted rgba(197, 168, 128, 0.5)';
        } else if (isAdvanced) {
          // Subtle, thin gray lines
          span.style.borderBottom = '1px solid rgba(0, 0, 0, 0.12)';
        } else if (isExpert) {
          // Clean text style, no underlines
          span.style.borderBottom = 'none';
        }
      }
      
      span.addEventListener('click', (e) => {
        e.stopPropagation();
        showAnatomyTooltip(span, tok, substringFr);
      });
      paraFr.appendChild(span);
    });
    
    const transBlock = document.createElement('div');
    transBlock.className = 'ref-para-ja';
    transBlock.style.fontSize = '0.94rem';
    transBlock.style.lineHeight = '1.6';
    transBlock.style.color = 'var(--color-text-muted)';
    transBlock.style.paddingTop = '0.8rem';
    transBlock.style.borderTop = '1px dashed #eaeaea';
    transBlock.innerHTML = session.text_ja.split('\n').join('<br>');
    
    sCard.appendChild(document.createRange().createContextualFragment(titleSpan));
    sCard.appendChild(paraFr);
    
    // Level-adaptive translation display
    if (isBeginner) {
      sCard.appendChild(transBlock);
    } else {
      const toggleLink = document.createElement('a');
      toggleLink.href = '#';
      toggleLink.className = 'toggle-translation-link';
      toggleLink.style.fontSize = '0.78rem';
      toggleLink.style.color = 'var(--color-accent)';
      toggleLink.style.textDecoration = 'underline';
      toggleLink.style.display = 'block';
      toggleLink.style.marginTop = '0.5rem';
      toggleLink.innerText = "Afficher la traduction (日本語訳を表示)";
      
      transBlock.style.display = 'none';
      
      toggleLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (transBlock.style.display === 'none') {
          transBlock.style.display = 'block';
          toggleLink.innerText = "Masquer la traduction (翻訳を非表示)";
        } else {
          transBlock.style.display = 'none';
          toggleLink.innerText = "Afficher la traduction (日本語訳を表示)";
        }
      });
      
      sCard.appendChild(toggleLink);
      sCard.appendChild(transBlock);
    }
    
    bodyContainer.appendChild(sCard);
  });
  
  // Bind manual paragraph reading buttons
  bodyContainer.querySelectorAll('.section-audio-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      speakFrench(btn.getAttribute('data-text'));
    });
  });
  
  // Bind Helper Panel toggle changes to modify classes dynamically
  const bindHelperPanel = () => {
    helperPanel.querySelector('#helper-toggle-outlines').addEventListener('change', (e) => {
      state.settings.readingHelper.outlines = e.target.checked;
      if (e.target.checked) {
        state.settings.readingHelper.pureText = false;
        helperPanel.querySelector('#helper-toggle-pure').checked = false;
      }
      applyReadingHelperStyles(bodyContainer);
    });
    helperPanel.querySelector('#helper-toggle-translations').addEventListener('change', (e) => {
      state.settings.readingHelper.translations = e.target.checked;
      if (e.target.checked) {
        state.settings.readingHelper.pureText = false;
        helperPanel.querySelector('#helper-toggle-pure').checked = false;
      }
      applyReadingHelperStyles(bodyContainer);
    });
    helperPanel.querySelector('#helper-toggle-target').addEventListener('change', (e) => {
      state.settings.readingHelper.targetOnly = e.target.checked;
      applyReadingHelperStyles(bodyContainer);
    });
    helperPanel.querySelector('#helper-toggle-pure').addEventListener('change', (e) => {
      state.settings.readingHelper.pureText = e.target.checked;
      if (e.target.checked) {
        state.settings.readingHelper.outlines = false;
        state.settings.readingHelper.translations = false;
        helperPanel.querySelector('#helper-toggle-outlines').checked = false;
        helperPanel.querySelector('#helper-toggle-translations').checked = false;
      }
      applyReadingHelperStyles(bodyContainer);
    });
  };
  bindHelperPanel();
  applyReadingHelperStyles(bodyContainer);
  
  container.appendChild(bodyContainer);
}

function renderPracticeMode(container, article) {
  const rawLevel = state.settings?.targetLevel || 'ALL';
  let simplifiedLevel = 'débutant';
  if (['B1', 'B2', 'intermédiaire'].includes(rawLevel)) simplifiedLevel = 'intermédiaire';
  else if (['C1', 'C2', 'avancé'].includes(rawLevel)) simplifiedLevel = 'avancé';
  
  const isBeginner = simplifiedLevel === 'débutant';
  const isAdvanced = simplifiedLevel === 'intermédiaire';
  const isExpert = simplifiedLevel === 'avancé';

  // Exit practice button
  const exitBtn = document.createElement('button');
  exitBtn.className = 'next-btn';
  exitBtn.style.backgroundColor = 'transparent';
  exitBtn.style.border = '1px solid var(--color-secondary)';
  exitBtn.style.color = 'var(--color-secondary)';
  exitBtn.style.padding = '0.4rem 1rem';
  exitBtn.style.marginBottom = '1.5rem';
  exitBtn.innerText = "← Quitter l'entraînement (戻る)";
  exitBtn.addEventListener('click', () => {
    currentMode = 'preview';
    renderArticleReader(container, article);
  });
  container.appendChild(exitBtn);
  
  // Editorial Header
  const header = document.createElement('div');
  header.className = 'magazine-header';
  header.style.textAlign = 'center';
  header.style.marginBottom = '2.5rem';
  header.innerHTML = `
    <span style="display: block; font-size: 0.8rem; font-weight: bold; letter-spacing: 1.5px; text-transform: uppercase; color: var(--color-secondary); margin: 0 auto 0.6rem auto; width: fit-content;">Mode Entraînement</span>
    <h1 style="font-family: var(--font-serif); font-size: 2.2rem; font-weight: 700; color: var(--color-primary); line-height: 1.25; margin-bottom: 0.5rem;">${article.title_fr}</h1>
    <p style="font-size: 0.95rem; color: var(--color-text-muted);">文章を読み、問題を解きながら、記事を完成させましょう。</p>
  `;
  container.appendChild(header);
  
  // Reading Helper Panel (Optional checkbox toggles during practice)
  const helperPanel = document.createElement('div');
  helperPanel.className = 'reading-helper-panel';
  helperPanel.innerHTML = `
    <h4 style="font-family: var(--font-serif); font-size: 0.95rem; margin-bottom: 0.6rem; color: var(--color-primary); border-bottom: 1px solid rgba(0,0,91,0.1); padding-bottom: 0.3rem;">🛡️ Panneau d'Assistance (学習サポート)</h4>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem; font-size: 0.8rem; font-weight: 500;">
      <label style="display: flex; align-items: center; gap: 0.3rem; cursor: pointer;">
        <input type="checkbox" id="helper-toggle-outlines" ${state.settings.readingHelper.outlines ? 'checked' : ''}>
        <span>品詞色分け下線</span>
      </label>
      <label style="display: flex; align-items: center; gap: 0.3rem; cursor: pointer;">
        <input type="checkbox" id="helper-toggle-translations" ${state.settings.readingHelper.translations ? 'checked' : ''}>
        <span>日本語訳の表示</span>
      </label>
      <label style="display: flex; align-items: center; gap: 0.3rem; cursor: pointer;">
        <input type="checkbox" id="helper-toggle-target" ${state.settings.readingHelper.targetOnly ? 'checked' : ''}>
        <span>学習重要ワードのみ</span>
      </label>
      <label style="display: flex; align-items: center; gap: 0.3rem; cursor: pointer;">
        <input type="checkbox" id="helper-toggle-pure" ${state.settings.readingHelper.pureText ? 'checked' : ''}>
        <span>ピュア読解モード (全て非表示)</span>
      </label>
    </div>
  `;
  container.appendChild(helperPanel);
  
  // Article Body
  const bodyContainer = document.createElement('div');
  bodyContainer.className = 'magazine-body-container';
  bodyContainer.style.maxWidth = '720px';
  bodyContainer.style.margin = '0 auto';
  bodyContainer.style.display = 'flex';
  bodyContainer.style.flexDirection = 'column';
  bodyContainer.style.gap = '2rem';
  
  article.sessions.forEach((session, index) => {
    const sessionCard = document.createElement('div');
    sessionCard.id = `session-card-${index}`;
    
    let stateClass = 'ref-locked-session';
    if (index === currentSessionIdx) {
      stateClass = 'ref-active-session';
    } else if (index < currentSessionIdx) {
      stateClass = 'ref-completed-session';
    }
    
    sessionCard.className = `ref-session-card ${stateClass}`;
    
    const sHeader = document.createElement('div');
    sHeader.style.display = 'flex';
    sHeader.style.justifyContent = 'space-between';
    sHeader.style.alignItems = 'center';
    sHeader.style.marginBottom = '0.8rem';
    sHeader.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.6rem;">
        <span style="font-size: 0.75rem; text-transform: uppercase; font-weight: bold; letter-spacing: 1px; color: var(--color-text-muted);">Section ${index + 1}: ${session.title}</span>
        ${index <= currentSessionIdx ? `<button class="section-audio-btn" data-text="${session.text_fr.replace(/"/g, '&quot;')}" style="background: none; border: none; font-size: 1rem; cursor: pointer; color: var(--color-accent); padding: 0.1rem; line-height: 1;" title="Lire la section">🔊</button>` : ''}
      </div>
      ${index < currentSessionIdx ? '<span style="color: var(--color-success); font-size: 0.8rem; font-weight: 700;">✓ Complétée</span>' : ''}
    `;
    sessionCard.appendChild(sHeader);
    
    const textBlock = document.createElement('div');
    textBlock.className = 'ref-text-block';
    
    if (index < currentSessionIdx) {
      // Completed session
      textBlock.innerHTML = `
        <div class="ref-para-fr" style="font-size: 1.15rem; line-height: 1.8; color: var(--color-text-main); font-family: var(--font-serif); margin-bottom: 0.8rem;">
          ${session.text_fr.split('\n').join('<br>')}
        </div>
        <div class="ref-para-ja" style="font-size: 0.95rem; line-height: 1.6; color: var(--color-text-muted); padding-top: 0.6rem; border-top: 1px solid #eaeaea;">
          ${session.text_ja.split('\n').join('<br>')}
        </div>
      `;
    } else if (index === currentSessionIdx) {
      // Active session
      const paraFr = document.createElement('div');
      paraFr.className = 'ref-para-fr';
      paraFr.style.fontSize = '1.15rem';
      paraFr.style.lineHeight = '1.8';
      paraFr.style.fontFamily = 'var(--font-serif)';
      paraFr.style.marginBottom = '1.5rem';
      
      if (index === 0) {
        paraFr.classList.add('editorial-dropcap');
      }
      
      session.tokens.forEach((tok, tokIdx) => {
        const span = document.createElement('span');
        span.className = `anatomy-token token-pos-${tok.pos} has-definition`;
        span.innerText = tok.word + ' ';
        
        const substringFr = session.tokens.slice(tokIdx).map(t => t.word).join(' ');
        
        if (tok.vocab_id || tok.gram_id) {
          span.setAttribute('data-has-db', 'true');
          if (isBeginner) {
            if (tok.pos === 'noun') span.style.borderBottom = '2px solid var(--color-primary)';
            else if (tok.pos === 'verb') span.style.borderBottom = '2px solid var(--color-success)';
            else if (tok.pos === 'article_partitive') span.style.borderBottom = '2px dashed var(--color-secondary)';
            else if (tok.pos === 'preposition') span.style.borderBottom = '2px dotted var(--color-accent)';
          } else if (isAdvanced) {
            span.style.borderBottom = '1px solid rgba(0,0,0,0.12)';
          } else if (isExpert) {
            span.style.borderBottom = 'none';
          }
        }
        
        span.addEventListener('click', (e) => {
          e.stopPropagation();
          showAnatomyTooltip(span, tok, substringFr);
        });
        paraFr.appendChild(span);
      });
      
      textBlock.appendChild(paraFr);
      
      // Inline Quiz Component supporting 8 diverse interactive formats
      const quizContainer = document.createElement('div');
      quizContainer.className = 'ref-quiz-container';
      quizContainer.style.marginTop = '1.5rem';
      quizContainer.style.padding = '1.2rem';
      quizContainer.style.backgroundColor = '#fdfcf7';
      quizContainer.style.border = '1px solid var(--color-accent)';
      quizContainer.style.borderRadius = '8px';
      
      const quizObj = session.quizzes.find(q => q.target_level === simplifiedLevel) || session.quizzes[0];
      if (quizObj) {
        let interactionHtml = '';
        
        if (quizObj.type === 'choice' || quizObj.type === 'structure_analysis') {
          const renderFrOpts = isExpert && quizObj.options_fr;
          const currentOptions = renderFrOpts ? quizObj.options_fr : quizObj.options;
          const currentAnswer = renderFrOpts ? quizObj.answer_fr : quizObj.answer;
          
          interactionHtml = `
            <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.8rem;">
              ${currentOptions.map(opt => `
                <label style="display: flex; align-items: center; gap: 0.6rem; font-size: 0.9rem; cursor: pointer;">
                  <input type="radio" name="quiz-${quizObj.id}" value="${opt}">
                  <span>${opt}</span>
                </label>
              `).join('')}
            </div>
          `;
          
          quizContainer.innerHTML = `
            <h4 style="font-size: 0.95rem; color: var(--color-secondary); margin-bottom: 0.5rem;">❓ Question de lecture (Comprehension Check)</h4>
            <p style="font-size: 0.95rem; font-weight: 500;">${quizObj.question_fr}</p>
            ${isExpert ? '' : `<p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 0.5rem;">${quizObj.question_ja}</p>`}
            ${interactionHtml}
            <div style="display: flex; gap: 1rem; margin-top: 1rem; align-items: center;">
              <button class="next-btn quiz-submit-btn" style="padding: 0.4rem 1.2rem; font-size: 0.8rem;">Vérifier (Check)</button>
              <span class="quiz-feedback-msg" style="font-size: 0.85rem; font-weight: 600;"></span>
            </div>
          `;
          
          const submitBtn = quizContainer.querySelector('.quiz-submit-btn');
          const feedback = quizContainer.querySelector('.quiz-feedback-msg');
          submitBtn.addEventListener('click', () => {
            const selected = quizContainer.querySelector(`input[name="quiz-${quizObj.id}"]:checked`);
            if (selected && selected.value === currentAnswer) {
              feedback.style.color = 'var(--color-success)';
              feedback.innerText = "✓ Correct ! Excellent !";
              submitBtn.style.display = 'none';
              setTimeout(() => {
                evolveSession(container, article, index);
              }, 1000);
            } else {
              feedback.style.color = 'var(--color-error)';
              feedback.innerText = "❌ Incorrect. Réessayez !";
            }
          });
          
        } else if (quizObj.type === 'preposition') {
          // Preposition select option
          interactionHtml = `
            <div style="margin-top: 0.8rem;">
              <select id="preposition-select-${quizObj.id}" style="padding: 0.5rem 1rem; font-size: 0.9rem; border-radius: 4px; border: 1px solid rgba(0,0,91,0.15); background-color: white; outline: none; width: 100%; max-width: 250px; font-weight: 600;">
                <option value="">-- Choisissez (選択してください) --</option>
                ${quizObj.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
              </select>
            </div>
          `;
          
          quizContainer.innerHTML = `
            <h4 style="font-size: 0.95rem; color: var(--color-secondary); margin-bottom: 0.5rem;">❓ Choix de préposition (前置詞選択)</h4>
            <p style="font-size: 0.95rem; font-weight: 500;">${quizObj.question_fr}</p>
            ${isExpert ? '' : `<p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 0.5rem;">${quizObj.question_ja}</p>`}
            ${interactionHtml}
            <div style="display: flex; gap: 1rem; margin-top: 1rem; align-items: center;">
              <button class="next-btn quiz-submit-btn" style="padding: 0.4rem 1.2rem; font-size: 0.8rem;">Vérifier (Check)</button>
              <span class="quiz-feedback-msg" style="font-size: 0.85rem; font-weight: 600;"></span>
            </div>
          `;
          
          const submitBtn = quizContainer.querySelector('.quiz-submit-btn');
          const feedback = quizContainer.querySelector('.quiz-feedback-msg');
          submitBtn.addEventListener('click', () => {
            const selectVal = quizContainer.querySelector(`#preposition-select-${quizObj.id}`).value;
            if (selectVal === quizObj.answer) {
              feedback.style.color = 'var(--color-success)';
              feedback.innerText = "✓ Correct ! Très bien !";
              submitBtn.style.display = 'none';
              setTimeout(() => {
                evolveSession(container, article, index);
              }, 1000);
            } else {
              feedback.style.color = 'var(--color-error)';
              feedback.innerText = "❌ Incorrect. Réessayez !";
            }
          });
          
        } else if (quizObj.type === 'word_order') {
          // Shuffled word order chips
          quizContainer.innerHTML = `
            <h4 style="font-size: 0.95rem; color: var(--color-secondary); margin-bottom: 0.5rem;">❓ Reconstitution de phrase (並び替え)</h4>
            <p style="font-size: 0.95rem; font-weight: 500;">${quizObj.question_fr}</p>
            ${isExpert ? '' : `<p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 0.5rem;">${quizObj.question_ja}</p>`}
            
            <div class="word-order-quiz-wrapper" style="margin-top: 1rem;">
              <div class="selected-chips-area" style="min-height: 44px; border: 1px dashed rgba(0,0,91,0.15); border-radius: 6px; padding: 0.5rem; display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; background-color: #fafbfc;"></div>
              <div class="shuffled-chips-area" style="display: flex; flex-wrap: wrap; gap: 0.5rem;"></div>
            </div>
            
            <div style="display: flex; gap: 1rem; margin-top: 1.2rem; align-items: center;">
              <button class="next-btn quiz-submit-btn" style="padding: 0.4rem 1.2rem; font-size: 0.8rem;">Vérifier (Check)</button>
              <span class="quiz-feedback-msg" style="font-size: 0.85rem; font-weight: 600;"></span>
            </div>
          `;
          
          const selectedArea = quizContainer.querySelector('.selected-chips-area');
          const shuffledArea = quizContainer.querySelector('.shuffled-chips-area');
          const submitBtn = quizContainer.querySelector('.quiz-submit-btn');
          const feedback = quizContainer.querySelector('.quiz-feedback-msg');
          
          let selectedWords = [];
          // Copy options and shuffle them
          let shuffledWords = [...quizObj.options].sort(() => Math.random() - 0.5);
          
          const drawChips = () => {
            selectedArea.innerHTML = '';
            shuffledArea.innerHTML = '';
            
            if (selectedWords.length === 0) {
              selectedArea.innerHTML = '<span style="font-size: 0.8rem; color: #888; font-style: italic; align-self: center;">Cliquez sur les mots ci-dessous...</span>';
            }
            
            selectedWords.forEach((word, wIdx) => {
              const chip = document.createElement('span');
              chip.className = 'word-chip selected';
              chip.innerText = word;
              chip.addEventListener('click', () => {
                selectedWords.splice(wIdx, 1);
                shuffledWords.push(word);
                drawChips();
              });
              selectedArea.appendChild(chip);
            });
            
            shuffledWords.forEach((word, wIdx) => {
              const chip = document.createElement('span');
              chip.className = 'word-chip';
              chip.innerText = word;
              chip.addEventListener('click', () => {
                shuffledWords.splice(wIdx, 1);
                selectedWords.push(word);
                drawChips();
              });
              shuffledArea.appendChild(chip);
            });
          };
          
          drawChips();
          
          submitBtn.addEventListener('click', () => {
            const userStr = selectedWords.join(' ');
            const targetStr = quizObj.answer_words.join(' ');
            if (userStr === targetStr) {
              feedback.style.color = 'var(--color-success)';
              feedback.innerText = "✓ Correct ! Formidable !";
              submitBtn.style.display = 'none';
              selectedArea.style.pointerEvents = 'none';
              shuffledArea.style.pointerEvents = 'none';
              setTimeout(() => {
                evolveSession(container, article, index);
              }, 1000);
            } else {
              feedback.style.color = 'var(--color-error)';
              feedback.innerText = "❌ Ordre incorrect. Réessayez !";
            }
          });
          
        } else if (quizObj.type === 'kitchen_situation') {
          // Chef-brigade kitchen dialog box
          interactionHtml = `
            <div style="background-color: #f0f4f8; border-left: 4px solid var(--color-primary); padding: 0.8rem 1.2rem; border-radius: 6px; font-size: 0.88rem; margin-top: 0.8rem; font-family: var(--font-sans); line-height: 1.5; color: var(--color-primary); box-shadow: var(--shadow-sm);">
              <strong>👨‍🍳 Chef (シェフの指示):</strong> <span style="font-style: italic;">"${quizObj.question_fr}"</span>
            </div>
            <div style="margin-top: 1rem;">
              <input type="text" id="quiz-input-${quizObj.id}" placeholder="Répondez au chef (シェフに回答する)..." style="padding: 0.5rem 1rem; font-size: 0.9rem; border-radius: 4px; border: 1px solid rgba(0,0,91,0.15); width: 100%; max-width: 320px; outline: none; font-weight: bold;">
            </div>
          `;
          
          quizContainer.innerHTML = `
            <h4 style="font-size: 0.95rem; color: var(--color-secondary); margin-bottom: 0.5rem;">❓ Dialogue en cuisine (厨房シチュエーション)</h4>
            ${isExpert ? '' : `<p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 0.5rem;">${quizObj.question_ja}</p>`}
            ${interactionHtml}
            <div style="display: flex; gap: 1rem; margin-top: 1rem; align-items: center;">
              <button class="next-btn quiz-submit-btn" style="padding: 0.4rem 1.2rem; font-size: 0.8rem;">Vérifier (Check)</button>
              <span class="quiz-feedback-msg" style="font-size: 0.85rem; font-weight: 600;"></span>
            </div>
          `;
          
          const submitBtn = quizContainer.querySelector('.quiz-submit-btn');
          const feedback = quizContainer.querySelector('.quiz-feedback-msg');
          
          submitBtn.addEventListener('click', () => {
            const inputVal = quizContainer.querySelector(`#quiz-input-${quizObj.id}`).value.trim().toLowerCase();
            if (inputVal === quizObj.blank_word.toLowerCase()) {
              feedback.style.color = 'var(--color-success)';
              feedback.innerText = "✓ Oui, Chef ! Correct !";
              submitBtn.style.display = 'none';
              setTimeout(() => {
                evolveSession(container, article, index);
              }, 1000);
            } else {
              feedback.style.color = 'var(--color-error)';
              feedback.innerText = "❌ Ce n'est pas tout à fait ça. Réessayez !";
            }
          });
          
        } else if (quizObj.type === 'input' || quizObj.type === 'conjugation') {
          // Fill-in-the-blank text inputs
          interactionHtml = `
            <div style="margin-top: 0.8rem;">
              <input type="text" id="quiz-input-${quizObj.id}" placeholder="Entrez le mot..." style="padding: 0.4rem 0.8rem; font-size: 0.9rem; border-radius: 4px; border: 1px solid rgba(0,0,0,0.15); width: 100%; max-width: 300px;">
            </div>
          `;
          
          quizContainer.innerHTML = `
            <h4 style="font-size: 0.95rem; color: var(--color-secondary); margin-bottom: 0.5rem;">❓ Question de conjugaison / orthographe (記述クイズ)</h4>
            <p style="font-size: 0.95rem; font-weight: 500;">${quizObj.question_fr}</p>
            ${isExpert ? '' : `<p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 0.5rem;">${quizObj.question_ja}</p>`}
            ${interactionHtml}
            <div style="display: flex; gap: 1rem; margin-top: 1rem; align-items: center;">
              <button class="next-btn quiz-submit-btn" style="padding: 0.4rem 1.2rem; font-size: 0.8rem;">Vérifier (Check)</button>
              <span class="quiz-feedback-msg" style="font-size: 0.85rem; font-weight: 600;"></span>
            </div>
          `;
          
          const submitBtn = quizContainer.querySelector('.quiz-submit-btn');
          const feedback = quizContainer.querySelector('.quiz-feedback-msg');
          let fails = 0;
          
          submitBtn.addEventListener('click', () => {
            const inputVal = quizContainer.querySelector(`#quiz-input-${quizObj.id}`).value.trim().toLowerCase();
            if (inputVal === quizObj.blank_word.toLowerCase()) {
              feedback.style.color = 'var(--color-success)';
              feedback.innerText = "✓ Correct ! Excellent !";
              submitBtn.style.display = 'none';
              setTimeout(() => {
                evolveSession(container, article, index);
              }, 1000);
            } else {
              fails++;
              feedback.style.color = 'var(--color-error)';
              
              if (isBeginner && fails >= 2) {
                const firstLetter = quizObj.blank_word[0].toUpperCase();
                feedback.innerText = `❌ Incorrect. Indice : commence par "${firstLetter}"`;
              } else {
                feedback.innerText = "❌ Incorrect. Réessayez !";
              }
            }
          });
        }
      } else {
        quizContainer.innerHTML = `
          <button class="next-btn validate-session-btn" style="padding: 0.5rem 1.5rem; font-size: 0.85rem; width: 100%;">
            Valider et continuer (Complete & Continue)
          </button>
        `;
        quizContainer.querySelector('.validate-session-btn').addEventListener('click', () => {
          evolveSession(container, article, index);
        });
      }
      
      textBlock.appendChild(quizContainer);
    } else {
      // Locked session
      textBlock.innerHTML = `
        <div class="ref-para-fr blurred-text" style="font-size: 1.15rem; line-height: 1.8; color: #a0a0a0; font-family: var(--font-serif); filter: blur(4px); user-select: none;">
          ${session.text_fr.split('\n').join('<br>')}
        </div>
      `;
    }
    
    sessionCard.appendChild(textBlock);
    bodyContainer.appendChild(sessionCard);
  });
  
  // Bind manual paragraph reading buttons
  bodyContainer.querySelectorAll('.section-audio-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      speakFrench(btn.getAttribute('data-text'));
    });
  });
  
  // Bind Helper Panel toggle changes
  const bindHelperPanel = () => {
    helperPanel.querySelector('#helper-toggle-outlines').addEventListener('change', (e) => {
      state.settings.readingHelper.outlines = e.target.checked;
      if (e.target.checked) {
        state.settings.readingHelper.pureText = false;
        helperPanel.querySelector('#helper-toggle-pure').checked = false;
      }
      applyReadingHelperStyles(bodyContainer);
    });
    helperPanel.querySelector('#helper-toggle-translations').addEventListener('change', (e) => {
      state.settings.readingHelper.translations = e.target.checked;
      if (e.target.checked) {
        state.settings.readingHelper.pureText = false;
        helperPanel.querySelector('#helper-toggle-pure').checked = false;
      }
      applyReadingHelperStyles(bodyContainer);
    });
    helperPanel.querySelector('#helper-toggle-target').addEventListener('change', (e) => {
      state.settings.readingHelper.targetOnly = e.target.checked;
      applyReadingHelperStyles(bodyContainer);
    });
    helperPanel.querySelector('#helper-toggle-pure').addEventListener('change', (e) => {
      state.settings.readingHelper.pureText = e.target.checked;
      if (e.target.checked) {
        state.settings.readingHelper.outlines = false;
        state.settings.readingHelper.translations = false;
        helperPanel.querySelector('#helper-toggle-outlines').checked = false;
        helperPanel.querySelector('#helper-toggle-translations').checked = false;
      }
      applyReadingHelperStyles(bodyContainer);
    });
  };
  bindHelperPanel();
  applyReadingHelperStyles(bodyContainer);
  
  container.appendChild(bodyContainer);
}

function evolveSession(container, article, index) {
  currentSessionIdx = index + 1;
  
  if (currentSessionIdx >= article.sessions.length) {
    // Finished all sections!
    currentMode = 'complete';
    renderArticleReader(container, article);
  } else {
    // Re-render active section
    renderArticleReader(container, article);
    setTimeout(() => {
      const nextCard = document.getElementById(`session-card-${currentSessionIdx}`);
      if (nextCard) {
        nextCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  }
}

// Grand Pristine Lecteur Complet (完成記事の再読) view mode
function renderCompleteMode(container, article) {
  // Editorial header
  const header = document.createElement('div');
  header.className = 'magazine-header';
  header.style.textAlign = 'center';
  header.style.marginBottom = '2.5rem';
  header.innerHTML = `
    <div style="font-family: var(--font-serif); font-size: 0.85rem; letter-spacing: 2px; text-transform: uppercase; color: var(--color-text-muted); margin-bottom: 0.5rem; border-bottom: 2px double rgba(0,0,91,0.1); padding-bottom: 0.4rem; font-weight: bold;">
      Lecteur Complet — Version Prémice
    </div>
    <h1 style="font-family: var(--font-serif); font-size: 2.5rem; font-weight: 700; color: var(--color-primary); line-height: 1.25; margin-top: 1rem; margin-bottom: 0.5rem;">${article.title_fr}</h1>
    <h2 style="font-size: 1.1rem; color: var(--color-text-muted); font-weight: 500; font-style: italic; margin-bottom: 1.5rem;">${article.title_ja}</h2>
    <div style="font-size: 0.85rem; color: var(--color-success); font-weight: bold; margin-bottom: 1rem;">🎉 Félicitations ! Vous avez complété et déverrouillé l'article.</div>
  `;
  container.appendChild(header);
  
  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'newspaper-columns';
  contentWrapper.style.fontSize = '1.18rem';
  contentWrapper.style.lineHeight = '1.8';
  contentWrapper.style.fontFamily = 'var(--font-serif)';
  contentWrapper.style.color = 'var(--color-primary)';
  contentWrapper.style.marginBottom = '2.5rem';
  
  // Aggregate all French text into dual-column editorial layout
  let articleTextHtml = '';
  article.sessions.forEach((s, idx) => {
    // Add Dropcap to first paragraph for style
    const dropcapClass = idx === 0 ? 'editorial-dropcap' : '';
    articleTextHtml += `
      <p class="${dropcapClass}" style="margin-bottom: 1.5rem; text-align: justify; text-justify: inter-word;">
        ${s.text_fr.split('\n').join('<br>')}
      </p>
    `;
  });
  contentWrapper.innerHTML = articleTextHtml;
  container.appendChild(contentWrapper);
  
  // Return buttons
  const btnGroup = document.createElement('div');
  btnGroup.style.display = 'flex';
  btnGroup.style.justifyContent = 'center';
  btnGroup.style.gap = '1rem';
  btnGroup.style.marginTop = '2rem';
  
  const backToPreview = document.createElement('button');
  backToPreview.className = 'next-btn';
  backToPreview.innerText = "← Retour à l'aperçu (予習モードに戻る)";
  backToPreview.addEventListener('click', () => {
    currentMode = 'preview';
    currentSessionIdx = 0;
    renderArticleReader(container, article);
  });
  
  const backToList = document.createElement('button');
  backToList.className = 'next-btn';
  backToList.style.backgroundColor = 'transparent';
  backToList.style.border = '1px solid var(--color-primary)';
  backToList.style.color = 'var(--color-primary)';
  backToList.innerText = "📚 Liste des articles (目次へ戻る)";
  backToList.addEventListener('click', () => {
    renderArticlesList(container, [article]);
  });
  
  btnGroup.appendChild(backToPreview);
  btnGroup.appendChild(backToList);
  container.appendChild(btnGroup);
}

function showAnatomyTooltip(targetSpan, token, substringFr) {
  if (activeTooltip) {
    activeTooltip.remove();
  }
  
  const tooltip = document.createElement('div');
  tooltip.className = 'anatomy-tooltip card';
  tooltip.style.position = 'absolute';
  tooltip.style.zIndex = '1000';
  tooltip.style.padding = '1rem';
  tooltip.style.width = '290px';
  tooltip.style.boxShadow = 'var(--shadow-lg)';
  tooltip.style.border = '1px solid rgba(0, 0, 91, 0.15)';
  tooltip.style.borderRadius = '8px';
  tooltip.style.backgroundColor = '#FFFFFF';
  
  const cardId = token.vocab_id || token.gram_id;
  const dbItem = state.db.knowledge.find(item => item.id === cardId);
  
  // Localized part of speech mappings
  const posLabels = {
    noun: "Nom (名詞)",
    verb: "Verbe (動詞)",
    preposition: "Préposition (前置詞)",
    article_partitive: "Article partitif (部分冠詞)",
    article: "Article (冠詞)",
    pronoun_subject: "Pronom (代名詞)",
    conjunction: "Conjonction (接続詞)",
    other: "Autre (その他)"
  };
  const displayPos = posLabels[token.pos] || token.pos || "Autre (その他)";
  
  // Deep grammar contextual analysis block
  let analysisHtml = '';
  if (token.analysis) {
    analysisHtml = `
      <div style="font-size: 0.78rem; background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 0.5rem; border-radius: 4px; margin-top: 0.5rem; margin-bottom: 0.5rem;">
        <span style="font-size: 0.65rem; text-transform: uppercase; font-weight: bold; color: var(--color-text-muted); display: block; margin-bottom: 0.2rem;">🧬 Analyse Contextuelle (文脈解剖)</span>
        <strong>Base:</strong> ${token.analysis.lemma} (${token.analysis.group})<br>
        <strong>Forme:</strong> ${token.analysis.tense}<br>
        <span style="font-size: 0.75rem; color: var(--color-text-main); display: block; margin-top: 0.3rem; font-style: italic;">
          🇯🇵 ${token.analysis.context_ja}
        </span>
      </div>
    `;
  }
  
  if (dbItem) {
    const isVocab = !!dbItem.french;
    const levelBadge = `<span style="font-size: 0.85rem; font-weight: bold; color: var(--color-secondary);">${dbItem.level}</span>`;
    
    if (isVocab) {
      const genderLabel = dbItem.gender ? (dbItem.gender === 'm' ? 'Masculin' : dbItem.gender === 'f' ? 'Féminin' : 'M/F') : '';
      const genderBadge = genderLabel ? `<span style="font-size: 0.7rem; font-weight: 600; padding: 0.05rem 0.3rem; border-radius: 3px; background-color: #f0f4f8; color: var(--color-primary); border: 1px solid rgba(0,0,91,0.1);">${genderLabel}</span>` : '';
      
      const verbGroupLabel = dbItem.verb_group ? (dbItem.verb_group === 1 ? '1er groupe' : dbItem.verb_group === 2 ? '2e groupe' : '3e groupe') : '';
      const verbGroupBadge = verbGroupLabel ? `<span style="font-size: 0.7rem; font-weight: 600; padding: 0.05rem 0.3rem; border-radius: 3px; background-color: rgba(107,156,104,0.08); color: var(--color-success); border: 1px solid rgba(107,156,104,0.15);">${verbGroupLabel}</span>` : '';
      
      tooltip.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; border-bottom: 1px solid #f0f0f0; padding-bottom: 0.4rem;">
          <span style="font-size: 0.72rem; font-weight: bold; color: var(--color-text-muted); text-transform: uppercase;">${displayPos}</span>
          ${levelBadge}
        </div>
        <div style="display: flex; align-items: center; gap: 0.4rem; margin-bottom: 0.4rem; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 0.3rem;">
            <strong style="font-size: 1.1rem; color: var(--color-primary);">${dbItem.french}</strong>
          </div>
          <div style="display: flex; gap: 0.2rem;">
            ${genderBadge}
            ${verbGroupBadge}
          </div>
        </div>
        ${analysisHtml}
        <div style="font-size: 0.85rem; line-height: 1.4; color: var(--color-text-main); margin-bottom: 0.5rem; border-top: 1px solid #f0f0f0; padding-top: 0.5rem;">
          ${dbItem.definition_fr || ''}
        </div>
        <div style="font-size: 0.85rem; font-weight: 600; color: var(--color-secondary); margin-bottom: 0.8rem;">
          🇯🇵 ${dbItem.japanese}
        </div>
        <div style="border-top: 1px solid #f0f0f0; padding-top: 0.6rem; display: flex; gap: 0.4rem; justify-content: space-between;">
          <button class="next-btn play-here-btn" style="padding: 0.35rem 0.5rem; font-size: 0.72rem; flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 0.2rem; background-color: transparent; border: 1px solid var(--color-accent); color: var(--color-accent);">単語を聴く</button>
          <button class="next-btn play-from-here-btn" style="padding: 0.35rem 0.5rem; font-size: 0.72rem; flex: 1.2; display: inline-flex; align-items: center; justify-content: center; gap: 0.2rem; background-color: var(--color-accent); border-color: var(--color-accent);">ここから朗読</button>
        </div>
      `;
    } else {
      tooltip.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; border-bottom: 1px solid #f0f0f0; padding-bottom: 0.4rem;">
          <span style="font-size: 0.72rem; font-weight: bold; color: var(--color-text-muted); text-transform: uppercase;">${displayPos}</span>
          ${levelBadge}
        </div>
        <div style="margin-bottom: 0.5rem; margin-top: 0.4rem;">
          <strong style="font-size: 0.95rem; color: var(--color-primary);">${dbItem.grammar.topic}</strong>
        </div>
        ${analysisHtml}
        <div style="font-size: 0.8rem; line-height: 1.4; color: var(--color-text-main); margin-bottom: 0.8rem;">
          ${dbItem.grammar.explanation_ja}
        </div>
        <div style="border-top: 1px solid #f0f0f0; padding-top: 0.6rem; display: flex; justify-content: flex-end;">
          <button class="next-btn play-from-here-btn" style="padding: 0.35rem 0.8rem; font-size: 0.72rem; display: inline-flex; align-items: center; justify-content: center; gap: 0.2rem; background-color: var(--color-accent); border-color: var(--color-accent); width: 100%;">🔊 ここから朗読</button>
        </div>
      `;
    }
  } else {
    tooltip.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; border-bottom: 1px solid #f0f0f0; padding-bottom: 0.4rem;">
        <span style="font-size: 0.72rem; font-weight: bold; color: var(--color-text-muted); text-transform: uppercase;">${displayPos}</span>
      </div>
      <strong style="font-size: 1.1rem; color: var(--color-primary); margin-top: 0.4rem; display: block;">${token.word}</strong>
      ${analysisHtml}
      <div style="border-top: 1px solid #f0f0f0; padding-top: 0.6rem; display: flex; gap: 0.4rem; justify-content: space-between;">
        <button class="next-btn play-here-btn" style="padding: 0.35rem 0.5rem; font-size: 0.72rem; flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 0.2rem; background-color: transparent; border: 1px solid var(--color-accent); color: var(--color-accent);">単語を聴く</button>
        <button class="next-btn play-from-here-btn" style="padding: 0.35rem 0.5rem; font-size: 0.72rem; flex: 1.2; display: inline-flex; align-items: center; justify-content: center; gap: 0.2rem; background-color: var(--color-accent); border-color: var(--color-accent);">ここから朗読</button>
      </div>
    `;
  }
  
  document.body.appendChild(tooltip);
  activeTooltip = tooltip;
  
  const rect = targetSpan.getBoundingClientRect();
  const top = rect.bottom + window.scrollY + 8;
  const left = Math.max(10, Math.min(window.innerWidth - 300, rect.left + window.scrollX - 100));
  
  tooltip.style.top = `${top}px`;
  tooltip.style.left = `${left}px`;
  
  const playHere = tooltip.querySelector('.play-here-btn');
  if (playHere) {
    playHere.addEventListener('click', (e) => {
      e.stopPropagation();
      const cleanWord = token.word.replace(/^[^\wÀ-ÿ]+|[^\wÀ-ÿ]+$/g, "");
      speakFrench(cleanWord);
    });
  }
  
  const playFromHere = tooltip.querySelector('.play-from-here-btn');
  if (playFromHere && substringFr) {
    playFromHere.addEventListener('click', (e) => {
      e.stopPropagation();
      speakFrench(substringFr);
    });
  }
}
