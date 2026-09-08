import json
import re
import os
import sys
sys.stdout.reconfigure(encoding='utf-8')

workspace = r"C:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"

with open(os.path.join(workspace, "rpg", "questions_db.json"), "r", encoding="utf-8") as f:
    questions = json.load(f)

# Common verb lemma mapping helper
# If we have choices or answer, determine the base verb or adjective lemma
# Let's inspect all target questions and map their lemmas!

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

report = []
for q in questions:
    tags = q.get("tags", [])
    if any(t in target_tags for t in tags):
        report.append(q)

print(f"Total target questions: {len(report)}")
# Dump detailed list to file for inspection
with open(os.path.join(workspace, "scratch", "target_questions_detail.json"), "w", encoding="utf-8") as f:
    json.dump(report, f, ensure_ascii=False, indent=2)

print("Saved scratch/target_questions_detail.json")
