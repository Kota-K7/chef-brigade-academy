import os
import json

workspace_dir = r"c:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"
json_path = os.path.join(workspace_dir, "rpg", "story", "chapter_career_0.json")

def remove_asterisks(obj):
    if isinstance(obj, dict):
        return {k: remove_asterisks(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [remove_asterisks(item) for item in obj]
    elif isinstance(obj, str):
        return obj.replace('**', '')
    return obj

def main():
    print("Loading chapter_career_0.json...")
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    # Process backgrounds and sequence for career_ep_0_2
    for ep in data.get('episodes', []):
        if ep.get('episodeId') == 'career_ep_0_2':
            # Add kanetake_night background mapping
            ep['backgrounds']['kanetake_night'] = "url('assets/story/career_story/kanetake_night.webp')"
            print("  Added kanetake_night to backgrounds of career_ep_0_2.")
            
            # Update sequence steps 50 to 55
            seq = ep.get('sequence', [])
            for idx in range(50, len(seq)):
                step = seq[idx]
                if step.get('type') == 'dialog':
                    step['background'] = 'kanetake_night'
                    step['characters'] = []
                    print(f"  Updated step {idx}: background set to kanetake_night, characters set to []")
                    
    # Recursively remove **
    print("Stripping all double asterisks **...")
    data = remove_asterisks(data)
    
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        
    print("Successfully saved updated chapter_career_0.json!")

if __name__ == "__main__":
    main()
