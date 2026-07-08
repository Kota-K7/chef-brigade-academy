(function(){const u=document.createElement("link").relList;if(u&&u.supports&&u.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const c of n)if(c.type==="childList")for(const _ of c.addedNodes)_.tagName==="LINK"&&_.rel==="modulepreload"&&a(_)}).observe(document,{childList:!0,subtree:!0});function l(n){const c={};return n.integrity&&(c.integrity=n.integrity),n.referrerPolicy&&(c.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?c.credentials="include":n.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function a(n){if(n.ep)return;n.ep=!0;const c=l(n);fetch(n.href,c)}})();let Y=null,X="",Z=0,W=null,D=null;function F(e,u=1){ie(e,u)}function ie(e,u=1,l=null,a=null,n=0){if(!("speechSynthesis"in window)){console.warn("Speech synthesis not supported on this browser.");return}window.speechSynthesis.cancel();const c=e.replace(/["'➔]/g,"").trim();X=c,Z=n,W=l,D=a;const _=c.substring(n);if(!_.trim()){D&&D();return}const m=new SpeechSynthesisUtterance(_);m.lang="fr-FR",m.rate=u;const k=window.speechSynthesis.getVoices().find(r=>r.lang==="fr-FR"||r.lang.startsWith("fr"));k&&(m.voice=k),m.onboundary=r=>{if(r.name==="word"&&W){const p=Z+r.charIndex;W(p,X.length)}},m.onend=()=>{Y===m&&D&&D()},m.onerror=r=>{console.warn("SpeechSynthesis error:",r),D&&D()},Y=m,window.speechSynthesis.speak(m)}function le(){"speechSynthesis"in window&&window.speechSynthesis.pause()}function de(){"speechSynthesis"in window&&window.speechSynthesis.resume()}function K(){"speechSynthesis"in window&&window.speechSynthesis.cancel()}"speechSynthesis"in window&&(window.speechSynthesis.getVoices(),window.speechSynthesis.onvoiceschanged=()=>{window.speechSynthesis.getVoices()});function ue(){var C,L,v,h,b,w,S;const e=document.createElement("div"),u=document.createElement("h2");u.className="section-title",u.innerText="Tableau de Bord",e.appendChild(u);const l=document.createElement("p");l.className="section-subtitle",l.innerText="Welcome back, Commis. Here is your kitchen curriculum status.",e.appendChild(l);const a=new Date().toISOString().split("T")[0],n=Object.values(g.srs),c=n.filter(j=>j.dueDate<=a).length,_=n.length,m=document.createElement("div");m.className="dashboard-grid";const i=document.createElement("div");i.style.display="flex",i.style.flexDirection="column",i.style.gap="1.5rem";const k=document.createElement("div");k.className="card",k.style.padding="1.5rem",k.innerHTML=`
    <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--color-primary); margin-bottom: 1rem;">Missions du Jour (Today's Tasks)</h3>
    <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.8rem;">
      <li style="display: flex; align-items: center; gap: 0.8rem; font-size: 0.95rem;">
        <input type="checkbox" id="mission-vocab" style="transform: scale(1.2); cursor: pointer;" ${_>0?"checked":""}>
        <label for="mission-vocab" style="cursor: pointer;">Study new terms in the Vocabulary deck</label>
      </li>
      <li style="display: flex; align-items: center; gap: 0.8rem; font-size: 0.95rem;">
        <input type="checkbox" id="mission-srs" style="transform: scale(1.2); cursor: pointer;" ${c===0&&_>0?"checked":""}>
        <label for="mission-srs" style="cursor: pointer;">
          Clear due SRS cards in Review Deck 
          ${c>0?`<span style="background-color: var(--color-error); color: white; padding: 0.1rem 0.5rem; border-radius: 10px; font-size: 0.75rem; font-weight: bold; margin-left: 0.5rem;">${c} due</span>`:""}
        </label>
      </li>
      <li style="display: flex; align-items: center; gap: 0.8rem; font-size: 0.95rem;">
        <input type="checkbox" id="mission-quiz" style="transform: scale(1.2); cursor: pointer;">
        <label for="mission-quiz" style="cursor: pointer;">Take a kitchen verification quiz</label>
      </li>
    </ul>
  `,i.appendChild(k);const r=document.createElement("div");r.className="card",r.style.padding="1.5rem";const p=((C=g.meta)==null?void 0:C.featured)||null;r.innerHTML=`
    <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--color-primary); margin-bottom: 1rem;">Vocabulaire Vedette (Featured Vocabulary)</h3>
    ${p?`
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
        <div style="font-size: 1.25rem; font-weight: 600; color: var(--color-accent);">${p.french}</div>
        <button class="audio-btn" data-text="${p.french}" title="Listen pronunciation" style="background: none; border: none; font-size: 1.1rem; cursor: pointer; color: var(--color-accent); padding: 0.1rem; line-height: 1;">🔊</button>
      </div>
      <div style="font-size: 0.9rem; color: var(--color-text-main); font-weight: 500; margin-bottom: 0.5rem;">${p.english} / ${p.japanese}</div>
      <div style="background-color: rgba(197, 168, 128, 0.08); border-left: 2px solid var(--color-accent); padding: 0.8rem; font-size: 0.85rem; border-radius: 0 var(--radius-sm) var(--radius-sm) 0;">
        <div style="display: flex; align-items: flex-start; gap: 0.4rem; font-style: italic; color: var(--color-secondary); font-weight: 500;">
          <span style="flex: 1;">"${p.context_fr}"</span>
          <button class="audio-btn" data-text="${p.context_fr}" title="Listen context sentence" style="background: none; border: none; font-size: 0.9rem; cursor: pointer; color: var(--color-text-muted); padding: 0.15rem; margin-top: 0.1rem; line-height: 1;">🔊</button>
        </div>
        <div style="color: var(--color-text-muted); margin-top: 0.2rem;">${p.context_ja}</div>
      </div>
    `:"<p>No data loaded.</p>"}
  `,p&&r.querySelectorAll(".audio-btn").forEach(j=>{j.addEventListener("click",y=>{y.stopPropagation();const q=y.target.closest(".audio-btn").getAttribute("data-text");F(q)})}),i.appendChild(r),m.appendChild(i);const s=document.createElement("div");s.style.display="flex",s.style.flexDirection="column",s.style.gap="1.5rem";const o=document.createElement("div");o.className="streak-card",o.innerHTML=`
    <div class="streak-left">
      <h2>Série</h2>
      <h2>d'Études</h2>
      <div class="streak-subtitle">Daily Study Streak</div>
    </div>
    <div class="streak-right">
      <span class="streak-number">${g.streak}</span>
      <span class="streak-flame">🔥</span>
    </div>
  `,s.appendChild(o);const d=document.createElement("div");d.className="card",d.style.padding="1.5rem";const f=((v=(L=g.meta)==null?void 0:L.counts)==null?void 0:v.vocabulary)||0,t=((b=(h=g.meta)==null?void 0:h.counts)==null?void 0:b.grammar)||0,x=((S=(w=g.meta)==null?void 0:w.counts)==null?void 0:S.cuisine)||0;return d.innerHTML=`
    <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--color-primary); margin-bottom: 1rem;">Progrès de la Brigade</h3>
    <div style="display: flex; flex-direction: column; gap: 0.8rem; font-size: 0.9rem;">
      <div style="display: flex; justify-content: space-between;">
        <span>Vocabulaire:</span>
        <strong>${f} terms</strong>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span>Grammaire:</span>
        <strong>${t} items</strong>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span>Théorie Culinaire:</span>
        <strong>${x} guides</strong>
      </div>
      
      <div style="border-top: 1px solid rgba(0,0,0,0.05); padding-top: 0.8rem; display: flex; justify-content: space-between; align-items: center;">
        <span>★ Coups de Cœur (Favorites):</span>
        <strong style="color: var(--color-accent);">${g.favorites.size} items</strong>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span>Deck SRS Actif (Active SRS):</span>
        <strong style="color: var(--color-primary);">${_} cards</strong>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span>À réviser aujourd'hui (Due Today):</span>
        <strong style="${c>0?"color: var(--color-error);":"color: var(--color-success);"}">${c} cards</strong>
      </div>
    </div>
  `,s.appendChild(d),m.appendChild(s),e.appendChild(m),e}function me(){var c;const e=document.createElement("div"),u=document.createElement("h2");u.className="section-title",u.innerText="Vocabulaire Professionnel",e.appendChild(u);const l=document.createElement("p");l.className="section-subtitle",l.innerText="Essential culinary terminology for kitchen brigade communications. Filter by category, tag, or difficulty level.",e.appendChild(l);const a=document.createElement("div");a.className="loading-placeholder",a.innerText="Chargement du vocabulaire... (Loading vocabulary...)",e.appendChild(a);const n=((c=g.settings)==null?void 0:c.targetLevel)||"ALL";return A("vocabulary",n).then(()=>{a.remove(),pe(e,n)}),e}function pe(e,u){var d,f;const l=((d=g.settings)==null?void 0:d.includeGeneral)||!1,n=(((f=g.db)==null?void 0:f.vocabulary)||[]).filter(t=>l||t.is_professional),c=["ALL",...new Set(n.map(t=>t.category))],_=["ALL",...new Set(n.flatMap(t=>t.tags||[]))],m=["ALL","A1","A2","B1","B2","C1","C2"];let i="ALL",k="ALL",r=u;const p=document.createElement("div");p.className="card",p.style.padding="1.2rem",p.style.marginBottom="2rem",p.style.display="flex",p.style.flexDirection="column",p.style.gap="1rem",p.innerHTML=`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
      <div>
        <label style="font-size: 0.8rem; font-weight: 600; display: block; margin-bottom: 0.3rem; color: var(--color-text-muted);">Catégorie (Category)</label>
        <select id="vocab-category-select" style="padding: 0.5rem; font-size: 0.9rem; border-radius: var(--radius-sm); border: 1px solid rgba(0,0,0,0.1); width: 100%; background: var(--color-bg);">
          ${c.map(t=>`<option value="${t}" ${t===i?"selected":""}>${t}</option>`).join("")}
        </select>
      </div>
      <div>
        <label style="font-size: 0.8rem; font-weight: 600; display: block; margin-bottom: 0.3rem; color: var(--color-text-muted);">Étiquettes (Tag)</label>
        <select id="vocab-tag-select" style="padding: 0.5rem; font-size: 0.9rem; border-radius: var(--radius-sm); border: 1px solid rgba(0,0,0,0.1); width: 100%; background: var(--color-bg);">
          ${_.map(t=>`<option value="${t}" ${t===k?"selected":""}>${t==="ALL"?"ALL TAGS":"#"+t}</option>`).join("")}
        </select>
      </div>
      <div>
        <label style="font-size: 0.8rem; font-weight: 600; display: block; margin-bottom: 0.3rem; color: var(--color-text-muted);">Niveau (Level)</label>
        <select id="vocab-level-select" style="padding: 0.5rem; font-size: 0.9rem; border-radius: var(--radius-sm); border: 1px solid rgba(0,0,0,0.1); width: 100%; background: var(--color-bg);">
          ${m.map(t=>`<option value="${t}" ${t===r?"selected":""}>${t==="ALL"?"ALL LEVELS":t}</option>`).join("")}
        </select>
      </div>
    </div>
  `,e.appendChild(p);const s=document.createElement("div");s.className="card-grid",e.appendChild(s);function o(){var L;s.innerHTML="";const C=(((L=g.db)==null?void 0:L.vocabulary)||[]).filter(v=>l||v.is_professional).filter(v=>{const h=i==="ALL"||v.category===i,b=k==="ALL"||v.tags&&v.tags.includes(k),w=r==="ALL"||v.level===r;return h&&b&&w});if(C.length===0){s.innerHTML='<p style="color: var(--color-text-muted); grid-column: 1 / -1; text-align: center; padding: 2rem;">Aucun terme trouvé correspondant à vos critères de filtrage.</p>';return}C.forEach(v=>{const h=document.createElement("div");h.className="card";const b=B(v.id),w=g.srs[v.id],S=!!w;h.innerHTML=`
        <div style="display: flex; flex-direction: column; height: 100%; justify-content: space-between; gap: 1.5rem;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <span class="card-category" style="margin:0;">${v.category}</span>
              <span class="grammar-badge" style="background-color: var(--color-primary);">${v.level}</span>
            </div>
            
            <div class="term-header">
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <h3 class="term-title">${v.french}</h3>
                <button class="audio-btn" data-text="${v.french}" title="Listen pronunciation" style="background: none; border: none; font-size: 1.15rem; cursor: pointer; color: var(--color-accent); transition: var(--transition); padding: 0.2rem;">🔊</button>
              </div>
              <button class="fav-btn ${b?"active":""}" data-id="${v.id}">
                ${b?"★":"☆"}
              </button>
            </div>
            
            <div class="term-translations" style="margin-top: 0.6rem; display: flex; flex-direction: column; gap: 0.4rem;">
              <div class="flip-translation-container">
                <div class="flip-translation-card">
                  <div class="flip-front" style="display: flex; align-items: center; gap: 0.4rem; justify-content: flex-start; padding: 0.4rem 0.6rem; text-align: left;">
                    <button class="audio-btn" data-text="${v.definition_fr}" title="Listen definition" style="background: none; border: none; font-size: 0.9rem; cursor: pointer; color: var(--color-accent); padding: 0.1rem; line-height: 1; flex-shrink: 0;">🔊</button>
                    <span style="font-size: 0.76rem; line-height: 1.25; color: var(--color-text-main); font-weight: 500;">${v.definition_fr||"No definition loaded."}</span>
                  </div>
                  <div class="flip-back" style="font-size: 0.85rem; font-weight: 600; padding: 0.4rem 0.6rem; justify-content: center; text-align: center; color: var(--color-secondary);">
                    🇬🇧 ${v.english}
                  </div>
                </div>
              </div>
              <div class="trans-ja" style="margin-top: 0.2rem; font-weight: 500;">${v.japanese}</div>
            </div>
            
            <div class="term-context" style="margin-top: 1rem;">
              <div class="context-fr" style="display: flex; align-items: flex-start; gap: 0.4rem; font-style: italic; color: var(--color-secondary);">
                <span style="flex: 1;">"${v.context_fr}"</span>
                <button class="audio-btn" data-text="${v.context_fr}" title="Listen context sentence" style="background: none; border: none; font-size: 0.9rem; cursor: pointer; color: var(--color-text-muted); padding: 0.15rem; margin-top: 0.15rem;">🔊</button>
              </div>
              <div class="context-ja">${v.context_ja}</div>
            </div>
            
            ${v.tags&&v.tags.length>0?`
              <div style="margin-top: 1rem; display: flex; flex-wrap: wrap; gap: 0.3rem;">
                ${v.tags.map(y=>`<span class="tag-badge" style="background-color: rgba(197, 168, 128, 0.08); color: var(--color-accent); font-size: 0.75rem; padding: 0.1rem 0.5rem; border-radius: 12px;">#${y}</span>`).join("")}
              </div>
            `:""}
          </div>
          
          <!-- SRS status in card footer -->
          <div style="border-top: 1px solid rgba(0,0,0,0.05); padding-top: 1rem; font-size: 0.8rem; display: flex; flex-direction: column; gap: 0.5rem;">
            ${S?`
              <div style="display: flex; justify-content: space-between; color: var(--color-text-muted);">
                <span>Interval: <strong>${w.interval} days</strong></span>
                <span>Due: <strong>${w.dueDate}</strong></span>
              </div>
              <div style="display: flex; gap: 0.5rem;">
                <button class="next-btn srs-action-btn" data-id="${v.id}" data-action="memorized" style="background-color: var(--color-success); font-size: 0.75rem; padding: 0.3rem 0.6rem; flex: 1;">
                  ✓ Memorized
                </button>
                <button class="next-btn srs-action-btn" data-id="${v.id}" data-action="reset" style="background-color: transparent; border: 1px solid var(--color-error); color: var(--color-error); font-size: 0.75rem; padding: 0.3rem 0.6rem;">
                  Forget
                </button>
              </div>
            `:`
              <div style="color: var(--color-text-muted); font-style: italic; margin-bottom: 0.2rem;">Not yet added to SRS memory deck.</div>
              <button class="next-btn srs-action-btn" data-id="${v.id}" data-action="start" style="font-size: 0.75rem; padding: 0.4rem 0.8rem; width: 100%;">
                Start Memorizing (Add to SRS)
              </button>
            `}
          </div>
        </div>
      `;const j=h.querySelector(".flip-translation-container");j.addEventListener("click",y=>{y.stopPropagation(),j.querySelector(".flip-translation-card").classList.toggle("flipped")}),h.querySelector(".fav-btn").addEventListener("click",y=>{y.stopPropagation(),H(v.id);const q=y.target,z=B(v.id);q.classList.toggle("active",z),q.innerText=z?"★":"☆"}),h.querySelectorAll(".audio-btn").forEach(y=>{y.addEventListener("click",q=>{q.stopPropagation();const z=q.target.closest(".audio-btn").getAttribute("data-text");F(z)})}),h.querySelectorAll(".srs-action-btn").forEach(y=>{y.addEventListener("click",q=>{q.stopPropagation();const z=q.target.getAttribute("data-action"),$=q.target.getAttribute("data-id");z==="start"?O($,4):z==="memorized"?O($,5):z==="reset"&&O($,0),o()})}),s.appendChild(h)})}p.querySelector("#vocab-category-select").addEventListener("change",t=>{i=t.target.value,o()}),p.querySelector("#vocab-tag-select").addEventListener("change",t=>{k=t.target.value,o()}),p.querySelector("#vocab-level-select").addEventListener("change",async t=>{var j;r=t.target.value,s.innerHTML=`<div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--color-text-muted);">Chargement (Loading level ${r})...</div>`,await A("vocabulary",r);const C=(((j=g.db)==null?void 0:j.vocabulary)||[]).filter(y=>l||y.is_professional),L=["ALL",...new Set(C.map(y=>y.category))],v=["ALL",...new Set(C.flatMap(y=>y.tags||[]))],h=p.querySelector("#vocab-category-select"),b=h.value;h.innerHTML=L.map(y=>`<option value="${y}" ${y===b?"selected":""}>${y}</option>`).join(""),i=h.value;const w=p.querySelector("#vocab-tag-select"),S=w.value;w.innerHTML=v.map(y=>`<option value="${y}" ${y===S?"selected":""}>${y==="ALL"?"ALL TAGS":"#"+y}</option>`).join(""),k=w.value,o()}),o()}function ge(){var c;const e=document.createElement("div"),u=document.createElement("h2");u.className="section-title",u.innerText="Grammaire de la Cuisine",e.appendChild(u);const l=document.createElement("p");l.className="section-subtitle",l.innerText="French grammar concepts framed through recipe instructions and professional dialogues.",e.appendChild(l);const a=document.createElement("div");a.className="loading-placeholder",a.innerText="Chargement de la grammaire... (Loading grammar...)",e.appendChild(a);const n=((c=g.settings)==null?void 0:c.targetLevel)||"ALL";return A("grammar",n).then(()=>{a.remove(),fe(e,n)}),e}function fe(e,u){var n;const a=(((n=g.db)==null?void 0:n.grammar)||[]).filter(c=>u==="ALL"||c.level===u);if(a.length===0){const c=document.createElement("p");c.style.color="var(--color-text-muted)",c.innerText="Aucune leçon de grammaire chargée pour ce niveau.",e.appendChild(c);return}a.forEach(c=>{const _=document.createElement("div");_.className="grammar-card";const m=B(c.id),i=c.topic.match(/\(([^)]+)\)/),k=i?i[1]:c.topic;_.innerHTML=`
      <div class="grammar-header">
        <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
          <span class="grammar-badge">${c.level}</span>
          <span class="grammar-title">${c.topic}</span>
          <button class="audio-btn" data-text="${k}" title="Listen topic pronunciation" style="background: none; border: none; font-size: 0.9rem; cursor: pointer; color: var(--color-accent); padding: 0.15rem; line-height: 1;">🔊</button>
        </div>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <button class="fav-btn ${m?"active":""}" data-id="${c.id}" style="font-size: 1.1rem; padding: 0.2rem;">
            ${m?"★":"☆"}
          </button>
          <span class="toggle-icon" style="font-size: 1rem; color: var(--color-text-muted); font-weight: bold;">▼</span>
        </div>
      </div>
      <div class="grammar-body">
        <div class="grammar-expl">
          <p style="margin-bottom: 0.6rem; font-weight: 500; color: var(--color-secondary);">Explanation (EN):</p>
          <p style="margin-bottom: 1rem;">${c.explanation_en}</p>
          <p style="margin-bottom: 0.6rem; font-weight: 500; color: var(--color-secondary);">説明 (JA):</p>
          <p style="margin-bottom: 1.2rem;">${c.explanation_ja}</p>
        </div>
        <div class="grammar-examples">
          <p style="font-size: 0.8rem; font-weight: 600; text-transform: uppercase; color: var(--color-accent); letter-spacing: 1px; margin-bottom: 0.8rem;">Exemples de Cuisine (Examples):</p>
          <div class="examples-list">
            ${c.examples.map(o=>`
              <div class="example-item" style="margin-bottom: 0.8rem;">
                <div class="example-fr" style="display: flex; align-items: center; gap: 0.4rem;">
                  <span style="flex: 1;">➔ ${o.fr}</span>
                  <button class="audio-btn" data-text="${o.fr}" title="Listen pronunciation" style="background: none; border: none; font-size: 0.9rem; cursor: pointer; color: var(--color-accent); padding: 0.15rem; line-height: 1;">🔊</button>
                </div>
                <div class="example-en">${o.en}</div>
                <div class="example-ja">${o.ja}</div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `;const r=_.querySelector(".grammar-header"),p=_.querySelector(".grammar-body"),s=_.querySelector(".toggle-icon");r.addEventListener("click",o=>{if(o.target.classList.contains("fav-btn")||o.target.closest(".audio-btn"))return;const d=p.classList.toggle("open");s.innerText=d?"▲":"▼"}),_.querySelector(".fav-btn").addEventListener("click",o=>{o.stopPropagation(),H(c.id);const d=o.target,f=B(c.id);d.classList.toggle("active",f),d.innerText=f?"★":"☆"}),_.querySelectorAll(".audio-btn").forEach(o=>{o.addEventListener("click",d=>{d.stopPropagation();const f=d.target.closest(".audio-btn").getAttribute("data-text");F(f)})}),e.appendChild(_)})}const ve=[{id:"cut_filet",number:"5",type:"regular",name_fr:"Filet de bœuf",name_en:"Tenderloin",name_ja:"ヒレ",points:"55,30 68,30 68,42 55,42",properties:{tenderness:"★★★★★",fat:"★☆☆☆☆",collagen:"★☆☆☆☆"},cooking:"強火ステーキ、ロースト、短時間ソテー",science:"運動量が最も少ない筋肉。結合組織が極少で加熱による硬化が起きにくい。",classification:"Steak cut（高級ステーキ部位）",logic:"High heat / Short cook",chef_note:"火入れの“1分”が品質を決める。"},{id:"cut_rumsteck",number:"2",type:"regular",name_fr:"Rumsteck",name_en:"Rump",name_ja:"ランプ",points:"68,28 78,28 78,42 68,42",properties:{tenderness:"★★★★☆",fat:"★★☆☆☆",collagen:"★★☆☆☆"},cooking:"ステーキ、ロースト",science:"運動はあるが筋繊維が均質で、鉄分と旨味が強い。",classification:"Steak cut / Roast cut",logic:"High heat / Medium cook",chef_note:"「肉汁を噛む」ための部位。"},{id:"cut_aiguillette",number:"4",type:"regular",name_fr:"Aiguillette de rumsteck",name_en:"Sirloin cap (Aiguillette de baronne)",name_ja:"イチボ",points:"72,40 84,40 84,52 72,52",properties:{tenderness:"★★★★☆",fat:"★★★☆☆",collagen:"★★☆☆☆"},cooking:"ロースト、厚切りステーキ",science:"脂層が断熱材として働き、内部の水分保持力が高い。",classification:"Roast cut（塊肉向き）",logic:"Roast / Medium heat",chef_note:"“塊で焼くほど完成度が上がる部位”。"},{id:"cut_palette",number:"8",type:"regular",name_fr:"Dessus de palette",name_en:"Chuck flap",name_ja:"ザブトン",points:"28,26 44,26 44,42 28,42",properties:{tenderness:"★★★★☆",fat:"★★★★★",collagen:"★★★☆☆"},cooking:"煮込み、低温ロースト",science:"脂と筋間コラーゲンが共存。加熱で乳化しソース化する。",classification:"Braise cut（煮込み用）",logic:"Low heat / Long cook",chef_note:"“焼くより溶かす部位”。"},{id:"cut_poitrine",number:"13",type:"regular",name_fr:"Poitrine de bœuf",name_en:"Brisket",name_ja:"ブリスケ",points:"28,45 44,45 44,66 28,66",properties:{tenderness:"★★☆☆☆",fat:"★★★★☆",collagen:"★★★★★"},cooking:"ポトフ、長時間煮込み",science:"支持筋肉構造でコラーゲン密度が高い。低温長時間でゼラチン化。",classification:"Braise cut",logic:"Low heat / Very long cook",chef_note:"“時間が旨味に変わる典型”。"},{id:"cut_langue",number:"1",type:"offal",name_fr:"Langue de bœuf",name_en:"Langue de bœuf",name_ja:"タン",points:"4,30 18,30 18,48 4,48",properties:{tenderness:"★★★☆☆（焼き） / ★★★★★（煮込み）",fat:"★★★☆☆",collagen:"★★★★☆"},cooking:"煮込み、スライスソテー",science:"筋＋結合組織が強く、加熱でゼラチン質化する。",classification:"Abats nobles（高級内臓）",logic:"Long cook",chef_note:"“煮込むほど格が上がる部位”。"},{id:"cut_onglet",number:"9",type:"offal",name_fr:"Onglet",name_en:"Skirt / Hanging tender",name_ja:"ハラミ",points:"48,50 62,50 62,65 48,65",properties:{tenderness:"★★★★☆",fat:"★★★☆☆",collagen:"★★☆☆☆"},cooking:"ステーキ（レア）",science:"横隔膜筋。筋繊維が粗く赤身の旨味が強い。",classification:"Boucher cut（肉屋が好む部位）",logic:"High heat / Very short cook",chef_note:"“焼きすぎると価値が消える”。"},{id:"cut_foie",number:"3",type:"offal",name_fr:"Foie de bœuf",name_en:"Liver",name_ja:"レバー",points:"42,40 56,40 56,52 42,52",properties:{tenderness:"★★★★☆",fat:"★★☆☆☆",collagen:"★☆☆☆☆"},cooking:"ソテー、パテ",science:"実質臓器。加熱でタンパク質凝固が急速に進む。",classification:"Abats",logic:"Medium heat / Very short cook",chef_note:"“数十秒 of 差で別食材”。"},{id:"cut_tripe",number:"10",type:"offal",name_fr:"Tripes",name_en:"Honeycomb tripe",name_ja:"ハチノス",points:"38,54 52,54 52,70 38,70",properties:{tenderness:"★☆☆☆☆ → ★★★★★（煮込み）",fat:"★☆☆☆☆",collagen:"★★★★★"},cooking:"長時間煮込み",science:"蜂 of 巣状コラーゲン構造。酸と時間で分解される。",classification:"Abats traditionnels",logic:"Very long cook",chef_note:"“時間が構造を壊す食材”。"},{id:"cut_boyaux",number:"14",type:"offal",name_fr:"Boyaux",name_en:"Intestine",name_ja:"腸",points:"80,62 94,62 94,78 80,78",properties:{tenderness:"★★☆☆☆",fat:"★★★★☆",collagen:"★★★★☆"},cooking:"ソーセージ, グリル",science:"平滑筋＋脂肪層。発酵・香辛料と相性が良い。",classification:"Charcuterie",logic:"Medium heat / Processed",chef_note:"“単体ではなく構造として使う部位”。"}],he=[{id:"cut_chicken_breast",number:"4",type:"regular",name_fr:"Blanc de poulet",name_en:"Breast",name_ja:"むね",points:"34,66 46,66 46,82 34,82",properties:{tenderness:"★★☆☆☆",fat:"★☆☆☆☆",collagen:"★☆☆☆☆"},cooking:"ポシェ、ソテー、低温調理",science:"結合組織が少なく、高温で加熱すると水分が抜けやすい。低温でゆっくり火入れするとしっとり仕上がる。",classification:"Suprême de volaille",logic:"Low temperature / Delicate heat",chef_note:"加熱 of 誤差がそのまま品質差になる部位。"},{id:"cut_chicken_tender",number:"6",type:"regular",name_fr:"Aiguillette de poulet",name_en:"Tenderloin",name_ja:"ささみ",points:"38,62 48,62 48,76 38,76",properties:{tenderness:"★★★☆☆",fat:"★☆☆☆☆",collagen:"★☆☆☆☆"},cooking:"ソテー、パン粉焼き、軽いフリット",science:"筋繊維が細く水分保持が弱い。短時間加熱で内部水分を守る必要がある。",classification:"Aiguillettes de poulet panées",logic:"Short cook / Gentle heat",chef_note:"「火を入れる時間」より「火を止める判断」が重要。"},{id:"cut_chicken_thigh",number:"3",type:"regular",name_fr:"Cuisse de poulet",name_en:"Thigh",name_ja:"もも",points:"48,70 62,70 62,86 48,86",properties:{tenderness:"★★★★☆",fat:"★★★☆☆",collagen:"★★★☆☆"},cooking:"ロティ、ブレゼ、煮込み",science:"運動量が多くミオグロビンが豊富。長時間加熱でコラーゲンがゼラチン化し、旨味が増す。",classification:"Coq au vin",logic:"Long cook / Medium heat",chef_note:"火を入れるほど価値が上がる数少ない部位。"},{id:"cut_chicken_shoulder",number:"5",type:"regular",name_fr:"Épaule de poulet",name_en:"Shoulder (Furisode)",name_ja:"ふりそで",points:"36,60 46,60 46,72 36,72",properties:{tenderness:"★★★☆☆",fat:"★★☆☆☆",collagen:"★★☆☆☆"},cooking:"ソテー、軽い煮込み",science:"むねとももの中間的構造。加熱耐性と保水性のバランスが良い。",classification:"Sauté de volaille",logic:"Medium heat / Balanced cook",chef_note:"万能だが「主役より補助」に向く部位。"},{id:"cut_chicken_drumette",number:"2",type:"regular",name_fr:"Pilon de poulet",name_en:"Drumette",name_ja:"手羽もと",points:"44,78 56,78 56,92 44,92",properties:{tenderness:"★★★☆☆",fat:"★★★☆☆",collagen:"★★★★☆"},cooking:"ロティ、オーブン焼き、グリル",science:"骨周辺にコラーゲンが集中。長時間加熱でゼラチン化しジューシーになる。",classification:"Pilons rôtis aux épices",logic:"Medium-high heat / Bone-in cook",chef_note:"骨付き加熱の“旨味の設計図”が最も分かりやすい部位。"},{id:"cut_chicken_wing_joint",number:"1",type:"regular",name_fr:"Aileron de poulet",name_en:"Wing mid joint",name_ja:"手羽なか",points:"42,62 52,62 52,76 42,76",properties:{tenderness:"★★★★☆",fat:"★★★★☆",collagen:"★★★★☆"},cooking:"コンフィ、低温ロースト",science:"皮・脂・コラーゲンの三層構造。低温長時間で完全にゼラチン化する。",classification:"Ailerons confits",logic:"Low heat / Long cook / Confit",chef_note:"「溶ける食感」を作るための部位。"},{id:"cut_chicken_wing",number:"1",type:"regular",name_fr:"Aile de poulet",name_en:"Wing",name_ja:"手羽先",points:"44,64 54,64 54,74 44,74",properties:{tenderness:"★★★☆☆",fat:"★★★★☆",collagen:"★★★★★"},cooking:"ブイヨン、ロースト、揚げ",science:"コラーゲン含有量が極めて高く、加熱でゼラチン化しスープに濃度を与える。",classification:"Bouillon de volaille / Fond",logic:"Simmer / Long cook",chef_note:"フランス料理の“出汁の骨格”になる部位。"},{id:"cut_chicken_skin",number:"8",type:"regular",name_fr:"Peau de poulet",name_en:"Skin",name_ja:"かわ",points:"46,54 56,54 56,66 46,66",properties:{tenderness:"★★★☆☆",fat:"★★★★★",collagen:"★★★★★"},cooking:"ロースト、テュイル、揚げ焼き",science:"加熱により脂が溶け、コラーゲンが乾燥・再構築されクリスピー化する。",classification:"Tuile de peau de poulet",logic:"High heat / Fat render",chef_note:"「脂を抜くと完成する」特殊部位。"},{id:"cut_chicken_heart",number:"12",type:"offal",name_fr:"Cœur de poulet",name_en:"Heart",name_ja:"ハツ",points:"40,74 50,74 50,86 40,86",properties:{tenderness:"★★★☆☆",fat:"★★☆☆☆",collagen:"★★☆☆☆"},cooking:"グリル、串焼き",science:"心筋由来の高密度筋繊維。短時間加熱で弾力を残す。",classification:"Brochettes de cœurs de poulet",logic:"High heat / Quick cook",chef_note:"火を入れすぎると一気に硬化する。"},{id:"cut_chicken_cardiac_base",number:"12",type:"offal",name_fr:"Base de cœur",name_en:"Cardiac base",name_ja:"ハツモト",points:"42,75 52,75 52,85 42,85",properties:{tenderness:"★★★★☆",fat:"★★★☆☆",collagen:"★★★☆☆"},cooking:"フリカッセ、軽い煮込み",science:"血管・弾性繊維構造。クリーム系と相性が良い。",classification:"Fricassée d’abats de volaille",logic:"Medium heat / Gentle simmer",chef_note:"内臓の中でも“ソース適性が高い”部位。"},{id:"cut_chicken_liver",number:"13",type:"offal",name_fr:"Foie de poulet",name_en:"Liver",name_ja:"レバー",points:"38,78 48,78 48,90 38,90",properties:{tenderness:"★★★★☆",fat:"★★☆☆☆",collagen:"★☆☆☆☆"},cooking:"パテ、ソテー、ムース",science:"実質器官で構造が均質。加熱しすぎると急速に水分が抜ける。",classification:"Pâté de foies de volaille",logic:"Medium heat / Short cook",chef_note:"“火入れの1分差”で別食材になる。"},{id:"cut_chicken_gizzard",number:"11",type:"offal",name_fr:"Gésier de poulet",name_en:"Gizzard",name_ja:"砂肝",points:"42,72 52,72 52,82 42,82",properties:{tenderness:"★★☆☆☆",fat:"★☆☆☆☆",collagen:"★☆☆☆☆"},cooking:"コンフィ、煮込み、サラダ",science:"強い筋肉組織。低温長時間で繊維がほぐれる。",classification:"Salade Landaise",logic:"Low heat / Long cook / Confit",chef_note:"“砂肝の噛み応えの設計”を理解する部位。"},{id:"cut_chicken_tail",number:"9",type:"offal",name_fr:"Croupion",name_en:"Tail (Bonjiri)",name_ja:"ボンジリ",points:"50,60 60,60 60,72 50,72",properties:{tenderness:"★★★★★",fat:"★★★★★",collagen:"★★★☆☆"},cooking:"ロースト、グリル",science:"脂肪の集中部位。加熱で純脂の旨味が凝縮する。",classification:"Poulet rôti",logic:"Medium heat / Crisp grill",chef_note:"最も“快楽的な脂”を持つ部位。"},{id:"cut_chicken_cartilage_yagen",number:"14",type:"offal",name_fr:"Cartilage de poulet",name_en:"Cartilage (Yagen)",name_ja:"ヤゲン軟骨",points:"36,78 46,78 46,90 36,90",properties:{tenderness:"★☆☆☆☆",fat:"★☆☆☆☆",collagen:"★★★★★"},cooking:"スープ、フォン",science:"コラーゲンとプロテオグリカンが主体。加熱でゼラチン化しとろみを生む。",classification:"Fonds de volaille",logic:"Simmer / Long extraction",chef_note:"“ソースの粘度を作る素材”。"},{id:"cut_chicken_cartilage_knee",number:"15",type:"offal",name_fr:"Cartilage de poulet",name_en:"Cartilage (Nankotsu)",name_ja:"ひざ軟骨",points:"48,88 58,88 58,98 48,98",properties:{tenderness:"★☆☆☆☆",fat:"★☆☆☆☆",collagen:"★★★★★"},cooking:"スープ、フォン",science:"コラーゲンとプロテオグリカンが主体。加熱でゼラチン化しとろみを生む。",classification:"Fonds de volaille",logic:"Simmer / Long extraction",chef_note:"“ソースの粘度を作る素材”。"}],be=[{id:"cut_pork_loin",number:"1",type:"regular",name_fr:"Longe de porc",name_en:"Pork Loin",name_ja:"ロース",points:"52,56 64,56 64,72 52,72",properties:{tenderness:"★★★★☆",fat:"★★★☆☆",collagen:"★☆☆☆☆"},cooking:"ロースト、ソテー",science:"背側筋。均質な筋繊維＋脂の蓋で水分保持。",classification:"Roast cut",logic:"High heat / Short roast",chef_note:"“最も安定したステーキ素材”。"},{id:"cut_pork_tenderloin",number:"2",type:"regular",name_fr:"Filet mignon",name_en:"Tenderloin",name_ja:"ヒレ",points:"54,50 66,50 66,62 54,62",properties:{tenderness:"★★★★★",fat:"★☆☆☆☆",collagen:"★☆☆☆☆"},cooking:"ソテー、低温ロースト",science:"大腰筋。運動ゼロに近く筋繊維が極細。",classification:"Premium steak cut",logic:"Very short cook / Precision heat",chef_note:"“過熱した瞬間に価値が落ちる”。"},{id:"cut_pork_shoulder_loin",number:"3",type:"regular",name_fr:"Échine",name_en:"Shoulder loin",name_ja:"かたロース",points:"36,50 48,50 48,66 36,66",properties:{tenderness:"★★★★☆",fat:"★★★★☆",collagen:"★★★☆☆"},cooking:"煮込み、ロースト",science:"脂と赤身の網構造。熱耐性が高い。",classification:"Braise + Roast hybrid",logic:"Medium / Long cook対応",chef_note:"“焼きと煮込みの中間解”。"},{id:"cut_pork_belly",number:"4",type:"regular",name_fr:"Poitrine de porc",name_en:"Belly",name_ja:"ばら",points:"42,72 56,72 56,86 42,86",properties:{tenderness:"★★★★☆",fat:"★★★★★",collagen:"★★★★☆"},cooking:"煮込み、塩漬け、ロースト",science:"層状脂肪構造。塩で水分活性が下がり熟成が進む。",classification:"Charcuterie base cut",logic:"Long cook / Cure / Roast",chef_note:"“加工前提で完成する部位”。"},{id:"cut_pork_ham",number:"5",type:"regular",name_fr:"Jambon",name_en:"Ham leg (Cuissot)",name_ja:"もも",points:"60,60 74,60 74,78 60,78",properties:{tenderness:"★★★☆☆",fat:"★★☆☆☆",collagen:"★★☆☆☆"},cooking:"ハム、ロースト",science:"大筋肉群。塩分浸透と熟成に最適化。",classification:"Charcuterie premium",logic:"Cure / Low temp cook",chef_note:"“豚の価値はここで決まる”。"},{id:"cut_pork_cheek",number:"6",type:"offal",name_fr:"Joue de porc",name_en:"Cheek",name_ja:"頬肉",points:"28,70 40,70 40,84 28,84",properties:{tenderness:"★☆☆☆☆ → ★★★★★",fat:"★★★☆☆",collagen:"★★★★★"},cooking:"コンフィ、煮込み",science:"咀嚼筋。高密度コラーゲンが長時間で崩壊。",classification:"Braise cut (premium offal)",logic:"Very long cook",chef_note:"“ゼラチン化の完成形”。"},{id:"cut_pork_liver",number:"7",type:"offal",name_fr:"Foie de porc",name_en:"Liver",name_ja:"レバー",points:"46,64 58,64 58,76 46,76",properties:{tenderness:"★★★★☆",fat:"★★☆☆☆",collagen:"★☆☆☆☆"},cooking:"テリーヌ、パテ",science:"実質臓器。酸化が早く乳化処理が重要。",classification:"Charcuterie essential",logic:"Low heat / Emulsion",chef_note:"“単体より構造化して使う”。"},{id:"cut_pork_tongue",number:"8",type:"offal",name_fr:"Langue",name_en:"Tongue",name_ja:"タン",points:"22,70 32,70 32,84 22,84",properties:{tenderness:"★★★☆☆ → ★★★★★",fat:"★★★☆☆",collagen:"★★★★☆"},cooking:"煮込み、ゼリー寄せ",science:"筋＋結合組織の複合体。加熱で一体化する。",classification:"Abats nobles",logic:"Long cook / Gel setting",chef_note:"“煮ると一つの構造になる”。"},{id:"cut_pork_trotter",number:"9",type:"offal",name_fr:"Pied de porc",name_en:"Trotter",name_ja:"豚足",points:"38,88 50,88 50,98 38,98",properties:{tenderness:"★☆☆☆☆ → ★★★★★",fat:"★★★☆☆",collagen:"★★★★★"},cooking:"煮込み→焼き",science:"コラーゲン塊。ゼラチン→再加熱でテクスチャー分離。",classification:"Classic peasant cuisine",logic:"Very long cook + roast finish",chef_note:"“二段階変換で完成する部位”。"},{id:"cut_pork_intestine",number:"10",type:"offal",name_fr:"Boyaux",name_en:"Intestine",name_ja:"腸",points:"50,76 64,76 64,88 50,88",properties:{tenderness:"★★☆☆☆",fat:"★★★★☆",collagen:"★★★★☆"},cooking:"ソーセージ、加工",science:"平滑筋＋脂。香辛料と発酵で価値が決まる。",classification:"Charcuterie core material",logic:"Processed / Seasoned",chef_note:"“単体ではなく設計素材”。"}],ye=[{id:"cut_kokotxa_de_merlu",number:"1",type:"regular",name_fr:"Kokotxa de merlu",name_en:"Hake Kokotxa (jaw meat)",name_ja:"ココチャ（メルルーサの顎肉）",points:"22,46 36,46 36,58 22,58",properties:{tenderness:"★★★★★",fat:"★★☆☆☆",collagen:"★★★★★"},cooking:"ピルピル乳化、ポシェ",science:"魚の頭部下にある最も動かす筋肉かつゼラチンの宝庫。熱を加えることで豊富な天然コラーゲンが容易に溶け出す。",classification:"Spécialité basque (バスク特産高級部位)",logic:"Low heat / Emulsification",chef_note:"オリーブ油を完全乳化させ、ソースと一体化させる。"},{id:"cut_fish_fillet",number:"2",type:"regular",name_fr:"Filet de poisson",name_en:"Fish Fillet",name_ja:"フィレ（魚の切り身）",points:"44,40 68,40 68,54 44,54",properties:{tenderness:"★★★★☆",fat:"★☆☆☆☆",collagen:"★☆☆☆☆"},cooking:"ソテー、ポワレ、蒸し",science:"赤身および白身の筋肉繊維。陸上動物に比べて結合組織（コラーゲン）が非常に少ないため、短時間の精密な加熱が必須。",classification:"Poisson de fond (底生魚・白身)",logic:"Short cook / High-precision heat",chef_note:"皮はパリッと、身はしっとりと仕上げる。"}],_e=[{id:"cut_magret_de_canard",number:"1",type:"regular",name_fr:"Magret de canard",name_en:"Duck breast (Fattened)",name_ja:"マグレ・ド・カナール（フォアグラ鴨の胸肉）",points:"36,58 52,58 52,74 36,74",properties:{tenderness:"★★★★☆",fat:"★★★★★",collagen:"★★☆☆☆"},cooking:"ポワレ、ロティ",science:"フォアグラ用に肥育された鴨の胸肉。厚い皮下脂肪層を持ち、脂を溶かし出しながらその脂で揚げるように皮目をパリパリに焼く。",classification:"Volaille de prestige (高級家禽)",logic:"Fat rendering / Medium-rare finish",chef_note:"皮目の格子状の切れ込みと、絶え間ないアロゼが成功の鍵。"},{id:"cut_gibier_chevreuil",number:"2",type:"regular",name_fr:"Filet de chevreuil",name_en:"Venison loin (Roe deer)",name_ja:"ロワイヤル・ド・シュヴルイユ（鹿のロース）",points:"54,46 72,46 72,62 54,62",properties:{tenderness:"★★★★☆",fat:"★☆☆☆☆",collagen:"★★★☆☆"},cooking:"ロティ、ポワレ、ソース・ポワブラード",science:"野生の鹿肉。極めて低脂肪で高タンパク質な赤身肉のため、強火での過加熱は禁物。芯温54°C前後を狙う繊細な火入れが必要。",classification:"Gibier de poil (毛のある野生獣肉)",logic:"Delicate roast / Rare to Medium-rare",chef_note:"ベリー系や赤ワインの濃厚な酸味ソースを合わせる。"}],ee=[{id:"reg_normandie",number:"N",name_fr:"Normandie",name_en:"Normandy",name_ja:"ノルマンディー地方",points:"22,16 38,16 38,28 22,28",desc_fr:"Célèbre pour ses riches pâturages et ses vergers de pommiers. Cuisine dominée par les produits laitiers et les pommes. Ingrédients clés : Fromage Camembert, Pommes. Plats classiques : Sole Normande, Poulet Vallée d'Auge. (Débarquement de Normandie (1944) Normandie)",desc_en:"Famous for lush green dairy pastures and apple orchards. Normandy cuisine is defined by heavy cream, raw butter, world-class cheese, and apples. Key ingredients: Camembert cheese, Apples. Signature dishes: Sole Normande, Poulet Vallée d'Auge. (Normandy Landings (1944) Normandy)",desc_ja:"フランス北西部の沿岸地域。冷涼な気候を活かしたリンゴの栽培（シードル、カルヴァドス）と、フランス最高峰の乳製品の産地として高名。魚介類にも恵まれ、生クリームを贅沢に使ったコク深い味付けが特徴。代表食材：カマンベールチーズ、リンゴ。代表料理：ソール・ノルマンド、プーレ_ヴァレ_ドージュ。歴史的出来事：(ノルマンディー上陸作戦 (1944) ノルマンディー)"},{id:"reg_bourgogne",number:"B",name_fr:"Bourgogne",name_en:"Burgundy",name_ja:"ブルゴーニュ地方",points:"52,38 66,38 66,54 52,54",desc_fr:"Le cœur de la gastronomie classique française et des vins de prestige. Réputée pour ses viandes de Charolais et ses sauces au vin rouge réduit. Ingrédients clés : Bœuf Charolais, Moutarde de Dijon. Plats classiques : Bœuf Bourguignon, Escargots à la persillade, Coq au Vin. (Bataille d'Alésia (-52) Alésia)",desc_en:"The historic heartland of French wine, Charolais cattle, and Dijon mustard. Reduced red wine is heavily featured in regional sauces. Key ingredients: Charolais Beef, Dijon Mustard. Signature dishes: Bœuf Bourguignon, Escargots de Bourgogne, Coq au Vin. (Battle of Alesia (-52) Alesia)",desc_ja:"名高き特級ワインと古典フランス料理の中心地。広大な牧草地で育つ最高級のシャロレー牛やディジョンマスタードが名産。ワイン煮込み料理の発祥地であり、濃厚なソースが基本です。代表食材：シャロレー牛、ディジョンマスタード。代表料理：ブフ_ブルギニョン、エスカルゴのブルゴーニュ風、コック_オ_ヴァン。歴史的出来事：(アレシアの戦い (2026年より紀元前52年) アレシア)"},{id:"reg_provence",number:"P",name_fr:"Provence",name_en:"Provence",name_ja:"プロヴァンス地方",points:"64,70 80,70 80,86 64,86",desc_fr:"Région baignée de soleil, influencée par la mer Méditerranée. Se base sur l'huile d'olive, l'ail, la tomate et les herbes aromatiques au lieu du beurre. Ingrédients clés : Huile d'olive, Herbes de Provence. Plats classiques : Bouillabaisse, Ratatouille, Salade Niçoise. (Papauté d'Avignon (1309) Avignon)",desc_en:"Sun-drenched Mediterranean cooking. Unlike the north, Provence avoids butter, using olive oil, garlic, fresh tomatoes, and aromatic wild herbs instead. Key ingredients: Olive oil, Herbes de Provence. Signature dishes: Bouillabaisse, Ratatouille, Salade Niçoise. (Avignon Papacy (1309) Avignon)",desc_ja:"地中海に面した温暖な南仏地域。乳製品主体の北部とは対照的に、オリーブオイル、にんにく、トマト、ハーブ類を主役とする健康的で明るい地中海料理が魅力。代表食材：オリーブオイル、プロヴァンス_ハーブ。代表料理：ブイヤベース、ラタトゥイユ、ニース風サラダ。歴史的出来事：(アヴィニョン捕囚 (1309) アヴィニョン)"},{id:"reg_alsace",number:"A",name_fr:"Alsace",name_en:"Alsace",name_ja:"アルザス地方",points:"76,22 90,22 90,38 76,38",desc_fr:"Région à la frontière allemande, combinant des ingrédients robustes et des vins blancs fruités. Célèbre pour ses charcuteries de porc et son chou. Ingrédients clés : Chou à choucroute, Saucisse de Strasbourg. Plats classiques : Choucroute Garnie, Flammekueche, Baeckeoffe. (Cession de l'Alsace-Lorraine (1871) Alsace)",desc_en:"Bordering Germany, Alsace combines hearty Germanic staples with dry, aromatic French white wines. Noted for curing meats, sausages, and sauerkraut. Key ingredients: Sauerkraut, Strasbourg Sausage. Signature dishes: Choucroute Garnie, Flammekueche, Baeckeoffe. (Ceding of Alsace-Lorraine (1871) Alsace)",desc_ja:"ドイツ国境沿いに位置する北東の地方。地元の白ワインと合わせる豚肉のスモーク、自家製ソーセージ、塩漬けキャベツ（シュークルート）が名物。ドイツの質実剛健さとフランスの洗練が融合。代表食材：シュークルート、ストラスブール_ソーセージ。代表料理：シュークルート_ガルニ、タルト_フランベ、ベッコフ。歴史的出来事：(アルザス・ロレーヌ割譲 (1871) アルザス)"},{id:"reg_bretagne",number:"BR",name_fr:"Bretagne",name_en:"Brittany",name_ja:"ブルターニュ地方",points:"6,26 22,26 22,40 6,40",desc_fr:"Région maritime sauvage à l'ouest. Sa cuisine est marquée par l'océan, l'utilisation de beurre salé et de sarrasin pour ses crêpes. Ingrédients clés : Farine de sarrasin, Beurre salé. Plats classiques : Galette de sarrasin, Cotriade, Kouign-amann. (Union de la Bretagne à la France (1532) Vannes)",desc_en:"A rugged maritime region in the west. Its cuisine is heavily shaped by the Atlantic ocean, hearty buckwheat, and rich salted butter culture. Key ingredients: Buckwheat flour, Salted butter. Signature dishes: Buckwheat Galette, Cotriade, Kouign-amann. (Union of Brittany and France (1532) Vannes)",desc_ja:"大西洋に突き出た最西端の沿岸地域。豊かな海洋資源に加え、ガレット（クレープ）に使われるそば粉や有塩バターの文化が深く根付く独自の土地柄。代表食材：そば粉、有塩バター。代表料理：ガレット_ド_サラザン、コトリアード（魚介スープ）、クイニーアマン。歴史的出来事：(ブルターニュ公国のフランス併合 (1532) ヴァンヌ)"},{id:"reg_ile_de_france",number:"IF",name_fr:"Île-de-France",name_en:"Île-de-France",name_ja:"イル・ド・フランス地方",points:"44,20 56,20 56,34 44,34",desc_fr:"Le centre politique et culturel de la France. Berceau de la haute gastronomie, influencé par les meilleurs produits de tout le pays. Ingrédients clés : Champignon de Paris, Brie de Meaux. Plats classiques : Pot-au-feu, Soupe à l'oignon, Entrecôte Bercy. (Révolution française (1789) Paris)",desc_en:"The political and cultural heartland of France. The historical birthplace of haute cuisine, featuring refined bistro classics and royal traditions. Key ingredients: Paris Mushroom, Brie de Meaux. Signature dishes: Pot-au-feu, French Onion Soup, Entrecôte Bercy. (French Revolution (1789) Paris)",desc_ja:"パリを中心とする首都圏地域。宮廷料理から発展した高級ガストロノミーと、洗練されたビストロ料理の発祥地。国内中から最高の一級食材集まります。代表食材：マッシュルーム、ブリー_ド_モー（チーズ）。代表料理：ポトフ、オニオングラタンスープ、アントルコート_ベルシー。歴史的出来事：(フランス革命 (1789) パリ)"},{id:"reg_aquitaine",number:"AQ",name_fr:"Nouvelle-Aquitaine",name_en:"Aquitaine / Southwest",name_ja:"アキテーヌ（南西地方）",points:"24,54 42,54 42,74 24,74",desc_fr:"Région du Sud-Ouest, réputée pour sa gastronomie généreuse et ses grands vins de Bordeaux. Spécialisée dans la cuisine du canard et du foie gras. Ingrédients clés : Foie gras, Canard. Plats classiques : Confit de canard, Cassoulet, Magret de canard. (Fin de la Guerre de Cent Ans (1453) Castillon)",desc_en:"A southwestern region famous for its rich, hearty cuisine and world-renowned Bordeaux wines. Highly specialized in duck fats and savory foie gras. Key ingredients: Foie gras, Duck meat. Signature dishes: Duck Confit, Cassoulet, Magret de canard. (End of the Hundred Years' War (1453) Castillon)",desc_ja:"ジロンド川からピレネー山脈に広がる美食の地帯。ボルドーワインを擁し、フランス随一のフォアグラの産地であり、鴨の脂や肉を巧みに使った濃厚で贅沢な郷土料理が特徴。代表食材：フォアグラ、鴨肉。代表料理：鴨のコンフィ、カスレ、マグレ_ド_カナール。歴史的出来事：(百年戦争終結 (1453) カスティヨン)"},{id:"reg_rhone_alpes",number:"RA",name_fr:"Auvergne-Rhône-Alpes",name_en:"Rhône-Alpes / Lyonnais",name_ja:"ローヌ・アルプ（リヨン地方）",points:"60,50 76,50 76,68 60,68",desc_fr:"Considérée comme la capitale mondiale de la gastronomie (Lyon). Cuisine riche, alliant les grands fromages des Alpes et les volailles de Bresse. Ingrédients clés : Volaille de Bresse, Saucisson de Lyon. Plats classiques : Quenelle de brochet, Poulet aux morilles, Gratin Dauphinois. (Révolte des Canuts (1831) Lyon)",desc_en:"Often crowned as the gastronomic capital of the world (Lyon). A rich culinary style combining premium alpine cheeses with legendary bistro fares. Key ingredients: Bresse Poultry, Lyon Sausage. Signature dishes: Pike Quenelle, Poulet de Bresse with morals, Gratin Dauphinois. (Silk weavers' revolts (1831) Lyon)",desc_ja:"「世界の美食の都」と称されるリヨンを擁する地方。アルプスの山岳チーズや最高峰の鶏肉を活かした、力強くも洗練されたビストロ（ブション）文化が息づく。代表食材：ブレス鶏、リヨン風ソーセージ。代表料理：川魚のクネル、ブレス鶏のモリーユ茸クリーム煮、グラタン_ドフィノワ。歴史的出来事：(リヨン絹織物職人の蜂起 (1831) リヨン)"},{id:"reg_loire",number:"LO",name_fr:"Centre-Val de Loire",name_en:"Loire Valley",name_ja:"ロワール地方",points:"34,32 50,32 50,48 34,48",desc_fr:"Surnommée le Jardin de la France. Connue pour ses châteaux royaux, ses vins élégants, ses fromages de chèvre et ses délicieux poissons de rivière. Ingrédients clés : Sainte-Maure de Touraine, Poissons de Loire. Plats classiques : Rillettes de Tours, Brochet au beurre blanc, Tarte Tatin. (Siège d'Orléans par Jeanne d'Arc (1429) Orléans)",desc_en:"Known as the Garden of France. Famous for fairy-tale châteaux, elegant white wines, delicate goat cheeses, and fresh river fish. Key ingredients: Sainte-Maure de Touraine (goat cheese), Loire River fish. Signature dishes: Rillettes of Tours, Pike with beurre blanc, Tarte Tatin. (Siege of Orléans (1429) Orléans)",desc_ja:"「フランスの庭園」と呼ばれる風光明媚な古城地帯。王侯貴族に愛された気品ある白ワイン、多種多様な山羊乳チーズ（シェーヴル）、豊かな川魚料理が魅力。代表食材：サント_モール_ド_トゥーレーヌ、ロワール川の川魚。代表料理：リエット、川魚のブールブランソース添え、タルトタタン。歴史的出来事：(ジャンヌ・ダルクによるオルレアン解放 (1429) オルレアン)"},{id:"reg_champagne",number:"CH",name_fr:"Grand Est (Champagne)",name_en:"Champagne",name_ja:"シャンパーニュ地方",points:"54,16 68,16 68,32 54,32",desc_fr:"Célèbre dans le monde entier pour son vin effervescent unique. La cuisine locale propose des plats mijotés robustes pour contrer les hivers froids. Ingrédients clés : Vin de Champagne, Jambon des Ardennes. Plats classiques : Potée Champenoise, Biscuits roses de Reims. (Sacre de Clovis / Rois de France (496) Reims)",desc_en:"Northeast region celebrated globally for its unique sparkling wine. The local kitchen offers rustic pot-roasted meats to counter cold northern winters. Key ingredients: Champagne Wine, Ardennes Ham. Signature dishes: Potée Champenoise, Pink Biscuits of Reims. (Coronation of Clovis / Kings of France (496) Reims)",desc_ja:"世界で最も高貴なスパークリングワイン「シャンパン」の故郷。北東部の寒冷な気候をしのぐため、お肉や野菜をじっくり煮込んだ素朴で温かい伝統鍋が愛されています。代表食材：シャンパン、アルデンヌの生ハム。代表料理：ポテ_シャンプノワーズ、ビスキュイ_ローズ_ド_ランス。歴史的出来事：(フランク王国クローヴィスおよび歴代国王の戴カン式 (496) ランス)"},{id:"reg_languedoc",number:"LA",name_fr:"Occitanie (Languedoc)",name_en:"Languedoc / South",name_ja:"ラングドック地方",points:"38,68 54,68 54,84 38,84",desc_fr:"Région méditerranéenne du Sud, marquée par des influences occitanes. Propose une cuisine de terroir généreuse, parfumée à l'ail, aux olives et aux fruits de mer. Ingrédients clés : Haricot lingot, Anchois de Collioure. Plats classiques : Cassoulet de Castelnaudary, Brandade de morue, Tielle sétoise. (Croisade des albigeois (1209) Béziers)",desc_en:"A southern Mediterranean region with strong Occitan roots. Features rustic landward cooking packed with garlic, rich olive oils, and fresh seafood. Key ingredients: Lingot Beans, Collioure Anchovies. Signature dishes: Cassoulet, Brandade de morue, Tielle sétoise. (Albigensian Crusade (1209) Béziers)",desc_ja:"地中海に面した南仏の西側エリア。オリーブやにんにく、トマトを多用し、カステルノーダリの伝統的な豆の煮込みや、豊かな海の幸を組み合わせた力強い郷土料理が特徴。代表食材：白インゲン豆、コリウールのアンチョビ。代表料理：カスレ、ブランダード_ド_モリュ、ティエル（タコのパイ）。歴史的出来事：(アルビジョワ十字軍 (1209) ベジエ)"},{id:"reg_corse",number:"CO",name_fr:"Corse",name_en:"Corsica",name_ja:"コルシカ島",points:"80,80 92,80 92,94 80,94",desc_fr:"L'Île de Beauté au caractère sauvage. Sa cuisine est basée sur les produits de la montagne, les châtaignes, le fromage de brebis et la charcuterie. Ingrédients clés : Farine de châtaigne, Lonzu. Plats classiques : Civet de sanglier, Fiadone, Veau aux olives. (Naissance de Napoléon Bonaparte (1769) Ajaccio)",desc_en:"The Island of Beauty with a rugged mountain character. Its unique cuisine is driven by aromatic wild herbs, chestnut forests, sheep cheese, and cured pork. Key ingredients: Chestnut flour, Lonzu (cured pork). Signature dishes: Wild Boar Civet, Fiadone, Veau aux olives. (Birth of Napoleon Bonaparte (1769) Ajaccio)",desc_ja:"地中海に浮かぶ険しい山岳の島。独自の生態系が育む栗の粉、野生ハーブを食べて放牧された地豚の熟成肉（シャルキュトリー）、羊乳チーズなどを活かした力強い山のごちそう。代表食材：栗粉、ロンズ（豚肉の熟成肉）。代表料理：イノシシのシヴェ（煮込み）、フィアドーヌ（チーズケーキ）、子牛肉のオリーブ煮。歴史的出来事：(ナポレオン・ボナパルト誕生 (1769) アジャクシオ)"},{id:"reg_hauts_de_france",number:"HF",name_fr:"Hauts-de-France",name_en:"Northern France / Flanders",name_ja:"オー・ド・フランス地方（北フランス）",points:"44,4 58,4 58,18 44,18",desc_fr:"Région du Nord influencée par la culture flamande. Connue pour sa cuisine mijotée à la bière, ses frites croustillantes et ses fromages forts. Ingrédients clés : Fromage Maroilles, Endive. Plats classiques : Carbonnade Flamande, Potjevleesch, Moules-frites. (Bataille de Dunkerque (1940) Dunkerque)",desc_en:"Northernmost region deeply influenced by Flemish culture. Noted for comforting beer-infused slow cooking, intense aromatic cheeses, and crispy fries. Key ingredients: Maroilles Cheese, Endive. Signature dishes: Carbonnade Flamande, Potjevleesch, Moules-frites. (Battle of Dunkirk (1940) Dunkirk)",desc_ja:"ベルギーと国境を接するフランス最北部。ワインではなくビールを使った煮込み料理や、独特な強い香りのマロワール・チーズ、野菜のチコリ（エンダイブ）が名物。フランドル文化の温かみがあります。代表食材：マロワール・チーズ、チコリ。代表料理：カルボナード（牛肉のビール煮）、ポチェブリーシュ、ムール_フリット。歴史的出来事：(ダンケルクの戦い (1940) ダンケルク)"}],xe={reg_normandie:{dishes:["sole_normande","poulet_vallee_d_auge"],ingredients:["cheese_camembert","apple"],techniques:["pocher","sauter"],sauces:["sauce_creme","sauce_normande"]},reg_bourgogne:{dishes:["beef_bourguignon","escargots_persillade","coq_au_vin"],ingredients:["beef_charolais","mustard_dijon"],techniques:["braiser","mijoter"],sauces:["sauce_vin_rouge"]},reg_provence:{dishes:["bouillabaisse","ratatouille","salade_nicoise"],ingredients:["oil_olive","herbes_de_provence"],techniques:["mijoter","griller"],sauces:["rouille","vinaigrette"]},reg_alsace:{dishes:["choucroute_garnie","flammekueche","baeckeoffe"],ingredients:["sauerkraut","strasbourg_sausage"],techniques:["braiser","mijoter"],sauces:[]},reg_bretagne:{dishes:["galette_sarrasin","cotriade","kouign_amann"],ingredients:["buckwheat_flour","salted_butter"],techniques:["poeler","griller"],sauces:["beurre_blanc"]},reg_ile_de_france:{dishes:["pot_au_feu","soupe_oignon","entrecote_bercy"],ingredients:["mushroom_paris","cheese_brie"],techniques:["mijoter","griller"],sauces:["sauce_bercy"]},reg_aquitaine:{dishes:["confit_canard","cassoulet","magret_canard","ttoro_basque","axoa_de_veau","poulet_basquaise"],ingredients:["foie_gras","duck","cut_kokotxa_de_merlu"],techniques:["confire","braiser","mijoter","rotir_sur_braise"],sauces:["sauce_piperade","sauce_encre_basque"]},reg_rhone_alpes:{dishes:["quenelle_brochet","poulet_morilles","gratin_dauphinois"],ingredients:["poultry_bresse","sausage_lyon"],techniques:["pocher","braiser","gratiner"],sauces:["sauce_nantua","sauce_supreme"]},reg_loire:{dishes:["rillettes_tours","brochet_beurre_blanc","tarte_tatin"],ingredients:["goat_cheese_sainte_maure","river_fish"],techniques:["confire","pocher"],sauces:["beurre_blanc"]},reg_champagne:{dishes:["potee_champenoise","biscuits_roses"],ingredients:["wine_champagne","ham_ardennes"],techniques:["braiser","mijoter"],sauces:[]},reg_languedoc:{dishes:["cassoulet","brandade_morue","tielle_setoise"],ingredients:["lingot_bean","anchovy"],techniques:["braiser","mijoter"],sauces:[]},reg_corse:{dishes:["civet_sanglier","fiadone","veau_olives"],ingredients:["chestnut_flour","lonzu_charcuterie"],techniques:["braiser","mijoter"],sauces:[]},reg_hauts_de_france:{dishes:["carbonnade_flamande","potjevleesch","moules_frites"],ingredients:["cheese_maroilles","endive"],techniques:["braiser","mijoter"],sauces:["sauce_biere"]}},ke={cut_filet:{techniques:["griller","rotir","sauter"],science:["muscle_fibers","low_collagen"],sauces:["sauce_bearnaise","sauce_madere"],dishes:["tournedos_rossini"]},cut_rumsteck:{techniques:["griller","rotir"],science:["iron_taste"],sauces:["sauce_poivre"],dishes:[]},cut_aiguillette:{techniques:["rotir","griller"],science:["fat_insulation"],sauces:[],dishes:[]},cut_palette:{techniques:["braiser","mijoter"],science:["collagen_emulsification"],sauces:["sauce_chasseur"],dishes:[]},cut_poitrine:{techniques:["braiser","mijoter"],science:["collagen_gelatinization"],sauces:[],dishes:["pot_au_feu"]},cut_langue:{techniques:["braiser","mijoter","sauter"],science:["collagen_gelatinization"],sauces:["sauce_gribiche","sauce_madere"],dishes:[]},cut_onglet:{techniques:["griller","sauter"],science:["muscle_fibers"],sauces:["sauce_echalote"],dishes:[]},cut_foie:{techniques:["sauter"],science:["protein_coagulation"],sauces:[],dishes:["pate_de_campagne"]},cut_tripe:{techniques:["braiser","mijoter"],science:["collagen_breakdown"],sauces:[],dishes:["tripes_a_la_mode_de_caen"]},cut_boyaux:{techniques:["griller","embouter"],science:["curing_and_fermentation"],sauces:[],dishes:["andouillette"]},cut_chicken_breast:{techniques:["pocher","sauter","sous_vide"],science:["moisture_loss","protein_coagulation"],sauces:["sauce_supreme"],dishes:["supreme_de_volaille"]},cut_chicken_tender:{techniques:["sauter","friture"],science:["short_cook"],sauces:[],dishes:[]},cut_chicken_thigh:{techniques:["rotir","braiser","mijoter"],science:["collagen_gelatinization"],sauces:["sauce_chasseur"],dishes:["coq_au_vin"]},cut_chicken_shoulder:{techniques:["sauter","braiser"],science:["balanced_meat"],sauces:[],dishes:[]},cut_chicken_drumette:{techniques:["rotir","griller"],science:["bone_in_cooking"],sauces:[],dishes:[]},cut_chicken_wing_joint:{techniques:["confire","rotir"],science:["collagen_gelatinization"],sauces:[],dishes:[]},cut_chicken_wing:{techniques:["mijoter","rotir"],science:["gelatin_extraction"],sauces:[],dishes:["fond_de_volaille"]},cut_chicken_skin:{techniques:["rotir","sauter"],science:["fat_rendering","crispy_skin"],sauces:[],dishes:[]},cut_chicken_heart:{techniques:["griller"],science:["muscle_fibers"],sauces:[],dishes:[]},cut_chicken_cardiac_base:{techniques:["braiser","mijoter"],science:["cream_affinity"],sauces:[],dishes:[]},cut_chicken_liver:{techniques:["sauter"],science:["moisture_loss"],sauces:[],dishes:["pate_de_foie_de_volaille"]},cut_chicken_gizzard:{techniques:["confire","braiser"],science:["muscle_fibers"],sauces:[],dishes:["salade_landaise"]},cut_chicken_tail:{techniques:["rotir","griller"],science:["fat_rendering"],sauces:[],dishes:[]},cut_chicken_cartilage_yagen:{techniques:["mijoter"],science:["gelatin_extraction"],sauces:[],dishes:["fond_de_volaille"]},cut_chicken_cartilage_knee:{techniques:["mijoter"],science:["gelatin_extraction"],sauces:[],dishes:["fond_de_volaille"]},cut_pork_loin:{techniques:["rotir","sauter"],science:["moisture_loss"],sauces:["sauce_charcutiere"],dishes:[]},cut_pork_tenderloin:{techniques:["sauter","rotir"],science:["protein_coagulation"],sauces:["sauce_moutarde"],dishes:[]},cut_pork_shoulder_loin:{techniques:["braiser","rotir"],science:["fat_and_lean_interweave"],sauces:[],dishes:[]},cut_pork_belly:{techniques:["braiser","saler","rotir"],science:["curing_and_fermentation"],sauces:[],dishes:["pate_de_campagne","petit_sale_aux_lentilles"]},cut_pork_ham:{techniques:["saler","rotir"],science:["curing_and_fermentation"],sauces:[],dishes:["jambon_blanc","jambon_cru"]},cut_pork_cheek:{techniques:["confire","braiser"],science:["collagen_gelatinization"],sauces:[],dishes:[]},cut_pork_liver:{techniques:["sauter"],science:["emulsification"],sauces:[],dishes:["pate_de_campagne"]},cut_pork_tongue:{techniques:["braiser","mijoter"],science:["collagen_gelatinization"],sauces:["sauce_piquante"],dishes:[]},cut_pork_trotter:{techniques:["braiser","rotir"],science:["collagen_gelatinization"],sauces:[],dishes:["pied_de_porc_pane"]},cut_pork_intestine:{techniques:["griller","confire"],science:["curing_and_fermentation"],sauces:[],dishes:["andouille","andouillette"]},cut_kokotxa_de_merlu:{techniques:["emulser_au_pil_pil","pocher"],science:["collagen_gelatinization"],sauces:["sauce_verte_basque"],dishes:["kokotxas_de_merlu_au_pil_pil"]},cut_fish_fillet:{techniques:["sauter","pocher"],science:["protein_coagulation"],sauces:["beurre_blanc"],dishes:[]},cut_magret_de_canard:{techniques:["sauter","rotir"],science:["fat_rendering"],sauces:["sauce_echalote"],dishes:["magret_canard","salade_landaise"]},cut_gibier_chevreuil:{techniques:["rotir","sauter"],science:["protein_coagulation"],sauces:["sauce_poivre"],dishes:[]}},Ce={sole_normande:{name_fr:"Sole Normande",name_en:"Normandy Sole",name_ja:"ソール・ノルマンド",desc:"シタビラメを魚のブイヨン、生クリーム、キノコ、カキ、ムール貝と共に調理した、ノルマンディー沿岸を代表する高貴な魚料理。"},poulet_vallee_d_auge:{name_fr:"Poulet Vallée d'Auge",name_en:"Chicken Vallée d'Auge",name_ja:"プーレ・ヴァレ・ドージュ",desc:"鶏肉をリンゴ（カルヴァドスまたはシードル）と濃厚な生クリーム、キノコと共に煮込んだ、コトコト煮込みの郷土料理。"},beef_bourguignon:{name_fr:"Bœuf Bourguignon",name_en:"Beef Burgundy",name_ja:"ブフ・ブルギニョン",desc:"牛肉をブルゴーニュ産赤ワイン、小タマネギ、キノコ、ベーコンと共にじっくり煮込んだ、フランス古典料理の代名詞。"},escargots_persillade:{name_fr:"Escargots à la persillade",name_en:"Burgundy Escargots with Parsley Butter",name_ja:"エスカルゴのパセリバター焼き",desc:"エスカルゴ（食用カタツムリ）の殻にパセリとにんにくを練り込んだバター（ブルギニョンバター）を詰めてオーブンで焼いた料理。"},coq_au_vin:{name_fr:"Coq au Vin",name_en:"Rooster in Red Wine",name_ja:"コック・オ・ヴァン",desc:"雄鶏の肉を赤ワイン、香味野菜、ベーコン、キノコと共にじっくり煮込んだ、ブルゴーニュ地方発祥の伝統料理。"},bouillabaisse:{name_fr:"Bouillabaisse",name_en:"Bouillabaisse",name_ja:"ブイヤベース",desc:"地中海の様々な岩礁魚を、ニンニク、サフラン、オリーブオイル、フェンネルと共に煮込んだ、マルセイユ発祥の名物魚スープ。"},ratatouille:{name_fr:"Ratatouille",name_en:"Ratatouille",name_ja:"ラタトゥイユ",desc:"ナス、ズッキーニ、パプリカ、トマトなどの夏野菜をオリーブオイルとハーブでじっくり炒め煮にした、プロヴァンス地方の野菜料理。"},salade_nicoise:{name_fr:"Salade Niçoise",name_en:"Niçoise Salad",name_ja:"ニース風サラダ",desc:"トマト、アンチョビ、ゆで卵、オリーブ、インゲン、ツナなどにオリーブオイルをかけた、ニース発祥の爽やかなサラダ。"},choucroute_garnie:{name_fr:"Choucroute Garnie",name_en:"Sauerkraut with Pork and Sausages",name_ja:"シュークルート・ガルニ",desc:"発酵させた塩漬けキャベツ（シュークルート）を白ワインで煮込み、ソーセージや豚肉の塩漬けを添えたアルザス地方の代表料理。"},flammekueche:{name_fr:"Flammekueche / Tarte Flambée",name_en:"Flammekueche",name_ja:"タルト・フランベ",desc:"薄いパン生地にフロマージュ・ブラン、玉ねぎ、ベーコンをのせて高温の薪窯でパリッと焼き上げた、アルザス風ピザ。"},baeckeoffe:{name_fr:"Baeckeoffe",name_en:"Baeckeoffe",name_ja:"ベッコフ",desc:"牛肉、豚肉、羊肉とジャガイモ、玉ねぎをアルザス白ワインでマリネし、土鍋（テリーヌ型）でパン生地で密閉して長時間焼き上げたパン屋の鍋料理。"},galette_sarrasin:{name_fr:"Galette de sarrasin",name_en:"Buckwheat Galette",name_ja:"ガレット・ド・サラザン",desc:"そば粉で作った薄いクレープ生地に、ハム、卵、チーズ（コンプレ）などを包んで香ばしく焼いたブルターニュ地方の主食。"},cotriade:{name_fr:"Cotriade",name_en:"Brittany Fish Stew",name_ja:"コトリアード",desc:"地元の様々な魚とジャガイモをハーブの効いたブイヨンでさっと煮込み、トーストを添えて食べるブルターニュの漁師の魚スープ。"},kouign_amann:{name_fr:"Kouign-amann",name_en:"Kouign-amann",name_ja:"クイニーアマン",desc:"パン生地に大量のバターと砂糖を折り込み、外側をキャラメリゼさせて焼き上げた、ブルターニュの濃厚な伝統菓子。"},pot_au_feu:{name_fr:"Pot-au-feu",name_en:"Pot-au-feu",name_ja:"ポトフ",desc:"牛肉の塊と塊の野菜（人参、カブ、ネギなど）を水からじっくり煮込み、スープと具材を別々に楽しむフランス伝統の家庭料理。"},soupe_oignon:{name_fr:"Soupe à l'oignon",name_en:"French Onion Soup",name_ja:"オニオングラタンスープ",desc:"飴色に炒めた玉ねぎのスープに、バゲットとチーズをのせてオーブンでこんがりとグラチネしたパリ名物の温かいスープ。"},entrecote_bercy:{name_fr:"Entrecôte Bercy",name_en:"Bercy Entrecote",name_ja:"アントルコート・ベルシー",desc:"リブロースステーキに、白ワイン、シャロット、エシャロット、牛の骨髄、バターを合わせた香り豊かなベルシーソースをかけた料理。"},confit_canard:{name_fr:"Confit de canard",name_en:"Duck Confit",name_ja:"鴨のコンフィ",desc:"塩でマリネした鴨の骨付きもも肉を、鴨の脂の中で低温でじっくりと煮込み、仕上げに皮目をパリッと焼き上げた南西地方の保存食。"},cassoulet:{name_fr:"Cassoulet",name_en:"Cassoulet",name_ja:"カスレ",desc:"白インゲン豆と、鴨のコンフィ、豚肉、ソーセージなどを特製の土鍋（カソール）で長時間じっくりと焼き煮にした、ラングドック地方発祥の重厚な煮込み料理。"},magret_canard:{name_fr:"Magret de canard",name_en:"Duck Breast",name_ja:"マグレ・ド・カナール",desc:"フォアグラ用に肥育された鴨の胸肉（マグレ）を、皮目を格子状に切り込んで脂を出しながらミディアムレアに焼き上げたステーキ。"},quenelle_brochet:{name_fr:"Quenelle de brochet",name_en:"Pike Quenelle",name_ja:"川魚のクネル",desc:"カワカマス（淡水魚）のすり身に卵やバターを合わせてラグビーボール状にし、茹でてからザリガニソース（ナンチュアソース）をかけてオーブンで焼いたリヨンの名物。"},poulet_morilles:{name_fr:"Poulet Bresse aux morilles",name_en:"Bresse Chicken with Morel Mushrooms",name_ja:"ブレス鶏のモリーユ茸ソース",desc:"最高級ブレス産の鶏肉を、乾燥モリーユ茸（アミガサタケ）の旨味を引き出した生クリームソースで贅沢に煮込んだ極上の一皿。"},gratin_dauphinois:{name_fr:"Gratin Dauphinois",name_en:"Potato Gratin",name_ja:"グラタン・ドフィノワ",desc:"スライスしたジャガイモに、ニンニク、生クリーム、牛乳を加えてオーブンでじっくりと焼き上げた、チーズを使わない伝統的なジャガイモグラタン。"},rillettes_tours:{name_fr:"Rillettes de Tours",name_en:"Rillettes of Tours",name_ja:"リエット（トゥール風）",desc:"豚肉をラードの中で繊維がほぐれるまで数時間煮込み、冷やして脂肪で固めたペースト。バゲットに塗って食べる。"},brochet_beurre_blanc:{name_fr:"Brochet au beurre blanc",name_en:"Pike with Beurre Blanc Sauce",name_ja:"川魚のブール・ブラン添え",desc:"ロワール川のカワカマスを優しくポシェし、エシャロット、白ワイン、バターを乳化させた極上の「白いバターソース」で食べる高貴な一皿。"},tarte_tatin:{name_fr:"Tarte Tatin",name_en:"Tarte Tatin",name_ja:"タルトタタン",desc:"型の中にバターと砂糖でキャラメリゼしたリンゴを敷き詰め、パイ生地をかぶせて焼き、ひっくり返して供するロワール発祥のアップルタルト。"},potee_champenoise:{name_fr:"Potée Champenoise",name_en:"Champagne Pot-roasted Stew",name_ja:"ポテ・シャンプノワーズ",desc:"豚の塩漬け肉、ベーコン、ソーセージとキャベツ、人参などの野菜をシャンパーニュ地方のスタイルでコトコト煮込んだ温かい煮込み。"},biscuits_roses:{name_fr:"Biscuits roses de Reims",name_en:"Pink Biscuits of Reims",name_ja:"ビスキュイ・ローズ・ド・ランス",desc:"バニラの香りがするピンク色のサクサクしたビスケット。シャンパンに浸して食べるのがランスの伝統。"},brandade_morue:{name_fr:"Brandade de morue",name_en:"Cod Brandade",name_ja:"ブランダード・ド・モリュ",desc:"塩ダラを茹でてオリーブオイル、牛乳、ニンニクと共に細かくすり潰し、ペースト状にしたニーム地方の郷土料理。"},tielle_setoise:{name_fr:"Tielle sétoise",name_en:"Sète Octopus Pie",name_ja:"ティエル・セトワーズ",desc:"タコやイカをスパイシーなトマトソースで煮込み、丸いパイ生地に詰めて焼き上げたセート港発祥の惣菜パイ。"},civet_sanglier:{name_fr:"Civet de sanglier",name_en:"Wild Boar Civet",name_ja:"イノシシの赤ワイン煮込み",desc:"野生のイノシシ肉を赤ワイン、ハーブ、香味野菜で数日間マリネし、その血液を使ってコクを出したソースでじっくり煮込んだコルシカの狩猟料理。"},fiadone:{name_fr:"Fiadone",name_en:"Corsican Cheesecake",name_ja:"フィアドーヌ",desc:"コルシカ特産のホエーチーズ「ブロッチュ」に、卵、砂糖、レモンの皮を加えて焼き上げた、軽やかで素朴な伝統チーズケーキ。"},veau_olives:{name_fr:"Veau aux olives / Civet de veau",name_en:"Corsican Veal with Olives",name_ja:"子牛肉のオリーブ煮込み",desc:"子牛肉をオリーブオイル、ニンニク、ハーブ、トマト、野生のオリーブと共にじっくり煮込んだ、コルシカ島を代表する家庭的な名物料理。"},carbonnade_flamande:{name_fr:"Carbonnade Flamande",name_en:"Flemish Beef Stew",name_ja:"カルボナード・フラマンド",desc:"牛肉をベルギービール、タマネギ、ブラウンシュガー、タイムと共にコトコト煮込み、甘酸っぱく濃厚に仕上げた北フランス・フランドルの定番料理。"},potjevleesch:{name_fr:"Potjevleesch",name_en:"Potjevleesch",name_ja:"ポチェブリーシュ",desc:"鶏肉、うさぎ肉、豚肉、子牛肉などの異なる肉を白ワインとスパイスで煮込み、冷やしてテリーヌ状のゼリー寄せにした北部の伝統冷製料理。"},moules_frites:{name_fr:"Moules-frites",name_en:"Mussels and Fries",name_ja:"ムール・フリット",desc:"白ワイン、シャロット、パセリで蒸し焼きにした山盛りのムール貝（マリニエール）に、サクサクのフライドポテトを添えたベルギー・北フランスの国民食。"},tournedos_rossini:{name_fr:"Tournedos Rossini",name_en:"Tournedos Rossini",name_ja:"トゥルネド・ロッシーニ",desc:"牛ヒレ肉のソテーにフォアグラとトリュフをのせ、濃厚なマデールソースをかけたフランス最高峰の贅沢な肉料理。"},andouillette:{name_fr:"Andouillette",name_en:"Andouillette sausage",name_ja:"アンドゥイエット",desc:"豚の胃や腸などの内臓肉を細切りにして豚の腸に詰めた、独特の強い風味を持つ伝統的なフランスのソーセージ。"},pate_de_campagne:{name_fr:"Pâté de campagne",name_en:"Country pâté",name_ja:"パテ・ド・カンパーニュ",desc:"豚肉、豚レバー、脂身、ハーブなどをミンチにし、テリーヌ型に詰めて湯煎焼きにしたフランスの代表的なオードブル。"},tripes_a_la_mode_de_caen:{name_fr:"Tripes à la mode de Caen",name_en:"Caen-style tripe",name_ja:"トリップ・ア・ラ・モード・ド・カン（カン風牛胃の煮込み）",desc:"牛の4つの胃（特にハチノス）を牛足、野菜、シードル、カルヴァドスと共に土鍋で長時間じっくり煮込んだノルマンディーの伝統料理。"},supreme_de_volaille:{name_fr:"Suprême de volaille",name_en:"Chicken supreme",name_ja:"シュプレーム・ド・ヴォライユ",desc:"骨付きの鶏胸肉（シュプレーム）を優しくソテーし、濃厚な白いクリームソース（ソース・シュプレーム）で仕上げた気品ある一皿。"},fond_de_volaille:{name_fr:"Fond de volaille",name_en:"Chicken stock",name_ja:"フォン・ド・ヴォライユ",desc:"鶏の骨やガラ、香味野菜（ミポワ）を水からコトコト煮込んで濾した、フランス料理の基本的な白いお出汁。"},pate_de_foie_de_volaille:{name_fr:"Pâté de foie de volaille",name_en:"Chicken liver pâté",name_ja:"鶏レバーのパテ",desc:"鶏レバーをバター、エシャロット、ブランデーなどと炒めて滑らかなペースト状にし、冷やし固めた定番の前菜料理。"},salade_landaise:{name_fr:"Salade landaise",name_en:"Landes salad",name_ja:"サラダ・ランデーズ（ランド風サラダ）",desc:"レタスの上に、鴨のコンフィ、砂肝のコンフィ、鴨の燻製胸肉、フォアグラなどをのせた、フランス南西地方ランド県の名物サラダ。"},ttoro_basque:{name_fr:"Ttoro",name_en:"Ttoro (Basque seafood stew)",name_ja:"チョロ（バスク風魚介スープ煮込み）",desc:"コウイカ、アンコウ、メルルーサ、手長エビなどの厳選された魚介をそのまま残し、ピマン・デスペレット（エスペレット唐辛子）を効かせた濃厚なバスクの魚介煮込み。"},axoa_de_veau:{name_fr:"Axoa de Veau",name_en:"Veal Axoa",name_ja:"アショア・ド・ヴォー（子牛肉のバスク風細切れ煮込み）",desc:"細かく刻んだ子牛肉を、ピーマンや玉ねぎ、ピマン・デスペレットと共にラードで穏やかに炒め煮にしたバスク・ラブール地方の伝統肉料理。"},kokotxas_de_merlu_au_pil_pil:{name_fr:"Kokotxas de merlu au pil-pil",name_en:"Hake kokotxas in pil-pil sauce",name_ja:"ココチャ・ド・メルルーサ・オ・ピルピル",desc:"メルルーサの最もゼラチン質が豊富な顎肉（ココチャ）を、ニンニク、ピマン・デスペレット、オリーブオイルと共に土鍋で優しくゆすりながら乳化させたバスク最高峰の伝統料理。"}},we={sauter:{name_fr:"Sauter",name_en:"Sauté / Pan-fry",name_ja:"ソテー（炒め焼き）",def:"少量の油を用いて高温かつ短時間で食材を加熱する技法。表面を香ばしく焼き固め、旨味を閉じ込める。",temp:"160°C - 200°C",science:"メイラード反応による香気成分の生成と、急速な熱伝導による表面の結晶化。"},braiser:{name_fr:"Braiser",name_en:"Braise",name_ja:"ブレゼ（蒸し煮）",def:"少量の液体（ブイヨンやワイン）を加え、蓋をして密閉状態で低温かつ長時間加熱する技法。",temp:"85°C - 95°C",science:"湿分を保ちながら熱を加え、硬い結合理構造（コラーゲン）を水溶性のゼラチンへ変化させる。"},pocher:{name_fr:"Pocher",name_en:"Poach",name_ja:"ポシェ（茹でる）",def:"沸騰直前（気泡がわずかに立つ程度）の液体の中で食材を優しく加熱する技法。",temp:"70°C - 85°C",science:"急激なタンパク質凝固による身の縮みや乾燥を防ぎ、水分を保持してしっとり仕上げる。"},confire:{name_fr:"Confire",name_en:"Confit",name_ja:"コンフィ（低温の油脂煮）",def:"食材（主に肉や魚）を低温の油脂の中でゆっくりと時間をかけて加熱する技法。",temp:"75°C - 90°C",science:"水分の蒸発を防ぎつつ、肉内部の結合組織をゼラチン化し、油の浸透による防腐効果を高める。"},griller:{name_fr:"Griller",name_en:"Grill",name_ja:"グリエ（網焼き）",def:"直火または熱した格子（グリッド）の上で食材を直接加熱し、独特の焼き目をつける技法。",temp:"200°C以上",science:"強い放射熱によって短時間で表面に焼き目をつけ、内部の水分を逃がさないようにする。"},rotir:{name_fr:"Rôtir",name_en:"Roast",name_ja:"ロティ（ロースト）",def:"オーブンや串焼き機などの乾いた熱空気中で、油脂をかけながら食材の全体を均一に焼き上げる技法。",temp:"150°C - 220°C",science:"熱対流によって外側を香ばしく焼き上げ、脂肪層をゆっくり溶かしつつ内部へ熱を通す。"},mijoter:{name_fr:"Mijoter",name_en:"Simmer / Stew",name_ja:"ミジョテ（コトコト煮込む）",def:"弱火で液体を軽く波打たせる状態で、長時間じっくり煮込む技法。",temp:"85°C - 95°C",science:"水溶性の旨味成分をゆっくり抽出し、食材全体に味を染み込ませる。"},poeler:{name_fr:"Poêler",name_en:"Pan-sear",name_ja:"ポワレ（フライパン焼き）",def:"フライパンにバターや油をしき、表面に焼き色をつけながら、アロゼ（油をかける）して火を通す技法。",temp:"140°C - 180°C",science:"バターの乳化組織と食材の水分を調整し、ふっくらとしたテクスチャを維持する。"},gratiner:{name_fr:"Gratiner",name_en:"Gratin / Brown",name_ja:"グラチネ（グラタンにする）",def:"表面にチーズやパン粉、ソースを塗り、オーブンの上火で焼き色をつけて香ばしくする技法。",temp:"220°C以上",science:"タンパク質と糖のメイラード反応による膜形成と、脂質の熱酸化香の付与。"},friture:{name_fr:"Friture",name_en:"Deep-fry",name_ja:"フリチュール（揚げる）",def:"高温に熱した多量の油脂の中で食材を加熱する技法。表面を急速に脱水させ、パリッとした食感に仕上げる。",temp:"160°C - 190°C",science:"表面の水分が瞬時に蒸発して水蒸気バリアを作り、油の過度な浸透を防ぎつつ熱を伝える。"},embouter:{name_fr:"Embouter",name_en:"Sausage-filling",name_ja:"アンブテ（腸詰め）",def:"ひき肉や調味料を混ぜたファルス（詰め物）を豚や羊などの腸に詰める技法。ソーセージやアンドゥイエットの基本調理技術。",temp:"常温（加熱前調理）",science:"天然の腸繊維が内部の水分と肉汁を閉じ込め、加熱時に適度な圧力をかけて肉の弾力を生み出す。"},sous_vide:{name_fr:"Sous-vide",name_en:"Vacuum cooking / Sous-vide",name_ja:"真空低温調理",def:"食材と調味料を真空袋に密封し、正確に温度管理された温水中で加熱する技法。",temp:"54°C - 68°C",science:"タンパク質の凝固温度以下で精密に熱を通すことで、水分の損失を抑え極めてしっとりとした質感に仕上げる。"},saler:{name_fr:"Saler",name_en:"Curing / Salting",name_ja:"サレ（塩蔵・塩漬け）",def:"塩を直接まぶす、または塩水に浸けることで食材を脱水・長期保存可能にする技法。生ハムやコンフィの基礎処理。",temp:"冷暗所（加熱前調理）",science:"浸透圧によって食材から余分な水分を抽出し、微生物の繁殖を防ぐと同時に旨味を凝縮させる。"},mijoter:{name_fr:"Mijoter",name_en:"Simmer / Slow cook",name_ja:"ミジョテ（弱火煮込み）",def:"食材を液体の中で沸騰寸前の穏やかな火加減（とろ火）でコトコト煮込む技法。",temp:"85°C - 95°C",science:"タンパク質の急激な凝固を防ぎ、結合理構造を徐々に融解させ、旨味を液体へ優しく溶出させる。"},rotir_sur_braise:{name_fr:"Rôtir sur braise",name_en:"Roast over embers",name_ja:"ロティ・シュール・ブレーズ（炭火ロースト）",def:"薪や炭の直火による遠赤外線効果を利用し、表面を香ばしく焼き固めながら内部をジューシーに仕上げる技法。",temp:"180°C - 240°C",science:"木炭特有の熱輻射と揮発性フェノール化合物による薫香付与、および急激な表面糖化反応。"},emulser_au_pil_pil:{name_fr:"Émulsionner au pil-pil",name_en:"Pil-pil emulsification",name_ja:"ピルピル乳化（バスク式完全乳化）",def:"魚のゼラチン質とオリーブオイルを、熱と土鍋の微振動を利用して一切の乳化剤を使用せず完全乳化させるバスク独自の技法。",temp:"60°C - 70°C",science:"魚皮や顎肉（ココチャ）から溶け出た親水性ゼラチンコラーゲンと、疎水性オリーブオイルが物理的振動により均一なコロイド分散状態を形成する。"}},Se={sauce_creme:{name_fr:"Sauce crème",name_en:"Cream sauce",name_ja:"クリームソース",desc:"生クリームをベースに、バター、魚または肉のブイヨンを加えてコク深く仕上げたソース。ノルマンディー料理に欠かせない。"},sauce_normande:{name_fr:"Sauce Normande",name_en:"Normandy Sauce",name_ja:"ソース・ノルマンド",desc:"魚のブイヨン（フュメ・ド・ポワソン）に生クリーム、卵黄、バターを合わせ、シードルや牡蠣の煮汁で香りをつけた伝統ソース。"},sauce_vin_rouge:{name_fr:"Sauce au vin rouge",name_en:"Red Wine Sauce",name_ja:"赤ワインソース",desc:"赤ワインをベースに、フォンドボー、シャロット、エシャロット、ハーブを煮詰めてバターで仕上げる、牛肉料理に必須の濃厚ソース。"},rouille:{name_fr:"Rouille",name_en:"Rouille sauce",name_ja:"ルイユ",desc:"オリーブオイル、ニンニク、卵黄、サフラン、カイエンペッパーで作る南仏のピリ辛マヨネーズ状のソース。ブイヤベースに添える。"},vinaigrette:{name_fr:"Vinaigrette",name_en:"Vinaigrette",name_ja:"ヴィネグレット",desc:"サラダ油（またはオリーブオイル）と酢をエマルション（乳化）させ、塩、胡椒、ハーブを混ぜたフレンチドレッシングの基本。"},beurre_blanc:{name_fr:"Beurre blanc",name_en:"White butter sauce",name_ja:"ブール・ブラン（白バターソース）",desc:"エシャロット、白ワイン、白ワイン酢を煮詰め、冷たいバターを少しずつ加えて撹拌・乳化させた、魚料理用の非常に濃厚なソース。"},sauce_bercy:{name_fr:"Sauce Bercy",name_en:"Bercy sauce",name_ja:"ソース・ベルシー",desc:"白ワイン、刻んだエシャロット、魚のダシ（またはフォンドボー）を煮詰め、バターとパセリを加えたクラシックなソース。"},sauce_nantua:{name_fr:"Sauce Nantua",name_en:"Nantua Sauce",name_ja:"ソース・ナンチュア",desc:"エクルヴィス（ザリガニ）の殻から作ったバターと生クリームをベースにした、川魚のクネルなどに使用される赤く芳醇なソース。"},sauce_supreme:{name_fr:"Sauce suprême",name_en:"Supreme sauce",name_ja:"ソース・シュプレーム",desc:"鶏の白いダシ（ヴェルテ）に生クリームを加え、極限まで滑らかに仕上げた最高級の白いソース。"},sauce_biere:{name_fr:"Sauce à la bière",name_en:"Beer sauce",name_ja:"ビールソース",desc:"地元のビールをタマネギやフォンドボーと共に煮詰め、独特のコクとわずかな苦味を加えた北仏の伝統ソース。"},sauce_bearnaise:{name_fr:"Sauce Béarnaise",name_en:"Bernaise sauce",name_ja:"ソース・ベアルネーズ",desc:"澄ましバターと卵黄を温めながら乳化させ、エストラゴン、シャロット、酢の煮詰め汁を加えた、ステーキ用の気品あるソース。"},sauce_madere:{name_fr:"Sauce Madère",name_en:"Madeira Sauce",name_ja:"ソース・マデール",desc:"ポルトガル産のマデイラワインをフォンドボーと合わせて煮詰め、豊かな香りと甘味を与えた古典的な肉料理用ソース。"},sauce_poivre:{name_fr:"Sauce au poivre",name_en:"Pepper sauce",name_ja:"ペッパーソース",desc:"クラッシュした黒胡椒または緑胡椒をバターで炒め、コニャックでフランベし、フォンドボーと生クリームで仕上げたソース。"},sauce_chasseur:{name_fr:"Sauce Chasseur",name_en:"Hunter's sauce",name_ja:"ソース・シャスール（猟師風）",desc:"キノコ、エシャロット、白ワイン、トマト、デミグラスソースを煮込んで仕上げる、ジビエや鶏肉、肉料理に好まれるソース。"},sauce_gribiche:{name_fr:"Sauce Gribiche",name_en:"Gribiche sauce",name_ja:"ソース・グリビッシュ",desc:"固ゆで卵の卵黄をマスタードと油で乳化させ、刻んだ白身、ピクルス、ケッパー、ハーブを混ぜた冷製ソース。頭肉や内臓肉に合わせる。"},sauce_echalote:{name_fr:"Sauce échalote",name_en:"Shallot sauce",name_ja:"エシャロットソース",desc:"刻んだエシャロットを赤ワインや酢でしっかりと煮詰め、フォンドボーとバターを加えて仕上げたステーキソース。"},sauce_moutarde:{name_fr:"Sauce moutarde",name_en:"Mustard sauce",name_ja:"マスタードソース",desc:"白ワイン、生クリーム、フォンドヴォーを合わせたベースに、ディジョンマスタードを加えて風味豊かに仕上げたソース。"},sauce_piquante:{name_fr:"Sauce piquante",name_en:"Piquant sauce",name_ja:"ソース・ピカント",desc:"ブラウンソース（デミグラス）に白ワイン、酢、エシャロット、ピクルス（コルニッション）を加えて酸味と辛味を効かせたソース。"},sauce_charcutiere:{name_fr:"Sauce Charcutière",name_en:"Charcutière sauce",name_ja:"ソース・シャルキュティエール",desc:"デミグラスソースまたはフュメに白ワイン、エシャロット、ピクルス（コルニッション）を加え、豚肉のソテー（ロース肉など）によく合わせる古典的なソース。"},sauce_piperade:{name_fr:"Sauce Piperade",name_en:"Piperade sauce",name_ja:"ソース・ピペラード（バスク風トマトとピーマンのソース）",desc:"トマト、赤・緑ピーマン、玉ねぎをオリーブ油や生ハムの脂でじっくり炒め煮にし、ピマン・デスペレットで仕上げたバスク伝統の甘辛いソース。"},sauce_encre_basque:{name_fr:"Sauce à l'Encre de Seiche à la Basque",name_en:"Basque squid ink sauce",name_ja:"ソース・アンクル・ド・セーシュ・ア・ラ・バスケーズ",desc:"玉ねぎを焦がす直前まで徹底的にローストしてキャラメリゼし、イカスミ、赤ワイン、魚出汁を加えて構築した、小麦粉不使用の滑らかでアミノ酸豊富な漆黒ソース。"},sauce_verte_basque:{name_fr:"Sauce verte basque",name_en:"Basque green sauce",name_ja:"ソース・ヴェルト・バスケーズ（バスク風グリーンエマルジョンソース）",desc:"魚肉から溶け出た濃厚なゼラチン質、パセリの微細粒子、オリーブオイル、ニンニクが高度に乳化した、鮮やかなエメラルドグリーンの伝統エマルジョンソース。"}},Le={muscle_fibers:{name_fr:"Fibres musculaires",name_en:"Muscle fibers",name_ja:"筋繊維構造",desc:"運動量の多い部位の太い筋繊維は噛みごたえがあり旨味が強い。運動の少ない部位は繊細で柔らかい。"},low_collagen:{name_fr:"Faible collagène",name_en:"Low collagen",name_ja:"低コラーゲン特性",desc:"結合組織が少なく、加熱による筋肉の収縮率が低いため、ステーキなどの短時間調理に向く。"},iron_taste:{name_fr:"Goût de fer (Myoglobine)",name_en:"Iron taste (Myoglobin)",name_ja:"ミオグロビンと鉄分",desc:"血液やミオグロビンが豊富な赤身肉は加熱で鉄分の旨味に変わるが、火を通しすぎるとレバー臭に変化する。"},fat_insulation:{name_fr:"Isolation par le gras",name_en:"Fat insulation",name_ja:"脂肪層の断熱効果",desc:"厚い脂層が熱の急激な侵入を防ぐ断熱材となり、肉内部の水分とジューシーさを保つ。"},collagen_emulsification:{name_fr:"Émulsification du collagène",name_en:"Collagen emulsification",name_ja:"コラーゲンの乳化",desc:"筋間コラーゲンと脂肪が熱で分解・乳化し、ソースそのものに粘度と豊かなコクを与える。"},collagen_gelatinization:{name_fr:"Gélatinisation du collagène",name_en:"Collagen gelatinization",name_ja:"コラーゲンのゼラチン化",desc:"硬い結合組織（コラーゲン）は、70°C以上の水分中で長時間加熱すると、トロトロの可溶性ゼラチンに変化する。"},protein_coagulation:{name_fr:"Coagulation des protéines",name_en:"Protein coagulation",name_ja:"タンパク質の凝固",desc:"タンパク質は55°C付近から凝固を開始し、65°Cを超えると脱水（身縮み）が起きる。緻密な温度管理が必要。"},collagen_breakdown:{name_fr:"Dégradation du collagène",name_en:"Collagen breakdown",name_ja:"コラーゲン分解",desc:"極めて強い立体構造を持つコラーゲンも、酸（ワイン、酢）や長時間煮込みで完全に分解される。"},curing_and_fermentation:{name_fr:"Salage et Fermentation",name_en:"Curing and fermentation",name_ja:"塩蔵・発酵による熟成",desc:"脱水によって浸透圧を上げ、微生物の繁殖を防ぐとともに、酵素分解によりアミノ酸（旨味）を増大させる。"},moisture_loss:{name_fr:"Perte d'humidité",name_en:"Moisture loss",name_ja:"水分の流出（脱水）",desc:"熱によって筋肉が強く収縮すると内部の水分が押し出される。しっとり仕上げるには低温調理が効果的。"},short_cook:{name_fr:"Cuisson courte",name_en:"Short cooking",name_ja:"短時間加熱の鉄則",desc:"筋繊維が細く水分保持力の弱い肉は、短時間の加熱で終わらせ、内部の水分を絶対に逃がさないようにする。"},bone_in_cooking:{name_fr:"Cuisson sur l'os",name_en:"Bone-in cooking",name_ja:"骨付き調理の効果",desc:"骨の周辺にある高濃度のコラーゲンと髄液が熱で溶け出し、肉に深いコクと潤いを与える。"},gelatin_extraction:{name_fr:"Extraction de la gélatine",name_en:"Gelatin extraction",name_ja:"ゼラチン質の抽出",desc:"水の中にコラーゲンの多い部位（手羽、軟骨）を入れてコトコト煮込むことで、スープ（フォン）にとろみを与える。"},fat_rendering:{name_fr:"Fonte des graisses",name_en:"Fat rendering",name_ja:"脂肪の融出",desc:"熱を加えることで脂肪組織から余分な脂を溶かし出し、表面をパリパリにさせながら油切れを良くする。"},crispy_skin:{name_fr:"Peau croustillante",name_en:"Crispy skin creation",name_ja:"クリスピー皮形成",desc:"皮表面の水分を完全に抜いた後、溶けた脂で揚げるようにローストすることで、クリスピーな食感を作る。"},cream_affinity:{name_fr:"Affinité avec la crème",name_en:"Cream affinity",name_ja:"生クリーム親和性",desc:"平滑筋や血管系部位のコラーゲンは、乳脂肪（クリーム）と分子レベルで結合しやすく、味の乗りが良くなる。"},fat_and_lean_interweave:{name_fr:"Entrelacement de gras et maigre",name_en:"Fat and lean interweaving",name_ja:"赤身と脂の編み込み（霜降り）",desc:"赤身と脂が網目状に交差する部位は、加熱時に脂が断熱と保水を行い、焼きすぎても硬くなりにくい。"},emulsification:{name_fr:"Émulsion",name_en:"Emulsification",name_ja:"乳化作用",desc:"水と油という本来混ざり合わない液体が、卵黄やマスタードの乳化剤（レシチン）を仲介して均一に混ざり合う現象。"},balanced_meat:{name_fr:"Viande équilibrée",name_en:"Balanced meat quality",name_ja:"バランスのとれた肉質",desc:"赤身と脂身、結合組織（コラーゲン）の比率が均等で、ステーキから煮込みまで様々な調理法に適応できる万能な肉質特性。"},polymorphism_cocoa_butter:{name_fr:"Polymorphisme du beurre de cacao",name_en:"Polymorphism of cocoa butter",name_ja:"カカオバターの多形性",desc:"カカオバターの冷却調温（テンパリング）により、融点が最もよく光沢のあるV型結晶のみを安定して形成させる物理的技術。"},strecker_degradation:{name_fr:"Dégradation de Strecker",name_en:"Strecker degradation",name_ja:"ストレッカー分解",desc:"メイラード反応の中間体とアミノ酸が反応し、香ばしいコーヒーや熟成肉の特有な香気（ストレッカーアルデヒド）を生成する反応。"}};function te(e,u){const l=u==="region"?xe[e]:ke[e];if(!l)return"";let a="";return l.dishes&&l.dishes.length>0&&(a+='<div style="margin-top: 0.6rem;"><span style="font-size: 0.75rem; font-weight: 700; color: var(--color-accent-hover); text-transform: uppercase; display: block; margin-bottom: 0.2rem;">🍽️ 代表料理 (Classic Dishes):</span> ',a+=l.dishes.map(n=>{const c=Ce[n];return`<span class="relation-badge" style="display: inline-block; background-color: rgba(0, 0, 145, 0.05); color: var(--color-primary); padding: 0.25rem 0.5rem; font-size: 0.8rem; border-radius: 4px; margin-right: 0.4rem; margin-top: 0.25rem; border: 1px solid rgba(0, 0, 145, 0.15); font-weight: 500;">${c?`${c.name_fr} (${c.name_ja})`:n}</span>`}).join(""),a+="</div>"),l.techniques&&l.techniques.length>0&&(a+='<div style="margin-top: 0.6rem;"><span style="font-size: 0.75rem; font-weight: 700; color: var(--color-accent-hover); text-transform: uppercase; display: block; margin-bottom: 0.2rem;">🔥 調理技法 (Techniques):</span> ',a+=l.techniques.map(n=>{const c=we[n];return`<span class="relation-badge" style="display: inline-block; background-color: rgba(220, 38, 38, 0.05); color: var(--color-secondary); padding: 0.25rem 0.5rem; font-size: 0.8rem; border-radius: 4px; margin-right: 0.4rem; margin-top: 0.25rem; border: 1px solid rgba(220, 38, 38, 0.15); font-weight: 500;">${c?`${c.name_fr} (${c.name_ja})`:n}</span>`}).join(""),a+="</div>"),l.sauces&&l.sauces.length>0&&(a+='<div style="margin-top: 0.6rem;"><span style="font-size: 0.75rem; font-weight: 700; color: var(--color-accent-hover); text-transform: uppercase; display: block; margin-bottom: 0.2rem;">🥫 ソース (Sauces):</span> ',a+=l.sauces.map(n=>{const c=Se[n];return`<span class="relation-badge" style="display: inline-block; background-color: rgba(197, 168, 128, 0.1); color: var(--color-text-main); padding: 0.25rem 0.5rem; font-size: 0.8rem; border-radius: 4px; margin-right: 0.4rem; margin-top: 0.25rem; border: 1px solid rgba(197, 168, 128, 0.3); font-weight: 500;">${c?`${c.name_fr} (${c.name_ja})`:n}</span>`}).join(""),a+="</div>"),l.science&&l.science.length>0&&(a+='<div style="margin-top: 0.6rem;"><span style="font-size: 0.75rem; font-weight: 700; color: var(--color-accent-hover); text-transform: uppercase; display: block; margin-bottom: 0.2rem;">🧪 料理科学 (Science):</span> ',a+=l.science.map(n=>{const c=Le[n];return`<span class="relation-badge" style="display: inline-block; background-color: rgba(107, 156, 104, 0.05); color: var(--color-success); padding: 0.25rem 0.5rem; font-size: 0.8rem; border-radius: 4px; margin-right: 0.4rem; margin-top: 0.25rem; border: 1px solid rgba(107, 156, 104, 0.15); font-weight: 500;">${c?`${c.name_fr} (${c.name_ja})`:n}</span>`}).join(""),a+="</div>"),l.ingredients&&l.ingredients.length>0&&(a+='<div style="margin-top: 0.6rem;"><span style="font-size: 0.75rem; font-weight: 700; color: var(--color-accent-hover); text-transform: uppercase; display: block; margin-bottom: 0.2rem;">🥬 主要食材 (Ingredients):</span> ',a+=l.ingredients.map(n=>`<span class="relation-badge" style="display: inline-block; background-color: rgba(10, 25, 49, 0.05); color: var(--color-text-muted); padding: 0.25rem 0.5rem; font-size: 0.8rem; border-radius: 4px; margin-right: 0.4rem; margin-top: 0.25rem; border: 1px solid rgba(10, 25, 49, 0.15); font-weight: 500;">${n}</span>`).join(""),a+="</div>"),a}function je(){const e=document.createElement("div"),u=document.createElement("h2");u.className="section-title",u.innerText="Théorie de l'Art Culinaire",e.appendChild(u);const l=document.createElement("p");l.className="section-subtitle",l.innerText="Classical French culinary theory, stock making, classical sauces, and interactive gastronomy diagrams.",e.appendChild(l);const a=document.createElement("div");a.className="cuisine-tabs",a.innerHTML=`
    <button class="cuisine-tab-btn active" data-tab="theory">📖 Théorie Classique</button>
    <button class="cuisine-tab-btn" data-tab="meat">🥩 Viandes (お肉)</button>
    <button class="cuisine-tab-btn" data-tab="map">🗺️ Carte Gastronomique</button>
  `,e.appendChild(a);const n=document.createElement("div");n.className="cuisine-content-wrapper",e.appendChild(n),a.querySelectorAll(".cuisine-tab-btn").forEach(r=>{r.addEventListener("click",p=>{a.querySelectorAll(".cuisine-tab-btn").forEach(o=>o.classList.remove("active")),p.target.classList.add("active");const s=p.target.getAttribute("data-tab");c(s)})});function c(r){n.innerHTML="",r==="theory"?_():r==="meat"?m():r==="map"&&k()}function _(){var p;n.innerHTML='<div style="text-align: center; padding: 2rem; color: var(--color-text-muted);">Chargement de la théorie... (Loading theory...)</div>';const r=((p=g.settings)==null?void 0:p.targetLevel)||"ALL";A("cuisine",r).then(()=>{var f;n.innerHTML="";const o=(((f=g.db)==null?void 0:f.cuisine)||[]).filter(t=>r==="ALL"||t.level===r);if(o.length===0){n.innerHTML='<p style="color: var(--color-text-muted);">Aucun document de théorie culinaire disponible pour ce niveau.</p>';return}const d=document.createElement("div");d.style.display="flex",d.style.flexDirection="column",d.style.gap="2rem",o.forEach(t=>{const x=document.createElement("div");x.className="card",x.style.display="block",x.style.padding="2rem";const C=B(t.id),L=t.topic.match(/^([^(]+)/),v=L?L[1].trim():t.topic;x.innerHTML=`
          <div class="card-category" style="margin-bottom: 0.5rem;">${t.category}</div>
          <div class="term-header" style="border-bottom: 1px solid rgba(197, 168, 128, 0.15); padding-bottom: 0.8rem; margin-bottom: 1.5rem;">
            <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
              <h3 style="font-family: var(--font-serif); font-size: 1.6rem; color: var(--color-primary); margin: 0;">${t.topic}</h3>
              <button class="audio-btn" data-text="${v}" title="Listen topic pronunciation" style="background: none; border: none; font-size: 1.1rem; cursor: pointer; color: var(--color-accent); padding: 0.15rem; line-height: 1;">🔊</button>
            </div>
            <button class="fav-btn ${C?"active":""}" data-id="${t.id}" style="font-size: 1.3rem;">
              ${C?"★":"☆"}
            </button>
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.3rem;">
                <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-accent); font-weight: 600;">Français</h4>
                <button class="audio-btn" data-text="${t.content_fr}" title="Listen paragraph" style="background: none; border: none; font-size: 0.95rem; cursor: pointer; color: var(--color-accent); padding: 0.15rem; line-height: 1;">🔊</button>
              </div>
              <p style="font-size: 0.95rem; color: var(--color-primary); font-style: italic; text-align: justify; line-height: 1.6;">${t.content_fr}</p>
            </div>
            <div>
              <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-accent); font-weight: 600; margin-bottom: 0.3rem;">English Explanation</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-main); text-align: justify; line-height: 1.6;">${t.content_en}</p>
            </div>
            <div style="background-color: rgba(10, 25, 49, 0.03); padding: 1.2rem; border-radius: var(--radius-sm); border-left: 3px solid var(--color-secondary);">
              <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-primary); font-weight: 600; margin-bottom: 0.3rem;">解説（日本語）</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-main); text-align: justify; line-height: 1.6;">${t.content_ja}</p>
            </div>
          </div>
        `,x.querySelector(".fav-btn").addEventListener("click",h=>{h.stopPropagation(),H(t.id);const b=h.target,w=B(t.id);b.classList.toggle("active",w),b.innerText=w?"★":"☆"}),x.querySelectorAll(".audio-btn").forEach(h=>{h.addEventListener("click",b=>{b.stopPropagation();const w=b.target.closest(".audio-btn").getAttribute("data-text");F(w)})}),d.appendChild(x)}),n.appendChild(d)})}function m(){const r=document.createElement("div");r.className="meat-section-container";const p=document.createElement("div");p.className="meat-type-tabs",p.innerHTML=`
      <button class="meat-tab-btn active" data-type="beef">🐂 Bœuf (牛)</button>
      <button class="meat-tab-btn" data-type="porc">🐖 Porc (豚)</button>
      <button class="meat-tab-btn" data-type="volaille">🐓 Volaille (鶏)</button>
      <button class="meat-tab-btn" data-type="poisson">🐟 Poisson (魚介)</button>
      <button class="meat-tab-btn" data-type="autre">🦌 Autres (その他肉)</button>
    `,r.appendChild(p);const s=document.createElement("div");s.className="meat-display-area",r.appendChild(s),n.appendChild(r),p.querySelectorAll(".meat-tab-btn").forEach(o=>{o.addEventListener("click",d=>{p.querySelectorAll(".meat-tab-btn").forEach(x=>x.classList.remove("active"));const f=d.target.closest(".meat-tab-btn");f.classList.add("active");const t=f.getAttribute("data-type");i(t,s)})}),i("beef",s)}function i(r,p){p.innerHTML="";const o={beef:{cuts:ve,pdf:"beef_maff_guide.pdf",pdfText:"📄 日本農水省 牛肉部位基準 (PDF)",quote:"",img:"assets/beef_cuts.png",alt:"French Beef Cuts Diagram",placeholder:"Coupe+de+Boeuf",label:"Coupe de Bœuf",propName:"beef"},porc:{cuts:be,pdf:"pork_maff_guide.pdf",pdfText:"📄 日本農水省 豚肉部位基準 (PDF)",quote:'"Tout est bon dans le cochon" (豚はすべてが使える食材である)',img:"assets/porc_cuts.png",alt:"French Pork Cuts Diagram",placeholder:"Coupe+de+Porc",label:"Coupe de Porc",propName:"pork"},volaille:{cuts:he,pdf:"poultry_maff_guide.pdf",pdfText:"📄 日本農水省 鶏肉部位基準 (PDF)",quote:'"La volaille est la reine des cuisines et la directrice des banquets" (鶏肉は厨房の女王であり、宴の演出家である)',img:"assets/poultry_cuts.png",alt:"French Poultry Cuts Diagram",placeholder:"Coupe+de+Volaille",label:"Coupe de Volaille",propName:"poultry"},poisson:{cuts:ye,pdf:"",pdfText:"",quote:"",img:"assets/fish_cuts.png",alt:"French Fish Cuts Diagram",placeholder:"Coupe+de+Poisson",label:"Coupe de Poisson",propName:"fish"},autre:{cuts:_e,pdf:"",pdfText:"",quote:"",img:"assets/other_cuts.png",alt:"French Other Meats Cuts Diagram",placeholder:"Autres+Viandes",label:"Autres Viandes",propName:"other"}}[r];if(!o)return;const d=document.createElement("div");let f="";o.quote&&(f+=`
        <div style="background-color: rgba(197, 168, 128, 0.05); padding: 1rem; border-radius: var(--radius-sm); border-left: 3px solid var(--color-accent); margin-bottom: 1.5rem; text-align: center;">
          <span style="font-family: var(--font-serif); font-size: 1.1rem; font-style: italic; color: var(--color-primary);">${o.quote}</span>
        </div>
      `),o.pdf&&(f+=`
        <div style="display: flex; justify-content: flex-end; margin-bottom: 0.8rem;">
          <a href="${o.pdf}" target="_blank" class="next-btn" style="text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; padding: 0.4rem 0.8rem; background-color: rgba(197, 168, 128, 0.08); color: var(--color-primary); border: 1px solid rgba(197, 168, 128, 0.3); border-radius: var(--radius-sm); font-weight: 600; cursor: pointer; transition: var(--transition);">
            ${o.pdfText}
          </a>
        </div>
      `),f+=`
      <div class="interactive-canvas-container" style="position: relative;">
        <img src="${o.img}" alt="${o.alt}" class="interactive-image" onerror="this.src='https://placehold.co/700x450/F4EAD4/0a1931?text=${o.placeholder}'">
        <svg class="interactive-svg-overlay" viewBox="0 0 100 100">
          ${o.cuts.map(C=>`
            <polygon class="interactive-area" points="${C.points}" data-id="${C.id}" />
          `).join("")}
        </svg>
      </div>
      
      <div class="cuisine-detail-drawer" id="${o.propName}-detail-drawer">
        <div class="detail-drawer-header">
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <h3 class="detail-drawer-title" id="${o.propName}-cut-title">Select a Cut</h3>
            <button class="audio-btn" id="${o.propName}-audio-title-btn" style="background: none; border: none; font-size: 1.1rem; cursor: pointer; color: var(--color-accent); display: none;">🔊</button>
          </div>
          <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; color: var(--color-text-muted); font-weight: 600;" id="${o.propName}-cut-sub">${o.label}</span>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <!-- Properties Grid -->
          <div class="meat-properties-grid">
            <div class="meat-prop-item">
              <span class="meat-prop-label">柔らかさ (Tendreté)</span>
              <strong class="meat-prop-val" id="${o.propName}-prop-tenderness">-</strong>
            </div>
            <div class="meat-prop-item">
              <span class="meat-prop-label">脂 (Gras)</span>
              <strong class="meat-prop-val" id="${o.propName}-prop-fat">-</strong>
            </div>
            <div class="meat-prop-item">
              <span class="meat-prop-label">コラーゲン (Collagène)</span>
              <strong class="meat-prop-val" id="${o.propName}-prop-collagen">-</strong>
            </div>
          </div>

          <!-- Basic Details -->
          <div class="meat-detail-grid">
            <div class="meat-detail-block">
              <h4 class="meat-block-title">向く調理</h4>
              <p class="meat-block-text" id="${o.propName}-cooking"></p>
            </div>
            <div class="meat-detail-block">
              <h4 class="meat-block-title">${o.propName==="poultry"?"代表料理 (Plat Classique)":r==="poisson"||r==="autre"?"特徴・分類":"フランス的分類"}</h4>
              <p class="meat-block-text" id="${o.propName}-classification"></p>
            </div>
          </div>

          <!-- Logic & Science -->
          <div class="meat-detail-grid">
            <div class="meat-detail-block">
              <h4 class="meat-block-title">Cooking Logic</h4>
              <p class="meat-block-text highlight-code" id="${o.propName}-logic"></p>
            </div>
            <div class="meat-detail-block">
              <h4 class="meat-block-title">料理科学 (Science)</h4>
              <p class="meat-block-text" id="${o.propName}-science"></p>
            </div>
          </div>

          <!-- Chef's Note -->
          <div class="chef-note-box">
            <h4 class="chef-note-title">👨‍🍳 Chef's Note</h4>
            <p class="chef-note-text" id="${o.propName}-chef-note"></p>
          </div>

          <!-- Relations -->
          <div id="${o.propName}-relations-container" style="display: none; border-top: 1px solid rgba(197, 168, 128, 0.15); padding-top: 1.2rem;">
            <h4 class="meat-block-title">🔗 関連知識とのつながり (Relations)</h4>
            <div id="${o.propName}-relations-content"></div>
          </div>
        </div>
      </div>
    `,d.innerHTML=f,p.appendChild(d);const t=d.querySelector(`#${o.propName}-detail-drawer`),x=d.querySelectorAll(".interactive-area");x.forEach(C=>{C.addEventListener("click",L=>{x.forEach(b=>b.classList.remove("active")),L.target.classList.add("active");const v=L.target.getAttribute("data-id"),h=o.cuts.find(b=>b.id===v);if(h){d.querySelector(`#${o.propName}-cut-title`).innerText=`${h.name_fr} (${h.name_ja})`,d.querySelector(`#${o.propName}-cut-sub`).innerText=`Cut #${h.number} • ${h.name_en}`,d.querySelector(`#${o.propName}-prop-tenderness`).innerText=h.properties.tenderness,d.querySelector(`#${o.propName}-prop-fat`).innerText=h.properties.fat,d.querySelector(`#${o.propName}-prop-collagen`).innerText=h.properties.collagen,d.querySelector(`#${o.propName}-cooking`).innerText=h.cooking,d.querySelector(`#${o.propName}-classification`).innerText=h.classification,d.querySelector(`#${o.propName}-logic`).innerText=h.logic,d.querySelector(`#${o.propName}-science`).innerText=h.science,d.querySelector(`#${o.propName}-chef-note`).innerText=h.chef_note;const b=d.querySelector(`#${o.propName}-relations-container`),w=d.querySelector(`#${o.propName}-relations-content`),S=te(v,"cut");S?(w.innerHTML=S,b.style.display="block"):b.style.display="none";const j=d.querySelector(`#${o.propName}-audio-title-btn`);j.style.display="inline-block",j.onclick=()=>F(h.name_fr),t.style.display="block"}})})}function k(){const r=document.createElement("div");r.innerHTML=`
      <div class="interactive-canvas-container" style="position: relative;">
        <img src="assets/france_map.png" alt="Gastronomic Map of France" class="interactive-image" onerror="this.src='https://placehold.co/700x450/F4EAD4/0a1931?text=Carte+Gastronomique'">
        <svg class="interactive-svg-overlay" viewBox="0 0 100 100">
          ${ee.map(o=>`
            <polygon class="interactive-area" points="${o.points}" data-id="${o.id}" />
          `).join("")}
        </svg>
      </div>
      
      <div class="cuisine-detail-drawer" id="map-detail-drawer">
        <div class="detail-drawer-header">
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <h3 class="detail-drawer-title" id="map-region-title">Select a Region</h3>
            <button class="audio-btn" id="map-audio-title-btn" style="background: none; border: none; font-size: 1.1rem; cursor: pointer; color: var(--color-accent); display: none;">🔊</button>
          </div>
          <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; color: var(--color-text-muted); font-weight: 600;" id="map-region-sub">Région Gastronomique</span>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 1.2rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.3rem;">
              <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-accent); font-weight: 600;">Français</h4>
              <button class="audio-btn" id="map-audio-desc-btn" style="background: none; border: none; font-size: 0.95rem; cursor: pointer; color: var(--color-accent); display: none;">🔊</button>
            </div>
            <p style="font-size: 0.95rem; color: var(--color-primary); font-style: italic; line-height: 1.5; text-align: justify;" id="map-desc-fr"></p>
          </div>
          <div>
            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-accent); font-weight: 600; margin-bottom: 0.3rem;">English Description</h4>
            <p style="font-size: 0.9rem; color: var(--color-text-main); line-height: 1.5; text-align: justify;" id="map-desc-en"></p>
          </div>
          <div>
            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-accent); font-weight: 600; margin-bottom: 0.3rem;">日本語解説</h4>
            <p style="font-size: 0.9rem; color: var(--color-text-main); line-height: 1.5; text-align: justify;" id="map-desc-ja"></p>
          </div>
          
          <!-- Relations -->
          <div id="map-relations-container" style="display: none; border-top: 1px solid rgba(197, 168, 128, 0.15); padding-top: 1.2rem;">
            <h4 class="meat-block-title">🔗 地域と食・技術のつながり (Relations)</h4>
            <div id="map-relations-content"></div>
          </div>
        </div>
      </div>
    `,n.appendChild(r);const p=r.querySelector("#map-detail-drawer"),s=r.querySelectorAll(".interactive-area");s.forEach(o=>{o.addEventListener("click",d=>{s.forEach(x=>x.classList.remove("active")),d.target.classList.add("active");const f=d.target.getAttribute("data-id"),t=ee.find(x=>x.id===f);if(t){r.querySelector("#map-region-title").innerText=`${t.name_fr} (${t.name_ja})`,r.querySelector("#map-region-sub").innerText=`${t.name_en} Region`,r.querySelector("#map-desc-fr").innerText=t.desc_fr,r.querySelector("#map-desc-en").innerText=t.desc_en,r.querySelector("#map-desc-ja").innerText=t.desc_ja;const x=r.querySelector("#map-relations-container"),C=r.querySelector("#map-relations-content"),L=te(f,"region");L?(C.innerHTML=L,x.style.display="block"):x.style.display="none";const v=r.querySelector("#map-audio-title-btn");v.style.display="inline-block",v.onclick=()=>F(t.name_fr);const h=r.querySelector("#map-audio-desc-btn");h.style.display="inline-block",h.onclick=()=>F(t.desc_fr),p.style.display="block"}})})}return c("theory"),e}function T(e){const u=[...e];for(let l=u.length-1;l>0;l--){const a=Math.floor(Math.random()*(l+1));[u[l],u[a]]=[u[a],u[l]]}return u}function ae(e){return e.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim().replace(/[-\s]+/g," ")}function $e(){if(document.getElementById("quiz-dynamic-styles"))return;const e=document.createElement("style");e.id="quiz-dynamic-styles",e.innerHTML=`
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
  `,document.head.appendChild(e)}function qe(){var c,_,m;const e=[],u=((c=g.db)==null?void 0:c.vocabulary)||[],l=((_=g.db)==null?void 0:_.grammar)||[],a=((m=g.db)==null?void 0:m.cuisine)||[];function n(i,k,r,p="japanese"){const o=i.filter(f=>f.id!==r).map(f=>f[p]).sort(()=>.5-Math.random()),d=[...new Set(o)].filter(Boolean).slice(0,k);for(;d.length<k;)d.push("Autre option "+(d.length+1));return d}return u.forEach(i=>{var s,o,d,f,t;if(!i.french||!i.japanese)return;let k="vocabulary";(s=i.tags)!=null&&s.includes("meat")?k="meat":(o=i.tags)!=null&&o.includes("sauces")||(d=i.tags)!=null&&d.includes("sauce")?k="sauces":(f=i.tags)!=null&&f.includes("cutting")?k="cuts":(t=i.tags)!=null&&t.includes("science")&&(k="science");const r=n(u,3,i.id,"japanese");e.push({id:`dyn_vocab_fr_ja_${i.id}`,type:"choice",category:k,question:`Que signifie le mot français "${i.french}" ? / What does the French word "${i.french}" mean?`,question_fr:`Que signifie le mot français "${i.french}" ?`,question_en:`What does the French word "${i.french}" mean?`,context:i.definition_fr||`Usage: ${i.context_fr}`,options:T([i.japanese,...r]),answer:i.japanese});const p=n(u,3,i.id,"french");e.push({id:`dyn_vocab_ja_fr_${i.id}`,type:"choice",category:k,question:`Quel est le mot français pour "${i.japanese}" ? / What is the French word for "${i.japanese}"?`,question_fr:`Quel est le mot français pour "${i.japanese}" ?`,question_en:`What is the French word for "${i.japanese}"?`,context:i.definition_fr||`Usage: ${i.context_fr}`,options:T([i.french,...p]),answer:i.french})}),l.forEach(i=>{if(!i.topic||!i.examples||i.examples.length===0)return;const k=n(l,3,i.id,"topic");e.push({id:`dyn_gram_topic_${i.id}`,type:"choice",category:"grammar",question:`De quel concept de grammaire s'agit-il : "${i.explanation_ja}" ? / Which grammar concept is this: "${i.explanation_en}"?`,question_fr:"De quel concept de grammaire s'agit-il ?",question_en:`Which grammar concept is this: "${i.explanation_en}"?`,context:`Niveau : ${i.level}. Indispensable pour la cuisine.`,options:T([i.topic,...k]),answer:i.topic}),i.examples.forEach((r,p)=>{const o=l.flatMap(d=>d.examples||[]).filter(d=>d.fr!==r.fr).sort(()=>.5-Math.random()).map(d=>d.ja).slice(0,3);for(;o.length<3;)o.push("Option de traduction "+(o.length+1));e.push({id:`dyn_gram_ex_${i.id}_${p}`,type:"choice",category:"grammar",question:`Traduisez la phrase : "${r.fr}" / Translate the sentence: "${r.fr}"`,question_fr:`Traduisez la phrase : "${r.fr}"`,question_en:`Translate the sentence: "${r.fr}"`,context:`Grammaire: ${i.topic} (${i.level})`,options:T([r.ja,...o]),answer:r.ja})})}),a.forEach(i=>{var p,s,o,d,f,t;if(!i.topic||!i.content_ja)return;const k=n(a,3,i.id,"topic");let r="sauces";(p=i.tags)!=null&&p.includes("knife-cuts")||(s=i.tags)!=null&&s.includes("cuts")?r="cuts":(o=i.tags)!=null&&o.includes("meat")?r="meat":((d=i.tags)!=null&&d.includes("molecular")||(f=i.tags)!=null&&f.includes("chemistry")||(t=i.tags)!=null&&t.includes("science"))&&(r="science"),e.push({id:`dyn_cuis_topic_${i.id}`,type:"choice",category:r,question:`De quel concept culinaire s'agit-il : "${i.content_ja.substring(0,120)}..." ? / Which culinary concept is described: "${i.content_en.substring(0,120)}..."?`,question_fr:"De quel concept culinaire s'agit-il ?",question_en:"Which culinary concept is described here?",context:`Niveau : ${i.level}. Mots-clés : ${i.tags.join(", ")}`,options:T([i.topic,...k]),answer:i.topic})}),e}function ze(){var _,m;const e=[],u=((_=g.db)==null?void 0:_.grammar)||[],l=((m=g.db)==null?void 0:m.vocabulary)||[],a=[];u.forEach(i=>{(i.examples||[]).forEach(k=>{a.push({fr:k.fr,ja:k.ja})})}),l.forEach(i=>{i.context_fr&&!i.context_fr.includes("Exemple avec le mot")&&a.push({fr:i.context_fr,ja:i.context_ja})});const n=a.sort(()=>.5-Math.random());for(const i of n){if(e.length>=4)break;const k=i.fr.replace(/^➔\s*/,"").trim();if(k.includes(" - ")){const r=k.split(" - ");e.push({id:`pair_${e.length}`,left:`🗣️ ${r[0].trim()}`,right:`💬 ${r[1].trim()}`,context:i.ja})}else if(k.includes(",")){const r=k.split(",");e.push({id:`pair_${e.length}`,left:`${r[0].trim()} ,`,right:`... ${r[1].trim()}`,context:i.ja})}else{const r=k.split(" ");if(r.length>=4){const p=Math.floor(r.length/2),s=r.slice(0,p).join(" "),o=r.slice(p).join(" ");e.push({id:`pair_${e.length}`,left:`${s} ...`,right:`... ${o}`,context:i.ja})}}}const c=[{left:"🗣️ Chaud devant !",right:"💬 Oui, chef !",context:"お通りです！ / はい、シェフ！"},{left:"🗣️ Entrée prête ?",right:"💬 Oui, j'envoie.",context:"前菜はできていますか？ / はい、送ります。"},{left:"🗣️ Combien de couverts ?",right:"💬 Vingt couverts.",context:"何名様（何席）ですか？ / 20席です。"},{left:"🗣️ Envoyez la sauce !",right:"💬 Tout de suite !",context:"ソースを出して！ / ただちに！"}];for(;e.length<4;){const i=c[e.length%c.length];e.push({id:`default_${e.length}`,left:i.left,right:i.right,context:i.context})}return e}function Ee(){var n;const e=document.createElement("div"),u=document.createElement("h2");u.className="section-title",u.innerText="Vérification des Connaissances",e.appendChild(u);const l=document.createElement("p");l.className="section-subtitle",l.innerText="Test your professional French vocabulary, kitchen commands, and classical cuisine theory.",e.appendChild(l);const a=document.createElement("div");return a.className="loading-placeholder",a.innerText="Chargement du quiz... (Loading quiz...)",e.appendChild(a),$e(),(n=g.settings)!=null&&n.targetLevel,Promise.all([se(),A("vocabulary","ALL"),A("grammar","ALL"),A("cuisine","ALL")]).then(()=>{a.remove(),Te(e)}),e}function Te(e){let u="multiple",l="ALL";const a=document.createElement("div");a.className="quiz-mode-selector",a.innerHTML=`
    <button class="mode-tab-btn active" data-mode="multiple">✍️ Choix Multiple</button>
    <button class="mode-tab-btn" data-mode="matching_vocab">🤝 Association (vocabulary)</button>
    <button class="mode-tab-btn" data-mode="matching_taking">🤝 Association (taking)</button>
    <button class="mode-tab-btn" data-mode="spelling">📖 Orthographe (Spelling)</button>
  `,e.appendChild(a);const n=document.createElement("div");n.className="quiz-category-filter-wrapper",n.style.margin="1rem auto 1.5rem auto",n.style.display="flex",n.style.justifyContent="center",n.style.alignItems="center",n.style.gap="0.8rem",n.innerHTML=`
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
  `,e.appendChild(n);const c=n.querySelector("#quiz-cat-select");c.addEventListener("change",o=>{l=o.target.value,m()});const _=document.createElement("div");_.className="quiz-game-wrapper",e.appendChild(_),a.querySelectorAll(".mode-tab-btn").forEach(o=>{o.addEventListener("click",d=>{a.querySelectorAll(".mode-tab-btn").forEach(f=>f.classList.remove("active")),d.target.classList.add("active"),u=d.target.getAttribute("data-mode"),u==="matching_taking"?(c.disabled=!0,c.style.opacity="0.5"):(c.disabled=!1,c.style.opacity="1.0"),m()})});function m(){_.innerHTML="",u==="multiple"?i():u==="matching_vocab"?k():u==="matching_taking"?r():u==="spelling"&&s()}function i(){var h;const o=((h=g.db)==null?void 0:h.quizzes)||[],d=qe();let f=[...o,...d];if(l!=="ALL"&&(f=f.filter(b=>b.category===l)),f.length===0){_.innerHTML=`
        <div class="quiz-card" style="text-align: center; padding: 2rem;">
          <p style="color: var(--color-text-muted); font-style: italic;">Aucune question trouvée dans cette catégorie. Essayez un autre filtre !</p>
        </div>
      `;return}const t=T(f).slice(0,10);let x=0,C=0,L=!1;function v(){if(_.innerHTML="",L=!1,x>=t.length){const z=Math.round(C/t.length*100);let $="Apprenti (Apprentice)";z>=90?$="Chef de Partie (Station Chef)":z>=70&&($="Commis de Cuisine (Line Cook)"),_.innerHTML=`
          <div class="quiz-card" style="text-align: center;">
            <h3 style="font-family: var(--font-serif); font-size: 2rem; color: var(--color-primary); margin-bottom: 1rem;">Session Terminée !</h3>
            <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">Your Score: <strong>${C} / ${t.length}</strong> (${z}%)</p>
            <div style="background-color: rgba(197, 168, 128, 0.1); border: 1px solid var(--color-accent); padding: 1.5rem; border-radius: var(--radius-md); margin-bottom: 2rem;">
              <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--color-text-muted); letter-spacing: 1px;">Assigned Rank</div>
              <div style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--color-primary); font-weight: 700; margin-top: 0.3rem;">${$}</div>
            </div>
            <button class="next-btn" id="restart-choice-btn" style="margin: 0 auto; display: block;">Restart Session</button>
          </div>
        `,_.querySelector("#restart-choice-btn").addEventListener("click",()=>{i()});return}const b=t[x],w=document.createElement("div");w.className="quiz-card",w.innerHTML=`
        <div class="quiz-meta">
          <span>Question ${x+1} of ${t.length}</span>
          <span class="grammar-badge" style="background-color: var(--color-secondary);">${b.category}</span>
        </div>
        
        <div class="quiz-question" style="display: flex; flex-direction: column; gap: 0.8rem; margin-bottom: 1.5rem;">
          <div class="q-fr" style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--color-primary); font-style: italic; line-height: 1.3;">${b.question_fr||b.question||""}</div>
          ${b.question_en?`
            <div class="quiz-hint-flip-container" style="cursor: pointer; margin-top: 0.5rem;">
              <div class="q-en-card" style="padding: 0.5rem; border-radius: var(--radius-sm); border: 1px dashed rgba(197, 168, 128, 0.4); text-align: center; background-color: rgba(197, 168, 128, 0.02); font-size: 0.85rem; color: var(--color-accent); font-weight: 500;">
                💡 Translate (Show English Hint)
              </div>
              <div class="q-en-hint-text" style="display: none; padding: 0.5rem; margin-top: 0.3rem; font-style: italic; color: var(--color-text-muted); font-size: 0.9rem;">${b.question_en}</div>
            </div>
          `:""}
        </div>
        
        <div class="quiz-options">
          ${b.options.map((z,$)=>`
            <button class="quiz-btn" data-index="${$}">${z}</button>
          `).join("")}
        </div>
        
        <div class="quiz-feedback" style="display: none; margin-top: 1.5rem; background-color: rgba(10,25,49,0.03); padding: 1rem; border-radius: var(--radius-sm); border-left: 3px solid var(--color-primary);">
          <strong>Contexte Culinaire:</strong>
          <p style="margin-top: 0.4rem; font-style: italic; font-size: 0.9rem;">${b.context}</p>
        </div>
        
        <div style="margin-top: 1.5rem;">
          <button class="next-btn" id="next-q-btn" style="display: none; margin-left: auto;">Continue →</button>
        </div>
      `;const S=w.querySelector(".quiz-hint-flip-container");S&&S.addEventListener("click",()=>{const z=S.querySelector(".q-en-hint-text"),$=z.style.display==="none";z.style.display=$?"block":"none",S.querySelector(".q-en-card").innerText=$?"💡 Hide English Hint":"💡 Translate (Show English Hint)"});const j=w.querySelectorAll(".quiz-btn"),y=w.querySelector(".quiz-feedback"),q=w.querySelector("#next-q-btn");j.forEach(z=>{z.addEventListener("click",$=>{if(L)return;L=!0;const I=$.target.innerText===b.answer;j.forEach(M=>{M.disabled=!0,M.innerText===b.answer&&M.classList.add("correct")}),I?C++:($.target.classList.add("incorrect"),ne(b.id)),y.style.display="block",q.style.display="block"})}),q.addEventListener("click",()=>{x++,v()}),_.appendChild(w)}v()}function k(){var v,h;const o=((v=g.settings)==null?void 0:v.includeGeneral)||!1;let f=(((h=g.db)==null?void 0:h.vocabulary)||[]).filter(b=>o||b.is_professional);if(l!=="ALL"&&(l==="meat"?f=f.filter(b=>{var w,S,j,y;return((w=b.tags)==null?void 0:w.includes("meat"))||((S=b.tags)==null?void 0:S.includes("beef"))||((j=b.tags)==null?void 0:j.includes("pork"))||((y=b.tags)==null?void 0:y.includes("poultry"))||/viande|boeuf|porc|poulet/i.test(b.french)}):l==="sauces"?f=f.filter(b=>{var w,S,j;return((w=b.tags)==null?void 0:w.includes("sauce"))||((S=b.tags)==null?void 0:S.includes("sauces"))||((j=b.tags)==null?void 0:j.includes("stocks"))||/sauce|fond|jus|bouillon/i.test(b.french)}):l==="cuts"?f=f.filter(b=>{var w,S;return((w=b.tags)==null?void 0:w.includes("cutting"))||((S=b.tags)==null?void 0:S.includes("vegetables"))||/coupe|tailler|ciseler|mincer|brunoise|julienne/i.test(b.french)}):l==="science"?f=f.filter(b=>{var w;return((w=b.tags)==null?void 0:w.includes("science"))||/réaction|émulsion|liaison/i.test(b.french)}):l==="grammar"&&(f=[])),f.length<4){_.innerHTML=`
        <div class="quiz-card" style="text-align: center; padding: 2rem;">
          <p style="color: var(--color-text-muted); font-style: italic;">Il faut au moins 4 termes de vocabulaire dans cette catégorie pour jouer l'Association.</p>
        </div>
      `;return}const t=T(f).slice(0,4),x=T(t),C=T(t),L=document.createElement("div");L.className="quiz-card",L.innerHTML=`
      <div class="quiz-meta" style="margin-bottom: 1rem;">
        <span>🤝 Association (vocabulary)</span>
        <span class="grammar-badge" style="background-color: var(--color-primary);">Game</span>
      </div>
      <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 1.5rem;">
        Drag a French term from the left, and drop it onto its Japanese translation on the right. (Or click left card, then click match).
      </p>
      
      <div class="matching-board">
        <div class="matching-column" id="left-column">
          ${x.map(b=>`
            <div class="drag-card" draggable="true" data-id="${b.id}" id="drag-${b.id}">
              <span>${b.french}</span>
              <span style="font-size: 1rem; opacity: 0.3;">☰</span>
            </div>
          `).join("")}
        </div>
        
        <div class="matching-column" id="right-column">
          ${C.map(b=>`
            <div class="drop-zone" data-id="${b.id}">
              ${b.japanese}
            </div>
          `).join("")}
        </div>
      </div>
      
      <div id="matching-completion-panel" style="display: none; text-align: center; margin-top: 1.5rem;">
        <div style="color: var(--color-success); font-weight: 700; font-size: 1.1rem; margin-bottom: 1rem;">🤝 Excellent ! Tous les termes ont été associés avec succès.</div>
        <button class="next-btn" id="restart-match-btn" style="margin: 0 auto; display: block;">Play Again</button>
      </div>
    `,_.appendChild(L),p(L,4,k)}function r(){const o=ze(),d=document.createElement("div");d.className="quiz-card",d.innerHTML=`
      <div class="quiz-meta" style="margin-bottom: 1rem;">
        <span>🤝 Association (taking) - Conversation & Cloze</span>
        <span class="grammar-badge" style="background-color: var(--color-success);">Dialogue</span>
      </div>
      <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 1.5rem;">
        Match dialogues or sentence fragments. Drag a card from the left, and drop it onto the correct continuation or response on the right.
      </p>
      
      <div class="matching-board">
        <div class="matching-column" id="left-column">
          ${T(o).map(f=>`
            <div class="drag-card" draggable="true" data-id="${f.id}" id="drag-${f.id}" style="font-size: 0.9rem; padding: 0.8rem;">
              <span>${f.left}</span>
              <span style="font-size: 1rem; opacity: 0.3;">☰</span>
            </div>
          `).join("")}
        </div>
        
        <div class="matching-column" id="right-column">
          ${T(o).map(f=>`
            <div class="drop-zone" data-id="${f.id}" style="font-size: 0.9rem; padding: 0.8rem; min-height: 48px;">
              ${f.right}
            </div>
          `).join("")}
        </div>
      </div>
      
      <div id="matching-completion-panel" style="display: none; text-align: center; margin-top: 1.5rem;">
        <div style="color: var(--color-success); font-weight: 700; font-size: 1.1rem; margin-bottom: 1rem;">🗣️ Parfait ! Vous maîtrisez la communication en cuisine.</div>
        <button class="next-btn" id="restart-match-btn" style="margin: 0 auto; display: block;">Play Again</button>
      </div>
    `,_.appendChild(d),p(d,4,r)}function p(o,d,f){let t=null,x=null,C=0;const L=o.querySelectorAll(".drag-card"),v=o.querySelectorAll(".drop-zone"),h=o.querySelector("#matching-completion-panel");L.forEach(S=>{S.addEventListener("dragstart",j=>{t=j.target.closest(".drag-card").getAttribute("data-id"),j.target.closest(".drag-card").classList.add("dragging")}),S.addEventListener("dragend",j=>{j.target.closest(".drag-card").classList.remove("dragging")}),S.addEventListener("click",j=>{const y=j.target.closest(".drag-card");y.classList.contains("matched")||(L.forEach(q=>q.style.borderColor="rgba(10,25,49,0.08)"),x=y.getAttribute("data-id"),y.style.borderColor="var(--color-accent)")})}),v.forEach(S=>{S.addEventListener("dragover",j=>{j.preventDefault(),S.classList.contains("matched")||S.classList.add("hovered")}),S.addEventListener("dragleave",()=>{S.classList.remove("hovered")}),S.addEventListener("drop",j=>{j.preventDefault(),S.classList.remove("hovered");const y=S.getAttribute("data-id");t===y?w(t,S):b(t)}),S.addEventListener("click",()=>{if(S.classList.contains("matched")||!x)return;const j=S.getAttribute("data-id");x===j?(w(x,S),x=null):(b(x),x=null,L.forEach(y=>y.style.borderColor="rgba(10,25,49,0.08)"))})});function b(S){const j=o.querySelector(`#drag-${S}`);j&&(j.style.animation="shake-anim 0.4s ease-in-out",setTimeout(()=>j.style.animation="",400))}function w(S,j){const y=o.querySelector(`#drag-${S}`);y.classList.add("matched"),y.style.borderColor="var(--color-success)",j.classList.add("matched"),C++,C===d&&(h.style.display="block")}o.querySelector("#restart-match-btn").addEventListener("click",()=>{f()})}function s(){var S,j;const o=((S=g.settings)==null?void 0:S.includeGeneral)||!1;let f=(((j=g.db)==null?void 0:j.vocabulary)||[]).filter(y=>o||y.is_professional);if(l!=="ALL"&&(l==="meat"?f=f.filter(y=>{var q,z,$,N;return((q=y.tags)==null?void 0:q.includes("meat"))||((z=y.tags)==null?void 0:z.includes("beef"))||(($=y.tags)==null?void 0:$.includes("pork"))||((N=y.tags)==null?void 0:N.includes("poultry"))||/viande|boeuf|porc|poulet/i.test(y.french)}):l==="sauces"?f=f.filter(y=>{var q,z,$;return((q=y.tags)==null?void 0:q.includes("sauce"))||((z=y.tags)==null?void 0:z.includes("sauces"))||(($=y.tags)==null?void 0:$.includes("stocks"))||/sauce|fond|jus|bouillon/i.test(y.french)}):l==="cuts"?f=f.filter(y=>{var q,z;return((q=y.tags)==null?void 0:q.includes("cutting"))||((z=y.tags)==null?void 0:z.includes("vegetables"))||/coupe|tailler|ciseler|mincer|brunoise|julienne/i.test(y.french)}):l==="science"?f=f.filter(y=>{var q;return((q=y.tags)==null?void 0:q.includes("science"))||/réaction|émulsion|liaison/i.test(y.french)}):l==="grammar"&&(f=[])),f.length===0){_.innerHTML=`
        <div class="quiz-card" style="text-align: center; padding: 2rem;">
          <p style="color: var(--color-text-muted); font-style: italic;">Aucun terme de vocabulaire disponible dans cette catégorie pour jouer l'Orthographe.</p>
        </div>
      `;return}let t=T(f)[0];const x=document.createElement("div");x.className="quiz-card",x.innerHTML=`
      <div class="quiz-meta" style="margin-bottom: 1.2rem;">
        <span>📖 Orthographe de Cuisine</span>
        <span class="grammar-badge" style="background-color: var(--color-secondary);">${t.category}</span>
      </div>
      
      <div class="spelling-box" style="margin-bottom: 1.5rem; background-color: rgba(10,25,49,0.02); padding: 1.2rem; border-radius: var(--radius-sm); border-left: 3px solid var(--color-accent);">
        <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-accent); font-weight: 600; margin-bottom: 0.4rem;">Définition en Français (Monolingual Clue):</div>
        <p style="font-size: 1.05rem; font-style: italic; color: var(--color-primary); line-height: 1.4; font-family: var(--font-serif);">${t.definition_fr}</p>
        
        <div style="margin-top: 1rem; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 0.8rem; font-size: 0.85rem; color: var(--color-text-muted);">
          <strong>Hint (Japanese):</strong> ${t.japanese}
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
    `,_.appendChild(x);const C=x.querySelector("#spelling-input-field"),L=x.querySelector("#spelling-submit-btn"),v=x.querySelector("#spelling-next-btn"),h=x.querySelector("#spelling-feedback-panel"),b=x.querySelector("#spelling-feedback-title"),w=x.querySelector("#spelling-feedback-msg");C.addEventListener("keydown",y=>{y.key==="Enter"&&L.click()}),L.addEventListener("click",()=>{const y=C.value,q=t.french,z=ae(y),$=ae(q),N=z===$;C.disabled=!0,L.style.display="none",v.style.display="block",h.style.display="block",N?(C.style.borderColor="var(--color-success)",C.style.backgroundColor="#E8F5E9",h.style.backgroundColor="#E8F5E9",h.style.color="var(--color-success)",b.innerText="✓ Félicitations ! (Correct)",w.innerText=`You correctly spelled: "${q}"`):(C.style.borderColor="var(--color-error)",C.style.backgroundColor="#FFEBEE",h.style.backgroundColor="#FFEBEE",h.style.color="var(--color-error)",b.innerText="✗ Incorrect",w.innerHTML=`Correct spelling is: <strong>${q}</strong>.<br><em style="font-size:0.85rem;">You typed: "${y}"</em>`,ne(t.id))}),v.addEventListener("click",()=>{s()})}m()}function G(){const e=document.createElement("div"),u=document.createElement("h2");u.className="section-title",u.innerText="Coups de Cœur (Favorites)",e.appendChild(u);const l=document.createElement("p");l.className="section-subtitle",l.innerText="Your bookmarked vocabulary terms, grammar guides, and culinary theories.",e.appendChild(l);const a=Array.from(g.favorites);if(a.length===0)return e.innerHTML+=`
      <div class="alert alert-info">
        <p>No favorites saved yet. Browse Vocabulary, Grammar, or Cuisine and click the star (☆) button to save items here.</p>
      </div>
    `,e;const n=document.createElement("div");return n.className="loading-placeholder",n.innerText="Chargement des favoris... (Loading favorites...)",e.appendChild(n),J().then(()=>{n.remove(),Ae(e,a)}),e}function Ae(e,u){var m,i,k;const l=(((m=g.db)==null?void 0:m.vocabulary)||[]).filter(r=>u.includes(r.id)),a=(((i=g.db)==null?void 0:i.grammar)||[]).filter(r=>u.includes(r.id)),n=(((k=g.db)==null?void 0:k.cuisine)||[]).filter(r=>u.includes(r.id)),c=document.createElement("div");c.className="card-grid",e.appendChild(c);function _(){c.innerHTML="",l.forEach(r=>{const p=document.createElement("div");p.className="card",p.innerHTML=`
        <div>
          <div class="card-category">Vocabulary: ${r.category}</div>
          <div class="term-header">
            <h3 class="term-title">${r.french}</h3>
            <button class="fav-btn active" data-id="${r.id}">★</button>
          </div>
          <div class="term-translations">
            <div class="trans-en">${r.english}</div>
            <div class="trans-ja">${r.japanese}</div>
          </div>
        </div>
        <div class="term-context">
          <div class="context-fr">"${r.context_fr}"</div>
          <div class="context-ja">${r.context_ja}</div>
        </div>
      `,p.querySelector(".fav-btn").addEventListener("click",s=>{H(r.id),G(),e.innerHTML="",e.appendChild(G())}),c.appendChild(p)}),a.forEach(r=>{var s,o;const p=document.createElement("div");p.className="card",p.innerHTML=`
        <div>
          <div class="card-category">Grammar: ${r.level}</div>
          <div class="term-header">
            <h3 class="term-title" style="font-size: 1.25rem;">${r.topic}</h3>
            <button class="fav-btn active" data-id="${r.id}">★</button>
          </div>
          <p style="font-size: 0.85rem; margin-bottom: 1rem; color: var(--color-text-main);">${r.explanation_en.substring(0,100)}...</p>
        </div>
        <div style="font-size: 0.8rem; font-weight: bold; text-transform: uppercase; color: var(--color-accent);">Example:</div>
        <div class="term-context" style="margin-top: 0.5rem;">
          <div class="context-fr">"${((s=r.examples[0])==null?void 0:s.fr)||""}"</div>
          <div class="context-ja">${((o=r.examples[0])==null?void 0:o.ja)||""}</div>
        </div>
      `,p.querySelector(".fav-btn").addEventListener("click",d=>{H(r.id),e.innerHTML="",e.appendChild(G())}),c.appendChild(p)}),n.forEach(r=>{const p=document.createElement("div");p.className="card",p.innerHTML=`
        <div>
          <div class="card-category">Cuisine: ${r.category}</div>
          <div class="term-header">
            <h3 class="term-title" style="font-size: 1.25rem;">${r.topic}</h3>
            <button class="fav-btn active" data-id="${r.id}">★</button>
          </div>
          <p style="font-size: 0.85rem; margin-bottom: 1rem; color: var(--color-text-main);">${r.content_en.substring(0,100)}...</p>
        </div>
      `,p.querySelector(".fav-btn").addEventListener("click",s=>{H(r.id),e.innerHTML="",e.appendChild(G())}),c.appendChild(p)})}_()}function Me(){const e=document.createElement("div"),u=document.createElement("h2");u.className="section-title",u.innerText="Pont d'Études (SRS Review Deck)",e.appendChild(u);const l=document.createElement("p");l.className="section-subtitle",l.innerText="Review and grade yourself on items scheduled for active recall today.",e.appendChild(l);const a=document.createElement("div");return a.className="loading-placeholder",a.innerText="Chargement des révisions... (Loading reviews...)",e.appendChild(a),J().then(()=>{a.remove(),Fe(e)}),e}function Fe(e){var i,k,r,p;const u=new Date().toISOString().split("T")[0],a=[...(((i=g.db)==null?void 0:i.vocabulary)||[]).map(s=>({...s,type:"vocabulary",front:s.french})),...(((k=g.db)==null?void 0:k.grammar)||[]).map(s=>({...s,type:"grammar",front:s.topic})),...(((r=g.db)==null?void 0:r.cuisine)||[]).map(s=>({...s,type:"cuisine",front:s.topic})),...(((p=g.db)==null?void 0:p.quizzes)||[]).map(s=>({...s,type:"quiz",front:s.question_fr||s.question||""}))].filter(s=>{const o=g.srs[s.id];return g.wrongAnswers.includes(s.id)||o&&o.dueDate<=u}),n=a.length;let c=0;const _=document.createElement("div");_.className="srs-review-container",e.appendChild(_);function m(){if(_.innerHTML="",a.length===0||c>=a.length){_.innerHTML=`
        <div class="alert alert-info" style="background-color: #E8F5E9; border-left-color: var(--color-success); color: var(--color-success); padding: 2rem; text-align: center;">
          <h3 style="font-family: var(--font-serif); font-size: 1.8rem; margin-bottom: 0.5rem;">Tout est propre !</h3>
          <p>No cards due for review today. Excellent job keeping up with your kitchen training!</p>
        </div>
      `;return}const s=a[c];g.srs[s.id];const o=g.wrongAnswers.includes(s.id),d=document.createElement("div");d.className="card srs-flip-card",d.style.padding="2rem",d.style.minHeight="300px",d.style.display="flex",d.style.flexDirection="column",d.style.justifyContent="space-between";let f=s.category||s.level||"Theory";s.type==="quiz"&&(f="Quiz Mistake");let t=`
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
          <span class="card-category">${f} • ${s.type.toUpperCase()}</span>
          <span style="font-size: 0.8rem; color: var(--color-text-muted);">
            Card ${c+1} of ${n}
            ${o?' <span style="color: var(--color-error); font-weight: bold;">(Wrong Answer)</span>':""}
          </span>
        </div>
        <div style="text-align: center; margin: 2rem 0;">
          <h1 style="font-family: var(--font-serif); font-size: 1.8rem; color: var(--color-primary); font-style: italic; line-height: 1.3;">${s.front}</h1>
          ${s.type==="grammar"?'<p style="color: var(--color-text-muted); margin-top: 0.5rem;">French Grammar Topic</p>':""}
          ${s.type==="cuisine"?'<p style="color: var(--color-text-muted); margin-top: 0.5rem;">Culinary Theory Guide</p>':""}
          ${s.type==="quiz"&&s.question_en?`<p style="font-family: var(--font-sans); color: var(--color-text-muted); font-size: 0.95rem; font-style: normal; font-weight: normal; margin-top: 0.8rem;">${s.question_en}</p>`:""}
        </div>
      </div>
      <button class="next-btn" id="reveal-btn" style="width: 100%; font-size: 1.1rem; padding: 0.8rem;">
        Afficher la réponse (Reveal Answer)
      </button>
    `;d.innerHTML=t;let x="";s.type==="vocabulary"?x=`
        <div style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.8rem;">
          <div style="background-color: rgba(197, 168, 128, 0.04); border-left: 3px solid var(--color-accent); padding: 0.8rem 1rem; border-radius: var(--radius-sm);">
            <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-accent); font-weight: 600; margin-bottom: 0.2rem; display: flex; align-items: center; gap: 0.4rem;">
              <span>Définition Monolingue (FR)</span>
              <button class="audio-btn" data-text="${s.definition_fr}" title="Listen definition" style="background: none; border: none; font-size: 0.85rem; cursor: pointer; color: var(--color-accent); padding: 0;">🔊</button>
            </div>
            <p style="font-size: 0.95rem; line-height: 1.4; color: var(--color-text-main); font-weight: 500; font-style: italic;">${s.definition_fr||"Pas de définition."}</p>
          </div>
          
          <div class="flip-translation-container">
            <div class="flip-translation-card">
              <div class="flip-front">🇬🇧 Afficher l'anglais (Show English Translation)</div>
              <div class="flip-back" style="color: var(--color-secondary); justify-content: center; font-weight: 600;">🇬🇧 ${s.english}</div>
            </div>
          </div>
          
          <div class="trans-ja" style="font-size: 1.1rem; color: var(--color-text-main); font-weight: 500;">${s.japanese}</div>
        </div>
        <div class="term-context" style="margin-top: 1.2rem; background-color: rgba(197, 168, 128, 0.05); padding: 1rem; border-radius: var(--radius-sm);">
          <div class="context-fr" style="display: flex; align-items: flex-start; gap: 0.4rem; font-style: italic; color: var(--color-primary);">
            <span style="flex: 1;">"${s.context_fr}"</span>
            <button class="audio-btn" data-text="${s.context_fr}" title="Listen context" style="background: none; border: none; font-size: 0.85rem; cursor: pointer; color: var(--color-text-muted); padding: 0.15rem;">🔊</button>
          </div>
          <div class="context-ja" style="color: var(--color-text-muted); margin-top: 0.3rem;">${s.context_ja}</div>
        </div>
      `:s.type==="grammar"?x=`
        <div style="margin-top: 1rem;">
          <p style="font-weight: 600; color: var(--color-primary);">Explanation (EN):</p>
          <p style="font-size: 0.9rem; margin-bottom: 0.8rem;">${s.explanation_en}</p>
          <p style="font-weight: 600; color: var(--color-primary);">説明 (JA):</p>
          <p style="font-size: 0.9rem; margin-bottom: 1rem;">${s.explanation_ja}</p>
          <div class="examples-list" style="border-top: 1px solid rgba(0,0,0,0.05); padding-top: 0.8rem;">
            ${s.examples.map(C=>`
              <div class="example-item" style="margin-bottom: 0.5rem;">
                <div class="example-fr">➔ ${C.fr}</div>
                <div class="example-ja" style="font-size: 0.8rem; color: var(--color-text-muted);">${C.ja}</div>
              </div>
            `).join("")}
          </div>
        </div>
      `:s.type==="cuisine"?x=`
        <div style="margin-top: 1rem; display: flex; flex-direction: column; gap: 1rem;">
          <div>
            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-accent); font-weight: 600;">Français</h4>
            <p style="font-size: 0.95rem; font-style: italic; color: var(--color-primary); line-height: 1.5;">${s.content_fr}</p>
          </div>
          <div>
            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-accent); font-weight: 600;">English</h4>
            <p style="font-size: 0.9rem; color: var(--color-text-main); line-height: 1.5;">${s.content_en}</p>
          </div>
          <div style="background-color: rgba(10, 25, 49, 0.03); padding: 0.8rem; border-radius: var(--radius-sm); border-left: 3px solid var(--color-secondary);">
            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-primary); font-weight: 600;">日本語解説</h4>
            <p style="font-size: 0.85rem; color: var(--color-text-main); line-height: 1.5;">${s.content_ja}</p>
          </div>
        </div>
      `:s.type==="quiz"&&(x=`
        <div style="margin-top: 1rem; display: flex; flex-direction: column; gap: 1rem;">
          <div style="background-color: rgba(70, 163, 73, 0.08); border-left: 3px solid var(--color-success); padding: 1rem; border-radius: var(--radius-sm);">
            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-success); font-weight: 600; margin-bottom: 0.2rem;">Correct Solution</h4>
            <p style="font-size: 1.1rem; color: var(--color-text-main); font-weight: 600;">${s.answer}</p>
          </div>
          <div>
            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-accent); font-weight: 600; margin-bottom: 0.2rem;">Kitchen Context / Explanation</h4>
            <p style="font-size: 0.9rem; color: var(--color-text-main); line-height: 1.5;">${s.context}</p>
          </div>
        </div>
      `),d.querySelector("#reveal-btn").addEventListener("click",()=>{d.innerHTML=`
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <span class="card-category">${f} • ${s.type.toUpperCase()}</span>
            <span style="font-size: 0.8rem; color: var(--color-text-muted);">Card ${c+1} of ${n}</span>
          </div>
          
          <h2 style="font-family: var(--font-serif); font-size: 1.8rem; color: var(--color-primary); font-style: italic; text-align: center; margin-bottom: 1rem; line-height: 1.3;">${s.front}</h2>
          ${s.type==="quiz"&&s.question_en?`<p style="font-family: var(--font-sans); color: var(--color-text-muted); font-size: 0.9rem; text-align: center; margin-bottom: 1.5rem;">${s.question_en}</p>`:""}
          
          <div style="max-height: 300px; overflow-y: auto; padding-right: 0.5rem; margin-bottom: 2rem;">
            ${x}
          </div>
        </div>
        
        <!-- Score buttons (SM-2 options) -->
        <div>
          <div style="font-size: 0.85rem; font-weight: 600; text-align: center; margin-bottom: 0.8rem; color: var(--color-text-muted);">How well did you recall this?</div>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.4rem;">
            <button class="next-btn srs-score-btn" data-score="1" style="background-color: var(--color-error); font-size: 0.8rem; padding: 0.6rem 0.2rem;">
              Again
            </button>
            <button class="next-btn srs-score-btn" data-score="3" style="background-color: #FFA726; font-size: 0.8rem; padding: 0.6rem 0.2rem;">
              Hard
            </button>
            <button class="next-btn srs-score-btn" data-score="4" style="background-color: var(--color-primary); font-size: 0.8rem; padding: 0.6rem 0.2rem;">
              Good
            </button>
            <button class="next-btn srs-score-btn" data-score="5" style="background-color: var(--color-success); font-size: 0.8rem; padding: 0.6rem 0.2rem;">
              Easy
            </button>
          </div>
        </div>
      `;const C=d.querySelector(".flip-translation-container");C&&C.addEventListener("click",L=>{L.stopPropagation(),C.querySelector(".flip-translation-card").classList.toggle("flipped")}),d.querySelectorAll(".audio-btn").forEach(L=>{L.addEventListener("click",v=>{v.stopPropagation();const h=v.target.closest(".audio-btn").getAttribute("data-text");F(h)})}),d.querySelectorAll(".srs-score-btn").forEach(L=>{L.addEventListener("click",v=>{const h=parseInt(v.target.getAttribute("data-score"));O(s.id,h),h>=4&&o&&He(s.id),c++,m()})})}),_.appendChild(d)}m()}function Be(){const e=document.createElement("div"),u=document.createElement("h2");u.className="section-title",u.innerText="Recherche Globale",e.appendChild(u);const l=document.createElement("p");l.className="section-subtitle",l.innerText="Search terms across the entire curriculum: Vocabulary, Grammar, and Culinary Theory.",e.appendChild(l);const a=document.createElement("div");a.className="search-box-wrapper",a.style.marginBottom="2rem",a.style.position="relative";const n=document.createElement("input");n.type="text",n.placeholder="Chargement de la base de données... (Loading database...)",n.className="search-input",n.style.width="100%",n.style.padding="1rem 1.5rem",n.style.fontSize="1.1rem",n.style.borderRadius="var(--radius-md)",n.style.border="2px solid rgba(197, 168, 128, 0.2)",n.style.backgroundColor="var(--color-bg)",n.style.fontFamily="var(--font-sans)",n.style.transition="var(--transition)",n.style.outline="none",n.disabled=!0,n.addEventListener("focus",()=>{n.style.borderColor="var(--color-accent)",n.style.boxShadow="0 0 10px rgba(212, 175, 55, 0.15)"}),n.addEventListener("blur",()=>{n.style.borderColor="rgba(197, 168, 128, 0.2)",n.style.boxShadow="none"}),a.appendChild(n),e.appendChild(a);const c=document.createElement("div");return c.className="search-results",e.appendChild(c),c.innerHTML=`
    <div style="text-align: center; padding: 3rem; color: var(--color-text-muted);">
      <p>Préparation de la recherche... (Preparing search database...)</p>
    </div>
  `,J().then(()=>{n.disabled=!1,n.placeholder="Rechercher... (e.g. sauce, roux, cut, culer, 刻む)";function _(m){var o,d,f;if(c.innerHTML="",!m.trim()){c.innerHTML=`
          <div style="text-align: center; padding: 3rem; color: var(--color-text-muted);">
            <span style="font-size: 3rem;">🔍</span>
            <p style="margin-top: 1rem;">Tapez un mot-clé pour commencer votre recherche.</p>
          </div>
        `;return}const i=m.toLowerCase().trim(),k=((o=g.db)==null?void 0:o.vocabulary)||[],r=((d=g.db)==null?void 0:d.grammar)||[],p=((f=g.db)==null?void 0:f.cuisine)||[],s=[];if(k.forEach(t=>{`${t.french} ${t.english} ${t.japanese} ${t.category} ${t.context_fr} ${t.context_en} ${t.context_ja} ${(t.tags||[]).join(" ")}`.toLowerCase().includes(i)&&s.push({...t,type:"vocabulary",title:t.french,subtitle:`${t.category} • Vocabulary`})}),r.forEach(t=>{`${t.topic} ${t.explanation_en} ${t.explanation_ja} ${t.level} ${(t.tags||[]).join(" ")} ${t.examples.map(C=>`${C.fr} ${C.en} ${C.ja}`).join(" ")}`.toLowerCase().includes(i)&&s.push({...t,type:"grammar",title:t.topic,subtitle:`${t.level} • Grammar Lesson`})}),p.forEach(t=>{`${t.topic} ${t.category} ${t.content_fr} ${t.content_en} ${t.content_ja} ${(t.tags||[]).join(" ")}`.toLowerCase().includes(i)&&s.push({...t,type:"cuisine",title:t.topic,subtitle:`${t.category} • Culinary Theory`})}),s.length===0){c.innerHTML=`
          <div style="text-align: center; padding: 3rem; color: var(--color-text-muted);">
            <p>Aucun résultat trouvé pour "<strong>${m}</strong>".</p>
            <p style="font-size: 0.9rem; margin-top: 0.5rem;">Check your spelling or try another keyword.</p>
          </div>
        `;return}s.forEach(t=>{const x=document.createElement("div");x.className="card search-result-card",x.style.marginBottom="1.2rem",x.style.borderLeft=`4px solid ${t.type==="vocabulary"?"var(--color-primary)":t.type==="grammar"?"var(--color-secondary)":"var(--color-accent)"}`;const C=B(t.id);let L="";t.type==="vocabulary"?L=`
            <div class="term-translations" style="margin-top: 0.5rem;">
              <div class="trans-en">${t.english}</div>
              <div class="trans-ja">${t.japanese}</div>
            </div>
            <div class="term-context" style="margin-top: 1rem;">
              <div class="context-fr">"${t.context_fr}"</div>
              <div class="context-ja">${t.context_ja}</div>
            </div>
          `:t.type==="grammar"?L=`
            <p style="font-size: 0.9rem; margin-top: 0.5rem; color: var(--color-text-main);">${t.explanation_en}</p>
            <p style="font-size: 0.85rem; margin-top: 0.3rem; color: var(--color-text-muted);">${t.explanation_ja}</p>
            <div class="examples-list" style="margin-top: 1rem; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 0.8rem;">
              ${t.examples.slice(0,2).map(h=>`
                <div class="example-item" style="margin-bottom: 0.5rem;">
                  <div class="example-fr" style="font-weight: 500;">➔ ${h.fr}</div>
                  <div class="example-ja" style="font-size: 0.8rem; color: var(--color-text-muted);">${h.ja}</div>
                </div>
              `).join("")}
            </div>
          `:t.type==="cuisine"&&(L=`
            <p style="font-size: 0.9rem; margin-top: 0.5rem; font-style: italic; color: var(--color-primary);">${t.content_fr.substring(0,150)}...</p>
            <p style="font-size: 0.85rem; margin-top: 0.5rem; color: var(--color-text-main);">${t.content_ja.substring(0,120)}...</p>
          `);const v=(t.tags||[]).map(h=>`<span class="tag-badge" style="background-color: rgba(197, 168, 128, 0.12); color: var(--color-accent); font-size: 0.75rem; padding: 0.2rem 0.6rem; border-radius: 20px; font-weight: 500;">#${h}</span>`).join(" ");x.innerHTML=`
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem;">
            <div>
              <div class="card-category" style="margin: 0; font-size: 0.75rem;">${t.subtitle}</div>
              <h3 class="term-title" style="margin-top: 0.2rem; font-size: 1.4rem;">${t.title}</h3>
            </div>
            <button class="fav-btn ${C?"active":""}" data-id="${t.id}">
              ${C?"★":"☆"}
            </button>
          </div>
          ${L}
          ${t.tags&&t.tags.length>0?`<div style="margin-top: 1rem; display: flex; flex-wrap: wrap; gap: 0.4rem;">${v}</div>`:""}
        `,x.querySelector(".fav-btn").addEventListener("click",h=>{h.stopPropagation(),H(t.id);const b=h.target,w=B(t.id);b.classList.toggle("active",w),b.innerText=w?"★":"☆"}),c.appendChild(x)})}n.addEventListener("input",m=>{_(m.target.value)}),_("")}),e}function Ne(){const e=document.createElement("div"),u=document.createElement("h2");u.className="section-title",u.innerText="Configuration de l'Académie",e.appendChild(u);const l=document.createElement("p");l.className="section-subtitle",l.innerText="Customize your learning goals, target CEFR levels, and database options.",e.appendChild(l);const a=document.createElement("div");a.className="card",a.style.padding="2rem";const n=g.settings;a.innerHTML=`
    <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--color-primary); border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 0.8rem; margin-bottom: 1.5rem;">Study Profile</h3>
    
    <div style="display: flex; flex-direction: column; gap: 1.8rem;">
      <!-- 1. Target Level Selection -->
      <div>
        <label style="font-weight: 600; display: block; margin-bottom: 0.5rem; color: var(--color-text-main);">Niveau Cible (Target Level)</label>
        <span style="font-size: 0.85rem; color: var(--color-text-muted); display: block; margin-bottom: 0.8rem;">Select your culinary French proficiency level. Vocabulary and Grammar filters will adapt.</span>
        <select id="target-level-select" style="padding: 0.6rem 1rem; font-size: 0.95rem; border-radius: var(--radius-sm); border: 1px solid rgba(0,0,0,0.15); width: 100%; max-width: 300px; background-color: var(--color-bg); cursor: pointer;">
          <option value="ALL" ${n.targetLevel==="ALL"?"selected":""}>ALL LEVELS (Tout)</option>
          <option value="A1" ${n.targetLevel==="A1"?"selected":""}>A1 - Beginner (Apprenti)</option>
          <option value="A2" ${n.targetLevel==="A2"?"selected":""}>A2 - Intermediate (Commis)</option>
          <option value="B1" ${n.targetLevel==="B1"?"selected":""}>B1 - Advanced (Chef de Partie)</option>
          <option value="B2" ${n.targetLevel==="B2"?"selected":""}>B2 - Upper Intermediate (Sous Chef)</option>
          <option value="C1" ${n.targetLevel==="C1"?"selected":""}>C1 - Expert (Chef de Cuisine)</option>
          <option value="C2" ${n.targetLevel==="C2"?"selected":""}>C2 - Master (Directeur de Cuisine)</option>
        </select>
      </div>
      
      <!-- 2. Daily Goal - New Cards -->
      <div>
        <label style="font-weight: 600; display: block; margin-bottom: 0.5rem; color: var(--color-text-main);">Daily Goal: New Cards/Day</label>
        <span style="font-size: 0.85rem; color: var(--color-text-muted); display: block; margin-bottom: 0.8rem;">Number of new culinary vocabulary items to introduce per day.</span>
        <input type="number" id="new-cards-goal" min="1" max="50" value="${n.newCardsPerDay}" style="padding: 0.6rem 1rem; font-size: 0.95rem; border-radius: var(--radius-sm); border: 1px solid rgba(0,0,0,0.15); width: 100%; max-width: 120px;">
      </div>
      
      <!-- 3. Daily Goal - Max Reviews -->
      <div>
        <label style="font-weight: 600; display: block; margin-bottom: 0.5rem; color: var(--color-text-main);">Daily Goal: Max Reviews/Day</label>
        <span style="font-size: 0.85rem; color: var(--color-text-muted); display: block; margin-bottom: 0.8rem;">Maximum number of scheduled SRS reviews to show per day.</span>
        <input type="number" id="max-reviews-goal" min="5" max="200" value="${n.maxReviewsPerDay}" style="padding: 0.6rem 1rem; font-size: 0.95rem; border-radius: var(--radius-sm); border: 1px solid rgba(0,0,0,0.15); width: 100%; max-width: 120px;">
      </div>

      <!-- 4. Include General Vocabulary -->
      <div>
        <label style="font-weight: 600; display: block; margin-bottom: 0.5rem; color: var(--color-text-main);">Vocabulaire Général (General Vocabulary)</label>
        <span style="font-size: 0.85rem; color: var(--color-text-muted); display: block; margin-bottom: 0.8rem;">Include basic French vocabulary (non-cooking related) in your learning.</span>
        <div style="display: flex; align-items: center; gap: 0.8rem; margin-bottom: 0.5rem;">
          <input type="checkbox" id="include-general-checkbox" style="transform: scale(1.3); cursor: pointer;" ${n.includeGeneral?"checked":""}>
          <label for="include-general-checkbox" style="font-size: 0.95rem; cursor: pointer; user-select: none;">Include daily general terms (A1-B1)</label>
        </div>
      </div>
      
      <!-- Action status notification -->
      <div id="settings-status" style="display: none; padding: 0.8rem; background-color: #E8F5E9; border-left: 3px solid var(--color-success); color: var(--color-success); font-size: 0.9rem; border-radius: 0 var(--radius-sm) var(--radius-sm) 0;">
        ✓ Paramètres enregistrés avec succès ! (Settings saved successfully!)
      </div>

      <!-- 5. Share App -->
      <div style="border-top: 1px solid rgba(0,0,0,0.05); padding-top: 1.5rem; margin-top: 1rem;">
        <h4 style="font-family: var(--font-serif); font-size: 1.3rem; color: var(--color-primary); margin-bottom: 0.5rem;">Partager l'Académie</h4>
        <span style="font-size: 0.85rem; color: var(--color-text-muted); display: block; margin-bottom: 0.8rem;">Share this integrated learning app with your fellow chefs.</span>
        <button id="share-app-btn" class="next-btn" style="background-color: var(--color-accent); font-size: 0.95rem; padding: 0.6rem 1.5rem; display: flex; align-items: center; gap: 0.5rem; border-color: var(--color-accent-hover);">
          🔗 Share with Friends
        </button>
      </div>
      
      <!-- 4. Data Maintenance -->
      <div style="border-top: 1px solid rgba(0,0,0,0.05); padding-top: 1.5rem; margin-top: 1rem;">
        <h4 style="font-family: var(--font-serif); font-size: 1.3rem; color: var(--color-error); margin-bottom: 1rem;">Zone de Danger</h4>
        
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <button id="reset-srs-btn" class="next-btn" style="background-color: var(--color-error); font-size: 0.9rem; padding: 0.6rem 1.2rem;">
            Reset SRS Memory Deck
          </button>
          
          <button id="clear-favs-btn" class="next-btn" style="background-color: transparent; border: 2px solid var(--color-error); color: var(--color-error); font-size: 0.9rem; padding: 0.5rem 1.2rem;">
            Clear All Favorites
          </button>
        </div>
      </div>
    </div>
  `;const c=a.querySelector("#target-level-select"),_=a.querySelector("#new-cards-goal"),m=a.querySelector("#max-reviews-goal"),i=a.querySelector("#include-general-checkbox"),k=a.querySelector("#settings-status");function r(){const p=c.value,s=parseInt(_.value)||5,o=parseInt(m.value)||20,d=i.checked;Ie({targetLevel:p,newCardsPerDay:s,maxReviewsPerDay:o,includeGeneral:d}),k.style.display="block",setTimeout(()=>{k.style.display="none"},3e3)}return c.addEventListener("change",r),_.addEventListener("input",r),m.addEventListener("input",r),i.addEventListener("change",r),a.querySelector("#reset-srs-btn").addEventListener("click",()=>{confirm("Voulez-vous vraiment réinitialiser toutes vos données de progression SRS ? Cette action est irréversible.")&&(localStorage.removeItem("cba_srs"),g.srs={},alert("Spaced Repetition System progress has been reset."),window.location.reload())}),a.querySelector("#clear-favs-btn").addEventListener("click",()=>{confirm("Voulez-vous vraiment supprimer tous vos favoris ?")&&(localStorage.removeItem("cba_favorites"),g.favorites=new Set,alert("All favorites have been cleared."),window.location.reload())}),a.querySelector("#share-app-btn").addEventListener("click",()=>{const p={title:"Académie de la Brigade",text:"フランス料理・厨房フランス語の統合学習PWAアプリ「Académie de la Brigade」で一緒に料理と語学を学びましょう！",url:window.location.origin+window.location.pathname};navigator.share?navigator.share(p).then(()=>console.log("Shared successfully")).catch(s=>console.log("Error sharing:",s)):navigator.clipboard.writeText(p.url).then(()=>{alert("App link copied to clipboard! Share it with your friends.")}).catch(s=>{console.error("Failed to copy link:",s)})}),e.appendChild(a),e}function Pe(){var c;const e=document.createElement("div"),u=document.createElement("h2");u.className="section-title",u.innerText="Dictée de Cuisine (Culinary Dictations)",e.appendChild(u);const l=document.createElement("p");l.className="section-subtitle",l.innerText="Listen to French kitchen instruction sentences, type what you hear, and master French spelling.",e.appendChild(l);const a=document.createElement("div");a.className="loading-placeholder",a.innerText="Chargement de la dictée... (Loading dictation...)",e.appendChild(a);const n=((c=g.settings)==null?void 0:c.targetLevel)||"ALL";return A("vocabulary",n).then(()=>{a.remove(),De(e)}),e}function De(e){var t,x;const u=((t=g.settings)==null?void 0:t.includeGeneral)||!1,n=(((x=g.db)==null?void 0:x.vocabulary)||[]).filter(C=>u||C.is_professional).filter(C=>C.context_fr);if(n.length===0){e.innerHTML+='<p style="color: var(--color-text-muted);">Aucun exercice disponible.</p>';return}const c=[...n].sort(()=>.5-Math.random()).slice(0,5);let _=0,m=!1,i=!1,k=!1,r=0,p=1;const s=document.createElement("div");s.className="dictation-container",s.style.maxWidth="600px",s.style.margin="1.5rem auto",e.appendChild(s);function o(C){return C.toLowerCase().trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()'"?]/g,"").replace(/\s+/g," ")}function d(C){return C.normalize("NFD").replace(/[\u0300-\u036f]/g,"")}function f(){if(s.innerHTML="",m=!1,K(),i=!1,k=!1,r=0,_>=c.length){const E=document.createElement("div");E.className="card",E.style.padding="2.5rem",E.style.textAlign="center",E.innerHTML=`
        <h3 style="font-family: var(--font-serif); font-size: 2rem; color: var(--color-primary); margin-bottom: 1rem;">Session Terminée !</h3>
        <p style="font-size: 1.1rem; margin-bottom: 2rem; color: var(--color-text-muted);">You completed all culinary dictation drills in this session.</p>
        <button id="restart-dictation-btn" class="next-btn" style="width: 100%;">Restart New Dictation Session</button>
      `,E.querySelector("#restart-dictation-btn").addEventListener("click",()=>{_=0,c.length=0,c.push(...[...n].sort(()=>.5-Math.random()).slice(0,5)),f()}),s.appendChild(E);return}const C=c[_],L=C.context_fr,v=document.createElement("div");v.className="card",v.style.padding="2rem",v.innerHTML=`
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 0.8rem;">
        <span class="card-category" style="margin: 0;">Drill ${_+1} of ${c.length}</span>
        <span style="font-size: 0.8rem; color: var(--color-text-muted); font-weight: 500;">Topic: ${C.category}</span>
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
    `;const h=v.querySelector("#play-pause-btn"),b=v.querySelector("#stop-btn"),w=v.querySelector("#speed-normal-btn"),S=v.querySelector("#speed-slow-btn"),j=v.querySelector("#dictation-seekbar"),y=v.querySelector("#dictation-input"),q=v.querySelector("#check-btn"),z=v.querySelector("#next-dictation-btn"),$=v.querySelector("#dictation-feedback");function N(E,R){if(!m){const P=E/R*100;j.value=Math.round(P),r=E}}function I(){i=!1,k=!1,r=0,h.innerText="▶ Play",j.value=0}function M(){ie(L,p,N,I,r)}h.addEventListener("click",()=>{m||(i?k?(k=!1,h.innerText="⏸ Pause",de()):(k=!0,h.innerText="▶ Play",le()):(i=!0,k=!1,h.innerText="⏸ Pause",M()))}),b.addEventListener("click",()=>{K(),I()}),j.addEventListener("change",E=>{if(m)return;const R=parseInt(E.target.value),P=L.replace(/["'➔]/g,"").trim();r=Math.floor(R/100*P.length);const V=P.indexOf(" ",r);V!==-1&&V-r<5&&(r=V+1),i=!0,k=!1,h.innerText="⏸ Pause",M()}),w.addEventListener("click",()=>{p!==1&&(p=1,w.classList.add("active"),w.style.backgroundColor="var(--color-primary)",w.style.color="#FFFFFF",S.classList.remove("active"),S.style.backgroundColor="transparent",S.style.color="var(--color-accent)",i&&!k&&M())}),S.addEventListener("click",()=>{p!==.75&&(p=.75,S.classList.add("active"),S.style.backgroundColor="var(--color-accent)",S.style.color="#FFFFFF",w.classList.remove("active"),w.style.backgroundColor="transparent",w.style.color="var(--color-accent)",i&&!k&&M())}),q.addEventListener("click",()=>{if(m)return;K(),I();const E=y.value,R=o(E),P=o(L),V=d(R),ce=d(P);let Q=!1,U=!1;R===P?Q=!0:V===ce&&(U=!0),$.style.display="block",y.disabled=!0,q.style.display="none",z.style.display="block",m=!0,Q?($.style.backgroundColor="#E8F5E9",$.style.borderLeft="4px solid var(--color-success)",$.style.color="var(--color-success)",$.innerHTML=`
          <strong style="font-size: 1.1rem; display: block; margin-bottom: 0.4rem;">Très bien ! (Excellent!)</strong>
          <p style="font-size: 0.9rem; color: var(--color-text-main);">Your spelling is perfectly correct.</p>
          <div style="margin-top: 0.8rem; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 0.6rem; font-size: 0.85rem; color: var(--color-text-muted);">
            <strong>Meaning:</strong> ${C.context_ja}
          </div>
        `):U?($.style.backgroundColor="#FFF3E0",$.style.borderLeft="4px solid var(--color-accent)",$.style.color="#E65100",$.innerHTML=`
          <strong style="font-size: 1.1rem; display: block; margin-bottom: 0.4rem;">Presque correct ! (Almost correct)</strong>
          <p style="font-size: 0.9rem; color: var(--color-text-main);">Watch out for French accents (é, è, à, ç, etc.) or punctuation spacing.</p>
          <div style="margin: 0.8rem 0; padding: 0.6rem; background: rgba(0,0,0,0.02); font-size: 0.9rem; border-radius: var(--radius-sm);">
            <div><strong>Expected:</strong> <span style="font-family: monospace; font-weight: 600; color: var(--color-success);">${L}</span></div>
            <div style="margin-top: 0.2rem;"><strong>Your input:</strong> <span style="font-family: monospace; font-weight: 600; color: var(--color-error);">${E}</span></div>
          </div>
          <div style="border-top: 1px solid rgba(0,0,0,0.05); padding-top: 0.6rem; font-size: 0.85rem; color: var(--color-text-muted);">
            <strong>Meaning:</strong> ${C.context_ja}
          </div>
        `):($.style.backgroundColor="#FFEBEE",$.style.borderLeft="4px solid var(--color-error)",$.style.color="var(--color-error)",$.innerHTML=`
          <strong style="font-size: 1.1rem; display: block; margin-bottom: 0.4rem;">Incorrect.</strong>
          <div style="margin: 0.8rem 0; padding: 0.6rem; background: rgba(0,0,0,0.02); font-size: 0.9rem; border-radius: var(--radius-sm);">
            <div><strong>Expected:</strong> <span style="font-family: monospace; font-weight: 600; color: var(--color-success);">${L}</span></div>
            <div style="margin-top: 0.2rem;"><strong>Your input:</strong> <span style="font-family: monospace; font-weight: 600; color: var(--color-error);">${E||"(empty)"}</span></div>
          </div>
          <div style="border-top: 1px solid rgba(0,0,0,0.05); padding-top: 0.6rem; font-size: 0.85rem; color: var(--color-text-muted);">
            <strong>Meaning:</strong> ${C.context_ja}
          </div>
        `)}),z.addEventListener("click",()=>{_++,f()}),s.appendChild(v),y.focus()}f()}const g={meta:null,db:{knowledge:[],vocabulary:[],grammar:[],cuisine:[],quizzes:[]},loaded:{knowledge:new Set,vocabulary:new Set,grammar:new Set,cuisine:new Set,quizzes:!1},favorites:new Set(JSON.parse(localStorage.getItem("cba_favorites")||"[]")),wrongAnswers:JSON.parse(localStorage.getItem("cba_wrong")||"[]"),streak:parseInt(localStorage.getItem("cba_streak")||"0"),lastStudyDate:localStorage.getItem("cba_last_study")||"",srs:JSON.parse(localStorage.getItem("cba_srs")||"{}"),settings:JSON.parse(localStorage.getItem("cba_settings")||JSON.stringify({targetLevel:"ALL",newCardsPerDay:5,maxReviewsPerDay:20,includeGeneral:!1}))};function H(e){g.favorites.has(e)?g.favorites.delete(e):g.favorites.add(e),localStorage.setItem("cba_favorites",JSON.stringify(Array.from(g.favorites)))}function B(e){return g.favorites.has(e)}function ne(e){g.wrongAnswers.includes(e)||(g.wrongAnswers.push(e),localStorage.setItem("cba_wrong",JSON.stringify(g.wrongAnswers)))}function He(e){g.wrongAnswers=g.wrongAnswers.filter(u=>u!==e),localStorage.setItem("cba_wrong",JSON.stringify(g.wrongAnswers))}function Re(){const e=new Date().toISOString().split("T")[0];if(g.lastStudyDate!==e){if(g.lastStudyDate){const u=new Date(g.lastStudyDate),l=new Date(e),a=Math.abs(l-u),n=Math.ceil(a/(1e3*60*60*24));n===1?g.streak+=1:n>1&&(g.streak=1)}else g.streak=1;g.lastStudyDate=e,localStorage.setItem("cba_streak",g.streak.toString()),localStorage.setItem("cba_last_study",e)}}function O(e,u){const l=new Date().toISOString().split("T")[0],a=g.srs[e]||{easiness:2.5,interval:0,repetitions:0,dueDate:l};let n=Math.max(0,Math.min(5,u));n>=3?(a.repetitions===0?a.interval=1:a.repetitions===1?a.interval=6:a.interval=Math.round(a.interval*a.easiness),a.repetitions++):(a.repetitions=0,a.interval=1),a.easiness=a.easiness+(.1-(5-n)*(.08+(5-n)*.02)),a.easiness<1.3&&(a.easiness=1.3);const c=new Date;c.setDate(c.getDate()+a.interval),a.dueDate=c.toISOString().split("T")[0],a.lastRated=l,g.srs[e]=a,localStorage.setItem("cba_srs",JSON.stringify(g.srs))}function Ie(e){g.settings={...g.settings,...e},localStorage.setItem("cba_settings",JSON.stringify(g.settings))}async function A(e,u){const l=u==="ALL"?["A1","A2","B1","B2","C1","C2"]:[u];for(const a of l)if(!g.loaded.knowledge.has(a))try{const n=await fetch(`data/knowledge_${a}.json`);if(!n.ok){console.warn(`Could not load data/knowledge_${a}.json`);continue}const c=await n.json(),_=new Set(g.db.knowledge.map(m=>m.id));for(const m of c)_.has(m.id)||(g.db.knowledge.push(m),m.french&&m.japanese&&g.db.vocabulary.push({id:m.id,category:m.category||"Vocabulary",level:m.level,tags:m.tags||[],french:m.french,english:m.english,japanese:m.japanese,definition_fr:m.definition_fr,context_fr:m.examples&&m.examples[0]?m.examples[0].fr:"",context_en:m.examples&&m.examples[0]?m.examples[0].en:"",context_ja:m.examples&&m.examples[0]?m.examples[0].ja:"",is_professional:m.is_professional!==void 0?m.is_professional:!0}),m.grammar&&g.db.grammar.push({id:m.id,topic:m.grammar.topic,level:m.level,explanation_ja:m.grammar.explanation_ja,explanation_en:m.grammar.explanation_en,examples:m.examples||[]}),m.cuisine&&g.db.cuisine.push({id:m.id,category:m.category||"Theory",level:m.level,tags:m.tags||[],topic:m.cuisine.topic,content_fr:m.cuisine.content_fr,content_en:m.cuisine.content_en,content_ja:m.cuisine.content_ja}));g.loaded.knowledge.add(a),g.loaded.vocabulary.add(a),g.loaded.grammar.add(a),g.loaded.cuisine.add(a)}catch(n){console.error(`Failed to load knowledge level ${a}:`,n)}}async function se(){if(!g.loaded.quizzes)try{const e=await fetch("data/quizzes.json");if(!e.ok)throw new Error("Network response was not ok");g.db.quizzes=await e.json(),g.loaded.quizzes=!0}catch(e){console.error("Failed to load quizzes:",e)}}async function J(){await Promise.all([A("vocabulary","ALL"),A("grammar","ALL"),A("cuisine","ALL"),se()])}const re={home:ue,vocabulary:me,grammar:ge,cuisine:je,quiz:Ee,favorites:G,review:Me,search:Be,settings:Ne,dictation:Pe};function oe(e){const u=document.getElementById("main-content");if(re[e]){Re(),u.innerHTML="";const l=re[e]();l instanceof HTMLElement?u.appendChild(l):u.innerHTML=l,document.querySelectorAll(".nav-link").forEach(a=>{a.getAttribute("data-tab")===e?a.classList.add("active"):a.classList.remove("active")})}}async function Ve(){try{const e=await fetch("data/meta.json");g.meta=await e.json(),document.querySelectorAll(".nav-link").forEach(u=>{u.addEventListener("click",l=>{const a=l.target.closest(".nav-link").getAttribute("data-tab");oe(a)})}),oe("home")}catch(e){console.error("Failed to load database metadata:",e),document.getElementById("main-content").innerHTML=`
      <div class="alert alert-info" style="border-left-color: var(--color-error); background-color: #FFEBEE; color: var(--color-error)">
        <h3>Error: Métadonnées inaccessibles</h3>
        <p>Could not load curriculum metadata. Please reload or check your local setup.</p>
      </div>
    `}}document.addEventListener("DOMContentLoaded",Ve);
