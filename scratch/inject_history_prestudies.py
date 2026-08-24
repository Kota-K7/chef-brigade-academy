import os
import json

workspace_dir = r"c:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"

def inject_chapter_0():
    ch_path = os.path.join(workspace_dir, "rpg", "history", "chapter_0.json")
    if not os.path.exists(ch_path):
        print(f"File not found: {ch_path}")
        return
        
    with open(ch_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    for ep in data.get('episodes', []):
        ep_id = ep.get('episodeId')
        seq = ep.get('sequence', [])
        new_seq = []
        battle_idx = 0
        
        for step in seq:
            if step.get('type') == 'fixedBattle':
                battle_idx += 1
                
                # Create tutorial pages based on episode and battle index
                ref_pages = []
                if ep_id == "ep_0_1":
                    ref_pages = [
                        {"title": "基本の挨拶", "referenceTopicId": "ref_greetings", "sectionIndices": [0]},
                        {"title": "存在動詞 être 活用", "referenceTopicId": "ref_essential_irregular_verbs", "sectionIndices": [3]}
                    ]
                elif ep_id == "ep_0_2":
                    if battle_idx == 1:
                        ref_pages = [
                            {"title": "フランス語の数字表現", "referenceTopicId": "ref_numbers", "sectionIndices": [0]}
                        ]
                    else: # battle_idx == 2
                        ref_pages = [
                            {"title": "食材の数量と単位", "referenceTopicId": "ref_numbers", "sectionIndices": [1]}
                        ]
                elif ep_id == "ep_0_3":
                    if battle_idx == 1:
                        ref_pages = [
                            {"title": "基本の挨拶と自己紹介", "referenceTopicId": "ref_greetings", "sectionIndices": [0]},
                            {"title": "主語人称代名詞", "referenceTopicId": "ref_subjects", "sectionIndices": [0]}
                        ]
                    else: # battle_idx == 2
                        ref_pages = [
                            {"title": "国籍と挨拶の応用", "referenceTopicId": "ref_greetings", "sectionIndices": [1]}
                        ]
                
                # Check if tutorial already exists just before this battle
                has_tut = False
                if new_seq and new_seq[-1].get('type') == 'tutorial':
                    has_tut = True
                    
                if not has_tut and ref_pages:
                    new_seq.append({
                        "type": "tutorial",
                        "pages": ref_pages
                    })
                    
            new_seq.append(step)
        ep['sequence'] = new_seq
        
    with open(ch_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print("Chapter 0 updated successfully.")

def inject_chapter_1():
    ch_path = os.path.join(workspace_dir, "rpg", "history", "chapter_1.json")
    if not os.path.exists(ch_path):
        print(f"File not found: {ch_path}")
        return
        
    with open(ch_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    for ep in data.get('episodes', []):
        ep_id = ep.get('episodeId')
        
        # Only inject to ep_1_7, ep_1_8, ep_1_9, ep_1_10 which were missing tutorials
        if ep_id not in ["ep_1_7", "ep_1_8", "ep_1_9", "ep_1_10"]:
            continue
            
        seq = ep.get('sequence', [])
        new_seq = []
        battle_idx = 0
        
        for step in seq:
            if step.get('type') == 'fixedBattle':
                battle_idx += 1
                
                ref_pages = []
                if ep_id == "ep_1_7":
                    if battle_idx == 1:
                        ref_pages = [
                            {"title": "名詞・形容詞の複数形", "referenceTopicId": "ref_noun_genders", "sectionIndices": [1]}
                        ]
                    else: # battle_idx == 2
                        ref_pages = [
                            {"title": "否定文と否定のde", "referenceTopicId": "ref_negation", "sectionIndices": [0]}
                        ]
                elif ep_id == "ep_1_8":
                    if battle_idx == 1:
                        ref_pages = [
                            {"title": "動詞と前置詞の結合", "referenceTopicId": "ref_prepositions", "sectionIndices": [0]}
                        ]
                    else: # battle_idx == 2
                        ref_pages = [
                            {"title": "命令法（指示と号令）", "referenceTopicId": "ref_imperative", "sectionIndices": [0]}
                        ]
                elif ep_id == "ep_1_9":
                    if battle_idx == 1:
                        ref_pages = [
                            {"title": "命令文の動詞変化", "referenceTopicId": "ref_imperative", "sectionIndices": [0]}
                        ]
                    elif battle_idx == 2:
                        ref_pages = [
                            {"title": "否定命令と代名詞", "referenceTopicId": "ref_imperative_with_pronouns", "sectionIndices": [0]}
                        ]
                    else: # battle_idx == 3
                        ref_pages = [
                            {"title": "第1章 文法総復習", "referenceTopicId": "ref_sentence_structure", "sectionIndices": [0]}
                        ]
                elif ep_id == "ep_1_10":
                    if battle_idx == 1:
                        ref_pages = [
                            {"title": "動詞の現在形復習", "referenceTopicId": "ref_present_indicative", "sectionIndices": [0]}
                        ]
                    elif battle_idx == 2:
                        ref_pages = [
                            {"title": "疑問文と疑問詞の復習", "referenceTopicId": "ref_questions", "sectionIndices": [0]}
                        ]
                    elif battle_idx == 3:
                        ref_pages = [
                            {"title": "場所の前置詞と指示形容詞", "referenceTopicId": "ref_prepositions", "sectionIndices": [0]}
                        ]
                    else: # battle_idx == 4
                        ref_pages = [
                            {"title": "第1章 総合テスト対策", "referenceTopicId": "ref_sentence_structure", "sectionIndices": [0]}
                        ]
                        
                # Check if tutorial already exists just before this battle
                has_tut = False
                if new_seq and new_seq[-1].get('type') == 'tutorial':
                    has_tut = True
                    
                if not has_tut and ref_pages:
                    new_seq.append({
                        "type": "tutorial",
                        "pages": ref_pages
                    })
                    
            new_seq.append(step)
        ep['sequence'] = new_seq
        
    with open(ch_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print("Chapter 1 updated successfully.")

if __name__ == "__main__":
    inject_chapter_0()
    inject_chapter_1()
