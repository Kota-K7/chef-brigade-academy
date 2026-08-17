import json
import os

workspace_dir = r"c:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"
ref_path = os.path.join(workspace_dir, "data", "grammar_reference.json")

# Load existing references
with open(ref_path, "r", encoding="utf-8") as f:
    refs = json.load(f)

# Check if already exists
if any(r["id"] == "ref_sentence_structure" for r in refs):
    print("ref_sentence_structure already exists in grammar_reference.json")
else:
    new_topic = {
        "id": "ref_sentence_structure",
        "title_fr": "La structure de la phrase simple",
        "title_en": "Basic Sentence Structure",
        "title_ja": "フランス語の基本語順（平叙文と否定文）",
        "definition_fr": "La phrase simple en français suit l'ordre Sujet + Verbe + Objet. La négation encadre le verbe.",
        "definition_ja": "フランス語の基本的な語順は「主語 ＋ 動詞 ＋ 目的語（補語）」です。否定文では動詞の前後に ne と pas を置きます。前置詞や冠詞を伴う例文で構造を理解しましょう。",
        "sections": [
            {
                "type": "table",
                "title": "1. フランス語の基本語順 (L'ordre des mots)",
                "headers": ["構造", "解説", "例文", "和訳"],
                "rows": [
                    [
                        "主語 + 動詞",
                        "最もシンプルな構造です。",
                        "Le chef sourit.",
                        "シェフが微笑む。"
                    ],
                    [
                        "主語 + 動詞 + 目的語 (冠詞あり)",
                        "目的語（名詞）の前には、通常、冠詞を置きます。",
                        "Je prépare une sauce.",
                        "私はソースを準備します。（Je = 主語, prépare = 動詞, une = 不定冠詞, sauce = 名詞）"
                    ],
                    [
                        "主語 + 動詞 + 前置詞 + 名詞",
                        "出身や場所を示す際、前置詞 (de, à 等) が必要です。",
                        "Je viens du Japon.",
                        "私は日本から来ました。（viens = 動詞, du = de+le の縮約前置詞）"
                    ]
                ]
            },
            {
                "type": "table",
                "title": "2. 否定文の作り方 (La négation simple)",
                "headers": ["構造", "解説", "例文", "和訳"],
                "rows": [
                    [
                        "ne + 動詞 + pas",
                        "動詞の前後を ne と pas で挟みます。",
                        "Je ne mange pas de viande.",
                        "私は肉を食べません。（否定の de に変化）"
                    ],
                    [
                        "n' + 動詞 + pas",
                        "動詞が母音や無声の h で始まる場合、ne が n' にエリジオン（母音縮小）します。",
                        "Je n'habite pas à Paris.",
                        "私はパリに住んでいません。（Je = 主語, n'habite pas = 否定動詞, à = 前置詞, Paris = 都市名）"
                    ]
                ]
            },
            {
                "type": "table",
                "title": "3. 前置詞と冠詞の位置ルール",
                "headers": ["ルール", "例文", "意味", "ポイント"],
                "rows": [
                    [
                        "動詞 + 前置詞 + 冠詞 + 名詞",
                        "J'habite dans la cuisine.",
                        "私は厨房の中に住んでいます。",
                        "dans（前置詞）の後に la（定冠詞）が並びます。"
                    ],
                    [
                        "動詞 + 前置詞 + 冠詞の縮約",
                        "Je vais à la gare.",
                        "私は駅に行きます。",
                        "à la は縮約されずそのままです。(※男性名詞の à + le は au に縮約されます)"
                    ]
                ]
            }
        ]
    }
    
    # Prepend the new topic
    refs.insert(0, new_topic)
    
    with open(ref_path, "w", encoding="utf-8") as f:
        json.dump(refs, f, ensure_ascii=False, indent=2)
    print("Successfully added ref_sentence_structure to grammar_reference.json")
