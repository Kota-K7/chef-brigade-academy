import json

# Update chapter_1.json
with open('rpg/history/chapter_1.json', 'r', encoding='utf-8') as f:
    ch1 = json.load(f)

for ep in ch1['episodes']:
    v = ep.get('characters', {}).get('vercingetorix', {})
    if 'images' in v and 'surrender' in v['images']:
        v['images']['surrender'] = 'assets/story/backgrounds/alesia_surrender.webp'

with open('rpg/history/chapter_1.json', 'w', encoding='utf-8') as f:
    json.dump(ch1, f, ensure_ascii=False, indent=2)

# Update chapter_2.json
with open('rpg/history/chapter_2.json', 'r', encoding='utf-8') as f:
    ch2 = json.load(f)

for ep in ch2['episodes']:
    cm = ep.get('characters', {}).get('charles_martel', {})
    if cm and 'images' in cm:
        for k in cm['images']:
            cm['images'][k] = 'assets/story/backgrounds/charlemagne_battlefield.webp'

with open('rpg/history/chapter_2.json', 'w', encoding='utf-8') as f:
    json.dump(ch2, f, ensure_ascii=False, indent=2)

print("Updated character references in chapter_1.json and chapter_2.json")
