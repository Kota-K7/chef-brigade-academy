import json
import os
import sys
import re
sys.stdout.reconfigure(encoding='utf-8')

workspace = r"C:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"

with open(os.path.join(workspace, "rpg", "questions_db.json"), "r", encoding="utf-8") as f:
    questions = json.load(f)

print(f"Total questions in questions_db.json: {len(questions)}")

# Let's inspect all questions with conjugation or adjective tags
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
for q in questions:
    tags = q.get("tags", [])
    if any(t in target_tags for t in tags):
        matched.append(q)

print(f"Questions matching target tags: {len(matched)}")

# Check how many have infinitive / base form indicated
with_lemma = 0
without_lemma = 0
for q in matched:
    text = q.get("text", "")
    # Check if contains patterns like "(manger)", "[manger]", "動詞 [manger]", "(bon)", etc.
    if re.search(r'\[[a-zA-ZàâäéèêëîïôöùûüçœæÀÂÄÉÈÊËÎÏÔÖÙÛÜÇŒÆ\'-]+\]', text) or re.search(r'\([a-zA-ZàâäéèêëîïôöùûüçœæÀÂÄÉÈÊËÎÏÔÖÙÛÜÇŒÆ\'-]+\s*-\s*[a-zA-Z]+\)', text):
        with_lemma += 1
    else:
        without_lemma += 1

print(f"With lemma/base: {with_lemma}, Without lemma/base: {without_lemma}")

