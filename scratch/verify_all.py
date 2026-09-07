import json
import os
import re

print("=== 1. Validating JSON files ===")
json_files = [
    'rpg/history/chapter_0.json',
    'rpg/history/chapter_1.json',
    'rpg/history/chapter_2.json',
    'rpg/history/chapter_3.json',
    'rpg/backgrounds.json',
    'rpg/questions_db.json'
]

data = {}
for jf in json_files:
    try:
        with open(jf, 'r', encoding='utf-8') as f:
            data[jf] = json.load(f)
        print(f"  [OK] {jf}")
    except Exception as e:
        print(f"  [ERROR] {jf}: {e}")

print("\n=== 2. Validating Chapter 3 Episodes & Assets ===")
ch3 = data.get('rpg/history/chapter_3.json', {})
qdb = data.get('rpg/questions_db.json', [])
bgs = data.get('rpg/backgrounds.json', {})

# Build tag set from questions_db
qdb_tags = set()
for q in qdb:
    for t in q.get('tags', []):
        qdb_tags.add(t)

print(f"Total episodes in Chapter 3: {len(ch3.get('episodes', []))}")

missing_assets = []
missing_tags = []

for ep in ch3.get('episodes', []):
    ep_id = ep['episodeId']
    print(f"\nChecking episode: {ep_id} ({ep.get('episodeTitle')})")
    
    # Check episode backgrounds
    for bg_key, bg_url in ep.get('backgrounds', {}).items():
        if bg_url.startswith('url('):
            path = bg_url.replace("url('", "").replace("')", "").replace('url("', '').replace('")', '')
            if not os.path.exists(path):
                missing_assets.append((ep_id, 'background', path))
                print(f"  [MISSING BG FILE] {path}")
            else:
                print(f"  [OK BG] {bg_key} -> {path}")
    
    # Check episode characters
    for char_id, char_data in ep.get('characters', {}).items():
        if 'images' in char_data:
            for expr, img_path in char_data['images'].items():
                if not os.path.exists(img_path):
                    missing_assets.append((ep_id, f'char:{char_id}:{expr}', img_path))
                    print(f"  [MISSING CHAR FILE] {img_path}")
                else:
                    print(f"  [OK CHAR] {char_id}:{expr} -> {img_path}")

    # Check sequence
    step_count = len(ep.get('sequence', []))
    battle_count = 0
    dialog_count = 0
    for idx, step in enumerate(ep.get('sequence', [])):
        stype = step.get('type')
        if stype == 'dialog':
            dialog_count += 1
        elif stype == 'battle':
            battle_count += 1
            enemy = step.get('enemy', {})
            criteria = step.get('criteria', [])
            total_criteria_count = sum(c.get('count', 0) for c in criteria)
            print(f"  [BATTLE {battle_count}] '{enemy.get('name')}' HP={enemy.get('hp')}, Criteria Total={total_criteria_count}")
            for c in criteria:
                tag = c.get('tag')
                if tag not in qdb_tags:
                    missing_tags.append((ep_id, tag))
                    print(f"    [MISSING TAG IN DB] {tag}")
                else:
                    # Count available questions with this tag
                    avail = len([q for q in qdb if tag in q.get('tags', [])])
                    print(f"    [OK TAG] {tag} (needed: {c.get('count')}, available in DB: {avail})")
    
    print(f"  Summary: {step_count} steps ({dialog_count} dialogs, {battle_count} battles)")

print("\n=== 3. Validating Backgrounds in backgrounds.json ===")
missing_bg_files = 0
for bg_id, bg_info in bgs.items():
    file_path = f"assets/story/backgrounds/{bg_info.get('file')}"
    if not os.path.exists(file_path):
        print(f"  [MISSING] {bg_id}: {file_path}")
        missing_bg_files += 1

if missing_bg_files == 0:
    print(f"  [ALL OK] All {len(bgs)} background files exist!")

print("\n=== SUMMARY ===")
print(f"Missing assets: {len(missing_assets)}")
print(f"Missing tags: {len(missing_tags)}")
if len(missing_assets) == 0 and len(missing_tags) == 0 and missing_bg_files == 0:
    print("ALL VALIDATION CHECKS PASSED PERFECTLY!")
else:
    print("WARNING: Some validation issues were found!")
