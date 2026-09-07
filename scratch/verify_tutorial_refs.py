import io, sys, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('data/grammar_reference.json', 'r', encoding='utf-8') as f:
    refs = json.load(f)

ref_map = {r['id']: r for r in refs}

proposed_tutorials = {
    # ep_3_1
    "ep_3_1_b1": [
        {"title": "命令法（指示と号令）", "referenceTopicId": "ref_imperative", "sectionIndices": [0]},
        {"title": "単純未来の作り方と活用", "referenceTopicId": "ref_future_tenses", "sectionIndices": [0]}
    ],
    "ep_3_1_b2": [
        {"title": "単純未来の不規則語幹", "referenceTopicId": "ref_future_tenses", "sectionIndices": [1]},
        {"title": "冠詞の種類（定冠詞・不定冠詞）", "referenceTopicId": "ref_definite_indefinite_articles", "sectionIndices": [0]}
    ],
    "ep_3_1_b3": [
        {"title": "命令法と未来表現の総まとめ", "referenceTopicId": "ref_future_tenses", "sectionIndices": [0, 1]}
    ],
    # ep_3_2
    "ep_3_2_b1": [
        {"title": "直接・間接目的語人称代名詞", "referenceTopicId": "ref_object_pronouns", "sectionIndices": [0]},
        {"title": "複合過去と過去分詞の性数一致", "referenceTopicId": "ref_non_finite_forms", "sectionIndices": [2]}
    ],
    "ep_3_2_b2": [
        {"title": "目的語人称代名詞の語順と位置", "referenceTopicId": "ref_object_pronouns", "sectionIndices": [1]}
    ],
    # ep_3_3
    "ep_3_3_b1": [
        {"title": "形容詞の性数一致と用法", "referenceTopicId": "ref_adjective_agreement", "sectionIndices": [0]},
        {"title": "所有形容詞 (mon, ton, son...)", "referenceTopicId": "ref_possessive_adjectives", "sectionIndices": [0]}
    ],
    "ep_3_3_b2": [
        {"title": "基本形容詞の位置と性数一致", "referenceTopicId": "ref_adjective_agreement", "sectionIndices": [0]},
        {"title": "所有形容詞の応用", "referenceTopicId": "ref_possessive_adjectives", "sectionIndices": [1]}
    ],
    # ep_3_ex1
    "ep_3_ex1_b1": [
        {"title": "関係代名詞 qui と que の役割", "referenceTopicId": "ref_relative_pronouns", "sectionIndices": [0]}
    ],
    "ep_3_ex1_b2": [
        {"title": "過去の時制と動詞の分類", "referenceTopicId": "ref_types_of_verbs", "sectionIndices": [0]}
    ],
    "ep_3_ex1_b3": [
        {"title": "関係代名詞の見分け方と活用", "referenceTopicId": "ref_relative_pronouns", "sectionIndices": [1]}
    ],
    # ep_3_ex2
    "ep_3_ex2_b1": [
        {"title": "動詞の時制と表現の使い分け", "referenceTopicId": "ref_types_of_verbs", "sectionIndices": [0]}
    ],
    "ep_3_ex2_b2": [
        {"title": "過去分詞の一致ルール", "referenceTopicId": "ref_non_finite_forms", "sectionIndices": [2]}
    ],
    "ep_3_ex2_b3": [
        {"title": "前置詞と定冠詞の縮約 (au, aux, du, des)", "referenceTopicId": "ref_contracted_articles", "sectionIndices": [0, 2]}
    ]
}

all_ok = True
for key, pages in proposed_tutorials.items():
    print(f"\nChecking {key}:")
    for p in pages:
        ref_id = p['referenceTopicId']
        if ref_id not in ref_map:
            print(f"  [ERROR] ref_id '{ref_id}' NOT found!")
            all_ok = False
            continue
        topic = ref_map[ref_id]
        print(f"  [OK] Topic '{ref_id}': {topic['title_ja']}")
        for sec_idx in p['sectionIndices']:
            if sec_idx < len(topic.get('sections', [])):
                sec = topic['sections'][sec_idx]
                print(f"    Sec {sec_idx}: {sec.get('title')}")
            else:
                print(f"    [ERROR] Sec {sec_idx} out of range (max {len(topic.get('sections', []))-1})")
                all_ok = False

print(f"\nOverall Validation: {'ALL OK' if all_ok else 'FAILED'}")
