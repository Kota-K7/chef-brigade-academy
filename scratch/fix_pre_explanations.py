import os
import sys
import json
import glob

# Force standard output to UTF-8 to prevent encoding crashes with French characters on Windows
sys.stdout.reconfigure(encoding='utf-8')

workspace_dir = os.path.abspath(r"C:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy")

# Find all JSON files
history_files = glob.glob(os.path.join(workspace_dir, "rpg", "history", "chapter_*.json"))
story_files = glob.glob(os.path.join(workspace_dir, "rpg", "story", "chapter_career_*.json"))
all_files = history_files + story_files

for file_path in all_files:
    filename = os.path.basename(file_path)
    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    modified = False
    episodes = data.get("episodes", [])
    
    for ep in episodes:
        sequence = ep.get("sequence", [])
        for step in sequence:
            if step.get("type") == "tutorial" and "pages" in step:
                pages = step["pages"]
                for p_idx, page in enumerate(pages):
                    title = page.get("title", "")
                    ref_id = page.get("referenceTopicId", "")
                    sec_indices = page.get("sectionIndices", [])
                    
                    # 1. etre conjugation
                    if title == "存在動詞 être 活用" and ref_id == "ref_essential_irregular_verbs":
                        page["referenceTopicId"] = "ref_conjugation_patterns"
                        page["sectionIndices"] = [0]
                        modified = True
                        print(f"SUCCESS: Fixed '{title}' in {filename} -> ref_conjugation_patterns[0]")
                    
                    # 2. avoir conjugation
                    elif title == "所有動詞 avoir 活用" and ref_id == "ref_essential_irregular_verbs":
                        page["referenceTopicId"] = "ref_conjugation_patterns"
                        page["sectionIndices"] = [1]
                        modified = True
                        print(f"SUCCESS: Fixed '{title}' in {filename} -> ref_conjugation_patterns[1]")
                    
                    # 3. aller / venir sections
                    elif title == "重要不規則動詞 (aller / venir)" and ref_id == "ref_essential_irregular_verbs" and sec_indices == [0, 1]:
                        page["sectionIndices"] = [1, 2]
                        modified = True
                        print(f"SUCCESS: Fixed '{title}' in {filename} -> sections [1, 2]")
                    
                    # 4. plurals reference in history
                    elif title == "名詞・形容詞の複数形" and ref_id == "ref_noun_genders" and sec_indices == [1]:
                        page["sectionIndices"] = [6]
                        modified = True
                        print(f"SUCCESS: Fixed '{title}' in {filename} -> section [6]")
                    
                    # 5. plurals reference in career
                    elif title == "複数名詞と冠詞" and ref_id == "ref_numbers" and sec_indices == [2, 3]:
                        page["referenceTopicId"] = "ref_noun_genders"
                        page["sectionIndices"] = [6]
                        modified = True
                        print(f"SUCCESS: Fixed '{title}' in {filename} -> ref_noun_genders[6]")
                    
                    # 6. review etre/avoir (career_1)
                    elif title == "【復習】être / avoir の現在形活用" and ref_id == "ref_essential_irregular_verbs":
                        page["referenceTopicId"] = "ref_conjugation_patterns"
                        page["sectionIndices"] = [0, 1]
                        modified = True
                        print(f"SUCCESS: Fixed '{title}' in {filename} -> ref_conjugation_patterns[0, 1]")
                    
                    # 7. review etre/avoir (career_2)
                    elif title == "【復習】être と avoir の直説法現在活用" and ref_id == "ref_essential_irregular_verbs":
                        page["referenceTopicId"] = "ref_conjugation_patterns"
                        page["sectionIndices"] = [0, 1]
                        modified = True
                        print(f"SUCCESS: Fixed '{title}' in {filename} -> ref_conjugation_patterns[0, 1]")
                    
                    # 8. subjunctive index error
                    elif title == "感情を表す接続法" and ref_id == "ref_subjunctive" and sec_indices == [2]:
                        page["sectionIndices"] = [1]
                        modified = True
                        print(f"SUCCESS: Fixed '{title}' in {filename} -> section [1]")
                        
    if modified:
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

print("All dynamic scan fixes applied successfully.")
