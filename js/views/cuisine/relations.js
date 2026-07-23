import { regionRelations, cutRelations } from '../cuisine_core.js';
import { dishes } from '../cuisine_dishes.js';
import { techniques } from '../cuisine_techniques.js';
import { sauces } from '../cuisine_sauces.js';
import { science as scienceData } from '../cuisine_science.js';

import { beefCuts, porcCuts, poultryCuts } from '../ingredients/primary_meats.js';
import { lambCuts, vealCuts, duckCuts } from '../ingredients/other_livestock.js';
import { deerCuts, boarCuts, pigeonCuts, hareCuts } from '../ingredients/game_meats.js';
import { fishCuts, crustaceanCuts, shellfishCuts, molluskCuts } from '../ingredients/seafood.js';
import { cheeseCutsFr, cheeseCutsWorld, cheeseClassifications, wineCuts } from '../ingredients/cheese_wine.js';
import { vegetableCuts } from '../ingredients/vegetables.js';
import { herbCuts, spiceCuts } from '../ingredients/herbs_spices.js';
import { fruitCuts, mushroomCuts } from '../ingredients/fruits_mushrooms.js';

const allIngredients = [
  ...beefCuts, ...porcCuts, ...poultryCuts,
  ...lambCuts, ...vealCuts, ...duckCuts,
  ...deerCuts, ...boarCuts, ...pigeonCuts, ...hareCuts,
  ...fishCuts, ...crustaceanCuts, ...shellfishCuts, ...molluskCuts,
  ...cheeseCutsFr, ...cheeseCutsWorld, ...cheeseClassifications, ...wineCuts,
  ...vegetableCuts, ...herbCuts, ...spiceCuts, ...fruitCuts, ...mushroomCuts
];

function resolveIngredientName(iId) {
  const ing = allIngredients.find(x => x.id === iId);
  if (ing) {
    const name = ing.name_fr || ing.name_it || ing.name_local || ing.name_ja;
    let typeSuffix = '';
    if (iId.startsWith('ing_wine_')) {
      typeSuffix = ' (ワイン)';
    } else if (iId.startsWith('ing_')) {
      if (cheeseCutsFr.some(x => x.id === iId)) typeSuffix = ' (仏チーズ)';
      else if (cheeseCutsWorld.some(x => x.id === iId)) typeSuffix = ' (世界チーズ)';
      else if (wineCuts.some(x => x.id === iId)) typeSuffix = ' (ワイン)';
      else typeSuffix = ' (食材)';
    }
    return `${name} (${ing.name_ja})${typeSuffix}`;
  }
  
  const staticMap = {
    apple: "リンゴ (Pomme)",
    oil_olive: "オリーブオイル (Huile d'olive)",
    herbes_de_provence: "プロヴァンスハーブ (Herbes de Provence)",
    sauerkraut: "シュークルート (Sauerkraut)",
    strasbourg_sausage: "ストラスブールソーセージ",
    buckwheat_flour: "そば粉 (Sarrasin)",
    salted_butter: "有塩バター (Beurre salé)",
    foie_gras: "フォアグラ (Foie gras)",
    duck: "鴨肉 (Canard)",
    cut_kokotxa_de_merlu: "メルルーサの顎肉 (Kokotxa de merlu)",
    lingot_bean: "白インゲン豆 (Haricot lingot)",
    anchovy: "アンチョビ (Anchois)",
    chestnut_flour: "栗粉 (Farine de châtaigne)",
    lonzu_charcuterie: "ロンズ (Lonzu)",
    endive: "チコリ (Endive)"
  };
  return staticMap[iId] || iId;
}

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
      const name = resolveIngredientName(iId);
      return `<span class="relation-badge" style="display: inline-block; background-color: rgba(10, 25, 49, 0.05); color: var(--color-text-muted); padding: 0.25rem 0.5rem; font-size: 0.8rem; border-radius: 4px; margin-right: 0.4rem; margin-top: 0.25rem; border: 1px solid rgba(10, 25, 49, 0.15); font-weight: 500;">${name}</span>`;
    }).join('');
    html += `</div>`;
  }
  
  return html;
}
