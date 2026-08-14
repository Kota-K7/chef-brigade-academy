import os
import json

workspace_dir = r"c:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"
questions_path = os.path.join(workspace_dir, "rpg", "questions_db.json")
grammar_ref_path = os.path.join(workspace_dir, "data", "grammar_reference.json")

# --- Questions to add ---
new_questions_ch2 = [
    # #contracted_articles
    {
        "id": "q_career_2_1_contracted_1",
        "tags": ["#contracted_articles", "#basic", "#A1"],
        "type": "typing",
        "text": "「私は市場に行きます」は「Je vais ___ marché.」です。前置詞 à と定冠詞 le の縮約形を入力してください。\n(Complétez : Je vais ___ marché. (à + le))",
        "acceptedAnswers": ["au"],
        "explanation": "à + le (男性単数) は au に縮約されます。"
    },
    {
        "id": "q_career_2_1_contracted_2",
        "tags": ["#contracted_articles", "#basic", "#A1"],
        "type": "typing",
        "text": "「りんごのタルト」は「Tarte ___ pommes.」です。前置詞 à と定冠詞 les の縮約形を入力してください。\n(Complétez : Tarte ___ pommes. (à + les))",
        "acceptedAnswers": ["aux"],
        "explanation": "à + les (複数名詞の前) は aux に縮約されます。"
    },
    {
        "id": "q_career_2_1_contracted_3",
        "tags": ["#contracted_articles", "#basic", "#A1"],
        "type": "typing",
        "text": "「シェフのナイフ」は「le couteau ___ chef.」です。前置詞 de と定冠詞 le の縮約形を入力してください。\n(Complétez : le couteau ___ chef. (de + le))",
        "acceptedAnswers": ["du"],
        "explanation": "de + le (男性単数) は du に縮約されます。"
    },
    {
        "id": "q_career_2_1_contracted_4",
        "tags": ["#contracted_articles", "#basic", "#A1"],
        "type": "typing",
        "text": "「野菜の選択」は「le choix ___ légumes.」です。前置詞 de と定冠詞 les の縮約形を入力してください。\n(Complétez : le choix ___ légumes. (de + les))",
        "acceptedAnswers": ["des"],
        "explanation": "de + les (複数名詞の前) は des に縮約されます。"
    },
    {
        "id": "q_career_2_1_contracted_5",
        "tags": ["#contracted_articles", "#basic", "#A1"],
        "type": "typing",
        "text": "「玉ねぎのスープ」は「Soupe ___ l'oignon」です。oignon は母音で始まる男性名詞なので、à と定冠詞はどのように置かれますか？\n(Complétez : Soupe ___ l'oignon (à + l'))",
        "acceptedAnswers": ["à"],
        "explanation": "母音や無声の h で始まる単数名詞の前では縮約せず、à l' となります。"
    },
    # #demonstrative_cest
    {
        "id": "q_career_2_1_cest_1",
        "tags": ["#demonstrative_cest", "#basic", "#A1"],
        "type": "typing",
        "text": "「それはオーブンです」は「___ un four.」です。空欄に提示表現の単数形を入力してください。\n(Complétez : ___ un four. (It is))",
        "acceptedAnswers": ["C'est", "c'est"],
        "explanation": "単数の物を指して「それは〜です」と言うときは C'est を使用します。"
    },
    {
        "id": "q_career_2_1_cest_2",
        "tags": ["#demonstrative_cest", "#basic", "#A1"],
        "type": "typing",
        "text": "「これらは玉ねぎです」は「___ des oignons.」です。空欄に提示表現の複数形を入力してください。\n(Complétez : ___ des oignons. (These are))",
        "acceptedAnswers": ["Ce sont", "ce sont"],
        "explanation": "複数の名詞の前で「これらは〜です」と言うときは Ce sont を使用します。"
    },
    {
        "id": "q_career_2_1_cest_3",
        "tags": ["#demonstrative_cest", "#basic", "#A1"],
        "type": "typing",
        "text": "「それは佐伯スーシェフのものです」は「C'est ___ sous-chef Saeki.」です。à + le の縮約形を入力してください。\n(Complétez : C'est ___ sous-chef Saeki. (It belongs to the...))",
        "acceptedAnswers": ["au"],
        "explanation": "「誰々のもの」は C'est à + 人 で表します。à + le sous-chef は au sous-chef となります。"
    },
    # #imperative
    {
        "id": "q_career_2_2_imperative_1",
        "tags": ["#imperative", "#basic", "#A1"],
        "type": "typing",
        "text": "「（君、）玉ねぎを切りなさい！」は「___ les oignons !」です。動詞 couper の tu に対する命令形を入力してください。\n(Complétez : ___ les oignons ! (couper - tu))",
        "acceptedAnswers": ["Coupe"],
        "explanation": "-er で終わる第一群動詞の tu に対する命令形は、語尾の s を取り除いて Coupe となります。"
    },
    {
        "id": "q_career_2_2_imperative_2",
        "tags": ["#imperative", "#basic", "#A1"],
        "type": "typing",
        "text": "「（あなた方、）生地を仕上げてください！」は「___ la pâte !」です。動詞 finir の vous に対する命令形を入力してください。\n(Complétez : ___ la pâte ! (finir - vous))",
        "acceptedAnswers": ["Finissez"],
        "explanation": "vous に対する命令形は、直説法現在形の vous 活用と同じ Finissez となります。"
    },
    {
        "id": "q_career_2_2_imperative_3",
        "tags": ["#imperative", "#basic", "#A1"],
        "type": "typing",
        "text": "「（私たち、）仕込みを始めましょう！」は「___ la mise en place !」です。動詞 commencer の nous に対する命令形を入力してください。\n(Complétez : ___ la mise en place ! (commencer - nous))",
        "acceptedAnswers": ["Commençons"],
        "explanation": "nous に対する命令形は、直説法現在形の nous 活用と同じ Commençons となります。"
    },
    {
        "id": "q_career_2_2_imperative_4",
        "tags": ["#imperative", "#basic", "#A1"],
        "type": "typing",
        "text": "「ここに来て！（親しい相手に）」は「___ ici !」です。動詞 venir の tu に対する命令形を入力してください。\n(Complétez : ___ ici ! (venir - tu))",
        "acceptedAnswers": ["Viens"],
        "explanation": "venir の tu に対する現在形 viens から主語を取り除き Viens となります。"
    },
    # #irregular_verbs_1
    {
        "id": "q_career_2_2_irregular_verbs_1_1",
        "tags": ["#irregular_verbs_1", "#applied", "#A1"],
        "type": "typing",
        "text": "「私はこのフライパンを取ります」は「Je ___ cette poêle.」です。動詞 prendre の Je に対する現在形活用を入力してください。\n(Complétez : Je ___ cette poêle. (prendre))",
        "acceptedAnswers": ["prends"],
        "explanation": "prendre の Je に対する現在形は prends です。"
    },
    {
        "id": "q_career_2_2_irregular_verbs_1_2",
        "tags": ["#irregular_verbs_1", "#applied", "#A1"],
        "type": "typing",
        "text": "「彼はそれを火にかけます（置きます）」は「Il ___ la poêle sur le feu.」です。動詞 mettre の Il に対する現在形活用を入力してください。\n(Complétez : Il ___ la poêle sur le feu. (mettre))",
        "acceptedAnswers": ["met"],
        "explanation": "mettre の Il に対する現在形は met です。"
    },
    {
        "id": "q_career_2_2_irregular_verbs_1_3",
        "tags": ["#irregular_verbs_1", "#applied", "#A1"],
        "type": "typing",
        "text": "「あなた方は何をしますか？」は「Que ___ -vous ?」です。動詞 faire の vous に対する現在形活用を入力してください。\n(Complétez : Que ___ -vous ? (faire))",
        "acceptedAnswers": ["faites"],
        "explanation": "faire の vous に対する現在形は faites です。"
    },
    # #object_pronouns_basic
    {
        "id": "q_career_2_2_pronouns_1",
        "tags": ["#object_pronouns_basic", "#applied", "#A1"],
        "type": "typing",
        "text": "「私はそれを切ります（le couteau男性単数を指す）」は「Je ___ coupe.」です。空欄に直接目的語代名詞を入力してください。\n(Complétez : Je ___ coupe. (I cut it))",
        "acceptedAnswers": ["le"],
        "explanation": "男性単数名詞を置き換える直接目的語代名詞は le です。"
    },
    {
        "id": "q_career_2_2_pronouns_2",
        "tags": ["#object_pronouns_basic", "#applied", "#A1"],
        "type": "typing",
        "text": "「それを火にかけて！（la poêle女性単数を指す）」は「Mets-___ sur le feu !」です。空欄に肯定命令文での直接目的語代名詞を入力してください。\n(Complétez : Mets-___ sur le feu ! (Put it on the fire!))",
        "acceptedAnswers": ["la"],
        "explanation": "女性単数名詞を置き換える直接目的語代名詞は la です。肯定命令では動詞の後ろにハイフンで繋ぎます。"
    },
    {
        "id": "q_career_2_2_pronouns_3",
        "tags": ["#object_pronouns_basic", "#applied", "#A1"],
        "type": "typing",
        "text": "「それを私に渡して！」は「Donne-le-___ !」です。空欄に入る人称代名詞を入力してください。\n(Complétez : Donne-le-___ ! (Give it to me!))",
        "acceptedAnswers": ["moi"],
        "explanation": "肯定命令文で間接目的語「私に」を表す場合は moi になります。"
    },
    {
        "id": "q_career_2_2_pronouns_4",
        "tags": ["#object_pronouns_basic", "#applied", "#A1"],
        "type": "typing",
        "text": "「それをそこに置かないで！」は「Ne le ___ pas là !」です。空欄に入る動詞 mettre の tu に対する命令形を入力してください。\n(Complétez : Ne le ___ pas là ! (Don't put it there!))",
        "acceptedAnswers": ["mets"],
        "explanation": "否定命令文では代名詞 le は動詞の「前」に置かれます。"
    },
    # #near_future
    {
        "id": "q_career_2_3_near_future_1",
        "tags": ["#near_future", "#basic", "#A1"],
        "type": "typing",
        "text": "「私はこれからそれを焼きます」は「Je ___ le cuire.」です。空欄に近接未来を作るための aller の活用を入力してください。\n(Complétez : Je ___ le cuire. (I am going to cook it))",
        "acceptedAnswers": ["vais"],
        "explanation": "近接未来は「aller + 動詞の原形」で作ります。Je に対する aller は vais です。"
    },
    {
        "id": "q_career_2_3_near_future_2",
        "tags": ["#near_future", "#basic", "#A1"],
        "type": "typing",
        "text": "「私たちはこれからガレットを作ります」は「Nous ___ faire une galette.」です。空欄に入る aller の活用を入力してください。\n(Complétez : Nous ___ faire une galette.)",
        "acceptedAnswers": ["allons"],
        "explanation": "Nous に対する aller の現在形は allons です。"
    },
    # #near_past
    {
        "id": "q_career_2_3_near_past_1",
        "tags": ["#near_past", "#basic", "#A1"],
        "type": "typing",
        "text": "「ちょうど終わったところです」は「Je ___ de finir.」です。空欄に入る venir の活用を入力してください。\n(Complétez : Je ___ de finir. (I have just finished))",
        "acceptedAnswers": ["viens"],
        "explanation": "近接過去は「venir + de + 動詞の原形」で作ります。Je に対する venir は viens です。"
    },
    {
        "id": "q_career_2_3_near_past_2",
        "tags": ["#near_past", "#basic", "#A1"],
        "type": "typing",
        "text": "「彼はちょうど始めたばかりです」は「Il ___ de commencer.」です。空欄に入る venir の活用を入力してください。\n(Complétez : Il ___ de commencer.)",
        "acceptedAnswers": ["vient"],
        "explanation": "Il に対する venir の現在形は vient です。"
    },
    # #passive_pronominal_verbs
    {
        "id": "q_career_2_3_passive_pronominal_1",
        "tags": ["#passive_pronominal_verbs", "#applied", "#A1"],
        "type": "typing",
        "text": "「それはどのように準備されますか？」は「Ça ___ prépare comment ?」です。空欄に入る代名動詞の再帰代名詞を入力してください。\n(Complétez : Ça ___ prépare comment ? (How is that prepared?))",
        "acceptedAnswers": ["se"],
        "explanation": "三人称（Ça）に対する代名動詞の再帰代名詞は se になります。「Ça se prépare」で「それは準備される」という受動的な意味を表します。"
    }
]

# --- Grammar topics to add ---
new_grammar_topics_ch2 = [
    {
        "id": "ref_contracted_articles",
        "title_fr": "La Contraction des Articles (au, aux, du, des)",
        "title_en": "Contracted Articles",
        "title_ja": "前置詞と定冠詞の縮約",
        "definition_fr": "La fusion obligatoire des prépositions 'à' (direction, manière) et 'de' (provenance, possession) avec les articles définis 'le' et 'les'.",
        "definition_ja": "前置詞 à（〜へ、〜に、〜を使った）および de（〜の、〜から）が、定冠詞 le, les と合体して別の1語になるルールです。女性の la や、母音始まりの l' の前では合体しません。",
        "sections": [
            {
                "type": "table",
                "title": "1. 前置詞 à と定冠詞の縮約 (à + article)",
                "headers": ["元の形", "縮約形", "発音", "例文と和訳"],
                "rows": [
                    ["à + le (男性単数)", "au", "オ", "Je vais au marché. (私は市場へ行く。)"],
                    ["à + la (女性単数)", "à la", "ア ラ", "Je vais à la cuisine. (私は厨房へ行く。)"],
                    ["à + l' (母音・h始まり単数)", "à l'", "ア ル", "Soupe à l'oignon. (玉ねぎのスープ。)"],
                    ["à + les (男女複数)", "aux", "オ", "Tarte aux pommes. (りんごのタルト。)"]
                ]
            },
            {
                "type": "table",
                "title": "2. 前置詞 de と定冠詞の縮約 (de + article)",
                "headers": ["元の形", "縮約形", "発音", "例文と和訳"],
                "rows": [
                    ["de + le (男性単数)", "du", "デュ", "Le couteau du chef. (シェフのナイフ。)"],
                    ["de + la (女性単数)", "de la", "ドゥ ラ", "La sauce de la chef. (女性シェフのソース。)"],
                    ["de + l' (母音・h始まり単数)", "de l'", "ドゥ ル", "L'eau de l'évier. (シンクの水。)"],
                    ["de + les (男女複数)", "des", "デ", "Le choix des légumes. (野菜の選択。)"]
                ]
            }
        ]
    },
    {
        "id": "ref_demonstrative_cest",
        "title_fr": "Présenter avec C'est et Ce sont",
        "title_en": "Presenting with C'est and Ce sont",
        "title_ja": "提示表現 c'est / ce sont",
        "definition_fr": "Comment présenter, identifier ou poser des questions sur des personnes ou des objets en cuisine.",
        "definition_ja": "「これは〜です」「これらは〜です」と、目の前にある人や物を指し示したり、状態を確認したりする表現です。",
        "sections": [
            {
                "type": "table",
                "title": "1. 基本構造 (C'est / Ce sont)",
                "headers": ["形式", "対応する名詞", "例文", "和訳"],
                "rows": [
                    [
                        "C'est (セ)",
                        "単数名詞 / 形容詞",
                        "C'est un four.\nC'est prêt !",
                        "これはオーブンです。\n準備完了です！"
                    ],
                    [
                        "Ce sont (ス ソン)",
                        "複数名詞",
                        "Ce sont des oignons.",
                        "これらは玉ねぎです。"
                    ]
                ]
            },
            {
                "type": "table",
                "title": "2. 所有・所属の表現 (C'est à + 人)",
                "headers": ["表現", "意味", "例文", "和訳"],
                "rows": [
                    [
                        "C'est à ...",
                        "〜のものです",
                        "C'est à qui ?\nC'est au chef Saeki.",
                        "これは誰のもの？\n佐伯シェフのものです。"
                    ]
                ]
            }
        ]
    },
    {
        "id": "ref_imperative",
        "title_fr": "L'Impératif (Donner des ordres et des instructions)",
        "title_en": "The Imperative (Commands)",
        "title_ja": "命令法（指示と号令）",
        "definition_fr": "La conjugaison spéciale utilisée pour donner des ordres, des conseils ou exprimer des interdictions rapides.",
        "definition_ja": "厨房などの現場で素早く「〜しなさい」「〜してください」と指示するための表現です。主語（tu, nous, vous）を省いて作ります。",
        "sections": [
            {
                "type": "table",
                "title": "1. 命令形の作り方 (Formation de l'impératif)",
                "headers": ["対象", "作り方と規則", "例文", "和訳"],
                "rows": [
                    [
                        "tu (親しい相手・後輩)",
                        "直説法現在形の tu 活用から主語を省く。\n※第一群動詞(-er)は語尾の -s を取り除きます。",
                        "Coupe les tomates !\nPrends la poêle !",
                        "トマトを切れ！\nフライパンを取って！"
                    ],
                    [
                        "vous (丁寧・複数人)",
                        "直説法現在形の vous 活用から主語を省く。",
                        "Coupez les tomates !\nPrenez la poêle !",
                        "トマトを切ってください！\nフライパンを取ってください！"
                    ],
                    [
                        "nous (私たち)",
                        "直説法現在形の nous 活用から主語を省く。「〜しましょう」の提案になります。",
                        "Coupons les légumes !",
                        "野菜を切りましょう！"
                    ]
                ]
            }
        ]
    },
    {
        "id": "ref_object_pronouns",
        "title_fr": "Les Pronoms Compléments d'Objet (le, la, les, lui, leur)",
        "title_en": "Object Pronouns",
        "title_ja": "目的語人称代名詞",
        "definition_fr": "Les pronoms utilisés pour remplacer les noms d'objets ou de personnes afin de rendre la communication plus rapide.",
        "definition_ja": "会話での繰り返しを避け、指示を短縮するための代名詞（「それを」「彼に」など）です。通常は動詞の直前に置きます。",
        "sections": [
            {
                "type": "table",
                "title": "1. 目的格代名詞の分類 (Directs et Indirects)",
                "headers": ["種類", "代名詞", "意味", "例文と和訳"],
                "rows": [
                    ["直接目的 (COD / 〜を)", "le", "それ（男性単数）を", "Je le coupe. (私はそれを切る。)"],
                    ["直接目的 (COD / 〜を)", "la", "それ（女性単数）を", "Je la prends. (私はそれを取る。)"],
                    ["直接目的 (COD / 〜を)", "les", "それら（複数）を", "Je les lave. (私はそれらを洗う。)"],
                    ["間接目的 (COI / 〜に)", "lui", "彼 / 彼女に", "Je lui donne le sel. (私は彼に塩を渡す。)"],
                    ["間接目的 (COI / 〜に)", "leur", "彼らに", "Je leur donne le pain. (私は彼らにパンを渡す。)"]
                ]
            },
            {
                "type": "table",
                "title": "2. 命令文での特殊な語順と変化",
                "headers": ["文の種類", "語順のルール", "例文", "和訳"],
                "rows": [
                    [
                        "肯定命令文 (〜しろ！)",
                        "代名詞は動詞の後ろに置き、ハイフンで繋ぐ。\n※ me/te は後置されると moi/toi に変わります。",
                        "Donne-le-moi !",
                        "それを私に渡して！"
                    ],
                    [
                        "否定命令文 (〜するな！)",
                        "通常の語順（代名詞が動詞の前）に戻ります。",
                        "Ne le mets pas là !",
                        "それをそこに置くな！"
                    ]
                ]
            }
        ]
    },
    {
        "id": "ref_near_future_past",
        "title_fr": "Le Futur Proche et le Passé Récent",
        "title_en": "Near Future and Near Past",
        "title_ja": "近接未来と近接過去",
        "definition_fr": "Exprimer des actions imminentes (aller + infinitif) ou des actions tout juste terminées (venir + de + infinitif).",
        "definition_ja": "時間経過が非常に近い出来事を表す、実用的な現在時制ベースの表現です。厨房でのタスク進捗のやり取りで最も多用されます。",
        "sections": [
            {
                "type": "table",
                "title": "1. 近接未来 (Le Futur Proche) : 〜するつもりだ / 〜しそうだ",
                "headers": ["作り方", "意味・特徴", "例文", "和訳"],
                "rows": [
                    [
                        "aller の現在活用 ＋ 動詞の原形",
                        "「今すぐ〜する」「これから〜する」という確実性の高い近い未来の予定。",
                        "Je vais le cuire.\nNous allons commencer.",
                        "私はこれからそれを焼きます。\n私たちはこれから始めます。"
                    ]
                ]
            },
            {
                "type": "table",
                "title": "2. 近接過去 (Le Passé Récent) : 〜したばかりだ",
                "headers": ["作り方", "意味・特徴", "例文", "和訳"],
                "rows": [
                    [
                        "venir の現在活用 ＋ de ＋ 動詞の原形",
                        "「たった今〜し終えたばかりだ」という直近の過去の完了。",
                        "Je viens de finir.\nIl vient de commencer.",
                        "ちょうど終わったところです。\n彼は始めたばかりです。"
                    ]
                ]
            }
        ]
    },
    {
        "id": "ref_pronominal_verbs",
        "title_fr": "Les Verbes Pronominaux (se ...)",
        "title_en": "Pronominal Verbs",
        "title_ja": "代名動詞（受動・再帰）",
        "definition_fr": "L'usage des verbes pronominaux avec le pronom réfléchi 'se' pour exprimer l'action faite à soi-même ou pour désigner la passivité.",
        "definition_ja": "動詞の前に再帰代名詞（seなど）を伴い、「自分を〜する」または「〜される（受動的用法）」を表す表現です。",
        "sections": [
            {
                "type": "table",
                "title": "1. 再帰代名詞の変化 (Pronoms réfléchis)",
                "headers": ["人称", "代名詞", "例文", "和訳"],
                "rows": [
                    ["je", "me (m')", "Je me prépare.", "私は準備をします。"],
                    ["tu", "te (t')", "Tu te laves.", "君は体を洗う。"],
                    ["il / elle / on", "se (s')", "Ça se prépare.", "それは準備される。"],
                    ["nous", "nous", "Nous nous lavons.", "私たちは洗う。"],
                    ["vous", "vous", "Vous vous préparez.", "あなたは準備をする。"],
                    ["ils / elles", "se (s')", "Ils se préparent.", "彼らは準備をする。"]
                ]
            },
            {
                "type": "table",
                "title": "2. 厨房で頻出する受動用法",
                "headers": ["動詞", "意味", "例文", "和訳"],
                "rows": [
                    [
                        "se préparer",
                        "準備される / 作られる",
                        "Ça se prépare comment ?",
                        "それはどうやって作られますか？"
                    ],
                    [
                        "se manger",
                        "食べられる",
                        "Ce plat se mange chaud.",
                        "この料理は温かい状態で食べられます。"
                    ]
                ]
            }
        ]
    }
]

def update_db():
    print(f"Loading questions from {questions_path}...")
    with open(questions_path, 'r', encoding='utf-8') as f:
        q_db = json.load(f)
    
    existing_q_ids = {q["id"] for q in q_db}
    q_added = 0
    for q in new_questions_ch2:
        if q["id"] not in existing_q_ids:
            q_db.append(q)
            q_added += 1
            
    with open(questions_path, 'w', encoding='utf-8') as f:
        json.dump(q_db, f, ensure_ascii=False, indent=2)
    print(f"Appended {q_added} new questions. Total in database: {len(q_db)}")
    
    print(f"Loading grammar refs from {grammar_ref_path}...")
    with open(grammar_ref_path, 'r', encoding='utf-8') as f:
        g_refs = json.load(f)
        
    existing_g_ids = {g["id"] for g in g_refs}
    g_added = 0
    for g in new_grammar_topics_ch2:
        if g["id"] not in existing_g_ids:
            g_refs.append(g)
            g_added += 1
            
    with open(grammar_ref_path, 'w', encoding='utf-8') as f:
        json.dump(g_refs, f, ensure_ascii=False, indent=2)
    print(f"Appended {g_added} new grammar topics. Total in reference: {len(g_refs)}")

if __name__ == "__main__":
    update_db()
