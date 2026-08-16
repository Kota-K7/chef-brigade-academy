import json
import os
import re

workspace_dir = r"c:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"

def update_json_files():
    # 1. Update rpg/story/chapter_career_1.json
    ch1_path = os.path.join(workspace_dir, "rpg", "story", "chapter_career_1.json")
    if os.path.exists(ch1_path):
        with open(ch1_path, 'r', encoding='utf-8') as f:
            ch1 = json.load(f)
        
        # Episode 1-3 is index 2
        if len(ch1.get('episodes', [])) > 2:
            ep = ch1['episodes'][2]
            # Find the tutorial sequence step with pages
            for step in ep.get('sequence', []):
                if step.get('type') == 'tutorial' and 'pages' in step:
                    pages = step['pages']
                    # Check if "【復習】冠詞全体の使い分け" is in pages
                    if any(p.get('title') == "【復習】冠詞全体の使い分け" for p in pages):
                        # Check if ref_adverbs page is already present
                        if not any(p.get('referenceTopicId') == 'ref_adverbs' for p in pages):
                            adverbs_page = {
                                "title": "副詞（adverbs）の基本",
                                "referenceTopicId": "ref_adverbs",
                                "sectionIndices": [0, 2]
                            }
                            pages.append(adverbs_page)
                            print("Updated chapter_career_1.json with ref_adverbs page.")
                            break
        
        with open(ch1_path, 'w', encoding='utf-8') as f:
            json.dump(ch1, f, ensure_ascii=False, indent=2)

    # 2. Update rpg/story/chapter_career_3.json
    ch3_path = os.path.join(workspace_dir, "rpg", "story", "chapter_career_3.json")
    if os.path.exists(ch3_path):
        with open(ch3_path, 'r', encoding='utf-8') as f:
            ch3 = json.load(f)
        
        # Episode 3-1 is index 0
        if len(ch3.get('episodes', [])) > 0:
            ep = ch3['episodes'][0]
            for step in ep.get('sequence', []):
                if step.get('type') == 'tutorial' and 'pages' in step:
                    for p in step['pages']:
                        if p.get('title') == "肯定命令形における2つの代名詞の結合":
                            p['referenceTopicId'] = "ref_imperative_with_pronouns"
                            p['sectionIndices'] = [0]
                            p.pop('type', None)
                            p.pop('text', None)
                            print("Updated chapter_career_3.json Ep 3-1 page 肯定命令形 to ref_imperative_with_pronouns.")
                        elif p.get('title') == "否定命令形における2つの代名詞の語順":
                            p['referenceTopicId'] = "ref_imperative_with_pronouns"
                            p['sectionIndices'] = [1]
                            p.pop('type', None)
                            p.pop('text', None)
                            print("Updated chapter_career_3.json Ep 3-1 page 否定命令形 to ref_imperative_with_pronouns.")

        # Episode 3-3 is index 2
        if len(ch3.get('episodes', [])) > 2:
            ep = ch3['episodes'][2]
            for step in ep.get('sequence', []):
                if step.get('type') == 'tutorial' and 'pages' in step:
                    for p in step['pages']:
                        if p.get('title') == "関係代名詞 qui / que の基本":
                            p['referenceTopicId'] = "ref_relative_pronouns"
                            p['sectionIndices'] = [0, 1]
                            p.pop('type', None)
                            p.pop('text', None)
                            print("Updated chapter_career_3.json Ep 3-3 page 関係代名詞 to ref_relative_pronouns.")

        with open(ch3_path, 'w', encoding='utf-8') as f:
            json.dump(ch3, f, ensure_ascii=False, indent=2)

    # 3. Update rpg/story/chapter_career_4.json
    ch4_path = os.path.join(workspace_dir, "rpg", "story", "chapter_career_4.json")
    if os.path.exists(ch4_path):
        with open(ch4_path, 'r', encoding='utf-8') as f:
            ch4 = json.load(f)

        # Episode 4-3 is index 2
        if len(ch4.get('episodes', [])) > 2:
            ep = ch4['episodes'][2]
            for step in ep.get('sequence', []):
                if step.get('type') == 'tutorial' and 'pages' in step:
                    for p in step['pages']:
                        if p.get('title') == "使役動詞 (faire + 不定詞)":
                            if p.get('referenceTopicId') == 'ref_causative':
                                p['referenceTopicId'] = 'ref_causative_faire'
                                print("Updated chapter_career_4.json Ep 4-3 page 使役動詞 to ref_causative_faire.")

        with open(ch4_path, 'w', encoding='utf-8') as f:
            json.dump(ch4, f, ensure_ascii=False, indent=2)

def update_python_scripts():
    # 1. Update scratch/compile_chapter_1.py
    c1_path = os.path.join(workspace_dir, "scratch", "compile_chapter_1.py")
    if os.path.exists(c1_path):
        with open(c1_path, 'r', encoding='utf-8') as f:
            c1 = f.read()
        
        # Look for the custom page:
        old_adverbs_str = """            {
                "title": "副詞（adverbs）の基本",
                "type": "custom",
                "text": "状態や頻度を表す言葉です。\\n・様態副詞：形容詞の女性形に -ment をつけて作ります（例：doucement 優しく、ゆっくり）。\\n・頻度副詞：toujours（いつも、常に）などは通常、動詞の直後に置きます。"
            },"""
        
        new_adverbs_str = """            {
                "title": "副詞（adverbs）の基本",
                "referenceTopicId": "ref_adverbs",
                "sectionIndices": [0, 2]
            },"""
        
        # Let's normalize backslashes/newlines to ensure match
        if "副詞（adverbs）の基本" in c1 and '"type": "custom"' in c1:
            # We can use regex to replace it
            c1_new = re.sub(
                r'\{\s*"title":\s*"副詞（adverbs）の基本",\s*"type":\s*"custom",\s*"text":\s*"[^"]+"\s*\},',
                new_adverbs_str,
                c1
            )
            if c1_new == c1:
                # Direct string replacement fallback
                c1_new = c1.replace(old_adverbs_str, new_adverbs_str)
            
            with open(c1_path, 'w', encoding='utf-8') as f:
                f.write(c1_new)
            print("Updated compile_chapter_1.py with ref_adverbs reference.")

    # 2. Update scratch/compile_chapter_3.py
    c3_path = os.path.join(workspace_dir, "scratch", "compile_chapter_3.py")
    if os.path.exists(c3_path):
        with open(c3_path, 'r', encoding='utf-8') as f:
            c3 = f.read()

        # Update 肯定命令形, 否定命令形 and 関係代名詞
        c3_new = re.sub(
            r'\{\s*"title":\s*"肯定命令形における2つの代名詞の結合",\s*"type":\s*"custom",\s*"text":\s*"[^"]+"\s*\}',
            '{\n                "title": "肯定命令形における2つの代名詞の結合",\n                "referenceTopicId": "ref_imperative_with_pronouns",\n                "sectionIndices": [0]\n            }',
            c3
        )
        c3_new = re.sub(
            r'\{\s*"title":\s*"否定命令形における2つの代名詞の語順",\s*"type":\s*"custom",\s*"text":\s*"[^"]+"\s*\}',
            '{\n                "title": "否定命令形における2つの代名詞の語順",\n                "referenceTopicId": "ref_imperative_with_pronouns",\n                "sectionIndices": [1]\n            }',
            c3_new
        )
        c3_new = re.sub(
            r'\{\s*"title":\s*"関係代名詞 qui / que の基本",\s*"type":\s*"custom",\s*"text":\s*"[^"]+"\s*\}',
            '{\n                "title": "関係代名詞 qui / que の基本",\n                "referenceTopicId": "ref_relative_pronouns",\n                "sectionIndices": [0, 1]\n            }',
            c3_new
        )

        with open(c3_path, 'w', encoding='utf-8') as f:
            f.write(c3_new)
        print("Updated compile_chapter_3.py with new reference links.")

    # 3. Update scratch/compile_chapter_4.py
    c4_path = os.path.join(workspace_dir, "scratch", "compile_chapter_4.py")
    if os.path.exists(c4_path):
        with open(c4_path, 'r', encoding='utf-8') as f:
            c4 = f.read()

        c4_new = c4.replace('"referenceTopicId": "ref_causative"', '"referenceTopicId": "ref_causative_faire"')
        with open(c4_path, 'w', encoding='utf-8') as f:
            f.write(c4_new)
        print("Updated compile_chapter_4.py with ref_causative_faire link.")

if __name__ == '__main__':
    update_json_files()
    update_python_scripts()
