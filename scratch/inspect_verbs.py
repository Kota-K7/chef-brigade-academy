import json

verb_tags = {'#etre', '#avoir', '#verbs', '#irregular_verbs_major', '#past_compose', '#imparfait', '#gerund_participle', '#causative_faire', '#subjunctive_basic', '#futur_simple', '#conditional_present', '#irregular_verbs_1'}

with open('rpg/questions_db.json', 'r', encoding='utf-8') as f:
    db = json.load(f)

with open('scratch/verbs_list.txt', 'w', encoding='utf-8') as out:
    for q in db:
        q_tags = set(q.get('tags', []))
        if q_tags.intersection(verb_tags):
            out.write(f"{q.get('id')} tags={q.get('tags')} text: {q.get('text')}\n")
