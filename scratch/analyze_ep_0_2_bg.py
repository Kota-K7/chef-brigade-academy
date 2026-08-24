import json

d = json.load(open('rpg/history/chapter_0.json', encoding='utf-8'))
ep = d['episodes'][1] # ep_0_2
with open('scratch/ep_0_2_details.txt', 'w', encoding='utf-8') as f:
    f.write("BACKGROUNDS CONFIG:\n")
    for k, v in ep['backgrounds'].items():
        f.write(f"  {k} -> {v}\n")
    f.write("\nSEQUENCE BG USAGES:\n")
    for i, s in enumerate(ep['sequence']):
        bg = s.get("background")
        f.write(f"  Step {i}: type={s.get('type')}, bg={bg}\n")
