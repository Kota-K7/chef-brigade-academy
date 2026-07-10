import { regionRelations, cutRelations } from '../cuisine_core.js';
import { dishes } from '../cuisine_dishes.js';
import { techniques } from '../cuisine_techniques.js';
import { sauces } from '../cuisine_sauces.js';
import { science as scienceData } from '../cuisine_science.js';

// Helper to generate HTML for relational links
export function getRelationBadges(id, type) {
  const rels = type === 'region' ? regionRelations[id] : cutRelations[id];
  if (!rels) return '';
  
  let html = '';
  
  if (rels.dishes && rels.dishes.length > 0) {
    html += `<div style="margin-top: 0.6rem;"><span style="font-size: 0.75rem; font-weight: 700; color: var(--color-accent-hover); text-transform: uppercase; display: block; margin-bottom: 0.2rem;">🍽️ 代表料理 (Classic Dishes):</span> `;
    html += rels.dishes.map(dId => {
      const d = dishes[dId];
      const name = d ? `${d.name_fr} (${d.name_ja})` : dId;
      return `<span class="relation-badge" style="display: inline-block; background-color: rgba(0, 0, 145, 0.05); color: var(--color-primary); padding: 0.25rem 0.5rem; font-size: 0.8rem; border-radius: 4px; margin-right: 0.4rem; margin-top: 0.25rem; border: 1px solid rgba(0, 0, 145, 0.15); font-weight: 500;">${name}</span>`;
    }).join('');
    html += `</div>`;
  }
  
  if (rels.techniques && rels.techniques.length > 0) {
    html += `<div style="margin-top: 0.6rem;"><span style="font-size: 0.75rem; font-weight: 700; color: var(--color-accent-hover); text-transform: uppercase; display: block; margin-bottom: 0.2rem;">🔥 調理技法 (Techniques):</span> `;
    html += rels.techniques.map(tId => {
      const t = techniques[tId];
      const name = t ? `${t.name_fr} (${t.name_ja})` : tId;
      return `<span class="relation-badge" style="display: inline-block; background-color: rgba(220, 38, 38, 0.05); color: var(--color-secondary); padding: 0.25rem 0.5rem; font-size: 0.8rem; border-radius: 4px; margin-right: 0.4rem; margin-top: 0.25rem; border: 1px solid rgba(220, 38, 38, 0.15); font-weight: 500;">${name}</span>`;
    }).join('');
    html += `</div>`;
  }
  
  if (rels.sauces && rels.sauces.length > 0) {
    html += `<div style="margin-top: 0.6rem;"><span style="font-size: 0.75rem; font-weight: 700; color: var(--color-accent-hover); text-transform: uppercase; display: block; margin-bottom: 0.2rem;">🥫 ソース (Sauces):</span> `;
    html += rels.sauces.map(sId => {
      const s = sauces[sId];
      const name = s ? `${s.name_fr} (${s.name_ja})` : sId;
      return `<span class="relation-badge" style="display: inline-block; background-color: rgba(197, 168, 128, 0.1); color: var(--color-text-main); padding: 0.25rem 0.5rem; font-size: 0.8rem; border-radius: 4px; margin-right: 0.4rem; margin-top: 0.25rem; border: 1px solid rgba(197, 168, 128, 0.3); font-weight: 500;">${name}</span>`;
    }).join('');
    html += `</div>`;
  }
  
  if (rels.science && rels.science.length > 0) {
    html += `<div style="margin-top: 0.6rem;"><span style="font-size: 0.75rem; font-weight: 700; color: var(--color-accent-hover); text-transform: uppercase; display: block; margin-bottom: 0.2rem;">🧪 料理科学 (Science):</span> `;
    html += rels.science.map(sId => {
      const s = scienceData[sId];
      const name = s ? `${s.name_fr} (${s.name_ja})` : sId;
      return `<span class="relation-badge" style="display: inline-block; background-color: rgba(107, 156, 104, 0.05); color: var(--color-success); padding: 0.25rem 0.5rem; font-size: 0.8rem; border-radius: 4px; margin-right: 0.4rem; margin-top: 0.25rem; border: 1px solid rgba(107, 156, 104, 0.15); font-weight: 500;">${name}</span>`;
    }).join('');
    html += `</div>`;
  }
  
  if (rels.ingredients && rels.ingredients.length > 0) {
    html += `<div style="margin-top: 0.6rem;"><span style="font-size: 0.75rem; font-weight: 700; color: var(--color-accent-hover); text-transform: uppercase; display: block; margin-bottom: 0.2rem;">🥬 主要食材 (Ingredients):</span> `;
    html += rels.ingredients.map(iId => {
      return `<span class="relation-badge" style="display: inline-block; background-color: rgba(10, 25, 49, 0.05); color: var(--color-text-muted); padding: 0.25rem 0.5rem; font-size: 0.8rem; border-radius: 4px; margin-right: 0.4rem; margin-top: 0.25rem; border: 1px solid rgba(10, 25, 49, 0.15); font-weight: 500;">${iId}</span>`;
    }).join('');
    html += `</div>`;
  }
  
  return html;
}
