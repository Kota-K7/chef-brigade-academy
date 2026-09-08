import json
import re
import os
import sys
sys.stdout.reconfigure(encoding='utf-8')

workspace = r"C:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"
qdb_path = os.path.join(workspace, "rpg", "questions_db.json")

with open(qdb_path, "r", encoding="utf-8") as f:
    questions = json.load(f)

additional_lemma_map = {
    "q_sub_15": "être",
    "q_obli_05": "fermer",
    "q_obli_06": "donner",
    "q_obli_07": "avoir",
    "q_obli_08": "mener",
    "q_obli_09": "apporter",
    "q_obli_10": "être",
    "q_obli_11": "dire",
    "q_obli_12": "remuer",
    "q_ivspc_11": "être",
    "q_ivspc_12": "parler",
    "q_ivspc_13": "libérer",
    "q_ivspc_14": "devenir",
    "q_ivspc_15": "être",
    "q_pv_add_03": "se vendre",
    "q_pv_add_05": "se trouver",
    "q_pv_add_07": "se prononcer",
    "q_pv_add_09": "s'acheter",
    "q_fut_14": "être",
    "q_fut_15": "faire",
    "q_sub_14": "pouvoir"
}

for q in questions:
    qid = q.get("id", "")
    text = q.get("text", "")
    
    if qid in additional_lemma_map:
        lemma = additional_lemma_map[qid]
        if f"({lemma})" not in text and f"[{lemma}]" not in text and f"'{lemma}'" not in text:
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

print("Applied additional lemmas successfully.")
