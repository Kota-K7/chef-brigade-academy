const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'db.json');
const outputDir = path.join(__dirname, '..', 'data');

try {
  const rawData = fs.readFileSync(dbPath, 'utf8');
  const db = JSON.parse(rawData);

  // 1. Split vocabulary by level
  const vocabByLevel = {};
  db.vocabulary.forEach(item => {
    const lvl = item.level || 'ALL';
    if (!vocabByLevel[lvl]) vocabByLevel[lvl] = [];
    vocabByLevel[lvl].push(item);
  });

  for (const [lvl, items] of Object.entries(vocabByLevel)) {
    fs.writeFileSync(
      path.join(outputDir, `vocabulary_${lvl}.json`),
      JSON.stringify(items, null, 2),
      'utf8'
    );
    console.log(`Saved vocabulary_${lvl}.json (${items.length} items)`);
  }

  // 2. Split grammar by level
  const grammarByLevel = {};
  db.grammar.forEach(item => {
    const lvl = item.level || 'ALL';
    if (!grammarByLevel[lvl]) grammarByLevel[lvl] = [];
    grammarByLevel[lvl].push(item);
  });

  for (const [lvl, items] of Object.entries(grammarByLevel)) {
    fs.writeFileSync(
      path.join(outputDir, `grammar_${lvl}.json`),
      JSON.stringify(items, null, 2),
      'utf8'
    );
    console.log(`Saved grammar_${lvl}.json (${items.length} items)`);
  }

  // 3. Split cuisine by level
  const cuisineByLevel = {};
  db.cuisine.forEach(item => {
    const lvl = item.level || 'ALL';
    if (!cuisineByLevel[lvl]) cuisineByLevel[lvl] = [];
    cuisineByLevel[lvl].push(item);
  });

  for (const [lvl, items] of Object.entries(cuisineByLevel)) {
    fs.writeFileSync(
      path.join(outputDir, `cuisine_${lvl}.json`),
      JSON.stringify(items, null, 2),
      'utf8'
    );
    console.log(`Saved cuisine_${lvl}.json (${items.length} items)`);
  }

  // 4. Save quizzes
  fs.writeFileSync(
    path.join(outputDir, 'quizzes.json'),
    JSON.stringify(db.quizzes, null, 2),
    'utf8'
  );
  console.log(`Saved quizzes.json (${db.quizzes.length} items)`);

  // 5. Generate meta.json
  // Pick one random vocabulary item as featured
  const featured = db.vocabulary[Math.floor(Math.random() * db.vocabulary.length)] || null;
  const meta = {
    counts: {
      vocabulary: db.vocabulary.length,
      grammar: db.grammar.length,
      cuisine: db.cuisine.length
    },
    featured: featured
  };

  fs.writeFileSync(
    path.join(outputDir, 'meta.json'),
    JSON.stringify(meta, null, 2),
    'utf8'
  );
  console.log(`Saved meta.json`);

} catch (err) {
  console.error('Error processing db.json:', err);
  process.exit(1);
}
