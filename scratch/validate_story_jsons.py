import os
import json

rpg_dir = "rpg"
folders = ["story", "history"]

for folder in folders:
    dir_path = os.path.join(rpg_dir, folder)
    if not os.path.exists(dir_path):
        continue
    for filename in os.listdir(dir_path):
        if not filename.endswith(".json") or filename == "questions_db.json":
            continue
        filepath = os.path.join(dir_path, filename)
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                data = json.load(f)
            print(f"Checking {folder}/{filename}...")
            for ep in data.get('episodes', []):
                ep_id = ep.get('episodeId')
                backgrounds = ep.get('backgrounds', {})
                characters = ep.get('characters', {})
                for idx, step in enumerate(ep.get('sequence', [])):
                    if step.get('type') == 'dialog':
                        bg = step.get('background')
                        if bg and bg not in backgrounds:
                            print(f"  [MISSING BG] Episode: {ep_id}, Step: {idx}, bg: {bg}")
                        # Check character image
                        char_id = step.get('character')
                        if char_id:
                            if char_id not in characters and char_id != "hero":
                                print(f"  [MISSING CHAR] Episode: {ep_id}, Step: {idx}, char: {char_id}")
                            elif char_id in characters:
                                char_def = characters[char_id]
                                expr = step.get('expression', 'default')
                                if 'images' in char_def:
                                    images = char_def['images']
                                    if expr not in images and expr != 'default':
                                        print(f"  [MISSING EXPR] Episode: {ep_id}, Step: {idx}, char: {char_id}, expr: {expr}")
                    elif step.get('type') == 'fixedBattle':
                        pass
        except Exception as e:
            print(f"Error checking {filename}: {e}")
