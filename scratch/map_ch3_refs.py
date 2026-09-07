import io, sys, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('rpg/history/chapter_3.json', 'r', encoding='utf-8') as f:
    ch3 = json.load(f)

with open('data/grammar_reference.json', 'r', encoding='utf-8') as f:
    refs = json.load(f)

print("=== GRAMMAR REFERENCE TOPICS & SECTIONS ===")
for r in refs:
    print(f"\n[{r['id']}] {r['title_ja']} ({r.get('title_fr')})")
    for s_idx, sec in enumerate(r.get('sections', [])):
        print(f"    Sec {s_idx}: {sec.get('title')}")

print("\n=== CHAPTER 3 BATTLES & CRITERIA ===")
for ep in ch3.get('episodes', []):
    ep_id = ep.get('episodeId')
    print(f"\n--- Episode {ep_id}: {ep.get('episodeTitle')} ---")
    for s_idx, step in enumerate(ep.get('sequence', [])):
        if step.get('type') == 'fixedBattle':
            enemy = step.get('enemyName')
            crits = step.get('criteria', [])
            print(f"  Step {s_idx}: Enemy='{enemy}', criteria={crits}")
