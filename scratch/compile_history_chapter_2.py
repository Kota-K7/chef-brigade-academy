import os
import re
import json
import sys

# Configure stdout to handle UTF-8 printing without crashing on Windows
sys.stdout.reconfigure(encoding='utf-8')

workspace_dir = r"c:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"
draft_path = os.path.join(workspace_dir, "rpg", "history", "draft_story.md")
dest_file = os.path.join(workspace_dir, "rpg", "history", "chapter_2.json")

char_map = {
    "主人公": "hero",
    "クロティルダ": "clotilde",
    "Clotilde": "clotilde",
    "クローヴィス": "clovis",
    "Clovis": "clovis",
    "執事": "steward",
    "一般兵": "soldier",
    "暗殺者": "assassin",
    "Charlemagne": "charlemagne",
    "カール大帝": "charlemagne",
    "Desiderius": "desiderius",
    "デシデリウス": "desiderius",
    "教皇（レオ3世）": "leo3",
    "教皇": "leo3",
    "部下": "subordinate",
    "指揮官": "commander",
    "民衆": "people",
    "Irene": "irene",
    "エイレーネー": "irene",
    "東ローマの部下": "east_subordinate",
    "子供": "child"
}

background_urls = {
    "bgBlack": "#000000",
    "roma_empire_map": "url('assets/story/chapter_2/ローマ帝国地図.webp')",
    "garden": "url('assets/story/chapter_2/庭園.webp')",
    "monastery": "url('assets/story/chapter_2/修道院.webp')",
    "battlefield": "url('assets/story/chapter_2/戦場.webp')",
    "forest": "url('assets/story/chapter_2/森.webp')",
    "castle": "url('assets/story/chapter_2/城.webp')",
    "white_mic": "url('assets/story/chapter_2/白マイク.jpg')",
    "charlemagne_battlefield": "url('assets/story/chapter_2/カール戦場.webp')",
    "church_inside": "url('assets/story/chapter_2/教会内.webp')",
    "charlemagne_coronation": "url('assets/story/chapter_2/教会内.webp')",
    "palace": "url('assets/story/chapter_2/宮殿の眺望.webp')",
    "palace_inside": "url('assets/story/chapter_2/宮殿内.webp')",
    "letter": "url('assets/story/chapter_2/手紙.jpg')",
    "sickroom": "url('assets/story/chapter_2/病室.jpg')",
    "mersen_verdun": "url('assets/story/chapter_2/メルセンヴェルダン.jpg')"
}

def map_bg(name, ep_num):
    name = name.replace('[', '').replace(']', '').replace('背景:', '').replace('背景', '').strip()
    if "地図" in name:
        return "roma_empire_map"
    elif "庭園" in name:
        return "garden"
    elif "修道院" in name:
        return "monastery"
    elif "戦場" in name:
        return "charlemagne_battlefield" if ep_num == 7 else "battlefield"
    elif "森" in name:
        return "forest"
    elif "黒" in name:
        return "bgBlack"
    elif "城" in name:
        return "castle"
    elif "マイク" in name:
        return "white_mic"
    elif "教会内" in name:
        return "church_inside"
    elif "戴冠" in name:
        return "charlemagne_coronation"
    elif name == "宮殿":
        return "palace"
    elif "宮殿内" in name:
        return "palace_inside"
    elif "手紙" in name:
        return "letter"
    elif "病室" in name:
        return "sickroom"
    elif "メルセン" in name or "ヴェルダン" in name:
        return "mersen_verdun"
    return None

def get_expression_id(char_id, expr_name):
    if not expr_name:
        return "normal"
    expr_name = expr_name.strip()
    if char_id == "clotilde":
        if "幼年期" in expr_name and "泣" in expr_name: return "childhood_cry"
        if "幼年期" in expr_name: return "childhood"
        if "怒り" in expr_name or "腕組" in expr_name: return "angry"
        if "憎しみ" in expr_name: return "hatred"
        if "涙" in expr_name or "泣き" in expr_name: return "cry"
        if "立ち絵" in expr_name: return "normal"
        if "驚き" in expr_name: return "surprised"
    elif char_id == "clovis":
        if "豪快" in expr_name: return "hearty"
        if "手紙" in expr_name: return "letter"
        if "まじめ" in expr_name: return "serious"
        if "挨拶" in expr_name: return "greeting"
        if "怒り" in expr_name: return "angry"
        if "池" in expr_name: return "pond"
        if "すねる" in expr_name or "腕組" in expr_name: return "pout"
    elif char_id == "charlemagne":
        if "満足" in expr_name: return "satisfied"
        if "訝し" in expr_name or "訝し気" in expr_name: return "puzzled"
        if "驚き" in expr_name: return "surprised"
        if "説得" in expr_name: return "persuade"
        if "納得" in expr_name: return "understand"
        if "問い" in expr_name: return "question"
        if "斧ふり" in expr_name: return "axe_swing"
        if "サイドチェスト" in expr_name: return "side_chest"
        if "フロントダブルバイセップス" in expr_name: return "front_double_biceps"
        if "スクワット" in expr_name: return "squat"
        if "立ち絵" in expr_name: return "normal"
        if "涙" in expr_name: return "normal"
    elif char_id == "desiderius":
        if "激怒" in expr_name: return "angry"
        if "絶望" in expr_name: return "despair"
    elif char_id == "leo3":
        if "困る" in expr_name: return "troubled"
        if "驚き" in expr_name: return "surprised"
        if "笑い" in expr_name or "笑み" in expr_name: return "smile"
        if "謝罪" in expr_name: return "apology"
        if "邪悪" in expr_name: return "evil"
    elif char_id == "irene":
        if "怒り" in expr_name: return "angry"
        if "メロメロ" in expr_name: return "in_love"
        if "照れ" in expr_name: return "blush"
        if "問い" in expr_name: return "question"
        if "決意" in expr_name: return "determined"
        if "立ち絵" in expr_name: return "normal"
    return "normal"

def normalize_tag(tag):
    tag = tag.strip()
    mapping = {
        "#verb_etre": "#etre",
        "#verb_avoir": "#avoir",
        "#regular_verbs_1_2": "#verbs",
        "#negation_basic": "#negation",
        "#prepositions_a_de": "#prepositions"
    }
    return mapping.get(tag, tag)

def parse_explanation_line(exp_line):
    line = exp_line.strip().lstrip("└").strip()
    if line.startswith("説明行:") or line.startswith("説明:") or line.startswith("解説:"):
        line = re.split(r'[:：]', line, 1)[1].strip()
    
    title = "語句解説"
    text = line
    
    parts = re.split(r'[=＝]', line, 1)
    if len(parts) == 2:
        title = parts[0].strip()
        text = parts[1].strip()
        if len(title) > 30:
            title = title[:27] + "..."
            
    return {
        "title": title,
        "text": text
    }

def parse_dialogue_segment(segment):
    m = re.match(r"^([^\s：:]+?)(?:\s*[（(]([^)）]+)[)）])?\s*[：:]\s*(.*)$", segment)
    if m:
        char_name = m.group(1).strip()
        expr_name = m.group(2)
        dialogue = m.group(3).strip()
        if dialogue.startswith("「") and dialogue.endswith("」"):
            dialogue = dialogue[1:-1].strip()
            
        char_key = char_map.get(char_name, None)
        expr_key = get_expression_id(char_key, expr_name) if char_key else None
        
        step = {
            "type": "dialog",
            "character": char_key,
            "text": dialogue,
            "position": "center"
        }
        if expr_key:
            step["expression"] = expr_key
        return step
    else:
        segment = segment.strip()
        if segment.startswith("「") and segment.endswith("」"):
            segment = segment[1:-1].strip()
        return {
            "type": "dialog",
            "character": None,
            "text": segment,
            "position": "center"
        }

def parse_episode_text(ep_lines, ep_num):
    sequence = []
    i = 0
    active_bg = "bgBlack"
    battle_idx = 0
    pending_shake = False
    pending_flash = None
    
    while i < len(ep_lines):
        line = ep_lines[i].strip()
        if not line:
            i += 1
            continue
            
        if "分）" in line or "分)" in line or "プレイ時間" in line:
            i += 1
            continue
            
        # Check background line
        bg_match = re.search(r"\[背景:\s*([^\]]+)\]", line) or re.search(r"背景[：:]\s*(.*)", line)
        if bg_match:
            bg_desc = bg_match.group(1).strip()
            if "揺れ" in bg_desc or "揺れる" in bg_desc:
                pending_shake = True
            if "切れる" in bg_desc or "点滅" in bg_desc or "黒点滅" in bg_desc:
                pending_flash = "black"
            elif "白点滅" in bg_desc or "フラッシュ" in bg_desc:
                pending_flash = "white"
            
        # Detect background change during parsing
        found_bg = None
        cleaned_line = line
        
        m_bg = re.search(r"\[背景:\s*([^\]]+)\]", line) or re.search(r"背景[：:]\s*(.*)", line)
        if m_bg:
            found_bg = m_bg.group(1).strip()
            cleaned_line = line.replace(m_bg.group(0), "").strip()
        else:
            if (']' in line or '[' in line or '背景' in line) and len(line) < 40:
                clean_line = line.replace('[', '').replace(']', '').replace('背景:', '').replace('背景', '').strip()
                mapped = map_bg(clean_line, ep_num)
                if mapped:
                    found_bg = clean_line
                    cleaned_line = ""
                    
        if found_bg:
            mapped_bg = map_bg(found_bg, ep_num)
            if mapped_bg:
                active_bg = mapped_bg
            cleaned_line = cleaned_line.replace("#", "").replace("＃", "").strip()
            if not cleaned_line:
                i += 1
                continue
            else:
                line = cleaned_line
                
        # Skip header lines, separator lines
        if line.startswith("###") or line.startswith("##") or line.startswith("---") or line.startswith("【第2-"):
            i += 1
            continue
            
        if "⚔️" in line:
            is_boss = "後半ボス" in line or "ボス" in line
            enemy_name = "歴史の試練"
            
            i += 1
            battle_tags = []
            while i < len(ep_lines):
                b_line = ep_lines[i].strip()
                if not b_line:
                    i += 1
                    continue
                if b_line.startswith("---") or b_line.startswith("###") or "⚔️" in b_line or b_line.startswith("【"):
                    break
                if b_line.startswith("[背景:") or b_line.startswith("### [背景:"):
                    break
                
                clean_b_line = b_line.lstrip("*").lstrip("-").strip()
                if "：" in clean_b_line or (":" in clean_b_line and not any(clean_b_line.startswith(p) for p in ["敵 /", "ボス名", "ボスHP", "出題タグ", "ノルマ", "敵のHP", "被ダメージ", "敵キャラクター", "出題範囲"])):
                    break
                    
                if clean_b_line.startswith("ボス名") or clean_b_line.startswith("敵 /") or clean_b_line.startswith("敵キャラクター"):
                    enemy_name = clean_b_line.split(":")[-1].strip().split("：")[-1].strip()
                elif clean_b_line.startswith("出題タグ:") or clean_b_line.startswith("出題範囲"):
                    tags_raw = clean_b_line.split(":")[-1].strip().split("：")[-1].strip()
                    # Extract tags and normalize
                    found_tags = re.findall(r"#[a-zA-Z0-9_]+", tags_raw)
                    battle_tags = [normalize_tag(t) for t in found_tags]
                i += 1
                
            battle_idx += 1
            hp = 7 if battle_idx <= 2 else 12
            
            criteria = []
            if battle_tags:
                count_per_tag = hp // len(battle_tags)
                remainder = hp % len(battle_tags)
                for idx, tag in enumerate(battle_tags):
                    added_count = count_per_tag + (1 if idx < remainder else 0)
                    criteria.append({
                        "tag": tag,
                        "count": added_count
                    })
            else:
                criteria = [{"tag": "#greetings", "count": hp}]
                
            ref_pages = []
            if ep_num == 1:
                if battle_idx == 1:
                    ref_pages = [
                        {"title": "定冠詞と不定冠詞", "referenceTopicId": "ref_definite_indefinite_articles", "sectionIndices": [0]},
                        {"title": "名詞の性（男性・女性名詞）", "referenceTopicId": "ref_noun_genders", "sectionIndices": [0]}
                    ]
                elif battle_idx == 2:
                    ref_pages = [
                        {"title": "存在動詞 être 活用", "referenceTopicId": "ref_essential_irregular_verbs", "sectionIndices": [3]}
                    ]
                else: # battle_idx == 3
                    ref_pages = [
                        {"title": "所有動詞 avoir 活用", "referenceTopicId": "ref_essential_irregular_verbs", "sectionIndices": [4]}
                    ]
            elif ep_num == 2:
                if battle_idx == 1:
                    ref_pages = [
                        {"title": "否定文の作り方 (ne ... pas)", "referenceTopicId": "ref_negation", "sectionIndices": [0]}
                    ]
                elif battle_idx == 2:
                    ref_pages = [
                        {"title": "場所・方向の前置詞", "referenceTopicId": "ref_prepositions", "sectionIndices": [0]}
                    ]
                else: # battle_idx == 3
                    ref_pages = [
                        {"title": "前置詞と定冠詞の縮約", "referenceTopicId": "ref_contracted_articles", "sectionIndices": [0, 1]}
                    ]
            elif ep_num == 3:
                if battle_idx == 1:
                    ref_pages = [
                        {"title": "基本形容詞と性数一致", "referenceTopicId": "ref_adjective_agreement", "sectionIndices": [0]}
                    ]
                else:
                    ref_pages = [
                        {"title": "動詞活用パターン", "referenceTopicId": "ref_conjugation_patterns", "sectionIndices": [0]}
                    ]
            elif ep_num == 4:
                if battle_idx == 1:
                    ref_pages = [
                        {"title": "命令法（指示と号令）", "referenceTopicId": "ref_imperative", "sectionIndices": [0]}
                    ]
                else:
                    ref_pages = [
                        {"title": "重要不規則動詞 (faire / prendre / mettre)", "referenceTopicId": "ref_essential_irregular_verbs", "sectionIndices": [0, 1, 2]}
                    ]
            elif ep_num == 5:
                ref_pages = [
                    {"title": "近接未来と近接過去 (近接過去)", "referenceTopicId": "ref_near_future_past", "sectionIndices": [1]}
                ]
            elif ep_num == 6:
                if battle_idx == 1:
                    ref_pages = [
                        {"title": "近接未来と近接過去 (近接未来)", "referenceTopicId": "ref_near_future_past", "sectionIndices": [0]}
                    ]
                else:
                    ref_pages = [
                        {"title": "代名動詞（自他・再帰）", "referenceTopicId": "ref_pronominal_verbs", "sectionIndices": [0]}
                    ]
            elif ep_num == 7:
                ref_pages = [
                    {"title": "代名動詞の受動用法", "referenceTopicId": "ref_pronominal_verbs", "sectionIndices": [1]}
                ]
            elif ep_num == 8:
                if battle_idx == 1:
                    ref_pages = [
                        {"title": "部分冠詞の基本用法", "referenceTopicId": "ref_partitive_articles", "sectionIndices": [0]}
                    ]
                elif battle_idx == 2:
                    ref_pages = [
                        {"title": "形容詞の位置と性数一致", "referenceTopicId": "ref_adjective_agreement", "sectionIndices": [0]}
                    ]
                else:
                    ref_pages = [
                        {"title": "前置詞と定冠詞の縮約", "referenceTopicId": "ref_contracted_articles", "sectionIndices": [0, 1]}
                    ]
            elif ep_num == 9:
                if battle_idx == 1:
                    ref_pages = [
                        {"title": "命令法（指示と号令）", "referenceTopicId": "ref_imperative", "sectionIndices": [0]}
                    ]
                elif battle_idx == 2:
                    ref_pages = [
                        {"title": "近接過去 (venir de + 原形)", "referenceTopicId": "ref_near_future_past", "sectionIndices": [1]}
                    ]
                else:
                    ref_pages = [
                        {"title": "縮約冠詞と近接未来の総合", "referenceTopicId": "ref_contracted_articles", "sectionIndices": [0]}
                    ]
                    
            if ref_pages:
                sequence.append({
                    "type": "tutorial",
                    "title": "事前解説 (Préparation)",
                    "goal": "練習問題の前に、以下の文法・表現をおさらいしましょう。",
                    "pages": ref_pages
                })
                
            sequence.append({
                "type": "fixedBattle",
                "enemyName": enemy_name,
                "enemyHp": hp,
                "enemyDamage": 2,
                "criteria": criteria
            })
            continue
            
        m_dialog = re.match(r"^([^\s：:]+?)(?:\s*[（(]([^)）]+)[)）])?\s*[：:]\s*(.*)$", line)
        if m_dialog or line.startswith("—") or line.startswith("（") or line.startswith("「"):
            dialogue_lines = [line]
            explanation_lines = []
            
            i += 1
            while i < len(ep_lines):
                next_line = ep_lines[i].strip()
                if not next_line:
                    i += 1
                    continue
                if next_line.startswith("└") or next_line.startswith("* └"):
                    explanation_lines.append(next_line)
                    i += 1
                    continue
                if re.match(r"^([^\s：:]+?)(?:\s*[（(]([^)）]+)[)）])?\s*[：:]\s*(.*)$", next_line):
                    break
                if next_line.startswith("「"):
                    break
                if next_line.startswith("###") or next_line.startswith("⚔️") or next_line.startswith("##") or next_line.startswith("【第2-") or next_line.startswith("[背景:"):
                    break
                
                dialogue_lines.append(next_line)
                i += 1
                
            full_text = "\n".join(dialogue_lines)
            sub_segments = full_text.split("→")
            for idx, seg in enumerate(sub_segments):
                seg = seg.strip()
                if not seg:
                    continue
                step = parse_dialogue_segment(seg)
                step["background"] = active_bg
                
                char_key = step.get("character")
                expr_key = step.get("expression", "normal")
                
                # Apply pending effects
                if pending_shake:
                    step["shake"] = True
                    pending_shake = False
                if pending_flash:
                    step["flash"] = pending_flash
                    pending_flash = None
                    
                # Character sprite logic
                if char_key and char_key != "hero":
                    no_sprite_chars = ["steward", "soldier", "assassin", "subordinate", "commander", "people", "east_subordinate", "child"]
                    is_monastery = active_bg in ["monastery"]
                    is_ep4 = ep_num == 4
                    is_coronation = active_bg == "charlemagne_coronation"
                    no_sprite_bgs = ["letter", "sickroom"]
                    
                    if char_key in no_sprite_chars or is_monastery or is_ep4 or active_bg in no_sprite_bgs:
                        step["characters"] = []
                    elif is_coronation:
                        if expr_key == "satisfied":
                            step["characters"] = [
                                {
                                    "id": char_key,
                                    "expression": expr_key,
                                    "position": "center"
                                }
                            ]
                        else:
                            step["characters"] = []
                    else:
                        step["characters"] = [
                            {
                                "id": char_key,
                                "expression": expr_key,
                                "position": "center"
                            }
                        ]
                else:
                    step["characters"] = []
                    
                if idx == len(sub_segments) - 1 and explanation_lines:
                    lp_text_parts = []
                    lp_title = "語句解説"
                    for exp_l in explanation_lines:
                        lp_parsed = parse_explanation_line(exp_l)
                        if lp_parsed["title"] != "語句解説":
                            lp_title = lp_parsed["title"]
                        lp_text_parts.append(lp_parsed["text"])
                    step["learningPoint"] = {
                        "title": lp_title,
                        "text": "\n".join(lp_text_parts)
                    }
                    
                sequence.append(step)
            continue
            
        if not line.startswith("---") and not line.startswith("【第2-"):
            step = {
                "type": "dialog",
                "character": None,
                "text": line,
                "position": "center",
                "background": active_bg,
                "characters": []
            }
            if pending_shake:
                step["shake"] = True
                pending_shake = False
            if pending_flash:
                step["flash"] = pending_flash
                pending_flash = None
            sequence.append(step)
            
        i += 1
        
    return sequence

def scale_criteria(criteria, target):
    if not criteria:
        return []
    total = sum(c.get('count', 1) for c in criteria)
    if total == 0:
        for c in criteria:
            c['count'] = 1
        total = len(criteria)
    current_sum = 0
    for c in criteria:
        orig = c.get('count', 1)
        new_val = max(1, round(target * orig / total))
        c['count'] = new_val
        current_sum += new_val
    while current_sum != target:
        if current_sum < target:
            idx = max(range(len(criteria)), key=lambda i: criteria[i]['count'])
            criteria[idx]['count'] += 1
            current_sum += 1
        else:
            idx = max(range(len(criteria)), key=lambda i: criteria[i]['count'] if criteria[i]['count'] > 1 else -1)
            if criteria[idx]['count'] > 1:
                criteria[idx]['count'] -= 1
                current_sum -= 1
            else:
                break
    return criteria

def main():
    print(f"Reading drafts from {draft_path}...")
    if not os.path.exists(draft_path):
        print(f"Error: {draft_path} not found!")
        return
        
    with open(draft_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    matches = list(re.finditer(r"(?:##? )?【第2-(\d+)話\s+([^】\n]+)】", content))
    valid_matches = []
    for m in matches:
        ep_num = int(m.group(1))
        title = m.group(2).strip()
        if "クリア" not in title:
            valid_matches.append((ep_num, title, m.start(), m.end()))
            
    # Load existing chapter_2.json if it exists
    existing_chapter_data = None
    if os.path.exists(dest_file):
        try:
            with open(dest_file, 'r', encoding='utf-8') as f:
                existing_chapter_data = json.load(f)
            print(f"Loaded existing chapter data from {dest_file}")
        except Exception as e:
            print(f"Warning: Failed to load existing {dest_file}: {e}")

    episodes = []
    # If we have existing data, we keep its episodes as base
    existing_episodes_map = {}
    if existing_chapter_data and "episodes" in existing_chapter_data:
        for ep in existing_chapter_data["episodes"]:
            existing_episodes_map[ep["episodeId"]] = ep

    for idx, (ep_num, ep_title, start_pos, end_pos) in enumerate(valid_matches):
        print(f"Compiling Episode 2-{ep_num}: {ep_title}...")
        next_start = valid_matches[idx+1][2] if idx+1 < len(valid_matches) else len(content)
        ep_text = content[end_pos:next_start]
        lines = ep_text.split("\n")
        
        sequence = parse_episode_text(lines, ep_num)
        
        # Scale fixedBattle HP & criteria
        battle_idx = 0
        scaled_sequence = []
        for s in sequence:
            if s.get('type') == 'fixedBattle':
                battle_idx += 1
                target_hp = 7 if battle_idx <= 2 else 12
                s['enemyHp'] = target_hp
                s['criteria'] = scale_criteria(s.get('criteria', []), target_hp)
            scaled_sequence.append(s)
            
        scaled_sequence.append({
            "type": "reward",
            "xp": 120 + ep_num * 10,
            "unlockedEpisodeId": f"ep_2_{ep_num+1}" if ep_num < 9 else None
        })
        
        # Decide characters map based on ep_num
        if ep_num == 7:
            ep_characters = {
                "hero": { "name": "主人公" },
                "charlemagne": {
                    "name": "カール大帝",
                    "images": {
                        "default": "assets/story/chapter_2/カール大帝立ち絵.png",
                        "normal": "assets/story/chapter_2/カール大帝立ち絵.png",
                        "satisfied": "assets/story/chapter_2/カール大帝満足.png",
                        "puzzled": "assets/story/chapter_2/カール大帝訝し.png",
                        "surprised": "assets/story/chapter_2/カール大帝驚き.png",
                        "persuade": "assets/story/chapter_2/カール大帝説得.png",
                        "understand": "assets/story/chapter_2/カール大帝納得.png",
                        "question": "assets/story/chapter_2/カール大帝問い.png",
                        "axe_swing": "assets/story/chapter_2/カール大帝斧ふり戦闘.png"
                    }
                },
                "desiderius": {
                    "name": "デシデリウス",
                    "images": {
                        "default": "assets/story/chapter_2/デシデリウス激怒.png",
                        "normal": "assets/story/chapter_2/デシデリウス激怒.png",
                        "angry": "assets/story/chapter_2/デシデリウス激怒.png",
                        "despair": "assets/story/chapter_2/デシデリウス絶望.png"
                    }
                },
                "leo3": {
                    "name": "教皇（レオ3世）",
                    "images": {
                        "default": "assets/story/chapter_2/Gemini_Generated_Image_.webp",
                        "normal": "assets/story/chapter_2/Gemini_Generated_Image_.webp",
                        "troubled": "assets/story/chapter_2/教皇困る.webp",
                        "surprised": "assets/story/chapter_2/教皇驚き.webp",
                        "smile": "assets/story/chapter_2/教皇笑み.webp",
                        "apology": "assets/story/chapter_2/教皇謝罪.webp",
                        "evil": "assets/story/chapter_2/教皇邪悪.webp"
                    }
                },
                "subordinate": { "name": "部下" },
                "commander": { "name": "指揮官" },
                "people": { "name": "民衆" }
            }
        elif ep_num in [8, 9]:
            ep_characters = {
                "hero": { "name": "主人公" },
                "charlemagne": {
                    "name": "カール大帝",
                    "images": {
                        "default": "assets/story/chapter_2/カール大帝立ち絵.png",
                        "normal": "assets/story/chapter_2/カール大帝立ち絵.png",
                        "satisfied": "assets/story/chapter_2/カール大帝満足.png",
                        "puzzled": "assets/story/chapter_2/カール大帝訝し.png",
                        "surprised": "assets/story/chapter_2/カール大帝驚き.png",
                        "persuade": "assets/story/chapter_2/カール大帝説得.png",
                        "understand": "assets/story/chapter_2/カール大帝納得.png",
                        "question": "assets/story/chapter_2/カール大帝問い.png",
                        "axe_swing": "assets/story/chapter_2/カール大帝斧ふり戦闘.png",
                        "side_chest": "assets/story/chapter_2/カール大帝サイドチェスト.png",
                        "front_double_biceps": "assets/story/chapter_2/カール大帝フロントダブルバイセップス.png",
                        "squat": "assets/story/chapter_2/カール大帝スクワット.png"
                    }
                },
                "irene": {
                    "name": "エイレーネー",
                    "images": {
                        "default": "assets/story/chapter_2/エイレーネー立ち絵.png",
                        "normal": "assets/story/chapter_2/エイレーネー立ち絵.png",
                        "angry": "assets/story/chapter_2/エイレーネー怒り.png",
                        "in_love": "assets/story/chapter_2/エイレーネーメロメロ.png",
                        "blush": "assets/story/chapter_2/エイレーネー照れ.png",
                        "question": "assets/story/chapter_2/エイレーネー問い.png",
                        "determined": "assets/story/chapter_2/エイレーネー決意.png"
                    }
                },
                "east_subordinate": { "name": "東ローマの部下" },
                "child": { "name": "子供" },
                "subordinate": { "name": "部下" }
            }
        else:
            ep_characters = {
                "hero": { "name": "主人公" },
                "clotilde": {
                    "name": "クロティルダ",
                    "images": {
                        "default": "assets/story/chapter_2/クロティルダ立ち絵.webp",
                        "normal": "assets/story/chapter_2/クロティルダ立ち絵.webp",
                        "childhood": "assets/story/chapter_2/クロティルダ幼年期.webp",
                        "childhood_cry": "assets/story/chapter_2/クロティルダ幼年期泣き.webp",
                        "cry": "assets/story/chapter_2/クロティルダ泣き.webp",
                        "angry": "assets/story/chapter_2/クロティルダ怒り.webp",
                        "hatred": "assets/story/chapter_2/クロティルダ憎しみ.webp",
                        "surprised": "assets/story/chapter_2/クロティルダ驚き.webp"
                    }
                },
                "clovis": {
                    "name": "クローヴィス",
                    "images": {
                        "default": "assets/story/chapter_2/クローヴィス豪快.webp",
                        "normal": "assets/story/chapter_2/クローヴィス豪快.webp",
                        "hearty": "assets/story/chapter_2/クローヴィス豪快.webp",
                        "letter": "assets/story/chapter_2/クローヴィス手紙.webp",
                        "serious": "assets/story/chapter_2/クローヴィスまじめ.webp",
                        "greeting": "assets/story/chapter_2/クローディス挨拶.webp",
                        "angry": "assets/story/chapter_2/クローヴィス怒り.webp",
                        "pond": "assets/story/chapter_2/クローヴィス池.webp",
                        "pout": "assets/story/chapter_2/すねる.webp"
                    }
                },
                "steward": { "name": "執事" },
                "soldier": { "name": "一般兵" },
                "assassin": { "name": "暗殺者" }
            }

        new_ep = {
            "episodeId": f"ep_2_{ep_num}",
            "episodeTitle": f"第2-{ep_num}話: {ep_title}",
            "recommendedPlayTime": "5 mins",
            "backgrounds": background_urls,
            "characters": ep_characters,
            "sequence": scaled_sequence
        }
        existing_episodes_map[new_ep["episodeId"]] = new_ep

    # Reconstruct episodes list in sorted order
    sorted_ep_ids = sorted(existing_episodes_map.keys(), key=lambda x: [int(c) for c in re.findall(r'\d+', x)])
    merged_episodes = [existing_episodes_map[ep_id] for ep_id in sorted_ep_ids]
    
    chapter_data = {
        "chapterId": "ch_2",
        "chapterTitle": "第2章: ゲルマンの大移動とフランク王国の誕生",
        "notes": "西ローマ滅亡後のゲルマン大移動と、フランク王国クローヴィスとクロティルダの出会い。冠詞、名詞の性、動詞être・avoirの基本、前置詞・否定表現・縮約を学びます。",
        "episodes": merged_episodes
    }
    
    os.makedirs(os.path.dirname(dest_file), exist_ok=True)
    with open(dest_file, 'w', encoding='utf-8') as f:
        json.dump(chapter_data, f, ensure_ascii=False, indent=2)
    print(f"Saved compiled VN JSON to {dest_file}")

if __name__ == "__main__":
    main()
