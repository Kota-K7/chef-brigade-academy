import json
import os
import glob
import sys
sys.stdout.reconfigure(encoding='utf-8')

workspace = r"C:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"

with open(os.path.join(workspace, "data", "quizzes.json"), "r", encoding="utf-8") as f:
    quizzes = json.load(f)

print(f"Total in quizzes.json: {len(quizzes) if isinstance(quizzes, list) else len(quizzes.keys())}")

for p in glob.glob(os.path.join(workspace, "data", "knowledge_*.json")):
    with open(p, "r", encoding="utf-8") as f:
        kd = json.load(f)
    print(f"{os.path.basename(p)}: {len(kd)} items")

