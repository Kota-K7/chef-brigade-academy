import os
import re
import json

workspace_dir = r"c:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"
draft_path = os.path.join(workspace_dir, "rpg", "story", "draft_story.md")
dest_file = os.path.join(workspace_dir, "rpg", "story", "chapter_career_4.json")

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
    
    title = f"第4-{ep_num}話"
    ep_goal = ""
    scenes = {}
    current_scene = None
    scene_lines = []
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        if line.startswith("【第4-"):
            m = re.search(r"【(第4-[^】]+)】", line)
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
                "title": "単純未来 (Futur simple)",
                "referenceTopicId": "ref_time_expressions",
                "sectionIndices": [0]
            },
            {
                "title": "条件法現在 (Conditionnel présent) と丁寧な表現",
                "referenceTopicId": "ref_conditional",
                "sectionIndices": [0]
            }
        ]
        battle1_criteria = [
            {"tag": "#futur_simple", "count": 5},
            {"tag": "#conditional_present", "count": 5},
            {"tag": "#polite_expressions", "count": 5},
            # Review from Chapter 3
            {"tag": "#past_compose", "count": 3},
            {"tag": "#imparfait", "count": 2}
        ]
        enemy1_name = "佐伯 (スーシェフ)"
        enemy1_hp = 15
    elif ep_num == 2:
        part1_pages = [
            {
                "title": "条件節 (Si + 現在形, 単純未来)",
                "referenceTopicId": "ref_conditional",
                "sectionIndices": [1]
            }
        ]
        battle1_criteria = [
            {"tag": "#si_clauses_present", "count": 5},
            {"tag": "#futur_simple", "count": 5},
            {"tag": "#conditional_present", "count": 3},
            {"tag": "#pronouns_y_en", "count": 2}
        ]
        enemy1_name = "佐伯 (スーシェフ)"
        enemy1_hp = 15
    elif ep_num == 3:
        part1_pages = [
            {
                "title": "接続法現在 (Subjonctif)",
                "referenceTopicId": "ref_subjunctive",
                "sectionIndices": [0]
            },
            {
                "title": "必要・義務の表現 (Il faut que + 接続法)",
                "referenceTopicId": "ref_subjunctive",
                "sectionIndices": [1]
            }
        ]
        battle1_criteria = [
            {"tag": "#subjunctive_basic", "count": 5},
            {"tag": "#obligation_il_faut_que", "count": 5},
            {"tag": "#passive_voice", "count": 3},
            {"tag": "#si_clauses_present", "count": 2}
        ]
        enemy1_name = "ピエール (シェフ)"
        enemy1_hp = 15
    else:  # ep_num == 4
        part1_pages = [
            {
                "title": "過去時制の総復習",
                "type": "custom",
                "text": "複合過去と半過去の使い分け、およびジェロンディフをおさらいします。"
            },
            {
                "title": "目的語代名詞の総復習",
                "type": "custom",
                "text": "人称代名詞（直接・間接・中性）の語順と命令形との結合をおさらいします。"
            }
        ]
        battle1_criteria = [
            {"tag": "#past_compose", "count": 4},
            {"tag": "#imparfait", "count": 4},
            {"tag": "#imparfait_vs_past_compose", "count": 3},
            {"tag": "#object_pronouns_direct_indirect", "count": 2},
            {"tag": "#imperative_with_pronouns", "count": 1},
            {"tag": "#gerund_participle", "count": 1}
        ]
        enemy1_name = "佐伯 (スーシェフ)"
        enemy1_hp = 20
        
    sequence.append({
        "type": "tutorial",
        "title": "事前解説 (Préparation)",
        "goal": "練習問題の前に、以下の文法・表現をおさらいしましょう。",
        "pages": part1_pages
    })
    
    # 4. Fixed Battle 1
    sequence.append({
        "type": "fixedBattle",
        "enemyName": enemy1_name,
        "enemyHp": enemy1_hp,
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
                "title": "中性代名詞 y と en",
                "referenceTopicId": "ref_pronouns",
                "sectionIndices": [1]
            }
        ]
        battle2_criteria = [
            {"tag": "#pronouns_y_en", "count": 5},
            {"tag": "#futur_simple", "count": 4},
            {"tag": "#conditional_present", "count": 4},
            {"tag": "#object_pronouns_direct_indirect", "count": 2}
        ]
        enemy2_name = "エロディ (先輩)"
        enemy2_hp = 20
    elif ep_num == 2:
        part2_pages = [
            {
                "title": "受動態の基本構造 (La voix passive)",
                "referenceTopicId": "ref_passive",
                "sectionIndices": [0]
            },
            {
                "title": "複合過去の受動態と性数一致",
                "referenceTopicId": "ref_passive",
                "sectionIndices": [1]
            }
        ]
        battle2_criteria = [
            {"tag": "#passive_voice", "count": 5},
            {"tag": "#past_participle_agreement", "count": 5},
            {"tag": "#si_clauses_present", "count": 3},
            {"tag": "#past_compose", "count": 2}
        ]
        enemy2_name = "ガエル (製菓長)"
        enemy2_hp = 20
    elif ep_num == 3:
        part2_pages = [
            {
                "title": "使役動詞 (faire + 不定詞)",
                "referenceTopicId": "ref_causative",
                "sectionIndices": [0]
            },
            {
                "title": "感情を表す接続法",
                "referenceTopicId": "ref_subjunctive",
                "sectionIndices": [2]
            }
        ]
        battle2_criteria = [
            {"tag": "#causative_faire", "count": 5},
            {"tag": "#subjunctive_basic", "count": 5},
            {"tag": "#obligation_il_faut_que", "count": 3},
            {"tag": "#imparfait", "count": 2}
        ]
        enemy2_name = "ガエル (製菓長)"
        enemy2_hp = 20
    else:  # ep_num == 4
        part2_pages = [
            {
                "title": "未来と条件節の総復習",
                "type": "custom",
                "text": "単純未来、条件法現在、仮定法（Si）をおさらいします。"
            },
            {
                "title": "高度な文法構造の総復習",
                "type": "custom",
                "text": "受動態、使役動詞、接続法（Il faut que...）をおさらいします。"
            }
        ]
        battle2_criteria = [
            {"tag": "#futur_simple", "count": 4},
            {"tag": "#conditional_present", "count": 4},
            {"tag": "#si_clauses_present", "count": 3},
            {"tag": "#passive_voice", "count": 3},
            {"tag": "#causative_faire", "count": 3},
            {"tag": "#subjunctive_basic", "count": 3}
        ]
        enemy2_name = "エロディ (先輩)"
        enemy2_hp = 20
        
    sequence.append({
        "type": "tutorial",
        "title": "事前解説 (Préparation)",
        "goal": "練習問題の前に、以下の文法・表現をおさらいしましょう。",
        "pages": part2_pages
    })
    
    # 7. Fixed Battle 2
    sequence.append({
        "type": "fixedBattle",
        "enemyName": enemy2_name,
        "enemyHp": enemy2_hp,
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
                "title": "未来表現と中性代名詞の総まとめ",
                "type": "custom",
                "text": "単純未来、条件法、中性代名詞 y/en の語順や使い分けの総括です。"
            },
            {
                "title": "【復習】近接未来と目的語代名詞",
                "type": "custom",
                "text": "近接未来（aller + 不定詞）における人称代名詞の位置を復習します。"
            }
        ]
        battle3_criteria = [
            {"tag": "#futur_simple", "count": 4},
            {"tag": "#conditional_present", "count": 4},
            {"tag": "#pronouns_y_en", "count": 4},
            {"tag": "#near_future", "count": 4},
            {"tag": "#object_pronouns_direct_indirect", "count": 4}
        ]
    elif ep_num == 2:
        part3_pages = [
            {
                "title": "条件節と受動態の総まとめ",
                "type": "custom",
                "text": "Si を用いた未来の仮定表現、および受動態（被動態）の構造の総括です。"
            },
            {
                "title": "【復習】複合過去と半過去の使い分け",
                "type": "custom",
                "text": "過去時制（複合過去・半過去）の基本的な使い分けを復習します。"
            }
        ]
        battle3_criteria = [
            {"tag": "#si_clauses_present", "count": 4},
            {"tag": "#passive_voice", "count": 4},
            {"tag": "#futur_simple", "count": 4},
            {"tag": "#imparfait_vs_past_compose", "count": 4},
            {"tag": "#comparative", "count": 4}
        ]
    elif ep_num == 3:
        part3_pages = [
            {
                "title": "接続法と使役表現の総まとめ",
                "type": "custom",
                "text": "主観や感情を表す接続法、および「〜させる」使役動詞 faire の用法の総括です。"
            },
            {
                "title": "【復習】関係代名詞とジェロンディフ",
                "type": "custom",
                "text": "関係代名詞 qui / que、および同時進行を表すジェロンディフを復習します。"
            }
        ]
        battle3_criteria = [
            {"tag": "#subjunctive_basic", "count": 4},
            {"tag": "#causative_faire", "count": 4},
            {"tag": "#obligation_il_faut_que", "count": 3},
            {"tag": "#relative_pronouns_basic", "count": 3},
            {"tag": "#gerund_participle", "count": 3},
            {"tag": "#pronouns_y_en", "count": 3}
        ]
    else:  # ep_num == 4
        part3_pages = [
            {
                "title": "A1〜A2 文法総復習・最終チェック",
                "type": "custom",
                "text": "フランス語会話や厨房での指示において、時制や法（現在・過去・未来・条件法・接続法）を状況に応じて適切に使い分けるポイントを整理します。"
            }
        ]
        battle3_criteria = [
            {"tag": "#past_compose", "count": 3},
            {"tag": "#imparfait", "count": 3},
            {"tag": "#futur_simple", "count": 3},
            {"tag": "#conditional_present", "count": 3},
            {"tag": "#subjunctive_basic", "count": 3},
            {"tag": "#passive_voice", "count": 3},
            {"tag": "#causative_faire", "count": 3},
            {"tag": "#pronouns_y_en", "count": 4}
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
        "enemyHp": 25,
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
        "xp": 150,
        "unlockedEpisodeId": f"career_ep_4_{ep_num+1}" if ep_num < 4 else None
    })
    
    return {
        "episodeId": f"career_ep_4_{ep_num}",
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
        
    episodes_raw = content.split("【第4-")
    ep_contents = {}
    for ep in episodes_raw:
        if ep.startswith("1話："):
            ep_contents[1] = "【第4-" + ep
        elif ep.startswith("2話："):
            ep_contents[2] = "【第4-" + ep
        elif ep.startswith("3話："):
            ep_contents[3] = "【第4-" + ep
        elif ep.startswith("4話："):
            ep_contents[4] = "【第4-" + ep
            
    episodes = []
    for ep_num in [1, 2, 3, 4]:
        if ep_num in ep_contents:
            print(f"Compiling Episode 4-{ep_num}...")
            ep_data = compile_episode(ep_contents[ep_num], ep_num)
            episodes.append(ep_data)
            
    chapter_data = {
        "chapterId": "career_4",
        "chapterTitle": "第4章: ジャン＝ピエール「新たなる挑戦と未来への皿」",
        "notes": "単純未来・条件法、仮定法・受動態、使役表現・接続法などの高度な文法表現を学び、A1〜A2全体の総括試験に挑戦します。",
        "episodes": episodes
    }
    
    os.makedirs(os.path.dirname(dest_file), exist_ok=True)
    with open(dest_file, 'w', encoding='utf-8') as f:
        json.dump(chapter_data, f, ensure_ascii=False, indent=2)
    print(f"Saved compiled VN JSON to {dest_file}")

if __name__ == "__main__":
    main()
