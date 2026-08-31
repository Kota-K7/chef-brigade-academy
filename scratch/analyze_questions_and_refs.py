import os
import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

workspace_dir = os.path.abspath(r"C:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy")

# 1. Load questions_db.json
db_path = os.path.join(workspace_dir, "rpg", "questions_db.json")
with open(db_path, "r", encoding="utf-8") as f:
    questions = json.load(f)

# 2. Load grammar_reference.json
ref_path = os.path.join(workspace_dir, "data", "grammar_reference.json")
with open(ref_path, "r", encoding="utf-8") as f:
    ref_data = json.load(f)

print("--- 1. ANALYSIS OF NEGATION QUESTIONS ---")
negation_questions = [q for q in questions if any("negation" in t.lower() for t in q.get("tags", []))]
print(f"Total negation questions found: {len(negation_questions)}")

negation_patterns = {
    "ne...pas": [],
    "ne...plus": [],
    "ne...jamais": [],
    "ne...rien": [],
    "ne...personne": [],
    "ne...que": [],
    "other/de": []
}

for q in negation_questions:
    ans = str(q.get("answer", ""))
    text = str(q.get("text", ""))
    combined = (text + " " + ans).lower()
    
    matched = False
    for pat in ["pas", "plus", "jamais", "rien", "personne", "que"]:
        # simple regex to check negation patterns
        if pat in combined:
            negation_patterns[f"ne...{pat}"].append(q.get("id"))
            matched = True
            break
    if not matched:
        negation_patterns["other/de"].append(q.get("id"))

for pat, qids in negation_patterns.items():
    print(f"  - Pattern '{pat}': {len(qids)} questions (Sample IDs: {qids[:5]})")


print("\n--- 2. ANALYSIS OF NON-PRESENT TENSE / AUXILIARY TAGS ---")
# Let's collect all tags from questions to see what exists
all_tags = set()
for q in questions:
    all_tags.update(q.get("tags", []))

print("All tags found in database:")
sorted_tags = sorted(list(all_tags))
for tag in sorted_tags:
    # Filter for tense or verb related tags
    if any(k in tagwd for k in ["future", "past", "tense", "verb", "participle", "subjunctive", "conditional"] for tagwd in [tag.lower()]):
        # count how many questions have this tag
        count = sum(1 for q in questions if tag in q.get("tags", []))
        print(f"  - Tag `{tag}`: {count} questions")


print("\n--- 3. ANALYSIS OF GREETINGS & ADJECTIVES VOCABULARY ---")
# Greetings vocab from questions
greetings_questions = [q for q in questions if any("greetings" in t.lower() for t in q.get("tags", []))]
print(f"Total greetings questions: {len(greetings_questions)}")

# Collect words from answers
greetings_vocab_q = set()
for q in greetings_questions:
    ans = q.get("answer", "")
    if isinstance(ans, str):
        # Extract French words (words starting with letter, ignoring punctuation)
        words = re.findall(r"\b[a-zA-ZÀ-ÿ\'-]+\b", ans)
        greetings_vocab_q.update(words)

# Load existing greetings vocab from grammar_reference
ref_greetings = next(item for item in ref_data if item["id"] == "ref_greetings")
existing_greetings_vocab = set()
for sec in ref_greetings.get("sections", []):
    for row in sec.get("rows", []):
        for cell in row[:1]: # usually first column is french expression
            words = re.findall(r"\b[a-zA-ZÀ-ÿ\'-]+\b", cell)
            existing_greetings_vocab.update(words)

missing_greetings = sorted([w for w in greetings_vocab_q if w.lower() not in [x.lower() for x in existing_greetings_vocab]])
print(f"Greetings words in questions but missing from reference table (Sample): {missing_greetings[:30]}")

# Adjectives vocab from questions
adj_tags = [t for t in sorted_tags if "adjective" in t or "nationality" in t]
print(f"Adjective related tags: {adj_tags}")
adj_questions = [q for q in questions if any(t in q.get("tags", []) for t in adj_tags)]
print(f"Total adjective questions: {len(adj_questions)}")

adj_vocab_q = set()
for q in adj_questions:
    ans = q.get("answer", "")
    if isinstance(ans, str):
        words = re.findall(r"\b[a-zA-ZÀ-ÿ\'-]+\b", ans)
        adj_vocab_q.update(words)

# Load existing adjectives from reference
ref_adj = next((item for item in ref_data if item["id"] == "ref_adjective_agreement"), None)
existing_adj_vocab = set()
if ref_adj:
    for sec in ref_adj.get("sections", []):
        for row in sec.get("rows", []):
            for cell in row[:1]:
                words = re.findall(r"\b[a-zA-ZÀ-ÿ\'-]+\b", cell)
                existing_adj_vocab.update(words)

missing_adj = sorted([w for w in adj_vocab_q if w.lower() not in [x.lower() for x in existing_adj_vocab]])
print(f"Adjective words in questions but missing from reference table (Sample): {missing_adj[:30]}")
