import json
import os
import sys
sys.stdout.reconfigure(encoding='utf-8')

workspace = r"C:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"

with open(os.path.join(workspace, "rpg", "questions_db.json"), "r", encoding="utf-8") as f:
    questions = json.load(f)

print(f"Total questions in questions_db.json: {len(questions)}")

# Tag distribution
tag_counts = {}
for q in questions:
    tags = q.get("tags", [])
    for t in tags:
        tag_counts[t] = tag_counts.get(t, 0) + 1

# Look for verb and adjective conjugation tags
target_tags = [
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
]

print("\n--- Target Tag Counts ---")
for t in target_tags:
    if t in tag_counts:
        print(f"{t}: {tag_counts[t]}")

# Sample questions from these tags to see current format
sample_per_tag = {}
for q in questions:
    tags = q.get("tags", [])
    for t in target_tags:
        if t in tags:
            if t not in sample_per_tag:
                sample_per_tag[t] = []
            if len(sample_per_tag[t]) < 2:
                sample_per_tag[t].append((q.get("id"), q.get("text"), q.get("choices"), q.get("answer"), q.get("explanation")))

print("\n--- Sample Questions ---")
for t, samples in sample_per_tag.items():
    print(f"\nTag: {t}")
    for qid, text, choices, ans, exp in samples:
        print(f"  [{qid}] Text: {text}")
        print(f"        Answer: {ans}")
