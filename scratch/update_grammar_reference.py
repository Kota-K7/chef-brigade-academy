import json
import os

workspace_dir = r"c:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"
ref_path = os.path.join(workspace_dir, "data", "grammar_reference.json")

def main():
    if not os.path.exists(ref_path):
        print(f"Error: {ref_path} not found")
        return

    with open(ref_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # 1. Expand ref_types_of_verbs
    types_of_verbs = next((x for x in data if x['id'] == 'ref_types_of_verbs'), None)
    if types_of_verbs:
        if not any("falloir" in x.get('title', '') for x in types_of_verbs['sections']):
            il_faut_section = {
                "type": "info",
                "title": "非人称動詞 « falloir » (il faut...) の使い方と厨房での重要性",
                "content_ja": "動詞 falloir は、「il faut + 不定詞 / 名詞」の形で、「〜しなければならない（義務）」「〜が必要だ（必要性）」を表す非人称動詞です（主語は常に三人称単数の il 固定で、特定の人物を指しません）。\n\n【基本表現パターン】\n① il faut + 不定詞（〜しなければならない）：\n・Il faut nettoyer le plan de travail. (作業台を掃除しなければならない。)\n・Il faut tourner la sauce doucement. (ソースをゆっくり混ぜなければならない。)\n\n② il faut + 名詞（〜が必要だ）：\n・Il faut du sel pour ce bouillon. (この出汁には塩が必要です。)\n・Il faut du temps pour cette cuisson. (この火入れには時間が必要です。)",
                "content_fr": "Le verbe falloir s'utilise uniquement à la forme impersonnelle 'il faut'. Il exprime l'obligation (il faut + infinitif) ou le besoin (il faut + nom)."
            }
            types_of_verbs['sections'].append(il_faut_section)
            print("Expanded ref_types_of_verbs with falloir section.")

    # 2. Expand ref_noun_genders
    noun_genders = next((x for x in data if x['id'] == 'ref_noun_genders'), None)
    if noun_genders:
        if not any("複数形" in x.get('title', '') for x in noun_genders['sections']):
            plural_section = {
                "type": "table",
                "title": "④ 名詞の複数形化の基本ルール (La formation du pluriel des noms)",
                "headers": ["規則・パターン", "説明", "単数形", "複数形と意味"],
                "rows": [
                    [
                        "通常のルール（語尾に -s）",
                        "最も一般的な複数形。名詞の末尾に -s を付加します（発音はしません）。",
                        "un plat\nune assiette",
                        "des plats (料理)\ndes assiettes (皿)"
                    ],
                    [
                        "語尾が -eau, -au, -eu の名詞（語尾に -x）",
                        "末尾に -s ではなく -x を付加します。",
                        "le couteau\nle gâteau\nle feu",
                        "les couteaux (包丁)\nles gâteaux (ケーキ)\nles feux (火)"
                    ],
                    [
                        "語尾が -s, -x, -z の名詞（変化なし）",
                        "すでにこれらの文字で終わっている名詞は、複数形してもスペルが変化しません。",
                        "un repas\nle nez",
                        "des repas (食事)\nles nez (鼻)"
                    ],
                    [
                        "不規則変化",
                        "特殊な変化をする名詞の一部です。",
                        "le travail",
                        "les travaux (仕事/作業)"
                    ]
                ]
            }
            noun_genders['sections'].append(plural_section)
            print("Expanded ref_noun_genders with plurals section.")

    # 3. Expand ref_questions
    questions = next((x for x in data if x['id'] == 'ref_questions'), None)
    if questions:
        words_table = next((s for s in questions['sections'] if s.get('type') == 'table' and '厨房で頻出する疑問詞' in s.get('title', '')), None)
        if words_table:
            if not any(r[0] == 'Qui' for r in words_table['rows']):
                words_table['rows'].extend([
                    [
                        "Qui",
                        "誰 (人)",
                        "Qui est là ? / C'est qui ?",
                        "そこにいるのは誰？ / 誰ですか？"
                    ],
                    [
                        "Que / Qu'est-ce que",
                        "何 (物事)",
                        "Que faites-vous ? / Qu'est-ce que vous faites ?",
                        "あなたは何をしていますか？"
                    ]
                ])
                print("Added Qui and Que to ref_questions interrogative table.")

        if not any("理由の応答" in x.get('title', '') for x in questions['sections']):
            questions_info_section = {
                "type": "info",
                "title": "疑問文における疑問詞の位置と理由の応答 (parce que)",
                "content_ja": "【疑問詞の位置パターン】\n疑問詞は、疑問文の形式（倒置・Est-ce que・口語）によって置かれる位置が変わります。\n1. 倒置形・Est-ce que形：疑問詞は「文頭」に置きます。\n   例: Où est-ce que tu vas ? / Où vas-tu ? (どこに行きますか？)\n2. 口語形：疑問詞は「文末」に置きます。\n   例: Tu vas où ? (どこに行くの？)\n\n【理由の応答 parce que】\nPourquoi (なぜ) で理由を聞かれた場合、回答は原則として Parce que... (〜だからです) で答えます。\n・質問：Pourquoi cuire à basse température ? (なぜ低温で調理するのですか？)\n・回答：Parce que la viande reste tendre. (肉が柔らかいまま保たれるからです。)",
                "content_fr": "Les mots interrogatifs se placent au début de la phrase avec 'est-ce que' ou l'inversion, et à la fin en langage familier. On répond à 'pourquoi' par 'parce que'."
            }
            questions['sections'].append(questions_info_section)
            print("Expanded ref_questions with question word positioning and parce que info.")

    # 4. Define new reference topics
    existing_ids = {x['id'] for x in data}

    ref_negation = {
        "id": "ref_negation",
        "title_fr": "La Négation (Ne... pas)",
        "title_en": "Negation",
        "title_ja": "否定文",
        "definition_fr": "La négation se forme principalement avec 'ne' et 'pas' autour du verbe conjugué. Devant une voyelle ou un h muet, 'ne' devient 'n''.",
        "definition_ja": "動詞を ne と pas で挟む最も基本的な否定の表現です。否定文では直接目的語の不定冠詞や部分冠詞が de (d') に変化する重要なルール（否定のde）があります。",
        "sections": [
            {
                "type": "table",
                "title": "1. 基本的な否定文の作り方",
                "headers": ["構造", "解説", "例文", "和訳"],
                "rows": [
                    [
                        "ne + 動詞 + pas",
                        "通常の動詞活用を ne と pas で挟みます。",
                        "Je ne comprends pas.",
                        "分かりません。"
                    ],
                    [
                        "n' + 動詞 + pas",
                        "動詞が母音や無声の h で始まる場合、ne が n' にエリジオンします。",
                        "Je n'ai pas de temps.",
                        "時間がありません。"
                    ]
                ]
            },
            {
                "type": "info",
                "title": "否定の de のルール (La règle du 'de' de négation)",
                "content_ja": "否定文で直接目的語に付く不定冠詞（un, une, des）や部分冠詞（du, de la, des）は、原則として「de」（母音・無声のhの前では「d'」）に変化します。ただし、動詞が être の場合は変化せず、そのままの冠詞を使います。\n・肯定：J'ai un couteau. (私は包丁を持っています)\n・否定：Je n'ai pas de couteau. (私は包丁を持っていません)\n・肯定：C'est un couteau. (それは包丁です)\n・否定：Ce n'est pas un couteau. (それは包丁ではありません ※êtreなので変化しない)",
                "content_fr": "Dans une phrase négative, les articles indéfinis (un, une, des) et partitifs (du, de la) se transforment en 'de' (ou 'd' devant une voyelle) après le verbe, sauf avec le verbe être."
            },
            {
                "type": "table",
                "title": "2. その他の否定表現",
                "headers": ["表現", "意味", "例文", "和訳"],
                "rows": [
                    [
                        "ne ... plus",
                        "もう〜ない (not anymore)",
                        "Il n'y a plus de beurre.",
                        "バターはもうありません。"
                    ],
                    [
                        "ne ... jamais",
                        "決して〜ない (never)",
                        "Je ne brûle jamais la viande.",
                        "私は肉を絶対に焦がしません。"
                    ],
                    [
                        "ne ... rien",
                        "何も〜ない (nothing)",
                        "Je ne prépare rien.",
                        "私は何も準備していません。"
                    ]
                ]
            },
            {
                "type": "examples",
                "title": "厨房での例文",
                "examples": [
                    {
                        "fr": "Je ne trouve pas la sauce béarnaise.",
                        "ja": "ベアルネーズソースが見つかりません。"
                    },
                    {
                        "fr": "N'oubliez pas de saler l'eau des pâtes.",
                        "ja": "パスタのお湯に塩を入れるのを忘れないでください。"
                    },
                    {
                        "fr": "Ce poisson n'est pas frais.",
                        "ja": "この魚は新鮮ではありません。"
                    }
                ]
            }
        ]
    }

    ref_imperative_with_pronouns = {
        "id": "ref_imperative_with_pronouns",
        "title_fr": "L'Impératif avec les Pronoms",
        "title_en": "Imperative with Pronouns",
        "title_ja": "命令形と代名詞",
        "definition_fr": "En français, la position des pronoms compléments change selon que la phrase impérative est affirmative ou négative. À l'impératif affirmatif, les pronoms sont placés après le verbe.",
        "definition_ja": "肯定命令文と否定命令文で目的語代名詞（直接・間接）の位置が変わるルールです。肯定命令では代名詞を動詞の後に置き、否定命令では動詞の前に置きます。",
        "sections": [
            {
                "type": "table",
                "title": "1. 肯定命令文での語順（動詞 - 代名詞）",
                "headers": ["ルール", "代名詞の変化", "例文", "和訳"],
                "rows": [
                    [
                        "動詞の直後にハイフンで繋ぐ",
                        "me / te はそれぞれ後置されると moi / toi に変化します。",
                        "Passez-moi le sel !\nRegardez-moi !",
                        "私に塩を回してください！\n私を見てください！"
                    ],
                    [
                        "二重目的語の場合 (COD + COI)",
                        "直接目的語(le/la/les) ＋ 間接目的語(moi/toi/lui/nous/vous/leur) の順になります。",
                        "Donnez-le-moi.\nApportez-la-lui.",
                        "それを私にください。\nそれを彼/彼女に持って行ってください。"
                    ]
                ]
            },
            {
                "type": "table",
                "title": "2. 否定命令文での語順（通常の語順）",
                "headers": ["ルール", "代名詞の位置", "例文", "和訳"],
                "rows": [
                    [
                        "代名詞は動詞の前に戻る",
                        "moi / toi も通常の me / te に戻ります。ne [代名詞] [動詞] pas.",
                        "Ne me le donnez pas.\nNe lui en parlez pas.",
                        "それを私に与えないでください。\n彼にそのことを話さないでください。"
                    ]
                ]
            },
            {
                "type": "info",
                "title": "厨房でのポイント",
                "content_ja": "サービス（営業）中の厨房は一分一秒を争うため、「Passez-le-moi !（それを私に渡して！）」「Mettez-y du sel.（そこに塩を入れて）」といった、命令文＋代名詞の表現が非常に多く飛び交います。素早い指示のやり取りに必須の構文です。",
                "content_fr": "En cuisine, l'usage de l'impératif avec pronoms is indispensable pour donner des ordres rapides pendant le service."
            },
            {
                "type": "examples",
                "title": "厨房での例文",
                "examples": [
                    {
                        "fr": "Montrez-moi votre technique de taillage !",
                        "ja": "あなたの切り方の技術を私に見せてください！ (仕込み指導)"
                    },
                    {
                        "fr": "Ce plat est prêt, envoyez-le tout de suite !",
                        "ja": "この料理は完成しました、すぐにデシャップ（ホール）へ出してください！ (サービス中)"
                    },
                    {
                        "fr": "Ne le laissez pas brûler sur le feu !",
                        "ja": "火の上でそれを焦がさないようにしなさい！ (注意喚起)"
                    }
                ]
            }
        ]
    }

    ref_relative_pronouns = {
        "id": "ref_relative_pronouns",
        "title_fr": "Les Pronoms Relatifs (Qui et Que)",
        "title_en": "Relative Pronouns",
        "title_ja": "関係代名詞 (qui / que)",
        "definition_fr": "Les pronoms relatifs servent à relier deux propositions pour éviter la répétition. 'Qui' est sujet de la proposition relative et 'que' est complément d'objet direct.",
        "definition_ja": "先行詞（名詞）を後ろから説明する節を作る接続語です。関係代名詞の中で最も基本的な qui（主格：〜する名詞）と que（目的格：〜を...する名詞）の使い方を解説します。",
        "sections": [
            {
                "type": "table",
                "title": "1. 関係代名詞 qui と que の役割と使い分け",
                "headers": ["代名詞", "役割", "直後に続くもの", "例文と和訳"],
                "rows": [
                    [
                        "qui",
                        "主格 (〜である名詞)",
                        "動詞 (または助動詞/代名詞)",
                        "Le chef qui cuisine... (調理しているシェフ...)\nLe bouillon qui a mijoté... (コトコト煮込んだ出汁...)"
                    ],
                    [
                        "que (qu')",
                        "目的格 (〜を...する名詞)",
                        "主語 ＋ 動詞",
                        "La sauce que je prépare... (私が準備しているソース...)\nLe dessert qu'elle vient de réaliser... (彼女が作ったばかりのデザール...)"
                    ]
                ]
            },
            {
                "type": "info",
                "title": "qui と que の簡単な見分け方とエリジオン",
                "content_ja": "【直後を見る鉄則】\n・関係代名詞のすぐ後ろが「動詞」なら、主語を表す qui を選びます（例: Le couteau qui coupe bien. よく切れるナイフ）。qui は後ろの母音と合体（エリジオン）しません。\n・関係代名詞のすぐ後ろが「主語(人称代名詞や名詞)」なら、目的語を表す que を選びます（例: Le couteau que j'utilise. 私が使うナイフ）。que は後ろに母音で始まる言葉が来ると qu' にエリジオンします（例: Le dessert qu'il aime. 彼が好きなデザート）。",
                "content_fr": "On utilise 'qui' suivi d'un verbe, et 'que' suivi d'un sujet + verbe. 'Que' s'élide en 'qu'' devant une voyelle."
            },
            {
                "type": "examples",
                "title": "厨房での例文",
                "examples": [
                    {
                        "fr": "Voici le bouillon qui a mijoté pendant quatre heures.",
                        "ja": "これが4時間コトコト煮込んだ出汁（ブイヨン）です。 (仕込みの確認)"
                    },
                    {
                        "fr": "C'est la recette que le chef nous a transmise.",
                        "ja": "これはシェフが私たちに伝授してくれたレシピです。 (料理の由来)"
                    },
                    {
                        "fr": "Goûtons le dessert qu'elle vient de réaliser.",
                        "ja": "彼女が作ってくれたばかりのデセールを試食してみましょう。 (試食会)"
                    }
                ]
            }
        ]
    }

    ref_causative_faire = {
        "id": "ref_causative_faire",
        "title_fr": "Le Factitif (faire + infinitif)",
        "title_en": "Causative Structure",
        "title_ja": "使役構文 (faire + 不定詞)",
        "definition_fr": "La structure 'faire + infinitif' exprime le fait de faire faire quelque chose à quelqu'un ou par quelqu'un. Le sujet ne réalise pas l'action lui-même, il la fait exécuter.",
        "definition_ja": "「主語 ＋ faire ＋ 不定詞（動詞の原形）」で、「〜させる」「〜してもらう」という使役の意味を表します。厨房の現場では、調理指示や客観的な動作を引き起こす際によく使われます。",
        "sections": [
            {
                "type": "table",
                "title": "1. 使役構文の基本パターンと語順",
                "headers": ["パターン", "構造とルール", "例文と和訳"],
                "rows": [
                    [
                        "直接目的語 (COD) のみ",
                        "行為者を明示せず、「〜を...させる/してもらう」という形。\nfaire + 不定詞 + 名詞.",
                        "Je fais cuire la viande.\n(私は肉を焼かせます/焼くようにします。)"
                    ],
                    [
                        "COD と行為者 (COI)",
                        "「人に〜を...させる」という場合、行為者は前置詞 à を伴って間接目的語 (COI) の位置になります。\nfaire + 不定詞 + 名詞 + à 人.",
                        "Le chef fait goûter la sauce à l'apprenti.\n(シェフは見習いにソースを味見させます。)"
                    ]
                ]
            },
            {
                "type": "info",
                "title": "代名詞を伴う場合の語順",
                "content_ja": "使役表現で「それを〜させる」「彼に〜させる」などの代名詞を使う場合、代名詞は「faire の前」に置かれます（不定詞の前ではありません）。\n・肯定文：Je la fais cuire. (私はそれを焼きます/焼かせます。 ※laはfaireの前)\n・否定文：Je ne la fais pas cuire. (私はそれを焼きません/焼かせません。)\n・人に思わせる：Cette sauce me fait penser au Japon. (このソースは私に日本を連想させます/思わせます。)",
                "content_fr": "Les pronoms compléments se placent devant le verbe faire conjugué, et non devant l'infinitif."
            },
            {
                "type": "examples",
                "title": "厨房での例文",
                "examples": [
                    {
                        "fr": "Faites bouillir l'eau avant d'ajouter les pâtes.",
                        "ja": "パスタを入れる前にお湯を沸騰させてください。"
                    },
                    {
                        "fr": "Je fais refroidir le gâteau sur une grille.",
                        "ja": "私はケーキを網の上で冷まします (冷まさせます)。"
                    },
                    {
                        "fr": "Le chef fait dresser les assiettes par le commis.",
                        "ja": "シェフはコミュ（見習い）にお皿の盛り付けをさせます。"
                    }
                ]
            }
        ]
    }

    ref_adverbs = {
        "id": "ref_adverbs",
        "title_fr": "Les Adverbes (Manière, Temps, Ordre)",
        "title_en": "Adverbs",
        "title_ja": "副詞（様態・手順・頻度）",
        "definition_fr": "Les adverbes modifient un verbe, un adjectif ou un autre adverbe. En cuisine, ils indiquent la manière d'effectuer un geste, l'ordre des étapes ou la fréquence d'une action.",
        "definition_ja": "動詞や形容詞、他の副詞を修飾する言葉です。厨房では、調理動作の手順（まず、次に）や加減・様態（優しく、細かく）、作業の頻度などを指示・説明するために頻繁に使用されます。",
        "sections": [
            {
                "type": "table",
                "title": "1. 様態の副詞（-ment で終わる副詞の作り方）",
                "headers": ["作り方のルール", "例", "例文と和訳"],
                "rows": [
                    [
                        "形容詞の女性形 ＋ -ment",
                        "doux (穏やかな/男) ➔ douce (女) ➔ doucement (優しく、ゆっくり)\nfin (細かな/男) ➔ fine (女) ➔ finement (細かく)",
                        "Mélangez doucement.\n(優しく混ぜてください。)\nHachez finement l'oignon.\n(玉ねぎを細かく刻んでください。)"
                    ],
                    [
                        "母音で終わる男性形容詞 ➔ そのまま -ment を足す",
                        "rapide (速い) ➔ rapidement (迅速に)\npoli (丁寧な) ➔ poliment (丁寧に)",
                        "Travaillez rapidement !\n(迅速に作業しなさい！)"
                    ]
                ]
            },
            {
                "type": "table",
                "title": "2. 調理手順・時系列を表す副詞",
                "headers": ["副詞", "意味", "例文", "和訳"],
                "rows": [
                    [
                        "D'abord",
                        "まず、最初に",
                        "D'abord, préparez la mise en place.",
                        "まず、仕込みの準備をしてください。"
                    ],
                    [
                        "Ensuite / Puis",
                        "次に、それから",
                        "Ensuite, faites chauffer la poêle.",
                        "次に、フライパンを熱してください。"
                    ],
                    [
                        "Enfin",
                        "最後に、ついに",
                        "Enfin, dressez l'assiette.",
                        "最後に、お皿に盛り付けてください。"
                    ]
                ]
            },
            {
                "type": "info",
                "title": "頻度・時間を表す副詞の位置",
                "content_ja": "toujours (常に、いつも) や souvent (よく、しばしば) などの短い頻度の副詞は、通常「活用している動詞の直後」に置きます。\n例：\n・Un cuisinier fait toujours attention. (料理人は常に注意を払う。 ※fait の後ろ)\n・Je nettoie souvent mon plan de travail. (私はよく自分の作業台を掃除します。)",
                "content_fr": "Les adverbes de fréquence courts se placent généralement après le verbe conjugué."
            },
            {
                "type": "examples",
                "title": "厨房での例文",
                "examples": [
                    {
                        "fr": "Coupez les carottes finement.",
                        "ja": "にんじんを細かく（千切りやみじん切りに）カットしてください。"
                    },
                    {
                        "fr": "D'abord, lavez les légumes, ensuite épluchez-les.",
                        "ja": "まず野菜を洗い、次にそれらの皮をむいてください。"
                    },
                    {
                        "fr": "Il faut remuer la sauce constantemente.",
                        "ja": "ソースは絶えずかき混ぜる必要があります。"
                    }
                ]
            }
        ]
    }

    ref_conditional = {
        "id": "ref_conditional",
        "title_fr": "Le Conditionnel Présent et les Phrases en 'Si'",
        "title_en": "Conditional Present and 'Si' Clauses",
        "title_ja": "条件法現在と仮定文",
        "definition_fr": "Le conditionnel présent est utilisé pour exprimer un souhait, un conseil, une hypothèse ou une demande polie. Les phrases avec 'si' expriment une condition.",
        "definition_ja": "丁寧な依頼や提案（〜したいのですが、〜すべきです）や、「もし〜なら〜だろう」という現在の事実とは異なる仮定を表現する構文です。",
        "sections": [
            {
                "type": "table",
                "title": "1. 条件法現在の語幹と活用（丁寧な表現・アドバイス）",
                "headers": ["動詞", "主語と活用", "用法・意味", "例文と和訳"],
                "rows": [
                    [
                        "vouloir",
                        "Je voudrais",
                        "丁寧な要望 (〜したいのですが)",
                        "Je voudrais proposer un dessert.\n(デザートを提案したいのですが。)"
                    ],
                    [
                        "devoir",
                        "Vous devriez",
                        "助言・アドバイス (〜すべきです)",
                        "Vous devriez nettoyer la table.\n(テーブルを掃除した方がいいですよ。)"
                    ]
                ]
            },
            {
                "type": "table",
                "title": "2. Si を用いた条件節・仮定表現",
                "headers": ["条件（Si節）", "帰結節", "ニュアンス", "例文と和訳"],
                "rows": [
                    [
                        "Si + 直説法現在形",
                        "直説法単純未来形",
                        "現実的な仮定・可能性",
                        "Si vous ajoutez du sel, le goût sera meilleur.\n(塩を加えれば、完璧な味になるでしょう。)"
                    ],
                    [
                        "Si + 直説法半過去形",
                        "条件法現在形",
                        "現在における非現実の仮定",
                        "Si j'avais du temps, je ferais ce gâteau.\n(もし時間があれば、このケーキを作るのだが。)"
                    ]
                ]
            },
            {
                "type": "examples",
                "title": "厨房での例文",
                "examples": [
                    {
                        "fr": "Je recommanderais d'associer ce vin avec le canard.",
                        "ja": "このワインを鴨肉と合わせることをお勧めします。"
                    },
                    {
                        "fr": "Si le client arrive, servez-le immédiatement.",
                        "ja": "もしお客様が到着したら、すぐに料理を出してください。"
                    }
                ]
            }
        ]
    }

    ref_pronouns = {
        "id": "ref_pronouns",
        "title_fr": "Les Pronoms Adverbiaux (Y et En)",
        "title_en": "Adverbial Pronouns (Y and En)",
        "title_ja": "中性代名詞 (y / en)",
        "definition_fr": "Les pronoms 'en' et 'y' remplacent des compléments introduits par 'de' (quantité, provenance) ou 'à' (lieu, concept) pour éviter la répétition.",
        "definition_ja": "前置詞 de や à に続く語句を置き換える代名詞です。数量を表す en（いくつかのそれ）や、場所・対象を表す y（そこに、それを）があり、会話を簡潔にするために不可欠です。",
        "sections": [
            {
                "type": "table",
                "title": "1. 中性代名詞 en の使い方 (部分・数量の代用)",
                "headers": ["役割", "置き換えるもの", "例文", "和訳"],
                "rows": [
                    [
                        "部分冠詞・不定冠詞 ＋ 名詞",
                        "de + 名詞 (いくつかのそれ、いくらかのそれ)",
                        "Tu as du beurre ? - Oui, j'en ai.\n(バターはある？ - うん、あるよ。)"
                    ],
                    [
                        "数量の表現",
                        "名詞部分を en で置き換え、数量は文末に残す",
                        "Combien de couteaux as-tu ? - J'en ai deux.\n(包丁を何本持ってる？ - 2本持ってるよ。)"
                    ]
                ]
            },
            {
                "type": "table",
                "title": "2. 中性代名詞 y の使い方 (場所・間接目的の代用)",
                "headers": ["役割", "置き換えるもの", "例文", "和訳"],
                "rows": [
                    [
                        "前置詞 à / dans ＋ 場所",
                        "そこに / そこへ (場所の代用)",
                        "Tu vas à la cuisine ? - Oui, j'y vais.\n(厨房に行く？ - うん、行くよ。)"
                    ],
                    [
                        "penser à などの対象",
                        "それに (物事・行為の代用)",
                        "Pensez à la recette. ➔ Pensez-y.\n(レシピを意識して。 ➔ それを意識して。)"
                    ]
                ]
            },
            {
                "type": "info",
                "title": "肯定命令文における位置とハイフン",
                "content_ja": "肯定命令文では、y や en は動詞の直後にハイフンで繋いで置かれます。\n・Ajoutez du sel dans la soupe. ➔ Ajoutez-en. (スープに塩を入れて ➔ それを入れて)\n・Mettez du beurre là-dedans. ➔ Mettez-y. (そこにバターを入れて ➔ そこに入れて)",
                "content_fr": "À l'impératif affirmatif, 'y' et 'en' se placent après le verbe avec un trait d'union."
            }
        ]
    }

    ref_passive = {
        "id": "ref_passive",
        "title_fr": "La Voix Passive",
        "title_en": "Passive Voice",
        "title_ja": "受動態",
        "definition_fr": "La voix passive met en valeur l'action subie par le sujet. Elle se construit avec le verbe 'être' conjugué suivi du participe passé, qui s'accorde avec le sujet.",
        "definition_ja": "「主語 ＋ être ＋ 過去分詞（＋ par ＋ 行為者）」で、「〜される」という受け身の意味を表します。過去分詞は主語の性と数に必ず一致します。",
        "sections": [
            {
                "type": "table",
                "title": "1. 受動態の基本構造と性数一致",
                "headers": ["主語の性・数", "構造 (être + 過去分詞)", "例文", "和訳"],
                "rows": [
                    [
                        "女性・単数",
                        "過去分詞の末尾に -e",
                        "La tarte est préparée par le chef.\n(タルトはシェフによって準備される。)"
                    ],
                    [
                        "男性・複数",
                        "過去分詞の末尾に -s",
                        "Les légumes sont coupés par le commis.\n(野菜は見習いによって切られる。)"
                    ]
                ]
            },
            {
                "type": "table",
                "title": "2. 時制の変化（現在形・複合過去・未来形）",
                "headers": ["時制", "構造", "例文", "和訳"],
                "rows": [
                    [
                        "現在形",
                        "êtreの現在 ＋ 過去分詞",
                        "Le plat est cuisiné.",
                        "料理は作られる。"
                    ],
                    [
                        "複合過去",
                        "avoirの現在 + été + 過去分詞",
                        "La sauce a été faite par le sous-chef.",
                        "ソースはスーシェフによって作られた。"
                    ],
                    [
                        "単純未来",
                        "êtreの未来 + 過去分詞",
                        "Ces assiettes seront dressées.",
                        "これらのお皿は盛り付けられるだろう。"
                    ]
                ]
            }
        ]
    }

    ref_subjunctive = {
        "id": "ref_subjunctive",
        "title_fr": "Le Subjonctif Présent",
        "title_en": "Subjunctive Mood",
        "title_ja": "接続法現在",
        "definition_fr": "Le subjonctif exprime un doute, un souhait, une émotion, une nécessité ou une obligation. Il s'utilise après 'que' dans des structures impersonnelles ou personnelles.",
        "definition_ja": "事実ではなく、話し手の主観（感情、疑惑、義務、必要性、願望など）を表す動詞の「法」です。通常、que を伴う節の中で用いられます。",
        "sections": [
            {
                "type": "table",
                "title": "1. 義務・必要性の表現 (Il faut que + 接続法)",
                "headers": ["表現", "活用する動詞", "例文", "和訳"],
                "rows": [
                    [
                        "Il faut que tu fasses...",
                        "faire (fass-)",
                        "Il faut que tu fasses attention.",
                        "君は注意を払わなければならない。"
                    ],
                    [
                        "Il faut que vous soyez...",
                        "être (soy-)",
                        "Il faut que vous soyez prêts.",
                        "あなたたちは準備ができていなければならない。"
                    ],
                    [
                        "Il faut qu'il cuise...",
                        "cuire (cuis-)",
                        "Il faut qu'il cuise la viande.",
                        "彼は肉を焼かなければならない。"
                    ]
                ]
            },
            {
                "type": "table",
                "title": "2. 感情や要望の接続法",
                "headers": ["主節の表現", "ニュアンス", "例文", "和訳"],
                "rows": [
                    [
                        "Je veux que...",
                        "願望・要求 (〜してほしい)",
                        "Je veux que vous finissiez ce soir.",
                        "私はあなたたちに今夜終わらせてほしい。"
                    ],
                    [
                        "Pourvu que...",
                        "祈願・強い望み (〜でありさえすれば)",
                        "Pourvu qu'elle sache la recette.",
                        "彼女がレシピを知ってさえいればよいが。"
                    ]
                ]
            }
        ]
    }

    # Append new topics if they don't already exist in the reference JSON
    new_refs = [
        ref_negation,
        ref_imperative_with_pronouns,
        ref_relative_pronouns,
        ref_causative_faire,
        ref_adverbs,
        ref_conditional,
        ref_pronouns,
        ref_passive,
        ref_subjunctive
    ]

    for nr in new_refs:
        if nr['id'] not in existing_ids:
            data.append(nr)
            existing_ids.add(nr['id'])
            print(f"Added new grammar reference topic: {nr['id']}")

    with open(ref_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print("Grammar reference JSON file updated successfully with all 9 new topics.")

if __name__ == '__main__':
    main()
