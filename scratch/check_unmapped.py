import os
import glob
import sys
import verify_bg_mapping

all_story_files = []
for root, dirs, files in os.walk('assets/story'):
    for f in files:
        full = os.path.join(root, f).replace('\\', '/')
        all_story_files.append(full)

mapped = set(verify_bg_mapping.mapping.keys())
unmapped = [f for f in all_story_files if f not in mapped]

lines = []
lines.append(f"Total files in assets/story: {len(all_story_files)}")
lines.append(f"Mapped as backgrounds: {len(mapped)}")
lines.append(f"Remaining files: {len(unmapped)}\n")

by_dir = {}
for u in unmapped:
    d = os.path.dirname(u)
    by_dir.setdefault(d, []).append(os.path.basename(u))

for d, files in sorted(by_dir.items()):
    lines.append(f"Directory: {d} ({len(files)} files)")
    for f in sorted(files):
        lines.append(f"  - {f}")
    lines.append("")

with open('scratch/unmapped_utf8.txt', 'w', encoding='utf-8') as fp:
    fp.write('\n'.join(lines))

print("Saved scratch/unmapped_utf8.txt successfully.")
