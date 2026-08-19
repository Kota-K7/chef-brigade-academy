import os
import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

workspace_dir = r"c:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"
json_path = os.path.join(workspace_dir, "rpg", "history", "chapter_1.json")

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
        return "avaricum_siege"
    elif "ゲルゴウィア" in name or "山" in name:
        return "gergovia_mountain"
    elif "黒" in name:
        return "bgBlack"
    return None

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
    print("Loading chapter_1.json...")
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    for ep in data.get('episodes', []):
        ep_id = ep['episodeId']
        print(f"Processing Episode: {ep_id}")
        
        active_bg = "bgBlack"
        new_seq = []
        battle_idx = 0
        
        for idx, s in enumerate(ep.get('sequence', [])):
            # Propagate and scale battle HP/criteria if it's a battle step
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
            
            # Skip play time remnants
            if "約5分）" in text:
                continue
                
            # SPECIAL CASE: Episode 1-1 (ep_1_1)
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
            
            # Case 1: [背景: XXX]
            m1 = re.search(r"\[背景:\s*([^\]]+)\]", text)
            if m1:
                found_bg = m1.group(1).strip()
                cleaned_text = text.replace(m1.group(0), "").strip()
            else:
                # Case 2: [XXX] or XXX] or [XXX (only if short and contains brackets/background indicator)
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
                    print(f"  Changed background to '{active_bg}' based on '{found_bg}'")
                else:
                    print(f"  Warning: could not map background name '{found_bg}'")
                    
                if not cleaned_text:
                    continue
                else:
                    s['text'] = cleaned_text
                    
            s['background'] = active_bg
            new_seq.append(s)
            
        ep['sequence'] = new_seq
        print(f"  Sequence updated. Steps: {len(new_seq)}")
        
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        
    # Clear draft_story.md to initial template (disabled during manual verification)
    # draft_path = os.path.join(workspace_dir, "rpg", "history", "draft_story.md")
    # with open(draft_path, 'w', encoding='utf-8') as f:
    #     f.write("# History RPG - ドラフトストーリー\n\n"
    #             "※ここに歴史体験ストーリーの原稿（テキストまたはマークダウン形式）を書いてください。\n"
    #             "Story（修行ストーリー）と同様に、マークダウンをパースしてシステム向けJSONを自動生成・移行するための下書き用ファイルです。\n"
    #             "あなたが原稿を書いて、コンパイルして `rpg/history/` フォルダ内の完成版JSON（例：`chapter_0.json`）に書き写したら、自動的に内容はクリアされます。\n")
        
    print("Done applying updates!")

if __name__ == "__main__":
    main()
