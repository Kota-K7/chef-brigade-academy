import json

with open('js/views/story.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'data-chapter="3"' in line or 'data-chapter=\'3\'' in line or 'ep_3_' in line:
        print(f"Line {i+1}: {line.strip()}")
