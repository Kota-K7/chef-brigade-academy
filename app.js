import { renderHome } from './js/views/home.js';
import { renderVocabulary } from './js/views/vocabulary.js';
import { renderGrammar } from './js/views/grammar.js';
import { renderCuisine } from './js/views/cuisine.js';
import { renderQuiz } from './js/views/quiz.js';
import { renderFavorites } from './js/views/favorites.js';
import { renderReview } from './js/views/review.js';
import { renderSearch } from './js/views/search.js';
import { renderSettings } from './js/views/settings.js';
import { renderDictation } from './js/views/dictation.js';

// Global State
export const state = {
  meta: null,
  db: {
    knowledge: [],
    quizzes: []
  },
  loaded: {
    knowledge: new Set(),
    quizzes: false
  },
  favorites: new Set(JSON.parse(localStorage.getItem('cba_favorites') || '[]')),
  wrongAnswers: JSON.parse(localStorage.getItem('cba_wrong') || '[]'),
  streak: parseInt(localStorage.getItem('cba_streak') || '0'),
  lastStudyDate: localStorage.getItem('cba_last_study') || '',
  // Phase 2: SRS and Settings State
  srs: JSON.parse(localStorage.getItem('cba_srs') || '{}'),
  settings: JSON.parse(localStorage.getItem('cba_settings') || JSON.stringify({
    targetLevel: 'ALL',
    newCardsPerDay: 5,
    maxReviewsPerDay: 20,
    includeGeneral: false
  }))
};

// State Modifiers
export function toggleFavorite(id) {
  if (state.favorites.has(id)) {
    state.favorites.delete(id);
  } else {
    state.favorites.add(id);
  }
  localStorage.setItem('cba_favorites', JSON.stringify(Array.from(state.favorites)));
}

export function isFavorite(id) {
  return state.favorites.has(id);
}

export function addWrongAnswer(id) {
  if (!state.wrongAnswers.includes(id)) {
    state.wrongAnswers.push(id);
    localStorage.setItem('cba_wrong', JSON.stringify(state.wrongAnswers));
  }
}

export function removeWrongAnswer(id) {
  state.wrongAnswers = state.wrongAnswers.filter(item => item !== id);
  localStorage.setItem('cba_wrong', JSON.stringify(state.wrongAnswers));
}

export function recordStudyActivity() {
  const today = new Date().toISOString().split('T')[0];
  if (state.lastStudyDate === today) return; // Already counted today
  
  if (state.lastStudyDate) {
    const lastDate = new Date(state.lastStudyDate);
    const currentDate = new Date(today);
    const diffTime = Math.abs(currentDate - lastDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      state.streak += 1;
    } else if (diffDays > 1) {
      state.streak = 1; // Reset streak
    }
  } else {
    state.streak = 1; // First day
  }
  
  state.lastStudyDate = today;
  localStorage.setItem('cba_streak', state.streak.toString());
  localStorage.setItem('cba_last_study', today);
}

// Phase 2: SRS Algorithm (SM-2)
export function updateSRS(id, score) {
  const now = new Date().toISOString().split('T')[0];
  const item = state.srs[id] || {
    easiness: 2.5,
    interval: 0,
    repetitions: 0,
    dueDate: now
  };
  
  let q = Math.max(0, Math.min(5, score));
  
  if (q >= 3) {
    if (item.repetitions === 0) {
      item.interval = 1;
    } else if (item.repetitions === 1) {
      item.interval = 6;
    } else {
      item.interval = Math.round(item.interval * item.easiness);
    }
    item.repetitions++;
  } else {
    item.repetitions = 0;
    item.interval = 1;
  }
  
  item.easiness = item.easiness + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  if (item.easiness < 1.3) item.easiness = 1.3;
  
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + item.interval);
  
  item.dueDate = dueDate.toISOString().split('T')[0];
  item.lastRated = now;
  
  state.srs[id] = item;
  localStorage.setItem('cba_srs', JSON.stringify(state.srs));
}

// Phase 2: Settings update
export function updateSettings(newSettings) {
  state.settings = { ...state.settings, ...newSettings };
  localStorage.setItem('cba_settings', JSON.stringify(state.settings));
}

// Lazy Loading Data Utilities
export async function ensureDataLoaded(type, level) {
  const levelsToLoad = level === 'ALL' ? ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] : [level];
  
  for (const lvl of levelsToLoad) {
    if (state.loaded.knowledge.has(lvl)) continue;
    
    try {
      const response = await fetch(`data/knowledge_${lvl}.json`);
      if (!response.ok) {
        console.warn(`Could not load data/knowledge_${lvl}.json`);
        continue;
      }
      const data = await response.json();
      
      const existingIds = new Set(state.db.knowledge.map(item => item.id));
      for (const item of data) {
        if (!existingIds.has(item.id)) {
          state.db.knowledge.push(item);
        }
      }
      state.loaded.knowledge.add(lvl);
    } catch (err) {
      console.error(`Failed to load knowledge level ${lvl}:`, err);
    }
  }
}

export async function ensureQuizzesLoaded() {
  if (state.loaded.quizzes) return;
  try {
    const response = await fetch('data/quizzes.json');
    if (!response.ok) throw new Error("Network response was not ok");
    state.db.quizzes = await response.json();
    state.loaded.quizzes = true;
  } catch (err) {
    console.error("Failed to load quizzes:", err);
  }
}

export async function ensureAllDataLoaded() {
  await Promise.all([
    ensureDataLoaded('vocabulary', 'ALL'),
    ensureDataLoaded('grammar', 'ALL'),
    ensureDataLoaded('cuisine', 'ALL'),
    ensureQuizzesLoaded()
  ]);
}

// Router
const views = {
  home: renderHome,
  vocabulary: renderVocabulary,
  grammar: renderGrammar,
  cuisine: renderCuisine,
  quiz: renderQuiz,
  favorites: renderFavorites,
  review: renderReview,
  // Phase 2 views
  search: renderSearch,
  settings: renderSettings,
  // Phase 3 views
  dictation: renderDictation
};

export function navigateTo(viewName) {
  const mainContent = document.getElementById('main-content');
  if (views[viewName]) {
    // Record study when switching tabs
    recordStudyActivity();
    
    // Render the view
    mainContent.innerHTML = '';
    const element = views[viewName]();
    if (element instanceof HTMLElement) {
      mainContent.appendChild(element);
    } else {
      mainContent.innerHTML = element;
    }
    
    // Update active nav button
    document.querySelectorAll('.nav-link').forEach(btn => {
      if (btn.getAttribute('data-tab') === viewName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }
}

// App Initialization
async function initApp() {
  try {
    const response = await fetch('data/meta.json');
    state.meta = await response.json();
    
    // Register Navigation Click Listeners
    document.querySelectorAll('.nav-link').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const view = e.target.closest('.nav-link').getAttribute('data-tab');
        navigateTo(view);
      });
    });
    
    // Load initial view
    navigateTo('home');
    
    // Initialize YouGlish Sidebar
    initYouGlishSidebar();
  } catch (err) {
    console.error('Failed to load database metadata:', err);
    document.getElementById('main-content').innerHTML = `
      <div class="alert alert-info" style="border-left-color: var(--color-error); background-color: #FFEBEE; color: var(--color-error)">
        <h3>Error: Métadonnées inaccessibles</h3>
        <p>Could not load curriculum metadata. Please reload or check your local setup.</p>
      </div>
    `;
  }
}

// YouGlish Sidebar Initialization & Search Handlers
function initYouGlishSidebar() {
  const sidebar = document.getElementById('youglish-sidebar');
  const toggleBtn = document.getElementById('youglish-sidebar-toggle');
  const searchInput = document.getElementById('youglish-search-input');
  const searchBtn = document.getElementById('youglish-search-btn');
  const container = document.getElementById('yg-widget-container');

  if (!sidebar || !toggleBtn || !searchInput || !searchBtn || !container) return;

  // Toggle open class
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    sidebar.classList.toggle('open');
    if (sidebar.classList.contains('open')) {
      searchInput.focus();
    }
  });

  // Close sidebar when clicking outside on mobile or desktop
  document.addEventListener('click', (e) => {
    if (sidebar.classList.contains('open') && !sidebar.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  });

  // Handle Search function using YouGlish Widget API
  let ygWidget = null;
  function searchWord() {
    const query = searchInput.value.trim();
    if (!query) return;

    container.innerHTML = `<div id="yg-widget" style="width: 100%;"></div>`;
    
    // Check if YouGlish API is loaded globally
    if (window.YG) {
      try {
        ygWidget = new YG("yg-widget", {
          width: 230,
          components: 9, // Player + controls
          accentColor: '#C5A880',
          autoStart: 1,
          search: query,
          language: 'french'
        });
      } catch (err) {
        console.error("Failed to load YouGlish widget:", err);
        container.innerHTML = `
          <div style="font-size: 0.75rem; text-align: center; color: var(--color-error); padding: 1rem;">
            ウィジェットの読み込みに失敗しました。<br>
            <a href="https://youglish.com/pronounce/${encodeURIComponent(query)}/french" target="_blank" style="color: var(--color-accent); font-weight: 600; text-decoration: underline;">YouGlishサイトで直接開く</a>
          </div>
        `;
      }
    } else {
      // Fallback: Open in new window if API is offline/blocked
      window.open(`https://youglish.com/pronounce/${encodeURIComponent(query)}/french`, '_blank');
      container.innerHTML = `
        <div style="font-size: 0.75rem; text-align: center; color: rgba(255,255,255,0.7); padding: 1rem;">
          発音ページを別タブで開きました。<br>
          <a href="https://youglish.com/pronounce/${encodeURIComponent(query)}/french" target="_blank" style="color: var(--color-accent); font-weight: 600; text-decoration: underline;">開かない場合はこちら</a>
        </div>
      `;
    }
  }

  searchBtn.addEventListener('click', searchWord);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      searchWord();
    }
  });
}

document.addEventListener('DOMContentLoaded', initApp);;
