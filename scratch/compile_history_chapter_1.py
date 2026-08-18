import os
import re
import json

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

def get_background_id(bg_name):
    bg_name = bg_name.strip()
    if "戦場" in bg_name:
        return "battlefield"
    elif "野営地" in bg_name and "夜" in bg_name:
        return "camp_night"
    elif "野営地" in bg_name and "朝" in bg_name:
        return "camp_morning"
    elif "集会" in bg_name or "朝の集会" in bg_name:
        return "assembly"
    elif "森" in bg_name:
        return "forest"
    elif "村" in bg_name or "農村" in bg_name:
        return "village"
    elif "ウェルキンゲトリクス" in bg_name or "陣営" in bg_name:
        return "vercingetorix_camp"
    elif "黒" in bg_name:
        return "bgBlack"
    else:
        return "bgBlack"

def get_expression_id(char_id, expr_name):
    if not expr_name:
        return "normal"
    expr_name = expr_name.strip()
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
    elif char_id == "labienus":
        if "直立" in expr_name: return "normal"
        if "喝" in expr_name: return "scold"
        if "腕組" in expr_name: return "arms_crossed"
        if "怒り" in expr_name: return "angry"
        if "呆れ白黒" in expr_name: return "disappointed_bw"
        if "呆れ" in expr_name: return "disappointed"
    return "normal"

def parse_explanation_line(exp_line):
    line = exp_line.strip().lstrip("└").strip()
    if line.startswith("説明行:") or line.startswith("説明:"):
        line = line.split(":", 1)[1].strip()
    
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

def clean_dialogue_text(text):
    # Remove standard formatting characters if any, but retain arrows etc.
    return text.strip()

def parse_dialogue_segment(segment):
    # Match Speaker: 「Text」 or Speaker: Text
    # Handles Japanese and English colons
    m = re.match(r"^([^\s：:]+?)(?:\s*[（(]([^)）]+)[)）])?\s*[：:]\s*(.*)$", segment)
    if m:
        char_name = m.group(1).strip()
        expr_name = m.group(2)
        dialogue = m.group(3).strip()
        # Strip quotes if present
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
        # Narrator text
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
    
    while i < len(ep_lines):
        line = ep_lines[i].strip()
        if not line:
            i += 1
            continue
            
        # Background transition
        if line.startswith("### [背景:"):
            m = re.match(r"### \[背景:\s*([^\]]+)\]", line)
            if m:
                active_bg = get_background_id(m.group(1))
            i += 1
            continue
            
        # Battle blocks
        if "⚔️" in line:
            # Determine if it's Battle 1 (前半) or Battle 2 (後半)
            is_boss = "後半ボス" in line or "ボス" in line
            enemy_name = "ガリア兵"
            
            # Look ahead for battle details
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
                
                # Clean line from list symbols
                clean_b_line = b_line.lstrip("*").lstrip("-").strip()
                
                # If it looks like a dialogue, break
                if "：" in clean_b_line or (":" in clean_b_line and not any(clean_b_line.startswith(p) for p in ["敵 /", "ボス名", "ボスHP", "出題タグ", "ノルマ", "敵のHP", "被ダメージ"])):
                    break
                    
                if clean_b_line.startswith("ボス名") or clean_b_line.startswith("敵 /") or clean_b_line.startswith("敵キャラクター"):
                    enemy_name = clean_b_line.split(":")[-1].strip().split("：")[-1].strip()
                elif clean_b_line.startswith("出題タグ:") or clean_b_line.startswith("出題範囲"):
                    # Extract tags like #questions, #question_words
                    tags_raw = clean_b_line.split(":")[-1].strip().split("：")[-1].strip()
                    battle_tags = re.findall(r"#[a-zA-Z0-9_]+", tags_raw)
                i += 1
                
            # Question count: Battle 1 has 5, Battle 2 has 8
            hp = 8 if is_boss else 5
            
            # Map tags to counts (distribute evenly)
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
                # Default fallback tags
                criteria = [{"tag": "#greetings", "count": hp}]
                
            # Add tutorial card before battle
            ref_pages = []
            if ep_num == 1:
                if not is_boss:
                    ref_pages = [
                        {"title": "第一・第二群規則動詞の現在形", "referenceTopicId": "ref_verb_groups", "sectionIndices": [1, 2]},
                        {"title": "直説法現在", "referenceTopicId": "ref_present_indicative", "sectionIndices": [0]}
                    ]
                else:
                    ref_pages = [
                        {"title": "動詞活用の規則変化パターン", "referenceTopicId": "ref_conjugation_patterns", "sectionIndices": [0]}
                    ]
            elif ep_num == 2:
                if not is_boss:
                    ref_pages = [
                        {"title": "動詞の3つのグループ", "referenceTopicId": "ref_verb_groups", "sectionIndices": [0]}
                    ]
                else:
                    ref_pages = [
                        {"title": "主要不規則動詞の活用", "referenceTopicId": "ref_essential_irregular_verbs", "sectionIndices": [0, 1]}
                    ]
            elif ep_num == 3:
                if not is_boss:
                    ref_pages = [
                        {"title": "疑問文の3つの作り方", "referenceTopicId": "ref_questions", "sectionIndices": [0]}
                    ]
                else:
                    ref_pages = [
                        {"title": "厨房で頻出する疑問詞", "referenceTopicId": "ref_questions", "sectionIndices": [1]}
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
            
        # Dialog block parsing
        # Check if line matches a dialog pattern: character name followed by colon
        # E.g. ???：「...」 or ファビウス：「...」
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
                # If it's a new dialog block or background or battle, stop
                if re.match(r"^([^\s：:]+?)(?:\s*[（(]([^)）]+)[)）])?\s*[：:]\s*(.*)$", next_line):
                    break
                if next_line.startswith("###") or next_line.startswith("⚔️") or next_line.startswith("##") or next_line.startswith("【第1-"):
                    break
                
                if next_line.startswith("└") or next_line.startswith("* └"):
                    explanation_lines.append(next_line)
                else:
                    dialogue_lines.append(next_line)
                i += 1
                
            # Combine dialogue lines
            full_text = "\n".join(dialogue_lines)
            
            # Split by arrows (→) to create separate steps if needed
            sub_segments = full_text.split("→")
            for idx, seg in enumerate(sub_segments):
                seg = seg.strip()
                if not seg:
                    continue
                step = parse_dialogue_segment(seg)
                step["background"] = active_bg
                
                # Check for active characters to show on stage
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
                    
                # Add learning point only to the last segment of the arrow-split dialogues
                if idx == len(sub_segments) - 1 and explanation_lines:
                    # Merge multiple explanation lines if any
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
            
        # Narration/other lines
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

def main():
    print(f"Reading drafts from {draft_path}...")
    with open(draft_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Find all episode headers
    matches = list(re.finditer(r"(?:##? )?【第1-(\d)話\s+([^】\n]+)】", content))
    valid_matches = []
    for m in matches:
        ep_num = int(m.group(1))
        title = m.group(2).strip()
        if "クリア" not in title:
            valid_matches.append((ep_num, title, m.start(), m.end()))
            
    print(f"Found {len(valid_matches)} valid episodes in draft.")
    
    episodes = []
    for idx, (ep_num, ep_title, start_pos, end_pos) in enumerate(valid_matches):
        print(f"Compiling Episode 1-{ep_num}: {ep_title}...")
        next_start = valid_matches[idx+1][2] if idx+1 < len(valid_matches) else len(content)
        ep_text = content[end_pos:next_start]
        lines = ep_text.split("\n")
        
        sequence = parse_episode_text(lines, ep_num)
        
        # Add reward at the end
        sequence.append({
            "type": "reward",
            "xp": 100,
            "unlockedEpisodeId": f"ep_1_{ep_num+1}" if ep_num < 3 else None
        })
        
        episodes.append({
            "episodeId": f"ep_1_{ep_num}",
            "episodeTitle": f"第1-{ep_num}話: {ep_title}",
            "recommendedPlayTime": "5 mins",
            "backgrounds": {
                "bgBlack": "#000000",
                "battlefield": "url('assets/story/chapter_1/戦場.webp')",
                "camp_morning": "url('assets/story/chapter_1/野営地朝.webp')",
                "assembly": "url('assets/story/chapter_1/朝集会.webp')",
                "camp_night": "url('assets/story/chapter_1/野営地夜.webp')",
                "forest": "url('assets/story/chapter_1/森.webp')",
                "village": "url('assets/story/chapter_1/村.webp')",
                "vercingetorix_camp": "url('assets/story/chapter_1/ウェルキンゲトリクス陣営.webp')"
            },
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
                        "surprised": "assets/story/chapter_1/カエサル驚き.webp"
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
                        "disappointed_bw": "assets/story/chapter_1/ラヴィエヌス呆れ白黒.webp"
                    }
                },
                "vercingetorix": {
                    "name": "ウェルキンゲトリクス",
                    "images": {
                        "default": "assets/story/chapter_1/エイダン直立.webp",
                        "normal": "assets/story/chapter_1/エイダン直立.webp"
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
            
    chapter_data = {
        "chapterId": "ch_1",
        "chapterTitle": "第1章: ガリア戦記、開幕！",
        "notes": "ガリア戦記の幕開けと、基本的な動詞活用、疑問文の基礎を学びます。",
        "episodes": episodes
    }
    
    os.makedirs(os.path.dirname(dest_file), exist_ok=True)
    with open(dest_file, 'w', encoding='utf-8') as f:
        json.dump(chapter_data, f, ensure_ascii=False, indent=2)
        
    print(f"Saved compiled VN JSON to {dest_file}")

if __name__ == "__main__":
    main()
