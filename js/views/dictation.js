import { state, ensureDataLoaded } from '../../app.js';
import { playText, pauseSpeech, resumeSpeech, cancelSpeech } from '../utils/audio.js';

export function renderDictation() {
  const container = document.createElement('div');
  
  const title = document.createElement('h2');
  title.className = 'section-title';
  title.innerText = "Dictée de Cuisine (Culinary Dictations)";
  container.appendChild(title);
  
  const subtitle = document.createElement('p');
  subtitle.className = 'section-subtitle';
  subtitle.innerText = "Listen to French kitchen instruction sentences, type what you hear, and master French spelling.";
  container.appendChild(subtitle);
  
  const loading = document.createElement('div');
  loading.className = 'loading-placeholder';
  loading.innerText = "Chargement de la dictée... (Loading dictation...)";
  container.appendChild(loading);
  
  const targetLevel = state.settings?.targetLevel || 'ALL';
  ensureDataLoaded('vocabulary', targetLevel).then(() => {
    loading.remove();
    renderDictationContent(container);
  });
  
  return container;
}

function renderDictationContent(container) {
  const includeGeneral = state.settings?.includeGeneral || false;
  const allVocabs = state.db?.vocabulary || [];
  const vocabs = allVocabs.filter(item => includeGeneral || item.is_professional);
  const sentences = vocabs.filter(v => v.context_fr);
  
  if (sentences.length === 0) {
    container.innerHTML += `<p style="color: var(--color-text-muted);">Aucun exercice disponible.</p>`;
    return;
  }
  
  // Shuffle array utility for 5 sentences
  const dictationDeck = [...sentences].sort(() => 0.5 - Math.random()).slice(0, 5);
  
  let currentIndex = 0;
  let hasChecked = false;
  
  // Audio state
  let isCurrentlySpeaking = false;
  let isCurrentlyPaused = false;
  let currentOffset = 0;
  let playbackRate = 1.0;
  
  const gameWrapper = document.createElement('div');
  gameWrapper.className = 'dictation-container';
  gameWrapper.style.maxWidth = '600px';
  gameWrapper.style.margin = '1.5rem auto';
  container.appendChild(gameWrapper);
  
  function cleanString(str) {
    return str
      .toLowerCase()
      .trim()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()'"?]/g, "") // remove punctuation
      .replace(/\s+/g, " "); // consolidate spaces
  }
  
  function stripAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  
  function renderExercise() {
    gameWrapper.innerHTML = '';
    hasChecked = false;
    
    // Stop any residual audio
    cancelSpeech();
    isCurrentlySpeaking = false;
    isCurrentlyPaused = false;
    currentOffset = 0;
    
    if (currentIndex >= dictationDeck.length) {
      // Completed View
      const finishedCard = document.createElement('div');
      finishedCard.className = 'card';
      finishedCard.style.padding = '2.5rem';
      finishedCard.style.textAlign = 'center';
      finishedCard.innerHTML = `
        <h3 style="font-family: var(--font-serif); font-size: 2rem; color: var(--color-primary); margin-bottom: 1rem;">Session Terminée !</h3>
        <p style="font-size: 1.1rem; margin-bottom: 2rem; color: var(--color-text-muted);">You completed all culinary dictation drills in this session.</p>
        <button id="restart-dictation-btn" class="next-btn" style="width: 100%;">Restart New Dictation Session</button>
      `;
      finishedCard.querySelector('#restart-dictation-btn').addEventListener('click', () => {
        currentIndex = 0;
        dictationDeck.length = 0;
        dictationDeck.push(...[...sentences].sort(() => 0.5 - Math.random()).slice(0, 5));
        renderExercise();
      });
      gameWrapper.appendChild(finishedCard);
      return;
    }
    
    const currentItem = dictationDeck[currentIndex];
    const targetText = currentItem.context_fr;
    
    const card = document.createElement('div');
    card.className = 'card';
    card.style.padding = '2rem';
    
    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 0.8rem;">
        <span class="card-category" style="margin: 0;">Drill ${currentIndex + 1} of ${dictationDeck.length}</span>
        <span style="font-size: 0.8rem; color: var(--color-text-muted); font-weight: 500;">Topic: ${currentItem.category}</span>
      </div>
      
      <!-- Audio Controller Panel -->
      <div style="background-color: rgba(10, 25, 49, 0.03); border: 1px solid rgba(197, 168, 128, 0.15); padding: 1.2rem; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
        <!-- Control buttons -->
        <div style="display: flex; align-items: center; justify-content: center; gap: 0.8rem; margin-bottom: 1rem;">
          <button id="play-pause-btn" class="next-btn" style="padding: 0.6rem 1.2rem; font-size: 0.9rem;">▶ Play</button>
          <button id="stop-btn" class="next-btn" style="background-color: transparent; border: 1px solid var(--color-error); color: var(--color-error); padding: 0.6rem 1.2rem; font-size: 0.9rem;">■ Stop</button>
          
          <div style="height: 20px; width: 1px; background-color: rgba(0,0,0,0.1); margin: 0 0.5rem;"></div>
          
          <button id="speed-normal-btn" class="next-btn speed-toggle active" style="padding: 0.4rem 0.8rem; font-size: 0.75rem;">1.0x</button>
          <button id="speed-slow-btn" class="next-btn speed-toggle" style="background-color: transparent; border: 1px solid var(--color-accent); color: var(--color-accent); padding: 0.4rem 0.8rem; font-size: 0.75rem;">🐢 0.75x</button>
        </div>
        
        <!-- Scrubber seekbar -->
        <div style="display: flex; align-items: center; gap: 0.8rem;">
          <span style="font-size: 0.75rem; color: var(--color-text-muted); font-family: monospace;">0%</span>
          <input type="range" id="dictation-seekbar" min="0" max="100" value="0" style="flex: 1; cursor: pointer; height: 6px; border-radius: 3px; accent-color: var(--color-accent);">
          <span style="font-size: 0.75rem; color: var(--color-text-muted); font-family: monospace;">100%</span>
        </div>
      </div>
      
      <!-- User Input -->
      <div style="margin-bottom: 1.5rem;">
        <label for="dictation-input" style="display: block; font-weight: 600; margin-bottom: 0.5rem; font-size: 0.9rem;">Type the French sentence below:</label>
        <textarea id="dictation-input" rows="3" placeholder="Listen to the audio and write here..." style="width: 100%; padding: 1rem; font-size: 1.05rem; border-radius: var(--radius-sm); border: 2px solid rgba(197, 168, 128, 0.2); outline: none; transition: var(--transition); font-family: var(--font-sans);"></textarea>
      </div>
      
      <!-- Verification Feedback Alert -->
      <div id="dictation-feedback" style="display: none; padding: 1.2rem; border-radius: var(--radius-sm); margin-bottom: 1.5rem; line-height: 1.5;"></div>
      
      <!-- Actions -->
      <div style="display: flex; gap: 1rem;">
        <button id="check-btn" class="next-btn" style="flex: 1; padding: 0.8rem;">Vérifier (Check Answer)</button>
        <button id="next-dictation-btn" class="next-btn" style="flex: 1; display: none; background-color: var(--color-secondary); padding: 0.8rem;">Suivant (Next)</button>
      </div>
    `;
    
    // Elements references
    const playPauseBtn = card.querySelector('#play-pause-btn');
    const stopBtn = card.querySelector('#stop-btn');
    const speedNormalBtn = card.querySelector('#speed-normal-btn');
    const speedSlowBtn = card.querySelector('#speed-slow-btn');
    const seekbar = card.querySelector('#dictation-seekbar');
    const dictationInput = card.querySelector('#dictation-input');
    const checkBtn = card.querySelector('#check-btn');
    const nextBtn = card.querySelector('#next-dictation-btn');
    const feedback = card.querySelector('#dictation-feedback');
    
    // TTS Boundary callback (sync seekbar index)
    function onBoundary(charIndex, totalLength) {
      if (!hasChecked) {
        const percentage = (charIndex / totalLength) * 100;
        seekbar.value = Math.round(percentage);
        
        // Update current playback offset character index
        currentOffset = charIndex;
      }
    }
    
    // TTS End callback
    function onEnd() {
      isCurrentlySpeaking = false;
      isCurrentlyPaused = false;
      currentOffset = 0;
      playPauseBtn.innerText = "▶ Play";
      seekbar.value = 0;
    }
    
    // Audio trigger play function
    function playCurrentText() {
      playText(targetText, playbackRate, onBoundary, onEnd, currentOffset);
    }
    
    // Play/Pause Action
    playPauseBtn.addEventListener('click', () => {
      if (hasChecked) return;
      
      if (!isCurrentlySpeaking) {
        isCurrentlySpeaking = true;
        isCurrentlyPaused = false;
        playPauseBtn.innerText = "⏸ Pause";
        playCurrentText();
      } else if (isCurrentlyPaused) {
        isCurrentlyPaused = false;
        playPauseBtn.innerText = "⏸ Pause";
        resumeSpeech();
      } else {
        isCurrentlyPaused = true;
        playPauseBtn.innerText = "▶ Play";
        pauseSpeech();
      }
    });
    
    // Stop Action
    stopBtn.addEventListener('click', () => {
      cancelSpeech();
      onEnd();
    });
    
    // Seekbar input change (Scrubber)
    seekbar.addEventListener('change', (e) => {
      if (hasChecked) return;
      
      const percentage = parseInt(e.target.value);
      const cleanTarget = targetText.replace(/["'➔]/g, '').trim();
      
      // Calculate start index based on slider percentage
      currentOffset = Math.floor((percentage / 100) * cleanTarget.length);
      
      // Align to nearest word space if applicable
      const spaceIdx = cleanTarget.indexOf(' ', currentOffset);
      if (spaceIdx !== -1 && (spaceIdx - currentOffset < 5)) {
        currentOffset = spaceIdx + 1;
      }
      
      isCurrentlySpeaking = true;
      isCurrentlyPaused = false;
      playPauseBtn.innerText = "⏸ Pause";
      
      playCurrentText();
    });
    
    // Speed Controls
    speedNormalBtn.addEventListener('click', () => {
      if (playbackRate === 1.0) return;
      
      playbackRate = 1.0;
      speedNormalBtn.classList.add('active');
      speedNormalBtn.style.backgroundColor = 'var(--color-primary)';
      speedNormalBtn.style.color = '#FFFFFF';
      
      speedSlowBtn.classList.remove('active');
      speedSlowBtn.style.backgroundColor = 'transparent';
      speedSlowBtn.style.color = 'var(--color-accent)';
      
      // Re-trigger if speaking
      if (isCurrentlySpeaking && !isCurrentlyPaused) {
        playCurrentText();
      }
    });
    
    speedSlowBtn.addEventListener('click', () => {
      if (playbackRate === 0.75) return;
      
      playbackRate = 0.75;
      speedSlowBtn.classList.add('active');
      speedSlowBtn.style.backgroundColor = 'var(--color-accent)';
      speedSlowBtn.style.color = '#FFFFFF';
      
      speedNormalBtn.classList.remove('active');
      speedNormalBtn.style.backgroundColor = 'transparent';
      speedNormalBtn.style.color = 'var(--color-accent)';
      
      // Re-trigger if speaking
      if (isCurrentlySpeaking && !isCurrentlyPaused) {
        playCurrentText();
      }
    });
    
    // Verify check logic
    checkBtn.addEventListener('click', () => {
      if (hasChecked) return;
      
      // Cancel speech when checking answer
      cancelSpeech();
      onEnd();
      
      const userInput = dictationInput.value;
      const cleanUser = cleanString(userInput);
      const cleanTarget = cleanString(targetText);
      
      const noAccentUser = stripAccents(cleanUser);
      const noAccentTarget = stripAccents(cleanTarget);
      
      let isCorrect = false;
      let isAlmostCorrect = false;
      
      if (cleanUser === cleanTarget) {
        isCorrect = true;
      } else if (noAccentUser === noAccentTarget) {
        isAlmostCorrect = true;
      }
      
      feedback.style.display = 'block';
      dictationInput.disabled = true;
      checkBtn.style.display = 'none';
      nextBtn.style.display = 'block';
      hasChecked = true;
      
      if (isCorrect) {
        feedback.style.backgroundColor = '#E8F5E9';
        feedback.style.borderLeft = '4px solid var(--color-success)';
        feedback.style.color = 'var(--color-success)';
        feedback.innerHTML = `
          <strong style="font-size: 1.1rem; display: block; margin-bottom: 0.4rem;">Très bien ! (Excellent!)</strong>
          <p style="font-size: 0.9rem; color: var(--color-text-main);">Your spelling is perfectly correct.</p>
          <div style="margin-top: 0.8rem; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 0.6rem; font-size: 0.85rem; color: var(--color-text-muted);">
            <strong>Meaning:</strong> ${currentItem.context_ja}
          </div>
        `;
      } else if (isAlmostCorrect) {
        feedback.style.backgroundColor = '#FFF3E0';
        feedback.style.borderLeft = '4px solid var(--color-accent)';
        feedback.style.color = '#E65100';
        feedback.innerHTML = `
          <strong style="font-size: 1.1rem; display: block; margin-bottom: 0.4rem;">Presque correct ! (Almost correct)</strong>
          <p style="font-size: 0.9rem; color: var(--color-text-main);">Watch out for French accents (é, è, à, ç, etc.) or punctuation spacing.</p>
          <div style="margin: 0.8rem 0; padding: 0.6rem; background: rgba(0,0,0,0.02); font-size: 0.9rem; border-radius: var(--radius-sm);">
            <div><strong>Expected:</strong> <span style="font-family: monospace; font-weight: 600; color: var(--color-success);">${targetText}</span></div>
            <div style="margin-top: 0.2rem;"><strong>Your input:</strong> <span style="font-family: monospace; font-weight: 600; color: var(--color-error);">${userInput}</span></div>
          </div>
          <div style="border-top: 1px solid rgba(0,0,0,0.05); padding-top: 0.6rem; font-size: 0.85rem; color: var(--color-text-muted);">
            <strong>Meaning:</strong> ${currentItem.context_ja}
          </div>
        `;
      } else {
        feedback.style.backgroundColor = '#FFEBEE';
        feedback.style.borderLeft = '4px solid var(--color-error)';
        feedback.style.color = 'var(--color-error)';
        feedback.innerHTML = `
          <strong style="font-size: 1.1rem; display: block; margin-bottom: 0.4rem;">Incorrect.</strong>
          <div style="margin: 0.8rem 0; padding: 0.6rem; background: rgba(0,0,0,0.02); font-size: 0.9rem; border-radius: var(--radius-sm);">
            <div><strong>Expected:</strong> <span style="font-family: monospace; font-weight: 600; color: var(--color-success);">${targetText}</span></div>
            <div style="margin-top: 0.2rem;"><strong>Your input:</strong> <span style="font-family: monospace; font-weight: 600; color: var(--color-error);">${userInput || '(empty)'}</span></div>
          </div>
          <div style="border-top: 1px solid rgba(0,0,0,0.05); padding-top: 0.6rem; font-size: 0.85rem; color: var(--color-text-muted);">
            <strong>Meaning:</strong> ${currentItem.context_ja}
          </div>
        `;
      }
    });
    
    // Continue button click
    nextBtn.addEventListener('click', () => {
      currentIndex++;
      renderExercise();
    });
    
    gameWrapper.appendChild(card);
    dictationInput.focus();
  }
  
  renderExercise();
}
