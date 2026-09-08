import json
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('data/grammar_reference.json', 'r', encoding='utf-8') as f:
    refs = json.load(f)

print(f"Total references: {len(refs)}")
for r in refs:
    print(f"{r.get('id')}: {r.get('title_ja')} ({r.get('title_fr')})")
