import os
import glob
import json
import re

bg_references = {} # path -> list of (json_file, episode_id, key)

for jf in glob.glob('rpg/**/*.json', recursive=True) + glob.glob('data/**/*.json', recursive=True):
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
                        bg_references.setdefault(path, []).append((jf, ep_id, k))

print(f"Total unique background image paths referenced in JSONs: {len(bg_references)}")
for path, refs in sorted(bg_references.items()):
    exists = os.path.exists(path)
    print(f"\nPath: {path} (Exists: {exists}, Referenced {len(refs)} times)")
    for jf, ep_id, k in refs[:3]:
        print(f"  - [{jf}] ep: {ep_id}, key: {k}")
    if len(refs) > 3:
        print(f"  ... and {len(refs)-3} more")
