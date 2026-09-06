import os
import glob
import json
import hashlib
import re

def get_hash(path):
    if not os.path.exists(path):
        return "MISSING"
    with open(path, 'rb') as f:
        return hashlib.md5(f.read()).hexdigest()

referenced_bgs = {}
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
                        referenced_bgs.setdefault(path, []).append((jf, ep_id, k, v))

# Also check chapter_3 images
ch3_files = glob.glob('assets/story/chapter_3/*')
for c in ch3_files:
    p = c.replace('\\', '/')
    if p not in referenced_bgs:
        referenced_bgs.setdefault(p, []).append(('assets/story/chapter_3', 'ch3_unused', 'preview', ''))

lines = []
lines.append(f"Total BG files: {len(referenced_bgs)}\n")

by_hash = {}
for path in referenced_bgs:
    h = get_hash(path)
    by_hash.setdefault(h, []).append(path)

lines.append("=== HASH DUPLICATION (Identical Images) ===")
for h, paths in by_hash.items():
    if len(paths) > 1:
        lines.append(f"Hash {h[:8]}:")
        for p in paths:
            lines.append(f"  - {p}")
lines.append("")

by_filename = {}
for path in referenced_bgs:
    fn = os.path.basename(path)
    by_filename.setdefault(fn, []).append(path)

lines.append("=== SAME FILENAME DIFFERENT CONTENT (Collisions) ===")
for fn, paths in by_filename.items():
    if len(paths) > 1:
        hashes = [get_hash(p)[:8] for p in paths]
        lines.append(f"Filename '{fn}':")
        for p, h in zip(paths, hashes):
            lines.append(f"  - {p} (hash: {h})")
lines.append("")

with open('scratch/bg_analysis_result.txt', 'w', encoding='utf-8') as fp:
    fp.write('\n'.join(lines))

print("Saved to scratch/bg_analysis_result.txt")
