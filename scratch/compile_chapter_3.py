import os
import re
import json

workspace_dir = r"c:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"
draft_path = os.path.join(workspace_dir, "rpg", "story", "draft_story.md")
dest_file = os.path.join(workspace_dir, "rpg", "story", "chapter_career_3.json")

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
    
    title = f"第3-{ep_num}話"
    ep_goal = ""
    scenes = {}
    current_scene = None
    scene_lines = []
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        if line.startswith("【第3-"):
            m = re.search(r"【(第3-[^】]+)】", line)
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
                "title": "比較級と最上級の作り方",
                "type": "custom",
                "text": "フランス語の比較級・最上級の作り方です。\n・優等比較級: plus + 形容詞 + que (〜より…だ)\n・劣等比較級: moins + 形容詞 + que (〜より…でない)\n・同等比較級: aussi + 形容詞 + que (〜と同じくらい…だ)\n・最上級: 定冠詞 + plus/moins + 形容詞 + de... (〜の中で最も…だ)"
            },
            {
                "title": "目的語代名詞の語順",
                "referenceTopicId": "ref_object_pronouns",
                "sectionIndices": [0]
            }
        ]
        battle1_criteria = [
            {"tag": "#comparative", "count": 4},
            {"tag": "#superlative", "count": 3},
            {"tag": "#object_pronouns_direct_indirect", "count": 3},
            # Review
            {"tag": "#contracted_articles", "count": 2},
            {"tag": "#partitive_articles", "count": 2},
            {"tag": "#imperative", "count": 1}
        ]
    elif ep_num == 2:
        part1_pages = [
            {
                "title": "複合過去の基本構造",
                "referenceTopicId": "ref_auxiliaries",
                "sectionIndices": [0]
            },
            {
                "title": "êtreを助動詞にとる動詞",
                "referenceTopicId": "ref_auxiliaries",
                "sectionIndices": [1]
            }
        ]
        battle1_criteria = [
            {"tag": "#past_compose", "count": 5},
            {"tag": "#auxiliary_selection", "count": 5},
            # Review
            {"tag": "#etre", "count": 2},
            {"tag": "#avoir", "count": 2},
            {"tag": "#subjects", "count": 1}
        ]
    else:  # ep_num == 3
        part1_pages = [
            {
                "title": "半過去（imparfait）の活用と概念",
                "type": "custom",
                "text": "半過去（imparfait）は「過去の継続的な状態・背景・習慣（〜していた、〜だった）」を表します。\n直説法現在形一人称複数（nous）の語幹に半過去語尾（-ais, -ais, -ait, -ions, -iez, -aient）をつけて作ります。"
            },
            {
                "title": "半過去と複合過去の使い分け",
                "type": "custom",
                "text": "・複合過去 (passé composé): 過去の特定の「点」の行為（〜した）\n・半過去 (imparfait): 過去の背景や状態、継続的な習慣を表す「線」の描写（〜していた）"
            }
        ]
        battle1_criteria = [
            {"tag": "#imparfait", "count": 5},
            {"tag": "#imparfait_vs_past_compose", "count": 5},
            # Review
            {"tag": "#past_compose", "count": 3},
            {"tag": "#auxiliary_selection", "count": 2}
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
        "enemyName": "ガエル (製菓長)" if ep_num == 1 else ("佐伯 (スーシェフ)" if ep_num == 2 else "満 (マネージャー)"),
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
                "title": "肯定命令形における2つの代名詞の結合",
                "type": "custom",
                "text": "肯定の命令文で直接目的語代名詞と間接目的語代名詞を同時に使う場合、順序は「動詞 - 直接 - 間接」となり、すべてハイフンで繋ぎます。また、me/te は強変化の moi/toi になります。\n例：Donne-la-moi. (それを私に渡して)"
            },
            {
                "title": "否定命令形における2つの代名詞の語順",
                "type": "custom",
                "text": "否定命令文では通常の語順（Ne ➔ 間接 ➔ 直接 ➔ 動詞 ➔ pas）に戻ります。\n例：Ne me la donne pas. (それを私に渡さないで)"
            }
        ]
        battle2_criteria = [
            {"tag": "#imperative_with_pronouns", "count": 5},
            {"tag": "#object_pronouns_direct_indirect", "count": 4},
            {"tag": "#comparative", "count": 3},
            {"tag": "#superlative", "count": 3},
            # Review
            {"tag": "#object_pronouns_basic", "count": 2},
            {"tag": "#imperative", "count": 2},
            {"tag": "#basic_adjectives", "count": 1}
        ]
    elif ep_num == 2:
        part2_pages = [
            {
                "title": "êtreを助動詞とする場合の過去分詞の性数一致",
                "type": "custom",
                "text": "助動詞に être を使う場合、過去分詞は主語（S）の性と数に一致させます。\n例：Elle est allée. / Ils sont allés."
            },
            {
                "title": "avoirを助動詞とする場合の過去分詞の性数一致",
                "type": "custom",
                "text": "助動詞に avoir を使う場合、通常は性数一致しませんが、直接目的語（COD）が動詞の前に来るとき（関係代名詞 que の先行詞や直接目的語代名詞など）は、その直接目的語の性と数に過去分詞を一致させます。\n例：La tarte que j'ai cuite... (私が焼いたタルト...)"
            }
        ]
        battle2_criteria = [
            {"tag": "#past_compose", "count": 5},
            {"tag": "#auxiliary_selection", "count": 5},
            {"tag": "#past_participle_agreement", "count": 5},
            # Review
            {"tag": "#comparative", "count": 2},
            {"tag": "#superlative", "count": 2},
            {"tag": "#object_pronouns_direct_indirect", "count": 1}
        ]
    else:  # ep_num == 3
        part2_pages = [
            {
                "title": "関係代名詞 qui / que の基本",
                "type": "custom",
                "text": "名詞を後ろから説明する接続語です。\n・qui: 先行詞が関係節内で主語になる場合（〜する名詞）\n・que: 先行詞が関係節内で直接目的語になる場合（〜を…する名詞）"
            },
            {
                "title": "接続詞（parce que / mais / donc）",
                "type": "custom",
                "text": "文と文を繋ぐ接続詞です。\n・parce que: 「なぜなら（理由）」\n・mais: 「しかし（逆接）」\n・donc: 「したがって、だから（結果）」"
            },
            {
                "title": "現在分詞とジェロンディフ",
                "referenceTopicId": "ref_non_finite_forms",
                "sectionIndices": [0]
            }
        ]
        battle2_criteria = [
            {"tag": "#relative_pronouns_basic", "count": 5},
            {"tag": "#conjunctions_basic", "count": 5},
            {"tag": "#gerund_participle", "count": 5},
            # Review
            {"tag": "#imparfait", "count": 2},
            {"tag": "#imparfait_vs_past_compose", "count": 3}
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
        "enemyName": "エロディ (先輩)" if ep_num == 1 else ("ガエル (製菓長)" if ep_num == 2 else "ピエール (シェフ)"),
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
                "title": "比較級、最上級、目的語代名詞2つの結合の総まとめ",
                "type": "custom",
                "text": "これまでの学習事項のまとめです。比較文の構成や、肯定・否定命令形における人称目的語代名詞の結合ルールを整理しておきましょう。"
            },
            {
                "title": "【復習】近接未来と近接過去",
                "referenceTopicId": "ref_near_future_past",
                "sectionIndices": [0]
            }
        ]
        battle3_criteria = [
            {"tag": "#imperative_with_pronouns", "count": 4},
            {"tag": "#object_pronouns_direct_indirect", "count": 3},
            {"tag": "#comparative", "count": 3},
            {"tag": "#superlative", "count": 3},
            # Review
            {"tag": "#near_future", "count": 2},
            {"tag": "#near_past", "count": 2},
            {"tag": "#object_pronouns_basic", "count": 3}
        ]
    elif ep_num == 2:
        part3_pages = [
            {
                "title": "複合過去と性数一致の総まとめ",
                "type": "custom",
                "text": "助動詞の選択基準（avoir / être）と、それに伴う過去分詞の性数一致（主語一致 / 先行する直接目的語一致）のルールを総復習します。"
            },
            {
                "title": "【復習】目的語代名詞と複合過去の組み合わせ",
                "type": "custom",
                "text": "複合過去文で目的語代名詞を使う場合、代名詞は助動詞（avoir / être）の直前に置きます。\n例：Je l'ai fait. / Nous les avons finies."
            }
        ]
        battle3_criteria = [
            {"tag": "#past_compose", "count": 5},
            {"tag": "#auxiliary_selection", "count": 4},
            {"tag": "#past_participle_agreement", "count": 4},
            # Review
            {"tag": "#object_pronouns_direct_indirect", "count": 2},
            {"tag": "#imperative_with_pronouns", "count": 2},
            {"tag": "#near_past", "count": 2},
            {"tag": "#demonstrative_cest", "count": 1}
        ]
    else:  # ep_num == 3
        part3_pages = [
            {
                "title": "半過去、複合過去、関係代名詞、接続詞の総まとめ",
                "type": "custom",
                "text": "過去時制（複合過去と半過去）の使い分け、関係代名詞 qui / que、そして接続詞を用いた論理構成の総括です。"
            },
            {
                "title": "【復習】過去分詞の性数一致と比較級",
                "type": "custom",
                "text": "比較級表現および助動詞 être / COD先行時の過去分詞の性数一致を復習しましょう。"
            }
        ]
        battle3_criteria = [
            {"tag": "#imparfait", "count": 3},
            {"tag": "#imparfait_vs_past_compose", "count": 3},
            {"tag": "#relative_pronouns_basic", "count": 3},
            {"tag": "#conjunctions_basic", "count": 2},
            {"tag": "#gerund_participle", "count": 2},
            # Review
            {"tag": "#past_compose", "count": 3},
            {"tag": "#past_participle_agreement", "count": 2},
            {"tag": "#comparative", "count": 2}
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
        "xp": 100,
        "unlockedEpisodeId": f"career_ep_3_{ep_num+1}" if ep_num < 3 else None
    })
    
    return {
        "episodeId": f"career_ep_3_{ep_num}",
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
        
    episodes_raw = content.split("【第3-")
    ep_contents = {}
    for ep in episodes_raw:
        if ep.startswith("1話："):
            ep_contents[1] = "【第3-" + ep
        elif ep.startswith("2話："):
            ep_contents[2] = "【第3-" + ep
        elif ep.startswith("3話："):
            ep_contents[3] = "【第3-" + ep
            
    episodes = []
    for ep_num in [1, 2, 3]:
        if ep_num in ep_contents:
            print(f"Compiling Episode 3-{ep_num}...")
            ep_data = compile_episode(ep_contents[ep_num], ep_num)
            episodes.append(ep_data)
            
    chapter_data = {
        "chapterId": "career_3",
        "chapterTitle": "第3章: ガエル「巨漢のパティシエと過去の轍」",
        "notes": "比較・最上級、目的語代名詞の語順、複合過去や半過去、接続詞・関係代名詞を学びます。",
        "episodes": episodes
    }
    
    os.makedirs(os.path.dirname(dest_file), exist_ok=True)
    with open(dest_file, 'w', encoding='utf-8') as f:
        json.dump(chapter_data, f, ensure_ascii=False, indent=2)
    print(f"Saved compiled VN JSON to {dest_file}")

if __name__ == "__main__":
    main()
