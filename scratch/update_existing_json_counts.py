import os
import json

workspace_dir = r"c:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"

def scale_criteria(criteria, target):
    if not criteria:
        return []
    total = sum(c.get('count', 1) for c in criteria)
    if total == 0:
        for c in criteria:
            c['count'] = 1
        total = len(criteria)
    
    # Scale proportionally
    current_sum = 0
    for c in criteria:
        orig = c.get('count', 1)
        new_val = max(1, round(target * orig / total))
        c['count'] = new_val
        current_sum += new_val
        
    # Adjust for rounding errors
    while current_sum != target:
        if current_sum < target:
            # Find the element with the max count and increment it
            idx = max(range(len(criteria)), key=lambda i: criteria[i]['count'])
            criteria[idx]['count'] += 1
            current_sum += 1
        else:
            # Find the element with count > 1 and decrement it
            idx = max(range(len(criteria)), key=lambda i: criteria[i]['count'] if criteria[i]['count'] > 1 else -1)
            if criteria[idx]['count'] > 1:
                criteria[idx]['count'] -= 1
                current_sum -= 1
            else:
                # If all counts are 1, we can't decrement further safely, break to avoid infinite loop
                break
    return criteria

def update_folder(folder_path):
    print("Processing folder:", folder_path)
    for fn in os.listdir(folder_path):
        if fn.endswith('.json') and 'chapter_' in fn:
            fp = os.path.join(folder_path, fn)
            with open(fp, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            modified = False
            for ep in data.get('episodes', []):
                battles = [s for s in ep.get('sequence', []) if s.get('type') == 'fixedBattle']
                for idx, b in enumerate(battles):
                    battle_idx = idx + 1
                    target_hp = 7 if battle_idx <= 2 else 12
                    
                    old_hp = b.get('enemyHp')
                    if old_hp != target_hp:
                        b['enemyHp'] = target_hp
                        modified = True
                        
                    criteria = b.get('criteria', [])
                    old_sum = sum(c.get('count', 1) for c in criteria)
                    if old_sum != target_hp:
                        b['criteria'] = scale_criteria(criteria, target_hp)
                        modified = True
                        
            if modified:
                with open(fp, 'w', encoding='utf-8') as f:
                    json.dump(data, f, ensure_ascii=False, indent=2)
                print(f"  Updated {fn}")
            else:
                print(f"  No changes needed for {fn}")

def main():
    update_folder(os.path.join(workspace_dir, 'rpg', 'story'))
    update_folder(os.path.join(workspace_dir, 'rpg', 'history'))

if __name__ == "__main__":
    main()
