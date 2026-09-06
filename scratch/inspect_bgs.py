import os
import glob
import json
import re
import hashlib

def get_hash(path):
    if not os.path.exists(path):
        return "MISSING"
    with open(path, 'rb') as f:
        return hashlib.md5(f.read()).hexdigest()

results = []

# Scan RPG JSON files
for jf in sorted(glob.glob('rpg/**/*.json', recursive=True) + glob.glob('data/**/*.json', recursive=True)):
    with open(jf, 'r', encoding='utf-8') as fp:
        try:
            data = json.load(fp)
        except Exception:
            continue
    if isinstance(data, dict) and 'episodes' in data:
        for ep in data['episodes']:
            ep_id = ep.get('episodeId', '')
            bgs = ep.get('backgrounds', {})
            for k, v in bgs.items():
                if isinstance(v, str) and 'assets/' in v:
                    m = re.search(r'assets/[^\'\"\\)]+', v)
                    if m:
                        path = m.group(0).replace('\\', '/')
                        h = get_hash(path)
                        results.append({
                            'json_file': jf,
                            'episode_id': ep_id,
                            'key': k,
                            'raw_val': v,
                            'path': path,
                            'hash': h,
                            'exists': os.path.exists(path)
                        })

# Group by path and hash
by_path = {}
for r in results:
    by_path.setdefault(r['path'], []).append(r)

out_text = []
out_text.append(f"TOTAL REFERENCED BG PATHS: {len(by_path)}\n")

for p, refs in sorted(by_path.items()):
    h = refs[0]['hash']
    sz = os.path.getsize(p) if os.path.exists(p) else 0
    basename = os.path.basename(p)
    out_text.append(f"File: {p} (Size: {sz} bytes, Hash: {h[:8]})")
    out_text.append(f"  Referenced {len(refs)} times in:")
    for ref in refs:
        out_text.append(f"    - {ref['json_file']} | {ref['episode_id']} | key: {ref['key']}")
    out_text.append("")

with open('scratch/bg_summary.txt', 'w', encoding='utf-8') as fp:
    fp.write('\n'.join(out_text))

print("Wrote scratch/bg_summary.txt successfully.")
