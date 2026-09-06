import os
import re
import json

def parse_draft_to_json():
    with open('rpg/history/draft_story.md', 'r', encoding='utf-8') as f:
        content = f.read()

    # Split strictly on episode headers: 【第3-X話 タイトル】
    # Exclude 【第3-X話 クリア！】
    ep_matches = list(re.finditer(r'【第3-(\d+)話\s+([^】\n]+)】(?:（目安プレイ時間:\s*[^）]+）)?', content))
    
    episodes = []
    
    for i, match in enumerate(ep_matches):
        ep_num = int(match.group(1))
        ep_title = match.group(2).strip()
        if "クリア" in ep_title:
            continue
            
        start_pos = match.end()
        end_pos = ep_matches[i+1].start() if i+1 < len(ep_matches) else len(content)
        ep_text = content[start_pos:end_pos].strip()
        
        ep_id = f"ep_3_{ep_num}"
        full_title = f"第{ep_num}話: {ep_title}"
        
        ep_data = parse_episode_text(ep_id, full_title, ep_text, ep_num)
        episodes.append(ep_data)
        
    chapter_data = {
        "chapterId": "ch_3",
        "chapterTitle": "第3章: 中世フランクと封建社会 - カペー朝とアンジュー帝国",
        "notes": "カペー朝の成立、ノルマン・コンクエスト、エレオノールとアンジュー帝国の誕生、英仏の愛憎劇を学ぶ章",
        "episodes": episodes
    }
    
    with open('rpg/history/chapter_3.json', 'w', encoding='utf-8') as f:
        json.dump(chapter_data, f, ensure_ascii=False, indent=2)
    
    print(f"Successfully generated rpg/history/chapter_3.json with {len(episodes)} episodes.")

def parse_episode_text(ep_id, ep_title, text, ep_num):
    backgrounds = {
        "bgBlack": "#000000"
    }
    
    bg_map = {
        "ロロ襲来": "rollo_raid",
        "カペー朝": "capet_dynasty",
        "ノルマンディーコンクエスト": "normandy_conquest",
        "ノルマンコンクエスト": "normandy_conquest",
        "王家領土": "royal_domain",
        "フランス王領土": "royal_domain",
        "garden_webp": "garden",
        "garden": "garden",
        "palace_inside.webp": "palace_inside",
        "palace_inside": "palace_inside",
        "battle_arab.webp": "battle_arab",
        "battle_arab": "battle_arab",
        "church_inside.webp": "church_inside",
        "church_inside": "church_inside",
        "castle.webp": "castle",
        "castle": "castle"
    }
    
    bg_files = {
        "rollo_raid": "url('assets/story/backgrounds/rollo_raid.jpg')",
        "capet_dynasty": "url('assets/story/backgrounds/capet_dynasty.jpg')",
        "normandy_conquest": "url('assets/story/backgrounds/normandy_conquest.jpg')",
        "royal_domain": "url('assets/story/backgrounds/roma_empire_map.webp')",
        "garden": "url('assets/story/backgrounds/garden.webp')",
        "palace_inside": "url('assets/story/backgrounds/palace_inside.webp')",
        "battle_arab": "url('assets/story/backgrounds/battle_arab.webp')",
        "church_inside": "url('assets/story/backgrounds/church_inside.webp')",
        "castle": "url('assets/story/backgrounds/castle.webp')"
    }
    
    for m in re.finditer(r'\[背景:\s*([^\]]+)\]', text):
        raw_bg = m.group(1).strip()
        bg_key = bg_map.get(raw_bg, "royal_domain")
        if bg_key in bg_files:
            backgrounds[bg_key] = bg_files[bg_key]
            
    characters = {}
    if ep_num == 1:
        characters = {
            "narrator": { "name": "ナレーター" },
            "rollo": { "name": "ロロ" },
            "charles_simple": { "name": "シャルル単純王" },
            "hugh_capet": { "name": "ユーグ・カペー" },
            "guillaume": { "name": "ギョーム (ウィリアム征服王)" },
            "french_king": { "name": "フランス王" },
            "vassals": { "name": "家臣たち" }
        }
    elif ep_num == 2:
        characters = {
            "narrator": { "name": "ナレーター" },
            "eleanor": {
                "name": "エレオノール",
                "images": {
                    "default": "assets/story/chapter_3/eleanor_default.webp",
                    "normal": "assets/story/chapter_3/eleanor_default.webp",
                    "smile": "assets/story/chapter_3/eleanor_smile.webp",
                    "disappointed": "assets/story/chapter_3/eleanor_disappointed.webp",
                    "blush": "assets/story/chapter_3/eleanor_blush.webp"
                }
            },
            "louis_vii": {
                "name": "ルイ7世"
            },
            "henry_ii": {
                "name": "ヘンリ2世",
                "images": {
                    "default": "assets/story/chapter_3/henry_default.webp",
                    "normal": "assets/story/chapter_3/henry_default.webp",
                    "wink": "assets/story/chapter_3/henry_wink.webp",
                    "smile": "assets/story/chapter_3/henry_smile.webp"
                }
            }
        }
    elif ep_num == 3:
        characters = {
            "narrator": { "name": "ナレーター" },
            "eleanor": {
                "name": "エレオノール",
                "images": {
                    "default": "assets/story/chapter_3/eleanor_default.webp",
                    "normal": "assets/story/chapter_3/eleanor_default.webp",
                    "smile": "assets/story/chapter_3/eleanor_smile.webp"
                }
            },
            "henry_ii": {
                "name": "ヘンリ2世",
                "images": {
                    "default": "assets/story/chapter_3/henry_default.webp",
                    "normal": "assets/story/chapter_3/henry_default.webp",
                    "smile": "assets/story/chapter_3/henry_smile.webp"
                }
            },
            "louis_vii": {
                "name": "ルイ7世"
            },
            "john": {
                "name": "ジョン (幼少期)",
                "images": {
                    "default": "assets/story/chapter_3/john_child.webp",
                    "normal": "assets/story/chapter_3/john_child.webp",
                    "twitch": "assets/story/chapter_3/john_twitch.webp"
                }
            },
            "richard": {
                "name": "リチャード (幼少期)",
                "images": {
                    "default": "assets/story/chapter_3/richard_child.webp",
                    "normal": "assets/story/chapter_3/richard_child.webp",
                    "angry": "assets/story/chapter_3/richard_angry.webp"
                }
            }
        }

    sequence = []
    current_bg = list(backgrounds.keys())[1] if len(backgrounds) > 1 else "bgBlack"
    
    lines = text.split('\n')
    idx = 0
    
    while idx < len(lines):
        line = lines[idx].strip()
        if not line:
            idx += 1
            continue
            
        bg_m = re.match(r'\[背景:\s*([^\]]+)\]', line)
        if bg_m:
            raw_bg = bg_m.group(1).strip()
            current_bg = bg_map.get(raw_bg, current_bg)
            idx += 1
            continue
            
        if line.startswith('⚔️') or '戦闘開始' in line or 'Battle' in line:
            battle_enemy = "試練"
            criteria = []
            idx += 1
            while idx < len(lines):
                b_line = lines[idx].strip()
                if not b_line:
                    idx += 1
                    continue
                if b_line.startswith('[背景:') or b_line.startswith('【第') or b_line.startswith('Narrator:') or ('「' in b_line and '」' in b_line):
                    break
                if '敵キャラクター:' in b_line or '敵:' in b_line:
                    battle_enemy = b_line.split(':', 1)[1].strip()
                elif b_line.startswith('#'):
                    tag_m = re.match(r'(#[a-zA-Z0-9_]+)(?:\s*\((\d+)\))?', b_line)
                    if tag_m:
                        t = tag_m.group(1)
                        cnt = int(tag_m.group(2)) if tag_m.group(2) else None
                        criteria.append({"tag": t, "count": cnt})
                idx += 1
                
            if not criteria:
                criteria = [{"tag": "#past_compose", "count": 7}]
            else:
                total_explicit = sum(c['count'] for c in criteria if c['count'] is not None)
                unspecified = [c for c in criteria if c['count'] is None]
                if unspecified:
                    remain = max(0, 7 - total_explicit)
                    per_item = max(1, remain // len(unspecified))
                    for c in unspecified:
                        c['count'] = per_item
                    diff = 7 - sum(c['count'] for c in criteria)
                    criteria[0]['count'] += diff
                elif total_explicit != 7:
                    criteria[0]['count'] += (7 - total_explicit)
            
            sequence.append({
                "type": "battle",
                "background": current_bg,
                "enemy": {
                    "name": battle_enemy,
                    "hp": 7,
                    "damage": 2
                },
                "criteria": criteria
            })
            continue
            
        if line.startswith('【第') and 'クリア！' in line:
            idx += 1
            continue
            
        dialogs = line.split('→')
        for d_idx, d_part in enumerate(dialogs):
            d_part = d_part.strip()
            if not d_part:
                continue
                
            spk_m = re.match(r'^([^:：]+)[：:](?:「(.*)」|(.*))$', d_part)
            if spk_m:
                raw_spk = spk_m.group(1).strip()
                d_text = spk_m.group(2) if spk_m.group(2) is not None else spk_m.group(3)
                if d_text is None:
                    d_text = ""
                d_text = d_text.strip()
                
                char_id, expr, is_voice = extract_char_info(raw_spk)
                
                step = {
                    "type": "dialog",
                    "background": current_bg,
                    "character": char_id,
                    "text": f"「{d_text}」" if not d_text.startswith('「') else d_text,
                    "characters": []
                }
                
                if char_id and char_id in characters and 'images' in characters[char_id] and not is_voice:
                    step["characters"] = [{
                        "id": char_id,
                        "expression": expr,
                        "position": "center"
                    }]
                
                if d_idx == len(dialogs) - 1:
                    peek_idx = idx + 1
                    while peek_idx < len(lines):
                        next_line = lines[peek_idx].strip()
                        if not next_line:
                            peek_idx += 1
                            continue
                        if next_line.startswith('└') or next_line.startswith('・') or next_line.startswith('★'):
                            if '解説:' in next_line or '解説：' in next_line or '説明行:' in next_line or '説明行：' in next_line:
                                lp_desc = next_line.replace('└', '').strip()
                                extra_lines = [lp_desc]
                                p2 = peek_idx + 1
                                while p2 < len(lines):
                                    l2 = lines[p2].strip()
                                    if l2.startswith('・') or l2.startswith('★') or (l2 and not l2.startswith('Narrator:') and not l2.startswith('[背景') and not l2.startswith('⚔️') and not l2.startswith('【') and '「' not in l2):
                                        extra_lines.append(l2)
                                        p2 += 1
                                    else:
                                        break
                                peek_idx = p2 - 1
                                full_lp_text = "\n".join(extra_lines)
                                step["learningPoint"] = {
                                    "title": "歴史・文法ポイント",
                                    "text": full_lp_text
                                }
                            peek_idx += 1
                        else:
                            break
                    idx = peek_idx - 1
                
                sequence.append(step)
                
        idx += 1
        
    return {
        "episodeId": ep_id,
        "episodeTitle": ep_title,
        "recommendedPlayTime": "10 mins" if ep_num == 1 else "15 mins",
        "backgrounds": backgrounds,
        "characters": characters,
        "sequence": sequence
    }

def extract_char_info(raw_spk):
    is_voice = False
    expr = "default"
    
    m = re.match(r'^([a-zA-Z0-9_ぁ-んァ-ヶ一-龥]+)(?:[（\(](.*?)[）\)])?$', raw_spk)
    if not m:
        return None, "default", False
        
    name_part = m.group(1).strip()
    expr_part = m.group(2).strip() if m.group(2) else ""
    
    name_map = {
        "Narrator": None,
        "Rollo": "rollo",
        "シャルル単純王": "charles_simple",
        "Hugh_Capet": "hugh_capet",
        "Guillaume": "guillaume",
        "フランス王": "french_king",
        "家臣たち": "vassals",
        "Eleanor": "eleanor",
        "Louis_VII": "louis_vii",
        "Henry_II": "henry_ii",
        "John": "john",
        "Richard": "richard"
    }
    
    char_id = name_map.get(name_part, name_part.lower())
    
    if "声" in expr_part:
        is_voice = True
    if "影" in expr_part:
        is_voice = True
        
    expr_map = {
        "微笑み": "smile",
        "笑顔": "smile",
        "ウィンク": "wink",
        "呆れ": "disappointed",
        "照れ": "blush",
        "幼少期怒り": "angry",
        "幼少期ひきつり": "twitch",
        "幼少期": "default",
        "デフォルト": "default"
    }
    
    for k, v in expr_map.items():
        if k in expr_part:
            expr = v
            break
            
    return char_id, expr, is_voice

if __name__ == '__main__':
    parse_draft_to_json()
