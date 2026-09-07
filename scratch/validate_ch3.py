import json, os

with open('rpg/history/chapter_3.json', 'r', encoding='utf-8') as f:
    ch3 = json.load(f)

with open('rpg/questions_db.json', 'r', encoding='utf-8') as f:
    qdb = json.load(f)

all_tags = set()
for q in qdb:
    for t in q.get('tags', []):
        all_tags.add(t)

print(f"Loaded questions_db.json: {len(qdb)} questions, {len(all_tags)} unique tags.")

for ep_idx, ep in enumerate(ch3.get('episodes', [])):
    ep_id = ep.get('episodeId')
    print(f"\n======================================")
    print(f"Episode {ep_idx+1}: {ep_id} - {ep.get('episodeTitle')}")
    print(f"Backgrounds: {list(ep.get('backgrounds', {}).keys())}")
    print(f"Characters: {list(ep.get('characters', {}).keys())}")
    
    # Check background asset paths
    for bg_key, bg_val in ep.get('backgrounds', {}).items():
        if 'url(' in bg_val:
            path = bg_val.replace("url('", "").replace("')", "").replace('url("', '').replace('")', '')
            exists = os.path.exists(path)
            if not exists:
                print(f"  [WARN] BG file not found: {bg_key} -> {path}")
                
    # Check character asset paths
    for char_key, char_data in ep.get('characters', {}).items():
        for expr, img_path in char_data.get('images', {}).items():
            exists = os.path.exists(img_path)
            if not exists:
                print(f"  [WARN] Character img not found: {char_key}.{expr} -> {img_path}")

    # Check steps
    for s_idx, step in enumerate(ep.get('sequence', [])):
        stype = step.get('type')
        if stype in ['battle', 'fixedBattle']:
            enemy_name = step.get('enemyName') or (step.get('enemy', {}).get('name'))
            hp = step.get('enemyHp') or (step.get('enemy', {}).get('hp'))
            damage = step.get('enemyDamage') or (step.get('enemy', {}).get('damage'))
            crits = step.get('criteria', [])
            print(f"  Step [{s_idx}] type={stype}, enemy={enemy_name}, hp={hp}, dmg={damage}, crits={crits}")
            for c in crits:
                tag = c.get('tag')
                if tag not in all_tags:
                    print(f"    [WARN] Tag '{tag}' NOT found in questions_db.json!")
                else:
                    matching_q_count = len([q for q in qdb if tag in q.get('tags', [])])
                    print(f"    Tag '{tag}' matches {matching_q_count} questions.")
        elif stype == 'tutorial':
            print(f"  Step [{s_idx}] type=tutorial title={step.get('title')}")
        elif stype == 'reward':
            print(f"  Step [{s_idx}] type=reward xp={step.get('xp')} next={step.get('unlockedEpisodeId')}")
