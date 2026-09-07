import json, os

workspace_dir = r"c:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"
ch3_path = os.path.join(workspace_dir, "rpg", "history", "chapter_3.json")

with open(ch3_path, 'r', encoding='utf-8') as f:
    ch3 = json.load(f)

unlocked_map = {
    "ep_3_1": "ep_3_2",
    "ep_3_2": "ep_3_3",
    "ep_3_3": "ep_3_ex1",
    "ep_3_ex1": "ep_3_ex2",
    "ep_3_ex2": None
}

xp_map = {
    "ep_3_1": 150,
    "ep_3_2": 160,
    "ep_3_3": 170,
    "ep_3_ex1": 180,
    "ep_3_ex2": 200
}

modified_count = 0
for ep in ch3.get('episodes', []):
    ep_id = ep.get('episodeId')
    seq = ep.get('sequence', [])
    new_seq = []
    
    for step in seq:
        stype = step.get('type')
        if stype in ['battle', 'fixedBattle']:
            enemy_obj = step.get('enemy', {})
            enemy_name = step.get('enemyName') or enemy_obj.get('name') or "試練の敵"
            enemy_hp = step.get('enemyHp') or enemy_obj.get('hp') or 7
            enemy_damage = step.get('enemyDamage') or enemy_obj.get('damage') or 2
            
            new_step = {
                "type": "fixedBattle",
                "enemyName": enemy_name,
                "enemyHp": enemy_hp,
                "enemyDamage": enemy_damage,
                "criteria": step.get('criteria', [])
            }
            if 'background' in step:
                new_step['background'] = step['background']
            new_seq.append(new_step)
            modified_count += 1
        elif stype == 'reward':
            # Skip old reward to append updated one at the end
            continue
        else:
            new_seq.append(step)
            
    # Append reward step at the end of the episode
    reward_step = {
        "type": "reward",
        "xp": xp_map.get(ep_id, 150),
        "unlockedEpisodeId": unlocked_map.get(ep_id)
    }
    new_seq.append(reward_step)
    ep['sequence'] = new_seq

with open(ch3_path, 'w', encoding='utf-8') as f:
    json.dump(ch3, f, ensure_ascii=False, indent=2)

print(f"Successfully updated chapter_3.json: transformed {modified_count} battle steps and added rewards to {len(ch3.get('episodes', []))} episodes.")
