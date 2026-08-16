import os
import re
import json

workspace_dir = r"c:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"
draft_path = os.path.join(workspace_dir, "story_drafts.txt")
dest_file = os.path.join(workspace_dir, "rpg", "story", "chapter_career_1.json")

char_map = {
    "佐伯": "saeki",
    "エロディ": "elodie",
    "ガエル": "gael",
    "ピエール": "jean_pierre",
    "満": "kanetake",
    "主人公": "hero",
    "全員": None
}

def parse_dialogue_segment(segment):
    m = re.match(r"^([^\s：:]+)：「?(.*?)」?$", segment)
    if m:
        char_name = m.group(1).strip()
        text = m.group(2).strip()
        char_key = char_map.get(char_name, None)
        return {
            "type": "dialog",
            "character": char_key,
            "text": text,
            "position": "center"
        }
    else:
        return {
            "type": "dialog",
            "character": None,
            "text": segment,
            "position": "center"
        }

def parse_scene_text(scene_lines):
    steps = []
    i = 0
    while i < len(scene_lines):
        line = scene_lines[i].strip()
        if not line:
            i += 1
            continue
            
        dialog_parts = line.split("→")
        line_steps = []
        for p in dialog_parts:
            p = p.strip()
            if not p:
                continue
            
            if "└" in p:
                main_p, lp_p = p.split("└", 1)
                main_step = parse_dialogue_segment(main_p.strip())
                lp_chunk = lp_p.split("解説:")[-1].strip()
                main_step["learningPoint"] = {
                    "title": lp_chunk,
                    "text": ""
                }
                line_steps.append(main_step)
            else:
                line_steps.append(parse_dialogue_segment(p))
                
        while i + 1 < len(scene_lines) and (scene_lines[i+1].strip().startswith("└") or scene_lines[i+1].strip().startswith("意味:")):
            next_line = scene_lines[i+1].strip()
            if next_line.startswith("└"):
                lp_chunk = next_line.split("解説:")[-1].strip()
                if line_steps:
                    if "learningPoint" not in line_steps[-1]:
                        line_steps[-1]["learningPoint"] = {}
                    line_steps[-1]["learningPoint"]["title"] = lp_chunk
            elif next_line.startswith("意味:"):
                meaning_text = next_line.split("意味:")[-1].strip()
                if line_steps:
                    if "learningPoint" not in line_steps[-1]:
                        line_steps[-1]["learningPoint"] = {"title": "解説", "text": ""}
                    if line_steps[-1]["learningPoint"].get("text"):
                        line_steps[-1]["learningPoint"]["text"] += "\n" + meaning_text
                    else:
                        line_steps[-1]["learningPoint"]["text"] = meaning_text
            i += 1
            
        steps.extend(line_steps)
        i += 1
    return steps

def compile_episode(ep_content, ep_num):
    lines = ep_content.split("\n")
    
    title = f"第1-{ep_num}話"
    ep_goal = ""
    scenes = {}
    current_scene = None
    scene_lines = []
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        if line.startswith("【第1-"):
            m = re.search(r"【(第1-[^】]+)】", line)
            if m:
                title = m.group(1)
            continue
            
        if line.startswith("Scene "):
            if current_scene:
                scenes[current_scene] = parse_scene_text(scene_lines)
            current_scene = line.split("：")[0].strip().split(":")[0].strip()
            scene_lines = []
            continue
            
        if line.startswith("Part ") or "今日の目標" in line or line.startswith("表示項目") or line.startswith("・") or line.startswith("問題数") or line.startswith("内容"):
            if current_scene:
                scenes[current_scene] = parse_scene_text(scene_lines)
                current_scene = None
                scene_lines = []
                
        if "今日の目標" in line:
            m = re.search(r"今日の目標：\s*「?([^」]+)」?", line)
            if m:
                ep_goal = m.group(1).strip()
            continue
            
        if current_scene:
            scene_lines.append(line)
            
    if current_scene:
        scenes[current_scene] = parse_scene_text(scene_lines)
        
    # Build sequence
    sequence = []
    
    # 1. Goal Step
    targets = [t.strip() for t in ep_goal.split("、") if t.strip()]
    sequence.append({
        "type": "tutorial",
        "title": "今日の学習目標",
        "goal": "本日の講義と厨房業務の目標です。",
        "targets": targets
    })
    
    # 2. Scene 1
    s1_steps = scenes.get("Scene 1", [])
    for step in s1_steps:
        step["background"] = "restaurant"
        sequence.append(step)
        
    # 3. Part 1 Pre-battle study page
    if ep_num == 1:
        part1_pages = [
            {
                "title": "動詞の3つのグループ",
                "referenceTopicId": "ref_verb_groups",
                "sectionIndices": [0]
            },
            {
                "title": "自動詞と他動詞の区別",
                "referenceTopicId": "ref_types_of_verbs",
                "sectionIndices": [0, 1]
            },
            {
                "title": "直説法現在の概念",
                "referenceTopicId": "ref_present_indicative",
                "sectionIndices": [0]
            }
        ]
        battle1_criteria = [
            {"tag": "#three_verb_groups", "count": 3},
            {"tag": "#transitive_intransitive", "count": 3},
            {"tag": "#indicative_present", "count": 4},
            # Review from Chapter 0
            {"tag": "#greetings", "count": 2},
            {"tag": "#subjects", "count": 1},
            {"tag": "#etre", "count": 1},
            {"tag": "#avoir", "count": 1}
        ]
    elif ep_num == 2:
        part1_pages = [
            {
                "title": "疑問文の3つの作り方",
                "referenceTopicId": "ref_questions",
                "sectionIndices": [0]
            },
            {
                "title": "厨房で頻出する疑問詞",
                "referenceTopicId": "ref_questions",
                "sectionIndices": [1]
            }
        ]
        battle1_criteria = [
            {"tag": "#questions", "count": 5},
            {"tag": "#question_words", "count": 5},
            # Review from Ep 1-1
            {"tag": "#three_verb_groups", "count": 2},
            {"tag": "#indicative_present", "count": 3}
        ]
    else:  # ep_num == 3
        part1_pages = [
            {
                "title": "形容詞の性数一致",
                "referenceTopicId": "ref_adjective_agreement",
                "sectionIndices": [0]
            },
            {
                "title": "形容詞の配置ルール",
                "referenceTopicId": "ref_adjective_agreement",
                "sectionIndices": [1]
            }
        ]
        battle1_criteria = [
            {"tag": "#adjective_agreement", "count": 5},
            {"tag": "#adjective_position", "count": 5},
            {"tag": "#noun_gender", "count": 2},
            # Review from Ep 1-2
            {"tag": "#question_words", "count": 2},
            {"tag": "#questions", "count": 3}
        ]
        
    sequence.append({
        "type": "tutorial",
        "title": "事前解説 (Préparation)",
        "goal": "練習問題の前に、以下の文法・表現をおさらいしましょう。",
        "pages": part1_pages
    })
    
    # 4. Fixed Battle 1
    sequence.append({
        "type": "fixedBattle",
        "enemyName": "佐伯 (スーシェフ)" if ep_num != 3 else "ピエール (シェフ)",
        "enemyHp": 15,
        "enemyDamage": 2,
        "criteria": battle1_criteria
    })
    
    # 5. Scene 2
    s2_steps = scenes.get("Scene 2", [])
    for step in s2_steps:
        step["background"] = "kitchen"
        sequence.append(step)
        
    # 6. Part 2 Pre-battle study page
    if ep_num == 1:
        part2_pages = [
            {
                "title": "動詞活用の規則変化パターン",
                "referenceTopicId": "ref_conjugation_patterns",
                "sectionIndices": [0]
            },
            {
                "title": "第1群・第2群規則動詞の活用",
                "referenceTopicId": "ref_verb_groups",
                "sectionIndices": [1, 2]
            }
        ]
        battle2_criteria = [
            {"tag": "#verb_conjugation_patterns", "count": 7},
            {"tag": "#regular_verbs_1_2", "count": 8},
            # Review from Chapter 0
            {"tag": "#articles", "count": 2},
            {"tag": "#numbers", "count": 2},
            {"tag": "#negation", "count": 1}
        ]
    elif ep_num == 2:
        part2_pages = [
            {
                "title": "所有形容詞",
                "referenceTopicId": "ref_possessive_adjectives",
                "sectionIndices": [0]
            },
            {
                "title": "指示形容詞",
                "referenceTopicId": "ref_demonstrative_adjectives",
                "sectionIndices": [0]
            },
            {
                "title": "場所・方向の前置詞",
                "referenceTopicId": "ref_prepositions",
                "sectionIndices": [0]
            }
        ]
        battle2_criteria = [
            {"tag": "#possessive_adjectives", "count": 5},
            {"tag": "#demonstrative_adjectives", "count": 5},
            {"tag": "#prepositions", "count": 5},
            # Review from Ep 1-1
            {"tag": "#regular_verbs_1_2", "count": 3},
            {"tag": "#irregular_verbs_major", "count": 2}
        ]
    else:  # ep_num == 3
        part2_pages = [
            {
                "title": "疑問形容詞 quel の用法",
                "referenceTopicId": "ref_questions",
                "sectionIndices": [2]
            },
            {
                "title": "部分冠詞の用法と冠詞全体の使い分け",
                "referenceTopicId": "ref_partitive_articles",
                "sectionIndices": [0]
            }
        ]
        battle2_criteria = [
            {"tag": "#interrogative_adjectives", "count": 5},
            {"tag": "#partitive_articles", "count": 10},
            # Review from Ep 1-2
            {"tag": "#possessive_adjectives", "count": 2},
            {"tag": "#demonstrative_adjectives", "count": 2},
            {"tag": "#prepositions", "count": 1}
        ]
        
    sequence.append({
        "type": "tutorial",
        "title": "事前解説 (Préparation)",
        "goal": "練習問題の前に、以下の文法・表現をおさらいしましょう。",
        "pages": part2_pages
    })
    
    # 7. Fixed Battle 2
    sequence.append({
        "type": "fixedBattle",
        "enemyName": "エロディ (先輩)" if ep_num == 1 else "ガエル (製菓長)",
        "enemyHp": 20,
        "enemyDamage": 2,
        "criteria": battle2_criteria
    })
    
    # 8. Scene 3
    s3_steps = scenes.get("Scene 3", [])
    for step in s3_steps:
        step["background"] = "kitchen"
        sequence.append(step)
        
    # 9. Part 3 Pre-battle study page
    if ep_num == 1:
        part3_pages = [
            {
                "title": "主要不規則動詞の現在形活用",
                "referenceTopicId": "ref_essential_irregular_verbs",
                "sectionIndices": [0, 1, 2]
            },
            {
                "title": "【復習】être / avoir の現在形活用",
                "referenceTopicId": "ref_essential_irregular_verbs",
                "sectionIndices": [3, 4]
            }
        ]
        battle3_criteria = [
            {"tag": "#irregular_verbs_major", "count": 7},
            {"tag": "#three_verb_groups", "count": 3},
            {"tag": "#regular_verbs_1_2", "count": 3},
            # Review
            {"tag": "#etre", "count": 2},
            {"tag": "#avoir", "count": 2},
            {"tag": "#negation", "count": 2},
            {"tag": "#articles", "count": 1}
        ]
    elif ep_num == 2:
        part3_pages = [
            {
                "title": "【復習】否定文の構造と語順",
                "referenceTopicId": "ref_negation",
                "sectionIndices": [0]
            },
            {
                "title": "疑問文と否定文の組み合わせ",
                "type": "custom",
                "text": "否定表現 (ne ... pas) の中に疑問詞を組み合わせて「なぜ〜ではないのか？」などを尋ねます。\n例：Pourquoi mon flan n'est pas dans le frigo ?\n(なぜ私のプリンは冷蔵庫にないのですか？)"
            }
        ]
        battle3_criteria = [
            {"tag": "#negation", "count": 3},
            {"tag": "#questions", "count": 3},
            {"tag": "#prepositions", "count": 3},
            {"tag": "#possessive_adjectives", "count": 2},
            {"tag": "#demonstrative_adjectives", "count": 2},
            # Review
            {"tag": "#irregular_verbs_major", "count": 4},
            {"tag": "#regular_verbs_1_2", "count": 3}
        ]
    else:  # ep_num == 3
        part3_pages = [
            {
                "title": "形容詞、疑問形容詞、部分冠詞の総まとめ",
                "type": "custom",
                "text": "これまでのまとめです。形容詞の性数一致、位置、疑問形容詞、部分冠詞などを完全マスターしましょう。"
            },
                        {
                "title": "副詞（adverbs）の基本",
                "referenceTopicId": "ref_adverbs",
                "sectionIndices": [0, 2]
            },
            {
                "title": "【復習】冠詞全体の使い分け",
                "referenceTopicId": "ref_definite_indefinite_articles",
                "sectionIndices": [0, 2]
            }
        ]
        battle3_criteria = [
            {"tag": "#adjective_agreement", "count": 3},
            {"tag": "#adjective_position", "count": 3},
            {"tag": "#interrogative_adjectives", "count": 3},
            {"tag": "#partitive_articles", "count": 4},
            {"tag": "#adverbs", "count": 3},
            # Review
            {"tag": "#articles", "count": 2},
            {"tag": "#three_verb_groups", "count": 2},
            {"tag": "#irregular_verbs_major", "count": 2},
            {"tag": "#questions", "count": 1}
        ]
        
    sequence.append({
        "type": "tutorial",
        "title": "事前解説 (Préparation)",
        "goal": "総合復習の前に、以下の文法・表現をおさらいしましょう。",
        "pages": part3_pages
    })
    
    # 10. Fixed Battle 3
    sequence.append({
        "type": "fixedBattle",
        "enemyName": "ジャン＝ピエール (シェフ)",
        "enemyHp": 20,
        "enemyDamage": 2,
        "criteria": battle3_criteria
    })
    
    # 11. Scene 4〜5
    s4_steps = scenes.get("Scene 4〜5", [])
    for step in s4_steps:
        step["background"] = "restaurant"
        sequence.append(step)
        
    # 12. Reward Stamp
    sequence.append({
        "type": "reward",
        "xp": 100,
        "unlockedEpisodeId": f"career_ep_1_{ep_num+1}" if ep_num < 3 else None
    })
    
    return {
        "episodeId": f"career_ep_1_{ep_num}",
        "episodeTitle": title,
        "recommendedPlayTime": "5 mins",
        "backgrounds": {
            "bgBlack": "#000000",
            "restaurant": "url('assets/story/career_story/restaurant.webp')",
            "kitchen": "url('assets/story/career_story/kitchen.webp')",
            "gael_sweets": "url('assets/story/career_story/gael_sweets.webp')"
        },
        "characters": {
            "hero": { "name": "主人公" },
            "kanetake": {
                "name": "金竹満",
                "images": { "default": "assets/story/career_story/kanetake.webp" }
            },
            "saeki": {
                "name": "佐伯博",
                "images": { "default": "assets/story/career_story/saeki.webp" }
            },
            "elodie": {
                "name": "エロディ",
                "images": { "default": "assets/story/career_story/elodie.webp" }
            },
            "gael": {
                "name": "ガエル",
                "images": { "default": "assets/story/career_story/gael.webp" }
            },
            "jean_pierre": {
                "name": "ジャン＝ピエール",
                "images": { "default": "assets/story/career_story/jean_pierre.webp" }
            }
        },
        "sequence": sequence
    }

def main():
    print(f"Reading drafts from {draft_path}...")
    with open(draft_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    episodes_raw = content.split("【第1-")
    ep_contents = {}
    for ep in episodes_raw:
        if ep.startswith("1話："):
            ep_contents[1] = "【第1-" + ep
        elif ep.startswith("2話："):
            ep_contents[2] = "【第1-" + ep
        elif ep.startswith("3話："):
            ep_contents[3] = "【第1-" + ep
            
    episodes = []
    for ep_num in [1, 2, 3]:
        if ep_num in ep_contents:
            print(f"Compiling Episode 1-{ep_num}...")
            ep_data = compile_episode(ep_contents[ep_num], ep_num)
            episodes.append(ep_data)
            
    chapter_data = {
        "chapterId": "career_1",
        "chapterTitle": "第1章: 佐伯「厨房の基本動作」",
        "notes": "厨房の共通言語である動詞と疑問文、形容詞の使い方を学びます。",
        "episodes": episodes
    }
    
    os.makedirs(os.path.dirname(dest_file), exist_ok=True)
    with open(dest_file, 'w', encoding='utf-8') as f:
        json.dump(chapter_data, f, ensure_ascii=False, indent=2)
    print(f"Saved compiled VN JSON to {dest_file}")

if __name__ == "__main__":
    main()
