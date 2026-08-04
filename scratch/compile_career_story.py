import os
import re
import json

workspace_dir = r"c:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"
src_dir = os.path.join(workspace_dir, "career_story", "chapters")
dest_dir = os.path.join(workspace_dir, "data", "career_story")

os.makedirs(dest_dir, exist_ok=True)

char_map = {
    "金竹": "kanetake",
    "満": "kanetake",
    "佐伯": "saeki",
    "エロディ": "elodie",
    "ガエル": "gael",
    "ジャン＝ピエール": "jean_pierre",
    "ジャン": "jean_pierre",
    "主人公": "hero"
}

def parse_dialogue(lines):
    sequence = []
    for line in lines:
        line = line.strip()
        if not line:
            continue
        
        # Match "Character：「Dialogue Text」"
        match = re.match(r"^([^：:\s]+)\s*:[「「“\"](.+?)[」」”\"](.*)$", line)
        if not match:
            match = re.match(r"^([^：:\s]+)\s*：[「「“\"](.+?)[」」”\"](.*)$", line)
            
        if match:
            char_name = match.group(1).strip()
            char_key = char_map.get(char_name, char_name.lower())
            dialogue_text = match.group(2).strip()
            extra = match.group(3).strip()
            
            item = {
                "type": "dialog",
                "character": char_key,
                "text": dialogue_text
            }
            
            # Check for learning point like 【学習ポイント: Title - Explanation】
            lp_match = re.search(r"【学習ポイント\s*:\s*([^-】]+)\s*-\s*([^】]+)】", extra)
            if lp_match:
                item["learningPoint"] = {
                    "title": lp_match.group(1).strip(),
                    "text": lp_match.group(2).strip()
                }
            sequence.append(item)
    return sequence

def parse_markdown_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    lines = content.split('\n')
    
    chapter_title = ""
    episode_title = ""
    
    sections = {}
    current_section = None
    section_lines = []
    
    for line in lines:
        if line.startswith('# '):
            chapter_title = line[2:].strip()
        elif line.startswith('## '):
            episode_title = line[3:].strip()
        elif line.startswith('### '):
            if current_section:
                sections[current_section] = section_lines
            current_section = line[4:].strip().split(':')[0].strip().split('(')[0].strip()
            section_lines = []
        else:
            if current_section:
                section_lines.append(line)
                
    if current_section:
        sections[current_section] = section_lines
        
    # Process sections
    # Expected sections: "Scene 1", "Part 1", "Part 2", "Scene 2", "Part 3", "Part 4", "Scene 3", "Part 5", "Part 6", "Scene 4〜5"
    episode_data = {
        "episodeTitle": episode_title,
        "scene1_intro_dialog": parse_dialogue(sections.get("Scene 1", [])),
        "part1_grammar_lesson": "\n".join(sections.get("Part 1", [])).strip(),
        "part2_basic_exercises": "\n".join(sections.get("Part 2", [])).strip(),
        "scene2_kitchen_dialog": parse_dialogue(sections.get("Scene 2", [])),
        "part3_grammar_lesson": "\n".join(sections.get("Part 3", [])).strip(),
        "part4_applied_exercises": "\n".join(sections.get("Part 4", [])).strip(),
        "scene3_outro_dialog": parse_dialogue(sections.get("Scene 3", [])),
        "part5_grammar_lesson": "\n".join(sections.get("Part 5", [])).strip(),
        "part6_mixed_review": "\n".join(sections.get("Part 6", [])).strip(),
        "scene4_outro_dialog": parse_dialogue(sections.get("Scene 4〜5", []) or sections.get("Scene 4", []))
    }
    
    # Extract episode numbers from filename e.g. chapter_0_ep_1.md
    filename = os.path.basename(filepath)
    ep_match = re.search(r"chapter_(\d+)_ep_(\d+)", filename)
    if ep_match:
        ch_num = int(ep_match.group(1))
        ep_num = int(ep_match.group(2))
        episode_data["episodeId"] = f"career_ep_{ch_num}_{ep_num}"
        return ch_num, ep_num, episode_data
    return None, None, None

def main():
    chapters_data = {}
    
    if not os.path.exists(src_dir):
        print(f"Source directory {src_dir} does not exist.")
        return
        
    for filename in os.listdir(src_dir):
        if filename.endswith(".md") and "ep" in filename:
            filepath = os.path.join(src_dir, filename)
            try:
                ch_num, ep_num, ep_data = parse_markdown_file(filepath)
                if ch_num is not None:
                    if ch_num not in chapters_data:
                        chapters_data[ch_num] = {
                            "chapterId": f"career_ch_{ch_num}",
                            "episodes": []
                        }
                    chapters_data[ch_num]["episodes"].append((ep_num, ep_data))
                    print(f"Parsed {filename} successfully.")
            except Exception as e:
                print(f"Error parsing {filename}: {e}")
                
    # Save compiled chapters
    for ch_num, ch_data in chapters_data.items():
        # Sort episodes by episode number
        ch_data["episodes"].sort(key=lambda x: x[0])
        # Strip the tuple and keep only ep_data
        ch_data["episodes"] = [x[1] for x in ch_data["episodes"]]
        
        dest_file = os.path.join(dest_dir, f"chapter_{ch_num}.json")
        with open(dest_file, 'w', encoding='utf-8') as f:
            json.dump(ch_data, f, ensure_ascii=False, indent=2)
        print(f"Saved compiled JSON to {dest_file}")

if __name__ == "__main__":
    main()
