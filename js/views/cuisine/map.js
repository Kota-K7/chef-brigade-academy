import { speakFrench } from '../../utils/audio.js';
import { getRelationBadges } from './relations.js';
import { regions as legacyRegions } from '../cuisine_regions.js';

// Cache for loaded JSON data
let adminRegions = [];
let culturalRegions = [];
let dishesData = [];
let cheesesData = [];
let winesData = [];

// Antique watercolor-like color palette for regions to look like a premium classic map
const regionColors = {
  reg_bretagne: 'rgba(212, 223, 208, 0.45)',       // Sage Green
  reg_normandie: 'rgba(226, 218, 197, 0.5)',        // Soft Ochre/Beige
  reg_hauts_de_france: 'rgba(209, 226, 230, 0.45)',  // Slate Blue
  reg_ile_de_france: 'rgba(232, 218, 211, 0.55)',   // Dusty Rose
  reg_grand_est: 'rgba(228, 213, 223, 0.45)',       // Lavender Mist
  reg_pays_de_la_loire: 'rgba(222, 213, 194, 0.5)',  // Antique Khaki
  reg_centre_val_de_loire: 'rgba(215, 220, 200, 0.45)',
  reg_bourgogne: 'rgba(230, 215, 200, 0.5)',
  reg_auvergne_rhone_alpes: 'rgba(205, 220, 225, 0.45)',
  reg_nouvelle_aquitaine: 'rgba(235, 215, 210, 0.55)',
  reg_occitanie: 'rgba(230, 210, 220, 0.45)',
  reg_provence: 'rgba(225, 210, 190, 0.5)',
  reg_corse: 'rgba(210, 220, 205, 0.45)',

  // Cultural map fallbacks
  reg_alsace: 'rgba(228, 213, 223, 0.45)',
  reg_champagne: 'rgba(226, 218, 197, 0.5)',
  reg_loire: 'rgba(222, 213, 194, 0.5)',
  reg_rhone_alpes: 'rgba(209, 226, 230, 0.45)',
  reg_aquitaine: 'rgba(232, 218, 211, 0.55)',
  reg_languedoc: 'rgba(228, 213, 223, 0.45)'
};

// Local state for the map component
const mapState = {
  activeMap: 'admin',      // 'admin' (post-2016 13 regions) or 'cultural' (legacy divisions)
  activeTheme: 'overview',  // 'overview', 'dishes', 'cheeses', 'wines'
  selectedRegionId: null,
  selectedItemId: null      // Holds active dish, cheese, or wine ID when pin clicked
};

export function renderGastronomyMap(contentWrapper) {
  const panel = document.createElement('div');
  panel.className = 'gastronomy-map-panel';
  
  // Render structure skeleton
  panel.innerHTML = `
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
  `;
  
  contentWrapper.appendChild(panel);
  
  // Create or retrieve floating tooltip element
  let tooltip = document.getElementById('map-floating-tooltip');
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.id = 'map-floating-tooltip';
    tooltip.style.position = 'fixed';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.zIndex = '9999';
    tooltip.style.padding = '0.5rem 0.8rem';
    tooltip.style.background = 'rgba(10, 25, 49, 0.95)';
    tooltip.style.border = '1px solid var(--color-accent)';
    tooltip.style.borderRadius = 'var(--radius-sm)';
    tooltip.style.color = '#fff';
    tooltip.style.fontSize = '0.75rem';
    tooltip.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    tooltip.style.display = 'none';
    tooltip.style.fontFamily = 'var(--font-main)';
    tooltip.style.lineHeight = '1.3';
    document.body.appendChild(tooltip);
  }
  
  // Attach Tab and Segment listeners
  const segmentBtns = panel.querySelectorAll('.segment-btn');
  segmentBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      segmentBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      mapState.activeMap = e.target.getAttribute('data-map');
      
      // Reset selected item/region when changing map layer
      mapState.selectedRegionId = null;
      mapState.selectedItemId = null;
      
      renderMap();
    });
  });
  
  const themeTabs = panel.querySelectorAll('.theme-tab-btn');
  themeTabs.forEach(btn => {
    btn.addEventListener('click', (e) => {
      themeTabs.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      mapState.activeTheme = e.target.getAttribute('data-theme');
      
      // Reset item selection when changing theme
      mapState.selectedItemId = null;
      
      renderMap();
    });
  });
  
  // Load data files asynchronously
  loadMapData().then(() => {
    renderMap();
  });
  
  // --- Data Loading ---
  async function loadMapData() {
    try {
      const urls = [
        'data/regions_administrative.json',
        'data/regions_cultural.json',
        'data/dishes.json',
        'data/cheeses.json',
        'data/wines.json'
      ];
      
      const responses = await Promise.all(urls.map(url => fetch(url)));
      
      // Check if all responses are ok
      for (const res of responses) {
        if (!res.ok) throw new Error(`Failed to load ${res.url}`);
      }
      
      adminRegions = await responses[0].json();
      culturalRegions = await responses[1].json();
      dishesData = await responses[2].json();
      cheesesData = await responses[3].json();
      winesData = await responses[4].json();
      
      console.log('Map engine data loaded successfully.');
    } catch (err) {
      console.error('Failed to load map JSON datasets:', err);
      // Fallback: populate with empty or basic list if loading fails
      adminRegions = [];
      culturalRegions = [];
    }
  }
  
  // --- Rendering Engine ---
  function renderMap() {
    const isReady = adminRegions.length > 0 && culturalRegions.length > 0;
    if (!isReady) {
      panel.querySelector('#regions-list-group').innerHTML = `<p style="font-size:0.8rem;color:var(--color-text-muted);padding:1rem;">読み込み中...</p>`;
      return;
    }
    
    // Toggle background illustration and decorations based on layer selection
    const legacyImg = panel.querySelector('#legacy-map-illustration');
    const decorContainer = panel.querySelector('#classic-map-decorations');
    const svgEl = panel.querySelector('#interactive-france-svg');
    
    if (mapState.activeMap === 'cultural') {
      legacyImg.style.display = 'block';
      decorContainer.style.display = 'none';
      svgEl.setAttribute('viewBox', '0 0 600 600');
    } else {
      legacyImg.style.display = 'none';
      decorContainer.style.display = 'block';
      svgEl.setAttribute('viewBox', '0 0 1000 1000');
    }
    
    const activeRegions = mapState.activeMap === 'admin' ? adminRegions : culturalRegions;
    
    // 1. Draw Paths
    const pathsGroup = panel.querySelector('#map-paths-group');
    const isCultural = mapState.activeMap === 'cultural';
    pathsGroup.innerHTML = activeRegions.map(reg => {
      const isActive = mapState.selectedRegionId === reg.region_id;
      const baseColor = regionColors[reg.region_id] || 'rgba(197, 168, 128, 0.1)';
      
      // In cultural map, we make the paths fully transparent (no fill, no stroke) when inactive
      // so that only the background illustration image is visible.
      const defaultFill = isCultural ? 'none' : baseColor;
      // Darker sepia hand-ink tone for boundaries
      const defaultStroke = isCultural ? 'none' : 'rgba(92, 64, 51, 0.65)';
      const defaultOpacity = isCultural ? 0.0 : 1.0;
      
      // When active, highlight with a beautiful warm gold tone overlay
      const fillStyle = isActive ? 'rgba(197, 168, 128, 0.45)' : defaultFill;
      const strokeStyle = isActive ? 'var(--color-primary)' : defaultStroke;
      // Increased stroke-width for a stronger hand-drawn look (2.2px default)
      const strokeWidth = isActive ? 3.2 : (isCultural ? 0 : 2.2);
      
      return `
        <path 
          class="region-path ${isActive ? 'active' : ''}" 
          d="${reg.geometry}" 
          id="${reg.region_id}" 
          data-id="${reg.region_id}"
          style="fill: ${fillStyle}; fill-opacity: ${isActive ? 0.65 : defaultOpacity}; stroke: ${strokeStyle}; stroke-width: ${strokeWidth}; cursor: pointer; transition: fill 0.25s, fill-opacity 0.25s, stroke 0.25s;"
        />
      `;
    }).join('');
    
    // 2. Draw Labels / Badges
    const labelsGroup = panel.querySelector('#map-labels-group');
    if (isCultural) {
      // In cultural map, we don't display any letter badges (N, BR etc.) inside the map anymore
      labelsGroup.innerHTML = '';
    } else {
      // Administrative Layer: Draw exact region name in French with elegant antique paper plate tags
      labelsGroup.innerHTML = activeRegions.map(reg => {
        const name = reg.french_name;
        // Scaled up font-size for better readability
        const fontSize = name.length > 20 ? 11.5 : (name.length > 12 ? 12.5 : 14.5);
        const charWidth = fontSize * 0.65;
        const rectWidth = Math.max(90, name.length * charWidth + 20);
        const rectHeight = fontSize + 8;
        const rectY = reg.label_y - (rectHeight / 2) - 1;
        const textY = reg.label_y + (fontSize / 3) + 0.5;
        
        return `
          <g class="region-label-group" style="pointer-events: none;">
            <!-- Drop Shadow for the label plate -->
            <rect 
              x="${reg.label_x - rectWidth/2 + 1.5}" 
              y="${rectY + 1.5}" 
              width="${rectWidth}" 
              height="${rectHeight}" 
              rx="5" 
              fill="rgba(0, 0, 0, 0.08)" 
              style="pointer-events: none;" 
            />
            <!-- Ivory paper tag -->
            <rect 
              x="${reg.label_x - rectWidth/2}" 
              y="${rectY}" 
              width="${rectWidth}" 
              height="${rectHeight}" 
              rx="5" 
              fill="rgba(253, 249, 240, 0.95)" 
              stroke="rgba(92, 64, 51, 0.6)" 
              stroke-width="1.0" 
              style="pointer-events: none;" 
            />
            <!-- Classic Serif Text -->
            <text 
              x="${reg.label_x}" 
              y="${textY}" 
              text-anchor="middle" 
              font-size="${fontSize}" 
              font-weight="700" 
              fill="#2e1f15"
              style="font-family: 'Playfair Display', 'Georgia', serif; letter-spacing: 0.5px; pointer-events: none;"
            >${name}</text>
          </g>
        `;
      }).join('');
    }
    
    // 3. Draw Pins based on Theme
    const pinsGroup = panel.querySelector('#map-pins-group');
    pinsGroup.innerHTML = ''; // Reset pins
    
    if (mapState.activeTheme !== 'overview') {
      let itemsToPin = [];
      let pinColor = 'var(--color-accent)';
      
      if (mapState.activeTheme === 'cheeses') {
        itemsToPin = cheesesData;
        pinColor = '#EAA812'; // Yellow/Gold for cheese
      } else if (mapState.activeTheme === 'wines') {
        itemsToPin = winesData;
        pinColor = '#A91B3E'; // Deep red for wine
      } else if (mapState.activeTheme === 'dishes') {
        itemsToPin = dishesData;
        pinColor = '#2F80ED'; // Blue for dishes
      }
      
      // Filter pins matching regions in current map layer
      const activeRegionIds = activeRegions.map(r => r.region_id);
      
      pinsGroup.innerHTML = itemsToPin.map(item => {
        // Map item.region name back to region_id
        const regId = resolveRegionId(item.region, mapState.activeMap);
        
        // Skip if this item doesn't map to a region on the active layer
        if (!regId || !activeRegionIds.includes(regId)) return '';
        
        // Get target region coordinate offsets
        const targetReg = activeRegions.find(r => r.region_id === regId);
        if (!targetReg) return '';
        
        // Adjust coordinates from 0-100 legacy percents to SVG viewBox scale
        // Cultural map is 600x600 (scale 6), Administrative map is 1000x1000 (scale 10)
        const scale = mapState.activeMap === 'cultural' ? 6 : 10;
        let x = item.pin.x * scale;
        let y = item.pin.y * scale;
        
        if (mapState.activeMap === 'admin') {
          // Force coordinates to sit tightly inside region boundaries to prevent floaters.
          // We blend 85% towards the region centroid (label_x, label_y) which is guaranteed to be inland.
          x = x * 0.15 + targetReg.label_x * 0.85;
          y = y * 0.15 + targetReg.label_y * 0.85;
          
          // Apply a much smaller offset to prevent overlaps without crossing regional borders (max 6px jitter)
          const offsetHash = (item.id.length * 5) % 12 - 6;
          x += offsetHash;
          y += ((item.id.length * 11) % 12 - 6);
        } else {
          // On cultural map, pins sit on legacy coordinates matched to the PNG illustration.
          // Apply very minor jitter (max 3px) so they don't drift into the ocean.
          const offsetHash = (item.id.length * 3) % 6 - 3;
          x += offsetHash;
          y += ((item.id.length * 5) % 6 - 3);
        }
        
        const isItemSelected = mapState.selectedItemId === item.id;
        
        return `
          <g class="map-pin-marker" data-item-id="${item.id}" data-region-id="${regId}" style="cursor:pointer; z-index: 10;">
            <circle cx="${x}" cy="${y}" r="${isItemSelected ? '9' : '6'}" fill="${pinColor}" stroke="#fff" stroke-width="1.5" />
            ${isItemSelected ? `<circle cx="${x}" cy="${y}" r="14" fill="none" stroke="${pinColor}" stroke-width="1.5" stroke-dasharray="2,2" opacity="0.8" />` : ''}
          </g>
        `;
      }).join('');
    }
    
    // 4. Render Right Sidebar List
    const sidebarTitle = panel.querySelector('#sidebar-list-title');
    if (mapState.activeTheme === 'overview') {
      sidebarTitle.innerText = '🗺️ 地方リスト (Régions)';
    } else {
      const themesJa = { dishes: '🍽️ 郷土料理', cheeses: '🧀 特産チーズ', wines: '🍷 地方ワイン' };
      sidebarTitle.innerText = `${themesJa[mapState.activeTheme]} リスト`;
    }
    
    const listGroup = panel.querySelector('#regions-list-group');
    listGroup.innerHTML = '';
    
    if (mapState.activeTheme === 'overview') {
      // List of regions
      listGroup.innerHTML = activeRegions.map(reg => {
        const isActive = mapState.selectedRegionId === reg.region_id;
        const regionNumber = reg.code || '';
        return `
          <button class="list-item-btn ${isActive ? 'active' : ''}" data-id="${reg.region_id}">
            <span>
              <span class="region-num-badge" style="display: inline-block; background-color: var(--color-accent); color: var(--color-primary); width: 20px; height: 20px; line-height: 20px; text-align: center; border-radius: 50%; font-size: 0.65rem; font-weight: 700; margin-right: 0.4rem;">
                ${regionNumber}
              </span> 
              ${reg.french_name}
            </span>
            <span style="font-size: 0.75rem; color: var(--color-text-muted); font-style: italic;">${reg.japanese_name}</span>
          </button>
        `;
      }).join('');
    } else {
      // List of dishes/cheeses/wines filtered by region or active map
      let itemsList = [];
      if (mapState.activeTheme === 'cheeses') itemsList = cheesesData;
      else if (mapState.activeTheme === 'wines') itemsList = winesData;
      else if (mapState.activeTheme === 'dishes') itemsList = dishesData;
      
      const activeRegionIds = activeRegions.map(r => r.region_id);
      
      // Filter list of items to those belonging to active regions in current layer
      const filteredItems = itemsList.filter(item => {
        const rId = resolveRegionId(item.region, mapState.activeMap);
        return rId && activeRegionIds.includes(rId);
      });
      
      listGroup.innerHTML = filteredItems.map(item => {
        const isActive = mapState.selectedItemId === item.id;
        const regId = resolveRegionId(item.region, mapState.activeMap);
        const reg = activeRegions.find(r => r.region_id === regId);
        const regionLabel = reg ? reg.japanese_name.replace('地域圏', '').replace('地方', '') : '';
        
        return `
          <button class="list-item-btn item-btn ${isActive ? 'active' : ''}" data-item-id="${item.id}" data-region-id="${regId}">
            <span>
              <strong>${item.name_fr}</strong> 
              <br><span style="font-size:0.75rem; color:var(--color-text-muted); font-weight:normal;">${item.name_ja}</span>
            </span>
            <span class="region-badge-small" style="font-size: 0.65rem; background: rgba(197, 168, 128, 0.15); padding: 0.15rem 0.35rem; border-radius: 3px; font-weight:600; color:var(--color-primary);">${regionLabel}</span>
          </button>
        `;
      }).join('');
    }
    
    // 5. Update detail panel
    updateDetailDrawer();
    
    // 6. Bind Event Listeners
    bindInteractiveEvents();
  }
  
  // --- Interactions Binding ---
  function bindInteractiveEvents() {
    const paths = panel.querySelectorAll('.region-path');
    
    // Hover tooltips for region paths
    paths.forEach(p => {
      p.addEventListener('mouseenter', (e) => {
        const regId = e.target.getAttribute('data-id');
        const activeRegions = mapState.activeMap === 'admin' ? adminRegions : culturalRegions;
        const reg = activeRegions.find(r => r.region_id === regId);
        
        if (reg) {
          tooltip.innerHTML = `
            <div style="font-weight:700; border-bottom:1px solid rgba(255,255,255,0.3); padding-bottom:2px; margin-bottom:2px;">
              ${reg.french_name}
            </div>
            <div style="font-size:0.7rem; opacity:0.85;">${reg.japanese_name}</div>
            <div style="font-size:0.65rem; opacity:0.7; font-style:italic;">${reg.english_name}</div>
          `;
          tooltip.style.display = 'block';
        }
      });
      
      p.addEventListener('mousemove', (e) => {
        tooltip.style.left = (e.clientX + 15) + 'px';
        tooltip.style.top = (e.clientY + 15) + 'px';
      });
      
      p.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
      });
      
      p.addEventListener('click', (e) => {
        const regId = e.target.getAttribute('data-id');
        mapState.selectedRegionId = regId;
        
        // When clicking a region, clear item selection so we display region details
        mapState.selectedItemId = null;
        
        renderMap();
      });
    });
    
    // Sidebar list buttons click
    const listBtns = panel.querySelectorAll('.list-item-btn');
    listBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.target.closest('.list-item-btn');
        if (target.classList.contains('item-btn')) {
          mapState.selectedItemId = target.getAttribute('data-item-id');
          mapState.selectedRegionId = target.getAttribute('data-region-id');
        } else {
          mapState.selectedRegionId = target.getAttribute('data-id');
          mapState.selectedItemId = null;
        }
        renderMap();
      });
    });
    
    // Pin Marker Clicks
    const pinMarkers = panel.querySelectorAll('.map-pin-marker');
    pinMarkers.forEach(pin => {
      pin.addEventListener('click', (e) => {
        const marker = e.target.closest('.map-pin-marker');
        mapState.selectedItemId = marker.getAttribute('data-item-id');
        mapState.selectedRegionId = marker.getAttribute('data-region-id');
        renderMap();
      });
    });
  }
  
  // --- Details Panel Renderer ---
  function updateDetailDrawer() {
    const drawer = panel.querySelector('#map-detail-drawer');
    const drawerTitle = panel.querySelector('#map-region-title');
    const drawerSub = panel.querySelector('#map-region-sub');
    const drawerContent = panel.querySelector('#drawer-main-content');
    
    const audioTitleBtn = panel.querySelector('#map-audio-title-btn');
    audioTitleBtn.style.display = 'none';
    
    // Case A: A specific cheese, wine, or dish item is selected
    if (mapState.selectedItemId) {
      let item = null;
      let typeLabel = '';
      let isWine = false;
      let isCheese = false;
      
      if (mapState.activeTheme === 'cheeses') {
        item = cheesesData.find(x => x.id === mapState.selectedItemId);
        typeLabel = '特産チーズ (Fromage AOP)';
        isCheese = true;
      } else if (mapState.activeTheme === 'wines') {
        item = winesData.find(x => x.id === mapState.selectedItemId);
        typeLabel = '地方ワイン (AOC Wine)';
        isWine = true;
      } else if (mapState.activeTheme === 'dishes') {
        item = dishesData.find(x => x.id === mapState.selectedItemId);
        typeLabel = '郷土料理 (Plat Régional)';
      }
      
      if (item) {
        drawerTitle.innerText = `${item.name_fr} (${item.name_ja})`;
        drawerSub.innerText = `${typeLabel} • ${item.region}`;
        
        // Build specs/properties badges HTML
        let specsHtml = '';
        if (item.properties) {
          specsHtml += `<div style="display:flex; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.5rem;">`;
          for (const [key, value] of Object.entries(item.properties)) {
            let label = key;
            if (key === 'sweetness') label = '甘み';
            else if (key === 'alcohol') label = 'アルコール';
            else if (key === 'body') label = 'ボディ';
            else if (key === 'saltiness') label = '塩気';
            else if (key === 'aroma') label = '香り';
            else if (key === 'rarity') label = '希少性';
            else if (key === 'type') label = 'タイプ';
            
            specsHtml += `
              <span style="font-size:0.75rem; background:rgba(10, 25, 49, 0.05); border:1px solid rgba(197, 168, 128, 0.25); padding:0.2rem 0.5rem; border-radius:3px; font-weight:600;">
                ${label}: <span style="color:var(--color-accent-hover);">${value}</span>
              </span>
            `;
          }
          specsHtml += `</div>`;
        }
        
        drawerContent.innerHTML = `
          ${specsHtml}
          
          ${item.classification ? `
            <div>
              <h4 style="font-size:0.75rem; text-transform:uppercase; color:var(--color-accent); font-weight:600; margin-bottom:0.2rem;">分類 (Classification)</h4>
              <p style="font-size:0.9rem; color:var(--color-text-main); font-weight:600;">${item.classification}</p>
            </div>
          ` : ''}
          
          <div>
            <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.3rem;">
              <h4 style="font-size:0.75rem; text-transform:uppercase; color:var(--color-accent); font-weight:600;">製法と科学的根拠 (Science & Method)</h4>
              <button class="audio-btn" id="map-audio-desc-btn" style="background:none; border:none; font-size:0.95rem; cursor:pointer; color:var(--color-accent);">🔊</button>
            </div>
            <p style="font-size:0.9rem; color:var(--color-text-main); line-height:1.5; text-align:justify;" id="map-desc-fr">${item.science || item.desc || ''}</p>
          </div>
          
          ${item.cooking ? `
            <div>
              <h4 style="font-size:0.75rem; text-transform:uppercase; color:var(--color-accent); font-weight:600; margin-bottom:0.2rem;">調理・料理への応用 (Culinary Use)</h4>
              <p style="font-size:0.9rem; color:var(--color-text-main); line-height:1.5;">${item.cooking}</p>
            </div>
          ` : ''}
          
          ${item.chef_note ? `
            <div style="background:rgba(197, 168, 128, 0.08); border-left:3px solid var(--border-color); padding:0.6rem 0.8rem; border-radius:0 var(--radius-sm) var(--radius-sm) 0;">
              <h4 style="font-size:0.75rem; text-transform:uppercase; color:var(--color-primary); font-weight:700; margin-bottom:0.2rem;">👨‍🍳 シェフの助言 (Chef's Note)</h4>
              <p style="font-size:0.85rem; color:var(--color-primary); font-style:italic; line-height:1.4;">${item.chef_note}</p>
            </div>
          ` : ''}
        `;
        
        // Voice buttons wiring
        audioTitleBtn.style.display = 'inline-block';
        audioTitleBtn.onclick = () => speakFrench(item.name_fr);
        
        const audioDescBtn = panel.querySelector('#map-audio-desc-btn');
        if (audioDescBtn) {
          audioDescBtn.onclick = () => speakFrench(item.science || item.desc || '');
        }
        
        drawer.style.display = 'block';
        return;
      }
    }
    
    // Case B: A Region is selected (either admin or cultural overview)
    if (mapState.selectedRegionId) {
      const activeRegions = mapState.activeMap === 'admin' ? adminRegions : culturalRegions;
      const reg = activeRegions.find(r => r.region_id === mapState.selectedRegionId);
      
      if (reg) {
        drawerTitle.innerText = `${reg.french_name} (${reg.japanese_name})`;
        drawerSub.innerText = `${reg.english_name} Region`;
        
        // Lookup explanations from legacy dataset if available, otherwise use placeholders for new ones
        let explanation = lookupRegionExplanation(reg.region_id);
        
        drawerContent.innerHTML = `
          <div>
            <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.3rem;">
              <h4 style="font-size:0.75rem; text-transform:uppercase; color:var(--color-accent); font-weight:600;">Français</h4>
              <button class="audio-btn" id="map-audio-desc-btn" style="background:none; border:none; font-size:0.95rem; cursor:pointer; color:var(--color-accent);">🔊</button>
            </div>
            <p style="font-size:0.95rem; color:var(--color-primary); font-style:italic; line-height:1.5; text-align:justify;" id="map-desc-fr">${explanation.desc_fr}</p>
          </div>
          <div>
            <h4 style="font-size:0.75rem; text-transform:uppercase; color:var(--color-accent); font-weight:600; margin-bottom:0.3rem;">English Description</h4>
            <p style="font-size:0.9rem; color:var(--color-text-main); line-height:1.5; text-align:justify;">${explanation.desc_en}</p>
          </div>
          <div>
            <h4 style="font-size:0.75rem; text-transform:uppercase; color:var(--color-accent); font-weight:600; margin-bottom:0.3rem;">日本語解説</h4>
            <p style="font-size:0.9rem; color:var(--color-text-main); line-height:1.5; text-align:justify;">${explanation.desc_ja}</p>
          </div>
          
          <!-- Relations linking (Classic dishes, cheeses, and wine badges) -->
          <div id="map-relations-container" style="border-top:1px solid rgba(197, 168, 128, 0.15); padding-top:1.2rem;">
            <h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-primary); font-weight: 700; margin-bottom: 0.5rem;">🔗 地域と食・技術のつながり (Relations)</h4>
            <div id="map-relations-content">
              ${(() => {
                const rId = reg.region_id;
                if (rId === 'reg_grand_est') {
                  const htmlAlsace = getRelationBadges('reg_alsace', 'region');
                  const htmlChampagne = getRelationBadges('reg_champagne', 'region');
                  let combined = '';
                  if (htmlAlsace) combined += `<div style="margin-bottom: 0.8rem; border-bottom: 1px dashed rgba(197,168,128,0.15); padding-bottom: 0.5rem;"><strong style="font-size: 0.75rem; color: var(--color-primary);">[アルザス地方 / Alsace]</strong>${htmlAlsace}</div>`;
                  if (htmlChampagne) combined += `<div><strong style="font-size: 0.75rem; color: var(--color-primary);">[シャンパーニュ地方 / Champagne]</strong>${htmlChampagne}</div>`;
                  return combined || '<span style="font-size:0.8rem; color:var(--color-text-muted); font-style:italic;">紐づく関連情報がありません。</span>';
                }
                
                const lookupId = rId === 'reg_occitanie' ? 'reg_languedoc' : 
                                 ((rId === 'reg_pays_de_la_loire' || rId === 'reg_loire') ? 'reg_loire' : rId);
                                 
                return getRelationBadges(lookupId, 'region') || '<span style="font-size:0.8rem; color:var(--color-text-muted); font-style:italic;">紐づく関連情報がありません。</span>';
              })()}
            </div>
          </div>
        `;
        
        audioTitleBtn.style.display = 'inline-block';
        audioTitleBtn.onclick = () => speakFrench(reg.french_name);
        
        const audioDescBtn = panel.querySelector('#map-audio-desc-btn');
        if (audioDescBtn) {
          audioDescBtn.onclick = () => speakFrench(explanation.desc_fr);
        }
        
        drawer.style.display = 'block';
        return;
      }
    }
    
    // Case C: Nothing selected
    drawer.style.display = 'none';
  }
}

// --- Helper Functions ---

// Maps generic region names in cheese/wine datasets to our region_id keys
function resolveRegionId(regionName, activeMap) {
  if (!regionName) return null;
  
  // Normalized lookup keys
  const norm = regionName.toLowerCase().trim();
  
  if (activeMap === 'admin') {
    // Current post-2016 13 Administrative Regions mapping
    if (norm.includes('normandie') || norm.includes('normandy')) return 'reg_normandie';
    if (norm.includes('bourgogne') || norm.includes('burgundy') || norm.includes('franche')) return 'reg_bourgogne';
    if (norm.includes('provence') || norm.includes('côte d') || norm.includes('paca')) return 'reg_provence';
    if (norm.includes('bretagne') || norm.includes('brittany')) return 'reg_bretagne';
    if (norm.includes('ile-de-france') || norm.includes('île-de-france') || norm.includes('paris')) return 'reg_ile_de_france';
    
    // Grand Est combines Alsace & Champagne
    if (norm.includes('alsace') || norm.includes('champagne') || norm.includes('lorraine') || norm.includes('grand est')) return 'reg_grand_est';
    
    // Pays de la Loire is distinct in admin map
    if (norm.includes('pays de la loire') || norm.includes('nantes')) return 'reg_pays_de_la_loire';
    
    // Centre-Val de Loire (reg_loire)
    if (norm.includes('centre') || norm.includes('val de loire') || norm.includes('loire valley')) return 'reg_loire';
    
    if (norm.includes('aquitaine') || norm.includes('bordeaux') || norm.includes('basque')) return 'reg_aquitaine';
    if (norm.includes('rhône') || norm.includes('alpes') || norm.includes('lyon') || norm.includes('auvergne')) return 'reg_rhone_alpes';
    if (norm.includes('languedoc') || norm.includes('occitanie') || norm.includes('roussillon')) return 'reg_occitanie';
    if (norm.includes('corse') || norm.includes('corsica')) return 'reg_corse';
    if (norm.includes('hauts-de-france') || norm.includes('nord') || norm.includes('flanders')) return 'reg_hauts_de_france';
  } else {
    // Legacy Cultural map mapping (exactly maps to cuisine_regions.js IDs)
    if (norm.includes('normandie') || norm.includes('normandy')) return 'reg_normandie';
    if (norm.includes('bourgogne') || norm.includes('burgundy')) return 'reg_bourgogne';
    if (norm.includes('provence')) return 'reg_provence';
    if (norm.includes('alsace')) return 'reg_alsace';
    if (norm.includes('bretagne') || norm.includes('brittany')) return 'reg_bretagne';
    if (norm.includes('ile-de-france') || norm.includes('île-de-france')) return 'reg_ile_de_france';
    if (norm.includes('aquitaine') || norm.includes('bordeaux') || norm.includes('basque')) return 'reg_aquitaine';
    if (norm.includes('rhône') || norm.includes('alpes') || norm.includes('lyon')) return 'reg_rhone_alpes';
    
    // In cultural map, loire represents Loire Valley/Centre-Val de Loire/Pays de la loire
    if (norm.includes('loire') || norm.includes('nantes')) return 'reg_loire';
    
    if (norm.includes('champagne')) return 'reg_champagne';
    if (norm.includes('languedoc') || norm.includes('occitanie') || norm.includes('roussillon')) return 'reg_languedoc';
    if (norm.includes('corse') || norm.includes('corsica')) return 'reg_corse';
    if (norm.includes('hauts-de-france') || norm.includes('nord') || norm.includes('flanders')) return 'reg_hauts_de_france';
  }
  return null;
}

// Fetch explanation text for regions (either from legacy JS or placeholders for new regions)
function lookupRegionExplanation(regId) {
  const legacy = legacyRegions.find(r => r.id === regId);
  if (legacy) {
    return {
      desc_fr: legacy.desc_fr,
      desc_en: legacy.desc_en,
      desc_ja: legacy.desc_ja
    };
  }
  
  // Custom placeholders/data for new admin regions
  if (regId === 'reg_pays_de_la_loire') {
    return {
      desc_fr: "Célèbre pour ses vignobles du Muscadet, ses côtes atlantiques et son sel de Guérande. Une cuisine fraîche, dominée par les poissons de mer et de rivière accompagnés de beurre blanc. Ingrédients clés : Sel de Guérande, Canard de Challans. Plats classiques : Brochet au beurre blanc, Moules de bouchot.",
      desc_en: "Famous for its Muscadet white wine, salt marshes of Guérande, and the Atlantic coast. The cuisine features fresh river and sea fish cooked with rich butter sauces. Key ingredients: Guérande sea salt, Challans duck. Signature dishes: Pike with beurre blanc, Gateau Nantais.",
      desc_ja: "フランス西部の沿岸地域で、ロワール川の下流に位置する。白ワインのミュスカデや、高級塩の「ゲランドの塩」、ブランド鴨「シャラン鴨」が名産。川魚や新鮮な海の幸をバターと白ワインのソースで仕上げる「ブール・ブラン」の発祥地。代表食材：ゲランドの塩、シャラン鴨。代表料理：川魚のブールブランソース添え、ナント風ガトー。"
    };
  }
  
  if (regId === 'reg_grand_est') {
    return {
      desc_fr: "Grande région de l'Est unifiant l'Alsace, la Champagne et la Lorraine. Réputée pour ses plats robustes de porc, son chou et le prestigieux vin de Champagne. Ingrédients clés : Chou à choucroute, Vin de Champagne, Jambon des Ardennes. Plats classiques : Choucroute garnie, Quiche Lorraine, Baeckeoffe.",
      desc_en: "A massive eastern region combining Alsace, Champagne, and Lorraine. Celebrated for hearty pork specialities, sauerkraut, and the globally prestigious Champagne sparkling wine. Key ingredients: Sauerkraut, Champagne sparkling wine, Ardennes Ham. Signature dishes: Choucroute garnie, Quiche Lorraine, Flammekueche.",
      desc_ja: "アルザス、シャンパーニュ、ロレーヌなどの旧地域圏が合併したフランス北東部の広域地域。ドイツ風のシュークルートや自家製ソーセージなどの質実剛健な肉料理から、ロレーヌ地方の伝統卵料理キッシュ、高貴なスパークリングワイン「シャンパン」まで多彩な美食を誇る。代表食材：シュークルート、シャンパン、ロレーヌ産チーズ。代表料理：シュークルート・ガルニ、キッシュ・ロレーヌ、タルト・フランベ。"
    };
  }
  
  // Map admin occtanie to legacy languedoc explanation
  if (regId === 'reg_occitanie') {
    const languedoc = legacyRegions.find(r => r.id === 'reg_languedoc');
    if (languedoc) {
      return {
        desc_fr: languedoc.desc_fr,
        desc_en: languedoc.desc_en,
        desc_ja: languedoc.desc_ja
      };
    }
  }
  
  return {
    desc_fr: "Description en cours de rédaction.",
    desc_en: "Description under development.",
    desc_ja: "解説データ作成中。"
  };
}
