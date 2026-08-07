(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const m of o.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&a(m)}).observe(document,{childList:!0,subtree:!0});function t(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(n){if(n.ep)return;n.ep=!0;const o=t(n);fetch(n.href,o)}})();let Xe=null,et="",tt=0,Ne=null,ye=null;function te(e,r=1){lt(e,r)}function lt(e,r=1,t=null,a=null,n=0){if(!("speechSynthesis"in window)){console.warn("Speech synthesis not supported on this browser.");return}window.speechSynthesis.cancel();const o=e.replace(/["'➔]/g,"").trim();et=o,tt=n,Ne=t,ye=a;const m=o.substring(n);if(!m.trim()){ye&&ye();return}const i=new SpeechSynthesisUtterance(m);i.lang="fr-FR",i.rate=r;const s=window.speechSynthesis.getVoices().find(g=>g.lang==="fr-FR"||g.lang.startsWith("fr"));s&&(i.voice=s),i.onboundary=g=>{if(g.name==="word"&&Ne){const f=tt+g.charIndex;Ne(f,et.length)}},i.onend=()=>{Xe===i&&ye&&ye()},i.onerror=g=>{console.warn("SpeechSynthesis error:",g),ye&&ye()},Xe=i,window.speechSynthesis.speak(i)}function zt(){"speechSynthesis"in window&&window.speechSynthesis.pause()}function qt(){"speechSynthesis"in window&&window.speechSynthesis.resume()}function De(){"speechSynthesis"in window&&window.speechSynthesis.cancel()}"speechSynthesis"in window&&(window.speechSynthesis.getVoices(),window.speechSynthesis.onvoiceschanged=()=>{window.speechSynthesis.getVoices()});function At(){var T,P,d,p,y,S,k;const e=document.createElement("div"),r=document.createElement("h2");r.className="section-title",r.innerText="Tableau de Bord",e.appendChild(r);const t=document.createElement("p");t.className="section-subtitle",t.innerText="Welcome back, Commis. Here is your kitchen curriculum status.",e.appendChild(t);const a=new Date().toISOString().split("T")[0],n=Object.values(x.srs),o=n.filter(w=>w.dueDate<=a).length,m=n.length,i=document.createElement("div");i.className="dashboard-grid";const u=document.createElement("div");u.style.display="flex",u.style.flexDirection="column",u.style.gap="1.5rem";const s=document.createElement("div");s.className="card",s.style.padding="1.5rem",s.innerHTML=`
    <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--color-primary); margin-bottom: 1rem;">Missions du Jour (Today's Tasks)</h3>
    <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.8rem;">
      <li style="display: flex; align-items: center; gap: 0.8rem; font-size: 0.95rem;">
        <input type="checkbox" id="mission-vocab" style="transform: scale(1.2); cursor: pointer;" ${m>0?"checked":""}>
        <label for="mission-vocab" style="cursor: pointer;">Study new terms in the Vocabulary deck</label>
      </li>
      <li style="display: flex; align-items: center; gap: 0.8rem; font-size: 0.95rem;">
        <input type="checkbox" id="mission-srs" style="transform: scale(1.2); cursor: pointer;" ${o===0&&m>0?"checked":""}>
        <label for="mission-srs" style="cursor: pointer;">
          Clear due SRS cards in Review Deck 
          ${o>0?`<span style="background-color: var(--color-error); color: white; padding: 0.1rem 0.5rem; border-radius: 10px; font-size: 0.75rem; font-weight: bold; margin-left: 0.5rem;">${o} due</span>`:""}
        </label>
      </li>
      <li style="display: flex; align-items: center; gap: 0.8rem; font-size: 0.95rem;">
        <input type="checkbox" id="mission-quiz" style="transform: scale(1.2); cursor: pointer;">
        <label for="mission-quiz" style="cursor: pointer;">Take a kitchen verification quiz</label>
      </li>
    </ul>
  `,u.appendChild(s);const g=document.createElement("div");g.className="card",g.style.padding="1.5rem";const f=((T=x.meta)==null?void 0:T.featured)||null;g.innerHTML=`
    <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--color-primary); margin-bottom: 1rem;">Vocabulaire Vedette (Featured Vocabulary)</h3>
    ${f?`
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
        <div style="font-size: 1.25rem; font-weight: 600; color: var(--color-accent);">${f.french}</div>
        <button class="audio-btn" data-text="${f.french}" title="Listen pronunciation" style="background: none; border: none; font-size: 1.1rem; cursor: pointer; color: var(--color-accent); padding: 0.1rem; line-height: 1;">🔊</button>
      </div>
      <div style="font-size: 0.9rem; color: var(--color-text-main); font-weight: 500; margin-bottom: 0.5rem;">${f.english} / ${f.japanese}</div>
      <div style="background-color: rgba(197, 168, 128, 0.08); border-left: 2px solid var(--color-accent); padding: 0.8rem; font-size: 0.85rem; border-radius: 0 var(--radius-sm) var(--radius-sm) 0;">
        <div style="display: flex; align-items: flex-start; gap: 0.4rem; font-style: italic; color: var(--color-secondary); font-weight: 500;">
          <span style="flex: 1;">"${f.context_fr}"</span>
          <button class="audio-btn" data-text="${f.context_fr}" title="Listen context sentence" style="background: none; border: none; font-size: 0.9rem; cursor: pointer; color: var(--color-text-muted); padding: 0.15rem; margin-top: 0.1rem; line-height: 1;">🔊</button>
        </div>
        <div style="color: var(--color-text-muted); margin-top: 0.2rem;">${f.context_ja}</div>
      </div>
    `:"<p>No data loaded.</p>"}
  `,f&&g.querySelectorAll(".audio-btn").forEach(w=>{w.addEventListener("click",C=>{C.stopPropagation();const $=C.target.closest(".audio-btn").getAttribute("data-text");te($)})}),u.appendChild(g),i.appendChild(u);const c=document.createElement("div");c.style.display="flex",c.style.flexDirection="column",c.style.gap="1.5rem";const h=document.createElement("div");h.className="streak-card",h.innerHTML=`
    <div class="streak-left">
      <h2>Série</h2>
      <h2>d'Études</h2>
      <div class="streak-subtitle">Daily Study Streak</div>
    </div>
    <div class="streak-right">
      <span class="streak-number">${x.streak}</span>
      <span class="streak-flame">🔥</span>
    </div>
  `,c.appendChild(h);const _=document.createElement("div");_.className="card",_.style.padding="1.5rem";const l=((d=(P=x.meta)==null?void 0:P.counts)==null?void 0:d.vocabulary)||0,v=((y=(p=x.meta)==null?void 0:p.counts)==null?void 0:y.grammar)||0,A=((k=(S=x.meta)==null?void 0:S.counts)==null?void 0:k.cuisine)||0;return _.innerHTML=`
    <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--color-primary); margin-bottom: 1rem;">Progrès de la Brigade</h3>
    <div style="display: flex; flex-direction: column; gap: 0.8rem; font-size: 0.9rem;">
      <div style="display: flex; justify-content: space-between;">
        <span>Vocabulaire:</span>
        <strong>${l} terms</strong>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span>Grammaire:</span>
        <strong>${v} items</strong>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span>Théorie Culinaire:</span>
        <strong>${A} guides</strong>
      </div>
      
      <div style="border-top: 1px solid rgba(0,0,0,0.05); padding-top: 0.8rem; display: flex; justify-content: space-between; align-items: center;">
        <span>★ Coups de Cœur (Favorites):</span>
        <strong style="color: var(--color-accent);">${x.favorites.size} items</strong>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span>Deck SRS Actif (Active SRS):</span>
        <strong style="color: var(--color-primary);">${m} cards</strong>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span>À réviser aujourd'hui (Due Today):</span>
        <strong style="${o>0?"color: var(--color-error);":"color: var(--color-success);"}">${o} cards</strong>
      </div>
    </div>
  `,c.appendChild(_),i.appendChild(c),e.appendChild(i),e}function Ie(e){const r=Pt(e);return M[r]||""}function Pt(e){return e?e.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]/g," ").replace(/\s+/g," ").trim():""}const U=(e,r,t)=>`
<svg viewBox="0 0 240 140" width="100%" height="100%" style="max-width: 240px; display: block;" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow-${e}" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#e76f51" />
    </marker>
    <marker id="arrow-sub-${e}" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#1c2833" />
    </marker>
    <filter id="shadow-${e}" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="#1c2833" flood-opacity="0.15"/>
    </filter>
  </defs>
  <!-- Background -->
  <rect width="240" height="140" fill="#f8f5f0" rx="8"/>
  <!-- Illustration Content -->
  ${r}
  <!-- Concept Label -->
  <text x="120" y="125" text-anchor="middle" font-size="10" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="700" fill="#1c2833" letter-spacing="0.5px">${t}</text>
</svg>
`;function _e(e,r){const t=["L","M","M","J","V","S","D"];let a="";for(let n=0;n<7;n++){const o=24+n*28,m=n===e,i=m?"#e76f51":"#ffffff",u=m?"#ffffff":"#1c2833";a+=`
      <rect x="${o}" y="50" width="24" height="24" fill="${i}" ${m?'stroke="#e76f51" stroke-width="2"':'stroke="#1c2833" stroke-width="1.5"'} rx="4" />
      <text x="${o+12}" y="66" text-anchor="middle" font-size="10" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="bold" fill="${u}">${t[n]}</text>
    `}return U(`calendar_${e}`,`
    <!-- Calendar Header Grid -->
    <rect x="20" y="20" width="200" height="20" fill="#1c2833" rx="4" />
    <text x="120" y="33" text-anchor="middle" font-size="9" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="bold" fill="#ffffff" letter-spacing="1px">LA SEMAINE</text>
    ${a}
  `,r)}function ze(e,r){const t=["Avant-hier","Hier","Aujourd'hui","Demain","Après-demain"],a=["一昨日","昨日","今日","明日","明後日"];let n="";for(let m=0;m<5;m++){const i=25+m*47,u=m===e,s=u?"#e76f51":"#1c2833",g=u?7:4,f=u?8:7,c=u?"#e76f51":"#7f8c8d",h=u?"bold":"normal";n+=`
      <circle cx="${i}" cy="65" r="${g}" fill="${s}" />
      <text x="${i}" y="51" text-anchor="middle" font-size="${f}" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="${h}" fill="${c}">${t[m]}</text>
      <text x="${i}" y="81" text-anchor="middle" font-size="7" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="${h}" fill="${c}">${a[m]}</text>
    `}return U(`timeline_${e}`,`
    <!-- Timeline axis -->
    <line x1="20" y1="65" x2="220" y2="65" stroke="#1c2833" stroke-width="2" />
    <!-- Arrow head -->
    <path d="M 218 61 L 225 65 L 218 69 Z" fill="#1c2833" />
    ${n}
  `,r)}const M={sur:U("sur",`
    <!-- Board/Table surface -->
    <rect x="40" y="80" width="160" height="10" fill="#c5a880" rx="2" filter="url(#shadow-sur)"/>
    <!-- Plate sitting on surface -->
    <ellipse cx="120" cy="72" rx="40" ry="12" fill="#ffffff" stroke="#1c2833" stroke-width="2.5" filter="url(#shadow-sur)"/>
    <ellipse cx="120" cy="72" rx="25" ry="7" fill="none" stroke="#1c2833" stroke-width="1.5"/>
    <!-- Downward contact arrow -->
    <line x1="120" y1="25" x2="120" y2="52" stroke="#e76f51" stroke-width="3" marker-end="url(#arrow-sur)"/>
  `,"ON / UPON (sur)"),sous:U("sous",`
    <!-- Table Surface -->
    <rect x="40" y="45" width="160" height="10" fill="#c5a880" rx="2" filter="url(#shadow-sous)"/>
    <!-- Table Legs -->
    <line x1="55" y1="55" x2="55" y2="95" stroke="#c5a880" stroke-width="5" stroke-linecap="round"/>
    <line x1="185" y1="55" x2="185" y2="95" stroke="#c5a880" stroke-width="5" stroke-linecap="round"/>
    <!-- Container stored below -->
    <rect x="80" y="70" width="80" height="22" fill="#4a90e2" rx="3" filter="url(#shadow-sous)"/>
    <rect x="76" y="66" width="88" height="4" fill="#1c2833" rx="1"/>
    <!-- Arrow pointing under -->
    <line x1="120" y1="58" x2="120" y2="65" stroke="#e76f51" stroke-width="3" marker-end="url(#arrow-sous)"/>
  `,"UNDER / BENEATH (sous)"),dans:U("dans",`
    <!-- Bowl body -->
    <path d="M 70 65 Q 70 105 120 105 Q 170 105 170 65" fill="#c5a880" stroke="#1c2833" stroke-width="3" filter="url(#shadow-dans)"/>
    <!-- Liquid surface inside bowl -->
    <ellipse cx="120" cy="78" rx="42" ry="12" fill="#4a90e2" stroke="#1c2833" stroke-width="1.5"/>
    <!-- Liquid being poured in -->
    <path d="M 120 20 L 120 70" stroke="#4a90e2" stroke-width="6" stroke-linecap="round" marker-end="url(#arrow-dans)"/>
  `,"IN / INSIDE (dans)"),avec:U("avec",`
    <!-- Mixing Bowl -->
    <path d="M 45 60 Q 45 95 80 95 Q 115 95 115 60 Z" fill="#2a9d8f" stroke="#1c2833" stroke-width="2.5" filter="url(#shadow-avec)"/>
    <!-- Plus symbol -->
    <text x="135" y="78" text-anchor="middle" font-size="24" font-weight="bold" fill="#e76f51">+</text>
    <!-- Whisk -->
    <path d="M 165 85 L 195 55" stroke="#1c2833" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="158" cy="92" rx="15" ry="8" transform="rotate(-45 158 92)" fill="none" stroke="#1c2833" stroke-width="1.5"/>
    <ellipse cx="158" cy="92" rx="18" ry="12" transform="rotate(-45 158 92)" fill="none" stroke="#1c2833" stroke-width="1.2"/>
  `,"WITH / USING (avec)"),sans:U("sans",`
    <!-- Mixing Bowl -->
    <path d="M 45 60 Q 45 95 80 95 Q 115 95 115 60 Z" fill="#2a9d8f" stroke="#1c2833" stroke-width="2.5" filter="url(#shadow-sans)"/>
    <path d="M 50 60 C 55 50, 75 50, 80 60 C 85 50, 105 50, 110 60 Z" fill="#2a9d8f" opacity="0.7"/>
    <!-- Excluded Ingredient (Onion) -->
    <circle cx="165" cy="70" r="16" fill="#c5a880" stroke="#1c2833" stroke-width="2"/>
    <path d="M 165 86 L 165 91 M 161 85 L 159 89 M 169 85 L 171 89" stroke="#1c2833" stroke-width="1.5"/>
    <!-- Prohibition sign -->
    <circle cx="165" cy="70" r="21" fill="none" stroke="#e63946" stroke-width="3"/>
    <line x1="150" y1="55" x2="180" y2="85" stroke="#e63946" stroke-width="3"/>
  `,"WITHOUT (sans)"),pour:U("pour",`
    <!-- Chef's knife pointing at target -->
    <path d="M 45 65 L 105 65 L 105 52 C 85 52, 60 58, 45 65 Z" fill="#4a90e2" stroke="#1c2833" stroke-width="2"/>
    <rect x="105" y="54" width="25" height="7" fill="#1c2833" rx="1"/>
    <!-- Target Circle -->
    <circle cx="175" cy="65" r="20" fill="none" stroke="#e76f51" stroke-width="5"/>
    <circle cx="175" cy="65" r="8" fill="#e76f51"/>
    <!-- Action/Intention Arrow -->
    <path d="M 90 82 Q 130 82 165 72" fill="none" stroke="#e76f51" stroke-width="3" stroke-dasharray="3,3" marker-end="url(#arrow-pour)"/>
  `,"FOR / PURPOSE (pour)"),par:U("par",`
    <!-- Dotted filter plane/mesh -->
    <line x1="120" y1="20" x2="120" y2="100" stroke="#1c2833" stroke-width="4" stroke-dasharray="6,6"/>
    <!-- Arrow passing through -->
    <line x1="50" y1="60" x2="105" y2="60" stroke="#e76f51" stroke-width="4" stroke-dasharray="2,2"/>
    <line x1="105" y1="60" x2="180" y2="60" stroke="#e76f51" stroke-width="4" marker-end="url(#arrow-par)"/>
  `,"BY / THROUGH / VIA (par)"),en:U("en",`
    <!-- Potato (Whole) -->
    <ellipse cx="60" cy="60" rx="22" ry="16" fill="#c5a880" stroke="#1c2833" stroke-width="2"/>
    <!-- Transform Arrow -->
    <line x1="98" y1="60" x2="135" y2="60" stroke="#e76f51" stroke-width="3" marker-end="url(#arrow-en)"/>
    <!-- Potato Cubes (Diced) -->
    <rect x="155" y="44" width="14" height="14" fill="#c5a880" stroke="#1c2833" stroke-width="1.5"/>
    <rect x="175" y="52" width="14" height="14" fill="#c5a880" stroke="#1c2833" stroke-width="1.5"/>
    <rect x="160" y="66" width="14" height="14" fill="#c5a880" stroke="#1c2833" stroke-width="1.5"/>
  `,"INTO SHAPE / STATE (en)"),a:U("a",`
    <!-- Thermometer scale & target -->
    <rect x="95" y="20" width="14" height="75" fill="#ffffff" stroke="#1c2833" stroke-width="2" rx="7"/>
    <circle cx="102" cy="92" r="14" fill="#e63946" stroke="#1c2833" stroke-width="2"/>
    <rect x="100" y="50" width="4" height="42" fill="#e63946"/>
    <!-- 180°C Indicator -->
    <line x1="109" y1="42" x2="122" y2="42" stroke="#1c2833" stroke-width="2"/>
    <text x="128" y="46" font-size="10" font-weight="bold" fill="#e76f51">180°C</text>
    <!-- Arrow pointing to temperature -->
    <line x1="60" y1="42" x2="88" y2="42" stroke="#e76f51" stroke-width="3" marker-end="url(#arrow-a)"/>
  `,"AT / TO / TEMPERATURE (à)"),de:U("de",`
    <!-- Lemon Sliced & Squeezed -->
    <path d="M 70 50 Q 110 25 140 55 Q 110 80 70 50" fill="#c5a880" stroke="#1c2833" stroke-width="2"/>
    <path d="M 80 52 Q 105 42 118 53 Q 100 62 80 52 Z" fill="#ffffff" opacity="0.6"/>
    <!-- Falling Drop -->
    <path d="M 120 78 C 120 78, 115 87, 115 91 C 115 95, 125 95, 125 91 C 125 87, 120 78, 120 78 Z" fill="#e76f51" stroke="#1c2833" stroke-width="1.5" filter="url(#shadow-de)"/>
    <!-- Squeeze motion arrows -->
    <path d="M 105 15 Q 120 25 120 35" fill="none" stroke="#e76f51" stroke-width="2" marker-end="url(#arrow-de)"/>
  `,"FROM / EXTRACT (de)"),devant:U("devant",`
    <!-- Guest silhouette in background -->
    <path d="M 80 55 C 80 30, 160 30, 160 55 C 160 65, 150 75, 150 75 L 170 95 L 70 95 Z" fill="#c5a880" opacity="0.25"/>
    <!-- Plate in foreground -->
    <ellipse cx="120" cy="85" rx="55" ry="18" fill="#ffffff" stroke="#1c2833" stroke-width="3" filter="url(#shadow-devant)"/>
    <ellipse cx="120" cy="85" rx="35" ry="11" fill="none" stroke="#1c2833" stroke-width="1.5"/>
    <circle cx="120" cy="83" r="10" fill="#e76f51"/>
    <!-- Placement Arrow -->
    <line x1="120" y1="45" x2="120" y2="58" stroke="#e76f51" stroke-width="3" marker-end="url(#arrow-devant)"/>
  `,"IN FRONT OF (devant)"),derriere:U("derriere",`
    <!-- Bottle behind the counter -->
    <rect x="100" y="25" width="40" height="60" fill="#4a90e2" stroke="#1c2833" stroke-width="2" rx="4"/>
    <rect x="112" y="10" width="16" height="15" fill="#4a90e2" stroke="#1c2833" stroke-width="2" rx="2"/>
    <!-- Counter hiding bottom of bottle -->
    <rect x="30" y="70" width="180" height="40" fill="#c5a880" stroke="#1c2833" stroke-width="3" filter="url(#shadow-derriere)"/>
    <!-- Arrow pointing to behind -->
    <path d="M 70 85 Q 85 50 96 50" fill="none" stroke="#e76f51" stroke-width="3" marker-end="url(#arrow-derriere)"/>
  `,"BEHIND (derrière)"),chez:U("chez",`
    <!-- Storefront Facade -->
    <rect x="50" y="55" width="140" height="50" fill="#ffffff" stroke="#1c2833" stroke-width="2"/>
    <rect x="110" y="70" width="25" height="35" fill="#1c2833"/>
    <rect x="65" y="70" width="30" height="20" fill="#4a90e2" opacity="0.5" stroke="#1c2833" stroke-width="1.5"/>
    <!-- Canopy/Awning -->
    <path d="M 45 35 L 195 35 L 185 55 L 55 55 Z" fill="#e76f51" stroke="#1c2833" stroke-width="2" filter="url(#shadow-chez)"/>
    <path d="M 75 35 L 80 55 M 105 35 L 110 55 M 135 35 L 140 55 M 165 35 L 170 55" stroke="#ffffff" stroke-width="3"/>
    <text x="120" y="28" text-anchor="middle" font-size="9" font-weight="bold" fill="#1c2833">BOULANGERIE</text>
  `,"AT THE SHOP / PLACE OF (chez)"),entre:U("entre",`
    <!-- Top Sheet -->
    <path d="M 45 48 L 195 48 L 185 58 L 35 58 Z" fill="#c5a880" opacity="0.6"/>
    <!-- Dough (Sandwiched) -->
    <rect x="60" y="60" width="120" height="16" fill="#e76f51" rx="4" filter="url(#shadow-entre)"/>
    <!-- Bottom Sheet -->
    <path d="M 45 80 L 195 80 L 185 90 L 35 90 Z" fill="#c5a880" opacity="0.6"/>
    <!-- Inward Arrows -->
    <line x1="30" y1="68" x2="52" y2="68" stroke="#1c2833" stroke-width="2.5" marker-end="url(#arrow-sub-entre)"/>
    <line x1="210" y1="68" x2="188" y2="68" stroke="#1c2833" stroke-width="2.5" marker-end="url(#arrow-sub-entre)"/>
  `,"BETWEEN (entre)"),vers:U("vers",`
    <!-- Bowl -->
    <path d="M 100 60 Q 100 95 135 95 Q 170 95 170 60 Z" fill="#4a90e2" stroke="#1c2833" stroke-width="2" filter="url(#shadow-vers)"/>
    <circle cx="135" cy="75" r="5" fill="#e76f51"/>
    <!-- Direction arrow pointing inside -->
    <path d="M 40 45 Q 80 45 118 68" fill="none" stroke="#e76f51" stroke-width="3" marker-end="url(#arrow-vers)"/>
  `,"TOWARDS (vers)"),contre:U("contre",`
    <!-- Fish bone wall (against) -->
    <line x1="140" y1="20" x2="140" y2="100" stroke="#1c2833" stroke-width="5" stroke-linecap="round"/>
    <line x1="140" y1="35" x2="160" y2="25" stroke="#1c2833" stroke-width="2"/>
    <line x1="140" y1="55" x2="160" y2="45" stroke="#1c2833" stroke-width="2"/>
    <line x1="140" y1="75" x2="160" y2="65" stroke="#1c2833" stroke-width="2"/>
    <!-- Knife blade tight against bone -->
    <rect x="25" y="45" width="35" height="10" fill="#c5a880" rx="1"/>
    <path d="M 60 45 L 140 45 L 140 60 L 60 55 Z" fill="#ffffff" stroke="#1c2833" stroke-width="2" filter="url(#shadow-contre)"/>
    <!-- Contact Force Arrow -->
    <line x1="100" y1="25" x2="115" y2="40" stroke="#e76f51" stroke-width="3" marker-end="url(#arrow-contre)"/>
  `,"AGAINST / PRESSED (contre)"),depuis:U("depuis",`
    <!-- Horizontal timeline -->
    <line x1="40" y1="70" x2="190" y2="70" stroke="#1c2833" stroke-width="2" marker-end="url(#arrow-sub-depuis)"/>
    <!-- Past Point -->
    <circle cx="60" cy="70" r="5" fill="#1c2833"/>
    <text x="60" y="90" text-anchor="middle" font-size="9" fill="#1c2833">-2h (Start)</text>
    <!-- Present Point -->
    <circle cx="160" cy="70" r="5" fill="#e76f51"/>
    <text x="160" y="90" text-anchor="middle" font-size="9" fill="#e76f51">Now</text>
    <!-- Continuous duration line -->
    <line x1="60" y1="64" x2="160" y2="64" stroke="#e76f51" stroke-width="4"/>
  `,"SINCE / CONTINUING (depuis)"),pendant:U("pendant",`
    <!-- Time bar -->
    <line x1="50" y1="70" x2="190" y2="70" stroke="#1c2833" stroke-width="2"/>
    <line x1="50" y1="62" x2="50" y2="78" stroke="#1c2833" stroke-width="2"/>
    <line x1="190" y1="62" x2="190" y2="78" stroke="#1c2833" stroke-width="2"/>
    <!-- Duration bracket -->
    <rect x="50" y="65" width="140" height="10" fill="#2a9d8f" opacity="0.6"/>
    <text x="120" y="54" text-anchor="middle" font-size="11" font-weight="bold" fill="#2a9d8f">30 min</text>
    <!-- Hourglass -->
    <path d="M 112 15 L 128 15 L 120 25 L 128 35 L 112 35 L 120 25 Z" fill="#ffffff" stroke="#1c2833" stroke-width="1.5"/>
    <polygon points="115,18 125,18 120,24" fill="#e76f51"/>
    <polygon points="120,26 115,32 125,32" fill="#e76f51"/>
  `,"FOR A DURATION (pendant)"),selon:U("selon",`
    <!-- Slider -->
    <rect x="40" y="65" width="160" height="8" fill="#1c2833" rx="4"/>
    <circle cx="120" cy="69" r="12" fill="#e76f51" stroke="#ffffff" stroke-width="2" filter="url(#shadow-selon)"/>
    <text x="40" y="50" font-size="10" fill="#2a9d8f" font-weight="bold">Doux (Mild)</text>
    <text x="200" y="50" text-anchor="end" font-size="10" fill="#e63946" font-weight="bold">Épicé (Spicy)</text>
    <path d="M 95 69 L 85 69" stroke="#ffffff" stroke-width="2" marker-end="url(#arrow-sub-selon)"/>
    <path d="M 145 69 L 155 69" stroke="#ffffff" stroke-width="2" marker-end="url(#arrow-sub-selon)"/>
  `,"ACCORDING TO / DEPENDING ON (selon)"),a_cote_de:U("a_cote_de",`
    <!-- Water Glass (left) -->
    <rect x="75" y="45" width="30" height="45" fill="none" stroke="#1c2833" stroke-width="2" rx="2"/>
    <rect x="77" y="65" width="26" height="23" fill="#4a90e2" opacity="0.6"/>
    <!-- Wine Glass (right) -->
    <path d="M 125 45 Q 125 70 140 70 Q 155 70 155 45 Z" fill="none" stroke="#1c2833" stroke-width="2"/>
    <line x1="140" y1="70" x2="140" y2="90" stroke="#1c2833" stroke-width="2"/>
    <ellipse cx="140" cy="90" rx="15" ry="3" fill="#1c2833"/>
    <path d="M 128 55 Q 128 68 140 68 Q 152 68 152 55 Z" fill="#e63946"/>
    <!-- Distance marker -->
    <path d="M 112 60 L 120 60" stroke="#e76f51" stroke-width="2" marker-end="url(#arrow-a_cote_de)"/>
    <path d="M 118 60 L 110 60" stroke="#e76f51" stroke-width="2" marker-end="url(#arrow-a_cote_de)"/>
  `,"NEXT TO / BESIDE (à côté de)"),en_face_de:U("en_face_de",`
    <!-- Station 1 (left) -->
    <rect x="30" y="45" width="45" height="45" fill="#c5a880" rx="2" filter="url(#shadow-en_face_de)"/>
    <path d="M 40 55 Q 40 68 52 68 Q 65 68 65 55 Z" fill="#2a9d8f"/>
    <!-- Station 2 (right) -->
    <rect x="165" y="45" width="45" height="45" fill="#1c2833" rx="2" filter="url(#shadow-en_face_de)"/>
    <circle cx="187" cy="55" r="10" fill="none" stroke="#e63946" stroke-width="2"/>
    <!-- Opposite Arrows -->
    <line x1="85" y1="68" x2="115" y2="68" stroke="#e76f51" stroke-width="3" marker-end="url(#arrow-en_face_de)"/>
    <line x1="155" y1="68" x2="125" y2="68" stroke="#e76f51" stroke-width="3" marker-end="url(#arrow-en_face_de)"/>
  `,"FACING / OPPOSITE (en face de)"),au_dessus_de:U("au_dessus_de",`
    <!-- Bowl at bottom -->
    <path d="M 80 75 Q 80 105 120 105 Q 160 105 160 75 Z" fill="#2a9d8f" stroke="#1c2833" stroke-width="2" filter="url(#shadow-au_dessus_de)"/>
    <!-- Colander hovering above -->
    <path d="M 90 40 Q 90 60 120 60 Q 150 60 150 40 Z" fill="#ffffff" stroke="#1c2833" stroke-width="2" filter="url(#shadow-au_dessus_de)"/>
    <line x1="150" y1="45" x2="175" y2="45" stroke="#1c2833" stroke-width="4" stroke-linecap="round"/>
    <!-- Vertical space/distance indicator -->
    <line x1="120" y1="63" x2="120" y2="72" stroke="#e76f51" stroke-width="2" marker-end="url(#arrow-au_dessus_de)"/>
    <line x1="120" y1="72" x2="120" y2="63" stroke="#e76f51" stroke-width="2" marker-end="url(#arrow-au_dessus_de)"/>
  `,"ABOVE / OVER (au-dessus de)"),au_dessous_de:U("au_dessous_de",`
    <!-- Limit line -->
    <line x1="40" y1="50" x2="200" y2="50" stroke="#e63946" stroke-width="2" stroke-dasharray="4,4"/>
    <text x="145" y="44" font-size="9" fill="#e63946" font-weight="bold">3°C Limit</text>
    <!-- Bar below the limit -->
    <rect x="60" y="65" width="120" height="25" fill="#4a90e2" rx="3" filter="url(#shadow-au_dessous_de)"/>
    <text x="120" y="81" text-anchor="middle" font-size="10" fill="#ffffff" font-weight="bold">1.5°C</text>
    <!-- Downward Arrow -->
    <line x1="120" y1="52" x2="120" y2="61" stroke="#e76f51" stroke-width="3" marker-end="url(#arrow-au_dessous_de)"/>
  `,"BELOW / UNDER (au-dessous de)"),autour_de:U("autour_de",`
    <!-- Main Dish (center) -->
    <circle cx="120" cy="65" r="18" fill="#e76f51" stroke="#1c2833" stroke-width="2.5" filter="url(#shadow-autour_de)"/>
    <!-- Surrounding path -->
    <circle cx="120" cy="65" r="32" fill="none" stroke="#c5a880" stroke-width="1.5" stroke-dasharray="3,3"/>
    <!-- Garnishes arranged in circle -->
    <circle cx="120" cy="33" r="5" fill="#2a9d8f"/>
    <circle cx="152" cy="65" r="5" fill="#2a9d8f"/>
    <circle cx="120" cy="97" r="5" fill="#2a9d8f"/>
    <circle cx="88" cy="65" r="5" fill="#2a9d8f"/>
    <circle cx="142" cy="42" r="5" fill="#4a90e2"/>
    <circle cx="142" cy="88" r="5" fill="#4a90e2"/>
    <circle cx="98" cy="42" r="5" fill="#4a90e2"/>
    <circle cx="98" cy="88" r="5" fill="#4a90e2"/>
    <!-- Circular Arrow -->
    <path d="M 158 55 A 38 38 0 0 1 152 76" fill="none" stroke="#e76f51" stroke-width="2" marker-end="url(#arrow-autour_de)"/>
  `,"AROUND (autour de)"),au_milieu_de:U("au_milieu_de",`
    <!-- Plate -->
    <circle cx="120" cy="65" r="45" fill="#ffffff" stroke="#1c2833" stroke-width="2" filter="url(#shadow-au_milieu_de)"/>
    <!-- Guides -->
    <line x1="120" y1="20" x2="120" y2="110" stroke="#c5a880" stroke-width="1" stroke-dasharray="2,2"/>
    <line x1="75" y1="65" x2="165" y2="65" stroke="#c5a880" stroke-width="1" stroke-dasharray="2,2"/>
    <!-- Centered Food Item -->
    <circle cx="120" cy="65" r="11" fill="#e76f51" stroke="#1c2833" stroke-width="2"/>
    <circle cx="120" cy="65" r="4" fill="#2a9d8f"/>
    <!-- Position indicators -->
    <line x1="120" y1="30" x2="120" y2="44" stroke="#e76f51" stroke-width="1.5" marker-end="url(#arrow-sub-au_milieu_de)"/>
    <line x1="120" y1="100" x2="120" y2="86" stroke="#e76f51" stroke-width="1.5" marker-end="url(#arrow-sub-au_milieu_de)"/>
  `,"IN THE MIDDLE OF (au milieu de)"),pres_de:U("pres_de",`
    <!-- Hot stove (left) -->
    <rect x="40" y="45" width="50" height="40" fill="#1c2833" rx="2"/>
    <circle cx="65" cy="65" r="12" fill="none" stroke="#e76f51" stroke-width="3"/>
    <path d="M 58 60 Q 65 45 65 52 Q 72 45 72 60 Z" fill="#e76f51"/>
    <!-- Butter (right, near stove) -->
    <rect x="108" y="55" width="25" height="20" fill="#c5a880" rx="1" filter="url(#shadow-pres_de)"/>
    <!-- Distance marker -->
    <line x1="94" y1="65" x2="104" y2="65" stroke="#e76f51" stroke-width="2"/>
    <circle cx="94" cy="65" r="2" fill="#e76f51"/>
    <circle cx="104" cy="65" r="2" fill="#e76f51"/>
  `,"NEAR / CLOSE TO (près de)"),loin_de:U("loin_de",`
    <!-- Food shelf (left) -->
    <rect x="35" y="45" width="40" height="40" fill="#2a9d8f" rx="2" filter="url(#shadow-loin_de)"/>
    <rect x="43" y="55" width="24" height="25" fill="#ffffff" rx="1"/>
    <text x="55" y="70" text-anchor="middle" font-size="7" font-weight="bold" fill="#2a9d8f">FOOD</text>
    <!-- Toxic shelf (right) -->
    <rect x="165" y="45" width="40" height="40" fill="#e63946" rx="2" filter="url(#shadow-loin_de)"/>
    <path d="M 180 50 L 190 50 L 190 75 L 180 75 Z" fill="#ffffff"/>
    <text x="185" y="65" text-anchor="middle" font-size="7" font-weight="bold" fill="#e63946">TOXIC</text>
    <!-- Large gap and separation line -->
    <line x1="80" y1="65" x2="160" y2="65" stroke="#e63946" stroke-width="2"/>
    <text x="120" y="60" text-anchor="middle" font-size="8" fill="#e63946" font-weight="bold">SECURE GAP</text>
  `,"FAR FROM (loin de)"),jusqu_a:U("jusqu_a",`
    <!-- Thermometer -->
    <rect x="105" y="20" width="14" height="80" fill="#ffffff" stroke="#1c2833" stroke-width="2" rx="7"/>
    <circle cx="112" cy="100" r="15" fill="#e63946" stroke="#1c2833" stroke-width="2"/>
    <rect x="110" y="32" width="4" height="68" fill="#e63946"/>
    <!-- Limit Line -->
    <line x1="92" y1="32" x2="128" y2="32" stroke="#e63946" stroke-width="2"/>
    <text x="133" y="36" font-size="9" fill="#e63946" font-weight="bold">110°C MAX</text>
    <!-- Rise Arrow -->
    <path d="M 85 85 L 85 36" fill="none" stroke="#e76f51" stroke-width="2.5" marker-end="url(#arrow-jusqu_a)"/>
  `,"UNTIL / UP TO LIMIT (jusqu'à)"),matin:U("matin",`
    <!-- Horizon line -->
    <line x1="30" y1="85" x2="210" y2="85" stroke="#1c2833" stroke-width="2"/>
    <!-- Sun rising -->
    <path d="M 95 85 A 25 25 0 0 1 145 85 Z" fill="#e76f51" stroke="#1c2833" stroke-width="2"/>
    <!-- Sun rays -->
    <line x1="120" y1="50" x2="120" y2="40" stroke="#e76f51" stroke-width="2" stroke-linecap="round"/>
    <line x1="100" y1="60" x2="90" y2="52" stroke="#e76f51" stroke-width="2" stroke-linecap="round"/>
    <line x1="140" y1="60" x2="150" y2="52" stroke="#e76f51" stroke-width="2" stroke-linecap="round"/>
    <line x1="85" y1="78" x2="73" y2="78" stroke="#e76f51" stroke-width="2" stroke-linecap="round"/>
    <line x1="155" y1="78" x2="167" y2="78" stroke="#e76f51" stroke-width="2" stroke-linecap="round"/>
  `,"MORNING (le matin)"),midi:U("midi",`
    <!-- Sun directly overhead -->
    <circle cx="120" cy="45" r="16" fill="#e76f51" stroke="#1c2833" stroke-width="2"/>
    <line x1="120" y1="22" x2="120" y2="12" stroke="#e76f51" stroke-width="2"/>
    <line x1="120" y1="68" x2="120" y2="78" stroke="#e76f51" stroke-width="2"/>
    <line x1="97" y1="45" x2="87" y2="45" stroke="#e76f51" stroke-width="2"/>
    <line x1="143" y1="45" x2="153" y2="45" stroke="#e76f51" stroke-width="2"/>
    <!-- Clock showing 12:00 -->
    <circle cx="120" cy="85" r="15" fill="#ffffff" stroke="#1c2833" stroke-width="2"/>
    <line x1="120" y1="85" x2="120" y2="73" stroke="#1c2833" stroke-width="2" stroke-linecap="round"/>
    <line x1="120" y1="85" x2="120" y2="80" stroke="#e76f51" stroke-width="2" stroke-linecap="round"/>
  `,"NOON (midi)"),"apres midi":U("apres_midi",`
    <!-- Sun slightly tilted to the right -->
    <circle cx="155" cy="50" r="14" fill="#e76f51" stroke="#1c2833" stroke-width="2"/>
    <line x1="155" y1="30" x2="155" y2="22" stroke="#e76f51" stroke-width="1.5"/>
    <line x1="135" y1="50" x2="127" y2="50" stroke="#e76f51" stroke-width="1.5"/>
    <!-- Landscape/Ground -->
    <line x1="30" y1="90" x2="210" y2="90" stroke="#1c2833" stroke-width="2"/>
    <!-- chef hat in daylight -->
    <path d="M 70 90 L 70 70 C 70 62, 80 58, 85 62 C 90 58, 100 62, 100 70 L 100 90 Z" fill="#ffffff" stroke="#1c2833" stroke-width="1.5"/>
  `,"AFTERNOON (l'après-midi)"),soir:U("soir",`
    <!-- Horizon line -->
    <line x1="30" y1="85" x2="210" y2="85" stroke="#1c2833" stroke-width="2"/>
    <!-- Sun setting -->
    <path d="M 100 85 A 20 20 0 0 1 140 85 Z" fill="#e76f51" opacity="0.6"/>
    <!-- Evening stars -->
    <path d="M 50 35 L 52 40 L 57 41 L 53 44 L 54 49 L 50 46 L 46 49 L 47 44 L 43 41 L 48 40 Z" fill="#f4a261" transform="scale(0.8) translate(10, 10)"/>
  `,"EVENING (le soir)"),nuit:U("nuit",`
    <!-- Crescent Moon -->
    <path d="M 100 35 A 30 30 0 1 0 145 80 A 24 24 0 1 1 100 35" fill="#f4a261" stroke="#1c2833" stroke-width="2" filter="url(#shadow-nuit)"/>
    <!-- Sparkly Stars -->
    <circle cx="60" cy="45" r="2" fill="#ffffff"/>
    <circle cx="75" cy="75" r="1.5" fill="#ffffff"/>
    <circle cx="165" cy="40" r="2" fill="#ffffff"/>
  `,"NIGHT (la nuit)")};M.a=M.a;M.à=M.a;M.contre=M.contre;M.derriere=M.derriere;M.derrière=M.derriere;M["a cote de"]=M.a_cote_de;M["a coté de"]=M.a_cote_de;M["à côté de"]=M.a_cote_de;M["en face de"]=M.en_face_de;M["au dessus de"]=M.au_dessus_de;M["au-dessus de"]=M.au_dessus_de;M["au dessous de"]=M.au_dessous_de;M["au-dessous de"]=M.au_dessous_de;M["autour de"]=M.autour_de;M["au milieu de"]=M.au_milieu_de;M["pres de"]=M.pres_de;M["près de"]=M.pres_de;M["loin de"]=M.loin_de;M["jusqu a"]=M.jusqu_a;M["jusqu à"]=M.jusqu_a;M["jusqu'a"]=M.jusqu_a;M["jusqu'à"]=M.jusqu_a;M.lundi=_e(0,"MONDAY (lundi)");M.mardi=_e(1,"TUESDAY (mardi)");M.mercredi=_e(2,"WEDNESDAY (mercredi)");M.jeudi=_e(3,"THURSDAY (jeudi)");M.vendredi=_e(4,"FRIDAY (vendredi)");M.samedi=_e(5,"SATURDAY (samedi)");M.dimanche=_e(6,"SUNDAY (dimanche)");M["avant hier"]=ze(0,"DAY BEFORE YESTERDAY (avant-hier)");M.hier=ze(1,"YESTERDAY (hier)");M["aujourd hui"]=ze(2,"TODAY (aujourd'hui)");M.demain=ze(3,"TOMORROW (demain)");M["apres demain"]=ze(4,"DAY AFTER TOMORROW (après-demain)");M["l apres midi"]=M["apres midi"];function Mt(){var o;const e=document.createElement("div"),r=document.createElement("h2");r.className="section-title",r.innerText="Vocabulaire Professionnel",e.appendChild(r);const t=document.createElement("p");t.className="section-subtitle",t.innerText="Essential culinary terminology for kitchen brigade communications. Filter by category, tag, or difficulty level.",e.appendChild(t);const a=document.createElement("div");a.className="loading-placeholder",a.innerText="Chargement du vocabulaire... (Loading vocabulary...)",e.appendChild(a);const n=((o=x.settings)==null?void 0:o.targetLevel)||"ALL";return oe("knowledge",n).then(()=>{a.remove(),Bt(e,n)}),e}function Bt(e,r){var _,l;const t=((_=x.settings)==null?void 0:_.includeGeneral)||!1,n=(((l=x.db)==null?void 0:l.knowledge)||[]).filter(v=>v.french&&v.japanese).filter(v=>t||v.is_professional),o=["ALL",...new Set(n.map(v=>v.category))],m=["ALL",...new Set(n.flatMap(v=>v.tags||[]))],i=["ALL","A1","A2","B1","B2","C1","C2"];let u="ALL",s="ALL",g=r;const f=document.createElement("div");f.className="card",f.style.padding="1.2rem",f.style.marginBottom="2rem",f.style.display="flex",f.style.flexDirection="column",f.style.gap="1rem",f.innerHTML=`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
      <div>
        <label style="font-size: 0.8rem; font-weight: 600; display: block; margin-bottom: 0.3rem; color: var(--color-text-muted);">Catégorie (Category)</label>
        <select id="vocab-category-select" style="padding: 0.5rem; font-size: 0.9rem; border-radius: var(--radius-sm); border: 1px solid rgba(0,0,0,0.1); width: 100%; background: var(--color-bg);">
          ${o.map(v=>`<option value="${v}" ${v===u?"selected":""}>${v}</option>`).join("")}
        </select>
      </div>
      <div>
        <label style="font-size: 0.8rem; font-weight: 600; display: block; margin-bottom: 0.3rem; color: var(--color-text-muted);">Étiquettes (Tag)</label>
        <select id="vocab-tag-select" style="padding: 0.5rem; font-size: 0.9rem; border-radius: var(--radius-sm); border: 1px solid rgba(0,0,0,0.1); width: 100%; background: var(--color-bg);">
          ${m.map(v=>`<option value="${v}" ${v===s?"selected":""}>${v==="ALL"?"ALL TAGS":"#"+v}</option>`).join("")}
        </select>
      </div>
      <div>
        <label style="font-size: 0.8rem; font-weight: 600; display: block; margin-bottom: 0.3rem; color: var(--color-text-muted);">Niveau (Level)</label>
        <select id="vocab-level-select" style="padding: 0.5rem; font-size: 0.9rem; border-radius: var(--radius-sm); border: 1px solid rgba(0,0,0,0.1); width: 100%; background: var(--color-bg);">
          ${i.map(v=>`<option value="${v}" ${v===g?"selected":""}>${v==="ALL"?"ALL LEVELS":v}</option>`).join("")}
        </select>
      </div>
    </div>
  `,e.appendChild(f);const c=document.createElement("div");c.className="card-grid",e.appendChild(c);function h(){var P;c.innerHTML="";const T=(((P=x.db)==null?void 0:P.knowledge)||[]).filter(d=>d.french&&d.japanese).filter(d=>t||d.is_professional).filter(d=>{const p=u==="ALL"||d.category===u,y=s==="ALL"||d.tags&&d.tags.includes(s),S=g==="ALL"||d.level===g;return p&&y&&S});if(T.length===0){c.innerHTML='<p style="color: var(--color-text-muted); grid-column: 1 / -1; text-align: center; padding: 2rem;">Aucun terme trouvé correspondant à vos critères de filtrage.</p>';return}T.forEach(d=>{const p=document.createElement("div");p.className="card";const y=fe(d.id),S=x.srs[d.id],k=!!S,w=d.examples&&d.examples[0]?d.examples[0].fr:"",C=d.examples&&d.examples[0]?d.examples[0].ja:"",$=Ie(d.french),q=$?`<div class="preposition-illustration-container" style="height: 130px; background-color: #fcfbfa; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; margin: 0.8rem 0; overflow: hidden; border: 1px solid rgba(0,0,0,0.03);">${$}</div>`:"";let b="";if(d.gender){const j=d.gender==="m"?"Masculin":d.gender==="f"?"Féminin":d.gender==="m/f"?"M/F":d.gender;b=`<span style="font-size: 0.72rem; font-weight: 600; padding: 0.1rem 0.45rem; border-radius: 4px; display: inline-block; ${d.gender==="m"?"background-color: rgba(0, 0, 91, 0.05); color: var(--color-primary); border: 1px solid rgba(0, 0, 91, 0.12);":d.gender==="f"?"background-color: rgba(220, 38, 38, 0.05); color: var(--color-secondary); border: 1px solid rgba(220, 38, 38, 0.12);":"background-color: rgba(90, 106, 128, 0.05); color: var(--color-text-muted); border: 1px solid rgba(90, 106, 128, 0.12);"}">${j}</span>`}let L="";if(d.verb_group){let j="";d.verb_group===1||d.verb_group==="1"?j="1er groupe (-er)":d.verb_group===2||d.verb_group==="2"?j="2e groupe (-ir)":d.verb_group===3||d.verb_group==="3"?j="3e groupe (Irrégulier)":j=`${d.verb_group}e groupe`,L=`<span style="font-size: 0.72rem; font-weight: 600; padding: 0.1rem 0.45rem; border-radius: 4px; display: inline-block; background-color: rgba(107, 156, 104, 0.07); color: var(--color-success); border: 1px solid rgba(107, 156, 104, 0.15);">${j}</span>`}p.innerHTML=`
        <div style="display: flex; flex-direction: column; height: 100%; justify-content: space-between; gap: 1.5rem;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <span class="card-category" style="margin:0;">${d.category}</span>
              <span class="grammar-badge" style="background-color: var(--color-primary);">${d.level}</span>
            </div>
            
            <div class="term-header">
              <div style="display: flex; flex-direction: column; gap: 0.25rem; align-items: flex-start;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <h3 class="term-title">${d.french}</h3>
                  <button class="audio-btn" data-text="${d.french}" title="Listen pronunciation" style="background: none; border: none; font-size: 1.15rem; cursor: pointer; color: var(--color-accent); transition: var(--transition); padding: 0.2rem;">🔊</button>
                </div>
                ${b||L?`
                  <div style="display: flex; gap: 0.3rem; flex-wrap: wrap;">
                    ${b}
                    ${L}
                  </div>
                `:""}
              </div>
              <button class="fav-btn ${y?"active":""}" data-id="${d.id}">
                ${y?"★":"☆"}
              </button>
            </div>
            
            ${q}
            
            <div class="term-translations" style="margin-top: 0.6rem; display: flex; flex-direction: column; gap: 0.4rem;">
              <div class="flip-translation-container">
                <div class="flip-translation-card">
                  <div class="flip-front" style="display: flex; align-items: center; gap: 0.4rem; justify-content: flex-start; padding: 0.4rem 0.6rem; text-align: left;">
                    <button class="audio-btn" data-text="${d.definition_fr}" title="Listen definition" style="background: none; border: none; font-size: 0.9rem; cursor: pointer; color: var(--color-accent); padding: 0.1rem; line-height: 1; flex-shrink: 0;">🔊</button>
                    <span style="font-size: 0.76rem; line-height: 1.25; color: var(--color-text-main); font-weight: 500;">${d.definition_fr||"No definition loaded."}</span>
                  </div>
                  <div class="flip-back" style="font-size: 0.85rem; font-weight: 600; padding: 0.4rem 0.6rem; justify-content: center; text-align: center; color: var(--color-secondary);">
                     🇬🇧 ${d.english}
                  </div>
                </div>
              </div>
              <div class="trans-ja" style="margin-top: 0.2rem; font-weight: 500;">${d.japanese}</div>
            </div>
            
            <div class="term-context" style="margin-top: 1rem;">
              <div class="context-fr" style="display: flex; align-items: flex-start; gap: 0.4rem; font-style: italic; color: var(--color-secondary);">
                <span style="flex: 1;">"${w}"</span>
                <button class="audio-btn" data-text="${w}" title="Listen context sentence" style="background: none; border: none; font-size: 0.9rem; cursor: pointer; color: var(--color-text-muted); padding: 0.15rem; margin-top: 0.15rem;">🔊</button>
              </div>
              <div class="context-ja">${C}</div>
            </div>
            
            ${d.tags&&d.tags.length>0?`
              <div style="margin-top: 1rem; display: flex; flex-wrap: wrap; gap: 0.3rem;">
                ${d.tags.map(j=>`<span class="tag-badge" style="background-color: rgba(197, 168, 128, 0.08); color: var(--color-accent); font-size: 0.75rem; padding: 0.1rem 0.5rem; border-radius: 12px;">#${j}</span>`).join("")}
              </div>
            `:""}
          </div>
          
          <!-- SRS status in card footer -->
          <div style="border-top: 1px solid rgba(0,0,0,0.05); padding-top: 1rem; font-size: 0.8rem; display: flex; flex-direction: column; gap: 0.5rem;">
            ${k?`
              <div style="display: flex; justify-content: space-between; color: var(--color-text-muted);">
                <span>Interval: <strong>${S.interval} days</strong></span>
                <span>Due: <strong>${S.dueDate}</strong></span>
              </div>
              <div style="display: flex; gap: 0.5rem;">
                <button class="next-btn srs-action-btn" data-id="${d.id}" data-action="memorized" style="background-color: var(--color-success); font-size: 0.75rem; padding: 0.3rem 0.6rem; flex: 1;">
                  ✓ Memorized
                </button>
                <button class="next-btn srs-action-btn" data-id="${d.id}" data-action="reset" style="background-color: transparent; border: 1px solid var(--color-error); color: var(--color-error); font-size: 0.75rem; padding: 0.3rem 0.6rem;">
                  Forget
                </button>
              </div>
            `:`
              <div style="color: var(--color-text-muted); font-style: italic; margin-bottom: 0.2rem;">Not yet added to SRS memory deck.</div>
              <button class="next-btn srs-action-btn" data-id="${d.id}" data-action="start" style="font-size: 0.75rem; padding: 0.4rem 0.8rem; width: 100%;">
                Start Memorizing (Add to SRS)
              </button>
            `}
          </div>
        </div>
      `;const E=p.querySelector(".flip-translation-container");E.addEventListener("click",j=>{j.stopPropagation(),E.querySelector(".flip-translation-card").classList.toggle("flipped")}),p.querySelector(".fav-btn").addEventListener("click",j=>{j.stopPropagation(),be(d.id);const z=j.target,F=fe(d.id);z.classList.toggle("active",F),z.innerText=F?"★":"☆"}),p.querySelectorAll(".audio-btn").forEach(j=>{j.addEventListener("click",z=>{z.stopPropagation();const F=z.target.closest(".audio-btn").getAttribute("data-text");te(F)})}),p.querySelectorAll(".srs-action-btn").forEach(j=>{j.addEventListener("click",z=>{z.stopPropagation();const F=z.target.getAttribute("data-action"),H=z.target.getAttribute("data-id");F==="start"?He(H,4):F==="memorized"?He(H,5):F==="reset"&&He(H,0),h()})}),c.appendChild(p)})}f.querySelector("#vocab-category-select").addEventListener("change",v=>{u=v.target.value,h()}),f.querySelector("#vocab-tag-select").addEventListener("change",v=>{s=v.target.value,h()}),f.querySelector("#vocab-level-select").addEventListener("change",async v=>{var w;g=v.target.value,c.innerHTML=`<div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--color-text-muted);">Chargement (Loading level ${g})...</div>`,await oe("knowledge",g);const T=(((w=x.db)==null?void 0:w.knowledge)||[]).filter(C=>C.french&&C.japanese).filter(C=>t||C.is_professional),P=["ALL",...new Set(T.map(C=>C.category))],d=["ALL",...new Set(T.flatMap(C=>C.tags||[]))],p=f.querySelector("#vocab-category-select"),y=p.value;p.innerHTML=P.map(C=>`<option value="${C}" ${C===y?"selected":""}>${C}</option>`).join(""),u=p.value;const S=f.querySelector("#vocab-tag-select"),k=S.value;S.innerHTML=d.map(C=>`<option value="${C}" ${C===k?"selected":""}>${C==="ALL"?"ALL TAGS":"#"+C}</option>`).join(""),s=S.value,h()}),h()}function Ft(){var o;const e=document.createElement("div"),r=document.createElement("h2");r.className="section-title",r.innerText="Grammaire de la Cuisine",e.appendChild(r);const t=document.createElement("p");t.className="section-subtitle",t.innerText="French grammar concepts framed through recipe instructions and professional dialogues.",e.appendChild(t);const a=document.createElement("div");a.className="loading-placeholder",a.innerText="Chargement de la grammaire... (Loading grammar...)",e.appendChild(a);const n=((o=x.settings)==null?void 0:o.targetLevel)||"ALL";return oe("knowledge",n).then(()=>{a.remove(),Ht(e,n)}),e}function Ht(e,r){var n;const a=(((n=x.db)==null?void 0:n.knowledge)||[]).filter(o=>o.grammar).map(o=>({id:o.id,category:o.category,french:o.french,level:o.level,topic:o.grammar.topic,explanation_en:o.grammar.explanation_en,explanation_ja:o.grammar.explanation_ja,examples:o.examples||[]})).filter(o=>r==="ALL"||o.level===r);if(a.length===0){const o=document.createElement("p");o.style.color="var(--color-text-muted)",o.innerText="Aucune leçon de grammaire chargée pour ce niveau.",e.appendChild(o);return}a.forEach(o=>{const m=document.createElement("div");m.className="grammar-card";const i=fe(o.id),u=o.topic.match(/\(([^)]+)\)/),s=u?u[1]:o.topic,g=Ie(o.french||""),f=g?`<div class="preposition-illustration-container" style="height: 130px; background-color: #fcfbfa; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; margin: 0.8rem 0; overflow: hidden; border: 1px solid rgba(0,0,0,0.03);">${g}</div>`:"";m.innerHTML=`
      <div class="grammar-header">
        <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
          <span class="grammar-badge">${o.level}</span>
          <span class="grammar-title">${o.topic}</span>
          <button class="audio-btn" data-text="${s}" title="Listen topic pronunciation" style="background: none; border: none; font-size: 0.9rem; cursor: pointer; color: var(--color-accent); padding: 0.15rem; line-height: 1;">🔊</button>
        </div>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <button class="fav-btn ${i?"active":""}" data-id="${o.id}" style="font-size: 1.1rem; padding: 0.2rem;">
            ${i?"★":"☆"}
          </button>
          <span class="toggle-icon" style="font-size: 1rem; color: var(--color-text-muted); font-weight: bold;">▼</span>
        </div>
      </div>
      ${f}
      <div class="grammar-body">
        <div class="grammar-expl">
          <p style="margin-bottom: 0.6rem; font-weight: 500; color: var(--color-secondary);">Explanation (EN):</p>
          <p style="margin-bottom: 1rem;">${o.explanation_en}</p>
          <p style="margin-bottom: 0.6rem; font-weight: 500; color: var(--color-secondary);">説明 (JA):</p>
          <p style="margin-bottom: 1.2rem;">${o.explanation_ja}</p>
        </div>
        <div class="grammar-examples">
          <p style="font-size: 0.8rem; font-weight: 600; text-transform: uppercase; color: var(--color-accent); letter-spacing: 1px; margin-bottom: 0.8rem;">Exemples de Cuisine (Examples):</p>
          <div class="examples-list">
            ${o.examples.map(l=>`
              <div class="example-item" style="margin-bottom: 0.8rem;">
                <div class="example-fr" style="display: flex; align-items: center; gap: 0.4rem;">
                  <span style="flex: 1;">➔ ${l.fr}</span>
                  <button class="audio-btn" data-text="${l.fr}" title="Listen pronunciation" style="background: none; border: none; font-size: 0.9rem; cursor: pointer; color: var(--color-accent); padding: 0.15rem; line-height: 1;">🔊</button>
                </div>
                <div class="example-en">${l.en}</div>
                <div class="example-ja">${l.ja}</div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `;const c=m.querySelector(".grammar-header"),h=m.querySelector(".grammar-body"),_=m.querySelector(".toggle-icon");c.addEventListener("click",l=>{if(l.target.classList.contains("fav-btn")||l.target.closest(".audio-btn"))return;const v=h.classList.toggle("open");_.innerText=v?"▲":"▼"}),m.querySelector(".fav-btn").addEventListener("click",l=>{l.stopPropagation(),be(o.id);const v=l.target,A=fe(o.id);v.classList.toggle("active",A),v.innerText=A?"★":"☆"}),m.querySelectorAll(".audio-btn").forEach(l=>{l.addEventListener("click",v=>{v.stopPropagation();const A=v.target.closest(".audio-btn").getAttribute("data-text");te(A)})}),e.appendChild(m)})}function Rt(){const e=document.createElement("div");e.className="reference-container-view";const r=document.createElement("h2");r.className="section-title",r.innerText="Référence Grammaticale (Grammar Reference)",e.appendChild(r);const t=document.createElement("p");t.className="section-subtitle",t.innerText="Explore structured conjugations, classifications, and auxiliary usage patterns in culinary French.",e.appendChild(t);const a=document.createElement("div");return a.className="loading-placeholder",a.innerText="Chargement des références... (Loading references...)",e.appendChild(a),fetch("data/grammar_reference.json").then(n=>{if(!n.ok)throw new Error("Could not load reference data");return n.json()}).then(n=>{a.remove(),It(e,n)}).catch(n=>{a.innerText="Erreur lors du chargement des données. (Error loading reference data.)",console.error(n)}),e}function It(e,r){const t=document.createElement("div");t.className="ref-layout";const a=document.createElement("div");a.className="ref-sidebar";const n=document.createElement("div");n.className="ref-content-panel",r.forEach((o,m)=>{const i=document.createElement("button");i.className=`ref-menu-btn ${m===0?"active":""}`,i.innerHTML=`
      <span class="ref-menu-num">${m+1}</span>
      <div class="ref-menu-txt">
        <span class="ref-menu-ja">${o.title_ja}</span>
        <span class="ref-menu-fr">${o.title_fr}</span>
      </div>
    `,i.addEventListener("click",()=>{document.querySelectorAll(".ref-menu-btn").forEach(u=>u.classList.remove("active")),i.classList.add("active"),nt(n,o),window.innerWidth<=768&&n.scrollIntoView({behavior:"smooth"})}),a.appendChild(i)}),t.appendChild(a),t.appendChild(n),e.appendChild(t),r.length>0&&nt(n,r[0])}function nt(e,r){e.innerHTML="",e.style.animation="fadeIn 0.3s ease";const t=document.createElement("div");t.className="ref-topic-header",t.innerHTML=`
    <h3 class="ref-topic-title">${r.title_fr}</h3>
    <div class="ref-topic-subtitle">
      <span>${r.title_en}</span> &bull; <span>${r.title_ja}</span>
    </div>
  `,e.appendChild(t);const a=document.createElement("div");a.className="ref-definition-box",a.innerHTML=`
    <p class="ref-def-fr"><strong>Définition :</strong> ${r.definition_fr}</p>
    <p class="ref-def-ja"><strong>定義 :</strong> ${r.definition_ja}</p>
  `,e.appendChild(a),r.sections.forEach(n=>{const o=document.createElement("div");if(o.className="ref-section-container",n.type==="table"){const m=document.createElement("h4");m.className="ref-sec-title",m.innerText=n.title,o.appendChild(m);const i=document.createElement("div");i.className="ref-table-wrapper";const u=document.createElement("table");u.className="ref-table";const s=[],g=document.createElement("tr");if(n.headers.forEach((f,c)=>{const h=document.createElement("th");f==="発音"?(s.push(c),h.innerText="音声",h.style.textAlign="center"):h.innerText=f,g.appendChild(h)}),u.appendChild(g),n.rows.forEach(f=>{const c=document.createElement("tr");f.forEach((h,_)=>{const l=document.createElement("td");if(s.includes(_)){const v=f[_-1]?f[_-1].split("(")[0].trim():"";l.innerHTML=`<button class="ref-table-audio-btn" data-speak="${v}" title="Listen pronunciation">🔊</button>`,l.style.textAlign="center"}else l.innerText=h,_===1&&(n.title.includes("Conjugaison")||n.title.includes("Présent")||n.title.includes("Exemple"))&&(l.style.position="relative",l.innerHTML=`
                <span style="margin-right: 1.5rem;">${h}</span>
                <button class="ref-table-audio-btn" data-speak="${h.split("(")[0].trim()}" title="Listen pronunciation">🔊</button>
              `);c.appendChild(l)}),u.appendChild(c)}),i.appendChild(u),o.appendChild(i),n.example){const f=document.createElement("div");f.className="ref-table-attached-ex",f.innerHTML=`
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div class="ref-ex-fr">➔ ${n.example.fr}</div>
            <button class="audio-btn" data-speak="${n.example.fr}">🔊</button>
          </div>
          <div class="ref-ex-ja">${n.example.ja}</div>
        `,o.appendChild(f)}}else if(n.type==="examples"){const m=document.createElement("h4");m.className="ref-sec-title",m.innerText=n.title,o.appendChild(m);const i=document.createElement("div");i.className="ref-examples-list",n.examples.forEach(u=>{const s=document.createElement("div");s.className="ref-example-item",s.innerHTML=`
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem;">
            <span class="ref-ex-fr">➔ ${u.fr}</span>
            <button class="audio-btn" data-speak="${u.fr}">🔊</button>
          </div>
          <div class="ref-ex-ja">${u.ja}</div>
        `,i.appendChild(s)}),o.appendChild(i)}else if(n.type==="illustrations_grid"){const m=document.createElement("h4");m.className="ref-sec-title",m.innerText=n.title,o.appendChild(m);const i=document.createElement("div");i.className="ref-illustrations-grid",i.style.display="grid",i.style.gridTemplateColumns="repeat(auto-fill, minmax(180px, 1fr))",i.style.gap="1rem",i.style.marginTop="1rem",n.items.forEach(u=>{const s=document.createElement("div");s.className="ref-illustration-card",s.style.border="1px solid rgba(0,0,0,0.06)",s.style.borderRadius="8px",s.style.padding="0.8rem 0.5rem",s.style.backgroundColor="#fcfbfa",s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.transition="transform 0.2s ease, box-shadow 0.2s ease",s.addEventListener("mouseenter",()=>{s.style.transform="translateY(-2px)",s.style.boxShadow="0 4px 12px rgba(0,0,0,0.05)"}),s.addEventListener("mouseleave",()=>{s.style.transform="none",s.style.boxShadow="none"});const g=Ie(u.word);s.innerHTML=`
          <div class="preposition-illustration-container" style="width: 100%; height: 110px; display: flex; align-items: center; justify-content: center; overflow: hidden; border-radius: 4px; background-color: #ffffff;">
            ${g}
          </div>
          <div style="font-weight: bold; margin-top: 0.6rem; display: flex; align-items: center; gap: 0.4rem; color: var(--color-primary); font-size: 0.95rem;">
            <span>${u.word}</span>
            <button class="audio-btn" data-speak="${u.word}" style="background: none; border: none; cursor: pointer; font-size: 0.85rem; color: var(--color-accent); line-height: 1; padding: 2px;">🔊</button>
          </div>
          <div style="font-size: 0.78rem; color: var(--color-text-muted); text-align: center; margin-top: 0.2rem; font-weight: 500;">${u.desc}</div>
        `,i.appendChild(s)}),o.appendChild(i)}else if(n.type==="info"){const m=document.createElement("div");m.className="ref-info-box",m.innerHTML=`
        <h4 class="ref-info-title">💡 ${n.title}</h4>
        <p class="ref-info-fr">${n.content_fr}</p>
        <p class="ref-info-ja">${n.content_ja}</p>
      `,o.appendChild(m)}e.appendChild(o)}),e.querySelectorAll(".audio-btn, .ref-table-audio-btn").forEach(n=>{n.addEventListener("click",o=>{o.stopPropagation();const m=n.getAttribute("data-speak");te(m),n.style.transform="scale(1.2)",setTimeout(()=>n.style.transform="none",150)})})}function Nt(e){var t;e.innerHTML='<div style="text-align: center; padding: 2rem; color: var(--color-text-muted);">Chargement de la théorie... (Loading theory...)</div>';const r=((t=x.settings)==null?void 0:t.targetLevel)||"ALL";oe("knowledge",r).then(()=>{var m;e.innerHTML="";const n=(((m=x.db)==null?void 0:m.knowledge)||[]).filter(i=>i.cuisine).map(i=>({id:i.id,level:i.level,category:i.category||"Theory",topic:i.cuisine.topic,content_fr:i.cuisine.content_fr,content_en:i.cuisine.content_en,content_ja:i.cuisine.content_ja})).filter(i=>r==="ALL"||i.level===r);if(n.length===0){e.innerHTML='<p style="color: var(--color-text-muted);">Aucun document de théorie culinaire disponible pour ce niveau.</p>';return}const o=document.createElement("div");o.style.display="flex",o.style.flexDirection="column",o.style.gap="2rem",n.forEach(i=>{const u=document.createElement("div");u.className="card",u.style.display="block",u.style.padding="2rem";const s=fe(i.id),g=i.topic.match(/^([^(]+)/),f=g?g[1].trim():i.topic;u.innerHTML=`
        <div class="card-category" style="margin-bottom: 0.5rem;">${i.category}</div>
        <div class="term-header" style="border-bottom: 1px solid rgba(197, 168, 128, 0.15); padding-bottom: 0.8rem; margin-bottom: 1.5rem;">
          <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
            <h3 style="font-family: var(--font-serif); font-size: 1.6rem; color: var(--color-primary); margin: 0;">${i.topic}</h3>
            <button class="audio-btn" data-text="${f}" title="Listen topic pronunciation" style="background: none; border: none; font-size: 1.1rem; cursor: pointer; color: var(--color-accent); padding: 0.15rem; line-height: 1;">🔊</button>
          </div>
          <button class="fav-btn ${s?"active":""}" data-id="${i.id}" style="font-size: 1.3rem;">
            ${s?"★":"☆"}
          </button>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.3rem;">
              <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-accent); font-weight: 600;">Français</h4>
              <button class="audio-btn" data-text="${i.content_fr}" title="Listen paragraph" style="background: none; border: none; font-size: 0.95rem; cursor: pointer; color: var(--color-accent); padding: 0.15rem; line-height: 1;">🔊</button>
            </div>
            <p style="font-size: 0.95rem; color: var(--color-primary); font-style: italic; text-align: justify; line-height: 1.6;">${i.content_fr}</p>
          </div>
          <div>
            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-accent); font-weight: 600; margin-bottom: 0.3rem;">English Explanation</h4>
            <p style="font-size: 0.9rem; color: var(--color-text-main); text-align: justify; line-height: 1.6;">${i.content_en}</p>
          </div>
          <div style="background-color: rgba(10, 25, 49, 0.03); padding: 1.2rem; border-radius: var(--radius-sm); border-left: 3px solid var(--color-secondary);">
            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-primary); font-weight: 600; margin-bottom: 0.3rem;">解説（日本語）</h4>
            <p style="font-size: 0.9rem; color: var(--color-text-main); text-align: justify; line-height: 1.6;">${i.content_ja}</p>
          </div>
        </div>
      `,u.querySelector(".fav-btn").addEventListener("click",c=>{c.stopPropagation(),be(i.id);const h=c.target,_=fe(i.id);h.classList.toggle("active",_),h.innerText=_?"★":"☆"}),u.querySelectorAll(".audio-btn").forEach(c=>{c.addEventListener("click",h=>{h.stopPropagation();const _=h.target.closest(".audio-btn").getAttribute("data-text");te(_)})}),o.appendChild(u)}),e.appendChild(o)})}const Dt={reg_normandie:{dishes:["sole_normande","poulet_vallee_d_auge"],ingredients:["ing_camembert","ing_pont_leveque","ing_livarot","ing_neufchatel","apple"],techniques:["pocher","sauter"],sauces:["sauce_creme","sauce_normande"]},reg_bourgogne:{dishes:["beef_bourguignon","escargots_persillade","coq_au_vin"],ingredients:["beef_charolais","mustard_dijon","ing_epoisses","ing_charolais","ing_comte","ing_morbier","ing_mont_d_or","ing_bourgogne_chablis","ing_bourgogne_cotes_de_nuits","ing_bourgogne_cotes_de_beaune","ing_bourgogne_chalonnaise","ing_bourgogne_maconnais"],techniques:["braiser","mijoter"],sauces:["sauce_vin_rouge"]},reg_provence:{dishes:["bouillabaisse","ratatouille","salade_nicoise"],ingredients:["oil_olive","herbes_de_provence","ing_banon","ing_bleu_queyras","ing_provence_cotes","ing_provence_bandol","ing_provence_cassis"],techniques:["mijoter","griller"],sauces:["rouille","vinaigrette"]},reg_alsace:{dishes:["choucroute_garnie","flammekueche","baeckeoffe"],ingredients:["sauerkraut","strasbourg_sausage","ing_munster","ing_alsace_bas_rhin","ing_alsace_haut_rhin"],techniques:["braiser","mijoter"],sauces:[]},reg_bretagne:{dishes:["galette_sarrasin","cotriade","kouign_amann"],ingredients:["buckwheat_flour","salted_butter"],techniques:["poeler","griller"],sauces:["beurre_blanc"]},reg_ile_de_france:{dishes:["pot_au_feu","soupe_oignon","entrecote_bercy"],ingredients:["mushroom_paris","ing_brie_meaux","ing_brie_melun"],techniques:["mijoter","griller"],sauces:["sauce_bercy"]},reg_aquitaine:{dishes:["confit_canard","cassoulet","magret_canard","ttoro_basque","axoa_de_veau","poulet_basquaise"],ingredients:["foie_gras","duck","cut_kokotxa_de_merlu","ing_ossau_iraty","ing_roquefort","ing_rocamadour","ing_bordeaux_medoc","ing_bordeaux_graves","ing_bordeaux_st_emilion","ing_bordeaux_pomerol","ing_bordeaux_sauternes","ing_sud_ouest_cahors","ing_sud_ouest_madiran","ing_sud_ouest_jurancon","ing_sud_ouest_bergerac"],techniques:["confire","braiser","mijoter","rotir_sur_braise"],sauces:["sauce_piperade","sauce_encre_basque"]},reg_rhone_alpes:{dishes:["quenelle_brochet","poulet_morilles","gratin_dauphinois"],ingredients:["poultry_bresse","sausage_lyon","ing_reblochon","ing_beaufort","ing_abondance","ing_fourme_ambert","ing_saint_nectaire","ing_cantal","ing_rhone_cote_rotie","ing_rhone_hermitage","ing_rhone_condrieu","ing_rhone_chateauneuf","ing_rhone_gigondas","ing_rhone_vacqueyras","ing_jura_arbois","ing_jura_chateau_chalon","ing_jura_etoile","ing_savoie_chignin","ing_savoie_apremont","ing_savoie_crepy"],techniques:["pocher","braiser","gratiner"],sauces:["sauce_nantua","sauce_supreme"]},reg_loire:{dishes:["rillettes_tours","brochet_beurre_blanc","tarte_tatin"],ingredients:["river_fish","ing_sainte_maure","ing_crottin_chavignol","ing_crottin","ing_valencay","ing_pouligny","ing_selles_sur_cher","ing_loire_nantes","ing_loire_anjou","ing_loire_saumur","ing_loire_touraine","ing_loire_sancerre"],techniques:["confire","pocher"],sauces:["beurre_blanc"]},reg_champagne:{dishes:["potee_champenoise","biscuits_roses"],ingredients:["ham_ardennes","ing_champagne_reims","ing_champagne_marne","ing_champagne_blancs","ing_champagne_bar"],techniques:["braiser","mijoter"],sauces:[]},reg_languedoc:{dishes:["cassoulet","brandade_morue","tielle_setoise"],ingredients:["lingot_bean","anchovy","ing_languedoc","ing_corbieres","ing_minervois","ing_roussillon"],techniques:["braiser","mijoter"],sauces:[]},reg_corse:{dishes:["civet_sanglier","fiadone","veau_olives"],ingredients:["chestnut_flour","lonzu_charcuterie","ing_brocciu","ing_corse_patrimonio","ing_corse_ajaccio","ing_corse_vin_de_corse"],techniques:["braiser","mijoter"],sauces:[]},reg_hauts_de_france:{dishes:["carbonnade_flamande","potjevleesch","moules_frites"],ingredients:["ing_maroilles","endive"],techniques:["braiser","mijoter"],sauces:["sauce_biere"]}},Ot={cut_filet:{techniques:["griller","rotir","sauter"],science:["muscle_fibers","low_collagen"],sauces:["sauce_bearnaise","sauce_madere"],dishes:["tournedos_rossini"]},cut_rumsteck:{techniques:["griller","rotir"],science:["iron_taste"],sauces:["sauce_poivre"],dishes:[]},cut_aiguillette:{techniques:["rotir","griller"],science:["fat_insulation"],sauces:[],dishes:[]},cut_palette:{techniques:["braiser","mijoter"],science:["collagen_emulsification"],sauces:["sauce_chasseur"],dishes:[]},cut_poitrine:{techniques:["braiser","mijoter"],science:["collagen_gelatinization"],sauces:[],dishes:["pot_au_feu"]},cut_langue:{techniques:["braiser","mijoter","sauter"],science:["collagen_gelatinization"],sauces:["sauce_gribiche","sauce_madere"],dishes:[]},cut_onglet:{techniques:["griller","sauter"],science:["muscle_fibers"],sauces:["sauce_echalote"],dishes:[]},cut_foie:{techniques:["sauter"],science:["protein_coagulation"],sauces:[],dishes:["pate_de_campagne"]},cut_tripe:{techniques:["braiser","mijoter"],science:["collagen_breakdown"],sauces:[],dishes:["tripes_a_la_mode_de_caen"]},cut_boyaux:{techniques:["griller","embouter"],science:["curing_and_fermentation"],sauces:[],dishes:["andouillette"]},cut_chicken_breast:{techniques:["pocher","sauter","sous_vide"],science:["moisture_loss","protein_coagulation"],sauces:["sauce_supreme"],dishes:["supreme_de_volaille"]},cut_chicken_tender:{techniques:["sauter","friture"],science:["short_cook"],sauces:[],dishes:[]},cut_chicken_thigh:{techniques:["rotir","braiser","mijoter"],science:["collagen_gelatinization"],sauces:["sauce_chasseur"],dishes:["coq_au_vin"]},cut_chicken_shoulder:{techniques:["sauter","braiser"],science:["balanced_meat"],sauces:[],dishes:[]},cut_chicken_drumette:{techniques:["rotir","griller"],science:["bone_in_cooking"],sauces:[],dishes:[]},cut_chicken_wing_joint:{techniques:["confire","rotir"],science:["collagen_gelatinization"],sauces:[],dishes:[]},cut_chicken_wing:{techniques:["mijoter","rotir"],science:["gelatin_extraction"],sauces:[],dishes:["fond_de_volaille"]},cut_chicken_skin:{techniques:["rotir","sauter"],science:["fat_rendering","crispy_skin"],sauces:[],dishes:[]},cut_chicken_heart:{techniques:["griller"],science:["muscle_fibers"],sauces:[],dishes:[]},cut_chicken_cardiac_base:{techniques:["braiser","mijoter"],science:["cream_affinity"],sauces:[],dishes:[]},cut_chicken_liver:{techniques:["sauter"],science:["moisture_loss"],sauces:[],dishes:["pate_de_foie_de_volaille"]},cut_chicken_gizzard:{techniques:["confire","braiser"],science:["muscle_fibers"],sauces:[],dishes:["salade_landaise"]},cut_chicken_tail:{techniques:["rotir","griller"],science:["fat_rendering"],sauces:[],dishes:[]},cut_chicken_cartilage_yagen:{techniques:["mijoter"],science:["gelatin_extraction"],sauces:[],dishes:["fond_de_volaille"]},cut_chicken_cartilage_knee:{techniques:["mijoter"],science:["gelatin_extraction"],sauces:[],dishes:["fond_de_volaille"]},cut_pork_loin:{techniques:["rotir","sauter"],science:["moisture_loss"],sauces:["sauce_charcutiere"],dishes:[]},cut_pork_tenderloin:{techniques:["sauter","rotir"],science:["protein_coagulation"],sauces:["sauce_moutarde"],dishes:[]},cut_pork_shoulder_loin:{techniques:["braiser","rotir"],science:["fat_and_lean_interweave"],sauces:[],dishes:[]},cut_pork_belly:{techniques:["braiser","saler","rotir"],science:["curing_and_fermentation"],sauces:[],dishes:["pate_de_campagne","petit_sale_aux_lentilles"]},cut_pork_ham:{techniques:["saler","rotir"],science:["curing_and_fermentation"],sauces:[],dishes:["jambon_blanc","jambon_cru"]},cut_pork_cheek:{techniques:["confire","braiser"],science:["collagen_gelatinization"],sauces:[],dishes:[]},cut_pork_liver:{techniques:["sauter"],science:["emulsification"],sauces:[],dishes:["pate_de_campagne"]},cut_pork_tongue:{techniques:["braiser","mijoter"],science:["collagen_gelatinization"],sauces:["sauce_piquante"],dishes:[]},cut_pork_trotter:{techniques:["braiser","rotir"],science:["collagen_gelatinization"],sauces:[],dishes:["pied_de_porc_pane"]},cut_pork_intestine:{techniques:["griller","confire"],science:["curing_and_fermentation"],sauces:[],dishes:["andouille","andouillette"]},cut_kokotxa_de_merlu:{techniques:["emulser_au_pil_pil","pocher"],science:["collagen_gelatinization"],sauces:["sauce_verte_basque"],dishes:["kokotxas_de_merlu_au_pil_pil"]},cut_fish_fillet:{techniques:["sauter","pocher"],science:["protein_coagulation"],sauces:["beurre_blanc"],dishes:[]},cut_magret_de_canard:{techniques:["sauter","rotir"],science:["fat_rendering"],sauces:["sauce_echalote"],dishes:["magret_canard","salade_landaise"]},cut_gibier_chevreuil:{techniques:["rotir","sauter"],science:["protein_coagulation"],sauces:["sauce_poivre"],dishes:[]}},Vt={sole_normande:{name_fr:"Sole Normande",name_en:"Normandy Sole",name_ja:"ソール・ノルマンド",desc:"シタビラメを魚のブイヨン、生クリーム、キノコ、カキ、ムール貝と共に調理した、ノルマンディー沿岸を代表する高貴な魚料理。"},poulet_vallee_d_auge:{name_fr:"Poulet Vallée d'Auge",name_en:"Chicken Vallée d'Auge",name_ja:"プーレ・ヴァレ・ドージュ",desc:"鶏肉をリンゴ（カルヴァドスまたはシードル）と濃厚な生クリーム、キノコと共に煮込んだ、コトコト煮込みの郷土料理。"},beef_bourguignon:{name_fr:"Bœuf Bourguignon",name_en:"Beef Burgundy",name_ja:"ブフ・ブルギニョン",desc:"牛肉をブルゴーニュ産赤ワイン、小タマネギ、キノコ、ベーコンと共にじっくり煮込んだ、フランス古典料理の代名詞。"},escargots_persillade:{name_fr:"Escargots à la persillade",name_en:"Burgundy Escargots with Parsley Butter",name_ja:"エスカルゴのパセリバター焼き",desc:"エスカルゴ（食用カタツムリ）の殻にパセリとにんにくを練り込んだバター（ブルギニョンバター）を詰めてオーブンで焼いた料理。"},coq_au_vin:{name_fr:"Coq au Vin",name_en:"Rooster in Red Wine",name_ja:"コック・オ・ヴァン",desc:"雄鶏の肉を赤ワイン、香味野菜、ベーコン、キノコと共にじっくり煮込んだ、ブルゴーニュ地方発祥の伝統料理。"},bouillabaisse:{name_fr:"Bouillabaisse",name_en:"Bouillabaisse",name_ja:"ブイヤベース",desc:"地中海の様々な岩礁魚を、ニンニク、サフラン、オリーブオイル、フェンネルと共に煮込んだ、マルセイユ発祥の名物魚スープ。"},ratatouille:{name_fr:"Ratatouille",name_en:"Ratatouille",name_ja:"ラタトゥイユ",desc:"ナス、ズッキーニ、パプリカ、トマトなどの夏野菜をオリーブオイルとハーブでじっくり炒め煮にした、プロヴァンス地方の野菜料理。"},salade_nicoise:{name_fr:"Salade Niçoise",name_en:"Niçoise Salad",name_ja:"ニース風サラダ",desc:"トマト、アンチョビ、ゆで卵、オリーブ、インゲン、ツナなどにオリーブオイルをかけた、ニース発祥の爽やかなサラダ。"},choucroute_garnie:{name_fr:"Choucroute Garnie",name_en:"Sauerkraut with Pork and Sausages",name_ja:"シュークルート・ガルニ",desc:"発酵させた塩漬けキャベツ（シュークルート）を白ワインで煮込み、ソーセージや豚肉の塩漬けを添えたアルザス地方の代表料理。"},flammekueche:{name_fr:"Flammekueche / Tarte Flambée",name_en:"Flammekueche",name_ja:"タルト・フランベ",desc:"薄いパン生地にフロマージュ・ブラン、玉ねぎ、ベーコンをのせて高温の薪窯でパリッと焼き上げた、アルザス風ピザ。"},baeckeoffe:{name_fr:"Baeckeoffe",name_en:"Baeckeoffe",name_ja:"ベッコフ",desc:"牛肉、豚肉、羊肉とジャガイモ、玉ねぎをアルザス白ワインでマリネし、土鍋（テリーヌ型）でパン生地で密閉して長時間焼き上げたパン屋の鍋料理。"},galette_sarrasin:{name_fr:"Galette de sarrasin",name_en:"Buckwheat Galette",name_ja:"ガレット・ド・サラザン",desc:"そば粉で作った薄いクレープ生地に、ハム、卵、チーズ（コンプレ）などを包んで香ばしく焼いたブルターニュ地方の主食。"},cotriade:{name_fr:"Cotriade",name_en:"Brittany Fish Stew",name_ja:"コトリアード",desc:"地元の様々な魚とジャガイモをハーブの効いたブイヨンでさっと煮込み、トーストを添えて食べるブルターニュの漁師の魚スープ。"},kouign_amann:{name_fr:"Kouign-amann",name_en:"Kouign-amann",name_ja:"クイニーアマン",desc:"パン生地に大量のバターと砂糖を折り込み、外側をキャラメリゼさせて焼き上げた、ブルターニュの濃厚な伝統菓子。"},pot_au_feu:{name_fr:"Pot-au-feu",name_en:"Pot-au-feu",name_ja:"ポトフ",desc:"牛肉の塊と塊の野菜（人参、カブ、ネギなど）を水からじっくり煮込み、スープと具材を別々に楽しむフランス伝統の家庭料理。"},soupe_oignon:{name_fr:"Soupe à l'oignon",name_en:"French Onion Soup",name_ja:"オニオングラタンスープ",desc:"飴色に炒めた玉ねぎのスープに、バゲットとチーズをのせてオーブンでこんがりとグラチネしたパリ名物の温かいスープ。"},entrecote_bercy:{name_fr:"Entrecôte Bercy",name_en:"Bercy Entrecote",name_ja:"アントルコート・ベルシー",desc:"リブロースステーキに、白ワイン、シャロット、エシャロット、牛の骨髄、バターを合わせた香り豊かなベルシーソースをかけた料理。"},confit_canard:{name_fr:"Confit de canard",name_en:"Duck Confit",name_ja:"鴨のコンフィ",desc:"塩でマリネした鴨の骨付きもも肉を、鴨の脂の中で低温でじっくりと煮込み、仕上げに皮目をパリッと焼き上げた南西地方の保存食。"},cassoulet:{name_fr:"Cassoulet",name_en:"Cassoulet",name_ja:"カスレ",desc:"白インゲン豆と、鴨のコンフィ、豚肉、ソーセージなどを特製の土鍋（カソール）で長時間じっくりと焼き煮にした、ラングドック地方発祥の重厚な煮込み料理。"},magret_canard:{name_fr:"Magret de canard",name_en:"Duck Breast",name_ja:"マグレ・ド・カナール",desc:"フォアグラ用に肥育された鴨の胸肉（マグレ）を、皮目を格子状に切り込んで脂を出しながらミディアムレアに焼き上げたステーキ。"},quenelle_brochet:{name_fr:"Quenelle de brochet",name_en:"Pike Quenelle",name_ja:"川魚のクネル",desc:"カワカマス（淡水魚）のすり身に卵やバターを合わせてラグビーボール状にし、茹でてからザリガニソース（ナンチュアソース）をかけてオーブンで焼いたリヨンの名物。"},poulet_morilles:{name_fr:"Poulet Bresse aux morilles",name_en:"Bresse Chicken with Morel Mushrooms",name_ja:"ブレス鶏のモリーユ茸ソース",desc:"最高級ブレス産の鶏肉を、乾燥モリーユ茸（アミガサタケ）の旨味を引き出した生クリームソースで贅沢に煮込んだ極上の一皿。"},gratin_dauphinois:{name_fr:"Gratin Dauphinois",name_en:"Potato Gratin",name_ja:"グラタン・ドフィノワ",desc:"スライスしたジャガイモに、ニンニク、生クリーム、牛乳を加えてオーブンでじっくりと焼き上げた、チーズを使わない伝統的なジャガイモグラタン。"},rillettes_tours:{name_fr:"Rillettes de Tours",name_en:"Rillettes of Tours",name_ja:"リエット（トゥール風）",desc:"豚肉をラードの中で繊維がほぐれるまで数時間煮込み、冷やして脂肪で固めたペースト。バゲットに塗って食べる。"},brochet_beurre_blanc:{name_fr:"Brochet au beurre blanc",name_en:"Pike with Beurre Blanc Sauce",name_ja:"川魚のブール・ブラン添え",desc:"ロワール川のカワカマスを優しくポシェし、エシャロット、白ワイン、バターを乳化させた極上の「白いバターソース」で食べる高貴な一皿。"},tarte_tatin:{name_fr:"Tarte Tatin",name_en:"Tarte Tatin",name_ja:"タルトタタン",desc:"型の中にバターと砂糖でキャラメリゼしたリンゴを敷き詰め、パイ生地をかぶせて焼き、ひっくり返して供するロワール発祥のアップルタルト。"},potee_champenoise:{name_fr:"Potée Champenoise",name_en:"Champagne Pot-roasted Stew",name_ja:"ポテ・シャンプノワーズ",desc:"豚の塩漬け肉、ベーコン、ソーセージとキャベツ、人参などの野菜をシャンパーニュ地方のスタイルでコトコト煮込んだ温かい煮込み。"},biscuits_roses:{name_fr:"Biscuits roses de Reims",name_en:"Pink Biscuits of Reims",name_ja:"ビスキュイ・ローズ・ド・ランス",desc:"バニラの香りがするピンク色のサクサクしたビスケット。シャンパンに浸して食べるのがランスの伝統。"},brandade_morue:{name_fr:"Brandade de morue",name_en:"Cod Brandade",name_ja:"ブランダード・ド・モリュ",desc:"塩ダラを茹でてオリーブオイル、牛乳、ニンニクと共に細かくすり潰し、ペースト状にしたニーム地方の郷土料理。"},tielle_setoise:{name_fr:"Tielle sétoise",name_en:"Sète Octopus Pie",name_ja:"ティエル・セトワーズ",desc:"タコやイカをスパイシーなトマトソースで煮込み、丸いパイ生地に詰めて焼き上げたセート港発祥の惣菜パイ。"},civet_sanglier:{name_fr:"Civet de sanglier",name_en:"Wild Boar Civet",name_ja:"イノシシの赤ワイン煮込み",desc:"野生のイノシシ肉を赤ワイン、ハーブ、香味野菜で数日間マリネし、その血液を使ってコクを出したソースでじっくり煮込んだコルシカの狩猟料理。"},fiadone:{name_fr:"Fiadone",name_en:"Corsican Cheesecake",name_ja:"フィアドーヌ",desc:"コルシカ特産のホエーチーズ「ブロッチュ」に、卵、砂糖、レモンの皮を加えて焼き上げた、軽やかで素朴な伝統チーズケーキ。"},veau_olives:{name_fr:"Veau aux olives / Civet de veau",name_en:"Corsican Veal with Olives",name_ja:"子牛肉のオリーブ煮込み",desc:"子牛肉をオリーブオイル、ニンニク、ハーブ、トマト、野生のオリーブと共にじっくり煮込んだ、コルシカ島を代表する家庭的な名物料理。"},carbonnade_flamande:{name_fr:"Carbonnade Flamande",name_en:"Flemish Beef Stew",name_ja:"カルボナード・フラマンド",desc:"牛肉をベルギービール、タマネギ、ブラウンシュガー、タイムと共にコトコト煮込み、甘酸っぱく濃厚に仕上げた北フランス・フランドルの定番料理。"},potjevleesch:{name_fr:"Potjevleesch",name_en:"Potjevleesch",name_ja:"ポチェブリーシュ",desc:"鶏肉、うさぎ肉、豚肉、子牛肉などの異なる肉を白ワインとスパイスで煮込み、冷やしてテリーヌ状のゼリー寄せにした北部の伝統冷製料理。"},moules_frites:{name_fr:"Moules-frites",name_en:"Mussels and Fries",name_ja:"ムール・フリット",desc:"白ワイン、シャロット、パセリで蒸し焼きにした山盛りのムール貝（マリニエール）に、サクサクのフライドポテトを添えたベルギー・北フランスの国民食。"},tournedos_rossini:{name_fr:"Tournedos Rossini",name_en:"Tournedos Rossini",name_ja:"トゥルネド・ロッシーニ",desc:"牛ヒレ肉のソテーにフォアグラとトリュフをのせ、濃厚なマデールソースをかけたフランス最高峰の贅沢な肉料理。"},andouillette:{name_fr:"Andouillette",name_en:"Andouillette sausage",name_ja:"アンドゥイエット",desc:"豚の胃や腸などの内臓肉を細切りにして豚の腸に詰めた、独特の強い風味を持つ伝統的なフランスのソーセージ。"},pate_de_campagne:{name_fr:"Pâté de campagne",name_en:"Country pâté",name_ja:"パテ・ド・カンパーニュ",desc:"豚肉、豚レバー、脂身、ハーブなどをミンチにし、テリーヌ型に詰めて湯煎焼きにしたフランスの代表的なオードブル。"},tripes_a_la_mode_de_caen:{name_fr:"Tripes à la mode de Caen",name_en:"Caen-style tripe",name_ja:"トリップ・ア・ラ・モード・ド・カン（カン風牛胃の煮込み）",desc:"牛の4つの胃（特にハチノス）を牛足、野菜、シードル、カルヴァドスと共に土鍋で長時間じっくり煮込んだノルマンディーの伝統料理。"},supreme_de_volaille:{name_fr:"Suprême de volaille",name_en:"Chicken supreme",name_ja:"シュプレーム・ド・ヴォライユ",desc:"骨付きの鶏胸肉（シュプレーム）を優しくソテーし、濃厚な白いクリームソース（ソース・シュプレーム）で仕上げた気品ある一皿。"},fond_de_volaille:{name_fr:"Fond de volaille",name_en:"Chicken stock",name_ja:"フォン・ド・ヴォライユ",desc:"鶏の骨やガラ、香味野菜（ミポワ）を水からコトコト煮込んで濾した、フランス料理の基本的な白いお出汁。"},pate_de_foie_de_volaille:{name_fr:"Pâté de foie de volaille",name_en:"Chicken liver pâté",name_ja:"鶏レバーのパテ",desc:"鶏レバーをバター、エシャロット、ブランデーなどと炒めて滑らかなペースト状にし、冷やし固めた定番の前菜料理。"},salade_landaise:{name_fr:"Salade landaise",name_en:"Landes salad",name_ja:"サラダ・ランデーズ（ランド風サラダ）",desc:"レタスの上に、鴨のコンフィ、砂肝のコンフィ、鴨の燻製胸肉、フォアグラなどをのせた、フランス南西地方ランド県の名物サラダ。"},ttoro_basque:{name_fr:"Ttoro",name_en:"Ttoro (Basque seafood stew)",name_ja:"チョロ（バスク風魚介スープ煮込み）",desc:"コウイカ、アンコウ、メルルーサ、手長エビなどの厳選された魚介をそのまま残し、ピマン・デスペレット（エスペレット唐辛子）を効かせた濃厚なバスクの魚介煮込み。"},axoa_de_veau:{name_fr:"Axoa de Veau",name_en:"Veal Axoa",name_ja:"アショア・ド・ヴォー（子牛肉のバスク風細切れ煮込み）",desc:"細かく刻んだ子牛肉を、ピーマンや玉ねぎ、ピマン・デスペレットと共にラードで穏やかに炒め煮にしたバスク・ラブール地方の伝統肉料理。"},kokotxas_de_merlu_au_pil_pil:{name_fr:"Kokotxas de merlu au pil-pil",name_en:"Hake kokotxas in pil-pil sauce",name_ja:"ココチャ・ド・メルルーサ・オ・ピルピル",desc:"メルルーサの最もゼラチン質が豊富な顎肉（ココチャ）を、ニンニク、ピマン・デスペレット、オリーブオイルと共に土鍋で優しくゆすりながら乳化させたバスク最高峰の伝統料理。"}},Gt={sauter:{name_fr:"Sauter",name_en:"Sauté / Pan-fry",name_ja:"ソテー（炒め焼き）",def:"少量の油を用いて高温かつ短時間で食材を加熱する技法。表面を香ばしく焼き固め、旨味を閉じ込める。",temp:"160°C - 200°C",science:"メイラード反応による香気成分の生成と、急速な熱伝導による表面の結晶化。"},braiser:{name_fr:"Braiser",name_en:"Braise",name_ja:"ブレゼ（蒸し煮）",def:"少量の液体（ブイヨンやワイン）を加え、蓋をして密閉状態で低温かつ長時間加熱する技法。",temp:"85°C - 95°C",science:"湿分を保ちながら熱を加え、硬い結合理構造（コラーゲン）を水溶性のゼラチンへ変化させる。"},pocher:{name_fr:"Pocher",name_en:"Poach",name_ja:"ポシェ（茹でる）",def:"沸騰直前（気泡がわずかに立つ程度）の液体の中で食材を優しく加熱する技法。",temp:"70°C - 85°C",science:"急激なタンパク質凝固による身の縮みや乾燥を防ぎ、水分を保持してしっとり仕上げる。"},confire:{name_fr:"Confire",name_en:"Confit",name_ja:"コンフィ（低温の油脂煮）",def:"食材（主に肉や魚）を低温の油脂の中でゆっくりと時間をかけて加熱する技法。",temp:"75°C - 90°C",science:"水分の蒸発を防ぎつつ、肉内部の結合組織をゼラチン化し、油の浸透による防腐効果を高める。"},griller:{name_fr:"Griller",name_en:"Grill",name_ja:"グリエ（網焼き）",def:"直火または熱した格子（グリッド）の上で食材を直接加熱し、独特の焼き目をつける技法。",temp:"200°C以上",science:"強い放射熱によって短時間で表面に焼き目をつけ、内部の水分を逃がさないようにする。"},rotir:{name_fr:"Rôtir",name_en:"Roast",name_ja:"ロティ（ロースト）",def:"オーブンや串焼き機などの乾いた熱空気中で、油脂をかけながら食材の全体を均一に焼き上げる技法。",temp:"150°C - 220°C",science:"熱対流によって外側を香ばしく焼き上げ、脂肪層をゆっくり溶かしつつ内部へ熱を通す。"},mijoter:{name_fr:"Mijoter",name_en:"Simmer / Stew",name_ja:"ミジョテ（コトコト煮込む）",def:"弱火で液体を軽く波打たせる状態で、長時間じっくり煮込む技法。",temp:"85°C - 95°C",science:"水溶性の旨味成分をゆっくり抽出し、食材全体に味を染み込ませる。"},poeler:{name_fr:"Poêler",name_en:"Pan-sear",name_ja:"ポワレ（フライパン焼き）",def:"フライパンにバターや油をしき、表面に焼き色をつけながら、アロゼ（油をかける）して火を通す技法。",temp:"140°C - 180°C",science:"バターの乳化組織と食材の水分を調整し、ふっくらとしたテクスチャを維持する。"},gratiner:{name_fr:"Gratiner",name_en:"Gratin / Brown",name_ja:"グラチネ（グラタンにする）",def:"表面にチーズやパン粉、ソースを塗り、オーブンの上火で焼き色をつけて香ばしくする技法。",temp:"220°C以上",science:"タンパク質と糖のメイラード反応による膜形成と、脂質の熱酸化香の付与。"},friture:{name_fr:"Friture",name_en:"Deep-fry",name_ja:"フリチュール（揚げる）",def:"高温に熱した多量の油脂の中で食材を加熱する技法。表面を急速に脱水させ、パリッとした食感に仕上げる。",temp:"160°C - 190°C",science:"表面の水分が瞬時に蒸発して水蒸気バリアを作り、油の過度な浸透を防ぎつつ熱を伝える。"},embouter:{name_fr:"Embouter",name_en:"Sausage-filling",name_ja:"アンブテ（腸詰め）",def:"ひき肉や調味料を混ぜたファルス（詰め物）を豚や羊などの腸に詰める技法。ソーセージやアンドゥイエットの基本調理技術。",temp:"常温（加熱前調理）",science:"天然の腸繊維が内部の水分と肉汁を閉じ込め、加熱時に適度な圧力をかけて肉の弾力を生み出す。"},sous_vide:{name_fr:"Sous-vide",name_en:"Vacuum cooking / Sous-vide",name_ja:"真空低温調理",def:"食材と調味料を真空袋に密封し、正確に温度管理された温水中で加熱する技法。",temp:"54°C - 68°C",science:"タンパク質の凝固温度以下で精密に熱を通すことで、水分の損失を抑え極めてしっとりとした質感に仕上げる。"},saler:{name_fr:"Saler",name_en:"Curing / Salting",name_ja:"サレ（塩蔵・塩漬け）",def:"塩を直接まぶす、または塩水に浸けることで食材を脱水・長期保存可能にする技法。生ハムやコンフィの基礎処理。",temp:"冷暗所（加熱前調理）",science:"浸透圧によって食材から余分な水分を抽出し、微生物の繁殖を防ぐと同時に旨味を凝縮させる。"},mijoter:{name_fr:"Mijoter",name_en:"Simmer / Slow cook",name_ja:"ミジョテ（弱火煮込み）",def:"食材を液体の中で沸騰寸前の穏やかな火加減（とろ火）でコトコト煮込む技法。",temp:"85°C - 95°C",science:"タンパク質の急激な凝固を防ぎ、結合理構造を徐々に融解させ、旨味を液体へ優しく溶出させる。"},rotir_sur_braise:{name_fr:"Rôtir sur braise",name_en:"Roast over embers",name_ja:"ロティ・シュール・ブレーズ（炭火ロースト）",def:"薪や炭の直火による遠赤外線効果を利用し、表面を香ばしく焼き固めながら内部をジューシーに仕上げる技法。",temp:"180°C - 240°C",science:"木炭特有の熱輻射と揮発性フェノール化合物による薫香付与、および急激な表面糖化反応。"},emulser_au_pil_pil:{name_fr:"Émulsionner au pil-pil",name_en:"Pil-pil emulsification",name_ja:"ピルピル乳化（バスク式完全乳化）",def:"魚のゼラチン質とオリーブオイルを、熱と土鍋の微振動を利用して一切の乳化剤を使用せず完全乳化させるバスク独自の技法。",temp:"60°C - 70°C",science:"魚皮や顎肉（ココチャ）から溶け出た親水性ゼラチンコラーゲンと、疎水性オリーブオイルが物理的振動により均一なコロイド分散状態を形成する。"}},Wt={sauce_creme:{name_fr:"Sauce crème",name_en:"Cream sauce",name_ja:"クリームソース",desc:"生クリームをベースに、バター、魚または肉のブイヨンを加えてコク深く仕上げたソース。ノルマンディー料理に欠かせない。"},sauce_normande:{name_fr:"Sauce Normande",name_en:"Normandy Sauce",name_ja:"ソース・ノルマンド",desc:"魚のブイヨン（フュメ・ド・ポワソン）に生クリーム、卵黄、バターを合わせ、シードルや牡蠣の煮汁で香りをつけた伝統ソース。"},sauce_vin_rouge:{name_fr:"Sauce au vin rouge",name_en:"Red Wine Sauce",name_ja:"赤ワインソース",desc:"赤ワインをベースに、フォンドボー、シャロット、エシャロット、ハーブを煮詰めてバターで仕上げる、牛肉料理に必須の濃厚ソース。"},rouille:{name_fr:"Rouille",name_en:"Rouille sauce",name_ja:"ルイユ",desc:"オリーブオイル、ニンニク、卵黄、サフラン、カイエンペッパーで作る南仏のピリ辛マヨネーズ状のソース。ブイヤベースに添える。"},vinaigrette:{name_fr:"Vinaigrette",name_en:"Vinaigrette",name_ja:"ヴィネグレット",desc:"サラダ油（またはオリーブオイル）と酢をエマルション（乳化）させ、塩、胡椒、ハーブを混ぜたフレンチドレッシングの基本。"},beurre_blanc:{name_fr:"Beurre blanc",name_en:"White butter sauce",name_ja:"ブール・ブラン（白バターソース）",desc:"エシャロット、白ワイン、白ワイン酢を煮詰め、冷たいバターを少しずつ加えて撹拌・乳化させた、魚料理用の非常に濃厚なソース。"},sauce_bercy:{name_fr:"Sauce Bercy",name_en:"Bercy sauce",name_ja:"ソース・ベルシー",desc:"白ワイン、刻んだエシャロット、魚のダシ（またはフォンドボー）を煮詰め、バターとパセリを加えたクラシックなソース。"},sauce_nantua:{name_fr:"Sauce Nantua",name_en:"Nantua Sauce",name_ja:"ソース・ナンチュア",desc:"エクルヴィス（ザリガニ）の殻から作ったバターと生クリームをベースにした、川魚のクネルなどに使用される赤く芳醇なソース。"},sauce_supreme:{name_fr:"Sauce suprême",name_en:"Supreme sauce",name_ja:"ソース・シュプレーム",desc:"鶏の白いダシ（ヴェルテ）に生クリームを加え、極限まで滑らかに仕上げた最高級の白いソース。"},sauce_biere:{name_fr:"Sauce à la bière",name_en:"Beer sauce",name_ja:"ビールソース",desc:"地元のビールをタマネギやフォンドボーと共に煮詰め、独特のコクとわずかな苦味を加えた北仏の伝統ソース。"},sauce_bearnaise:{name_fr:"Sauce Béarnaise",name_en:"Bernaise sauce",name_ja:"ソース・ベアルネーズ",desc:"澄ましバターと卵黄を温めながら乳化させ、エストラゴン、シャロット、酢の煮詰め汁を加えた、ステーキ用の気品あるソース。"},sauce_madere:{name_fr:"Sauce Madère",name_en:"Madeira Sauce",name_ja:"ソース・マデール",desc:"ポルトガル産のマデイラワインをフォンドボーと合わせて煮詰め、豊かな香りと甘味を与えた古典的な肉料理用ソース。"},sauce_poivre:{name_fr:"Sauce au poivre",name_en:"Pepper sauce",name_ja:"ペッパーソース",desc:"クラッシュした黒胡椒または緑胡椒をバターで炒め、コニャックでフランベし、フォンドボーと生クリームで仕上げたソース。"},sauce_chasseur:{name_fr:"Sauce Chasseur",name_en:"Hunter's sauce",name_ja:"ソース・シャスール（猟師風）",desc:"キノコ、エシャロット、白ワイン、トマト、デミグラスソースを煮込んで仕上げる、ジビエや鶏肉、肉料理に好まれるソース。"},sauce_gribiche:{name_fr:"Sauce Gribiche",name_en:"Gribiche sauce",name_ja:"ソース・グリビッシュ",desc:"固ゆで卵の卵黄をマスタードと油で乳化させ、刻んだ白身、ピクルス、ケッパー、ハーブを混ぜた冷製ソース。頭肉や内臓肉に合わせる。"},sauce_echalote:{name_fr:"Sauce échalote",name_en:"Shallot sauce",name_ja:"エシャロットソース",desc:"刻んだエシャロットを赤ワインや酢でしっかりと煮詰め、フォンドボーとバターを加えて仕上げたステーキソース。"},sauce_moutarde:{name_fr:"Sauce moutarde",name_en:"Mustard sauce",name_ja:"マスタードソース",desc:"白ワイン、生クリーム、フォンドヴォーを合わせたベースに、ディジョンマスタードを加えて風味豊かに仕上げたソース。"},sauce_piquante:{name_fr:"Sauce piquante",name_en:"Piquant sauce",name_ja:"ソース・ピカント",desc:"ブラウンソース（デミグラス）に白ワイン、酢、エシャロット、ピクルス（コルニッション）を加えて酸味と辛味を効かせたソース。"},sauce_charcutiere:{name_fr:"Sauce Charcutière",name_en:"Charcutière sauce",name_ja:"ソース・シャルキュティエール",desc:"デミグラスソースまたはフュメに白ワイン、エシャロット、ピクルス（コルニッション）を加え、豚肉のソテー（ロース肉など）によく合わせる古典的なソース。"},sauce_piperade:{name_fr:"Sauce Piperade",name_en:"Piperade sauce",name_ja:"ソース・ピペラード（バスク風トマトとピーマンのソース）",desc:"トマト、赤・緑ピーマン、玉ねぎをオリーブ油や生ハムの脂でじっくり炒め煮にし、ピマン・デスペレットで仕上げたバスク伝統の甘辛いソース。"},sauce_encre_basque:{name_fr:"Sauce à l'Encre de Seiche à la Basque",name_en:"Basque squid ink sauce",name_ja:"ソース・アンクル・ド・セーシュ・ア・ラ・バスケーズ",desc:"玉ねぎを焦がす直前まで徹底的にローストしてキャラメリゼし、イカスミ、赤ワイン、魚出汁を加えて構築した、小麦粉不使用の滑らかでアミノ酸豊富な漆黒ソース。"},sauce_verte_basque:{name_fr:"Sauce verte basque",name_en:"Basque green sauce",name_ja:"ソース・ヴェルト・バスケーズ（バスク風グリーンエマルジョンソース）",desc:"魚肉から溶け出た濃厚なゼラチン質、パセリの微細粒子、オリーブオイル、ニンニクが高度に乳化した、鮮やかなエメラルドグリーンの伝統エマルジョンソース。"}},Qt={muscle_fibers:{name_fr:"Fibres musculaires",name_en:"Muscle fibers",name_ja:"筋繊維構造",desc:"運動量の多い部位の太い筋繊維は噛みごたえがあり旨味が強い。運動の少ない部位は繊細で柔らかい。"},low_collagen:{name_fr:"Faible collagène",name_en:"Low collagen",name_ja:"低コラーゲン特性",desc:"結合組織が少なく、加熱による筋肉の収縮率が低いため、ステーキなどの短時間調理に向く。"},iron_taste:{name_fr:"Goût de fer (Myoglobine)",name_en:"Iron taste (Myoglobin)",name_ja:"ミオグロビンと鉄分",desc:"血液やミオグロビンが豊富な赤身肉は加熱で鉄分の旨味に変わるが、火を通しすぎるとレバー臭に変化する。"},fat_insulation:{name_fr:"Isolation par le gras",name_en:"Fat insulation",name_ja:"脂肪層の断熱効果",desc:"厚い脂層が熱の急激な侵入を防ぐ断熱材となり、肉内部の水分とジューシーさを保つ。"},collagen_emulsification:{name_fr:"Émulsification du collagène",name_en:"Collagen emulsification",name_ja:"コラーゲンの乳化",desc:"筋間コラーゲンと脂肪が熱で分解・乳化し、ソースそのものに粘度と豊かなコクを与える。"},collagen_gelatinization:{name_fr:"Gélatinisation du collagène",name_en:"Collagen gelatinization",name_ja:"コラーゲンのゼラチン化",desc:"硬い結合組織（コラーゲン）は、70°C以上の水分中で長時間加熱すると、トロトロの可溶性ゼラチンに変化する。"},protein_coagulation:{name_fr:"Coagulation des protéines",name_en:"Protein coagulation",name_ja:"タンパク質の凝固",desc:"タンパク質は55°C付近から凝固を開始し、65°Cを超えると脱水（身縮み）が起きる。緻密な温度管理が必要。"},collagen_breakdown:{name_fr:"Dégradation du collagène",name_en:"Collagen breakdown",name_ja:"コラーゲン分解",desc:"極めて強い立体構造を持つコラーゲンも、酸（ワイン、酢）や長時間煮込みで完全に分解される。"},curing_and_fermentation:{name_fr:"Salage et Fermentation",name_en:"Curing and fermentation",name_ja:"塩蔵・発酵による熟成",desc:"脱水によって浸透圧を上げ、微生物の繁殖を防ぐとともに、酵素分解によりアミノ酸（旨味）を増大させる。"},moisture_loss:{name_fr:"Perte d'humidité",name_en:"Moisture loss",name_ja:"水分の流出（脱水）",desc:"熱によって筋肉が強く収縮すると内部の水分が押し出される。しっとり仕上げるには低温調理が効果的。"},short_cook:{name_fr:"Cuisson courte",name_en:"Short cooking",name_ja:"短時間加熱の鉄則",desc:"筋繊維が細く水分保持力の弱い肉は、短時間の加熱で終わらせ、内部の水分を絶対に逃がさないようにする。"},bone_in_cooking:{name_fr:"Cuisson sur l'os",name_en:"Bone-in cooking",name_ja:"骨付き調理の効果",desc:"骨の周辺にある高濃度のコラーゲンと髄液が熱で溶け出し、肉に深いコクと潤いを与える。"},gelatin_extraction:{name_fr:"Extraction de la gélatine",name_en:"Gelatin extraction",name_ja:"ゼラチン質の抽出",desc:"水の中にコラーゲンの多い部位（手羽、軟骨）を入れてコトコト煮込むことで、スープ（フォン）にとろみを与える。"},fat_rendering:{name_fr:"Fonte des graisses",name_en:"Fat rendering",name_ja:"脂肪の融出",desc:"熱を加えることで脂肪組織から余分な脂を溶かし出し、表面をパリパリにさせながら油切れを良くする。"},crispy_skin:{name_fr:"Peau croustillante",name_en:"Crispy skin creation",name_ja:"クリスピー皮形成",desc:"皮表面の水分を完全に抜いた後、溶けた脂で揚げるようにローストすることで、クリスピーな食感を作る。"},cream_affinity:{name_fr:"Affinité avec la crème",name_en:"Cream affinity",name_ja:"生クリーム親和性",desc:"平滑筋や血管系部位のコラーゲンは、乳脂肪（クリーム）と分子レベルで結合しやすく、味の乗りが良くなる。"},fat_and_lean_interweave:{name_fr:"Entrelacement de gras et maigre",name_en:"Fat and lean interweaving",name_ja:"赤身と脂の編み込み（霜降り）",desc:"赤身と脂が網目状に交差する部位は、加熱時に脂が断熱と保水を行い、焼きすぎても硬くなりにくい。"},emulsification:{name_fr:"Émulsion",name_en:"Emulsification",name_ja:"乳化作用",desc:"水と油という本来混ざり合わない液体が、卵黄やマスタードの乳化剤（レシチン）を仲介して均一に混ざり合う現象。"},balanced_meat:{name_fr:"Viande équilibrée",name_en:"Balanced meat quality",name_ja:"バランスのとれた肉質",desc:"赤身と脂身、結合組織（コラーゲン）の比率が均等で、ステーキから煮込みまで様々な調理法に適応できる万能な肉質特性。"},polymorphism_cocoa_butter:{name_fr:"Polymorphisme du beurre de cacao",name_en:"Polymorphism of cocoa butter",name_ja:"カカオバターの多形性",desc:"カカオバターの冷却調温（テンパリング）により、融点が最もよく光沢のあるV型結晶のみを安定して形成させる物理的技術。"},strecker_degradation:{name_fr:"Dégradation de Strecker",name_en:"Strecker degradation",name_ja:"ストレッカー分解",desc:"メイラード反応の中間体とアミノ酸が反応し、香ばしいコーヒーや熟成肉の特有な香気（ストレッカーアルデヒド）を生成する反応。"}},ct=[{id:"cut_filet",number:"5",type:"regular",name_fr:"Filet de bœuf",name_en:"Tenderloin",name_ja:"ヒレ",points:"55,30 68,30 68,42 55,42",properties:{tenderness:"★★★★★",fat:"★☆☆☆☆",collagen:"★☆☆☆☆"},cooking:"強火ステーキ、ロースト、短時間ソテー",science:"運動量が最も少ない筋肉。結合組織が極少で加熱による硬化が起きにくい。",classification:"Steak cut（高級ステーキ部位）",logic:"High heat / Short cook",chef_note:"火入れの“1分”が品質を決める。"},{id:"cut_rumsteck",number:"2",type:"regular",name_fr:"Rumsteck",name_en:"Rump",name_ja:"ランプ",points:"68,28 78,28 78,42 68,42",properties:{tenderness:"★★★★☆",fat:"★★☆☆☆",collagen:"★★☆☆☆"},cooking:"ステーキ、ロースト",science:"運動はあるが筋繊維が均質で、鉄分と旨味が強い。",classification:"Steak cut / Roast cut",logic:"High heat / Medium cook",chef_note:"「肉汁を噛む」ための部位。"},{id:"cut_aiguillette",number:"4",type:"regular",name_fr:"Aiguillette de rumsteck",name_en:"Sirloin cap (Aiguillette de baronne)",name_ja:"イチボ",points:"72,40 84,40 84,52 72,52",properties:{tenderness:"★★★★☆",fat:"★★★☆☆",collagen:"★★☆☆☆"},cooking:"ロースト、厚切りステーキ",science:"脂層が断熱材として働き、内部の水分保持力が高い。",classification:"Roast cut（塊肉向き）",logic:"Roast / Medium heat",chef_note:"“塊で焼くほど完成度が上がる部位”。"},{id:"cut_palette",number:"8",type:"regular",name_fr:"Dessus de palette",name_en:"Chuck flap",name_ja:"ザブトン",points:"28,26 44,26 44,42 28,42",properties:{tenderness:"★★★★☆",fat:"★★★★★",collagen:"★★★☆☆"},cooking:"煮込み、低温ロースト",science:"脂と筋間コラーゲンが共存。加熱で乳化しソース化する。",classification:"Braise cut（煮込み用）",logic:"Low heat / Long cook",chef_note:"“焼くより溶かす部位”。"},{id:"cut_poitrine",number:"13",type:"regular",name_fr:"Poitrine de bœuf",name_en:"Brisket",name_ja:"ブリスケ",points:"28,45 44,45 44,66 28,66",properties:{tenderness:"★★☆☆☆",fat:"★★★★☆",collagen:"★★★★★"},cooking:"ポトフ、長時間煮込み",science:"支持筋肉構造でコラーゲン密度が高い。低温長時間でゼラチン化。",classification:"Braise cut",logic:"Low heat / Very long cook",chef_note:"“時間が旨味に変わる典型”。"},{id:"cut_langue",number:"1",type:"offal",name_fr:"Langue de bœuf",name_en:"Langue de bœuf",name_ja:"タン",points:"4,30 18,30 18,48 4,48",properties:{tenderness:"★★★☆☆（焼き） / ★★★★★（煮込み）",fat:"★★★☆☆",collagen:"★★★★☆"},cooking:"煮込み、スライスソテー",science:"筋＋結合組織が強く、加熱でゼラチン質化する。",classification:"Abats nobles（高級内臓）",logic:"Long cook",chef_note:"“煮込むほど格が上がる部位”。"},{id:"cut_onglet",number:"9",type:"offal",name_fr:"Onglet",name_en:"Skirt / Hanging tender",name_ja:"ハラミ",points:"48,50 62,50 62,65 48,65",properties:{tenderness:"★★★★☆",fat:"★★★☆☆",collagen:"★★☆☆☆"},cooking:"ステーキ（レア）",science:"横隔膜筋。筋繊維が粗く赤身の旨味が強い。",classification:"Boucher cut（肉屋が好む部位）",logic:"High heat / Very short cook",chef_note:"“焼きすぎると価値が消える”。"},{id:"cut_foie",number:"3",type:"offal",name_fr:"Foie de bœuf",name_en:"Liver",name_ja:"レバー",points:"42,40 56,40 56,52 42,52",properties:{tenderness:"★★★★☆",fat:"★★☆☆☆",collagen:"★☆☆☆☆"},cooking:"ソテー、パテ",science:"実質臓器。加熱でタンパク質凝固が急速に進む。",classification:"Abats",logic:"Medium heat / Very short cook",chef_note:"“数十秒 of 差で別食材”。"},{id:"cut_tripe",number:"10",type:"offal",name_fr:"Tripes",name_en:"Honeycomb tripe",name_ja:"ハチノス",points:"38,54 52,54 52,70 38,70",properties:{tenderness:"★☆☆☆☆ → ★★★★★（煮込み）",fat:"★☆☆☆☆",collagen:"★★★★★"},cooking:"長時間煮込み",science:"蜂 of 巣状コラーゲン構造。酸と時間で分解される。",classification:"Abats traditionnels",logic:"Very long cook",chef_note:"“時間が構造を壊す食材”。"},{id:"cut_boyaux",number:"14",type:"offal",name_fr:"Boyaux",name_en:"Intestine",name_ja:"腸",points:"80,62 94,62 94,78 80,78",properties:{tenderness:"★★☆☆☆",fat:"★★★★☆",collagen:"★★★★☆"},cooking:"ソーセージ, グリル",science:"平滑筋＋脂肪層。発酵・香辛料と相性が良い。",classification:"Charcuterie",logic:"Medium heat / Processed",chef_note:"“単体ではなく構造として使う部位”。"}],dt=[{id:"cut_chicken_breast",number:"4",type:"regular",name_fr:"Blanc de poulet",name_en:"Breast",name_ja:"むね",points:"34,66 46,66 46,82 34,82",properties:{tenderness:"★★☆☆☆",fat:"★☆☆☆☆",collagen:"★☆☆☆☆"},cooking:"ポシェ、ソテー、低温調理",science:"結合組織が少なく、高温で加熱すると水分が抜けやすい。低温でゆっくり火入れするとしっとり仕上がる。",classification:"Suprême de volaille",logic:"Low temperature / Delicate heat",chef_note:"加熱 of 誤差がそのまま品質差になる部位。"},{id:"cut_chicken_tender",number:"6",type:"regular",name_fr:"Aiguillette de poulet",name_en:"Tenderloin",name_ja:"ささみ",points:"38,62 48,62 48,76 38,76",properties:{tenderness:"★★★☆☆",fat:"★☆☆☆☆",collagen:"★☆☆☆☆"},cooking:"ソテー、パン粉焼き、軽いフリット",science:"筋繊維が細く水分保持が弱い。短時間加熱で内部水分を守る必要がある。",classification:"Aiguillettes de poulet panées",logic:"Short cook / Gentle heat",chef_note:"「火を入れる時間」より「火を止める判断」が重要。"},{id:"cut_chicken_thigh",number:"3",type:"regular",name_fr:"Cuisse de poulet",name_en:"Thigh",name_ja:"もも",points:"48,70 62,70 62,86 48,86",properties:{tenderness:"★★★★☆",fat:"★★★☆☆",collagen:"★★★☆☆"},cooking:"ロティ、ブレゼ、煮込み",science:"運動量が多くミオグロビンが豊富。長時間加熱でコラーゲンがゼラチン化し、旨味が増す。",classification:"Coq au vin",logic:"Long cook / Medium heat",chef_note:"火を入れるほど価値が上がる数少ない部位。"},{id:"cut_chicken_shoulder",number:"5",type:"regular",name_fr:"Épaule de poulet",name_en:"Shoulder (Furisode)",name_ja:"ふりそで",points:"36,60 46,60 46,72 36,72",properties:{tenderness:"★★★☆☆",fat:"★★☆☆☆",collagen:"★★☆☆☆"},cooking:"ソテー、軽い煮込み",science:"むねとももの中間的構造。加熱耐性と保水性のバランスが良い。",classification:"Sauté de volaille",logic:"Medium heat / Balanced cook",chef_note:"万能だが「主役より補助」に向く部位。"},{id:"cut_chicken_drumette",number:"2",type:"regular",name_fr:"Pilon de poulet",name_en:"Drumette",name_ja:"手羽もと",points:"44,78 56,78 56,92 44,92",properties:{tenderness:"★★★☆☆",fat:"★★★☆☆",collagen:"★★★★☆"},cooking:"ロティ、オーブン焼き、グリル",science:"骨周辺にコラーゲンが集中。長時間加熱でゼラチン化しジューシーになる。",classification:"Pilons rôtis aux épices",logic:"Medium-high heat / Bone-in cook",chef_note:"骨付き加熱の“旨味の設計図”が最も分かりやすい部位。"},{id:"cut_chicken_wing_joint",number:"1",type:"regular",name_fr:"Aileron de poulet",name_en:"Wing mid joint",name_ja:"手羽なか",points:"42,62 52,62 52,76 42,76",properties:{tenderness:"★★★★☆",fat:"★★★★☆",collagen:"★★★★☆"},cooking:"コンフィ、低温ロースト",science:"皮・脂・コラーゲンの三層構造。低温長時間で完全にゼラチン化する。",classification:"Ailerons confits",logic:"Low heat / Long cook / Confit",chef_note:"「溶ける食感」を作るための部位。"},{id:"cut_chicken_wing",number:"1",type:"regular",name_fr:"Aile de poulet",name_en:"Wing",name_ja:"手羽先",points:"44,64 54,64 54,74 44,74",properties:{tenderness:"★★★☆☆",fat:"★★★★☆",collagen:"★★★★★"},cooking:"ブイヨン、ロースト、揚げ",science:"コラーゲン含有量が極めて高く、加熱でゼラチン化しスープに濃度を与える。",classification:"Bouillon de volaille / Fond",logic:"Simmer / Long cook",chef_note:"フランス料理の“出汁の骨格”になる部位。"},{id:"cut_chicken_skin",number:"8",type:"regular",name_fr:"Peau de poulet",name_en:"Skin",name_ja:"かわ",points:"46,54 56,54 56,66 46,66",properties:{tenderness:"★★★☆☆",fat:"★★★★★",collagen:"★★★★★"},cooking:"ロースト、テュイル、揚げ焼き",science:"加熱により脂が溶け、コラーゲンが乾燥・再構築されクリスピー化する。",classification:"Tuile de peau de poulet",logic:"High heat / Fat render",chef_note:"「脂を抜くと完成する」特殊部位。"},{id:"cut_chicken_heart",number:"12",type:"offal",name_fr:"Cœur de poulet",name_en:"Heart",name_ja:"ハツ",points:"40,74 50,74 50,86 40,86",properties:{tenderness:"★★★☆☆",fat:"★★☆☆☆",collagen:"★★☆☆☆"},cooking:"グリル、串焼き",science:"心筋由来の高密度筋繊維。短時間加熱で弾力を残す。",classification:"Brochettes de cœurs de poulet",logic:"High heat / Quick cook",chef_note:"火を入れすぎると一気に硬化する。"},{id:"cut_chicken_cardiac_base",number:"12",type:"offal",name_fr:"Base de cœur",name_en:"Cardiac base",name_ja:"ハツモト",points:"42,75 52,75 52,85 42,85",properties:{tenderness:"★★★★☆",fat:"★★★☆☆",collagen:"★★★☆☆"},cooking:"フリカッセ、軽い煮込み",science:"血管・弾性繊維構造。クリーム系と相性が良い。",classification:"Fricassée d’abats de volaille",logic:"Medium heat / Gentle simmer",chef_note:"内臓の中でも“ソース適性が高い”部位。"},{id:"cut_chicken_liver",number:"13",type:"offal",name_fr:"Foie de poulet",name_en:"Liver",name_ja:"レバー",points:"38,78 48,78 48,90 38,90",properties:{tenderness:"★★★★☆",fat:"★★☆☆☆",collagen:"★☆☆☆☆"},cooking:"パテ、ソテー、ムース",science:"実質器官で構造が均質。加熱しすぎると急速に水分が抜ける。",classification:"Pâté de foies de volaille",logic:"Medium heat / Short cook",chef_note:"“火入れの1分差”で別食材になる。"},{id:"cut_chicken_gizzard",number:"11",type:"offal",name_fr:"Gésier de poulet",name_en:"Gizzard",name_ja:"砂肝",points:"42,72 52,72 52,82 42,82",properties:{tenderness:"★★☆☆☆",fat:"★☆☆☆☆",collagen:"★☆☆☆☆"},cooking:"コンフィ、煮込み、サラダ",science:"強い筋肉組織。低温長時間で繊維がほぐれる。",classification:"Salade Landaise",logic:"Low heat / Long cook / Confit",chef_note:"“砂肝の噛み応えの設計”を理解する部位。"},{id:"cut_chicken_tail",number:"9",type:"offal",name_fr:"Croupion",name_en:"Tail (Bonjiri)",name_ja:"ボンジリ",points:"50,60 60,60 60,72 50,72",properties:{tenderness:"★★★★★",fat:"★★★★★",collagen:"★★★☆☆"},cooking:"ロースト、グリル",science:"脂肪の集中部位。加熱で純脂の旨味が凝縮する。",classification:"Poulet rôti",logic:"Medium heat / Crisp grill",chef_note:"最も“快楽的な脂”を持つ部位。"},{id:"cut_chicken_cartilage_yagen",number:"14",type:"offal",name_fr:"Cartilage de poulet",name_en:"Cartilage (Yagen)",name_ja:"ヤゲン軟骨",points:"36,78 46,78 46,90 36,90",properties:{tenderness:"★☆☆☆☆",fat:"★☆☆☆☆",collagen:"★★★★★"},cooking:"スープ、フォン",science:"コラーゲンとプロテオグリカンが主体。加熱でゼラチン化しとろみを生む。",classification:"Fonds de volaille",logic:"Simmer / Long extraction",chef_note:"“ソースの粘度を作る素材”。"},{id:"cut_chicken_cartilage_knee",number:"15",type:"offal",name_fr:"Cartilage de poulet",name_en:"Cartilage (Nankotsu)",name_ja:"ひざ軟骨",points:"48,88 58,88 58,98 48,98",properties:{tenderness:"★☆☆☆☆",fat:"★☆☆☆☆",collagen:"★★★★★"},cooking:"スープ、フォン",science:"コラーゲンとプロテオグリカンが主体。加熱でゼラチン化しとろみを生む。",classification:"Fonds de volaille",logic:"Simmer / Long extraction",chef_note:"“ソースの粘度を作る素材”。"}],mt=[{id:"cut_pork_loin",number:"1",type:"regular",name_fr:"Longe de porc",name_en:"Pork Loin",name_ja:"ロース",points:"52,56 64,56 64,72 52,72",properties:{tenderness:"★★★★☆",fat:"★★★☆☆",collagen:"★☆☆☆☆"},cooking:"ロースト、ソテー",science:"背側筋。均質な筋繊維＋脂の蓋で水分保持。",classification:"Roast cut",logic:"High heat / Short roast",chef_note:"“最も安定したステーキ素材”。"},{id:"cut_pork_tenderloin",number:"2",type:"regular",name_fr:"Filet mignon",name_en:"Tenderloin",name_ja:"ヒレ",points:"54,50 66,50 66,62 54,62",properties:{tenderness:"★★★★★",fat:"★☆☆☆☆",collagen:"★☆☆☆☆"},cooking:"ソテー、低温ロースト",science:"大腰筋。運動ゼロに近く筋繊維が極細。",classification:"Premium steak cut",logic:"Very short cook / Precision heat",chef_note:"“過熱した瞬間に価値が落ちる”。"},{id:"cut_pork_shoulder_loin",number:"3",type:"regular",name_fr:"Échine",name_en:"Shoulder loin",name_ja:"かたロース",points:"36,50 48,50 48,66 36,66",properties:{tenderness:"★★★★☆",fat:"★★★★☆",collagen:"★★★☆☆"},cooking:"煮込み、ロースト",science:"脂と赤身の網構造。熱耐性が高い。",classification:"Braise + Roast hybrid",logic:"Medium / Long cook対応",chef_note:"“焼きと煮込みの中間解”。"},{id:"cut_pork_belly",number:"4",type:"regular",name_fr:"Poitrine de porc",name_en:"Belly",name_ja:"ばら",points:"42,72 56,72 56,86 42,86",properties:{tenderness:"★★★★☆",fat:"★★★★★",collagen:"★★★★☆"},cooking:"煮込み、塩漬け、ロースト",science:"層状脂肪構造。塩で水分活性が下がり熟成が進む。",classification:"Charcuterie base cut",logic:"Long cook / Cure / Roast",chef_note:"“加工前提で完成する部位”。"},{id:"cut_pork_ham",number:"5",type:"regular",name_fr:"Jambon",name_en:"Ham leg (Cuissot)",name_ja:"もも",points:"60,60 74,60 74,78 60,78",properties:{tenderness:"★★★☆☆",fat:"★★☆☆☆",collagen:"★★☆☆☆"},cooking:"ハム、ロースト",science:"大筋肉群。塩分浸透と熟成に最適化。",classification:"Charcuterie premium",logic:"Cure / Low temp cook",chef_note:"“豚の価値はここで決まる”。"},{id:"cut_pork_cheek",number:"6",type:"offal",name_fr:"Joue de porc",name_en:"Cheek",name_ja:"頬肉",points:"28,70 40,70 40,84 28,84",properties:{tenderness:"★☆☆☆☆ → ★★★★★",fat:"★★★☆☆",collagen:"★★★★★"},cooking:"コンフィ、煮込み",science:"咀嚼筋。高密度コラーゲンが長時間で崩壊。",classification:"Braise cut (premium offal)",logic:"Very long cook",chef_note:"“ゼラチン化の完成形”。"},{id:"cut_pork_liver",number:"7",type:"offal",name_fr:"Foie de porc",name_en:"Liver",name_ja:"レバー",points:"46,64 58,64 58,76 46,76",properties:{tenderness:"★★★★☆",fat:"★★☆☆☆",collagen:"★☆☆☆☆"},cooking:"テリーヌ、パテ",science:"実質臓器。酸化が早く乳化処理が重要。",classification:"Charcuterie essential",logic:"Low heat / Emulsion",chef_note:"“単体より構造化して使う”。"},{id:"cut_pork_tongue",number:"8",type:"offal",name_fr:"Langue",name_en:"Tongue",name_ja:"タン",points:"22,70 32,70 32,84 22,84",properties:{tenderness:"★★★☆☆ → ★★★★★",fat:"★★★☆☆",collagen:"★★★★☆"},cooking:"煮込み、ゼリー寄せ",science:"筋＋結合組織の複合体。加熱で一体化する。",classification:"Abats nobles",logic:"Long cook / Gel setting",chef_note:"“煮ると一つの構造になる”。"},{id:"cut_pork_trotter",number:"9",type:"offal",name_fr:"Pied de porc",name_en:"Trotter",name_ja:"豚足",points:"38,88 50,88 50,98 38,98",properties:{tenderness:"★☆☆☆☆ → ★★★★★",fat:"★★★☆☆",collagen:"★★★★★"},cooking:"煮込み→焼き",science:"コラーゲン塊。ゼラチン→再加熱でテクスチャー分離。",classification:"Classic peasant cuisine",logic:"Very long cook + roast finish",chef_note:"“二段階変換で完成する部位”。"},{id:"cut_pork_intestine",number:"10",type:"offal",name_fr:"Boyaux",name_en:"Intestine",name_ja:"腸",points:"50,76 64,76 64,88 50,88",properties:{tenderness:"★★☆☆☆",fat:"★★★★☆",collagen:"★★★★☆"},cooking:"ソーセージ、加工",science:"平滑筋＋脂。香辛料と発酵で価値が決まる。",classification:"Charcuterie core material",logic:"Processed / Seasoned",chef_note:"“単体ではなく設計素材”。"}],ut=[{id:"cut_agneau_carre",number:"1",name_fr:"Carré d'agneau",name_en:"Rack of lamb",name_ja:"キャレ・ダニョー（骨付き背肉）",pin:{x:50,y:35},properties:{tenderness:"★★★★☆",fat:"★★★☆☆",collagen:"★★☆☆☆"},cooking:"ロティ（オーブン焼き）、グリル",science:"骨付きの肉は骨周辺からの穏やかな熱伝導により、肉汁の流出が少なく、しっとりとジューシーに仕上がります。",classification:"Rôti cut（ロースト用高級部位）",logic:"Medium-high heat / Bone-in roast",chef_note:"香草パン粉（persillade）をまぶして焼くのがクラシックな調理法。"},{id:"cut_agneau_gigot",number:"2",name_fr:"Gigot d'agneau",name_en:"Leg of lamb",name_ja:"ジゴ・ダニョー（もも肉）",pin:{x:75,y:48},properties:{tenderness:"★★★☆☆",fat:"★★☆☆☆",collagen:"★★★☆☆"},cooking:"丸ごとロースト、長時間ブレゼ（煮込み）",science:"大きな筋肉群であり、赤身の比率が高い。低温で時間をかけて中心まで熱を通すことで均一な仕上がりを目指します。",classification:"Roast cut / Braise cut",logic:"Low & slow roast or Braise",chef_note:"フランスの復活祭（Pâques）に欠かせない、家族で分かち合う伝統のロースト肉。"},{id:"cut_agneau_epaule",number:"3",name_fr:"Épaule d'agneau",name_en:"Lamb shoulder",name_ja:"エポール・ダニョー（肩肉）",pin:{x:28,y:42},properties:{tenderness:"★★★☆☆",fat:"★★★★☆",collagen:"★★★★☆"},cooking:"ナヴァラン（煮込み）、オーブン焼き（ロティ）",science:"コラーゲンと脂肪が豊富に絡み合う部位。熱が通るとゼラチン化し、ソースにとろみとコクを与えます。",classification:"Braise cut",logic:"Low heat / Long simmer",chef_note:"春野菜とラムを煮込む「Navarin d'agneau」の主役。"},{id:"cut_agneau_selle",number:"4",name_fr:"Selle d'agneau",name_en:"Saddle of lamb",name_ja:"セル・ダニョー（鞍下肉・腰肉）",pin:{x:60,y:35},properties:{tenderness:"★★★★★",fat:"★★★☆☆",collagen:"★☆☆☆☆"},cooking:"ロティ（オーブン焼き）",science:"運動量が少なく、キャレ（背肉）に続く非常に柔らかい最高級部位。薄い筋膜を丁寧に下処理（デネルヴェ）することで、とろけるような食感を実現します。",classification:"Rôti cut（最高級ロースト用）",logic:"Dry heat / Careful trimming",chef_note:"骨を外してファルス（詰め物）を巻き込み、タコ糸で縛ってからローストする手法が古典的かつエレガント。"},{id:"cut_agneau_collier",number:"5",name_fr:"Collier d'agneau",name_en:"Lamb neck",name_ja:"コリエ・ダニョー（首肉）",pin:{x:15,y:30},properties:{tenderness:"★★☆☆☆",fat:"★★★☆☆",collagen:"★★★★★"},cooking:"ブレゼ（蒸し煮）、ラグー（煮込み）",science:"よく動かす部位のため筋繊維が太く硬いですが、豊富な結合組織（コラーゲン）を含みます。長時間の湿式加熱によりコラーゲンがゼラチン化し、ソースに濃厚なとろみを与えます。",classification:"Braise cut（煮込み用部位）",logic:"Low & slow moist heat",chef_note:"クスクスや伝統的なナヴァランなど、郷土料理の煮込みに深いコクを与える不可欠な部位。"},{id:"cut_agneau_souris",number:"6",name_fr:"Souris d'agneau",name_en:"Lamb shank",name_ja:"スリ・ダニョー（すね肉）",pin:{x:80,y:70},properties:{tenderness:"★☆☆☆☆",fat:"★★☆☆☆",collagen:"★★★★★"},cooking:"長時間ブレゼ（煮込み）、コンフィ",science:"運動量が最も多い脚の筋肉の下部。コラーゲンとエラスチンが密集しており、低温で長時間加熱することでゼラチン質に変わり、ねっとりとした極上の食感になります。",classification:"Braise cut（煮込み用最高級部位）",logic:"Low & extremely slow moist heat",chef_note:"『スリ（ねずみ）』と呼ばれる独特の涙滴型。骨付きのままニンニクとタイムでトロトロに煮込むのが至高。"},{id:"cut_agneau_poitrine",number:"7",name_fr:"Poitrine d'agneau",name_en:"Lamb breast",name_ja:"ポワトリーヌ・ダニョー（ばら肉・胸肉）",pin:{x:45,y:65},properties:{tenderness:"★★★☆☆",fat:"★★★★★",collagen:"★★★☆☆"},cooking:"ファルスをしてロースト、煮込み",science:"脂肪層と赤身が交互に重なる部位。加熱により大量の脂が溶け出すため、適切な温度管理で脂を落とすか、詰め物をして内部からしっとりさせる必要があります。",classification:"Roast with stuffing / Braise cut",logic:"Fat rendering / Stuffing",chef_note:"骨を外して広げ、ハーブやミンチを巻いて調理する、伝統的なまかないや家庭料理の定番部位。"},{id:"cut_agneau_rognons",number:"8",name_fr:"Rognons d'agneau",name_en:"Lamb kidneys",name_ja:"ロニョン・ダニョー（腎臓）",pin:{x:60,y:45},properties:{tenderness:"★★★★☆",fat:"★☆☆☆☆",collagen:"★☆☆☆☆"},cooking:"ソテー、グリル",science:"内臓肉（アバ）。特有のアンモニア臭を取り除く下処理が必要ですが、仔羊のものは癖が少ない。加熱しすぎると硬くパサつくため、中心はロゼに仕上げます。",classification:"Abats nobles（高級内臓肉）",logic:"Quick sear / Rosé finish",chef_note:"周りの白い脂（シュイフ）を少し残してソテーし、マスタードソース（ア・ラ・ムタルド）で仕上げるのがクラシック。"}],pt=[{id:"cut_veau_ris",number:"1",name_fr:"Ris de veau",name_en:"Sweetbreads",name_ja:"リ・ド・ヴォー（胸腺肉）",pin:{x:30,y:55},properties:{tenderness:"★★★★★",fat:"★★★★☆",collagen:"★★☆☆☆"},cooking:"ポシェ後のムニエル、ブレゼ、ソテー",science:"仔牛の発育期にのみ発達する器官で、極めて柔らかな食感が特徴。エラスチンが少なく保水性に優れています。",classification:"Abats nobles（高級内臓肉）",logic:"Blanch / Press / Sauté crisp",chef_note:"塩水で血抜きをし、軽く茹でて膜を除き、プレスしてから粉をはたいてバターでカリッと焼き上げます。パイ生地に詰めた「ヴォロヴァン（Vol-au-vent）」という料理も有名。"},{id:"cut_veau_filet",number:"2",name_fr:"Filet de veau",name_en:"Veal tenderloin",name_ja:"フィレ・ド・ヴォー（ヒレ）",pin:{x:60,y:38},properties:{tenderness:"★★★★★",fat:"★☆☆☆☆",collagen:"★☆☆☆☆"},cooking:"ソテー、ポワレ、低温ロースト",science:"脂肪が極めて少なく水分が多い淡白な肉質。強火で一気に過加熱するとパサつくため、アロゼ（油を回しかける）で優しく火を入れます。",classification:"Premium steak cut",logic:"Gentle heat / Butter baste",chef_note:"フォンドヴォーにモリーユ茸の香りを乗せた濃厚なソースがベストマッチ。厚切りにした「メダイヨン・ド・ヴォー（Médaillon de veau）」という料理も有名。"},{id:"cut_veau_quasi",number:"3",name_fr:"Quasi de veau",name_en:"Veal rump",name_ja:"カジ・ド・ヴォー（お尻に近いもも肉）",pin:{x:75,y:45},properties:{tenderness:"★★★★☆",fat:"★★☆☆☆",collagen:"★★☆☆☆"},cooking:"ロティ（ロースト）、ポワレ",science:"きめ細やかな赤身肉で、ローストするのに最適な部位。適度に締まった繊維がジューシーな旨味を保持します。",classification:"Roast cut / Premium steak",logic:"Medium heat / Steady roast",chef_note:"ゆっくり塊のままローストし、ロゼ色に仕上げるのがシェフの技術の見せ所。塊のまま焼き上げる「ロティ・ド・ヴォー（Rôti de veau）」という料理も有名。"},{id:"cut_veau_cote",number:"4",name_fr:"Côte de veau",name_en:"Veal chop",name_ja:"コート・ド・ヴォー（骨付き背肉）",pin:{x:50,y:35},properties:{tenderness:"★★★★☆",fat:"★★★☆☆",collagen:"★★☆☆☆"},cooking:"ポワレ、ソテー",science:"骨周辺の旨味と適度な脂が特徴。骨付きのまま加熱することで肉の収縮を防ぎ、しっとりとした仕上がりになります。",classification:"Premium chop",logic:"Bone-in sear / Butter baste",chef_note:"フライパンでアロゼしながら香ばしく焼き、肉汁（ジュ）を活かします。リンゴとシードル、クリームを使った「コート・ド・ヴォー・ノルマンド（Côte de veau normande）」という料理も有名。"},{id:"cut_veau_epaule",number:"5",name_fr:"Épaule de veau",name_en:"Veal shoulder",name_ja:"エポール・ド・ヴォー（肩肉）",pin:{x:28,y:42},properties:{tenderness:"★★★☆☆",fat:"★★☆☆☆",collagen:"★★★★☆"},cooking:"ブレゼ（蒸し煮）、ラグー（煮込み）",science:"よく動かす部位のためやや硬めですが、コラーゲンが豊富。水分と共に静かに煮込むことで、ゼラチン化してとろける食感になります。",classification:"Braise cut（煮込み用部位）",logic:"Low & slow moist heat",chef_note:"肉の色を白く保つため、焼き色をつけずにブイヨンで煮てクリームで仕上げる「ブランケット・ド・ヴォー（Blanquette de veau）」という料理も有名。"},{id:"cut_veau_jarret",number:"6",name_fr:"Jarret de veau",name_en:"Veal shank",name_ja:"ジャレ・ド・ヴォー（すね肉）",pin:{x:80,y:70},properties:{tenderness:"★★☆☆☆",fat:"★☆☆☆☆",collagen:"★★★★★"},cooking:"長時間ブレゼ（煮込み）",science:"筋繊維が太く結合組織の塊ですが、骨髄（モワル）を含んで輪切りにされます。長時間の加熱により骨髄が溶け出し、ソースに強烈なコクを与えます。",classification:"Braise cut / Bone marrow cut",logic:"Long braise / Marrow extraction",chef_note:"骨の髄から出る旨味がソースに深みを与えます。元はミラノ料理ですがフランスでも愛される「オッソ・ブーコ（Osso buco）」という料理も有名。"},{id:"cut_veau_tete",number:"7",name_fr:"Tête de veau",name_en:"Calf's head",name_ja:"テート・ド・ヴォー（頭肉）",pin:{x:10,y:25},properties:{tenderness:"★★★☆☆",fat:"★★★★☆",collagen:"★★★★★"},cooking:"ブイヨンでの長時間ボイル",science:"肉というよりほぼゼラチン質の皮と軟骨。白く茹で上げるために小麦粉とレモン汁を加えた「ブラン（Blanc）」と呼ばれる液体で長時間煮込みます。",classification:"Abats（伝統的内臓肉）",logic:"Blanc poaching / Gelatin softening",chef_note:"ねっとりとしたゼラチン質に、酸味のあるマスタードベースのソースを合わせます。「テート・ド・ヴォー・ソース・グリビッシュ（Tête de veau sauce gribiche）」という料理も有名。"}],gt=[{id:"cut_magret_de_canard",number:"1",name_fr:"Magret de canard",name_en:"Duck breast (Fattened)",name_ja:"マグレ・ド・カナール（肥育鴨の胸肉）",pin:{x:45,y:48},properties:{tenderness:"★★★★☆",fat:"★★★★★",collagen:"★★☆☆☆"},cooking:"皮目からじっくりポワレ、ロティ",science:"フォアグラ用に肥育された鴨の胸肉。非常に厚い皮下脂肪を熱で溶かし（レンダリング）、その脂をかけながらロゼ（ミディアムレア）に仕上げます。",classification:"Volaille de prestige（高級家禽）",logic:"Fat rendering / Medium-rare finish",chef_note:"皮目に格子状の切れ込みを入れ、冷たいフライパンから焼き始めることで効率よく脂を抜きます。甘酸っぱいソースを合わせた「マグレ・ド・カナール・オランジュ（Magret de canard à l'orange）」という料理も有名。"},{id:"cut_confit_de_canard",number:"2",name_fr:"Cuisse de canard",name_en:"Duck leg",name_ja:"キュイス・ド・カナール（もも肉）",pin:{x:68,y:65},properties:{tenderness:"★★★★★",fat:"★★★★☆",collagen:"★★★★☆"},cooking:"コンフィ（低温の脂で煮込む）、焼き上げ",science:"筋繊維と結合組織が強いもも肉。鴨自身の脂の中で80〜90°Cで数時間煮ることで、コラーゲンが完全にゼラチン化し、保存性と極上の柔らかさを得ます。",classification:"Plat classique du Sud-Ouest（南西地方の定番）",logic:"Low heat fat-poach / Crisp skin to finish",chef_note:"仕上げにオーブンやフライパンで皮目をパリパリに焼き上げます。白インゲン豆やソーセージと共にオーブンで焼き上げる「カスレ（Cassoulet）」という料理も有名。"},{id:"cut_foie_gras_canard",number:"3",name_fr:"Foie gras de canard",name_en:"Duck foie gras",name_ja:"フォアグラ・ド・カナール（鴨フォアグラ）",pin:{x:38,y:55},properties:{tenderness:"★★★★★",fat:"★★★★★",collagen:"☆☆☆☆☆"},cooking:"テリーヌ、ポワレ（ソテー）",science:"ほぼ100%が脂肪組織。急激な高温加熱で一気に脂が液化して流れ出すため、冷たい状態から表面を強火で短時間で焼き固め、中心は余熱で温めます。",classification:"Mets de fête（祝祭の高級食材）",logic:"Flash sear / Keep chilled before cooking",chef_note:"バルサミコや甘口ワイン、イチジクの甘味と完璧に調和します。牛ヒレ肉に乗せてトリュフソースをかける「トゥルヌド・ロッシーニ（Tournedos Rossini）」という料理も有名。"},{id:"cut_aiguillette_canard",number:"4",name_fr:"Aiguillette de canard",name_en:"Duck tenderloin",name_ja:"エギュイエット・ド・カナール（ささみ）",pin:{x:44,y:52},properties:{tenderness:"★★★★★",fat:"★☆☆☆☆",collagen:"★☆☆☆☆"},cooking:"短時間のソテー、グリル",science:"胸肉（マグレ）の内側にある細長い筋肉（小胸筋）。脂肪が全くなく、火を通しすぎると一瞬でパサパサになるため、数秒から数十秒の極めて短い加熱が要求されます。",classification:"Quick cook tender",logic:"High heat / Flash cooking",chef_note:"強火で表面の色が変わる程度にサッと焼き上げます。グリーンペッパーとクリームで仕上げる「エギュイエット・ド・カナールのポワヴル・ヴェール風味（Aiguillettes de canard au poivre vert）」という料理も有名。"},{id:"cut_gesier_canard",number:"5",name_fr:"Gésier de canard",name_en:"Duck gizzard",name_ja:"ジェジエ・ド・カナール（砂肝）",pin:{x:35,y:58},properties:{tenderness:"★★★☆☆",fat:"★★☆☆☆",collagen:"★★★★★"},cooking:"コンフィ",science:"食べたものをすりつぶすための強靭な筋肉器官。そのままでは非常に硬いですが、鴨の脂で長時間コンフィにすることで、独特のコリコリ感と柔らかさが同居する食感になります。",classification:"Abats / Confit ingredient",logic:"Long confit processing",chef_note:"コンフィにしたものをスライスし、温かいまま提供します。フォアグラやクルミと共に葉野菜に乗せる南西地方の名物「サラダ・ランデーズ（Salade landaise）」という料理も有名。"}],ft=[{id:"cut_gibier_chevreuil_filet",number:"1",name_fr:"Filet de chevreuil",name_en:"Venison loin (Roe deer)",name_ja:"フィレ・ド・シュヴルイユ（鹿ロース）",dish_fr:"Noisettes de chevreuil sauce Grand Veneur (鹿フィレ肉のメダイヨン グラン・ヴヌールソース)",origin:"フランス全土（宮廷料理から発展、特にソローニュ地方など狩猟地）",global_dish:"イギリスの「Venison Wellington（鹿肉のウェリントン）」の他、中国料理ではネギや生姜と強火で炒める「炒鹿肉」（Chǎo lù ròu / チャオ ルー ロウ）として高級食材として扱われます。",pin:{x:55,y:38},properties:{tenderness:"★★★★☆",fat:"★☆☆☆☆",collagen:"★★★☆☆"},cooking:"ロティ、ポワレ",science:"野生の鹿は脂肪がほとんどない高タンパク赤身肉。加熱しすぎると肉質が引き締まり強固に硬化するため、芯温54°C前後のロゼを狙います。",classification:"Gibier de poil (毛のある野生獣肉)",logic:"Delicate roast / Rare to Medium-rare",chef_note:"黒コショウを効かせた赤ワインソース（Poivrade）や、野生の果実（ブルーベリーなど）の酸味を添えます。"},{id:"cut_gibier_chevreuil_selle",number:"2",name_fr:"Selle de chevreuil",name_en:"Saddle of venison",name_ja:"セル・ド・シュヴルイユ（鹿サドル・背肉）",dish_fr:"Selle de chevreuil rôtie aux airelles (鹿背肉のロティ コケモモ添え)",origin:"フランス・アルザス地方など、森林地帯",global_dish:"ドイツやオーストリアでは「Rehrücken（鹿の背肉ロースト）」として、サワークリームやベリーを用いたソースで伝統的に食べられています。",pin:{x:60,y:35},properties:{tenderness:"★★★★★",fat:"★☆☆☆☆",collagen:"★★☆☆☆"},cooking:"骨付きでのロティ、オーブン焼き",science:"フィレに隣接する背肉で、鹿肉の中で最も柔らかく高貴な部位。骨付きのまま焼くことで骨からの旨味が肉に浸透し、乾燥を防ぎます。",classification:"Gibier de poil",logic:"Bone-in roast / High heat to rest",chef_note:"切り分ける際のプレゼンテーションが非常に美しい部位。火入れは極めて慎重に行う必要があります。"},{id:"cut_gibier_chevreuil_gigue",number:"3",name_fr:"Gigue de chevreuil",name_en:"Haunch of venison (Leg)",name_ja:"ジグ・ド・シュヴルイユ（鹿もも・お尻）",dish_fr:"Civet de chevreuil (鹿肉のシヴェ)",origin:"フランス全土の山間部、伝統的な狩猟文化を持つ地域",global_dish:"中東地域ではスパイスでマリネした鹿肉の串焼きやロースト「لَحْمُ الْغَزَالِ الْمَشْوِيُّ」（Laḥmu al-ghazāli al-mashwiyyu / ラフム・ル＝ガザーリ・ル＝マシュウィー）として親しまれることがあります。",pin:{x:75,y:50},properties:{tenderness:"★★★☆☆",fat:"★☆☆☆☆",collagen:"★★★★☆"},cooking:"シヴェ（赤ワイン煮込み）、長時間ロティ",science:"結合組織が多く、筋肉質な部位。酸味のある赤ワインやスパイスをブレンドした液でマリネし、繊維を軟化させてから煮込みます。",classification:"Gibier de poil",logic:"Acid marination / Low & slow braise",chef_note:"丸ごと焼き上げてクラシックな大皿料理にするか、細かく切ってポトフ風に煮込みます。"},{id:"cut_gibier_chevreuil_epaule",number:"4",name_fr:"Épaule de chevreuil",name_en:"Venison shoulder",name_ja:"エポール・ド・シュヴルイユ（鹿肩肉）",dish_fr:"Ragoût de chevreuil (鹿肉のラグー)",origin:"フランスの農村部",global_dish:"アメリカでは「Venison Chili（鹿肉のチリコンカン）」として、中国料理では醤油や八角で柔らかく煮込む「紅燒鹿肉」（Hóng shāo lù ròu / ホン シャオ ルー ロウ）として調理されます。",pin:{x:30,y:45},properties:{tenderness:"★★☆☆☆",fat:"★★☆☆☆",collagen:"★★★★★"},cooking:"煮込み、ブレゼ、挽き肉（ファルス用）",science:"非常によく動かす部位のため硬く、筋膜が多いのが特徴。しかしコラーゲンが豊富なため、低温でじっくり煮込むことでゼラチン質に変わり、とろける食感になります。",classification:"Gibier de poil",logic:"Slow braise / Stewing",chef_note:"テリーヌやパテを作る際のひき肉ベースとしても非常に優秀な部位です。"}],ht=[{id:"cut_gibier_sanglier_filet",number:"1",name_fr:"Filet de sanglier",name_en:"Wild boar loin",name_ja:"フィレ・ド・サングリエ（猪ロース）",dish_fr:"Filet de sanglier sauce poivrade (猪フィレ肉のポワブラードソース)",origin:"フランス全土",global_dish:"中国料理では、特有の臭みを消すためにネギと生姜で強火炒めにする「蔥爆野豬肉」（Cōng bào yě zhū ròu / ツォン バオ イエ ジュー ロウ）として広く知られています。",pin:{x:52,y:38},properties:{tenderness:"★★★★☆",fat:"★★☆☆☆",collagen:"★★★☆☆"},cooking:"ロティ、ソテー",science:"飼育豚に比べ、野生の猪肉は筋肉が引き締まり鉄分が豊富。脂質が少ない分、肉汁を閉じ込める焼き方が求められます。",classification:"Gibier de poil",logic:"Medium heat / Steady roast",chef_note:"豚肉に近い感覚で扱えますが、しっかり中まで熱を入れつつ（寄生虫リスク排除のため）、ジューシーさを残す火入れが必要です。"},{id:"cut_gibier_sanglier_carre",number:"2",name_fr:"Carré de sanglier",name_en:"Wild boar rack",name_ja:"キャレ・ド・サングリエ（猪背肉・骨付きロース）",dish_fr:"Carré de sanglier rôti aux pommes (骨付き猪ロースのロースト リンゴ添え)",origin:"フランス北部〜中部",global_dish:"イタリアでは「Cinghiale arrosto（猪のロースト）」としてローズマリーやニンニクと共に豪快に焼かれます。",pin:{x:45,y:35},properties:{tenderness:"★★★★☆",fat:"★★★☆☆",collagen:"★★★☆☆"},cooking:"オーブンでのロースト",science:"骨つきのまま加熱することで、骨髄液の旨味が肉組織に染み込み、風味豊かに仕上がります。脂身の甘さが際立つ部位です。",classification:"Gibier de poil",logic:"Bone-in roasting / Fat rendering",chef_note:"ローストした後に骨に沿って切り分け、果実味のあるソース（チェリーやリンゴ）と合わせると絶品です。"},{id:"cut_gibier_sanglier_epaule",number:"3",name_fr:"Épaule de sanglier",name_en:"Wild boar shoulder",name_ja:"エポール・ド・サングリエ（猪肩・首肉）",dish_fr:"Civet de sanglier (猪のシヴェ)",origin:"フランス山間部、プロヴァンス地方など",global_dish:"イタリア・トスカーナ地方の名物パスタ「Pappardelle al ragù di cinghiale（猪肉のラグー・パッパルデッレ）」のソースに最適とされています。",pin:{x:28,y:42},properties:{tenderness:"★★☆☆☆ → ★★★★★",fat:"★★★☆☆",collagen:"★★★★★"},cooking:"シヴェ・ド・サングリエ（赤ワインと血の煮込み）",science:"咀嚼や運動でよく使われる部位。コラーゲンが極めて多く、長時間の煮込みで溶け出し、赤ワインと肉の血（またはカカオ）で煮汁を乳化させ重厚なとろみをつけます。",classification:"Gibier classique de braisage",logic:"Very long cook / Red wine stew",chef_note:"冬のジビエの王道。濃厚なソースには栗（marron）のピューレが最も合います。"},{id:"cut_gibier_sanglier_gigot",number:"4",name_fr:"Gigot de sanglier",name_en:"Wild boar leg",name_ja:"ジゴ・ド・サングリエ（猪もも肉）",dish_fr:"Cuissot de sanglier à la broche (猪もも肉の丸焼き・串焼き)",origin:"フランス中南部、コルシカ島",global_dish:"スペインでは「Pierna de jabalí asada（猪もも肉のオーブン焼き）」として、中国料理では香辛料をまぶして焼く「烤野豬腿」（Kǎo yě zhū tuǐ / カオ イエ ジュー トゥイ）として提供されます。",pin:{x:70,y:50},properties:{tenderness:"★★★☆☆",fat:"★★☆☆☆",collagen:"★★★★☆"},cooking:"長時間のロースト、煮込み、ハム加工",science:"大きな筋肉の塊で赤身が多く、そのまま焼くとパサつきやすい。ラルドン（豚脂）を差し込む（ピケする）か、長時間マリネしてから焼き上げます。",classification:"Gibier de poil",logic:"Larding / Slow roasting",chef_note:"コルシカ島などでは、この部位を使って絶品の猪生ハムやサラミ（シャルキュトリ）が作られます。"},{id:"cut_gibier_sanglier_poitrine",number:"5",name_fr:"Poitrine de sanglier",name_en:"Wild boar belly",name_ja:"ポワトリーヌ・ド・サングリエ（猪バラ肉）",dish_fr:"Poitrine de sanglier confite (猪バラ肉のコンフィ)",origin:"フランス全土",global_dish:"イタリアでは塩漬け・熟成させて「Pancetta di cinghiale（猪肉のパンチェッタ）」にし、パスタや前菜に使用されます。",pin:{x:50,y:55},properties:{tenderness:"★★★☆☆",fat:"★★★★★",collagen:"★★★★☆"},cooking:"コンフィ、ブレゼ、塩漬け熟成",science:"脂肪と赤身が層になっており、野生ならではの脂の甘みと旨味が凝縮されています。低温の油で煮る（コンフィ）ことで脂を適度に落としつつ柔らかくします。",classification:"Gibier de poil",logic:"Confit / Curing",chef_note:"煮込み料理にコクを足すためのベーコン代わりにしたり、カリッと焼き上げてメインの付け合わせにしたりと万能です。"}],yt=[{id:"cut_gibier_pigeon_supreme",number:"1",name_fr:"Suprême de pigeon",name_en:"Pigeon breast",name_ja:"シュプレーム・ド・ピジョン（鳩胸肉）",dish_fr:"Suprême de pigeon rôti aux figues (鳩胸肉のロティ イチジク添え)",origin:"フランス全土",global_dish:"エジプト料理で鳩に米や小麦を詰めて焼いた「حَمَامٌ مَحْشِيٌّ」（Ḥamāmun maḥshiyyun / ハマームン・マフシーユン）、中国料理では皮を香ばしく揚げる「脆皮乳鴿」（Cuì pí rǔ gē / ツゥイ ピー ルー ゴー）として有名です。",pin:{x:45,y:42},properties:{tenderness:"★★★★☆",fat:"★☆☆☆☆",collagen:"★★☆☆☆"},cooking:"ポワレ、ロティ（ロゼ仕立て）",science:"鳩の胸筋は鉄分（ミオグロビン）の塊。加熱しすぎるとレバーのような血生臭さとボソボソ感が出るため、芯温52〜54°Cのロゼに仕上げます。",classification:"Gibier de plume (羽のある野生鳥獣)",logic:"Flash sear / Precise rare cooking",chef_note:"皮をパリッと香ばしく焼き、中は均一なロゼ（Rosé）を保つのが職人の仕事。"},{id:"cut_gibier_pigeon_cuisse",number:"2",name_fr:"Cuisse de pigeon",name_en:"Pigeon leg",name_ja:"キュイス・ド・ピジョン（鳩もも肉）",dish_fr:"Cuisse de pigeon confite (鳩もも肉のコンフィ)",origin:"フランス南西部",global_dish:"モロッコ料理の甘塩っぱいパイ包み焼き「بَسْطِيلَةٌ」（Basṭīlatun / バスティラトゥン）の伝統的な具材として使われます（現在は鶏肉での代用も多いです）。",pin:{x:65,y:55},properties:{tenderness:"★★★☆☆",fat:"★★☆☆☆",collagen:"★★★☆☆"},cooking:"コンフィ、グリル",science:"極めて小さく薄いもも肉。胸肉に比べて結合組織が多いため、低温の油でコンフィにするか、しっかり焼いて皮目をクリスピーにします。",classification:"Gibier de plume",logic:"Confit or Crisp grill",chef_note:"胸肉の横に可愛らしく添えられることが多い。小さいながらも旨味は非常に濃い部位です。"},{id:"cut_gibier_pigeon_aile",number:"3",name_fr:"Aile de pigeon",name_en:"Pigeon wing",name_ja:"エール・ド・ピジョン（鳩手羽）",dish_fr:"Ailerons de pigeon caramélisés (鳩手羽のキャラメリゼ)",origin:"フランス全土",global_dish:"中国料理の宴席などで、醤油ベースの甘辛いタレで煮込まれる「紅燒鴿翅」（Hóng shāo gē chì / ホン シャオ ゴー チー）として提供されます。",pin:{x:35,y:35},properties:{tenderness:"★★★☆☆",fat:"★★☆☆☆",collagen:"★★★★☆"},cooking:"煮込み、キャラメリゼ、出汁とり",science:"骨周りのゼラチン質と旨味が詰まっていますが、肉量は少ない部位です。高温で香ばしく焼き上げるか、ソースのベースとして重宝されます。",classification:"Gibier de plume",logic:"Braising / Stock extraction",chef_note:"メインディッシュとして単体で出されることは少なく、アミューズや副菜として骨から外れるほど柔らかく煮込まれることが多いです。"},{id:"cut_gibier_pigeon_carcasse",number:"4",name_fr:"Carcasse de pigeon",name_en:"Pigeon carcass (bones)",name_ja:"カルカス・ド・ピジョン（鳩ガラ）",dish_fr:"Jus de pigeon / Salmis (鳩のジュ／サルミソース)",origin:"フランスのクラシック料理全般",global_dish:"中国料理の滋養強壮スープ「鴿子湯」（Gē zi tāng / ゴー ズ タン）のベースとして、薬膳食材と共にじっくり煮込まれます。",pin:{x:50,y:45},properties:{tenderness:"☆☆☆☆☆",fat:"★☆☆☆☆",collagen:"★★★★★"},cooking:"フォン（出汁）、ソース抽出",science:"骨からは芳醇な香りと強いゼラチン質が出ます。オーブンでローストして香ばしさを引き出してから香味野菜と煮出すことで、重厚なソースのベースになります。",classification:"Gibier de plume",logic:"Roast and Simmer",chef_note:"内臓（レバーや心臓）と共にすり潰してソースのリエゾン（とろみ付け）に使う「サルミ仕立て」は、古典フランス料理の真骨頂です。"}],bt=[{id:"cut_gibier_lievre_rable",number:"1",name_fr:"Râble de lièvre",name_en:"Saddle of hare",name_ja:"ラーブル・ド・リエーヴル（野うさぎの背肉）",dish_fr:"Râble de lièvre rôti (野うさぎ背肉のロースト)",origin:"フランス全土（ソローニュ地方など）",global_dish:"イギリスの「Roast Saddle of Hare（野うさぎ背肉のロースト）」。赤身肉の強い風味に負けないよう、レッドカラント（赤すぐり）のゼリーを添えます。",pin:{x:50,y:40},properties:{tenderness:"★★★★☆",fat:"★☆☆☆☆",collagen:"★★★☆☆"},cooking:"ロティ、ソテー、ソース・ポワブラード",science:"家ウサギ（Lapin）に比べて野ウサギ（Lièvre）は肉質が赤黒く、野性味が極めて強い。背肉は一番柔らかい中心部位です。",classification:"Gibier de poil",logic:"Short cook / Roast medium",chef_note:"骨付きのままローストし、火入れ後に切り分けます。火を通しすぎると鉄っぽさが強調されるため注意が必要です。"},{id:"cut_gibier_lievre_filet",number:"2",name_fr:"Filet de lièvre",name_en:"Hare loin / Fillet",name_ja:"フィレ・ド・リエーヴル（野うさぎフィレ）",dish_fr:"Filet de lièvre poêlé (野うさぎフィレ肉のポワレ)",origin:"フランス全土",global_dish:"ドイツでは「Hasenfilet（野うさぎのフィレ）」として、秋から冬の狩猟シーズンにシュペッツレ（伝統的な卵麺）と共に供されます。",pin:{x:55,y:38},properties:{tenderness:"★★★★★",fat:"★☆☆☆☆",collagen:"★★☆☆☆"},cooking:"ポワレ、ソテー",science:"背肉（ラーブル）の内側に付随する最も繊細で柔らかい部位。脂質が極端に少ないため、ベーコンや豚の網脂で巻く（クレピーヌ包み）ことでパサつきを防ぎます。",classification:"Gibier de poil",logic:"Barding / Flash pan-fry",chef_note:"非常に小さく貴重な部位。トリュフやフォアグラと合わせるような、洗練された一皿に向いています。"},{id:"cut_gibier_lievre_cuissot",number:"3",name_fr:"Cuissot de lièvre",name_en:"Hare leg",name_ja:"キュイッソ・ド・リエーヴル（野うさぎもも肉）",dish_fr:"Civet de lièvre (野うさぎのシヴェ)",origin:"フランス山間部、伝統的ジビエ料理",global_dish:"ギリシャ料理で、小玉ねぎとトマト、赤ワイン、シナモンで煮込む「Λαγός στιφάδο (Lagos stifado / ラゴス・スティファド)」が有名です。",pin:{x:75,y:50},properties:{tenderness:"★★☆☆☆",fat:"★☆☆☆☆",collagen:"★★★★★"},cooking:"シヴェ（赤ワインと血の煮込み）、煮込み",science:"運動量が多く非常に硬いが、筋肉の旨味が濃い部位。赤ワインと野うさぎ自身の血で煮込むことで、強いコラーゲンがゼラチン化し、濃厚でとろける食感となります。",classification:"Gibier de poil",logic:"Blood emulsification / Slow braise",chef_note:"古典料理「シヴェ」の代表格。ソースの仕上げに血を加えることで、独特の深いコクと黒光りする艶が生まれます。"},{id:"cut_gibier_lievre_epaule",number:"4",name_fr:"Épaule de lièvre",name_en:"Hare shoulder",name_ja:"エポール・ド・リエーヴル（野うさぎ肩肉）",dish_fr:"Lièvre à la Royale (ウサギのロワイヤル / ファルスとして)",origin:"フランス・ペリゴール地方、ポワトゥー地方",global_dish:"イタリア料理のパスタソース「Ragù di lepre（野うさぎのラグー）」として、肉がほぐれるまで煮込んで幅広パスタのパッパルデッレと合わせます。",pin:{x:30,y:45},properties:{tenderness:"★★☆☆☆",fat:"★☆☆☆☆",collagen:"★★★★☆"},cooking:"煮込み、ファルス（詰め物）、ラグー",science:"筋張っておりそのまま焼くには硬いため、ひき肉にしてパテやテリーヌのベースにするか、長時間の煮込み料理に用います。",classification:"Gibier de poil",logic:"Minced / Slow cooking",chef_note:"伝説の宮廷料理「Lièvre à la Royale」では、骨を抜いた肉にフォアグラやトリュフ、肩肉などのファルスを詰め、一昼夜かけて煮込みます。"}],_t=[{id:"cut_kokotxa_de_merlu",number:"1",name_fr:"Kokotxa de merlu",name_en:"Hake Kokotxa (jaw meat)",name_ja:"ココチャ（メルルーサの顎肉）",pin:{x:25,y:52},properties:{tenderness:"★★★★★",fat:"★★☆☆☆",collagen:"★★★★★"},cooking:"ピルピル乳化（Pil-pil）、ポシェ",science:"魚の頭部下にある最も動かす筋肉かつゼラチンの宝庫。熱を加えることで豊富な天然コラーゲンが容易に溶け出し、油と水分を結合させます。",classification:"Spécialité basque (バスク特産高級部位)",logic:"Low heat / Emulsification",chef_note:"オリーブ油の中で弱火で揺すり、魚から出たゼラチンだけで完全に乳化させて白い極上ソースを作ります。"},{id:"cut_fish_fillet",number:"2",name_fr:"Filet de poisson",name_en:"Fish Fillet",name_ja:"フィレ（魚の切り身）",pin:{x:55,y:48},properties:{tenderness:"★★★★☆",fat:"★☆☆☆☆",collagen:"★☆☆☆☆"},cooking:"ソテー、ポワレ、蒸し（Vapeur）",science:"赤身および白身の筋肉繊維。陸上動物に比べて結合組織（コラーゲン）が非常に少ないため、短時間の精密な加熱が必須です。火が通り過ぎると一瞬でボソボソになります。",classification:"Poisson de fond (底生魚・白身)",logic:"Short cook / High-precision heat",chef_note:"皮目はクッキングペーパーでしっかりと水分を除き、フライパンに押し当てるようにしてパリパリに、身はしっとりと仕上げます。"},{id:"cut_fish_sole",number:"3",name_fr:"Sole",name_en:"Dover Sole",name_ja:"ソール（舌平目）",pin:{x:45,y:40},properties:{tenderness:"★★★★☆",fat:"★☆☆☆☆",collagen:"★★☆☆☆"},cooking:"ムニエル（Meunière）、ソール・ノルマンド",science:"ヒラメ類特有の引き締まった細かな繊維質。上品なゼラチン質を含み、クラシックなムニエルにすると小麦粉がバターを吸って最高のテクスチャーになります。",classification:"Poisson plat (平らな魚の代表)",logic:"Butter pan-fry (Meunière)",chef_note:"皮を剥ぎ、バター（Beurre noisette）をスプーンで何度も身にかけながら香ばしく焼き上げます。"},{id:"cut_fish_turbot",number:"4",name_fr:"Turbot",name_en:"Turbot",name_ja:"テュルボ（イシビラメ）",pin:{x:68,y:42},properties:{tenderness:"★★★★★",fat:"★★☆☆☆",collagen:"★★★☆☆"},cooking:"ポシェ、オーブン焼き（Rôti）、白ワインソース",science:"白身魚の王様。骨の周囲に極上のコラーゲンを含み、骨付きのまま調理（ポシェやロティ）することで、崩れやすい白身をしっとり保護し旨味を凝集させます。",classification:"Poisson plat de prestige",logic:"Poach or Bone-in roast",chef_note:"ソース・アルベール（ソース・シュプレームにマスタード等を加えたもの）やシャンパンソースが相性抜群。"}],vt=[{id:"cut_crustace_homard",number:"1",name_fr:"Homard bleu",name_en:"Blue lobster",name_ja:"オマール・ブルー（ロブスター）",pin:{x:50,y:55},properties:{tenderness:"★★★★☆",fat:"★☆☆☆☆",collagen:"★★☆☆☆"},cooking:"ポシェ、ロティ、ソース・アメリケーヌ",science:"甲殻類特有の太い筋繊維。加熱温度が70°Cを超えるとタンパク質が急激に収縮してゴム状の食感になるため、殻付きで焼くか、優しくポシェします。殻に含まれるアスタキサンチンは脂溶性で、ソース・アメリケーヌの鮮やかな赤と香りを引き出します。",classification:"Crustacé noble",logic:"Shell-on cooking / Gentle poach",chef_note:"「Homard à l'Américaine（オマールのアメリカ風）」は殻やミソを余すことなく煮出してソースを作る宮廷料理。"},{id:"cut_crustace_langoustine",number:"2",name_fr:"Langoustine",name_en:"Scampi / Dublin Bay prawn",name_ja:"ラングスティーヌ（赤座海老）",pin:{x:35,y:58},properties:{tenderness:"★★★★★",fat:"★☆☆☆☆",collagen:"★☆☆☆☆"},cooking:"ソテー、ポシェ、フリット",science:"オマールよりさらにデリケートで水分量が多い身。加熱時間は数秒〜1分程度にとどめ、中心部に生っぽさ（半透明の状態）を残すことで究極の甘みと滑らかさを表現します。",classification:"Crustacé délicat",logic:"Flash sear / Keep translucent",chef_note:"冷たいバターでアロゼしながらソテーすると、海老の甘みが引き立ちます。"}],xt=[{id:"cut_coquillage_huitre",number:"1",name_fr:"Huître",name_en:"Oyster",name_ja:"ユイットル（生牡蠣、グラタン）",pin:{x:45,y:65},properties:{tenderness:"★★★★★",fat:"★☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"生食（Cru）、サバイヨンソースのグラタン",science:"生のままだとグリコーゲンの甘みと海水塩分を楽しめます。温める場合は、サバイヨンソースをかけてオーブン上火で一瞬グラタンにし、タンパク質が硬化する前に取り出します。",classification:"Coquillages par excellence",logic:"Raw or Flash-gratinated",chef_note:"シャロットを細かく刻んだヴィネグレット（Mignonette）ソースとライ麦パンを添えるのが伝統。"},{id:"cut_coquillage_saint_jacques",number:"2",name_fr:"Coquille Saint-Jacques",name_en:"Sea scallop",name_ja:"コキーユ・サンジャック（ホタテ貝柱）",pin:{x:55,y:62},properties:{tenderness:"★★★★★",fat:"★☆☆☆☆",collagen:"★☆☆☆☆"},cooking:"両面を強火で短時間ポワレ、タルタル",science:"貝柱は速筋繊維（ほぼ純粋なタンパク質）。熱を加えるとすぐに縮んで水分が絞り出されてしまうため、片面を強火で数十秒キャラメリゼし、裏は一瞬当てる程度で中は人肌のロゼにします。",classification:"Coquillage haut de gamme",logic:"High-heat sear / Translucent center",chef_note:"バターの焦がし具合と塩のあて方がすべて。コーラル（卵巣）はムースやソースのベースに使います。"}],kt=[{id:"cut_mollusque_calamar",number:"1",name_fr:"Calamar / Encornet",name_en:"Squid",name_ja:"カラマール / アンコルネ（イカ）",pin:{x:50,y:72},properties:{tenderness:"★★★☆☆",fat:"★☆☆☆☆",collagen:"★★★★☆"},cooking:"ソテー、ファルシ（詰め物）、イカ墨煮込み",science:"イカやタコの外套膜はコラーゲンが格子状に高密度で走っています。加熱時間は「数秒の超短時間」か「数時間の長時間」の二者択一。中間だとタンパク質が完全に収縮しゴムのように硬くなります。",classification:"Céphalopode",logic:"Flash cook (Sauté) or Very long braise",chef_note:"表面に細かく包丁を入れて熱による丸まりを防ぎ、強火でサッと炒めてレモンとオリーブ油で合わせます。"}],wt=[{id:"type_frais",number:"1",name_fr:"Fromage frais",name_en:"Fresh Cheese",name_ja:"フレッシュタイプ（非熟成チーズ）",method:"乳酸菌による酸凝固（レンネットの使用は極少量かゼロ）。凝固したカードからホエイ（乳清）を軽く切り、熟成させずに出荷する。",science:"pHがカゼインの等電点（約4.6）に達することでタンパク質が凝集する。熟成工程がないためタンパク質や脂肪の分解が進んでおらず、高水分で乳酸由来の爽やかな酸味がそのまま残る。",examples:"モッツァレッラ（伊）、リコッタ（伊）、クワルク（独）、パニール（印）、ラブネ（中東）",chef_note:"水分が多く熱に弱いため、ソースに溶かし込むか、そのまま冷製の前菜やデザートに使用するのが基本。鮮度が命。"},{id:"type_croute_fleurie",number:"2",name_fr:"Pâte molle à croûte fleurie",name_en:"Bloomy Rind",name_ja:"白カビタイプ（軟質・白カビ外皮）",method:"カードを型に入れ自然に脱水し、表面にペニシリウム・カマンベルティ（Penicillium camemberti）を噴霧して数週間熟成させる。",science:"白カビが分泌する「プロテアーゼ（タンパク質分解酵素）」が、外側から中心に向かってカゼインをアミノ酸やペプチドに分解（プロテオリシス）する。同時に表面の乳酸が消費されてpHが中性に近づき、不溶性のリン酸カルシウムが溶け出すため、生地がトロトロに軟化する。",examples:"カマンベール（仏）、ブリー・ド・モー（仏）、カンボゾーラ（独・ハイブリッド）",chef_note:"熟成が進むとアンモニア臭が出始めるため、中心部に少し芯（チョーク状）が残る程度〜全体が滑らかになった瞬間が食べ頃。"},{id:"type_croute_lavee",number:"3",name_fr:"Pâte molle à croûte lavée",name_en:"Washed Rind",name_ja:"ウォッシュタイプ（軟質・洗皮外皮）",method:"熟成中に表面を塩水や地元の酒（ワイン、ビール、ブランデーなど）で定期的に洗い、リネンス菌を繁殖させる。",science:"塩分と高湿度を好むリネンス菌（Brevibacterium linens）の働きにより、表面に強い赤〜オレンジ色の粘着層が形成され、強力なタンパク質分解酵素を放出する。独特の腐敗臭に似た強烈な香りが生まれるが、中の生地は非常にクリーミーでマイルド。",examples:"エポワス（仏）、マロワール（仏）、タレッジョ（伊）",chef_note:"香りの強烈さに反して味は非常にミルキー。フルボディの赤ワインと抜群の相性を誇る。"},{id:"type_persillee",number:"4",name_fr:"Pâte persillée",name_en:"Blue Cheese",name_ja:"青カビタイプ（ブルーチーズ）",method:"凝固したカードに青カビ（Penicillium roqueforti）の胞子を混ぜ、金串で穴を開けて内部に酸素を送り込みながら熟成させる。",science:"青カビは生育に酸素を必要とするため、金串の空気孔に沿って内側へ繁殖する。青カビ由来の強力な脂肪分解酵素（リパーゼ）により、トリグリセリドがメチルケトン類などの揮発性有機酸に分解され、独特の刺激的な風味と辛味が生じる。",examples:"ロックフォール（仏）、ゴルゴンゾーラ（伊）、スティルトン（英）",chef_note:"塩分と刺激が強いため、貴腐ワインやポートワイン、ハチミツなどの「甘味」と合わせることで味覚の完璧なバランスが取れる。"},{id:"type_pressee_cuite",number:"5",name_fr:"Pâte pressée cuite",name_en:"Hard Cheese",name_ja:"加熱圧搾タイプ（硬質）",method:"カードを細かく砕き、50〜55℃ of 高温で加熱しながら撹拌して水分を極限まで抜く。その後、型に入れて強い圧力をかけ、数ヶ月〜数年単位で長期熟成させる。",science:"加熱によりホエイ（乳清）が排出され、耐熱性の乳酸菌（サーモフィルス菌など）のみが生き残る。低水分環境での長期熟成により、カゼインがアミノ酸に完全に分解され「チロシンの結晶（ジャリッとした旨味成分）」が生成される。エメンタール等のガス孔はプロピオン酸発酵によるもの。",examples:"コンテ（仏）、パルミジャーノ・レッジャーノ（伊）、グリュイエール（スイス）",chef_note:"アミノ酸の塊であり、料理のベースとなる最高の調味料。熱を加えると分離せずに綺麗に溶けるためグラタン等に最適。"},{id:"type_pressee_non_cuite",number:"6",name_fr:"Pâte pressée non cuite",name_en:"Semi-Hard Cheese",name_ja:"非加熱圧搾タイプ（半硬質）",method:"カードを加熱せず（または30℃台の微温）に圧力をかけて水分を抜く。加熱圧搾よりも水分が多く残るため、熟成期間は比較的短い（数週間〜数ヶ月）。",science:"中温性（メソフィル）の乳酸菌が主体となる。水分（とそれに溶け込む乳糖・乳酸）と脂肪分のバランスが良く、タンパク質の網目構造が柔軟なため、熱を加えた際に脂肪が分離しにくく、滑らかなメルティング特性を示す。",examples:"カンタル（仏）、ルブロション（仏）、チェダー（英）、ラクレット（スイス）",chef_note:"日常食として最も消費されるタイプ。サンドイッチに挟んだり、オーブン焼きにして溶かして食べる用途に優れる。"},{id:"type_filee",number:"7",name_fr:"Pâte filée",name_en:"Stretched Curd",name_ja:"パスタ・フィラータ／伸展タイプ（繊維状チーズ）",method:"酸凝固させたカードに熱湯（80〜90℃）を注ぎ、餅のように練って引っ張りながら繊維状に組織を整える（フィラトゥーラ工程）。",science:"pHが5.2前後まで下がると、カゼインミセルからカルシウムが部分的に抜け出し構造が緩む。そこに熱が加わることで乳脂肪が溶け、機械的に引っ張ることでタンパク質（カゼイン）が同じ方向に平行に並ぶ。これが独特の「裂けるような弾力」と加熱時の「伸び」の科学的根拠。",examples:"モッツァレッラ、カチョカヴァッロ、ブッラータ（伊）、オアハカ（メキシコ）",chef_note:"ピッツァに乗せて焼いた時に見事な糸を引くのは、このタンパク質の平行配列のおかげである。"},{id:"lait_chevre",number:"8",name_fr:"Fromage de chèvre",name_en:"Goat's Milk",name_ja:"山羊乳チーズ（シェーブル）",method:"山羊乳を使用。主に酸凝固ベースで作られ、表面に木炭粉（灰）をまぶす製法も多い。",science:"山羊乳はカロテンを含まないため真っ白。カプロン酸、カプリル酸、カプリン酸（いずれもヤギ＝Capraが語源）などの「中鎖脂肪酸」を多く含み、これがシェーブル特有の野性的で酸味のある風味をもたらす。脂肪球が小さく、均質化されているため消化に良い。",examples:"サント・モール、クロタン・ド・シャヴィニョル（仏）",chef_note:"春から夏にかけて牧草を食べた山羊の乳で作るものが最も美味しい（旬があるチーズ）。"},{id:"lait_brebis",number:"9",name_fr:"Fromage de brebis",name_en:"Sheep's Milk",name_ja:"羊乳チーズ",method:"羊乳を使用. 水分を抜いて硬質にするか、青カビを繁殖させるものが多い。",science:"羊乳は牛乳の約2倍のタンパク質と脂肪を含む極めてリッチな組成。固有のラクトン類（環状エステル）が含まれており、これが羊乳特有のナッツのような甘さと深いコクを生む。固形分が多いため、長期熟成に耐える強靭な組織を作ることができる。",examples:"ロックフォール、オッソー・イラティ（仏）、ペコリーノ全般（伊）",chef_note:"牛乳製チーズよりもコクが強いため、料理に力強さや塩気を足したい時のアクセントとして使う。"},{id:"lait_bufflonne",number:"10",name_fr:"Fromage de bufflonne",name_en:"Buffalo's Milk",name_ja:"水牛乳チーズ",method:"水牛（ブーファラ）の乳を使用。大半がフレッシュなパスタ・フィラータとして加工される。",science:"乳脂肪分が8%前後（牛乳の約2.5倍）と極めて高く、タンパク質も豊富。カロテンを持たないため純白。高温で練るパスタ・フィラータ製法によって強固なタンパク質の膜を作り、その中に大量の脂肪とホエイを閉じ込めることで、噛むとジュワッとミルクが溢れる構造になる。",examples:"モッツァレッラ・ディ・ブーファラ・カンパーナ（伊）",chef_note:"極上の濃厚な生クリームのような風味。加熱するよりも、常温でオリーブオイルと合わせて食べるのが一番。"},{id:"prod_fermier",number:"11",name_fr:"Fromage fermier",name_en:"Farmhouse Cheese",name_ja:"農家製チーズ",method:"酪農家が自ら喜び搾乳した乳（主に無殺菌の生乳）を使用し、自らの農場内の工房で手作りするチーズ。",science:"パスチャライズ（加熱殺菌）を行わないため、その土地の牧草や風土に由来する固有 of 土着菌叢（マイクロフローラ / Terroir）が乳にそのまま残る。熟成過程で多種多様な酵素が複雑に絡み合い、工業製では再現不可能な奥深いアロマと複雑な風味のレイヤーを生み出すが、季節やロットによるブレも大きい。",examples:"AOP/DOP認定の厳格な伝統チーズ、ファームハウス・チェダー（英）",chef_note:"「生きているチーズ」。保存状態によって味が劇的に変化するため、チーズ熟成士（アフィヌール）の腕が問われる。"},{id:"prod_industriel",number:"12",name_fr:"Fromage industriel",name_en:"Industrial Cheese",name_ja:"工業製チーズ（工場製）",method:"複数の酪農家から集乳した大量の乳を加熱殺菌し、工場で機械的に大量生産するチーズ。",science:"加熱殺菌（63℃30分や72℃15秒など）により天然の微生物を一度リセットし、特定の商業用スターター（乳酸菌培養液）を添加して発酵をコントロールする。特定のカビや酵素だけを働かせるため、年間を通して品質・味・安全性が完全に均一に保たれるが、香気成分の複雑さは農家製に劣る。",examples:"La Vache qui rit（仏）、クラフト社のチーズ、一般的なプロセスチーズ",chef_note:"品質が極めて安定しており溶けやすさなども計算されているため、ハンバーガーやスープなどのレシピの標準化に不可欠。"}],Ge=[{id:"ing_gruyere",number:"1",name_local:"Gruyère",name_en:"Gruyère",name_ja:"グリュイエール",region:"Switzerland",pin:{x:50,y:50},properties:{tenderness:"★★☆☆☆",fat:"★★★☆☆",collagen:"☆☆☆☆☆"},cooking:"チーズフォンデュ、クロックムッシュ、グラナタ（オニオンスープ）、グラタン",science:"スイスを代表する加熱圧搾硬質チーズ。熟成によりタンパク質が高度に分解され、非常にマイルドでナッツのような豊かな香りと甘みが生まれる。融点が低く、加熱すると綺麗に均一に溶ける性質（メルティング特性）を持つ。",classification:"Pâte pressée cuite（加熱圧搾硬質タイプ）",logic:"AOC Protected / Excellent melting properties",chef_note:"グラタンやラクレット、フォンデュなど温かいチーズ料理には欠かせないベース。味に上品な深みを与える。"},{id:"ing_cheddar",number:"2",name_local:"Cheddar",name_en:"Cheddar",name_ja:"チェダー",region:"United Kingdom",pin:{x:45,y:45},properties:{tenderness:"★★★☆☆",fat:"★★★★☆",collagen:"☆☆☆☆☆"},cooking:"バーガー、マカロニアンドチーズ、サンドイッチ、そのまま",science:"「チェダリング」と呼ばれる、カードを積み重ねて酸度（乳酸）を上げ、水分を押し出す特殊な工程を踏む。これにより引き締まった崩れやすい組織になり、長期間熟成することでシャープで非常に濃厚な旨味が生じる。",classification:"Pâte pressée non cuite（非加熱圧搾半硬質）",logic:"Traditional Cheddaring process",chef_note:"世界で最も生産されているチーズ。熟成が若いものはマイルドで溶けやすく、熟成物（ヴィンテージ）は濃厚でおつまみに最高。"},{id:"ing_stilton",number:"3",name_local:"Stilton",name_en:"Blue Stilton",name_ja:"スティルトン",region:"United Kingdom",pin:{x:48,y:42},properties:{tenderness:"★★★★☆",fat:"★★★★☆",collagen:"☆☆☆☆☆"},cooking:"そのまま、ステーキソース、サラダ（ブルーチーズドレッシング）、ポートワインと共に",science:"イギリスを代表する青カビチーズ。水分を多めに残した組織の隙間に青カビが入り込み、脂肪分解を進めることで、ナッツのような濃厚な甘みと、青カビ特有の金属的でスパイシーな風味のコントラストが生まれる。",classification:"Pâte persillée（青カビタイプ）",logic:"PDO Protected / English blue classic",chef_note:"世界三大ブルーチーズの一つ。ポートワイン（ポルトガルの甘口赤ワイン）との組み合わせは英国紳士の伝統的な夜のデザート。"},{id:"ing_gouda",number:"4",name_local:"Gouda",name_en:"Gouda",name_ja:"ゴーダ",region:"Netherlands",pin:{x:52,y:40},properties:{tenderness:"★★★☆☆",fat:"★★★☆☆",collagen:"☆☆☆☆☆"},cooking:"スライスしてサンドイッチ、溶かしてグリル料理に、オムレツ",science:"カードを温水で「洗う」ことで余分な乳糖（ラクトース）を洗い流し、乳酸発酵による酸度の上昇を穏やかに抑える（マイルドな甘口になる理由）。熟成が進むとアミノ酸の結晶が表れ、コク深くなる。",classification:"Pâte pressée non cuite（非加熱圧搾半硬質）",logic:"Curd washing to lower acidity",chef_note:"マイルドで日本人の口に最も合うとされる。若いものはモチモチしてスライスしやすく、熟成物はからすみのような深いコクが出る。"},{id:"ing_edam",number:"5",name_local:"Edam",name_en:"Edam",name_ja:"エダム",region:"Netherlands",pin:{x:51,y:38},properties:{tenderness:"★★☆☆☆",fat:"★★☆☆☆",collagen:"☆☆☆☆☆"},cooking:"粉末にして粉チーズとしてパスタやグラタンに、そのままオードブル",science:"脱脂乳の一部を使用して作られる逆さのワックスコート（輸出用）が特徴のチーズ。脂肪分が低いため組織は引き締まって硬めで、マイルドで穏やかな酸味と塩味を持つ。水分が少なく保存性に優れる。",classification:"Pâte pressée non cuite（非加熱圧搾硬質・低脂肪）",logic:"Partially skimmed milk",chef_note:"日本では「赤玉」として知られる。脂肪が少ないためあっさりしており、すりおろしてオーブンで焼くと非常に香ばしくなる。"},{id:"ing_feta",number:"6",name_local:"Feta",name_en:"Feta",name_ja:"フェタ",region:"Greece",pin:{x:65,y:60},properties:{tenderness:"★★★★★",fat:"★★★☆☆",collagen:"☆☆☆☆☆"},cooking:"ギリシャ風サラダ（ホリアティキ）、グリル、オムレツ",science:"羊乳（および少量の山羊乳）で作られる、塩水（ブライン）に漬けて熟成・保存されるホワイトチーズ。塩水に漬けることで細菌の繁殖を防ぎ、長期の常温保存に耐えるが、同時に非常に強い塩気と爽やかな酸味を呈する。",classification:"Fromage en saumure（塩水漬けフレッシュ）",logic:"PDO Protected / Brined preservation",chef_note:"塩気が強いため、水やミルクで少し塩抜きをしてからサラダに使うと、羊乳の優しい甘みとさっぱりした酸味が際立つ。"},{id:"ing_manchego",number:"7",name_local:"Manchego",name_en:"Manchego",name_ja:"マンチェゴ",region:"Spain",pin:{x:38,y:68},properties:{tenderness:"★★☆☆☆",fat:"★★★★☆",collagen:"☆☆☆☆☆"},cooking:"そのまま薄切りにしてオリーブオイルやメンブリージョ（かりんジャム）と共に",science:"ラ・マンチャ地方のマンチェガ種羊の生乳を使用。草の跡を模した網目模様の外皮を持つ。羊乳のリッチな脂肪分が長期熟成により独特のナッツやバターの香りと、ピリッとした複雑な後味をもたらす。",classification:"Formaggio di pecora stagionato（硬質羊乳タイプ）",logic:"DOP Protected / Manchega sheep milk",chef_note:"スペインで最も有名なチーズ。スペイン産の生ハムやドライイチジク、そして地元の辛口シェリー酒や赤ワインと抜群の相性。"},{id:"ing_cabrales",number:"8",name_local:"Cabrales",name_en:"Cabrales",name_ja:"カブラレス",region:"Spain",pin:{x:36,y:65},properties:{tenderness:"★★★★☆",fat:"★★★★★",collagen:"☆☆☆☆☆"},cooking:"そのまま（少しずつ）、ステーキのソース、シドラ（リンゴ酒）と共に",science:"アストゥリアス地方の自然の石灰岩洞窟（高湿度で低温）で熟成される青カビチーズ。牛乳、羊乳、山羊乳をブレンドして作られ、外からカビを植え付けるのではなく、洞窟内に浮遊する天然の青カビが自然に繁殖するため、強烈に野生的な風味を持つ。",classification:"Pâte persillée naturelle（天然青カビ混乳タイプ）",logic:"DOP Protected / Cave aged natural blue",chef_note:"世界で最も強烈とされるブルーチーズの一つ。刺激が非常に強いが、地元の酸味の強いリンゴ酒（シドラ）と合わせると不思議に調和する。"},{id:"ing_oaxaca",number:"9",name_local:"Queso Oaxaca",name_en:"Oaxaca Cheese",name_ja:"オアハカ",region:"Mexico",pin:{x:20,y:80},properties:{tenderness:"★★★★★",fat:"★★★☆☆",collagen:"☆☆☆☆☆"},cooking:"ケサディーヤ、タコス、そのまま（裂いて）",science:"イタリアのパスタ・フィラータ（モッツァレッラなど）と同様の製法を、スペインの宣教師がメキシコに伝えて発展したもの。熱湯で練り伸ばしたカードをリボンのように長く引き伸ばし、それを球状に巻き上げて成形する。加熱すると非常に良く伸びる。",classification:"Pâte filée（パスタ・フィラータタイプ）",logic:"Stretched curd ribbon",chef_note:"「メキシコのさけるチーズ」。繊維に沿って細かく裂き、トルティーヤに挟んで溶かして食べる「ケサディーヤ」はメキシコの国民食。"},{id:"ing_monterey_jack",number:"10",name_local:"Monterey Jack",name_en:"Monterey Jack",name_ja:"モントレー・ジャック",region:"United States",pin:{x:22,y:75},properties:{tenderness:"★★★★☆",fat:"★★★☆☆",collagen:"☆☆☆☆☆"},cooking:"サンドイッチ、バーガー、タコス、チリソース料理に溶かす",science:"カリフォルニア州モントレーの修道院で作られ始めたアメリカ発祥のセミソフトチーズ。マイルドで酸味が少なく、非常に融点が低いため加熱すると脂肪が分離せずに滑らかに溶ける優れた特性を持つ。",classification:"Semi-hard cheese（アメリカン・セミソフト）",logic:"High moisture / Mild acidity / Great meltability",chef_note:"クセがなく誰にでも愛される味。チェダーやコルビーチーズとブレンドして、メキシコ料理（テクス・メクス）によく溶かして使われる。"},{id:"ing_parmigiano_reggiano",number:"11",name_it:"Parmigiano Reggiano",name_en:"Parmigiano Reggiano",name_ja:"パルミジャーノ・レッジャーノ",region:"Italy (Emilia-Romagna)",pin:{x:48,y:35},properties:{tenderness:"★★☆☆☆",fat:"★★★☆☆",collagen:"☆☆☆☆☆"},cooking:"すりおろしてパスタやリゾットに、そのままおつまみとして",science:"最低12ヶ月、長ければ36ヶ月以上熟成。水分が抜ける過程でカゼインが分解され、旨味成分のアミノ酸であるチロシンが結晶化し、ジャリジャリとした食感と深いコクを生む。",classification:"Formaggio a pasta dura（硬質タイプ）",logic:"DOP Protected / Long aged",chef_note:"「イタリアチーズの王様」。すりおろすだけでなく、皮の部分（クロスタ）もスープに入れて煮込むと良い出汁が出る。"},{id:"ing_gorgonzola",number:"12",name_it:"Gorgonzola",name_en:"Gorgonzola",name_ja:"ゴルゴンゾーラ",region:"Italy (Lombardia / Piemonte)",pin:{x:40,y:30},properties:{tenderness:"★★★★☆",fat:"★★★★☆",collagen:"☆☆☆☆☆"},cooking:"パスタソース（ペンネ・ゴルゴンゾーラ）、サラダのトッピング、ハチミツ添え",science:"青カビ（Penicillium roqueforti）を繁殖させたチーズ。脂肪分解酵素の働きにより、特有のシャープな辛味と刺激臭が生まれ、クリーミーな生地と合わさる。マイルドなドルチェと辛口のピカンテがある。",classification:"Formaggio a pasta erborinata（青カビタイプ）",logic:"DOP Protected / Blue cheese",chef_note:"塩気とコクが強いため、貴腐ワインやポートワインなどの極甘口ワイン、あるいはハチミツ、洋梨と合わせると完璧な調和を見せる。"},{id:"ing_taleggio",number:"13",name_it:"Taleggio",name_en:"Taleggio",name_ja:"タレッジョ",region:"Italy (Lombardia)",pin:{x:42,y:28},properties:{tenderness:"★★★★☆",fat:"★★★☆☆",collagen:"☆☆☆☆☆"},cooking:"そのまま、リゾットやパスタに溶かす、ブルスケッタ",science:"塩水で表面を洗いながら熟成させるウォッシュタイプ。リネンス菌の作用により外皮はオレンジ色で強い香気を放つが、内部はモチモチとしてミルクの甘みが強く非常に食べやすい。",classification:"Formaggio a crosta lavata（ウォッシュタイプ）",logic:"DOP Protected / Washed rind",chef_note:"表皮の匂いは強いが、中は非常にマイルドでクリーミー。加熱すると非常によく溶けるため料理のコク出しに重宝する。"},{id:"ing_quartirolo_lombardo",number:"14",name_it:"Quartirolo Lombardo",name_en:"Quartirolo Lombardo",name_ja:"クアルティローロ・ロンバルド",region:"Italy (Lombardia)",pin:{x:41,y:29},properties:{tenderness:"★★★★☆",fat:"★★★☆☆",collagen:"☆☆☆☆☆"},cooking:"サラダ、パスタの仕上げ、そのままトマトとオリーブオイルで",science:"秋の最後の若草（Quartirola）を食べた牛の乳で作る。短期間熟成のものは酸味がありホロホロとした食感で爽やか。熟成が進むとしなやかでコクが強くなる。",classification:"Formaggio a pasta molle（半硬質〜軟質）",logic:"DOP Protected / Autumn milk",chef_note:"フェタチーズに少し似たさっぱりとした酸味がある。夏場に冷たいトマトやサラダと合わせるのが現地風。"},{id:"ing_bitto",number:"15",name_it:"Bitto",name_en:"Bitto",name_ja:"ビット",region:"Italy (Lombardia)",pin:{x:43,y:25},properties:{tenderness:"★★☆☆☆",fat:"★★★★☆",collagen:"☆☆☆☆☆"},cooking:"そのまま、そば粉のパスタ（ピッツォッケリ）に溶かす",science:"夏のアルプス高地で搾乳された新鮮な牛乳に、少量の山羊乳（10%以下）を混入して作られる。山羊乳由来の中鎖脂肪酸が加わることで、長期熟成（最長10年）に耐える複雑でスパイシーな風味が生じる。",classification:"Formaggio a pasta dura（硬質タイプ）",logic:"DOP Protected / Alpine pasture summer milk",chef_note:"ロンバルディア州のそば粉のパスタ「ピッツォッケリ」にキャベツやじゃがいもと合わせて溶かすのが伝統的な郷土料理。"},{id:"ing_castelmagno",number:"16",name_it:"Castelmagno",name_en:"Castelmagno",name_ja:"カステルマーニョ",region:"Italy (Piemonte)",pin:{x:30,y:30},properties:{tenderness:"★★☆☆☆",fat:"★★★★☆",collagen:"☆☆☆☆☆"},cooking:"リゾット、パスタソース、ハチミツをかけてそのまま",science:"凝固させたカードを細かく砕き、塩を混ぜてプレスする特殊製法。内部に自然な青カビ（エルボリナトゥーラ）が発生し、非常にホロホロとした崩れやすい組織と、ピリッとした複雑な旨味が生まれる。",classification:"Formaggio a pasta erborinata o friabile（青カビ・崩壊性タイプ）",logic:"DOP Protected / Double pressed card",chef_note:"非常に希少な高級チーズ。ピエモンテのジャガイモのニョッキに、このチーズを溶かした濃厚なソースを合わせるのが定番。"},{id:"ing_bra",number:"17",name_it:"Bra",name_en:"Bra",name_ja:"ブラ",region:"Italy (Piemonte)",pin:{x:32,y:32},properties:{tenderness:"★★★☆☆",fat:"★★★☆☆",collagen:"☆☆☆☆☆"},cooking:"そのまま、サラダ、削ってパスタに",science:"全乳で作るソフトタイプ（Tenero）と、脱脂乳を混ぜて長期熟成させるハードタイプ（Duro）がある。ハードタイプは引き占められた組織で、塩気とナッツのような香ばしさが凝縮されている。",classification:"Formaggio a pasta semidura o dura（半硬質〜硬質）",logic:"DOP Protected / Soft or Hard styles",chef_note:"ピエモンテ州ブラの町の名を冠する。地元のバルベーラやネッビオーロといった赤ワインと非常によく合う。"},{id:"ing_raschera",number:"18",name_it:"Raschera",name_en:"Raschera",name_ja:"ラスケーラ",region:"Italy (Piemonte)",pin:{x:31,y:34},properties:{tenderness:"★★★☆☆",fat:"★★★☆☆",collagen:"☆☆☆☆☆"},cooking:"そのまま、溶かして野菜のソースに、郷土パスタ（フィオリーニ）",science:"正方形の平たい形が特徴（山岳地帯での馬の背に乗せて運ぶための伝統的な形状）。しなやかで細かい気泡があり、山の牧草由来のハーブや土のニュアンスを含んだマイルドな旨味を持つ。",classification:"Formaggio a pasta semidura（半硬質タイプ）",logic:"DOP Protected / Square shaped",chef_note:"丸型と角型があるが、角型（Quadrata）が運搬の歴史を象徴する伝統の形。マイルドな塩味で非常にとろけやすい。"},{id:"ing_toma_piemontese",number:"19",name_it:"Toma Piemontese",name_en:"Toma Piemontese",name_ja:"トーマ・ピエモンテーゼ",region:"Italy (Piemonte)",pin:{x:33,y:28},properties:{tenderness:"★★★☆☆",fat:"★★★☆☆",collagen:"☆☆☆☆☆"},cooking:"そのまま、フォンデュータ（チーズフォンデュ）、ポレンタに溶かす",science:"ピエモンテのアルプス全域で作られる伝統のチーズ。乳酸発酵による程よい酸味とバターのようなコクがあり、熟成が進むとヘーゼルナッツのようなアロマが引き立つ。",classification:"Formaggio a pasta semidura（半硬質タイプ）",logic:"DOP Protected / Alpine pasture milk",chef_note:"非常に素朴で親しみやすい味わい。ピエモンテ風のチーズフォンデュ「フォンデュータ」のベースとしてよく溶かして使う。"},{id:"ing_robiola",number:"20",name_it:"Robiola di Roccaverano",name_en:"Robiola",name_ja:"ロビオラ・ディ・ロッカヴェラーノ",region:"Italy (Piemonte)",pin:{x:35,y:32},properties:{tenderness:"★★★★★",fat:"★★★★☆",collagen:"☆☆☆☆☆"},cooking:"そのまま、パンに塗る、ジャムやハチミツ添え",science:"山羊乳（または牛乳や羊乳との混乳）で作られるフレッシュ〜超短期熟成のソフトチーズ。爽やかなレモンのような酸味と豊かなコクがあり、外皮はなく非常に滑らかでスプレッド状の質感を示す。",classification:"Formaggio a pasta molle / fresco（フレッシュ〜軟質タイプ）",logic:"DOP Protected / Goat milk blend",chef_note:"フレッシュ（Fresco）は真っ白でジューシー。数週間熟成させたもの（Affinato）は表面に薄いカビがのり、濃厚なコクと野性味が加わる。"},{id:"ing_grana_padano",number:"21",name_it:"Grana Padano",name_en:"Grana Padano",name_ja:"グラナ・パダーノ",region:"Italy (Lombardia / Veneto / Emilia-Romagna)",pin:{x:46,y:28},properties:{tenderness:"★★☆☆☆",fat:"★★★☆☆",collagen:"☆☆☆☆☆"},cooking:"すりおろしてパスタやスープに、グリル料理、サラダのスライス",science:"パルミジャーノと製法はほぼ同じだが、生産地域が広く、脱脂乳の割合がやや高いため、少しマイルドでバターのような風味が特徴。熟成期間も比較的短い（9〜20ヶ月以上）。",classification:"Formaggio a pasta dura（硬質タイプ）",logic:"DOP Protected / Grana style",chef_note:"「キッチンのハチミツ（調味料）」。パルミジャーノより塩気が控えめで優しいため、デイリーユースのパスタやリゾットに最適。"},{id:"ing_squacquerone",number:"22",name_it:"Squacquerone di Romagna",name_en:"Squacquerone",name_ja:"スクアックェローネ",region:"Italy (Emilia-Romagna)",pin:{x:48,y:38},properties:{tenderness:"★★★★★",fat:"★★★☆☆",collagen:"☆☆☆☆☆"},cooking:"ピアディーナに挟む、そのまま生ハムと合わせて",science:"超高温殺菌と素早い凝固により水分を極限まで残したフレッシュチーズ。熟成させないため、乳糖や乳酸の甘酸っぱいミルク感がストレートに味わえる。",classification:"Formaggio fresco（フレッシュタイプ）",logic:"DOP Protected / Spreadable",chef_note:"ロマーニャ地方の薄焼きパン「ピアディーナ」にルッコラや生ハムと一緒に挟むのが絶対的なルール。"},{id:"ing_formaggio_di_fossa",number:"23",name_it:"Formaggio di Fossa di Sogliano",name_en:"Formaggio di Fossa",name_ja:"フォルマッジョ・ディ・フォッサ",region:"Italy (Emilia-Romagna / Marche)",pin:{x:50,y:40},properties:{tenderness:"★★☆☆☆",fat:"★★★★☆",collagen:"☆☆☆☆☆"},cooking:"すりおろしてパスタに、ハチミツ添え",science:"凝灰岩の洞窟（Fossa: 穴）の底に藁を敷き詰め、チーズを袋に入れて3ヶ月間密封熟成させる。無酸素状態での嫌気性発酵により、カゼインや脂質が分解されて独特の強烈なアロマと濃厚な旨味が形成される。",classification:"Formaggio a pasta dura（硬質タイプ）",logic:"DOP Protected / Cave aged",chef_note:"強烈な香りとピリッとした辛味があるため、ハチミツをかけてそのまま食べるか、パスタやリゾットの仕上げにすりおろして使う。"},{id:"ing_asiago",number:"24",name_it:"Asiago",name_en:"Asiago",name_ja:"アジアーゴ",region:"Italy (Veneto / Trentino-Alto Adige)",pin:{x:58,y:22},properties:{tenderness:"★★★★☆",fat:"★★★☆☆",collagen:"☆☆☆☆☆"},cooking:"そのまま、サンドイッチ、パスタ, リゾット",science:"フレッシュな「プレス・アジアーゴ（Pressato）」と、長期間熟成させて硬質になった「アジアーゴ・ダレーヴォ（d'Allevo）」がある。熟成によって組織内の水分が抜け、アミノ酸の旨味成分が凝縮される。",classification:"Formaggio a pasta semidura o dura（半硬質〜硬質タイプ）",logic:"DOP Protected / Two distinct styles",chef_note:"若ければしっとりしてサンドイッチに最適。熟成物はパルミジャーノのようにすりおろして使う。"},{id:"ing_montasio",number:"25",name_it:"Montasio",name_en:"Montasio",name_ja:"モンタジオ",region:"Italy (Friuli-Venezia Giulia / Veneto)",pin:{x:65,y:20},properties:{tenderness:"★★★☆☆",fat:"★★★☆☆",collagen:"☆☆☆☆☆"},cooking:"フリコ（おやき）、そのまま",science:"アルプスの高地でつくられてきた伝統の硬質チーズ。若いうちはマイルドで乳酸の甘みがあるが、18ヶ月以上の熟成で非常にアロマが強くスパイシーになる。フリコでは溶かして焼き、香ばしいカリカリの衣をつくる。",classification:"Formaggio a pasta dura（硬質タイプ）",logic:"DOP Protected / Frico ingredient",chef_note:"フリコ（おやき）には欠かせない。じゃがいもと一緒に焼き上げるのが絶品。"},{id:"ing_piave",number:"26",name_it:"Piave",name_en:"Piave",name_ja:"ピアーヴェ",region:"Italy (Veneto)",pin:{x:60,y:18},properties:{tenderness:"★★☆☆☆",fat:"★★★☆☆",collagen:"☆☆☆☆☆"},cooking:"そのまま、すりおろし、リゾット",science:"ピアーヴェ川流域の牛乳を使用し、温度と湿度を厳しく管理したセラーで熟成される。若いうちは甘みがあるが、長期間熟成（ゴールド/リゼルヴァ）するとアミノ酸が結晶化し、トロピカルフルーツのような華やかな香りと凝縮したコクが生まれる。",classification:"Formaggio a pasta cotta e dura（硬質・加熱圧搾タイプ）",logic:"DOP Protected / Alpine pasture milk",chef_note:"熟成が進んだものは非常に上品でコクがある。フルボディの赤ワインや、バルサミコ酢を数滴垂らしてそのまま楽しむ。"},{id:"ing_provolone_valpadana",number:"27",name_it:"Provolone Valpadana",name_en:"Provolone Valpadana",name_ja:"プロヴォローネ・ヴァルパダーナ",region:"Italy (Lombardia / Veneto / Emilia-Romagna)",pin:{x:52,y:28},properties:{tenderness:"★★★☆☆",fat:"★★★★☆",collagen:"☆☆☆☆☆"},cooking:"グリル、そのまま、パニーノ",science:"パスタ・フィラータ（伸展）製法で作られる大型チーズ。甘口（ドルチェ）は子牛のレンネットを使用しマイルド。辛口（ピカンテ）は山羊や羊のレンネットに含まれるリパーゼ（脂肪分解酵素）の働きにより、遊離脂肪酸が生成され、独特の刺激的なピリッとした辛味が生まれる。",classification:"Formaggio a pasta filata stagionata（熟成パスタ・フィラータタイプ）",logic:"DOP Protected / Lipase lipolysis for piccante",chef_note:"ピカンテは赤ワインと、ドルチェはスライスしてグリルで焼いてトロトロにして食べるのが一番。"},{id:"ing_monte_veronese",number:"28",name_it:"Monte Veronese",name_en:"Monte Veronese",name_ja:"モンテ・ヴェロネーゼ",region:"Italy (Veneto)",pin:{x:55,y:24},properties:{tenderness:"★★★☆☆",fat:"★★★☆☆",collagen:"☆☆☆☆☆"},cooking:"そのまま、パスタ、ポレンタ添え",science:"レスシーニ山脈の放牧牛の乳から作られる。全乳で作るフレッシュ（D'Allevo）と、脱脂乳で作る硬質（D'Allevo Mezzano/Vecchio）があり、脱脂乳製は水分と脂肪分が少なくなるため、非常に引き締まった組織で旨味がシャープに立ち上がる。",classification:"Formaggio a pasta semidura o dura（半硬質〜硬質タイプ）",logic:"DOP Protected / Skimmed vs Whole milk",chef_note:"ポレンタ（コーンミールの練り物）の上に乗せて溶かして食べると、山の素朴で豊かな風味が引き立つ。"},{id:"ing_trentingrana",number:"29",name_it:"Trentingrana",name_en:"Trentingrana",name_ja:"トレンティグラーナ",region:"Italy (Trentino-Alto Adige)",pin:{x:58,y:20},properties:{tenderness:"★★☆☆☆",fat:"★★★☆☆",collagen:"☆☆☆☆☆"},cooking:"すりおろし、そのまま",science:"グラナ・パダーノの一種だが、トレンティーノの山岳地帯で作られ、リゾチーム（保存料・酵素）の添加が禁止されている。牧草由来のカロテンにより、より豊かな風味と黄色味を持つ。",classification:"Formaggio a pasta dura（硬質タイプ）",logic:"DOP Sub-zone / No Lysozyme",chef_note:"山のパルミジャーノとも言える自然派の硬質チーズ。香りが良く高品質。"},{id:"ing_stelvio",number:"30",name_it:"Stelvio (Stilfser)",name_en:"Stelvio",name_ja:"ステルヴィオ（シュティルフサー）",region:"Italy (Trentino-Alto Adige)",pin:{x:47,y:19},properties:{tenderness:"★★★☆☆",fat:"★★★★☆",collagen:"☆☆☆☆☆"},cooking:"溶かして黒パンに乗せる、スペック（燻製生ハム）と共に",science:"オーストリア文化圏（南チロル）の影響を受けたウォッシュチーズ。地元の特有の細菌叢（ミクロフローラ）を含む塩水で洗われ、ナッツのような風味としなやかな弾力を得る。",classification:"Formaggio a crosta lavata（ウォッシュ・半硬質タイプ）",logic:"DOP Protected / Alpine wash",chef_note:"地元南チロルの赤ワイン（ラグレイン）や、スモーク生ハム「スペック」とのマリアージュが格別。"},{id:"ing_fontina",number:"31",name_it:"Fontina",name_en:"Fontina",name_ja:"フォンティーナ",region:"Italy (Valle d'Aosta)",pin:{x:30,y:20},properties:{tenderness:"★★★★☆",fat:"★★★★☆",collagen:"☆☆☆☆☆"},cooking:"フォンデュータ（イタリア風チーズフォンデュ）、スープ、そのまま",science:"アルプス最高峰近くで飼育されるヴァルドスタ牛の生乳を使用。銅製の大釜で温められ、プレスして熟成。非常に融点が低く滑らかに溶け、ナッツや山のキノコに似た大地の香気を放つ。",classification:"Formaggio a pasta semidura（加熱・半硬質タイプ）",logic:"DOP Protected / Low melting point",chef_note:"イタリア風フォンデュ「フォンデュータ」の主役。加熱すると極上のクリーミーさと滑らかさを示す。"},{id:"ing_fromadzo",number:"32",name_it:"Valle d'Aosta Fromadzo",name_en:"Fromadzo",name_ja:"フラマッツォ",region:"Italy (Valle d'Aosta)",pin:{x:28,y:22},properties:{tenderness:"★★★☆☆",fat:"★★☆☆☆",collagen:"☆☆☆☆☆"},cooking:"そのまま、スープ、ポレンタ添え",science:"牛乳に少量の山羊乳を混ぜることが認められている、脱脂乳ベースのチーズ。低脂肪のため引き締まった組織をもち、熟成（最高数年）により野生のハーブや干し草の香りが濃縮される。",classification:"Formaggio a pasta semidura o dura（半硬質〜硬質）",logic:"DOP Protected / Low fat milk",chef_note:"ヴァッレ・ダオスタ州の極めて古い伝統チーズ。熟成したものは非常にスパイシーで独特のコクがある。"},{id:"ing_prescinseua",number:"33",name_it:"Prescinseua",name_en:"Prescinseua",name_ja:"プレシンセーア",region:"Italy (Liguria)",pin:{x:34,y:33},properties:{tenderness:"★★★★★",fat:"★★☆☆☆",collagen:"☆☆☆☆☆"},cooking:"ジェノバ風タルト（トルタ・パスクアリーナ）、フォカッチャ・ディ・レコ",science:"レンネットを加えた後に少し酸味を発酵させる、ヨーグルトとリコッタの中間のような酸乳フレッシュチーズ。乳清（ホエイ）の水分が多く残り、爽やかな酸味をもたらす。",classification:"Formaggio fresco / cagliata acidula（酸乳フレッシュタイプ）",logic:"Traditional / Genoese pastry base",chef_note:"ジェノバ名物のハーブと卵のタルト「トルタ・パスクアリーナ」のフィリングには絶対に欠かせない地元の味。"},{id:"ing_san_ste",number:"34",name_it:"San Stè",name_en:"San Stè",name_ja:"サン・ステ",region:"Italy (Liguria)",pin:{x:36,y:32},properties:{tenderness:"★★★☆☆",fat:"★★★☆☆",collagen:"☆☆☆☆☆"},cooking:"そのまま、グリル、パスタ",science:"リグーリア州の内陸山岳地帯で作られる牛乳チーズ。適度な弾力と気泡があり、塩水で洗われながら短期間熟成されることで、マイルドでありながら引き締まったコクを持つ。",classification:"Formaggio a pasta semidura（半硬質タイプ）",logic:"Traditional / Ligurian mountain cheese",chef_note:"スライスしてフライパンや鉄板でサッと焼いて食べる（アッロスティート）と、ミルクの香ばしさが際立ち非常に美味しい。"},{id:"ing_pecorino_toscano",number:"35",name_it:"Pecorino Toscano",name_en:"Pecorino Toscano",name_ja:"ペコリーノ・トスカーノ",region:"Italy (Toscana)",pin:{x:48,y:45},properties:{tenderness:"★★★☆☆",fat:"★★★★☆",collagen:"☆☆☆☆☆"},cooking:"そのまま、そら豆（バッチェッリ）と共に、すりおろし",science:"トスカーナ州の羊乳製チーズ。ローマのものよりマイルドで、羊乳の甘みとコクが際立つ。短期熟成（テネロ）は白くしなやか、長期熟成（スタジョナート）は黄色みを帯びてナッツ香とスパイシーさが出る。",classification:"Formaggio di pecora（羊乳タイプ）",logic:"DOP Protected / Mild sheep milk",chef_note:"春のトスカーナの定番「そら豆（生のまま）とペコリーノ・トスカーノ、オリーブオイル」の組み合わせは、最高にシンプルなご馳走。"},{id:"ing_marzolino",number:"36",name_it:"Marzolino di Lucardo",name_en:"Marzolino",name_ja:"マルゾリーノ",region:"Italy (Toscana)",pin:{x:46,y:46},properties:{tenderness:"★★★★☆",fat:"★★★★☆",collagen:"☆☆☆☆☆"},cooking:"そのまま、ハチミツやジャムと共に",science:"3月（Marzo）の最高の若草を食べた羊の乳で作られる楕円形の伝統的なチーズ。カードを布で包んでプレスするため独特の形状になる。非常にしっとりして羊乳のピュアな甘みがある。",classification:"Formaggio di pecora fresco o stagionato（羊乳ソフトタイプ）",logic:"Traditional / March spring milk",chef_note:"ルネサンス期から愛される歴史的チーズ。春のわずかな期間しか作られない貴重な風味が特徴。"},{id:"ing_pecorino_umbro",number:"37",name_it:"Pecorino Umbro",name_en:"Pecorino Umbro",name_ja:"ペコリーノ・ウンブロ",region:"Italy (Umbria)",pin:{x:52,y:48},properties:{tenderness:"★★☆☆☆",fat:"★★★★☆",collagen:"☆☆☆☆☆"},cooking:"そのまま、トリュフソースと合わせて、スライス",science:"ウンブリア州の丘陵地帯で放牧された羊の乳から作られる。地元の特産である黒トリュフを生地に練り込んだもの（Pecorino al Tartufo）も多く作られ、羊乳のコクとトリュフのアロマが相乗効果を生む。",classification:"Formaggio di pecora（羊乳タイプ）",logic:"Traditional / Truffle-infused variants",chef_note:"地元の赤ワイン（サグランティーノ・ディ・モンテファルコ）のような力強くタンニンの豊富なワインと完璧な相性。"},{id:"ing_raviggiolo",number:"38",name_it:"Raviggiolo",name_en:"Raviggiolo",name_ja:"ラヴィッジオーロ",region:"Italy (Toscana / Emilia-Romagna)",pin:{x:50,y:43},properties:{tenderness:"★★★★★",fat:"★★★☆☆",collagen:"☆☆☆☆☆"},cooking:"そのままスプーンで、ニョッキやラビオリのフィリング",science:"シダの葉（またはイチジクの葉）の上に乗せて作られる、熟成を一切行わない超フレッシュな牛乳または羊乳のチーズ。極めて水分が多く、デリケートな甘みとほのかなハーブの香りが特徴。",classification:"Formaggio fresco（フレッシュタイプ）",logic:"Traditional / Fern leaf drain",chef_note:"非常に傷みやすいため生産地以外で出会うことは極めて難しい。イタリアの最初期のガストロノミー本にも記載されている古典的チーズ。"},{id:"ing_pecorino_romano",number:"39",name_it:"Pecorino Romano",name_en:"Pecorino Romano",name_ja:"ペコリーノ・ロマーノ",region:"Italy (Lazio / Sardegna)",pin:{x:53,y:55},properties:{tenderness:"★☆☆☆☆",fat:"★★★★☆",collagen:"☆☆☆☆☆"},cooking:"カルボナーラ、カチョ・エ・ペペ、アマトリチャーナ、すりおろし",science:"羊の生乳を使用し、熟成過程で大量の塩を擦り込む塩干（サロトゥーラ）を行う。これにより水分が抜け、保存性が高まると同時に、アミノ酸の旨味と極めて強い塩気が凝縮される。",classification:"Formaggio di pecora a pasta dura（硬質羊乳タイプ）",logic:"DOP Protected / Salt-cured sheep milk",chef_note:"ローマ帝国時代から兵士の携帯食だったとされる。カルボナーラやカチョ・エ・ペペにはパルミジャーノではなく本品を使うのが絶対の掟。"},{id:"ing_caciotta_romana",number:"40",name_it:"Caciotta Romana",name_en:"Caciotta Romana",name_ja:"カチョッタ・ロマーナ",region:"Italy (Lazio)",pin:{x:55,y:57},properties:{tenderness:"★★★★☆",fat:"★★★☆☆",collagen:"☆☆☆☆☆"},cooking:"そのまま、グリル、パニーノ",science:"牛乳と羊乳の混乳（または羊乳のみ）で作られる丸く小さめのセミソフトチーズ。短期間熟成のため水分が適度に残っており、マイルドで穏やかなミルクの甘みを持つ。",classification:"Formaggio a pasta semimolle（セミソフトタイプ）",logic:"Traditional / Roman countryside classic",chef_note:"クセがなく非常に食べやすい。現地ではハーブやサラミと一緒にパンに挟んで日常的に食される。"},{id:"ing_casciotta_urbino",number:"41",name_it:"Casciotta d'Urbino",name_en:"Casciotta d'Urbino",name_ja:"カショッタ・ドゥルビーノ",region:"Italy (Marche)",pin:{x:54,y:45},properties:{tenderness:"★★★★☆",fat:"★★★☆☆",collagen:"☆☆☆☆☆"},cooking:"そのまま、ジャムやハチミツ添え、サラダ",science:"羊乳（70-80%）と牛乳（20-30%）の混乳を使用。羊乳の豊かなコクがありつつも、牛乳を加えることで組織がしなやかで優しくなり、酸味と甘みの絶妙なバランスが生み出される。",classification:"Formaggio a pasta semimolle（セミソフト混乳タイプ）",logic:"DOP Protected / Sheep & Cow blend",chef_note:"芸術家ミケランジェロがこよなく愛し、生産地の農場を自ら買い取ったという逸話があるトスカーナ国境近くの歴史的チーズ。"},{id:"ing_pecorino_abruzzo",number:"42",name_it:"Pecorino Abruzzese",name_en:"Pecorino Abruzzese",name_ja:"ペコリーノ・アブルツェーゼ",region:"Italy (Abruzzo)",pin:{x:58,y:54},properties:{tenderness:"★★☆☆☆",fat:"★★★★☆",collagen:"☆☆☆☆☆"},cooking:"そのまま、パスタ、羊肉料理の仕上げ",science:"アブルッツォ州の険しいアペニン山脈で放牧された羊の乳から伝統的手法で作られる。高地の多様な野生草や低木を食べるため、チーズには干し草や野生のタイムなどのスパイシーなハーブ香が宿る。",classification:"Formaggio di pecora（羊乳タイプ）",logic:"Traditional / Appenine pasture",chef_note:"地元の郷土料理「アロスティチーニ（羊肉の串焼き）」と合わせたり、トマトソースのパスタにたっぷり削ってかけるのが定番。"},{id:"ing_caciocavallo",number:"43",name_it:"Caciocavallo Silano",name_en:"Caciocavallo",name_ja:"カチョカヴァッロ・シラーノ",region:"Italy (Campania / Basilicata / Calabria / Puglia)",pin:{x:65,y:65},properties:{tenderness:"★★★☆☆",fat:"★★★☆☆",collagen:"☆☆☆☆☆"},cooking:"厚切りにしてステーキ（グリル）、そのまま",science:"熱湯の中で練って引き伸ばしたカードを紐で縛り、木枠にまたがらせて（Cacio a cavallo = 馬の背に乗ったチーズ）吊るして熟成させるパスタ・フィラータ。熟成により表面は乾いて硬くなり、内部に独特の芳醇なコクが生じる。",classification:"Formaggio a pasta filata stagionata（熟成パスタ・フィラータ）",logic:"DOP Protected / Stretched curd hung to age",chef_note:"ひょうたん型で吊るされている。厚切りにしてフライパンや鉄板で両面をカリッと焼く「カチョカヴァッロのステーキ」は極上の美味。"},{id:"ing_mozzarella_bufala",number:"44",name_it:"Mozzarella di Bufala Campana",name_en:"Buffalo Mozzarella",name_ja:"モッツァレッラ・ディ・ブーファラ・カンパーナ",region:"Italy (Campania)",pin:{x:62,y:62},properties:{tenderness:"★★★★★",fat:"★★★★☆",collagen:"☆☆☆☆☆"},cooking:"カプレーゼ（トマトとバジル添え）、マルゲリータピッツァ",science:"水牛乳を使用。水牛乳は牛乳の約2倍の乳脂肪分を含み、カロテンを含まないため純白。熱湯で練る（パスタ・フィラータ）ことでタンパク質が整列し、噛むとミルクがジュワッと溢れるジューシーな繊維状組織を形成する。",classification:"Formaggio fresco a pasta filata（水牛乳フレッシュパスタ・フィラータ）",logic:"DOP Protected / High fat buffalo milk",chef_note:"極上の生クリームのような甘みと濃厚さ。冷たいままちぎって、トマト、良質なオリーブオイル、塩、バジルと合わせるのが一番。"},{id:"ing_provolone_monaco",number:"45",name_it:"Provolone del Monaco",name_en:"Provolone del Monaco",name_ja:"プロヴォローネ・デル・モナコ",region:"Italy (Campania)",pin:{x:64,y:63},properties:{tenderness:"★★☆☆☆",fat:"★★★★☆",collagen:"☆☆☆☆☆"},cooking:"そのまま、パスタ（ネラーノ風スパゲッティ）、リゾット",science:"ソレント半島のアイローラ牛の牛乳を使い、洋梨型に成形して最低6ヶ月熟成。カゼインの緩やかな分解により、最初はバターのような甘みがあり、熟成が進むと特有のピリッとした複雑な辛口アロマが現れる。",classification:"Formaggio a pasta filata stagionata（熟成パスタ・フィラータ）",logic:"DOP Protected / Sorrento peninsula heritage",chef_note:"ソレント半島の名物「スパゲッティ・アッラ・ネラーノ（揚げズッキーニのパスタ）」にこのチーズを削って溶かし込むのが本場のレシピ。"},{id:"ing_burrata",number:"46",name_it:"Burrata",name_en:"Burrata",name_ja:"ブッラータ",region:"Italy (Puglia)",pin:{x:70,y:58},properties:{tenderness:"★★★★★",fat:"★★★★★",collagen:"☆☆☆☆☆"},cooking:"そのまま（生ハムや完熟トマト、フルーツと合わせて）、パスタの上に乗せる",science:"モッツァレッラの薄い袋を作り、その中に細かく裂いたモッツァレッラと生クリーム（ストラッチャテッラ）を詰め込んで閉じる。ナイフを入れると、高い脂肪分のクリームが流れ出す液状〜ゲル状の二重構造。",classification:"Formaggio fresco con panna（クリーム入りフレッシュタイプ）",logic:"Traditional / Stretched bag with cream",chef_note:"「バターのような」という意味の名を持つプーリア発祥の贅沢品。鮮度が命で、中のクリームが常温に戻ってから食べると香りが最大に引き立つ。"},{id:"ing_canestrato_pugliese",number:"47",name_it:"Canestrato Pugliese",name_en:"Canestrato Pugliese",name_ja:"カネストラート・プグリエーゼ",region:"Italy (Puglia)",pin:{x:72,y:60},properties:{tenderness:"★★☆☆☆",fat:"★★★★☆",collagen:"☆☆☆☆☆"},cooking:"そのまま、すりおろしてパスタやスープに、そら豆と共に",science:"葦で編んだカゴ（Canestro）に入れてプレスし脱水するため、表面に特徴的なカゴ of 跡が残る羊の硬質チーズ。乾燥したプーリアの気候で熟成され、非常に引き締まった組織と強めの塩気、羊乳の深いコクを持つ。",classification:"Formaggio di pecora a pasta dura（硬質羊乳タイプ）",logic:"DOP Protected / Basket molded",chef_note:"若いうちはマイルドだが、熟成したものは非常にパワフル。地元の太いパスタ（オレキエッテ）のトマトソースにたっぷり削って食べる。"},{id:"ing_pecorino_filiano",number:"48",name_it:"Pecorino di Filiano",name_en:"Pecorino di Filiano",name_ja:"ペコリーノ・ディ・フィリアーノ",region:"Italy (Basilicata)",pin:{x:70,y:64},properties:{tenderness:"★★☆☆☆",fat:"★★★★☆",collagen:"☆☆☆☆☆"},cooking:"そのまま、すりおろし、パスタ",science:"バジリカータ州の火山性土壌の草地で放牧された羊の生乳を使用。カゴで成形され、オリーブオイルを表面に塗りながら洞窟やセラーで熟成。非常にスパイシーで、火山灰土壌由来の豊かなミネラル感を感じるコクがある。",classification:"Formaggio di pecora a pasta dura（硬質羊乳タイプ）",logic:"DOP Protected / Volcanic soil influence",chef_note:"伝統的なオリーブオイル塗布熟成。地元のしっかりした赤ワイン（アリアーニコ・デル・ヴルトゥレ）と非常に相性が良い。"},{id:"ing_pecorino_crotonese",number:"49",name_it:"Pecorino Crotonese",name_en:"Pecorino Crotonese",name_ja:"ペコリーノ・クロトネーゼ",region:"Italy (Calabria)",pin:{x:75,y:72},properties:{tenderness:"★★☆☆☆",fat:"★★★★☆",collagen:"☆☆☆☆☆"},cooking:"そのまま、グリル、すりおろし",science:"カラブリア州クロトーネ周辺で作られる。羊乳の脂肪分解が進み、ナッツのようなアロマと共に、カラブリア特有のスパイシーで力強い辛口（ピカンテ）の風味が生じる。",classification:"Formaggio di pecora（硬質羊乳タイプ）",logic:"DOP Protected / Calabrian sheep classic",chef_note:"地元特産の唐辛子を練り込んだバリエーション（Pecorino con Peperoncino）も多く、カラブリアの情熱的な味覚を象徴する。"},{id:"ing_pecorino_siciliano",number:"50",name_it:"Pecorino Siciliano",name_en:"Pecorino Siciliano",name_ja:"ペコリーノ・シチリアーノ",region:"Italy (Sicilia)",pin:{x:60,y:85},properties:{tenderness:"★★☆☆☆",fat:"★★★★☆",collagen:"☆☆☆☆☆"},cooking:"そのまま、すりおろし、パスタ・アッラ・ノルマの仕上げ",science:"シチリア最古の羊乳チーズ。塩を加えてプレスし、葦のカゴで脱水。黒胡椒の粒を丸ごと練り込む（Tumazzu di Bivona 等）伝統もあり、羊乳の野生のコクに胡椒の爽やかな辛味がアクセントを与える。",classification:"Formaggio di pecora a pasta dura（硬質羊乳タイプ）",logic:"DOP Protected / Ancient Sicilian recipe",chef_note:"シチリアの名物ナスパスタ「パスタ・アッラ・ノルマ」に欠かせない。削るだけでシチリアの乾いた大地と太陽の香りを感じる。"},{id:"ing_ragusano",number:"51",name_it:"Ragusano",name_en:"Ragusano",name_ja:"ラグサーノ",region:"Italy (Sicilia)",pin:{x:67,y:92},properties:{tenderness:"★★★☆☆",fat:"★★★★☆",collagen:"☆☆☆☆☆"},cooking:"薄切りにしてフライパンで焼く、そのまま",science:"四角いレンガのような形をした牛乳のパスタ・フィラータ。塩水に長く漬け込むため塩気が強く、オリーブオイルを塗って熟成させることで、繊維質の中に濃厚なコクと香ばしさが生まれる。",classification:"Formaggio a pasta filata stagionata（熟成パスタ・フィラータタイプ）",logic:"DOP Protected / Brick-shaped",chef_note:"巨大な直方体で吊るされているのが特徴。焼くとモディカ地方の肉料理のような満足感が出る。"},{id:"ing_vastedda_belice",number:"52",name_it:"Vastedda della Valle del Belice",name_en:"Vastedda della Valle del Belice",name_ja:"ヴァステッダ・デッラ・ヴァッレ・デル・ベリーチェ",region:"Italy (Sicilia)",pin:{x:62,y:88},properties:{tenderness:"★★★★★",fat:"★★★☆☆",collagen:"☆☆☆☆☆"},cooking:"そのまま、サンドイッチ、オリーブオイルとオレガノをかけて",science:"イタリアで唯一の「羊乳のパスタ・フィラータ（繊維状チーズ）」。元々は失敗したペコリーノを熱湯で練り直して再生したのが始まり。羊乳特有のコクがありつつも、フレッシュで極めて滑らか。",classification:"Formaggio fresco a pasta filata di pecora（羊乳フレッシュ・パスタ・フィラータタイプ）",logic:"DOP Protected / Sheep milk stretched curd",chef_note:"平たい円盤状。トマトやオレガノと一緒にシチリアのパンに挟むと極上のパニーノになる。"},{id:"ing_pecorino_sardo",number:"53",name_it:"Pecorino Sardo",name_en:"Pecorino Sardo",name_ja:"ペコリーノ・サルド",region:"Italy (Sardegna)",pin:{x:40,y:70},properties:{tenderness:"★★★☆☆",fat:"★★★★☆",collagen:"☆☆☆☆☆"},cooking:"そのまま、パスタ、ペストソース（ジェノベーゼ）",science:"ローマのものより塩分が低く、マイルドな甘口（ドルチェ）と、長期間熟成させてピリッとした辛味を持つ熟成（マトゥーロ）がある。サルデーニャの自然な牧草由来のハーブ香を内包する。",classification:"Formaggio di pecora（羊乳タイプ）",logic:"DOP Protected / Two aging styles",chef_note:"ジェノベーゼソース（ペスト）を作る際、パルミジャーノとこのペコリーノ・サルドをブレンドするのが本場のレシピ。"},{id:"ing_fiore_sardo",number:"54",name_it:"Fiore Sardo",name_en:"Fiore Sardo",name_ja:"フィオーレ・サルド",region:"Italy (Sardegna)",pin:{x:42,y:68},properties:{tenderness:"★★☆☆☆",fat:"★★★★☆",collagen:"☆☆☆☆☆"},cooking:"そのまま、すりおろし",science:"羊の生乳を使用し, 型に入れた後に暖炉の煙（マートルなどの地元の木材）で軽く燻製をかけてから熟成させる。スモーク香と羊乳の強い風味が相まり、非常に野性的で力強いアロマを放つ。",classification:"Formaggio di pecora affumicato（燻製・硬質羊乳タイプ）",logic:"DOP Protected / Smoked raw sheep milk",chef_note:"「サルデーニャの花」という名前だが味は非常にワイルド。地元の強い赤ワイン（カンノナウ）と合わせる。"},{id:"ing_casizolu",number:"55",name_it:"Casizolu",name_en:"Casizolu",name_ja:"カシゾル",region:"Italy (Sardegna)",pin:{x:38,y:69},properties:{tenderness:"★★★☆☆",fat:"★★★☆☆",collagen:"☆☆☆☆☆"},cooking:"そのまま、焼いてハチミツをかける",science:"羊乳が主流のサルデーニャでは珍しい、放牧された牛の乳で作るパスタ・フィラータ。洋梨のような形をしており、黄色みを帯びた組織からは牧草由来のカロテンと森の香りが感じられる。",classification:"Formaggio a pasta filata（パスタ・フィラータタイプ）",logic:"Traditional / Cow's milk in sheep land",chef_note:"職人が手作業で湯の中で練り上げる希少なチーズ。少し火を入れると香りが一気に開く。"}],We=[{id:"ing_camembert",number:"1",name_fr:"Camembert de Normandie",name_en:"Camembert (Normandy)",name_ja:"カマンベール・ド・ノルマンディー",region:"Normandie",pin:{x:35,y:45},properties:{saltiness:"★★★☆☆",aroma:"★★★★☆",rarity:"★★★☆☆"},cooking:"そのまま、焼きカマンベール（Camembert au four）",science:"表面の白カビ（Penicillium camemberti）が分泌するプロテアーゼによりカゼインが分解され、中心部に向かって徐々に柔らかくクリーミーな状態へと熟成が進む。",classification:"Fromage à pâte molle à croûte fleurie（白カビソフトタイプ）",logic:"AOP Protected / Raw milk product",chef_note:"冷蔵庫から食べる1時間前には出し、室温に戻しておくことで、独特の芳醇な香りと滑らかなテクスチャーが最大限に引き出される。"},{id:"ing_pont_leveque",number:"2",name_fr:"Pont-l'Évêque",name_en:"Pont-l'Évêque",name_ja:"ポン・レヴェック",region:"Normandie (Pays d’Auge)",pin:{x:34,y:44},properties:{saltiness:"★★★☆☆",aroma:"★★★★☆",rarity:"★★★☆☆"},cooking:"そのまま、キッシュの具材",science:"塩水で表面を洗うことでリネンス菌（Brevibacterium linens）を繁殖させる。これにより、特有の強い匂いとしなやかな生地が形成される。",classification:"Fromage à pâte molle à croûte lavée（ウォッシュタイプ）",logic:"AOP Protected / Washed rind",chef_note:"外皮の香りは強いが中身はマイルド。リンゴの蒸留酒カルヴァドスと合わせるのが現地流。"},{id:"ing_brie_meaux",number:"3",name_fr:"Brie de Meaux",name_en:"Brie de Meaux",name_ja:"ブリー・ド・モー",region:"Île-de-France (Brie)",pin:{x:55,y:48},properties:{saltiness:"★★★☆☆",aroma:"★★★☆☆",rarity:"★★☆☆☆"},cooking:"そのまま、サンドイッチ（ジャンボン・ブール）",science:"カマンベールと同じ白カビタイプだが、円盤が大きいため熟成がゆっくりと進み、キノコやヘーゼルナッツのようなより複雑な芳香成分が生成される。",classification:"Fromage à pâte molle à croûte fleurie（白カビソフトタイプ）",logic:"AOP Protected / The King of Cheeses",chef_note:"「チーズの王様」と呼ばれる。完全に熟成すると中身がトロトロになるため、カットするタイミングが重要。"},{id:"ing_epoisses",number:"4",name_fr:"Époisses",name_en:"Époisses",name_ja:"エポワス",region:"Bourgogne (Côte-d’Or)",pin:{x:65,y:55},properties:{saltiness:"★★★☆☆",aroma:"★★★★★",rarity:"★★★☆☆"},cooking:"そのまま、バゲットに塗る",science:"ブルゴーニュの地酒（マール・ド・ブルゴーニュ）を加えた塩水で表面を何度も洗うことで、強烈な発酵臭とスプーンですくえるほどのトロトロな組織が作られる。",classification:"Fromage à pâte molle à croûte lavée（ウォッシュタイプ）",logic:"AOP Protected / Marc de Bourgogne washed",chef_note:"香りの強烈さに反して味は非常にミルキー。フルボディの赤ワインと抜群の相性を誇る。"},{id:"ing_charolais",number:"5",name_fr:"Charolais",name_en:"Charolais",name_ja:"シャロレ",region:"Bourgogne (Saône-et-Loire)",pin:{x:67,y:58},properties:{saltiness:"★★★☆☆",aroma:"★★★★☆",rarity:"★★★★☆"},cooking:"そのまま、サラダのトッピング",science:"山羊乳（または牛乳との混乳）を使用し、自然乾燥させることで凝縮した酸味とナッツの香りが際立つ。熟成により表面に青カビが生えることもある。",classification:"Fromage de chèvre（山羊乳タイプ）",logic:"AOP Protected / Large goat cheese",chef_note:"他のシェーブルよりサイズが大きく、中がしっとりしている。白ワインとの相性が良い。"},{id:"ing_comte",number:"6",name_fr:"Comté",name_en:"Comté",name_ja:"コンテ",region:"Jura (Montagnes du Jura)",pin:{x:75,y:50},properties:{saltiness:"★★★☆☆",aroma:"★★★☆☆",rarity:"★★☆☆☆"},cooking:"そのまま、チーズフォンデュ、シュー生地（Gougère）",science:"長期間（4ヶ月から36ヶ月以上）熟成させた硬質チーズ。熟成に伴いタンパク質が分解され、アミノ酸結晶（主にチロシン）が生じ、噛むとジャリッとした食感と濃厚な旨味が広がる。",classification:"Fromage à pâte pressée cuite（加熱圧搾硬質タイプ）",logic:"AOP Protected / Long maturation",chef_note:"熟成月数によりナッツ、栗、ドライフルーツなど劇的に香りが変化する。"},{id:"ing_reblochon",number:"7",name_fr:"Reblochon",name_en:"Reblochon",name_ja:"ルブロション",region:"Savoie (Haute-Savoie)",pin:{x:80,y:53},properties:{saltiness:"★★★☆☆",aroma:"★★★★☆",rarity:"★★★☆☆"},cooking:"タルティフレット（Tartiflette）",science:"絞り残しの乳（より脂肪分が高い）から作られるため、クリーミーで豊かな脂質が含まれる。ウォッシュタイプだが洗いの回数が少なく、マイルドな仕上がり。",classification:"Fromage à pâte pressée non cuite（非加熱圧搾半硬質タイプ）",logic:"AOP Protected / High fat content",chef_note:"ジャガイモとベーコンと一緒にオーブンで焼くサヴォワの郷土料理「タルティフレット」には欠かせない。"},{id:"ing_beaufort",number:"8",name_fr:"Beaufort",name_en:"Beaufort",name_ja:"ボーフォール",region:"Savoie (Beaufortain, Tarentaise)",pin:{x:82,y:55},properties:{saltiness:"★★★☆☆",aroma:"★★★★☆",rarity:"★★★☆☆"},cooking:"チーズフォンデュ（Fondue savoyarde）、グラタン",science:"夏に高山の牧草を食べた牛の乳（エテ）はカロテンが多く黄色味を帯びる。加熱圧搾により水分を抜き、高密度な旨味成分のアミノ酸が凝縮される。",classification:"Fromage à pâte pressée cuite（加熱圧搾硬質タイプ）",logic:"AOP Protected / Alpine cheese",chef_note:"側面が内側に凹んでいるのが特徴。華やかな香りとフルーティーな甘みを持つ。"},{id:"ing_bleu_queyras",number:"9",name_fr:"Bleu du Queyras",name_en:"Bleu du Queyras",name_ja:"ブルー・デュ・ケラス",region:"Alpes du Sud (Provence-Alpes)",pin:{x:85,y:65},properties:{saltiness:"★★★★☆",aroma:"★★★★☆",rarity:"★★★★★"},cooking:"そのまま、サラダ",science:"アルプスの高地で作られる牛乳製の青カビチーズ。カビの増殖による脂肪分解で独特のピリッとした風味と、山の牧草由来のフローラルな香りが混ざり合う。",classification:"Fromage à pâte persillée（青カビタイプ）",logic:"Mountain blue cheese",chef_note:"生産量が少なく希少。ハチミツやドライフルーツと一緒に食べると辛味がマイルドになる。"},{id:"ing_cantal",number:"10",name_fr:"Cantal",name_en:"Cantal",name_ja:"カンタル",region:"Auvergne (Cantal)",pin:{x:60,y:65},properties:{saltiness:"★★★☆☆",aroma:"★★★☆☆",rarity:"★★☆☆☆"},cooking:"アリゴ（Aligot）、トリュファード（Truffade）",science:"カード（凝乳）を一度粉砕して塩を混ぜ、再度プレスして作る特殊な製法により、組織に細かいヒビが入り、ホロホロとした独特の食感と酸味が生まれる。",classification:"Fromage à pâte pressée non cuite（非加熱圧搾半硬質タイプ）",logic:"AOP Protected / Double pressed",chef_note:"フランス最古のチーズの一つ。オーヴェルニュの郷土料理には欠かせないベース食材。"},{id:"ing_saint_nectaire",number:"11",name_fr:"Saint-Nectaire",name_en:"Saint-Nectaire",name_ja:"サン・ネクテール",region:"Auvergne (Puy-de-Dôme)",pin:{x:62,y:63},properties:{saltiness:"★★★☆☆",aroma:"★★★★☆",rarity:"★★★☆☆"},cooking:"そのまま、温野菜に乗せる",science:"火山灰土壌の牧草を食べた牛の乳から作られ、湿気の多いカーヴ（洞窟）で熟成。複雑なカビが外皮に生え、ナッツや土、マッシュルームのような土着的なアロマ（Terroir）を形成する。",classification:"Fromage à pâte pressée non cuite（非加熱圧搾半硬質タイプ）",logic:"AOP Protected / Earthy flavor",chef_note:"外皮の独特の匂いとは裏腹に、中は非常にしなやかでミルクの甘味を感じる。"},{id:"ing_fourme_ambert",number:"12",name_fr:"Fourme d'Ambert",name_en:"Fourme d'Ambert",name_ja:"フルム・ダンベール",region:"Auvergne (Haute-Loire, Puy-de-Dôme)",pin:{x:64,y:64},properties:{saltiness:"★★★★☆",aroma:"★★★☆☆",rarity:"★★☆☆☆"},cooking:"そのまま、ソース、キッシュ",science:"円柱形の青カビチーズ。青カビ（Penicillium roqueforti）を入れるが、他のブルーチーズより水分が多いためマイルドな風味に仕上がり、カゼインの分解によるなめらかさが際立つ。",classification:"Fromage à pâte persillée（青カビタイプ）",logic:"AOP Protected / Mild blue cheese",chef_note:"青カビ初心者にも勧めやすい「高貴なブルーチーズ」。甘口ワインと相性が良い。"},{id:"ing_sainte_maure",number:"13",name_fr:"Sainte-Maure de Touraine",name_en:"Goat Cheese (Sainte-Maure)",name_ja:"サント・モール・ド・トゥーレーヌ",region:"Vallée de la Loire (Touraine)",pin:{x:42,y:62},properties:{saltiness:"★★★☆☆",aroma:"★★★★☆",rarity:"★★★☆☆"},cooking:"そのまま、サラダ・ド・シェーヴル・ショー（温製サラダ）",science:"山羊乳チーズ。中央の麦わらが組織を補強し内部の酸素供給を助ける。表面の木炭粉が酸度を調整し、特有の風味を持つ灰色の外皮を形成する。",classification:"Fromage de chèvre（山羊乳タイプ）",logic:"AOP Protected / Ash-coated",chef_note:"バゲットに乗せて軽く焼き、ハチミツをかけてサラダに乗せるのが定番。"},{id:"ing_crottin",number:"14",name_fr:"Crottin de Chavignol",name_en:"Crottin de Chavignol",name_ja:"クロタン・ド・シャヴィニョル",region:"Vallée de la Loire (Berry)",pin:{x:45,y:60},properties:{saltiness:"★★★☆☆",aroma:"★★★★☆",rarity:"★★★☆☆"},cooking:"そのまま、オーブン焼き",science:"小型の山羊乳チーズ。熟成が進むと水分が抜け、組織が硬く締まり（脂肪とタンパク質の凝縮）、ピリッとした刺激と深いコクが生まれる。",classification:"Fromage de chèvre（山羊乳タイプ）",logic:"AOP Protected / Small goat cheese",chef_note:"ロワール地方の白ワイン（サンセール）とのペアリングが完璧とされる。"},{id:"ing_ossau_iraty",number:"15",name_fr:"Ossau-Iraty",name_en:"Ossau-Iraty",name_ja:"オッソー・イラティ",region:"Pyrénées (Pays Basque, Béarn)",pin:{x:30,y:80},properties:{saltiness:"★★★☆☆",aroma:"★★★☆☆",rarity:"★★★☆☆"},cooking:"そのまま、ジャム（黒サクランボ）を添える",science:"羊乳は牛乳よりも脂肪分とタンパク質が多いため、圧搾して水分を抜くことで非常にリッチでミルキー、かつ甘みのある風味成分（ラクトン類）が濃縮される。",classification:"Fromage à pâte pressée non cuite（非加熱圧搾半硬質タイプ）",logic:"AOP Protected / Sheep's milk",chef_note:"バスク地方の伝統に従い、チェリージャムを添えて食べるのが最高。"},{id:"ing_brocciu",number:"16",name_fr:"Brocciu",name_en:"Brocciu",name_ja:"ブロッチュ",region:"Corse (Haute-Corse, Corse-du-Sud)",pin:{x:90,y:90},properties:{saltiness:"★☆☆☆☆",aroma:"★★☆☆☆",rarity:"★★★★★"},cooking:"そのまま、フィアドーネ（Fiadone: コルシカのチーズケーキ）",science:"チーズ作りで余った乳清（ホエイ）を再加熱して作るため、カゼインではなくホエイタンパク質（アルブミンなど）が主成分となり、脂肪分が低く非常に軽い口当たりになる。",classification:"Fromage à pâte fraîche（フレッシュタイプ / 乳清チーズ）",logic:"AOP Protected / Whey cheese",chef_note:"賞味期限が数日しかないため、地元以外では新鮮なものを食べるのが難しい幻のチーズ。"},{id:"ing_maroilles",number:"17",name_fr:"Maroilles",name_en:"Maroilles",name_ja:"マロワル",region:"Hauts-de-France (Pas-de-Calais, Nord)",pin:{x:60,y:30},properties:{saltiness:"★★★☆☆",aroma:"★★★★★",rarity:"★★★★☆"},cooking:"フラミッシュ（Flamiche: チーズタルト）、ソース",science:"塩水で定期的に洗いながら熟成させることで赤色細菌が繁殖。これにより強烈なアンモニア臭を発するが、内部のタンパク質は完全に分解され極めて滑らかになる。",classification:"Fromage à pâte molle à croûte lavée（ウォッシュタイプ）",logic:"AOP Protected / Square washed rind",chef_note:"北フランスの修道院で作られ始めた歴史あるチーズ。ビールとの相性が抜群。"},{id:"ing_roquefort",number:"18",name_fr:"Roquefort",name_en:"Roquefort (Blue cheese)",name_ja:"ロックフォール",region:"Occitanie (Aveyron)",pin:{x:50,y:75},properties:{saltiness:"★★★★★",aroma:"★★★★★",rarity:"★★☆☆☆"},cooking:"そのまま、ステーキソース（Sauce Roquefort）、サラダのトッピング",science:"ラコーヌ種の羊乳から作られ、コンバルー山の洞窟内に生息する青カビ（Penicillium roqueforti）によって熟成。青カビのリパーゼが脂肪を分解し、強い刺激とコクを生む。",classification:"Fromage à pâte persillée（青カビタイプ）",logic:"AOP Protected / Sheep's milk cheese",chef_note:"甘口貴腐ワインのソーテルヌ（Sauternes）と合わせるのが古典フランス料理の最高の「マリアージュ」。"},{id:"ing_rocamadour",number:"19",name_fr:"Rocamadour",name_en:"Rocamadour",name_ja:"ロカマドゥール",region:"Occitanie (Lot)",pin:{x:45,y:72},properties:{saltiness:"★★☆☆☆",aroma:"★★★☆☆",rarity:"★★★★☆"},cooking:"そのまま、サラダ",science:"非常に小さな円盤型の山羊乳チーズ。熟成期間が1〜2週間と短いため、酸味は穏やかで内部はクリームのように滑らかなテクスチャーを保持している。",classification:"Fromage de chèvre（山羊乳タイプ）",logic:"AOP Protected / Small soft goat cheese",chef_note:"一口サイズで食べやすい。熟成が若いうちに食べるのがおすすめ。"},{id:"ing_munster",number:"20",name_fr:"Munster (Munster-Géromé)",name_en:"Munster",name_ja:"マンステール",region:"Alsace / Lorraine",pin:{x:80,y:40},properties:{saltiness:"★★★☆☆",aroma:"★★★★★",rarity:"★★★☆☆"},cooking:"そのまま、茹でたジャガイモに添えて、クミンシードをまぶす",science:"高温多湿な環境でウォッシュ（塩水洗い）されるため、リネンス菌の働きが非常に活発。特有の納豆や強い発酵臭を持つが、口溶けは驚くほど良い。",classification:"Fromage à pâte molle à croûte lavée（ウォッシュタイプ）",logic:"AOP Protected / Washed rind",chef_note:"アルザスワイン（ゲヴュルツトラミネール）と合わせるのが鉄板。クミンを散らすと香りが調和する。"},{id:"ing_banon",number:"21",name_fr:"Banon",name_en:"Banon",name_ja:"バノン",region:"Provence",pin:{x:75,y:80},properties:{saltiness:"★★★☆☆",aroma:"★★★★☆",rarity:"★★★★☆"},cooking:"そのまま",science:"山羊乳チーズを栗の葉で包み、ラフィア（ヤシの繊維）で縛って熟成。葉から移行するタンニンや香気成分が、チーズの脂肪分の酸化を抑えつつ独特の風味を付与する。",classification:"Fromage de chèvre（山羊乳タイプ）",logic:"AOP Protected / Leaf-wrapped",chef_note:"栗の葉の香りと強めの酸味、とろける食感が特徴。"},{id:"ing_vache_qui_rit",number:"22",name_fr:"La Vache qui rit",name_en:"The Laughing Cow",name_ja:"ラ・ヴァシュ・キ・リ（笑う牛）",region:"Générique (Processed)",pin:{x:50,y:50},properties:{saltiness:"★★★☆☆",aroma:"★☆☆☆☆",rarity:"★☆☆☆☆"},cooking:"そのまま（スナック）、パンに塗る、スープのコク出し",science:"複数のナチュラルチーズ（コンテやエメンタールなど）を加熱溶解し、乳化剤を添加して均一に混ぜ合わせたプロセスチーズ。微生物が死滅しているため保存性が極めて高い。",classification:"Fromage fondu（プロセスチーズ）",logic:"Industrial / Pasteurized / Emulsified",chef_note:"ポタージュスープの最後に溶かし込むと、簡単にクリーミーさとコクを足すことができる。"},{id:"ing_boursin",number:"23",name_fr:"Boursin",name_en:"Boursin",name_ja:"ブルサン",region:"Générique (Industrial Fresh Cheese)",pin:{x:50,y:50},properties:{saltiness:"★★★☆☆",aroma:"★★★☆☆",rarity:"★☆☆☆☆"},cooking:"そのまま、クラッカーに乗せる、パスタソース",science:"加熱殺菌した牛乳とクリームから作るフレッシュチーズに、ガーリックやハーブを練り込んだもの。乳酸発酵による爽やかな酸味と脂肪分のリッチな口どけが特徴。",classification:"Fromage frais aromatisé（ハーブ・スパイス入りフレッシュタイプ）",logic:"Industrial / Garlic & Fine Herbs",chef_note:"アペリティフ（食前酒）のお供として非常にポピュラー。生クリーム代わりにソースに溶かしても使える。"}],Qe=[{id:"ing_vin_rouge",number:"1",name_fr:"Vin rouge",name_en:"Red Wine",name_ja:"ヴァン・ルージュ（赤ワイン）",region:"Générique",pin:{x:45,y:35},properties:{type:"赤ワイン",sweetness:"★☆☆☆☆",alcohol:"★★★☆☆",body:"★★★☆☆"},cooking:"赤ワインソース、デグラサージュ、マリネ液、煮込み（ボルドレーズ、ブルギニョン）",science:"ブドウの果皮や種子を一緒に発酵させるため、ポリフェノール化合物（タンニン）が多く溶け込んでいる。タンニンが肉のタンパク質と結合して凝集するため、脂っぽさを引き締め、肉質を柔らかく感じさせる。",classification:"Ingrédient liquide aromatique",logic:"Deglazing / Meat tenderizer / Color agent",chef_note:"料理に使うワインは「飲むのと同じ品質のもの」を使うこと。酸味と渋みが加熱で凝縮されるため、安物の粗悪なワインは仕上がりを壊す。"},{id:"ing_vin_blanc",number:"2",name_fr:"Vin blanc",name_en:"White Wine",name_ja:"ヴァン・ブラン（白ワイン）",region:"Générique",pin:{x:55,y:35},properties:{type:"白ワイン",sweetness:"★☆☆☆☆",alcohol:"★★★☆☆",body:"★★☆☆☆"},cooking:"白ワインソース、魚のポシェ（コルトン・ブイヨン）、デグラサージュ",science:"ブドウをすぐに搾汁し皮などを除いて発酵させるため、タンニンは少なく、リンゴ酸や酒石酸などの豊かな有機酸が主体。この酸が魚介の生臭さ成分（アミン）を中和し、すっきりとした爽やかさと旨味を与える。",classification:"Ingrédient liquide aromatique",logic:"Deglazing / Acidity balancer",chef_note:"エシャロット、キノコをバターで炒めたフライパンを白ワインでデグラセし、煮詰めてクリームを加えるだけで、クラシックな万能ソースが完成する。"},{id:"ing_bordeaux_medoc",number:"3",name_fr:"Médoc",name_en:"Médoc Red",name_ja:"メドック",region:"Bordeaux (Médoc)",pin:{x:28,y:58},properties:{type:"赤ワイン",sweetness:"★☆☆☆☆",alcohol:"★★★★☆",body:"★★★★★"},cooking:"牛肉のロースト、ソース・ボルドレーズ",science:"カベルネ・ソーヴィニヨン主体。骨格のしっかりした豊富なタンニンが赤身肉のタンパク質と強く結びつき、脂の強さを中和する。",classification:"AOC Médoc (Vin rouge)",logic:"High Tannin / Protein binding",chef_note:"ボルドーの王道。濃厚な肉料理やシャロレ牛のステーキと合わせるのが定石。"},{id:"ing_bordeaux_graves",number:"4",name_fr:"Graves",name_en:"Graves",name_ja:"グラーヴ",region:"Bordeaux (Graves)",pin:{x:30,y:62},properties:{type:"赤ワイン / 白ワイン",sweetness:"★☆☆☆☆",alcohol:"★★★☆☆",body:"★★★★☆"},cooking:"仔牛のソテー（赤）、白身魚のグリル（白）",science:"砂利質土壌由来のミネラル感とスモーキーな香りが特徴。赤はエレガントなタンニンを持ち、白はソーヴィニヨン・ブランの爽やかな酸と樽香が調和する。",classification:"AOC Graves (Vin rouge / Vin blanc)",logic:"Mineral & Smoky complexity",chef_note:"赤白ともに高品質。料理の汎用性が高く、ロースト料理によく馴染む。"},{id:"ing_bordeaux_st_emilion",number:"5",name_fr:"Saint-Émilion",name_en:"Saint-Émilion",name_ja:"サン・テミリオン",region:"Bordeaux (Saint-Émilion)",pin:{x:34,y:60},properties:{type:"赤ワイン",sweetness:"★☆☆☆☆",alcohol:"★★★★☆",body:"★★★★☆"},cooking:"鴨のコンフィ、ジビエ料理",science:"メルロー主体。タンニンが滑らかで果実味が豊かであり、ソースに煮詰めるとビロードのような口当たりとプラムのような甘いコクを生む。",classification:"AOC Saint-Émilion (Vin rouge)",logic:"Smooth Tannin / Fruit forward",chef_note:"メドックより柔らかくふくよか。ソースのベースにすると丸みのある仕上がりになる。"},{id:"ing_bordeaux_pomerol",number:"6",name_fr:"Pomerol",name_en:"Pomerol",name_ja:"ポムロール",region:"Bordeaux (Pomerol)",pin:{x:33,y:59},properties:{type:"赤ワイン",sweetness:"★☆☆☆☆",alcohol:"★★★★☆",body:"★★★★★"},cooking:"トリュフを使った肉料理",science:"粘土質土壌で育つ極上のメルローから作られ、熟成によりトリュフや腐葉土の土着的なアロマ成分（Terroir）が強まる。",classification:"AOC Pomerol (Vin rouge)",logic:"Earthy aromatics / High Merlot",chef_note:"官能的でトリュフとの相性が抜群。ペリグーソースに少し加えると香りが爆発する。"},{id:"ing_bordeaux_sauternes",number:"7",name_fr:"Sauternes",name_en:"Sauternes",name_ja:"ソーテルヌ",region:"Bordeaux (Sauternes)",pin:{x:31,y:64},properties:{type:"白ワイン",sweetness:"★★★★★",alcohol:"★★★★☆",body:"★★★★★"},cooking:"フォアグラのテリーヌ、ソースの隠し味、デザート",science:"貴腐菌（Botrytis cinerea）によりブドウの水分が蒸発し、糖分とグリセリンが極度に濃縮。特有の蜂蜜やアプリコットの芳香（ソトロンなど）を持つ。",classification:"AOC Sauternes (Vin blanc liquoreux)",logic:"Botrytis / High residual sugar",chef_note:"フォアグラの脂の甘みとソーテルヌの酸味・甘味のペアリングはフランス料理界の究極のマリアージュ。"},{id:"ing_bourgogne_chablis",number:"8",name_fr:"Chablis",name_en:"Chablis",name_ja:"シャブリ",region:"Bourgogne (Chablis)",pin:{x:56,y:40},properties:{type:"白ワイン",sweetness:"★☆☆☆☆",alcohol:"★★★☆☆",body:"★★☆☆☆"},cooking:"生牡蠣、甲殻類のマリネ、チーズ（エポワス）",science:"キンメリジャン土壌（小さな牡蠣の化石を含む石灰質）由来の豊富なミネラル（カルシウムやマグネシウム）と鋭い酸味が、生魚や貝類の臭みを断ち切る。",classification:"AOC Chablis (Vin blanc sec)",logic:"High Minerality / Malic acid",chef_note:"樽香をつけないステンレスタンク発酵のものは、特に牡蠣との相性が完璧。"},{id:"ing_bourgogne_cotes_de_nuits",number:"9",name_fr:"Côte de Nuits",name_en:"Côte de Nuits",name_ja:"コート・ド・ニュイ",region:"Bourgogne (Côte de Nuits)",pin:{x:62,y:46},properties:{type:"赤ワイン",sweetness:"★☆☆☆☆",alcohol:"★★★☆☆",body:"★★★☆☆"},cooking:"ブッフ・ブルギニョン、コック・オー・ヴァン",science:"世界最高峰のピノ・ノワール産地。タンニンは繊細だが、酸味とアミノ酸（旨味成分）のバランスが絶妙で、煮込み料理に深いコクと透明感を与える。",classification:"AOC Côte de Nuits (Vin rouge)",logic:"Elegant acidity / Umami enhancer",chef_note:"ブルゴーニュの赤ワイン煮込みには、この地域のピノ・ノワールを使うのが本場の手法。"},{id:"ing_bourgogne_cotes_de_beaune",number:"10",name_fr:"Côte de Beaune",name_en:"Côte de Beaune",name_ja:"コート・ド・ボーヌ",region:"Bourgogne (Côte de Beaune)",pin:{x:61,y:48},properties:{type:"白ワイン / 赤ワイン",sweetness:"★☆☆☆☆",alcohol:"★★★☆☆",body:"★★★★☆"},cooking:"鶏肉のクリーム煮、オマール海老のソース",science:"芳醇なシャルドネの聖地。マロラクティック発酵による乳酸のまろやかさとオーク樽由来のバニラ香（バニリン）が、バターや生クリームと見事に同化する。",classification:"AOC Côte de Beaune (Vin blanc / Vin rouge)",logic:"Malolactic fermentation / Oak aging",chef_note:"濃厚なクリームソースのデグラサージュには、ここのリッチな白ワインが最高。"},{id:"ing_bourgogne_chalonnaise",number:"11",name_fr:"Côte Chalonnaise",name_en:"Côte Chalonnaise",name_ja:"コート・シャロネーズ",region:"Bourgogne (Côte Chalonnaise)",pin:{x:60,y:51},properties:{type:"赤ワイン / 白ワイン",sweetness:"★☆☆☆☆",alcohol:"★★★☆☆",body:"★★★☆☆"},cooking:"シャルキュトリー、エスカルゴ（アリゴテ）",science:"ピノ・ノワールとシャルドネに加え、酸の強いアリゴテ種も栽培される。カシスなどのフレッシュな果実味が特徴。",classification:"AOC Côte Chalonnaise",logic:"Fruit forward / Crisp acidity",chef_note:"アリゴテはカシスリキュールと割って「キール（Kir）」にするのが定番。"},{id:"ing_bourgogne_maconnais",number:"12",name_fr:"Mâconnais",name_en:"Mâconnais",name_ja:"マコネ",region:"Bourgogne (Mâconnais)",pin:{x:59,y:54},properties:{type:"白ワイン",sweetness:"★☆☆☆☆",alcohol:"★★★☆☆",body:"★★★☆☆"},cooking:"豚肉のロースト、白身魚のバターソテー",science:"温暖な気候で育つシャルドネは、パイナップルやピーチなどのトロピカルなエステル香を豊富に含み、ふくよかな味わいを持つ。",classification:"AOC Mâconnais (Vin blanc)",logic:"Tropical esters / Ripe fruit",chef_note:"プイィ・フュイッセなどの銘醸地を含む。コスパが良くビストロ料理に最適。"},{id:"ing_champagne_reims",number:"13",name_fr:"Montagne de Reims",name_en:"Montagne de Reims Champagne",name_ja:"シャンパーニュ（モンターニュ・ド・ランス）",region:"Champagne (Montagne de Reims)",pin:{x:58,y:22},properties:{type:"スパークリング",sweetness:"★☆☆☆☆",alcohol:"★★☆☆☆",body:"★★★☆☆"},cooking:"アペリティフ、キャビア、肉のカルパッチョ",science:"ピノ・ノワール（黒ブドウ）の比率が高く、アントシアニンは含まれないが、果皮由来のボディと豊かなアミノ酸により骨格のしっかりしたシャンパンとなる。",classification:"AOC Champagne",logic:"Pinot Noir dominant / Full body",chef_note:"力強い味わいなので、魚介だけでなく白身肉の料理とも合わせられる。"},{id:"ing_champagne_marne",number:"14",name_fr:"Vallée de la Marne",name_en:"Vallée de la Marne Champagne",name_ja:"シャンパーニュ（ヴァレ・ド・ラ・マルヌ）",region:"Champagne (Vallée de la Marne)",pin:{x:60,y:25},properties:{type:"スパークリング",sweetness:"★☆☆☆☆",alcohol:"★★☆☆☆",body:"★★★☆☆"},cooking:"フルーツタルト、パテ・ド・カンパーニュ",science:"ピノ・ムニエ主体。フルーティーでしなやかな酸と豊かな果実味が特徴で、若いうちから親しみやすい風味成分を形成する。",classification:"AOC Champagne",logic:"Pinot Meunier dominant / Fruity",chef_note:"親しみやすく、前菜全般をカバーする懐の広さがある。"},{id:"ing_champagne_blancs",number:"15",name_fr:"Côte des Blancs",name_en:"Côte des Blancs Champagne",name_ja:"シャンパーニュ（コート・デ・ブラン）",region:"Champagne (Côte des Blancs)",pin:{x:61,y:27},properties:{type:"スパークリング",sweetness:"★☆☆☆☆",alcohol:"★★☆☆☆",body:"★★☆☆☆"},cooking:"生牡蠣、ホタテのカルパッチョ",science:"シャルドネ（白ブドウ）のみを使用（ブラン・ド・ブラン）。白亜質土壌からくる鋭いミネラルとシャープな酒石酸が際立ち、長期熟成で複雑なブリオッシュ香（酵母由来）を放つ。",classification:"AOC Champagne (Blanc de Blancs)",logic:"Chardonnay dominant / Minerality",chef_note:"極めてエレガント。繊細な魚介料理の味を一切邪魔しない。"},{id:"ing_champagne_bar",number:"16",name_fr:"Côte des Bar",name_en:"Côte des Bar Champagne",name_ja:"シャンパーニュ（コート・デ・バール）",region:"Champagne (Côte des Bar)",pin:{x:64,y:30},properties:{type:"スパークリング",sweetness:"★☆☆☆☆",alcohol:"★★☆☆☆",body:"★★★☆☆"},cooking:"チーズ（シャウルス）、シャルキュトリー",science:"ブルゴーニュに近い南部エリア。ピノ・ノワール主体で、よりリッチで太陽を感じさせる果実の成熟度（高い糖度からのアルコール感）を持つ。",classification:"AOC Champagne",logic:"Southern terroir / Rich fruit",chef_note:"地元の白カビチーズ「シャウルス」とのペアリングが定番。"},{id:"ing_rhone_cote_rotie",number:"17",name_fr:"Côte-Rôtie",name_en:"Côte-Rôtie",name_ja:"コート・ロティ",region:"Vallée du Rhône (Rhône Nord - Côte-Rôtie)",pin:{x:66,y:60},properties:{type:"赤ワイン",sweetness:"★☆☆☆☆",alcohol:"★★★☆☆",body:"★★★★☆"},cooking:"ジビエ、仔羊のロースト",science:"シラーに少量のヴィオニエ（白ブドウ）を混醸する独特の製法。ヴィオニエのテルペン類（花のような香り）がシラーの胡椒香（ロトンディン）とスパイシーさを中和し、華やかさを付与する。",classification:"AOC Côte-Rôtie (Vin rouge)",logic:"Co-fermentation / Floral & Spicy",chef_note:"「焼かれた丘」の名の通り日照が強く、力強いがヴィオニエのおかげで非常にエレガント。"},{id:"ing_rhone_hermitage",number:"18",name_fr:"Hermitage",name_en:"Hermitage",name_ja:"エルミタージュ",region:"Vallée du Rhône (Rhône Nord - Hermitage)",pin:{x:67,y:64},properties:{type:"赤ワイン / 白ワイン",sweetness:"★☆☆☆☆",alcohol:"★★★★☆",body:"★★★★★"},cooking:"牛肉の赤ワイン煮、熟成肉",science:"急斜面の花崗岩土壌で育つシラー。タンニンとアントシアニンが極めて濃密で、長期熟成により皮革や黒オリーブのような複雑なブーケを形成する。",classification:"AOC Hermitage (Vin rouge / Vin blanc)",logic:"Granite soil / Long aging potential",chef_note:"ローヌ最高峰の赤。重厚でスパイシーなソースに負けない骨格を持つ。"},{id:"ing_rhone_condrieu",number:"19",name_fr:"Condrieu",name_en:"Condrieu",name_ja:"コンドリュー",region:"Vallée du Rhône (Rhône Nord - Condrieu)",pin:{x:66,y:62},properties:{type:"白ワイン",sweetness:"★☆☆☆☆",alcohol:"★★★★☆",body:"★★★★☆"},cooking:"フォアグラ、アスパラガス、オマール海老",science:"ヴィオニエ種100%。桃やアプリコット、白い花を思わせる非常に強いアロマ（テルペン類とエステル類）と、酸味が穏やかでオイリーなテクスチャーを持つ。",classification:"AOC Condrieu (Vin blanc)",logic:"Viognier / High aromatics",chef_note:"香りが圧倒的。ソースを使わないシンプルな甲殻類のグリルに華やかさを添える。"},{id:"ing_rhone_chateauneuf",number:"20",name_fr:"Châteauneuf-du-Pape",name_en:"Châteauneuf-du-Pape",name_ja:"シャトーヌフ・デュ・パプ",region:"Vallée du Rhône (Rhône Sud - Châteauneuf-du-Pape)",pin:{x:69,y:72},properties:{type:"赤ワイン / 白ワイン",sweetness:"★☆☆☆☆",alcohol:"★★★★★",body:"★★★★★"},cooking:"カスレ、スパイスを効かせた肉料理",science:"丸石（ガレ）が日中の熱を蓄える土壌。最大13品種のブドウをブレンド可能。グルナッシュ由来の高アルコールと甘苦いスパイス香が、複雑な化学反応のレイヤーを生む。",classification:"AOC Châteauneuf-du-Pape (Vin rouge / Vin blanc)",logic:"Multi-grape blend / High alcohol",chef_note:"南ローヌの王様。ハーブやスパイスを多用したプロヴァンス風の煮込み料理に最適。"},{id:"ing_rhone_gigondas",number:"21",name_fr:"Gigondas",name_en:"Gigondas",name_ja:"ジゴンダス",region:"Vallée du Rhône (Rhône Sud - Gigondas)",pin:{x:71,y:71},properties:{type:"赤ワイン / ロゼ",sweetness:"★☆☆☆☆",alcohol:"★★★★☆",body:"★★★★☆"},cooking:"ジビエ、赤身肉のグリル",science:"シャトーヌフに似るが標高が高く、昼夜の寒暖差によりグルナッシュに良質な酸と野性味（ガリーグの香り）が残る。",classification:"AOC Gigondas (Vin rouge / Vin rosé)",logic:"High altitude / Wild herbs (Garrigue)",chef_note:"力強さとスパイシーさが特徴。胡椒を効かせたステーキとよく合う。"},{id:"ing_rhone_vacqueyras",number:"22",name_fr:"Vacqueyras",name_en:"Vacqueyras",name_ja:"ヴァケラス",region:"Vallée du Rhône (Rhône Sud - Vacqueyras)",pin:{x:70,y:72},properties:{type:"赤ワイン / 白ワイン / ロゼ",sweetness:"★☆☆☆☆",alcohol:"★★★★☆",body:"★★★★☆"},cooking:"バーベキュー、ラタトゥイユ",science:"シラーの比率がやや高く、黒系果実とペッパーの香りが前面に出る。タンニンが豊富で骨太な構造を持つ。",classification:"AOC Vacqueyras (Vin rouge / Vin blanc / Vin rosé)",logic:"Robust structure / Syrah influence",chef_note:"ジゴンダスより少し素朴で力強い。肉のグリルなど豪快な料理向け。"},{id:"ing_loire_nantes",number:"23",name_fr:"Muscadet (Nantes)",name_en:"Muscadet",name_ja:"ミュスカデ（ナント）",region:"Loire (Nantes)",pin:{x:22,y:44},properties:{type:"白ワイン",sweetness:"★☆☆☆☆",alcohol:"★★☆☆☆",body:"★☆☆☆☆"},cooking:"生牡蠣、ムール貝の白ワイン蒸し",science:"シュール・リー製法（澱の上で熟成）により、酵母の自己融解によるアミノ酸とペプチドがワインに溶け込み、旨味と微炭酸の爽やかさを与える。",classification:"AOC Muscadet (Vin blanc sec)",logic:"Sur Lie aging / High acidity",chef_note:"ロワール川河口のワイン。磯の香りがする魚介類を洗うように流し込むのに最適。"},{id:"ing_loire_anjou",number:"24",name_fr:"Anjou",name_en:"Anjou",name_ja:"アンジュー",region:"Loire (Anjou)",pin:{x:30,y:43},properties:{type:"ロゼ / 白ワイン / 赤ワイン",sweetness:"★★★☆☆",alcohol:"★★☆☆☆",body:"★★☆☆☆"},cooking:"豚肉のリエット、アジア系スパイス料理（ロゼ）",science:"やや甘口のロゼ（ロゼ・ダンジュー）が有名。シュナン・ブラン主体の白は、リンゴ酸のフレッシュさとほのかな残糖のバランスが良い。",classification:"AOC Anjou (Vin rosé / Vin blanc / Vin rouge)",logic:"Versatile / Residual sugar (Rosé)",chef_note:"ロゼは甘みがあるため、エスニック料理やスパイスを使った前菜と合わせやすい。"},{id:"ing_loire_saumur",number:"25",name_fr:"Saumur",name_en:"Saumur",name_ja:"ソミュール",region:"Loire (Saumur)",pin:{x:34,y:44},properties:{type:"赤ワイン / 白ワイン / スパークリング",sweetness:"★☆☆☆☆",alcohol:"★★★☆☆",body:"★★☆☆☆"},cooking:"鶏肉のロースト、マッシュルーム料理",science:"石灰岩（テュフォー）土壌。カベルネ・フランの赤はピーマンのようなピラジン香を持ち、白やスパークリング（クレマン）はミネラル感が強い。",classification:"AOC Saumur (Vin rouge / Vin blanc / Effervescent)",logic:"Tuffeau limestone / Pyrazine notes",chef_note:"ソミュール・シャンピニー（赤）は軽く冷やして飲むと、軽快な果実味が引き立つ。"},{id:"ing_loire_touraine",number:"26",name_fr:"Touraine",name_en:"Touraine",name_ja:"トゥーレーヌ",region:"Loire (Touraine)",pin:{x:38,y:45},properties:{type:"白ワイン / 赤ワイン",sweetness:"★☆☆☆☆",alcohol:"★★☆☆☆",body:"★★☆☆☆"},cooking:"山羊のチーズ（サント・モール）、川魚のソテー",science:"ソーヴィニヨン・ブランのチオール類（パッションフルーツやグレープフルーツの香り）が豊かで、フレッシュな酸が山羊乳チーズの脂肪をすっきりと流す。",classification:"AOC Touraine (Vin blanc / Vin rouge)",logic:"Crisp Sauvignon / Thiol aromatics",chef_note:"地元のシェーブルチーズとのマリアージュはフランスの基本中の基本。"},{id:"ing_loire_sancerre",number:"27",name_fr:"Sancerre",name_en:"Sancerre",name_ja:"サンセール（サンセロワ）",region:"Loire (Sancerrois)",pin:{x:48,y:46},properties:{type:"白ワイン / 赤ワイン",sweetness:"★☆☆☆☆",alcohol:"★★★☆☆",body:"★★☆☆☆"},cooking:"クロタン・ド・シャヴィニョル、白身魚のハーブ焼き",science:"シレックス（火打石）土壌由来の還元的な香り（スモーキーさ）と鋭角な酸味。ソーヴィニヨン・ブランのポテンシャルを極限まで引き出したクリーンな味わい。",classification:"AOC Sancerre (Vin blanc / Vin rouge)",logic:"Silex soil / Flinty minerality",chef_note:"ハーブを使った料理や、レモンを絞りたくなるような魚介料理にレモンの代わりに合わせる。"},{id:"ing_alsace_bas_rhin",number:"28",name_fr:"Alsace (Bas-Rhin)",name_en:"Alsace (Bas-Rhin)",name_ja:"アルザス（バ＝ラン）",region:"Alsace (Bas-Rhin)",pin:{x:84,y:26},properties:{type:"白ワイン",sweetness:"★☆☆☆☆",alcohol:"★★★☆☆",body:"★★☆☆☆"},cooking:"シュークルート、タルト・フランベ",science:"寒冷な気候で育つリースリングやシルヴァネールは、リンゴ酸主体の鋭い酸と純度の高い果実味（モノテルペン類）を持ち、豚肉の脂っこさを中和する。",classification:"AOC Alsace (Vin blanc)",logic:"Cool climate / Pure aromatics",chef_note:"アルザス北部は軽快でフレッシュなスタイルが多い。郷土料理のシュークルートに欠かせない。"},{id:"ing_alsace_haut_rhin",number:"29",name_fr:"Alsace (Haut-Rhin)",name_en:"Alsace Grand Cru (Haut-Rhin)",name_ja:"アルザス（オー＝ラン）",region:"Alsace (Haut-Rhin)",pin:{x:82,y:32},properties:{type:"白ワイン",sweetness:"★★☆☆☆",alcohol:"★★★★☆",body:"★★★★☆"},cooking:"フォアグラ、マンステールチーズ、スパイシーな料理",science:"より日照条件が良い南部。ゲヴュルツトラミネールのライチやバラの香気成分（ゲラニオールなど）が極めて高く、スパイシーさとオイリーなテクスチャーを持つ。",classification:"AOC Alsace Grand Cru (Vin blanc)",logic:"Rich aromatics / Full body white",chef_note:"グラン・クリュが多く集まる。マンステールチーズ（ウォッシュタイプ）との組み合わせは絶品。"},{id:"ing_provence_cotes",number:"30",name_fr:"Côtes de Provence",name_en:"Côtes de Provence",name_ja:"コート・ド・プロヴァンス",region:"Provence (Côtes de Provence)",pin:{x:74,y:78},properties:{type:"ロゼ",sweetness:"★☆☆☆☆",alcohol:"★★★☆☆",body:"★★☆☆☆"},cooking:"ブイヤベース、ニース風サラダ",science:"ダイレクトプレス製法による淡いサーモンピンク色のロゼ。アントシアニン抽出を抑えつつ、グルナッシュやサンソーのフレッシュな酸味と海風由来の塩味を残す。",classification:"AOC Côtes de Provence (Vin rosé)",logic:"Direct press / Pale rosé",chef_note:"地中海料理全般に合う万能ワイン。しっかりと冷やしてニンニクやオリーブオイルを使った料理と。"},{id:"ing_provence_bandol",number:"31",name_fr:"Bandol",name_en:"Bandol",name_ja:"バンドール",region:"Provence (Bandol)",pin:{x:72,y:82},properties:{type:"赤ワイン / ロゼ",sweetness:"★☆☆☆☆",alcohol:"★★★★☆",body:"★★★★★"},cooking:"仔羊の香草焼き、ジビエ",science:"ムールヴェードル種主体。厚い果皮からの豊富なタンニンと高いアルコール度数を持ち、長期熟成によりなめし革やスパイスの複雑な香気を放つ。",classification:"AOC Bandol (Vin rouge / Vin rosé)",logic:"Mourvèdre dominant / Powerful structure",chef_note:"プロヴァンス随一の力強い赤。ロゼも骨格がしっかりしており、食事を通して楽しめる。"},{id:"ing_provence_cassis",number:"32",name_fr:"Cassis",name_en:"Cassis",name_ja:"カシ",region:"Provence (Cassis)",pin:{x:70,y:81},properties:{type:"白ワイン",sweetness:"★☆☆☆☆",alcohol:"★★★☆☆",body:"★★★☆☆"},cooking:"ウニ、地中海の白身魚",science:"石灰質土壌で育つマルサンヌやクレレット（白ブドウ）。海からの湿った風により、ワインにヨード（塩分）のニュアンスと豊かなミネラルが溶け込む。",classification:"AOC Cassis (Vin blanc)",logic:"Limestone / Iodine notes",chef_note:"プロヴァンスでは珍しく白ワインが有名。ブイヤベースには赤やロゼよりカシの白を推すシェフも多い。"},{id:"ing_languedoc",number:"33",name_fr:"Languedoc",name_en:"Languedoc",name_ja:"ラングドック",region:"Languedoc-Roussillon (Languedoc)",pin:{x:48,y:76},properties:{type:"赤ワイン",sweetness:"★☆☆☆☆",alcohol:"★★★★☆",body:"★★★★☆"},cooking:"カスレ、肉の煮込み",science:"地中海性気候の豊富な日照により糖度が上がり、アルコール度数の高い力強い果実味が形成される。シラー、グルナッシュ、カリニャンのブレンドが主流。",classification:"AOC Languedoc (Vin rouge)",logic:"Sun-drenched / High extract",chef_note:"南仏の太陽を感じる濃密な赤。コストパフォーマンスに優れ、日常の肉料理に合わせやすい。"},{id:"ing_corbieres",number:"34",name_fr:"Corbières",name_en:"Corbières",name_ja:"コルビエール",region:"Languedoc-Roussillon (Corbières)",pin:{x:44,y:80},properties:{type:"赤ワイン",sweetness:"★☆☆☆☆",alcohol:"★★★★☆",body:"★★★★☆"},cooking:"ジビエ、ソーセージのグリル",science:"カリニャン種をマロラクティック発酵やマセラシオン・カルボニック（炭酸ガス浸漬法）で処理し、荒々しいタンニンを抑えつつ鮮やかな色素とベリー香を引き出す。",classification:"AOC Corbières (Vin rouge)",logic:"Carignan / Carbonic maceration",chef_note:"野生のハーブ（ガリーグ）の香りが強く、野趣あふれる肉料理と相乗効果を生む。"},{id:"ing_minervois",number:"35",name_fr:"Minervois",name_en:"Minervois",name_ja:"ミネルヴォワ",region:"Languedoc-Roussillon (Minervois)",pin:{x:45,y:78},properties:{type:"赤ワイン",sweetness:"★☆☆☆☆",alcohol:"★★★★☆",body:"★★★★☆"},cooking:"鴨のロースト、黒オリーブのタプナード",science:"シラーの比率が高めになることが多く、コルビエールよりもタンニンが滑らかで、スミレの花やブラックベリーの凝縮したアロマを持つ。",classification:"AOC Minervois (Vin rouge)",logic:"Smooth tannin / Syrah blend",chef_note:"口当たりがビロードのように滑らか。濃いソースの鴨料理によく合う。"},{id:"ing_roussillon",number:"36",name_fr:"Roussillon (Banyuls)",name_en:"Roussillon / Banyuls",name_ja:"ルーション（バニュルス）",region:"Languedoc-Roussillon (Roussillon)",pin:{x:42,y:83},properties:{type:"赤ワイン",sweetness:"★★★★★",alcohol:"★★★★★",body:"★★★★★"},cooking:"チョコレートデザート、ブルーチーズ",science:"発酵途中にアルコールを添加して発酵を止める（ミュタージュ）。ブドウの天然の糖分が残り、酸化熟成によるナッツやドライフルーツ、カカオの香気成分が生じる。",classification:"AOC Banyuls (Vin Doux Naturel)",logic:"Mutage / Oxidative aging",chef_note:"チョコレートとのペアリングが成立する数少ないワイン。食後酒として最適。"},{id:"ing_sud_ouest_cahors",number:"37",name_fr:"Cahors",name_en:"Cahors",name_ja:"カオール",region:"Sud-Ouest (Cahors)",pin:{x:38,y:70},properties:{type:"赤ワイン",sweetness:"★☆☆☆☆",alcohol:"★★★★☆",body:"★★★★★"},cooking:"鴨のコンフィ、トリュフ料理",science:"マルベック（コット）種主体。「黒ワイン」と呼ばれるほどアントシアニン（色素）とタンニンが極めて濃く、長期熟成で重厚なタンパク質との親和性を発揮する。",classification:"AOC Cahors (Vin rouge)",logic:"Malbec / Extreme pigmentation",chef_note:"非常に濃厚で力強い。南西地方の脂肪分豊かな郷土料理（鴨、フォアグラ）を洗い流す。"},{id:"ing_sud_ouest_madiran",number:"38",name_fr:"Madiran",name_en:"Madiran",name_ja:"マディラン",region:"Sud-Ouest (Madiran)",pin:{x:32,y:76},properties:{type:"赤ワイン",sweetness:"★☆☆☆☆",alcohol:"★★★★☆",body:"★★★★★"},cooking:"カスレ、牛ステーキ",science:"タナ種（Tannat）。その名の通りタンニンが非常に豊富。ミクロ・ビュラージュ（微量酸素供給）技術により、強靭なタンニンを重合させ柔らかくする手法が取られる。",classification:"AOC Madiran (Vin rouge)",logic:"High Tannin / Micro-oxygenation",chef_note:"若いうちは渋みが強いが、熟成すると素晴らしい骨格を見せる。肉の脂身と完璧に調ンダ調和する。"},{id:"ing_sud_ouest_jurancon",number:"39",name_fr:"Jurançon",name_en:"Jurançon",name_ja:"ジュランソン",region:"Sud-Ouest (Jurançon)",pin:{x:30,y:80},properties:{type:"白ワイン",sweetness:"★★★★★",alcohol:"★★★★☆",body:"★★★★☆"},cooking:"フォアグラのポワレ、ブルーチーズ",science:"プティ・マンサン種。晩摘み（パスリヤージュ）により水分を蒸発させ糖度を凝縮。貴腐菌に頼らずとも高い糖度と、それを支える非常に強靭な酒石酸（酸味）を保持する。",classification:"AOC Jurançon (Vin blanc doux)",logic:"Late harvest / High acid & sugar",chef_note:"ソーテルヌとは異なる、パイナップルやマンゴーのようなトロピカルな甘口。酸があるためベタつかない。"},{id:"ing_sud_ouest_bergerac",number:"40",name_fr:"Bergerac",name_en:"Bergerac",name_ja:"ベルジュラック",region:"Sud-Ouest (Bergerac)",pin:{x:34,y:66},properties:{type:"赤ワイン / 白ワイン",sweetness:"★☆☆☆☆",alcohol:"★★★☆☆",body:"★★★☆☆"},cooking:"赤身肉のグリル、豚肉のソテー",science:"ボルドーに隣接し、同じブドウ品種（カベルネ、メルロー）を使用。ボルドーより内陸のため昼夜の寒暖差があり、果実味がやや前面に出た親しみやすいバランスになる。",classification:"AOC Bergerac (Vin rouge / Vin blanc)",logic:"Bordeaux blend / Inland climate",chef_note:"「ボルドーの弟分」。コスパが良く、デイリーのビストロ料理に気兼ねなく使える。"},{id:"ing_jura_arbois",number:"41",name_fr:"Arbois",name_en:"Arbois",name_ja:"アルボワ",region:"Jura (Arbois)",pin:{x:72,y:48},properties:{type:"赤ワイン / 白ワイン / ロゼ",sweetness:"★☆☆☆☆",alcohol:"★★★☆☆",body:"★★☆☆☆"},cooking:"モルトー・ソーセージ、鶏肉とキノコの煮込み",science:"プールサールやトゥルソーなどの地ブドウ。色が薄いが独特の土っぽさやスパイスの香りがあり、酸化的な熟成を経ることで複雑な旨味（アミノ酸）が付与される。",classification:"AOC Arbois (Vin rouge / Vin blanc / Vin rosé)",logic:"Indigenous grapes / Oxidative notes",chef_note:"ジュラの赤は色が淡くロゼのようだが、味はしっかりしている。郷土の燻製ソーセージと合う。"},{id:"ing_jura_chateau_chalon",number:"42",name_fr:"Château-Chalon",name_en:"Château-Chalon (Vin Jaune)",name_ja:"シャトー・シャロン（ヴァン・ジョーヌ）",region:"Jura (Château-Chalon)",pin:{x:71,y:50},properties:{type:"白ワイン",sweetness:"★☆☆☆☆",alcohol:"★★★★☆",body:"★★★★☆"},cooking:"鶏肉のヴァン・ジョーヌ煮込み（コック・オ・ヴァン・ジョーヌ）、コンテチーズ",science:"サヴァニャン種を樽につぎ足しせずに6年以上熟成。産膜酵母（フルール・ド・ヴァン）の膜の下で酸化熟成し、ソトロンというクルミやカレー粉のような強烈な香気成分を生成する。",classification:"AOC Château-Chalon (Vin Jaune)",logic:"Flor aging / Sotolon aromatics",chef_note:"フランスワインの異端児。コンテチーズやモリーユ茸を使ったクリーム煮込みには絶対不可欠。"},{id:"ing_jura_etoile",number:"43",name_fr:"L’Étoile",name_en:"L’Étoile",name_ja:"レトワール",region:"Jura (L’Étoile)",pin:{x:70,y:51},properties:{type:"白ワイン",sweetness:"★☆☆☆☆",alcohol:"★★★☆☆",body:"★★★☆☆"},cooking:"川魚のクリームソース、チーズフォンデュ",science:"星型のウミユリの化石を含む石灰質土壌。シャルドネを主体とし、ジュラ特有の酸化熟成のニュアンスを持ちつつも、極めてシャープな酸とミネラル感を併せ持つ。",classification:"AOC L’Étoile (Vin blanc)",logic:"Fossil limestone / Minerality",chef_note:"レトワール（星）の名を持つエレガントな白。クリームを使った料理をスッキリとまとめる。"},{id:"ing_savoie_chignin",number:"44",name_fr:"Chignin-Bergeron",name_en:"Chignin-Bergeron",name_ja:"シニャン・ベルジュロン",region:"Savoie (Chignin-Bergeron)",pin:{x:76,y:56},properties:{type:"白ワイン",sweetness:"★☆☆☆☆",alcohol:"★★★☆☆",body:"★★★★☆"},cooking:"グラタン、ボーフォールチーズ",science:"ルーサンヌ（サヴォワでの呼称ベルジュロン）100%。アルプスの冷涼な気候ながら、南向きの急斜面で完熟し、アプリコットやハチミツの豊かなエステル香とリッチなボディを持つ。",classification:"AOC Vin de Savoie Chignin-Bergeron",logic:"Alpine Roussanne / Rich esters",chef_note:"サヴォワの白の中でも特にふくよか。山のチーズを使ったグラタン料理と抜群に合う。"},{id:"ing_savoie_apremont",number:"45",name_fr:"Apremont",name_en:"Apremont",name_ja:"アプルモン",region:"Savoie (Apremont)",pin:{x:75,y:57},properties:{type:"白ワイン",sweetness:"★☆☆☆☆",alcohol:"★★☆☆☆",body:"★☆☆☆☆"},cooking:"チーズフォンデュ、ラクレット",science:"ジャケール種主体。石灰岩の岩屑土壌で育ち、アルコール度数が低めで、極めてクリアな酸味と微炭酸（ガス残存）による爽快感を持つ。",classification:"AOC Vin de Savoie Apremont",logic:"Jacquère / Crisp alpine acid",chef_note:"チーズフォンデュのベースに使い、さらに飲みながら合わせるのがサヴォワの伝統スタイル。"},{id:"ing_savoie_crepy",number:"46",name_fr:"Crépy",name_en:"Crépy",name_ja:"クレピ",region:"Savoie (Crépy)",pin:{x:78,y:53},properties:{type:"白ワイン",sweetness:"★☆☆☆☆",alcohol:"★★☆☆☆",body:"★☆☆☆☆"},cooking:"レマン湖の魚料理、軽い前菜",science:"シャスラ種を使用。レマン湖畔の微気候（ミクロクリマ）により、穏やかな酸と白い花やアーモンドの繊細な香りを生成する。",classification:"AOC Crépy (Vin blanc)",logic:"Lake microclimate / Floral Chasselas",chef_note:"スイス国境近く。主張が強すぎないため、淡白な湖魚の料理の味を引き立てる。"},{id:"ing_corse_patrimonio",number:"47",name_fr:"Patrimonio",name_en:"Patrimonio",name_ja:"パトリモニオ",region:"Corse (Patrimonio)",pin:{x:88,y:85},properties:{type:"赤ワイン",sweetness:"★☆☆☆☆",alcohol:"★★★★☆",body:"★★★★☆"},cooking:"猪肉の煮込み、地中海風肉料理",science:"ニエルキオ（サンジョヴェーゼのクローン）を使用。石灰粘土質土壌と海風の影響で、強いタンニンと酸を保ちながら、マキ（コルシカ特有の低木林）のスパイシーな香りを帯びる。",classification:"AOC Patrimonio (Vin rouge)",logic:"Nielluccio / Maquis aromatics",chef_note:"コルシカ最古のAOC。肉厚でスパイシーな味わいは、野性味のあるジビエ料理に負けない。"},{id:"ing_corse_ajaccio",number:"48",name_fr:"Ajaccio",name_en:"Ajaccio",name_ja:"アジャクシオ",region:"Corse (Ajaccio)",pin:{x:86,y:90},properties:{type:"赤ワイン / ロゼ",sweetness:"★☆☆☆☆",alcohol:"★★★☆☆",body:"★★★☆☆"},cooking:"仔羊のロースト、シャルキュトリー",science:"シャカレッロ種主体。花崗岩土壌由来のミネラルと、色素が薄くタンニンが控えめながら、コショウや赤系果実の非常に高い芳香成分（テルペン類）を持つ。",classification:"AOC Ajaccio (Vin rouge / Vin rosé)",logic:"Sciaccarello / High aromatics",chef_note:"エレガントでスパイシーな香りが特徴。コルシカ産の生ハム（コッパなど）と最高の相性。"},{id:"ing_corse_vin_de_corse",number:"49",name_fr:"Vin de Corse",name_en:"Vin de Corse",name_ja:"ヴァン・ド・コルス",region:"Corse (Vin de Corse)",pin:{x:88,y:92},properties:{type:"白ワイン / ロゼ / 赤ワイン",sweetness:"★☆☆☆☆",alcohol:"★★★☆☆",body:"★★☆☆☆"},cooking:"魚介のグリル、ブロッチュチーズ",science:"白はヴェルメンティーノ（マルヴォワジー・ド・コルス）主体。豊富な日照による果実の丸みと、地中海の風がもたらす海塩由来のミネラル感が、苦味を伴う爽やかな後味を作る。",classification:"AOC Vin de Corse (Vin blanc / Vin rosé / Vin rouge)",logic:"Vermentino / Saline finish",chef_note:"白はフレッシュでミネラル豊か。コルシカのフレッシュチーズ「ブロッチュ」を使った料理に添える。"}],Ct=[{id:"ing_oignon",number:"1",name_fr:"Oignon",name_en:"Onion",name_ja:"オニョン（玉ねぎ）",pin:{x:32,y:48},properties:{tenderness:"★★★☆☆",fat:"☆☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"シズレ（みじん切り）、スライス、長時間炒めてキャラメリゼ",science:"生の玉ねぎには刺激臭成分（アリシンなどの硫黄化合物）が含まれますが、加熱すると熱分解されて甘味成分（プロピルメルプタンなど）に変わり、砂糖の数十倍の甘みを感じるようになります。また、アミノ酸と糖が反応する「メイラード反応」により、ソースの深い褐色（フォン）とコクを作ります。",classification:"Garniture aromatique de base",logic:"Sueur (sweating) / Maturation / Color base",chef_note:"玉ねぎ、人参、セロリを炒めたものは「Mirepoix（ミルポワ）」と呼ばれ、ほぼすべてのフレンチソースの出汁のベースになります。"},{id:"ing_echalote",number:"2",name_fr:"Échalote",name_en:"Shallot",name_ja:"エシャロット",pin:{x:45,y:55},properties:{tenderness:"★★★★☆",fat:"☆☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"シズレ、ソースのベース（ベアルネーズ、ボルドレーズ）",science:"玉ねぎよりも水分が少なく、硫黄化合物の質が非常にデリケート。強い熱で焦がすと一気に苦味が出るため、バターで優しく汗をかかせる（Suer）ことで、上品な甘みとニンニクに似た官能的な香りをソースに溶かし込みます。",classification:"Garniture aromatique premium",logic:"Suer (gentle sweating) / Emulsion aid",chef_note:"フランス料理のソースの成否は「シャロットをいかに細かく美しく刻むか（Ciseler）」に掛かっていると言っても過言ではありません。"},{id:"ing_carotte",number:"3",name_fr:"Carotte",name_en:"Carrot",name_ja:"キャロット（人参）",pin:{x:58,y:45},properties:{tenderness:"★★★☆☆",fat:"☆☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"ジュリエンヌ（千切り）、ヴィシー風（輪切りバターグラッセ）",science:"オレンジ色の色素は油に溶けやすい「β-カロテン」。バターやバターオイル（Clarified butter）でじっくり炒めることで、色素と香気成分がバターに移り、ソースの仕上がりを鮮やかに美しく引き立てます。また、ペクチンを含み、煮込むことで甘みと適度なとろみを与えます。",classification:"Garniture aromatique / Légume d'accompagnement",logic:"Sweating in butter / Glace (glazing)",chef_note:"「Carottes à la Vichy（人参のヴィシー風）」は、ミネラルウォーター、バター、砂糖で水分がなくなるまで煮詰めて人参自身の糖分で艶（Glace）を出す古典的付け合わせ。"},{id:"ing_poireau",number:"4",name_fr:"Poireau",name_en:"Leek",name_ja:"ポワロー（リーキ・西洋ネギ）",pin:{x:25,y:35},properties:{tenderness:"★★★★☆",fat:"☆☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"ブイヨン用（緑葉部）、バター蒸し煮（白い軟白部）",science:"白い茎の部分には可溶性ペクチンと糖質が極めて豊富に含まれており、バターでじっくり低温加熱（Étuver）すると、とろけるような滑らかなテクスチャーに変わり、濃厚な旨味ソースのような役割を果たします。緑の部分はブーケガルニやブイヨンの香りづけに使います。",classification:"Garniture aromatique / Bouquet garni core",logic:"Étuver (stewing in own juices) / Long simmer",chef_note:"じゃがいもとポワローをベースにした冷たいスープ「Vichyssoise（ヴィシソワーズ）」は夏のクラシック。"},{id:"ing_pomme_de_terre",number:"5",name_fr:"Pomme de terre",name_en:"Potato",name_ja:"ポム・ド・テール（じゃがいも）",pin:{x:72,y:55},properties:{tenderness:"★★★☆☆",fat:"☆☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"ピューレ（Purée）、フリット、ポム・デュシェス",science:"アミロースとアミロペクチン（澱粉）が主体。茹でて裏ごしし、冷たいバターを大量に練り込むことで、澱粉の粒子を乳化したバターの脂肪分がコーティングし、極めて滑らかでシルキーなピューレが完成します（有名なジョエル・ロブションのレシピ）。過剰に練りすぎると澱粉の粘り（グルテン様）が出てベタつきます。",classification:"Féculent（澱粉質食材・主食添え）",logic:"Maturation / Starch gelatinization / Butter emulsion",chef_note:"裏ごしには必ず「タミ（粉ふるい）」を使い、絶対にブレンダーを使ってはいけません（ベタベタの糊になってしまいます）。"},{id:"ing_celeri",number:"6",name_fr:"Céleri branche",name_en:"Celery stalk",name_ja:"セロリ（枝セロリ）",pin:{x:50,y:32},properties:{tenderness:"★★☆☆☆",fat:"☆☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"ミルポワ（出汁用みじん切り）、ブイヨン",science:"アピインなどの独特な揮発性香気成分が豊富。肉のアルカリ性生臭み成分を打ち消すマスキング効果が非常に強く、牛や鶏のフォン（出汁）をとる際には必要不可欠な香気素材です。",classification:"Garniture aromatique de base",logic:"Masking odor / Simmer extraction",chef_note:"強い筋があるため、付け合わせに使う場合はピーラーで表面を厚めに剥き、ブイヨンで柔らかく煮含めます。"},{id:"ing_ail",number:"7",name_fr:"Ail",name_en:"Garlic",name_ja:"アイ（にんにく）",pin:{x:42,y:65},properties:{tenderness:"★★★★★",fat:"☆☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"アシェ（みじん切り）、潰してオイルに香りを移す、丸ごとロースト",science:"にんにくの細胞が破壊されると、酵素アリシナーゼが作動して強烈な香り成分アリシンが生成されます。これをオリーブ油などの油脂に移し、ゆっくり加熱することで、香りがオイル全体に拡散し料理のベースを作ります。焦げやすく、焦げると強い苦味が出ます。",classification:"Condiment aromatique",logic:"Oil infusion / Infimul minimal coloring",chef_note:"香りを優しく出したい時は皮付きのまま潰して（Ail en chemise）フライパンに入れ、強く出したい時は芯の芽を除いて微塵切りにします。"}],St=[{id:"ing_thym",number:"1",name_fr:"Thym",name_en:"Thyme",name_ja:"タイム",pin:{x:35,y:48},properties:{tenderness:"★☆☆☆☆",fat:"☆☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"ブーケガルニ、ロティの香り付け、マリネ",science:"チモールを主成分とする精油を多く含み、強力な抗菌・防腐・抗酸化作用を持ちます。熱に非常に強く、長時間（数時間）煮込んでも香りが壊れにくいため、煮込み料理やスープのベース出汁（フォン）に最初に投入されます。",classification:"Herbe aromatique résistante",logic:"Maturation / Simmer extraction",chef_note:"ローリエ、パセリの茎とともに糸で縛り、「Bouquet garni（ブーケガルニ）」として鍋に投入するのがフランス料理の不変のルールです。"},{id:"ing_romarin",number:"2",name_fr:"Romarin",name_en:"Rosemary",name_ja:"ローズマリー",pin:{x:48,y:42},properties:{tenderness:"★☆☆☆☆",fat:"☆☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"ラム肉・豚肉・じゃがいものロースト、グリル",science:"ボルネオールやシネオールを含み、極めて力強く浸透性の高いウッディな香りが特徴。肉の野生的な脂肪臭をシャープに中和します。熱に強く、オイルに香りが非常に移りやすいため、アロゼ（オイルを回しかける）の際に肉の上に乗せて使います。",classification:"Herbe aromatique forte",logic:"Oil infusion / High-heat roasting",chef_note:"香りが非常に強いため、使いすぎるとすべての食材がローズマリーの香りで塗りつぶされてしまうので注意が必要です。"},{id:"ing_persil",number:"3",name_fr:"Persil plat",name_en:"Flat-leaf Parsley",name_ja:"ペルシ・プラ（イタリアンパセリ）",pin:{x:62,y:55},properties:{tenderness:"★★★★☆",fat:"☆☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"アシェ（仕上げの散らし）、茎はブーケガルニ、ソース・ペルシヤード",science:"アピオールという爽やかな精油成分を含み、料理の重たさをリフレッシュする効果があります。葉の香りは熱に弱いため、必ず火を止めた直後や仕上げ（アシェ）に加えます。逆に茎は旨味成分（グルタミン酸など）と不揮発性芳香を含み、出汁のベースとして優秀です。",classification:"Herbe de finition / Garniture de base",logic:"Cold garnish / Finely chopped / Simmer (stem)",chef_note:"刻んだパセリとにんにくを合わせた「Persillade（ペルシヤード）」は、カエルの足（Grenouilles）や貝のソテーに欠かせない芳香の調味料です。"},{id:"ing_laurier",number:"4",name_fr:"Laurier",name_en:"Bay leaf",name_ja:"ローリエ（月桂樹）",pin:{x:28,y:38},properties:{tenderness:"★☆☆☆☆",fat:"☆☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"ソース・ベシャメル、トマト煮込み、ブイヨン",science:"シネオールが主成分。乾燥させることで苦味が抜け、芳醇で甘やかなウッディ香が前面に出ます。煮汁の中に徐々に溶け出して浸透するため、最初からスープに加えて加熱します。肉のタンパク質臭を包み込むマスキング効果が高いです。",classification:"Herbe de braisage / Bouquet garni core",logic:"Slow water-extraction",chef_note:"使用する前に葉の表面を軽く折り曲げて傷をつけることで、葉の中の油細胞が破壊され、煮汁に香りが溶け出しやすくなります。"},{id:"ing_estragon",number:"5",name_fr:"Estragon",name_en:"Tarragon",name_ja:"エストラゴン",pin:{x:52,y:62},properties:{tenderness:"★★★★★",fat:"☆☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"ソース・ベアルネーズ、鶏肉のエストラゴン煮込み",science:"アネトールを含み、アニス（アニスシード）や甘草に似た特有の甘くスパイシーな芳香を持ちます。「ハーブの女王」とも称され、酢や白ワインに香りを移すことで、まろやかで奥深い酸味をソースに与えます。",classification:"Herbe fine de prestige",logic:"Acid infusion / Vinegar steep / Emulsion flavor",chef_note:"エストラゴンを効かせた酢と卵黄、澄ましバターを乳化させた「Sauce Béarnaise（ベアルネーズ）」はステーキの最高峰パートナー。"}],Lt=[{id:"ing_muscade",number:"1",name_fr:"Noix de muscade",name_en:"Nutmeg",name_ja:"ノワ・ド・ミュスカド（ナツメグ）",pin:{x:45,y:25},properties:{tenderness:"★☆☆☆☆",fat:"☆☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"ソース・ベシャメル、ポテトピューレ、キッシュの卵液（Appareil）",science:"ミリスチシンやエレミシンなどの強い甘い芳香成分を含みます。牛乳や生クリーム、卵などのアルカリ性の加熱臭（いわゆるコケ臭・生臭さ）を非常に効率よく中和し、すっきりとした上品なコクと甘い香りをプラスします。",classification:"Épice de base en laiterie",logic:"Dairy masking / Grated fresh",chef_note:"粉末で売られているものではなく、必ず丸ごとの実を「おろし金」で調理の直前にその場で削り入れます。香りの鮮度がまったく違います。"},{id:"ing_poivre_noir",number:"2",name_fr:"Poivre noir",name_en:"Black Pepper",name_ja:"ポワヴル・ノワール（黒コショウ）",pin:{x:55,y:25},properties:{tenderness:"★☆☆☆☆",fat:"☆☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"肉料理の味付け、ポワヴラードソース、ソースの仕上げ",science:"ピペリンという辛み成分が主体で、唾液や胃液の分泌を促し消化を助けます。また、ピネンなどの揮発性のウッディな香気も含み、加熱しすぎると香りが飛び辛みだけが残るため、香りを楽しみたい場合は「仕上げに粗挽き」が鉄則です。",classification:"Condiment universel",logic:"Finish spice / Digestif / Fragrance agent",chef_note:"「Steak au poivre（ペッパーステーキ）」では、ステーキの表面を粗挽きの黒胡椒で埋め尽くすようにして香ばしく焼き、ブランデーと生クリームで仕上げます。"}],jt=[{id:"ing_pomme",number:"1",name_fr:"Pomme",name_en:"Apple",name_ja:"ポム（リンゴ）",pin:{x:30,y:48},properties:{tenderness:"★★★☆☆",fat:"☆☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"タルトタタン（Tatin）、焼きリンゴ、豚肉・鴨肉のロースト添え、ノルマンディー風煮込み",science:"リンゴには果糖、有機酸（リンゴ酸）、そして多量の「ペクチン」（食物繊維）が含まれています。加熱することでペクチンが細胞壁から溶け出して熱分解され、バターや肉汁の水分を抱え込んでソースを乳化・安定させ、自然で濃厚なとろみと甘みを与えます。",classification:"Fruit de base en pâtisserie / cuisine",logic:"Caramelization / Pectin gelation / Acid balancing",chef_note:"カルヴァドス（リンゴのブランデー）でフランベした豚肉に、リンゴのソテーを合わせるのはノルマンディー地方の王道ペアリング。"},{id:"ing_citron",number:"2",name_fr:"Citron",name_en:"Lemon",name_ja:"シトロン（レモン）",pin:{x:42,y:55},properties:{tenderness:"★★★★★",fat:"☆☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"ソースの仕上げ（酸味付け）、ソース・オランデーズ、魚介のポワレ添え",science:"クエン酸が豊富でpHが約2と極めて強酸性。この酸が魚臭さの主因であるアミン類（アルカリ性）と塩を形成して揮発を防ぎ、生臭さを完全に消し去ります。また、加熱調理の仕上げに一滴加えるだけで、鈍重になりがちなバターソースを一気に軽やかに引き締めます。",classification:"Correcteur d'acidité / Condiment essentiel",logic:"Aromatics / PH control / Deodorizer",chef_note:"皮の黄色の部分（Zeste）にはリモネンという香り高い精油が詰まっています。白い綿の部分は強い苦味があるため、絶対に削り落として使います。"},{id:"ing_figue",number:"3",name_fr:"Figue",name_en:"Fig",name_ja:"フィグ（イチジク）",pin:{x:55,y:58},properties:{tenderness:"★★★★★",fat:"☆☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"フォアグラのポワレ添え、コンフィチュール、ジビエの付け合わせ",science:"イチジクの甘み（ショ糖・果糖）とねっとりした食感は、フォアグラやジビエの極めて濃厚な脂や強い血の風味を口の中でマスキングし、まろやかに調和（Mariage）させます。果実に含まれるタンパク質分解酵素フィシンは、肉を一緒に漬け込むことで軟化させる作用もあります。",classification:"Liaison sucrée-salée (甘じょっぱい調和素材)",logic:"Enzymatic tenderizing / Sugar glaze",chef_note:"赤ワインとハチミツ、シナモンでイチジクをコトコト煮詰めたコンポートは、フォアグラのパテに添える定番。"}],Tt=[{id:"ing_cepe",number:"1",name_fr:"Cèpe",name_en:"Porcini / Cep",name_ja:"セープ（ヤマドリタケ・ポルチーニ）",pin:{x:38,y:35},properties:{tenderness:"★★★★☆",fat:"☆☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"ソテー（塩コショウ・にんにく・パセリ）、オムレツ、スープ、ソース",science:"グルタミン酸（アミノ酸）とグアニル酸（核酸）の両方を豊富に含み、噛むことで口の中で相乗効果による爆発的な旨味を生み出します。乾燥させることで水分が抜け、細胞壁が壊れてグアニル酸が数十倍に激増し、戻し汁は濃厚な旨味出汁となります。",classification:"Champignon sauvage noble",logic:"Dry concentration / Umami synergy",chef_note:"「Cèpes à la Bordelaise（ボルドー風セープソテー）」は、エシャロット、パセリ、パン粉をまぶして強火でサッと炒める秋の風物詩料理。"},{id:"ing_morille",number:"2",name_fr:"Morille",name_en:"Morel",name_ja:"モリーユ（アミガサタケ）",pin:{x:50,y:32},properties:{tenderness:"★★★★★",fat:"☆☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"クリーム煮（Sauce aux morilles）、鶏肉のジュ・クリームソース",science:"モリーユは傘が網の目状のハニカム構造になっており、この凹凸が粘度のあるクリームソースを物理的に大量に絡め取ります。加熱することで独特のナッツのような香ばしさと土の香りが引き立ち、動物性の生クリームのコクと完璧に融合します。",classification:"Champignon de printemps de prestige",logic:"Cream affinity / Capillary sauce retention",chef_note:"生は微量の毒性（ヒドラジン）があるため、必ずしっかり加熱して食べます。乾燥モリーユを戻して生クリームで煮詰めると究極のソースになります。"},{id:"ing_truffe",number:"3",name_fr:"Truffe noire",name_en:"Black Truffle",name_ja:"トリュフ（黒トリュフ）",pin:{x:62,y:35},properties:{tenderness:"★★★★★",fat:"☆☆☆☆☆",collagen:"☆☆☆☆☆"},cooking:"スライスして仕上げに乗せる、バターや卵に香りを吸着させる",science:"トリュフの香りの正体は、ジメチルスルフィドなどの高揮発性の芳香族化合物です。この香りは「脂溶性」が極めて高く、バター、クリーム、卵黄などの脂質に非常によく吸着します。加熱しすぎると香りが揮発してすべて逃げてしまうため、火を止めた料理の上に薄くスライスして散らします。",classification:"Diamant noir de la cuisine",logic:"Lipophilic infusion / Heat-sensitive aromatics",chef_note:"密閉容器の中に生卵とトリュフを一緒に入れて数日冷蔵庫に置いておくと、殻の気孔を通して卵黄にトリュフの香りが完璧に移り、絶品のオムレツが作れます。"}],Ut=[...ct,...mt,...dt,...ut,...pt,...gt,...ft,...ht,...yt,...bt,..._t,...vt,...xt,...kt,...We,...Ge,...wt,...Qe,...Ct,...St,...Lt,...jt,...Tt];function Jt(e){const r=Ut.find(a=>a.id===e);if(r){const a=r.name_fr||r.name_it||r.name_local||r.name_ja;let n="";return e.startsWith("ing_wine_")?n=" (ワイン)":e.startsWith("ing_")&&(We.some(o=>o.id===e)?n=" (仏チーズ)":Ge.some(o=>o.id===e)?n=" (世界チーズ)":Qe.some(o=>o.id===e)?n=" (ワイン)":n=" (食材)"),`${a} (${r.name_ja})${n}`}return{apple:"リンゴ (Pomme)",oil_olive:"オリーブオイル (Huile d'olive)",herbes_de_provence:"プロヴァンスハーブ (Herbes de Provence)",sauerkraut:"シュークルート (Sauerkraut)",strasbourg_sausage:"ストラスブールソーセージ",buckwheat_flour:"そば粉 (Sarrasin)",salted_butter:"有塩バター (Beurre salé)",foie_gras:"フォアグラ (Foie gras)",duck:"鴨肉 (Canard)",cut_kokotxa_de_merlu:"メルルーサの顎肉 (Kokotxa de merlu)",lingot_bean:"白インゲン豆 (Haricot lingot)",anchovy:"アンチョビ (Anchois)",chestnut_flour:"栗粉 (Farine de châtaigne)",lonzu_charcuterie:"ロンズ (Lonzu)",endive:"チコリ (Endive)"}[e]||e}function Fe(e,r){const t=r==="region"?Dt[e]:Ot[e];if(!t)return"";let a="";return t.dishes&&t.dishes.length>0&&(a+='<div style="margin-top: 0.6rem;"><span style="font-size: 0.75rem; font-weight: 700; color: var(--color-accent-hover); text-transform: uppercase; display: block; margin-bottom: 0.2rem;">🍽️ 代表料理 (Classic Dishes):</span> ',a+=t.dishes.map(n=>{const o=Vt[n];return`<span class="relation-badge" style="display: inline-block; background-color: rgba(0, 0, 145, 0.05); color: var(--color-primary); padding: 0.25rem 0.5rem; font-size: 0.8rem; border-radius: 4px; margin-right: 0.4rem; margin-top: 0.25rem; border: 1px solid rgba(0, 0, 145, 0.15); font-weight: 500;">${o?`${o.name_fr} (${o.name_ja})`:n}</span>`}).join(""),a+="</div>"),t.techniques&&t.techniques.length>0&&(a+='<div style="margin-top: 0.6rem;"><span style="font-size: 0.75rem; font-weight: 700; color: var(--color-accent-hover); text-transform: uppercase; display: block; margin-bottom: 0.2rem;">🔥 調理技法 (Techniques):</span> ',a+=t.techniques.map(n=>{const o=Gt[n];return`<span class="relation-badge" style="display: inline-block; background-color: rgba(220, 38, 38, 0.05); color: var(--color-secondary); padding: 0.25rem 0.5rem; font-size: 0.8rem; border-radius: 4px; margin-right: 0.4rem; margin-top: 0.25rem; border: 1px solid rgba(220, 38, 38, 0.15); font-weight: 500;">${o?`${o.name_fr} (${o.name_ja})`:n}</span>`}).join(""),a+="</div>"),t.sauces&&t.sauces.length>0&&(a+='<div style="margin-top: 0.6rem;"><span style="font-size: 0.75rem; font-weight: 700; color: var(--color-accent-hover); text-transform: uppercase; display: block; margin-bottom: 0.2rem;">🥫 ソース (Sauces):</span> ',a+=t.sauces.map(n=>{const o=Wt[n];return`<span class="relation-badge" style="display: inline-block; background-color: rgba(197, 168, 128, 0.1); color: var(--color-text-main); padding: 0.25rem 0.5rem; font-size: 0.8rem; border-radius: 4px; margin-right: 0.4rem; margin-top: 0.25rem; border: 1px solid rgba(197, 168, 128, 0.3); font-weight: 500;">${o?`${o.name_fr} (${o.name_ja})`:n}</span>`}).join(""),a+="</div>"),t.science&&t.science.length>0&&(a+='<div style="margin-top: 0.6rem;"><span style="font-size: 0.75rem; font-weight: 700; color: var(--color-accent-hover); text-transform: uppercase; display: block; margin-bottom: 0.2rem;">🧪 料理科学 (Science):</span> ',a+=t.science.map(n=>{const o=Qt[n];return`<span class="relation-badge" style="display: inline-block; background-color: rgba(107, 156, 104, 0.05); color: var(--color-success); padding: 0.25rem 0.5rem; font-size: 0.8rem; border-radius: 4px; margin-right: 0.4rem; margin-top: 0.25rem; border: 1px solid rgba(107, 156, 104, 0.15); font-weight: 500;">${o?`${o.name_fr} (${o.name_ja})`:n}</span>`}).join(""),a+="</div>"),t.ingredients&&t.ingredients.length>0&&(a+='<div style="margin-top: 0.6rem;"><span style="font-size: 0.75rem; font-weight: 700; color: var(--color-accent-hover); text-transform: uppercase; display: block; margin-bottom: 0.2rem;">🥬 主要食材 (Ingredients):</span> ',a+=t.ingredients.map(n=>`<span class="relation-badge" style="display: inline-block; background-color: rgba(10, 25, 49, 0.05); color: var(--color-text-muted); padding: 0.25rem 0.5rem; font-size: 0.8rem; border-radius: 4px; margin-right: 0.4rem; margin-top: 0.25rem; border: 1px solid rgba(10, 25, 49, 0.15); font-weight: 500;">${Jt(n)}</span>`).join(""),a+="</div>"),a}function Yt(e){const r=document.createElement("div");r.className="meat-section-container";const t=document.createElement("div");t.className="meat-type-tabs",t.innerHTML=`
    <button class="meat-tab-btn active" data-category="primary">🥩 主要食肉</button>
    <button class="meat-tab-btn" data-category="livestock">🍖 家畜肉</button>
    <button class="meat-tab-btn" data-category="game">🦌 ジビエ</button>
    <button class="meat-tab-btn" data-category="seafood">🐟 魚介類</button>
    <button class="meat-tab-btn" data-category="cheese_wine">🧀 チーズ/ワイン</button>
    <button class="meat-tab-btn" data-category="vegetables">🥦 野菜</button>
    <button class="meat-tab-btn" data-category="herbs_spices">🌿 ハーブ/スパイス</button>
    <button class="meat-tab-btn" data-category="fruits_mushrooms">🍄 果物/きのこ</button>
  `,r.appendChild(t);const a=document.createElement("div");a.className="meat-type-tabs",a.style.marginTop="0.5rem",a.style.borderBottom="none",r.appendChild(a);const n=document.createElement("div");n.className="meat-display-area",r.appendChild(n),e.appendChild(r);const o={primary:{title:"主要食肉 (Primary Meats)",subCategories:[{key:"beef",label:"🐂 Bœuf (牛)",cuts:ct,img:"assets/beef_cuts.png",placeholder:"Coupe+de+Boeuf",pdf:"beef_maff_guide.pdf",pdfText:"📄 日本農水省 牛肉部位基準 (PDF)"},{key:"porc",label:"🐖 Porc (豚)",cuts:mt,img:"assets/porc_cuts.png",placeholder:"Coupe+de+Porc",pdf:"pork_maff_guide.pdf",pdfText:"📄 日本農水省 豚肉部位基準 (PDF)",quote:'"Tout est bon dans le cochon" (豚はすべてが使える食材である)'},{key:"volaille",label:"🐓 Volaille (鶏)",cuts:dt,img:"assets/poultry_cuts.png",placeholder:"Coupe+de+Volaille",pdf:"poultry_maff_guide.pdf",pdfText:"📄 日本農水省 鶏肉部位基準 (PDF)",quote:'"La volaille est la reine des cuisines et la directrice des banquets" (鶏肉は厨房の女王であり、宴の演出家である)'}]},livestock:{title:"その他の家畜肉 (Other Livestock)",subCategories:[{key:"agneau",label:"🐏 Agneau (羊)",cuts:ut,img:"assets/agneau_cuts.png",placeholder:"Agneau"},{key:"veau",label:"🐂 Veau (仔牛)",cuts:pt,img:"assets/veal_cuts.png",placeholder:"Veau"},{key:"canard",label:"🦆 Canard (鴨)",cuts:gt,img:"assets/canard_cuts.png",placeholder:"Canard"}]},game:{title:"ジビエ (Game Meats)",subCategories:[{key:"chevreuil",label:"🦌 Chevreuil (鹿)",cuts:ft,img:"assets/game_cuts.png",placeholder:"Chevreuil"},{key:"sanglier",label:"🐗 Sanglier (猪)",cuts:ht,img:"assets/game_cuts.png",placeholder:"Sanglier"},{key:"pigeon",label:"🕊️ Pigeon (鳩)",cuts:yt,img:"assets/game_cuts.png",placeholder:"Pigeon"},{key:"lievre",label:"🐇 Lièvre (野ウサギ)",cuts:bt,img:"assets/game_cuts.png",placeholder:"Lievre"}]},seafood:{title:"魚介類 (Seafood)",subCategories:[{key:"poisson",label:"🐟 Poisson (魚)",cuts:_t,img:"assets/seafood_cuts.png",placeholder:"Poisson"},{key:"crustaces",label:"🦞 Crustacés (甲殻類)",cuts:vt,img:"assets/seafood_cuts.png",placeholder:"Crustaces"},{key:"coquillages",label:"🐚 Coquillages (貝類)",cuts:xt,img:"assets/seafood_cuts.png",placeholder:"Coquillages"},{key:"mollusques",label:"🐙 Mollusques (軟体類)",cuts:kt,img:"assets/seafood_cuts.png",placeholder:"Mollusques"}]},cheese_wine:{title:"チーズ・ワイン (Cheese & Wine)",subCategories:[{key:"fromages_fr",label:"🇫🇷 France (仏チーズ)",cuts:We,img:"assets/cheese_wine.png",placeholder:"Fromages"},{key:"fromages_world",label:"🌐 Monde (世界チーズ)",cuts:Ge,img:"assets/cheese_wine.png",placeholder:"Fromages",hidePins:!0},{key:"fromages_classif",label:"🔬 Classification (製法分類)",cuts:wt,img:"assets/cheese_wine.png",placeholder:"Fromages",hidePins:!0},{key:"vins",label:"🍷 Vins (ワイン)",cuts:Qe,img:"assets/cheese_wine.png",placeholder:"Vins"}]},vegetables:{title:"野菜 (Vegetables)",subCategories:[{key:"legumes",label:"🥦 Légumes (野菜全般)",cuts:Ct,img:"assets/vegetables.png",placeholder:"Legumes"}]},herbs_spices:{title:"ハーブ・スパイス (Herbs & Spices)",subCategories:[{key:"herbes",label:"🌿 Herbes (香草)",cuts:St,img:"assets/herbs_spices.png",placeholder:"Herbes"},{key:"epices",label:"🌶️ Épices (香辛料)",cuts:Lt,img:"assets/herbs_spices.png",placeholder:"Epices"}]},fruits_mushrooms:{title:"果物・きのこ (Fruits & Mushrooms)",subCategories:[{key:"fruits",label:"🍎 Fruits (果物)",cuts:jt,img:"assets/fruits_mushrooms.png",placeholder:"Fruits"},{key:"champignons",label:"🍄 Champignons (きのこ)",cuts:Tt,img:"assets/fruits_mushrooms.png",placeholder:"Champignons"}]}};function m(i){const u=o[i];a.innerHTML="",u.subCategories.forEach((s,g)=>{const f=document.createElement("button");f.className=`meat-tab-btn ${g===0?"active":""}`,f.setAttribute("data-sub",s.key),f.innerText=s.label,f.style.fontSize="0.8rem",f.style.padding="0.3rem 0.8rem",f.addEventListener("click",c=>{a.querySelectorAll(".meat-tab-btn").forEach(h=>h.classList.remove("active")),f.classList.add("active"),at(s,n)}),a.appendChild(f)}),u.subCategories.length<=1?a.style.display="none":a.style.display="flex",at(u.subCategories[0],n)}t.querySelectorAll(".meat-tab-btn").forEach(i=>{i.addEventListener("click",u=>{t.querySelectorAll(".meat-tab-btn").forEach(g=>g.classList.remove("active")),i.classList.add("active");const s=i.getAttribute("data-category");m(s)})}),m("primary")}function at(e,r){r.innerHTML="";const t=document.createElement("div");t.style.display="flex",t.style.flexDirection="column",t.style.gap="1.5rem";let a="";e.quote&&(a+=`
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
          ${e.cuts.filter(s=>s.points).map(s=>`
            <polygon class="interactive-area" points="${s.points}" data-id="${s.id}" />
          `).join("")}
        </svg>
        
        <!-- Hotspots overlay (for items that specify pin x/y percentages) -->
        <div class="hotspots-overlay-container" style="position: absolute; top:0; left:0; width:100%; height:100%; pointer-events:none;">
          ${e.hidePins?"":e.cuts.filter(s=>s.pin).map(s=>`
            <div class="interactive-hotspot" style="left: ${s.pin.x}%; top: ${s.pin.y}%; pointer-events: auto;" data-id="${s.id}" title="${s.name_fr||s.name_it||s.name_local||s.name_ja}">${s.number}</div>
          `).join("")}
        </div>
      </div>
      
      <!-- Right: Clickable Text List -->
      <div style="background: rgba(10, 25, 49, 0.02); border: 1px solid rgba(197, 168, 128, 0.25); border-radius: var(--radius-md); padding: 1.2rem; max-height: 450px; overflow-y: auto;">
        <h4 style="font-size: 0.85rem; text-transform: uppercase; color: var(--color-primary); font-weight: 700; margin-bottom: 0.8rem; border-bottom: 1px solid rgba(197, 168, 128, 0.2); padding-bottom: 0.4rem;">📖 部位・食材リスト</h4>
        <div class="ingredient-list-group" style="display: flex; flex-direction: column; gap: 0.4rem;">
          ${e.cuts.map(s=>`
            <button class="list-item-btn" data-id="${s.id}">
              <span><span style="display: inline-block; background-color: var(--color-accent); color: var(--color-primary); width: 18px; height: 18px; line-height: 18px; text-align: center; border-radius: 50%; font-size: 0.65rem; font-weight: 700; margin-right: 0.4rem;">${s.number}</span> ${s.name_fr||s.name_it||s.name_local||s.name_ja}</span>
              <span style="font-size: 0.75rem; color: var(--color-text-muted); font-style: italic;">${s.name_ja}${s.region?` (${s.region})`:""}</span>
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
  `,t.innerHTML=a,r.appendChild(t);const n=t.querySelector("#ingredient-detail-drawer"),o=t.querySelectorAll(".interactive-area"),m=t.querySelectorAll(".interactive-hotspot"),i=t.querySelectorAll(".list-item-btn");function u(s,g){var h,_,l,v,A,T,P,d,p,y,S,k,w,C;if(o.forEach($=>$.classList.remove("active")),m.forEach($=>$.classList.remove("active")),i.forEach($=>$.classList.remove("active")),g)g.classList.add("active");else{const $=t.querySelector(`.interactive-area[data-id="${s}"]`);$&&$.classList.add("active");const q=t.querySelector(`.interactive-hotspot[data-id="${s}"]`);q&&q.classList.add("active")}const f=t.querySelector(`.list-item-btn[data-id="${s}"]`);f&&f.classList.add("active");const c=e.cuts.find($=>$.id===s);if(c){const $=c.name_fr||c.name_it||c.name_local||c.name_ja;t.querySelector("#ingredient-cut-title").innerText=`${$} (${c.name_ja})`;const q=c.region?` • Region/Country: ${c.region}`:"";t.querySelector("#ingredient-cut-sub").innerText=`Cut #${c.number} • ${c.name_en||""}${q}`;const b=t.querySelector(".meat-prop-item:nth-child(1) .meat-prop-label"),L=t.querySelector("#ingredient-prop-tenderness"),E=t.querySelector(".meat-prop-item:nth-child(2) .meat-prop-label"),j=t.querySelector("#ingredient-prop-fat"),z=t.querySelector(".meat-prop-item:nth-child(3) .meat-prop-label"),F=t.querySelector("#ingredient-prop-collagen");e.key==="vins"?(b.innerText="甘み (Douceur)",L.innerText=((h=c.properties)==null?void 0:h.sweetness)||"-",E.innerText="アルコール (Alcool)",j.innerText=((_=c.properties)==null?void 0:_.alcohol)||"-",z.innerText="ボディ (Corps)",F.innerText=((l=c.properties)==null?void 0:l.body)||"-"):e.key==="fromages_fr"?(b.innerText="塩気 (Salinité)",L.innerText=((v=c.properties)==null?void 0:v.saltiness)||"-",E.innerText="アロマ (Arôme)",j.innerText=((A=c.properties)==null?void 0:A.aroma)||"-",z.innerText="希少度 (Rareté)",F.innerText=((T=c.properties)==null?void 0:T.rarity)||"-"):e.key.startsWith("fromages")?(b.innerText="柔らかさ/水分 (Humidité)",L.innerText=((P=c.properties)==null?void 0:P.tenderness)||((d=c.properties)==null?void 0:d.moisture)||"-",E.innerText="脂肪分 (M.G.)",j.innerText=((p=c.properties)==null?void 0:p.fat)||"-",z.innerText="熟成/コラーゲン (Affinage)",F.innerText=((y=c.properties)==null?void 0:y.matured)||((S=c.properties)==null?void 0:S.collagen)||"-"):(b.innerText="柔らかさ (Tendreté)",L.innerText=((k=c.properties)==null?void 0:k.tenderness)||"-",E.innerText="脂 (Gras)",j.innerText=((w=c.properties)==null?void 0:w.fat)||"-",z.innerText="コラーゲン (Collagène)",F.innerText=((C=c.properties)==null?void 0:C.collagen)||"-"),t.querySelector("#ingredient-cooking").innerText=c.cooking||"-",t.querySelector("#ingredient-classification").innerText=c.classification||"-",t.querySelector("#ingredient-logic").innerText=c.logic||"-",t.querySelector("#ingredient-science").innerText=c.science||"-",t.querySelector("#ingredient-chef-note").innerText=c.chef_note||"-";const H=t.querySelector("#ingredient-relations-container"),ee=t.querySelector("#ingredient-relations-content"),Y=Fe(s,"cut");Y?(ee.innerHTML=Y,H.style.display="block"):H.style.display="none";const ne=t.querySelector("#ingredient-audio-title-btn");c.name_fr?(ne.style.display="inline-block",ne.onclick=()=>te(c.name_fr)):ne.style.display="none",n.style.display="block",window.innerWidth<=600&&n.scrollIntoView({behavior:"smooth"})}}o.forEach(s=>{s.addEventListener("click",g=>{const f=g.target.getAttribute("data-id");u(f,g.target)})}),m.forEach(s=>{s.addEventListener("click",g=>{const f=g.target.getAttribute("data-id");u(f,g.target)})}),i.forEach(s=>{s.addEventListener("click",g=>{const f=g.target.closest(".list-item-btn").getAttribute("data-id");u(f,g.target.closest(".list-item-btn"))})})}const rt=[{id:"reg_normandie",number:"N",name_fr:"Normandie",name_en:"Normandy",name_ja:"ノルマンディー地方",points:"22,16 38,16 38,28 22,28",desc_fr:"Célèbre pour ses riches pâturages et ses vergers de pommiers. Cuisine dominée par les produits laitiers et les pommes. Ingrédients clés : Fromage Camembert, Pommes. Plats classiques : Sole Normande, Poulet Vallée d'Auge. (Débarquement de Normandie (1944) Normandie)",desc_en:"Famous for lush green dairy pastures and apple orchards. Normandy cuisine is defined by heavy cream, raw butter, world-class cheese, and apples. Key ingredients: Camembert cheese, Apples. Signature dishes: Sole Normande, Poulet Vallée d'Auge. (Normandy Landings (1944) Normandy)",desc_ja:"フランス北西部の沿岸地域。冷涼な気候を活かしたリンゴの栽培（シードル、カルヴァドス）と、フランス最高峰の乳製品の産地として高名。魚介類にも恵まれ、生クリームを贅沢に使ったコク深い味付けが特徴。代表食材：カマンベールなどの各種チーズ（カマンベール、ポン・レヴェック、リヴァロ、ヌフシャテル）、リンゴ。代表料理：ソール・ノルマンド、プーレ_ヴァレ_ドージュ。歴史的出来事：(ノルマンディー上陸作戦 (1944) ノルマンディー)"},{id:"reg_bourgogne",number:"B",name_fr:"Bourgogne",name_en:"Burgundy",name_ja:"ブルゴーニュ地方",points:"52,38 66,38 66,54 52,54",desc_fr:"Le cœur de la gastronomie classique française et des vins de prestige. Réputée pour ses viandes de Charolais et ses sauces au vin rouge réduit. Ingrédients clés : Bœuf Charolais, Moutarde de Dijon. Plats classiques : Bœuf Bourguignon, Escargots à la persillade, Coq au Vin. (Bataille d'Alésia (-52) Alésia)",desc_en:"The historic heartland of French wine, Charolais cattle, and Dijon mustard. Reduced red wine is heavily featured in regional sauces. Key ingredients: Charolais Beef, Dijon Mustard. Signature dishes: Bœuf Bourguignon, Escargots de Bourgogne, Coq au Vin. (Battle of Alesia (-52) Alesia)",desc_ja:"名高き特級ワインと古典フランス料理の中心地。広大な牧草地で育つ最高級のシャロレー牛やディジョンマスタードが名産。ワイン煮込み料理の発祥地であり、濃厚なソースが基本です。代表食材：シャロレー牛、ディジョンマスタード、ブルゴーニュワイン（シャブリ、コート・ド・ニュイ）、エポワスやコンテなどのチーズ。代表料理：ブフ_ブルギニョン、エスカルゴのブルゴーニュ風、コック_オ_ヴァン。歴史的出来事：(アレシアの戦い (2026年より紀元前52年) アレシア)"},{id:"reg_provence",number:"P",name_fr:"Provence",name_en:"Provence",name_ja:"プロヴァンス地方",points:"64,70 80,70 80,86 64,86",desc_fr:"Région baignée de soleil, influencée par la mer Méditerranée. Se base sur l'huile d'olive, l'ail, la tomate et les herbes aromatiques au lieu du beurre. Ingrédients clés : Huile d'olive, Herbes de Provence. Plats classiques : Bouillabaisse, Ratatouille, Salade Niçoise. (Papauté d'Avignon (1309) Avignon)",desc_en:"Sun-drenched Mediterranean cooking. Unlike the north, Provence avoids butter, using olive oil, garlic, fresh tomatoes, and aromatic wild herbs instead. Key ingredients: Olive oil, Herbes de Provence. Signature dishes: Bouillabaisse, Ratatouille, Salade Niçoise. (Avignon Papacy (1309) Avignon)",desc_ja:"地中海に面した温暖な南仏地域。乳製品主体の北部とは対照的に、オリーブオイル、にんにく、トマト、ハーブ類を主役とする健康的で明るい地中海料理が魅力。代表食材：オリーブオイル、プロヴァンス_ハーブ、バノンやブルー・デュ・ケラスなどのチーズ、プロヴァンス・ロゼワイン。代表料理：ブイヤベース、ラタトゥイユ、ニース風サラダ。歴史的出来事：（アヴィニョン捕囚 (1309) アヴィニョン）"},{id:"reg_alsace",number:"A",name_fr:"Alsace",name_en:"Alsace",name_ja:"アルザス地方",points:"76,22 90,22 90,38 76,38",desc_fr:"Région à la frontière allemande, combinant des ingrédients robustes et des vins blancs fruités. Célèbre pour ses charcuteries de porc et son chou. Ingrédients clés : Chou à choucroute, Saucisse de Strasbourg. Plats classiques : Choucroute Garnie, Flammekueche, Baeckeoffe. (Cession de l'Alsace-Lorraine (1871) Alsace)",desc_en:"Bordering Germany, Alsace combines hearty Germanic staples with dry, aromatic French white wines. Noted for curing meats, sausages, and sauerkraut. Key ingredients: Sauerkraut, Strasbourg Sausage. Signature dishes: Choucroute Garnie, Flammekueche, Baeckeoffe. (Ceding of Alsace-Lorraine (1871) Alsace)",desc_ja:"ドイツ国境沿いに位置する北東の地方。地元の白ワインと合わせる豚肉のスモーク、自家製ソーセージ、塩漬けキャベツ（シュークルート）が名物。ドイツの質実剛健さとフランスの洗練が融合。代表食材：シュークルート、ストラスブール_ソーセージ、マンスターチーズ、アルザス・リースリング（白ワイン）。代表料理：シュークルート_ガルニ、タルト_フランベ、ベッコフ。歴史的出来事：(アルザス・ロレーヌ割譲 (1871) アルザス)"},{id:"reg_bretagne",number:"BR",name_fr:"Bretagne",name_en:"Brittany",name_ja:"ブルターニュ地方",points:"6,26 22,26 22,40 6,40",desc_fr:"Région maritime sauvage à l'ouest. Sa cuisine est marquée par l'océan, l'utilisation de beurre salé et de sarrasin pour ses crêpes. Ingrédients clés : Farine de sarrasin, Beurre salé. Plats classiques : Galette de sarrasin, Cotriade, Kouign-amann. (Union de la Bretagne à la France (1532) Vannes)",desc_en:"A rugged maritime region in the west. Its cuisine is heavily shaped by the Atlantic ocean, hearty buckwheat, and rich salted butter culture. Key ingredients: Buckwheat flour, Salted butter. Signature dishes: Buckwheat Galette, Cotriade, Kouign-amann. (Union of Brittany and France (1532) Vannes)",desc_ja:"大西洋に突き出た最西端の沿岸地域。豊かな海洋資源に加え、ガレット（クレープ）に使われるそば粉や有塩バターの文化が深く根付く独自の土地柄。代表食材：そば粉、有塩バター。代表料理：ガレット_ド_サラザン、コトリアード（魚介スープ）、クイニーアマン。歴史的出来事：(ブルターニュ公国のフランス併合 (1532) ヴァンヌ)"},{id:"reg_ile_de_france",number:"IF",name_fr:"Île-de-France",name_en:"Île-de-France",name_ja:"イル・ド・フランス地方",points:"44,20 56,20 56,34 44,34",desc_fr:"Le centre politique et culturel de la France. Berceau de la haute gastronomie, influencé par les meilleurs produits de tout le pays. Ingrédients clés : Champignon de Paris, Brie de Meaux. Plats classiques : Pot-au-feu, Soupe à l'oignon, Entrecôte Bercy. (Révolution française (1789) Paris)",desc_en:"The political and cultural heartland of France. The historical birthplace of haute cuisine, featuring refined bistro classics and royal traditions. Key ingredients: Paris Mushroom, Brie de Meaux. Signature dishes: Pot-au-feu, French Onion Soup, Entrecôte Bercy. (French Revolution (1789) Paris)",desc_ja:"パリを中心とする首都圏地域。宮廷料理から発展した高級ガストロノミーと、洗練されたビストロ料理の発祥地。国内中から最高の一級食材が集まります。代表食材：マッシュルーム、ブリー・ド・モーやブリー・ド・ムラン（チーズ）。代表料理：ポトフ、オニオングラタンスープ、アントルコート_ベルシー。歴史的出来事：(フランス革命 (1789) パリ)"},{id:"reg_aquitaine",number:"AQ",name_fr:"Nouvelle-Aquitaine",name_en:"Aquitaine / Southwest",name_ja:"アキテーヌ（南西地方）",points:"24,54 42,54 42,74 24,74",desc_fr:"Région du Sud-Ouest, réputée pour sa gastronomie généreuse et ses grands vins de Bordeaux. Spécialisée dans la cuisine du canard et du foie gras. Ingrédients clés : Foie gras, Canard. Plats classiques : Confit de canard, Cassoulet, Magret de canard. (Fin de la Guerre de Cent Ans (1453) Castillon)",desc_en:"A southwestern region famous for its rich, hearty cuisine and world-renowned Bordeaux wines. Highly specialized in duck fats and savory foie gras. Key ingredients: Foie gras, Duck meat. Signature dishes: Duck Confit, Cassoulet, Magret de canard. (End of the Hundred Years' War (1453) Castillon)",desc_ja:"ジロンド川からピレネー山脈に広がる美食の地帯。ボルドーワインを擁し、フランス随一のフォアグラの産地であり、鴨の脂や肉を巧みに使った濃厚で贅沢な郷土料理が特徴。代表食材：フォアグラ、鴨肉、オッソー・イラティ、ロックフォール、ロカマドゥールなどのチーズ、ボルドーワイン。代表料理：鴨のコンフィ、カスレ、マグレ_ド_カナール。歴史的出来事：(百年戦争終結 (1453) カスティヨン)"},{id:"reg_rhone_alpes",number:"RA",name_fr:"Auvergne-Rhône-Alpes",name_en:"Rhône-Alpes / Lyonnais",name_ja:"ローヌ・アルプ（リヨン地方）",points:"60,50 76,50 76,68 60,68",desc_fr:"Considérée comme la capitale mondiale de la gastronomie (Lyon). Cuisine riche, alliant les grands fromages des Alpes et les volailles de Bresse. Ingrédients clés : Volaille de Bresse, Saucisson de Lyon. Plats classiques : Quenelle de brochet, Poulet aux morilles, Gratin Dauphinois. (Révolte des Canuts (1831) Lyon)",desc_en:"Often crowned as the gastronomic capital of the world (Lyon). A rich culinary style combining premium alpine cheeses with legendary bistro fares. Key ingredients: Bresse Poultry, Lyon Sausage. Signature dishes: Pike Quenelle, Poulet de Bresse with morals, Gratin Dauphinois. (Silk weavers' revolts (1831) Lyon)",desc_ja:"「世界の美食の都」と称されるリヨンを擁する地方。アルプスの山岳チーズや最高峰の鶏肉を活かした、力強くも洗練されたビストロ（ブション）文化が息づく。代表食材：ブレス鶏、リヨン風ソーセージ、アルプスチーズ（ルブロション、ボーフォール、アボンダンス、カンタル等）、ローヌワイン（コート・デュ・ローヌ、シャトーヌフ・デュ・パプ）。代表料理：川魚のクネル、ブレス鶏のモリーユ茸クリーム煮、グラタン_ドフィノワ。歴史的出来事：(リヨン絹織物職人の蜂起 (1831) リヨン)"},{id:"reg_loire",number:"LO",name_fr:"Centre-Val de Loire",name_en:"Loire Valley",name_ja:"ロワール地方",points:"34,32 50,32 50,48 34,48",desc_fr:"Surnommée le Jardin de la France. Connue pour ses châteaux royaux, ses vins élégants, ses fromages de chèvre et ses délicieux poissons de rivière. Ingrédients clés : Sainte-Maure de Touraine, Poissons de Loire. Plats classiques : Rillettes de Tours, Brochet au beurre blanc, Tarte Tatin. (Siège d'Orléans par Jeanne d'Arc (1429) Orléans)",desc_en:"Known as the Garden of France. Famous for fairy-tale châteaux, elegant white wines, delicate goat cheeses, and fresh river fish. Key ingredients: Sainte-Maure de Touraine (goat cheese), Loire River fish. Signature dishes: Rillettes of Tours, Pike with beurre blanc, Tarte Tatin. (Siege of Orléans (1429) Orléans)",desc_ja:"「フランスの庭園」と呼ばれる風光明媚な古城地帯。王侯貴族に愛された気品ある白ワイン、多種多様な山羊乳チーズ（シェーヴル）、豊かな川魚料理が魅力。代表食材：サント・モール・ド・トゥーレーヌやクロタン・ド・シャヴィニョルなどの各種山羊乳チーズ、ロワール川の川魚、サンセールワイン（白）。代表料理：リエット、川魚のブールブランソース添え、タルトタタン。歴史的出来事：(ジャンヌ・ダルクによるオルレアン解放 (1429) オルレアン)"},{id:"reg_champagne",number:"CH",name_fr:"Grand Est (Champagne)",name_en:"Champagne",name_ja:"シャンパーニュ地方",points:"54,16 68,16 68,32 54,32",desc_fr:"Célèbre dans le monde entier pour son vin effervescent unique. La cuisine locale propose des plats mijotés robustes pour contrer les hivers froids. Ingrédients clés : Vin de Champagne, Jambon des Ardennes. Plats classiques : Potée Champenoise, Biscuits roses de Reims. (Sacre de Clovis / Rois de France (496) Reims)",desc_en:"Northeast region celebrated globally for its unique sparkling wine. The local kitchen offers rustic pot-roasted meats to counter cold northern winters. Key ingredients: Champagne Wine, Ardennes Ham. Signature dishes: Potée Champenoise, Pink Biscuits of Reims. (Coronation of Clovis / Kings of France (496) Reims)",desc_ja:"世界で最も高貴なスパークリングワイン「シャンパン」の故郷。北東部の寒冷な気候をしのぐため、お肉や野菜をじっくり煮込んだ素朴で温かい伝統鍋が愛されています。代表食材：シャンパン、アルデンヌの生ハム。代表料理：ポテ_シャンプノワーズ、ビスキュイ_ローズ_ド_ランス。歴史的出来事：(フランク王国クローヴィスおよび歴代国王の戴カン式 (496) ランス)"},{id:"reg_languedoc",number:"LA",name_fr:"Occitanie (Languedoc)",name_en:"Languedoc / South",name_ja:"ラングドック地方",points:"38,68 54,68 54,84 38,84",desc_fr:"Région méditerranéenne du Sud, marquée par des influences occitanes. Propose une cuisine de terroir généreuse, parfumée à l'ail, aux olives et aux fruits de mer. Ingrédients clés : Haricot lingot, Anchois de Collioure. Plats classiques : Cassoulet de Castelnaudary, Brandade de morue, Tielle sétoise. (Croisade des albigeois (1209) Béziers)",desc_en:"A southern Mediterranean region with strong Occitan roots. Features rustic landward cooking packed with garlic, rich olive oils, and fresh seafood. Key ingredients: Lingot Beans, Collioure Anchovies. Signature dishes: Cassoulet, Brandade de morue, Tielle sétoise. (Albigensian Crusade (1209) Béziers)",desc_ja:"地中海に面した南仏の西側エリア。オリーブやにんにく、トマトを多用し、カステルノーダリの伝統的な豆の煮込みや、豊かな海の幸を組み合わせた力強い郷土料理が特徴。代表食材：白インゲン豆、コリウールのアンチョビ。代表料理：カスレ、ブランダード_ド_モリュ、ティエル（タコのパイ）。歴史的出来事：(アルビジョワ十字軍 (1209) ベジエ)"},{id:"reg_corse",number:"CO",name_fr:"Corse",name_en:"Corsica",name_ja:"コルシカ島",points:"80,80 92,80 92,94 80,94",desc_fr:"L'Île de Beauté au caractère sauvage. Sa cuisine est basée sur les produits de la montagne, les châtaignes, le fromage de brebis et la charcuterie. Ingrédients clés : Farine de châtaigne, Lonzu. Plats classiques : Civet de sanglier, Fiadone, Veau aux olives. (Naissance de Napoléon Bonaparte (1769) Ajaccio)",desc_en:"The Island of Beauty with a rugged mountain character. Its unique cuisine is driven by aromatic wild herbs, chestnut forests, sheep cheese, and cured pork. Key ingredients: Chestnut flour, Lonzu (cured pork). Signature dishes: Wild Boar Civet, Fiadone, Veau aux olives. (Birth of Napoleon Bonaparte (1769) Ajaccio)",desc_ja:"地中海に浮かぶ険しい山岳の島。独自の生態系が育む栗の粉、野生ハーブを食べて放牧された地豚の熟成肉（シャルキュトリー）、羊乳チーズなどを活かした力強い山のごちそう。代表食材：栗粉、ロンズ（豚肉の熟成肉）、ブロッチュチーズ。代表料理：イノシシのシヴェ（煮込み）、フィアドーヌ（チーズケーキ）、子牛肉のオリーブ煮。歴史的出来事：(ナポレオン・ボナパルト誕生 (1769) アジャクシオ)"},{id:"reg_hauts_de_france",number:"HF",name_fr:"Hauts-de-France",name_en:"Northern France / Flanders",name_ja:"オー・ド・フランス地方（北フランス）",points:"44,4 58,4 58,18 44,18",desc_fr:"Région du Nord influencée par la culture flamande. Connue pour sa cuisine mijotée à la bière, ses frites croustillantes et ses fromages forts. Ingrédients clés : Fromage Maroilles, Endive. Plats classiques : Carbonnade Flamande, Potjevleesch, Moules-frites. (Bataille de Dunkerque (1940) Dunkerque)",desc_en:"Northernmost region deeply influenced by Flemish culture. Noted for comforting beer-infused slow cooking, intense aromatic cheeses, and crispy fries. Key ingredients: Maroilles Cheese, Endive. Signature dishes: Carbonnade Flamande, Potjevleesch, Moules-frites. (Battle of Dunkirk (1940) Dunkirk)",desc_ja:"ベルギーと国境を接するフランス最北部。ワインではなくビールを使った煮込み料理や、独特な強い香りのマロワール・チーズ、野菜のチコリ（エンダイブ）が名物。フランドル文化の温かみがあります。代表食材：マロワール・チーズ、チコリ。代表料理：カルボナード（牛肉のビール煮）、ポチェブリーシュ、ムール_フリット。歴史的出来事：(ダンケルクの戦い (1940) ダンケルク)"}];let ve=[],xe=[],Ae=[],Pe=[],Me=[];const Kt={reg_bretagne:"rgba(212, 223, 208, 0.45)",reg_normandie:"rgba(226, 218, 197, 0.5)",reg_hauts_de_france:"rgba(209, 226, 230, 0.45)",reg_ile_de_france:"rgba(232, 218, 211, 0.55)",reg_grand_est:"rgba(228, 213, 223, 0.45)",reg_pays_de_la_loire:"rgba(222, 213, 194, 0.5)",reg_centre_val_de_loire:"rgba(215, 220, 200, 0.45)",reg_bourgogne:"rgba(230, 215, 200, 0.5)",reg_auvergne_rhone_alpes:"rgba(205, 220, 225, 0.45)",reg_nouvelle_aquitaine:"rgba(235, 215, 210, 0.55)",reg_occitanie:"rgba(230, 210, 220, 0.45)",reg_provence:"rgba(225, 210, 190, 0.5)",reg_corse:"rgba(210, 220, 205, 0.45)",reg_alsace:"rgba(228, 213, 223, 0.45)",reg_champagne:"rgba(226, 218, 197, 0.5)",reg_loire:"rgba(222, 213, 194, 0.5)",reg_rhone_alpes:"rgba(209, 226, 230, 0.45)",reg_aquitaine:"rgba(232, 218, 211, 0.55)",reg_languedoc:"rgba(228, 213, 223, 0.45)"},I={activeMap:"admin",activeTheme:"overview",selectedRegionId:null,selectedItemId:null};function Zt(e){const r=document.createElement("div");r.className="gastronomy-map-panel",r.innerHTML=`
    <!-- Layer Controls -->
    <div class="map-control-header" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid rgba(197, 168, 128, 0.2);">
      <!-- Map Layer Switch -->
      <div style="display: flex; align-items: center; gap: 0.6rem;">
        <span style="font-size: 0.8rem; font-weight: 700; color: var(--color-primary); text-transform: uppercase;">🗺️ 地図レイヤー (Map Layer):</span>
        <div class="segmented-control" style="display: flex; background: rgba(10, 25, 49, 0.05); border: 1px solid rgba(197, 168, 128, 0.3); border-radius: var(--radius-sm); padding: 2px;">
          <button class="segment-btn active" data-map="admin" style="background: none; border: none; padding: 0.3rem 0.8rem; font-size: 0.8rem; font-weight: 600; cursor: pointer; border-radius: 3px; color: var(--color-primary);">現行行政区分 (13地域)</button>
          <button class="segment-btn" data-map="cultural" style="background: none; border: none; padding: 0.3rem 0.8rem; font-size: 0.8rem; font-weight: 600; cursor: pointer; border-radius: 3px; color: var(--color-primary);">食文化・歴史区分</button>
        </div>
      </div>
      
      <!-- Theme Switch (Overview / Dishes / Cheeses / Wines) -->
      <div style="display: flex; align-items: center; gap: 0.6rem;">
        <span style="font-size: 0.8rem; font-weight: 700; color: var(--color-primary); text-transform: uppercase;">🏷️ テーマ (Themes):</span>
        <div class="theme-tabs" style="display: flex; gap: 0.3rem;">
          <button class="theme-tab-btn active" data-theme="overview">🗺️ 概要</button>
          <button class="theme-tab-btn" data-theme="dishes">🍽️ 郷土料理</button>
          <button class="theme-tab-btn" data-theme="cheeses">🧀 チーズ</button>
          <button class="theme-tab-btn" data-theme="wines">🍷 ワイン</button>
        </div>
      </div>
    </div>
    
    <!-- Main Interactive Area -->
    <div class="ingredient-grid-layout" style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 1.5rem; min-height: 480px;">
      <!-- Left: Interactive SVG Map Container -->
      <div id="map-canvas-container" class="interactive-canvas-container parchment-map-frame" style="position: relative; width: 100%; border: 3px double var(--border-color); border-radius: var(--radius-md); overflow: hidden; background-color: var(--map-bg); box-shadow: inset 0 0 40px rgba(139, 115, 85, 0.15); aspect-ratio: 4 / 3;">
        
        <!-- Legacy Map Illustration Image (Hidden on admin map layer) -->
        <img id="legacy-map-illustration" src="assets/france_map.png" alt="Gastronomic Map of France" style="width: 100%; height: 100%; object-fit: fill; position: absolute; top: 0; left: 0; z-index: 1; display: none;">
        
        <!-- Sea Labels and Compass Rose (Classic Background Decor, hidden when legacy map is visible) -->
        <div id="classic-map-decorations" class="classic-map-decorations" style="position: absolute; width: 100%; height: 100%; pointer-events: none; z-index: 1;">
          <div style="position: absolute; left: 8%; top: 12%; font-family: 'Playfair Display', 'Georgia', serif; font-size: 0.75rem; font-style: italic; letter-spacing: 3px; color: rgba(139, 115, 85, 0.4); transform: rotate(-12deg);">LA MANCHE</div>
          <div style="position: absolute; left: 8%; top: 55%; font-family: 'Playfair Display', 'Georgia', serif; font-size: 0.85rem; font-weight: bold; letter-spacing: 5px; color: rgba(139, 115, 85, 0.45); transform: rotate(-45deg);">OCÉAN ATLANTIQUE</div>
          <div style="position: absolute; right: 28%; bottom: 8%; font-family: 'Playfair Display', 'Georgia', serif; font-size: 0.8rem; font-weight: bold; letter-spacing: 4px; color: rgba(139, 115, 85, 0.45);">MER MÉDITERRANÉE</div>
          
          <!-- Compass Rose Vector Object -->
          <svg style="position: absolute; left: 6%; bottom: 6%; width: 90px; height: 90px; opacity: 0.4;" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="var(--border-color)" stroke-width="1" stroke-dasharray="2,2"/>
            <circle cx="50" cy="50" r="40" fill="none" stroke="var(--border-color)" stroke-width="0.5"/>
            <!-- Points -->
            <polygon points="50,50 50,10 53,50" fill="var(--border-color)"/>
            <polygon points="50,50 50,10 47,50" fill="none" stroke="var(--border-color)" stroke-width="0.7"/>
            <polygon points="50,50 50,90 47,50" fill="var(--border-color)"/>
            <polygon points="50,50 50,90 53,50" fill="none" stroke="var(--border-color)" stroke-width="0.7"/>
            <polygon points="50,50 90,50 50,53" fill="var(--border-color)"/>
            <polygon points="50,50 90,50 50,47" fill="none" stroke="var(--border-color)" stroke-width="0.7"/>
            <polygon points="50,50 10,50 50,47" fill="var(--border-color)"/>
            <polygon points="50,50 10,50 50,53" fill="none" stroke="var(--border-color)" stroke-width="0.7"/>
            <!-- Diagonals -->
            <polygon points="50,50 78,22 50,26" fill="var(--border-color)" opacity="0.7"/>
            <polygon points="50,50 22,78 50,74" fill="var(--border-color)" opacity="0.7"/>
            <polygon points="50,50 22,22 26,50" fill="var(--border-color)" opacity="0.7"/>
            <polygon points="50,50 78,78 74,50" fill="var(--border-color)" opacity="0.7"/>
            <circle cx="50" cy="50" r="4" fill="var(--map-bg)" stroke="var(--border-color)" stroke-width="1.5"/>
            <text x="50" y="8" font-size="8" font-family="serif" text-anchor="middle" font-weight="bold" fill="var(--border-color)">N</text>
          </svg>
        </div>
        
        <!-- Main SVG Map Frame -->
        <svg id="interactive-france-svg" style="width: 100%; height: 100%; display: block; position: relative; z-index: 2;" viewBox="0 0 1000 1000">
          <defs>
            <!-- Hand-drawn classic ink filter to wobble lines slightly for antique sketch look -->
            <filter id="classic-ink-filter" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
          <g id="map-paths-group" filter="url(#classic-ink-filter)"></g>
          <g id="map-labels-group" style="pointer-events: none;"></g>
          <g id="map-pins-group"></g>
        </svg>
      </div>
      
      <!-- Right: Navigation List of Regions -->
      <div style="background: rgba(10, 25, 49, 0.01); border: 1px solid rgba(197, 168, 128, 0.25); border-radius: var(--radius-md); padding: 1.2rem; display: flex; flex-direction: column; height: 100%; box-sizing: border-box;">
        <h4 id="sidebar-list-title" style="font-size: 0.85rem; text-transform: uppercase; color: var(--color-primary); font-weight: 700; margin-bottom: 0.8rem; border-bottom: 1px solid rgba(197, 168, 128, 0.2); padding-bottom: 0.4rem; display: flex; align-items: center; gap: 0.4rem;">🗺️ 地方リスト (Régions)</h4>
        <div id="regions-list-group" class="ingredient-list-group" style="display: flex; flex-direction: column; gap: 0.4rem; overflow-y: auto; max-height: 400px; flex-grow: 1; padding-right: 2px;">
          <!-- Dynamically filled buttons -->
        </div>
      </div>
    </div>
    
    <!-- Detail Drawer Panel -->
    <div class="cuisine-detail-drawer" id="map-detail-drawer" style="display: none; margin-top: 1.5rem; border-top: 2px solid var(--border-color); padding-top: 1.5rem; animation: slideUp 0.3s ease-out;">
      <div class="detail-drawer-header" style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid rgba(197, 168, 128, 0.15); padding-bottom: 0.8rem; margin-bottom: 1rem;">
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <h3 class="detail-drawer-title" id="map-region-title" style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary);">Select a Region</h3>
          <button class="audio-btn" id="map-audio-title-btn" style="background: none; border: none; font-size: 1.1rem; cursor: pointer; color: var(--color-accent);">🔊</button>
        </div>
        <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; color: var(--color-text-muted); font-weight: 600;" id="map-region-sub">Région</span>
      </div>
      
      <div id="drawer-main-content" style="display: flex; flex-direction: column; gap: 1.2rem;">
        <!-- Region details, or pin specific details (cheeses/wines/dishes) will go here -->
      </div>
    </div>
  `,e.appendChild(r);let t=document.getElementById("map-floating-tooltip");t||(t=document.createElement("div"),t.id="map-floating-tooltip",t.style.position="fixed",t.style.pointerEvents="none",t.style.zIndex="9999",t.style.padding="0.5rem 0.8rem",t.style.background="rgba(10, 25, 49, 0.95)",t.style.border="1px solid var(--color-accent)",t.style.borderRadius="var(--radius-sm)",t.style.color="#fff",t.style.fontSize="0.75rem",t.style.boxShadow="0 4px 12px rgba(0, 0, 0, 0.15)",t.style.display="none",t.style.fontFamily="var(--font-main)",t.style.lineHeight="1.3",document.body.appendChild(t));const a=r.querySelectorAll(".segment-btn");a.forEach(s=>{s.addEventListener("click",g=>{a.forEach(f=>f.classList.remove("active")),g.target.classList.add("active"),I.activeMap=g.target.getAttribute("data-map"),I.selectedRegionId=null,I.selectedItemId=null,m()})});const n=r.querySelectorAll(".theme-tab-btn");n.forEach(s=>{s.addEventListener("click",g=>{n.forEach(f=>f.classList.remove("active")),g.target.classList.add("active"),I.activeTheme=g.target.getAttribute("data-theme"),I.selectedItemId=null,m()})}),o().then(()=>{m()});async function o(){try{const s=["data/regions_administrative.json","data/regions_cultural.json","data/dishes.json","data/cheeses.json","data/wines.json"],g=await Promise.all(s.map(f=>fetch(f)));for(const f of g)if(!f.ok)throw new Error(`Failed to load ${f.url}`);ve=await g[0].json(),xe=await g[1].json(),Ae=await g[2].json(),Pe=await g[3].json(),Me=await g[4].json(),console.log("Map engine data loaded successfully.")}catch(s){console.error("Failed to load map JSON datasets:",s),ve=[],xe=[]}}function m(){if(!(ve.length>0&&xe.length>0)){r.querySelector("#regions-list-group").innerHTML='<p style="font-size:0.8rem;color:var(--color-text-muted);padding:1rem;">読み込み中...</p>';return}const g=r.querySelector("#legacy-map-illustration"),f=r.querySelector("#classic-map-decorations"),c=r.querySelector("#interactive-france-svg");I.activeMap==="cultural"?(g.style.display="block",f.style.display="none",c.setAttribute("viewBox","0 0 600 600")):(g.style.display="none",f.style.display="block",c.setAttribute("viewBox","0 0 1000 1000"));const h=I.activeMap==="admin"?ve:xe,_=r.querySelector("#map-paths-group"),l=I.activeMap==="cultural";_.innerHTML=h.map(d=>{const p=I.selectedRegionId===d.region_id,y=Kt[d.region_id]||"rgba(197, 168, 128, 0.1)",S=l?"none":y,k=l?"none":"rgba(92, 64, 51, 0.65)",w=l?0:1,C=p?"rgba(197, 168, 128, 0.45)":S,$=p?"var(--color-primary)":k,q=p?3.2:l?0:2.2;return`
        <path 
          class="region-path ${p?"active":""}" 
          d="${d.geometry}" 
          id="${d.region_id}" 
          data-id="${d.region_id}"
          style="fill: ${C}; fill-opacity: ${p?.65:w}; stroke: ${$}; stroke-width: ${q}; cursor: pointer; transition: fill 0.25s, fill-opacity 0.25s, stroke 0.25s;"
        />
      `}).join("");const v=r.querySelector("#map-labels-group");l?v.innerHTML="":v.innerHTML=h.map(d=>{const p=d.french_name,y=p.length>20?11.5:p.length>12?12.5:14.5,S=y*.65,k=Math.max(90,p.length*S+20),w=y+8,C=d.label_y-w/2-1,$=d.label_y+y/3+.5;return`
          <g class="region-label-group" style="pointer-events: none;">
            <!-- Drop Shadow for the label plate -->
            <rect 
              x="${d.label_x-k/2+1.5}" 
              y="${C+1.5}" 
              width="${k}" 
              height="${w}" 
              rx="5" 
              fill="rgba(0, 0, 0, 0.08)" 
              style="pointer-events: none;" 
            />
            <!-- Ivory paper tag -->
            <rect 
              x="${d.label_x-k/2}" 
              y="${C}" 
              width="${k}" 
              height="${w}" 
              rx="5" 
              fill="rgba(253, 249, 240, 0.95)" 
              stroke="rgba(92, 64, 51, 0.6)" 
              stroke-width="1.0" 
              style="pointer-events: none;" 
            />
            <!-- Classic Serif Text -->
            <text 
              x="${d.label_x}" 
              y="${$}" 
              text-anchor="middle" 
              font-size="${y}" 
              font-weight="700" 
              fill="#2e1f15"
              style="font-family: 'Playfair Display', 'Georgia', serif; letter-spacing: 0.5px; pointer-events: none;"
            >${p}</text>
          </g>
        `}).join("");const A=r.querySelector("#map-pins-group");if(A.innerHTML="",I.activeTheme!=="overview"){let d=[],p="var(--color-accent)";I.activeTheme==="cheeses"?(d=Pe,p="#EAA812"):I.activeTheme==="wines"?(d=Me,p="#A91B3E"):I.activeTheme==="dishes"&&(d=Ae,p="#2F80ED");const y=h.map(S=>S.region_id);A.innerHTML=d.map(S=>{const k=Oe(S.region,I.activeMap);if(!k||!y.includes(k))return"";const w=h.find(L=>L.region_id===k);if(!w)return"";const C=I.activeMap==="cultural"?6:10;let $=S.pin.x*C,q=S.pin.y*C;if(I.activeMap==="admin"){$=$*.15+w.label_x*.85,q=q*.15+w.label_y*.85;const L=S.id.length*5%12-6;$+=L,q+=S.id.length*11%12-6}else{const L=S.id.length*3%6-3;$+=L,q+=S.id.length*5%6-3}const b=I.selectedItemId===S.id;return`
          <g class="map-pin-marker" data-item-id="${S.id}" data-region-id="${k}" style="cursor:pointer; z-index: 10;">
            <circle cx="${$}" cy="${q}" r="${b?"9":"6"}" fill="${p}" stroke="#fff" stroke-width="1.5" />
            ${b?`<circle cx="${$}" cy="${q}" r="14" fill="none" stroke="${p}" stroke-width="1.5" stroke-dasharray="2,2" opacity="0.8" />`:""}
          </g>
        `}).join("")}const T=r.querySelector("#sidebar-list-title");if(I.activeTheme==="overview")T.innerText="🗺️ 地方リスト (Régions)";else{const d={dishes:"🍽️ 郷土料理",cheeses:"🧀 特産チーズ",wines:"🍷 地方ワイン"};T.innerText=`${d[I.activeTheme]} リスト`}const P=r.querySelector("#regions-list-group");if(P.innerHTML="",I.activeTheme==="overview")P.innerHTML=h.map(d=>{const p=I.selectedRegionId===d.region_id,y=d.code||"";return`
          <button class="list-item-btn ${p?"active":""}" data-id="${d.region_id}">
            <span>
              <span class="region-num-badge" style="display: inline-block; background-color: var(--color-accent); color: var(--color-primary); width: 20px; height: 20px; line-height: 20px; text-align: center; border-radius: 50%; font-size: 0.65rem; font-weight: 700; margin-right: 0.4rem;">
                ${y}
              </span> 
              ${d.french_name}
            </span>
            <span style="font-size: 0.75rem; color: var(--color-text-muted); font-style: italic;">${d.japanese_name}</span>
          </button>
        `}).join("");else{let d=[];I.activeTheme==="cheeses"?d=Pe:I.activeTheme==="wines"?d=Me:I.activeTheme==="dishes"&&(d=Ae);const p=h.map(S=>S.region_id),y=d.filter(S=>{const k=Oe(S.region,I.activeMap);return k&&p.includes(k)});P.innerHTML=y.map(S=>{const k=I.selectedItemId===S.id,w=Oe(S.region,I.activeMap),C=h.find(q=>q.region_id===w),$=C?C.japanese_name.replace("地域圏","").replace("地方",""):"";return`
          <button class="list-item-btn item-btn ${k?"active":""}" data-item-id="${S.id}" data-region-id="${w}">
            <span>
              <strong>${S.name_fr}</strong> 
              <br><span style="font-size:0.75rem; color:var(--color-text-muted); font-weight:normal;">${S.name_ja}</span>
            </span>
            <span class="region-badge-small" style="font-size: 0.65rem; background: rgba(197, 168, 128, 0.15); padding: 0.15rem 0.35rem; border-radius: 3px; font-weight:600; color:var(--color-primary);">${$}</span>
          </button>
        `}).join("")}u(),i()}function i(){r.querySelectorAll(".region-path").forEach(c=>{c.addEventListener("mouseenter",h=>{const _=h.target.getAttribute("data-id"),v=(I.activeMap==="admin"?ve:xe).find(A=>A.region_id===_);v&&(t.innerHTML=`
            <div style="font-weight:700; border-bottom:1px solid rgba(255,255,255,0.3); padding-bottom:2px; margin-bottom:2px;">
              ${v.french_name}
            </div>
            <div style="font-size:0.7rem; opacity:0.85;">${v.japanese_name}</div>
            <div style="font-size:0.65rem; opacity:0.7; font-style:italic;">${v.english_name}</div>
          `,t.style.display="block")}),c.addEventListener("mousemove",h=>{t.style.left=h.clientX+15+"px",t.style.top=h.clientY+15+"px"}),c.addEventListener("mouseleave",()=>{t.style.display="none"}),c.addEventListener("click",h=>{const _=h.target.getAttribute("data-id");I.selectedRegionId=_,I.selectedItemId=null,m()})}),r.querySelectorAll(".list-item-btn").forEach(c=>{c.addEventListener("click",h=>{const _=h.target.closest(".list-item-btn");_.classList.contains("item-btn")?(I.selectedItemId=_.getAttribute("data-item-id"),I.selectedRegionId=_.getAttribute("data-region-id")):(I.selectedRegionId=_.getAttribute("data-id"),I.selectedItemId=null),m()})}),r.querySelectorAll(".map-pin-marker").forEach(c=>{c.addEventListener("click",h=>{const _=h.target.closest(".map-pin-marker");I.selectedItemId=_.getAttribute("data-item-id"),I.selectedRegionId=_.getAttribute("data-region-id"),m()})})}function u(){const s=r.querySelector("#map-detail-drawer"),g=r.querySelector("#map-region-title"),f=r.querySelector("#map-region-sub"),c=r.querySelector("#drawer-main-content"),h=r.querySelector("#map-audio-title-btn");if(h.style.display="none",I.selectedItemId){let _=null,l="";if(I.activeTheme==="cheeses"?(_=Pe.find(v=>v.id===I.selectedItemId),l="特産チーズ (Fromage AOP)"):I.activeTheme==="wines"?(_=Me.find(v=>v.id===I.selectedItemId),l="地方ワイン (AOC Wine)"):I.activeTheme==="dishes"&&(_=Ae.find(v=>v.id===I.selectedItemId),l="郷土料理 (Plat Régional)"),_){g.innerText=`${_.name_fr} (${_.name_ja})`,f.innerText=`${l} • ${_.region}`;let v="";if(_.properties){v+='<div style="display:flex; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.5rem;">';for(const[T,P]of Object.entries(_.properties)){let d=T;T==="sweetness"?d="甘み":T==="alcohol"?d="アルコール":T==="body"?d="ボディ":T==="saltiness"?d="塩気":T==="aroma"?d="香り":T==="rarity"?d="希少性":T==="type"&&(d="タイプ"),v+=`
              <span style="font-size:0.75rem; background:rgba(10, 25, 49, 0.05); border:1px solid rgba(197, 168, 128, 0.25); padding:0.2rem 0.5rem; border-radius:3px; font-weight:600;">
                ${d}: <span style="color:var(--color-accent-hover);">${P}</span>
              </span>
            `}v+="</div>"}c.innerHTML=`
          ${v}
          
          ${_.classification?`
            <div>
              <h4 style="font-size:0.75rem; text-transform:uppercase; color:var(--color-accent); font-weight:600; margin-bottom:0.2rem;">分類 (Classification)</h4>
              <p style="font-size:0.9rem; color:var(--color-text-main); font-weight:600;">${_.classification}</p>
            </div>
          `:""}
          
          <div>
            <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.3rem;">
              <h4 style="font-size:0.75rem; text-transform:uppercase; color:var(--color-accent); font-weight:600;">製法と科学的根拠 (Science & Method)</h4>
              <button class="audio-btn" id="map-audio-desc-btn" style="background:none; border:none; font-size:0.95rem; cursor:pointer; color:var(--color-accent);">🔊</button>
            </div>
            <p style="font-size:0.9rem; color:var(--color-text-main); line-height:1.5; text-align:justify;" id="map-desc-fr">${_.science||_.desc||""}</p>
          </div>
          
          ${_.cooking?`
            <div>
              <h4 style="font-size:0.75rem; text-transform:uppercase; color:var(--color-accent); font-weight:600; margin-bottom:0.2rem;">調理・料理への応用 (Culinary Use)</h4>
              <p style="font-size:0.9rem; color:var(--color-text-main); line-height:1.5;">${_.cooking}</p>
            </div>
          `:""}
          
          ${_.chef_note?`
            <div style="background:rgba(197, 168, 128, 0.08); border-left:3px solid var(--border-color); padding:0.6rem 0.8rem; border-radius:0 var(--radius-sm) var(--radius-sm) 0;">
              <h4 style="font-size:0.75rem; text-transform:uppercase; color:var(--color-primary); font-weight:700; margin-bottom:0.2rem;">👨‍🍳 シェフの助言 (Chef's Note)</h4>
              <p style="font-size:0.85rem; color:var(--color-primary); font-style:italic; line-height:1.4;">${_.chef_note}</p>
            </div>
          `:""}
        `,h.style.display="inline-block",h.onclick=()=>te(_.name_fr);const A=r.querySelector("#map-audio-desc-btn");A&&(A.onclick=()=>te(_.science||_.desc||"")),s.style.display="block";return}}if(I.selectedRegionId){const l=(I.activeMap==="admin"?ve:xe).find(v=>v.region_id===I.selectedRegionId);if(l){g.innerText=`${l.french_name} (${l.japanese_name})`,f.innerText=`${l.english_name} Region`;let v=Xt(l.region_id);c.innerHTML=`
          <div>
            <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.3rem;">
              <h4 style="font-size:0.75rem; text-transform:uppercase; color:var(--color-accent); font-weight:600;">Français</h4>
              <button class="audio-btn" id="map-audio-desc-btn" style="background:none; border:none; font-size:0.95rem; cursor:pointer; color:var(--color-accent);">🔊</button>
            </div>
            <p style="font-size:0.95rem; color:var(--color-primary); font-style:italic; line-height:1.5; text-align:justify;" id="map-desc-fr">${v.desc_fr}</p>
          </div>
          <div>
            <h4 style="font-size:0.75rem; text-transform:uppercase; color:var(--color-accent); font-weight:600; margin-bottom:0.3rem;">English Description</h4>
            <p style="font-size:0.9rem; color:var(--color-text-main); line-height:1.5; text-align:justify;">${v.desc_en}</p>
          </div>
          <div>
            <h4 style="font-size:0.75rem; text-transform:uppercase; color:var(--color-accent); font-weight:600; margin-bottom:0.3rem;">日本語解説</h4>
            <p style="font-size:0.9rem; color:var(--color-text-main); line-height:1.5; text-align:justify;">${v.desc_ja}</p>
          </div>
          
          <!-- Relations linking (Classic dishes, cheeses, and wine badges) -->
          <div id="map-relations-container" style="border-top:1px solid rgba(197, 168, 128, 0.15); padding-top:1.2rem;">
            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-primary); font-weight: 700; margin-bottom: 0.5rem;">🔗 地域と食・技術のつながり (Relations)</h4>
            <div id="map-relations-content">
              ${(()=>{const T=l.region_id;if(T==="reg_grand_est"){const d=Fe("reg_alsace","region"),p=Fe("reg_champagne","region");let y="";return d&&(y+=`<div style="margin-bottom: 0.8rem; border-bottom: 1px dashed rgba(197,168,128,0.15); padding-bottom: 0.5rem;"><strong style="font-size: 0.75rem; color: var(--color-primary);">[アルザス地方 / Alsace]</strong>${d}</div>`),p&&(y+=`<div><strong style="font-size: 0.75rem; color: var(--color-primary);">[シャンパーニュ地方 / Champagne]</strong>${p}</div>`),y||'<span style="font-size:0.8rem; color:var(--color-text-muted); font-style:italic;">紐づく関連情報がありません。</span>'}return Fe(T==="reg_occitanie"?"reg_languedoc":T==="reg_pays_de_la_loire"||T==="reg_loire"?"reg_loire":T,"region")||'<span style="font-size:0.8rem; color:var(--color-text-muted); font-style:italic;">紐づく関連情報がありません。</span>'})()}
            </div>
          </div>
        `,h.style.display="inline-block",h.onclick=()=>te(l.french_name);const A=r.querySelector("#map-audio-desc-btn");A&&(A.onclick=()=>te(v.desc_fr)),s.style.display="block";return}}s.style.display="none"}}function Oe(e,r){if(!e)return null;const t=e.toLowerCase().trim();if(r==="admin"){if(t.includes("normandie")||t.includes("normandy"))return"reg_normandie";if(t.includes("bourgogne")||t.includes("burgundy")||t.includes("franche"))return"reg_bourgogne";if(t.includes("provence")||t.includes("côte d")||t.includes("paca"))return"reg_provence";if(t.includes("bretagne")||t.includes("brittany"))return"reg_bretagne";if(t.includes("ile-de-france")||t.includes("île-de-france")||t.includes("paris"))return"reg_ile_de_france";if(t.includes("alsace")||t.includes("champagne")||t.includes("lorraine")||t.includes("grand est"))return"reg_grand_est";if(t.includes("pays de la loire")||t.includes("nantes"))return"reg_pays_de_la_loire";if(t.includes("centre")||t.includes("val de loire")||t.includes("loire valley"))return"reg_loire";if(t.includes("aquitaine")||t.includes("bordeaux")||t.includes("basque"))return"reg_aquitaine";if(t.includes("rhône")||t.includes("alpes")||t.includes("lyon")||t.includes("auvergne"))return"reg_rhone_alpes";if(t.includes("languedoc")||t.includes("occitanie")||t.includes("roussillon"))return"reg_occitanie";if(t.includes("corse")||t.includes("corsica"))return"reg_corse";if(t.includes("hauts-de-france")||t.includes("nord")||t.includes("flanders"))return"reg_hauts_de_france"}else{if(t.includes("normandie")||t.includes("normandy"))return"reg_normandie";if(t.includes("bourgogne")||t.includes("burgundy"))return"reg_bourgogne";if(t.includes("provence"))return"reg_provence";if(t.includes("alsace"))return"reg_alsace";if(t.includes("bretagne")||t.includes("brittany"))return"reg_bretagne";if(t.includes("ile-de-france")||t.includes("île-de-france"))return"reg_ile_de_france";if(t.includes("aquitaine")||t.includes("bordeaux")||t.includes("basque"))return"reg_aquitaine";if(t.includes("rhône")||t.includes("alpes")||t.includes("lyon"))return"reg_rhone_alpes";if(t.includes("loire")||t.includes("nantes"))return"reg_loire";if(t.includes("champagne"))return"reg_champagne";if(t.includes("languedoc")||t.includes("occitanie")||t.includes("roussillon"))return"reg_languedoc";if(t.includes("corse")||t.includes("corsica"))return"reg_corse";if(t.includes("hauts-de-france")||t.includes("nord")||t.includes("flanders"))return"reg_hauts_de_france"}return null}function Xt(e){const r=rt.find(t=>t.id===e);if(r)return{desc_fr:r.desc_fr,desc_en:r.desc_en,desc_ja:r.desc_ja};if(e==="reg_pays_de_la_loire")return{desc_fr:"Célèbre pour ses vignobles du Muscadet, ses côtes atlantiques et son sel de Guérande. Une cuisine fraîche, dominée par les poissons de mer et de rivière accompagnés de beurre blanc. Ingrédients clés : Sel de Guérande, Canard de Challans. Plats classiques : Brochet au beurre blanc, Moules de bouchot.",desc_en:"Famous for its Muscadet white wine, salt marshes of Guérande, and the Atlantic coast. The cuisine features fresh river and sea fish cooked with rich butter sauces. Key ingredients: Guérande sea salt, Challans duck. Signature dishes: Pike with beurre blanc, Gateau Nantais.",desc_ja:"フランス西部の沿岸地域で、ロワール川の下流に位置する。白ワインのミュスカデや、高級塩の「ゲランドの塩」、ブランド鴨「シャラン鴨」が名産。川魚や新鮮な海の幸をバターと白ワインのソースで仕上げる「ブール・ブラン」の発祥地。代表食材：ゲランドの塩、シャラン鴨。代表料理：川魚のブールブランソース添え、ナント風ガトー。"};if(e==="reg_grand_est")return{desc_fr:"Grande région de l'Est unifiant l'Alsace, la Champagne et la Lorraine. Réputée pour ses plats robustes de porc, son chou et le prestigieux vin de Champagne. Ingrédients clés : Chou à choucroute, Vin de Champagne, Jambon des Ardennes. Plats classiques : Choucroute garnie, Quiche Lorraine, Baeckeoffe.",desc_en:"A massive eastern region combining Alsace, Champagne, and Lorraine. Celebrated for hearty pork specialities, sauerkraut, and the globally prestigious Champagne sparkling wine. Key ingredients: Sauerkraut, Champagne sparkling wine, Ardennes Ham. Signature dishes: Choucroute garnie, Quiche Lorraine, Flammekueche.",desc_ja:"アルザス、シャンパーニュ、ロレーヌなどの旧地域圏が合併したフランス北東部の広域地域。ドイツ風のシュークルートや自家製ソーセージなどの質実剛健な肉料理から、ロレーヌ地方の伝統卵料理キッシュ、高貴なスパークリングワイン「シャンパン」まで多彩な美食を誇る。代表食材：シュークルート、シャンパン、ロレーヌ産チーズ。代表料理：シュークルート・ガルニ、キッシュ・ロレーヌ、タルト・フランベ。"};if(e==="reg_occitanie"){const t=rt.find(a=>a.id==="reg_languedoc");if(t)return{desc_fr:t.desc_fr,desc_en:t.desc_en,desc_ja:t.desc_ja}}return{desc_fr:"Description en cours de rédaction.",desc_en:"Description under development.",desc_ja:"解説データ作成中。"}}function en(){const e=document.createElement("div"),r=document.createElement("h2");r.className="section-title",r.innerText="Théorie de l'Art Culinaire",e.appendChild(r);const t=document.createElement("p");t.className="section-subtitle",t.innerText="Classical French culinary theory, stock making, classical sauces, and interactive gastronomy diagrams.",e.appendChild(t);const a=document.createElement("div");a.className="cuisine-tabs",a.innerHTML=`
    <button class="cuisine-tab-btn active" data-tab="theory">📖 Théorie Classique</button>
    <button class="cuisine-tab-btn" data-tab="ingredients">🥦 Ingrédients (食材)</button>
    <button class="cuisine-tab-btn" data-tab="map">🗺️ Carte Gastronomique</button>
  `,e.appendChild(a);const n=document.createElement("div");n.className="cuisine-content-wrapper",e.appendChild(n),a.querySelectorAll(".cuisine-tab-btn").forEach(m=>{m.addEventListener("click",i=>{a.querySelectorAll(".cuisine-tab-btn").forEach(s=>s.classList.remove("active")),i.target.classList.add("active");const u=i.target.getAttribute("data-tab");o(u)})});function o(m){n.innerHTML="",m==="theory"?Nt(n):m==="ingredients"?Yt(n):m==="map"&&Zt(n)}return o("theory"),e}function le(e){const r=[...e];for(let t=r.length-1;t>0;t--){const a=Math.floor(Math.random()*(t+1));[r[t],r[a]]=[r[a],r[t]]}return r}function it(e){return e.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim().replace(/[-\s]+/g," ")}function tn(){if(document.getElementById("quiz-dynamic-styles"))return;const e=document.createElement("style");e.id="quiz-dynamic-styles",e.innerHTML=`
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
  `,document.head.appendChild(e)}function nn(){var m;const e=[],r=((m=x.db)==null?void 0:m.knowledge)||[],t=r.filter(i=>i.french&&i.japanese),a=r.filter(i=>i.grammar),n=r.filter(i=>i.cuisine);function o(i,u,s,g){const c=i.filter(_=>_.id!==s).map(g).sort(()=>.5-Math.random()),h=[...new Set(c)].filter(Boolean).slice(0,u);for(;h.length<u;)h.push("Autre option "+(h.length+1));return h}return t.forEach(i=>{var c,h,_,l,v;let u="vocabulary";(c=i.tags)!=null&&c.includes("meat")?u="meat":(h=i.tags)!=null&&h.includes("sauces")||(_=i.tags)!=null&&_.includes("sauce")?u="sauces":(l=i.tags)!=null&&l.includes("cutting")?u="cuts":(v=i.tags)!=null&&v.includes("science")&&(u="science");const s=o(t,3,i.id,A=>A.japanese),g=i.examples&&i.examples[0]?i.examples[0].fr:"";e.push({id:`dyn_vocab_fr_ja_${i.id}`,type:"choice",category:u,question:`Que signifie le mot français "${i.french}" ? / What does the French word "${i.french}" mean?`,question_fr:`Que signifie le mot français "${i.french}" ?`,question_en:`What does the French word "${i.french}" mean?`,context:i.definition_fr||`Usage: ${g}`,options:le([i.japanese,...s]),answer:i.japanese});const f=o(t,3,i.id,A=>A.french);e.push({id:`dyn_vocab_ja_fr_${i.id}`,type:"choice",category:u,question:`Quel est le mot français pour "${i.japanese}" ? / What is the French word for "${i.japanese}"?`,question_fr:`Quel est le mot français pour "${i.japanese}" ?`,question_en:`What is the French word for "${i.japanese}"?`,context:i.definition_fr||`Usage: ${g}`,options:le([i.french,...f]),answer:i.french})}),a.forEach(i=>{if(!i.grammar.topic||!i.examples||i.examples.length===0)return;const u=o(a,3,i.id,s=>s.grammar.topic);e.push({id:`dyn_gram_topic_${i.id}`,type:"choice",category:"grammar",question:`De quel concept de grammaire s'agit-il : "${i.grammar.explanation_ja}" ? / Which grammar concept is this: "${i.grammar.explanation_en}"?`,question_fr:"De quel concept de grammaire s'agit-il ?",question_en:`Which grammar concept is this: "${i.grammar.explanation_en}"?`,context:`Niveau : ${i.level}. Indispensable pour la cuisine.`,options:le([i.grammar.topic,...u]),answer:i.grammar.topic}),i.examples.forEach((s,g)=>{const c=a.flatMap(h=>h.examples||[]).filter(h=>h.fr!==s.fr).sort(()=>.5-Math.random()).map(h=>h.ja).slice(0,3);for(;c.length<3;)c.push("Option de traduction "+(c.length+1));e.push({id:`dyn_gram_ex_${i.id}_${g}`,type:"choice",category:"grammar",question:`Traduisez la phrase : "${s.fr}" / Translate the sentence: "${s.fr}"`,question_fr:`Traduisez la phrase : "${s.fr}"`,question_en:`Translate the sentence: "${s.fr}"`,context:`Grammaire: ${i.grammar.topic} (${i.level})`,options:le([s.ja,...c]),answer:s.ja})})}),n.forEach(i=>{var g,f,c,h,_,l;if(!i.cuisine.topic||!i.cuisine.content_ja)return;const u=o(n,3,i.id,v=>v.cuisine.topic);let s="sauces";(g=i.tags)!=null&&g.includes("knife-cuts")||(f=i.tags)!=null&&f.includes("cuts")?s="cuts":(c=i.tags)!=null&&c.includes("meat")?s="meat":((h=i.tags)!=null&&h.includes("molecular")||(_=i.tags)!=null&&_.includes("chemistry")||(l=i.tags)!=null&&l.includes("science"))&&(s="science"),e.push({id:`dyn_cuis_topic_${i.id}`,type:"choice",category:s,question:`De quel concept culinaire s'agit-il : "${i.cuisine.content_ja.substring(0,120)}..." ? / Which culinary concept is described: "${i.cuisine.content_en.substring(0,120)}..."?`,question_fr:"De quel concept culinaire s'agit-il ?",question_en:"Which culinary concept is described here?",context:`Niveau : ${i.level}. Mots-clés : ${i.tags.join(", ")}`,options:le([i.cuisine.topic,...u]),answer:i.cuisine.topic})}),e}function an(){var o;const e=[],r=((o=x.db)==null?void 0:o.knowledge)||[],t=[];r.forEach(m=>{(m.examples||[]).forEach(i=>{t.push({fr:i.fr,ja:i.ja})})});const a=t.sort(()=>.5-Math.random());for(const m of a){if(e.length>=4)break;const i=m.fr.replace(/^➔\s*/,"").trim();if(i.includes(" - ")){const u=i.split(" - ");e.push({id:`pair_${e.length}`,left:`🗣️ ${u[0].trim()}`,right:`💬 ${u[1].trim()}`,context:m.ja})}else if(i.includes(",")){const u=i.split(",");e.push({id:`pair_${e.length}`,left:`${u[0].trim()} ,`,right:`... ${u[1].trim()}`,context:m.ja})}else{const u=i.split(" ");if(u.length>=4){const s=Math.floor(u.length/2),g=u.slice(0,s).join(" "),f=u.slice(s).join(" ");e.push({id:`pair_${e.length}`,left:`${g} ...`,right:`... ${f}`,context:m.ja})}}}const n=[{left:"🗣️ Chaud devant !",right:"💬 Oui, chef !",context:"お通りです！ / はい、シェフ！"},{left:"🗣️ Entrée prête ?",right:"💬 Oui, j'envoie.",context:"前菜はできていますか？ / はい、送ります。"},{left:"🗣️ Combien de couverts ?",right:"💬 Vingt couverts.",context:"何名様（何席）ですか？ / 20席です。"},{left:"🗣️ Envoyez la sauce !",right:"💬 Tout de suite !",context:"ソースを出して！ / ただちに！"}];for(;e.length<4;){const m=n[e.length%n.length];e.push({id:`default_${e.length}`,left:m.left,right:m.right,context:m.context})}return e}function rn(){var n;const e=document.createElement("div"),r=document.createElement("h2");r.className="section-title",r.innerText="Vérification des Connaissances",e.appendChild(r);const t=document.createElement("p");t.className="section-subtitle",t.innerText="Test your professional French vocabulary, kitchen commands, and classical cuisine theory.",e.appendChild(t);const a=document.createElement("div");return a.className="loading-placeholder",a.innerText="Chargement du quiz... (Loading quiz...)",e.appendChild(a),tn(),(n=x.settings)!=null&&n.targetLevel,Promise.all([Je(),oe("vocabulary","ALL"),oe("grammar","ALL"),oe("cuisine","ALL")]).then(()=>{a.remove(),on(e)}),e}function on(e){let r="multiple",t="ALL";const a=document.createElement("div");a.className="quiz-mode-selector",a.innerHTML=`
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
  `,e.appendChild(n);const o=n.querySelector("#quiz-cat-select");o.addEventListener("change",h=>{t=h.target.value,i()});const m=document.createElement("div");m.className="quiz-game-wrapper",e.appendChild(m),a.querySelectorAll(".mode-tab-btn").forEach(h=>{h.addEventListener("click",_=>{a.querySelectorAll(".mode-tab-btn").forEach(l=>l.classList.remove("active")),_.target.classList.add("active"),r=_.target.getAttribute("data-mode"),r==="matching_taking"?(o.disabled=!0,o.style.opacity="0.5"):(o.disabled=!1,o.style.opacity="1.0"),i()})});function i(){m.innerHTML="",r==="multiple"?u():r==="matching_vocab"?s():r==="matching_taking"?g():r==="spelling"&&c()}function u(){var p;const h=((p=x.db)==null?void 0:p.quizzes)||[],_=nn();let l=[...h,..._];if(t!=="ALL"&&(l=l.filter(y=>y.category===t)),l.length===0){m.innerHTML=`
        <div class="quiz-card" style="text-align: center; padding: 2rem;">
          <p style="color: var(--color-text-muted); font-style: italic;">Aucune question trouvée dans cette catégorie. Essayez un autre filtre !</p>
        </div>
      `;return}const v=le(l).slice(0,10);let A=0,T=0,P=!1;function d(){if(m.innerHTML="",P=!1,A>=v.length){const q=Math.round(T/v.length*100);let b="Apprenti (Apprentice)";q>=90?b="Chef de Partie (Station Chef)":q>=70&&(b="Commis de Cuisine (Line Cook)"),m.innerHTML=`
          <div class="quiz-card" style="text-align: center;">
            <h3 style="font-family: var(--font-serif); font-size: 2rem; color: var(--color-primary); margin-bottom: 1rem;">Session Terminée !</h3>
            <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">Your Score: <strong>${T} / ${v.length}</strong> (${q}%)</p>
            <div style="background-color: rgba(197, 168, 128, 0.1); border: 1px solid var(--color-accent); padding: 1.5rem; border-radius: var(--radius-md); margin-bottom: 2rem;">
              <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--color-text-muted); letter-spacing: 1px;">Assigned Rank</div>
              <div style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--color-primary); font-weight: 700; margin-top: 0.3rem;">${b}</div>
            </div>
            <button class="next-btn" id="restart-choice-btn" style="margin: 0 auto; display: block;">Restart Session</button>
          </div>
        `,m.querySelector("#restart-choice-btn").addEventListener("click",()=>{u()});return}const y=v[A],S=document.createElement("div");S.className="quiz-card",S.innerHTML=`
        <div class="quiz-meta">
          <span>Question ${A+1} of ${v.length}</span>
          <span class="grammar-badge" style="background-color: var(--color-secondary);">${y.category}</span>
        </div>
        
        <div class="quiz-question" style="display: flex; flex-direction: column; gap: 0.8rem; margin-bottom: 1.5rem;">
          <div class="q-fr" style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--color-primary); font-style: italic; line-height: 1.3;">${y.question_fr||y.question||""}</div>
          ${y.question_en?`
            <div class="quiz-hint-flip-container" style="cursor: pointer; margin-top: 0.5rem;">
              <div class="q-en-card" style="padding: 0.5rem; border-radius: var(--radius-sm); border: 1px dashed rgba(197, 168, 128, 0.4); text-align: center; background-color: rgba(197, 168, 128, 0.02); font-size: 0.85rem; color: var(--color-accent); font-weight: 500;">
                💡 Translate (Show English Hint)
              </div>
              <div class="q-en-hint-text" style="display: none; padding: 0.5rem; margin-top: 0.3rem; font-style: italic; color: var(--color-text-muted); font-size: 0.9rem;">${y.question_en}</div>
            </div>
          `:""}
        </div>
        
        <div class="quiz-options">
          ${y.options.map((q,b)=>`
            <button class="quiz-btn" data-index="${b}">${q}</button>
          `).join("")}
        </div>
        
        <div class="quiz-feedback" style="display: none; margin-top: 1.5rem; background-color: rgba(10,25,49,0.03); padding: 1rem; border-radius: var(--radius-sm); border-left: 3px solid var(--color-primary);">
          <strong>Contexte Culinaire:</strong>
          <p style="margin-top: 0.4rem; font-style: italic; font-size: 0.9rem;">${y.context}</p>
        </div>
        
        <div style="margin-top: 1.5rem;">
          <button class="next-btn" id="next-q-btn" style="display: none; margin-left: auto;">Continue →</button>
        </div>
      `;const k=S.querySelector(".quiz-hint-flip-container");k&&k.addEventListener("click",()=>{const q=k.querySelector(".q-en-hint-text"),b=q.style.display==="none";q.style.display=b?"block":"none",k.querySelector(".q-en-card").innerText=b?"💡 Hide English Hint":"💡 Translate (Show English Hint)"});const w=S.querySelectorAll(".quiz-btn"),C=S.querySelector(".quiz-feedback"),$=S.querySelector("#next-q-btn");w.forEach(q=>{q.addEventListener("click",b=>{if(P)return;P=!0;const E=b.target.innerText===y.answer;w.forEach(j=>{j.disabled=!0,j.innerText===y.answer&&j.classList.add("correct")}),E?T++:(b.target.classList.add("incorrect"),ot(y.id)),C.style.display="block",$.style.display="block"})}),$.addEventListener("click",()=>{A++,d()}),m.appendChild(S)}d()}function s(){var d,p;const h=((d=x.settings)==null?void 0:d.includeGeneral)||!1;let l=(((p=x.db)==null?void 0:p.vocabulary)||[]).filter(y=>h||y.is_professional);if(t!=="ALL"&&(t==="meat"?l=l.filter(y=>{var S,k,w,C;return((S=y.tags)==null?void 0:S.includes("meat"))||((k=y.tags)==null?void 0:k.includes("beef"))||((w=y.tags)==null?void 0:w.includes("pork"))||((C=y.tags)==null?void 0:C.includes("poultry"))||/viande|boeuf|porc|poulet/i.test(y.french)}):t==="sauces"?l=l.filter(y=>{var S,k,w;return((S=y.tags)==null?void 0:S.includes("sauce"))||((k=y.tags)==null?void 0:k.includes("sauces"))||((w=y.tags)==null?void 0:w.includes("stocks"))||/sauce|fond|jus|bouillon/i.test(y.french)}):t==="cuts"?l=l.filter(y=>{var S,k;return((S=y.tags)==null?void 0:S.includes("cutting"))||((k=y.tags)==null?void 0:k.includes("vegetables"))||/coupe|tailler|ciseler|mincer|brunoise|julienne/i.test(y.french)}):t==="science"?l=l.filter(y=>{var S;return((S=y.tags)==null?void 0:S.includes("science"))||/réaction|émulsion|liaison/i.test(y.french)}):t==="grammar"&&(l=[])),l.length<4){m.innerHTML=`
        <div class="quiz-card" style="text-align: center; padding: 2rem;">
          <p style="color: var(--color-text-muted); font-style: italic;">Il faut au moins 4 termes de vocabulaire dans cette catégorie pour jouer l'Association.</p>
        </div>
      `;return}const v=le(l).slice(0,4),A=le(v),T=le(v),P=document.createElement("div");P.className="quiz-card",P.innerHTML=`
      <div class="quiz-meta" style="margin-bottom: 1rem;">
        <span>🤝 Association (vocabulary)</span>
        <span class="grammar-badge" style="background-color: var(--color-primary);">Game</span>
      </div>
      <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 1.5rem;">
        Drag a French term from the left, and drop it onto its Japanese translation on the right. (Or click left card, then click match).
      </p>
      
      <div class="matching-board">
        <div class="matching-column" id="left-column">
          ${A.map(y=>`
            <div class="drag-card" draggable="true" data-id="${y.id}" id="drag-${y.id}">
              <span>${y.french}</span>
              <span style="font-size: 1rem; opacity: 0.3;">☰</span>
            </div>
          `).join("")}
        </div>
        
        <div class="matching-column" id="right-column">
          ${T.map(y=>`
            <div class="drop-zone" data-id="${y.id}">
              ${y.japanese}
            </div>
          `).join("")}
        </div>
      </div>
      
      <div id="matching-completion-panel" style="display: none; text-align: center; margin-top: 1.5rem;">
        <div style="color: var(--color-success); font-weight: 700; font-size: 1.1rem; margin-bottom: 1rem;">🤝 Excellent ! Tous les termes ont été associés avec succès.</div>
        <button class="next-btn" id="restart-match-btn" style="margin: 0 auto; display: block;">Play Again</button>
      </div>
    `,m.appendChild(P),f(P,4,s)}function g(){const h=an(),_=document.createElement("div");_.className="quiz-card",_.innerHTML=`
      <div class="quiz-meta" style="margin-bottom: 1rem;">
        <span>🤝 Association (taking) - Conversation & Cloze</span>
        <span class="grammar-badge" style="background-color: var(--color-success);">Dialogue</span>
      </div>
      <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 1.5rem;">
        Match dialogues or sentence fragments. Drag a card from the left, and drop it onto the correct continuation or response on the right.
      </p>
      
      <div class="matching-board">
        <div class="matching-column" id="left-column">
          ${le(h).map(l=>`
            <div class="drag-card" draggable="true" data-id="${l.id}" id="drag-${l.id}" style="font-size: 0.9rem; padding: 0.8rem;">
              <span>${l.left}</span>
              <span style="font-size: 1rem; opacity: 0.3;">☰</span>
            </div>
          `).join("")}
        </div>
        
        <div class="matching-column" id="right-column">
          ${le(h).map(l=>`
            <div class="drop-zone" data-id="${l.id}" style="font-size: 0.9rem; padding: 0.8rem; min-height: 48px;">
              ${l.right}
            </div>
          `).join("")}
        </div>
      </div>
      
      <div id="matching-completion-panel" style="display: none; text-align: center; margin-top: 1.5rem;">
        <div style="color: var(--color-success); font-weight: 700; font-size: 1.1rem; margin-bottom: 1rem;">🗣️ Parfait ! Vous maîtrisez la communication en cuisine.</div>
        <button class="next-btn" id="restart-match-btn" style="margin: 0 auto; display: block;">Play Again</button>
      </div>
    `,m.appendChild(_),f(_,4,g)}function f(h,_,l){let v=null,A=null,T=0;const P=h.querySelectorAll(".drag-card"),d=h.querySelectorAll(".drop-zone"),p=h.querySelector("#matching-completion-panel");P.forEach(k=>{k.addEventListener("dragstart",w=>{v=w.target.closest(".drag-card").getAttribute("data-id"),w.target.closest(".drag-card").classList.add("dragging")}),k.addEventListener("dragend",w=>{w.target.closest(".drag-card").classList.remove("dragging")}),k.addEventListener("click",w=>{const C=w.target.closest(".drag-card");C.classList.contains("matched")||(P.forEach($=>$.style.borderColor="rgba(10,25,49,0.08)"),A=C.getAttribute("data-id"),C.style.borderColor="var(--color-accent)")})}),d.forEach(k=>{k.addEventListener("dragover",w=>{w.preventDefault(),k.classList.contains("matched")||k.classList.add("hovered")}),k.addEventListener("dragleave",()=>{k.classList.remove("hovered")}),k.addEventListener("drop",w=>{w.preventDefault(),k.classList.remove("hovered");const C=k.getAttribute("data-id");v===C?S(v,k):y(v)}),k.addEventListener("click",()=>{if(k.classList.contains("matched")||!A)return;const w=k.getAttribute("data-id");A===w?(S(A,k),A=null):(y(A),A=null,P.forEach(C=>C.style.borderColor="rgba(10,25,49,0.08)"))})});function y(k){const w=h.querySelector(`#drag-${k}`);w&&(w.style.animation="shake-anim 0.4s ease-in-out",setTimeout(()=>w.style.animation="",400))}function S(k,w){const C=h.querySelector(`#drag-${k}`);C.classList.add("matched"),C.style.borderColor="var(--color-success)",w.classList.add("matched"),T++,T===_&&(p.style.display="block")}h.querySelector("#restart-match-btn").addEventListener("click",()=>{l()})}function c(){var C,$,q;const h=((C=x.settings)==null?void 0:C.includeGeneral)||!1;let l=((($=x.db)==null?void 0:$.vocabulary)||[]).filter(b=>h||b.is_professional);const A=(((q=x.db)==null?void 0:q.grammar)||[]).flatMap(b=>(b.examples||[]).map(L=>({id:`spelling_grammar_${b.id}_${L.fr}`,french:L.fr,japanese:L.ja,category:"grammar",is_professional:!0,definition_fr:`Thème de grammaire: ${b.topic}`})));if(t==="ALL"?l=l.concat(A):t==="meat"?l=l.filter(b=>{var L,E,j,z;return((L=b.tags)==null?void 0:L.includes("meat"))||((E=b.tags)==null?void 0:E.includes("beef"))||((j=b.tags)==null?void 0:j.includes("pork"))||((z=b.tags)==null?void 0:z.includes("poultry"))||/viande|boeuf|porc|poulet/i.test(b.french)}):t==="sauces"?l=l.filter(b=>{var L,E,j;return((L=b.tags)==null?void 0:L.includes("sauce"))||((E=b.tags)==null?void 0:E.includes("sauces"))||((j=b.tags)==null?void 0:j.includes("stocks"))||/sauce|fond|jus|bouillon/i.test(b.french)}):t==="cuts"?l=l.filter(b=>{var L,E;return((L=b.tags)==null?void 0:L.includes("cutting"))||((E=b.tags)==null?void 0:E.includes("vegetables"))||/coupe|tailler|ciseler|mincer|brunoise|julienne/i.test(b.french)}):t==="science"?l=l.filter(b=>{var L;return((L=b.tags)==null?void 0:L.includes("science"))||/réaction|émulsion|liaison/i.test(b.french)}):t==="map"?l=l.filter(b=>{var L,E;return((L=b.tags)==null?void 0:L.includes("map"))||((E=b.tags)==null?void 0:E.includes("region"))||/région|ville|carte|terroir/i.test(b.french)}):t==="grammar"&&(l=A),l.length===0){m.innerHTML=`
        <div class="quiz-card" style="text-align: center; padding: 2rem;">
          <p style="color: var(--color-text-muted); font-style: italic;">Aucun terme de vocabulaire disponible dans cette catégorie pour jouer l'Orthographe.</p>
        </div>
      `;return}let T=le(l)[0];const P=document.createElement("div");P.className="quiz-card",P.innerHTML=`
      <div class="quiz-meta" style="margin-bottom: 1.2rem;">
        <span>📖 Orthographe de Cuisine</span>
        <span class="grammar-badge" style="background-color: var(--color-secondary);">${T.category}</span>
      </div>
      
      <div class="spelling-box" style="margin-bottom: 1.5rem; background-color: rgba(10,25,49,0.02); padding: 1.2rem; border-radius: var(--radius-sm); border-left: 3px solid var(--color-accent);">
        <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-accent); font-weight: 600; margin-bottom: 0.4rem;">Définition en Français (Monolingual Clue):</div>
        <p style="font-size: 1.05rem; font-style: italic; color: var(--color-primary); line-height: 1.4; font-family: var(--font-serif);">${T.definition_fr}</p>
        
        <div style="margin-top: 1rem; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 0.8rem; font-size: 0.85rem; color: var(--color-text-muted);">
          <strong>Hint (Japanese):</strong> ${T.japanese}
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
    `,m.appendChild(P);const d=P.querySelector("#spelling-input-field"),p=P.querySelector("#spelling-submit-btn"),y=P.querySelector("#spelling-next-btn"),S=P.querySelector("#spelling-feedback-panel"),k=P.querySelector("#spelling-feedback-title"),w=P.querySelector("#spelling-feedback-msg");d.addEventListener("keydown",b=>{b.key==="Enter"&&p.click()}),p.addEventListener("click",()=>{const b=d.value,L=T.french,E=it(b),j=it(L),z=E===j;d.disabled=!0,p.style.display="none",y.style.display="block",S.style.display="block",z?(d.style.borderColor="var(--color-success)",d.style.backgroundColor="#E8F5E9",S.style.backgroundColor="#E8F5E9",S.style.color="var(--color-success)",k.innerText="✓ Félicitations ! (Correct)",w.innerText=`You correctly spelled: "${L}"`):(d.style.borderColor="var(--color-error)",d.style.backgroundColor="#FFEBEE",S.style.backgroundColor="#FFEBEE",S.style.color="var(--color-error)",k.innerText="✗ Incorrect",w.innerHTML=`Correct spelling is: <strong>${L}</strong>.<br><em style="font-size:0.85rem;">You typed: "${b}"</em>`,ot(T.id))}),y.addEventListener("click",()=>{c()})}i()}function $e(){const e=document.createElement("div"),r=document.createElement("h2");r.className="section-title",r.innerText="Coups de Cœur (Favorites)",e.appendChild(r);const t=document.createElement("p");t.className="section-subtitle",t.innerText="Your bookmarked vocabulary terms, grammar guides, and culinary theories.",e.appendChild(t);const a=Array.from(x.favorites);if(a.length===0)return e.innerHTML+=`
      <div class="alert alert-info">
        <p>No favorites saved yet. Browse Vocabulary, Grammar, or Cuisine and click the star (☆) button to save items here.</p>
      </div>
    `,e;const n=document.createElement("div");return n.className="loading-placeholder",n.innerText="Chargement des favoris... (Loading favorites...)",e.appendChild(n),Ye().then(()=>{n.remove(),sn(e,a)}),e}function sn(e,r){var i,u,s;const t=(((i=x.db)==null?void 0:i.vocabulary)||[]).filter(g=>r.includes(g.id)),a=(((u=x.db)==null?void 0:u.grammar)||[]).filter(g=>r.includes(g.id)),n=(((s=x.db)==null?void 0:s.cuisine)||[]).filter(g=>r.includes(g.id)),o=document.createElement("div");o.className="card-grid",e.appendChild(o);function m(){o.innerHTML="",t.forEach(g=>{const f=document.createElement("div");f.className="card",f.innerHTML=`
        <div>
          <div class="card-category">Vocabulary: ${g.category}</div>
          <div class="term-header">
            <h3 class="term-title">${g.french}</h3>
            <button class="fav-btn active" data-id="${g.id}">★</button>
          </div>
          <div class="term-translations">
            <div class="trans-en">${g.english}</div>
            <div class="trans-ja">${g.japanese}</div>
          </div>
        </div>
        <div class="term-context">
          <div class="context-fr">"${g.context_fr}"</div>
          <div class="context-ja">${g.context_ja}</div>
        </div>
      `,f.querySelector(".fav-btn").addEventListener("click",c=>{be(g.id),$e(),e.innerHTML="",e.appendChild($e())}),o.appendChild(f)}),a.forEach(g=>{var c,h;const f=document.createElement("div");f.className="card",f.innerHTML=`
        <div>
          <div class="card-category">Grammar: ${g.level}</div>
          <div class="term-header">
            <h3 class="term-title" style="font-size: 1.25rem;">${g.topic}</h3>
            <button class="fav-btn active" data-id="${g.id}">★</button>
          </div>
          <p style="font-size: 0.85rem; margin-bottom: 1rem; color: var(--color-text-main);">${g.explanation_en.substring(0,100)}...</p>
        </div>
        <div style="font-size: 0.8rem; font-weight: bold; text-transform: uppercase; color: var(--color-accent);">Example:</div>
        <div class="term-context" style="margin-top: 0.5rem;">
          <div class="context-fr">"${((c=g.examples[0])==null?void 0:c.fr)||""}"</div>
          <div class="context-ja">${((h=g.examples[0])==null?void 0:h.ja)||""}</div>
        </div>
      `,f.querySelector(".fav-btn").addEventListener("click",_=>{be(g.id),e.innerHTML="",e.appendChild($e())}),o.appendChild(f)}),n.forEach(g=>{const f=document.createElement("div");f.className="card",f.innerHTML=`
        <div>
          <div class="card-category">Cuisine: ${g.category}</div>
          <div class="term-header">
            <h3 class="term-title" style="font-size: 1.25rem;">${g.topic}</h3>
            <button class="fav-btn active" data-id="${g.id}">★</button>
          </div>
          <p style="font-size: 0.85rem; margin-bottom: 1rem; color: var(--color-text-main);">${g.content_en.substring(0,100)}...</p>
        </div>
      `,f.querySelector(".fav-btn").addEventListener("click",c=>{be(g.id),e.innerHTML="",e.appendChild($e())}),o.appendChild(f)})}m()}function ln(){const e=document.createElement("div"),r=document.createElement("h2");r.className="section-title",r.innerText="Pont d'Études (SRS Review Deck)",e.appendChild(r);const t=document.createElement("p");t.className="section-subtitle",t.innerText="Review and grade yourself on items scheduled for active recall today.",e.appendChild(t);const a=document.createElement("div");return a.className="loading-placeholder",a.innerText="Chargement des révisions... (Loading reviews...)",e.appendChild(a),Ye().then(()=>{a.remove(),cn(e)}),e}function cn(e){var u,s,g,f;const r=new Date().toISOString().split("T")[0],a=[...(((u=x.db)==null?void 0:u.vocabulary)||[]).map(c=>({...c,type:"vocabulary",front:c.french})),...(((s=x.db)==null?void 0:s.grammar)||[]).map(c=>({...c,type:"grammar",front:c.topic})),...(((g=x.db)==null?void 0:g.cuisine)||[]).map(c=>({...c,type:"cuisine",front:c.topic})),...(((f=x.db)==null?void 0:f.quizzes)||[]).map(c=>({...c,type:"quiz",front:c.question_fr||c.question||""}))].filter(c=>{const h=x.srs[c.id];return x.wrongAnswers.includes(c.id)||h&&h.dueDate<=r}),n=a.length;let o=0;const m=document.createElement("div");m.className="srs-review-container",e.appendChild(m);function i(){if(m.innerHTML="",a.length===0||o>=a.length){m.innerHTML=`
        <div class="alert alert-info" style="background-color: #E8F5E9; border-left-color: var(--color-success); color: var(--color-success); padding: 2rem; text-align: center;">
          <h3 style="font-family: var(--font-serif); font-size: 1.8rem; margin-bottom: 0.5rem;">Tout est propre !</h3>
          <p>No cards due for review today. Excellent job keeping up with your kitchen training!</p>
        </div>
      `;return}const c=a[o];x.srs[c.id];const h=x.wrongAnswers.includes(c.id),_=document.createElement("div");_.className="card srs-flip-card",_.style.padding="2rem",_.style.minHeight="300px",_.style.display="flex",_.style.flexDirection="column",_.style.justifyContent="space-between";let l=c.category||c.level||"Theory";c.type==="quiz"&&(l="Quiz Mistake");let v=`
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
          <span class="card-category">${l} • ${c.type.toUpperCase()}</span>
          <span style="font-size: 0.8rem; color: var(--color-text-muted);">
            Card ${o+1} of ${n}
            ${h?' <span style="color: var(--color-error); font-weight: bold;">(Wrong Answer)</span>':""}
          </span>
        </div>
        <div style="text-align: center; margin: 2rem 0;">
          <h1 style="font-family: var(--font-serif); font-size: 1.8rem; color: var(--color-primary); font-style: italic; line-height: 1.3;">${c.front}</h1>
          ${c.type==="grammar"?'<p style="color: var(--color-text-muted); margin-top: 0.5rem;">French Grammar Topic</p>':""}
          ${c.type==="cuisine"?'<p style="color: var(--color-text-muted); margin-top: 0.5rem;">Culinary Theory Guide</p>':""}
          ${c.type==="quiz"&&c.question_en?`<p style="font-family: var(--font-sans); color: var(--color-text-muted); font-size: 0.95rem; font-style: normal; font-weight: normal; margin-top: 0.8rem;">${c.question_en}</p>`:""}
        </div>
      </div>
      <button class="next-btn" id="reveal-btn" style="width: 100%; font-size: 1.1rem; padding: 0.8rem;">
        Afficher la réponse (Reveal Answer)
      </button>
    `;_.innerHTML=v;let A="";c.type==="vocabulary"?A=`
        <div style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.8rem;">
          <div style="background-color: rgba(197, 168, 128, 0.04); border-left: 3px solid var(--color-accent); padding: 0.8rem 1rem; border-radius: var(--radius-sm);">
            <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-accent); font-weight: 600; margin-bottom: 0.2rem; display: flex; align-items: center; gap: 0.4rem;">
              <span>Définition Monolingue (FR)</span>
              <button class="audio-btn" data-text="${c.definition_fr}" title="Listen definition" style="background: none; border: none; font-size: 0.85rem; cursor: pointer; color: var(--color-accent); padding: 0;">🔊</button>
            </div>
            <p style="font-size: 0.95rem; line-height: 1.4; color: var(--color-text-main); font-weight: 500; font-style: italic;">${c.definition_fr||"Pas de définition."}</p>
          </div>
          
          <div class="flip-translation-container">
            <div class="flip-translation-card">
              <div class="flip-front">🇬🇧 Afficher l'anglais (Show English Translation)</div>
              <div class="flip-back" style="color: var(--color-secondary); justify-content: center; font-weight: 600;">🇬🇧 ${c.english}</div>
            </div>
          </div>
          
          <div class="trans-ja" style="font-size: 1.1rem; color: var(--color-text-main); font-weight: 500;">${c.japanese}</div>
        </div>
        <div class="term-context" style="margin-top: 1.2rem; background-color: rgba(197, 168, 128, 0.05); padding: 1rem; border-radius: var(--radius-sm);">
          <div class="context-fr" style="display: flex; align-items: flex-start; gap: 0.4rem; font-style: italic; color: var(--color-primary);">
            <span style="flex: 1;">"${c.context_fr}"</span>
            <button class="audio-btn" data-text="${c.context_fr}" title="Listen context" style="background: none; border: none; font-size: 0.85rem; cursor: pointer; color: var(--color-text-muted); padding: 0.15rem;">🔊</button>
          </div>
          <div class="context-ja" style="color: var(--color-text-muted); margin-top: 0.3rem;">${c.context_ja}</div>
        </div>
      `:c.type==="grammar"?A=`
        <div style="margin-top: 1rem;">
          <p style="font-weight: 600; color: var(--color-primary);">Explanation (EN):</p>
          <p style="font-size: 0.9rem; margin-bottom: 0.8rem;">${c.explanation_en}</p>
          <p style="font-weight: 600; color: var(--color-primary);">説明 (JA):</p>
          <p style="font-size: 0.9rem; margin-bottom: 1rem;">${c.explanation_ja}</p>
          <div class="examples-list" style="border-top: 1px solid rgba(0,0,0,0.05); padding-top: 0.8rem;">
            ${c.examples.map(T=>`
              <div class="example-item" style="margin-bottom: 0.5rem;">
                <div class="example-fr">➔ ${T.fr}</div>
                <div class="example-ja" style="font-size: 0.8rem; color: var(--color-text-muted);">${T.ja}</div>
              </div>
            `).join("")}
          </div>
        </div>
      `:c.type==="cuisine"?A=`
        <div style="margin-top: 1rem; display: flex; flex-direction: column; gap: 1rem;">
          <div>
            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-accent); font-weight: 600;">Français</h4>
            <p style="font-size: 0.95rem; font-style: italic; color: var(--color-primary); line-height: 1.5;">${c.content_fr}</p>
          </div>
          <div>
            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-accent); font-weight: 600;">English</h4>
            <p style="font-size: 0.9rem; color: var(--color-text-main); line-height: 1.5;">${c.content_en}</p>
          </div>
          <div style="background-color: rgba(10, 25, 49, 0.03); padding: 0.8rem; border-radius: var(--radius-sm); border-left: 3px solid var(--color-secondary);">
            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-primary); font-weight: 600;">日本語解説</h4>
            <p style="font-size: 0.85rem; color: var(--color-text-main); line-height: 1.5;">${c.content_ja}</p>
          </div>
        </div>
      `:c.type==="quiz"&&(A=`
        <div style="margin-top: 1rem; display: flex; flex-direction: column; gap: 1rem;">
          <div style="background-color: rgba(70, 163, 73, 0.08); border-left: 3px solid var(--color-success); padding: 1rem; border-radius: var(--radius-sm);">
            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-success); font-weight: 600; margin-bottom: 0.2rem;">Correct Solution</h4>
            <p style="font-size: 1.1rem; color: var(--color-text-main); font-weight: 600;">${c.answer}</p>
          </div>
          <div>
            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-accent); font-weight: 600; margin-bottom: 0.2rem;">Kitchen Context / Explanation</h4>
            <p style="font-size: 0.9rem; color: var(--color-text-main); line-height: 1.5;">${c.context}</p>
          </div>
        </div>
      `),_.querySelector("#reveal-btn").addEventListener("click",()=>{_.innerHTML=`
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <span class="card-category">${l} • ${c.type.toUpperCase()}</span>
            <span style="font-size: 0.8rem; color: var(--color-text-muted);">Card ${o+1} of ${n}</span>
          </div>
          
          <h2 style="font-family: var(--font-serif); font-size: 1.8rem; color: var(--color-primary); font-style: italic; text-align: center; margin-bottom: 1rem; line-height: 1.3;">${c.front}</h2>
          ${c.type==="quiz"&&c.question_en?`<p style="font-family: var(--font-sans); color: var(--color-text-muted); font-size: 0.9rem; text-align: center; margin-bottom: 1.5rem;">${c.question_en}</p>`:""}
          
          <div style="max-height: 300px; overflow-y: auto; padding-right: 0.5rem; margin-bottom: 2rem;">
            ${A}
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
      `;const T=_.querySelector(".flip-translation-container");T&&T.addEventListener("click",P=>{P.stopPropagation(),T.querySelector(".flip-translation-card").classList.toggle("flipped")}),_.querySelectorAll(".audio-btn").forEach(P=>{P.addEventListener("click",d=>{d.stopPropagation();const p=d.target.closest(".audio-btn").getAttribute("data-text");te(p)})}),_.querySelectorAll(".srs-score-btn").forEach(P=>{P.addEventListener("click",d=>{const p=parseInt(d.target.getAttribute("data-score"));He(c.id,p),p>=4&&h&&Cn(c.id),o++,i()})})}),m.appendChild(_)}i()}function dn(){const e=document.createElement("div"),r=document.createElement("h2");r.className="section-title",r.innerText="Recherche Globale",e.appendChild(r);const t=document.createElement("p");t.className="section-subtitle",t.innerText="Search terms across the entire curriculum: Vocabulary, Grammar, and Culinary Theory.",e.appendChild(t);const a=document.createElement("div");a.className="search-box-wrapper",a.style.marginBottom="2rem",a.style.position="relative";const n=document.createElement("input");n.type="text",n.placeholder="Chargement de la base de données... (Loading database...)",n.className="search-input",n.style.width="100%",n.style.padding="1rem 1.5rem",n.style.fontSize="1.1rem",n.style.borderRadius="var(--radius-md)",n.style.border="2px solid rgba(197, 168, 128, 0.2)",n.style.backgroundColor="var(--color-bg)",n.style.fontFamily="var(--font-sans)",n.style.transition="var(--transition)",n.style.outline="none",n.disabled=!0,n.addEventListener("focus",()=>{n.style.borderColor="var(--color-accent)",n.style.boxShadow="0 0 10px rgba(212, 175, 55, 0.15)"}),n.addEventListener("blur",()=>{n.style.borderColor="rgba(197, 168, 128, 0.2)",n.style.boxShadow="none"}),a.appendChild(n),e.appendChild(a);const o=document.createElement("div");return o.className="search-results",e.appendChild(o),o.innerHTML=`
    <div style="text-align: center; padding: 3rem; color: var(--color-text-muted);">
      <p>Préparation de la recherche... (Preparing search database...)</p>
    </div>
  `,Ye().then(()=>{n.disabled=!1,n.placeholder="Rechercher... (e.g. sauce, roux, cut, culer, 刻む)";function m(i){var _;if(o.innerHTML="",!i.trim()){o.innerHTML=`
          <div style="text-align: center; padding: 3rem; color: var(--color-text-muted);">
            <span style="font-size: 3rem;">🔍</span>
            <p style="margin-top: 1rem;">Tapez un mot-clé pour commencer votre recherche.</p>
          </div>
        `;return}const u=i.toLowerCase().trim(),s=((_=x.db)==null?void 0:_.knowledge)||[],g=s.filter(l=>l.french&&l.japanese&&!l.grammar&&!l.cuisine),f=s.filter(l=>l.grammar),c=s.filter(l=>l.cuisine),h=[];if(g.forEach(l=>{`${l.french} ${l.english} ${l.japanese} ${l.category} ${l.context_fr} ${l.context_en} ${l.context_ja} ${(l.tags||[]).join(" ")}`.toLowerCase().includes(u)&&h.push({...l,type:"vocabulary",title:l.french,subtitle:`${l.category} • Vocabulary`})}),f.forEach(l=>{`${l.topic} ${l.explanation_en} ${l.explanation_ja} ${l.level} ${(l.tags||[]).join(" ")} ${l.examples.map(A=>`${A.fr} ${A.en} ${A.ja}`).join(" ")}`.toLowerCase().includes(u)&&h.push({...l,type:"grammar",title:l.topic,subtitle:`${l.level} • Grammar Lesson`})}),c.forEach(l=>{const v=l.cuisine;`${v.topic} ${l.category} ${v.content_fr} ${v.content_en} ${v.content_ja} ${(l.tags||[]).join(" ")}`.toLowerCase().includes(u)&&h.push({...l,type:"cuisine",title:v.topic,subtitle:`${l.category} • Culinary Theory`})}),h.length===0){o.innerHTML=`
          <div style="text-align: center; padding: 3rem; color: var(--color-text-muted);">
            <p>Aucun résultat trouvé pour "<strong>${i}</strong>".</p>
            <p style="font-size: 0.9rem; margin-top: 0.5rem;">Check your spelling or try another keyword.</p>
          </div>
        `;return}h.forEach(l=>{const v=document.createElement("div");v.className="card search-result-card",v.style.marginBottom="1.2rem",v.style.borderLeft=`4px solid ${l.type==="vocabulary"?"var(--color-primary)":l.type==="grammar"?"var(--color-secondary)":"var(--color-accent)"}`;const A=fe(l.id);let T="";l.type==="vocabulary"?T=`
            <div class="term-translations" style="margin-top: 0.5rem;">
              <div class="trans-en">${l.english}</div>
              <div class="trans-ja">${l.japanese}</div>
            </div>
            <div class="term-context" style="margin-top: 1rem;">
              <div class="context-fr">"${l.context_fr}"</div>
              <div class="context-ja">${l.context_ja}</div>
            </div>
          `:l.type==="grammar"?T=`
            <p style="font-size: 0.9rem; margin-top: 0.5rem; color: var(--color-text-main);">${l.explanation_en}</p>
            <p style="font-size: 0.85rem; margin-top: 0.3rem; color: var(--color-text-muted);">${l.explanation_ja}</p>
            <div class="examples-list" style="margin-top: 1rem; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 0.8rem;">
              ${l.examples.slice(0,2).map(y=>`
                <div class="example-item" style="margin-bottom: 0.5rem;">
                  <div class="example-fr" style="font-weight: 500;">➔ ${y.fr}</div>
                  <div class="example-ja" style="font-size: 0.8rem; color: var(--color-text-muted);">${y.ja}</div>
                </div>
              `).join("")}
            </div>
          `:l.type==="cuisine"&&(T=`
            <p style="font-size: 0.9rem; margin-top: 0.5rem; font-style: italic; color: var(--color-primary);">${(l.cuisine.content_fr||"").substring(0,150)}...</p>
            <p style="font-size: 0.85rem; margin-top: 0.5rem; color: var(--color-text-main);">${(l.cuisine.content_ja||"").substring(0,120)}...</p>
          `);const P=(l.tags||[]).map(y=>`<span class="tag-badge" style="background-color: rgba(197, 168, 128, 0.12); color: var(--color-accent); font-size: 0.75rem; padding: 0.2rem 0.6rem; border-radius: 20px; font-weight: 500;">#${y}</span>`).join(" "),d=l.type==="vocabulary"?Ie(l.french):"",p=d?`<div class="preposition-illustration-container" style="height: 130px; background-color: #fcfbfa; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; margin: 0.8rem 0; overflow: hidden; border: 1px solid rgba(0,0,0,0.03);">${d}</div>`:"";v.innerHTML=`
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem;">
            <div>
              <div class="card-category" style="margin: 0; font-size: 0.75rem;">${l.subtitle}</div>
              <h3 class="term-title" style="margin-top: 0.2rem; font-size: 1.4rem;">${l.title}</h3>
            </div>
            <button class="fav-btn ${A?"active":""}" data-id="${l.id}">
              ${A?"★":"☆"}
            </button>
          </div>
          ${p}
          ${T}
          ${l.tags&&l.tags.length>0?`<div style="margin-top: 1rem; display: flex; flex-wrap: wrap; gap: 0.4rem;">${P}</div>`:""}
        `,v.querySelector(".fav-btn").addEventListener("click",y=>{y.stopPropagation(),be(l.id);const S=y.target,k=fe(l.id);S.classList.toggle("active",k),S.innerText=k?"★":"☆"}),o.appendChild(v)})}n.addEventListener("input",i=>{m(i.target.value)}),m("")}),e}function mn(){const e=document.createElement("div"),r=document.createElement("h2");r.className="section-title",r.innerText="Configuration de l'Académie",e.appendChild(r);const t=document.createElement("p");t.className="section-subtitle",t.innerText="Customize your learning goals, target CEFR levels, and database options.",e.appendChild(t);const a=document.createElement("div");a.className="card",a.style.padding="2rem";const n=x.settings;a.innerHTML=`
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
  `;const o=a.querySelector("#target-level-select"),m=a.querySelector("#new-cards-goal"),i=a.querySelector("#max-reviews-goal"),u=a.querySelector("#include-general-checkbox"),s=a.querySelector("#settings-status");function g(){const f=o.value,c=parseInt(m.value)||5,h=parseInt(i.value)||20,_=u.checked;Ln({targetLevel:f,newCardsPerDay:c,maxReviewsPerDay:h,includeGeneral:_}),s.style.display="block",setTimeout(()=>{s.style.display="none"},3e3)}return o.addEventListener("change",g),m.addEventListener("input",g),i.addEventListener("input",g),u.addEventListener("change",g),a.querySelector("#reset-srs-btn").addEventListener("click",()=>{confirm("Voulez-vous vraiment réinitialiser toutes vos données de progression SRS ? Cette action est irréversible.")&&(localStorage.removeItem("cba_srs"),x.srs={},alert("Spaced Repetition System progress has been reset."),window.location.reload())}),a.querySelector("#clear-favs-btn").addEventListener("click",()=>{confirm("Voulez-vous vraiment supprimer tous vos favoris ?")&&(localStorage.removeItem("cba_favorites"),x.favorites=new Set,alert("All favorites have been cleared."),window.location.reload())}),a.querySelector("#share-app-btn").addEventListener("click",()=>{const f={title:"Académie de la Brigade",text:"フランス料理・厨房フランス語の統合学習PWAアプリ「Académie de la Brigade」で一緒に料理と語学を学びましょう！",url:window.location.origin+window.location.pathname};navigator.share?navigator.share(f).then(()=>console.log("Shared successfully")).catch(c=>console.log("Error sharing:",c)):navigator.clipboard.writeText(f.url).then(()=>{alert("App link copied to clipboard! Share it with your friends.")}).catch(c=>{console.error("Failed to copy link:",c)})}),e.appendChild(a),e}function un(){var o;const e=document.createElement("div"),r=document.createElement("h2");r.className="section-title",r.innerText="Dictée de Cuisine (Culinary Dictations)",e.appendChild(r);const t=document.createElement("p");t.className="section-subtitle",t.innerText="Listen to French kitchen instruction sentences, type what you hear, and master French spelling.",e.appendChild(t);const a=document.createElement("div");a.className="loading-placeholder",a.innerText="Chargement de la dictée... (Loading dictation...)",e.appendChild(a);const n=((o=x.settings)==null?void 0:o.targetLevel)||"ALL";return oe("vocabulary",n).then(()=>{a.remove(),pn(e)}),e}function pn(e){var v,A;const r=((v=x.settings)==null?void 0:v.includeGeneral)||!1,n=(((A=x.db)==null?void 0:A.vocabulary)||[]).filter(T=>r||T.is_professional).filter(T=>T.context_fr);if(n.length===0){e.innerHTML+='<p style="color: var(--color-text-muted);">Aucun exercice disponible.</p>';return}const o=[...n].sort(()=>.5-Math.random()).slice(0,5);let m=0,i=!1,u=!1,s=!1,g=0,f=1;const c=document.createElement("div");c.className="dictation-container",c.style.maxWidth="600px",c.style.margin="1.5rem auto",e.appendChild(c);function h(T){return T.toLowerCase().trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()'"?]/g,"").replace(/\s+/g," ")}function _(T){return T.normalize("NFD").replace(/[\u0300-\u036f]/g,"")}function l(){if(c.innerHTML="",i=!1,De(),u=!1,s=!1,g=0,m>=o.length){const z=document.createElement("div");z.className="card",z.style.padding="2.5rem",z.style.textAlign="center",z.innerHTML=`
        <h3 style="font-family: var(--font-serif); font-size: 2rem; color: var(--color-primary); margin-bottom: 1rem;">Session Terminée !</h3>
        <p style="font-size: 1.1rem; margin-bottom: 2rem; color: var(--color-text-muted);">You completed all culinary dictation drills in this session.</p>
        <button id="restart-dictation-btn" class="next-btn" style="width: 100%;">Restart New Dictation Session</button>
      `,z.querySelector("#restart-dictation-btn").addEventListener("click",()=>{m=0,o.length=0,o.push(...[...n].sort(()=>.5-Math.random()).slice(0,5)),l()}),c.appendChild(z);return}const T=o[m],P=T.context_fr,d=document.createElement("div");d.className="card",d.style.padding="2rem",d.innerHTML=`
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 0.8rem;">
        <span class="card-category" style="margin: 0;">Drill ${m+1} of ${o.length}</span>
        <span style="font-size: 0.8rem; color: var(--color-text-muted); font-weight: 500;">Topic: ${T.category}</span>
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
    `;const p=d.querySelector("#play-pause-btn"),y=d.querySelector("#stop-btn"),S=d.querySelector("#speed-normal-btn"),k=d.querySelector("#speed-slow-btn"),w=d.querySelector("#dictation-seekbar"),C=d.querySelector("#dictation-input"),$=d.querySelector("#check-btn"),q=d.querySelector("#next-dictation-btn"),b=d.querySelector("#dictation-feedback");function L(z,F){if(!i){const H=z/F*100;w.value=Math.round(H),g=z}}function E(){u=!1,s=!1,g=0,p.innerText="▶ Play",w.value=0}function j(){lt(P,f,L,E,g)}p.addEventListener("click",()=>{i||(u?s?(s=!1,p.innerText="⏸ Pause",qt()):(s=!0,p.innerText="▶ Play",zt()):(u=!0,s=!1,p.innerText="⏸ Pause",j()))}),y.addEventListener("click",()=>{De(),E()}),w.addEventListener("change",z=>{if(i)return;const F=parseInt(z.target.value),H=P.replace(/["'➔]/g,"").trim();g=Math.floor(F/100*H.length);const ee=H.indexOf(" ",g);ee!==-1&&ee-g<5&&(g=ee+1),u=!0,s=!1,p.innerText="⏸ Pause",j()}),S.addEventListener("click",()=>{f!==1&&(f=1,S.classList.add("active"),S.style.backgroundColor="var(--color-primary)",S.style.color="#FFFFFF",k.classList.remove("active"),k.style.backgroundColor="transparent",k.style.color="var(--color-accent)",u&&!s&&j())}),k.addEventListener("click",()=>{f!==.75&&(f=.75,k.classList.add("active"),k.style.backgroundColor="var(--color-accent)",k.style.color="#FFFFFF",S.classList.remove("active"),S.style.backgroundColor="transparent",S.style.color="var(--color-accent)",u&&!s&&j())}),$.addEventListener("click",()=>{if(i)return;De(),E();const z=C.value,F=h(z),H=h(P),ee=_(F),Y=_(H);let ne=!1,ce=!1;F===H?ne=!0:ee===Y&&(ce=!0),b.style.display="block",C.disabled=!0,$.style.display="none",q.style.display="block",i=!0,ne?(b.style.backgroundColor="#E8F5E9",b.style.borderLeft="4px solid var(--color-success)",b.style.color="var(--color-success)",b.innerHTML=`
          <strong style="font-size: 1.1rem; display: block; margin-bottom: 0.4rem;">Très bien ! (Excellent!)</strong>
          <p style="font-size: 0.9rem; color: var(--color-text-main);">Your spelling is perfectly correct.</p>
          <div style="margin-top: 0.8rem; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 0.6rem; font-size: 0.85rem; color: var(--color-text-muted);">
            <strong>Meaning:</strong> ${T.context_ja}
          </div>
        `):ce?(b.style.backgroundColor="#FFF3E0",b.style.borderLeft="4px solid var(--color-accent)",b.style.color="#E65100",b.innerHTML=`
          <strong style="font-size: 1.1rem; display: block; margin-bottom: 0.4rem;">Presque correct ! (Almost correct)</strong>
          <p style="font-size: 0.9rem; color: var(--color-text-main);">Watch out for French accents (é, è, à, ç, etc.) or punctuation spacing.</p>
          <div style="margin: 0.8rem 0; padding: 0.6rem; background: rgba(0,0,0,0.02); font-size: 0.9rem; border-radius: var(--radius-sm);">
            <div><strong>Expected:</strong> <span style="font-family: monospace; font-weight: 600; color: var(--color-success);">${P}</span></div>
            <div style="margin-top: 0.2rem;"><strong>Your input:</strong> <span style="font-family: monospace; font-weight: 600; color: var(--color-error);">${z}</span></div>
          </div>
          <div style="border-top: 1px solid rgba(0,0,0,0.05); padding-top: 0.6rem; font-size: 0.85rem; color: var(--color-text-muted);">
            <strong>Meaning:</strong> ${T.context_ja}
          </div>
        `):(b.style.backgroundColor="#FFEBEE",b.style.borderLeft="4px solid var(--color-error)",b.style.color="var(--color-error)",b.innerHTML=`
          <strong style="font-size: 1.1rem; display: block; margin-bottom: 0.4rem;">Incorrect.</strong>
          <div style="margin: 0.8rem 0; padding: 0.6rem; background: rgba(0,0,0,0.02); font-size: 0.9rem; border-radius: var(--radius-sm);">
            <div><strong>Expected:</strong> <span style="font-family: monospace; font-weight: 600; color: var(--color-success);">${P}</span></div>
            <div style="margin-top: 0.2rem;"><strong>Your input:</strong> <span style="font-family: monospace; font-weight: 600; color: var(--color-error);">${z||"(empty)"}</span></div>
          </div>
          <div style="border-top: 1px solid rgba(0,0,0,0.05); padding-top: 0.6rem; font-size: 0.85rem; color: var(--color-text-muted);">
            <strong>Meaning:</strong> ${T.context_ja}
          </div>
        `)}),q.addEventListener("click",()=>{m++,l()}),c.appendChild(d),C.focus()}l()}const gn={proprietress:1.5,kanetake:1.45,saeki:1.45,elodie:1.45,gael:1.45,jean_pierre:1.45,ピエール:1.45};let se=null;function fn(){se||(se=new(window.AudioContext||window.webkitAudioContext))}function Ce(e,r,t,a=.06){try{fn(),(!se||se.state==="suspended")&&se.resume();const n=se.createOscillator(),o=se.createGain();n.type=r||"sine",n.frequency.setValueAtTime(e,se.currentTime),o.gain.setValueAtTime(a,se.currentTime),o.gain.exponentialRampToValueAtTime(.001,se.currentTime+t),n.connect(o),o.connect(se.destination),n.start(),n.stop(se.currentTime+t)}catch{}}function hn(){Ce(780,"sine",.03,.04)}function je(){Ce(523.25,"sine",.08,.08),setTimeout(()=>Ce(659.25,"sine",.15,.08),80)}function Te(){Ce(180,"triangle",.3,.12)}function Be(){Ce(110,"sawtooth",.2,.1)}function yn(){const e=document.createElement("div");return e.className="story-mode-container",$t(e),e}async function $t(e){e.innerHTML=`
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
  `,e.querySelectorAll(".play-episode-btn").forEach(n=>{n.addEventListener("click",o=>{const m=o.target.getAttribute("data-chapter"),i=o.target.getAttribute("data-episode");Et(e,m,i)})});const r=e.querySelectorAll(".mode-tab-btn"),t=e.querySelector("#rpg-card-history"),a=e.querySelector("#rpg-card-story");r.forEach(n=>{n.addEventListener("click",()=>{r.forEach(m=>{m.classList.remove("active-tab"),m.style.background="none",m.style.color="var(--color-text-muted)",m.style.boxShadow="none"}),n.classList.add("active-tab"),n.style.background="var(--color-primary)",n.style.color="white",n.style.boxShadow="var(--shadow-sm)",n.getAttribute("data-mode")==="history"?(t.style.display="flex",a.style.display="none"):(t.style.display="none",a.style.display="flex")})})}async function Et(e,r,t){try{e.innerHTML='<div class="story-loader"><div class="spinner"></div><p>物語を読み込んでいます...</p></div>';const a=r==="career_0"?"rpg/story/chapter_career_0.json":`rpg/history/chapter_${r}.json`,[n,o,m]=await Promise.all([fetch(a),fetch("rpg/questions_db.json"),fetch("data/grammar_reference.json").catch(()=>null)]);if(!n.ok)throw new Error("Story file could not be loaded");if(!o.ok)throw new Error("Questions database could not be loaded");const i=await n.json(),u=await o.json();let s=[];m&&m.ok&&(s=await m.json()),x.questionsDb=u,x.grammarRefs=s;const g=i.episodes.find(f=>f.episodeId===t);if(!g)throw new Error("Episode data not found in chapter file");bn(e,g,r,i)}catch(a){e.innerHTML=`
      <div class="alert alert-info" style="border-left-color: var(--color-error); background-color: #FFEBEE; color: var(--color-error)">
        <h3>物語の読み込みエラー</h3>
        <p>${a.message}</p>
        <button class="action-btn" onclick="location.reload()">再読み込み</button>
      </div>
    `}}function bn(e,r,t,a){let n=0;const o=r.sequence;e.innerHTML=`
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
  `;const m=e.querySelector("#rpg-viewport"),i=e.querySelector("#rpg-dialog-pane"),u=e.querySelector("#rpg-battle-pane"),s=e.querySelector("#rpg-reward-pane"),g=e.querySelector("#rpg-tutorial-overlay"),f=e.querySelector("#rpg-sidebar");let c=null,h=!1,_="";function l(){if(h){clearInterval(c);const y=e.querySelector("#dialog-text");y.innerText=_,h=!1;return}if(n>=o.length){$t(e);return}const p=o[n];p.type==="tutorial"?A(p):p.type==="dialog"?T(p):p.type==="fixedBattle"||p.type==="randomBattle"?P(p):p.type==="reward"&&d(p),v(p)}function v(p){let y=m.querySelector(".ai-policy-notice");p&&p.background==="bg_thief_caught.png"||m.style.background&&m.style.background.includes("bg_thief_caught.png")?y||(y=document.createElement("div"),y.className="ai-policy-notice",y.innerText="※AIポリシーの都合により、カミーユはうさぎの縫いぐるみに差し替えられました",m.appendChild(y)):y&&y.remove()}m.addEventListener("click",p=>{p.target.closest("button")||p.target.closest(".battle-question-box")||i.style.display==="none"||l()}),l();function A(p){i.style.display="none",u.style.display="none",s.style.display="none",f.style.opacity="0",f.style.pointerEvents="none";const y=e.querySelector("#rpg-character-layer");y&&(y.innerHTML=""),g.style.display="flex",g.style.flexDirection="column";function S(b,L){const E=L.findIndex(j=>j.includes("フランス語")||j.includes("Pronom")||j.includes("Exemple")||j.includes("活用形"));if(E!==-1){if(L[E].includes("活用形")){const j=L.findIndex(z=>z.includes("人称")||z.includes("主語"));if(j!==-1){const z=b[j].split("(")[0].split("（")[0].trim(),F=b[E].trim();return`${z} ${F}`}}return b[E].split("(")[0].split("（")[0].trim()}return b[0].split("(")[0].split("（")[0].trim()}function k(b){if(b)if(typeof te=="function")te(b);else{const L=new SpeechSynthesisUtterance(b);L.lang="fr-FR",window.speechSynthesis.speak(L)}}function w(b,L){const E=[...b],j=b.findIndex(z=>z.includes("発音")||z.includes("Pronunciation"));return j!==-1&&(E[j]="音声"),`
        <table class="tutorial-table" style="width: 100%; border-collapse: collapse; margin-top: 0.4rem; margin-bottom: 0.6rem; font-size: 0.8rem; box-shadow: var(--shadow-sm); border-radius: var(--radius-sm); overflow: hidden; border: 1px solid rgba(197, 168, 128, 0.2);">
           <thead>
             <tr style="border-bottom: 2px solid rgba(197, 168, 128, 0.3); background: rgba(197, 168, 128, 0.08); color: var(--color-primary);">
               ${E.map(z=>`<th style="padding: 0.4rem; text-align: left; font-weight: 600;">${z}</th>`).join("")}
             </tr>
           </thead>
           <tbody>
             ${L.map(z=>`<tr style="border-bottom: 1px solid rgba(197, 168, 128, 0.1); background: rgba(255,255,255,0.02);">${z.map((H,ee)=>ee===j?`<td style="padding: 0.4rem; text-align: center;"><button class="play-audio-btn" data-french="${S(z,b)}" style="background: none; border: none; cursor: pointer; font-size: 1.15rem; padding: 2px; line-height: 1; transition: transform 0.1s;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">🔊</button></td>`:`<td style="padding: 0.4rem; line-height: 1.4;">${H}</td>`).join("")}</tr>`).join("")}
           </tbody>
         </table>
      `}function C(b){if(!b)return"";let L="";return b.title&&(L+=`<div class="ref-sec-title" style="font-weight: bold; margin-top: 0.6rem; margin-bottom: 0.3rem; color: var(--color-primary); font-size: 0.85rem;">${b.title}</div>`),b.text&&(L+=`<p style="line-height: 1.4; margin-bottom: 0.4rem; font-size: 0.8rem; color: var(--color-text-main);">${b.text}</p>`),b.type==="table"&&b.headers&&b.rows?L+=w(b.headers,b.rows):b.type==="info"&&(L+=`
          <div class="ref-sec-info-box" style="background: rgba(197, 168, 128, 0.08); border-left: 4px solid var(--color-accent); padding: 0.5rem; margin-top: 0.4rem; margin-bottom: 0.6rem; border-radius: 0 var(--radius-sm) var(--radius-sm) 0; font-size: 0.8rem; line-height: 1.45;">
            ${b.content_ja?`<div style="font-weight: 500;">${b.content_ja}</div>`:""}
            ${b.content_fr?`<div style="color: var(--color-text-muted); font-size: 0.75rem; margin-top: 0.2rem;">${b.content_fr}</div>`:""}
          </div>
        `),L}function $(b){b.querySelectorAll(".play-audio-btn").forEach(L=>{L.addEventListener("click",E=>{E.stopPropagation();const j=L.getAttribute("data-french");k(j)})})}if(p.targets&&p.targets.length>0)g.innerHTML=`
        <div class="tutorial-card" style="max-width: 600px; width: 95%; max-height: 360px; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box; padding: 1rem 1.2rem;">
          <div>
            <h3 style="font-family: var(--font-serif); color: var(--color-primary); border-bottom: 2px solid var(--color-accent); padding-bottom: 0.4rem; margin-top: 0; margin-bottom: 0.6rem; font-size: 1.15rem;">📖 ${p.title||"今日の学習目標"}</h3>
            ${p.goal?`<p class="tutorial-goal" style="font-weight: bold; margin: 0.5rem 0; color: var(--color-accent); font-size: 0.85rem;">${p.goal}</p>`:""}
            <div class="tutorial-targets-container" style="background: rgba(197, 168, 128, 0.05); padding: 0.8rem; border-radius: var(--radius-md); border: 1px solid rgba(197,168,128,0.2); text-align: left; margin: 0.5rem 0; box-shadow: var(--shadow-sm); overflow-y: auto; max-height: 180px;">
              <ul style="list-style: none; padding-left: 0; display: flex; flex-direction: column; gap: 0.6rem; margin: 0;">
                ${p.targets.map(b=>`<li style="display: flex; gap: 0.4rem; line-height: 1.4; font-size: 0.85rem; font-weight: 500;"><span style="color: var(--color-accent);">🎯</span><span>${b}</span></li>`).join("")}
              </ul>
            </div>
          </div>
          <button class="action-btn start-tut-btn" style="width: 100%; padding: 0.6rem; font-weight: 700; margin-top: 0.6rem; font-size: 0.9rem;">冒険を開始する</button>
        </div>
      `,g.querySelector(".start-tut-btn").addEventListener("click",()=>{g.style.display="none",n++,l()});else if(p.pages&&p.pages.length>0){let z=function(F){const H=p.pages[F],ee=g.querySelector(".tutorial-page-content");let Y=`<h4 style="color: var(--color-accent); font-family: var(--font-serif); font-size: 0.95rem; margin-top: 0; margin-bottom: 0.3rem; border-bottom: 1px solid rgba(197, 168, 128, 0.15); padding-bottom: 0.15rem; line-height: 1.25;">${H.title}</h4>`;if(H.type==="custom")H.text&&(Y+=`<p style="white-space: pre-line; line-height: 1.4; font-size: 0.8rem; margin: 0 0 0.4rem 0; color: var(--color-text-main);">${H.text}</p>`),H.headers&&H.rows&&(Y+=w(H.headers,H.rows));else if(H.referenceTopicId){const ne=x.grammarRefs?x.grammarRefs.find(ce=>ce.id===H.referenceTopicId):null;ne?(ne.definition_ja&&(Y+=`<p style="font-size: 0.75rem; color: var(--color-text-main); font-weight: 500; margin: 0 0 0.4rem 0; line-height: 1.4;">${ne.definition_ja}</p>`),H.sectionIndices&&H.sectionIndices.length>0?H.sectionIndices.forEach(ce=>{const Se=ne.sections[ce];Se&&(Y+=C(Se))}):ne.sections&&ne.sections.forEach(ce=>{Y+=C(ce)})):Y+=`<p style="font-size: 0.8rem; color: var(--color-error);">解説データが見つかりませんでした。(${H.referenceTopicId})</p>`}ee.innerHTML=Y,g.querySelector("#tut-page-curr").innerText=F+1,$(ee),b.style.visibility=F===0?"hidden":"visible",L.style.visibility=F===p.pages.length-1?"hidden":"visible",F===p.pages.length-1?E.style.display="block":E.style.display="none",ee.scrollTop=0};var q=z;g.innerHTML=`
        <div class="tutorial-card" style="max-width: 650px; width: 95%; max-height: 280px; height: 74%; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box; padding: 0.8rem 1.2rem; margin-bottom: 0;">
          <div>
            <h3 style="font-family: var(--font-serif); color: var(--color-primary); margin-top: 0; margin-bottom: 0.3rem; font-size: 1.1rem; line-height: 1.2;">📖 ${p.title||"事前解説"}</h3>
            ${p.goal?`<p class="tutorial-goal" style="font-size: 0.75rem; color: var(--color-text-muted); margin: 0 0 0.4rem 0; border-bottom: 1px dashed rgba(197, 168, 128, 0.2); padding-bottom: 0.2rem; line-height: 1.2;">${p.goal}</p>`:""}
            
            <div class="tutorial-page-content" style="overflow-y: auto; max-height: 150px; padding: 0.3rem; text-align: left; border-radius: var(--radius-sm); border: 1px solid rgba(0,0,0,0.05); background: rgba(0,0,0,0.02); min-height: 110px; box-sizing: border-box;">
              <!-- Dynamic page content will be injected here -->
            </div>
          </div>
          
          <div class="tutorial-pager" style="display: flex; align-items: center; justify-content: center; gap: 1.2rem; margin-top: 0.4rem; padding-top: 0.2rem; border-top: 1px solid rgba(0,0,0,0.05); user-select: none;">
            <span class="prev-page-btn" style="cursor: pointer; font-size: 1.2rem; transition: transform 0.1s; color: var(--color-primary);" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">◀</span>
            <span style="font-size: 0.8rem; font-weight: bold; color: var(--color-text-muted); min-width: 75px; text-align: center;">Page <span id="tut-page-curr">1</span> / <span id="tut-page-total">${p.pages.length}</span></span>
            <span class="next-page-btn" style="cursor: pointer; font-size: 1.2rem; transition: transform 0.1s; color: var(--color-primary);" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">▶</span>
          </div>
        </div>
        <button class="action-btn start-battle-btn" style="display: none; width: 90%; max-width: 320px; padding: 0.65rem 1rem; font-weight: bold; margin-top: 0.8rem; background: var(--color-accent); font-size: 0.95rem; box-shadow: var(--shadow-md); border-radius: var(--radius-sm); border: none; color: white; cursor: pointer; text-shadow: 1px 1px 2px rgba(0,0,0,0.3); transition: transform 0.15s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">練習問題に挑戦する ⚔️</button>
      `;const b=g.querySelector(".prev-page-btn"),L=g.querySelector(".next-page-btn"),E=g.querySelector(".start-battle-btn");let j=0;b.addEventListener("click",F=>{F.stopPropagation(),j>0&&(j--,z(j))}),L.addEventListener("click",F=>{F.stopPropagation(),j<p.pages.length-1&&(j++,z(j))}),E.addEventListener("click",F=>{F.stopPropagation(),g.style.display="none",n++,l()}),z(0)}else g.innerHTML=`
        <div class="tutorial-card" style="max-width: 580px; width: 95%; max-height: 360px; box-sizing: border-box; padding: 1rem 1.2rem; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <h3 style="font-size: 1.15rem; margin-top: 0;">📖 ${p.title}</h3>
            <p style="white-space: pre-line; line-height: 1.5; text-align: justify; margin: 0.8rem 0; font-size: 0.85rem; overflow-y: auto; max-height: 200px;">${p.text||""}</p>
          </div>
          <button class="action-btn start-tut-btn" style="width: 100%; padding: 0.6rem; font-weight: 700; margin-top: 0.6rem; font-size: 0.9rem;">冒険を開始する</button>
        </div>
      `,g.querySelector(".start-tut-btn").addEventListener("click",()=>{g.style.display="none",n++,l()})}function T(p){g.style.display="none",u.style.display="none",s.style.display="none",i.style.display="block";const y=r.backgrounds[p.background]||"#000000";m.style.background=y,p.shake&&(m.classList.add("shake-vfx"),setTimeout(()=>m.classList.remove("shake-vfx"),400)),y.includes("url(")?(m.style.backgroundSize="cover",m.style.backgroundPosition="center",m.style.backgroundRepeat="no-repeat"):(m.style.backgroundSize="",m.style.backgroundPosition="",m.style.backgroundRepeat="");const S=e.querySelector("#rpg-character-layer");if(S){S.innerHTML="";const b=y.toLowerCase(),L=b.includes("bg_camille_cry.webp")||b.includes("bg_after_battle.webp")||b.includes("bg_father.webp")||b.includes("bg_room.webp");let E=[];L||(p.characters&&Array.isArray(p.characters)?E=p.characters:p.character&&(E=[{id:p.character,expression:p.expression||"default",position:p.position||"center"}])),E.forEach(j=>{const z=r.characters[j.id],F=j.expression||"default";let H=j.position||"center";E.length===1&&j.id==="proprietress"&&(H="center");let ee=null;if(z&&z.images)if(z.images[F])ee=z.images[F];else if(F==="default"&&z.images.normal)ee=z.images.normal;else{const Y=Object.keys(z.images);Y.length>0&&(ee=z.images[Y[0]])}if(ee){const Y=document.createElement("img");Y.src=ee,Y.className=`rpg-character-sprite pos-${H} sprite-${j.id}`;const ne=gn[j.id]||1;Y.style.setProperty("--char-scale",ne),S.appendChild(Y),setTimeout(()=>{Y.classList.add("active")},50)}})}const k=p.character?r.characters[p.character]:null,w=e.querySelector("#dialog-name"),C=e.querySelector("#dialog-text");w.style.display="none",p.learningPoint?(e.querySelector("#lp-title").innerText=p.learningPoint.title,e.querySelector("#lp-content").innerText=p.learningPoint.text,f.style.opacity="1",f.style.pointerEvents="auto"):(f.style.opacity="0",f.style.pointerEvents="none");const $=k?`${k.name}：${p.text}`:p.text;C.innerText="",_=$,h=!0;let q=0;clearInterval(c),c=setInterval(()=>{q<$.length?(C.innerText+=$[q],q++,q%2===0&&hn()):(clearInterval(c),h=!1)},30),n++}async function P(p){var ce,Se;i.style.display="none",g.style.display="none",s.style.display="none",f.style.opacity="0",f.style.pointerEvents="none",u.style.display="flex";const y=e.querySelector("#rpg-character-layer");y&&(y.innerHTML=""),u.innerHTML=`
      <div style="margin: auto; text-align: center;">
        <div class="spinner" style="margin: 0 auto 1rem;"></div>
        <p>試練を読み込んでいます...</p>
      </div>
    `;function S(B,O){const K=x.questionsDb||[];let R=[];if(x.recentQuestionIds||(x.recentQuestionIds=JSON.parse(localStorage.getItem("cba_recent_questions")||"[]")),B&&B.length>0){B.forEach(D=>{const V=D.tag,G=D.count||1;let W=K.filter(X=>X.tags&&X.tags.includes(V)),Q=W.filter(X=>!x.recentQuestionIds.includes(X.id));Q.length===0&&(Q=W),Q=E(Q);const J=Q.slice(0,G);R=R.concat(J),J.forEach(X=>{x.recentQuestionIds.push(X.id),x.recentQuestionIds.length>20&&x.recentQuestionIds.shift()})});const N=B.reduce((D,V)=>D+(V.count||1),0);if(R.length<N){const D=N-R.length,V=E(K.filter(G=>!R.some(W=>W.id===G.id)));R=R.concat(V.slice(0,D))}localStorage.setItem("cba_recent_questions",JSON.stringify(x.recentQuestionIds))}else O&&O.length>0&&(R=E(O));return R}let k=[];if(p.type==="randomBattle")try{await Je();const B=((ce=p.conditions)==null?void 0:ce.level)||"ALL";B!=="ALL"&&await oe("vocabulary",B);let O=[...x.db.quizzes];const K=(Se=p.conditions)==null?void 0:Se.category;K&&(O=O.filter(N=>N.category&&N.category.toLowerCase()===K.toLowerCase())),O=E(O);const R=p.enemyHp||3;k=O.slice(0,R).map(N=>{const D=N.options.indexOf(N.answer);return{id:N.id,text:N.question,options:N.options,answerIndex:D!==-1?D:0,explanation:N.context||`正解は「${N.answer}」です。`,acceptedAnswers:[N.answer,N.answer.toLowerCase()]}})}catch(B){console.error("Failed to generate random questions:",B),k=[{id:"fb_err_1",text:"プロヴァンス地方の代表的なスープ料理は？",options:["Bouillabaisse","Bœuf bourguignon","Cassoulet","Choucroute"],answerIndex:0,acceptedAnswers:["Bouillabaisse","bouillabaisse"],explanation:"ブイヤベースはプロヴァンス地方（マルセイユ）の名物です。"}]}else k=S(p.criteria,p.questions);let w=k.map(B=>{let O=B.type||"choice";if((O==="choice"||O==="typing")&&(O=Math.random()>.15?"typing":"choice"),O==="typing"&&!B.acceptedAnswers&&B.options&&B.answerIndex!==void 0){const R=B.options[B.answerIndex].split("(")[0].split("（")[0].trim();return{...B,type:"typing",acceptedAnswers:[R,R.toLowerCase()]}}return{...B,type:O}}),C=p.enemyHp||w.length;const $=C;let q=10;const b=10;let L=0;function E(B){const O=[...B];for(let K=O.length-1;K>0;K--){const R=Math.floor(Math.random()*(K+1));[O[K],O[R]]=[O[R],O[K]]}return O}let j=null;async function z(){if(j)return j;try{return j=await(await fetch("data/grammar_reference.json")).json(),j}catch(B){return console.error("Failed to load battle reference:",B),[]}}async function F(B){if(f.style.opacity==="1")f.style.opacity="0",f.style.pointerEvents="none",B.innerText="📖 参考資料を表示";else{let D=function(G){const W=K[G];if(!W)return;let Q=`<h4 style="color: var(--color-accent); border-bottom: 1px solid rgba(197,168,128,0.2); padding-bottom: 0.3rem; margin-bottom: 0.6rem;">${W.title_ja} (${W.title_fr})</h4>`;W.sections.forEach(J=>{if(Q+='<div style="margin-bottom: 1rem;">',J.title&&(Q+=`<div style="font-weight: bold; font-size: 0.85rem; color: var(--color-primary); margin-bottom: 0.3rem;">${J.title}</div>`),J.text&&(Q+=`<p style="white-space: pre-line; margin-bottom: 0.5rem; line-height: 1.4;">${J.text}</p>`),J.headers&&J.rows){const X=[],ae=J.headers.map((re,Le)=>re==="発音"?(X.push(Le),"音声"):re);Q+=`
                <table style="width: 100%; border-collapse: collapse; margin: 0.5rem 0; font-size: 0.75rem;">
                  <thead>
                    <tr style="border-bottom: 2px solid rgba(197,168,128,0.3);">
                      ${ae.map(re=>`<th style="padding: 0.3rem; text-align: left; background: rgba(197,168,128,0.05);">${re}</th>`).join("")}
                    </tr>
                  </thead>
                  <tbody>
                    ${J.rows.map(re=>`
                      <tr style="border-bottom: 1px solid rgba(0,0,0,0.05);">
                        ${re.map((Le,he)=>X.includes(he)?`<td style="padding: 0.3rem; text-align: center;"><button class="ref-table-audio-btn" data-speak="${re[he-1]?re[he-1].split("(")[0].trim():""}" style="background: none; border: none; cursor: pointer; padding: 0; font-size: 0.85rem;">🔊</button></td>`:`<td style="padding: 0.3rem;">${Le}</td>`).join("")}
                      </tr>
                    `).join("")}
                  </tbody>
                </table>
              `}Q+="</div>"}),N.innerHTML=Q,N.querySelectorAll(".ref-table-audio-btn").forEach(J=>{J.addEventListener("click",X=>{X.stopPropagation();const ae=J.getAttribute("data-speak");if(ae&&typeof te=="function")te(ae);else if(ae){const re=new SpeechSynthesisUtterance(ae);re.lang="fr-FR",window.speechSynthesis.speak(re)}})})};var O=D;f.style.opacity="1",f.style.pointerEvents="auto",B.innerText="📖 参考資料を隠す",f.innerHTML=`
          <h3>📖 参考資料 (Dictionnaire)</h3>
          <div style="text-align: center; margin: 2rem 0;">
            <div class="spinner" style="margin: 0 auto 0.5rem;"></div>
            <p style="font-size: 0.8rem; color: var(--color-text-muted);">読み込み中...</p>
          </div>
        `;const K=await z();f.innerHTML=`
          <h3>📖 参考資料 (Dictionnaire)</h3>
          <div style="display: flex; flex-direction: column; gap: 0.5rem; height: calc(100% - 40px); overflow: hidden;">
            <select class="action-btn ref-topic-selector" style="width: 100%; padding: 0.4rem; border-radius: var(--radius-sm); font-size: 0.8rem;">
              ${K.map((G,W)=>`<option value="${W}">${G.title_ja}</option>`).join("")}
            </select>
            <div class="ref-topic-content" style="flex: 1; overflow-y: auto; background: rgba(0,0,0,0.15); padding: 0.6rem; border-radius: var(--radius-sm); font-size: 0.8rem;"></div>
          </div>
        `;const R=f.querySelector(".ref-topic-selector"),N=f.querySelector(".ref-topic-content");let V=0;if(r.episodeId==="career_ep_0_1"){const G=K.findIndex(W=>W.id==="ref_essential_irregular_verbs");G!==-1&&(V=G)}else if(r.episodeId==="career_ep_0_2"){const G=K.findIndex(W=>W.id==="ref_time_expressions");G!==-1&&(V=G)}R.value=V,D(V),R.addEventListener("change",G=>{D(parseInt(G.target.value))})}}function H(){if(C<=0){je(),f.style.opacity="0",f.style.pointerEvents="none",u.innerHTML=`
          <div class="battle-victory">
            <h2 class="victory-title">👑 VICTOIRE ! (勝利)</h2>
            <p>試練を乗り越え、実力を証明した！</p>
            <button class="action-btn proceed-battle-btn" style="margin-top: 1rem;">次へ進む</button>
          </div>
        `,u.querySelector(".proceed-battle-btn").addEventListener("click",()=>{n++,l()});return}if(q<=0){Te(),f.style.opacity="0",f.style.pointerEvents="none",u.innerHTML=`
          <div class="battle-defeat">
            <h2>💀 GAME OVER</h2>
            <p>HPが尽きてしまいました。もう一度復習して挑戦しましょう！</p>
            <div style="display: flex; gap: 1rem; margin-top: 1rem; width: 100%;">
              <button class="action-btn retry-battle-btn" style="flex: 1;">もう一度挑戦</button>
              <button class="action-btn exit-battle-btn" style="flex: 1; background: #374151;">復習しにいく</button>
            </div>
          </div>
        `,u.querySelector(".retry-battle-btn").addEventListener("click",()=>{P(p)}),u.querySelector(".exit-battle-btn").addEventListener("click",()=>{var N;const R=(N=p.conditions)==null?void 0:N.category;Ee(R==="grammar"?"grammar":"vocabulary")});return}if(L>=w.length){C>0&&(C=0,H());return}const B=w[L],O=`
        <div class="battle-hud">
          <div class="hud-bar-container">
            <span class="hud-label">VOUS (あなた)</span>
            <div class="hud-hp-track">
              <div class="hud-hp-fill player-hp" style="width: ${q/b*100}%"></div>
            </div>
            <span class="hud-value">${q} / ${b}</span>
          </div>
          
          <div class="hud-bar-container">
            <span class="hud-label">${p.enemyName}</span>
            <div class="hud-hp-track">
              <div class="hud-hp-fill enemy-hp" style="width: ${C/$*100}%"></div>
            </div>
            <span class="hud-value">${C} / ${$}</span>
          </div>
        </div>
      `;if(B.type==="typing"){u.innerHTML=`
          ${O}
          <div class="battle-question-box">
            <div class="q-header">Question ${L+1} (スペル入力)</div>
            <div class="q-body" style="white-space: pre-line; line-height: 1.4; font-size: 0.95rem;">${B.text}</div>
            
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
        `;const R=u.querySelector(".battle-input-field"),N=u.querySelector(".submit-typing-btn"),D=u.querySelector(".toggle-battle-ref-btn");setTimeout(()=>R.focus(),150),R.addEventListener("keydown",V=>{V.key==="Enter"&&!N.disabled&&N.click()}),N.addEventListener("click",()=>{const V=R.value;Y(V,B,R,N)}),D.addEventListener("click",()=>{F(D)})}else if(B.type==="scramble"){let R=[];const N=E(B.words);u.innerHTML=`
          ${O}
          <div class="battle-question-box">
            <div class="q-header">Question ${L+1} (並び替え)</div>
            <div class="q-body" style="font-size: 0.95rem; margin-bottom: 0.6rem;">${B.text}</div>
            
            <div class="scramble-sentence-bar" style="min-height: 38px; border-bottom: 2px solid var(--color-accent); padding: 0.4rem; display: flex; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 0.8rem; background: rgba(255,255,255,0.05); border-radius: var(--radius-sm); font-size: 1rem; color: white;"></div>
            
            <div class="scramble-words-pool" style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 0.8rem; justify-content: center;">
              ${N.map((Q,J)=>`<button class="scramble-word-btn" data-word="${Q}" style="padding: 0.35rem 0.7rem; font-size: 0.85rem; border-radius: 20px; border: 1px solid var(--color-accent); background: none; color: white; cursor: pointer;">${Q}</button>`).join("")}
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
        `;const D=u.querySelector(".scramble-sentence-bar"),V=u.querySelectorAll(".scramble-word-btn"),G=u.querySelector(".verify-scramble-btn"),W=u.querySelector(".reset-scramble-btn");V.forEach(Q=>{Q.addEventListener("click",()=>{if(Q.disabled)return;const J=Q.getAttribute("data-word");R.push(J),Q.disabled=!0,Q.style.opacity="0.3",D.innerText=R.join(" ")})}),W.addEventListener("click",()=>{R=[],D.innerText="",V.forEach(Q=>{Q.disabled=!1,Q.style.opacity="1"})}),G.addEventListener("click",()=>{const Q=R.join(" ");V.forEach(re=>re.disabled=!0),G.disabled=!0,W.disabled=!0;const J=Q.toLowerCase().replace(/[.,!?;:・]/g,"").replace(/\s+/g," ").trim(),X=B.answer.toLowerCase().replace(/[.,!?;:・]/g,"").replace(/\s+/g," ").trim();ne(J===X,B)})}else if(B.type==="cloze"){const N=(B.clozeText||B.text).replace(/\[([^\]]+)\]/g,"_______"),D=B.options&&B.options.length>0;u.innerHTML=`
          ${O}
          <div class="battle-question-box">
            <div class="q-header">Question ${L+1} (穴埋め)</div>
            <div class="q-body" style="font-size: 1.1rem; text-align: center; margin: 1rem 0;">${N}</div>
            
            ${D?`
              <div class="battle-options-list">
                ${B.options.map((G,W)=>`
                  <button class="battle-opt-btn" data-idx="${W}">${G}</button>
                `).join("")}
              </div>
            `:`
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
        `;const V=u.querySelector(".toggle-battle-ref-btn");if(V.addEventListener("click",()=>F(V)),D){const G=u.querySelectorAll(".battle-opt-btn");G.forEach(W=>{W.addEventListener("click",Q=>{const J=parseInt(Q.target.getAttribute("data-idx"));ee(J,B,G)})})}else{const G=u.querySelector(".battle-input-field"),W=u.querySelector(".submit-typing-btn");setTimeout(()=>G.focus(),150),G.addEventListener("keydown",Q=>{Q.key==="Enter"&&W.click()}),W.addEventListener("click",()=>{const Q=G.value;Y(Q,B,G,W)})}}else if(B.type==="matching"){let he=function(){if(!X||!ae)return;const Z=X.getAttribute("data-val"),de=ae.getAttribute("data-val");if(B.pairs.find(pe=>pe.left===Z&&pe.right===de))Ce(440,"sine",.1,.1),X.style.background="#2E7D32",X.style.borderColor="#A5D6A7",X.disabled=!0,ae.style.background="#2E7D32",ae.style.borderColor="#A5D6A7",ae.disabled=!0,re++,X=null,ae=null,re===Le&&(je(),C=Math.max(0,C-1),W.innerText="✅ すべてマッチしました！ (Très bien)",W.className="feedback-title text-success",Q.innerText=B.explanation,G.style.display="block",J.innerText="次の試練へ",J.onclick=()=>{L++,H()});else{Te(),q=Math.max(0,q-1);const pe=X,qe=ae;if(pe.style.background="#C62828",pe.style.borderColor="#EF9A9A",qe.style.background="#C62828",qe.style.borderColor="#EF9A9A",X=null,ae=null,m.classList.add("shake-vfx"),setTimeout(()=>m.classList.remove("shake-vfx"),400),q<=0){H();return}setTimeout(()=>{if(pe.disabled)return;pe.style.background="rgba(255,255,255,0.05)",pe.style.borderColor="rgba(255,255,255,0.15)",qe.style.background="rgba(255,255,255,0.05)",qe.style.borderColor="rgba(255,255,255,0.15)";const Ke=u.querySelector(".player-hp"),Ze=u.querySelectorAll(".hud-value")[0];Ke&&(Ke.style.width=`${q/b*100}%`),Ze&&(Ze.innerText=`${q} / ${b}`)},800)}};var K=he;const R=E(B.pairs.map(Z=>Z.left)),N=E(B.pairs.map(Z=>Z.right));u.innerHTML=`
          ${O}
          <div class="battle-question-box">
            <div class="q-header">Question ${L+1} (マッチング)</div>
            <p style="font-size: 0.8rem; color: var(--color-text-muted); margin-bottom: 0.5rem; text-align: center;">対応する言葉をペアで選んでください。</p>
            
            <div class="matching-columns-container" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; max-height: 160px; overflow-y: auto; padding: 0.2rem;">
              <div class="left-match-col" style="display: flex; flex-direction: column; gap: 0.4rem;">
                ${R.map((Z,de)=>`<button class="match-card-btn left-card" data-val="${Z}" style="padding: 0.45rem; font-size: 0.8rem; border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.05); color: white; border-radius: var(--radius-sm); cursor: pointer; text-align: center; outline: none;">${Z}</button>`).join("")}
              </div>
              <div class="right-match-col" style="display: flex; flex-direction: column; gap: 0.4rem;">
                ${N.map((Z,de)=>`<button class="match-card-btn right-card" data-val="${Z}" style="padding: 0.45rem; font-size: 0.8rem; border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.05); color: white; border-radius: var(--radius-sm); cursor: pointer; text-align: center; outline: none;">${Z}</button>`).join("")}
              </div>
            </div>
            
            <div class="battle-feedback-drawer" id="battle-feedback" style="display: none; margin-top: 0.8rem;">
              <div class="feedback-title" id="fb-title"></div>
              <p class="feedback-desc" id="fb-desc"></p>
              <button class="action-btn next-q-btn" id="next-q-btn" style="width: 100%; margin-top: 0.8rem;">次の試練へ</button>
            </div>
          </div>
        `;const D=u.querySelectorAll(".left-card"),V=u.querySelectorAll(".right-card"),G=u.querySelector("#battle-feedback"),W=u.querySelector("#fb-title"),Q=u.querySelector("#fb-desc"),J=u.querySelector("#next-q-btn");let X=null,ae=null,re=0;const Le=B.pairs.length;D.forEach(Z=>{Z.addEventListener("click",()=>{Z.disabled||(D.forEach(de=>{de.disabled||(de.style.background="rgba(255,255,255,0.05)",de.style.borderColor="rgba(255,255,255,0.15)")}),Z.style.background="var(--color-accent)",Z.style.borderColor="white",X=Z,he())})}),V.forEach(Z=>{Z.addEventListener("click",()=>{Z.disabled||(V.forEach(de=>{de.disabled||(de.style.background="rgba(255,255,255,0.05)",de.style.borderColor="rgba(255,255,255,0.15)")}),Z.style.background="var(--color-accent)",Z.style.borderColor="white",ae=Z,he())})})}else{u.innerHTML=`
          ${O}
          <div class="battle-question-box">
            <div class="q-header">Question ${L+1}</div>
            <div class="q-body" style="white-space: pre-line;">${B.text}</div>
            
            <div class="battle-options-list">
              ${B.options.map((D,V)=>`
                <button class="battle-opt-btn" data-idx="${V}">${D}</button>
              `).join("")}
            </div>

            <button class="action-btn toggle-battle-ref-btn" style="width: 100%; padding: 0.5rem; font-size: 0.8rem; background: #374151; color: white; border: none; border-radius: var(--radius-sm); cursor: pointer; margin-top: 0.8rem;">📖 参考資料を表示</button>
            
            <div class="battle-feedback-drawer" id="battle-feedback" style="display: none;">
              <div class="feedback-title" id="fb-title"></div>
              <p class="feedback-desc" id="fb-desc"></p>
              <button class="action-btn next-q-btn" id="next-q-btn" style="width: 100%; margin-top: 0.8rem;">次の試練へ</button>
            </div>
          </div>
        `;const R=u.querySelectorAll(".battle-opt-btn"),N=u.querySelector(".toggle-battle-ref-btn");R.forEach(D=>{D.addEventListener("click",V=>{const G=parseInt(V.target.getAttribute("data-idx"));ee(G,B,R)})}),N.addEventListener("click",()=>{F(N)})}}function ee(B,O,K){K.forEach(W=>W.disabled=!0);const R=u.querySelector("#battle-feedback"),N=u.querySelector("#fb-title"),D=u.querySelector("#fb-desc"),V=u.querySelector("#next-q-btn");if(B===O.answerIndex){je(),C=Math.max(0,C-1),N.innerText="✅ 正解！ (Très bien)",N.className="feedback-title text-success",V.innerText="次の試練へ";const W=u.querySelector(".enemy-hp");W&&W.classList.add("flash-white"),V.onclick=()=>{L++,H()}}else Te(),Be(),q=Math.max(0,q-p.enemyDamage),N.innerText="❌ 不正解！",N.className="feedback-title text-error",V.innerText="もう一度挑戦する",m.classList.add("shake-vfx"),setTimeout(()=>m.classList.remove("shake-vfx"),400),V.onclick=()=>{H()};D.innerText=O.explanation,R.style.display="block"}function Y(B,O,K,R){K.disabled=!0,R.disabled=!0;const N=u.querySelector("#battle-feedback"),D=u.querySelector("#fb-title"),V=u.querySelector("#fb-desc"),G=u.querySelector("#next-q-btn"),W=B.toLowerCase().replace(/[.,!?;:・]/g,"").trim();if(O.acceptedAnswers.some(J=>W===J.toLowerCase().replace(/[.,!?;:・]/g,"").trim())){je(),C=Math.max(0,C-1),D.innerText="✅ 正解！ (Très bien)",D.className="feedback-title text-success",G.innerText="次の試練へ";const J=u.querySelector(".enemy-hp");J&&J.classList.add("flash-white"),G.onclick=()=>{L++,H()}}else Te(),Be(),q=Math.max(0,q-2),D.innerText=`❌ 不正解！ (正解: ${O.acceptedAnswers[0]})`,D.className="feedback-title text-error",G.innerText="もう一度挑戦する",m.classList.add("shake-vfx"),setTimeout(()=>m.classList.remove("shake-vfx"),400),G.onclick=()=>{H()};V.innerText=O.explanation,N.style.display="block"}function ne(B,O){const K=u.querySelector("#battle-feedback"),R=u.querySelector("#fb-title"),N=u.querySelector("#fb-desc"),D=u.querySelector("#next-q-btn");if(B){je(),C=Math.max(0,C-1),R.innerText="✅ 正解！ (Très bien)",R.className="feedback-title text-success",D.innerText="次の試練へ";const V=u.querySelector(".enemy-hp");V&&V.classList.add("flash-white"),D.onclick=()=>{L++,H()}}else Te(),Be(),q=Math.max(0,q-2),R.innerText=`❌ 不正解！ (正解: ${O.answer})`,R.className="feedback-title text-error",D.innerText="もう一度挑戦する",m.classList.add("shake-vfx"),setTimeout(()=>m.classList.remove("shake-vfx"),400),D.onclick=()=>{H()};N.innerText=O.explanation,K.style.display="block"}H()}function d(p){i.style.display="none",u.style.display="none",g.style.display="none",f.style.opacity="0",f.style.pointerEvents="none",s.style.display="block";const y=e.querySelector("#rpg-character-layer");y&&(y.innerHTML=""),localStorage.setItem(`cba_story_${r.episodeId}_cleared`,"true");const k=r.episodeId.startsWith("career_")?"assets/story/career_story/group_photo.webp":"assets/story/chapter_0/bg_after_battle.webp";s.innerHTML=`
      <div class="reward-card animate-fade-in">
        <h2 style="font-family: var(--font-serif); color: var(--color-accent); font-size: 1.4rem; text-align: center; margin-bottom: 0.5rem;">🎉 Épisode Terminé !</h2>
        <p style="text-align: center; margin-bottom: 1rem; font-size: 0.9rem; color: var(--color-text-main);">エピソード「${r.episodeTitle}」をクリアしました！</p>
        
        <div class="reward-photo-frame" style="width: 100%; border-radius: var(--radius-md); overflow: hidden; border: 2px solid var(--color-accent); margin-bottom: 1rem; box-shadow: 0 4px 10px rgba(0,0,0,0.15);">
          <img src="${k}" alt="Reward Image" style="width: 100%; height: auto; display: block;" />
        </div>
        
        <div style="background: rgba(197, 168, 128, 0.08); border: 1px solid rgba(197, 168, 128, 0.25); border-radius: var(--radius-sm); padding: 0.8rem; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; gap: 0.8rem;">
          <span style="font-size: 1.8rem;">🏆</span>
          <div style="text-align: left;">
            <div style="font-weight: 700; color: var(--color-primary); font-size: 0.95rem;">+${p.xp} XP</div>
            <div style="font-size: 0.7rem; color: var(--color-text-muted);">アカデミー経験値獲得</div>
          </div>
        </div>
        
        <button class="action-btn claim-reward-btn" style="width: 100%; padding: 0.8rem; font-weight: 700;">報酬を受け取る</button>
      </div>
    `,s.querySelector(".claim-reward-btn").addEventListener("click",()=>{w()});function w(){s.innerHTML=`
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
      `;const q=s.querySelector(".stamp-ink-overlay");setTimeout(()=>{q.style.display="flex",q.classList.add("animate-stamp-stomp"),Be(),m.classList.add("shake-vfx"),setTimeout(()=>m.classList.remove("shake-vfx"),450)},700),setTimeout(()=>{$()},2300)}const C=function(q){let b=document.querySelector(".cba-toast");b&&b.remove(),b=document.createElement("div"),b.className="cba-toast",b.innerText=q,document.body.appendChild(b),setTimeout(()=>{b.classList.add("fade-out"),setTimeout(()=>b.remove(),400)},2500)};function $(){const q=a&&a.episodes?a.episodes.findIndex(z=>z.episodeId===r.episodeId):-1,b=q!==-1&&a.episodes[q+1]?a.episodes[q+1]:null;s.innerHTML=`
        <div class="reward-card end-screen-card animate-fade-in">
          <h2 style="font-family: var(--font-serif); color: var(--color-primary); font-size: 1.4rem; text-align: center; margin-bottom: 0.5rem;">🎉 Félicitations !</h2>
          <p style="text-align: center; margin-bottom: 1.5rem; font-size: 0.9rem; color: var(--color-text-muted);">エピソード「${r.episodeTitle}」をすべてクリアしました！</p>
          
          <div class="end-actions-wrapper" style="display: flex; flex-direction: column; gap: 1rem; width: 100%;">
            <!-- Next Episode Button -->
            ${b?`
              <button class="action-btn next-ep-btn" style="width: 100%; padding: 0.9rem; font-weight: 700; background: var(--color-accent); color: white;">
                👉 次の話へ進む (${b.episodeTitle})
              </button>
            `:`
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
      `;const L=s.querySelector(".home-btn"),E=s.querySelector(".share-btn"),j=s.querySelector(".next-ep-btn");L.addEventListener("click",()=>{Ee("home")}),b&&j&&j.addEventListener("click",()=>{Et(e,t,b.episodeId)}),E.addEventListener("click",()=>{const z=`CHEF BRIGADE ACADEMYでフランス語と料理の修行中！「${r.episodeTitle}」をクリアしました！みんなも一緒に楽しく学習しよう！ #ChefBrigadeAcademy`;navigator.share?navigator.share({title:"Chef Brigade Academy",text:z,url:window.location.href}).catch(F=>{console.log("Error sharing:",F)}):navigator.clipboard.writeText(z).then(()=>{C("シェア用テキストをクリップボードにコピーしました！")}).catch(F=>{console.error("Could not copy text: ",F)})})}}}let Re=null,ue="preview",ie=0,we=null;function _n(){const e=document.createElement("div");e.className="reading-container-view",x.settings||(x.settings={}),x.settings.readingHelper||(x.settings.readingHelper={outlines:!0,translations:!0,targetOnly:!1,pureText:!1});const r=document.createElement("h2");r.className="section-title",r.innerText="Lecture de Cuisine (Culinary Reading)",e.appendChild(r);const t=document.createElement("p");t.className="section-subtitle",t.innerText="Immerse yourself in authentic French culinary articles. Decode grammar and vocabulary interactively as you read.",e.appendChild(t);const a=document.createElement("div");return a.className="loading-placeholder",a.innerText="Chargement des articles... (Loading articles...)",e.appendChild(a),oe("knowledge","ALL").then(()=>{fetch("data/articles.json").then(n=>{if(!n.ok)throw new Error("Could not load articles");return n.json()}).then(n=>{if(x.db.articles=n,a.remove(),Re){const o=n.find(m=>m.id===Re.id)||n[0];ge(e,o)}else Ue(e,n)}).catch(n=>{a.innerText="Erreur de chargement. (Loading error.)",console.error(n)})}),document.addEventListener("click",vn),e}function vn(e){we&&!e.target.closest(".anatomy-tooltip")&&!e.target.closest(".anatomy-token")&&!e.target.closest(".learning-badge")&&(we.remove(),we=null)}function Ue(e,r){Re=null,ue="preview",ie=0;const t=document.createElement("div");t.className="magazine-grid",t.style.display="grid",t.style.gridTemplateColumns="repeat(auto-fit, minmax(320px, 1fr))",t.style.gap="2rem",t.style.marginTop="2rem",r.forEach(a=>{const n=document.createElement("div");n.className="magazine-card",n.style.cursor="pointer";const o=a.image?`<img src="${a.image}" class="magazine-cover" style="width: 100%; height: 200px; object-fit: cover; border-radius: var(--radius-md) var(--radius-md) 0 0;" onerror="this.src='assets/cheese_wine.png'">`:'<div class="magazine-cover-placeholder" style="width: 100%; height: 200px; background-color: var(--color-primary); border-radius: var(--radius-md) var(--radius-md) 0 0; display: flex; align-items: center; justify-content: center; color: white; font-family: var(--font-serif); font-size: 1.5rem; font-weight: bold;">Cuisine</div>';n.innerHTML=`
      ${o}
      <div style="padding: 1.5rem; display: flex; flex-direction: column; gap: 0.8rem;">
        <span class="card-category" style="margin: 0; width: fit-content;">${a.category}</span>
        <h3 class="magazine-card-title" style="font-family: var(--font-serif); font-size: 1.35rem; color: var(--color-primary);">${a.title_fr}</h3>
        <p style="font-size: 0.85rem; color: var(--color-text-muted); font-style: italic;">${a.title_ja}</p>
        <p style="font-size: 0.9rem; line-height: 1.5; color: var(--color-text-main);">${a.overview.context_ja}</p>
        <button class="next-btn" style="width: fit-content; padding: 0.4rem 1rem; font-size: 0.8rem; margin-top: 0.5rem;">Lire l'article (Read)</button>
      </div>
    `,n.addEventListener("click",()=>{Re=a,ue="preview",ie=0,ge(e,a)}),t.appendChild(n)}),e.appendChild(t)}function ge(e,r){e.innerHTML="",ue==="preview"?xn(e,r):ue==="practice"?kn(e,r):ue==="complete"&&wn(e,r)}function me(e){const r=x.settings.readingHelper;e.classList.toggle("hide-outlines",!r.outlines||r.pureText),e.classList.toggle("hide-translations",!r.translations||r.pureText),e.classList.toggle("highlight-target-only",r.targetOnly),e.classList.toggle("pure-text-mode",r.pureText)}function xn(e,r){var k;const t=((k=x.settings)==null?void 0:k.targetLevel)||"ALL";let a="débutant";["B1","B2","intermédiaire"].includes(t)?a="intermédiaire":["C1","C2","avancé"].includes(t)&&(a="avancé");const n=a==="débutant",o=a==="intermédiaire",m=a==="avancé",i=document.createElement("button");i.className="next-btn",i.style.backgroundColor="transparent",i.style.border="1px solid var(--color-primary)",i.style.color="var(--color-primary)",i.style.padding="0.4rem 1rem",i.style.marginBottom="1.5rem",i.innerText="← Retour aux articles (Back)",i.addEventListener("click",()=>{Ue(e,[r])}),e.appendChild(i);const u=document.createElement("div");u.className="magazine-header",u.style.textAlign="center",u.style.marginBottom="2.5rem",u.innerHTML=`
    <div style="font-family: var(--font-serif); font-size: 0.85rem; letter-spacing: 2px; text-transform: uppercase; color: var(--color-text-muted); margin-bottom: 0.5rem; border-bottom: 2px double rgba(0,0,91,0.1); padding-bottom: 0.4rem; font-weight: bold;">
      L’Anatomie du Français, de la Cuisine et de la Culture
    </div>
    <span style="display: block; font-size: 0.8rem; font-weight: bold; letter-spacing: 1.5px; text-transform: uppercase; color: var(--color-accent); margin: 0.5rem auto 0.6rem auto; width: fit-content;">${r.category}</span>
    <h1 style="font-family: var(--font-serif); font-size: 2.2rem; font-weight: 700; color: var(--color-primary); line-height: 1.25; margin-bottom: 0.5rem;">${r.title_fr}</h1>
    <h2 style="font-size: 1.1rem; color: var(--color-text-muted); font-weight: 500; font-style: italic; margin-bottom: 1rem;">${r.title_ja}</h2>
    <div style="font-size: 0.78rem; font-style: italic; color: var(--color-text-muted); margin-bottom: 1.5rem;">
      Par Chef Brigade &nbsp;|&nbsp; Publié le 1 août 2026
    </div>
  `,e.appendChild(u);const s=document.createElement("div");s.className="reading-helper-panel",s.innerHTML=`
    <h4 style="font-family: var(--font-serif); font-size: 0.95rem; margin-bottom: 0.6rem; color: var(--color-primary); border-bottom: 1px solid rgba(0,0,91,0.1); padding-bottom: 0.3rem;">🛡️ Panneau d'Assistance (学習サポート)</h4>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem; font-size: 0.8rem; font-weight: 500;">
      <label style="display: flex; align-items: center; gap: 0.3rem; cursor: pointer;">
        <input type="checkbox" id="helper-toggle-outlines" ${x.settings.readingHelper.outlines?"checked":""}>
        <span>品詞色分け下線</span>
      </label>
      <label style="display: flex; align-items: center; gap: 0.3rem; cursor: pointer;">
        <input type="checkbox" id="helper-toggle-translations" ${x.settings.readingHelper.translations?"checked":""}>
        <span>日本語訳の表示</span>
      </label>
      <label style="display: flex; align-items: center; gap: 0.3rem; cursor: pointer;">
        <input type="checkbox" id="helper-toggle-target" ${x.settings.readingHelper.targetOnly?"checked":""}>
        <span>学習重要ワードのみ</span>
      </label>
      <label style="display: flex; align-items: center; gap: 0.3rem; cursor: pointer;">
        <input type="checkbox" id="helper-toggle-pure" ${x.settings.readingHelper.pureText?"checked":""}>
        <span>ピュア読解モード (全て非表示)</span>
      </label>
    </div>
  `,e.appendChild(s);const g=new Map,f=new Map;r.sessions.forEach(w=>{w.tokens.forEach(C=>{if(C.vocab_id){const $=x.db.knowledge.find(q=>q.id===C.vocab_id);$&&g.set(C.vocab_id,$.french)}if(C.gram_id){const $=x.db.knowledge.find(q=>q.id===C.gram_id);$&&$.grammar&&f.set(C.gram_id,$.grammar.topic)}})});const c=document.createElement("div");c.className="card",c.style.backgroundColor="#f7f9fc",c.style.border="1px solid rgba(0,0,91,0.06)",c.style.padding="1.5rem",c.style.borderRadius="10px",c.style.marginBottom="2rem";let h="";g.forEach((w,C)=>{h+=`<button class="learning-badge" data-id="${C}" style="margin: 0.2rem; padding: 0.25rem 0.6rem; font-size: 0.78rem; border-radius: 4px; border: 1px solid rgba(0,0,91,0.1); background-color: #ffffff; color: var(--color-primary); font-weight: 600; cursor: pointer; transition: all 0.2s;">${w}</button>`});let _="";f.forEach((w,C)=>{_+=`<button class="learning-badge" data-id="${C}" style="margin: 0.2rem; padding: 0.25rem 0.6rem; font-size: 0.78rem; border-radius: 4px; border: 1px solid rgba(107,156,104,0.15); background-color: #ffffff; color: var(--color-success); font-weight: 600; cursor: pointer; transition: all 0.2s;">${w}</button>`}),c.innerHTML=`
    <h3 style="font-family: var(--font-serif); font-size: 1.15rem; color: var(--color-primary); margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.5rem;">📖 Points Clés d'Apprentissage (主要学習要点)</h3>
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div>
        <p style="font-size: 0.85rem; font-weight: bold; color: var(--color-text-muted); margin-bottom: 0.3rem;">🍳 Vocabulaire clé (重要単語):</p>
        <div style="display: flex; flex-wrap: wrap;">${h||'<span style="font-size:0.8rem; color:#888;">Aucun vocabulaire</span>'}</div>
      </div>
      <div>
        <p style="font-size: 0.85rem; font-weight: bold; color: var(--color-text-muted); margin-bottom: 0.3rem;">📕 Points de grammaire (文法ポイント):</p>
        <div style="display: flex; flex-wrap: wrap;">${_||'<span style="font-size:0.8rem; color:#888;">Aucune grammaire</span>'}</div>
      </div>
    </div>
  `,c.querySelectorAll(".learning-badge").forEach(w=>{w.addEventListener("click",C=>{C.stopPropagation();const $=w.getAttribute("data-id"),q=$.startsWith("gram_")?{gram_id:$}:{vocab_id:$};Ve(w,q,"")})}),e.appendChild(c);const l=document.createElement("div");l.style.textAlign="center",l.style.marginTop="3.5rem",l.style.marginBottom="3.5rem";const v=document.createElement("div");v.style.display="inline-flex",v.style.alignItems="center",v.style.justifyContent="center",v.style.gap="1.2rem",v.style.flexWrap="wrap";const A=document.createElement("button");A.className="start-practice-btn",A.innerText="🎓 Commencer l'entraînement (問題を解くモードに入る)",A.addEventListener("click",()=>{ue="practice",ie=0,ge(e,r)});const T=document.createElement("div");T.style.display="inline-flex",T.style.alignItems="center",T.style.gap="0.5rem";const P=document.createElement("span");P.style.fontSize="0.8rem",P.style.fontWeight="bold",P.style.color="var(--color-text-muted)",P.innerText="Niveau (Level) :";const d=document.createElement("select");d.style.padding="0.6rem 1.2rem",d.style.fontSize="0.9rem",d.style.borderRadius="50px",d.style.border="1px solid rgba(0,0,0,0.15)",d.style.backgroundColor="#FFFFFF",d.style.cursor="pointer",d.style.fontFamily="var(--font-sans)",d.style.fontWeight="600",d.style.color="var(--color-primary)",d.style.outline="none",[{val:"débutant",label:"Débutant (初級)"},{val:"intermédiaire",label:"Intermédiaire (中級)"},{val:"avancé",label:"Avancé (上級)"}].forEach(w=>{const C=document.createElement("option");C.value=w.val,C.text=w.label,w.val===a&&(C.selected=!0),d.appendChild(C)}),d.addEventListener("change",w=>{x.settings.targetLevel=w.target.value,ge(e,r)}),T.appendChild(P),T.appendChild(d),v.appendChild(A),v.appendChild(T),l.appendChild(v),e.appendChild(l);const y=document.createElement("div");y.className="magazine-body-container",y.style.maxWidth="720px",y.style.margin="0 auto",y.style.display="flex",y.style.flexDirection="column",y.style.gap="2.2rem",r.sessions.forEach((w,C)=>{const $=document.createElement("div");$.className="ref-session-card",$.style.borderLeft="4px solid var(--color-accent)",$.style.padding="1.8rem",$.style.backgroundColor="#ffffff";const q=`
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
        <span style="font-size: 0.72rem; text-transform: uppercase; font-weight: bold; letter-spacing: 1px; color: var(--color-text-muted);">Section ${C+1}: ${w.title}</span>
        <button class="section-audio-btn" data-text="${w.text_fr.replace(/"/g,"&quot;")}" style="background: none; border: none; font-size: 1.15rem; cursor: pointer; color: var(--color-accent); padding: 0.2rem; line-height: 1;" title="Lire la section">🔊</button>
      </div>
    `,b=document.createElement("div");b.className="ref-para-fr",b.style.fontSize="1.18rem",b.style.lineHeight="1.8",b.style.fontFamily="var(--font-serif)",b.style.marginBottom="1rem",b.style.color="var(--color-primary)",C===0&&b.classList.add("editorial-dropcap"),w.tokens.forEach((E,j)=>{const z=document.createElement("span");z.className=`anatomy-token token-pos-${E.pos} has-definition`,z.innerText=E.word+" ";const F=w.tokens.slice(j).map(H=>H.word).join(" ");(E.vocab_id||E.gram_id)&&(z.setAttribute("data-has-db","true"),n?E.pos==="noun"?z.style.borderBottom="2px solid rgba(0, 0, 91, 0.25)":E.pos==="verb"?z.style.borderBottom="2px solid rgba(107, 156, 104, 0.35)":E.pos==="article_partitive"?z.style.borderBottom="2px dashed rgba(220, 38, 38, 0.35)":E.pos==="preposition"&&(z.style.borderBottom="2px dotted rgba(197, 168, 128, 0.5)"):o?z.style.borderBottom="1px solid rgba(0, 0, 0, 0.12)":m&&(z.style.borderBottom="none")),z.addEventListener("click",H=>{H.stopPropagation(),Ve(z,E,F)}),b.appendChild(z)});const L=document.createElement("div");if(L.className="ref-para-ja",L.style.fontSize="0.94rem",L.style.lineHeight="1.6",L.style.color="var(--color-text-muted)",L.style.paddingTop="0.8rem",L.style.borderTop="1px dashed #eaeaea",L.innerHTML=w.text_ja.split(`
`).join("<br>"),$.appendChild(document.createRange().createContextualFragment(q)),$.appendChild(b),n)$.appendChild(L);else{const E=document.createElement("a");E.href="#",E.className="toggle-translation-link",E.style.fontSize="0.78rem",E.style.color="var(--color-accent)",E.style.textDecoration="underline",E.style.display="block",E.style.marginTop="0.5rem",E.innerText="Afficher la traduction (日本語訳を表示)",L.style.display="none",E.addEventListener("click",j=>{j.preventDefault(),L.style.display==="none"?(L.style.display="block",E.innerText="Masquer la traduction (翻訳を非表示)"):(L.style.display="none",E.innerText="Afficher la traduction (日本語訳を表示)")}),$.appendChild(E),$.appendChild(L)}y.appendChild($)}),y.querySelectorAll(".section-audio-btn").forEach(w=>{w.addEventListener("click",C=>{C.stopPropagation(),te(w.getAttribute("data-text"))})}),(()=>{s.querySelector("#helper-toggle-outlines").addEventListener("change",w=>{x.settings.readingHelper.outlines=w.target.checked,w.target.checked&&(x.settings.readingHelper.pureText=!1,s.querySelector("#helper-toggle-pure").checked=!1),me(y)}),s.querySelector("#helper-toggle-translations").addEventListener("change",w=>{x.settings.readingHelper.translations=w.target.checked,w.target.checked&&(x.settings.readingHelper.pureText=!1,s.querySelector("#helper-toggle-pure").checked=!1),me(y)}),s.querySelector("#helper-toggle-target").addEventListener("change",w=>{x.settings.readingHelper.targetOnly=w.target.checked,me(y)}),s.querySelector("#helper-toggle-pure").addEventListener("change",w=>{x.settings.readingHelper.pureText=w.target.checked,w.target.checked&&(x.settings.readingHelper.outlines=!1,x.settings.readingHelper.translations=!1,s.querySelector("#helper-toggle-outlines").checked=!1,s.querySelector("#helper-toggle-translations").checked=!1),me(y)})})(),me(y),e.appendChild(y)}function kn(e,r){var c;const t=((c=x.settings)==null?void 0:c.targetLevel)||"ALL";let a="débutant";["B1","B2","intermédiaire"].includes(t)?a="intermédiaire":["C1","C2","avancé"].includes(t)&&(a="avancé");const n=a==="débutant",o=a==="intermédiaire",m=a==="avancé",i=document.createElement("button");i.className="next-btn",i.style.backgroundColor="transparent",i.style.border="1px solid var(--color-secondary)",i.style.color="var(--color-secondary)",i.style.padding="0.4rem 1rem",i.style.marginBottom="1.5rem",i.innerText="← Quitter l'entraînement (戻る)",i.addEventListener("click",()=>{ue="preview",ge(e,r)}),e.appendChild(i);const u=document.createElement("div");u.className="magazine-header",u.style.textAlign="center",u.style.marginBottom="2.5rem",u.innerHTML=`
    <span style="display: block; font-size: 0.8rem; font-weight: bold; letter-spacing: 1.5px; text-transform: uppercase; color: var(--color-secondary); margin: 0 auto 0.6rem auto; width: fit-content;">Mode Entraînement</span>
    <h1 style="font-family: var(--font-serif); font-size: 2.2rem; font-weight: 700; color: var(--color-primary); line-height: 1.25; margin-bottom: 0.5rem;">${r.title_fr}</h1>
    <p style="font-size: 0.95rem; color: var(--color-text-muted);">文章を読み、問題を解きながら、記事を完成させましょう。</p>
  `,e.appendChild(u);const s=document.createElement("div");s.className="reading-helper-panel",s.innerHTML=`
    <h4 style="font-family: var(--font-serif); font-size: 0.95rem; margin-bottom: 0.6rem; color: var(--color-primary); border-bottom: 1px solid rgba(0,0,91,0.1); padding-bottom: 0.3rem;">🛡️ Panneau d'Assistance (学習サポート)</h4>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem; font-size: 0.8rem; font-weight: 500;">
      <label style="display: flex; align-items: center; gap: 0.3rem; cursor: pointer;">
        <input type="checkbox" id="helper-toggle-outlines" ${x.settings.readingHelper.outlines?"checked":""}>
        <span>品詞色分け下線</span>
      </label>
      <label style="display: flex; align-items: center; gap: 0.3rem; cursor: pointer;">
        <input type="checkbox" id="helper-toggle-translations" ${x.settings.readingHelper.translations?"checked":""}>
        <span>日本語訳の表示</span>
      </label>
      <label style="display: flex; align-items: center; gap: 0.3rem; cursor: pointer;">
        <input type="checkbox" id="helper-toggle-target" ${x.settings.readingHelper.targetOnly?"checked":""}>
        <span>学習重要ワードのみ</span>
      </label>
      <label style="display: flex; align-items: center; gap: 0.3rem; cursor: pointer;">
        <input type="checkbox" id="helper-toggle-pure" ${x.settings.readingHelper.pureText?"checked":""}>
        <span>ピュア読解モード (全て非表示)</span>
      </label>
    </div>
  `,e.appendChild(s);const g=document.createElement("div");g.className="magazine-body-container",g.style.maxWidth="720px",g.style.margin="0 auto",g.style.display="flex",g.style.flexDirection="column",g.style.gap="2rem",r.sessions.forEach((h,_)=>{const l=document.createElement("div");l.id=`session-card-${_}`;let v="ref-locked-session";_===ie?v="ref-active-session":_<ie&&(v="ref-completed-session"),l.className=`ref-session-card ${v}`;const A=document.createElement("div");A.style.display="flex",A.style.justifyContent="space-between",A.style.alignItems="center",A.style.marginBottom="0.8rem",A.innerHTML=`
      <div style="display: flex; align-items: center; gap: 0.6rem;">
        <span style="font-size: 0.75rem; text-transform: uppercase; font-weight: bold; letter-spacing: 1px; color: var(--color-text-muted);">Section ${_+1}: ${h.title}</span>
        ${_<=ie?`<button class="section-audio-btn" data-text="${h.text_fr.replace(/"/g,"&quot;")}" style="background: none; border: none; font-size: 1rem; cursor: pointer; color: var(--color-accent); padding: 0.1rem; line-height: 1;" title="Lire la section">🔊</button>`:""}
      </div>
      ${_<ie?'<span style="color: var(--color-success); font-size: 0.8rem; font-weight: 700;">✓ Complétée</span>':""}
    `,l.appendChild(A);const T=document.createElement("div");if(T.className="ref-text-block",_<ie)T.innerHTML=`
        <div class="ref-para-fr" style="font-size: 1.15rem; line-height: 1.8; color: var(--color-text-main); font-family: var(--font-serif); margin-bottom: 0.8rem;">
          ${h.text_fr.split(`
`).join("<br>")}
        </div>
        <div class="ref-para-ja" style="font-size: 0.95rem; line-height: 1.6; color: var(--color-text-muted); padding-top: 0.6rem; border-top: 1px solid #eaeaea;">
          ${h.text_ja.split(`
`).join("<br>")}
        </div>
      `;else if(_===ie){const P=document.createElement("div");P.className="ref-para-fr",P.style.fontSize="1.15rem",P.style.lineHeight="1.8",P.style.fontFamily="var(--font-serif)",P.style.marginBottom="1.5rem",_===0&&P.classList.add("editorial-dropcap"),h.tokens.forEach((y,S)=>{const k=document.createElement("span");k.className=`anatomy-token token-pos-${y.pos} has-definition`,k.innerText=y.word+" ";const w=h.tokens.slice(S).map(C=>C.word).join(" ");(y.vocab_id||y.gram_id)&&(k.setAttribute("data-has-db","true"),n?y.pos==="noun"?k.style.borderBottom="2px solid var(--color-primary)":y.pos==="verb"?k.style.borderBottom="2px solid var(--color-success)":y.pos==="article_partitive"?k.style.borderBottom="2px dashed var(--color-secondary)":y.pos==="preposition"&&(k.style.borderBottom="2px dotted var(--color-accent)"):o?k.style.borderBottom="1px solid rgba(0,0,0,0.12)":m&&(k.style.borderBottom="none")),k.addEventListener("click",C=>{C.stopPropagation(),Ve(k,y,w)}),P.appendChild(k)}),T.appendChild(P);const d=document.createElement("div");d.className="ref-quiz-container",d.style.marginTop="1.5rem",d.style.padding="1.2rem",d.style.backgroundColor="#fdfcf7",d.style.border="1px solid var(--color-accent)",d.style.borderRadius="8px";const p=h.quizzes.find(y=>y.target_level===a)||h.quizzes[0];if(p){let y="";if(p.type==="choice"||p.type==="structure_analysis"){const S=m&&p.options_fr,k=S?p.options_fr:p.options,w=S?p.answer_fr:p.answer;y=`
            <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.8rem;">
              ${k.map(q=>`
                <label style="display: flex; align-items: center; gap: 0.6rem; font-size: 0.9rem; cursor: pointer;">
                  <input type="radio" name="quiz-${p.id}" value="${q}">
                  <span>${q}</span>
                </label>
              `).join("")}
            </div>
          `,d.innerHTML=`
            <h4 style="font-size: 0.95rem; color: var(--color-secondary); margin-bottom: 0.5rem;">❓ Question de lecture (Comprehension Check)</h4>
            <p style="font-size: 0.95rem; font-weight: 500;">${p.question_fr}</p>
            ${m?"":`<p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 0.5rem;">${p.question_ja}</p>`}
            ${y}
            <div style="display: flex; gap: 1rem; margin-top: 1rem; align-items: center;">
              <button class="next-btn quiz-submit-btn" style="padding: 0.4rem 1.2rem; font-size: 0.8rem;">Vérifier (Check)</button>
              <span class="quiz-feedback-msg" style="font-size: 0.85rem; font-weight: 600;"></span>
            </div>
          `;const C=d.querySelector(".quiz-submit-btn"),$=d.querySelector(".quiz-feedback-msg");C.addEventListener("click",()=>{const q=d.querySelector(`input[name="quiz-${p.id}"]:checked`);q&&q.value===w?($.style.color="var(--color-success)",$.innerText="✓ Correct ! Excellent !",C.style.display="none",setTimeout(()=>{ke(e,r,_)},1e3)):($.style.color="var(--color-error)",$.innerText="❌ Incorrect. Réessayez !")})}else if(p.type==="preposition"){y=`
            <div style="margin-top: 0.8rem;">
              <select id="preposition-select-${p.id}" style="padding: 0.5rem 1rem; font-size: 0.9rem; border-radius: 4px; border: 1px solid rgba(0,0,91,0.15); background-color: white; outline: none; width: 100%; max-width: 250px; font-weight: 600;">
                <option value="">-- Choisissez (選択してください) --</option>
                ${p.options.map(w=>`<option value="${w}">${w}</option>`).join("")}
              </select>
            </div>
          `,d.innerHTML=`
            <h4 style="font-size: 0.95rem; color: var(--color-secondary); margin-bottom: 0.5rem;">❓ Choix de préposition (前置詞選択)</h4>
            <p style="font-size: 0.95rem; font-weight: 500;">${p.question_fr}</p>
            ${m?"":`<p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 0.5rem;">${p.question_ja}</p>`}
            ${y}
            <div style="display: flex; gap: 1rem; margin-top: 1rem; align-items: center;">
              <button class="next-btn quiz-submit-btn" style="padding: 0.4rem 1.2rem; font-size: 0.8rem;">Vérifier (Check)</button>
              <span class="quiz-feedback-msg" style="font-size: 0.85rem; font-weight: 600;"></span>
            </div>
          `;const S=d.querySelector(".quiz-submit-btn"),k=d.querySelector(".quiz-feedback-msg");S.addEventListener("click",()=>{d.querySelector(`#preposition-select-${p.id}`).value===p.answer?(k.style.color="var(--color-success)",k.innerText="✓ Correct ! Très bien !",S.style.display="none",setTimeout(()=>{ke(e,r,_)},1e3)):(k.style.color="var(--color-error)",k.innerText="❌ Incorrect. Réessayez !")})}else if(p.type==="word_order"){d.innerHTML=`
            <h4 style="font-size: 0.95rem; color: var(--color-secondary); margin-bottom: 0.5rem;">❓ Reconstitution de phrase (並び替え)</h4>
            <p style="font-size: 0.95rem; font-weight: 500;">${p.question_fr}</p>
            ${m?"":`<p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 0.5rem;">${p.question_ja}</p>`}
            
            <div class="word-order-quiz-wrapper" style="margin-top: 1rem;">
              <div class="selected-chips-area" style="min-height: 44px; border: 1px dashed rgba(0,0,91,0.15); border-radius: 6px; padding: 0.5rem; display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; background-color: #fafbfc;"></div>
              <div class="shuffled-chips-area" style="display: flex; flex-wrap: wrap; gap: 0.5rem;"></div>
            </div>
            
            <div style="display: flex; gap: 1rem; margin-top: 1.2rem; align-items: center;">
              <button class="next-btn quiz-submit-btn" style="padding: 0.4rem 1.2rem; font-size: 0.8rem;">Vérifier (Check)</button>
              <span class="quiz-feedback-msg" style="font-size: 0.85rem; font-weight: 600;"></span>
            </div>
          `;const S=d.querySelector(".selected-chips-area"),k=d.querySelector(".shuffled-chips-area"),w=d.querySelector(".quiz-submit-btn"),C=d.querySelector(".quiz-feedback-msg");let $=[],q=[...p.options].sort(()=>Math.random()-.5);const b=()=>{S.innerHTML="",k.innerHTML="",$.length===0&&(S.innerHTML='<span style="font-size: 0.8rem; color: #888; font-style: italic; align-self: center;">Cliquez sur les mots ci-dessous...</span>'),$.forEach((L,E)=>{const j=document.createElement("span");j.className="word-chip selected",j.innerText=L,j.addEventListener("click",()=>{$.splice(E,1),q.push(L),b()}),S.appendChild(j)}),q.forEach((L,E)=>{const j=document.createElement("span");j.className="word-chip",j.innerText=L,j.addEventListener("click",()=>{q.splice(E,1),$.push(L),b()}),k.appendChild(j)})};b(),w.addEventListener("click",()=>{const L=$.join(" "),E=p.answer_words.join(" ");L===E?(C.style.color="var(--color-success)",C.innerText="✓ Correct ! Formidable !",w.style.display="none",S.style.pointerEvents="none",k.style.pointerEvents="none",setTimeout(()=>{ke(e,r,_)},1e3)):(C.style.color="var(--color-error)",C.innerText="❌ Ordre incorrect. Réessayez !")})}else if(p.type==="kitchen_situation"){y=`
            <div style="background-color: #f0f4f8; border-left: 4px solid var(--color-primary); padding: 0.8rem 1.2rem; border-radius: 6px; font-size: 0.88rem; margin-top: 0.8rem; font-family: var(--font-sans); line-height: 1.5; color: var(--color-primary); box-shadow: var(--shadow-sm);">
              <strong>👨‍🍳 Chef (シェフの指示):</strong> <span style="font-style: italic;">"${p.question_fr}"</span>
            </div>
            <div style="margin-top: 1rem;">
              <input type="text" id="quiz-input-${p.id}" placeholder="Répondez au chef (シェフに回答する)..." style="padding: 0.5rem 1rem; font-size: 0.9rem; border-radius: 4px; border: 1px solid rgba(0,0,91,0.15); width: 100%; max-width: 320px; outline: none; font-weight: bold;">
            </div>
          `,d.innerHTML=`
            <h4 style="font-size: 0.95rem; color: var(--color-secondary); margin-bottom: 0.5rem;">❓ Dialogue en cuisine (厨房シチュエーション)</h4>
            ${m?"":`<p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 0.5rem;">${p.question_ja}</p>`}
            ${y}
            <div style="display: flex; gap: 1rem; margin-top: 1rem; align-items: center;">
              <button class="next-btn quiz-submit-btn" style="padding: 0.4rem 1.2rem; font-size: 0.8rem;">Vérifier (Check)</button>
              <span class="quiz-feedback-msg" style="font-size: 0.85rem; font-weight: 600;"></span>
            </div>
          `;const S=d.querySelector(".quiz-submit-btn"),k=d.querySelector(".quiz-feedback-msg");S.addEventListener("click",()=>{d.querySelector(`#quiz-input-${p.id}`).value.trim().toLowerCase()===p.blank_word.toLowerCase()?(k.style.color="var(--color-success)",k.innerText="✓ Oui, Chef ! Correct !",S.style.display="none",setTimeout(()=>{ke(e,r,_)},1e3)):(k.style.color="var(--color-error)",k.innerText="❌ Ce n'est pas tout à fait ça. Réessayez !")})}else if(p.type==="input"||p.type==="conjugation"){y=`
            <div style="margin-top: 0.8rem;">
              <input type="text" id="quiz-input-${p.id}" placeholder="Entrez le mot..." style="padding: 0.4rem 0.8rem; font-size: 0.9rem; border-radius: 4px; border: 1px solid rgba(0,0,0,0.15); width: 100%; max-width: 300px;">
            </div>
          `,d.innerHTML=`
            <h4 style="font-size: 0.95rem; color: var(--color-secondary); margin-bottom: 0.5rem;">❓ Question de conjugaison / orthographe (記述クイズ)</h4>
            <p style="font-size: 0.95rem; font-weight: 500;">${p.question_fr}</p>
            ${m?"":`<p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 0.5rem;">${p.question_ja}</p>`}
            ${y}
            <div style="display: flex; gap: 1rem; margin-top: 1rem; align-items: center;">
              <button class="next-btn quiz-submit-btn" style="padding: 0.4rem 1.2rem; font-size: 0.8rem;">Vérifier (Check)</button>
              <span class="quiz-feedback-msg" style="font-size: 0.85rem; font-weight: 600;"></span>
            </div>
          `;const S=d.querySelector(".quiz-submit-btn"),k=d.querySelector(".quiz-feedback-msg");let w=0;S.addEventListener("click",()=>{if(d.querySelector(`#quiz-input-${p.id}`).value.trim().toLowerCase()===p.blank_word.toLowerCase())k.style.color="var(--color-success)",k.innerText="✓ Correct ! Excellent !",S.style.display="none",setTimeout(()=>{ke(e,r,_)},1e3);else if(w++,k.style.color="var(--color-error)",n&&w>=2){const $=p.blank_word[0].toUpperCase();k.innerText=`❌ Incorrect. Indice : commence par "${$}"`}else k.innerText="❌ Incorrect. Réessayez !"})}}else d.innerHTML=`
          <button class="next-btn validate-session-btn" style="padding: 0.5rem 1.5rem; font-size: 0.85rem; width: 100%;">
            Valider et continuer (Complete & Continue)
          </button>
        `,d.querySelector(".validate-session-btn").addEventListener("click",()=>{ke(e,r,_)});T.appendChild(d)}else T.innerHTML=`
        <div class="ref-para-fr blurred-text" style="font-size: 1.15rem; line-height: 1.8; color: #a0a0a0; font-family: var(--font-serif); filter: blur(4px); user-select: none;">
          ${h.text_fr.split(`
`).join("<br>")}
        </div>
      `;l.appendChild(T),g.appendChild(l)}),g.querySelectorAll(".section-audio-btn").forEach(h=>{h.addEventListener("click",_=>{_.stopPropagation(),te(h.getAttribute("data-text"))})}),(()=>{s.querySelector("#helper-toggle-outlines").addEventListener("change",h=>{x.settings.readingHelper.outlines=h.target.checked,h.target.checked&&(x.settings.readingHelper.pureText=!1,s.querySelector("#helper-toggle-pure").checked=!1),me(g)}),s.querySelector("#helper-toggle-translations").addEventListener("change",h=>{x.settings.readingHelper.translations=h.target.checked,h.target.checked&&(x.settings.readingHelper.pureText=!1,s.querySelector("#helper-toggle-pure").checked=!1),me(g)}),s.querySelector("#helper-toggle-target").addEventListener("change",h=>{x.settings.readingHelper.targetOnly=h.target.checked,me(g)}),s.querySelector("#helper-toggle-pure").addEventListener("change",h=>{x.settings.readingHelper.pureText=h.target.checked,h.target.checked&&(x.settings.readingHelper.outlines=!1,x.settings.readingHelper.translations=!1,s.querySelector("#helper-toggle-outlines").checked=!1,s.querySelector("#helper-toggle-translations").checked=!1),me(g)})})(),me(g),e.appendChild(g)}function ke(e,r,t){ie=t+1,ie>=r.sessions.length?(ue="complete",ge(e,r)):(ge(e,r),setTimeout(()=>{const a=document.getElementById(`session-card-${ie}`);a&&a.scrollIntoView({behavior:"smooth",block:"center"})},100))}function wn(e,r){const t=document.createElement("div");t.className="magazine-header",t.style.textAlign="center",t.style.marginBottom="2.5rem",t.innerHTML=`
    <div style="font-family: var(--font-serif); font-size: 0.85rem; letter-spacing: 2px; text-transform: uppercase; color: var(--color-text-muted); margin-bottom: 0.5rem; border-bottom: 2px double rgba(0,0,91,0.1); padding-bottom: 0.4rem; font-weight: bold;">
      Lecteur Complet — Version Prémice
    </div>
    <h1 style="font-family: var(--font-serif); font-size: 2.5rem; font-weight: 700; color: var(--color-primary); line-height: 1.25; margin-top: 1rem; margin-bottom: 0.5rem;">${r.title_fr}</h1>
    <h2 style="font-size: 1.1rem; color: var(--color-text-muted); font-weight: 500; font-style: italic; margin-bottom: 1.5rem;">${r.title_ja}</h2>
    <div style="font-size: 0.85rem; color: var(--color-success); font-weight: bold; margin-bottom: 1rem;">🎉 Félicitations ! Vous avez complété et déverrouillé l'article.</div>
  `,e.appendChild(t);const a=document.createElement("div");a.className="newspaper-columns",a.style.fontSize="1.18rem",a.style.lineHeight="1.8",a.style.fontFamily="var(--font-serif)",a.style.color="var(--color-primary)",a.style.marginBottom="2.5rem";let n="";r.sessions.forEach((u,s)=>{n+=`
      <p class="${s===0?"editorial-dropcap":""}" style="margin-bottom: 1.5rem; text-align: justify; text-justify: inter-word;">
        ${u.text_fr.split(`
`).join("<br>")}
      </p>
    `}),a.innerHTML=n,e.appendChild(a);const o=document.createElement("div");o.style.display="flex",o.style.justifyContent="center",o.style.gap="1rem",o.style.marginTop="2rem";const m=document.createElement("button");m.className="next-btn",m.innerText="← Retour à l'aperçu (予習モードに戻る)",m.addEventListener("click",()=>{ue="preview",ie=0,ge(e,r)});const i=document.createElement("button");i.className="next-btn",i.style.backgroundColor="transparent",i.style.border="1px solid var(--color-primary)",i.style.color="var(--color-primary)",i.innerText="📚 Liste des articles (目次へ戻る)",i.addEventListener("click",()=>{Ue(e,[r])}),o.appendChild(m),o.appendChild(i),e.appendChild(o)}function Ve(e,r,t){we&&we.remove();const a=document.createElement("div");a.className="anatomy-tooltip card",a.style.position="absolute",a.style.zIndex="1000",a.style.padding="1rem",a.style.width="290px",a.style.boxShadow="var(--shadow-lg)",a.style.border="1px solid rgba(0, 0, 91, 0.15)",a.style.borderRadius="8px",a.style.backgroundColor="#FFFFFF";const n=r.vocab_id||r.gram_id,o=x.db.knowledge.find(_=>_.id===n),i={noun:"Nom (名詞)",verb:"Verbe (動詞)",preposition:"Préposition (前置詞)",article_partitive:"Article partitif (部分冠詞)",article:"Article (冠詞)",pronoun_subject:"Pronom (代名詞)",conjunction:"Conjonction (接続詞)",other:"Autre (その他)"}[r.pos]||r.pos||"Autre (その他)";let u="";if(r.analysis&&(u=`
      <div style="font-size: 0.78rem; background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 0.5rem; border-radius: 4px; margin-top: 0.5rem; margin-bottom: 0.5rem;">
        <span style="font-size: 0.65rem; text-transform: uppercase; font-weight: bold; color: var(--color-text-muted); display: block; margin-bottom: 0.2rem;">🧬 Analyse Contextuelle (文脈解剖)</span>
        <strong>Base:</strong> ${r.analysis.lemma} (${r.analysis.group})<br>
        <strong>Forme:</strong> ${r.analysis.tense}<br>
        <span style="font-size: 0.75rem; color: var(--color-text-main); display: block; margin-top: 0.3rem; font-style: italic;">
          🇯🇵 ${r.analysis.context_ja}
        </span>
      </div>
    `),o){const _=!!o.french,l=`<span style="font-size: 0.85rem; font-weight: bold; color: var(--color-secondary);">${o.level}</span>`;if(_){const v=o.gender?o.gender==="m"?"Masculin":o.gender==="f"?"Féminin":"M/F":"",A=v?`<span style="font-size: 0.7rem; font-weight: 600; padding: 0.05rem 0.3rem; border-radius: 3px; background-color: #f0f4f8; color: var(--color-primary); border: 1px solid rgba(0,0,91,0.1);">${v}</span>`:"",T=o.verb_group?o.verb_group===1?"1er groupe":o.verb_group===2?"2e groupe":"3e groupe":"",P=T?`<span style="font-size: 0.7rem; font-weight: 600; padding: 0.05rem 0.3rem; border-radius: 3px; background-color: rgba(107,156,104,0.08); color: var(--color-success); border: 1px solid rgba(107,156,104,0.15);">${T}</span>`:"";a.innerHTML=`
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; border-bottom: 1px solid #f0f0f0; padding-bottom: 0.4rem;">
          <span style="font-size: 0.72rem; font-weight: bold; color: var(--color-text-muted); text-transform: uppercase;">${i}</span>
          ${l}
        </div>
        <div style="display: flex; align-items: center; gap: 0.4rem; margin-bottom: 0.4rem; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 0.3rem;">
            <strong style="font-size: 1.1rem; color: var(--color-primary);">${o.french}</strong>
          </div>
          <div style="display: flex; gap: 0.2rem;">
            ${A}
            ${P}
          </div>
        </div>
        ${u}
        <div style="font-size: 0.85rem; line-height: 1.4; color: var(--color-text-main); margin-bottom: 0.5rem; border-top: 1px solid #f0f0f0; padding-top: 0.5rem;">
          ${o.definition_fr||""}
        </div>
        <div style="font-size: 0.85rem; font-weight: 600; color: var(--color-secondary); margin-bottom: 0.8rem;">
          🇯🇵 ${o.japanese}
        </div>
        <div style="border-top: 1px solid #f0f0f0; padding-top: 0.6rem; display: flex; gap: 0.4rem; justify-content: space-between;">
          <button class="next-btn play-here-btn" style="padding: 0.35rem 0.5rem; font-size: 0.72rem; flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 0.2rem; background-color: transparent; border: 1px solid var(--color-accent); color: var(--color-accent);">単語を聴く</button>
          <button class="next-btn play-from-here-btn" style="padding: 0.35rem 0.5rem; font-size: 0.72rem; flex: 1.2; display: inline-flex; align-items: center; justify-content: center; gap: 0.2rem; background-color: var(--color-accent); border-color: var(--color-accent);">ここから朗読</button>
        </div>
      `}else a.innerHTML=`
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; border-bottom: 1px solid #f0f0f0; padding-bottom: 0.4rem;">
          <span style="font-size: 0.72rem; font-weight: bold; color: var(--color-text-muted); text-transform: uppercase;">${i}</span>
          ${l}
        </div>
        <div style="margin-bottom: 0.5rem; margin-top: 0.4rem;">
          <strong style="font-size: 0.95rem; color: var(--color-primary);">${o.grammar.topic}</strong>
        </div>
        ${u}
        <div style="font-size: 0.8rem; line-height: 1.4; color: var(--color-text-main); margin-bottom: 0.8rem;">
          ${o.grammar.explanation_ja}
        </div>
        <div style="border-top: 1px solid #f0f0f0; padding-top: 0.6rem; display: flex; justify-content: flex-end;">
          <button class="next-btn play-from-here-btn" style="padding: 0.35rem 0.8rem; font-size: 0.72rem; display: inline-flex; align-items: center; justify-content: center; gap: 0.2rem; background-color: var(--color-accent); border-color: var(--color-accent); width: 100%;">🔊 ここから朗読</button>
        </div>
      `}else a.innerHTML=`
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; border-bottom: 1px solid #f0f0f0; padding-bottom: 0.4rem;">
        <span style="font-size: 0.72rem; font-weight: bold; color: var(--color-text-muted); text-transform: uppercase;">${i}</span>
      </div>
      <strong style="font-size: 1.1rem; color: var(--color-primary); margin-top: 0.4rem; display: block;">${r.word}</strong>
      ${u}
      <div style="border-top: 1px solid #f0f0f0; padding-top: 0.6rem; display: flex; gap: 0.4rem; justify-content: space-between;">
        <button class="next-btn play-here-btn" style="padding: 0.35rem 0.5rem; font-size: 0.72rem; flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 0.2rem; background-color: transparent; border: 1px solid var(--color-accent); color: var(--color-accent);">単語を聴く</button>
        <button class="next-btn play-from-here-btn" style="padding: 0.35rem 0.5rem; font-size: 0.72rem; flex: 1.2; display: inline-flex; align-items: center; justify-content: center; gap: 0.2rem; background-color: var(--color-accent); border-color: var(--color-accent);">ここから朗読</button>
      </div>
    `;document.body.appendChild(a),we=a;const s=e.getBoundingClientRect(),g=s.bottom+window.scrollY+8,f=Math.max(10,Math.min(window.innerWidth-300,s.left+window.scrollX-100));a.style.top=`${g}px`,a.style.left=`${f}px`;const c=a.querySelector(".play-here-btn");c&&c.addEventListener("click",_=>{_.stopPropagation();const l=r.word.replace(/^[^\wÀ-ÿ]+|[^\wÀ-ÿ]+$/g,"");te(l)});const h=a.querySelector(".play-from-here-btn");h&&t&&h.addEventListener("click",_=>{_.stopPropagation(),te(t)})}const x={meta:null,db:{knowledge:[],quizzes:[]},loaded:{knowledge:new Set,quizzes:!1},favorites:new Set(JSON.parse(localStorage.getItem("cba_favorites")||"[]")),wrongAnswers:JSON.parse(localStorage.getItem("cba_wrong")||"[]"),streak:parseInt(localStorage.getItem("cba_streak")||"0"),lastStudyDate:localStorage.getItem("cba_last_study")||"",srs:JSON.parse(localStorage.getItem("cba_srs")||"{}"),settings:JSON.parse(localStorage.getItem("cba_settings")||JSON.stringify({targetLevel:"ALL",newCardsPerDay:5,maxReviewsPerDay:20,includeGeneral:!1}))};function be(e){x.favorites.has(e)?x.favorites.delete(e):x.favorites.add(e),localStorage.setItem("cba_favorites",JSON.stringify(Array.from(x.favorites)))}function fe(e){return x.favorites.has(e)}function ot(e){x.wrongAnswers.includes(e)||(x.wrongAnswers.push(e),localStorage.setItem("cba_wrong",JSON.stringify(x.wrongAnswers)))}function Cn(e){x.wrongAnswers=x.wrongAnswers.filter(r=>r!==e),localStorage.setItem("cba_wrong",JSON.stringify(x.wrongAnswers))}function Sn(){const e=new Date().toISOString().split("T")[0];if(x.lastStudyDate!==e){if(x.lastStudyDate){const r=new Date(x.lastStudyDate),t=new Date(e),a=Math.abs(t-r),n=Math.ceil(a/(1e3*60*60*24));n===1?x.streak+=1:n>1&&(x.streak=1)}else x.streak=1;x.lastStudyDate=e,localStorage.setItem("cba_streak",x.streak.toString()),localStorage.setItem("cba_last_study",e)}}function He(e,r){const t=new Date().toISOString().split("T")[0],a=x.srs[e]||{easiness:2.5,interval:0,repetitions:0,dueDate:t};let n=Math.max(0,Math.min(5,r));n>=3?(a.repetitions===0?a.interval=1:a.repetitions===1?a.interval=6:a.interval=Math.round(a.interval*a.easiness),a.repetitions++):(a.repetitions=0,a.interval=1),a.easiness=a.easiness+(.1-(5-n)*(.08+(5-n)*.02)),a.easiness<1.3&&(a.easiness=1.3);const o=new Date;o.setDate(o.getDate()+a.interval),a.dueDate=o.toISOString().split("T")[0],a.lastRated=t,x.srs[e]=a,localStorage.setItem("cba_srs",JSON.stringify(x.srs))}function Ln(e){x.settings={...x.settings,...e},localStorage.setItem("cba_settings",JSON.stringify(x.settings))}async function oe(e,r){const t=r==="ALL"?["A1","A2","B1","B2","C1","C2"]:[r];for(const a of t)if(!x.loaded.knowledge.has(a))try{const n=await fetch(`data/knowledge_${a}.json`);if(!n.ok){console.warn(`Could not load data/knowledge_${a}.json`);continue}const o=await n.json(),m=new Set(x.db.knowledge.map(i=>i.id));for(const i of o)m.has(i.id)||(!i.context_fr&&i.examples&&i.examples.length>0&&(i.context_fr=i.examples[0].fr,i.context_en=i.examples[0].en,i.context_ja=i.examples[0].ja),x.db.knowledge.push(i));x.loaded.knowledge.add(a)}catch(n){console.error(`Failed to load knowledge level ${a}:`,n)}}async function Je(){if(!x.loaded.quizzes)try{const e=await fetch("data/quizzes.json");if(!e.ok)throw new Error("Network response was not ok");x.db.quizzes=await e.json(),x.loaded.quizzes=!0}catch(e){console.error("Failed to load quizzes:",e)}}async function Ye(){await Promise.all([oe("vocabulary","ALL"),oe("grammar","ALL"),oe("cuisine","ALL"),Je()])}const st={home:At,vocabulary:Mt,grammar:Ft,reference:Rt,cuisine:en,quiz:rn,favorites:$e,review:ln,search:dn,settings:mn,dictation:un,story:yn,reading:_n};function Ee(e){const r=document.getElementById("main-content");if(st[e]){Sn(),r.innerHTML="";const t=st[e]();t instanceof HTMLElement?r.appendChild(t):r.innerHTML=t,document.querySelectorAll(".nav-link").forEach(a=>{a.getAttribute("data-tab")===e?a.classList.add("active"):a.classList.remove("active")})}}async function jn(){if(!window.__app_initialized){window.__app_initialized=!0;try{const e=await fetch("data/meta.json");x.meta=await e.json();const r=document.getElementById("hamburger-menu-toggle"),t=document.querySelector(".nav-band");r&&t&&(r.addEventListener("click",a=>{a.stopPropagation(),t.classList.toggle("mobile-open"),r.classList.toggle("active")}),document.addEventListener("click",a=>{!a.target.closest(".nav-band")&&!a.target.closest("#hamburger-menu-toggle")&&(t.classList.remove("mobile-open"),r.classList.remove("active"))})),document.querySelectorAll(".nav-link").forEach(a=>{a.addEventListener("click",n=>{const o=n.target.closest(".nav-link").getAttribute("data-tab");Ee(o),t&&t.classList.contains("mobile-open")&&(t.classList.remove("mobile-open"),r&&r.classList.remove("active"))})}),Ee("home"),Tn()}catch(e){console.error("Failed to load database metadata:",e),document.getElementById("main-content").innerHTML=`
      <div class="alert alert-info" style="border-left-color: var(--color-error); background-color: #FFEBEE; color: var(--color-error)">
        <h3>Error: Métadonnées inaccessibles</h3>
        <p>Could not load curriculum metadata. Please reload or check your local setup.</p>
      </div>
    `}}}function Tn(){const e=document.getElementById("youglish-sidebar"),r=document.getElementById("youglish-sidebar-toggle"),t=document.getElementById("youglish-search-input"),a=document.getElementById("youglish-search-btn"),n=document.getElementById("yg-widget-container");if(!e||!r||!t||!a||!n)return;r.addEventListener("click",i=>{i.stopPropagation(),e.classList.toggle("open"),e.classList.contains("open")&&t.focus()}),document.addEventListener("click",i=>{e.classList.contains("open")&&!e.contains(i.target)&&e.classList.remove("open")});let o=null;function m(){const i=t.value.trim();if(i)if(n.innerHTML='<div id="yg-widget" style="width: 100%;"></div>',window.YG)try{o=new YG("yg-widget",{width:230,components:9,accentColor:"#C5A880",autoStart:1,search:i,language:"french"})}catch(u){console.error("Failed to load YouGlish widget:",u),n.innerHTML=`
          <div style="font-size: 0.75rem; text-align: center; color: var(--color-error); padding: 1rem;">
            ウィジェットの読み込みに失敗しました。<br>
            <a href="https://youglish.com/pronounce/${encodeURIComponent(i)}/french" target="_blank" style="color: var(--color-accent); font-weight: 600; text-decoration: underline;">YouGlish[...]</a>
          </div>
        `}else window.open(`https://youglish.com/pronounce/${encodeURIComponent(i)}/french`,"_blank"),n.innerHTML=`
        <div style="font-size: 0.75rem; text-align: center; color: rgba(255,255,255,0.7); padding: 1rem;">
          発音ページを別タブで開きました。<br>
          <a href="https://youglish.com/pronounce/${encodeURIComponent(i)}/french" target="_blank" style="color: var(--color-accent); font-weight: 600; text-decoration: underline;">開く</a>
        </div>
      `}a.addEventListener("click",m),t.addEventListener("keypress",i=>{i.key==="Enter"&&m()})}"serviceWorker"in navigator&&window.addEventListener("load",()=>{window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1"?navigator.serviceWorker.getRegistrations().then(e=>{for(let r of e)r.unregister().then(()=>{console.log("Local ServiceWorker unregistered successfully.")})}):navigator.serviceWorker.register("sw.js").then(e=>console.log("ServiceWorker registered:",e.scope)).catch(e=>console.warn("ServiceWorker registration failed:",e))});document.addEventListener("DOMContentLoaded",jn);
