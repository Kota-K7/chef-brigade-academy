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
    vocabulary: [],
    grammar: [],
    cuisine: [],
    quizzes: []
  },
  loaded: {
    vocabulary: new Set(),
    grammar: new Set(),
    cuisine: new Set(),
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
    if (state.loaded[type].has(lvl)) continue;
    
    try {
      const response = await fetch(`data/${type}_${lvl}.json`);
      if (!response.ok) {
        console.warn(`Could not load data/${type}_${lvl}.json`);
        continue;
      }
      const data = await response.json();
      
      const existingIds = new Set(state.db[type].map(item => item.id));
      for (const item of data) {
        if (!existingIds.has(item.id)) {
          state.db[type].push(item);
        }
      }
      state.loaded[type].add(lvl);
    } catch (err) {
      console.error(`Failed to load ${type} level ${lvl}:`, err);
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
  } catch (err) {
    console.error('Failed to load database metadata:', err);
    document.getElementById('main-content').innerHTML = `
      <div class="alert alert-info" style="border-left-color: var(--color-error); background-color: #FFEBEE; color: var(--color-error)">
        <h3>Error: Métadonnées inaccessibles</h3>
        <p>Could not load curriculum metadata. Please reload or check your local setup.</p>
      </div>
    `;
  }
  
  // Register Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js')
        .then(reg => console.log('ServiceWorker registered with scope:', reg.scope))
        .catch(err => console.warn('ServiceWorker registration failed:', err));
    });
  }
}

document.addEventListener('DOMContentLoaded', initApp);;
