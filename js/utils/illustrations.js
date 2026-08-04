/**
 * Preposition SVG Illustration Generator for French Grammar / Vocabulary learning.
 * Contains 28 distinct vector illustrations illustrating French prepositions and position terms.
 */

export function getPrepositionIllustration(frenchWord) {
  const norm = normalizeWord(frenchWord);
  return illustrations[norm] || '';
}

function normalizeWord(word) {
  if (!word) return '';
  return word.trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/[^a-z0-9]/g, ' ') // replace punctuation (e.g. quote, hyphen) with space
    .replace(/\s+/g, ' ') // collapse double spaces
    .trim();
}

const baseSvg = (key, content, label) => `
<svg viewBox="0 0 240 140" width="100%" height="100%" style="max-width: 240px; display: block;" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow-${key}" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#e76f51" />
    </marker>
    <marker id="arrow-sub-${key}" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#1c2833" />
    </marker>
    <filter id="shadow-${key}" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="#1c2833" flood-opacity="0.15"/>
    </filter>
  </defs>
  <!-- Background -->
  <rect width="240" height="140" fill="#f8f5f0" rx="8"/>
  <!-- Illustration Content -->
  ${content}
  <!-- Concept Label -->
  <text x="120" y="125" text-anchor="middle" font-size="10" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="700" fill="#1c2833" letter-spacing="0.5px">${label}</text>
</svg>
`;

function makeCalendarSvg(activeDayIndex, label) {
  const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  let boxes = '';
  for (let i = 0; i < 7; i++) {
    const x = 24 + i * 28;
    const isActive = i === activeDayIndex;
    const bgColor = isActive ? '#e76f51' : '#ffffff';
    const textColor = isActive ? '#ffffff' : '#1c2833';
    const border = isActive ? 'stroke="#e76f51" stroke-width="2"' : 'stroke="#1c2833" stroke-width="1.5"';
    boxes += `
      <rect x="${x}" y="50" width="24" height="24" fill="${bgColor}" ${border} rx="4" />
      <text x="${x + 12}" y="66" text-anchor="middle" font-size="10" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="bold" fill="${textColor}">${days[i]}</text>
    `;
  }
  return baseSvg(`calendar_${activeDayIndex}`, `
    <!-- Calendar Header Grid -->
    <rect x="20" y="20" width="200" height="20" fill="#1c2833" rx="4" />
    <text x="120" y="33" text-anchor="middle" font-size="9" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="bold" fill="#ffffff" letter-spacing="1px">LA SEMAINE</text>
    ${boxes}
  `, label);
}

function makeTimelineSvg(activeIndex, label) {
  const terms = ['Avant-hier', 'Hier', "Aujourd'hui", 'Demain', 'Après-demain'];
  const termsJa = ['一昨日', '昨日', '今日', '明日', '明後日'];
  let nodes = '';
  const lineY = 65;
  
  for (let i = 0; i < 5; i++) {
    const x = 25 + i * 47;
    const isActive = i === activeIndex;
    const circleColor = isActive ? '#e76f51' : '#1c2833';
    const radius = isActive ? 7 : 4;
    const fontSize = isActive ? 8 : 7;
    const fontColor = isActive ? '#e76f51' : '#7f8c8d';
    const fontWeight = isActive ? 'bold' : 'normal';
    
    nodes += `
      <circle cx="${x}" cy="${lineY}" r="${radius}" fill="${circleColor}" />
      <text x="${x}" y="${lineY - 14}" text-anchor="middle" font-size="${fontSize}" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="${fontWeight}" fill="${fontColor}">${terms[i]}</text>
      <text x="${x}" y="${lineY + 16}" text-anchor="middle" font-size="7" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="${fontWeight}" fill="${fontColor}">${termsJa[i]}</text>
    `;
  }
  
  return baseSvg(`timeline_${activeIndex}`, `
    <!-- Timeline axis -->
    <line x1="20" y1="65" x2="220" y2="65" stroke="#1c2833" stroke-width="2" />
    <!-- Arrow head -->
    <path d="M 218 61 L 225 65 L 218 69 Z" fill="#1c2833" />
    ${nodes}
  `, label);
}


const illustrations = {
  sur: baseSvg('sur', `
    <!-- Board/Table surface -->
    <rect x="40" y="80" width="160" height="10" fill="#c5a880" rx="2" filter="url(#shadow-sur)"/>
    <!-- Plate sitting on surface -->
    <ellipse cx="120" cy="72" rx="40" ry="12" fill="#ffffff" stroke="#1c2833" stroke-width="2.5" filter="url(#shadow-sur)"/>
    <ellipse cx="120" cy="72" rx="25" ry="7" fill="none" stroke="#1c2833" stroke-width="1.5"/>
    <!-- Downward contact arrow -->
    <line x1="120" y1="25" x2="120" y2="52" stroke="#e76f51" stroke-width="3" marker-end="url(#arrow-sur)"/>
  `, 'ON / UPON (sur)'),

  sous: baseSvg('sous', `
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
  `, 'UNDER / BENEATH (sous)'),

  dans: baseSvg('dans', `
    <!-- Bowl body -->
    <path d="M 70 65 Q 70 105 120 105 Q 170 105 170 65" fill="#c5a880" stroke="#1c2833" stroke-width="3" filter="url(#shadow-dans)"/>
    <!-- Liquid surface inside bowl -->
    <ellipse cx="120" cy="78" rx="42" ry="12" fill="#4a90e2" stroke="#1c2833" stroke-width="1.5"/>
    <!-- Liquid being poured in -->
    <path d="M 120 20 L 120 70" stroke="#4a90e2" stroke-width="6" stroke-linecap="round" marker-end="url(#arrow-dans)"/>
  `, 'IN / INSIDE (dans)'),

  avec: baseSvg('avec', `
    <!-- Mixing Bowl -->
    <path d="M 45 60 Q 45 95 80 95 Q 115 95 115 60 Z" fill="#2a9d8f" stroke="#1c2833" stroke-width="2.5" filter="url(#shadow-avec)"/>
    <!-- Plus symbol -->
    <text x="135" y="78" text-anchor="middle" font-size="24" font-weight="bold" fill="#e76f51">+</text>
    <!-- Whisk -->
    <path d="M 165 85 L 195 55" stroke="#1c2833" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="158" cy="92" rx="15" ry="8" transform="rotate(-45 158 92)" fill="none" stroke="#1c2833" stroke-width="1.5"/>
    <ellipse cx="158" cy="92" rx="18" ry="12" transform="rotate(-45 158 92)" fill="none" stroke="#1c2833" stroke-width="1.2"/>
  `, 'WITH / USING (avec)'),

  sans: baseSvg('sans', `
    <!-- Mixing Bowl -->
    <path d="M 45 60 Q 45 95 80 95 Q 115 95 115 60 Z" fill="#2a9d8f" stroke="#1c2833" stroke-width="2.5" filter="url(#shadow-sans)"/>
    <path d="M 50 60 C 55 50, 75 50, 80 60 C 85 50, 105 50, 110 60 Z" fill="#2a9d8f" opacity="0.7"/>
    <!-- Excluded Ingredient (Onion) -->
    <circle cx="165" cy="70" r="16" fill="#c5a880" stroke="#1c2833" stroke-width="2"/>
    <path d="M 165 86 L 165 91 M 161 85 L 159 89 M 169 85 L 171 89" stroke="#1c2833" stroke-width="1.5"/>
    <!-- Prohibition sign -->
    <circle cx="165" cy="70" r="21" fill="none" stroke="#e63946" stroke-width="3"/>
    <line x1="150" y1="55" x2="180" y2="85" stroke="#e63946" stroke-width="3"/>
  `, 'WITHOUT (sans)'),

  pour: baseSvg('pour', `
    <!-- Chef's knife pointing at target -->
    <path d="M 45 65 L 105 65 L 105 52 C 85 52, 60 58, 45 65 Z" fill="#4a90e2" stroke="#1c2833" stroke-width="2"/>
    <rect x="105" y="54" width="25" height="7" fill="#1c2833" rx="1"/>
    <!-- Target Circle -->
    <circle cx="175" cy="65" r="20" fill="none" stroke="#e76f51" stroke-width="5"/>
    <circle cx="175" cy="65" r="8" fill="#e76f51"/>
    <!-- Action/Intention Arrow -->
    <path d="M 90 82 Q 130 82 165 72" fill="none" stroke="#e76f51" stroke-width="3" stroke-dasharray="3,3" marker-end="url(#arrow-pour)"/>
  `, 'FOR / PURPOSE (pour)'),

  par: baseSvg('par', `
    <!-- Dotted filter plane/mesh -->
    <line x1="120" y1="20" x2="120" y2="100" stroke="#1c2833" stroke-width="4" stroke-dasharray="6,6"/>
    <!-- Arrow passing through -->
    <line x1="50" y1="60" x2="105" y2="60" stroke="#e76f51" stroke-width="4" stroke-dasharray="2,2"/>
    <line x1="105" y1="60" x2="180" y2="60" stroke="#e76f51" stroke-width="4" marker-end="url(#arrow-par)"/>
  `, 'BY / THROUGH / VIA (par)'),

  en: baseSvg('en', `
    <!-- Potato (Whole) -->
    <ellipse cx="60" cy="60" rx="22" ry="16" fill="#c5a880" stroke="#1c2833" stroke-width="2"/>
    <!-- Transform Arrow -->
    <line x1="98" y1="60" x2="135" y2="60" stroke="#e76f51" stroke-width="3" marker-end="url(#arrow-en)"/>
    <!-- Potato Cubes (Diced) -->
    <rect x="155" y="44" width="14" height="14" fill="#c5a880" stroke="#1c2833" stroke-width="1.5"/>
    <rect x="175" y="52" width="14" height="14" fill="#c5a880" stroke="#1c2833" stroke-width="1.5"/>
    <rect x="160" y="66" width="14" height="14" fill="#c5a880" stroke="#1c2833" stroke-width="1.5"/>
  `, 'INTO SHAPE / STATE (en)'),

  a: baseSvg('a', `
    <!-- Thermometer scale & target -->
    <rect x="95" y="20" width="14" height="75" fill="#ffffff" stroke="#1c2833" stroke-width="2" rx="7"/>
    <circle cx="102" cy="92" r="14" fill="#e63946" stroke="#1c2833" stroke-width="2"/>
    <rect x="100" y="50" width="4" height="42" fill="#e63946"/>
    <!-- 180°C Indicator -->
    <line x1="109" y1="42" x2="122" y2="42" stroke="#1c2833" stroke-width="2"/>
    <text x="128" y="46" font-size="10" font-weight="bold" fill="#e76f51">180°C</text>
    <!-- Arrow pointing to temperature -->
    <line x1="60" y1="42" x2="88" y2="42" stroke="#e76f51" stroke-width="3" marker-end="url(#arrow-a)"/>
  `, 'AT / TO / TEMPERATURE (à)'),

  de: baseSvg('de', `
    <!-- Lemon Sliced & Squeezed -->
    <path d="M 70 50 Q 110 25 140 55 Q 110 80 70 50" fill="#c5a880" stroke="#1c2833" stroke-width="2"/>
    <path d="M 80 52 Q 105 42 118 53 Q 100 62 80 52 Z" fill="#ffffff" opacity="0.6"/>
    <!-- Falling Drop -->
    <path d="M 120 78 C 120 78, 115 87, 115 91 C 115 95, 125 95, 125 91 C 125 87, 120 78, 120 78 Z" fill="#e76f51" stroke="#1c2833" stroke-width="1.5" filter="url(#shadow-de)"/>
    <!-- Squeeze motion arrows -->
    <path d="M 105 15 Q 120 25 120 35" fill="none" stroke="#e76f51" stroke-width="2" marker-end="url(#arrow-de)"/>
  `, 'FROM / EXTRACT (de)'),

  devant: baseSvg('devant', `
    <!-- Guest silhouette in background -->
    <path d="M 80 55 C 80 30, 160 30, 160 55 C 160 65, 150 75, 150 75 L 170 95 L 70 95 Z" fill="#c5a880" opacity="0.25"/>
    <!-- Plate in foreground -->
    <ellipse cx="120" cy="85" rx="55" ry="18" fill="#ffffff" stroke="#1c2833" stroke-width="3" filter="url(#shadow-devant)"/>
    <ellipse cx="120" cy="85" rx="35" ry="11" fill="none" stroke="#1c2833" stroke-width="1.5"/>
    <circle cx="120" cy="83" r="10" fill="#e76f51"/>
    <!-- Placement Arrow -->
    <line x1="120" y1="45" x2="120" y2="58" stroke="#e76f51" stroke-width="3" marker-end="url(#arrow-devant)"/>
  `, 'IN FRONT OF (devant)'),

  derriere: baseSvg('derriere', `
    <!-- Bottle behind the counter -->
    <rect x="100" y="25" width="40" height="60" fill="#4a90e2" stroke="#1c2833" stroke-width="2" rx="4"/>
    <rect x="112" y="10" width="16" height="15" fill="#4a90e2" stroke="#1c2833" stroke-width="2" rx="2"/>
    <!-- Counter hiding bottom of bottle -->
    <rect x="30" y="70" width="180" height="40" fill="#c5a880" stroke="#1c2833" stroke-width="3" filter="url(#shadow-derriere)"/>
    <!-- Arrow pointing to behind -->
    <path d="M 70 85 Q 85 50 96 50" fill="none" stroke="#e76f51" stroke-width="3" marker-end="url(#arrow-derriere)"/>
  `, 'BEHIND (derrière)'),

  chez: baseSvg('chez', `
    <!-- Storefront Facade -->
    <rect x="50" y="55" width="140" height="50" fill="#ffffff" stroke="#1c2833" stroke-width="2"/>
    <rect x="110" y="70" width="25" height="35" fill="#1c2833"/>
    <rect x="65" y="70" width="30" height="20" fill="#4a90e2" opacity="0.5" stroke="#1c2833" stroke-width="1.5"/>
    <!-- Canopy/Awning -->
    <path d="M 45 35 L 195 35 L 185 55 L 55 55 Z" fill="#e76f51" stroke="#1c2833" stroke-width="2" filter="url(#shadow-chez)"/>
    <path d="M 75 35 L 80 55 M 105 35 L 110 55 M 135 35 L 140 55 M 165 35 L 170 55" stroke="#ffffff" stroke-width="3"/>
    <text x="120" y="28" text-anchor="middle" font-size="9" font-weight="bold" fill="#1c2833">BOULANGERIE</text>
  `, 'AT THE SHOP / PLACE OF (chez)'),

  entre: baseSvg('entre', `
    <!-- Top Sheet -->
    <path d="M 45 48 L 195 48 L 185 58 L 35 58 Z" fill="#c5a880" opacity="0.6"/>
    <!-- Dough (Sandwiched) -->
    <rect x="60" y="60" width="120" height="16" fill="#e76f51" rx="4" filter="url(#shadow-entre)"/>
    <!-- Bottom Sheet -->
    <path d="M 45 80 L 195 80 L 185 90 L 35 90 Z" fill="#c5a880" opacity="0.6"/>
    <!-- Inward Arrows -->
    <line x1="30" y1="68" x2="52" y2="68" stroke="#1c2833" stroke-width="2.5" marker-end="url(#arrow-sub-entre)"/>
    <line x1="210" y1="68" x2="188" y2="68" stroke="#1c2833" stroke-width="2.5" marker-end="url(#arrow-sub-entre)"/>
  `, 'BETWEEN (entre)'),

  vers: baseSvg('vers', `
    <!-- Bowl -->
    <path d="M 100 60 Q 100 95 135 95 Q 170 95 170 60 Z" fill="#4a90e2" stroke="#1c2833" stroke-width="2" filter="url(#shadow-vers)"/>
    <circle cx="135" cy="75" r="5" fill="#e76f51"/>
    <!-- Direction arrow pointing inside -->
    <path d="M 40 45 Q 80 45 118 68" fill="none" stroke="#e76f51" stroke-width="3" marker-end="url(#arrow-vers)"/>
  `, 'TOWARDS (vers)'),

  contre: baseSvg('contre', `
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
  `, 'AGAINST / PRESSED (contre)'),

  depuis: baseSvg('depuis', `
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
  `, 'SINCE / CONTINUING (depuis)'),

  pendant: baseSvg('pendant', `
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
  `, 'FOR A DURATION (pendant)'),

  selon: baseSvg('selon', `
    <!-- Slider -->
    <rect x="40" y="65" width="160" height="8" fill="#1c2833" rx="4"/>
    <circle cx="120" cy="69" r="12" fill="#e76f51" stroke="#ffffff" stroke-width="2" filter="url(#shadow-selon)"/>
    <text x="40" y="50" font-size="10" fill="#2a9d8f" font-weight="bold">Doux (Mild)</text>
    <text x="200" y="50" text-anchor="end" font-size="10" fill="#e63946" font-weight="bold">Épicé (Spicy)</text>
    <path d="M 95 69 L 85 69" stroke="#ffffff" stroke-width="2" marker-end="url(#arrow-sub-selon)"/>
    <path d="M 145 69 L 155 69" stroke="#ffffff" stroke-width="2" marker-end="url(#arrow-sub-selon)"/>
  `, 'ACCORDING TO / DEPENDING ON (selon)'),

  a_cote_de: baseSvg('a_cote_de', `
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
  `, 'NEXT TO / BESIDE (à côté de)'),

  en_face_de: baseSvg('en_face_de', `
    <!-- Station 1 (left) -->
    <rect x="30" y="45" width="45" height="45" fill="#c5a880" rx="2" filter="url(#shadow-en_face_de)"/>
    <path d="M 40 55 Q 40 68 52 68 Q 65 68 65 55 Z" fill="#2a9d8f"/>
    <!-- Station 2 (right) -->
    <rect x="165" y="45" width="45" height="45" fill="#1c2833" rx="2" filter="url(#shadow-en_face_de)"/>
    <circle cx="187" cy="55" r="10" fill="none" stroke="#e63946" stroke-width="2"/>
    <!-- Opposite Arrows -->
    <line x1="85" y1="68" x2="115" y2="68" stroke="#e76f51" stroke-width="3" marker-end="url(#arrow-en_face_de)"/>
    <line x1="155" y1="68" x2="125" y2="68" stroke="#e76f51" stroke-width="3" marker-end="url(#arrow-en_face_de)"/>
  `, 'FACING / OPPOSITE (en face de)'),

  au_dessus_de: baseSvg('au_dessus_de', `
    <!-- Bowl at bottom -->
    <path d="M 80 75 Q 80 105 120 105 Q 160 105 160 75 Z" fill="#2a9d8f" stroke="#1c2833" stroke-width="2" filter="url(#shadow-au_dessus_de)"/>
    <!-- Colander hovering above -->
    <path d="M 90 40 Q 90 60 120 60 Q 150 60 150 40 Z" fill="#ffffff" stroke="#1c2833" stroke-width="2" filter="url(#shadow-au_dessus_de)"/>
    <line x1="150" y1="45" x2="175" y2="45" stroke="#1c2833" stroke-width="4" stroke-linecap="round"/>
    <!-- Vertical space/distance indicator -->
    <line x1="120" y1="63" x2="120" y2="72" stroke="#e76f51" stroke-width="2" marker-end="url(#arrow-au_dessus_de)"/>
    <line x1="120" y1="72" x2="120" y2="63" stroke="#e76f51" stroke-width="2" marker-end="url(#arrow-au_dessus_de)"/>
  `, 'ABOVE / OVER (au-dessus de)'),

  au_dessous_de: baseSvg('au_dessous_de', `
    <!-- Limit line -->
    <line x1="40" y1="50" x2="200" y2="50" stroke="#e63946" stroke-width="2" stroke-dasharray="4,4"/>
    <text x="145" y="44" font-size="9" fill="#e63946" font-weight="bold">3°C Limit</text>
    <!-- Bar below the limit -->
    <rect x="60" y="65" width="120" height="25" fill="#4a90e2" rx="3" filter="url(#shadow-au_dessous_de)"/>
    <text x="120" y="81" text-anchor="middle" font-size="10" fill="#ffffff" font-weight="bold">1.5°C</text>
    <!-- Downward Arrow -->
    <line x1="120" y1="52" x2="120" y2="61" stroke="#e76f51" stroke-width="3" marker-end="url(#arrow-au_dessous_de)"/>
  `, 'BELOW / UNDER (au-dessous de)'),

  autour_de: baseSvg('autour_de', `
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
  `, 'AROUND (autour de)'),

  au_milieu_de: baseSvg('au_milieu_de', `
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
  `, 'IN THE MIDDLE OF (au milieu de)'),

  pres_de: baseSvg('pres_de', `
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
  `, 'NEAR / CLOSE TO (près de)'),

  loin_de: baseSvg('loin_de', `
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
  `, 'FAR FROM (loin de)'),

  jusqu_a: baseSvg('jusqu_a', `
    <!-- Thermometer -->
    <rect x="105" y="20" width="14" height="80" fill="#ffffff" stroke="#1c2833" stroke-width="2" rx="7"/>
    <circle cx="112" cy="100" r="15" fill="#e63946" stroke="#1c2833" stroke-width="2"/>
    <rect x="110" y="32" width="4" height="68" fill="#e63946"/>
    <!-- Limit Line -->
    <line x1="92" y1="32" x2="128" y2="32" stroke="#e63946" stroke-width="2"/>
    <text x="133" y="36" font-size="9" fill="#e63946" font-weight="bold">110°C MAX</text>
    <!-- Rise Arrow -->
    <path d="M 85 85 L 85 36" fill="none" stroke="#e76f51" stroke-width="2.5" marker-end="url(#arrow-jusqu_a)"/>
  `, "UNTIL / UP TO LIMIT (jusqu'à)"),

  matin: baseSvg('matin', `
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
  `, 'MORNING (le matin)'),

  midi: baseSvg('midi', `
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
  `, 'NOON (midi)'),

  'apres midi': baseSvg('apres_midi', `
    <!-- Sun slightly tilted to the right -->
    <circle cx="155" cy="50" r="14" fill="#e76f51" stroke="#1c2833" stroke-width="2"/>
    <line x1="155" y1="30" x2="155" y2="22" stroke="#e76f51" stroke-width="1.5"/>
    <line x1="135" y1="50" x2="127" y2="50" stroke="#e76f51" stroke-width="1.5"/>
    <!-- Landscape/Ground -->
    <line x1="30" y1="90" x2="210" y2="90" stroke="#1c2833" stroke-width="2"/>
    <!-- chef hat in daylight -->
    <path d="M 70 90 L 70 70 C 70 62, 80 58, 85 62 C 90 58, 100 62, 100 70 L 100 90 Z" fill="#ffffff" stroke="#1c2833" stroke-width="1.5"/>
  `, 'AFTERNOON (l\'après-midi)'),

  soir: baseSvg('soir', `
    <!-- Horizon line -->
    <line x1="30" y1="85" x2="210" y2="85" stroke="#1c2833" stroke-width="2"/>
    <!-- Sun setting -->
    <path d="M 100 85 A 20 20 0 0 1 140 85 Z" fill="#e76f51" opacity="0.6"/>
    <!-- Evening stars -->
    <path d="M 50 35 L 52 40 L 57 41 L 53 44 L 54 49 L 50 46 L 46 49 L 47 44 L 43 41 L 48 40 Z" fill="#f4a261" transform="scale(0.8) translate(10, 10)"/>
  `, 'EVENING (le soir)'),

  nuit: baseSvg('nuit', `
    <!-- Crescent Moon -->
    <path d="M 100 35 A 30 30 0 1 0 145 80 A 24 24 0 1 1 100 35" fill="#f4a261" stroke="#1c2833" stroke-width="2" filter="url(#shadow-nuit)"/>
    <!-- Sparkly Stars -->
    <circle cx="60" cy="45" r="2" fill="#ffffff"/>
    <circle cx="75" cy="75" r="1.5" fill="#ffffff"/>
    <circle cx="165" cy="40" r="2" fill="#ffffff"/>
  `, 'NIGHT (la nuit)')
};

// Mappings for variants/aliases to guarantee lookup hits
illustrations['a'] = illustrations['a'];
illustrations['à'] = illustrations['a'];
illustrations['contre'] = illustrations['contre'];
illustrations['derriere'] = illustrations['derriere'];
illustrations['derrière'] = illustrations['derriere'];
illustrations['a cote de'] = illustrations['a_cote_de'];
illustrations['a coté de'] = illustrations['a_cote_de'];
illustrations['à côté de'] = illustrations['a_cote_de'];
illustrations['en face de'] = illustrations['en_face_de'];
illustrations['au dessus de'] = illustrations['au_dessus_de'];
illustrations['au-dessus de'] = illustrations['au_dessus_de'];
illustrations['au dessous de'] = illustrations['au_dessous_de'];
illustrations['au-dessous de'] = illustrations['au_dessous_de'];
illustrations['autour de'] = illustrations['autour_de'];
illustrations['au milieu de'] = illustrations['au_milieu_de'];
illustrations['pres de'] = illustrations['pres_de'];
illustrations['près de'] = illustrations['pres_de'];
illustrations['loin de'] = illustrations['loin_de'];
illustrations['jusqu a'] = illustrations['jusqu_a'];
illustrations['jusqu à'] = illustrations['jusqu_a'];
illustrations["jusqu'a"] = illustrations['jusqu_a'];
illustrations["jusqu'à"] = illustrations['jusqu_a'];

// Calendar dynamic mappings
illustrations['lundi'] = makeCalendarSvg(0, 'MONDAY (lundi)');
illustrations['mardi'] = makeCalendarSvg(1, 'TUESDAY (mardi)');
illustrations['mercredi'] = makeCalendarSvg(2, 'WEDNESDAY (mercredi)');
illustrations['jeudi'] = makeCalendarSvg(3, 'THURSDAY (jeudi)');
illustrations['vendredi'] = makeCalendarSvg(4, 'FRIDAY (vendredi)');
illustrations['samedi'] = makeCalendarSvg(5, 'SATURDAY (samedi)');
illustrations['dimanche'] = makeCalendarSvg(6, 'SUNDAY (dimanche)');

// Timeline dynamic mappings
illustrations['avant hier'] = makeTimelineSvg(0, 'DAY BEFORE YESTERDAY (avant-hier)');
illustrations['hier'] = makeTimelineSvg(1, 'YESTERDAY (hier)');
illustrations['aujourd hui'] = makeTimelineSvg(2, "TODAY (aujourd'hui)");
illustrations['demain'] = makeTimelineSvg(3, 'TOMORROW (demain)');
illustrations['apres demain'] = makeTimelineSvg(4, 'DAY AFTER TOMORROW (après-demain)');

// Additional time mappings
illustrations['l apres midi'] = illustrations['apres midi'];
