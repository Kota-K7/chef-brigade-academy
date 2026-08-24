import json

d = json.load(open('rpg/story/chapter_career_0.json', encoding='utf-8'))
ep = [e for e in d['episodes'] if e['episodeId'] == 'career_ep_0_2'][0]
with open('scratch/career_0_2_steps.txt', 'w', encoding='utf-8') as f:
    for i, s in enumerate(ep['sequence']):
        char = s.get("character")
        text = s.get("text")
        chars = s.get("characters")
        f.write(f"{i}: char={char}, text={text}, characters={chars}\n")
