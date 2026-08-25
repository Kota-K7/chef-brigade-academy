import json
import os

db_path = r"c:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy\rpg\questions_db.json"
if os.path.exists(db_path):
    with open(db_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    tags = set()
    for q in data:
        for t in q.get("tags", []):
            tags.add(t)
    print("Unique tags in database:")
    for t in sorted(list(tags)):
        print(t)
else:
    print("File not found:", db_path)
