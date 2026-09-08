import json
import os
import sys
sys.stdout.reconfigure(encoding='utf-8')

workspace = r"C:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"

with open(os.path.join(workspace, "rpg", "questions_db.json"), "r", encoding="utf-8") as f:
    questions = json.load(f)

comp_super_questions = [q for q in questions if any(t in ['#comparative', '#superlative'] for t in q.get('tags', []))]

print(f"Total comparative/superlative questions: {len(comp_super_questions)}")
for q in comp_super_questions:
    print(f"\nID: {q.get('id')}")
    print(f"Tags: {q.get('tags')}")
    print(f"Text: {q.get('text')}")
    print(f"Choices: {q.get('choices')}")
    print(f"Answer: {q.get('answer')}")
    print(f"Explanation: {q.get('explanation')}")

