import json
import os

downloads_file = r"C:\Users\kotya\Downloads\newly_added_words.json"
workspace_dir = r"c:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"

if not os.path.exists(downloads_file):
    print("Downloaded file not found.")
    exit(1)

with open(downloads_file, 'r', encoding='utf-8') as f:
    downloaded_words = json.load(f)

downloaded_ids = {w["id"] for w in downloaded_words if "id" in w}
print(f"Downloaded unique IDs: {len(downloaded_ids)}")

existing_ids = set()
levels = ["A1", "A2", "B1", "B2", "C1", "C2"]
for lvl in levels:
    p = os.path.join(workspace_dir, "data", f"knowledge_{lvl}.json")
    if os.path.exists(p):
        with open(p, 'r', encoding='utf-8') as f:
            words = json.load(f)
            for w in words:
                existing_ids.add(w["id"])

print(f"Existing unique IDs: {len(existing_ids)}")

intersection = downloaded_ids.intersection(existing_ids)
print(f"Overlap (already integrated): {len(intersection)}")

missing_ids = downloaded_ids - existing_ids
print(f"Missing from DB: {len(missing_ids)}")

if missing_ids:
    print(f"Some missing IDs: {list(missing_ids)[:10]}")
