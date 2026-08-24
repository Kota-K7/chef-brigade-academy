import json
import os
import sys

workspace_dir = r"c:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"
ref_path = os.path.join(workspace_dir, "data", "grammar_reference.json")
qdb_path = os.path.join(workspace_dir, "rpg", "questions_db.json")

def verify_json_parsing():
    print("--- Checking JSON parsing ---")
    files_to_check = [
        ref_path,
        qdb_path,
        os.path.join(workspace_dir, "rpg", "story", "chapter_career_0.json"),
        os.path.join(workspace_dir, "rpg", "story", "chapter_career_1.json"),
        os.path.join(workspace_dir, "rpg", "story", "chapter_career_2.json"),
        os.path.join(workspace_dir, "rpg", "story", "chapter_career_3.json"),
        os.path.join(workspace_dir, "rpg", "story", "chapter_career_4.json"),
        os.path.join(workspace_dir, "rpg", "history", "chapter_0.json"),
        os.path.join(workspace_dir, "rpg", "history", "chapter_1.json"),
        os.path.join(workspace_dir, "rpg", "history", "chapter_2.json"),
    ]
    
    all_ok = True
    for fp in files_to_check:
        try:
            with open(fp, 'r', encoding='utf-8') as f:
                json.load(f)
            print(f"OK: {os.path.basename(fp)}")
        except Exception as e:
            print(f"FAILED to parse: {fp} - Error: {e}")
            all_ok = False
            
    return all_ok
 
def verify_reference_topic_integrity():
    print("\n--- Checking Reference Topic Integrity ---")
    with open(ref_path, 'r', encoding='utf-8') as f:
        ref_data = json.load(f)
        
    valid_ids = {x['id'] for x in ref_data}
    print(f"Valid reference IDs in grammar_reference.json ({len(valid_ids)}):")
    print(sorted(list(valid_ids)))
    
    story_files = [
        os.path.join(workspace_dir, "rpg", "story", "chapter_career_0.json"),
        os.path.join(workspace_dir, "rpg", "story", "chapter_career_1.json"),
        os.path.join(workspace_dir, "rpg", "story", "chapter_career_2.json"),
        os.path.join(workspace_dir, "rpg", "story", "chapter_career_3.json"),
        os.path.join(workspace_dir, "rpg", "story", "chapter_career_4.json"),
        os.path.join(workspace_dir, "rpg", "history", "chapter_0.json"),
        os.path.join(workspace_dir, "rpg", "history", "chapter_1.json"),
        os.path.join(workspace_dir, "rpg", "history", "chapter_2.json"),
    ]
    
    orphans = []
    for fp in story_files:
        with open(fp, 'r', encoding='utf-8') as f:
            story = json.load(f)
            
        for ep in story.get('episodes', []):
            for step in ep.get('sequence', []):
                if step.get('type') == 'tutorial' and 'pages' in step:
                    for page in step['pages']:
                        ref_id = page.get('referenceTopicId')
                        if ref_id and ref_id not in valid_ids:
                            orphans.append((os.path.basename(fp), ep.get('episodeTitle'), page.get('title'), ref_id))
                            
    if orphans:
        print("\nWARNING: Found orphan referenceTopicIds in story files:")
        for file, ep, title, ref_id in orphans:
            print(f"  - In {file} ({ep}) -> Page '{title}' references missing ID: '{ref_id}'")
        return False
    else:
        print("OK: No orphan referenceTopicIds found in story files! All references are valid.")
        return True

def verify_added_questions():
    print("\n--- Checking Added Questions ---")
    with open(qdb_path, 'r', encoding='utf-8') as f:
        db = json.load(f)
        
    new_tags = [
        "#causative_faire",
        "#subjunctive_basic",
        "#obligation_il_faut_que",
        "#futur_simple",
        "#conditional_present",
        "#si_clauses_present",
        "#passive_voice",
        "#pronouns_y_en"
    ]
    
    all_ok = True
    for tag in new_tags:
        matching = [q for q in db if tag in q.get('tags', [])]
        print(f"Tag {tag}: {len(matching)} questions found.")
        if len(matching) < 3:
            print(f"  WARNING: Too few questions for tag {tag}")
            all_ok = False
            
    return all_ok

if __name__ == '__main__':
    # Redirect all stdout to a file with utf-8 encoding
    sys.stdout = open('scratch/verification_results.txt', 'w', encoding='utf-8')
    
    ok_json = verify_json_parsing()
    ok_ref = verify_reference_topic_integrity()
    ok_q = verify_added_questions()
    
    if ok_json and ok_ref and ok_q:
        print("\nALL VERIFICATIONS PASSED SUCCESSFULLY!")
        sys.exit(0)
    else:
        print("\nSOME VERIFICATIONS FAILED!")
        sys.exit(1)
