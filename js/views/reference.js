import { speakFrench } from '../utils/audio.js';

export function renderReference() {
  const container = document.createElement('div');
  container.className = 'reference-container-view';
  
  const title = document.createElement('h2');
  title.className = 'section-title';
  title.innerText = "Référence Grammaticale (Grammar Reference)";
  container.appendChild(title);
  
  const subtitle = document.createElement('p');
  subtitle.className = 'section-subtitle';
  subtitle.innerText = "Explore structured conjugations, classifications, and auxiliary usage patterns in culinary French.";
  container.appendChild(subtitle);
  
  const loading = document.createElement('div');
  loading.className = 'loading-placeholder';
  loading.innerText = "Chargement des références... (Loading references...)";
  container.appendChild(loading);
  
  // Load data
  fetch('data/grammar_reference.json')
    .then(res => {
      if (!res.ok) throw new Error("Could not load reference data");
      return res.json();
    })
    .then(data => {
      loading.remove();
      renderReferenceLayout(container, data);
    })
    .catch(err => {
      loading.innerText = "Erreur lors du chargement des données. (Error loading reference data.)";
      console.error(err);
    });
  
  return container;
}

function renderReferenceLayout(container, referenceData) {
  // Main layout wrapper
  const layout = document.createElement('div');
  layout.className = 'ref-layout';
  
  // Left menu (Sidebar)
  const sidebar = document.createElement('div');
  sidebar.className = 'ref-sidebar';
  
  // Content panel
  const contentPanel = document.createElement('div');
  contentPanel.className = 'ref-content-panel';
  
  // Populate sidebar menu
  referenceData.forEach((topic, index) => {
    const btn = document.createElement('button');
    btn.className = `ref-menu-btn ${index === 0 ? 'active' : ''}`;
    btn.innerHTML = `
      <span class="ref-menu-num">${index + 1}</span>
      <div class="ref-menu-txt">
        <span class="ref-menu-ja">${topic.title_ja}</span>
        <span class="ref-menu-fr">${topic.title_fr}</span>
      </div>
    `;
    
    btn.addEventListener('click', () => {
      document.querySelectorAll('.ref-menu-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      showTopicDetails(contentPanel, topic);
      
      // Auto scroll to content panel on mobile
      if (window.innerWidth <= 768) {
        contentPanel.scrollIntoView({ behavior: 'smooth' });
      }
    });
    
    sidebar.appendChild(btn);
  });
  
  layout.appendChild(sidebar);
  layout.appendChild(contentPanel);
  container.appendChild(layout);
  
  // Show first topic initially
  if (referenceData.length > 0) {
    showTopicDetails(contentPanel, referenceData[0]);
  }
}

function showTopicDetails(panel, topic) {
  panel.innerHTML = '';
  panel.style.animation = 'fadeIn 0.3s ease';
  
  // Topic Header
  const header = document.createElement('div');
  header.className = 'ref-topic-header';
  header.innerHTML = `
    <h3 class="ref-topic-title">${topic.title_fr}</h3>
    <div class="ref-topic-subtitle">
      <span>${topic.title_en}</span> &bull; <span>${topic.title_ja}</span>
    </div>
  `;
  panel.appendChild(header);
  
  // Definition Box
  const defBox = document.createElement('div');
  defBox.className = 'ref-definition-box';
  defBox.innerHTML = `
    <p class="ref-def-fr"><strong>Définition :</strong> ${topic.definition_fr}</p>
    <p class="ref-def-ja"><strong>定義 :</strong> ${topic.definition_ja}</p>
  `;
  panel.appendChild(defBox);
  
  // Sections (Tables / Info Boxes / Examples)
  topic.sections.forEach(sec => {
    const secContainer = document.createElement('div');
    secContainer.className = 'ref-section-container';
    
    if (sec.type === 'table') {
      const title = document.createElement('h4');
      title.className = 'ref-sec-title';
      title.innerText = sec.title;
      secContainer.appendChild(title);
      
      const tableWrapper = document.createElement('div');
      tableWrapper.className = 'ref-table-wrapper';
      
      const table = document.createElement('table');
      table.className = 'ref-table';
      
      // Headers
      const trHead = document.createElement('tr');
      sec.headers.forEach(h => {
        const th = document.createElement('th');
        th.innerText = h;
        trHead.appendChild(th);
      });
      table.appendChild(trHead);
      
      // Rows
      sec.rows.forEach(r => {
        const trRow = document.createElement('tr');
        r.forEach((cell, idx) => {
          const td = document.createElement('td');
          td.innerText = cell;
          
          // Add sound to conjugations or verbs in tables!
          if (idx === 1 && (sec.title.includes('Conjugaison') || sec.title.includes('Présent') || sec.title.includes('Exemple'))) {
            // Include audio button inline for nice UX
            td.style.position = 'relative';
            td.innerHTML = `
              <span style="margin-right: 1.5rem;">${cell}</span>
              <button class="ref-table-audio-btn" data-speak="${cell.split('(')[0].trim()}" title="Listen pronunciation">🔊</button>
            `;
          }
          
          trRow.appendChild(td);
        });
        table.appendChild(trRow);
      });
      
      tableWrapper.appendChild(table);
      secContainer.appendChild(tableWrapper);
      
      // Optional single example attached to table
      if (sec.example) {
        const exBox = document.createElement('div');
        exBox.className = 'ref-table-attached-ex';
        exBox.innerHTML = `
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div class="ref-ex-fr">➔ ${sec.example.fr}</div>
            <button class="audio-btn" data-speak="${sec.example.fr}">🔊</button>
          </div>
          <div class="ref-ex-ja">${sec.example.ja}</div>
        `;
        secContainer.appendChild(exBox);
      }
      
    } else if (sec.type === 'examples') {
      const title = document.createElement('h4');
      title.className = 'ref-sec-title';
      title.innerText = sec.title;
      secContainer.appendChild(title);
      
      const list = document.createElement('div');
      list.className = 'ref-examples-list';
      
      sec.examples.forEach(ex => {
        const item = document.createElement('div');
        item.className = 'ref-example-item';
        item.innerHTML = `
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem;">
            <span class="ref-ex-fr">➔ ${ex.fr}</span>
            <button class="audio-btn" data-speak="${ex.fr}">🔊</button>
          </div>
          <div class="ref-ex-ja">${ex.ja}</div>
        `;
        list.appendChild(item);
      });
      
      secContainer.appendChild(list);
      
    } else if (sec.type === 'info') {
      const infoBox = document.createElement('div');
      infoBox.className = 'ref-info-box';
      infoBox.innerHTML = `
        <h4 class="ref-info-title">💡 ${sec.title}</h4>
        <p class="ref-info-fr">${sec.content_fr}</p>
        <p class="ref-info-ja">${sec.content_ja}</p>
      `;
      secContainer.appendChild(infoBox);
    }
    
    panel.appendChild(secContainer);
  });
  
  // Attach event listeners for audio speech
  panel.querySelectorAll('.audio-btn, .ref-table-audio-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const speakText = btn.getAttribute('data-speak');
      speakFrench(speakText);
      
      // Micro animation
      btn.style.transform = 'scale(1.2)';
      setTimeout(() => btn.style.transform = 'none', 150);
    });
  });
}
