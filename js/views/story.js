import { speakFrench } from '../utils/audio.js';
import { state, ensureQuizzesLoaded, ensureDataLoaded, navigateTo } from '../../app.js';

// ==========================================
// 補正設定 (Character adjustments)
// ==========================================
// キャラクターごとの表示サイズ倍率 (1.0 = 標準)
// 女将さんのサイズ比率を少し拡大するために、ここで倍率を設定できます。
const CHARACTER_SCALES = {
  proprietress: 1.5 // 女将さん (他のキャラより縦横比が縦長なため1.5倍に拡大)
};

// Web Audio API lightweight synthesizer for zero-dependency retro SFX
let audioCtx = null;
function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playBeep(freq, type, duration, volume = 0.06) {
  try {
    initAudio();
    if (!audioCtx || audioCtx.state === 'suspended') {
      // Try to resume if suspended by browser auto-play policy
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    gain.gain.setValueAtTime(volume, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // Fail silently without blocking execution
  }
}

function playTypingSound() {
  playBeep(780, 'sine', 0.03, 0.04);
}

function playCorrectSound() {
  playBeep(523.25, 'sine', 0.08, 0.08); // C5
  setTimeout(() => playBeep(659.25, 'sine', 0.15, 0.08), 80); // E5
}

function playWrongSound() {
  playBeep(180, 'triangle', 0.3, 0.12);
}

function playHitSound() {
  playBeep(110, 'sawtooth', 0.2, 0.1);
}

// Main story view entry point
export function renderStory() {
  const container = document.createElement('div');
  container.className = 'story-mode-container';
  
  // Initial state: Chapter Selector
  renderChapterSelector(container);
  
  return container;
}

// Render Chapter and Episode Selection
async function renderChapterSelector(container) {
  container.innerHTML = `
    <div class="view-header">
      <h2>🏰 Histoire (フランス歴史体験RPG)</h2>
      <p class="subtitle">フランスの歴史を追体験しながら、フランス語・文化を学ぶストーリー学習モードです。</p>
    </div>
    
    <div class="chapter-list">
      <div class="story-chapter-card active-chapter">
        <div class="chapter-card-header">
          <span class="chapter-badge">Chapter 0</span>
          <h3>第0章: ガリア以前 - 始まりの地</h3>
        </div>
        <p class="chapter-desc">ガリア遠征以前の古代フランスを舞台に、生活の基礎挨拶やマルセイユ周辺の食文化を体験します。</p>
        
        <div class="episode-list" style="display: flex; flex-direction: column; gap: 1rem;">
          <div class="episode-row">
            <div class="episode-info">
              <h4>第1話: 目覚めと試練</h4>
              <span class="play-time">⏱️ 推奨プレイ時間: 5分</span>
            </div>
            <button class="action-btn play-episode-btn" data-chapter="0" data-episode="ep_0_1">開始する</button>
          </div>
          
          <div class="episode-row" style="border-top: 1px dashed rgba(197, 168, 128, 0.2); padding-top: 0.8rem;">
            <div class="episode-info">
              <h4>第2話: 憧れの市場</h4>
              <span class="play-time">⏱️ 推奨プレイ時間: 5分</span>
            </div>
            <button class="action-btn play-episode-btn" data-chapter="0" data-episode="ep_0_2">開始する</button>
          </div>
          
          <div class="episode-row" style="border-top: 1px dashed rgba(197, 168, 128, 0.2); padding-top: 0.8rem;">
            <div class="episode-info">
              <h4>第3話: 銀のペンダント</h4>
              <span class="play-time">⏱️ 推奨プレイ時間: 5分</span>
            </div>
            <button class="action-btn play-episode-btn" data-chapter="0" data-episode="ep_0_3">開始する</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Bind start buttons
  container.querySelectorAll('.play-episode-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const chapterNum = e.target.getAttribute('data-chapter');
      const episodeId = e.target.getAttribute('data-episode');
      startEpisode(container, chapterNum, episodeId);
    });
  });
}

// Load and start visual novel sequence
async function startEpisode(container, chapterNum, episodeId) {
  try {
    container.innerHTML = `<div class="story-loader"><div class="spinner"></div><p>物語を読み込んでいます...</p></div>`;
    
    const response = await fetch(`data/story/chapter_${chapterNum}.json`);
    if (!response.ok) throw new Error("Story file could not be loaded");
    
    const chapterData = await response.json();
    const episode = chapterData.episodes.find(ep => ep.episodeId === episodeId);
    
    if (!episode) {
      throw new Error("Episode data not found in chapter file");
    }
    
    runSequenceEngine(container, episode);
  } catch (err) {
    container.innerHTML = `
      <div class="alert alert-info" style="border-left-color: var(--color-error); background-color: #FFEBEE; color: var(--color-error)">
        <h3>物語の読み込みエラー</h3>
        <p>${err.message}</p>
        <button class="action-btn" onclick="location.reload()">再読み込み</button>
      </div>
    `;
  }
}

// Core Story Engine Sequence controller
function runSequenceEngine(container, episode) {
  let currentIndex = 0;
  const sequence = episode.sequence;
  
  // Set up game screen wrapper
  container.innerHTML = `
    <div class="rpg-game-wrapper">
      <!-- Main Game Board -->
      <div class="rpg-main-viewport" id="rpg-viewport">
        <!-- Tutorial overlay -->
        <div id="rpg-tutorial-overlay" class="rpg-overlay" style="display: none;"></div>
        
        <!-- Character Sprite Layer -->
        <div id="rpg-character-layer" class="rpg-character-layer"></div>
        
        <!-- Dialog UI -->
        <div id="rpg-dialog-pane" class="rpg-dialog-pane" style="display: none;">
          <div class="name-badge" id="dialog-name"></div>
          <div class="dialog-text-box" id="dialog-text"></div>
          <div class="click-prompt">▼ クリックで進む</div>
        </div>
        
        <!-- Battle UI -->
        <div id="rpg-battle-pane" class="rpg-battle-pane" style="display: none;"></div>
        
        <!-- Reward UI -->
        <div id="rpg-reward-pane" class="rpg-reward-pane" style="display: none;"></div>
      </div>
      
      <!-- Side panel for Learning Points (Visible only when present) -->
      <div class="rpg-learning-sidebar" id="rpg-sidebar" style="opacity: 0; pointer-events: none;">
        <h3>💡 学習ポイント (Point d'Étude)</h3>
        <div class="sidebar-lp-title" id="lp-title"></div>
        <div class="sidebar-lp-content" id="lp-content"></div>
      </div>
    </div>
  `;

  const viewport = container.querySelector('#rpg-viewport');
  const dialogPane = container.querySelector('#rpg-dialog-pane');
  const battlePane = container.querySelector('#rpg-battle-pane');
  const rewardPane = container.querySelector('#rpg-reward-pane');
  const tutorialOverlay = container.querySelector('#rpg-tutorial-overlay');
  const sidebar = container.querySelector('#rpg-sidebar');
  
  let typingInterval = null;
  let isTyping = false;
  let fullTextToSkip = "";

  function nextStep() {
    if (isTyping) {
      // Skip typing effect and show full text immediately
      clearInterval(typingInterval);
      const textBox = container.querySelector('#dialog-text');
      textBox.innerText = fullTextToSkip;
      isTyping = false;
      return;
    }

    if (currentIndex >= sequence.length) {
      // Story finished, go back to selector
      renderChapterSelector(container);
      return;
    }

    const step = sequence[currentIndex];
    
    // Process step based on type
    if (step.type === 'tutorial') {
      showTutorial(step);
    } else if (step.type === 'dialog') {
      showDialog(step);
    } else if (step.type === 'fixedBattle' || step.type === 'randomBattle') {
      startBattle(step);
    } else if (step.type === 'reward') {
      showReward(step);
    }

    updatePolicyNotice(step);
  }

  function updatePolicyNotice(step) {
    let policyOverlay = viewport.querySelector('.ai-policy-notice');
    const isThiefCaughtBg = (step && step.background === 'bg_thief_caught.png') || 
                           (viewport.style.background && viewport.style.background.includes('bg_thief_caught.png'));

    if (isThiefCaughtBg) {
      if (!policyOverlay) {
        policyOverlay = document.createElement('div');
        policyOverlay.className = 'ai-policy-notice';
        policyOverlay.innerText = '※AIポリシーの都合により、カミーユはうさぎの縫いぐるみに差し替えられました';
        viewport.appendChild(policyOverlay);
      }
    } else {
      if (policyOverlay) {
        policyOverlay.remove();
      }
    }
  }

  // Bind screen clicks to progress dialogue (only when in dialog mode)
  viewport.addEventListener('click', (e) => {
    // If clicking a button in battle or reward, don't trigger dialogue nextStep
    if (e.target.closest('button') || e.target.closest('.battle-question-box') || dialogPane.style.display === 'none') {
      return;
    }
    nextStep();
  });

  // Start sequence
  nextStep();

  // --- Render Functions ---

  function showTutorial(step) {
    dialogPane.style.display = 'none';
    battlePane.style.display = 'none';
    rewardPane.style.display = 'none';
    sidebar.style.opacity = '0';
    sidebar.style.pointerEvents = 'none';
    
    // Clear character sprites
    const charLayer = container.querySelector('#rpg-character-layer');
    if (charLayer) charLayer.innerHTML = '';
    
    tutorialOverlay.innerHTML = `
      <div class="tutorial-card">
        <h3>📖 ${step.title}</h3>
        <p style="white-space: pre-line; line-height: 1.6; text-align: justify; margin: 1.2rem 0; font-size: 0.9rem;">${step.text}</p>
        <button class="action-btn start-tut-btn" style="width: 100%; padding: 0.8rem; font-weight: 700;">冒険を開始する</button>
      </div>
    `;
    tutorialOverlay.style.display = 'flex';

    tutorialOverlay.querySelector('.start-tut-btn').addEventListener('click', () => {
      tutorialOverlay.style.display = 'none';
      currentIndex++;
      nextStep();
    });
  }

  function showDialog(step) {
    tutorialOverlay.style.display = 'none';
    battlePane.style.display = 'none';
    rewardPane.style.display = 'none';
    dialogPane.style.display = 'block';

    // Apply background CSS or gradient
    const bgVal = episode.backgrounds[step.background] || "#000000";
    viewport.style.background = bgVal;
    
    // Apply shake effect if specified in the step
    if (step.shake) {
      viewport.classList.add('shake-vfx');
      setTimeout(() => viewport.classList.remove('shake-vfx'), 400);
    }
    
    if (bgVal.includes('url(')) {
      viewport.style.backgroundSize = 'cover';
      viewport.style.backgroundPosition = 'center';
      viewport.style.backgroundRepeat = 'no-repeat';
    } else {
      viewport.style.backgroundSize = '';
      viewport.style.backgroundPosition = '';
      viewport.style.backgroundRepeat = '';
    }

    // Update Character Sprite Layer
    const charLayer = container.querySelector('#rpg-character-layer');
    if (charLayer) {
      charLayer.innerHTML = ''; // Clear previous sprites

      // bg_camille_cry.webp, bg_after_battle.webp, bg_father.webp が背景のときはキャラクター写真を重ねて表示しない
      const bgValLower = bgVal.toLowerCase();
      const shouldSuppressSprites = bgValLower.includes('bg_camille_cry.webp') ||
                                    bgValLower.includes('bg_after_battle.webp') ||
                                    bgValLower.includes('bg_father.webp');

      let activeSprites = [];
      if (!shouldSuppressSprites) {
        if (step.characters && Array.isArray(step.characters)) {
          activeSprites = step.characters;
        } else if (step.character) {
          activeSprites = [{
            id: step.character,
            expression: step.expression || 'default',
            position: step.position || 'center'
          }];
        }
      }

      activeSprites.forEach(spriteInfo => {
        const charDef = episode.characters[spriteInfo.id];
        const expr = spriteInfo.expression || 'default';
        let pos = spriteInfo.position || 'center';
        
        // 女将さん(proprietress)が単独で出現するシーン（画面上のスプライトが女将さんのみ）の場合、中央に配置する
        if (activeSprites.length === 1 && spriteInfo.id === 'proprietress') {
          pos = 'center';
        }
        
        let spriteUrl = null;
        if (charDef && charDef.images) {
          if (charDef.images[expr]) {
            spriteUrl = charDef.images[expr];
          } else if (expr === 'default' && charDef.images['normal']) {
            spriteUrl = charDef.images['normal'];
          } else {
            const keys = Object.keys(charDef.images);
            if (keys.length > 0) {
              spriteUrl = charDef.images[keys[0]];
            }
          }
        }

        if (spriteUrl) {
          const img = document.createElement('img');
          img.src = spriteUrl;
          img.className = `rpg-character-sprite pos-${pos} sprite-${spriteInfo.id}`;
          
          // キャラクター倍率設定を適用する
          const scale = CHARACTER_SCALES[spriteInfo.id] || 1.0;
          img.style.setProperty('--char-scale', scale);
          
          charLayer.appendChild(img);
          // Trigger transition
          setTimeout(() => {
            img.classList.add('active');
          }, 50);
        }
      });
    }

    // Set Name (Hidden per user request since character name is in the text)
    const char = step.character ? episode.characters[step.character] : null;
    const nameEl = container.querySelector('#dialog-name');
    const textBox = container.querySelector('#dialog-text');

    nameEl.style.display = 'none';

    // Show Learning Point if present
    if (step.learningPoint) {
      container.querySelector('#lp-title').innerText = step.learningPoint.title;
      container.querySelector('#lp-content').innerText = step.learningPoint.text;
      sidebar.style.opacity = '1';
      sidebar.style.pointerEvents = 'auto';
    } else {
      sidebar.style.opacity = '0';
      sidebar.style.pointerEvents = 'none';
    }

    // Prep display text (Prepend name to dialogue text if speaking)
    const displayText = char ? `${char.name}：${step.text}` : step.text;

    // Typing effect
    textBox.innerText = "";
    fullTextToSkip = displayText;
    isTyping = true;
    let charIndex = 0;
    
    clearInterval(typingInterval);
    typingInterval = setInterval(() => {
      if (charIndex < displayText.length) {
        textBox.innerText += displayText[charIndex];
        charIndex++;
        // Play very short clicks for character voices
        if (charIndex % 2 === 0) {
          playTypingSound();
        }
      } else {
        clearInterval(typingInterval);
        isTyping = false;
      }
    }, 30);

    currentIndex++;
  }

  async function startBattle(step) {
    dialogPane.style.display = 'none';
    tutorialOverlay.style.display = 'none';
    rewardPane.style.display = 'none';
    sidebar.style.opacity = '0';
    sidebar.style.pointerEvents = 'none';
    battlePane.style.display = 'flex';

    // Clear character sprites
    const charLayer = container.querySelector('#rpg-character-layer');
    if (charLayer) charLayer.innerHTML = '';

    // Show temporary loading indicator
    battlePane.innerHTML = `
      <div style="margin: auto; text-align: center;">
        <div class="spinner" style="margin: 0 auto 1rem;"></div>
        <p>試練を読み込んでいます...</p>
      </div>
    `;

    let questions = [];
    if (step.type === 'randomBattle') {
      try {
        await ensureQuizzesLoaded();
        const level = step.conditions?.level || 'ALL';
        if (level !== 'ALL') {
          await ensureDataLoaded('vocabulary', level);
        }
        
        let pool = [...state.db.quizzes];
        
        // Filter by category
        const category = step.conditions?.category;
        if (category) {
          pool = pool.filter(q => q.category && q.category.toLowerCase() === category.toLowerCase());
        }
        
        // Shuffle and slice
        pool = shuffleArray(pool);
        const count = step.enemyHp || 3;
        questions = pool.slice(0, count);
        
        // Fallback if not enough questions
        if (questions.length < count) {
          const fallbackPool = shuffleArray(state.db.quizzes.filter(q => !questions.some(eq => eq.id === q.id)));
          questions = questions.concat(fallbackPool.slice(0, count - questions.length));
        }
        
        // Convert to battle format
        questions = questions.map(q => {
          const answerIndex = q.options.indexOf(q.answer);
          return {
            questionId: q.id,
            text: q.question,
            options: q.options,
            answerIndex: answerIndex !== -1 ? answerIndex : 0,
            explanation: q.context || `正解は「${q.answer}」です。`
          };
        });
      } catch (err) {
        console.error("Failed to generate random questions:", err);
        questions = [
          {
            questionId: "fb_err_1",
            text: "プロヴァンス地方の代表的なスープ料理は？",
            options: ["Bouillabaisse", "Bœuf bourguignon", "Cassoulet", "Choucroute"],
            answerIndex: 0,
            explanation: "ブイヤベースはプロヴァンス地方（マルセイユ）の名物です。"
          }
        ];
      }
    } else {
      questions = step.questions;
    }

    let enemyHp = step.enemyHp || questions.length;
    const maxEnemyHp = enemyHp;
    let playerHp = 10;
    const maxPlayerHp = 10;
    let questionIndex = 0;

    function shuffleArray(array) {
      const arr = [...array];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    function renderBattleScreen() {
      if (enemyHp <= 0) {
        // Player wins
        playCorrectSound();
        battlePane.innerHTML = `
          <div class="battle-victory">
            <h2 class="victory-title">👑 VICTOIRE ! (勝利)</h2>
            <p>試練を乗り越え、実力を証明した！</p>
            <button class="action-btn proceed-battle-btn" style="margin-top: 1rem;">次へ進む</button>
          </div>
        `;
        battlePane.querySelector('.proceed-battle-btn').addEventListener('click', () => {
          currentIndex++;
          nextStep();
        });
        return;
      }

      if (playerHp <= 0) {
        // Player loses (Game Over)
        playWrongSound();
        battlePane.innerHTML = `
          <div class="battle-defeat">
            <h2>💀 GAME OVER</h2>
            <p>HPが尽きてしまいました。もう一度復習して挑戦しましょう！</p>
            <div style="display: flex; gap: 1rem; margin-top: 1rem; width: 100%;">
              <button class="action-btn retry-battle-btn" style="flex: 1;">もう一度挑戦</button>
              <button class="action-btn exit-battle-btn" style="flex: 1; background: #374151;">復習しにいく</button>
            </div>
          </div>
        `;
        battlePane.querySelector('.retry-battle-btn').addEventListener('click', () => {
          startBattle(step); // Restart same battle
        });
        battlePane.querySelector('.exit-battle-btn').addEventListener('click', () => {
          const category = step.conditions?.category;
          if (category === 'grammar') {
            navigateTo('grammar');
          } else {
            navigateTo('vocabulary');
          }
        });
        return;
      }

      if (questionIndex >= questions.length) {
        // Run out of questions but HP remains
        if (enemyHp > 0) {
          enemyHp = 0; // Trigger win
          renderBattleScreen();
        }
        return;
      }

      const currentQ = questions[questionIndex];

      battlePane.innerHTML = `
        <div class="battle-hud">
          <!-- Player HP -->
          <div class="hud-bar-container">
            <span class="hud-label">VOUS (あなた)</span>
            <div class="hud-hp-track">
              <div class="hud-hp-fill player-hp" style="width: ${(playerHp / maxPlayerHp) * 100}%"></div>
            </div>
            <span class="hud-value">${playerHp} / ${maxPlayerHp}</span>
          </div>
          
          <!-- Enemy HP -->
          <div class="hud-bar-container">
            <span class="hud-label">${step.enemyName}</span>
            <div class="hud-hp-track">
              <div class="hud-hp-fill enemy-hp" style="width: ${(enemyHp / maxEnemyHp) * 100}%"></div>
            </div>
            <span class="hud-value">${enemyHp} / ${maxEnemyHp}</span>
          </div>
        </div>

        <div class="battle-question-box">
          <div class="q-header">Question ${questionIndex + 1}</div>
          <div class="q-body" style="white-space: pre-line;">${currentQ.text}</div>
          
          <div class="battle-options-list">
            ${currentQ.options.map((opt, idx) => `
              <button class="battle-opt-btn" data-idx="${idx}">${opt}</button>
            `).join('')}
          </div>
          
          <!-- Feedback Drawer -->
          <div class="battle-feedback-drawer" id="battle-feedback" style="display: none;">
            <div class="feedback-title" id="fb-title"></div>
            <p class="feedback-desc" id="fb-desc"></p>
            <button class="action-btn next-q-btn" id="next-q-btn" style="width: 100%; margin-top: 0.8rem;">次の試練へ</button>
          </div>
        </div>
      `;

      // Bind option clicks
      const optBtns = battlePane.querySelectorAll('.battle-opt-btn');
      optBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const selectedIdx = parseInt(e.target.getAttribute('data-idx'));
          handleAnswer(selectedIdx, currentQ, optBtns);
        });
      });
    }

    function handleAnswer(selectedIdx, question, optBtns) {
      // Disable buttons
      optBtns.forEach(btn => btn.disabled = true);
      
      const feedbackDiv = battlePane.querySelector('#battle-feedback');
      const fbTitle = battlePane.querySelector('#fb-title');
      const fbDesc = battlePane.querySelector('#fb-desc');
      const nextBtn = battlePane.querySelector('#next-q-btn');
      
      const isCorrect = selectedIdx === question.answerIndex;
      
      if (isCorrect) {
        playCorrectSound();
        enemyHp = Math.max(0, enemyHp - 1);
        fbTitle.innerText = "✅ 正解！ (Très bien)";
        fbTitle.className = "feedback-title text-success";
        nextBtn.innerText = "次の試練へ";
        
        // Flash enemy HP track red as a visual hit effect
        const enemyFill = battlePane.querySelector('.enemy-hp');
        if (enemyFill) {
          enemyFill.classList.add('flash-white');
        }

        nextBtn.onclick = () => {
          questionIndex++;
          renderBattleScreen();
        };
      } else {
        playWrongSound();
        playHitSound();
        playerHp = Math.max(0, playerHp - step.enemyDamage);
        fbTitle.innerText = "❌ 不正解！";
        fbTitle.className = "feedback-title text-error";
        nextBtn.innerText = "もう一度挑戦する";
        
        // Add screen shake effect to the viewport
        viewport.classList.add('shake-vfx');
        setTimeout(() => viewport.classList.remove('shake-vfx'), 400);

        nextBtn.onclick = () => {
          renderBattleScreen(); // Redraw same screen to retry
        };
      }
      
      fbDesc.innerText = question.explanation;
      feedbackDiv.style.display = 'block';
    }

    renderBattleScreen();
  }

  function showReward(step) {
    dialogPane.style.display = 'none';
    battlePane.style.display = 'none';
    tutorialOverlay.style.display = 'none';
    sidebar.style.opacity = '0';
    sidebar.style.pointerEvents = 'none';
    rewardPane.style.display = 'block';

    // Clear character sprites
    const charLayer = container.querySelector('#rpg-character-layer');
    if (charLayer) charLayer.innerHTML = '';

    // Store clear flag
    localStorage.setItem(`cba_story_${episode.episodeId}_cleared`, 'true');

    rewardPane.innerHTML = `
      <div class="reward-card">
        <h2 style="font-family: var(--font-serif); color: var(--color-accent); font-size: 1.5rem; text-align: center;">🎉 Episode 1 Terminé !</h2>
        <p style="text-align: center; margin: 0.6rem 0; font-size: 0.95rem; color: var(--color-text-main);">エピソード「${episode.episodeTitle}」をクリアしました！</p>
        
        <div style="background: rgba(197, 168, 128, 0.1); border: 1px solid rgba(197, 168, 128, 0.3); border-radius: var(--radius-sm); padding: 1rem; margin: 1.2rem 0; display: flex; align-items: center; justify-content: center; gap: 1rem;">
          <span style="font-size: 2rem;">🏆</span>
          <div style="text-align: left;">
            <div style="font-weight: 700; color: var(--color-primary); font-size: 1rem;">+${step.xp} XP</div>
            <div style="font-size: 0.75rem; color: var(--color-text-muted);">アカデミー経験値獲得</div>
          </div>
        </div>
        
        <button class="action-btn claim-reward-btn" style="width: 100%; padding: 0.8rem; font-weight: 700;">拠点に戻る</button>
      </div>
    `;

    rewardPane.querySelector('.claim-reward-btn').addEventListener('click', () => {
      currentIndex++;
      nextStep();
    });
  }
}
