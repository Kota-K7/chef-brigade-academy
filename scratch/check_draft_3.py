import json
import re

# 1. Check questions_db.json tags
with open('rpg/questions_db.json', 'r', encoding='utf-8') as f:
    qdb = json.load(f)

tag_counts = {}
for q in qdb:
    for t in q.get('tags', []):
        tag_counts[t] = tag_counts.get(t, 0) + 1

tags_to_check = [
    '#futur_simple', '#imperative_with_pronouns', '#past_compose',
    '#auxiliary_selection', '#past_participle_agreement', '#comparative',
    '#superlative', '#imparfait', '#object_pronouns_direct_indirect',
    '#possessive_adjectives', '#basic_adjectives'
]

print("=== QUESTION DB TAG COUNTS ===")
for t in tags_to_check:
    print(f"  {t}: {tag_counts.get(t, 0)} questions")

# 2. Check draft_story.md structure
with open('rpg/history/draft_story.md', 'r', encoding='utf-8') as f:
    draft = f.read()

lines = draft.split('\n')
print(f"\nTotal lines in draft_story.md: {len(lines)}")
