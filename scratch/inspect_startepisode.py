with open('js/views/story.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'async function startEpisode' in line:
        start = i
        break

print(''.join(lines[start:start+70]))
