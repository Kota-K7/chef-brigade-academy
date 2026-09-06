import json

with open('rpg/history/chapter_3.json', 'r', encoding='utf-8') as f:
    ch3 = json.load(f)

lines = []
lines.append(f"Chapter Title: {ch3['chapterTitle']}")
lines.append(f"Episodes count: {len(ch3['episodes'])}\n")

for ep in ch3['episodes']:
    lines.append(f"--- Episode: {ep['episodeId']} | {ep['episodeTitle']} ---")
    lines.append(f"Backgrounds: {list(ep['backgrounds'].keys())}")
    lines.append(f"Characters: {list(ep['characters'].keys())}")
    
    dialog_cnt = 0
    battle_cnt = 0
    lp_cnt = 0
    
    for s in ep['sequence']:
        if s['type'] == 'dialog':
            dialog_cnt += 1
            if 'learningPoint' in s:
                lp_cnt += 1
        elif s['type'] == 'battle':
            battle_cnt += 1
            lines.append(f"  [Battle]: Enemy: '{s['enemy']['name']}', Criteria: {s['criteria']}")
            
    lines.append(f"  Sequence summary: {len(ep['sequence'])} steps (Dialogs: {dialog_cnt}, Battles: {battle_cnt}, LearningPoints: {lp_cnt})\n")

with open('scratch/ch3_inspect_out.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))

print("Wrote scratch/ch3_inspect_out.txt successfully.")
