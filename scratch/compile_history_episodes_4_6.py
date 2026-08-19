import os
import re
import json
import sys

# Configure stdout to handle UTF-8 printing without crashing on Windows
sys.stdout.reconfigure(encoding='utf-8')

workspace_dir = r"c:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"
draft_path = os.path.join(workspace_dir, "rpg", "history", "draft_story.md")
dest_file = os.path.join(workspace_dir, "rpg", "history", "chapter_1.json")

char_map = {
    "主人公": "hero",
    "ファビウス": "fabius",
    "カエサル": "caesar",
    "ティトゥス・ラヴィエヌス": "labienus",
    "ラヴィエヌス": "labienus",
    "ウェルキンゲトリクス": "vercingetorix",
    "小さな娘": "girl",
    "娘": "girl",
    "老婆": "old_woman"
}

background_urls = {
    "bgBlack": "#000000",
    "battlefield": "url('assets/story/chapter_1/戦場.webp')",
    "camp_morning": "url('assets/story/chapter_1/野営地朝.webp')",
    "assembly": "url('assets/story/chapter_1/朝集会.webp')",
    "camp_night": "url('assets/story/chapter_1/野営地夜.webp')",
    "forest": "url('assets/story/chapter_1/森.webp')",
    "village": "url('assets/story/chapter_1/村.webp')",
    "village_empty": "url('assets/story/chapter_1/もぬけの殻の村.webp')",
    "vercingetorix_camp": "url('assets/story/chapter_1/ウェルキンゲトリクス陣営.webp')",
    "gaul_camp": "url('assets/story/chapter_1/ガリア陣営.webp')",
    "avaricum_siege": "url('assets/story/chapter_1/アウァーリクム包囲戦.webp')",
    "gergovia_mountain": "url('assets/story/chapter_1/ゲルゴウィアの山.webp')",
    "alesia_siege": "url('assets/story/chapter_1/アレシア包囲戦.webp')",
    "alesia_sunset": "url('assets/story/chapter_1/アレシア包囲戦.webp')",
    "alesia_surrender": "url('assets/story/chapter_1/ウェルキンゲトリクス降伏.webp')"
}

def map_bg(name):
    name = name.replace('[', '').replace(']', '').replace('背景:', '').replace('背景', '').strip()
    if "森" in name:
        return "forest"
    elif "野営地" in name and "夜" in name:
        return "camp_night"
    elif "野営地" in name and "朝" in name:
        return "camp_morning"
    elif "集会" in name or "朝の集会" in name or "朝集会" in name:
        return "assembly"
    elif "もぬけの殻" in name:
        return "village_empty"
    elif "村" in name:
        return "village"
    elif "陣営" in name:
        if "ガリア" in name:
            return "gaul_camp"
        return "vercingetorix_camp"
    elif "アウァーリクム" in name or "包囲戦" in name:
        if "アレシア" in name:
            return "alesia_siege"
        return "avaricum_siege"
    elif "ゲルゴウィア" in name or "山" in name:
        return "gergovia_mountain"
    elif "アレシア" in name or "夕暮れ" in name or "降伏" in name:
        if "降伏" in name:
            return "alesia_surrender"
        elif "夕暮れ" in name:
            return "alesia_sunset"
        return "alesia_siege"
    elif "黒" in name:
        return "bgBlack"
    return None

def get_expression_id(char_id, expr_name):
    if not expr_name:
        return "normal"
    expr_name = expr_name.strip()
    if "戦い" in expr_name or "戦闘" in expr_name:
        return "combat"
    if char_id == "fabius":
        if "直立" in expr_name: return "normal"
        if "本" in expr_name: return "book"
        if "病" in expr_name or "ファビウス病" in expr_name: return "sick"
    elif char_id == "caesar":
        if "てへぺろ" in expr_name: return "tehepero"
        if "後光" in expr_name: return "halo"
        if "腕組" in expr_name: return "arms_crossed"
        if "降馬" in expr_name: return "dismount"
        if "怒り" in expr_name: return "angry"
        if "輝き" in expr_name: return "bald_sparkle"
        if "驚き" in expr_name: return "surprised"
        if "緋色のマント" in expr_name: return "red_mantle"
        if "戦闘加熱" in expr_name: return "combat_heat"
    elif char_id == "vercingetorix":
        if "戦闘加熱" in expr_name: return "combat_heat"
        if "決着" in expr_name: return "settlement"
        if "降伏" in expr_name: return "surrender"
    elif char_id == "labienus":
        if "直立" in expr_name: return "normal"
        if "喝" in expr_name: return "scold"
        if "腕組" in expr_name: return "arms_crossed"
        if "怒り" in expr_name: return "angry"
        if "呆れ白黒" in expr_name: return "disappointed_bw"
        if "呆れ" in expr_name: return "disappointed"
        if "驚き" in expr_name: return "surprised"
    return "normal"

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
        elif dialogue.startswith("（") and dialogue.endswith("）"):
            dialogue = dialogue
            
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
    
    while i < len(ep_lines):
        line = ep_lines[i].strip()
        if not line:
            i += 1
            continue
            
        # Skip play time remnants
        if "分）" in line or "分)" in line or "プレイ時間" in line:
            i += 1
            continue
            
        # Detect background change during parsing
        found_bg = None
        cleaned_line = line
        
        m_bg = re.search(r"\[背景:\s*([^\]]+)\]", line)
        if m_bg:
            found_bg = m_bg.group(1).strip()
            cleaned_line = line.replace(m_bg.group(0), "").strip()
        else:
            if (']' in line or '[' in line or '背景' in line) and len(line) < 40:
                clean_line = line.replace('[', '').replace(']', '').replace('背景:', '').replace('背景', '').strip()
                mapped = map_bg(clean_line)
                if mapped:
                    found_bg = clean_line
                    cleaned_line = ""
                    
        if found_bg:
            mapped_bg = map_bg(found_bg)
            if mapped_bg:
                active_bg = mapped_bg
            cleaned_line = cleaned_line.replace("#", "").replace("＃", "").strip()
            if not cleaned_line:
                i += 1
                continue
            else:
                line = cleaned_line
                
        # Skip header lines, separator lines, and scene title lines
        if line.startswith("###") or line.startswith("##") or line.startswith("＃＃＃") or line.startswith("＃＃") or line.startswith("---") or line.startswith("【第1-"):
            i += 1
            continue
            
        if "⚔️" in line:
            is_boss = "後半ボス" in line or "ボス" in line
            enemy_name = "ガリア兵"
            
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
                if "：" in clean_b_line or (":" in clean_b_line and not any(clean_b_line.startswith(p) for p in ["敵 /", "ボス名", "ボスHP", "出題タグ", "ノルマ", "敵のHP", "被ダメージ"])):
                    break
                    
                if clean_b_line.startswith("ボス名") or clean_b_line.startswith("敵 /") or clean_b_line.startswith("敵キャラクター"):
                    enemy_name = clean_b_line.split(":")[-1].strip().split("：")[-1].strip()
                elif clean_b_line.startswith("出題タグ:") or clean_b_line.startswith("出題範囲"):
                    tags_raw = clean_b_line.split(":")[-1].strip().split("：")[-1].strip()
                    battle_tags = re.findall(r"#[a-zA-Z0-9_]+", tags_raw)
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
            if ep_num == 4:
                if not is_boss:
                    ref_pages = [
                        {"title": "場所を表す前置詞 (Prepositions de Lieu)", "referenceTopicId": "ref_prepositions", "sectionIndices": [0]}
                    ]
                else:
                    ref_pages = [
                        {"title": "前置詞による指示・質問", "referenceTopicId": "ref_prepositions", "sectionIndices": [0]},
                        {"title": "基本的な質問形式", "referenceTopicId": "ref_questions", "sectionIndices": [0]}
                    ]
            elif ep_num == 5:
                if not is_boss:
                    ref_pages = [
                        {"title": "指示形容詞 (ce / cette / ces)", "referenceTopicId": "ref_demonstrative_adjectives", "sectionIndices": [0]}
                    ]
                else:
                    ref_pages = [
                        {"title": "所有形容詞 (mon / ton / son / notre...)", "referenceTopicId": "ref_possessive_adjectives", "sectionIndices": [0]}
                    ]
            elif ep_num == 6:
                if not is_boss:
                    ref_pages = [
                        {"title": "重要不規則動詞 (aller / venir)", "referenceTopicId": "ref_essential_irregular_verbs", "sectionIndices": [0, 1]}
                    ]
                else:
                    ref_pages = [
                        {"title": "自動詞と他動詞の概念", "referenceTopicId": "ref_verb_groups", "sectionIndices": [0]}
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
                if next_line.startswith("###") or next_line.startswith("⚔️") or next_line.startswith("##") or next_line.startswith("【第1-") or next_line.startswith("[背景:"):
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
                if char_key and char_key != "hero":
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
            
        if not line.startswith("---") and not line.startswith("【第1-"):
            step = {
                "type": "dialog",
                "character": None,
                "text": line,
                "position": "center",
                "background": active_bg,
                "characters": []
            }
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
        
    # 1. Parse Ep 1-1 Correction
    m_correction = re.search(r"【第一話冒頭修正】\s*(.*?)(?=\n【第1-|$)", content, re.DOTALL)
    corrected_steps = []
    if m_correction:
        print("Parsing corrected steps for Episode 1-1...")
        lines = m_correction.group(1).split("\n")
        corrected_steps = parse_episode_text(lines, 1)
        # Force background to battlefield for these initial scenes
        for s in corrected_steps:
            if s.get('type') == 'dialog':
                s['background'] = 'battlefield'
                
    # 2. Parse Episodes 1-4, 1-5, and 1-6
    matches = list(re.finditer(r"(?:##? )?【第1-(\d)話\s+([^】\n]+)】", content))
    valid_matches = []
    for m in matches:
        ep_num = int(m.group(1))
        title = m.group(2).strip()
        if "クリア" not in title:
            valid_matches.append((ep_num, title, m.start(), m.end()))
            
    new_episodes_data = []
    for idx, (ep_num, ep_title, start_pos, end_pos) in enumerate(valid_matches):
        print(f"Compiling Episode 1-{ep_num}: {ep_title}...")
        next_start = valid_matches[idx+1][2] if idx+1 < len(valid_matches) else len(content)
        ep_text = content[end_pos:next_start]
        lines = ep_text.split("\n")
        
        sequence = parse_episode_text(lines, ep_num)
        sequence.append({
            "type": "reward",
            "xp": 100,
            "unlockedEpisodeId": f"ep_1_{ep_num+1}" if ep_num < 6 else None
        })
        
        new_episodes_data.append({
            "episodeId": f"ep_1_{ep_num}",
            "episodeTitle": f"第1-{ep_num}話: {ep_title}",
            "recommendedPlayTime": "5 mins",
            "backgrounds": background_urls,
            "characters": {
                "hero": { "name": "主人公" },
                "fabius": {
                    "name": "ファビウス",
                    "images": {
                        "default": "assets/story/chapter_1/ファビウス直立.webp",
                        "normal": "assets/story/chapter_1/ファビウス直立.webp",
                        "book": "assets/story/chapter_1/ファビウス本.webp",
                        "sick": "assets/story/chapter_1/ファビウス病.webp"
                    }
                },
                "caesar": {
                    "name": "カエサル",
                    "images": {
                        "default": "assets/story/chapter_1/カエサル.webp",
                        "normal": "assets/story/chapter_1/カエサル.webp",
                        "tehepero": "assets/story/chapter_1/カエサルてへぺろ.webp",
                        "halo": "assets/story/chapter_1/カエサル後光.webp",
                        "arms_crossed": "assets/story/chapter_1/カエサル腕組.webp",
                        "dismount": "assets/story/chapter_1/カエサル降馬a.webp",
                        "angry": "assets/story/chapter_1/カエサル静かな怒り.webp",
                        "bald_sparkle": "assets/story/chapter_1/カエサル頭の輝き.webp",
                        "surprised": "assets/story/chapter_1/カエサル驚き.webp",
                        "combat": "assets/story/chapter_1/カエサル戦い.webp",
                        "red_mantle": "assets/story/chapter_1/カエサル緋色のマント.webp",
                        "combat_heat": "assets/story/chapter_1/カエサル戦闘加熱.webp"
                    }
                },
                "labienus": {
                    "name": "ティトゥス・ラヴィエヌス",
                    "images": {
                        "default": "assets/story/chapter_1/ラヴィエヌス副司令官直立.webp",
                        "normal": "assets/story/chapter_1/ラヴィエヌス副司令官直立.webp",
                        "scold": "assets/story/chapter_1/ラヴィエヌス副司令官喝.webp",
                        "arms_crossed": "assets/story/chapter_1/ラヴィエヌス副司令官腕組.webp",
                        "angry": "assets/story/chapter_1/ラヴィエヌス副司令官静かな怒り.webp",
                        "disappointed": "assets/story/chapter_1/ラヴィエヌス呆れ.webp",
                        "disappointed_bw": "assets/story/chapter_1/ラヴィエヌス呆れ白黒.webp",
                        "combat": "assets/story/chapter_1/ラヴィエヌス戦い.webp",
                        "surprised": "assets/story/chapter_1/ラヴィエヌス驚き.webp"
                    }
                },
                "vercingetorix": {
                    "name": "ウェルキンゲトリクス",
                    "images": {
                        "default": "assets/story/chapter_1/ウェルキンゲトリクス.webp",
                        "normal": "assets/story/chapter_1/ウェルキンゲトリクス.webp",
                        "combat": "assets/story/chapter_1/ウェルキンゲトリクス戦い.webp",
                        "combat_heat": "assets/story/chapter_1/ウェルキンゲトリクス戦闘加熱.webp",
                        "settlement": "assets/story/chapter_1/ウェルキンゲトリクス決着.webp",
                        "surrender": "assets/story/chapter_1/ウェルキンゲトリクス降伏.webp"
                    }
                },
                "girl": {
                    "name": "小さな娘",
                    "images": {
                        "default": "assets/story/chapter_1/村娘.webp",
                        "normal": "assets/story/chapter_1/村娘.webp"
                    }
                },
                "old_woman": {
                    "name": "老婆",
                    "images": {
                        "default": "assets/story/chapter_1/村おばあちゃん.webp",
                        "normal": "assets/story/chapter_1/村おばあちゃん.webp"
                    }
                }
            },
            "sequence": sequence
        })

    # 3. Load existing chapter_1.json and integrate
    print(f"Loading existing JSON from {dest_file}...")
    with open(dest_file, 'r', encoding='utf-8') as f:
        dest_data = json.load(f)
        
    # Update Episode 1-1 beginning in existing data
    if corrected_steps:
        ep_1_1 = next((ep for ep in dest_data['episodes'] if ep['episodeId'] == 'ep_1_1'), None)
        if ep_1_1:
            print("  Applying correction to Episode 1-1 sequence...")
            orig_seq = ep_1_1['sequence']
            split_idx = -1
            for idx, s in enumerate(orig_seq):
                if s.get('type') == 'dialog' and s.get('character') == 'hero' and 'んにゃむにゃ' in s.get('text', ''):
                    split_idx = idx
                    break
            if split_idx != -1:
                # Merge corrected steps with the rest of orig_seq
                ep_1_1['sequence'] = corrected_steps + orig_seq[split_idx:]
                print(f"    Episode 1-1 sequence updated. Removed steps 0-{split_idx-1}, inserted {len(corrected_steps)} corrected steps.")
            else:
                print("    Warning: Could not find split point in ep_1_1 sequence. Preserving original sequence.")
                
    # Integrate/append new episodes
    for new_ep in new_episodes_data:
        ep_id = new_ep['episodeId']
        existing_idx = next((i for i, ep in enumerate(dest_data['episodes']) if ep['episodeId'] == ep_id), -1)
        if existing_idx != -1:
            dest_data['episodes'][existing_idx] = new_ep
            print(f"  Replaced existing {ep_id} with newly compiled version.")
        else:
            dest_data['episodes'].append(new_ep)
            print(f"  Appended new episode {ep_id}.")
            
    # 4. FINAL POST-PROCESSING PASS ON ALL EPISODES
    print("Running final propagation, effect injection, and HP scaling pass on all episodes...")
    for ep in dest_data.get('episodes', []):
        ep_id = ep['episodeId']
        
        # Initialize active_bg to the first non-bgBlack background in the sequence
        active_bg = "bgBlack"
        for s in ep.get('sequence', []):
            bg = s.get('background')
            if bg and bg != "bgBlack":
                active_bg = bg
                break
                
        new_seq = []
        battle_idx = 0
        
        for idx, s in enumerate(ep.get('sequence', [])):
            # Scale battle HP/criteria
            if s.get('type') == 'fixedBattle':
                battle_idx += 1
                target_hp = 7 if battle_idx <= 2 else 12
                s['enemyHp'] = target_hp
                s['criteria'] = scale_criteria(s.get('criteria', []), target_hp)
                new_seq.append(s)
                continue
            
            if s.get('type') != 'dialog':
                new_seq.append(s)
                continue
                
            text = s.get('text', '').strip()
            
            # Skip remnants
            if "約5分）" in text:
                continue
                
            # SPECIAL CASE: Episode 1-1
            if ep_id == "ep_1_1":
                if idx < 3:
                    s['background'] = 'battlefield'
                    new_seq.append(s)
                    continue
                elif idx == 3: # Waking up step (んにゃむにゃ…。はっ！！)
                    active_bg = 'camp_morning'
                    s['background'] = active_bg
                    s['flash'] = 'black'
                    s['shake'] = True
                    new_seq.append(s)
                    continue
                elif "全軍集合" in text:
                    active_bg = 'assembly'
                elif "はあ……なんとか" in text:
                    active_bg = 'camp_night'
                    
                s['background'] = active_bg
                new_seq.append(s)
                continue
            
            # NORMAL CASE: Extract backgrounds
            found_bg = None
            cleaned_text = text
            
            m_bg = re.search(r"\[背景:\s*([^\]]+)\]", text)
            if m_bg:
                found_bg = m_bg.group(1).strip()
                cleaned_text = text.replace(m_bg.group(0), "").strip()
            else:
                if (']' in text or '[' in text or '背景' in text) and len(text) < 40:
                    clean_line = text.replace('[', '').replace(']', '').replace('背景:', '').replace('背景', '').strip()
                    mapped = map_bg(clean_line)
                    if mapped:
                        found_bg = clean_line
                        cleaned_text = ""
            
            if found_bg:
                mapped_bg = map_bg(found_bg)
                if mapped_bg:
                    active_bg = mapped_bg
                    print(f"  Final Pass: Changed background to '{active_bg}' based on '{found_bg}' in {ep_id}")
                if not cleaned_text:
                    continue
                else:
                    s['text'] = cleaned_text
                    
            # If the step already has a background set (from compilation), use it to update active_bg
            current_bg = s.get('background')
            if current_bg and current_bg != "bgBlack":
                active_bg = current_bg
            else:
                s['background'] = active_bg
            new_seq.append(s)
            
        ep['sequence'] = new_seq
        print(f"  {ep_id} final sequence size: {len(new_seq)}")
        
    # Sort episodes by episodeId numerically to ensure correct ordering
    dest_data['episodes'].sort(key=lambda ep: [int(x) for x in re.findall(r'\d+', ep.get('episodeId', ''))])

    # Save the final merged chapter_1.json
    with open(dest_file, 'w', encoding='utf-8') as f:
        json.dump(dest_data, f, ensure_ascii=False, indent=2)
    print(f"Saved integrated JSON back to {dest_file}")
    
    # Overwrite draft_story.md with the new comprehensive template for Chapter 2
    write_chapter_2_template()
    print("Done compiling and generated Chapter 2 template!")

def write_chapter_2_template():
    template_content = """# History RPG - ドラフトストーリー (下書きテンプレート)

## 📝 書き方の解説・ルール
1. **エピソードの定義**
   `【第X-Y話 タイトル】（目安プレイ時間: 約5分）` という形式で記述してください。
   
2. **背景の指定方法 (※重要)**
   背景を切り替える際は、独立した行で `[背景: 背景名]` と指定してください。
   （例: `[背景: 森]`、`[背景: 野営地 / 朝]` など）
   * 一度指定した背景は、次の `[背景: ○○]` の指示があるまで、対話中も自動的に引き継がれ、使い回されます。暗黒画面（`bgBlack`）に戻ることはありません。
   
3. **セリフと解説の記述**
   `キャラクター名（表情指定）：「セリフ内容」` の形式で記述してください。
   * そのセリフに対する文法や単語の解説を付けたい場合は、直後に ` └解説：フランス語＝「意味」` のように ` └解説：` または ` └説明行：` を繋げて書いてください。
   
4. **バトルの記述**
   バトルは `⚔️ 【前半バトル: タイトル】` または `⚔️ 【後半ボスバトル: タイトル】` の見出しの下に、以下の情報を並べてください。
   - `敵 / 試練名: 敵の名前 / 試練の内容`
   - `出題タグ: #タグ名 (問題数)`
   * 問題数は、修行ストーリー/歴史体験ともに、全話統一で **前半バトル: 7問、後半ボスバトル: 7問、第3バトル（ある場合）: 12問** の固定HPになります。タグCriteriaの配分は自動的に比例スケーリングされます。
   
5. **クリア報酬**
   各話の最後に `【第X-Y話 クリア！】 報酬: アイテム名×1、経験値 80 Exp` と記述してください。

---

## ✍️ ドラフト作成用テンプレート (ここから上を消して原稿を記述してください)

【第2-1話 エピソードのタイトル】（目安プレイ時間: 約5分）
[背景: 森]
ナレーション: 森の奥深くを進む一行。
カエサル（通常）：「フランス語で指示をする時は、命令形を使う必要があるな。」
主人公：「なるほど。では、Parlez !（話しなさい！）ですね。」
 └解説：Parlez = 「話してください、話しなさい」（parler の vous に対する命令形）。

⚔️ 【前半バトル: 命令形の小テスト】
敵 / 試練名: 森の入り口の関所 / 命令文の作成
出題タグ: #imperative (2問), #verbs (1問)

[背景: 宿屋]
ナレーション: 宿屋に到着した一行。
ティトゥス・ラヴィエヌス（怒り）：「この宿屋には誰もいないのか！？」

⚔️ 【後半ボスバトル: 宿屋の捜索】
ボス名 / 試練名: 宿屋の防衛システム / 前置詞と疑問文
出題タグ: #prepositions (3問), #questions (2問)

【第2-1話 クリア！】 報酬: 木の鍵×1、経験値 80 Exp
"""
    with open(draft_path, 'w', encoding='utf-8') as f:
        f.write(template_content)

if __name__ == "__main__":
    main()
