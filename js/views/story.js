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
      <h2>🏰 Mode RPG (学習RPG)</h2>
      <p class="subtitle">フランス語学習のための歴史体験ロールプレイング、または修行ストーリーを選択します。</p>
    </div>

    <!-- RPG Sub-mode Tabs -->
    <div class="rpg-mode-tabs" style="display: flex; gap: 0.8rem; justify-content: center; margin-bottom: 1.5rem; background: rgba(0,0,0,0.15); padding: 0.4rem; border-radius: var(--radius-sm); border: 1px solid rgba(197, 168, 128, 0.15); max-width: 480px; margin-left: auto; margin-right: auto;">
      <button class="action-btn mode-tab-btn active-tab" data-mode="history" style="flex: 1; padding: 0.6rem 1.2rem; font-weight: bold; border-radius: var(--radius-sm); border: none; cursor: pointer; transition: all 0.2s; background: var(--color-primary); color: white; box-shadow: var(--shadow-sm);">🏰 History (歴史体験)</button>
      <button class="action-btn mode-tab-btn" data-mode="story" style="flex: 1; padding: 0.6rem 1.2rem; font-weight: bold; border-radius: var(--radius-sm); border: none; cursor: pointer; transition: all 0.2s; background: none; color: var(--color-text-muted);">👨‍🍳 Story (修行ストーリー)</button>
    </div>
    
    <div class="chapter-list" style="display: flex; justify-content: center; gap: 1.5rem; max-width: 600px; margin: 0 auto;">
      <!-- Career Mode Card (Story Tab) -->
      <div id="rpg-card-story" class="story-chapter-card active-chapter" style="display: none; width: 100%; flex-direction: column; gap: 1.5rem;">
        <!-- Chapter 0 -->
        <div style="padding-left: 1rem; background: rgba(255,255,255,0.02); padding: 1rem; border-radius: var(--radius-md); border: 1px solid rgba(197, 168, 128, 0.15); border-left: 5px solid var(--color-accent);">
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
              <button class="action-btn play-episode-btn" data-chapter="career_0" data-episode="career_ep_0_1">開始する</button>
            </div>
            
            <div class="episode-row" style="border-top: 1px dashed rgba(197, 168, 128, 0.2); padding-top: 0.8rem;">
              <div class="episode-info">
                <h4>第2話: 最初の注文</h4>
                <span class="play-time">⏱️ 5分 • 数字(1-20) & 複数名詞・冠詞</span>
              </div>
              <button class="action-btn play-episode-btn" data-chapter="career_0" data-episode="career_ep_0_2">開始する</button>
            </div>
          </div>
        </div>

        <!-- Chapter 1 -->
        <div style="padding-left: 1rem; background: rgba(255,255,255,0.02); padding: 1rem; border-radius: var(--radius-md); border: 1px solid rgba(197, 168, 128, 0.15); border-left: 5px solid var(--color-primary);">
          <div class="chapter-card-header">
            <span class="chapter-badge" style="background-color: var(--color-primary); color: white;">A1 Practice</span>
            <h3>第1章: 佐伯「厨房の基本動作」</h3>
          </div>
          <p class="chapter-desc">厨房の共通言語である動詞と疑問文、形容詞の使い方を学びます。</p>
          
          <div class="episode-list" style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
            <div class="episode-row">
              <div class="episode-info">
                <h4>第1-1話: 料理人の言葉の型</h4>
                <span class="play-time">⏱️ 5分 • 動詞3グループ & 規則・不規則動詞</span>
              </div>
              <button class="action-btn play-episode-btn" data-chapter="career_1" data-episode="career_ep_1_1">開始する</button>
            </div>
            
            <div class="episode-row" style="border-top: 1px dashed rgba(197, 168, 128, 0.2); padding-top: 0.8rem;">
              <div class="episode-info">
                <h4>第1-2話: 問いかけと指示の交差点</h4>
                <span class="play-time">⏱️ 5分 • 疑問文・疑問詞 & 所有・指示形容詞</span>
              </div>
              <button class="action-btn play-episode-btn" data-chapter="career_1" data-episode="career_ep_1_2">開始する</button>
            </div>
            
            <div class="episode-row" style="border-top: 1px dashed rgba(197, 168, 128, 0.2); padding-top: 0.8rem;">
              <div class="episode-info">
                <h4>第1-3話: 料理を彩る言葉たち</h4>
                <span class="play-time">⏱️ 5分 • 形容詞の性数一致・位置 & 部分冠詞</span>
              </div>
              <button class="action-btn play-episode-btn" data-chapter="career_1" data-episode="career_ep_1_3">開始する</button>
            </div>
          </div>
        </div>

        <!-- Chapter 2 -->
        <div style="padding-left: 1rem; background: rgba(255,255,255,0.02); padding: 1rem; border-radius: var(--radius-md); border: 1px solid rgba(197, 168, 128, 0.15); border-left: 5px solid #e056fd;">
          <div class="chapter-card-header">
            <span class="chapter-badge" style="background-color: #e056fd; color: white;">A1 Practice</span>
            <h3>第2章: エロディ「厨房のテンポと彩り」</h3>
          </div>
          <p class="chapter-desc">前菜業務を通し、前置詞の縮約、指示・号令の命令形、時間表現（近接未来・過去）を学びます。</p>
          
          <div class="episode-list" style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
            <div class="episode-row">
              <div class="episode-info">
                <h4>第2-1話: 食材と料理の架け橋</h4>
                <span class="play-time">⏱️ 5分 • 定冠詞の縮約 & 提示表現 c'est/ce sont</span>
              </div>
              <button class="action-btn play-episode-btn" data-chapter="career_2" data-episode="career_ep_2_1">開始する</button>
            </div>
            
            <div class="episode-row" style="border-top: 1px dashed rgba(197, 168, 128, 0.2); padding-top: 0.8rem;">
              <div class="episode-info">
                <h4>第2-2話: 厨房に響く号令</h4>
                <span class="play-time">⏱️ 5分 • 命令形 & 目的語人称代名詞</span>
              </div>
              <button class="action-btn play-episode-btn" data-chapter="career_2" data-episode="career_ep_2_2">開始する</button>
            </div>
            
            <div class="episode-row" style="border-top: 1px dashed rgba(197, 168, 128, 0.2); padding-top: 0.8rem;">
              <div class="episode-info">
                <h4>第2-3話: 料理人として説明する</h4>
                <span class="play-time">⏱️ 5分 • 近接未来・過去 & 代名動詞（受動）</span>
              </div>
              <button class="action-btn play-episode-btn" data-chapter="career_2" data-episode="career_ep_2_3">開始する</button>
            </div>
          </div>
        </div>
      </div>

      <!-- History RPG Card (History Tab) -->
      <div id="rpg-card-history" class="story-chapter-card active-chapter" style="display: flex; width: 100%; flex-direction: column; justify-content: space-between;">
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

  // Bind Tab switching logic
  const tabBtns = container.querySelectorAll('.mode-tab-btn');
  const historyCard = container.querySelector('#rpg-card-history');
  const storyCard = container.querySelector('#rpg-card-story');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => {
        b.classList.remove('active-tab');
        b.style.background = 'none';
        b.style.color = 'var(--color-text-muted)';
        b.style.boxShadow = 'none';
      });

      btn.classList.add('active-tab');
      btn.style.background = 'var(--color-primary)';
      btn.style.color = 'white';
      btn.style.boxShadow = 'var(--shadow-sm)';

      const mode = btn.getAttribute('data-mode');
      if (mode === 'history') {
        historyCard.style.display = 'flex';
        storyCard.style.display = 'none';
      } else {
        historyCard.style.display = 'none';
        storyCard.style.display = 'flex';
      }
    });
  });
}

// Load and start visual novel sequence
async function startEpisode(container, chapterNum, episodeId) {
  try {
    container.innerHTML = `<div class="story-loader"><div class="spinner"></div><p>物語を読み込んでいます...</p></div>`;
    
    const isCareer = chapterNum.startsWith('career_');
    const filePath = isCareer ? `rpg/story/chapter_${chapterNum}.json` : `rpg/history/chapter_${chapterNum}.json`;
    const [storyRes, qDbRes, refRes] = await Promise.all([
      fetch(filePath),
      fetch('rpg/questions_db.json'),
      fetch('data/grammar_reference.json').catch(() => null)
    ]);
    if (!storyRes.ok) throw new Error("Story file could not be loaded");
    if (!qDbRes.ok) throw new Error("Questions database could not be loaded");
    
    const chapterData = await storyRes.json();
    const questionsDb = await qDbRes.json();
    let grammarRefs = [];
    if (refRes && refRes.ok) {
      grammarRefs = await refRes.json();
    }
    state.questionsDb = questionsDb;
    state.grammarRefs = grammarRefs;
    
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
        <div id="rpg-tutorial-overlay" class="rpg-overlay" style="display: none; flex-direction: column;"></div>
        
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
    
    tutorialOverlay.style.display = 'flex';
    tutorialOverlay.style.flexDirection = 'column';
    
    // Helper to extract French text from columns to read aloud
    function getFrenchTextToSpeak(row, headers) {
      const frIdx = headers.findIndex(h => h.includes("フランス語") || h.includes("Pronom") || h.includes("Exemple") || h.includes("活用形"));
      if (frIdx !== -1) {
        if (headers[frIdx].includes("活用形")) {
          const subjectIdx = headers.findIndex(h => h.includes("人称") || h.includes("主語"));
          if (subjectIdx !== -1) {
            const subj = row[subjectIdx].split('(')[0].split('（')[0].trim();
            const conj = row[frIdx].trim();
            return `${subj} ${conj}`;
          }
        }
        return row[frIdx].split('(')[0].split('（')[0].trim();
      }
      return row[0].split('(')[0].split('（')[0].trim();
    }

    // Helper to speak using browser speech synthesis
    function speakText(text) {
      if (!text) return;
      if (typeof speakFrench === 'function') {
        speakFrench(text);
      } else {
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'fr-FR';
        window.speechSynthesis.speak(u);
      }
    }

    // Helper to parse table and replace "発音" with a speak button
    function buildTableHtml(headers, rows) {
      const cleanHeaders = [...headers];
      const pronIdx = headers.findIndex(h => h.includes("発音") || h.includes("Pronunciation"));
      
      if (pronIdx !== -1) {
        cleanHeaders[pronIdx] = "音声";
      }
      
      return `
        <table class="tutorial-table" style="width: 100%; border-collapse: collapse; margin-top: 0.4rem; margin-bottom: 0.6rem; font-size: 0.8rem; box-shadow: var(--shadow-sm); border-radius: var(--radius-sm); overflow: hidden; border: 1px solid rgba(197, 168, 128, 0.2);">
           <thead>
             <tr style="border-bottom: 2px solid rgba(197, 168, 128, 0.3); background: rgba(197, 168, 128, 0.08); color: var(--color-primary);">
               ${cleanHeaders.map(h => `<th style="padding: 0.4rem; text-align: left; font-weight: 600;">${h}</th>`).join('')}
             </tr>
           </thead>
           <tbody>
             ${rows.map(row => {
               const cells = row.map((cell, cidx) => {
                 if (cidx === pronIdx) {
                   const speakText = getFrenchTextToSpeak(row, headers);
                   return `<td style="padding: 0.4rem; text-align: center;"><button class="play-audio-btn" data-french="${speakText}" style="background: none; border: none; cursor: pointer; font-size: 1.15rem; padding: 2px; line-height: 1; transition: transform 0.1s;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">🔊</button></td>`;
                 }
                 return `<td style="padding: 0.4rem; line-height: 1.4;">${cell}</td>`;
               });
               return `<tr style="border-bottom: 1px solid rgba(197, 168, 128, 0.1); background: rgba(255,255,255,0.02);">${cells.join('')}</tr>`;
             }).join('')}
           </tbody>
         </table>
      `;
    }

    // Helper to render a reference section
    function renderRefSection(section) {
      if (!section) return '';
      let html = '';
      if (section.title) {
        html += `<div class="ref-sec-title" style="font-weight: bold; margin-top: 0.6rem; margin-bottom: 0.3rem; color: var(--color-primary); font-size: 0.85rem;">${section.title}</div>`;
      }
      if (section.text) {
        html += `<p style="line-height: 1.4; margin-bottom: 0.4rem; font-size: 0.8rem; color: var(--color-text-main);">${section.text}</p>`;
      }
      if (section.type === 'table' && section.headers && section.rows) {
        html += buildTableHtml(section.headers, section.rows);
      } else if (section.type === 'info') {
        html += `
          <div class="ref-sec-info-box" style="background: rgba(197, 168, 128, 0.08); border-left: 4px solid var(--color-accent); padding: 0.5rem; margin-top: 0.4rem; margin-bottom: 0.6rem; border-radius: 0 var(--radius-sm) var(--radius-sm) 0; font-size: 0.8rem; line-height: 1.45;">
            ${section.content_ja ? `<div style="font-weight: 500;">${section.content_ja}</div>` : ''}
            ${section.content_fr ? `<div style="color: var(--color-text-muted); font-size: 0.75rem; margin-top: 0.2rem;">${section.content_fr}</div>` : ''}
          </div>
        `;
      }
      return html;
    }

    function bindAudioButtons(targetContainer) {
      targetContainer.querySelectorAll('.play-audio-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const text = btn.getAttribute('data-french');
          speakText(text);
        });
      });
    }

    if (step.targets && step.targets.length > 0) {
      // 1. Goal Step (Restricted to <= 360px height to prevent overflow/clipping)
      tutorialOverlay.innerHTML = `
        <div class="tutorial-card" style="max-width: 600px; width: 95%; max-height: 360px; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box; padding: 1rem 1.2rem;">
          <div>
            <h3 style="font-family: var(--font-serif); color: var(--color-primary); border-bottom: 2px solid var(--color-accent); padding-bottom: 0.4rem; margin-top: 0; margin-bottom: 0.6rem; font-size: 1.15rem;">📖 ${step.title || '今日の学習目標'}</h3>
            ${step.goal ? `<p class="tutorial-goal" style="font-weight: bold; margin: 0.5rem 0; color: var(--color-accent); font-size: 0.85rem;">${step.goal}</p>` : ''}
            <div class="tutorial-targets-container" style="background: rgba(197, 168, 128, 0.05); padding: 0.8rem; border-radius: var(--radius-md); border: 1px solid rgba(197,168,128,0.2); text-align: left; margin: 0.5rem 0; box-shadow: var(--shadow-sm); overflow-y: auto; max-height: 180px;">
              <ul style="list-style: none; padding-left: 0; display: flex; flex-direction: column; gap: 0.6rem; margin: 0;">
                ${step.targets.map(t => `<li style="display: flex; gap: 0.4rem; line-height: 1.4; font-size: 0.85rem; font-weight: 500;"><span style="color: var(--color-accent);">🎯</span><span>${t}</span></li>`).join('')}
              </ul>
            </div>
          </div>
          <button class="action-btn start-tut-btn" style="width: 100%; padding: 0.6rem; font-weight: 700; margin-top: 0.6rem; font-size: 0.9rem;">冒険を開始する</button>
        </div>
      `;
      
      tutorialOverlay.querySelector('.start-tut-btn').addEventListener('click', () => {
        tutorialOverlay.style.display = 'none';
        currentIndex++;
        nextStep();
      });
      
    } else if (step.pages && step.pages.length > 0) {
      // 2. Paginated Explanation Step (Restricted to <= 280px card height, with start-battle button below the card)
      tutorialOverlay.innerHTML = `
        <div class="tutorial-card" style="max-width: 650px; width: 95%; max-height: 280px; height: 74%; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box; padding: 0.8rem 1.2rem; margin-bottom: 0;">
          <div>
            <h3 style="font-family: var(--font-serif); color: var(--color-primary); margin-top: 0; margin-bottom: 0.3rem; font-size: 1.1rem; line-height: 1.2;">📖 ${step.title || '事前解説'}</h3>
            ${step.goal ? `<p class="tutorial-goal" style="font-size: 0.75rem; color: var(--color-text-muted); margin: 0 0 0.4rem 0; border-bottom: 1px dashed rgba(197, 168, 128, 0.2); padding-bottom: 0.2rem; line-height: 1.2;">${step.goal}</p>` : ''}
            
            <div class="tutorial-page-content" style="overflow-y: auto; max-height: 150px; padding: 0.3rem; text-align: left; border-radius: var(--radius-sm); border: 1px solid rgba(0,0,0,0.05); background: rgba(0,0,0,0.02); min-height: 110px; box-sizing: border-box;">
              <!-- Dynamic page content will be injected here -->
            </div>
          </div>
          
          <div class="tutorial-pager" style="display: flex; align-items: center; justify-content: center; gap: 1.2rem; margin-top: 0.4rem; padding-top: 0.2rem; border-top: 1px solid rgba(0,0,0,0.05); user-select: none;">
            <span class="prev-page-btn" style="cursor: pointer; font-size: 1.2rem; transition: transform 0.1s; color: var(--color-primary);" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">◀</span>
            <span style="font-size: 0.8rem; font-weight: bold; color: var(--color-text-muted); min-width: 75px; text-align: center;">Page <span id="tut-page-curr">1</span> / <span id="tut-page-total">${step.pages.length}</span></span>
            <span class="next-page-btn" style="cursor: pointer; font-size: 1.2rem; transition: transform 0.1s; color: var(--color-primary);" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">▶</span>
          </div>
        </div>
        <button class="action-btn start-battle-btn" style="display: none; width: 90%; max-width: 320px; padding: 0.65rem 1rem; font-weight: bold; margin-top: 0.8rem; background: var(--color-accent); font-size: 0.95rem; box-shadow: var(--shadow-md); border-radius: var(--radius-sm); border: none; color: white; cursor: pointer; text-shadow: 1px 1px 2px rgba(0,0,0,0.3); transition: transform 0.15s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">練習問題に挑戦する ⚔️</button>
      `;
      
      const prevBtn = tutorialOverlay.querySelector('.prev-page-btn');
      const nextBtn = tutorialOverlay.querySelector('.next-page-btn');
      const startBattleBtn = tutorialOverlay.querySelector('.start-battle-btn');
      let currentPage = 0;
      
      function renderPage(pageIdx) {
        const page = step.pages[pageIdx];
        const pageContentDiv = tutorialOverlay.querySelector('.tutorial-page-content');
        
        let pageHtml = `<h4 style="color: var(--color-accent); font-family: var(--font-serif); font-size: 0.95rem; margin-top: 0; margin-bottom: 0.3rem; border-bottom: 1px solid rgba(197, 168, 128, 0.15); padding-bottom: 0.15rem; line-height: 1.25;">${page.title}</h4>`;
        
        if (page.type === 'custom') {
          if (page.text) {
            pageHtml += `<p style="white-space: pre-line; line-height: 1.4; font-size: 0.8rem; margin: 0 0 0.4rem 0; color: var(--color-text-main);">${page.text}</p>`;
          }
          if (page.headers && page.rows) {
            pageHtml += buildTableHtml(page.headers, page.rows);
          }
        } else if (page.referenceTopicId) {
          const topic = state.grammarRefs ? state.grammarRefs.find(r => r.id === page.referenceTopicId) : null;
          if (topic) {
            if (topic.definition_ja) {
              pageHtml += `<p style="font-size: 0.75rem; color: var(--color-text-main); font-weight: 500; margin: 0 0 0.4rem 0; line-height: 1.4;">${topic.definition_ja}</p>`;
            }
            if (page.sectionIndices && page.sectionIndices.length > 0) {
              page.sectionIndices.forEach(secIdx => {
                const sec = topic.sections[secIdx];
                if (sec) {
                  pageHtml += renderRefSection(sec);
                }
              });
            } else if (topic.sections) {
              topic.sections.forEach(sec => {
                pageHtml += renderRefSection(sec);
              });
            }
          } else {
            pageHtml += `<p style="font-size: 0.8rem; color: var(--color-error);">解説データが見つかりませんでした。(${page.referenceTopicId})</p>`;
          }
        }
        
        pageContentDiv.innerHTML = pageHtml;
        tutorialOverlay.querySelector('#tut-page-curr').innerText = pageIdx + 1;
        
        // Bind speak button clicks
        bindAudioButtons(pageContentDiv);
        
        // Navigation states (using visibility to prevent layout shifts)
        prevBtn.style.visibility = pageIdx === 0 ? 'hidden' : 'visible';
        nextBtn.style.visibility = pageIdx === step.pages.length - 1 ? 'hidden' : 'visible';
        
        // Show start battle button below card only on final page
        if (pageIdx === step.pages.length - 1) {
          startBattleBtn.style.display = 'block';
        } else {
          startBattleBtn.style.display = 'none';
        }
        
        // Scroll back to top of content page
        pageContentDiv.scrollTop = 0;
      }
      
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentPage > 0) {
          currentPage--;
          renderPage(currentPage);
        }
      });
      
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentPage < step.pages.length - 1) {
          currentPage++;
          renderPage(currentPage);
        }
      });
      
      startBattleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        tutorialOverlay.style.display = 'none';
        currentIndex++;
        nextStep();
      });
      
      // Initialize first page
      renderPage(0);
      
    } else {
      // 3. Simple/History text tutorial fallback
      tutorialOverlay.innerHTML = `
        <div class="tutorial-card" style="max-width: 580px; width: 95%; max-height: 360px; box-sizing: border-box; padding: 1rem 1.2rem; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <h3 style="font-size: 1.15rem; margin-top: 0;">📖 ${step.title}</h3>
            <p style="white-space: pre-line; line-height: 1.5; text-align: justify; margin: 0.8rem 0; font-size: 0.85rem; overflow-y: auto; max-height: 200px;">${step.text || ''}</p>
          </div>
          <button class="action-btn start-tut-btn" style="width: 100%; padding: 0.6rem; font-weight: 700; margin-top: 0.6rem; font-size: 0.9rem;">冒険を開始する</button>
        </div>
      `;
      
      tutorialOverlay.querySelector('.start-tut-btn').addEventListener('click', () => {
        tutorialOverlay.style.display = 'none';
        currentIndex++;
        nextStep();
      });
    }
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
      let lpTitle = container.querySelector('#lp-title');
      let lpContent = container.querySelector('#lp-content');
      if (!lpTitle || !lpContent) {
        // Restore learning point layout in case sidebar HTML was overwritten by reference table
        sidebar.innerHTML = `
          <h3>💡 学習ポイント (Point d'Étude)</h3>
          <div class="sidebar-lp-title" id="lp-title"></div>
          <div class="sidebar-lp-content" id="lp-content"></div>
        `;
        lpTitle = container.querySelector('#lp-title');
        lpContent = container.querySelector('#lp-content');
      }
      if (lpTitle) lpTitle.innerText = step.learningPoint.title;
      if (lpContent) lpContent.innerText = step.learningPoint.text;
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

    function selectQuestions(criteria, fallbackQuestions) {
      const db = state.questionsDb || [];
      let selected = [];
      
      if (!state.recentQuestionIds) {
        state.recentQuestionIds = JSON.parse(localStorage.getItem('cba_recent_questions') || '[]');
      }
      
      if (criteria && criteria.length > 0) {
        criteria.forEach(crit => {
          const tag = crit.tag;
          const count = crit.count || 1;
          
          let pool = db.filter(q => q.tags && q.tags.includes(tag));
          let freshPool = pool.filter(q => !state.recentQuestionIds.includes(q.id));
          if (freshPool.length === 0) {
            freshPool = pool;
          }
          
          freshPool = shuffleArray(freshPool);
          const taken = freshPool.slice(0, count);
          selected = selected.concat(taken);
          
          taken.forEach(q => {
            state.recentQuestionIds.push(q.id);
            if (state.recentQuestionIds.length > 20) {
              state.recentQuestionIds.shift();
            }
          });
        });
        
        // Top up if we have fewer questions than requested
        const targetSum = criteria.reduce((sum, c) => sum + (c.count || 1), 0);
        if (selected.length < targetSum) {
          const missingCount = targetSum - selected.length;
          const remainingPool = shuffleArray(db.filter(q => !selected.some(sq => sq.id === q.id)));
          selected = selected.concat(remainingPool.slice(0, missingCount));
        }
        
        localStorage.setItem('cba_recent_questions', JSON.stringify(state.recentQuestionIds));
      } else if (fallbackQuestions && fallbackQuestions.length > 0) {
        selected = shuffleArray(fallbackQuestions);
      }
      
      return selected;
    }

    let rawQuestions = [];
    if (step.type === 'randomBattle') {
      try {
        await ensureQuizzesLoaded();
        const level = step.conditions?.level || 'ALL';
        if (level !== 'ALL') {
          await ensureDataLoaded('vocabulary', level);
        }
        let pool = [...state.db.quizzes];
        const category = step.conditions?.category;
        if (category) {
          pool = pool.filter(q => q.category && q.category.toLowerCase() === category.toLowerCase());
        }
        pool = shuffleArray(pool);
        const count = step.enemyHp || 3;
        rawQuestions = pool.slice(0, count).map(q => {
          const answerIndex = q.options.indexOf(q.answer);
          return {
            id: q.id,
            text: q.question,
            options: q.options,
            answerIndex: answerIndex !== -1 ? answerIndex : 0,
            explanation: q.context || `正解は「${q.answer}」です。`,
            acceptedAnswers: [q.answer, q.answer.toLowerCase()]
          };
        });
      } catch (err) {
        console.error("Failed to generate random questions:", err);
        rawQuestions = [
          {
            id: "fb_err_1",
            text: "プロヴァンス地方の代表的なスープ料理は？",
            options: ["Bouillabaisse", "Bœuf bourguignon", "Cassoulet", "Choucroute"],
            answerIndex: 0,
            acceptedAnswers: ["Bouillabaisse", "bouillabaisse"],
            explanation: "ブイヤベースはプロヴァンス地方（マルセイユ）の名物です。"
          }
        ];
      }
    } else {
      rawQuestions = selectQuestions(step.criteria, step.questions);
    }

    // Dynamic format mixing / type normalization: 85% typing, 15% choice
    let questions = rawQuestions.map(q => {
      let targetType = q.type || 'choice';
      if (targetType === 'choice' || targetType === 'typing') {
        targetType = Math.random() > 0.15 ? 'typing' : 'choice';
      }
      
      if (targetType === 'typing') {
        if (!q.acceptedAnswers && q.options && q.answerIndex !== undefined) {
          const rawAns = q.options[q.answerIndex];
          const cleanAns = rawAns.split('(')[0].split('（')[0].trim();
          return {
            ...q,
            type: 'typing',
            acceptedAnswers: [cleanAns, cleanAns.toLowerCase()]
          };
        }
      }
      return {
        ...q,
        type: targetType
      };
    });

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
          <h3>📖 参考資料 (Dictionnaire)</h3>
          <div style="display: flex; flex-direction: column; gap: 0.5rem; height: calc(100% - 40px); overflow: hidden;">
            <select class="action-btn ref-topic-selector" style="width: 100%; padding: 0.4rem; border-radius: var(--radius-sm); font-size: 0.8rem;">
              ${refs.map((r, i) => `<option value="${i}">${r.title_ja}</option>`).join('')}
            </select>
            <div class="ref-topic-content" style="flex: 1; overflow-y: auto; background: rgba(0,0,0,0.15); padding: 0.6rem; border-radius: var(--radius-sm); font-size: 0.8rem;"></div>
          </div>
        `;
        
        const select = sidebar.querySelector('.ref-topic-selector');
        const contentDiv = sidebar.querySelector('.ref-topic-content');
        
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
                            const frenchText = row[cidx - 1] ? row[cidx - 1].replace(/<[^>]*>/g, '').split('(')[0].trim() : '';
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
        } else if (episode.episodeId === 'career_ep_1_1') {
          const idx = refs.findIndex(r => r.id === 'ref_verb_groups');
          if (idx !== -1) initialTopicIdx = idx;
        } else if (episode.episodeId === 'career_ep_1_2') {
          const idx = refs.findIndex(r => r.id === 'ref_questions');
          if (idx !== -1) initialTopicIdx = idx;
        } else if (episode.episodeId === 'career_ep_1_3') {
          const idx = refs.findIndex(r => r.id === 'ref_adjective_agreement');
          if (idx !== -1) initialTopicIdx = idx;
        } else if (episode.episodeId === 'career_ep_2_1') {
          const idx = refs.findIndex(r => r.id === 'ref_contracted_articles');
          if (idx !== -1) initialTopicIdx = idx;
        } else if (episode.episodeId === 'career_ep_2_2') {
          const idx = refs.findIndex(r => r.id === 'ref_imperative');
          if (idx !== -1) initialTopicIdx = idx;
        } else if (episode.episodeId === 'career_ep_2_3') {
          const idx = refs.findIndex(r => r.id === 'ref_near_future_past');
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
        playCorrectSound();
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
        playWrongSound();
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
          startBattle(step);
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
      } else if (currentQ.type === 'scramble') {
        let clickedWords = [];
        const wordsPool = shuffleArray(currentQ.words);
        
        battlePane.innerHTML = `
          ${hudHtml}
          <div class="battle-question-box">
            <div class="q-header">Question ${questionIndex + 1} (並び替え)</div>
            <div class="q-body" style="font-size: 0.95rem; margin-bottom: 0.6rem;">${currentQ.text}</div>
            
            <div class="scramble-sentence-bar" style="min-height: 38px; border-bottom: 2px solid var(--color-accent); padding: 0.4rem; display: flex; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 0.8rem; background: rgba(255,255,255,0.05); border-radius: var(--radius-sm); font-size: 1rem; color: white;"></div>
            
            <div class="scramble-words-pool" style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 0.8rem; justify-content: center;">
              ${wordsPool.map((w, idx) => `<button class="scramble-word-btn" data-word="${w}" style="padding: 0.35rem 0.7rem; font-size: 0.85rem; border-radius: 20px; border: 1px solid var(--color-accent); background: none; color: white; cursor: pointer;">${w}</button>`).join('')}
            </div>
            
            <div style="display: flex; gap: 0.5rem;">
              <button class="action-btn verify-scramble-btn" style="flex: 2; padding: 0.6rem; font-weight: bold; background: var(--color-accent); color: white; border: none; border-radius: var(--radius-sm); cursor: pointer;">回答を送信</button>
              <button class="action-btn reset-scramble-btn" style="flex: 1; padding: 0.6rem; background: #374151; color: white; border: none; border-radius: var(--radius-sm); cursor: pointer;">リセット</button>
            </div>
            
            <div class="battle-feedback-drawer" id="battle-feedback" style="display: none; margin-top: 0.8rem;">
              <div class="feedback-title" id="fb-title"></div>
              <p class="feedback-desc" id="fb-desc"></p>
              <button class="action-btn next-q-btn" id="next-q-btn" style="width: 100%; margin-top: 0.8rem;">次の試練へ</button>
            </div>
          </div>
        `;
        
        const sentenceBar = battlePane.querySelector('.scramble-sentence-bar');
        const wordBtns = battlePane.querySelectorAll('.scramble-word-btn');
        const verifyBtn = battlePane.querySelector('.verify-scramble-btn');
        const resetBtn = battlePane.querySelector('.reset-scramble-btn');
        
        wordBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            if (btn.disabled) return;
            const word = btn.getAttribute('data-word');
            clickedWords.push(word);
            btn.disabled = true;
            btn.style.opacity = '0.3';
            sentenceBar.innerText = clickedWords.join(' ');
          });
        });
        
        resetBtn.addEventListener('click', () => {
          clickedWords = [];
          sentenceBar.innerText = '';
          wordBtns.forEach(btn => {
            btn.disabled = false;
            btn.style.opacity = '1';
          });
        });
        
        verifyBtn.addEventListener('click', () => {
          const userAns = clickedWords.join(' ');
          wordBtns.forEach(btn => btn.disabled = true);
          verifyBtn.disabled = true;
          resetBtn.disabled = true;
          
          const cleanUser = userAns.toLowerCase().replace(/[.,!?;:・]/g, "").replace(/\s+/g, " ").trim();
          const cleanTarget = currentQ.answer.toLowerCase().replace(/[.,!?;:・]/g, "").replace(/\s+/g, " ").trim();
          
          const isCorrect = cleanUser === cleanTarget;
          handleScrambleOutcome(isCorrect, currentQ);
        });
      } else if (currentQ.type === 'cloze') {
        const displayPrompt = currentQ.clozeText || currentQ.text;
        const cleanPrompt = displayPrompt.replace(/\[([^\]]+)\]/g, '_______');
        const hasOptions = currentQ.options && currentQ.options.length > 0;
        
        battlePane.innerHTML = `
          ${hudHtml}
          <div class="battle-question-box">
            <div class="q-header">Question ${questionIndex + 1} (穴埋め)</div>
            <div class="q-body" style="font-size: 1.1rem; text-align: center; margin: 1rem 0;">${cleanPrompt}</div>
            
            ${hasOptions ? `
              <div class="battle-options-list">
                ${currentQ.options.map((opt, idx) => `
                  <button class="battle-opt-btn" data-idx="${idx}">${opt}</button>
                `).join('')}
              </div>
            ` : `
              <div class="battle-typing-area" style="margin: 1rem 0; display: flex; flex-direction: column; gap: 0.6rem;">
                <input type="text" class="battle-input-field" placeholder="空欄に入る言葉を入力してください..." style="width: 100%; padding: 0.7rem; border-radius: var(--radius-sm); border: 2px solid rgba(197,168,128,0.4); background: rgba(255,255,255,0.06); color: white; font-size: 1rem; text-align: center; outline: none;" />
                <button class="action-btn submit-typing-btn" style="width: 100%; padding: 0.75rem; font-weight: bold; background: var(--color-accent); color: white; border: none; border-radius: var(--radius-sm); cursor: pointer;">回答を送信</button>
              </div>
            `}
            
            <button class="action-btn toggle-battle-ref-btn" style="width: 100%; padding: 0.5rem; font-size: 0.8rem; background: #374151; color: white; border: none; border-radius: var(--radius-sm); cursor: pointer; margin-top: 0.8rem;">📖 参考資料を表示</button>
            
            <div class="battle-feedback-drawer" id="battle-feedback" style="display: none; margin-top: 0.8rem;">
              <div class="feedback-title" id="fb-title"></div>
              <p class="feedback-desc" id="fb-desc"></p>
              <button class="action-btn next-q-btn" id="next-q-btn" style="width: 100%; margin-top: 0.8rem;">次の試練へ</button>
            </div>
          </div>
        `;
        
        const toggleRefBtn = battlePane.querySelector('.toggle-battle-ref-btn');
        toggleRefBtn.addEventListener('click', () => toggleBattleReference(toggleRefBtn));
        
        if (hasOptions) {
          const optBtns = battlePane.querySelectorAll('.battle-opt-btn');
          optBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
              const selectedIdx = parseInt(e.target.getAttribute('data-idx'));
              handleAnswer(selectedIdx, currentQ, optBtns);
            });
          });
        } else {
          const inputField = battlePane.querySelector('.battle-input-field');
          const submitBtn = battlePane.querySelector('.submit-typing-btn');
          setTimeout(() => inputField.focus(), 150);
          
          inputField.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') submitBtn.click();
          });
          
          submitBtn.addEventListener('click', () => {
            const userVal = inputField.value;
            handleTypingAnswer(userVal, currentQ, inputField, submitBtn);
          });
        }
      } else if (currentQ.type === 'matching') {
        const leftItems = shuffleArray(currentQ.pairs.map(p => p.left));
        const rightItems = shuffleArray(currentQ.pairs.map(p => p.right));
        
        battlePane.innerHTML = `
          ${hudHtml}
          <div class="battle-question-box">
            <div class="q-header">Question ${questionIndex + 1} (マッチング)</div>
            <p style="font-size: 0.8rem; color: var(--color-text-muted); margin-bottom: 0.5rem; text-align: center;">対応する言葉をペアで選んでください。</p>
            
            <div class="matching-columns-container" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; max-height: 160px; overflow-y: auto; padding: 0.2rem;">
              <div class="left-match-col" style="display: flex; flex-direction: column; gap: 0.4rem;">
                ${leftItems.map((item, idx) => `<button class="match-card-btn left-card" data-val="${item}" style="padding: 0.45rem; font-size: 0.8rem; border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.05); color: white; border-radius: var(--radius-sm); cursor: pointer; text-align: center; outline: none;">${item}</button>`).join('')}
              </div>
              <div class="right-match-col" style="display: flex; flex-direction: column; gap: 0.4rem;">
                ${rightItems.map((item, idx) => `<button class="match-card-btn right-card" data-val="${item}" style="padding: 0.45rem; font-size: 0.8rem; border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.05); color: white; border-radius: var(--radius-sm); cursor: pointer; text-align: center; outline: none;">${item}</button>`).join('')}
              </div>
            </div>
            
            <div class="battle-feedback-drawer" id="battle-feedback" style="display: none; margin-top: 0.8rem;">
              <div class="feedback-title" id="fb-title"></div>
              <p class="feedback-desc" id="fb-desc"></p>
              <button class="action-btn next-q-btn" id="next-q-btn" style="width: 100%; margin-top: 0.8rem;">次の試練へ</button>
            </div>
          </div>
        `;
        
        const leftBtns = battlePane.querySelectorAll('.left-card');
        const rightBtns = battlePane.querySelectorAll('.right-card');
        const feedbackDiv = battlePane.querySelector('#battle-feedback');
        const fbTitle = battlePane.querySelector('#fb-title');
        const fbDesc = battlePane.querySelector('#fb-desc');
        const nextBtn = battlePane.querySelector('#next-q-btn');
        
        let activeLeft = null;
        let activeRight = null;
        let matchedCount = 0;
        const totalPairs = currentQ.pairs.length;
        
        function checkMatchingPair() {
          if (!activeLeft || !activeRight) return;
          
          const leftVal = activeLeft.getAttribute('data-val');
          const rightVal = activeRight.getAttribute('data-val');
          
          const correctPair = currentQ.pairs.find(p => p.left === leftVal && p.right === rightVal);
          
          if (correctPair) {
            playBeep(440, 'sine', 0.1, 0.1);
            activeLeft.style.background = '#2E7D32';
            activeLeft.style.borderColor = '#A5D6A7';
            activeLeft.disabled = true;
            activeRight.style.background = '#2E7D32';
            activeRight.style.borderColor = '#A5D6A7';
            activeRight.disabled = true;
            
            matchedCount++;
            activeLeft = null;
            activeRight = null;
            
            if (matchedCount === totalPairs) {
              playCorrectSound();
              enemyHp = Math.max(0, enemyHp - 1);
              fbTitle.innerText = "✅ すべてマッチしました！ (Très bien)";
              fbTitle.className = "feedback-title text-success";
              fbDesc.innerText = currentQ.explanation;
              feedbackDiv.style.display = 'block';
              nextBtn.innerText = "次の試練へ";
              nextBtn.onclick = () => {
                questionIndex++;
                renderBattleScreen();
              };
            }
          } else {
            playWrongSound();
            playerHp = Math.max(0, playerHp - 1);
            
            const tempL = activeLeft;
            const tempR = activeRight;
            tempL.style.background = '#C62828';
            tempL.style.borderColor = '#EF9A9A';
            tempR.style.background = '#C62828';
            tempR.style.borderColor = '#EF9A9A';
            
            activeLeft = null;
            activeRight = null;
            
            viewport.classList.add('shake-vfx');
            setTimeout(() => viewport.classList.remove('shake-vfx'), 400);
            
            if (playerHp <= 0) {
              renderBattleScreen();
              return;
            }
            
            setTimeout(() => {
              if (tempL.disabled) return;
              tempL.style.background = 'rgba(255,255,255,0.05)';
              tempL.style.borderColor = 'rgba(255,255,255,0.15)';
              tempR.style.background = 'rgba(255,255,255,0.05)';
              tempR.style.borderColor = 'rgba(255,255,255,0.15)';
              
              const playerFill = battlePane.querySelector('.player-hp');
              const hudVal = battlePane.querySelectorAll('.hud-value')[0];
              if (playerFill) playerFill.style.width = `${(playerHp / maxPlayerHp) * 100}%`;
              if (hudVal) hudVal.innerText = `${playerHp} / ${maxPlayerHp}`;
            }, 800);
          }
        }
        
        leftBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            if (btn.disabled) return;
            leftBtns.forEach(b => {
              if (!b.disabled) {
                b.style.background = 'rgba(255,255,255,0.05)';
                b.style.borderColor = 'rgba(255,255,255,0.15)';
              }
            });
            btn.style.background = 'var(--color-accent)';
            btn.style.borderColor = 'white';
            activeLeft = btn;
            checkMatchingPair();
          });
        });
        
        rightBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            if (btn.disabled) return;
            rightBtns.forEach(b => {
              if (!b.disabled) {
                b.style.background = 'rgba(255,255,255,0.05)';
                b.style.borderColor = 'rgba(255,255,255,0.15)';
              }
            });
            btn.style.background = 'var(--color-accent)';
            btn.style.borderColor = 'white';
            activeRight = btn;
            checkMatchingPair();
          });
        });
      } else {
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
        playerHp = Math.max(0, playerHp - 2);
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

    function handleScrambleOutcome(isCorrect, question) {
      const feedbackDiv = battlePane.querySelector('#battle-feedback');
      const fbTitle = battlePane.querySelector('#fb-title');
      const fbDesc = battlePane.querySelector('#fb-desc');
      const nextBtn = battlePane.querySelector('#next-q-btn');
      
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
        playerHp = Math.max(0, playerHp - 2);
        fbTitle.innerText = `❌ 不正解！ (正解: ${question.answer})`;
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
