import json

with open('rpg/backgrounds.json', 'r', encoding='utf-8') as f:
    bgs = json.load(f)

# Update existing jpgs to webp
for k, v in bgs.items():
    if v.get('file', '').endswith('.jpg'):
        v['file'] = v['file'].replace('.jpg', '.webp')
        v['url'] = v['url'].replace('.jpg', '.webp')

# Add new backgrounds
new_bgs = {
    'french_royal_domain': {
        'id': 'french_royal_domain',
        'name': 'フランス王領マップ',
        'category': 'history',
        'file': 'french_royal_domain.webp',
        'url': "url('assets/story/backgrounds/french_royal_domain.webp')",
        'description': 'カペー朝初期および中世盛期のフランス王領および諸侯勢力図。'
    },
    'canossa': {
        'id': 'canossa',
        'name': 'カノッサの屈辱',
        'category': 'history',
        'file': 'canossa.webp',
        'url': "url('assets/story/backgrounds/canossa.webp')",
        'description': '1077年雪のカノッサ城門前で教皇に許しを請うハインリヒ4世。'
    },
    'church_history': {
        'id': 'church_history',
        'name': '教会史 / 十字軍',
        'category': 'history',
        'file': 'church_history.webp',
        'url': "url('assets/story/backgrounds/church_history.webp')",
        'description': 'クレルモン公会議や十字軍遠征、教皇権の変遷を描く歴史画。'
    }
}

for k, v in new_bgs.items():
    bgs[k] = v

with open('rpg/backgrounds.json', 'w', encoding='utf-8') as f:
    json.dump(bgs, f, ensure_ascii=False, indent=2)

print('Updated backgrounds.json successfully. Total backgrounds:', len(bgs))
