import io, sys, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

for ch in ['chapter_1.json', 'chapter_2.json']:
    with open(f'rpg/history/{ch}', 'r', encoding='utf-8') as f:
        data = json.load(f)
    print(f"\n==================== {ch} ====================")
    for ep in data.get('episodes', []):
        ep_id = ep.get('episodeId')
        seq = ep.get('sequence', [])
        for i, step in enumerate(seq):
            if step.get('type') == 'tutorial':
                next_battle = seq[i+1] if i+1 < len(seq) and seq[i+1].get('type') == 'fixedBattle' else None
                b_name = next_battle.get('enemyName') if next_battle else 'None'
                b_crits = next_battle.get('criteria', []) if next_battle else []
                print(f"\n[{ep_id}] Step {i} -> Battle: '{b_name}' (criteria: {b_crits})")
                print(f"  Title: {step.get('title')}")
                print(f"  Goal: {step.get('goal')}")
                pages = step.get('pages', [])
                for p_idx, page in enumerate(pages):
                    print(f"    Page {p_idx+1}: {page}")
