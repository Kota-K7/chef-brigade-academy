import re

with open('rpg/history/draft_story.md', 'r', encoding='utf-8') as f:
    lines = f.readlines()

out = []
for idx, line in enumerate(lines, start=1):
    stripped = line.strip()
    if idx in [30, 31, 35, 37, 38, 40, 44, 89, 90, 137, 150, 155, 195, 196]:
        out.append(f"Line {idx}: {stripped}")

with open('scratch/line_checks.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(out))

print("Wrote scratch/line_checks.txt")
