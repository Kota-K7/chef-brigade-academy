import json

with open('rpg/history/chapter_1.json', 'r', encoding='utf-8') as f:
    ch1 = json.load(f)

for ep in ch1['episodes']:
    v = ep.get('characters', {}).get('vercingetorix', {})
    if 'surrender' in v.get('images', {}):
        print(f"ch1 {ep['episodeId']} vercingetorix.surrender -> {v['images']['surrender']}")

with open('rpg/history/chapter_2.json', 'r', encoding='utf-8') as f:
    ch2 = json.load(f)

for ep in ch2['episodes']:
    cm = ep.get('characters', {}).get('charles_martel', {})
    if cm:
        print(f"ch2 {ep['episodeId']} charles_martel -> {cm.get('images')}")
