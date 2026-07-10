import { speakFrench } from '../../utils/audio.js';
import { getRelationBadges } from './relations.js';
import { regions } from '../cuisine_regions.js';

// SUB-TAB 3: GEOGRAPHIC CULINARY MAP
export function renderGastronomyMap(contentWrapper) {
  const panel = document.createElement('div');
  panel.innerHTML = `
    <div class="interactive-canvas-container" style="position: relative;">
      <img src="assets/france_map.png" alt="Gastronomic Map of France" class="interactive-image" onerror="this.src='https://placehold.co/700x450/F4EAD4/0a1931?text=Carte+Gastronomique'">
      <svg class="interactive-svg-overlay" viewBox="0 0 100 100">
        ${regions.map(reg => `
          <polygon class="interactive-area" points="${reg.points}" data-id="${reg.id}" />
        `).join('')}
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
  `;

  contentWrapper.appendChild(panel);

  const drawer = panel.querySelector('#map-detail-drawer');
  const spots = panel.querySelectorAll('.interactive-area');

  spots.forEach(spot => {
    spot.addEventListener('click', (e) => {
      spots.forEach(s => s.classList.remove('active'));
      e.target.classList.add('active');

      const regId = e.target.getAttribute('data-id');
      const reg = regions.find(r => r.id === regId);
      
      if (reg) {
        panel.querySelector('#map-region-title').innerText = `${reg.name_fr} (${reg.name_ja})`;
        panel.querySelector('#map-region-sub').innerText = `${reg.name_en} Region`;
        
        panel.querySelector('#map-desc-fr').innerText = reg.desc_fr;
        panel.querySelector('#map-desc-en').innerText = reg.desc_en;
        panel.querySelector('#map-desc-ja').innerText = reg.desc_ja;

        // Render relations
        const relsContainer = panel.querySelector('#map-relations-container');
        const relsContent = panel.querySelector('#map-relations-content');
        const relsHtml = getRelationBadges(regId, 'region');
        if (relsHtml) {
          relsContent.innerHTML = relsHtml;
          relsContainer.style.display = 'block';
        } else {
          relsContainer.style.display = 'none';
        }

        // Wire up audio
        const titleAudioBtn = panel.querySelector('#map-audio-title-btn');
        titleAudioBtn.style.display = 'inline-block';
        titleAudioBtn.onclick = () => speakFrench(reg.name_fr);

        const descAudioBtn = panel.querySelector('#map-audio-desc-btn');
        descAudioBtn.style.display = 'inline-block';
        descAudioBtn.onclick = () => speakFrench(reg.desc_fr);

        drawer.style.display = 'block';
      }
    });
  });
}
