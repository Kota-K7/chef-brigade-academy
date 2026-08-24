import os
import json

workspace_dir = r"c:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"
qdb_path = os.path.join(workspace_dir, "rpg", "questions_db.json")
temp_path = os.path.join(workspace_dir, "scratch", "temp_add_questions.json")

def main():
    if not os.path.exists(temp_path):
        print("Temp questions file not found!")
        return
        
    with open(qdb_path, 'r', encoding='utf-8') as f:
        db = json.load(f)
        
    with open(temp_path, 'r', encoding='utf-8') as f:
        new_qs = json.load(f)
        
    existing_ids = {q['id'] for q in db}
    added_count = 0
    
    for q in new_qs:
        q_id = q.get('id')
        if q_id in existing_ids:
            print(f"Warning: Question ID {q_id} already exists. Skipping.")
        else:
            # Validate structure slightly
            if 'tags' not in q or 'type' not in q or 'text' not in q:
                print(f"Error: Question {q_id} has invalid structure. Skipping.")
                continue
            db.append(q)
            added_count += 1
            
    if added_count > 0:
        with open(qdb_path, 'w', encoding='utf-8') as f:
            json.dump(db, f, ensure_ascii=False, indent=2)
        print(f"Successfully merged {added_count} new questions into questions_db.json.")
    else:
        print("No new questions were merged.")

if __name__ == '__main__':
    main()
