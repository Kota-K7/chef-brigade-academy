import { speakFrench } from '../utils/audio.js';
import { state, ensureQuizzesLoaded, ensureDataLoaded, navigateTo } from '../../app.js';

// ==========================================
// 補正設定 (Character adjustments)
// ==========================================
// キャラクターごとの表示サイズ倍率 (1.0 = 標準)
// 女将さんのサイズ比率を少し拡大するために、ここで倍率を設定できます。
const CHARACTER_SCALES = {
  proprietress: 1.5,
  kanetake: 1.45,
  saeki: 1.45,
  elodie: 1.45,
  gael: 1.45,
  jean_pierre: 1.45,
  "ピエール": 1.45
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
      <h2>🏰 Mode Histoire (ストーリー学習)</h2>
      <p class="subtitle">厨房でのキャリアストーリー、または歴史体験RPGを選択して学びます。</p>
    </div>
    
    <div class="chapter-list" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem;">
      <!-- Career Mode Card (First, for Beginner!) -->
      <div class="story-chapter-card active-chapter" style="display: flex; flex-direction: column; justify-content: space-between; border-left: 5px solid var(--color-accent);">
        <div>
          <div class="chapter-card-header">
            <span class="chapter-badge" style="background-color: var(--color-accent); color: white;">Beginner</span>
            <h3>第0章: 金竹満「はじまりへの招待」</h3>
          </div>
          <p class="chapter-desc">フランス料理店でのアルバイトから始まり、一人前の料理人へと成長していく修行ストーリーです。</p>
          
          <div class="episode-list" style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
            <div class="episode-row">
              <div class="episode-info">
                <h4>第1話: フランス料理店へようこそ</h4>
                <span class="play-time">⏱️ 5分 • A1基本挨拶 & 存在動詞</span>
              </div>
              <button class="action-btn play-episode-btn" data-chapter="career_0" data-episode="career_ep_0_1">For beginner</button>
            </div>
            
            <div class="episode-row" style="border-top: 1px dashed rgba(197, 168, 128, 0.2); padding-top: 0.8rem;">
              <div class="episode-info">
                <h4>第2話: 最初の注文</h4>
                <span class="play-time">⏱️ 5分 • 数字(1-20) & 複数名詞・冠詞</span>
              </div>
              <button class="action-btn play-episode-btn" data-chapter="career_0" data-episode="career_ep_0_2">For beginner</button>
            </div>
          </div>
        </div>
      </div>

      <!-- History RPG Card -->
      <div class="story-chapter-card active-chapter" style="display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div class="chapter-card-header">
            <span class="chapter-badge">Chapter 0</span>
            <h3>第0章: ガリア以前 - 始まりの地</h3>
          </div>
          <p class="chapter-desc">ガリア遠征以前の古代フランスを舞台に、生活の基礎挨拶やマルセイユ周辺の食文化を体験します。</p>
          
          <div class="episode-list" style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
            <div class="episode-row">
              <div class="episode-info">
                <h4>第1話: 目覚めと試練</h4>
                <span class="play-time">⏱️ 5分 • プロヴァンスの文化</span>
              </div>
              <button class="action-btn play-episode-btn" data-chapter="0" data-episode="ep_0_1">開始する</button>
            </div>
            
            <div class="episode-row" style="border-top: 1px dashed rgba(197, 168, 128, 0.2); padding-top: 0.8rem;">
              <div class="episode-info">
                <h4>第2話: 憧れの市場</h4>
                <span class="play-time">⏱️ 5分 • マルシェの語彙</span>
              </div>
              <button class="action-btn play-episode-btn" data-chapter="0" data-episode="ep_0_2">開始する</button>
            </div>
            
            <div class="episode-row" style="border-top: 1px dashed rgba(197, 168, 128, 0.2); padding-top: 0.8rem;">
              <div class="episode-info">
                <h4>第3話: 銀のペンダント</h4>
                <span class="play-time">⏱️ 5分 • 日常会話フレーズ</span>
              </div>
              <button class="action-btn play-episode-btn" data-chapter="0" data-episode="ep_0_3">開始する</button>
            </div>
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
    
    const filename = chapterNum === 'career_0' ? 'chapter_career_0.json' : `chapter_${chapterNum}.json`;
    const response = await fetch(`data/story/${filename}`);
    if (!response.ok) throw new Error("Story file could not be loaded");
    
    const chapterData = await response.json();
    const episode = chapterData.episodes.find(ep => ep.episodeId === episodeId);
    
    if (!episode) {
      throw new Error("Episode data not found in chapter file");
    }
    
    runSequenceEngine(container, episode, chapterNum, chapterData);
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
function runSequenceEngine(container, episode, chapterNum, chapterData) {
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

      // bg_camille_cry.webp, bg_after_battle.webp, bg_father.webp, bg_room.webp が背景のときはキャラクター写真を重ねて表示しない
      const bgValLower = bgVal.toLowerCase();
      const shouldSuppressSprites = bgValLower.includes('bg_camille_cry.webp') ||
                                    bgValLower.includes('bg_after_battle.webp') ||
                                    bgValLower.includes('bg_father.webp') ||
                                    bgValLower.includes('bg_room.webp');

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

    let refDataCached = null;

    async function loadBattleReference() {
      if (refDataCached) return refDataCached;
      try {
        const res = await fetch('data/grammar_reference.json');
        refDataCached = await res.json();
        return refDataCached;
      } catch (err) {
        console.error("Failed to load battle reference:", err);
        return [];
      }
    }

    async function toggleBattleReference(btn) {
      if (sidebar.style.opacity === '1') {
        sidebar.style.opacity = '0';
        sidebar.style.pointerEvents = 'none';
        btn.innerText = '📖 参考資料を表示';
      } else {
        sidebar.style.opacity = '1';
        sidebar.style.pointerEvents = 'auto';
        btn.innerText = '📖 参考資料を隠す';
        
        sidebar.innerHTML = `
          <h3>📖 参考資料 (Dictionnaire)</h3>
          <div style="text-align: center; margin: 2rem 0;">
            <div class="spinner" style="margin: 0 auto 0.5rem;"></div>
            <p style="font-size: 0.8rem; color: var(--color-text-muted);">読み込み中...</p>
          </div>
        `;
        
        const refs = await loadBattleReference();
        
        sidebar.innerHTML = `
          <h3 style="margin-bottom: 0.8rem;">📖 参考資料 (Dictionnaire)</h3>
          
          <select class="battle-ref-topic-select" style="width: 100%; padding: 0.5rem; border-radius: var(--radius-sm); border: 1px solid rgba(197,168,128,0.3); background: #ffffff; color: #1e293b; font-size: 0.85rem; margin-bottom: 1rem;">
            ${refs.map((ref, idx) => `
              <option value="${idx}">${ref.title_ja} (${ref.title_fr})</option>
            `).join('')}
          </select>
          
          <div class="battle-ref-content" style="max-height: 420px; overflow-y: auto; font-size: 0.8rem;"></div>
        `;
        
        const select = sidebar.querySelector('.battle-ref-topic-select');
        const contentDiv = sidebar.querySelector('.battle-ref-content');
        
        function displayRefTopic(idx) {
          const topic = refs[idx];
          if (!topic) return;
          
          let html = `<h4 style="color: var(--color-accent); border-bottom: 1px solid rgba(197,168,128,0.2); padding-bottom: 0.3rem; margin-bottom: 0.6rem;">${topic.title_ja} (${topic.title_fr})</h4>`;
          
          topic.sections.forEach(sec => {
            html += `<div style="margin-bottom: 1rem;">`;
            if (sec.title) {
              html += `<div style="font-weight: bold; font-size: 0.85rem; color: var(--color-primary); margin-bottom: 0.3rem;">${sec.title}</div>`;
            }
            if (sec.text) {
              html += `<p style="white-space: pre-line; margin-bottom: 0.5rem; line-height: 1.4;">${sec.text}</p>`;
            }
            if (sec.headers && sec.rows) {
              // Extract pronunciation columns
              const pronIndices = [];
              const updatedHeaders = sec.headers.map((h, hidx) => {
                if (h === '発音') {
                  pronIndices.push(hidx);
                  return '音声';
                }
                return h;
              });

              html += `
                <table style="width: 100%; border-collapse: collapse; margin: 0.5rem 0; font-size: 0.75rem;">
                  <thead>
                    <tr style="border-bottom: 2px solid rgba(197,168,128,0.3);">
                      ${updatedHeaders.map(h => `<th style="padding: 0.3rem; text-align: left; background: rgba(197,168,128,0.05);">${h}</th>`).join('')}
                    </tr>
                  </thead>
                  <tbody>
                    ${sec.rows.map(row => `
                      <tr style="border-bottom: 1px solid rgba(0,0,0,0.05);">
                        ${row.map((cell, cidx) => {
                          if (pronIndices.includes(cidx)) {
                            const frenchText = row[cidx - 1] ? row[cidx - 1].split('(')[0].trim() : '';
                            return `<td style="padding: 0.3rem; text-align: center;"><button class="ref-table-audio-btn" data-speak="${frenchText}" style="background: none; border: none; cursor: pointer; padding: 0; font-size: 0.85rem;">🔊</button></td>`;
                          }
                          return `<td style="padding: 0.3rem;">${cell}</td>`;
                        }).join('')}
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              `;
            }
            html += `</div>`;
          });
          
          contentDiv.innerHTML = html;
          
          contentDiv.querySelectorAll('.ref-table-audio-btn').forEach(audioBtn => {
            audioBtn.addEventListener('click', (e) => {
              e.stopPropagation();
              const text = audioBtn.getAttribute('data-speak');
              if (text && typeof speakFrench === 'function') {
                speakFrench(text);
              } else if (text) {
                const u = new SpeechSynthesisUtterance(text);
                u.lang = 'fr-FR';
                window.speechSynthesis.speak(u);
              }
            });
          });
        }
        
        let initialTopicIdx = 0;
        if (episode.episodeId === 'career_ep_0_1') {
          const idx = refs.findIndex(r => r.id === 'ref_essential_irregular_verbs');
          if (idx !== -1) initialTopicIdx = idx;
        } else if (episode.episodeId === 'career_ep_0_2') {
          const idx = refs.findIndex(r => r.id === 'ref_time_expressions');
          if (idx !== -1) initialTopicIdx = idx;
        }
        
        select.value = initialTopicIdx;
        displayRefTopic(initialTopicIdx);
        
        select.addEventListener('change', (e) => {
          displayRefTopic(parseInt(e.target.value));
        });
      }
    }

    function renderBattleScreen() {
      if (enemyHp <= 0) {
        // Player wins
        playCorrectSound();
        // Hide sidebar
        sidebar.style.opacity = '0';
        sidebar.style.pointerEvents = 'none';
        
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
        // Hide sidebar
        sidebar.style.opacity = '0';
        sidebar.style.pointerEvents = 'none';
        
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
        if (enemyHp > 0) {
          enemyHp = 0;
          renderBattleScreen();
        }
        return;
      }

      const currentQ = questions[questionIndex];

      const hudHtml = `
        <div class="battle-hud">
          <div class="hud-bar-container">
            <span class="hud-label">VOUS (あなた)</span>
            <div class="hud-hp-track">
              <div class="hud-hp-fill player-hp" style="width: ${(playerHp / maxPlayerHp) * 100}%"></div>
            </div>
            <span class="hud-value">${playerHp} / ${maxPlayerHp}</span>
          </div>
          
          <div class="hud-bar-container">
            <span class="hud-label">${step.enemyName}</span>
            <div class="hud-hp-track">
              <div class="hud-hp-fill enemy-hp" style="width: ${(enemyHp / maxEnemyHp) * 100}%"></div>
            </div>
            <span class="hud-value">${enemyHp} / ${maxEnemyHp}</span>
          </div>
        </div>
      `;

      if (currentQ.type === 'typing') {
        // Render Typing input field
        battlePane.innerHTML = `
          ${hudHtml}
          <div class="battle-question-box">
            <div class="q-header">Question ${questionIndex + 1} (スペル入力)</div>
            <div class="q-body" style="white-space: pre-line; line-height: 1.4; font-size: 0.95rem;">${currentQ.text}</div>
            
            <div class="battle-typing-area" style="margin: 1rem 0; display: flex; flex-direction: column; gap: 0.6rem;">
              <input type="text" class="battle-input-field" placeholder="フランス語の答えを入力してください..." style="width: 100%; padding: 0.7rem; border-radius: var(--radius-sm); border: 2px solid rgba(197,168,128,0.4); background: rgba(255,255,255,0.06); color: white; font-size: 1rem; text-align: center; outline: none; transition: border-color 0.2s;" />
              <button class="action-btn submit-typing-btn" style="width: 100%; padding: 0.75rem; font-weight: bold; background: var(--color-accent); color: white; border: none; border-radius: var(--radius-sm); cursor: pointer;">回答を送信</button>
              <button class="action-btn toggle-battle-ref-btn" style="width: 100%; padding: 0.5rem; font-size: 0.8rem; background: #374151; color: white; border: none; border-radius: var(--radius-sm); cursor: pointer;">📖 参考資料を表示</button>
            </div>
            
            <div class="battle-feedback-drawer" id="battle-feedback" style="display: none;">
              <div class="feedback-title" id="fb-title"></div>
              <p class="feedback-desc" id="fb-desc"></p>
              <button class="action-btn next-q-btn" id="next-q-btn" style="width: 100%; margin-top: 0.8rem;">次の試練へ</button>
            </div>
          </div>
        `;

        const inputField = battlePane.querySelector('.battle-input-field');
        const submitBtn = battlePane.querySelector('.submit-typing-btn');
        const toggleRefBtn = battlePane.querySelector('.toggle-battle-ref-btn');

        setTimeout(() => inputField.focus(), 150);

        inputField.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' && !submitBtn.disabled) {
            submitBtn.click();
          }
        });

        submitBtn.addEventListener('click', () => {
          const userVal = inputField.value;
          handleTypingAnswer(userVal, currentQ, inputField, submitBtn);
        });

        toggleRefBtn.addEventListener('click', () => {
          toggleBattleReference(toggleRefBtn);
        });
      } else {
        // Render Multiple Choice question
        battlePane.innerHTML = `
          ${hudHtml}
          <div class="battle-question-box">
            <div class="q-header">Question ${questionIndex + 1}</div>
            <div class="q-body" style="white-space: pre-line;">${currentQ.text}</div>
            
            <div class="battle-options-list">
              ${currentQ.options.map((opt, idx) => `
                <button class="battle-opt-btn" data-idx="${idx}">${opt}</button>
              `).join('')}
            </div>

            <button class="action-btn toggle-battle-ref-btn" style="width: 100%; padding: 0.5rem; font-size: 0.8rem; background: #374151; color: white; border: none; border-radius: var(--radius-sm); cursor: pointer; margin-top: 0.8rem;">📖 参考資料を表示</button>
            
            <div class="battle-feedback-drawer" id="battle-feedback" style="display: none;">
              <div class="feedback-title" id="fb-title"></div>
              <p class="feedback-desc" id="fb-desc"></p>
              <button class="action-btn next-q-btn" id="next-q-btn" style="width: 100%; margin-top: 0.8rem;">次の試練へ</button>
            </div>
          </div>
        `;

        const optBtns = battlePane.querySelectorAll('.battle-opt-btn');
        const toggleRefBtn = battlePane.querySelector('.toggle-battle-ref-btn');

        optBtns.forEach(btn => {
          btn.addEventListener('click', (e) => {
            const selectedIdx = parseInt(e.target.getAttribute('data-idx'));
            handleAnswer(selectedIdx, currentQ, optBtns);
          });
        });

        toggleRefBtn.addEventListener('click', () => {
          toggleBattleReference(toggleRefBtn);
        });
      }
    }

    function handleAnswer(selectedIdx, question, optBtns) {
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
        
        viewport.classList.add('shake-vfx');
        setTimeout(() => viewport.classList.remove('shake-vfx'), 400);

        nextBtn.onclick = () => {
          renderBattleScreen();
        };
      }
      
      fbDesc.innerText = question.explanation;
      feedbackDiv.style.display = 'block';
    }

    function handleTypingAnswer(userVal, question, inputField, submitBtn) {
      inputField.disabled = true;
      submitBtn.disabled = true;
      
      const feedbackDiv = battlePane.querySelector('#battle-feedback');
      const fbTitle = battlePane.querySelector('#fb-title');
      const fbDesc = battlePane.querySelector('#fb-desc');
      const nextBtn = battlePane.querySelector('#next-q-btn');
      
      // Normalize comparison (lowercase, remove excess punctuation)
      const cleanUserVal = userVal.toLowerCase().replace(/[.,!?;:・]/g, "").trim();
      const isCorrect = question.acceptedAnswers.some(ans => {
        return cleanUserVal === ans.toLowerCase().replace(/[.,!?;:・]/g, "").trim();
      });
      
      if (isCorrect) {
        playCorrectSound();
        enemyHp = Math.max(0, enemyHp - 1);
        fbTitle.innerText = "✅ 正解！ (Très bien)";
        fbTitle.className = "feedback-title text-success";
        nextBtn.innerText = "次の試練へ";
        
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
        playerHp = Math.max(0, playerHp - 2); // typing mistake causes 2 damage
        fbTitle.innerText = `❌ 不正解！ (正解: ${question.acceptedAnswers[0]})`;
        fbTitle.className = "feedback-title text-error";
        nextBtn.innerText = "もう一度挑戦する";
        
        viewport.classList.add('shake-vfx');
        setTimeout(() => viewport.classList.remove('shake-vfx'), 400);

        nextBtn.onclick = () => {
          renderBattleScreen();
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

    // 1. Determine Reward Image URL
    const isCareer = episode.episodeId.startsWith('career_');
    const rewardImgUrl = isCareer 
      ? 'assets/story/career_story/group_photo.webp'
      : 'assets/story/chapter_0/bg_after_battle.webp';

    // 2. Render Stage 1: Reward Image Presentation
    rewardPane.innerHTML = `
      <div class="reward-card animate-fade-in">
        <h2 style="font-family: var(--font-serif); color: var(--color-accent); font-size: 1.4rem; text-align: center; margin-bottom: 0.5rem;">🎉 Épisode Terminé !</h2>
        <p style="text-align: center; margin-bottom: 1rem; font-size: 0.9rem; color: var(--color-text-main);">エピソード「${episode.episodeTitle}」をクリアしました！</p>
        
        <div class="reward-photo-frame" style="width: 100%; border-radius: var(--radius-md); overflow: hidden; border: 2px solid var(--color-accent); margin-bottom: 1rem; box-shadow: 0 4px 10px rgba(0,0,0,0.15);">
          <img src="${rewardImgUrl}" alt="Reward Image" style="width: 100%; height: auto; display: block;" />
        </div>
        
        <div style="background: rgba(197, 168, 128, 0.08); border: 1px solid rgba(197, 168, 128, 0.25); border-radius: var(--radius-sm); padding: 0.8rem; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; gap: 0.8rem;">
          <span style="font-size: 1.8rem;">🏆</span>
          <div style="text-align: left;">
            <div style="font-weight: 700; color: var(--color-primary); font-size: 0.95rem;">+${step.xp} XP</div>
            <div style="font-size: 0.7rem; color: var(--color-text-muted);">アカデミー経験値獲得</div>
          </div>
        </div>
        
        <button class="action-btn claim-reward-btn" style="width: 100%; padding: 0.8rem; font-weight: 700;">報酬を受け取る</button>
      </div>
    `;

    rewardPane.querySelector('.claim-reward-btn').addEventListener('click', () => {
      // Trigger Stage 2: Stamp Animation
      triggerStampSequence();
    });

    function triggerStampSequence() {
      // Clear reward card
      rewardPane.innerHTML = `
        <div class="completion-stamp-wrapper">
          <div class="mission-complete-banner animate-slide-in">MISSION COMPLETE</div>
          <div class="stamp-ink-overlay" style="display: none;">
            <svg viewBox="0 0 120 120" style="width: 160px; height: 160px;">
              <circle cx="60" cy="60" r="50" fill="none" stroke="#e63946" stroke-width="4.5" stroke-dasharray="140" opacity="0.85" />
              <circle cx="60" cy="60" r="45" fill="none" stroke="#e63946" stroke-width="2.5" opacity="0.85" />
              <!-- App logo stamp design (chef hat + stars) -->
              <path d="M 45 46 C 45 35, 55 30, 60 35 C 65 30, 75 35, 75 46 Z" fill="none" stroke="#e63946" stroke-width="3" stroke-linecap="round" />
              <rect x="41" y="48" width="38" height="6" fill="none" stroke="#e63946" stroke-width="2.5" rx="1.5" />
              <text x="60" y="70" text-anchor="middle" font-size="8.5" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="900" fill="#e63946" letter-spacing="0.5">CHEF BRIGADE</text>
              <text x="60" y="81" text-anchor="middle" font-size="7.5" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="900" fill="#e63946" letter-spacing="0.5">ACADEMY</text>
              <text x="60" y="93" text-anchor="middle" font-size="8" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="900" fill="#e63946">APPROVED</text>
            </svg>
          </div>
        </div>
      `;

      // Animate stamp stomp down
      const stampOverlay = rewardPane.querySelector('.stamp-ink-overlay');
      setTimeout(() => {
        stampOverlay.style.display = 'flex';
        stampOverlay.classList.add('animate-stamp-stomp');
        
        // Play hit sound and shake screen
        playHitSound();
        viewport.classList.add('shake-vfx');
        setTimeout(() => viewport.classList.remove('shake-vfx'), 450);
      }, 700);

      // Transition to Stage 3: End Screen Actions
      setTimeout(() => {
        renderEndScreen();
      }, 2300);
    }

    const defShowToast = function(message) {
      let toast = document.querySelector('.cba-toast');
      if (toast) toast.remove();
      
      toast = document.createElement('div');
      toast.className = 'cba-toast';
      toast.innerText = message;
      document.body.appendChild(toast);
      
      // Auto dismiss
      setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 400);
      }, 2500);
    };

    function renderEndScreen() {
      // Find index of current episode in chapterData to determine next episode
      const currentIdx = chapterData && chapterData.episodes 
        ? chapterData.episodes.findIndex(ep => ep.episodeId === episode.episodeId)
        : -1;
      const nextEp = currentIdx !== -1 && chapterData.episodes[currentIdx + 1]
        ? chapterData.episodes[currentIdx + 1]
        : null;

      rewardPane.innerHTML = `
        <div class="reward-card end-screen-card animate-fade-in">
          <h2 style="font-family: var(--font-serif); color: var(--color-primary); font-size: 1.4rem; text-align: center; margin-bottom: 0.5rem;">🎉 Félicitations !</h2>
          <p style="text-align: center; margin-bottom: 1.5rem; font-size: 0.9rem; color: var(--color-text-muted);">エピソード「${episode.episodeTitle}」をすべてクリアしました！</p>
          
          <div class="end-actions-wrapper" style="display: flex; flex-direction: column; gap: 1rem; width: 100%;">
            <!-- Next Episode Button -->
            ${nextEp ? `
              <button class="action-btn next-ep-btn" style="width: 100%; padding: 0.9rem; font-weight: 700; background: var(--color-accent); color: white;">
                👉 次の話へ進む (${nextEp.episodeTitle})
              </button>
            ` : `
              <button class="action-btn next-ep-btn" style="width: 100%; padding: 0.9rem; font-weight: 700;" disabled>
                🏆 全話クリア！
              </button>
            `}
            
            <!-- Home Button -->
            <button class="action-btn home-btn" style="width: 100%; padding: 0.9rem; font-weight: 700; background: #374151; color: white;">
              🏠 ホームに戻る
            </button>
            
            <!-- Share Button -->
            <button class="action-btn share-btn" style="width: 100%; padding: 0.9rem; font-weight: 700; background: #2563eb; color: white;">
              🔗 友達へ共有する
            </button>
          </div>
        </div>
      `;

      // Bind events
      const homeBtn = rewardPane.querySelector('.home-btn');
      const shareBtn = rewardPane.querySelector('.share-btn');
      const nextBtn = rewardPane.querySelector('.next-ep-btn');

      homeBtn.addEventListener('click', () => {
        navigateTo('home');
      });

      if (nextEp && nextBtn) {
        nextBtn.addEventListener('click', () => {
          startEpisode(container, chapterNum, nextEp.episodeId);
        });
      }

      shareBtn.addEventListener('click', () => {
        const shareText = `CHEF BRIGADE ACADEMYでフランス語と料理の修行中！「${episode.episodeTitle}」をクリアしました！みんなも一緒に楽しく学習しよう！ #ChefBrigadeAcademy`;
        
        if (navigator.share) {
          navigator.share({
            title: 'Chef Brigade Academy',
            text: shareText,
            url: window.location.href
          }).catch(err => {
            console.log("Error sharing:", err);
          });
        } else {
          // Fallback: copy to clipboard
          navigator.clipboard.writeText(shareText).then(() => {
            defShowToast("シェア用テキストをクリップボードにコピーしました！");
          }).catch(err => {
            console.error("Could not copy text: ", err);
          });
        }
      });
    }
  }
}
