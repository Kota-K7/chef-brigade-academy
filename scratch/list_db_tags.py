import os
import json

workspace_dir = r"c:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"
qdb_path = os.path.join(workspace_dir, "rpg", "questions_db.json")

def main():
    with open(qdb_path, 'r', encoding='utf-8') as f:
        db = json.load(f)
        
    tag_counts = {}
    for q in db:
        for t in q.get('tags', []):
            tag_counts[t] = tag_counts.get(t, 0) + 1
            
    print("=== Available tags in database ===")
    for tag in sorted(tag_counts.keys()):
        print(f"{tag}: {tag_counts[tag]} questions")

if __name__ == '__main__':
    main()
