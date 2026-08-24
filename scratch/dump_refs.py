import json

d = json.load(open('data/grammar_reference.json', encoding='utf-8'))
with open('scratch/refs_list.txt', 'w', encoding='utf-8') as f:
    for x in d:
        f.write(f"{x.get('id')} : {x.get('title_ja')}\n")
