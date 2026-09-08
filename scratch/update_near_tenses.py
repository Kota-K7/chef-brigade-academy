import json
import re
import os
import sys
sys.stdout.reconfigure(encoding='utf-8')

workspace = r"C:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"
qdb_path = os.path.join(workspace, "rpg", "questions_db.json")

with open(qdb_path, "r", encoding="utf-8") as f:
    questions = json.load(f)

for q in questions:
    qid = q.get("id", "")
    text = q.get("text", "")
    
    # Clean any leftover katakana phonetic note
    text = text.replace("（モンテし）", "")
    
    # Near future blanks: aller
    if qid in ["q_nf_add_01", "q_nf_add_02", "q_nf_add_04", "q_nf_add_06", "q_nf_add_08"]:
        lemma = "aller"
        if f"({lemma})" not in text and f"[{lemma}]" not in text:
            m = re.search(r'(\s*\([^\(\)]*[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]+[^\(\)]*\)\s*)$', text)
            if m:
                jp_part = m.group(1)
                base_part = text[:m.start(1)].rstrip()
                text = f"{base_part} ({lemma}) {jp_part.strip()}"
            else:
                text = f"{text} ({lemma})"
    
    # Near past blanks: venir
    if qid in ["q_np_add_01", "q_np_add_02", "q_np_add_04", "q_np_add_06", "q_np_add_08"]:
        lemma = "venir"
        if f"({lemma})" not in text and f"[{lemma}]" not in text:
            m = re.search(r'(\s*\([^\(\)]*[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]+[^\(\)]*\)\s*)$', text)
            if m:
                jp_part = m.group(1)
                base_part = text[:m.start(1)].rstrip()
                text = f"{base_part} ({lemma}) {jp_part.strip()}"
            else:
                text = f"{text} ({lemma})"

    q["text"] = text

with open(qdb_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, ensure_ascii=False, indent=2)

print("Applied near future/past lemmas and cleaned monté.")
