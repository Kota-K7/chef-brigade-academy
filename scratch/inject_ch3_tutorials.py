import json, os

workspace_dir = r"c:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"
ch3_path = os.path.join(workspace_dir, "rpg", "history", "chapter_3.json")

with open(ch3_path, 'r', encoding='utf-8') as f:
    ch3 = json.load(f)

# Tutorials per episode and battle index
episode_tutorials = {
    "ep_3_1": [
        # Battle 1 (Viking Rollo)
        [
            {"title": "命令法（指示と号令）", "referenceTopicId": "ref_imperative", "sectionIndices": [0]},
            {"title": "単純未来の作り方と活用", "referenceTopicId": "ref_future_tenses", "sectionIndices": [0]}
        ],
        # Battle 2 (Capetian Dynasty)
        [
            {"title": "単純未来の不規則語幹", "referenceTopicId": "ref_future_tenses", "sectionIndices": [1]},
            {"title": "冠詞の種類（定冠詞・不定冠詞）", "referenceTopicId": "ref_definite_indefinite_articles", "sectionIndices": [0]}
        ],
        # Battle 3 (Guillaume Conquest)
        [
            {"title": "命令法と未来表現の総まとめ", "referenceTopicId": "ref_future_tenses", "sectionIndices": [0, 1]}
        ]
    ],
    "ep_3_2": [
        # Battle 1 (Louis VII & Eleanor)
        [
            {"title": "直接・間接目的語人称代名詞", "referenceTopicId": "ref_object_pronouns", "sectionIndices": [0]},
            {"title": "複合過去と過去分詞の性数一致", "referenceTopicId": "ref_non_finite_forms", "sectionIndices": [2]}
        ],
        # Battle 2 (Crusade Conflict)
        [
            {"title": "目的語人称代名詞の語順と位置", "referenceTopicId": "ref_object_pronouns", "sectionIndices": [1]}
        ]
    ],
    "ep_3_3": [
        # Battle 1 (Angevin Empire)
        [
            {"title": "形容詞の性数一致と用法", "referenceTopicId": "ref_adjective_agreement", "sectionIndices": [0]},
            {"title": "所有形容詞 (mon, ton, son...)", "referenceTopicId": "ref_possessive_adjectives", "sectionIndices": [0]}
        ],
        # Battle 2 (Lion's Sons)
        [
            {"title": "基本形容詞の位置と性数一致", "referenceTopicId": "ref_adjective_agreement", "sectionIndices": [0]},
            {"title": "所有形容詞の応用", "referenceTopicId": "ref_possessive_adjectives", "sectionIndices": [1]}
        ]
    ],
    "ep_3_ex1": [
        # Battle 1 (Pepin Donation)
        [
            {"title": "関係代名詞 qui と que の役割", "referenceTopicId": "ref_relative_pronouns", "sectionIndices": [0]}
        ],
        # Battle 2 (Canossa)
        [
            {"title": "過去の時制と動詞の分類", "referenceTopicId": "ref_types_of_verbs", "sectionIndices": [0]}
        ],
        # Battle 3 (First Crusade)
        [
            {"title": "関係代名詞の見分け方と活用", "referenceTopicId": "ref_relative_pronouns", "sectionIndices": [1]}
        ]
    ],
    "ep_3_ex2": [
        # Battle 1 (Succession)
        [
            {"title": "動詞の時制と表現の使い分け", "referenceTopicId": "ref_types_of_verbs", "sectionIndices": [0]}
        ],
        # Battle 2 (4th Crusade)
        [
            {"title": "過去分詞の一致ルール", "referenceTopicId": "ref_non_finite_forms", "sectionIndices": [2]}
        ],
        # Battle 3 (Reformation)
        [
            {"title": "前置詞と定冠詞の縮約 (au, aux, du, des)", "referenceTopicId": "ref_contracted_articles", "sectionIndices": [0, 2]}
        ]
    ]
}

total_injected = 0
for ep in ch3.get('episodes', []):
    ep_id = ep.get('episodeId')
    seq = ep.get('sequence', [])
    new_seq = []
    
    tut_list = episode_tutorials.get(ep_id, [])
    battle_count = 0
    
    for step in seq:
        if step.get('type') == 'fixedBattle':
            # Check if there are pages configured for this battle
            if battle_count < len(tut_list):
                pages = tut_list[battle_count]
                tut_step = {
                    "type": "tutorial",
                    "title": "事前解説 (Préparation)",
                    "goal": "練習問題の前に、以下の文法・表現をおさらいしましょう。",
                    "pages": pages
                }
                new_seq.append(tut_step)
                total_injected += 1
            battle_count += 1
        elif step.get('type') == 'tutorial':
            # Skip any existing tutorial to replace cleanly
            continue
            
        new_seq.append(step)
        
    ep['sequence'] = new_seq

with open(ch3_path, 'w', encoding='utf-8') as f:
    json.dump(ch3, f, ensure_ascii=False, indent=2)

print(f"Successfully injected {total_injected} tutorials into Chapter 3!")
