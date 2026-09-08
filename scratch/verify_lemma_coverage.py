import json
import os
import re
import sys
sys.stdout.reconfigure(encoding='utf-8')

workspace = r"C:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"

with open(os.path.join(workspace, "rpg", "questions_db.json"), "r", encoding="utf-8") as f:
    questions = json.load(f)

target_tags = set([
    '#present_indicative', '#indicative_present', '#verbs', '#verb_groups',
    '#past_compose', '#imparfait', '#imparfait_vs_past_compose',
    '#futur_simple', '#future_tenses', '#near_future', '#near_past',
    '#subjunctive', '#subjunctive_basic',
    '#conditional', '#conditional_present',
    '#imperative', '#imperative_with_pronouns',
    '#passive', '#passive_voice',
    '#pronominal_verbs', '#passive_pronominal_verbs',
    '#basic_adjectives', '#adjective_agreement', '#comparative', '#superlative',
    '#past_participle_agreement', '#auxiliary_selection', '#gerund_participle',
    '#si_clauses_present', '#si_clauses_imparfait', '#causative_faire'
])

matched = []
has_lemma = []
missing_lemma = []

for q in questions:
    tags = q.get("tags", [])
    if any(t in target_tags for t in tags):
        matched.append(q)
        text = q.get("text", "")
        # check if text contains base form in parenthesis or brackets
        # e.g., (manger), [manger], (manger - tu), 'manger'
        if re.search(r'[\(\[][a-zA-ZàâäéèêëîïôöùûüçœæÀÂÄÉÈÊËÎÏÔÖÙÛÜÇŒÆ\'-]+[\)\]]', text) or re.search(r'\([a-zA-ZàâäéèêëîïôöùûüçœæÀÂÄÉÈÊËÎÏÔÖÙÛÜÇŒÆ\'-]+\s*-\s*[a-zA-Z]+\)', text):
            has_lemma.append(q)
        else:
            missing_lemma.append(q)

print(f"Total conjugation/adjective questions: {len(matched)}")
print(f"Has lemma/base: {len(has_lemma)} ({len(has_lemma)/len(matched)*100:.1f}%)")
print(f"Missing lemma/base: {len(missing_lemma)}")

if missing_lemma:
    print("\n--- Missing Lemma List ---")
    for q in missing_lemma:
        print(f"ID: {q['id']}, Tags: {q.get('tags')}")
        print(f"  Text: {q['text']}")
        print(f"  Ans: {q.get('answer')}")

