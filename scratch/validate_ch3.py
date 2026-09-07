import io, sys, json, os
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('rpg/history/chapter_3.json', 'r', encoding='utf-8') as f:
    ch3 = json.load(f)

with open('rpg/questions_db.json', 'r', encoding='utf-8') as f:
    qdb = json.load(f)

for ep_idx, ep in enumerate(ch3.get('episodes', [])):
    ep_id = ep.get('episodeId')
    print(f"\n======================================")
    print(f"Episode {ep_idx+1}: {ep_id} - {ep.get('episodeTitle')} (Total steps: {len(ep.get('sequence', []))})")
    
    # Check steps
    for s_idx, step in enumerate(ep.get('sequence', [])):
        stype = step.get('type')
        if stype in ['battle', 'fixedBattle']:
            enemy_name = step.get('enemyName')
            hp = step.get('enemyHp')
            damage = step.get('enemyDamage')
            crits = step.get('criteria', [])
            print(f"  [{s_idx:02d}] fixedBattle: enemy='{enemy_name}' (hp={hp}, dmg={damage}, crits={crits})")
        elif stype == 'tutorial':
            pages = step.get('pages', [])
            page_titles = [p.get('title') for p in pages]
            print(f"  [{s_idx:02d}] tutorial: {step.get('title')} -> pages={page_titles}")
        elif stype == 'reward':
            print(f"  [{s_idx:02d}] reward: xp={step.get('xp')}, next={step.get('unlockedEpisodeId')}")
