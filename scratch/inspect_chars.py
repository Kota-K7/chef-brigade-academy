import os
import glob
import json

char_refs = {}

for jf in sorted(glob.glob('rpg/**/*.json', recursive=True) + glob.glob('data/**/*.json', recursive=True)):
    with open(jf, 'r', encoding='utf-8') as fp:
        try:
            data = json.load(fp)
        except Exception:
            continue
    if isinstance(data, dict) and 'episodes' in data:
        for ep in data['episodes']:
            ep_id = ep.get('episodeId', '')
            chars = ep.get('characters', {})
            for char_id, char_data in chars.items():
                if isinstance(char_data, dict) and 'images' in char_data:
                    for expr, img_path in char_data['images'].items():
                        if img_path:
                            char_refs.setdefault(img_path.replace('\\', '/'), []).append((jf, ep_id, char_id, expr))

print(f"Total character image paths referenced: {len(char_refs)}")
with open('scratch/char_summary.txt', 'w', encoding='utf-8') as fp:
    for p, refs in sorted(char_refs.items()):
        fp.write(f"File: {p} (Exists: {os.path.exists(p)})\n")
        fp.write(f"  Referenced {len(refs)} times:\n")
        for r in refs[:2]:
            fp.write(f"    - {r[0]} | {r[1]} | {r[2]}:{r[3]}\n")
        fp.write("\n")
