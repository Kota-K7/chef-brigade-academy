import os
import glob
import json
import re

json_files = glob.glob('rpg/**/*.json', recursive=True) + glob.glob('data/**/*.json', recursive=True)

all_bg_refs = []
broken_bg_refs = []
char_refs = []
broken_char_refs = []

for jf in sorted(json_files):
    with open(jf, 'r', encoding='utf-8') as fp:
        try:
            data = json.load(fp)
        except Exception as e:
            print(f"JSON Parse Error in {jf}: {e}")
            continue
    
    if isinstance(data, dict) and 'episodes' in data:
        for ep in data['episodes']:
            ep_id = ep.get('episodeId', '')
            
            # Check backgrounds
            bgs = ep.get('backgrounds', {})
            for k, v in bgs.items():
                if isinstance(v, str) and 'url(' in v:
                    m = re.search(r'assets/[^\'\"\\)]+', v)
                    if m:
                        path = m.group(0).replace('\\', '/')
                        exists = os.path.exists(path)
                        all_bg_refs.append((jf, ep_id, k, path, exists))
                        if not exists:
                            broken_bg_refs.append((jf, ep_id, k, path))
            
            # Check characters
            chars = ep.get('characters', {})
            for cid, cdef in chars.items():
                if isinstance(cdef, dict) and 'images' in cdef:
                    for expr, cpath in cdef['images'].items():
                        if cpath:
                            cpath_norm = cpath.replace('\\', '/')
                            exists = os.path.exists(cpath_norm)
                            char_refs.append((jf, ep_id, cid, expr, cpath_norm, exists))
                            if not exists:
                                broken_char_refs.append((jf, ep_id, cid, expr, cpath_norm))

print(f"Total Background References: {len(all_bg_refs)}")
print(f"Broken Background References: {len(broken_bg_refs)}")
if broken_bg_refs:
    for b in broken_bg_refs:
        print(f"  BROKEN BG: {b}")

print(f"\nTotal Character References: {len(char_refs)}")
print(f"Broken Character References: {len(broken_char_refs)}")
if broken_char_refs:
    for c in broken_char_refs:
        print(f"  BROKEN CHAR: {c}")
