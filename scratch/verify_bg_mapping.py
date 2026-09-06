import os
import glob
import json
import hashlib
import re

# Mapping design: old_path -> new_filename
# We want clean, descriptive filenames in assets/story/backgrounds/

mapping = {
    # Career Story
    "assets/story/career_story/restaurant.webp": "restaurant.webp",
    "assets/story/career_story/kitchen.webp": "kitchen.webp",
    "assets/story/career_story/gael_sweets.webp": "gael_sweets.webp",
    "assets/story/career_story/kanetake_night.webp": "kanetake_night.webp",
    
    # Chapter 0
    "assets/story/chapter_0/bg_room.webp": "bg_room.webp",
    "assets/story/chapter_0/bg_father.webp": "bg_father.webp",
    "assets/story/chapter_0/bg_after_battle.webp": "bg_after_battle.webp",
    "assets/story/chapter_0/bg_marseille.webp": "bg_marseille.webp",
    "assets/story/chapter_0/bg_market.webp": "bg_market.webp",
    "assets/story/chapter_0/bg_port_container.webp": "bg_port_container.webp",
    "assets/story/chapter_0/bg_container_thief.webp": "bg_container_thief.webp",
    "assets/story/chapter_0/bg_thief_caught.webp": "bg_thief_caught.webp",
    "assets/story/chapter_0/bg_port.webp": "bg_port.webp",
    "assets/story/chapter_0/bg_camille_cry.webp": "bg_camille_cry.webp",
    "assets/story/chapter_0/bg_restaurant.webp": "bg_restaurant.webp",
    
    # Chapter 1
    "assets/story/chapter_1/戦場.webp": "battlefield_gaul.webp",
    "assets/story/chapter_1/野営地朝.webp": "camp_morning.webp",
    "assets/story/chapter_1/朝集会.webp": "assembly.webp",
    "assets/story/chapter_1/野営地夜.webp": "camp_night.webp",
    "assets/story/chapter_1/森.webp": "forest.webp",
    "assets/story/chapter_1/村.webp": "village.webp",
    "assets/story/chapter_1/ウェルキンゲトリクス陣営.webp": "vercingetorix_camp.webp",
    "assets/story/chapter_1/もぬけの殻の村.webp": "village_empty.webp",
    "assets/story/chapter_1/ガリア陣営.webp": "gaul_camp.webp",
    "assets/story/chapter_1/アウァーリクム包囲戦.webp": "avaricum_siege.webp",
    "assets/story/chapter_1/ゲルゴウィアの山.webp": "gergovia_mountain.webp",
    "assets/story/chapter_1/アレシア包囲戦.webp": "alesia_siege.webp",
    "assets/story/chapter_1/ウェルキンゲトリクス降伏.webp": "alesia_surrender.webp",
    "assets/story/chapter_1/村の広場.webp": "village_square.webp",
    
    # Chapter 2
    "assets/story/chapter_2/ローマ帝国地図.webp": "roma_empire_map.webp",
    "assets/story/chapter_2/庭園.webp": "garden.webp",
    "assets/story/chapter_2/修道院.webp": "monastery.webp",
    "assets/story/chapter_2/戦場.webp": "battlefield_merov.webp",
    "assets/story/chapter_2/森.webp": "forest.webp", # Shared with chapter 1!
    "assets/story/chapter_2/城.webp": "castle.webp",
    "assets/story/chapter_2/回想.webp": "flashback.webp",
    "assets/story/chapter_2/クローヴィス宣誓.webp": "clovis_oath.webp",
    "assets/story/chapter_2/宮殿の眺望.webp": "palace_view.webp",
    "assets/story/chapter_2/病室.webp": "sickroom.webp",
    "assets/story/chapter_2/病室2.webp": "sickroom_2.webp",
    "assets/story/chapter_2/クローヴィス死.webp": "clovis_death.webp",
    "assets/story/chapter_2/教会祈り.webp": "church_prayer.webp",
    "assets/story/chapter_2/8世紀勢力図.webp": "map_8th_century.webp",
    "assets/story/chapter_2/部屋内対面.webp": "room_meeting.webp",
    "assets/story/chapter_2/にやり.webp": "grin.webp",
    "assets/story/chapter_2/アラブとの戦闘.webp": "battle_arab.webp",
    "assets/story/chapter_2/マルテル覚醒.webp": "martel_awakening.webp",
    "assets/story/chapter_2/宮殿内.webp": "palace_inside.webp",
    "assets/story/chapter_2/宮殿内夜.webp": "palace_inside_night.webp",
    "assets/story/chapter_2/教会内.webp": "church_inside.webp",
    "assets/story/chapter_2/ピピンの寄進.webp": "pepin_donation.webp",
    "assets/story/chapter_2/白マイク.jpg": "white_mic.jpg",
    "assets/story/chapter_2/カール戦場.webp": "charlemagne_battlefield.webp",
    "assets/story/chapter_2/手紙.webp": "letter.webp",
    "assets/story/chapter_2/メルセンヴェルダン.jpg": "mersen_verdun.jpg",
    
    # Chapter 3
    "assets/story/chapter_3/カペー朝.jpg": "capet_dynasty.jpg",
    "assets/story/chapter_3/ノルマンディーコンクエスト.jpg": "normandy_conquest.jpg",
    "assets/story/chapter_3/ロロ襲来.jpg": "rollo_raid.jpg"
}

# Verify all source files exist
missing = []
for src, dst in mapping.items():
    if not os.path.exists(src):
        missing.append(src)

print(f"Total mapped files: {len(mapping)}")
print(f"Missing source files: {missing}")

# Check destination uniqueness
dst_counts = {}
for src, dst in mapping.items():
    dst_counts.setdefault(dst, []).append(src)

print("\nDestination file distribution:")
for dst, srcs in dst_counts.items():
    if len(srcs) > 1:
        print(f"  [DEDUP] {dst} <- {srcs}")
