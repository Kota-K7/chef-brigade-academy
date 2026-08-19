import os
import json
import re
import sys

# Configure stdout to handle UTF-8 printing without crashing on Windows
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

def main():
    print("Loading chapter_1.json...")
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    for ep in data.get('episodes', []):
        print(f"Processing Episode: {ep['episodeId']}")
        active_bg = "bgBlack"
        new_seq = []
        
        for s in ep.get('sequence', []):
            if s.get('type') == 'dialog':
                text = s.get('text', '').strip()
                
                # Skip header play time remnants
                if "約5分）" in text:
                    print(f"  Skipped header remnant: {repr(text)}")
                    continue
                    
                # Check for background tags
                found_bg = None
                cleaned_text = text
                
                # Case 1: [背景: XXX]
                m1 = re.search(r"\[背景:\s*([^\]]+)\]", text)
                if m1:
                    found_bg = m1.group(1).strip()
                    cleaned_text = text.replace(m1.group(0), "").strip()
                else:
                    # Case 2: [XXX] or XXX] or [XXX (only if short and contains bracket or background indicator)
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
                        # Skip this step since it was just a background command step
                        continue
                    else:
                        s['text'] = cleaned_text
                        
                s['background'] = active_bg
                new_seq.append(s)
            else:
                # Keep other step types (tutorials, battles, rewards)
                # Ensure the background state propagates to these if relevant, 
                # although tutorial/fixedBattle/reward steps handle their own screens.
                new_seq.append(s)
                
        ep['sequence'] = new_seq
        print(f"  Sequence updated. Steps: {len(new_seq)}")
        
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        
    print("Done fixing backgrounds!")

if __name__ == "__main__":
    main()
