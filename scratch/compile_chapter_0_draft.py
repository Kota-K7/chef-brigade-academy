import json
import os
import re

draft_path = r"C:\Users\kotya\Downloads\chapter_career_0_draft.md"
dest_file = r"c:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy\rpg\story\chapter_career_0.json"

char_map = {
    "金竹満": "kanetake",
    "金竹": "kanetake",
    "満": "kanetake",
    "佐伯": "saeki",
    "エロディ": "elodie",
    "ガエル": "gael",
    "ジャン＝ピエール": "jean_pierre",
    "ピエール": "jean_pierre",
    "ジャン": "jean_pierre",
    "主人公": "hero",
    "？？？": None
}

# Define the tutorial pages
ep1_part1_pages = [
    {
        "title": "挨拶・基本コミュニケーション",
        "type": "custom",
        "text": "フランス語の基本の挨拶表現です。声に出して発音してみましょう。",
        "headers": ["フランス語", "意味", "発音"],
        "rows": [
            ["Bonjour", "おはよう・こんにちは", "ボンジュール"],
            ["Merci", "ありがとう", "メルシー"],
            ["S'il vous plaît", "お願いします", "シル・ヴ・プレ"],
            ["Enchanté", "はじめまして", "アンシャンテ"]
        ]
    },
    {
        "title": "主語人称代名詞 (Les pronoms sujets)",
        "referenceTopicId": "ref_subjects",
        "sectionIndices": [0]
    }
]

ep1_part2_pages = [
    {
        "title": "動詞 être の現在形活用",
        "type": "custom",
        "text": "英語の be 動詞に相当する、状態や存在を表す最も重要な動詞です。",
        "headers": ["人称", "活用形", "発音", "例文"],
        "rows": [
            ["je", "suis", "スィ", "Je suis nouveau. (私は新人です)"],
            ["tu", "es", "エ", "Tu es prêt ? (君は準備できた？)"],
            ["il / elle", "est", "エ", "Il est chef. (彼は料理長です)"],
            ["nous", "sommes", "ソム", "Nous sommes prêts. (私たちは準備完了です)"],
            ["vous", "êtes", "エット", "Vous êtes en retard. (あなたは遅刻です)"],
            ["ils / elles", "sont", "ソン", "Ils sont dans la cuisine. (彼らは厨房にいます)"]
        ]
    },
    {
        "title": "動詞 avoir の現在形活用",
        "type": "custom",
        "text": "英語の have に相当する、所有や経験を表す極めて重要な動詞です。1人称単数 je の後ろでは、母音が衝突するため j'ai と縮約（エリジオン）します。",
        "headers": ["人称", "活用形", "発音", "例文"],
        "rows": [
            ["je (j')", "ai", "エ", "J'ai un couteau. (私はナイフを持っています)"],
            ["tu", "as", "ア", "Tu as une assiette. (君はお皿を持っています)"],
            ["il / elle", "a", "ア", "Il a du temps. (彼は時間があります)"],
            ["nous", "avons", "アヴォン", "Nous avons du sel. (私たちは塩を持っています)"],
            ["vous", "avez", "アヴェ", "Vous avez du sucre. (あなたは砂糖を持っています)"],
            ["ils / elles", "ont", "オン", "Ils ont des casseroles. (彼らは片手鍋を持っています)"]
        ]
    }
]

ep1_part3_pages = [
    {
        "title": "否定文 (ne...pas) の構造",
        "referenceTopicId": "ref_negation",
        "sectionIndices": [0, 1]
    }
]

ep2_part1_pages = [
    {
        "title": "定冠詞と不定冠詞の使い分け",
        "referenceTopicId": "ref_definite_indefinite_articles",
        "sectionIndices": [0, 2]
    },
    {
        "title": "数字と計量表現",
        "referenceTopicId": "ref_numbers",
        "sectionIndices": [0]
    }
]

ep2_part2_pages = [
    {
        "title": "複数名詞と冠詞",
        "referenceTopicId": "ref_numbers",
        "sectionIndices": [2, 3]
    },
    {
        "title": "数字 11〜20",
        "referenceTopicId": "ref_numbers",
        "sectionIndices": [1]
    },
    {
        "title": "否定文 (ne...pas) の復習",
        "referenceTopicId": "ref_negation",
        "sectionIndices": [0, 1]
    }
]

ep2_part3_pages = [
    {
        "title": "動詞 être の複数形活用",
        "type": "custom",
        "text": "複数人称の être 活用形です。厨房内での指示や状況確認で多用します。",
        "headers": ["人称", "活用形", "発音", "例文"],
        "rows": [
            ["nous", "sommes", "ソム", "Nous sommes prêts. (私たちは準備完了です)"],
            ["vous", "êtes", "エット", "Vous êtes en retard. (あなたは遅刻です)"],
            ["ils / elles", "sont", "ソン", "Ils sont dans la cuisine. (彼らは厨房にいます)"]
        ]
    },
    {
        "title": "動詞 avoir の複数形活用",
        "type": "custom",
        "text": "複数人称の avoir 活用形です。食材やツールの在庫状況を確認する際に用います。",
        "headers": ["人称", "活用形", "発音", "例文"],
        "rows": [
            ["nous", "avons", "アヴォン", "Nous avons du sel. (私たちは塩を持っています)"],
            ["vous", "avez", "アヴェ", "Vous avez du sucre. (あなたは砂糖を持っています)"],
            ["ils / elles", "ont", "オン", "Ils ont des casseroles. (彼らは片手鍋を持っています)"]
        ]
    }
]

def parse_learning_point(bq_lines):
    title = None
    desc = ""
    explanation_parts = []
    
    for line in bq_lines:
        line = line.strip()
        if line.startswith(">"):
            line = line[1:].strip()
        line = line.replace("💡", "").strip()
        
        if "登場人物" in line:
            m = re.search(r"\*\*[^*]+\*\*:\s*\*\*([^*]+)\*\*\s*-\s*(.*)", line)
            if m:
                title = m.group(1).strip()
                desc = m.group(2).strip()
            else:
                m2 = re.search(r"\*\*[^*]+\*\*:\s*(.*)", line)
                if m2:
                    desc = m2.group(1).strip()
        elif "フランス語解説" in line:
            pass
        elif line.startswith("*") or line.startswith("-"):
            bullet_content = line[1:].strip()
            bullet_content = bullet_content.replace("**", "")
            explanation_parts.append("・" + bullet_content)
            if not title:
                word_match = re.match(r"^([^:\[]+)", bullet_content)
                if word_match:
                    title = word_match.group(1).strip()
                    
    text_lines = []
    if desc:
        text_lines.append(desc)
    if explanation_parts:
        if desc:
            text_lines.append("")
        text_lines.append("【フランス語解説】")
        text_lines.extend(explanation_parts)
        
    if title or text_lines:
        return {
            "title": title or "解説",
            "text": "\n".join(text_lines)
        }
    return None

def parse_scenes(lines):
    scenes = {}
    current_scene = None
    scene_lines = []
    
    for line in lines:
        line_s = line.strip()
        if line_s.startswith("### 🎬"):
            if current_scene and scene_lines:
                scenes[current_scene] = scene_lines
            # Extract scene name
            m = re.search(r"【([^】]+)】", line_s)
            if m:
                current_scene = m.group(1).strip()
            else:
                current_scene = line_s
            scene_lines = []
        elif current_scene:
            scene_lines.append(line)
            
    if current_scene and scene_lines:
        scenes[current_scene] = scene_lines
        
    return scenes

def process_scene_dialogue(scene_lines, default_bg):
    steps = []
    idx = 0
    active_bg = default_bg
    
    while idx < len(scene_lines):
        line = scene_lines[idx].strip()
        if not line:
            idx += 1
            continue
            
        if line.startswith("*(") and line.endswith(")*"):
            # Background transition or narration
            text = line[2:-2].strip()
            # If transition contains drive or night, keep background but we can transition to restaurant
            if "夜の公園" in text or "夜景" in text:
                active_bg = "restaurant"
            steps.append({
                "type": "dialog",
                "character": None,
                "text": line,
                "position": "center",
                "background": active_bg
            })
            idx += 1
            continue
            
        # Match dialogue: **Name**：「Text」 or **Name**: 「Text」 or **Name**：「Text
        m = re.match(r"^\*\*(.+?)\*\*\s*[：:]\s*[「“\"'](.+?)[」”\"']\s*$", line)
        if not m:
            # Maybe it's narrator text
            if not line.startswith(">") and not line.startswith("#") and not line.startswith("*") and not line.startswith("-"):
                steps.append({
                    "type": "dialog",
                    "character": None,
                    "text": line,
                    "position": "center",
                    "background": active_bg
                })
            idx += 1
            continue
            
        char_name = m.group(1).strip()
        dialogue_text = m.group(2).strip()
        
        char_key = char_map.get(char_name, char_name.lower())
        
        # Look for subsequent blockquotes
        bq_lines = []
        next_idx = idx + 1
        while next_idx < len(scene_lines):
            next_line = scene_lines[next_idx].strip()
            if next_line.startswith(">"):
                bq_lines.append(next_line)
                next_idx += 1
            elif not next_line:
                next_idx += 1
            else:
                break
                
        lp = parse_learning_point(bq_lines) if bq_lines else None
        
        step = {
            "type": "dialog",
            "character": char_key,
            "text": dialogue_text,
            "position": "center",
            "background": active_bg
        }
        if lp:
            step["learningPoint"] = lp
            
        steps.append(step)
        idx = next_idx
        
    return steps

def compile_episode_1(lines, scenes):
    # Find goal & targets
    goal = ""
    targets = []
    
    in_goal_card = False
    for line in lines:
        line_s = line.strip()
        if "【オープニング：今日の学習目標】" in line_s:
            in_goal_card = True
        elif in_goal_card:
            if line_s.startswith("###"):
                break
            if "本日のゴール" in line_s:
                goal = line_s.split("本日のゴール:")[-1].split("本日のゴール：")[-1].strip()
            elif line_s.startswith("*") or line_s.startswith("-") or re.match(r"^\d+\.", line_s):
                target_text = re.sub(r"^[*\-\d.]+", "", line_s).strip()
                if target_text and "学習トピック" not in target_text:
                    targets.append(target_text)
                    
    sequence = []
    
    # 1. Goal card
    sequence.append({
        "type": "tutorial",
        "title": "今日の学習目標",
        "goal": goal or "基本の挨拶、主語の表し方、動詞 être / avoir、否定文の学習",
        "targets": targets or ["基本挨拶", "主語人称代名詞", "動詞 être / avoir", "否定文 ne...pas"]
    })
    
    # 2. Scene 1 dialogues
    scene1_lines = scenes.get("シーン 1 会話】：店の前で〜厨房の主") or scenes.get("シーン 1 会話") or []
    scene1_steps = process_scene_dialogue(scene1_lines, "restaurant")
    sequence.extend(scene1_steps)
    
    # 3. Tutorial 1
    sequence.append({
        "type": "tutorial",
        "title": "事前解説 (Préparation)",
        "goal": "練習問題の前に、以下の文法・表現をおさらいしましょう。",
        "pages": ep1_part1_pages
    })
    
    # 4. Battle 1
    sequence.append({
        "type": "fixedBattle",
        "enemyName": "ジャン＝ピエール (シェフ)",
        "enemyHp": 5,
        "enemyDamage": 2,
        "criteria": [
            {"tag": "#greetings", "count": 5},
            {"tag": "#subjects", "count": 5}
        ]
    })
    
    # 5. Scene 2 dialogues
    scene2_lines = scenes.get("シーン 2 会話】：厨房の洗礼") or scenes.get("シーン 2 会話") or []
    scene2_steps = process_scene_dialogue(scene2_lines, "kitchen")
    sequence.extend(scene2_steps)
    
    # 6. Tutorial 2
    sequence.append({
        "type": "tutorial",
        "title": "事前解説 (Préparation)",
        "goal": "練習問題の前に、以下の文法・表現をおさらいしましょう。",
        "pages": ep1_part2_pages
    })
    
    # 7. Battle 2
    sequence.append({
        "type": "fixedBattle",
        "enemyName": "エロディ (先輩)",
        "enemyHp": 7,
        "enemyDamage": 2,
        "criteria": [
            {"tag": "#etre", "count": 5},
            {"tag": "#avoir", "count": 5},
            {"tag": "#subjects", "count": 3}
        ]
    })
    
    # 8. Scene 3 dialogues
    scene3_lines = scenes.get("シーン 3 会話】：無口なパティシエ") or scenes.get("シーン 3 会話") or []
    scene3_steps = process_scene_dialogue(scene3_lines, "kitchen")
    sequence.extend(scene3_steps)
    
    # 9. Tutorial 3
    sequence.append({
        "type": "tutorial",
        "title": "事前解説 (Préparation)",
        "goal": "練習問題の前に、以下の文法・表現をおさらいしましょう。",
        "pages": ep1_part3_pages
    })
    
    # 10. Battle 3
    sequence.append({
        "type": "fixedBattle",
        "enemyName": "佐伯 (スーシェフ)",
        "enemyHp": 10,
        "enemyDamage": 2,
        "criteria": [
            {"tag": "#negation", "count": 5},
            {"tag": "#etre", "count": 3},
            {"tag": "#avoir", "count": 3},
            {"tag": "#greetings", "count": 2},
            {"tag": "#subjects", "count": 2}
        ]
    })
    
    # 11. Reward stamp
    sequence.append({
        "type": "reward",
        "xp": 100,
        "unlockedEpisodeId": "career_ep_0_2"
    })
    
    return {
        "episodeId": "career_ep_0_1",
        "episodeTitle": "第0-1話：フランス料理店へようこそ",
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

def compile_episode_2(lines, scenes):
    # Find goal & targets
    goal = ""
    targets = []
    
    in_goal_card = False
    for line in lines:
        line_s = line.strip()
        if "【オープニング：今日の学習目標】" in line_s:
            in_goal_card = True
        elif in_goal_card:
            if line_s.startswith("###"):
                break
            if "本日のゴール" in line_s:
                goal = line_s.split("本日のゴール:")[-1].split("本日のゴール：")[-1].strip()
            elif line_s.startswith("*") or line_s.startswith("-") or re.match(r"^\d+\.", line_s):
                target_text = re.sub(r"^[*\-\d.]+", "", line_s).strip()
                if target_text and "学習トピック" not in target_text:
                    targets.append(target_text)
                    
    sequence = []
    
    # 1. Goal card
    sequence.append({
        "type": "tutorial",
        "title": "今日の学習目標",
        "goal": goal or "名詞と冠詞の実践、数字の定着、否定文の完全理解",
        "targets": targets or ["定冠詞・不定冠詞の使い分け", "数字と計量表現", "否定文 ne...pas の復習"]
    })
    
    # 2. Scene 1 dialogues
    scene1_lines = scenes.get("シーン 1 会話】：導入") or scenes.get("シーン 1 会話") or []
    scene1_steps = process_scene_dialogue(scene1_lines, "kitchen")
    sequence.extend(scene1_steps)
    
    # 3. Tutorial 1
    sequence.append({
        "type": "tutorial",
        "title": "事前解説 (Préparation)",
        "goal": "練習問題の前に、以下の文法・表現をおさらいしましょう。",
        "pages": ep2_part1_pages
    })
    
    # 4. Battle 1
    sequence.append({
        "type": "fixedBattle",
        "enemyName": "佐伯 (スーシェフ)",
        "enemyHp": 5,
        "enemyDamage": 2,
        "criteria": [
            {"tag": "#articles", "count": 5},
            {"tag": "#noun_genders", "count": 4},
            {"tag": "#numbers", "count": 3},
            {"tag": "#negation", "count": 3}
        ]
    })
    
    # 5. Scene 2 dialogues
    scene2_lines = scenes.get("シーン 2 会話】：厨房実践") or scenes.get("シーン 2 会話") or []
    scene2_steps = process_scene_dialogue(scene2_lines, "kitchen")
    sequence.extend(scene2_steps)
    
    # 6. Tutorial 2
    sequence.append({
        "type": "tutorial",
        "title": "事前解説 (Préparation)",
        "goal": "練習問題の前に、以下の文法・表現をおさらいしましょう。",
        "pages": ep2_part2_pages
    })
    
    # 7. Battle 2
    sequence.append({
        "type": "fixedBattle",
        "enemyName": "ガエル ＆ エロディ",
        "enemyHp": 7,
        "enemyDamage": 2,
        "criteria": [
            {"tag": "#numbers", "count": 5},
            {"tag": "#articles", "count": 4},
            {"tag": "#etre", "count": 3},
            {"tag": "#avoir", "count": 3}
        ]
    })
    
    # 8. Scene 3 dialogues
    scene3_lines = scenes.get("シーン 3 会話】：小イベント（賄い争奪戦）") or scenes.get("シーン 3 会話") or []
    scene3_steps = process_scene_dialogue(scene3_lines, "kitchen")
    sequence.extend(scene3_steps)
    
    # 9. Tutorial 3
    sequence.append({
        "type": "tutorial",
        "title": "事前解説 (Préparation)",
        "goal": "練習問題の前に、以下の文法・表現をおさらいしましょう。",
        "pages": ep2_part3_pages
    })
    
    # 10. Battle 3
    sequence.append({
        "type": "fixedBattle",
        "enemyName": "ジャン＝ピエール (シェフ)",
        "enemyHp": 10,
        "enemyDamage": 2,
        "criteria": [
            {"tag": "#subjects", "count": 3},
            {"tag": "#etre", "count": 3},
            {"tag": "#avoir", "count": 3},
            {"tag": "#negation", "count": 3},
            {"tag": "#articles", "count": 2},
            {"tag": "#numbers", "count": 2}
        ]
    })
    
    # 11. Scene 4〜5 dialogues
    scene4_lines = scenes.get("シーン 4〜5 会話】：終了演出〜夜のドライブ") or scenes.get("シーン 4〜5 会話") or []
    scene4_steps = process_scene_dialogue(scene4_lines, "kitchen")
    sequence.extend(scene4_steps)
    
    # 12. Reward stamp
    sequence.append({
        "type": "reward",
        "xp": 100,
        "unlockedEpisodeId": None
    })
    
    return {
        "episodeId": "career_ep_0_2",
        "episodeTitle": "第0-2話：最初の注文 (La Première Commande)",
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
    if not os.path.exists(draft_path):
        print(f"Error: {draft_path} not found")
        return
        
    with open(draft_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Split content into Episode 1 and Episode 2
    episodes_parts = content.split("## 🥖 第0-2話")
    
    ep1_content = episodes_parts[0]
    ep2_content = "## 🥖 第0-2話" + episodes_parts[1] if len(episodes_parts) > 1 else ""
    
    ep1_lines = ep1_content.split("\n")
    ep2_lines = ep2_content.split("\n")
    
    ep1_scenes = parse_scenes(ep1_lines)
    ep2_scenes = parse_scenes(ep2_lines)
    
    ep1_data = compile_episode_1(ep1_lines, ep1_scenes)
    ep2_data = compile_episode_2(ep2_lines, ep2_scenes)
    
    chapter_data = {
        "chapterId": "career_0",
        "chapterTitle": "第0章: 金竹満「はじまりへの招待」",
        "notes": "フランス料理店でのアルバイトから始まり、一人前の料理人へと成長していくストーリー",
        "episodes": [ep1_data, ep2_data]
    }
    
    os.makedirs(os.path.dirname(dest_file), exist_ok=True)
    with open(dest_file, 'w', encoding='utf-8') as f:
        json.dump(chapter_data, f, ensure_ascii=False, indent=2)
        
    print(f"Successfully compiled Chapter 0 and saved to {dest_file}")

if __name__ == '__main__':
    main()
