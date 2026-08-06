import os

workspace_dir = r"c:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"
story_path = os.path.join(workspace_dir, "js", "views", "story.js")

with open(story_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Let's locate indices for:
# 1. renderChapterSelector start & end
# 2. startEpisode start & end
# 3. startBattle start & end

# Let's inspect line contents
render_selector_start = None
render_selector_end = None
for idx, line in enumerate(lines):
    if "async function renderChapterSelector(container)" in line:
        render_selector_start = idx
    if render_selector_start is not None and line.strip() == "}" and render_selector_end is None and idx > render_selector_start:
        # Check if it's the end of renderChapterSelector
        # Let's find the closing bracket
        if idx < 170: # renderChapterSelector ends around line 166
            render_selector_end = idx

print(f"renderChapterSelector lines: {render_selector_start + 1} to {render_selector_end + 1}")

# Let's replace renderChapterSelector lines
new_selector_lines = """async function renderChapterSelector(container) {
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
      <div id="rpg-card-story" class="story-chapter-card active-chapter" style="display: none; width: 100%; flex-direction: column; justify-content: space-between; border-left: 5px solid var(--color-accent);">
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
"""

lines[render_selector_start:render_selector_end+1] = [new_selector_lines]

# Re-join and scan again for startEpisode
code = "".join(lines)
lines = code.splitlines(keepends=True)

start_ep_idx = None
end_ep_idx = None
for idx, line in enumerate(lines):
    if "async function startEpisode(" in line:
        start_ep_idx = idx
    if start_ep_idx is not None and line.strip() == "}" and end_ep_idx is None and idx > start_ep_idx:
        if idx < start_ep_idx + 35:
            end_ep_idx = idx

print(f"startEpisode lines: {start_ep_idx + 1} to {end_ep_idx + 1}")

new_start_ep_lines = """async function startEpisode(container, chapterNum, episodeId) {
  try {
    container.innerHTML = `<div class="story-loader"><div class="spinner"></div><p>物語を読み込んでいます...</p></div>`;
    
    const filePath = chapterNum === 'career_0' ? 'rpg/story/chapter_career_0.json' : `rpg/history/chapter_${chapterNum}.json`;
    const [storyRes, qDbRes] = await Promise.all([
      fetch(filePath),
      fetch('rpg/questions_db.json')
    ]);
    if (!storyRes.ok) throw new Error("Story file could not be loaded");
    if (!qDbRes.ok) throw new Error("Questions database could not be loaded");
    
    const chapterData = await storyRes.json();
    const questionsDb = await qDbRes.json();
    state.questionsDb = questionsDb;
    
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
"""

lines[start_ep_idx:end_ep_idx+1] = [new_start_ep_lines]

# Re-join and scan again for startBattle
code = "".join(lines)
lines = code.splitlines(keepends=True)

start_battle_idx = None
end_battle_idx = None
for idx, line in enumerate(lines):
    if "async function startBattle(step)" in line:
        start_battle_idx = idx
    if start_battle_idx is not None and line.strip() == "}" and end_battle_idx is None and idx > start_battle_idx:
        # startBattle is very long, it ends near the bottom of story.js
        # Let's find the closing bracket at the very end of startBattle block
        # We can detect it if the next lines contain something unrelated or if it's the final function inside the engine
        if idx > start_battle_idx + 300:
            end_battle_idx = idx

print(f"startBattle lines: {start_battle_idx + 1} to {end_battle_idx + 1}")

# We will write the full new startBattle function
new_start_battle = """  async function startBattle(step) {
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
"""

lines[start_battle_idx:end_battle_idx+1] = [new_start_battle]

# Write merged content back
with open(story_path, 'w', encoding='utf-8') as f:
    f.writelines(lines)

print("Merged js/views/story.js successfully.")
