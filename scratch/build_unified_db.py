import os
import json

workspace_dir = r"c:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"
quizzes_path = os.path.join(workspace_dir, "data", "quizzes.json")
output_path = os.path.join(workspace_dir, "data", "questions_db.json")

# Career Episode 1 Pool
ep1_basic_pool = [
    {
        "id": "q_career_0_1_1",
        "tags": ["#greetings", "#basic", "#A1"],
        "text": "「おはよう」や「こんにちは」を表す、最も一般的なフランス語の挨拶を入力してください。\n(Entrez la salutation standard du matin en français.)",
        "options": ["Bonjour", "Merci", "S'il vous plaît", "Enchanté"],
        "answerIndex": 0,
        "acceptedAnswers": ["Bonjour", "bonjour"],
        "explanation": "Bonjour は最も一般的な朝・日中の挨拶です。"
    },
    {
        "id": "q_career_0_1_2",
        "tags": ["#greetings", "#basic", "#A1"],
        "text": "「ありがとう」を意味するフランス語を入力してください。\n(Entrez le mot pour 'merci'.)",
        "options": ["Bonjour", "Merci", "S'il vous plaît", "Oui"],
        "answerIndex": 1,
        "acceptedAnswers": ["Merci", "merci"],
        "explanation": "Merci はフランス語の「ありがとう」です。"
    },
    {
        "id": "q_career_0_1_3",
        "tags": ["#subjects", "#basic", "#A1"],
        "text": "「私は（I）」に対応する、フランス語の主語人称代名詞を入力してください。\n(Entrez le pronom sujet pour 'Je'.)",
        "options": ["Tu", "Il", "Je", "Nous"],
        "answerIndex": 2,
        "acceptedAnswers": ["Je", "je"],
        "explanation": "フランス語の「私は」にあたる主語人称代名詞は Je です。"
    },
    {
        "id": "q_career_0_1_4",
        "tags": ["#etre", "#basic", "#A1"],
        "text": "「私は新人です（Je ___ nouveau.）」の空欄に入る、動詞 être の現在形活用を入力してください。\n(Entrez la forme correcte de être: Je ___ nouveau.)",
        "options": ["suis", "es", "est", "sommes"],
        "answerIndex": 0,
        "acceptedAnswers": ["suis", "Suis"],
        "explanation": "主語が Je のとき、être の現在形は suis になります。"
    },
    {
        "id": "q_career_0_1_4_b",
        "tags": ["#etre", "#basic", "#A1"],
        "text": "「君は準備ができている（Tu ___ prêt.）」の空欄に入る、動詞 être の現在形活用を入力してください。\n(Entrez la forme de être pour 'Tu'.)",
        "options": ["suis", "es", "est", "êtes"],
        "answerIndex": 1,
        "acceptedAnswers": ["es", "Es"],
        "explanation": "主語が Tu のとき、être の現在形は es になります。"
    },
    {
        "id": "q_career_0_1_4_c",
        "tags": ["#avoir", "#basic", "#A1"],
        "text": "「私は包丁を持っています（J'___ un couteau.）」の空欄に入る、動詞 avoir の一人称単数現在形を入力してください。\n(Entrez la forme de avoir pour 'Je'.)",
        "options": ["ai", "as", "a", "avons"],
        "answerIndex": 0,
        "acceptedAnswers": ["ai", "Ai"],
        "explanation": "主語が Je (j') のとき、avoir の現在形は ai になります。"
    },
    {
        "id": "q_career_0_1_4_d",
        "tags": ["#greetings", "#basic", "#A1"],
        "text": "「お願いします」を意味する丁寧なフランス語表現を入力してください。\n(Entrez 'please' en français.)",
        "options": ["Bonjour", "Merci", "S'il vous plaît", "Enchanté"],
        "answerIndex": 2,
        "acceptedAnswers": ["S'il vous plaît", "s'il vous plaît", "sil vous plait"],
        "explanation": "S'il vous plaît は「お願いします」を意味する丁寧な表現です。"
    }
]

ep1_applied_pool = [
    {
        "id": "q_career_0_1_5",
        "tags": ["#articles", "#gender", "#applied", "#A1"],
        "text": "「包丁・ナイフ（couteau）」は男性名詞です。不特定の「1本の包丁」を表す男性単数不定冠詞（___ couteau）を入力してください。\n(Entrez l'article indéfini pour 'couteau'.)",
        "options": ["un", "une", "des", "le"],
        "answerIndex": 0,
        "acceptedAnswers": ["un", "Un"],
        "explanation": "couteau は男性単数名詞なので、不定冠詞は un になります。"
    },
    {
        "id": "q_career_0_1_6",
        "tags": ["#articles", "#gender", "#applied", "#A1"],
        "text": "「片手鍋（casserole）」は女性名詞です。不特定の「1つの片手鍋」を表す女性単数不定冠詞（___ casserole）を入力してください。\n(Entrez l'article indéfini pour 'casserole'.)",
        "options": ["un", "une", "des", "la"],
        "answerIndex": 1,
        "acceptedAnswers": ["une", "Une"],
        "explanation": "casserole は女性単数名詞なので、不定冠詞は une になります。"
    },
    {
        "id": "q_career_0_1_7",
        "tags": ["#negation", "#applied", "#A1"],
        "text": "「私は包丁を持っていません」の否定文「Je n'ai pas ___ couteau.」の空欄に入る前置詞を入力してください。\n(Entrez la préposition de négation.)",
        "options": ["un", "du", "de", "le"],
        "answerIndex": 2,
        "acceptedAnswers": ["de", "De"],
        "explanation": "否定文 (ne...pas) の直接目的語に付く不定冠詞は de に変化します。"
    },
    {
        "id": "q_career_0_1_7_b",
        "tags": ["#articles", "#applied", "#A1"],
        "text": "「その料理長（chef / 男性名詞）」を表す男性単数定冠詞（___ chef）を入力してください。\n(Entrez l'article défini masculin: ___ chef.)",
        "options": ["le", "la", "les", "un"],
        "answerIndex": 0,
        "acceptedAnswers": ["le", "Le"],
        "explanation": "特定された男性単数名詞には定冠詞 le を使います。"
    },
    {
        "id": "q_career_0_1_7_c",
        "tags": ["#articles", "#applied", "#A1"],
        "text": "「その厨房（cuisine / 女性名詞）」を表す女性単数定冠詞（___ cuisine）を入力してください。\n(Entrez l'article défini féminin: ___ cuisine.)",
        "options": ["le", "la", "les", "une"],
        "answerIndex": 1,
        "acceptedAnswers": ["la", "La"],
        "explanation": "特定された女性単数名詞には定冠詞 la を使います。"
    },
    {
        "id": "q_career_0_1_7_d",
        "tags": ["#negation", "#applied", "#A1"],
        "text": "「私はお皿（assiette / 女性名詞）を持っていません」は「Je n'ai pas ___ assiette.」となります。空欄に入る語句を入力してください。\n(Entrez la préposition de négation devant voyelle.)",
        "options": ["de", "d'", "une", "l'"],
        "answerIndex": 1,
        "acceptedAnswers": ["d'", "d", "D'"],
        "explanation": "否定の de の後ろに母音で始まる名詞が続く場合、エリジオンして d' になります。"
    }
]

ep1_mixed_pool = [
    {
        "id": "q_career_0_1_8",
        "tags": ["#numbers", "#mixed", "#A1"],
        "text": "「3」を表すフランス語の数字を入力してください。\n(Entrez le nombre '3' en français.)",
        "options": ["deux", "trois", "quatre", "cinq"],
        "answerIndex": 1,
        "acceptedAnswers": ["trois", "Trois"],
        "explanation": "3はフランス語で trois と言います。"
    },
    {
        "id": "q_career_0_1_9",
        "tags": ["#plurals", "#mixed", "#A1"],
        "text": "「トマト（tomate / 女性名詞）」の複数不定形「いくつかのトマト」を表すフランス語（冠詞＋名詞の複数形）を入力してください。\n(Traduisez: some tomatoes)",
        "options": ["une tomate", "des tomate", "des tomatoes", "des tomates"],
        "answerIndex": 3,
        "acceptedAnswers": ["des tomates", "Des tomates"],
        "explanation": "複数不定冠詞 des と、名詞の末尾に s を付けた tomates を組み合わせます。"
    },
    {
        "id": "q_career_0_1_10",
        "tags": ["#avoir", "#mixed", "#A1"],
        "text": "「私たちは持っています（Nous ___）」の空欄に入る、動詞 avoir の現在形活用を入力してください。\n(Entrez la forme correcte de avoir: Nous ___)",
        "options": ["avons", "avez", "ont", "sommes"],
        "answerIndex": 0,
        "acceptedAnswers": ["avons", "Avons"],
        "explanation": "主語が Nous のとき、avoir の現在形は avons になります。"
    },
    {
        "id": "q_career_0_1_10_b",
        "tags": ["#etre", "#mixed", "#A1"],
        "text": "「彼らは〜です（Ils ___）」の空欄に入る、動詞 être の現在形活用を入力してください。\n(Entrez la forme de être pour 'Ils'.)",
        "options": ["sommes", "êtes", "sont", "ont"],
        "answerIndex": 2,
        "acceptedAnswers": ["sont", "Sont"],
        "explanation": "主語が Ils のとき、être の現在形は sont になります。"
    },
    {
        "id": "q_career_0_1_10_c",
        "tags": ["#numbers", "#mixed", "#A1"],
        "text": "「1」を表すフランス語の数字（男性形）を入力してください。\n(Entrez le chiffre '1' en français.)",
        "options": ["un", "une", "deux", "trois"],
        "answerIndex": 0,
        "acceptedAnswers": ["un", "Un"],
        "explanation": "1はフランス語で un と言います。"
    },
    {
        "id": "q_career_0_1_10_d",
        "tags": ["#numbers", "#mixed", "#A1"],
        "text": "「10」を表すフランス語の数字を入力してください。\n(Entrez le nombre '10'.)",
        "options": ["cinq", "huit", "neuf", "dix"],
        "answerIndex": 3,
        "acceptedAnswers": ["dix", "Dix"],
        "explanation": "10はフランス語で dix と書きます。"
    }
]

# Episode 2 Pools
ep2_basic_pool = [
    {
        "id": "q_career_0_2_1",
        "tags": ["#units", "#basic", "#A1"],
        "text": "「1リットルの牛乳」は「un litre ___ lait」と言います。空欄に入る前置詞を入力してください。\n(Entrez la préposition: un litre ___ lait.)",
        "options": ["de", "du", "le", "un"],
        "answerIndex": 0,
        "acceptedAnswers": ["de", "De"],
        "explanation": "分量や計量の単位を名詞と結ぶには前置詞 de を使います。"
    },
    {
        "id": "q_career_0_2_2",
        "tags": ["#numbers", "#basic", "#A1"],
        "text": "「200（two hundred）」を意味するフランス語を入力してください。\n(Entrez le nombre '200'.)",
        "options": ["deux cent", "deux cents", "deux centes", "cent deux"],
        "answerIndex": 1,
        "acceptedAnswers": ["deux cents", "deux cent", "Deux cents", "Deux cent"],
        "explanation": "200は deux cents と表現します。"
    },
    {
        "id": "q_career_0_2_3",
        "tags": ["#numbers", "#basic", "#A1"],
        "text": "「5」を意味するフランス語の数字を入力してください。\n(Entrez le chiffre '5'.)",
        "options": ["quatre", "cinq", "six", "sept"],
        "answerIndex": 1,
        "acceptedAnswers": ["cinq", "Cinq"],
        "explanation": "5はフランス語で cinq と書きます。"
    },
    {
        "id": "q_career_0_2_3_b",
        "tags": ["#units", "#basic", "#A1"],
        "text": "「1本の水（bouteille d'eau）」のように、容器を表す言葉を結ぶ前置詞（___ d'eau）を省略形で入力してください。\n(Entrez la préposition élidée.)",
        "options": ["de", "d'", "la", "une"],
        "answerIndex": 1,
        "acceptedAnswers": ["d'", "d", "D'"],
        "explanation": "母音で始まる水（eau）の前では前置詞 de は d' に縮約されます。"
    },
    {
        "id": "q_career_0_2_3_c",
        "tags": ["#numbers", "#basic", "#A1"],
        "text": "「7」を意味するフランス語の数字を入力してください。\n(Entrez le chiffre '7'.)",
        "options": ["six", "sept", "huit", "neuf"],
        "answerIndex": 1,
        "acceptedAnswers": ["sept", "Sept"],
        "explanation": "7はフランス語で sept と言います。"
    }
]

ep2_applied_pool = [
    {
        "id": "q_career_0_2_4",
        "tags": ["#numbers", "#applied", "#A1"],
        "text": "「15」を意味するフランス語の数字を入力してください。\n(Entrez le nombre '15'.)",
        "options": ["quatorze", "quinze", "seize", "dix-cinq"],
        "answerIndex": 1,
        "acceptedAnswers": ["quinze", "Quinze"],
        "explanation": "15はフランス語で quinze です。"
    },
    {
        "id": "q_career_0_2_5",
        "tags": ["#plurals", "#applied", "#A1"],
        "text": "「その包丁（複数形）」を表すフランス語（定冠詞複数＋名詞複数形）を入力してください。couteauの複数形はxがつく例外「couteaux」になります。\n(Traduisez: the knives)",
        "options": ["les couteaus", "les couteau", "les couteaux", "des couteaux"],
        "answerIndex": 2,
        "acceptedAnswers": ["les couteaux", "Les couteaux"],
        "explanation": "定冠詞の複数形 les と、複数形例外の couteaux を使います。"
    },
    {
        "id": "q_career_0_2_6",
        "tags": ["#numbers", "#applied", "#A1"],
        "text": "「12」を意味するフランス語の数字を入力してください。\n(Entrez le nombre '12'.)",
        "options": ["onze", "douze", "treize", "dix-deux"],
        "answerIndex": 1,
        "acceptedAnswers": ["douze", "Douze"],
        "explanation": "12はフランス語で物理的に douze です。"
    },
    {
        "id": "q_career_0_2_6_b",
        "tags": ["#plurals", "#applied", "#A1"],
        "text": "「それらの皿（複数形）」を表すフランス語（定冠詞複数＋名詞複数形）を入力してください。\n(Traduisez: the plates)",
        "options": ["l'assiette", "les assiette", "les assiettes", "des assiettes"],
        "answerIndex": 2,
        "acceptedAnswers": ["les assiettes", "Les assiettes"],
        "explanation": "特定されたお皿の複数形は les assiettes です。"
    },
    {
        "id": "q_career_0_2_6_c",
        "tags": ["#numbers", "#applied", "#A1"],
        "text": "「20」を意味するフランス語の数字を入力してください。\n(Entrez le nombre '20'.)",
        "options": ["dix", "vingt", "trente", "deux dix"],
        "answerIndex": 1,
        "acceptedAnswers": ["vingt", "Vingt"],
        "explanation": "20はフランス語で vingt と書きます。"
    }
]

ep2_mixed_pool = [
    {
        "id": "q_career_0_2_7",
        "tags": ["#negation", "#mixed", "#A1"],
        "text": "「私はオーブン（four / 男性名詞）を持っていません」は「Je n'ai pas ___ four.」となります。空欄に入る言葉を入力してください。\n(Entrez la préposition de négation.)",
        "options": ["un", "de", "le", "pas"],
        "answerIndex": 1,
        "acceptedAnswers": ["de", "De"],
        "explanation": "否定文では直接目的語の不定冠詞は de に変化します。"
    },
    {
        "id": "q_career_0_2_8",
        "tags": ["#numbers", "#mixed", "#A1"],
        "text": "「18」を表すフランス語の数字を入力してください（ハイフンを含めてください）。\n(Entrez le nombre '18'.)",
        "options": ["dix huit", "dix-huit", "dix-sept", "dix-neuf"],
        "answerIndex": 1,
        "acceptedAnswers": ["dix-huit", "Dix-huit"],
        "explanation": "18は dix-huit (10 + 8) です。"
    },
    {
        "id": "q_career_0_2_9",
        "tags": ["#etre", "#mixed", "#A1"],
        "text": "「彼らは厨房にいます（Ils ___ dans la cuisine.）」の空欄に入る、動詞 être の現在形活用を入力してください。\n(Entrez la forme de être pour 'Ils'.)",
        "options": ["suis", "sommes", "sont", "ont"],
        "answerIndex": 2,
        "acceptedAnswers": ["sont", "Sont"],
        "explanation": "主語が Ils のとき、être の現在形は sont です。"
    },
    {
        "id": "q_career_0_2_9_b",
        "tags": ["#avoir", "#mixed", "#A1"],
        "text": "「私たちは2本のナイフを持っています（Nous ___ deux couteaux.）」の空欄に入る、動詞 avoir の現在形活用を入力してください。\n(Entrez la forme de avoir pour 'Nous'.)",
        "options": ["avons", "avez", "ont", "sommes"],
        "answerIndex": 0,
        "acceptedAnswers": ["avons", "Avons"],
        "explanation": "主語が Nous のとき、avoir の現在形は avons になります。"
    },
    {
        "id": "q_career_0_2_9_c",
        "tags": ["#avoir", "#mixed", "#A1"],
        "text": "「あなたは〜を持っている（Vous ___）」の空欄に入る、動詞 avoir の二人称複数現在形を入力してください。\n(Entrez la forme de avoir pour 'Vous'.)",
        "options": ["avez", "avons", "ont", "êtes"],
        "answerIndex": 0,
        "acceptedAnswers": ["avez", "Avez"],
        "explanation": "主語が Vous のとき、avoir の現在形は avez になります。"
    }
]

# Phase 2 test questions:
phase2_test_questions = [
    {
        "id": "q_scramble_1",
        "tags": ["#scramble", "#etre", "#A1"],
        "type": "scramble",
        "text": "「私は新人です」となるようにフランス語を並び替えてください。",
        "words": ["nouveau.", "Je", "suis"],
        "answer": "Je suis nouveau.",
        "acceptedAnswers": ["Je suis nouveau.", "je suis nouveau"],
        "explanation": "Je（私は） + suis（である） + nouveau（新しい・新人）の順になります。"
    },
    {
        "id": "q_cloze_1",
        "tags": ["#cloze", "#avoir", "#A1"],
        "type": "cloze",
        "text": "空欄に入る正しい動詞を入力または選択してください。\n私たちは包丁を持っています。: Nous [avons] des couteaux.",
        "clozeText": "Nous [avons] des couteaux.",
        "options": ["avons", "avez", "ont", "sommes"],
        "answerIndex": 0,
        "acceptedAnswers": ["avons"],
        "explanation": "主語が Nous のとき、avoir の現在活用は avons です。"
    },
    {
        "id": "q_matching_1",
        "tags": ["#matching", "#greetings", "#A1"],
        "type": "matching",
        "text": "正しいペアを結びつけてください。",
        "pairs": [
            {"left": "Bonjour", "right": "こんにちは"},
            {"left": "Merci", "right": "ありがとう"},
            {"left": "S'il vous plaît", "right": "お願いします"}
        ],
        "explanation": "挨拶表現の正しい日本語訳のペアです。"
    }
]

# History RPG Chapter 0 Questions
history_ch0_pool = [
    {
        "id": "q_0_1_1",
        "tags": ["#regional_culture", "#A1"],
        "text": "マルセイユを含むプロヴァンス地方の伝統料理ではないものを選べ。\n(Quel plat n'est pas une spécialité de Provence ?)",
        "options": ["Bouillabaisse(ブイヤベース)", "Ratatouille(ラタトゥイユ)", "Daube provençale(ドーブ・プロヴァンサル)", "Quiche lorraine(キッシュロレーヌ)"],
        "answerIndex": 3,
        "acceptedAnswers": ["Quiche lorraine", "quiche lorraine"],
        "explanation": "Quiche lorraine（キッシュ・ロレーヌ）はフランス東北部ロレーヌ地方の伝統料理です。その他の料理はすべてプロヴァンス地方の名物（spécialité）です。"
    },
    {
        "id": "q_0_1_2",
        "tags": ["#regional_culture", "#A1"],
        "text": "ブイヤベース(Bouillabaisse)を作るのに最適な食材の組み合わせを選べ。\n(Quels ingrédients sont les meilleurs pour préparer une bouillabaisse ?)",
        "options": [
            "Poisson, tomate, ail, huile d'olive (魚・トマト・にんにく・オリーブオイル)",
            "Bœuf, carotte, vin rouge, oignon (牛肉・にんじん・赤ワイン・玉ねぎ)",
            "Aubergine, courgette, tomate, poivron (ナス・ズッキーニ・トマト・ピーマン)",
            "Poulet, champignon, vin blanc, crème (鶏肉・きのこ・白ワイン・クリーム)"
        ],
        "answerIndex": 0,
        "acceptedAnswers": ["Poisson, tomate, ail, huile d'olive", "poisson, tomate, ail, huile d'olive", "poisson", "Poisson", "A", "a"],
        "explanation": "正解はA。ブイヤベースはマルセイユ発祥の魚介料理で、魚（poisson）、トマト、にんにく、オリーブオイル、玉ねぎ、サフランなどが使われます。"
    },
    {
        "id": "q_0_1_3",
        "tags": ["#etre", "#A1"],
        "text": "文脈に合う正しいフランス語の並びを選べ。\n(Tu ___ le chevalier de Camille. / 君はカミーユの騎士です)",
        "options": [
            "Tu es le chevalier de Camille.",
            "Tu suis le chevalier de Camille.",
            "Tu as le chevalier de Camille.",
            "Tu fait le chevalier de Camille."
        ],
        "answerIndex": 0,
        "acceptedAnswers": ["Tu es le chevalier de Camille.", "tu es le chevalier de camille", "es", "Es"],
        "explanation": "正解はA。「Tu es ～」はêtre（〜である）の二人称単数活用で、「君は〜です」という意味になります。"
    },
    {
        "id": "q_0_2_1_1",
        "tags": ["#greetings", "#A1"],
        "text": "八百屋に対して、丁寧に「こんにちは。野菜をください」と伝えるのに最も適切なものはどれか。\n(Quel est le plus approprié ?)",
        "options": [
            "Bonjour ! Je voudrais acheter des légumes.",
            "Bonne nuit ! Je voudrais acheter des légumes.",
            "Au revoir ! Je voudrais acheter des légumes.",
            "Merci ! Je voudrais acheter des légumes."
        ],
        "answerIndex": 0,
        "acceptedAnswers": ["Bonjour ! Je voudrais acheter des légumes.", "bonjour ! je voudrais acheter des legumes."],
        "explanation": "Bonjour は日中の一般的な挨拶「こんにちは」です。Je voudrais + 動詞の原形（acheter=買う）で「〜したいです」という丁寧な表現になります。"
    },
    {
        "id": "q_0_2_1_2",
        "tags": ["#vegetables", "#A1"],
        "text": "「トマトを4個ください。」と伝える正しいフランス語を選べ。\n(Choisissez la bonne phrase.)",
        "options": [
            "Je voudrais quatre tomates.",
            "Je voudrais deux tomates.",
            "Je mange quatre tomates.",
            "Quatre tomates, merci."
        ],
        "answerIndex": 0,
        "acceptedAnswers": ["Je voudrais quatre tomates.", "je voudrais quatre tomates"],
        "explanation": "「Je voudrais + 数量 + 名詞」で丁寧な注文になります。quatre は「4」、tomates は「トマト」です。"
    },
    {
        "id": "q_0_2_1_3",
        "tags": ["#vegetables", "#A1"],
        "text": "「玉ねぎを1個ください」と伝える正しいフランス語を選べ。\n(Choisissez la bonne phrase.)",
        "options": [
            "Je voudrais un oignon.",
            "Tu voudrais un oignon.",
            "Je suis un oignon.",
            "J'ai un oignon."
        ],
        "answerIndex": 0,
        "acceptedAnswers": ["Je voudrais un oignon.", "je voudrais un oignon"],
        "explanation": "Je voudrais（私は〜が欲しいです）は、買い物や注文の際に最もよく使われる表現です。oignon は「玉ねぎ」です。"
    },
    {
        "id": "q_0_2_2_1",
        "tags": ["#ingredients", "#A1"],
        "text": "ブイヤベース用として最も適切な材料を指す単語はどれか。\n(Choisissez le bon ingrédient pour la bouillabaisse.)",
        "options": ["poisson", "bœuf", "poulet", "porc"],
        "answerIndex": 0,
        "acceptedAnswers": ["poisson", "Poisson"],
        "explanation": "poisson は「魚」を意味します。ブイヤベースは地中海の魚介をふんだんに使ったスープ料理です。"
    },
    {
        "id": "q_0_2_2_2",
        "tags": ["#units", "#A1"],
        "text": "「魚を1kgください」と注文する正しい表現を選べ。\n(Choisissez la bonne phrase.)",
        "options": [
            "Je voudrais un kilo de poisson.",
            "Je voudrais poisson un kilo.",
            "Un poisson kilo.",
            "Merci un kilo."
        ],
        "answerIndex": 0,
        "acceptedAnswers": ["Je voudrais un kilo de poisson.", "je voudrais un kilo de poisson"],
        "explanation": "分量を表すときは「数 + kilo(s) + de + 名詞」の語順になります。"
    },
    {
        "id": "q_0_3_1_1",
        "tags": ["#greetings", "#A1"],
        "text": "「助けてください！」に当てはまるフランス語は？\n(Comment dit-on 'Help me, please' ?)",
        "options": [
            "Regardez-moi, s'il vous plaît !",
            "Mangez-moi, s'il vous plaît !",
            "Aidez-moi, s'il vous plaît !",
            "Attendez-moi, s'il vous plaît !"
        ],
        "answerIndex": 2,
        "acceptedAnswers": ["Aidez-moi, s'il vous plaît !", "aidez-moi, s'il vous plaît !"],
        "explanation": "aider（助ける）の命令形 Aidez に moi（私を）と s'il vous plaît（お願いします）を繋げて「助けてください」となります。"
    },
    {
        "id": "q_0_3_1_2",
        "tags": ["#etre", "#A1"],
        "text": "「彼女はカミーユです。」に当てはまるフランス語は？\n(Traduisez: She is Camille.)",
        "options": ["Elle est Camille.", "Il est Camille.", "Elle a Camille.", "Elle suis Camille."],
        "answerIndex": 0,
        "acceptedAnswers": ["Elle est Camille.", "elle est camille"],
        "explanation": "Elle（彼女）に動詞 être（〜である）の三人称単数形 est を組み合わせて「Elle est Camille.」となります。"
    },
    {
        "id": "q_0_3_1_3",
        "tags": ["#subjects", "#A1"],
        "text": "「私は彼女を守ります。」に当てはまるフランス語は？\n(Traduisez: I protect Camille.)",
        "options": ["Je suis Camille.", "Je protège Camille.", "J'ai Camille.", "Je mange Camille."],
        "answerIndex": 1,
        "acceptedAnswers": ["Je protège Camille.", "je protege camille"],
        "explanation": "protéger（守る）の一人称単数現在形 protège を用いて「Je protège Camille.」となります。"
    },
    {
        "id": "q_0_3_2_1",
        "tags": ["#units", "#A1"],
        "text": "市場で店員に丁寧に「野菜を2kgください」と注文するとき、最も自然な表現はどれか。\n(Entrez la phrase correcte.)",
        "options": [
            "Je voudrais deux kilos de légumes.",
            "Je veux deux kilo des légumes.",
            "Je voudrais légumes deux kilos.",
            "Je suis deux kilos de légumes."
        ],
        "answerIndex": 0,
        "acceptedAnswers": ["Je voudrais deux kilos de légumes.", "je voudrais deux kilos de legumes"],
        "explanation": "「Je voudrais + 数量 + de + 名詞」で丁寧な注文になります。"
    },
    {
        "id": "q_0_3_2_2",
        "tags": ["#units", "#A1"],
        "text": "市場で「魚を1kg、肉を2kg、りんごを500gください」と正しく注文しているものはどれか。\n(Choisissez la phrase correcte.)",
        "options": [
            "Je voudrais un kilo poisson, deux kilos viande, cinq cents grammes pommes.",
            "Je voudrais un kilo de poisson, two kilos de viande, cinq cents grammes de pommes.",
            "Je voudrais un kilo de poisson, deux kilos de viande, cinq cents grammes de pommes.",
            "Je voudrais un poisson kilo, deux viande kilos, pommes grammes."
        ],
        "answerIndex": 2,
        "acceptedAnswers": [
            "Je voudrais un kilo de poisson, deux kilos de viande, cinq cents grammes de pommes.",
            "je voudrais un kilo de poisson, deux kilos de viande, cinq cents grammes de pommes"
        ],
        "explanation": "数量を表現する際は「数 + 単位 + de + 名詞」となります。kilo や gramme の後に de が必須です。"
    },
    {
        "id": "q_0_3_2_3",
        "tags": ["#nationality", "#A1"],
        "text": "市場で出会った人について「彼らは日本人です」と正しく表現しているものはどれか。\n(Choisissez la phrase correcte.)",
        "options": ["Ils êtes japonais.", "Ils sont Japonais.", "Ils être japonais.", "Ils ont japonais."],
        "answerIndex": 1,
        "acceptedAnswers": ["Ils sont Japonais.", "ils sont japonais"],
        "explanation": "Ils（彼ら）に対する être の活用は sont となります。また、国籍・民族を表す名詞は語頭を大文字（Japonais）にします。"
    },
    {
        "id": "q_0_3_2_4",
        "tags": ["#subjects", "#A1"],
        "text": "戦闘中、仲間が「彼を守ってください！」と叫びました。正しいフランス語はどれか。\n(Traduisez: Protect him!)",
        "options": ["Protégez-le !", "Le protégez !", "Protéger lui !", "Vous proteger-le !"],
        "answerIndex": 0,
        "acceptedAnswers": ["Protégez-le !", "protegez-le"],
        "explanation": "動詞protéger（守る）の命令形「Protégez !」の後に、目的語代名詞「le（彼を）」をハイフンで繋いで「Protégez-le !」とします。"
    },
    {
        "id": "q_0_3_2_5",
        "tags": ["#greetings", "#A1"],
        "text": "「こんにちは、マダム」に当てはまる最も適切なフランス語はどれか。\n(Traduisez: Hello, Madame.)",
        "options": ["Bonjour, Madame.", "Au revoir, Madame.", "Merci, Madame.", "Bonne nuit, Madame."],
        "answerIndex": 0,
        "acceptedAnswers": ["Bonjour, Madame.", "bonjour, madame"],
        "explanation": "Bonjour は昼間の一般的なあいさつ「こんにちは」です。"
    },
    {
        "id": "q_0_3_2_6",
        "tags": ["#nationality", "#A1"],
        "text": "「私たちは日本人です」に当てはまる正しいフランス語はどれか。\n(Traduisez: We are Japanese.)",
        "options": ["Nous sommes japonais.", "Nous êtes japonais.", "Nous suis japonais.", "Nous es japonais."],
        "answerIndex": 0,
        "acceptedAnswers": ["Nous sommes japonais.", "nous sommes japonais"],
        "explanation": "Nous（私たち）に対する être の活用は sommes になります。"
    }
]

def main():
    # Load existing quizzes
    with open(quizzes_path, 'r', encoding='utf-8') as f:
        quizzes = json.load(f)
        
    db = []
    
    # 1. Map existing quizzes to unified format
    for q in quizzes:
        category = q.get("category", "vocabulary")
        ans_str = q.get("answer")
        opts = q.get("options", [])
        
        try:
            ans_idx = opts.index(ans_str)
        except ValueError:
            ans_idx = 0
            
        db.append({
            "id": q.get("id"),
            "tags": [f"#{category}"],
            "type": "choice",
            "text": q.get("question"),
            "options": opts,
            "answerIndex": ans_idx,
            "acceptedAnswers": [ans_str, ans_str.lower()],
            "explanation": q.get("context", "")
        })
        
    # 2. Append all Career episode questions pools
    all_career = ep1_basic_pool + ep1_applied_pool + ep1_mixed_pool + ep2_basic_pool + ep2_applied_pool + ep2_mixed_pool + phase2_test_questions
    for cq in all_career:
        db.append(cq)
        
    # 3. Append History RPG Chapter 0 questions
    for hq in history_ch0_pool:
        db.append(hq)
        
    # Write unified questions database
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(db, f, ensure_ascii=False, indent=2)
        
    print(f"Created unified questions database at {output_path} with {len(db)} questions.")

if __name__ == "__main__":
    main()
