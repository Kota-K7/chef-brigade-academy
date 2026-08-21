import json
with open('rpg/questions_db.json', 'r', encoding='utf-8') as f:
    db = json.load(f)

with open('scratch/scramble_list.txt', 'w', encoding='utf-8') as out:
    for q in db:
        if q.get('type') == 'scramble':
            out.write(f"{q.get('id')} words: {q.get('words')} answer: {q.get('answer')}\n")
