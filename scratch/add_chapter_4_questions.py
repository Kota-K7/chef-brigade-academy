import json
import os

workspace_dir = r"c:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"
db_path = os.path.join(workspace_dir, "rpg", "questions_db.json")

new_questions = [
    # 1. #causative_faire
    {
        "id": "q_causative_01",
        "tags": ["#causative_faire"],
        "type": "choice",
        "text": "Complétez la phrase : 'Je ___ refroidir la soupe sur le comptoir.' (私はカウンターの上でスープを冷まします/冷まさせます)",
        "options": ["fais", "rends", "veux", "laisse"],
        "answerIndex": 0,
        "acceptedAnswers": ["fais"],
        "explanation": "「faire + 不定詞」で「〜させる」という使役を表します。Je fais refroidir で「冷ます（冷めるようにする）」となります。"
    },
    {
        "id": "q_causative_02",
        "tags": ["#causative_faire"],
        "type": "choice",
        "text": "Remplissez le vide : 'Faites ___ l'eau avant d'ajouter les pâtes.' (パスタを入れる前にお湯を沸騰させてください)",
        "options": ["bouillir", "cuire", "fondre", "refroidir"],
        "answerIndex": 0,
        "acceptedAnswers": ["bouillir"],
        "explanation": "Faites bouillir で「沸騰させる（沸騰するようにする）」という使役表現になります。"
    },
    {
        "id": "q_causative_03",
        "tags": ["#causative_faire"],
        "type": "choice",
        "text": "Complétez : 'Le chef fait ___ le plat par le commis.' (シェフはコミュ（見習い）に料理の盛り付けをさせます)",
        "options": ["dresser", "manger", "laver", "brûler"],
        "answerIndex": 0,
        "acceptedAnswers": ["dresser"],
        "explanation": "dresser は「盛り付ける」という意味の動詞です。fait dresser で「盛り付けさせる」となります。"
    },
    {
        "id": "q_causative_04",
        "tags": ["#causative_faire"],
        "type": "choice",
        "text": "Choisissez le verbe correct : 'Cette sauce me fait ___ au Japon.' (このソースは私に日本を思い起こさせます)",
        "options": ["penser", "cuisiner", "aimer", "venir"],
        "answerIndex": 0,
        "acceptedAnswers": ["penser"],
        "explanation": "faire penser à... で「〜を考えさせる/思い起こさせる」という使役表現になります。"
    },
    {
        "id": "q_causative_05",
        "tags": ["#causative_faire"],
        "type": "choice",
        "text": "Remplissez le vide : 'Cette tarte est presque cuite, je la ___ dorer encore un peu.' (このタルトはほぼ焼き上がっています。もう少し焼き色をつけさせます)",
        "options": ["fais", "laisse", "veux", "peux"],
        "answerIndex": 0,
        "acceptedAnswers": ["fais"],
        "explanation": "dorer（焼き色をつける）を使役にして「焼き色をつけさせる（そうなるようにする）」ため la fais dorer とします。"
    },

    # 2. #subjunctive_basic
    {
        "id": "q_sub_01",
        "tags": ["#subjunctive_basic"],
        "type": "choice",
        "text": "Complétez au subjonctif : 'Il faut que tu ___ la viande lentement.' (あなたは肉をゆっくり焼かなければならない)",
        "options": ["cuises", "cuis", "cuise", "cuisesse"],
        "answerIndex": 0,
        "acceptedAnswers": ["cuises"],
        "explanation": "cuire の二人称単数 tu に対する接続法現在形は cuises です。"
    },
    {
        "id": "q_sub_02",
        "tags": ["#subjunctive_basic"],
        "type": "choice",
        "text": "Complétez au subjonctif : 'Je veux que vous ___ la mise en place tout de suite.' (あなたたちに今すぐ仕込みをしてほしい)",
        "options": ["fassiez", "faites", "fasse", "faisiez"],
        "answerIndex": 0,
        "acceptedAnswers": ["fassiez"],
        "explanation": "faire の二人称複数 vous に対する接続法現在形は不規則変化の fassiez です。"
    },
    {
        "id": "q_sub_03",
        "tags": ["#subjunctive_basic"],
        "type": "choice",
        "text": "Complétez au subjonctif : 'Il est nécessaire qu'il ___ présent en cuisine.' (彼が厨房にいることが必要だ)",
        "options": ["soit", "est", "sois", "soient"],
        "answerIndex": 0,
        "acceptedAnswers": ["soit"],
        "explanation": "être の三人称単数 il に対する接続法現在形は soit です。"
    },
    {
        "id": "q_sub_04",
        "tags": ["#subjunctive_basic"],
        "type": "choice",
        "text": "Complétez au subjonctif : 'Pourvu qu'elle ___ la recette par cœur.' (彼女がレシピを暗記していることを望む)",
        "options": ["sache", "sait", "saches", "sachez"],
        "answerIndex": 0,
        "acceptedAnswers": ["sache"],
        "explanation": "savoir の三人称単数 elle に対する接続法現在形は sache です。"
    },
    {
        "id": "q_sub_05",
        "tags": ["#subjunctive_basic"],
        "type": "choice",
        "text": "Complétez au subjonctif : 'Il faut que nous ___ prêts pour le service.' (私たちはサービスの準備ができていなければならない)",
        "options": ["soyons", "sommes", "soyez", "soient"],
        "answerIndex": 0,
        "acceptedAnswers": ["soyons"],
        "explanation": "être の一人称複数 nous に対する接続法現在形は soyons です。"
    },

    # 3. #obligation_il_faut_que
    {
        "id": "q_obli_01",
        "tags": ["#obligation_il_faut_que"],
        "type": "choice",
        "text": "Complétez la structure d'obligation : 'Il faut que vous ___ attention au feu.' (火加減に注意しなければなりません)",
        "options": ["fassiez", "faites", "fasse", "faisiez"],
        "answerIndex": 0,
        "acceptedAnswers": ["fassiez"],
        "explanation": "Il faut que... の後ろには接続法が続きます。faire の vous に対する接続法は fassiez です。"
    },
    {
        "id": "q_obli_02",
        "tags": ["#obligation_il_faut_que"],
        "type": "choice",
        "text": "Remplissez le vide : 'Il faut que le bouillon ___ bien chaud pour le service.' (サービスのために出汁が十分熱くなければならない)",
        "options": ["soit", "est", "soient", "serait"],
        "answerIndex": 0,
        "acceptedAnswers": ["soit"],
        "explanation": "Il faut que + 接続法。être の三人称単数形は soit です。"
    },
    {
        "id": "q_obli_03",
        "tags": ["#obligation_il_faut_que"],
        "type": "choice",
        "text": "Complétez : 'Il faut que tu ___ ces pommes de terre rapidement.' (これらのじゃがいもの皮を素早くむかなければならない)",
        "options": ["épluches", "épluche", "épluchesse", "éplucher"],
        "answerIndex": 0,
        "acceptedAnswers": ["épluches"],
        "explanation": "éplucher の tu に対する接続法現在は épluches です。"
    },
    {
        "id": "q_obli_04",
        "tags": ["#obligation_il_faut_que"],
        "type": "choice",
        "text": "Complétez : 'Il faut que nous ___ à dresser les assiettes.' (私たちは皿の盛り付けを始めなければならない)",
        "options": ["commencions", "commençons", "commencerons", "commenciez"],
        "answerIndex": 0,
        "acceptedAnswers": ["commencions"],
        "explanation": "commencer の nous に対する接続法現在は commencions です。"
    },

    # 4. #futur_simple
    {
        "id": "q_fut_01",
        "tags": ["#futur_simple"],
        "type": "choice",
        "text": "Complétez au futur simple : 'Demain, je ___ le poisson frais.' (明日、私は新鮮な魚を準備するつもりです)",
        "options": ["préparerai", "préparerait", "prépare", "préparera"],
        "answerIndex": 0,
        "acceptedAnswers": ["préparerai"],
        "explanation": "第一群規則動詞 préparer の一人称単数 (je) 単純未来は préparerai です。"
    },
    {
        "id": "q_fut_02",
        "tags": ["#futur_simple"],
        "type": "choice",
        "text": "Complétez au futur simple : 'Le chef ___ le nouveau plat ce soir.' (シェフは今夜、新しい料理を味見する予定です)",
        "options": ["goûtera", "goûterai", "goûte", "goûteront"],
        "answerIndex": 0,
        "acceptedAnswers": ["goûtera"],
        "explanation": "goûter の三人称単数 (il) 単純未来は goûtera です。"
    },
    {
        "id": "q_fut_03",
        "tags": ["#futur_simple"],
        "type": "choice",
        "text": "Complétez au futur simple : 'Nous ___ le restaurant exceptionnellement lundi.' (月曜日は臨時休業します/閉める予定です)",
        "options": ["fermerons", "fermons", "fermerions", "fermeront"],
        "answerIndex": 0,
        "acceptedAnswers": ["fermerons"],
        "explanation": "fermer の一人称複数 (nous) 単純未来は fermerons です。"
    },
    {
        "id": "q_fut_04",
        "tags": ["#futur_simple"],
        "type": "choice",
        "text": "Complétez au futur simple : 'Ils ___ une nouvelle carte pour la saison prochaine.' (彼らは来シーズン用に新メニューを作成する予定です)",
        "options": ["créeront", "créerons", "créent", "créeraient"],
        "answerIndex": 0,
        "acceptedAnswers": ["créeront"],
        "explanation": "créer の三人称複数 (ils) 単純未来は créeront です。"
    },

    # 5. #conditional_present
    {
        "id": "q_cond_01",
        "tags": ["#conditional_present"],
        "type": "choice",
        "text": "Complétez au conditionnel présent : 'Je ___ proposer une modification de la recette.' (レシピの変更を提案したいのですが)",
        "options": ["voudrais", "veux", "voulais", "voudrai"],
        "answerIndex": 0,
        "acceptedAnswers": ["voudrais"],
        "explanation": "vouloir の一人称単数 (je) 条件法現在は voudrais です。丁寧な要望や提案に使われます。"
    },
    {
        "id": "q_cond_02",
        "tags": ["#conditional_present"],
        "type": "choice",
        "text": "Complétez au conditionnel présent : 'Vous ___ nettoyer le plan de travail avant de partir.' (帰る前に作業台を掃除すべきです)",
        "options": ["devriez", "devez", "deviez", "devrez"],
        "answerIndex": 0,
        "acceptedAnswers": ["devriez"],
        "explanation": "devoir の二人称複数 (vous) 条件法現在は devriez です。アドバイスや控えめな義務を表します。"
    },
    {
        "id": "q_cond_03",
        "tags": ["#conditional_present"],
        "type": "choice",
        "text": "Complétez : 'Si j'avais du temps, je ___ ce dessert délicat.' (もし時間があれば、この繊細なデザートを作るのだが)",
        "options": ["ferais", "ferai", "faisais", "fais"],
        "answerIndex": 0,
        "acceptedAnswers": ["ferais"],
        "explanation": "「Si + 半過去, 条件法現在」の仮定の構文です。faire の条件法現在は gerais/ferais です。"
    },
    {
        "id": "q_cond_04",
        "tags": ["#conditional_present"],
        "type": "choice",
        "text": "Complétez au conditionnel : 'Nous ___ déguster ce vin rouge avec le canard.' (私たちは鴨肉と一緒にこの赤ワインを試飲したいのですが)",
        "options": ["aimerions", "aimons", "aimions", "aimerons"],
        "answerIndex": 0,
        "acceptedAnswers": ["aimerions"],
        "explanation": "aimer の一人称複数 (nous) 条件法現在は aimerions です。"
    },

    # 6. #si_clauses_present
    {
        "id": "q_si_01",
        "tags": ["#si_clauses_present"],
        "type": "choice",
        "text": "Complétez la structure conditionnelle : 'Si tu ___ la viande sans surveillance, elle brûlera.' (肉を放置すると焦げてしまいますよ)",
        "options": ["laisses", "laisseras", "laisserais", "laissais"],
        "answerIndex": 0,
        "acceptedAnswers": ["laisses"],
        "explanation": "「Si + 現在形, 単純未来」で現実的な仮定を表します。Si の節には現在形 (laisses) を置きます。"
    },
    {
        "id": "q_si_02",
        "tags": ["#si_clauses_present"],
        "type": "choice",
        "text": "Complétez : 'Si vous ___ du sel, le goût sera parfait.' (塩を加えれば、味は完璧になります)",
        "options": ["ajoutez", "ajouterez", "ajouteriez", "ajoutiez"],
        "answerIndex": 0,
        "acceptedAnswers": ["ajoutez"],
        "explanation": "「Si + 現在形 (ajoutez), 単純未来 (sera)」の構文規則に基づきます。"
    },
    {
        "id": "q_si_03",
        "tags": ["#si_clauses_present"],
        "type": "choice",
        "text": "Complétez : 'Si le chef ___, dites-lui que tout est prêt.' (もしシェフが来たら、すべて準備完了だと伝えてください)",
        "options": ["arrive", "arrivera", "arriverait", "arrivait"],
        "answerIndex": 0,
        "acceptedAnswers": ["arrive"],
        "explanation": "条件節「Si + 現在形 (arrive)」の後ろに命令文 (dites-lui) が続くパターンです。"
    },
    {
        "id": "q_si_04",
        "tags": ["#si_clauses_present"],
        "type": "choice",
        "text": "Complétez : 'Si nous ___ faim, nous préparerons une omelette.' (もしお腹が空いたら、オムレツを作るつもりです)",
        "options": ["avons", "aurons", "aurions", "avions"],
        "answerIndex": 0,
        "acceptedAnswers": ["avons"],
        "explanation": "avoir の現在形 (avons) を用いた「Si + 現在形, 単純未来」の文です。"
    },

    # 7. #passive_voice
    {
        "id": "q_pass_01",
        "tags": ["#passive_voice"],
        "type": "choice",
        "text": "Complétez au passif : 'La tarte aux pommes ___ préparée par le pâtissier.' (アップルタルトは製菓長によって準備されます)",
        "options": ["est", "a", "fait", "été"],
        "answerIndex": 0,
        "acceptedAnswers": ["est"],
        "explanation": "受動態は「être ＋ 過去分詞」で表します。tarte (女性単数) に合わせて過去分詞 préparée が性数一致しています。"
    },
    {
        "id": "q_pass_02",
        "tags": ["#passive_voice"],
        "type": "choice",
        "text": "Complétez : 'Les légumes ___ coupés finement par le commis.' (野菜は見習いによって細かく切られます)",
        "options": ["sont", "ont", "font", "seront"],
        "answerIndex": 0,
        "acceptedAnswers": ["sont"],
        "explanation": "主語 les légumes (男性複数) に対応する être の現在形 sont と過去分詞 coupés を使います。"
    },
    {
        "id": "q_pass_03",
        "tags": ["#passive_voice"],
        "type": "choice",
        "text": "Complétez au passif composé : 'La sauce a ___ faite par le sous-chef.' (ソースはスーシェフによって作られました)",
        "options": ["été", "soit", "fait", "sont"],
        "answerIndex": 0,
        "acceptedAnswers": ["été"],
        "explanation": "複合過去の受動態は「avoir ＋ été ＋ 過去分詞」となります。sauce (女性) に合わせて faite と性数一致します。"
    },
    {
        "id": "q_pass_04",
        "tags": ["#passive_voice"],
        "type": "choice",
        "text": "Complétez : 'Ces assiettes seront ___ avec soin.' (これらのお皿は丁寧に盛り付けられるでしょう)",
        "options": ["dressées", "dressé", "dresser", "dresses"],
        "answerIndex": 0,
        "acceptedAnswers": ["dressées"],
        "explanation": "単純未来の受動態「seront + 過去分詞」です。主語 assiettes (女性複数) に合わせて dressées に一致させます。"
    },

    # 8. #pronouns_y_en
    {
        "id": "q_yen_01",
        "tags": ["#pronouns_y_en"],
        "type": "choice",
        "text": "Remplissez le vide : 'Tu as du beurre ? - Oui, j'___ ai dans le frigo.' (バターはある？ - うん、冷蔵庫に少しあるよ)",
        "options": ["en", "y", "le", "lui"],
        "answerIndex": 0,
        "acceptedAnswers": ["en"],
        "explanation": "部分冠詞を伴う名詞 (du beurre) の繰り返しを避けるために中性代名詞 en を使用します。"
    },
    {
        "id": "q_yen_02",
        "tags": ["#pronouns_y_en"],
        "type": "choice",
        "text": "Remplissez le vide : 'Tu vas à la cuisine ? - Oui, j'___ vais tout de suite.' (厨房に行く？ - うん、今すぐ行くよ)",
        "options": ["y", "en", "la", "le"],
        "answerIndex": 0,
        "acceptedAnswers": ["y"],
        "explanation": "前置詞 à + 場所 (à la cuisine) を指すために中性代名詞 y を使用します。"
    },
    {
        "id": "q_yen_03",
        "tags": ["#pronouns_y_en"],
        "type": "choice",
        "text": "Choisissez le bon pronom : 'Ajoutez du sel dans la soupe ➔ Ajoutez-___.' (スープに塩を加えてください ➔ それを加えてください)",
        "options": ["en", "y", "le", "la"],
        "answerIndex": 0,
        "acceptedAnswers": ["en"],
        "explanation": "不定の量 (du sel) を指すため代名詞は en になります。肯定命令形なので動詞の後にハイフンで置かれます (Ajoutez-en)。"
    },
    {
        "id": "q_yen_04",
        "tags": ["#pronouns_y_en"],
        "type": "choice",
        "text": "Remplissez le vide : 'Il faut penser à la recette ➔ Il faut ___ penser.' (レシピを考えなければならない ➔ それについて考えなければならない)",
        "options": ["y", "en", "la", "le"],
        "answerIndex": 0,
        "acceptedAnswers": ["y"],
        "explanation": "penser à... (〜について考える) の à + 事柄 を置き換える中性代名詞は y になります。"
    }
]

def main():
    if not os.path.exists(db_path):
        print(f"Error: {db_path} not found")
        return

    with open(db_path, 'r', encoding='utf-8') as f:
        questions = json.load(f)

    existing_ids = {q['id'] for q in questions if 'id' in q}
    added_count = 0
    for q in new_questions:
        if q['id'] not in existing_ids:
            questions.append(q)
            existing_ids.add(q['id'])
            added_count += 1

    with open(db_path, 'w', encoding='utf-8') as f:
        json.dump(questions, f, ensure_ascii=False, indent=2)
    print(f"Successfully added {added_count} Chapter 4 grammar questions to database.")

if __name__ == '__main__':
    main()
