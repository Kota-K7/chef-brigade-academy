import os
import glob
import json
import re

# Precise replacement map from old path to new URL string
# e.g., "assets/story/chapter_1/森.webp" -> "assets/story/backgrounds/forest.webp"

path_replacement = {
    # Career Story
    "assets/story/career_story/restaurant.webp": "assets/story/backgrounds/restaurant.webp",
    "assets/story/career_story/kitchen.webp": "assets/story/backgrounds/kitchen.webp",
    "assets/story/career_story/gael_sweets.webp": "assets/story/backgrounds/gael_sweets.webp",
    "assets/story/career_story/kanetake_night.webp": "assets/story/backgrounds/kanetake_night.webp",
    
    # Chapter 0
    "assets/story/chapter_0/bg_room.webp": "assets/story/backgrounds/bg_room.webp",
    "assets/story/chapter_0/bg_father.webp": "assets/story/backgrounds/bg_father.webp",
    "assets/story/chapter_0/bg_after_battle.webp": "assets/story/backgrounds/bg_after_battle.webp",
    "assets/story/chapter_0/bg_marseille.webp": "assets/story/backgrounds/bg_marseille.webp",
    "assets/story/chapter_0/bg_market.webp": "assets/story/backgrounds/bg_market.webp",
    "assets/story/chapter_0/bg_port_container.webp": "assets/story/backgrounds/bg_port_container.webp",
    "assets/story/chapter_0/bg_container_thief.webp": "assets/story/backgrounds/bg_container_thief.webp",
    "assets/story/chapter_0/bg_thief_caught.webp": "assets/story/backgrounds/bg_thief_caught.webp",
    "assets/story/chapter_0/bg_port.webp": "assets/story/backgrounds/bg_port.webp",
    "assets/story/chapter_0/bg_camille_cry.webp": "assets/story/backgrounds/bg_camille_cry.webp",
    "assets/story/chapter_0/bg_restaurant.webp": "assets/story/backgrounds/bg_restaurant.webp",
    
    # Chapter 1
    "assets/story/chapter_1/戦場.webp": "assets/story/backgrounds/battlefield_gaul.webp",
    "assets/story/chapter_1/野営地朝.webp": "assets/story/backgrounds/camp_morning.webp",
    "assets/story/chapter_1/朝集会.webp": "assets/story/backgrounds/assembly.webp",
    "assets/story/chapter_1/野営地夜.webp": "assets/story/backgrounds/camp_night.webp",
    "assets/story/chapter_1/森.webp": "assets/story/backgrounds/forest.webp",
    "assets/story/chapter_1/村.webp": "assets/story/backgrounds/village.webp",
    "assets/story/chapter_1/ウェルキンゲトリクス陣営.webp": "assets/story/backgrounds/vercingetorix_camp.webp",
    "assets/story/chapter_1/もぬけの殻の村.webp": "assets/story/backgrounds/village_empty.webp",
    "assets/story/chapter_1/ガリア陣営.webp": "assets/story/backgrounds/gaul_camp.webp",
    "assets/story/chapter_1/アウァーリクム包囲戦.webp": "assets/story/backgrounds/avaricum_siege.webp",
    "assets/story/chapter_1/ゲルゴウィアの山.webp": "assets/story/backgrounds/gergovia_mountain.webp",
    "assets/story/chapter_1/アレシア包囲戦.webp": "assets/story/backgrounds/alesia_siege.webp",
    "assets/story/chapter_1/ウェルキンゲトリクス降伏.webp": "assets/story/backgrounds/alesia_surrender.webp",
    "assets/story/chapter_1/村の広場.webp": "assets/story/backgrounds/village_square.webp",
    
    # Chapter 2
    "assets/story/chapter_2/ローマ帝国地図.webp": "assets/story/backgrounds/roma_empire_map.webp",
    "assets/story/chapter_2/庭園.webp": "assets/story/backgrounds/garden.webp",
    "assets/story/chapter_2/修道院.webp": "assets/story/backgrounds/monastery.webp",
    "assets/story/chapter_2/戦場.webp": "assets/story/backgrounds/battlefield_merov.webp",
    "assets/story/chapter_2/森.webp": "assets/story/backgrounds/forest.webp",
    "assets/story/chapter_2/城.webp": "assets/story/backgrounds/castle.webp",
    "assets/story/chapter_2/回想.webp": "assets/story/backgrounds/flashback.webp",
    "assets/story/chapter_2/クローヴィス宣誓.webp": "assets/story/backgrounds/clovis_oath.webp",
    "assets/story/chapter_2/宮殿の眺望.webp": "assets/story/backgrounds/palace_view.webp",
    "assets/story/chapter_2/病室.webp": "assets/story/backgrounds/sickroom.webp",
    "assets/story/chapter_2/病室2.webp": "assets/story/backgrounds/sickroom_2.webp",
    "assets/story/chapter_2/クローヴィス死.webp": "assets/story/backgrounds/clovis_death.webp",
    "assets/story/chapter_2/教会祈り.webp": "assets/story/backgrounds/church_prayer.webp",
    "assets/story/chapter_2/8世紀勢力図.webp": "assets/story/backgrounds/map_8th_century.webp",
    "assets/story/chapter_2/部屋内対面.webp": "assets/story/backgrounds/room_meeting.webp",
    "assets/story/chapter_2/にやり.webp": "assets/story/backgrounds/grin.webp",
    "assets/story/chapter_2/アラブとの戦闘.webp": "assets/story/backgrounds/battle_arab.webp",
    "assets/story/chapter_2/マルテル覚醒.webp": "assets/story/backgrounds/martel_awakening.webp",
    "assets/story/chapter_2/宮殿内.webp": "assets/story/backgrounds/palace_inside.webp",
    "assets/story/chapter_2/宮殿内夜.webp": "assets/story/backgrounds/palace_inside_night.webp",
    "assets/story/chapter_2/教会内.webp": "assets/story/backgrounds/church_inside.webp",
    "assets/story/chapter_2/ピピンの寄進.webp": "assets/story/backgrounds/pepin_donation.webp",
    "assets/story/chapter_2/白マイク.jpg": "assets/story/backgrounds/white_mic.jpg",
    "assets/story/chapter_2/カール戦場.webp": "assets/story/backgrounds/charlemagne_battlefield.webp",
    "assets/story/chapter_2/手紙.webp": "assets/story/backgrounds/letter.webp",
    "assets/story/chapter_2/メルセンヴェルダン.jpg": "assets/story/backgrounds/mersen_verdun.jpg"
}

def update_background_val(v):
    if not isinstance(v, str):
        return v
    for old_p, new_p in path_replacement.items():
        if old_p in v:
            return v.replace(old_p, new_p)
    return v

json_files = glob.glob('rpg/**/*.json', recursive=True) + glob.glob('data/**/*.json', recursive=True)

updated_files = 0
total_replacements = 0

for jf in sorted(json_files):
    with open(jf, 'r', encoding='utf-8') as fp:
        try:
            data = json.load(fp)
        except Exception:
            continue
    
    file_modified = False
    if isinstance(data, dict) and 'episodes' in data:
        for ep in data['episodes']:
            bgs = ep.get('backgrounds', {})
            for k in list(bgs.keys()):
                old_val = bgs[k]
                new_val = update_background_val(old_val)
                if old_val != new_val:
                    bgs[k] = new_val
                    file_modified = True
                    total_replacements += 1
    
    if file_modified:
        with open(jf, 'w', encoding='utf-8') as fp:
            json.dump(data, fp, ensure_ascii=False, indent=2)
        print(f"Updated: {jf}")
        updated_files += 1

print(f"\nDone! Modified {updated_files} JSON files with {total_replacements} replacements.")
