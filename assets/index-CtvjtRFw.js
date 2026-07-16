(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function r(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(n){if(n.ep)return;n.ep=!0;const i=r(n);fetch(n.href,i)}})();let ae=null,re="",ie=0,X=null,O=null;function I(e,o=1){me(e,o)}function me(e,o=1,r=null,a=null,n=0){if(!("speechSynthesis"in window)){console.warn("Speech synthesis not supported on this browser.");return}window.speechSynthesis.cancel();const i=e.replace(/["'➔]/g,"").trim();re=i,ie=n,X=r,O=a;const l=i.substring(n);if(!l.trim()){O&&O();return}const t=new SpeechSynthesisUtterance(l);t.lang="fr-FR",t.rate=o;const u=window.speechSynthesis.getVoices().find(d=>d.lang==="fr-FR"||d.lang.startsWith("fr"));u&&(t.voice=u),t.onboundary=d=>{if(d.name==="word"&&X){const m=ie+d.charIndex;X(m,re.length)}},t.onend=()=>{ae===t&&O&&O()},t.onerror=d=>{console.warn("SpeechSynthesis error:",d),O&&O()},ae=t,window.speechSynthesis.speak(t)}function fe(){"speechSynthesis"in window&&window.speechSynthesis.pause()}function he(){"speechSynthesis"in window&&window.speechSynthesis.resume()}function Z(){"speechSynthesis"in window&&window.speechSynthesis.cancel()}"speechSynthesis"in window&&(window.speechSynthesis.getVoices(),window.speechSynthesis.onvoiceschanged=()=>{window.speechSynthesis.getVoices()});function be(){var p,S,h,k,x,L,C;const e=document.createElement("div"),o=document.createElement("h2");o.className="section-title",o.innerText="Tableau de Bord",e.appendChild(o);const r=document.createElement("p");r.className="section-subtitle",r.innerText="Welcome back, Commis. Here is your kitchen curriculum status.",e.appendChild(r);const a=new Date().toISOString().split("T")[0],n=Object.values(b.srs),i=n.filter(q=>q.dueDate<=a).length,l=n.length,t=document.createElement("div");t.className="dashboard-grid";const g=document.createElement("div");g.style.display="flex",g.style.flexDirection="column",g.style.gap="1.5rem";const u=document.createElement("div");u.className="card",u.style.padding="1.5rem",u.innerHTML=`
    <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--color-primary); margin-bottom: 1rem;">Missions du Jour (Today's Tasks)</h3>
    <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.8rem;">
      <li style="display: flex; align-items: center; gap: 0.8rem; font-size: 0.95rem;">
        <input type="checkbox" id="mission-vocab" style="transform: scale(1.2); cursor: pointer;" ${l>0?"checked":""}>
        <label for="mission-vocab" style="cursor: pointer;">Study new terms in the Vocabulary deck</label>
      </li>
      <li style="display: flex; align-items: center; gap: 0.8rem; font-size: 0.95rem;">
        <input type="checkbox" id="mission-srs" style="transform: scale(1.2); cursor: pointer;" ${i===0&&l>0?"checked":""}>
        <label for="mission-srs" style="cursor: pointer;">
          Clear due SRS cards in Review Deck 
          ${i>0?`<span style="background-color: var(--color-error); color: white; padding: 0.1rem 0.5rem; border-radius: 10px; font-size: 0.75rem; font-weight: bold; margin-left: 0.5rem;">${i} due</span>`:""}
        </label>
      </li>
      <li style="display: flex; align-items: center; gap: 0.8rem; font-size: 0.95rem;">
        <input type="checkbox" id="mission-quiz" style="transform: scale(1.2); cursor: pointer;">
        <label for="mission-quiz" style="cursor: pointer;">Take a kitchen verification quiz</label>
      </li>
    </ul>
  `,g.appendChild(u);const d=document.createElement("div");d.className="card",d.style.padding="1.5rem";const m=((p=b.meta)==null?void 0:p.featured)||null;d.innerHTML=`
    <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--color-primary); margin-bottom: 1rem;">Vocabulaire Vedette (Featured Vocabulary)</h3>
    ${m?`
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
        <div style="font-size: 1.25rem; font-weight: 600; color: var(--color-accent);">${m.french}</div>
        <button class="audio-btn" data-text="${m.french}" title="Listen pronunciation" style="background: none; border: none; font-size: 1.1rem; cursor: pointer; color: var(--color-accent); padding: 0.1rem; line-height: 1;">🔊</button>
      </div>
      <div style="font-size: 0.9rem; color: var(--color-text-main); font-weight: 500; margin-bottom: 0.5rem;">${m.english} / ${m.japanese}</div>
      <div style="background-color: rgba(197, 168, 128, 0.08); border-left: 2px solid var(--color-accent); padding: 0.8rem; font-size: 0.85rem; border-radius: 0 var(--radius-sm) var(--radius-sm) 0;">
        <div style="display: flex; align-items: flex-start; gap: 0.4rem; font-style: italic; color: var(--color-secondary); font-weight: 500;">
          <span style="flex: 1;">"${m.context_fr}"</span>
          <button class="audio-btn" data-text="${m.context_fr}" title="Listen context sentence" style="background: none; border: none; font-size: 0.9rem; cursor: pointer; color: var(--color-text-muted); padding: 0.15rem; margin-top: 0.1rem; line-height: 1;">🔊</button>
        </div>
        <div style="color: var(--color-text-muted); margin-top: 0.2rem;">${m.context_ja}</div>
      </div>
    `:"<p>No data loaded.</p>"}
  `,m&&d.querySelectorAll(".audio-btn").forEach(q=>{q.addEventListener("click",y=>{y.stopPropagation();const T=y.target.closest(".audio-btn").getAttribute("data-text");I(T)})}),g.appendChild(d),t.appendChild(g);const s=document.createElement("div");s.style.display="flex",s.style.flexDirection="column",s.style.gap="1.5rem";const f=document.createElement("div");f.className="streak-card",f.innerHTML=`
    <div class="streak-left">
      <h2>Série</h2>
      <h2>d'Études</h2>
      <div class="streak-subtitle">Daily Study Streak</div>
    </div>
    <div class="streak-right">
      <span class="streak-number">${b.streak}</span>
      <span class="streak-flame">🔥</span>
    </div>
  `,s.appendChild(f);const v=document.createElement("div");v.className="card",v.style.padding="1.5rem";const _=((h=(S=b.meta)==null?void 0:S.counts)==null?void 0:h.vocabulary)||0,c=((x=(k=b.meta)==null?void 0:k.counts)==null?void 0:x.grammar)||0,w=((C=(L=b.meta)==null?void 0:L.counts)==null?void 0:C.cuisine)||0;return v.innerHTML=`
    <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--color-primary); margin-bottom: 1rem;">Progrès de la Brigade</h3>
    <div style="display: flex; flex-direction: column; gap: 0.8rem; font-size: 0.9rem;">
      <div style="display: flex; justify-content: space-between;">
        <span>Vocabulaire:</span>
        <strong>${_} terms</strong>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span>Grammaire:</span>
        <strong>${c} items</strong>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span>Théorie Culinaire:</span>
        <strong>${w} guides</strong>
      </div>
      
      <div style="border-top: 1px solid rgba(0,0,0,0.05); padding-top: 0.8rem; display: flex; justify-content: space-between; align-items: center;">
        <span>★ Coups de Cœur (Favorites):</span>
        <strong style="color: var(--color-accent);">${b.favorites.size} items</strong>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span>Deck SRS Actif (Active SRS):</span>
        <strong style="color: var(--color-primary);">${l} cards</strong>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span>À réviser aujourd'hui (Due Today):</span>
        <strong style="${i>0?"color: var(--color-error);":"color: var(--color-success);"}">${i} cards</strong>
      </div>
    </div>
  `,s.appendChild(v),t.appendChild(s),e.appendChild(t),e}function ye(){var i;const e=document.createElement("div"),o=document.createElement("h2");o.className="section-title",o.innerText="Vocabulaire Professionnel",e.appendChild(o);const r=document.createElement("p");r.className="section-subtitle",r.innerText="Essential culinary terminology for kitchen brigade communications. Filter by category, tag, or difficulty level.",e.appendChild(r);const a=document.createElement("div");a.className="loading-placeholder",a.innerText="Chargement du vocabulaire... (Loading vocabulary...)",e.appendChild(a);const n=((i=b.settings)==null?void 0:i.targetLevel)||"ALL";return R("knowledge",n).then(()=>{a.remove(),ve(e,n)}),e}function ve(e,o){var v,_;const r=((v=b.settings)==null?void 0:v.includeGeneral)||!1,n=(((_=b.db)==null?void 0:_.knowledge)||[]).filter(c=>c.french&&c.japanese).filter(c=>r||c.is_professional),i=["ALL",...new Set(n.map(c=>c.category))],l=["ALL",...new Set(n.flatMap(c=>c.tags||[]))],t=["ALL","A1","A2","B1","B2","C1","C2"];let g="ALL",u="ALL",d=o;const m=document.createElement("div");m.className="card",m.style.padding="1.2rem",m.style.marginBottom="2rem",m.style.display="flex",m.style.flexDirection="column",m.style.gap="1rem",m.innerHTML=`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
      <div>
        <label style="font-size: 0.8rem; font-weight: 600; display: block; margin-bottom: 0.3rem; color: var(--color-text-muted);">Catégorie (Category)</label>
        <select id="vocab-category-select" style="padding: 0.5rem; font-size: 0.9rem; border-radius: var(--radius-sm); border: 1px solid rgba(0,0,0,0.1); width: 100%; background: var(--color-bg);">
          ${i.map(c=>`<option value="${c}" ${c===g?"selected":""}>${c}</option>`).join("")}
        </select>
      </div>
      <div>
        <label style="font-size: 0.8rem; font-weight: 600; display: block; margin-bottom: 0.3rem; color: var(--color-text-muted);">Étiquettes (Tag)</label>
        <select id="vocab-tag-select" style="padding: 0.5rem; font-size: 0.9rem; border-radius: var(--radius-sm); border: 1px solid rgba(0,0,0,0.1); width: 100%; background: var(--color-bg);">
          ${l.map(c=>`<option value="${c}" ${c===u?"selected":""}>${c==="ALL"?"ALL TAGS":"#"+c}</option>`).join("")}
        </select>
      </div>
      <div>
        <label style="font-size: 0.8rem; font-weight: 600; display: block; margin-bottom: 0.3rem; color: var(--color-text-muted);">Niveau (Level)</label>
        <select id="vocab-level-select" style="padding: 0.5rem; font-size: 0.9rem; border-radius: var(--radius-sm); border: 1px solid rgba(0,0,0,0.1); width: 100%; background: var(--color-bg);">
          ${t.map(c=>`<option value="${c}" ${c===d?"selected":""}>${c==="ALL"?"ALL LEVELS":c}</option>`).join("")}
        </select>
      </div>
    </div>
  `,e.appendChild(m);const s=document.createElement("div");s.className="card-grid",e.appendChild(s);function f(){var S;s.innerHTML="";const p=(((S=b.db)==null?void 0:S.knowledge)||[]).filter(h=>h.french&&h.japanese).filter(h=>r||h.is_professional).filter(h=>{const k=g==="ALL"||h.category===g,x=u==="ALL"||h.tags&&h.tags.includes(u),L=d==="ALL"||h.level===d;return k&&x&&L});if(p.length===0){s.innerHTML='<p style="color: var(--color-text-muted); grid-column: 1 / -1; text-align: center; padding: 2rem;">Aucun terme trouvé correspondant à vos critères de filtrage.</p>';return}p.forEach(h=>{const k=document.createElement("div");k.className="card";const x=G(h.id),L=b.srs[h.id],C=!!L,q=h.examples&&h.examples[0]?h.examples[0].fr:"",y=h.examples&&h.examples[0]?h.examples[0].ja:"";k.innerHTML=`
        <div style="display: flex; flex-direction: column; height: 100%; justify-content: space-between; gap: 1.5rem;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <span class="card-category" style="margin:0;">${h.category}</span>
              <span class="grammar-badge" style="background-color: var(--color-primary);">${h.level}</span>
            </div>
            
            <div class="term-header">
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <h3 class="term-title">${h.french}</h3>
                <button class="audio-btn" data-text="${h.french}" title="Listen pronunciation" style="background: none; border: none; font-size: 1.15rem; cursor: pointer; color: var(--color-accent); transition: var(--transition); padding: 0.2rem;">🔊</button>
              </div>
              <button class="fav-btn ${x?"active":""}" data-id="${h.id}">
                ${x?"★":"☆"}
              </button>
            </div>
            
            <div class="term-translations" style="margin-top: 0.6rem; display: flex; flex-direction: column; gap: 0.4rem;">
              <div class="flip-translation-container">
                <div class="flip-translation-card">
                  <div class="flip-front" style="display: flex; align-items: center; gap: 0.4rem; justify-content: flex-start; padding: 0.4rem 0.6rem; text-align: left;">
                    <button class="audio-btn" data-text="${h.definition_fr}" title="Listen definition" style="background: none; border: none; font-size: 0.9rem; cursor: pointer; color: var(--color-accent); padding: 0.1rem; line-height: 1; flex-shrink: 0;">🔊</button>
                    <span style="font-size: 0.76rem; line-height: 1.25; color: var(--color-text-main); font-weight: 500;">${h.definition_fr||"No definition loaded."}</span>
                  </div>
                  <div class="flip-back" style="font-size: 0.85rem; font-weight: 600; padding: 0.4rem 0.6rem; justify-content: center; text-align: center; color: var(--color-secondary);">
                     🇬🇧 ${h.english}
                  </div>
                </div>
              </div>
              <div class="trans-ja" style="margin-top: 0.2rem; font-weight: 500;">${h.japanese}</div>
            </div>
            
            <div class="term-context" style="margin-top: 1rem;">
              <div class="context-fr" style="display: flex; align-items: flex-start; gap: 0.4rem; font-style: italic; color: var(--color-secondary);">
                <span style="flex: 1;">"${q}"</span>
                <button class="audio-btn" data-text="${q}" title="Listen context sentence" style="background: none; border: none; font-size: 0.9rem; cursor: pointer; color: var(--color-text-muted); padding: 0.15rem; margin-top: 0.15rem;">🔊</button>
              </div>
              <div class="context-ja">${y}</div>
            </div>
            
            ${h.tags&&h.tags.length>0?`
              <div style="margin-top: 1rem; display: flex; flex-wrap: wrap; gap: 0.3rem;">
                ${h.tags.map($=>`<span class="tag-badge" style="background-color: rgba(197, 168, 128, 0.08); color: var(--color-accent); font-size: 0.75rem; padding: 0.1rem 0.5rem; border-radius: 12px;">#${$}</span>`).join("")}
              </div>
            `:""}
          </div>
          
          <!-- SRS status in card footer -->
          <div style="border-top: 1px solid rgba(0,0,0,0.05); padding-top: 1rem; font-size: 0.8rem; display: flex; flex-direction: column; gap: 0.5rem;">
            ${C?`
              <div style="display: flex; justify-content: space-between; color: var(--color-text-muted);">
                <span>Interval: <strong>${L.interval} days</strong></span>
                <span>Due: <strong>${L.dueDate}</strong></span>
              </div>
              <div style="display: flex; gap: 0.5rem;">
                <button class="next-btn srs-action-btn" data-id="${h.id}" data-action="memorized" style="background-color: var(--color-success); font-size: 0.75rem; padding: 0.3rem 0.6rem; flex: 1;">
                  ✓ Memorized
                </button>
                <button class="next-btn srs-action-btn" data-id="${h.id}" data-action="reset" style="background-color: transparent; border: 1px solid var(--color-error); color: var(--color-error); font-size: 0.75rem; padding: 0.3rem 0.6rem;">
                  Forget
                </button>
              </div>
            `:`
              <div style="color: var(--color-text-muted); font-style: italic; margin-bottom: 0.2rem;">Not yet added to SRS memory deck.</div>
              <button class="next-btn srs-action-btn" data-id="${h.id}" data-action="start" style="font-size: 0.75rem; padding: 0.4rem 0.8rem; width: 100%;">
                Start Memorizing (Add to SRS)
              </button>
            `}
          </div>
        </div>
      `;const T=k.querySelector(".flip-translation-container");T.addEventListener("click",$=>{$.stopPropagation(),T.querySelector(".flip-translation-card").classList.toggle("flipped")}),k.querySelector(".fav-btn").addEventListener("click",$=>{$.stopPropagation(),W(h.id);const j=$.target,B=G(h.id);j.classList.toggle("active",B),j.innerText=B?"★":"☆"}),k.querySelectorAll(".audio-btn").forEach($=>{$.addEventListener("click",j=>{j.stopPropagation();const B=j.target.closest(".audio-btn").getAttribute("data-text");I(B)})}),k.querySelectorAll(".srs-action-btn").forEach($=>{$.addEventListener("click",j=>{j.stopPropagation();const B=j.target.getAttribute("data-action"),M=j.target.getAttribute("data-id");B==="start"?J(M,4):B==="memorized"?J(M,5):B==="reset"&&J(M,0),f()})}),s.appendChild(k)})}m.querySelector("#vocab-category-select").addEventListener("change",c=>{g=c.target.value,f()}),m.querySelector("#vocab-tag-select").addEventListener("change",c=>{u=c.target.value,f()}),m.querySelector("#vocab-level-select").addEventListener("change",async c=>{var q;d=c.target.value,s.innerHTML=`<div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--color-text-muted);">Chargement (Loading level ${d})...</div>`,await R("knowledge",d);const p=(((q=b.db)==null?void 0:q.knowledge)||[]).filter(y=>y.french&&y.japanese).filter(y=>r||y.is_professional),S=["ALL",...new Set(p.map(y=>y.category))],h=["ALL",...new Set(p.flatMap(y=>y.tags||[]))],k=m.querySelector("#vocab-category-select"),x=k.value;k.innerHTML=S.map(y=>`<option value="${y}" ${y===x?"selected":""}>${y}</option>`).join(""),g=k.value;const L=m.querySelector("#vocab-tag-select"),C=L.value;L.innerHTML=h.map(y=>`<option value="${y}" ${y===C?"selected":""}>${y==="ALL"?"ALL TAGS":"#"+y}</option>`).join(""),u=L.value,f()}),f()}function _e(){var i;const e=document.createElement("div"),o=document.createElement("h2");o.className="section-title",o.innerText="Grammaire de la Cuisine",e.appendChild(o);const r=document.createElement("p");r.className="section-subtitle",r.innerText="French grammar concepts framed through recipe instructions and professional dialogues.",e.appendChild(r);const a=document.createElement("div");a.className="loading-placeholder",a.innerText="Chargement de la grammaire... (Loading grammar...)",e.appendChild(a);const n=((i=b.settings)==null?void 0:i.targetLevel)||"ALL";return R("knowledge",n).then(()=>{a.remove(),xe(e,n)}),e}function xe(e,o){var n;const a=(((n=b.db)==null?void 0:n.knowledge)||[]).filter(i=>i.grammar).map(i=>({id:i.id,level:i.level,topic:i.grammar.topic,explanation_en:i.grammar.explanation_en,explanation_ja:i.grammar.explanation_ja,examples:i.examples||[]})).filter(i=>o==="ALL"||i.level===o);if(a.length===0){const i=document.createElement("p");i.style.color="var(--color-text-muted)",i.innerText="Aucune leçon de grammaire chargée pour ce niveau.",e.appendChild(i);return}a.forEach(i=>{const l=document.createElement("div");l.className="grammar-card";const t=G(i.id),g=i.topic.match(/\(([^)]+)\)/),u=g?g[1]:i.topic;l.innerHTML=`
      <div class="grammar-header">
        <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
          <span class="grammar-badge">${i.level}</span>
          <span class="grammar-title">${i.topic}</span>
          <button class="audio-btn" data-text="${u}" title="Listen topic pronunciation" style="background: none; border: none; font-size: 0.9rem; cursor: pointer; color: var(--color-accent); padding: 0.15rem; line-height: 1;">🔊</button>
        </div>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <button class="fav-btn ${t?"active":""}" data-id="${i.id}" style="font-size: 1.1rem; padding: 0.2rem;">
            ${t?"★":"☆"}
          </button>
          <span class="toggle-icon" style="font-size: 1rem; color: var(--color-text-muted); font-weight: bold;">▼</span>
        </div>
      </div>
      <div class="grammar-body">
        <div class="grammar-expl">
          <p style="margin-bottom: 0.6rem; font-weight: 500; color: var(--color-secondary);">Explanation (EN):</p>
          <p style="margin-bottom: 1rem;">${i.explanation_en}</p>
          <p style="margin-bottom: 0.6rem; font-weight: 500; color: var(--color-secondary);">説明 (JA):</p>
          <p style="margin-bottom: 1.2rem;">${i.explanation_ja}</p>
        </div>
        <div class="grammar-examples">
          <p style="font-size: 0.8rem; font-weight: 600; text-transform: uppercase; color: var(--color-accent); letter-spacing: 1px; margin-bottom: 0.8rem;">Exemples de Cuisine (Examples):</p>
          <div class="examples-list">
            ${i.examples.map(f=>`
              <div class="example-item" style="margin-bottom: 0.8rem;">
                <div class="example-fr" style="display: flex; align-items: center; gap: 0.4rem;">
                  <span style="flex: 1;">➔ ${f.fr}</span>
                  <button class="audio-btn" data-text="${f.fr}" title="Listen pronunciation" style="background: none; border: none; font-size: 0.9rem; cursor: pointer; color: var(--color-accent); padding: 0.15rem; line-height: 1;">🔊</button>
                </div>
                <div class="example-en">${f.en}</div>
                <div class="example-ja">${f.ja}</div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `;const d=l.querySelector(".grammar-header"),m=l.querySelector(".grammar-body"),s=l.querySelector(".toggle-icon");d.addEventListener("click",f=>{if(f.target.classList.contains("fav-btn")||f.target.closest(".audio-btn"))return;const v=m.classList.toggle("open");s.innerText=v?"▲":"▼"}),l.querySelector(".fav-btn").addEventListener("click",f=>{f.stopPropagation(),W(i.id);const v=f.target,_=G(i.id);v.classList.toggle("active",_),v.innerText=_?"★":"☆"}),l.querySelectorAll(".audio-btn").forEach(f=>{f.addEventListener("click",v=>{v.stopPropagation();const _=v.target.closest(".audio-btn").getAttribute("data-text");I(_)})}),e.appendChild(l)})}function ke(e){var r;e.innerHTML='<div style="text-align: center; padding: 2rem; color: var(--color-text-muted);">Chargement de la théorie... (Loading theory...)</div>';const o=((r=b.settings)==null?void 0:r.targetLevel)||"ALL";R("knowledge",o).then(()=>{var l;e.innerHTML="";const n=(((l=b.db)==null?void 0:l.knowledge)||[]).filter(t=>t.cuisine).map(t=>({id:t.id,level:t.level,category:t.category||"Theory",topic:t.cuisine.topic,content_fr:t.cuisine.content_fr,content_en:t.cuisine.content_en,content_ja:t.cuisine.content_ja})).filter(t=>o==="ALL"||t.level===o);if(n.length===0){e.innerHTML='<p style="color: var(--color-text-muted);">Aucun document de théorie culinaire disponible pour ce niveau.</p>';return}const i=document.createElement("div");i.style.display="flex",i.style.flexDirection="column",i.style.gap="2rem",n.forEach(t=>{const g=document.createElement("div");g.className="card",g.style.display="block",g.style.padding="2rem";const u=G(t.id),d=t.topic.match(/^([^(]+)/),m=d?d[1].trim():t.topic;g.innerHTML=`
        <div class="card-category" style="margin-bottom: 0.5rem;">${t.category}</div>
        <div class="term-header" style="border-bottom: 1px solid rgba(197, 168, 128, 0.15); padding-bottom: 0.8rem; margin-bottom: 1.5rem;">
          <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
            <h3 style="font-family: var(--font-serif); font-size: 1.6rem; color: var(--color-primary); margin: 0;">${t.topic}</h3>
            <button class="audio-btn" data-text="${m}" title="Listen topic pronunciation" style="background: none; border: none; font-size: 1.1rem; cursor: pointer; color: var(--color-accent); padding: 0.15rem; line-height: 1;">🔊</button>
          </div>
          <button class="fav-btn ${u?"active":""}" data-id="${t.id}" style="font-size: 1.3rem;">
            ${u?"★":"☆"}
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
      `,g.querySelector(".fav-btn").addEventListener("click",s=>{s.stopPropagation(),W(t.id);const f=s.target,v=G(t.id);f.classList.toggle("active",v),f.innerText=v?"★":"☆"}),g.querySelectorAll(".audio-btn").forEach(s=>{s.addEventListener("click",f=>{f.stopPropagation();const v=f.target.closest(".audio-btn").getAttribute("data-text");I(v)})}),i.appendChild(g)}),e.appendChild(i)})}const Ce={reg_normandie:{dishes:["sole_normande","poulet_vallee_d_auge"],ingredients:["cheese_camembert","apple"],techniques:["pocher","sauter"],sauces:["sauce_creme","sauce_normande"]},reg_bourgogne:{dishes:["beef_bourguignon","escargots_persillade","coq_au_vin"],ingredients:["beef_charolais","mustard_dijon"],techniques:["braiser","mijoter"],sauces:["sauce_vin_rouge"]},reg_provence:{dishes:["bouillabaisse","ratatouille","salade_nicoise"],ingredients:["oil_olive","herbes_de_provence"],techniques:["mijoter","griller"],sauces:["rouille","vinaigrette"]},reg_alsace:{dishes:["choucroute_garnie","flammekueche","baeckeoffe"],ingredients:["sauerkraut","strasbourg_sausage"],techniques:["braiser","mijoter"],sauces:[]},reg_bretagne:{dishes:["galette_sarrasin","cotriade","kouign_amann"],ingredients:["buckwheat_flour","salted_butter"],techniques:["poeler","griller"],sauces:["beurre_blanc"]},reg_ile_de_france:{dishes:["pot_au_feu","soupe_oignon","entrecote_bercy"],ingredients:["mushroom_paris","cheese_brie"],techniques:["mijoter","griller"],sauces:["sauce_bercy"]},reg_aquitaine:{dishes:["confit_canard","cassoulet","magret_canard","ttoro_basque","axoa_de_veau","poulet_basquaise"],ingredients:["foie_gras","duck","cut_kokotxa_de_merlu"],techniques:["confire","braiser","mijoter","rotir_sur_braise"],sauces:["sauce_piperade","sauce_encre_basque"]},reg_rhone_alpes:{dishes:["quenelle_brochet","poulet_morilles","gratin_dauphinois"],ingredients:["poultry_bresse","sausage_lyon"],techniques:["pocher","braiser","gratiner"],sauces:["sauce_nantua","sauce_supreme"]},reg_loire:{dishes:["rillettes_tours","brochet_beurre_blanc","tarte_tatin"],ingredients:["goat_cheese_sainte_maure","river_fish"],techniques:["confire","pocher"],sauces:["beurre_blanc"]},reg_champagne:{dishes:["potee_champenoise","biscuits_roses"],ingredients:["wine_champagne","ham_ardennes"],techniques:["braiser","mijoter"],sauces:[]},reg_languedoc:{dishes:["cassoulet","brandade_morue","tielle_setoise"],ingredients:["lingot_bean","anchovy"],techniques:["braiser","mijoter"],sauces:[]},reg_corse:{dishes:["civet_sanglier","fiadone","veau_olives"],ingredients:["chestnut_flour","lonzu_charcuterie"],techniques:["braiser","mijoter"],sauces:[]},reg_hauts_de_france:{dishes:["carbonnade_flamande","potjevleesch","moules_frites"],ingredients:["cheese_maroilles","endive"],techniques:["braiser","mijoter"],sauces:["sauce_biere"]}},we={cut_filet:{techniques:["griller","rotir","sauter"],science:["muscle_fibers","low_collagen"],sauces:["sauce_bearnaise","sauce_madere"],dishes:["tournedos_rossini"]},cut_rumsteck:{techniques:["griller","rotir"],science:["iron_taste"],sauces:["sauce_poivre"],dishes:[]},cut_aiguillette:{techniques:["rotir","griller"],science:["fat_insulation"],sauces:[],dishes:[]},cut_palette:{techniques:["braiser","mijoter"],science:["collagen_emulsification"],sauces:["sauce_chasseur"],dishes:[]},cut_poitrine:{techniques:["braiser","mijoter"],science:["collagen_gelatinization"],sauces:[],dishes:["pot_au_feu"]},cut_langue:{techniques:["braiser","mijoter","sauter"],science:["collagen_gelatinization"],sauces:["sauce_gribiche","sauce_madere"],dishes:[]},cut_onglet:{techniques:["griller","sauter"],science:["muscle_fibers"],sauces:["sauce_echalote"],dishes:[]},cut_foie:{techniques:["sauter"],science:["protein_coagulation"],sauces:[],dishes:["pate_de_campagne"]},cut_tripe:{techniques:["braiser","mijoter"],science:["collagen_breakdown"],sauces:[],dishes:["tripes_a_la_mode_de_caen"]},cut_boyaux:{techniques:["griller","embouter"],science:["curing_and_fermentation"],sauces:[],dishes:["andouillette"]},cut_chicken_breast:{techniques:["pocher","sauter","sous_vide"],science:["moisture_loss","protein_coagulation"],sauces:["sauce_supreme"],dishes:["supreme_de_volaille"]},cut_chicken_tender:{techniques:["sauter","friture"],science:["short_cook"],sauces:[],dishes:[]},cut_chicken_thigh:{techniques:["rotir","braiser","mijoter"],science:["collagen_gelatinization"],sauces:["sauce_chasseur"],dishes:["coq_au_vin"]},cut_chicken_shoulder:{techniques:["sauter","braiser"],science:["balanced_meat"],sauces:[],dishes:[]},cut_chicken_drumette:{techniques:["rotir","griller"],science:["bone_in_cooking"],sauces:[],dishes:[]},cut_chicken_wing_joint:{techniques:["confire","rotir"],science:["collagen_gelatinization"],sauces:[],dishes:[]},cut_chicken_wing:{techniques:["mijoter","rotir"],science:["gelatin_extraction"],sauces:[],dishes:["fond_de_volaille"]},cut_chicken_skin:{techniques:["rotir","sauter"],science:["fat_rendering","crispy_skin"],sauces:[],dishes:[]},cut_chicken_heart:{techniques:["griller"],science:["muscle_fibers"],sauces:[],dishes:[]},cut_chicken_cardiac_base:{techniques:["braiser","mijoter"],science:["cream_affinity"],sauces:[],dishes:[]},cut_chicken_liver:{techniques:["sauter"],science:["moisture_loss"],sauces:[],dishes:["pate_de_foie_de_volaille"]},cut_chicken_gizzard:{techniques:["confire","braiser"],science:["muscle_fibers"],sauces:[],dishes:["salade_landaise"]},cut_chicken_tail:{techniques:["rotir","griller"],science:["fat_rendering"],sauces:[],dishes:[]},cut_chicken_cartilage_yagen:{techniques:["mijoter"],science:["gelatin_extraction"],sauces:[],dishes:["fond_de_volaille"]},cut_chicken_cartilage_knee:{techniques:["mijoter"],science:["gelatin_extraction"],sauces:[],dishes:["fond_de_volaille"]},cut_pork_loin:{techniques:["rotir","sauter"],science:["moisture_loss"],sauces:["sauce_charcutiere"],dishes:[]},cut_pork_tenderloin:{techniques:["sauter","rotir"],science:["protein_coagulation"],sauces:["sauce_moutarde"],dishes:[]},cut_pork_shoulder_loin:{techniques:["braiser","rotir"],science:["fat_and_lean_interweave"],sauces:[],dishes:[]},cut_pork_belly:{techniques:["braiser","saler","rotir"],science:["curing_and_fermentation"],sauces:[],dishes:["pate_de_campagne","petit_sale_aux_lentilles"]},cut_pork_ham:{techniques:["saler","rotir"],science:["curing_and_fermentation"],sauces:[],dishes:["jambon_blanc","jambon_cru"]},cut_pork_cheek:{techniques:["confire","braiser"],science:["collagen_gelatinization"],sauces:[],dishes:[]},cut_pork_liver:{techniques:["sauter"],science:["emulsification"],sauces:[],dishes:["pate_de_campagne"]},cut_pork_tongue:{techniques:["braiser","mijoter"],science:["collagen_gelatinization"],sauces:["sauce_piquante"],dishes:[]},cut_pork_trotter:{techniques:["braiser","rotir"],science:["collagen_gelatinization"],sauces:[],dishes:["pied_de_porc_pane"]},cut_pork_intestine:{techniques:["griller","confire"],science:["curing_and_fermentation"],sauces:[],dishes:["andouille","andouillette"]},cut_kokotxa_de_merlu:{techniques:["emulser_au_pil_pil","pocher"],science:["collagen_gelatinization"],sauces:["sauce_verte_basque"],dishes:["kokotxas_de_merlu_au_pil_pil"]},cut_fish_fillet:{techniques:["sauter","pocher"],science:["protein_coagulation"],sauces:["beurre_blanc"],dishes:[]},cut_magret_de_canard:{techniques:["sauter","rotir"],science:["fat_rendering"],sauces:["sauce_echalote"],dishes:["magret_canard","salade_landaise"]},cut_gibier_chevreuil:{techniques:["rotir","sauter"],science:["protein_coagulation"],sauces:["sauce_poivre"],dishes:[]}},Se={sole_normande:{name_fr:"Sole Normande",name_en:"Normandy Sole",name_ja:"ソール・ノルマンド",desc:"シタビラメを魚のブイヨン、生クリーム、キノコ、カキ、ムール貝と共に調理した、ノルマンディー沿岸を代表する高貴な魚料理。"},poulet_vallee_d_auge:{name_fr:"Poulet Vallée d'Auge",name_en:"Chicken Vallée d'Auge",name_ja:"プーレ・ヴァレ・ドージュ",desc:"鶏肉をリンゴ（カルヴァドスまたはシードル）と濃厚な生クリーム、キノコと共に煮込んだ、コトコト煮込みの郷土料理。"},beef_bourguignon:{name_fr:"Bœuf Bourguignon",name_en:"Beef Burgundy",name_ja:"ブフ・ブルギニョン",desc:"牛肉をブルゴーニュ産赤ワイン、小タマネギ、キノコ、ベーコンと共にじっくり煮込んだ、フランス古典料理の代名詞。"},escargots_persillade:{name_fr:"Escargots à la persillade",name_en:"Burgundy Escargots with Parsley Butter",name_ja:"エスカルゴのパセリバター焼き",desc:"エスカルゴ（食用カタツムリ）の殻にパセリとにんにくを練り込んだバター（ブルギニョンバター）を詰めてオーブンで焼いた料理。"},coq_au_vin:{name_fr:"Coq au Vin",name_en:"Rooster in Red Wine",name_ja:"コック・オ・ヴァン",desc:"雄鶏の肉を赤ワイン、香味野菜、ベーコン、キノコと共にじっくり煮込んだ、ブルゴーニュ地方発祥の伝統料理。"},bouillabaisse:{name_fr:"Bouillabaisse",name_en:"Bouillabaisse",name_ja:"ブイヤベース",desc:"地中海の様々な岩礁魚を、ニンニク、サフラン、オリーブオイル、フェンネルと共に煮込んだ、マルセイユ発祥の名物魚スープ。"},ratatouille:{name_fr:"Ratatouille",name_en:"Ratatouille",name_ja:"ラタトゥイユ",desc:"ナス、ズッキーニ、パプリカ、トマトなどの夏野菜をオリーブオイルとハーブでじっくり炒め煮にした、プロヴァンス地方の野菜料理。"},salade_nicoise:{name_fr:"Salade Niçoise",name_en:"Niçoise Salad",name_ja:"ニース風サラダ",desc:"トマト、アンチョビ、ゆで卵、オリーブ、インゲン、ツナなどにオリーブオイルをかけた、ニース発祥の爽やかなサラダ。"},choucroute_garnie:{name_fr:"Choucroute Garnie",name_en:"Sauerkraut with Pork and Sausages",name_ja:"シュークルート・ガルニ",desc:"発酵させた塩漬けキャベツ（シュークルート）を白ワインで煮込み、ソーセージや豚肉の塩漬けを添えたアルザス地方の代表料理。"},flammekueche:{name_fr:"Flammekueche / Tarte Flambée",name_en:"Flammekueche",name_ja:"タルト・フランベ",desc:"薄いパン生地にフロマージュ・ブラン、玉ねぎ、ベーコンをのせて高温の薪窯でパリッと焼き上げた、アルザス風ピザ。"},baeckeoffe:{name_fr:"Baeckeoffe",name_en:"Baeckeoffe",name_ja:"ベッコフ",desc:"牛肉、豚肉、羊肉とジャガイモ、玉ねぎをアルザス白ワインでマリネし、土鍋（テリーヌ型）でパン生地で密閉して長時間焼き上げたパン屋の鍋料理。"},galette_sarrasin:{name_fr:"Galette de sarrasin",name_en:"Buckwheat Galette",name_ja:"ガレット・ド・サラザン",desc:"そば粉で作った薄いクレープ生地に、ハム、卵、チーズ（コンプレ）などを包んで香ばしく焼いたブルターニュ地方の主食。"},cotriade:{name_fr:"Cotriade",name_en:"Brittany Fish Stew",name_ja:"コトリアード",desc:"地元の様々な魚とジャガイモをハーブの効いたブイヨンでさっと煮込み、トーストを添えて食べるブルターニュの漁師の魚スープ。"},kouign_amann:{name_fr:"Kouign-amann",name_en:"Kouign-amann",name_ja:"クイニーアマン",desc:"パン生地に大量のバターと砂糖を折り込み、外側をキャラメリゼさせて焼き上げた、ブルターニュの濃厚な伝統菓子。"},pot_au_feu:{name_fr:"Pot-au-feu",name_en:"Pot-au-feu",name_ja:"ポトフ",desc:"牛肉の塊と塊の野菜（人参、カブ、ネギなど）を水からじっくり煮込み、スープと具材を別々に楽しむフランス伝統の家庭料理。"},soupe_oignon:{name_fr:"Soupe à l'oignon",name_en:"French Onion Soup",name_ja:"オニオングラタンスープ",desc:"飴色に炒めた玉ねぎのスープに、バゲットとチーズをのせてオーブンでこんがりとグラチネしたパリ名物の温かいスープ。"},entrecote_bercy:{name_fr:"Entrecôte Bercy",name_en:"Bercy Entrecote",name_ja:"アントルコート・ベルシー",desc:"リブロースステーキに、白ワイン、シャロット、エシャロット、牛の骨髄、バターを合わせた香り豊かなベルシーソースをかけた料理。"},confit_canard:{name_fr:"Confit de canard",name_en:"Duck Confit",name_ja:"鴨のコンフィ",desc:"塩でマリネした鴨の骨付きもも肉を、鴨の脂の中で低温でじっくりと煮込み、仕上げに皮目をパリッと焼き上げた南西地方の保存食。"},cassoulet:{name_fr:"Cassoulet",name_en:"Cassoulet",name_ja:"カスレ",desc:"白インゲン豆と、鴨のコンフィ、豚肉、ソーセージなどを特製の土鍋（カソール）で長時間じっくりと焼き煮にした、ラングドック地方発祥の重厚な煮込み料理。"},magret_canard:{name_fr:"Magret de canard",name_en:"Duck Breast",name_ja:"マグレ・ド・カナール",desc:"フォアグラ用に肥育された鴨の胸肉（マグレ）を、皮目を格子状に切り込んで脂を出しながらミディアムレアに焼き上げたステーキ。"},quenelle_brochet:{name_fr:"Quenelle de brochet",name_en:"Pike Quenelle",name_ja:"川魚のクネル",desc:"カワカマス（淡水魚）のすり身に卵やバターを合わせてラグビーボール状にし、茹でてからザリガニソース（ナンチュアソース）をかけてオーブンで焼いたリヨンの名物。"},poulet_morilles:{name_fr:"Poulet Bresse aux morilles",name_en:"Bresse Chicken with Morel Mushrooms",name_ja:"ブレス鶏のモリーユ茸ソース",desc:"最高級ブレス産の鶏肉を、乾燥モリーユ茸（アミガサタケ）の旨味を引き出した生クリームソースで贅沢に煮込んだ極上の一皿。"},gratin_dauphinois:{name_fr:"Gratin Dauphinois",name_en:"Potato Gratin",name_ja:"グラタン・ドフィノワ",desc:"スライスしたジャガイモに、ニンニク、生クリーム、牛乳を加えてオーブンでじっくりと焼き上げた、チーズを使わない伝統的なジャガイモグラタン。"},rillettes_tours:{name_fr:"Rillettes de Tours",name_en:"Rillettes of Tours",name_ja:"リエット（トゥール風）",desc:"豚肉をラードの中で繊維がほぐれるまで数時間煮込み、冷やして脂肪で固めたペースト。バゲットに塗って食べる。"},brochet_beurre_blanc:{name_fr:"Brochet au beurre blanc",name_en:"Pike with Beurre Blanc Sauce",name_ja:"川魚のブール・ブラン添え",desc:"ロワール川のカワカマスを優しくポシェし、エシャロット、白ワイン、バターを乳化させた極上の「白いバターソース」で食べる高貴な一皿。"},tarte_tatin:{name_fr:"Tarte Tatin",name_en:"Tarte Tatin",name_ja:"タルトタタン",desc:"型の中にバターと砂糖でキャラメリゼしたリンゴを敷き詰め、パイ生地をかぶせて焼き、ひっくり返して供するロワール発祥のアップルタルト。"},potee_champenoise:{name_fr:"Potée Champenoise",name_en:"Champagne Pot-roasted Stew",name_ja:"ポテ・シャンプノワーズ",desc:"豚の塩漬け肉、ベーコン、ソーセージとキャベツ、人参などの野菜をシャンパーニュ地方のスタイルでコトコト煮込んだ温かい煮込み。"},biscuits_roses:{name_fr:"Biscuits roses de Reims",name_en:"Pink Biscuits of Reims",name_ja:"ビスキュイ・ローズ・ド・ランス",desc:"バニラの香りがするピンク色のサクサクしたビスケット。シャンパンに浸して食べるのがランスの伝統。"},brandade_morue:{name_fr:"Brandade de morue",name_en:"Cod Brandade",name_ja:"ブランダード・ド・モリュ",desc:"塩ダラを茹でてオリーブオイル、牛乳、ニンニクと共に細かくすり潰し、ペースト状にしたニーム地方の郷土料理。"},tielle_setoise:{name_fr:"Tielle sétoise",name_en:"Sète Octopus Pie",name_ja:"ティエル・セトワーズ",desc:"タコやイカをスパイシーなトマトソースで煮込み、丸いパイ生地に詰めて焼き上げたセート港発祥の惣菜パイ。"},civet_sanglier:{name_fr:"Civet de sanglier",name_en:"Wild Boar Civet",name_ja:"イノシシの赤ワイン煮込み",desc:"野生のイノシシ肉を赤ワイン、ハーブ、香味野菜で数日間マリネし、その血液を使ってコクを出したソースでじっくり煮込んだコルシカの狩猟料理。"},fiadone:{name_fr:"Fiadone",name_en:"Corsican Cheesecake",name_ja:"フィアドーヌ",desc:"コルシカ特産のホエーチーズ「ブロッチュ」に、卵、砂糖、レモンの皮を加えて焼き上げた、軽やかで素朴な伝統チーズケーキ。"},veau_olives:{name_fr:"Veau aux olives / Civet de veau",name_en:"Corsican Veal with Olives",name_ja:"子牛肉のオリーブ煮込み",desc:"子牛肉をオリーブオイル、ニンニク、ハーブ、トマト、野生のオリーブと共にじっくり煮込んだ、コルシカ島を代表する家庭的な名物料理。"},carbonnade_flamande:{name_fr:"Carbonnade Flamande",name_en:"Flemish Beef Stew",name_ja:"カルボナード・フラマンド",desc:"牛肉をベルギービール、タマネギ、ブラウンシュガー、タイムと共にコトコト煮込み、甘酸っぱく濃厚に仕上げた北フランス・フランドルの定番料理。"},potjevleesch:{name_fr:"Potjevleesch",name_en:"Potjevleesch",name_ja:"ポチェブリーシュ",desc:"鶏肉、うさぎ肉、豚肉、子牛肉などの異なる肉を白ワインとスパイスで煮込み、冷やしてテリーヌ状のゼリー寄せにした北部の伝統冷製料理。"},moules_frites:{name_fr:"Moules-frites",name_en:"Mussels and Fries",name_ja:"ムール・フリット",desc:"白ワイン、シャロット、パセリで蒸し焼きにした山盛りのムール貝（マリニエール）に、サクサクのフライドポテトを添えたベルギー・北フランスの国民食。"},tournedos_rossini:{name_fr:"Tournedos Rossini",name_en:"Tournedos Rossini",name_ja:"トゥルネド・ロッシーニ",desc:"牛ヒレ肉のソテーにフォアグラとトリュフをのせ、濃厚なマデールソースをかけたフランス最高峰の贅沢な肉料理。"},andouillette:{name_fr:"Andouillette",name_en:"Andouillette sausage",name_ja:"アンドゥイエット",desc:"豚の胃や腸などの内臓肉を細切りにして豚の腸に詰めた、独特の強い風味を持つ伝統的なフランスのソーセージ。"},pate_de_campagne:{name_fr:"Pâté de campagne",name_en:"Country pâté",name_ja:"パテ・ド・カンパーニュ",desc:"豚肉、豚レバー、脂身、ハーブなどをミンチにし、テリーヌ型に詰めて湯煎焼きにしたフランスの代表的なオードブル。"},tripes_a_la_mode_de_caen:{name_fr:"Tripes à la mode de Caen",name_en:"Caen-style tripe",name_ja:"トリップ・ア・ラ・モード・ド・カン（カン風牛胃の煮込み）",desc:"牛の4つの胃（特にハチノス）を牛足、野菜、シードル、カルヴァドスと共に土鍋で長時間じっくり煮込んだノルマンディーの伝統料理。"},supreme_de_volaille:{name_fr:"Suprême de volaille",name_en:"Chicken supreme",name_ja:"シュプレーム・ド・ヴォライユ",desc:"骨付きの鶏胸肉（シュプレーム）を優しくソテーし、濃厚な白いクリームソース（ソース・シュプレーム）で仕上げた気品ある一皿。"},fond_de_volaille:{name_fr:"Fond de volaille",name_en:"Chicken stock",name_ja:"フォン・ド・ヴォライユ",desc:"鶏の骨やガラ、香味野菜（ミポワ）を水からコトコト煮込んで濾した、フランス料理の基本的な白いお出汁。"},pate_de_foie_de_volaille:{name_fr:"Pâté de foie de volaille",name_en:"Chicken liver pâté",name_ja:"鶏レバーのパテ",desc:"鶏レバーをバター、エシャロット、ブランデーなどと炒めて滑らかなペースト状にし、冷やし固めた定番の前菜料理。"},salade_landaise:{name_fr:"Salade landaise",name_en:"Landes salad",name_ja:"サラダ・ランデーズ（ランド風サラダ）",desc:"レタスの上に、鴨のコンフィ、砂肝のコンフィ、鴨の燻製胸肉、フォアグラなどをのせた、フランス南西地方ランド県の名物サラダ。"},ttoro_basque:{name_fr:"Ttoro",name_en:"Ttoro (Basque seafood stew)",name_ja:"チョロ（バスク風魚介スープ煮込み）",desc:"コウイカ、アンコウ、メルルーサ、手長エビなどの厳選された魚介をそのまま残し、ピマン・デスペレット（エスペレット唐辛子）を効かせた濃厚なバスクの魚介煮込み。"},axoa_de_veau:{name_fr:"Axoa de Veau",name_en:"Veal Axoa",name_ja:"アショア・ド・ヴォー（子牛肉のバスク風細切れ煮込み）",desc:"細かく刻んだ子牛肉を、ピーマンや玉ねぎ、ピマン・デスペレットと共にラードで穏やかに炒め煮にしたバスク・ラブール地方の伝統肉料理。"},kokotxas_de_merlu_au_pil_pil:{name_fr:"Kokotxas de merlu au pil-pil",name_en:"Hake kokotxas in pil-pil sauce",name_ja:"ココチャ・ド・メルルーサ・オ・ピルピル",desc:"メルルーサの最もゼラチン質が豊富な顎肉（ココチャ）を、ニンニク、ピマン・デスペレット、オリーブオイルと共に土鍋で優しくゆすりながら乳化させたバスク最高峰の伝統料理。"}},Le={sauter:{name_fr:"Sauter",name_en:"Sauté / Pan-fry",name_ja:"ソテー（炒め焼き）",def:"少量の油を用いて高温かつ短時間で食材を加熱する技法。表面を香ばしく焼き固め、旨味を閉じ込める。",temp:"160°C - 200°C",science:"メイラード反応による香気成分の生成と、急速な熱伝導による表面の結晶化。"},braiser:{name_fr:"Braiser",name_en:"Braise",name_ja:"ブレゼ（蒸し煮）",def:"少量の液体（ブイヨンやワイン）を加え、蓋をして密閉状態で低温かつ長時間加熱する技法。",temp:"85°C - 95°C",science:"湿分を保ちながら熱を加え、硬い結合理構造（コラーゲン）を水溶性のゼラチンへ変化させる。"},pocher:{name_fr:"Pocher",name_en:"Poach",name_ja:"ポシェ（茹でる）",def:"沸騰直前（気泡がわずかに立つ程度）の液体の中で食材を優しく加熱する技法。",temp:"70°C - 85°C",science:"急激なタンパク質凝固による身の縮みや乾燥を防ぎ、水分を保持してしっとり仕上げる。"},confire:{name_fr:"Confire",name_en:"Confit",name_ja:"コンフィ（低温の油脂煮）",def:"食材（主に肉や魚）を低温の油脂の中でゆっくりと時間をかけて加熱する技法。",temp:"75°C - 90°C",science:"水分の蒸発を防ぎつつ、肉内部の結合組織をゼラチン化し、油の浸透による防腐効果を高める。"},griller:{name_fr:"Griller",name_en:"Grill",name_ja:"グリエ（網焼き）",def:"直火または熱した格子（グリッド）の上で食材を直接加熱し、独特の焼き目をつける技法。",temp:"200°C以上",science:"強い放射熱によって短時間で表面に焼き目をつけ、内部の水分を逃がさないようにする。"},rotir:{name_fr:"Rôtir",name_en:"Roast",name_ja:"ロティ（ロースト）",def:"オーブンや串焼き機などの乾いた熱空気中で、油脂をかけながら食材の全体を均一に焼き上げる技法。",temp:"150°C - 220°C",science:"熱対流によって外側を香ばしく焼き上げ、脂肪層をゆっくり溶かしつつ内部へ熱を通す。"},mijoter:{name_fr:"Mijoter",name_en:"Simmer / Stew",name_ja:"ミジョテ（コトコト煮込む）",def:"弱火で液体を軽く波打たせる状態で、長時間じっくり煮込む技法。",temp:"85°C - 95°C",science:"水溶性の旨味成分をゆっくり抽出し、食材全体に味を染み込ませる。"},poeler:{name_fr:"Poêler",name_en:"Pan-sear",name_ja:"ポワレ（フライパン焼き）",def:"フライパンにバターや油をしき、表面に焼き色をつけながら、アロゼ（油をかける）して火を通す技法。",temp:"140°C - 180°C",science:"バターの乳化組織と食材の水分を調整し、ふっくらとしたテクスチャを維持する。"},gratiner:{name_fr:"Gratiner",name_en:"Gratin / Brown",name_ja:"グラチネ（グラタンにする）",def:"表面にチーズやパン粉、ソースを塗り、オーブンの上火で焼き色をつけて香ばしくする技法。",temp:"220°C以上",science:"タンパク質と糖のメイラード反応による膜形成と、脂質の熱酸化香の付与。"},friture:{name_fr:"Friture",name_en:"Deep-fry",name_ja:"フリチュール（揚げる）",def:"高温に熱した多量の油脂の中で食材を加熱する技法。表面を急速に脱水させ、パリッとした食感に仕上げる。",temp:"160°C - 190°C",science:"表面の水分が瞬時に蒸発して水蒸気バリアを作り、油の過度な浸透を防ぎつつ熱を伝える。"},embouter:{name_fr:"Embouter",name_en:"Sausage-filling",name_ja:"アンブテ（腸詰め）",def:"ひき肉や調味料を混ぜたファルス（詰め物）を豚や羊などの腸に詰める技法。ソーセージやアンドゥイエットの基本調理技術。",temp:"常温（加熱前調理）",science:"天然の腸繊維が内部の水分と肉汁を閉じ込め、加熱時に適度な圧力をかけて肉の弾力を生み出す。"},sous_vide:{name_fr:"Sous-vide",name_en:"Vacuum cooking / Sous-vide",name_ja:"真空低温調理",def:"食材と調味料を真空袋に密封し、正確に温度管理された温水中で加熱する技法。",temp:"54°C - 68°C",science:"タンパク質の凝固温度以下で精密に熱を通すことで、水分の損失を抑え極めてしっとりとした質感に仕上げる。"},saler:{name_fr:"Saler",name_en:"Curing / Salting",name_ja:"サレ（塩蔵・塩漬け）",def:"塩を直接まぶす、または塩水に浸けることで食材を脱水・長期保存可能にする技法。生ハムやコンフィの基礎処理。",temp:"冷暗所（加熱前調理）",science:"浸透圧によって食材から余分な水分を抽出し、微生物の繁殖を防ぐと同時に旨味を凝縮させる。"},mijoter:{name_fr:"Mijoter",name_en:"Simmer / Slow cook",name_ja:"ミジョテ（弱火煮込み）",def:"食材を液体の中で沸騰寸前の穏やかな火加減（とろ火）でコトコト煮込む技法。",temp:"85°C - 95°C",science:"タンパク質の急激な凝固を防ぎ、結合理構造を徐々に融解させ、旨味を液体へ優しく溶出させる。"},rotir_sur_braise:{name_fr:"Rôtir sur braise",name_en:"Roast over embers",name_ja:"ロティ・シュール・ブレーズ（炭火ロースト）",def:"薪や炭の直火による遠赤外線効果を利用し、表面を香ばしく焼き固めながら内部をジューシーに仕上げる技法。",temp:"180°C - 240°C",science:"木炭特有の熱輻射と揮発性フェノール化合物による薫香付与、および急激な表面糖化反応。"},emulser_au_pil_pil:{name_fr:"Émulsionner au pil-pil",name_en:"Pil-pil emulsification",name_ja:"ピルピル乳化（バスク式完全乳化）",def:"魚のゼラチン質とオリーブオイルを、熱と土鍋の微振動を利用して一切の乳化剤を使用せず完全乳化させるバスク独自の技法。",temp:"60°C - 70°C",science:"魚皮や顎肉（ココチャ）から溶け出た親水性ゼラチンコラーゲンと、疎水性オリーブオイルが物理的振動により均一なコロイド分散状態を形成する。"}},je={sauce_creme:{name_fr:"Sauce crème",name_en:"Cream sauce",name_ja:"クリームソース",desc:"生クリームをベースに、バター、魚または肉のブイヨンを加えてコク深く仕上げたソース。ノルマンディー料理に欠かせない。"},sauce_normande:{name_fr:"Sauce Normande",name_en:"Normandy Sauce",name_ja:"ソース・ノルマンド",desc:"魚のブイヨン（フュメ・ド・ポワソン）に生クリーム、卵黄、バターを合わせ、シードルや牡蠣の煮汁で香りをつけた伝統ソース。"},sauce_vin_rouge:{name_fr:"Sauce au vin rouge",name_en:"Red Wine Sauce",name_ja:"赤ワインソース",desc:"赤ワインをベースに、フォンドボー、シャロット、エシャロット、ハーブを煮詰めてバターで仕上げる、牛肉料理に必須の濃厚ソース。"},rouille:{name_fr:"Rouille",name_en:"Rouille sauce",name_ja:"ルイユ",desc:"オリーブオイル、ニンニク、卵黄、サフラン、カイエンペッパーで作る南仏のピリ辛マヨネーズ状のソース。ブイヤベースに添える。"},vinaigrette:{name_fr:"Vinaigrette",name_en:"Vinaigrette",name_ja:"ヴィネグレット",desc:"サラダ油（またはオリーブオイル）と酢をエマルション（乳化）させ、塩、胡椒、ハーブを混ぜたフレンチドレッシングの基本。"},beurre_blanc:{name_fr:"Beurre blanc",name_en:"White butter sauce",name_ja:"ブール・ブラン（白バターソース）",desc:"エシャロット、白ワイン、白ワイン酢を煮詰め、冷たいバターを少しずつ加えて撹拌・乳化させた、魚料理用の非常に濃厚なソース。"},sauce_bercy:{name_fr:"Sauce Bercy",name_en:"Bercy sauce",name_ja:"ソース・ベルシー",desc:"白ワイン、刻んだエシャロット、魚のダシ（またはフォンドボー）を煮詰め、バターとパセリを加えたクラシックなソース。"},sauce_nantua:{name_fr:"Sauce Nantua",name_en:"Nantua Sauce",name_ja:"ソース・ナンチュア",desc:"エクルヴィス（ザリガニ）の殻から作ったバターと生クリームをベースにした、川魚のクネルなどに使用される赤く芳醇なソース。"},sauce_supreme:{name_fr:"Sauce suprême",name_en:"Supreme sauce",name_ja:"ソース・シュプレーム",desc:"鶏の白いダシ（ヴェルテ）に生クリームを加え、極限まで滑らかに仕上げた最高級の白いソース。"},sauce_biere:{name_fr:"Sauce à la bière",name_en:"Beer sauce",name_ja:"ビールソース",desc:"地元のビールをタマネギやフォンドボーと共に煮詰め、独特のコクとわずかな苦味を加えた北仏の伝統ソース。"},sauce_bearnaise:{name_fr:"Sauce Béarnaise",name_en:"Bernaise sauce",name_ja:"ソース・ベアルネーズ",desc:"澄ましバターと卵黄を温めながら乳化させ、エストラゴン、シャロット、酢の煮詰め汁を加えた、ステーキ用の気品あるソース。"},sauce_madere:{name_fr:"Sauce Madère",name_en:"Madeira Sauce",name_ja:"ソース・マデール",desc:"ポルトガル産のマデイラワインをフォンドボーと合わせて煮詰め、豊かな香りと甘味を与えた古典的な肉料理用ソース。"},sauce_poivre:{name_fr:"Sauce au poivre",name_en:"Pepper sauce",name_ja:"ペッパーソース",desc:"クラッシュした黒胡椒または緑胡椒をバターで炒め、コニャックでフランベし、フォンドボーと生クリームで仕上げたソース。"},sauce_chasseur:{name_fr:"Sauce Chasseur",name_en:"Hunter's sauce",name_ja:"ソース・シャスール（猟師風）",desc:"キノコ、エシャロット、白ワイン、トマト、デミグラスソースを煮込んで仕上げる、ジビエや鶏肉、肉料理に好まれるソース。"},sauce_gribiche:{name_fr:"Sauce Gribiche",name_en:"Gribiche sauce",name_ja:"ソース・グリビッシュ",desc:"固ゆで卵の卵黄をマスタードと油で乳化させ、刻んだ白身、ピクルス、ケッパー、ハーブを混ぜた冷製ソース。頭肉や内臓肉に合わせる。"},sauce_echalote:{name_fr:"Sauce échalote",name_en:"Shallot sauce",name_ja:"エシャロットソース",desc:"刻んだエシャロットを赤ワインや酢でしっかりと煮詰め、フォンドボーとバターを加えて仕上げたステーキソース。"},sauce_moutarde:{name_fr:"Sauce moutarde",name_en:"Mustard sauce",name_ja:"マスタードソース",desc:"白ワイン、生クリーム、フォンドヴォーを合わせたベースに、ディジョンマスタードを加えて風味豊かに仕上げたソース。"},sauce_piquante:{name_fr:"Sauce piquante",name_en:"Piquant sauce",name_ja:"ソース・ピカント",desc:"ブラウンソース（デミグラス）に白ワイン、酢、エシャロット、ピクルス（コルニッション）を加えて酸味と辛味を効かせたソース。"},sauce_charcutiere:{name_fr:"Sauce Charcutière",name_en:"Charcutière sauce",name_ja:"ソース・シャルキュティエール",desc:"デミグラスソースまたはフュメに白ワイン、エシャロット、ピクルス（コルニッション）を加え、豚肉のソテー（ロース肉など）によく合わせる古典的なソース。"},sauce_piperade:{name_fr:"Sauce Piperade",name_en:"Piperade sauce",name_ja:"ソース・ピペラード（バスク風トマトとピーマンのソース）",desc:"トマト、赤・緑ピーマン、玉ねぎをオリーブ油や生ハムの脂でじっくり炒め煮にし、ピマン・デスペレットで仕上げたバスク伝統の甘辛いソース。"},sauce_encre_basque:{name_fr:"Sauce à l'Encre de Seiche à la Basque",name_en:"Basque squid ink sauce",name_ja:"ソース・アンクル・ド・セーシュ・ア・ラ・バスケーズ",desc:"玉ねぎを焦がす直前まで徹底的にローストしてキャラメリゼし、イカスミ、赤ワイン、魚出汁を加えて構築した、小麦粉不使用の滑らかでアミノ酸豊富な漆黒ソース。"},sauce_verte_basque:{name_fr:"Sauce verte basque",name_en:"Basque green sauce",name_ja:"ソース・ヴェルト・バスケーズ（バスク風グリーンエマルジョンソース）",desc:"魚肉から溶け出た濃厚なゼラチン質、パセリの微細粒子、オリーブオイル、ニンニクが高度に乳化した、鮮やかなエメラルドグリーンの伝統エマルジョンソース。"}},qe={muscle_fibers:{name_fr:"Fibres musculaires",name_en:"Muscle fibers",name_ja:"筋繊維構造",desc:"運動量の多い部位の太い筋繊維は噛みごたえがあり旨味が強い。運動の少ない部位は繊細で柔らかい。"},low_collagen:{name_fr:"Faible collagène",name_en:"Low collagen",name_ja:"低コラーゲン特性",desc:"結合組織が少なく、加熱による筋肉の収縮率が低いため、ステーキなどの短時間調理に向く。"},iron_taste:{name_fr:"Goût de fer (Myoglobine)",name_en:"Iron taste (Myoglobin)",name_ja:"ミオグロビンと鉄分",desc:"血液やミオグロビンが豊富な赤身肉は加熱で鉄分の旨味に変わるが、火を通しすぎるとレバー臭に変化する。"},fat_insulation:{name_fr:"Isolation par le gras",name_en:"Fat insulation",name_ja:"脂肪層の断熱効果",desc:"厚い脂層が熱の急激な侵入を防ぐ断熱材となり、肉内部の水分とジューシーさを保つ。"},collagen_emulsification:{name_fr:"Émulsification du collagène",name_en:"Collagen emulsification",name_ja:"コラーゲンの乳化",desc:"筋間コラーゲンと脂肪が熱で分解・乳化し、ソースそのものに粘度と豊かなコクを与える。"},collagen_gelatinization:{name_fr:"Gélatinisation du collagène",name_en:"Collagen gelatinization",name_ja:"コラーゲンのゼラチン化",desc:"硬い結合組織（コラーゲン）は、70°C以上の水分中で長時間加熱すると、トロトロの可溶性ゼラチンに変化する。"},protein_coagulation:{name_fr:"Coagulation des protéines",name_en:"Protein coagulation",name_ja:"タンパク質の凝固",desc:"タンパク質は55°C付近から凝固を開始し、65°Cを超えると脱水（身縮み）が起きる。緻密な温度管理が必要。"},collagen_breakdown:{name_fr:"Dégradation du collagène",name_en:"Collagen breakdown",name_ja:"コラーゲン分解",desc:"極めて強い立体構造を持つコラーゲンも、酸（ワイン、酢）や長時間煮込みで完全に分解される。"},curing_and_fermentation:{name_fr:"Salage et Fermentation",name_en:"Curing and fermentation",name_ja:"塩蔵・発酵による熟成",desc:"脱水によって浸透圧を上げ、微生物の繁殖を防ぐとともに、酵素分解によりアミノ酸（旨味）を増大させる。"},moisture_loss:{name_fr:"Perte d'humidité",name_en:"Moisture loss",name_ja:"水分の流出（脱水）",desc:"熱によって筋肉が強く収縮すると内部の水分が押し出される。しっとり仕上げるには低温調理が効果的。"},short_cook:{name_fr:"Cuisson courte",name_en:"Short cooking",name_ja:"短時間加熱の鉄則",desc:"筋繊維が細く水分保持力の弱い肉は、短時間の加熱で終わらせ、内部の水分を絶対に逃がさないようにする。"},bone_in_cooking:{name_fr:"Cuisson sur l'os",name_en:"Bone-in cooking",name_ja:"骨付き調理の効果",desc:"骨の周辺にある高濃度のコラーゲンと髄液が熱で溶け出し、肉に深いコクと潤いを与える。"},gelatin_extraction:{name_fr:"Extraction de la gélatine",name_en:"Gelatin extraction",name_ja:"ゼラチン質の抽出",desc:"水の中にコラーゲンの多い部位（手羽、軟骨）を入れてコトコト煮込むことで、スープ（フォン）にとろみを与える。"},fat_rendering:{name_fr:"Fonte des graisses",name_en:"Fat rendering",name_ja:"脂肪の融出",desc:"熱を加えることで脂肪組織から余分な脂を溶かし出し、表面をパリパリにさせながら油切れを良くする。"},crispy_skin:{name_fr:"Peau croustillante",name_en:"Crispy skin creation",name_ja:"クリスピー皮形成",desc:"皮表面の水分を完全に抜いた後、溶けた脂で揚げるようにローストすることで、クリスピーな食感を作る。"},cream_affinity:{name_fr:"Affinité avec la crème",name_en:"Cream affinity",name_ja:"生クリーム親和性",desc:"平滑筋や血管系部位のコラーゲンは、乳脂肪（クリーム）と分子レベルで結合しやすく、味の乗りが良くなる。"},fat_and_lean_interweave:{name_fr:"Entrelacement de gras et maigre",name_en:"Fat and lean interweaving",name_ja:"赤身と脂の編み込み（霜降り）",desc:"赤身と脂が網目状に交差する部位は、加熱時に脂が断熱と保水を行い、焼きすぎても硬くなりにくい。"},emulsification:{name_fr:"Émulsion",name_en:"Emulsification",name_ja:"乳化作用",desc:"水と油という本来混ざり合わない液体が、卵黄やマスタードの乳化剤（レシチン）を仲介して均一に混ざり合う現象。"},balanced_meat:{name_fr:"Viande équilibrée",name_en:"Balanced meat quality",name_ja:"バランスのとれた肉質",desc:"赤身と脂身、結合組織（コラーゲン）の比率が均等で、ステーキから煮込みまで様々な調理法に適応できる万能な肉質特性。"},polymorphism_cocoa_butter:{name_fr:"Polymorphisme du beurre de cacao",name_en:"Polymorphism of cocoa butter",name_ja:"カカオバターの多形性",desc:"カカオバターの冷却調温（テンパリング）により、融点が最もよく光沢のあるV型結晶のみを安定して形成させる物理的技術。"},strecker_degradation:{name_fr:"Dégradation de Strecker",name_en:"Strecker degradation",name_ja:"ストレッカー分解",desc:"メイラード反応の中間体とアミノ酸が反応し、香ばしいコーヒーや熟成肉の特有な香気（ストレッカーアルデヒド）を生成する反応。"}};function pe(e,o){const r=o==="region"?Ce[e]:we[e];if(!r)return"";let a="";return r.dishes&&r.dishes.length>0&&(a+='<div style="margin-top: 0.6rem;"><span style="font-size: 0.75rem; font-weight: 700; color: var(--color-accent-hover); text-transform: uppercase; display: block; margin-bottom: 0.2rem;">🍽️ 代表料理 (Classic Dishes):</span> ',a+=r.dishes.map(n=>{const i=Se[n];return`<span class="relation-badge" style="display: inline-block; background-color: rgba(0, 0, 145, 0.05); color: var(--color-primary); padding: 0.25rem 0.5rem; font-size: 0.8rem; border-radius: 4px; margin-right: 0.4rem; margin-top: 0.25rem; border: 1px solid rgba(0, 0, 145, 0.15); font-weight: 500;">${i?`${i.name_fr} (${i.name_ja})`:n}</span>`}).join(""),a+="</div>"),r.techniques&&r.techniques.length>0&&(a+='<div style="margin-top: 0.6rem;"><span style="font-size: 0.75rem; font-weight: 700; color: var(--color-accent-hover); text-transform: uppercase; display: block; margin-bottom: 0.2rem;">🔥 調理技法 (Techniques):</span> ',a+=r.techniques.map(n=>{const i=Le[n];return`<span class="relation-badge" style="display: inline-block; background-color: rgba(220, 38, 38, 0.05); color: var(--color-secondary); padding: 0.25rem 0.5rem; font-size: 0.8rem; border-radius: 4px; margin-right: 0.4rem; margin-top: 0.25rem; border: 1px solid rgba(220, 38, 38, 0.15); font-weight: 500;">${i?`${i.name_fr} (${i.name_ja})`:n}</span>`}).join(""),a+="</div>"),r.sauces&&r.sauces.length>0&&(a+='<div style="margin-top: 0.6rem;"><span style="font-size: 0.75rem; font-weight: 700; color: var(--color-accent-hover); text-transform: uppercase; display: block; margin-bottom: 0.2rem;">🥫 ソース (Sauces):</span> ',a+=r.sauces.map(n=>{const i=je[n];return`<span class="relation-badge" style="display: inline-block; background-color: rgba(197, 168, 128, 0.1); color: var(--color-text-main); padding: 0.25rem 0.5rem; font-size: 0.8rem; border-radius: 4px; margin-right: 0.4rem; margin-top: 0.25rem; border: 1px solid rgba(197, 168, 128, 0.3); font-weight: 500;">${i?`${i.name_fr} (${i.name_ja})`:n}</span>`}).join(""),a+="</div>"),r.science&&r.science.length>0&&(a+='<div style="margin-top: 0.6rem;"><span style="font-size: 0.75rem; font-weight: 700; color: var(--color-accent-hover); text-transform: uppercase; display: block; margin-bottom: 0.2rem;">🧪 料理科学 (Science):</span> ',a+=r.science.map(n=>{const i=qe[n];return`<span class="relation-badge" style="display: inline-block; background-color: rgba(107, 156, 104, 0.05); color: var(--color-success); padding: 0.25rem 0.5rem; font-size: 0.8rem; border-radius: 4px; margin-right: 0.4rem; margin-top: 0.25rem; border: 1px solid rgba(107, 156, 104, 0.15); font-weight: 500;">${i?`${i.name_fr} (${i.name_ja})`:n}</span>`}).join(""),a+="</div>"),r.ingredients&&r.ingredients.length>0&&(a+='<div style="margin-top: 0.6rem;"><span style="font-size: 0.75rem; font-weight: 700; color: var(--color-accent-hover); text-transform: uppercase; display: block; margin-bottom: 0.2rem;">🥬 主要食材 (Ingredients):</span> ',a+=r.ingredients.map(n=>`<span class="relation-badge" style="display: inline-block; background-color: rgba(10, 25, 49, 0.05); color: var(--color-text-muted); padding: 0.25rem 0.5rem; font-size: 0.8rem; border-radius: 4px; margin-right: 0.4rem; margin-top: 0.25rem; border: 1px solid rgba(10, 25, 49, 0.15); font-weight: 500;">${n}</span>`).join(""),a+="</div>"),a}const $e=[{id:"cut_filet",number:"5",type:"regular",name_fr:"Filet de bœuf",name_en:"Tenderloin",name_ja:"ヒレ",points:"55,30 68,30 68,42 55,42",properties:{tenderness:"★★★★★",fat:"★☆☆☆☆",collagen:"★☆☆☆☆"},cooking:"強火ステーキ、ロースト、短時間ソテー",science:"運動量が最も少ない筋肉。結合組織が極少で加熱による硬化が起きにくい。",classification:"Steak cut（高級ステーキ部位）",logic:"High heat / Short cook",chef_note:"火入れの“1分”が品質を決める。"},{id:"cut_rumsteck",number:"2",type:"regular",name_fr:"Rumsteck",name_en:"Rump",name_ja:"ランプ",points:"68,28 78,28 78,42 68,42",properties:{tenderness:"★★★★☆",fat:"★★☆☆☆",collagen:"★★☆☆☆"},cooking:"ステーキ、ロースト",science:"運動はあるが筋繊維が均質で、鉄分と旨味が強い。",classification:"Steak cut / Roast cut",logic:"High heat / Medium cook",chef_note:"「肉汁を噛む」ための部位。"},{id:"cut_aiguillette",number:"4",type:"regular",name_fr:"Aiguillette de rumsteck",name_en:"Sirloin cap (Aiguillette de baronne)",name_ja:"イチボ",points:"72,40 84,40 84,52 72,52",properties:{tenderness:"★★★★☆",fat:"★★★☆☆",collagen:"★★☆☆☆"},cooking:"ロースト、厚切りステーキ",science:"脂層が断熱材として働き、内部の水分保持力が高い。",classification:"Roast cut（塊肉向き）",logic:"Roast / Medium heat",chef_note:"“塊で焼くほど完成度が上がる部位”。"},{id:"cut_palette",number:"8",type:"regular",name_fr:"Dessus de palette",name_en:"Chuck flap",name_ja:"ザブトン",points:"28,26 44,26 44,42 28,42",properties:{tenderness:"★★★★☆",fat:"★★★★★",collagen:"★★★☆☆"},cooking:"煮込み、低温ロースト",science:"脂と筋間コラーゲンが共存。加熱で乳化しソース化する。",classification:"Braise cut（煮込み用）",logic:"Low heat / Long cook",chef_note:"“焼くより溶かす部位”。"},{id:"cut_poitrine",number:"13",type:"regular",name_fr:"Poitrine de bœuf",name_en:"Brisket",name_ja:"ブリスケ",points:"28,45 44,45 44,66 28,66",properties:{tenderness:"★★☆☆☆",fat:"★★★★☆",collagen:"★★★★★"},cooking:"ポトフ、長時間煮込み",science:"支持筋肉構造でコラーゲン密度が高い。低温長時間でゼラチン化。",classification:"Braise cut",logic:"Low heat / Very long cook",chef_note:"“時間が旨味に変わる典型”。"},{id:"cut_langue",number:"1",type:"offal",name_fr:"Langue de bœuf",name_en:"Langue de bœuf",name_ja:"タン",points:"4,30 18,30 18,48 4,48",properties:{tenderness:"★★★☆☆（焼き） / ★★★★★（煮込み）",fat:"★★★☆☆",collagen:"★★★★☆"},cooking:"煮込み、スライスソテー",science:"筋＋結合組織が強く、加熱でゼラチン質化する。",classification:"Abats nobles（高級内臓）",logic:"Long cook",chef_note:"“煮込むほど格が上がる部位”。"},{id:"cut_onglet",number:"9",type:"offal",name_fr:"Onglet",name_en:"Skirt / Hanging tender",name_ja:"ハラミ",points:"48,50 62,50 62,65 48,65",properties:{tenderness:"★★★★☆",fat:"★★★☆☆",collagen:"★★☆☆☆"},cooking:"ステーキ（レア）",science:"横隔膜筋。筋繊維が粗く赤身の旨味が強い。",classification:"Boucher cut（肉屋が好む部位）",logic:"High heat / Very short cook",chef_note:"“焼きすぎると価値が消える”。"},{id:"cut_foie",number:"3",type:"offal",name_fr:"Foie de bœuf",name_en:"Liver",name_ja:"レバー",points:"42,40 56,40 56,52 42,52",properties:{tenderness:"★★★★☆",fat:"★★☆☆☆",collagen:"★☆☆☆☆"},cooking:"ソテー、パテ",science:"実質臓器。加熱でタンパク質凝固が急速に進む。",classification:"Abats",logic:"Medium heat / Very short cook",chef_note:"“数十秒 of 差で別食材”。"},{id:"cut_tripe",number:"10",type:"offal",name_fr:"Tripes",name_en:"Honeycomb tripe",name_ja:"ハチノス",points:"38,54 52,54 52,70 38,70",properties:{tenderness:"★☆☆☆☆ → ★★★★★（煮込み）",fat:"★☆☆☆☆",collagen:"★★★★★"},cooking:"長時間煮込み",science:"蜂 of 巣状コラーゲン構造。酸と時間で分解される。",classification:"Abats traditionnels",logic:"Very long cook",chef_note:"“時間が構造を壊す食材”。"},{id:"cut_boyaux",number:"14",type:"offal",name_fr:"Boyaux",name_en:"Intestine",name_ja:"腸",points:"80,62 94,62 94,78 80,78",properties:{tenderness:"★★☆☆☆",fat:"★★★★☆",collagen:"★★★★☆"},cooking:"ソーセージ, グリル",science:"平滑筋＋脂肪層。発酵・香辛料と相性が良い。",classification:"Charcuterie",logic:"Medium heat / Processed",chef_note:"“単体ではなく構造として使う部位”。"}],Ee=[{id:"cut_chicken_breast",number:"4",type:"regular",name_fr:"Blanc de poulet",name_en:"Breast",name_ja:"むね",points:"34,66 46,66 46,82 34,82",properties:{tenderness:"★★☆☆☆",fat:"★☆☆☆☆",collagen:"★☆☆☆☆"},cooking:"ポシェ、ソテー、低温調理",science:"結合組織が少なく、高温で加熱すると水分が抜けやすい。低温でゆっくり火入れするとしっとり仕上がる。",classification:"Suprême de volaille",logic:"Low temperature / Delicate heat",chef_note:"加熱 of 誤差がそのまま品質差になる部位。"},{id:"cut_chicken_tender",number:"6",type:"regular",name_fr:"Aiguillette de poulet",name_en:"Tenderloin",name_ja:"ささみ",points:"38,62 48,62 48,76 38,76",properties:{tenderness:"★★★☆☆",fat:"★☆☆☆☆",collagen:"★☆☆☆☆"},cooking:"ソテー、パン粉焼き、軽いフリット",science:"筋繊維が細く水分保持が弱い。短時間加熱で内部水分を守る必要がある。",classification:"Aiguillettes de poulet panées",logic:"Short cook / Gentle heat",chef_note:"「火を入れる時間」より「火を止める判断」が重要。"},{id:"cut_chicken_thigh",number:"3",type:"regular",name_fr:"Cuisse de poulet",name_en:"Thigh",name_ja:"もも",points:"48,70 62,70 62,86 48,86",properties:{tenderness:"★★★★☆",fat:"★★★☆☆",collagen:"★★★☆☆"},cooking:"ロティ、ブレゼ、煮込み",science:"運動量が多くミオグロビンが豊富。長時間加熱でコラーゲンがゼラチン化し、旨味が増す。",classification:"Coq au vin",logic:"Long cook / Medium heat",chef_note:"火を入れるほど価値が上がる数少ない部位。"},{id:"cut_chicken_shoulder",number:"5",type:"regular",name_fr:"Épaule de poulet",name_en:"Shoulder (Furisode)",name_ja:"ふりそで",points:"36,60 46,60 46,72 36,72",properties:{tenderness:"★★★☆☆",fat:"★★☆☆☆",collagen:"★★☆☆☆"},cooking:"ソテー、軽い煮込み",science:"むねとももの中間的構造。加熱耐性と保水性のバランスが良い。",classification:"Sauté de volaille",logic:"Medium heat / Balanced cook",chef_note:"万能だが「主役より補助」に向く部位。"},{id:"cut_chicken_drumette",number:"2",type:"regular",name_fr:"Pilon de poulet",name_en:"Drumette",name_ja:"手羽もと",points:"44,78 56,78 56,92 44,92",properties:{tenderness:"★★★☆☆",fat:"★★★☆☆",collagen:"★★★★☆"},cooking:"ロティ、オーブン焼き、グリル",science:"骨周辺にコラーゲンが集中。長時間加熱でゼラチン化しジューシーになる。",classification:"Pilons rôtis aux épices",logic:"Medium-high heat / Bone-in cook",chef_note:"骨付き加熱の“旨味の設計図”が最も分かりやすい部位。"},{id:"cut_chicken_wing_joint",number:"1",type:"regular",name_fr:"Aileron de poulet",name_en:"Wing mid joint",name_ja:"手羽なか",points:"42,62 52,62 52,76 42,76",properties:{tenderness:"★★★★☆",fat:"★★★★☆",collagen:"★★★★☆"},cooking:"コンフィ、低温ロースト",science:"皮・脂・コラーゲンの三層構造。低温長時間で完全にゼラチン化する。",classification:"Ailerons confits",logic:"Low heat / Long cook / Confit",chef_note:"「溶ける食感」を作るための部位。"},{id:"cut_chicken_wing",number:"1",type:"regular",name_fr:"Aile de poulet",name_en:"Wing",name_ja:"手羽先",points:"44,64 54,64 54,74 44,74",properties:{tenderness:"★★★☆☆",fat:"★★★★☆",collagen:"★★★★★"},cooking:"ブイヨン、ロースト、揚げ",science:"コラーゲン含有量が極めて高く、加熱でゼラチン化しスープに濃度を与える。",classification:"Bouillon de volaille / Fond",logic:"Simmer / Long cook",chef_note:"フランス料理の“出汁の骨格”になる部位。"},{id:"cut_chicken_skin",number:"8",type:"regular",name_fr:"Peau de poulet",name_en:"Skin",name_ja:"かわ",points:"46,54 56,54 56,66 46,66",properties:{tenderness:"★★★☆☆",fat:"★★★★★",collagen:"★★★★★"},cooking:"ロースト、テュイル、揚げ焼き",science:"加熱により脂が溶け、コラーゲンが乾燥・再構築されクリスピー化する。",classification:"Tuile de peau de poulet",logic:"High heat / Fat render",chef_note:"「脂を抜くと完成する」特殊部位。"},{id:"cut_chicken_heart",number:"12",type:"offal",name_fr:"Cœur de poulet",name_en:"Heart",name_ja:"ハツ",points:"40,74 50,74 50,86 40,86",properties:{tenderness:"★★★☆☆",fat:"★★☆☆☆",collagen:"★★☆☆☆"},cooking:"グリル、串焼き",science:"心筋由来の高密度筋繊維。短時間加熱で弾力を残す。",classification:"Brochettes de cœurs de poulet",logic:"High heat / Quick cook",chef_note:"火を入れすぎると一気に硬化する。"},{id:"cut_chicken_cardiac_base",number:"12",type:"offal",name_fr:"Base de cœur",name_en:"Cardiac base",name_ja:"ハツモト",points:"42,75 52,75 52,85 42,85",properties:{tenderness:"★★★★☆",fat:"★★★☆☆",collagen:"★★★☆☆"},cooking:"フリカッセ、軽い煮込み",science:"血管・弾性繊維構造。クリーム系と相性が良い。",classification:"Fricassée d’abats de volaille",logic:"Medium heat / Gentle simmer",chef_note:"内臓の中でも“ソース適性が高い”部位。"},{id:"cut_chicken_liver",number:"13",type:"offal",name_fr:"Foie de poulet",name_en:"Liver",name_ja:"レバー",points:"38,78 48,78 48,90 38,90",properties:{tenderness:"★★★★☆",fat:"★★☆☆☆",collagen:"★☆☆☆☆"},cooking:"パテ、ソテー、ムース",science:"実質器官で構造が均質。加熱しすぎると急速に水分が抜ける。",classification:"Pâté de foies de volaille",logic:"Medium heat / Short cook",chef_note:"“火入れの1分差”で別食材になる。"},{id:"cut_chicken_gizzard",number:"11",type:"offal",name_fr:"Gésier de poulet",name_en:"Gizzard",name_ja:"砂肝",points:"42,72 52,72 52,82 42,82",properties:{tenderness:"★★☆☆☆",fat:"★☆☆☆☆",collagen:"★☆☆☆☆"},cooking:"コンフィ、煮込み、サラダ",science:"強い筋肉組織。低温長時間で繊維がほぐれる。",classification:"Salade Landaise",logic:"Low heat / Long cook / Confit",chef_note:"“砂肝の噛み応えの設計”を理解する部位。"},{id:"cut_chicken_tail",number:"9",type:"offal",name_fr:"Croupion",name_en:"Tail (Bonjiri)",name_ja:"ボンジリ",points:"50,60 60,60 60,72 50,72",properties:{tenderness:"★★★★★",fat:"★★★★★",collagen:"★★★☆☆"},cooking:"ロースト、グリル",science:"脂肪の集中部位。加熱で純脂の旨味が凝縮する。",classification:"Poulet rôti",logic:"Medium heat / Crisp grill",chef_note:"最も“快楽的な脂”を持つ部位。"},{id:"cut_chicken_cartilage_yagen",number:"14",type:"offal",name_fr:"Cartilage de poulet",name_en:"Cartilage (Yagen)",name_ja:"ヤゲン軟骨",points:"36,78 46,78 46,90 36,90",properties:{tenderness:"★☆☆☆☆",fat:"★☆☆☆☆",collagen:"★★★★★"},cooking:"スープ、フォン",science:"コラーゲンとプロテオグリカンが主体。加熱でゼラチン化しとろみを生む。",classification:"Fonds de volaille",logic:"Simmer / Long extraction",chef_note:"“ソースの粘度を作る素材”。"},{id:"cut_chicken_cartilage_knee",number:"15",type:"offal",name_fr:"Cartilage de poulet",name_en:"Cartilage (Nankotsu)",name_ja:"ひざ軟骨",points:"48,88 58,88 58,98 48,98",properties:{tenderness:"★☆☆☆☆",fat:"★☆☆☆☆",collagen:"★★★★★"},cooking:"スープ、フォン",science:"コラーゲンとプロテオグリカンが主体。加熱でゼラチン化しとろみを生む。",classification:"Fonds de volaille",logic:"Simmer / Long extraction",chef_note:"“ソースの粘度を作る素材”。"}],Te=[{id:"cut_pork_loin",number:"1",type:"regular",name_fr:"Longe de porc",name_en:"Pork Loin",name_ja:"ロース",points:"52,56 64,56 64,72 52,72",properties:{tenderness:"★★★★☆",fat:"★★★☆☆",collagen:"★☆☆☆☆"},cooking:"ロースト、ソテー",science:"背側筋。均質な筋繊維＋脂の蓋で水分保持。",classification:"Roast cut",logic:"High heat / Short roast",chef_note:"“最も安定したステーキ素材”。"},{id:"cut_pork_tenderloin",number:"2",type:"regular",name_fr:"Filet mignon",name_en:"Tenderloin",name_ja:"ヒレ",points:"54,50 66,50 66,62 54,62",properties:{tenderness:"★★★★★",fat:"★☆☆☆☆",collagen:"★☆☆☆☆"},cooking:"ソテー、低温ロースト",science:"大腰筋。運動ゼロに近く筋繊維が極細。",classification:"Premium steak cut",logic:"Very short cook / Precision heat",chef_note:"“過熱した瞬間に価値が落ちる”。"},{id:"cut_pork_shoulder_loin",number:"3",type:"regular",name_fr:"Échine",name_en:"Shoulder loin",name_ja:"かたロース",points:"36,50 48,50 48,66 36,66",properties:{tenderness:"★★★★☆",fat:"★★★★☆",collagen:"★★★☆☆"},cooking:"煮込み、ロースト",science:"脂と赤身の網構造。熱耐性が高い。",classification:"Braise + Roast hybrid",logic:"Medium / Long cook対応",chef_note:"“焼きと煮込みの中間解”。"},{id:"cut_pork_belly",number:"4",type:"regular",name_fr:"Poitrine de porc",name_en:"Belly",name_ja:"ばら",points:"42,72 56,72 56,86 42,86",properties:{tenderness:"★★★★☆",fat:"★★★★★",collagen:"★★★★☆"},cooking:"煮込み、塩漬け、ロースト",science:"層状脂肪構造。塩で水分活性が下がり熟成が進む。",classification:"Charcuterie base cut",logic:"Long cook / Cure / Roast",chef_note:"“加工前提で完成する部位”。"},{id:"cut_pork_ham",number:"5",type:"regular",name_fr:"Jambon",name_en:"Ham leg (Cuissot)",name_ja:"もも",points:"60,60 74,60 74,78 60,78",properties:{tenderness:"★★★☆☆",fat:"★★☆☆☆",collagen:"★★☆☆☆"},cooking:"ハム、ロースト",science:"大筋肉群。塩分浸透と熟成に最適化。",classification:"Charcuterie premium",logic:"Cure / Low temp cook",chef_note:"“豚の価値はここで決まる”。"},{id:"cut_pork_cheek",number:"6",type:"offal",name_fr:"Joue de porc",name_en:"Cheek",name_ja:"頬肉",points:"28,70 40,70 40,84 28,84",properties:{tenderness:"★☆☆☆☆ → ★★★★★",fat:"★★★☆☆",collagen:"★★★★★"},cooking:"コンフィ、煮込み",science:"咀嚼筋。高密度コラーゲンが長時間で崩壊。",classification:"Braise cut (premium offal)",logic:"Very long cook",chef_note:"“ゼラチン化の完成形”。"},{id:"cut_pork_liver",number:"7",type:"offal",name_fr:"Foie de porc",name_en:"Liver",name_ja:"レバー",points:"46,64 58,64 58,76 46,76",properties:{tenderness:"★★★★☆",fat:"★★☆☆☆",collagen:"★☆☆☆☆"},cooking:"テリーヌ、パテ",science:"実質臓器。酸化が早く乳化処理が重要。",classification:"Charcuterie essential",logic:"Low heat / Emulsion",chef_note:"“単体より構造化して使う”。"},{id:"cut_pork_tongue",number:"8",type:"offal",name_fr:"Langue",name_en:"Tongue",name_ja:"タン",points:"22,70 32,70 32,84 22,84",properties:{tenderness:"★★★☆☆ → ★★★★★",fat:"★★★☆☆",collagen:"★★★★☆"},cooking:"煮込み、ゼリー寄せ",science:"筋＋結合組織の複合体。加熱で一体化する。",classification:"Abats nobles",logic:"Long cook / Gel setting",chef_note:"“煮ると一つの構造になる”。"},{id:"cut_pork_trotter",number:"9",type:"offal",name_fr:"Pied de porc",name_en:"Trotter",name_ja:"豚足",points:"38,88 50,88 50,98 38,98",properties:{tenderness:"★☆☆☆☆ → ★★★★★",fat:"★★★☆☆",collagen:"★★★★★"},cooking:"煮込み→焼き",science:"コラーゲン塊。ゼラチン→再加熱でテクスチャー分離。",classification:"Classic peasant cuisine",logic:"Very long cook + roast finish",chef_note:"“二段階変換で完成する部位”。"},{id:"cut_pork_intestine",number:"10",type:"offal",name_fr:"Boyaux",name_en:"Intestine",name_ja:"腸",points:"50,76 64,76 64,88 50,88",properties:{tenderness:"★★☆☆☆",fat:"★★★★☆",collagen:"★★★★☆"},cooking:"ソーセージ、加工",science:"平滑筋＋脂。香辛料と発酵で価値が決まる。",classification:"Charcuterie core material",logic:"Processed / Seasoned",chef_note:"“単体ではなく設計素材”。"}],ze=[{id:"cut_agneau_carre",number:"1",name_fr:"Carré d'agneau",name_en:"Rack of lamb",name_ja:"キャレ・ダニョー（骨付き背肉）",pin:{x:50,y:35},properties:{tenderness:"★★★★☆",fat:"★★★☆☆",collagen:"★★☆☆☆"},cooking:"ロティ（オーブン焼き）、グリル",science:"骨付きの肉は骨周辺からの穏やかな熱伝導により、肉汁の流出が少なく、しっとりとジューシーに仕上がります。",classification:"Rôti cut（ロースト用高級部位）",logic:"Medium-high heat / Bone-in roast",chef_note:"香草パン粉（persillade）をまぶして焼くのがクラシックな調理法。"},{id:"cut_agneau_gigot",number:"2",name_fr:"Gigot d'agneau",name_en:"Leg of lamb",name_ja:"ジゴ・ダニョー（もも肉）",pin:{x:75,y:48},properties:{tenderness:"★★★☆☆",fat:"★★☆☆☆",collagen:"★★★☆☆"},cooking:"丸ごとロースト、長時間ブレゼ（煮込み）",science:"大きな筋肉群であり、赤身の比率が高い。低温で時間をかけて中心まで熱を通すことで均一な仕上がりを目指します。",classification:"Roast cut / Braise cut",logic:"Low & slow roast or Braise",chef_note:"フランスの復活祭（Pâques）に欠かせない、家族で分かち合う伝統のロースト肉。"},{id:"cut_agneau_epaule",number:"3",name_fr:"Épaule d'agneau",name_en:"Lamb shoulder",name_ja:"エポール・ダニョー（肩肉）",pin:{x:28,y:42},properties:{tenderness:"★★★☆☆",fat:"★★★★☆",collagen:"★★★★☆"},cooking:"ナヴァラン（煮込み）、オーブン焼き（ロティ）",science:"コラーゲンと脂肪が豊富に絡み合う部位。熱が通るとゼラチン化し、ソースにとろみとコクを与えます。",classification:"Braise cut",logic:"Low heat / Long simmer",chef_note:"春野菜とラムを煮込む「Navarin d'agneau」の主役。"}],Ae=[{id:"cut_veau_ris",number:"1",name_fr:"Ris de veau",name_en:"Sweetbreads",name_ja:"リ・ド・ヴォー（胸腺肉）",pin:{x:30,y:55},properties:{tenderness:"★★★★★",fat:"★★★★☆",collagen:"★★☆☆☆"},cooking:"ポシェ後のムニエル、ブレゼ、ソテー",science:"仔牛の発育期にのみ発達する器官で、極めて柔らかな食感が特徴。エラスチンが少なく保水性に優れています。",classification:"Abats nobles（高級内臓肉）",logic:"Blanch / Press / Sauté crisp",chef_note:"塩水で血抜きをし、軽く茹でて膜を除き、プレスしてから粉をはたいてバターでカリッと焼き上げます。"},{id:"cut_veau_filet",number:"2",name_fr:"Filet de veau",name_en:"Veal tenderloin",name_ja:"フィレ・ド・ヴォー（ヒレ）",pin:{x:60,y:38},properties:{tenderness:"★★★★★",fat:"★☆☆☆☆",collagen:"★☆☆☆☆"},cooking:"ソテー、ポワレ、低温ロースト",science:"脂肪が極めて少なく水分が多い淡白な肉質。強火で一気に過加熱するとパサつくため、アロゼ（油を回しかける）で優しく火を入れます。",classification:"Premium steak cut",logic:"Gentle heat / Butter baste",chef_note:"フォンドヴォーにモリーユ茸の香りを乗せた濃厚なソースがベストマッチ。"},{id:"cut_veau_quasi",number:"3",name_fr:"Quasi de veau",name_en:"Veal rump",name_ja:"カジ・ド・ヴォー（お尻に近いもも肉）",pin:{x:75,y:45},properties:{tenderness:"★★★★☆",fat:"★★☆☆☆",collagen:"★★☆☆☆"},cooking:"ロティ（ロースト）、ポワレ",science:"きめ細やかな赤身肉で、ローストするのに最適な部位。適度に締まった繊維がジューシーな旨味を保持します。",classification:"Roast cut / Premium steak",logic:"Medium heat / Steady roast",chef_note:"ゆっくり塊のままローストし、ロゼ色に仕上げるのがシェフの技術の見せ所。"}],Me=[{id:"cut_magret_de_canard",number:"1",name_fr:"Magret de canard",name_en:"Duck breast (Fattened)",name_ja:"マグレ・ド・カナール（鴨胸肉）",pin:{x:45,y:48},properties:{tenderness:"★★★★☆",fat:"★★★★★",collagen:"★★☆☆☆"},cooking:"皮目からじっくりポワレ、ロティ",science:"フォアグラ用に肥育された鴨の胸肉。非常に厚い皮下脂肪を熱で溶かし（レンダリング）、その脂をかけながらロゼ（ミディアムレア）に仕上げます。",classification:"Volaille de prestige",logic:"Fat rendering / Medium-rare finish",chef_note:"皮目に格子状の切れ込みを入れ、冷たいフライパンから焼き始めることで効率よく脂を抜きます。"},{id:"cut_confit_de_canard",number:"2",name_fr:"Cuisse de canard (Confit)",name_en:"Duck leg (Confit)",name_ja:"キュイス・ド・カナール（もも肉コンフィ）",pin:{x:68,y:65},properties:{tenderness:"★★★★★",fat:"★★★★☆",collagen:"★★★★☆"},cooking:"コンフィ（低温の脂で煮込む）、焼き上げ",science:"筋繊維と結合組織が強いもも肉。鴨自身の脂（グレープシードやダックファット）の中で80〜90°Cで数時間煮ることで、コラーゲンが完全に溶け柔らかくなります。",classification:"Plat classique du Sud-Ouest",logic:"Low heat fat-poach / Crisp skin to finish",chef_note:"仕上げにオーブンやグリルで皮目をパリパリに焼き上げ、フォークで崩れる柔らかさを楽しみます。"},{id:"cut_foie_gras_canard",number:"3",name_fr:"Foie gras de canard",name_en:"Duck foie gras",name_ja:"フォアグラ・ド・カナール（鴨フォアグラ）",pin:{x:38,y:55},properties:{tenderness:"★★★★★",fat:"★★★★★",collagen:"☆☆☆☆☆"},cooking:"テリーヌ、ポワレ（ソテー）",science:"ほぼ100%が脂肪組織。急激な高温加熱で一気に脂が液化して流れ出すため、冷たい状態から表面を強火で短時間で焼き固め、中心は余熱で温めます。",classification:"Mets de fête（祝祭の高級食材）",logic:"Flash sear / Keep chilled before cooking",chef_note:"バルサミコや甘口のワイン（ソーテルヌなど）、イチジクの甘味ソースと完璧に調和します。"}],Pe=[{id:"cut_gibier_chevreuil",number:"1",name_fr:"Filet de chevreuil",name_en:"Venison loin (Roe deer)",name_ja:"フィレ・ド・シュヴルイユ（鹿ロース）",pin:{x:55,y:38},properties:{tenderness:"★★★★☆",fat:"★☆☆☆☆",collagen:"★★★☆☆"},cooking:"ロティ、ポワレ、ソース・ポワブラード",science:"野生の鹿は脂肪がほとんどない高タンパク赤身肉。加熱しすぎると肉質が引き締まり強固に硬化するため、芯温54°C前後のロゼを狙います。",classification:"Gibier de poil (毛のある野生獣肉)",logic:"Delicate roast / Rare to Medium-rare",chef_note:"黒コショウを効かせた赤ワインソース（Poivrade）や、野生の果実（ブルーベリーなど）の酸味を添えます。"},{id:"cut_gibier_gigue",number:"2",name_fr:"Gigue de chevreuil",name_en:"Haunch of venison (Leg)",name_ja:"ジグ・ド・シュヴルイユ（鹿もも・お尻）",pin:{x:75,y:50},properties:{tenderness:"★★★☆☆",fat:"★☆☆☆☆",collagen:"★★★★☆"},cooking:"シヴェ（赤ワイン煮込み）、長時間ロティ",science:"結合組織が多く、筋肉質な部位。酸味のある赤ワインやスパイスをブレンドした液でマリネし、繊維を軟化させてから煮込みます。",classification:"Gibier de poil",logic:"Acid marination / Low & slow braise",chef_note:"丸ごと焼き上げてクラシックな大皿料理にするか、細かく切ってポトフ風に煮込みます。"}],Be=[{id:"cut_gibier_sanglier",number:"1",name_fr:"Filet de sanglier",name_en:"Wild boar loin",name_ja:"フィレ・ド・サングリエ（猪ロース）",pin:{x:52,y:38},properties:{tenderness:"★★★★☆",fat:"★★☆☆☆",collagen:"★★★☆☆"},cooking:"ロティ、ソテー",science:"飼育豚に比べ、野生の猪肉は筋肉が引き締まり鉄分が豊富。脂質が少ない分、肉汁を閉じ込める焼き方が求められます。",classification:"Gibier de poil",logic:"Medium heat / Steady roast",chef_note:"豚肉に近い感覚で扱えますが、しっかり中まで熱を入れつつ（殺菌のため）、ジューシーさを残す火入れが必要です。"},{id:"cut_gibier_sanglier_epaule",number:"2",name_fr:"Épaule de sanglier",name_en:"Wild boar shoulder",name_ja:"エポール・ド・サングリエ（猪肩・首肉）",pin:{x:28,y:42},properties:{tenderness:"★★☆☆☆ → ★★★★★",fat:"★★★☆☆",collagen:"★★★★★"},cooking:"シヴェ・ド・サングリエ（赤ワインと血の煮込み）",science:"咀嚼や運動でよく使われる部位。コラーゲンが極めて多く、長時間の煮込みで溶け出し、赤ワインと肉の血（またはカカオ）で煮汁を乳化させ重厚なとろみをつけます。",classification:"Gibier classique de braisage",logic:"Very long cook / Red wine stew",chef_note:"冬のジビエの王道。濃厚なソースには栗（marron）のピューレが最も合います。"}],Fe=[{id:"cut_gibier_pigeon",number:"1",name_fr:"Suprême de pigeon",name_en:"Pigeon breast",name_ja:"シュプレーム・ド・ピジョン（鳩胸肉）",pin:{x:45,y:42},properties:{tenderness:"★★★★☆",fat:"★☆☆☆☆",collagen:"★★☆☆☆"},cooking:"ポワレ、ロティ（ロゼ仕立て）",science:"鳩の胸筋は鉄分（ミオグロビン）の塊。加熱しすぎるとレバーのような血生臭さとボソボソ感が出るため、芯温52〜54°Cのロゼに仕上げます。",classification:"Gibier de plume (羽のある野生鳥獣)",logic:"Flash sear / Precise rare cooking",chef_note:"皮をパリッと香ばしく焼き、中は均一なロゼ（Rosé）を保つのが職人の仕事。"},{id:"cut_gibier_pigeon_cuisse",number:"2",name_fr:"Cuisse de pigeon",name_en:"Pigeon leg",name_ja:"キュイス・ド・ピジョン（鳩もも肉）",pin:{x:65,y:55},properties:{tenderness:"★★★☆☆",fat:"★★☆☆☆",collagen:"★★★☆☆"},cooking:"コンフィ、グリル",science:"極めて小さく薄いもも肉。胸肉に比べて結合組織が多いため、コンフィにするか、しっかり焼いて皮目をクリスピーにします。",classification:"Gibier de plume",logic:"Confit or Crisp grill",chef_note:"胸肉の横に可愛らしく添えられることが多い。小さいながらも旨味は非常に濃い。"}],He=[{id:"cut_gibier_lievre",number:"1",name_fr:"Râble de lièvre",name_en:"Saddle of hare",name_ja:"ラーブル・ド・リエーヴル（野ウサギの背肉）",pin:{x:50,y:40},properties:{tenderness:"★★★★☆",fat:"★☆☆☆☆",collagen:"★★★☆☆"},cooking:"ロティ、ソテー、ソース・ポワブラード",science:"家ウサギ（Lapin）に比べて野ウサギ（Lièvre）は肉質が赤黒く、野性味が強い。背肉は一番柔らかい中心部位です。",classification:"Gibier de poil",logic:"Short cook / Roast medium",chef_note:"フランス料理で最も高貴とされるジビエの一つ。「Lièvre à la Royale（ウサギのロワイヤル）」は宮廷料理の流れを汲む伝説の一皿。"}],Ne=[{id:"cut_kokotxa_de_merlu",number:"1",name_fr:"Kokotxa de merlu",name_en:"Hake Kokotxa (jaw meat)",name_ja:"ココチャ（メルルーサの顎肉）",pin:{x:25,y:52},properties:{tenderness:"★★★★★",fat:"★★☆☆☆",collagen:"★★★★★"},cooking:"ピルピル乳化（Pil-pil）、ポシェ",science:"魚の頭部下にある最も動かす筋肉かつゼラチンの宝庫。熱を加えることで豊富な天然コラーゲンが容易に溶け出し、油と水分を結合させます。",classification:"Spécialité basque (バスク特産高級部位)",logic:"Low heat / Emulsification",chef_note:"オリーブ油の中で弱火で揺すり、魚から出たゼラチンだけで完全に乳化させて白い極上ソースを作ります。"},{id:"cut_fish_fillet",number:"2",name_fr:"Filet de poisson",name_en:"Fish Fillet",name_ja:"フィレ（魚の切り身）",pin:{x:55,y:48},properties:{tenderness:"★★★★☆",fat:"★☆☆☆☆",collagen:"★☆☆☆☆"},cooking:"ソテー、ポワレ、蒸し（Vapeur）",science:"赤身および白身の筋肉繊維。陸上動物に比べて結合組織（コラーゲン）が非常に少ないため、短時間の精密な加熱が必須です。火が通り過ぎると一瞬でボソボソになります。",classification:"Poisson de fond (底生魚・白身)",logic:"Short cook / High-precision heat",chef_note:"皮目はクッキングペーパーでしっかりと水分を除き、フライパンに押し当てるようにしてパリパリに、身はしっとりと仕上げます。"},{id:"cut_fish_sole",number:"3",name_fr:"Sole",name_en:"Dover Sole",name_ja:"ソール（舌平目）",pin:{x:45,y:40},properties:{tenderness:"★★★★☆",fat:"★☆☆☆☆",collagen:"★★☆☆☆"},cooking:"ムニエル（Meunière）、ソール・ノルマンド",science:"ヒラメ類特有の引き締まった細かな繊維質。上品なゼラチン質を含み、クラシックなムニエルにすると小麦粉がバターを吸って最高のテクスチャーになります。",classification:"Poisson plat (平らな魚の代表)",logic:"Butter pan-fry (Meunière)",chef_note:"皮を剥ぎ、バター（Beurre noisette）をスプーンで何度も身にかけながら香ばしく焼き上げます。"},{id:"cut_fish_turbot",number:"4",name_fr:"Turbot",name_en:"Turbot",name_ja:"テュルボ（イシビラメ）",pin:{x:68,y:42},properties:{tenderness:"★★★★★",fat:"★★☆☆☆",collagen:"★★★☆☆"},cooking:"ポシェ、オーブン焼き（Rôti）、白ワインソース",science:"白身魚の王様。骨の周囲に極上のコラーゲンを含み、骨付きのまま調理（ポシェやロティ）することで、崩れやすい白身をしっとり保護し旨味を凝集させます。",classification:"Poisson plat de prestige",logic:"Poach or Bone-in roast",chef_note:"ソース・アルベール（ソース・シュプレームにマスタード等を加えたもの）やシャンパンソースが相性抜群。"}],Re=[{id:"cut_crustace_homard",number:"1",name_fr:"Homard bleu",name_en:"Blue lobster",name_ja:"オマール・ブルー（ロブスター）",pin:{x:50,y:55},properties:{tenderness:"★★★★☆",fat:"★☆☆☆☆",collagen:"★★☆☆☆"},cooking:"ポシェ、ロティ、ソース・アメリケーヌ",science:"甲殻類特有の太い筋繊維。加熱温度が70°Cを超えるとタンパク質が急激に収縮してゴム状の食感になるため、殻付きで焼くか、優しくポシェします。殻に含まれるアスタキサンチンは脂溶性で、ソース・アメリケーヌの鮮やかな赤と香りを引き出します。",classification:"Crustacé noble",logic:"Shell-on cooking / Gentle poach",chef_note:"「Homard à l'Américaine（オマールのアメリカ風）」は殻やミソを余すことなく煮出してソースを作る宮廷料理。"},{id:"cut_crustace_langoustine",number:"2",name_fr:"Langoustine",name_en:"Scampi / Dublin Bay prawn",name_ja:"ラングスティーヌ（赤座海老）",pin:{x:35,y:58},properties:{tenderness:"★★★★★",fat:"★☆☆☆☆",collagen:"★☆☆☆☆"},cooking:"ソテー、ポシェ、フリット",science:"オマールよりさらにデリケートで水分量が多い身。加熱時間は数秒〜1分程度にとどめ、中心部に生っぽさ（半透明の状態）を残すことで究極の甘みと滑らかさを表現します。",classification:"Crustacé délicat",logic:"Flash sear / Keep translucent",chef_note:"冷たいバターでアロゼしながらソテーすると、海老の甘みが引き立ちます。"}],De=[{id:"cut_coquillage_huitre",number:"1",name_fr:"Huître",name_en:"Oyster",name_ja:"ユイットル（生牡蠣、グラタン）",pin:{x:45,y:65},properties:{tenderness:"★★★★★",fat:"★☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"生食（Cru）、サバイヨンソースのグラタン",science:"生のままだとグリコーゲンの甘みと海水塩分を楽しめます。温める場合は、サバイヨンソースをかけてオーブン上火で一瞬グラタンにし、タンパク質が硬化する前に取り出します。",classification:"Coquillages par excellence",logic:"Raw or Flash-gratinated",chef_note:"シャロットを細かく刻んだヴィネグレット（Mignonette）ソースとライ麦パンを添えるのが伝統。"},{id:"cut_coquillage_saint_jacques",number:"2",name_fr:"Coquille Saint-Jacques",name_en:"Sea scallop",name_ja:"コキーユ・サンジャック（ホタテ貝柱）",pin:{x:55,y:62},properties:{tenderness:"★★★★★",fat:"★☆☆☆☆",collagen:"★☆☆☆☆"},cooking:"両面を強火で短時間ポワレ、タルタル",science:"貝柱は速筋繊維（ほぼ純粋なタンパク質）。熱を加えるとすぐに縮んで水分が絞り出されてしまうため、片面を強火で数十秒キャラメリゼし、裏は一瞬当てる程度で中は人肌のロゼにします。",classification:"Coquillage haut de gamme",logic:"High-heat sear / Translucent center",chef_note:"バターの焦がし具合と塩のあて方がすべて。コーラル（卵巣）はムースやソースのベースに使います。"}],Ie=[{id:"cut_mollusque_calamar",number:"1",name_fr:"Calamar / Encornet",name_en:"Squid",name_ja:"カラマール / アンコルネ（イカ）",pin:{x:50,y:72},properties:{tenderness:"★★★☆☆",fat:"★☆☆☆☆",collagen:"★★★★☆"},cooking:"ソテー、ファルシ（詰め物）、イカ墨煮込み",science:"イカやタコの外套膜はコラーゲンが格子状に高密度で走っています。加熱時間は「数秒の超短時間」か「数時間の長時間」の二者択一。中間だとタンパク質が完全に収縮しゴムのように硬くなります。",classification:"Céphalopode",logic:"Flash cook (Sauté) or Very long braise",chef_note:"表面に細かく包丁を入れて熱による丸まりを防ぎ、強火でサッと炒めてレモンとオリーブ油で合わせます。"}],Ge=[{id:"ing_camembert",number:"1",name_fr:"Camembert de Normandie",name_en:"Camembert (Normandy)",name_ja:"カマンベール・ド・ノルマンディー",pin:{x:35,y:45},properties:{tenderness:"★★★★★",fat:"★★★★☆",collagen:"☆☆☆☆☆"},cooking:"そのまま、焼きカマンベール（Camembert au four）",science:"表面の白カビ（Penicillium camemberti）が分泌するプロテアーゼ（タンパク質分解酵素）により、カゼインが分解され、中心部に向かって徐々に柔らかくクリーミーな状態へと熟成が進みます。",classification:"Fromage à pâte molle à croûte fleurie（白カビソフトタイプ）",logic:"AOP Protected / Raw milk product",chef_note:"冷蔵庫から食べる1時間前には出し、室温に戻しておくことで、独特の芳醇な香りと滑らかなテクスチャーが最大限に引き出されます。"},{id:"ing_roquefort",number:"2",name_fr:"Roquefort",name_en:"Roquefort (Blue cheese)",name_ja:"ロックフォール",pin:{x:50,y:55},properties:{tenderness:"★★★★☆",fat:"★★★★★",collagen:"☆☆☆☆☆"},cooking:"そのまま、ステーキソース（Sauce Roquefort）、サラダのトッピング",science:"ラコーヌ種の羊乳から作られ、コンバルー山の自然洞窟内に生息する青カビ（Penicillium roqueforti）によって熟成されます。青カビが生み出すリパーゼが脂肪を脂肪酸に分解し、特有の強い刺激臭とコクを生みます。",classification:"Fromage à pâte persillée（青カビタイプ）",logic:"AOP Protected / Sheep's milk cheese",chef_note:"甘口貴腐ワインのソーテルヌ（Sauternes）と合わせるのが、古典フランス料理における最高の“マリアージュ”（Mariage）です。"},{id:"ing_comte",number:"3",name_fr:"Comté",name_en:"Comté",name_ja:"コンテ",pin:{x:65,y:42},properties:{tenderness:"★★★☆☆",fat:"★★★★☆",collagen:"☆☆☆☆☆"},cooking:"そのまま、チーズフォンデュ、シュー生地（Gougère）",science:"牛乳を加熱圧搾して水分を抜き、長期間（4ヶ月から36ヶ月以上）熟成させた硬質チーズ。熟成に伴いタンパク質が分解され、アミノ酸結晶（主にチロシン）が生じ、噛むとジャリッとした食感と濃厚な旨味が広がります。",classification:"Fromage à pâte pressée cuite（加熱圧搾硬質タイプ）",logic:"AOP Protected / Long maturation",chef_note:"熟成月数（12ヶ月、24ヶ月など）によりナッツ、栗、ドライフルーツなど劇的に香りが変化します。削ってグラタンの焼き色をつけるのにも最適。"},{id:"ing_chevre",number:"4",name_fr:"Sainte-Maure de Touraine",name_en:"Goat Cheese (Sainte-Maure)",name_ja:"サント・モール・ド・トゥーレーヌ（山羊乳チーズ）",pin:{x:42,y:62},properties:{tenderness:"★★★★☆",fat:"★★★☆☆",collagen:"☆☆☆☆☆"},cooking:"そのまま、サラダ・ド・シェーヴル・ショー（温製サラダ）",science:"山羊乳（Lait de chèvre）で作られるチーズ。中央に1本の麦わらが通されており、崩れやすい脆い組織を補強するとともに、内部の酸素供給を助けます。表面には木炭粉がまぶされ、酸度を調整し、カビの繁殖を促します。",classification:"Fromage de chèvre（山羊乳タイプ）",logic:"AOP Protected / Ash-coated",chef_note:"バゲットスライスに乗せてオーブンで軽く焼き、ハチミツをかけてサラダに乗せるのが定番ビストロ料理。"}],Ve=[{id:"ing_vin_rouge",number:"1",name_fr:"Vin rouge",name_en:"Red Wine",name_ja:"ヴァン・ルージュ（赤ワイン）",pin:{x:45,y:35},properties:{tenderness:"☆☆☆☆☆",fat:"☆☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"赤ワインソース、デグラサージュ、マリネ液、煮込み（ボルドレーズ、ブルギニョン）",science:"ブドウの果皮や種子を一緒に発酵させるため、ポリフェノール化合物（タンニン）が多く溶け込んでいます。タンニンが肉のタンパク質と結合して凝集するため、口の中の脂っぽさを引き締め、肉質を柔らかく感じさせます。",classification:"Ingrédient liquide aromatique",logic:"Deglazing / Meat tenderizer / Color agent",chef_note:"料理に使うワインは「飲むのと同じ品質のもの」を使うこと。酸味と渋みが加熱で凝縮されるため、安物の粗悪なワインは仕上がりを壊します。"},{id:"ing_vin_blanc",number:"2",name_fr:"Vin blanc",name_en:"White Wine",name_ja:"ヴァン・ブラン（白ワイン）",pin:{x:55,y:35},properties:{tenderness:"☆☆☆☆☆",fat:"☆☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"白ワインソース、魚のポシェ（コルトン・ブイヨン）、デグラサージュ",science:"ブドウをすぐに搾汁し皮などを除いて発酵させるため、タンニンは少なく、リンゴ酸や酒石酸などの豊かな有機酸が主体です。この酸が魚介の生臭さ成分（アミン）を中和し、すっきりとした爽やかさと旨味を与えます。",classification:"Ingrédient liquide aromatique",logic:"Deglazing / Acidity balancer",chef_note:"エシャロット、キノコをバターで炒めたフライパンを白ワインでデグラセし、煮詰めてクリームを加えるだけで、クラシックな万能ソースが完成します。"},{id:"ing_champagne",number:"3",name_fr:"Champagne",name_en:"Champagne",name_ja:"シャンパン",pin:{x:50,y:25},properties:{tenderness:"☆☆☆☆☆",fat:"☆☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"シャンパンソース、アペリティフ",science:"瓶内二次発酵により二酸化炭素（炭酸）を溶け込ませたスパークリングワイン。酵母の自己融解によるアミノ酸（旨味成分）が豊富で、白ワインベースのソースよりもさらに深みと華やかな風味をソースに与えます。",classification:"AOC Champagne de prestige",logic:"Maturation flavors / Carbonic acidity",chef_note:"シャンパンの泡自体はソースを煮詰める過程で消失しますが、アミノ酸の香りとコク、きめ細かな酸味が最高級の魚介ソースに変化します。"}],Oe=[{id:"ing_oignon",number:"1",name_fr:"Oignon",name_en:"Onion",name_ja:"オニョン（玉ねぎ）",pin:{x:32,y:48},properties:{tenderness:"★★★☆☆",fat:"☆☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"シズレ（みじん切り）、スライス、長時間炒めてキャラメリゼ",science:"生の玉ねぎには刺激臭成分（アリシンなどの硫黄化合物）が含まれますが、加熱すると熱分解されて甘味成分（プロピルメルプタンなど）に変わり、砂糖の数十倍の甘みを感じるようになります。また、アミノ酸と糖が反応する「メイラード反応」により、ソースの深い褐色（フォン）とコクを作ります。",classification:"Garniture aromatique de base",logic:"Sueur (sweating) / Maturation / Color base",chef_note:"玉ねぎ、人参、セロリを炒めたものは「Mirepoix（ミルポワ）」と呼ばれ、ほぼすべてのフレンチソースの出汁のベースになります。"},{id:"ing_echalote",number:"2",name_fr:"Échalote",name_en:"Shallot",name_ja:"エシャロット",pin:{x:45,y:55},properties:{tenderness:"★★★★☆",fat:"☆☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"シズレ、ソースのベース（ベアルネーズ、ボルドレーズ）",science:"玉ねぎよりも水分が少なく、硫黄化合物の質が非常にデリケート。強い熱で焦がすと一気に苦味が出るため、バターで優しく汗をかかせる（Suer）ことで、上品な甘みとニンニクに似た官能的な香りをソースに溶かし込みます。",classification:"Garniture aromatique premium",logic:"Suer (gentle sweating) / Emulsion aid",chef_note:"フランス料理のソースの成否は「シャロットをいかに細かく美しく刻むか（Ciseler）」に掛かっていると言っても過言ではありません。"},{id:"ing_carotte",number:"3",name_fr:"Carotte",name_en:"Carrot",name_ja:"キャロット（人参）",pin:{x:58,y:45},properties:{tenderness:"★★★☆☆",fat:"☆☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"ジュリエンヌ（千切り）、ヴィシー風（輪切りバターグラッセ）",science:"オレンジ色の色素は油に溶けやすい「β-カロテン」。バターやバターオイル（Clarified butter）でじっくり炒めることで、色素と香気成分がバターに移り、ソースの仕上がりを鮮やかに美しく引き立てます。また、ペクチンを含み、煮込むことで甘みと適度なとろみを与えます。",classification:"Garniture aromatique / Légume d'accompagnement",logic:"Sweating in butter / Glace (glazing)",chef_note:"「Carottes à la Vichy（人参のヴィシー風）」は、ミネラルウォーター、バター、砂糖で水分がなくなるまで煮詰めて人参自身の糖分で艶（Glace）を出す古典的付け合わせ。"},{id:"ing_poireau",number:"4",name_fr:"Poireau",name_en:"Leek",name_ja:"ポワロー（リーキ・西洋ネギ）",pin:{x:25,y:35},properties:{tenderness:"★★★★☆",fat:"☆☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"ブイヨン用（緑葉部）、バター蒸し煮（白い軟白部）",science:"白い茎の部分には可溶性ペクチンと糖質が極めて豊富に含まれており、バターでじっくり低温加熱（Étuver）すると、とろけるような滑らかなテクスチャーに変わり、濃厚な旨味ソースのような役割を果たします。緑の部分はブーケガルニやブイヨンの香りづけに使います。",classification:"Garniture aromatique / Bouquet garni core",logic:"Étuver (stewing in own juices) / Long simmer",chef_note:"じゃがいもとポワローをベースにした冷たいスープ「Vichyssoise（ヴィシソワーズ）」は夏のクラシック。"},{id:"ing_pomme_de_terre",number:"5",name_fr:"Pomme de terre",name_en:"Potato",name_ja:"ポム・ド・テール（じゃがいも）",pin:{x:72,y:55},properties:{tenderness:"★★★☆☆",fat:"☆☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"ピューレ（Purée）、フリット、ポム・デュシェス",science:"アミロースとアミロペクチン（澱粉）が主体。茹でて裏ごしし、冷たいバターを大量に練り込むことで、澱粉の粒子を乳化したバターの脂肪分がコーティングし、極めて滑らかでシルキーなピューレが完成します（有名なジョエル・ロブションのレシピ）。過剰に練りすぎると澱粉の粘り（グルテン様）が出てベタつきます。",classification:"Féculent（澱粉質食材・主食添え）",logic:"Maturation / Starch gelatinization / Butter emulsion",chef_note:"裏ごしには必ず「タミ（粉ふるい）」を使い、絶対にブレンダーを使ってはいけません（ベタベタの糊になってしまいます）。"},{id:"ing_celeri",number:"6",name_fr:"Céleri branche",name_en:"Celery stalk",name_ja:"セロリ（枝セロリ）",pin:{x:50,y:32},properties:{tenderness:"★★☆☆☆",fat:"☆☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"ミルポワ（出汁用みじん切り）、ブイヨン",science:"アピインなどの独特な揮発性香気成分が豊富。肉のアルカリ性生臭み成分を打ち消すマスキング効果が非常に強く、牛や鶏のフォン（出汁）をとる際には必要不可欠な香気素材です。",classification:"Garniture aromatique de base",logic:"Masking odor / Simmer extraction",chef_note:"強い筋があるため、付け合わせに使う場合はピーラーで表面を厚めに剥き、ブイヨンで柔らかく煮含めます。"},{id:"ing_ail",number:"7",name_fr:"Ail",name_en:"Garlic",name_ja:"アイ（にんにく）",pin:{x:42,y:65},properties:{tenderness:"★★★★★",fat:"☆☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"アシェ（みじん切り）、潰してオイルに香りを移す、丸ごとロースト",science:"にんにくの細胞が破壊されると、酵素アリシナーゼが作動して強烈な香り成分アリシンが生成されます。これをオリーブ油などの油脂に移し、ゆっくり加熱することで、香りがオイル全体に拡散し料理のベースを作ります。焦げやすく、焦げると強い苦味が出ます。",classification:"Condiment aromatique",logic:"Oil infusion / Infimul minimal coloring",chef_note:"香りを優しく出したい時は皮付きのまま潰して（Ail en chemise）フライパンに入れ、強く出したい時は芯の芽を除いて微塵切りにします。"}],We=[{id:"ing_thym",number:"1",name_fr:"Thym",name_en:"Thyme",name_ja:"タイム",pin:{x:35,y:48},properties:{tenderness:"★☆☆☆☆",fat:"☆☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"ブーケガルニ、ロティの香り付け、マリネ",science:"チモールを主成分とする精油を多く含み、強力な抗菌・防腐・抗酸化作用を持ちます。熱に非常に強く、長時間（数時間）煮込んでも香りが壊れにくいため、煮込み料理やスープのベース出汁（フォン）に最初に投入されます。",classification:"Herbe aromatique résistante",logic:"Maturation / Simmer extraction",chef_note:"ローリエ、パセリの茎とともに糸で縛り、「Bouquet garni（ブーケガルニ）」として鍋に投入するのがフランス料理の不変のルールです。"},{id:"ing_romarin",number:"2",name_fr:"Romarin",name_en:"Rosemary",name_ja:"ローズマリー",pin:{x:48,y:42},properties:{tenderness:"★☆☆☆☆",fat:"☆☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"ラム肉・豚肉・じゃがいものロースト、グリル",science:"ボルネオールやシネオールを含み、極めて力強く浸透性の高いウッディな香りが特徴。肉の野生的な脂肪臭をシャープに中和します。熱に強く、オイルに香りが非常に移りやすいため、アロゼ（オイルを回しかける）の際に肉の上に乗せて使います。",classification:"Herbe aromatique forte",logic:"Oil infusion / High-heat roasting",chef_note:"香りが非常に強いため、使いすぎるとすべての食材がローズマリーの香りで塗りつぶされてしまうので注意が必要です。"},{id:"ing_persil",number:"3",name_fr:"Persil plat",name_en:"Flat-leaf Parsley",name_ja:"ペルシ・プラ（イタリアンパセリ）",pin:{x:62,y:55},properties:{tenderness:"★★★★☆",fat:"☆☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"アシェ（仕上げの散らし）、茎はブーケガルニ、ソース・ペルシヤード",science:"アピオールという爽やかな精油成分を含み、料理の重たさをリフレッシュする効果があります。葉の香りは熱に弱いため、必ず火を止めた直後や仕上げ（アシェ）に加えます。逆に茎は旨味成分（グルタミン酸など）と不揮発性芳香を含み、出汁のベースとして優秀です。",classification:"Herbe de finition / Garniture de base",logic:"Cold garnish / Finely chopped / Simmer (stem)",chef_note:"刻んだパセリとにんにくを合わせた「Persillade（ペルシヤード）」は、カエルの足（Grenouilles）や貝のソテーに欠かせない芳香の調味料です。"},{id:"ing_laurier",number:"4",name_fr:"Laurier",name_en:"Bay leaf",name_ja:"ローリエ（月桂樹）",pin:{x:28,y:38},properties:{tenderness:"★☆☆☆☆",fat:"☆☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"ソース・ベシャメル、トマト煮込み、ブイヨン",science:"シネオールが主成分。乾燥させることで苦味が抜け、芳醇で甘やかなウッディ香が前面に出ます。煮汁の中に徐々に溶け出して浸透するため、最初からスープに加えて加熱します。肉のタンパク質臭を包み込むマスキング効果が高いです。",classification:"Herbe de braisage / Bouquet garni core",logic:"Slow water-extraction",chef_note:"使用する前に葉の表面を軽く折り曲げて傷をつけることで、葉の中の油細胞が破壊され、煮汁に香りが溶け出しやすくなります。"},{id:"ing_estragon",number:"5",name_fr:"Estragon",name_en:"Tarragon",name_ja:"エストラゴン",pin:{x:52,y:62},properties:{tenderness:"★★★★★",fat:"☆☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"ソース・ベアルネーズ、鶏肉のエストラゴン煮込み",science:"アネトールを含み、アニス（アニスシード）や甘草に似た特有の甘くスパイシーな芳香を持ちます。「ハーブの女王」とも称され、酢や白ワインに香りを移すことで、まろやかで奥深い酸味をソースに与えます。",classification:"Herbe fine de prestige",logic:"Acid infusion / Vinegar steep / Emulsion flavor",chef_note:"エストラゴンを効かせた酢と卵黄、澄ましバターを乳化させた「Sauce Béarnaise（ベアルネーズ）」はステーキの最高峰パートナー。"}],Ke=[{id:"ing_muscade",number:"1",name_fr:"Noix de muscade",name_en:"Nutmeg",name_ja:"ノワ・ド・ミュスカド（ナツメグ）",pin:{x:45,y:25},properties:{tenderness:"★☆☆☆☆",fat:"☆☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"ソース・ベシャメル、ポテトピューレ、キッシュの卵液（Appareil）",science:"ミリスチシンやエレミシンなどの強い甘い芳香成分を含みます。牛乳や生クリーム、卵などのアルカリ性の加熱臭（いわゆるコケ臭・生臭さ）を非常に効率よく中和し、すっきりとした上品なコクと甘い香りをプラスします。",classification:"Épice de base en laiterie",logic:"Dairy masking / Grated fresh",chef_note:"粉末で売られているものではなく、必ず丸ごとの実を「おろし金」で調理の直前にその場で削り入れます。香りの鮮度がまったく違います。"},{id:"ing_poivre_noir",number:"2",name_fr:"Poivre noir",name_en:"Black Pepper",name_ja:"ポワヴル・ノワール（黒コショウ）",pin:{x:55,y:25},properties:{tenderness:"★☆☆☆☆",fat:"☆☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"肉料理の味付け、ポワヴラードソース、ソースの仕上げ",science:"ピペリンという辛み成分が主体で、唾液や胃液の分泌を促し消化を助けます。また、ピネンなどの揮発性のウッディな香気も含み、加熱しすぎると香りが飛び辛みだけが残るため、香りを楽しみたい場合は「仕上げに粗挽き」が鉄則です。",classification:"Condiment universel",logic:"Finish spice / Digestif / Fragrance agent",chef_note:"「Steak au poivre（ペッパーステーキ）」では、ステーキの表面を粗挽きの黒胡椒で埋め尽くすようにして香ばしく焼き、ブランデーと生クリームで仕上げます。"}],Qe=[{id:"ing_pomme",number:"1",name_fr:"Pomme",name_en:"Apple",name_ja:"ポム（リンゴ）",pin:{x:30,y:48},properties:{tenderness:"★★★☆☆",fat:"☆☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"タルトタタン（Tatin）、焼きリンゴ、豚肉・鴨肉のロースト添え、ノルマンディー風煮込み",science:"リンゴには果糖、有機酸（リンゴ酸）、そして多量の「ペクチン」（食物繊維）が含まれています。加熱することでペクチンが細胞壁から溶け出して熱分解され、バターや肉汁の水分を抱え込んでソースを乳化・安定させ、自然で濃厚なとろみと甘みを与えます。",classification:"Fruit de base en pâtisserie / cuisine",logic:"Caramelization / Pectin gelation / Acid balancing",chef_note:"カルヴァドス（リンゴのブランデー）でフランベした豚肉に、リンゴのソテーを合わせるのはノルマンディー地方の王道ペアリング。"},{id:"ing_citron",number:"2",name_fr:"Citron",name_en:"Lemon",name_ja:"シトロン（レモン）",pin:{x:42,y:55},properties:{tenderness:"★★★★★",fat:"☆☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"ソースの仕上げ（酸味付け）、ソース・オランデーズ、魚介のポワレ添え",science:"クエン酸が豊富でpHが約2と極めて強酸性。この酸が魚臭さの主因であるアミン類（アルカリ性）と塩を形成して揮発を防ぎ、生臭さを完全に消し去ります。また、加熱調理の仕上げに一滴加えるだけで、鈍重になりがちなバターソースを一気に軽やかに引き締めます。",classification:"Correcteur d'acidité / Condiment essentiel",logic:"Aromatics / PH control / Deodorizer",chef_note:"皮の黄色の部分（Zeste）にはリモネンという香り高い精油が詰まっています。白い綿の部分は強い苦味があるため、絶対に削り落として使います。"},{id:"ing_figue",number:"3",name_fr:"Figue",name_en:"Fig",name_ja:"フィグ（イチジク）",pin:{x:55,y:58},properties:{tenderness:"★★★★★",fat:"☆☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"フォアグラのポワレ添え、コンフィチュール、ジビエの付け合わせ",science:"イチジクの甘み（ショ糖・果糖）とねっとりした食感は、フォアグラやジビエの極めて濃厚な脂や強い血の風味を口の中でマスキングし、まろやかに調和（Mariage）させます。果実に含まれるタンパク質分解酵素フィシンは、肉を一緒に漬け込むことで軟化させる作用もあります。",classification:"Liaison sucrée-salée (甘じょっぱい調和素材)",logic:"Enzymatic tenderizing / Sugar glaze",chef_note:"赤ワインとハチミツ、シナモンでイチジクをコトコト煮詰めたコンポートは、フォアグラのパテに添える定番。"}],Je=[{id:"ing_cepe",number:"1",name_fr:"Cèpe",name_en:"Porcini / Cep",name_ja:"セープ（ヤマドリタケ・ポルチーニ）",pin:{x:38,y:35},properties:{tenderness:"★★★★☆",fat:"☆☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"ソテー（塩コショウ・にんにく・パセリ）、オムレツ、スープ、ソース",science:"グルタミン酸（アミノ酸）とグアニル酸（核酸）の両方を豊富に含み、噛むことで口の中で相乗効果による爆発的な旨味を生み出します。乾燥させることで水分が抜け、細胞壁が壊れてグアニル酸が数十倍に激増し、戻し汁は濃厚な旨味出汁となります。",classification:"Champignon sauvage noble",logic:"Dry concentration / Umami synergy",chef_note:"「Cèpes à la Bordelaise（ボルドー風セープソテー）」は、エシャロット、パセリ、パン粉をまぶして強火でサッと炒める秋の風物詩料理。"},{id:"ing_morille",number:"2",name_fr:"Morille",name_en:"Morel",name_ja:"モリーユ（アミガサタケ）",pin:{x:50,y:32},properties:{tenderness:"★★★★★",fat:"☆☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"クリーム煮（Sauce aux morilles）、鶏肉のジュ・クリームソース",science:"モリーユは傘が網の目状のハニカム構造になっており、この凹凸が粘度のあるクリームソースを物理的に大量に絡め取ります。加熱することで独特のナッツのような香ばしさと土の香りが引き立ち、動物性の生クリームのコクと完璧に融合します。",classification:"Champignon de printemps de prestige",logic:"Cream affinity / Capillary sauce retention",chef_note:"生は微量の毒性（ヒドラジン）があるため、必ずしっかり加熱して食べます。乾燥モリーユを戻して生クリームで煮詰めると究極のソースになります。"},{id:"ing_truffe",number:"3",name_fr:"Truffe noire",name_en:"Black Truffle",name_ja:"トリュフ（黒トリュフ）",pin:{x:62,y:35},properties:{tenderness:"★★★★★",fat:"☆☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"スライスして仕上げに乗せる、バターや卵に香りを吸着させる",science:"トリュフの香りの正体は、ジメチルスルフィドなどの高揮発性の芳香族化合物です。この香りは「脂溶性」が極めて高く、バター、クリーム、卵黄などの脂質に非常によく吸着します。加熱しすぎると香りが揮発してすべて逃げてしまうため、火を止めた料理の上に薄くスライスして散らします。",classification:"Diamant noir de la cuisine",logic:"Lipophilic infusion / Heat-sensitive aromatics",chef_note:"密閉容器の中に生卵とトリュフを一緒に入れて数日冷蔵庫に置いておくと、殻の気孔を通して卵黄にトリュフの香りが完璧に移り、絶品のオムレツが作れます。"}];function Ue(e){const o=document.createElement("div");o.className="meat-section-container";const r=document.createElement("div");r.className="meat-type-tabs",r.innerHTML=`
    <button class="meat-tab-btn active" data-category="primary">🥩 主要食肉</button>
    <button class="meat-tab-btn" data-category="livestock">🍖 家畜肉</button>
    <button class="meat-tab-btn" data-category="game">🦌 ジビエ</button>
    <button class="meat-tab-btn" data-category="seafood">🐟 魚介類</button>
    <button class="meat-tab-btn" data-category="cheese_wine">🧀 チーズ/ワイン</button>
    <button class="meat-tab-btn" data-category="vegetables">🥦 野菜</button>
    <button class="meat-tab-btn" data-category="herbs_spices">🌿 ハーブ/スパイス</button>
    <button class="meat-tab-btn" data-category="fruits_mushrooms">🍄 果物/きのこ</button>
  `,o.appendChild(r);const a=document.createElement("div");a.className="meat-type-tabs",a.style.marginTop="0.5rem",a.style.borderBottom="none",o.appendChild(a);const n=document.createElement("div");n.className="meat-display-area",o.appendChild(n),e.appendChild(o);const i={primary:{title:"主要食肉 (Primary Meats)",subCategories:[{key:"beef",label:"🐂 Bœuf (牛)",cuts:$e,img:"assets/beef_cuts.png",placeholder:"Coupe+de+Boeuf",pdf:"beef_maff_guide.pdf",pdfText:"📄 日本農水省 牛肉部位基準 (PDF)"},{key:"porc",label:"🐖 Porc (豚)",cuts:Te,img:"assets/porc_cuts.png",placeholder:"Coupe+de+Porc",pdf:"pork_maff_guide.pdf",pdfText:"📄 日本農水省 豚肉部位基準 (PDF)",quote:'"Tout est bon dans le cochon" (豚はすべてが使える食材である)'},{key:"volaille",label:"🐓 Volaille (鶏)",cuts:Ee,img:"assets/poultry_cuts.png",placeholder:"Coupe+de+Volaille",pdf:"poultry_maff_guide.pdf",pdfText:"📄 日本農水省 鶏肉部位基準 (PDF)",quote:'"La volaille est la reine des cuisines et la directrice des banquets" (鶏肉は厨房の女王であり、宴の演出家である)'}]},livestock:{title:"その他の家畜肉 (Other Livestock)",subCategories:[{key:"agneau",label:"🐏 Agneau (羊)",cuts:ze,img:"assets/agneau_cuts.png",placeholder:"Agneau"},{key:"veau",label:"🐂 Veau (仔牛)",cuts:Ae,img:"assets/veal_cuts.png",placeholder:"Veau"},{key:"canard",label:"🦆 Canard (鴨)",cuts:Me,img:"assets/canard_cuts.png",placeholder:"Canard"}]},game:{title:"ジビエ (Game Meats)",subCategories:[{key:"chevreuil",label:"🦌 Chevreuil (鹿)",cuts:Pe,img:"assets/game_cuts.png",placeholder:"Chevreuil"},{key:"sanglier",label:"🐗 Sanglier (猪)",cuts:Be,img:"assets/game_cuts.png",placeholder:"Sanglier"},{key:"pigeon",label:"🕊️ Pigeon (鳩)",cuts:Fe,img:"assets/game_cuts.png",placeholder:"Pigeon"},{key:"lievre",label:"🐇 Lièvre (野ウサギ)",cuts:He,img:"assets/game_cuts.png",placeholder:"Lievre"}]},seafood:{title:"魚介類 (Seafood)",subCategories:[{key:"poisson",label:"🐟 Poisson (魚)",cuts:Ne,img:"assets/seafood_cuts.png",placeholder:"Poisson"},{key:"crustaces",label:"🦞 Crustacés (甲殻類)",cuts:Re,img:"assets/seafood_cuts.png",placeholder:"Crustaces"},{key:"coquillages",label:"🐚 Coquillages (貝類)",cuts:De,img:"assets/seafood_cuts.png",placeholder:"Coquillages"},{key:"mollusques",label:"🐙 Mollusques (軟体類)",cuts:Ie,img:"assets/seafood_cuts.png",placeholder:"Mollusques"}]},cheese_wine:{title:"チーズ・ワイン (Cheese & Wine)",subCategories:[{key:"fromages",label:"🧀 Fromages (チーズ)",cuts:Ge,img:"assets/cheese_wine.png",placeholder:"Fromages"},{key:"vins",label:"🍷 Vins (ワイン)",cuts:Ve,img:"assets/cheese_wine.png",placeholder:"Vins"}]},vegetables:{title:"野菜 (Vegetables)",subCategories:[{key:"legumes",label:"🥦 Légumes (野菜全般)",cuts:Oe,img:"assets/vegetables.png",placeholder:"Legumes"}]},herbs_spices:{title:"ハーブ・スパイス (Herbs & Spices)",subCategories:[{key:"herbes",label:"🌿 Herbes (香草)",cuts:We,img:"assets/herbs_spices.png",placeholder:"Herbes"},{key:"epices",label:"🌶️ Épices (香辛料)",cuts:Ke,img:"assets/herbs_spices.png",placeholder:"Epices"}]},fruits_mushrooms:{title:"果物・きのこ (Fruits & Mushrooms)",subCategories:[{key:"fruits",label:"🍎 Fruits (果物)",cuts:Qe,img:"assets/fruits_mushrooms.png",placeholder:"Fruits"},{key:"champignons",label:"🍄 Champignons (きのこ)",cuts:Je,img:"assets/fruits_mushrooms.png",placeholder:"Champignons"}]}};function l(t){const g=i[t];a.innerHTML="",g.subCategories.forEach((u,d)=>{const m=document.createElement("button");m.className=`meat-tab-btn ${d===0?"active":""}`,m.setAttribute("data-sub",u.key),m.innerText=u.label,m.style.fontSize="0.8rem",m.style.padding="0.3rem 0.8rem",m.addEventListener("click",s=>{a.querySelectorAll(".meat-tab-btn").forEach(f=>f.classList.remove("active")),m.classList.add("active"),oe(u,n)}),a.appendChild(m)}),g.subCategories.length<=1?a.style.display="none":a.style.display="flex",oe(g.subCategories[0],n)}r.querySelectorAll(".meat-tab-btn").forEach(t=>{t.addEventListener("click",g=>{r.querySelectorAll(".meat-tab-btn").forEach(d=>d.classList.remove("active")),t.classList.add("active");const u=t.getAttribute("data-category");l(u)})}),l("primary")}function oe(e,o){o.innerHTML="";const r=document.createElement("div");r.style.display="flex",r.style.flexDirection="column",r.style.gap="1.5rem";let a="";e.quote&&(a+=`
      <div style="background-color: rgba(197, 168, 128, 0.05); padding: 1rem; border-radius: var(--radius-sm); border-left: 3px solid var(--color-accent); margin-bottom: 0.5rem; text-align: center;">
        <span style="font-family: var(--font-serif); font-size: 1.1rem; font-style: italic; color: var(--color-primary);">${e.quote}</span>
      </div>
    `),e.pdf&&(a+=`
      <div style="display: flex; justify-content: flex-end; margin-bottom: 0.5rem;">
        <a href="${e.pdf}" target="_blank" class="next-btn" style="text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; padding: 0.4rem 0.8rem; background-color: rgba(197, 168, 128, 0.08); color: var(--color-primary); border: 1px solid rgba(197, 168, 128, 0.3); border-radius: var(--radius-sm); font-weight: 600; cursor: pointer; transition: var(--transition);">
          ${e.pdfText}
        </a>
      </div>
    `),a+=`
    <div class="ingredient-grid-layout">
      <!-- Left: Interactive Canvas -->
      <div class="interactive-canvas-container" style="position: relative; width: 100%; margin: 0;">
        <img src="${e.img}" alt="${e.label}" class="interactive-image" onerror="this.src='https://placehold.co/700x450/F4EAD4/0a1931?text=${e.placeholder}'">
        
        <!-- Polygons overlay (only for those items that specify points coordinates) -->
        <svg class="interactive-svg-overlay" viewBox="0 0 100 100">
          ${e.cuts.filter(u=>u.points).map(u=>`
            <polygon class="interactive-area" points="${u.points}" data-id="${u.id}" />
          `).join("")}
        </svg>
        
        <!-- Hotspots overlay (for items that specify pin x/y percentages) -->
        <div class="hotspots-overlay-container" style="position: absolute; top:0; left:0; width:100%; height:100%; pointer-events:none;">
          ${e.cuts.filter(u=>u.pin).map(u=>`
            <div class="interactive-hotspot" style="left: ${u.pin.x}%; top: ${u.pin.y}%; pointer-events: auto;" data-id="${u.id}" title="${u.name_fr}">${u.number}</div>
          `).join("")}
        </div>
      </div>
      
      <!-- Right: Clickable Text List -->
      <div style="background: rgba(10, 25, 49, 0.02); border: 1px solid rgba(197, 168, 128, 0.25); border-radius: var(--radius-md); padding: 1.2rem; max-height: 450px; overflow-y: auto;">
        <h4 style="font-size: 0.85rem; text-transform: uppercase; color: var(--color-primary); font-weight: 700; margin-bottom: 0.8rem; border-bottom: 1px solid rgba(197, 168, 128, 0.2); padding-bottom: 0.4rem;">📖 部位・食材リスト</h4>
        <div class="ingredient-list-group" style="display: flex; flex-direction: column; gap: 0.4rem;">
          ${e.cuts.map(u=>`
            <button class="list-item-btn" data-id="${u.id}">
              <span><span style="display: inline-block; background-color: var(--color-accent); color: var(--color-primary); width: 18px; height: 18px; line-height: 18px; text-align: center; border-radius: 50%; font-size: 0.65rem; font-weight: 700; margin-right: 0.4rem;">${u.number}</span> ${u.name_fr}</span>
              <span style="font-size: 0.75rem; color: var(--color-text-muted); font-style: italic;">${u.name_ja}</span>
            </button>
          `).join("")}
        </div>
      </div>
    </div>
    
    <!-- Detail Drawer -->
    <div class="cuisine-detail-drawer" id="ingredient-detail-drawer">
      <div class="detail-drawer-header">
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <h3 class="detail-drawer-title" id="ingredient-cut-title">Select an Item</h3>
          <button class="audio-btn" id="ingredient-audio-title-btn" style="background: none; border: none; font-size: 1.1rem; cursor: pointer; color: var(--color-accent); display: none;">🔊</button>
        </div>
        <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; color: var(--color-text-muted); font-weight: 600;" id="ingredient-cut-sub">${e.label}</span>
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <!-- Properties Grid -->
        <div class="meat-properties-grid">
          <div class="meat-prop-item">
            <span class="meat-prop-label">柔らかさ (Tendreté)</span>
            <strong class="meat-prop-val" id="ingredient-prop-tenderness">-</strong>
          </div>
          <div class="meat-prop-item">
            <span class="meat-prop-label">脂 (Gras)</span>
            <strong class="meat-prop-val" id="ingredient-prop-fat">-</strong>
          </div>
          <div class="meat-prop-item">
            <span class="meat-prop-label">コラーゲン (Collagène)</span>
            <strong class="meat-prop-val" id="ingredient-prop-collagen">-</strong>
          </div>
        </div>

        <!-- Basic Details -->
        <div class="meat-detail-grid">
          <div class="meat-detail-block">
            <h4 class="meat-block-title">向く調理</h4>
            <p class="meat-block-text" id="ingredient-cooking"></p>
          </div>
          <div class="meat-detail-block">
            <h4 class="meat-block-title">特徴・分類</h4>
            <p class="meat-block-text" id="ingredient-classification"></p>
          </div>
        </div>

        <!-- Logic & Science -->
        <div class="meat-detail-grid">
          <div class="meat-detail-block">
            <h4 class="meat-block-title">Cooking Logic</h4>
            <p class="meat-block-text highlight-code" id="ingredient-logic"></p>
          </div>
          <div class="meat-detail-block">
            <h4 class="meat-block-title">料理科学 (Science)</h4>
            <p class="meat-block-text" id="ingredient-science"></p>
          </div>
        </div>

        <!-- Chef's Note -->
        <div class="chef-note-box">
          <h4 class="chef-note-title">👨‍🍳 Chef's Note</h4>
          <p class="chef-note-text" id="ingredient-chef-note"></p>
        </div>

        <!-- Relations -->
        <div id="ingredient-relations-container" style="display: none; border-top: 1px solid rgba(197, 168, 128, 0.15); padding-top: 1.2rem;">
          <h4 class="meat-block-title">🔗 関連知識とのつながり (Relations)</h4>
          <div id="ingredient-relations-content"></div>
        </div>
      </div>
    </div>
  `,r.innerHTML=a,o.appendChild(r);const n=r.querySelector("#ingredient-detail-drawer"),i=r.querySelectorAll(".interactive-area"),l=r.querySelectorAll(".interactive-hotspot"),t=r.querySelectorAll(".list-item-btn");function g(u,d){var f,v,_;if(i.forEach(c=>c.classList.remove("active")),l.forEach(c=>c.classList.remove("active")),t.forEach(c=>c.classList.remove("active")),d)d.classList.add("active");else{const c=r.querySelector(`.interactive-area[data-id="${u}"]`);c&&c.classList.add("active");const w=r.querySelector(`.interactive-hotspot[data-id="${u}"]`);w&&w.classList.add("active")}const m=r.querySelector(`.list-item-btn[data-id="${u}"]`);m&&m.classList.add("active");const s=e.cuts.find(c=>c.id===u);if(s){r.querySelector("#ingredient-cut-title").innerText=`${s.name_fr} (${s.name_ja})`,r.querySelector("#ingredient-cut-sub").innerText=`Cut #${s.number} • ${s.name_en||""}`,r.querySelector("#ingredient-prop-tenderness").innerText=((f=s.properties)==null?void 0:f.tenderness)||"-",r.querySelector("#ingredient-prop-fat").innerText=((v=s.properties)==null?void 0:v.fat)||"-",r.querySelector("#ingredient-prop-collagen").innerText=((_=s.properties)==null?void 0:_.collagen)||"-",r.querySelector("#ingredient-cooking").innerText=s.cooking||"-",r.querySelector("#ingredient-classification").innerText=s.classification||"-",r.querySelector("#ingredient-logic").innerText=s.logic||"-",r.querySelector("#ingredient-science").innerText=s.science||"-",r.querySelector("#ingredient-chef-note").innerText=s.chef_note||"-";const c=r.querySelector("#ingredient-relations-container"),w=r.querySelector("#ingredient-relations-content"),p=pe(u,"cut");p?(w.innerHTML=p,c.style.display="block"):c.style.display="none";const S=r.querySelector("#ingredient-audio-title-btn");S.style.display="inline-block",S.onclick=()=>I(s.name_fr),n.style.display="block",window.innerWidth<=600&&n.scrollIntoView({behavior:"smooth"})}}i.forEach(u=>{u.addEventListener("click",d=>{const m=d.target.getAttribute("data-id");g(m,d.target)})}),l.forEach(u=>{u.addEventListener("click",d=>{const m=d.target.getAttribute("data-id");g(m,d.target)})}),t.forEach(u=>{u.addEventListener("click",d=>{const m=d.target.closest(".list-item-btn").getAttribute("data-id");g(m,d.target.closest(".list-item-btn"))})})}const ee=[{id:"reg_normandie",number:"N",name_fr:"Normandie",name_en:"Normandy",name_ja:"ノルマンディー地方",points:"22,16 38,16 38,28 22,28",desc_fr:"Célèbre pour ses riches pâturages et ses vergers de pommiers. Cuisine dominée par les produits laitiers et les pommes. Ingrédients clés : Fromage Camembert, Pommes. Plats classiques : Sole Normande, Poulet Vallée d'Auge. (Débarquement de Normandie (1944) Normandie)",desc_en:"Famous for lush green dairy pastures and apple orchards. Normandy cuisine is defined by heavy cream, raw butter, world-class cheese, and apples. Key ingredients: Camembert cheese, Apples. Signature dishes: Sole Normande, Poulet Vallée d'Auge. (Normandy Landings (1944) Normandy)",desc_ja:"フランス北西部の沿岸地域。冷涼な気候を活かしたリンゴの栽培（シードル、カルヴァドス）と、フランス最高峰の乳製品の産地として高名。魚介類にも恵まれ、生クリームを贅沢に使ったコク深い味付けが特徴。代表食材：カマンベールチーズ、リンゴ。代表料理：ソール・ノルマンド、プーレ_ヴァレ_ドージュ。歴史的出来事：(ノルマンディー上陸作戦 (1944) ノルマンディー)"},{id:"reg_bourgogne",number:"B",name_fr:"Bourgogne",name_en:"Burgundy",name_ja:"ブルゴーニュ地方",points:"52,38 66,38 66,54 52,54",desc_fr:"Le cœur de la gastronomie classique française et des vins de prestige. Réputée pour ses viandes de Charolais et ses sauces au vin rouge réduit. Ingrédients clés : Bœuf Charolais, Moutarde de Dijon. Plats classiques : Bœuf Bourguignon, Escargots à la persillade, Coq au Vin. (Bataille d'Alésia (-52) Alésia)",desc_en:"The historic heartland of French wine, Charolais cattle, and Dijon mustard. Reduced red wine is heavily featured in regional sauces. Key ingredients: Charolais Beef, Dijon Mustard. Signature dishes: Bœuf Bourguignon, Escargots de Bourgogne, Coq au Vin. (Battle of Alesia (-52) Alesia)",desc_ja:"名高き特級ワインと古典フランス料理の中心地。広大な牧草地で育つ最高級のシャロレー牛やディジョンマスタードが名産。ワイン煮込み料理の発祥地であり、濃厚なソースが基本です。代表食材：シャロレー牛、ディジョンマスタード。代表料理：ブフ_ブルギニョン、エスカルゴのブルゴーニュ風、コック_オ_ヴァン。歴史的出来事：(アレシアの戦い (2026年より紀元前52年) アレシア)"},{id:"reg_provence",number:"P",name_fr:"Provence",name_en:"Provence",name_ja:"プロヴァンス地方",points:"64,70 80,70 80,86 64,86",desc_fr:"Région baignée de soleil, influencée par la mer Méditerranée. Se base sur l'huile d'olive, l'ail, la tomate et les herbes aromatiques au lieu du beurre. Ingrédients clés : Huile d'olive, Herbes de Provence. Plats classiques : Bouillabaisse, Ratatouille, Salade Niçoise. (Papauté d'Avignon (1309) Avignon)",desc_en:"Sun-drenched Mediterranean cooking. Unlike the north, Provence avoids butter, using olive oil, garlic, fresh tomatoes, and aromatic wild herbs instead. Key ingredients: Olive oil, Herbes de Provence. Signature dishes: Bouillabaisse, Ratatouille, Salade Niçoise. (Avignon Papacy (1309) Avignon)",desc_ja:"地中海に面した温暖な南仏地域。乳製品主体の北部とは対照的に、オリーブオイル、にんにく、トマト、ハーブ類を主役とする健康的で明るい地中海料理が魅力。代表食材：オリーブオイル、プロヴァンス_ハーブ。代表料理：ブイヤベース、ラタトゥイユ、ニース風サラダ。歴史的出来事：(アヴィニョン捕囚 (1309) アヴィニョン)"},{id:"reg_alsace",number:"A",name_fr:"Alsace",name_en:"Alsace",name_ja:"アルザス地方",points:"76,22 90,22 90,38 76,38",desc_fr:"Région à la frontière allemande, combinant des ingrédients robustes et des vins blancs fruités. Célèbre pour ses charcuteries de porc et son chou. Ingrédients clés : Chou à choucroute, Saucisse de Strasbourg. Plats classiques : Choucroute Garnie, Flammekueche, Baeckeoffe. (Cession de l'Alsace-Lorraine (1871) Alsace)",desc_en:"Bordering Germany, Alsace combines hearty Germanic staples with dry, aromatic French white wines. Noted for curing meats, sausages, and sauerkraut. Key ingredients: Sauerkraut, Strasbourg Sausage. Signature dishes: Choucroute Garnie, Flammekueche, Baeckeoffe. (Ceding of Alsace-Lorraine (1871) Alsace)",desc_ja:"ドイツ国境沿いに位置する北東の地方。地元の白ワインと合わせる豚肉のスモーク、自家製ソーセージ、塩漬けキャベツ（シュークルート）が名物。ドイツの質実剛健さとフランスの洗練が融合。代表食材：シュークルート、ストラスブール_ソーセージ。代表料理：シュークルート_ガルニ、タルト_フランベ、ベッコフ。歴史的出来事：(アルザス・ロレーヌ割譲 (1871) アルザス)"},{id:"reg_bretagne",number:"BR",name_fr:"Bretagne",name_en:"Brittany",name_ja:"ブルターニュ地方",points:"6,26 22,26 22,40 6,40",desc_fr:"Région maritime sauvage à l'ouest. Sa cuisine est marquée par l'océan, l'utilisation de beurre salé et de sarrasin pour ses crêpes. Ingrédients clés : Farine de sarrasin, Beurre salé. Plats classiques : Galette de sarrasin, Cotriade, Kouign-amann. (Union de la Bretagne à la France (1532) Vannes)",desc_en:"A rugged maritime region in the west. Its cuisine is heavily shaped by the Atlantic ocean, hearty buckwheat, and rich salted butter culture. Key ingredients: Buckwheat flour, Salted butter. Signature dishes: Buckwheat Galette, Cotriade, Kouign-amann. (Union of Brittany and France (1532) Vannes)",desc_ja:"大西洋に突き出た最西端の沿岸地域。豊かな海洋資源に加え、ガレット（クレープ）に使われるそば粉や有塩バターの文化が深く根付く独自の土地柄。代表食材：そば粉、有塩バター。代表料理：ガレット_ド_サラザン、コトリアード（魚介スープ）、クイニーアマン。歴史的出来事：(ブルターニュ公国のフランス併合 (1532) ヴァンヌ)"},{id:"reg_ile_de_france",number:"IF",name_fr:"Île-de-France",name_en:"Île-de-France",name_ja:"イル・ド・フランス地方",points:"44,20 56,20 56,34 44,34",desc_fr:"Le centre politique et culturel de la France. Berceau de la haute gastronomie, influencé par les meilleurs produits de tout le pays. Ingrédients clés : Champignon de Paris, Brie de Meaux. Plats classiques : Pot-au-feu, Soupe à l'oignon, Entrecôte Bercy. (Révolution française (1789) Paris)",desc_en:"The political and cultural heartland of France. The historical birthplace of haute cuisine, featuring refined bistro classics and royal traditions. Key ingredients: Paris Mushroom, Brie de Meaux. Signature dishes: Pot-au-feu, French Onion Soup, Entrecôte Bercy. (French Revolution (1789) Paris)",desc_ja:"パリを中心とする首都圏地域。宮廷料理から発展した高級ガストロノミーと、洗練されたビストロ料理の発祥地。国内中から最高の一級食材集まります。代表食材：マッシュルーム、ブリー_ド_モー（チーズ）。代表料理：ポトフ、オニオングラタンスープ、アントルコート_ベルシー。歴史的出来事：(フランス革命 (1789) パリ)"},{id:"reg_aquitaine",number:"AQ",name_fr:"Nouvelle-Aquitaine",name_en:"Aquitaine / Southwest",name_ja:"アキテーヌ（南西地方）",points:"24,54 42,54 42,74 24,74",desc_fr:"Région du Sud-Ouest, réputée pour sa gastronomie généreuse et ses grands vins de Bordeaux. Spécialisée dans la cuisine du canard et du foie gras. Ingrédients clés : Foie gras, Canard. Plats classiques : Confit de canard, Cassoulet, Magret de canard. (Fin de la Guerre de Cent Ans (1453) Castillon)",desc_en:"A southwestern region famous for its rich, hearty cuisine and world-renowned Bordeaux wines. Highly specialized in duck fats and savory foie gras. Key ingredients: Foie gras, Duck meat. Signature dishes: Duck Confit, Cassoulet, Magret de canard. (End of the Hundred Years' War (1453) Castillon)",desc_ja:"ジロンド川からピレネー山脈に広がる美食の地帯。ボルドーワインを擁し、フランス随一のフォアグラの産地であり、鴨の脂や肉を巧みに使った濃厚で贅沢な郷土料理が特徴。代表食材：フォアグラ、鴨肉。代表料理：鴨のコンフィ、カスレ、マグレ_ド_カナール。歴史的出来事：(百年戦争終結 (1453) カスティヨン)"},{id:"reg_rhone_alpes",number:"RA",name_fr:"Auvergne-Rhône-Alpes",name_en:"Rhône-Alpes / Lyonnais",name_ja:"ローヌ・アルプ（リヨン地方）",points:"60,50 76,50 76,68 60,68",desc_fr:"Considérée comme la capitale mondiale de la gastronomie (Lyon). Cuisine riche, alliant les grands fromages des Alpes et les volailles de Bresse. Ingrédients clés : Volaille de Bresse, Saucisson de Lyon. Plats classiques : Quenelle de brochet, Poulet aux morilles, Gratin Dauphinois. (Révolte des Canuts (1831) Lyon)",desc_en:"Often crowned as the gastronomic capital of the world (Lyon). A rich culinary style combining premium alpine cheeses with legendary bistro fares. Key ingredients: Bresse Poultry, Lyon Sausage. Signature dishes: Pike Quenelle, Poulet de Bresse with morals, Gratin Dauphinois. (Silk weavers' revolts (1831) Lyon)",desc_ja:"「世界の美食の都」と称されるリヨンを擁する地方。アルプスの山岳チーズや最高峰の鶏肉を活かした、力強くも洗練されたビストロ（ブション）文化が息づく。代表食材：ブレス鶏、リヨン風ソーセージ。代表料理：川魚のクネル、ブレス鶏のモリーユ茸クリーム煮、グラタン_ドフィノワ。歴史的出来事：(リヨン絹織物職人の蜂起 (1831) リヨン)"},{id:"reg_loire",number:"LO",name_fr:"Centre-Val de Loire",name_en:"Loire Valley",name_ja:"ロワール地方",points:"34,32 50,32 50,48 34,48",desc_fr:"Surnommée le Jardin de la France. Connue pour ses châteaux royaux, ses vins élégants, ses fromages de chèvre et ses délicieux poissons de rivière. Ingrédients clés : Sainte-Maure de Touraine, Poissons de Loire. Plats classiques : Rillettes de Tours, Brochet au beurre blanc, Tarte Tatin. (Siège d'Orléans par Jeanne d'Arc (1429) Orléans)",desc_en:"Known as the Garden of France. Famous for fairy-tale châteaux, elegant white wines, delicate goat cheeses, and fresh river fish. Key ingredients: Sainte-Maure de Touraine (goat cheese), Loire River fish. Signature dishes: Rillettes of Tours, Pike with beurre blanc, Tarte Tatin. (Siege of Orléans (1429) Orléans)",desc_ja:"「フランスの庭園」と呼ばれる風光明媚な古城地帯。王侯貴族に愛された気品ある白ワイン、多種多様な山羊乳チーズ（シェーヴル）、豊かな川魚料理が魅力。代表食材：サント_モール_ド_トゥーレーヌ、ロワール川の川魚。代表料理：リエット、川魚のブールブランソース添え、タルトタタン。歴史的出来事：(ジャンヌ・ダルクによるオルレアン解放 (1429) オルレアン)"},{id:"reg_champagne",number:"CH",name_fr:"Grand Est (Champagne)",name_en:"Champagne",name_ja:"シャンパーニュ地方",points:"54,16 68,16 68,32 54,32",desc_fr:"Célèbre dans le monde entier pour son vin effervescent unique. La cuisine locale propose des plats mijotés robustes pour contrer les hivers froids. Ingrédients clés : Vin de Champagne, Jambon des Ardennes. Plats classiques : Potée Champenoise, Biscuits roses de Reims. (Sacre de Clovis / Rois de France (496) Reims)",desc_en:"Northeast region celebrated globally for its unique sparkling wine. The local kitchen offers rustic pot-roasted meats to counter cold northern winters. Key ingredients: Champagne Wine, Ardennes Ham. Signature dishes: Potée Champenoise, Pink Biscuits of Reims. (Coronation of Clovis / Kings of France (496) Reims)",desc_ja:"世界で最も高貴なスパークリングワイン「シャンパン」の故郷。北東部の寒冷な気候をしのぐため、お肉や野菜をじっくり煮込んだ素朴で温かい伝統鍋が愛されています。代表食材：シャンパン、アルデンヌの生ハム。代表料理：ポテ_シャンプノワーズ、ビスキュイ_ローズ_ド_ランス。歴史的出来事：(フランク王国クローヴィスおよび歴代国王の戴カン式 (496) ランス)"},{id:"reg_languedoc",number:"LA",name_fr:"Occitanie (Languedoc)",name_en:"Languedoc / South",name_ja:"ラングドック地方",points:"38,68 54,68 54,84 38,84",desc_fr:"Région méditerranéenne du Sud, marquée par des influences occitanes. Propose une cuisine de terroir généreuse, parfumée à l'ail, aux olives et aux fruits de mer. Ingrédients clés : Haricot lingot, Anchois de Collioure. Plats classiques : Cassoulet de Castelnaudary, Brandade de morue, Tielle sétoise. (Croisade des albigeois (1209) Béziers)",desc_en:"A southern Mediterranean region with strong Occitan roots. Features rustic landward cooking packed with garlic, rich olive oils, and fresh seafood. Key ingredients: Lingot Beans, Collioure Anchovies. Signature dishes: Cassoulet, Brandade de morue, Tielle sétoise. (Albigensian Crusade (1209) Béziers)",desc_ja:"地中海に面した南仏の西側エリア。オリーブやにんにく、トマトを多用し、カステルノーダリの伝統的な豆の煮込みや、豊かな海の幸を組み合わせた力強い郷土料理が特徴。代表食材：白インゲン豆、コリウールのアンチョビ。代表料理：カスレ、ブランダード_ド_モリュ、ティエル（タコのパイ）。歴史的出来事：(アルビジョワ十字軍 (1209) ベジエ)"},{id:"reg_corse",number:"CO",name_fr:"Corse",name_en:"Corsica",name_ja:"コルシカ島",points:"80,80 92,80 92,94 80,94",desc_fr:"L'Île de Beauté au caractère sauvage. Sa cuisine est basée sur les produits de la montagne, les châtaignes, le fromage de brebis et la charcuterie. Ingrédients clés : Farine de châtaigne, Lonzu. Plats classiques : Civet de sanglier, Fiadone, Veau aux olives. (Naissance de Napoléon Bonaparte (1769) Ajaccio)",desc_en:"The Island of Beauty with a rugged mountain character. Its unique cuisine is driven by aromatic wild herbs, chestnut forests, sheep cheese, and cured pork. Key ingredients: Chestnut flour, Lonzu (cured pork). Signature dishes: Wild Boar Civet, Fiadone, Veau aux olives. (Birth of Napoleon Bonaparte (1769) Ajaccio)",desc_ja:"地中海に浮かぶ険しい山岳の島。独自の生態系が育む栗の粉、野生ハーブを食べて放牧された地豚の熟成肉（シャルキュトリー）、羊乳チーズなどを活かした力強い山のごちそう。代表食材：栗粉、ロンズ（豚肉の熟成肉）。代表料理：イノシシのシヴェ（煮込み）、フィアドーヌ（チーズケーキ）、子牛肉のオリーブ煮。歴史的出来事：(ナポレオン・ボナパルト誕生 (1769) アジャクシオ)"},{id:"reg_hauts_de_france",number:"HF",name_fr:"Hauts-de-France",name_en:"Northern France / Flanders",name_ja:"オー・ド・フランス地方（北フランス）",points:"44,4 58,4 58,18 44,18",desc_fr:"Région du Nord influencée par la culture flamande. Connue pour sa cuisine mijotée à la bière, ses frites croustillantes et ses fromages forts. Ingrédients clés : Fromage Maroilles, Endive. Plats classiques : Carbonnade Flamande, Potjevleesch, Moules-frites. (Bataille de Dunkerque (1940) Dunkerque)",desc_en:"Northernmost region deeply influenced by Flemish culture. Noted for comforting beer-infused slow cooking, intense aromatic cheeses, and crispy fries. Key ingredients: Maroilles Cheese, Endive. Signature dishes: Carbonnade Flamande, Potjevleesch, Moules-frites. (Battle of Dunkirk (1940) Dunkirk)",desc_ja:"ベルギーと国境を接するフランス最北部。ワインではなくビールを使った煮込み料理や、独特な強い香りのマロワール・チーズ、野菜のチコリ（エンダイブ）が名物。フランドル文化の温かみがあります。代表食材：マロワール・チーズ、チコリ。代表料理：カルボナード（牛肉のビール煮）、ポチェブリーシュ、ムール_フリット。歴史的出来事：(ダンケルクの戦い (1940) ダンケルク)"}];function Ye(e){const o=document.createElement("div");o.innerHTML=`
    <div class="ingredient-grid-layout">
      <!-- Left: Interactive Canvas -->
      <div class="interactive-canvas-container" style="position: relative; width: 100%; margin: 0;">
        <img src="assets/france_map.png" alt="Gastronomic Map of France" class="interactive-image" onerror="this.src='https://placehold.co/700x450/F4EAD4/0a1931?text=Carte+Gastronomique'">
        <svg class="interactive-svg-overlay" viewBox="0 0 100 100">
          ${ee.map(l=>`
            <polygon class="interactive-area" points="${l.points}" data-id="${l.id}" />
          `).join("")}
        </svg>
      </div>
      
      <!-- Right: Clickable Text List (Regions) -->
      <div style="background: rgba(10, 25, 49, 0.02); border: 1px solid rgba(197, 168, 128, 0.25); border-radius: var(--radius-md); padding: 1.2rem; max-height: 450px; overflow-y: auto;">
        <h4 style="font-size: 0.85rem; text-transform: uppercase; color: var(--color-primary); font-weight: 700; margin-bottom: 0.8rem; border-bottom: 1px solid rgba(197, 168, 128, 0.2); padding-bottom: 0.4rem;">🗺️ 地方リスト (Régions)</h4>
        <div class="ingredient-list-group" style="display: flex; flex-direction: column; gap: 0.4rem;">
          ${ee.map(l=>`
            <button class="list-item-btn" data-id="${l.id}">
              <span><span style="display: inline-block; background-color: var(--color-accent); color: var(--color-primary); width: 18px; height: 18px; line-height: 18px; text-align: center; border-radius: 50%; font-size: 0.65rem; font-weight: 700; margin-right: 0.4rem;">${l.number}</span> ${l.name_fr}</span>
              <span style="font-size: 0.75rem; color: var(--color-text-muted); font-style: italic;">${l.name_ja}</span>
            </button>
          `).join("")}
        </div>
      </div>
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
  `,e.appendChild(o);const r=o.querySelector("#map-detail-drawer"),a=o.querySelectorAll(".interactive-area"),n=o.querySelectorAll(".list-item-btn");function i(l,t){a.forEach(m=>m.classList.remove("active")),n.forEach(m=>m.classList.remove("active"));const g=o.querySelector(`.interactive-area[data-id="${l}"]`);g&&g.classList.add("active");const u=o.querySelector(`.list-item-btn[data-id="${l}"]`);u&&u.classList.add("active");const d=ee.find(m=>m.id===l);if(d){o.querySelector("#map-region-title").innerText=`${d.name_fr} (${d.name_ja})`,o.querySelector("#map-region-sub").innerText=`${d.name_en} Region`,o.querySelector("#map-desc-fr").innerText=d.desc_fr,o.querySelector("#map-desc-en").innerText=d.desc_en,o.querySelector("#map-desc-ja").innerText=d.desc_ja;const m=o.querySelector("#map-relations-container"),s=o.querySelector("#map-relations-content"),f=pe(l,"region");f?(s.innerHTML=f,m.style.display="block"):m.style.display="none";const v=o.querySelector("#map-audio-title-btn");v.style.display="inline-block",v.onclick=()=>I(d.name_fr);const _=o.querySelector("#map-audio-desc-btn");_.style.display="inline-block",_.onclick=()=>I(d.desc_fr),r.style.display="block",window.innerWidth<=600&&r.scrollIntoView({behavior:"smooth"})}}a.forEach(l=>{l.addEventListener("click",t=>{const g=t.target.getAttribute("data-id");i(g,t.target)})}),n.forEach(l=>{l.addEventListener("click",t=>{const g=t.target.closest(".list-item-btn").getAttribute("data-id");i(g,t.target.closest(".list-item-btn"))})})}function Xe(){const e=document.createElement("div"),o=document.createElement("h2");o.className="section-title",o.innerText="Théorie de l'Art Culinaire",e.appendChild(o);const r=document.createElement("p");r.className="section-subtitle",r.innerText="Classical French culinary theory, stock making, classical sauces, and interactive gastronomy diagrams.",e.appendChild(r);const a=document.createElement("div");a.className="cuisine-tabs",a.innerHTML=`
    <button class="cuisine-tab-btn active" data-tab="theory">📖 Théorie Classique</button>
    <button class="cuisine-tab-btn" data-tab="ingredients">🥦 Ingrédients (食材)</button>
    <button class="cuisine-tab-btn" data-tab="map">🗺️ Carte Gastronomique</button>
  `,e.appendChild(a);const n=document.createElement("div");n.className="cuisine-content-wrapper",e.appendChild(n),a.querySelectorAll(".cuisine-tab-btn").forEach(l=>{l.addEventListener("click",t=>{a.querySelectorAll(".cuisine-tab-btn").forEach(u=>u.classList.remove("active")),t.target.classList.add("active");const g=t.target.getAttribute("data-tab");i(g)})});function i(l){n.innerHTML="",l==="theory"?ke(n):l==="ingredients"?Ue(n):l==="map"&&Ye(n)}return i("theory"),e}function N(e){const o=[...e];for(let r=o.length-1;r>0;r--){const a=Math.floor(Math.random()*(r+1));[o[r],o[a]]=[o[a],o[r]]}return o}function se(e){return e.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim().replace(/[-\s]+/g," ")}function Ze(){if(document.getElementById("quiz-dynamic-styles"))return;const e=document.createElement("style");e.id="quiz-dynamic-styles",e.innerHTML=`
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
  `,document.head.appendChild(e)}function et(){var l;const e=[],o=((l=b.db)==null?void 0:l.knowledge)||[],r=o.filter(t=>t.french&&t.japanese),a=o.filter(t=>t.grammar),n=o.filter(t=>t.cuisine);function i(t,g,u,d){const s=t.filter(v=>v.id!==u).map(d).sort(()=>.5-Math.random()),f=[...new Set(s)].filter(Boolean).slice(0,g);for(;f.length<g;)f.push("Autre option "+(f.length+1));return f}return r.forEach(t=>{var s,f,v,_,c;let g="vocabulary";(s=t.tags)!=null&&s.includes("meat")?g="meat":(f=t.tags)!=null&&f.includes("sauces")||(v=t.tags)!=null&&v.includes("sauce")?g="sauces":(_=t.tags)!=null&&_.includes("cutting")?g="cuts":(c=t.tags)!=null&&c.includes("science")&&(g="science");const u=i(r,3,t.id,w=>w.japanese),d=t.examples&&t.examples[0]?t.examples[0].fr:"";e.push({id:`dyn_vocab_fr_ja_${t.id}`,type:"choice",category:g,question:`Que signifie le mot français "${t.french}" ? / What does the French word "${t.french}" mean?`,question_fr:`Que signifie le mot français "${t.french}" ?`,question_en:`What does the French word "${t.french}" mean?`,context:t.definition_fr||`Usage: ${d}`,options:N([t.japanese,...u]),answer:t.japanese});const m=i(r,3,t.id,w=>w.french);e.push({id:`dyn_vocab_ja_fr_${t.id}`,type:"choice",category:g,question:`Quel est le mot français pour "${t.japanese}" ? / What is the French word for "${t.japanese}"?`,question_fr:`Quel est le mot français pour "${t.japanese}" ?`,question_en:`What is the French word for "${t.japanese}"?`,context:t.definition_fr||`Usage: ${d}`,options:N([t.french,...m]),answer:t.french})}),a.forEach(t=>{if(!t.grammar.topic||!t.examples||t.examples.length===0)return;const g=i(a,3,t.id,u=>u.grammar.topic);e.push({id:`dyn_gram_topic_${t.id}`,type:"choice",category:"grammar",question:`De quel concept de grammaire s'agit-il : "${t.grammar.explanation_ja}" ? / Which grammar concept is this: "${t.grammar.explanation_en}"?`,question_fr:"De quel concept de grammaire s'agit-il ?",question_en:`Which grammar concept is this: "${t.grammar.explanation_en}"?`,context:`Niveau : ${t.level}. Indispensable pour la cuisine.`,options:N([t.grammar.topic,...g]),answer:t.grammar.topic}),t.examples.forEach((u,d)=>{const s=a.flatMap(f=>f.examples||[]).filter(f=>f.fr!==u.fr).sort(()=>.5-Math.random()).map(f=>f.ja).slice(0,3);for(;s.length<3;)s.push("Option de traduction "+(s.length+1));e.push({id:`dyn_gram_ex_${t.id}_${d}`,type:"choice",category:"grammar",question:`Traduisez la phrase : "${u.fr}" / Translate the sentence: "${u.fr}"`,question_fr:`Traduisez la phrase : "${u.fr}"`,question_en:`Translate the sentence: "${u.fr}"`,context:`Grammaire: ${t.grammar.topic} (${t.level})`,options:N([u.ja,...s]),answer:u.ja})})}),n.forEach(t=>{var d,m,s,f,v,_;if(!t.cuisine.topic||!t.cuisine.content_ja)return;const g=i(n,3,t.id,c=>c.cuisine.topic);let u="sauces";(d=t.tags)!=null&&d.includes("knife-cuts")||(m=t.tags)!=null&&m.includes("cuts")?u="cuts":(s=t.tags)!=null&&s.includes("meat")?u="meat":((f=t.tags)!=null&&f.includes("molecular")||(v=t.tags)!=null&&v.includes("chemistry")||(_=t.tags)!=null&&_.includes("science"))&&(u="science"),e.push({id:`dyn_cuis_topic_${t.id}`,type:"choice",category:u,question:`De quel concept culinaire s'agit-il : "${t.cuisine.content_ja.substring(0,120)}..." ? / Which culinary concept is described: "${t.cuisine.content_en.substring(0,120)}..."?`,question_fr:"De quel concept culinaire s'agit-il ?",question_en:"Which culinary concept is described here?",context:`Niveau : ${t.level}. Mots-clés : ${t.tags.join(", ")}`,options:N([t.cuisine.topic,...g]),answer:t.cuisine.topic})}),e}function tt(){var i;const e=[],o=((i=b.db)==null?void 0:i.knowledge)||[],r=[];o.forEach(l=>{(l.examples||[]).forEach(t=>{r.push({fr:t.fr,ja:t.ja})})});const a=r.sort(()=>.5-Math.random());for(const l of a){if(e.length>=4)break;const t=l.fr.replace(/^➔\s*/,"").trim();if(t.includes(" - ")){const g=t.split(" - ");e.push({id:`pair_${e.length}`,left:`🗣️ ${g[0].trim()}`,right:`💬 ${g[1].trim()}`,context:l.ja})}else if(t.includes(",")){const g=t.split(",");e.push({id:`pair_${e.length}`,left:`${g[0].trim()} ,`,right:`... ${g[1].trim()}`,context:l.ja})}else{const g=t.split(" ");if(g.length>=4){const u=Math.floor(g.length/2),d=g.slice(0,u).join(" "),m=g.slice(u).join(" ");e.push({id:`pair_${e.length}`,left:`${d} ...`,right:`... ${m}`,context:l.ja})}}}const n=[{left:"🗣️ Chaud devant !",right:"💬 Oui, chef !",context:"お通りです！ / はい、シェフ！"},{left:"🗣️ Entrée prête ?",right:"💬 Oui, j'envoie.",context:"前菜はできていますか？ / はい、送ります。"},{left:"🗣️ Combien de couverts ?",right:"💬 Vingt couverts.",context:"何名様（何席）ですか？ / 20席です。"},{left:"🗣️ Envoyez la sauce !",right:"💬 Tout de suite !",context:"ソースを出して！ / ただちに！"}];for(;e.length<4;){const l=n[e.length%n.length];e.push({id:`default_${e.length}`,left:l.left,right:l.right,context:l.context})}return e}function nt(){var n;const e=document.createElement("div"),o=document.createElement("h2");o.className="section-title",o.innerText="Vérification des Connaissances",e.appendChild(o);const r=document.createElement("p");r.className="section-subtitle",r.innerText="Test your professional French vocabulary, kitchen commands, and classical cuisine theory.",e.appendChild(r);const a=document.createElement("div");return a.className="loading-placeholder",a.innerText="Chargement du quiz... (Loading quiz...)",e.appendChild(a),Ze(),(n=b.settings)!=null&&n.targetLevel,Promise.all([te(),R("vocabulary","ALL"),R("grammar","ALL"),R("cuisine","ALL")]).then(()=>{a.remove(),at(e)}),e}function at(e){let o="multiple",r="ALL";const a=document.createElement("div");a.className="quiz-mode-selector",a.innerHTML=`
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
  `,e.appendChild(n);const i=n.querySelector("#quiz-cat-select");i.addEventListener("change",f=>{r=f.target.value,t()});const l=document.createElement("div");l.className="quiz-game-wrapper",e.appendChild(l),a.querySelectorAll(".mode-tab-btn").forEach(f=>{f.addEventListener("click",v=>{a.querySelectorAll(".mode-tab-btn").forEach(_=>_.classList.remove("active")),v.target.classList.add("active"),o=v.target.getAttribute("data-mode"),o==="matching_taking"?(i.disabled=!0,i.style.opacity="0.5"):(i.disabled=!1,i.style.opacity="1.0"),t()})});function t(){l.innerHTML="",o==="multiple"?g():o==="matching_vocab"?u():o==="matching_taking"?d():o==="spelling"&&s()}function g(){var k;const f=((k=b.db)==null?void 0:k.quizzes)||[],v=et();let _=[...f,...v];if(r!=="ALL"&&(_=_.filter(x=>x.category===r)),_.length===0){l.innerHTML=`
        <div class="quiz-card" style="text-align: center; padding: 2rem;">
          <p style="color: var(--color-text-muted); font-style: italic;">Aucune question trouvée dans cette catégorie. Essayez un autre filtre !</p>
        </div>
      `;return}const c=N(_).slice(0,10);let w=0,p=0,S=!1;function h(){if(l.innerHTML="",S=!1,w>=c.length){const $=Math.round(p/c.length*100);let j="Apprenti (Apprentice)";$>=90?j="Chef de Partie (Station Chef)":$>=70&&(j="Commis de Cuisine (Line Cook)"),l.innerHTML=`
          <div class="quiz-card" style="text-align: center;">
            <h3 style="font-family: var(--font-serif); font-size: 2rem; color: var(--color-primary); margin-bottom: 1rem;">Session Terminée !</h3>
            <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">Your Score: <strong>${p} / ${c.length}</strong> (${$}%)</p>
            <div style="background-color: rgba(197, 168, 128, 0.1); border: 1px solid var(--color-accent); padding: 1.5rem; border-radius: var(--radius-md); margin-bottom: 2rem;">
              <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--color-text-muted); letter-spacing: 1px;">Assigned Rank</div>
              <div style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--color-primary); font-weight: 700; margin-top: 0.3rem;">${j}</div>
            </div>
            <button class="next-btn" id="restart-choice-btn" style="margin: 0 auto; display: block;">Restart Session</button>
          </div>
        `,l.querySelector("#restart-choice-btn").addEventListener("click",()=>{g()});return}const x=c[w],L=document.createElement("div");L.className="quiz-card",L.innerHTML=`
        <div class="quiz-meta">
          <span>Question ${w+1} of ${c.length}</span>
          <span class="grammar-badge" style="background-color: var(--color-secondary);">${x.category}</span>
        </div>
        
        <div class="quiz-question" style="display: flex; flex-direction: column; gap: 0.8rem; margin-bottom: 1.5rem;">
          <div class="q-fr" style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--color-primary); font-style: italic; line-height: 1.3;">${x.question_fr||x.question||""}</div>
          ${x.question_en?`
            <div class="quiz-hint-flip-container" style="cursor: pointer; margin-top: 0.5rem;">
              <div class="q-en-card" style="padding: 0.5rem; border-radius: var(--radius-sm); border: 1px dashed rgba(197, 168, 128, 0.4); text-align: center; background-color: rgba(197, 168, 128, 0.02); font-size: 0.85rem; color: var(--color-accent); font-weight: 500;">
                💡 Translate (Show English Hint)
              </div>
              <div class="q-en-hint-text" style="display: none; padding: 0.5rem; margin-top: 0.3rem; font-style: italic; color: var(--color-text-muted); font-size: 0.9rem;">${x.question_en}</div>
            </div>
          `:""}
        </div>
        
        <div class="quiz-options">
          ${x.options.map(($,j)=>`
            <button class="quiz-btn" data-index="${j}">${$}</button>
          `).join("")}
        </div>
        
        <div class="quiz-feedback" style="display: none; margin-top: 1.5rem; background-color: rgba(10,25,49,0.03); padding: 1rem; border-radius: var(--radius-sm); border-left: 3px solid var(--color-primary);">
          <strong>Contexte Culinaire:</strong>
          <p style="margin-top: 0.4rem; font-style: italic; font-size: 0.9rem;">${x.context}</p>
        </div>
        
        <div style="margin-top: 1.5rem;">
          <button class="next-btn" id="next-q-btn" style="display: none; margin-left: auto;">Continue →</button>
        </div>
      `;const C=L.querySelector(".quiz-hint-flip-container");C&&C.addEventListener("click",()=>{const $=C.querySelector(".q-en-hint-text"),j=$.style.display==="none";$.style.display=j?"block":"none",C.querySelector(".q-en-card").innerText=j?"💡 Hide English Hint":"💡 Translate (Show English Hint)"});const q=L.querySelectorAll(".quiz-btn"),y=L.querySelector(".quiz-feedback"),T=L.querySelector("#next-q-btn");q.forEach($=>{$.addEventListener("click",j=>{if(S)return;S=!0;const M=j.target.innerText===x.answer;q.forEach(z=>{z.disabled=!0,z.innerText===x.answer&&z.classList.add("correct")}),M?p++:(j.target.classList.add("incorrect"),de(x.id)),y.style.display="block",T.style.display="block"})}),T.addEventListener("click",()=>{w++,h()}),l.appendChild(L)}h()}function u(){var h,k;const f=((h=b.settings)==null?void 0:h.includeGeneral)||!1;let _=(((k=b.db)==null?void 0:k.vocabulary)||[]).filter(x=>f||x.is_professional);if(r!=="ALL"&&(r==="meat"?_=_.filter(x=>{var L,C,q,y;return((L=x.tags)==null?void 0:L.includes("meat"))||((C=x.tags)==null?void 0:C.includes("beef"))||((q=x.tags)==null?void 0:q.includes("pork"))||((y=x.tags)==null?void 0:y.includes("poultry"))||/viande|boeuf|porc|poulet/i.test(x.french)}):r==="sauces"?_=_.filter(x=>{var L,C,q;return((L=x.tags)==null?void 0:L.includes("sauce"))||((C=x.tags)==null?void 0:C.includes("sauces"))||((q=x.tags)==null?void 0:q.includes("stocks"))||/sauce|fond|jus|bouillon/i.test(x.french)}):r==="cuts"?_=_.filter(x=>{var L,C;return((L=x.tags)==null?void 0:L.includes("cutting"))||((C=x.tags)==null?void 0:C.includes("vegetables"))||/coupe|tailler|ciseler|mincer|brunoise|julienne/i.test(x.french)}):r==="science"?_=_.filter(x=>{var L;return((L=x.tags)==null?void 0:L.includes("science"))||/réaction|émulsion|liaison/i.test(x.french)}):r==="grammar"&&(_=[])),_.length<4){l.innerHTML=`
        <div class="quiz-card" style="text-align: center; padding: 2rem;">
          <p style="color: var(--color-text-muted); font-style: italic;">Il faut au moins 4 termes de vocabulaire dans cette catégorie pour jouer l'Association.</p>
        </div>
      `;return}const c=N(_).slice(0,4),w=N(c),p=N(c),S=document.createElement("div");S.className="quiz-card",S.innerHTML=`
      <div class="quiz-meta" style="margin-bottom: 1rem;">
        <span>🤝 Association (vocabulary)</span>
        <span class="grammar-badge" style="background-color: var(--color-primary);">Game</span>
      </div>
      <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 1.5rem;">
        Drag a French term from the left, and drop it onto its Japanese translation on the right. (Or click left card, then click match).
      </p>
      
      <div class="matching-board">
        <div class="matching-column" id="left-column">
          ${w.map(x=>`
            <div class="drag-card" draggable="true" data-id="${x.id}" id="drag-${x.id}">
              <span>${x.french}</span>
              <span style="font-size: 1rem; opacity: 0.3;">☰</span>
            </div>
          `).join("")}
        </div>
        
        <div class="matching-column" id="right-column">
          ${p.map(x=>`
            <div class="drop-zone" data-id="${x.id}">
              ${x.japanese}
            </div>
          `).join("")}
        </div>
      </div>
      
      <div id="matching-completion-panel" style="display: none; text-align: center; margin-top: 1.5rem;">
        <div style="color: var(--color-success); font-weight: 700; font-size: 1.1rem; margin-bottom: 1rem;">🤝 Excellent ! Tous les termes ont été associés avec succès.</div>
        <button class="next-btn" id="restart-match-btn" style="margin: 0 auto; display: block;">Play Again</button>
      </div>
    `,l.appendChild(S),m(S,4,u)}function d(){const f=tt(),v=document.createElement("div");v.className="quiz-card",v.innerHTML=`
      <div class="quiz-meta" style="margin-bottom: 1rem;">
        <span>🤝 Association (taking) - Conversation & Cloze</span>
        <span class="grammar-badge" style="background-color: var(--color-success);">Dialogue</span>
      </div>
      <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 1.5rem;">
        Match dialogues or sentence fragments. Drag a card from the left, and drop it onto the correct continuation or response on the right.
      </p>
      
      <div class="matching-board">
        <div class="matching-column" id="left-column">
          ${N(f).map(_=>`
            <div class="drag-card" draggable="true" data-id="${_.id}" id="drag-${_.id}" style="font-size: 0.9rem; padding: 0.8rem;">
              <span>${_.left}</span>
              <span style="font-size: 1rem; opacity: 0.3;">☰</span>
            </div>
          `).join("")}
        </div>
        
        <div class="matching-column" id="right-column">
          ${N(f).map(_=>`
            <div class="drop-zone" data-id="${_.id}" style="font-size: 0.9rem; padding: 0.8rem; min-height: 48px;">
              ${_.right}
            </div>
          `).join("")}
        </div>
      </div>
      
      <div id="matching-completion-panel" style="display: none; text-align: center; margin-top: 1.5rem;">
        <div style="color: var(--color-success); font-weight: 700; font-size: 1.1rem; margin-bottom: 1rem;">🗣️ Parfait ! Vous maîtrisez la communication en cuisine.</div>
        <button class="next-btn" id="restart-match-btn" style="margin: 0 auto; display: block;">Play Again</button>
      </div>
    `,l.appendChild(v),m(v,4,d)}function m(f,v,_){let c=null,w=null,p=0;const S=f.querySelectorAll(".drag-card"),h=f.querySelectorAll(".drop-zone"),k=f.querySelector("#matching-completion-panel");S.forEach(C=>{C.addEventListener("dragstart",q=>{c=q.target.closest(".drag-card").getAttribute("data-id"),q.target.closest(".drag-card").classList.add("dragging")}),C.addEventListener("dragend",q=>{q.target.closest(".drag-card").classList.remove("dragging")}),C.addEventListener("click",q=>{const y=q.target.closest(".drag-card");y.classList.contains("matched")||(S.forEach(T=>T.style.borderColor="rgba(10,25,49,0.08)"),w=y.getAttribute("data-id"),y.style.borderColor="var(--color-accent)")})}),h.forEach(C=>{C.addEventListener("dragover",q=>{q.preventDefault(),C.classList.contains("matched")||C.classList.add("hovered")}),C.addEventListener("dragleave",()=>{C.classList.remove("hovered")}),C.addEventListener("drop",q=>{q.preventDefault(),C.classList.remove("hovered");const y=C.getAttribute("data-id");c===y?L(c,C):x(c)}),C.addEventListener("click",()=>{if(C.classList.contains("matched")||!w)return;const q=C.getAttribute("data-id");w===q?(L(w,C),w=null):(x(w),w=null,S.forEach(y=>y.style.borderColor="rgba(10,25,49,0.08)"))})});function x(C){const q=f.querySelector(`#drag-${C}`);q&&(q.style.animation="shake-anim 0.4s ease-in-out",setTimeout(()=>q.style.animation="",400))}function L(C,q){const y=f.querySelector(`#drag-${C}`);y.classList.add("matched"),y.style.borderColor="var(--color-success)",q.classList.add("matched"),p++,p===v&&(k.style.display="block")}f.querySelector("#restart-match-btn").addEventListener("click",()=>{_()})}function s(){var C,q;const f=((C=b.settings)==null?void 0:C.includeGeneral)||!1;let _=(((q=b.db)==null?void 0:q.vocabulary)||[]).filter(y=>f||y.is_professional);if(r!=="ALL"&&(r==="meat"?_=_.filter(y=>{var T,$,j,B;return((T=y.tags)==null?void 0:T.includes("meat"))||(($=y.tags)==null?void 0:$.includes("beef"))||((j=y.tags)==null?void 0:j.includes("pork"))||((B=y.tags)==null?void 0:B.includes("poultry"))||/viande|boeuf|porc|poulet/i.test(y.french)}):r==="sauces"?_=_.filter(y=>{var T,$,j;return((T=y.tags)==null?void 0:T.includes("sauce"))||(($=y.tags)==null?void 0:$.includes("sauces"))||((j=y.tags)==null?void 0:j.includes("stocks"))||/sauce|fond|jus|bouillon/i.test(y.french)}):r==="cuts"?_=_.filter(y=>{var T,$;return((T=y.tags)==null?void 0:T.includes("cutting"))||(($=y.tags)==null?void 0:$.includes("vegetables"))||/coupe|tailler|ciseler|mincer|brunoise|julienne/i.test(y.french)}):r==="science"?_=_.filter(y=>{var T;return((T=y.tags)==null?void 0:T.includes("science"))||/réaction|émulsion|liaison/i.test(y.french)}):r==="grammar"&&(_=[])),_.length===0){l.innerHTML=`
        <div class="quiz-card" style="text-align: center; padding: 2rem;">
          <p style="color: var(--color-text-muted); font-style: italic;">Aucun terme de vocabulaire disponible dans cette catégorie pour jouer l'Orthographe.</p>
        </div>
      `;return}let c=N(_)[0];const w=document.createElement("div");w.className="quiz-card",w.innerHTML=`
      <div class="quiz-meta" style="margin-bottom: 1.2rem;">
        <span>📖 Orthographe de Cuisine</span>
        <span class="grammar-badge" style="background-color: var(--color-secondary);">${c.category}</span>
      </div>
      
      <div class="spelling-box" style="margin-bottom: 1.5rem; background-color: rgba(10,25,49,0.02); padding: 1.2rem; border-radius: var(--radius-sm); border-left: 3px solid var(--color-accent);">
        <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-accent); font-weight: 600; margin-bottom: 0.4rem;">Définition en Français (Monolingual Clue):</div>
        <p style="font-size: 1.05rem; font-style: italic; color: var(--color-primary); line-height: 1.4; font-family: var(--font-serif);">${c.definition_fr}</p>
        
        <div style="margin-top: 1rem; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 0.8rem; font-size: 0.85rem; color: var(--color-text-muted);">
          <strong>Hint (Japanese):</strong> ${c.japanese}
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
    `,l.appendChild(w);const p=w.querySelector("#spelling-input-field"),S=w.querySelector("#spelling-submit-btn"),h=w.querySelector("#spelling-next-btn"),k=w.querySelector("#spelling-feedback-panel"),x=w.querySelector("#spelling-feedback-title"),L=w.querySelector("#spelling-feedback-msg");p.addEventListener("keydown",y=>{y.key==="Enter"&&S.click()}),S.addEventListener("click",()=>{const y=p.value,T=c.french,$=se(y),j=se(T),B=$===j;p.disabled=!0,S.style.display="none",h.style.display="block",k.style.display="block",B?(p.style.borderColor="var(--color-success)",p.style.backgroundColor="#E8F5E9",k.style.backgroundColor="#E8F5E9",k.style.color="var(--color-success)",x.innerText="✓ Félicitations ! (Correct)",L.innerText=`You correctly spelled: "${T}"`):(p.style.borderColor="var(--color-error)",p.style.backgroundColor="#FFEBEE",k.style.backgroundColor="#FFEBEE",k.style.color="var(--color-error)",x.innerText="✗ Incorrect",L.innerHTML=`Correct spelling is: <strong>${T}</strong>.<br><em style="font-size:0.85rem;">You typed: "${y}"</em>`,de(c.id))}),h.addEventListener("click",()=>{s()})}t()}function K(){const e=document.createElement("div"),o=document.createElement("h2");o.className="section-title",o.innerText="Coups de Cœur (Favorites)",e.appendChild(o);const r=document.createElement("p");r.className="section-subtitle",r.innerText="Your bookmarked vocabulary terms, grammar guides, and culinary theories.",e.appendChild(r);const a=Array.from(b.favorites);if(a.length===0)return e.innerHTML+=`
      <div class="alert alert-info">
        <p>No favorites saved yet. Browse Vocabulary, Grammar, or Cuisine and click the star (☆) button to save items here.</p>
      </div>
    `,e;const n=document.createElement("div");return n.className="loading-placeholder",n.innerText="Chargement des favoris... (Loading favorites...)",e.appendChild(n),ne().then(()=>{n.remove(),rt(e,a)}),e}function rt(e,o){var t,g,u;const r=(((t=b.db)==null?void 0:t.vocabulary)||[]).filter(d=>o.includes(d.id)),a=(((g=b.db)==null?void 0:g.grammar)||[]).filter(d=>o.includes(d.id)),n=(((u=b.db)==null?void 0:u.cuisine)||[]).filter(d=>o.includes(d.id)),i=document.createElement("div");i.className="card-grid",e.appendChild(i);function l(){i.innerHTML="",r.forEach(d=>{const m=document.createElement("div");m.className="card",m.innerHTML=`
        <div>
          <div class="card-category">Vocabulary: ${d.category}</div>
          <div class="term-header">
            <h3 class="term-title">${d.french}</h3>
            <button class="fav-btn active" data-id="${d.id}">★</button>
          </div>
          <div class="term-translations">
            <div class="trans-en">${d.english}</div>
            <div class="trans-ja">${d.japanese}</div>
          </div>
        </div>
        <div class="term-context">
          <div class="context-fr">"${d.context_fr}"</div>
          <div class="context-ja">${d.context_ja}</div>
        </div>
      `,m.querySelector(".fav-btn").addEventListener("click",s=>{W(d.id),K(),e.innerHTML="",e.appendChild(K())}),i.appendChild(m)}),a.forEach(d=>{var s,f;const m=document.createElement("div");m.className="card",m.innerHTML=`
        <div>
          <div class="card-category">Grammar: ${d.level}</div>
          <div class="term-header">
            <h3 class="term-title" style="font-size: 1.25rem;">${d.topic}</h3>
            <button class="fav-btn active" data-id="${d.id}">★</button>
          </div>
          <p style="font-size: 0.85rem; margin-bottom: 1rem; color: var(--color-text-main);">${d.explanation_en.substring(0,100)}...</p>
        </div>
        <div style="font-size: 0.8rem; font-weight: bold; text-transform: uppercase; color: var(--color-accent);">Example:</div>
        <div class="term-context" style="margin-top: 0.5rem;">
          <div class="context-fr">"${((s=d.examples[0])==null?void 0:s.fr)||""}"</div>
          <div class="context-ja">${((f=d.examples[0])==null?void 0:f.ja)||""}</div>
        </div>
      `,m.querySelector(".fav-btn").addEventListener("click",v=>{W(d.id),e.innerHTML="",e.appendChild(K())}),i.appendChild(m)}),n.forEach(d=>{const m=document.createElement("div");m.className="card",m.innerHTML=`
        <div>
          <div class="card-category">Cuisine: ${d.category}</div>
          <div class="term-header">
            <h3 class="term-title" style="font-size: 1.25rem;">${d.topic}</h3>
            <button class="fav-btn active" data-id="${d.id}">★</button>
          </div>
          <p style="font-size: 0.85rem; margin-bottom: 1rem; color: var(--color-text-main);">${d.content_en.substring(0,100)}...</p>
        </div>
      `,m.querySelector(".fav-btn").addEventListener("click",s=>{W(d.id),e.innerHTML="",e.appendChild(K())}),i.appendChild(m)})}l()}function it(){const e=document.createElement("div"),o=document.createElement("h2");o.className="section-title",o.innerText="Pont d'Études (SRS Review Deck)",e.appendChild(o);const r=document.createElement("p");r.className="section-subtitle",r.innerText="Review and grade yourself on items scheduled for active recall today.",e.appendChild(r);const a=document.createElement("div");return a.className="loading-placeholder",a.innerText="Chargement des révisions... (Loading reviews...)",e.appendChild(a),ne().then(()=>{a.remove(),ot(e)}),e}function ot(e){var g,u,d,m;const o=new Date().toISOString().split("T")[0],a=[...(((g=b.db)==null?void 0:g.vocabulary)||[]).map(s=>({...s,type:"vocabulary",front:s.french})),...(((u=b.db)==null?void 0:u.grammar)||[]).map(s=>({...s,type:"grammar",front:s.topic})),...(((d=b.db)==null?void 0:d.cuisine)||[]).map(s=>({...s,type:"cuisine",front:s.topic})),...(((m=b.db)==null?void 0:m.quizzes)||[]).map(s=>({...s,type:"quiz",front:s.question_fr||s.question||""}))].filter(s=>{const f=b.srs[s.id];return b.wrongAnswers.includes(s.id)||f&&f.dueDate<=o}),n=a.length;let i=0;const l=document.createElement("div");l.className="srs-review-container",e.appendChild(l);function t(){if(l.innerHTML="",a.length===0||i>=a.length){l.innerHTML=`
        <div class="alert alert-info" style="background-color: #E8F5E9; border-left-color: var(--color-success); color: var(--color-success); padding: 2rem; text-align: center;">
          <h3 style="font-family: var(--font-serif); font-size: 1.8rem; margin-bottom: 0.5rem;">Tout est propre !</h3>
          <p>No cards due for review today. Excellent job keeping up with your kitchen training!</p>
        </div>
      `;return}const s=a[i];b.srs[s.id];const f=b.wrongAnswers.includes(s.id),v=document.createElement("div");v.className="card srs-flip-card",v.style.padding="2rem",v.style.minHeight="300px",v.style.display="flex",v.style.flexDirection="column",v.style.justifyContent="space-between";let _=s.category||s.level||"Theory";s.type==="quiz"&&(_="Quiz Mistake");let c=`
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
          <span class="card-category">${_} • ${s.type.toUpperCase()}</span>
          <span style="font-size: 0.8rem; color: var(--color-text-muted);">
            Card ${i+1} of ${n}
            ${f?' <span style="color: var(--color-error); font-weight: bold;">(Wrong Answer)</span>':""}
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
    `;v.innerHTML=c;let w="";s.type==="vocabulary"?w=`
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
      `:s.type==="grammar"?w=`
        <div style="margin-top: 1rem;">
          <p style="font-weight: 600; color: var(--color-primary);">Explanation (EN):</p>
          <p style="font-size: 0.9rem; margin-bottom: 0.8rem;">${s.explanation_en}</p>
          <p style="font-weight: 600; color: var(--color-primary);">説明 (JA):</p>
          <p style="font-size: 0.9rem; margin-bottom: 1rem;">${s.explanation_ja}</p>
          <div class="examples-list" style="border-top: 1px solid rgba(0,0,0,0.05); padding-top: 0.8rem;">
            ${s.examples.map(p=>`
              <div class="example-item" style="margin-bottom: 0.5rem;">
                <div class="example-fr">➔ ${p.fr}</div>
                <div class="example-ja" style="font-size: 0.8rem; color: var(--color-text-muted);">${p.ja}</div>
              </div>
            `).join("")}
          </div>
        </div>
      `:s.type==="cuisine"?w=`
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
      `:s.type==="quiz"&&(w=`
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
      `),v.querySelector("#reveal-btn").addEventListener("click",()=>{v.innerHTML=`
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <span class="card-category">${_} • ${s.type.toUpperCase()}</span>
            <span style="font-size: 0.8rem; color: var(--color-text-muted);">Card ${i+1} of ${n}</span>
          </div>
          
          <h2 style="font-family: var(--font-serif); font-size: 1.8rem; color: var(--color-primary); font-style: italic; text-align: center; margin-bottom: 1rem; line-height: 1.3;">${s.front}</h2>
          ${s.type==="quiz"&&s.question_en?`<p style="font-family: var(--font-sans); color: var(--color-text-muted); font-size: 0.9rem; text-align: center; margin-bottom: 1.5rem;">${s.question_en}</p>`:""}
          
          <div style="max-height: 300px; overflow-y: auto; padding-right: 0.5rem; margin-bottom: 2rem;">
            ${w}
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
      `;const p=v.querySelector(".flip-translation-container");p&&p.addEventListener("click",S=>{S.stopPropagation(),p.querySelector(".flip-translation-card").classList.toggle("flipped")}),v.querySelectorAll(".audio-btn").forEach(S=>{S.addEventListener("click",h=>{h.stopPropagation();const k=h.target.closest(".audio-btn").getAttribute("data-text");I(k)})}),v.querySelectorAll(".srs-score-btn").forEach(S=>{S.addEventListener("click",h=>{const k=parseInt(h.target.getAttribute("data-score"));J(s.id,k),k>=4&&f&&yt(s.id),i++,t()})})}),l.appendChild(v)}t()}function st(){const e=document.createElement("div"),o=document.createElement("h2");o.className="section-title",o.innerText="Recherche Globale",e.appendChild(o);const r=document.createElement("p");r.className="section-subtitle",r.innerText="Search terms across the entire curriculum: Vocabulary, Grammar, and Culinary Theory.",e.appendChild(r);const a=document.createElement("div");a.className="search-box-wrapper",a.style.marginBottom="2rem",a.style.position="relative";const n=document.createElement("input");n.type="text",n.placeholder="Chargement de la base de données... (Loading database...)",n.className="search-input",n.style.width="100%",n.style.padding="1rem 1.5rem",n.style.fontSize="1.1rem",n.style.borderRadius="var(--radius-md)",n.style.border="2px solid rgba(197, 168, 128, 0.2)",n.style.backgroundColor="var(--color-bg)",n.style.fontFamily="var(--font-sans)",n.style.transition="var(--transition)",n.style.outline="none",n.disabled=!0,n.addEventListener("focus",()=>{n.style.borderColor="var(--color-accent)",n.style.boxShadow="0 0 10px rgba(212, 175, 55, 0.15)"}),n.addEventListener("blur",()=>{n.style.borderColor="rgba(197, 168, 128, 0.2)",n.style.boxShadow="none"}),a.appendChild(n),e.appendChild(a);const i=document.createElement("div");return i.className="search-results",e.appendChild(i),i.innerHTML=`
    <div style="text-align: center; padding: 3rem; color: var(--color-text-muted);">
      <p>Préparation de la recherche... (Preparing search database...)</p>
    </div>
  `,ne().then(()=>{n.disabled=!1,n.placeholder="Rechercher... (e.g. sauce, roux, cut, culer, 刻む)";function l(t){var f,v,_;if(i.innerHTML="",!t.trim()){i.innerHTML=`
          <div style="text-align: center; padding: 3rem; color: var(--color-text-muted);">
            <span style="font-size: 3rem;">🔍</span>
            <p style="margin-top: 1rem;">Tapez un mot-clé pour commencer votre recherche.</p>
          </div>
        `;return}const g=t.toLowerCase().trim(),u=((f=b.db)==null?void 0:f.vocabulary)||[],d=((v=b.db)==null?void 0:v.grammar)||[],m=((_=b.db)==null?void 0:_.cuisine)||[],s=[];if(u.forEach(c=>{`${c.french} ${c.english} ${c.japanese} ${c.category} ${c.context_fr} ${c.context_en} ${c.context_ja} ${(c.tags||[]).join(" ")}`.toLowerCase().includes(g)&&s.push({...c,type:"vocabulary",title:c.french,subtitle:`${c.category} • Vocabulary`})}),d.forEach(c=>{`${c.topic} ${c.explanation_en} ${c.explanation_ja} ${c.level} ${(c.tags||[]).join(" ")} ${c.examples.map(p=>`${p.fr} ${p.en} ${p.ja}`).join(" ")}`.toLowerCase().includes(g)&&s.push({...c,type:"grammar",title:c.topic,subtitle:`${c.level} • Grammar Lesson`})}),m.forEach(c=>{`${c.topic} ${c.category} ${c.content_fr} ${c.content_en} ${c.content_ja} ${(c.tags||[]).join(" ")}`.toLowerCase().includes(g)&&s.push({...c,type:"cuisine",title:c.topic,subtitle:`${c.category} • Culinary Theory`})}),s.length===0){i.innerHTML=`
          <div style="text-align: center; padding: 3rem; color: var(--color-text-muted);">
            <p>Aucun résultat trouvé pour "<strong>${t}</strong>".</p>
            <p style="font-size: 0.9rem; margin-top: 0.5rem;">Check your spelling or try another keyword.</p>
          </div>
        `;return}s.forEach(c=>{const w=document.createElement("div");w.className="card search-result-card",w.style.marginBottom="1.2rem",w.style.borderLeft=`4px solid ${c.type==="vocabulary"?"var(--color-primary)":c.type==="grammar"?"var(--color-secondary)":"var(--color-accent)"}`;const p=G(c.id);let S="";c.type==="vocabulary"?S=`
            <div class="term-translations" style="margin-top: 0.5rem;">
              <div class="trans-en">${c.english}</div>
              <div class="trans-ja">${c.japanese}</div>
            </div>
            <div class="term-context" style="margin-top: 1rem;">
              <div class="context-fr">"${c.context_fr}"</div>
              <div class="context-ja">${c.context_ja}</div>
            </div>
          `:c.type==="grammar"?S=`
            <p style="font-size: 0.9rem; margin-top: 0.5rem; color: var(--color-text-main);">${c.explanation_en}</p>
            <p style="font-size: 0.85rem; margin-top: 0.3rem; color: var(--color-text-muted);">${c.explanation_ja}</p>
            <div class="examples-list" style="margin-top: 1rem; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 0.8rem;">
              ${c.examples.slice(0,2).map(k=>`
                <div class="example-item" style="margin-bottom: 0.5rem;">
                  <div class="example-fr" style="font-weight: 500;">➔ ${k.fr}</div>
                  <div class="example-ja" style="font-size: 0.8rem; color: var(--color-text-muted);">${k.ja}</div>
                </div>
              `).join("")}
            </div>
          `:c.type==="cuisine"&&(S=`
            <p style="font-size: 0.9rem; margin-top: 0.5rem; font-style: italic; color: var(--color-primary);">${c.content_fr.substring(0,150)}...</p>
            <p style="font-size: 0.85rem; margin-top: 0.5rem; color: var(--color-text-main);">${c.content_ja.substring(0,120)}...</p>
          `);const h=(c.tags||[]).map(k=>`<span class="tag-badge" style="background-color: rgba(197, 168, 128, 0.12); color: var(--color-accent); font-size: 0.75rem; padding: 0.2rem 0.6rem; border-radius: 20px; font-weight: 500;">#${k}</span>`).join(" ");w.innerHTML=`
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem;">
            <div>
              <div class="card-category" style="margin: 0; font-size: 0.75rem;">${c.subtitle}</div>
              <h3 class="term-title" style="margin-top: 0.2rem; font-size: 1.4rem;">${c.title}</h3>
            </div>
            <button class="fav-btn ${p?"active":""}" data-id="${c.id}">
              ${p?"★":"☆"}
            </button>
          </div>
          ${S}
          ${c.tags&&c.tags.length>0?`<div style="margin-top: 1rem; display: flex; flex-wrap: wrap; gap: 0.4rem;">${h}</div>`:""}
        `,w.querySelector(".fav-btn").addEventListener("click",k=>{k.stopPropagation(),W(c.id);const x=k.target,L=G(c.id);x.classList.toggle("active",L),x.innerText=L?"★":"☆"}),i.appendChild(w)})}n.addEventListener("input",t=>{l(t.target.value)}),l("")}),e}function ct(){const e=document.createElement("div"),o=document.createElement("h2");o.className="section-title",o.innerText="Configuration de l'Académie",e.appendChild(o);const r=document.createElement("p");r.className="section-subtitle",r.innerText="Customize your learning goals, target CEFR levels, and database options.",e.appendChild(r);const a=document.createElement("div");a.className="card",a.style.padding="2rem";const n=b.settings;a.innerHTML=`
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
  `;const i=a.querySelector("#target-level-select"),l=a.querySelector("#new-cards-goal"),t=a.querySelector("#max-reviews-goal"),g=a.querySelector("#include-general-checkbox"),u=a.querySelector("#settings-status");function d(){const m=i.value,s=parseInt(l.value)||5,f=parseInt(t.value)||20,v=g.checked;_t({targetLevel:m,newCardsPerDay:s,maxReviewsPerDay:f,includeGeneral:v}),u.style.display="block",setTimeout(()=>{u.style.display="none"},3e3)}return i.addEventListener("change",d),l.addEventListener("input",d),t.addEventListener("input",d),g.addEventListener("change",d),a.querySelector("#reset-srs-btn").addEventListener("click",()=>{confirm("Voulez-vous vraiment réinitialiser toutes vos données de progression SRS ? Cette action est irréversible.")&&(localStorage.removeItem("cba_srs"),b.srs={},alert("Spaced Repetition System progress has been reset."),window.location.reload())}),a.querySelector("#clear-favs-btn").addEventListener("click",()=>{confirm("Voulez-vous vraiment supprimer tous vos favoris ?")&&(localStorage.removeItem("cba_favorites"),b.favorites=new Set,alert("All favorites have been cleared."),window.location.reload())}),a.querySelector("#share-app-btn").addEventListener("click",()=>{const m={title:"Académie de la Brigade",text:"フランス料理・厨房フランス語の統合学習PWAアプリ「Académie de la Brigade」で一緒に料理と語学を学びましょう！",url:window.location.origin+window.location.pathname};navigator.share?navigator.share(m).then(()=>console.log("Shared successfully")).catch(s=>console.log("Error sharing:",s)):navigator.clipboard.writeText(m.url).then(()=>{alert("App link copied to clipboard! Share it with your friends.")}).catch(s=>{console.error("Failed to copy link:",s)})}),e.appendChild(a),e}function lt(){var i;const e=document.createElement("div"),o=document.createElement("h2");o.className="section-title",o.innerText="Dictée de Cuisine (Culinary Dictations)",e.appendChild(o);const r=document.createElement("p");r.className="section-subtitle",r.innerText="Listen to French kitchen instruction sentences, type what you hear, and master French spelling.",e.appendChild(r);const a=document.createElement("div");a.className="loading-placeholder",a.innerText="Chargement de la dictée... (Loading dictation...)",e.appendChild(a);const n=((i=b.settings)==null?void 0:i.targetLevel)||"ALL";return R("vocabulary",n).then(()=>{a.remove(),dt(e)}),e}function dt(e){var c,w;const o=((c=b.settings)==null?void 0:c.includeGeneral)||!1,n=(((w=b.db)==null?void 0:w.vocabulary)||[]).filter(p=>o||p.is_professional).filter(p=>p.context_fr);if(n.length===0){e.innerHTML+='<p style="color: var(--color-text-muted);">Aucun exercice disponible.</p>';return}const i=[...n].sort(()=>.5-Math.random()).slice(0,5);let l=0,t=!1,g=!1,u=!1,d=0,m=1;const s=document.createElement("div");s.className="dictation-container",s.style.maxWidth="600px",s.style.margin="1.5rem auto",e.appendChild(s);function f(p){return p.toLowerCase().trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()'"?]/g,"").replace(/\s+/g," ")}function v(p){return p.normalize("NFD").replace(/[\u0300-\u036f]/g,"")}function _(){if(s.innerHTML="",t=!1,Z(),g=!1,u=!1,d=0,l>=i.length){const E=document.createElement("div");E.className="card",E.style.padding="2.5rem",E.style.textAlign="center",E.innerHTML=`
        <h3 style="font-family: var(--font-serif); font-size: 2rem; color: var(--color-primary); margin-bottom: 1rem;">Session Terminée !</h3>
        <p style="font-size: 1.1rem; margin-bottom: 2rem; color: var(--color-text-muted);">You completed all culinary dictation drills in this session.</p>
        <button id="restart-dictation-btn" class="next-btn" style="width: 100%;">Restart New Dictation Session</button>
      `,E.querySelector("#restart-dictation-btn").addEventListener("click",()=>{l=0,i.length=0,i.push(...[...n].sort(()=>.5-Math.random()).slice(0,5)),_()}),s.appendChild(E);return}const p=i[l],S=p.context_fr,h=document.createElement("div");h.className="card",h.style.padding="2rem",h.innerHTML=`
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 0.8rem;">
        <span class="card-category" style="margin: 0;">Drill ${l+1} of ${i.length}</span>
        <span style="font-size: 0.8rem; color: var(--color-text-muted); font-weight: 500;">Topic: ${p.category}</span>
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
    `;const k=h.querySelector("#play-pause-btn"),x=h.querySelector("#stop-btn"),L=h.querySelector("#speed-normal-btn"),C=h.querySelector("#speed-slow-btn"),q=h.querySelector("#dictation-seekbar"),y=h.querySelector("#dictation-input"),T=h.querySelector("#check-btn"),$=h.querySelector("#next-dictation-btn"),j=h.querySelector("#dictation-feedback");function B(E,P){if(!t){const A=E/P*100;q.value=Math.round(A),d=E}}function M(){g=!1,u=!1,d=0,k.innerText="▶ Play",q.value=0}function z(){me(S,m,B,M,d)}k.addEventListener("click",()=>{t||(g?u?(u=!1,k.innerText="⏸ Pause",he()):(u=!0,k.innerText="▶ Play",fe()):(g=!0,u=!1,k.innerText="⏸ Pause",z()))}),x.addEventListener("click",()=>{Z(),M()}),q.addEventListener("change",E=>{if(t)return;const P=parseInt(E.target.value),A=S.replace(/["'➔]/g,"").trim();d=Math.floor(P/100*A.length);const F=A.indexOf(" ",d);F!==-1&&F-d<5&&(d=F+1),g=!0,u=!1,k.innerText="⏸ Pause",z()}),L.addEventListener("click",()=>{m!==1&&(m=1,L.classList.add("active"),L.style.backgroundColor="var(--color-primary)",L.style.color="#FFFFFF",C.classList.remove("active"),C.style.backgroundColor="transparent",C.style.color="var(--color-accent)",g&&!u&&z())}),C.addEventListener("click",()=>{m!==.75&&(m=.75,C.classList.add("active"),C.style.backgroundColor="var(--color-accent)",C.style.color="#FFFFFF",L.classList.remove("active"),L.style.backgroundColor="transparent",L.style.color="var(--color-accent)",g&&!u&&z())}),T.addEventListener("click",()=>{if(t)return;Z(),M();const E=y.value,P=f(E),A=f(S),F=v(P),D=v(A);let Y=!1,V=!1;P===A?Y=!0:F===D&&(V=!0),j.style.display="block",y.disabled=!0,T.style.display="none",$.style.display="block",t=!0,Y?(j.style.backgroundColor="#E8F5E9",j.style.borderLeft="4px solid var(--color-success)",j.style.color="var(--color-success)",j.innerHTML=`
          <strong style="font-size: 1.1rem; display: block; margin-bottom: 0.4rem;">Très bien ! (Excellent!)</strong>
          <p style="font-size: 0.9rem; color: var(--color-text-main);">Your spelling is perfectly correct.</p>
          <div style="margin-top: 0.8rem; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 0.6rem; font-size: 0.85rem; color: var(--color-text-muted);">
            <strong>Meaning:</strong> ${p.context_ja}
          </div>
        `):V?(j.style.backgroundColor="#FFF3E0",j.style.borderLeft="4px solid var(--color-accent)",j.style.color="#E65100",j.innerHTML=`
          <strong style="font-size: 1.1rem; display: block; margin-bottom: 0.4rem;">Presque correct ! (Almost correct)</strong>
          <p style="font-size: 0.9rem; color: var(--color-text-main);">Watch out for French accents (é, è, à, ç, etc.) or punctuation spacing.</p>
          <div style="margin: 0.8rem 0; padding: 0.6rem; background: rgba(0,0,0,0.02); font-size: 0.9rem; border-radius: var(--radius-sm);">
            <div><strong>Expected:</strong> <span style="font-family: monospace; font-weight: 600; color: var(--color-success);">${S}</span></div>
            <div style="margin-top: 0.2rem;"><strong>Your input:</strong> <span style="font-family: monospace; font-weight: 600; color: var(--color-error);">${E}</span></div>
          </div>
          <div style="border-top: 1px solid rgba(0,0,0,0.05); padding-top: 0.6rem; font-size: 0.85rem; color: var(--color-text-muted);">
            <strong>Meaning:</strong> ${p.context_ja}
          </div>
        `):(j.style.backgroundColor="#FFEBEE",j.style.borderLeft="4px solid var(--color-error)",j.style.color="var(--color-error)",j.innerHTML=`
          <strong style="font-size: 1.1rem; display: block; margin-bottom: 0.4rem;">Incorrect.</strong>
          <div style="margin: 0.8rem 0; padding: 0.6rem; background: rgba(0,0,0,0.02); font-size: 0.9rem; border-radius: var(--radius-sm);">
            <div><strong>Expected:</strong> <span style="font-family: monospace; font-weight: 600; color: var(--color-success);">${S}</span></div>
            <div style="margin-top: 0.2rem;"><strong>Your input:</strong> <span style="font-family: monospace; font-weight: 600; color: var(--color-error);">${E||"(empty)"}</span></div>
          </div>
          <div style="border-top: 1px solid rgba(0,0,0,0.05); padding-top: 0.6rem; font-size: 0.85rem; color: var(--color-text-muted);">
            <strong>Meaning:</strong> ${p.context_ja}
          </div>
        `)}),$.addEventListener("click",()=>{l++,_()}),s.appendChild(h),y.focus()}_()}const ut={proprietress:1.25};let H=null;function mt(){H||(H=new(window.AudioContext||window.webkitAudioContext))}function Q(e,o,r,a=.06){try{mt(),(!H||H.state==="suspended")&&H.resume();const n=H.createOscillator(),i=H.createGain();n.type=o||"sine",n.frequency.setValueAtTime(e,H.currentTime),i.gain.setValueAtTime(a,H.currentTime),i.gain.exponentialRampToValueAtTime(.001,H.currentTime+r),n.connect(i),i.connect(H.destination),n.start(),n.stop(H.currentTime+r)}catch{}}function pt(){Q(780,"sine",.03,.04)}function ce(){Q(523.25,"sine",.08,.08),setTimeout(()=>Q(659.25,"sine",.15,.08),80)}function le(){Q(180,"triangle",.3,.12)}function gt(){Q(110,"sawtooth",.2,.1)}function ft(){const e=document.createElement("div");return e.className="story-mode-container",ge(e),e}async function ge(e){e.innerHTML=`
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
  `,e.querySelectorAll(".play-episode-btn").forEach(o=>{o.addEventListener("click",r=>{const a=r.target.getAttribute("data-chapter"),n=r.target.getAttribute("data-episode");ht(e,a,n)})})}async function ht(e,o,r){try{e.innerHTML='<div class="story-loader"><div class="spinner"></div><p>物語を読み込んでいます...</p></div>';const a=await fetch(`data/story/chapter_${o}.json`);if(!a.ok)throw new Error("Story file could not be loaded");const i=(await a.json()).episodes.find(l=>l.episodeId===r);if(!i)throw new Error("Episode data not found in chapter file");bt(e,i)}catch(a){e.innerHTML=`
      <div class="alert alert-info" style="border-left-color: var(--color-error); background-color: #FFEBEE; color: var(--color-error)">
        <h3>物語の読み込みエラー</h3>
        <p>${a.message}</p>
        <button class="action-btn" onclick="location.reload()">再読み込み</button>
      </div>
    `}}function bt(e,o){let r=0;const a=o.sequence;e.innerHTML=`
    <div class="rpg-game-wrapper">
      <!-- Main Game Board -->
      <div class="rpg-main-viewport" id="rpg-viewport">
        <!-- Tutorial overlay -->
        <div id="rpg-tutorial-overlay" class="rpg-overlay" style="display: none;"></div>
        
        <!-- Character Sprite Layer -->
        <div id="rpg-character-layer" class="rpg-character-layer"></div>
        
        <!-- Dialog UI -->
        <div id="rpg-dialog-pane" class="rpg-dialog-pane" style="display: none;">
          <div class="avatar-holder" id="dialog-avatar"></div>
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
  `;const n=e.querySelector("#rpg-viewport"),i=e.querySelector("#rpg-dialog-pane"),l=e.querySelector("#rpg-battle-pane"),t=e.querySelector("#rpg-reward-pane"),g=e.querySelector("#rpg-tutorial-overlay"),u=e.querySelector("#rpg-sidebar");let d=null,m=!1,s="";function f(){if(m){clearInterval(d);const S=e.querySelector("#dialog-text");S.innerText=s,m=!1;return}if(r>=a.length){ge(e);return}const p=a[r];p.type==="tutorial"?v(p):p.type==="dialog"?_(p):p.type==="fixedBattle"||p.type==="randomBattle"?c(p):p.type==="reward"&&w(p)}n.addEventListener("click",p=>{p.target.closest("button")||p.target.closest(".battle-question-box")||i.style.display==="none"||f()}),f();function v(p){i.style.display="none",l.style.display="none",t.style.display="none",u.style.opacity="0",u.style.pointerEvents="none";const S=e.querySelector("#rpg-character-layer");S&&(S.innerHTML=""),g.innerHTML=`
      <div class="tutorial-card">
        <h3>📖 ${p.title}</h3>
        <p style="white-space: pre-line; line-height: 1.6; text-align: justify; margin: 1.2rem 0; font-size: 0.9rem;">${p.text}</p>
        <button class="action-btn start-tut-btn" style="width: 100%; padding: 0.8rem; font-weight: 700;">冒険を開始する</button>
      </div>
    `,g.style.display="flex",g.querySelector(".start-tut-btn").addEventListener("click",()=>{g.style.display="none",r++,f()})}function _(p){g.style.display="none",l.style.display="none",t.style.display="none",i.style.display="block";const S=o.backgrounds[p.background]||"#000000";n.style.background=S,p.shake&&(n.classList.add("shake-vfx"),setTimeout(()=>n.classList.remove("shake-vfx"),400)),S.includes("url(")?(n.style.backgroundSize="cover",n.style.backgroundPosition="center",n.style.backgroundRepeat="no-repeat"):(n.style.backgroundSize="",n.style.backgroundPosition="",n.style.backgroundRepeat="");const h=e.querySelector("#rpg-character-layer");if(h){h.innerHTML="";let T=[];p.characters&&Array.isArray(p.characters)?T=p.characters:p.character&&(T=[{id:p.character,expression:p.expression||"default",position:p.position||"center"}]),T.forEach($=>{const j=o.characters[$.id],B=$.expression||"default";let M=$.position||"center";T.length===1&&$.id==="proprietress"&&(M="center");let z=null;if(j&&j.images)if(j.images[B])z=j.images[B];else if(B==="default"&&j.images.normal)z=j.images.normal;else{const E=Object.keys(j.images);E.length>0&&(z=j.images[E[0]])}if(z){const E=document.createElement("img");E.src=z,E.className=`rpg-character-sprite pos-${M}`;const P=ut[$.id]||1;E.style.setProperty("--char-scale",P),h.appendChild(E),setTimeout(()=>{E.classList.add("active")},50)}})}const k=p.character?o.characters[p.character]:null,x=e.querySelector("#dialog-avatar"),L=e.querySelector("#dialog-name"),C=e.querySelector("#dialog-text");x.style.display="none",L.style.display="none",p.learningPoint?(e.querySelector("#lp-title").innerText=p.learningPoint.title,e.querySelector("#lp-content").innerText=p.learningPoint.text,u.style.opacity="1",u.style.pointerEvents="auto"):(u.style.opacity="0",u.style.pointerEvents="none");const q=k?`${k.name}：${p.text}`:p.text;C.innerText="",s=q,m=!0;let y=0;clearInterval(d),d=setInterval(()=>{y<q.length?(C.innerText+=q[y],y++,y%2===0&&pt()):(clearInterval(d),m=!1)},30),r++}async function c(p){var j,B;i.style.display="none",g.style.display="none",t.style.display="none",u.style.opacity="0",u.style.pointerEvents="none",l.style.display="flex";const S=e.querySelector("#rpg-character-layer");S&&(S.innerHTML=""),l.innerHTML=`
      <div style="margin: auto; text-align: center;">
        <div class="spinner" style="margin: 0 auto 1rem;"></div>
        <p>試練を読み込んでいます...</p>
      </div>
    `;let h=[];if(p.type==="randomBattle")try{await te();const M=((j=p.conditions)==null?void 0:j.level)||"ALL";M!=="ALL"&&await R("vocabulary",M);let z=[...b.db.quizzes];const E=(B=p.conditions)==null?void 0:B.category;E&&(z=z.filter(A=>A.category&&A.category.toLowerCase()===E.toLowerCase())),z=y(z);const P=p.enemyHp||3;if(h=z.slice(0,P),h.length<P){const A=y(b.db.quizzes.filter(F=>!h.some(D=>D.id===F.id)));h=h.concat(A.slice(0,P-h.length))}h=h.map(A=>{const F=A.options.indexOf(A.answer);return{questionId:A.id,text:A.question,options:A.options,answerIndex:F!==-1?F:0,explanation:A.context||`正解は「${A.answer}」です。`}})}catch(M){console.error("Failed to generate random questions:",M),h=[{questionId:"fb_err_1",text:"プロヴァンス地方の代表的なスープ料理は？",options:["Bouillabaisse","Bœuf bourguignon","Cassoulet","Choucroute"],answerIndex:0,explanation:"ブイヤベースはプロヴァンス地方（マルセイユ）の名物です。"}]}else h=p.questions;let k=p.enemyHp||h.length;const x=k;let L=10;const C=10;let q=0;function y(M){const z=[...M];for(let E=z.length-1;E>0;E--){const P=Math.floor(Math.random()*(E+1));[z[E],z[P]]=[z[P],z[E]]}return z}function T(){if(k<=0){ce(),l.innerHTML=`
          <div class="battle-victory">
            <h2 class="victory-title">👑 VICTOIRE ! (勝利)</h2>
            <p>試練を乗り越え、実力を証明した！</p>
            <button class="action-btn proceed-battle-btn" style="margin-top: 1rem;">次へ進む</button>
          </div>
        `,l.querySelector(".proceed-battle-btn").addEventListener("click",()=>{r++,f()});return}if(L<=0){le(),l.innerHTML=`
          <div class="battle-defeat">
            <h2>💀 GAME OVER</h2>
            <p>HPが尽きてしまいました。もう一度復習して挑戦しましょう！</p>
            <div style="display: flex; gap: 1rem; margin-top: 1rem; width: 100%;">
              <button class="action-btn retry-battle-btn" style="flex: 1;">もう一度挑戦</button>
              <button class="action-btn exit-battle-btn" style="flex: 1; background: #374151;">復習しにいく</button>
            </div>
          </div>
        `,l.querySelector(".retry-battle-btn").addEventListener("click",()=>{c(p)}),l.querySelector(".exit-battle-btn").addEventListener("click",()=>{var P;const E=(P=p.conditions)==null?void 0:P.category;U(E==="grammar"?"grammar":"vocabulary")});return}if(q>=h.length){k>0&&(k=0,T());return}const M=h[q];l.innerHTML=`
        <div class="battle-hud">
          <!-- Player HP -->
          <div class="hud-bar-container">
            <span class="hud-label">VOUS (あなた)</span>
            <div class="hud-hp-track">
              <div class="hud-hp-fill player-hp" style="width: ${L/C*100}%"></div>
            </div>
            <span class="hud-value">${L} / ${C}</span>
          </div>
          
          <!-- Enemy HP -->
          <div class="hud-bar-container">
            <span class="hud-label">${p.enemyName}</span>
            <div class="hud-hp-track">
              <div class="hud-hp-fill enemy-hp" style="width: ${k/x*100}%"></div>
            </div>
            <span class="hud-value">${k} / ${x}</span>
          </div>
        </div>

        <div class="battle-question-box">
          <div class="q-header">Question ${q+1}</div>
          <div class="q-body" style="white-space: pre-line;">${M.text}</div>
          
          <div class="battle-options-list">
            ${M.options.map((E,P)=>`
              <button class="battle-opt-btn" data-idx="${P}">${E}</button>
            `).join("")}
          </div>
          
          <!-- Feedback Drawer -->
          <div class="battle-feedback-drawer" id="battle-feedback" style="display: none;">
            <div class="feedback-title" id="fb-title"></div>
            <p class="feedback-desc" id="fb-desc"></p>
            <button class="action-btn next-q-btn" id="next-q-btn" style="width: 100%; margin-top: 0.8rem;">次の試練へ</button>
          </div>
        </div>
      `;const z=l.querySelectorAll(".battle-opt-btn");z.forEach(E=>{E.addEventListener("click",P=>{const A=parseInt(P.target.getAttribute("data-idx"));$(A,M,z)})})}function $(M,z,E){E.forEach(V=>V.disabled=!0);const P=l.querySelector("#battle-feedback"),A=l.querySelector("#fb-title"),F=l.querySelector("#fb-desc"),D=l.querySelector("#next-q-btn");if(M===z.answerIndex){ce(),k=Math.max(0,k-1),A.innerText="✅ 正解！ (Très bien)",A.className="feedback-title text-success",D.innerText="次の試練へ";const V=l.querySelector(".enemy-hp");V&&V.classList.add("flash-white"),D.onclick=()=>{q++,T()}}else le(),gt(),L=Math.max(0,L-p.enemyDamage),A.innerText="❌ 不正解！",A.className="feedback-title text-error",D.innerText="もう一度挑戦する",n.classList.add("shake-vfx"),setTimeout(()=>n.classList.remove("shake-vfx"),400),D.onclick=()=>{T()};F.innerText=z.explanation,P.style.display="block"}T()}function w(p){i.style.display="none",l.style.display="none",g.style.display="none",u.style.opacity="0",u.style.pointerEvents="none",t.style.display="block";const S=e.querySelector("#rpg-character-layer");S&&(S.innerHTML=""),localStorage.setItem(`cba_story_${o.episodeId}_cleared`,"true"),t.innerHTML=`
      <div class="reward-card">
        <h2 style="font-family: var(--font-serif); color: var(--color-accent); font-size: 1.5rem; text-align: center;">🎉 Episode 1 Terminé !</h2>
        <p style="text-align: center; margin: 0.6rem 0; font-size: 0.95rem; color: var(--color-text-main);">エピソード「${o.episodeTitle}」をクリアしました！</p>
        
        <div style="background: rgba(197, 168, 128, 0.1); border: 1px solid rgba(197, 168, 128, 0.3); border-radius: var(--radius-sm); padding: 1rem; margin: 1.2rem 0; display: flex; align-items: center; justify-content: center; gap: 1rem;">
          <span style="font-size: 2rem;">🏆</span>
          <div style="text-align: left;">
            <div style="font-weight: 700; color: var(--color-primary); font-size: 1rem;">+${p.xp} XP</div>
            <div style="font-size: 0.75rem; color: var(--color-text-muted);">アカデミー経験値獲得</div>
          </div>
        </div>
        
        <button class="action-btn claim-reward-btn" style="width: 100%; padding: 0.8rem; font-weight: 700;">拠点に戻る</button>
      </div>
    `,t.querySelector(".claim-reward-btn").addEventListener("click",()=>{r++,f()})}}const b={meta:null,db:{knowledge:[],quizzes:[]},loaded:{knowledge:new Set,quizzes:!1},favorites:new Set(JSON.parse(localStorage.getItem("cba_favorites")||"[]")),wrongAnswers:JSON.parse(localStorage.getItem("cba_wrong")||"[]"),streak:parseInt(localStorage.getItem("cba_streak")||"0"),lastStudyDate:localStorage.getItem("cba_last_study")||"",srs:JSON.parse(localStorage.getItem("cba_srs")||"{}"),settings:JSON.parse(localStorage.getItem("cba_settings")||JSON.stringify({targetLevel:"ALL",newCardsPerDay:5,maxReviewsPerDay:20,includeGeneral:!1}))};function W(e){b.favorites.has(e)?b.favorites.delete(e):b.favorites.add(e),localStorage.setItem("cba_favorites",JSON.stringify(Array.from(b.favorites)))}function G(e){return b.favorites.has(e)}function de(e){b.wrongAnswers.includes(e)||(b.wrongAnswers.push(e),localStorage.setItem("cba_wrong",JSON.stringify(b.wrongAnswers)))}function yt(e){b.wrongAnswers=b.wrongAnswers.filter(o=>o!==e),localStorage.setItem("cba_wrong",JSON.stringify(b.wrongAnswers))}function vt(){const e=new Date().toISOString().split("T")[0];if(b.lastStudyDate!==e){if(b.lastStudyDate){const o=new Date(b.lastStudyDate),r=new Date(e),a=Math.abs(r-o),n=Math.ceil(a/(1e3*60*60*24));n===1?b.streak+=1:n>1&&(b.streak=1)}else b.streak=1;b.lastStudyDate=e,localStorage.setItem("cba_streak",b.streak.toString()),localStorage.setItem("cba_last_study",e)}}function J(e,o){const r=new Date().toISOString().split("T")[0],a=b.srs[e]||{easiness:2.5,interval:0,repetitions:0,dueDate:r};let n=Math.max(0,Math.min(5,o));n>=3?(a.repetitions===0?a.interval=1:a.repetitions===1?a.interval=6:a.interval=Math.round(a.interval*a.easiness),a.repetitions++):(a.repetitions=0,a.interval=1),a.easiness=a.easiness+(.1-(5-n)*(.08+(5-n)*.02)),a.easiness<1.3&&(a.easiness=1.3);const i=new Date;i.setDate(i.getDate()+a.interval),a.dueDate=i.toISOString().split("T")[0],a.lastRated=r,b.srs[e]=a,localStorage.setItem("cba_srs",JSON.stringify(b.srs))}function _t(e){b.settings={...b.settings,...e},localStorage.setItem("cba_settings",JSON.stringify(b.settings))}async function R(e,o){const r=o==="ALL"?["A1","A2","B1","B2","C1","C2"]:[o];for(const a of r)if(!b.loaded.knowledge.has(a))try{const n=await fetch(`data/knowledge_${a}.json`);if(!n.ok){console.warn(`Could not load data/knowledge_${a}.json`);continue}const i=await n.json(),l=new Set(b.db.knowledge.map(t=>t.id));for(const t of i)l.has(t.id)||b.db.knowledge.push(t);b.loaded.knowledge.add(a)}catch(n){console.error(`Failed to load knowledge level ${a}:`,n)}}async function te(){if(!b.loaded.quizzes)try{const e=await fetch("data/quizzes.json");if(!e.ok)throw new Error("Network response was not ok");b.db.quizzes=await e.json(),b.loaded.quizzes=!0}catch(e){console.error("Failed to load quizzes:",e)}}async function ne(){await Promise.all([R("vocabulary","ALL"),R("grammar","ALL"),R("cuisine","ALL"),te()])}const ue={home:be,vocabulary:ye,grammar:_e,cuisine:Xe,quiz:nt,favorites:K,review:it,search:st,settings:ct,dictation:lt,story:ft};function U(e){const o=document.getElementById("main-content");if(ue[e]){vt(),o.innerHTML="";const r=ue[e]();r instanceof HTMLElement?o.appendChild(r):o.innerHTML=r,document.querySelectorAll(".nav-link").forEach(a=>{a.getAttribute("data-tab")===e?a.classList.add("active"):a.classList.remove("active")})}}async function xt(){try{const e=await fetch("data/meta.json");b.meta=await e.json(),document.querySelectorAll(".nav-link").forEach(o=>{o.addEventListener("click",r=>{const a=r.target.closest(".nav-link").getAttribute("data-tab");U(a)})}),U("home"),kt()}catch(e){console.error("Failed to load database metadata:",e),document.getElementById("main-content").innerHTML=`
      <div class="alert alert-info" style="border-left-color: var(--color-error); background-color: #FFEBEE; color: var(--color-error)">
        <h3>Error: Métadonnées inaccessibles</h3>
        <p>Could not load curriculum metadata. Please reload or check your local setup.</p>
      </div>
    `}}function kt(){const e=document.getElementById("youglish-sidebar"),o=document.getElementById("youglish-sidebar-toggle"),r=document.getElementById("youglish-search-input"),a=document.getElementById("youglish-search-btn"),n=document.getElementById("yg-widget-container");if(!e||!o||!r||!a||!n)return;o.addEventListener("click",t=>{t.stopPropagation(),e.classList.toggle("open"),e.classList.contains("open")&&r.focus()}),document.addEventListener("click",t=>{e.classList.contains("open")&&!e.contains(t.target)&&e.classList.remove("open")});let i=null;function l(){const t=r.value.trim();if(t)if(n.innerHTML='<div id="yg-widget" style="width: 100%;"></div>',window.YG)try{i=new YG("yg-widget",{width:230,components:9,accentColor:"#C5A880",autoStart:1,search:t,language:"french"})}catch(g){console.error("Failed to load YouGlish widget:",g),n.innerHTML=`
          <div style="font-size: 0.75rem; text-align: center; color: var(--color-error); padding: 1rem;">
            ウィジェットの読み込みに失敗しました。<br>
            <a href="https://youglish.com/pronounce/${encodeURIComponent(t)}/french" target="_blank" style="color: var(--color-accent); font-weight: 600; text-decoration: underline;">YouGlishサイトで直接開く</a>
          </div>
        `}else window.open(`https://youglish.com/pronounce/${encodeURIComponent(t)}/french`,"_blank"),n.innerHTML=`
        <div style="font-size: 0.75rem; text-align: center; color: rgba(255,255,255,0.7); padding: 1rem;">
          発音ページを別タブで開きました。<br>
          <a href="https://youglish.com/pronounce/${encodeURIComponent(t)}/french" target="_blank" style="color: var(--color-accent); font-weight: 600; text-decoration: underline;">開かない場合はこちら</a>
        </div>
      `}a.addEventListener("click",l),r.addEventListener("keypress",t=>{t.key==="Enter"&&l()})}document.addEventListener("DOMContentLoaded",xt);
