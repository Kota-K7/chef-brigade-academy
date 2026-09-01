# -*- coding: utf-8 -*-
import json
import os

new_questions = [
    # ==========================================
    # 1. #relative_pronouns_basic (q_rel_06 ~ q_rel_15)
    # ==========================================
    {
        "id": "q_rel_06",
        "tags": ["#relative_pronouns_basic", "#grammar", "#B1"],
        "type": "choice",
        "text": "Choisissez le bon pronom relatif : 'C'est la ville ___ je suis né.' (これは私が生まれた町です)",
        "options": ["où", "qui", "que", "dont"],
        "answerIndex": 0,
        "acceptedAnswers": ["où", "ou"],
        "explanation": "時や場所を表す先行詞（la ville）を受ける関係代名詞は「où」になります。"
    },
    {
        "id": "q_rel_07",
        "tags": ["#relative_pronouns_basic", "#grammar", "#B1"],
        "type": "choice",
        "text": "Complétez : 'Le roi écoute les conseillers ___ lui apportent de bonnes nouvelles.' (王は自分によい知らせをもたらす顧問たちの言葉を聞く)",
        "options": ["qui", "que", "où", "dont"],
        "answerIndex": 0,
        "acceptedAnswers": ["qui"],
        "explanation": "関係節の中で主語（sujet）の働きをする関係代名詞は「qui」です。"
    },
    {
        "id": "q_rel_08",
        "tags": ["#relative_pronouns_basic", "#grammar", "#B1"],
        "type": "choice",
        "text": "Complétez : 'L'épée ___ le chevalier porte est très ancienne.' (その騎士が帯びている剣はとても古い)",
        "options": ["que", "qui", "où", "qu'il"],
        "answerIndex": 0,
        "acceptedAnswers": ["que"],
        "explanation": "関係節の中で直接目的語（le chevalier porte l'épée）となる関係代名詞は「que」です。"
    },
    {
        "id": "q_rel_09",
        "tags": ["#relative_pronouns_basic", "#grammar", "#B1"],
        "type": "choice",
        "text": "Complétez : 'Le jour ___ la paix a été signée, tout le monde fêtait.' (講和が結ばれた日、皆が祝っていた)",
        "options": ["où", "que", "qui", "quand"],
        "answerIndex": 0,
        "acceptedAnswers": ["où", "ou"],
        "explanation": "時（le jour）を表す先行詞を受ける関係代名詞は「où」です（quand は関係代名詞としては使いません）。"
    },
    {
        "id": "q_rel_10",
        "tags": ["#relative_pronouns_basic", "#grammar", "#B1"],
        "type": "choice",
        "text": "Complétez : 'Voici la recette ___ j'ai apprise en France.' (これが私がフランスで学んだレシピです)",
        "options": ["que", "qui", "où", "dont"],
        "answerIndex": 0,
        "acceptedAnswers": ["que"],
        "explanation": "先行詞 la recette を目的語として受けるため「que」になります（j'ai apprise la recette）。"
    },
    {
        "id": "q_rel_11",
        "tags": ["#relative_pronouns_basic", "#grammar", "#B1"],
        "type": "choice",
        "text": "Complétez : 'Les soldats ___ défendent la forteresse sont courageux.' (要塞を守っている兵士たちは勇敢だ)",
        "options": ["qui", "que", "où", "qu'ils"],
        "answerIndex": 0,
        "acceptedAnswers": ["qui"],
        "explanation": "関係節の動詞 défendent の主語になるため「qui」を選びます。"
    },
    {
        "id": "q_rel_12",
        "tags": ["#relative_pronouns_basic", "#grammar", "#B1"],
        "type": "choice",
        "text": "Complétez : 'C'est le château ___ le roi a résidé pendant la guerre.' (これが戦争中に国王が滞在した城です)",
        "options": ["où", "que", "qui", "dont"],
        "answerIndex": 0,
        "acceptedAnswers": ["où", "ou"],
        "explanation": "「le roi a résidé dans ce château」のように場所を示すため関係代名詞「où」を用います。"
    },
    {
        "id": "q_rel_13",
        "tags": ["#relative_pronouns_basic", "#grammar", "#B1"],
        "type": "choice",
        "text": "Complétez : 'Le message ___ le messager a transmis a changé l'histoire.' (使者が伝えたメッセージは歴史を変えた)",
        "options": ["que", "qui", "où", "dont"],
        "answerIndex": 0,
        "acceptedAnswers": ["que"],
        "explanation": "transmettre の直接目的語となるため「que」が入ります。"
    },
    {
        "id": "q_rel_14",
        "tags": ["#relative_pronouns_basic", "#grammar", "#B1"],
        "type": "choice",
        "text": "Complétez : 'La dame ___ parle avec le roi est la reine.' (王と話している貴婦人は王妃です)",
        "options": ["qui", "que", "où", "laquelle"],
        "answerIndex": 0,
        "acceptedAnswers": ["qui"],
        "explanation": "動詞 parle の主語となる関係代名詞は「qui」です。"
    },
    {
        "id": "q_rel_15",
        "tags": ["#relative_pronouns_basic", "#grammar", "#B1"],
        "type": "choice",
        "text": "Complétez : 'C'est l'époque ___ les cathédrales ont été construites.' (それは大聖堂が建設された時代である)",
        "options": ["où", "que", "qui", "quand"],
        "answerIndex": 0,
        "acceptedAnswers": ["où", "ou"],
        "explanation": "時代・時（l'époque）を受ける関係代名詞は「où」です。"
    },

    # ==========================================
    # 2. #subjunctive_basic (q_sub_06 ~ q_sub_15)
    # ==========================================
    {
        "id": "q_sub_06",
        "tags": ["#subjunctive_basic", "#grammar", "#B1"],
        "type": "choice",
        "text": "Mettez le verbe [avoir] au subjonctif présent : 'Le roi souhaite que nous ___ du courage.' (王は私たちが勇気を持つことを願っている)",
        "options": ["ayons", "avons", "avions", "ayez"],
        "answerIndex": 0,
        "acceptedAnswers": ["ayons"],
        "explanation": "avoir の一人称複数 (nous) 接続法現在は不規則活用の「ayons」です。"
    },
    {
        "id": "q_sub_07",
        "tags": ["#subjunctive_basic", "#grammar", "#B1"],
        "type": "choice",
        "text": "Mettez le verbe [être] au subjonctif présent : 'Il est important que vous ___ à l'heure.' (あなたたちが時間通りであることが重要です)",
        "options": ["soyez", "êtes", "étiez", "sois"],
        "answerIndex": 0,
        "acceptedAnswers": ["soyez"],
        "explanation": "être の二人称複数 (vous) 接続法現在は「soyez」です。"
    },
    {
        "id": "q_sub_08",
        "tags": ["#subjunctive_basic", "#grammar", "#B1"],
        "type": "choice",
        "text": "Mettez le verbe [aller] au subjonctif présent : 'Je veux que tu ___ à Paris.' (私は君にパリへ行ってほしい)",
        "options": ["ailles", "vas", "alle", "allais"],
        "answerIndex": 0,
        "acceptedAnswers": ["ailles"],
        "explanation": "aller の二人称単数 (tu) 接続法現在は「ailles」です。"
    },
    {
        "id": "q_sub_09",
        "tags": ["#subjunctive_basic", "#grammar", "#B1"],
        "type": "choice",
        "text": "Mettez le verbe [savoir] au subjonctif présent : 'Il faut que le chef ___ la vérité.' (シェフはその真実を知らねばならない)",
        "options": ["sache", "sait", "savait", "sachez"],
        "answerIndex": 0,
        "acceptedAnswers": ["sache"],
        "explanation": "savoir の三人称単数 (il/le chef) 接続法現在は「sache」となります。"
    },
    {
        "id": "q_sub_10",
        "tags": ["#subjunctive_basic", "#grammar", "#B1"],
        "type": "choice",
        "text": "Mettez le verbe [pouvoir] au subjonctif présent : 'J'espère qu'ils viennent, mais il faut qu'ils ___ le faire.' (彼らが来られることが必要だ)",
        "options": ["puissent", "peuvent", "pouvaient", "puisse"],
        "answerIndex": 0,
        "acceptedAnswers": ["puissent"],
        "explanation": "pouvoir の三人称複数 (ils) 接続法現在は「puissent」です。"
    },
    {
        "id": "q_sub_11",
        "tags": ["#subjunctive_basic", "#grammar", "#B1"],
        "type": "choice",
        "text": "Mettez le verbe [venir] au subjonctif présent : 'Le commandant exige qu'elle ___ immédiatement.' (司令官は彼女が今すぐ来ることを要求している)",
        "options": ["vienne", "vient", "venait", "viennes"],
        "answerIndex": 0,
        "acceptedAnswers": ["vienne"],
        "explanation": "venir の三人称単数 (elle) 接続法現在は「vienne」です。"
    },
    {
        "id": "q_sub_12",
        "tags": ["#subjunctive_basic", "#grammar", "#B1"],
        "type": "choice",
        "text": "Mettez le verbe [prendre] au subjonctif présent : 'Il est nécessaire que nous ___ des précautions.' (私たちが予防策を取ることが必要だ)",
        "options": ["prenions", "prenons", "prenez", "preniez"],
        "answerIndex": 0,
        "acceptedAnswers": ["prenions"],
        "explanation": "prendre の一人称複数 (nous) 接続法現在は「prenions」です。"
    },
    {
        "id": "q_sub_13",
        "tags": ["#subjunctive_basic", "#grammar", "#B1"],
        "type": "choice",
        "text": "Complétez : 'Je crains que l'armée ne ___ battue.' (軍が敗北することを私は恐れている)",
        "options": ["soit", "est", "sera", "sois"],
        "answerIndex": 0,
        "acceptedAnswers": ["soit"],
        "explanation": "恐れ・感情を表す動詞（craindre）に続く従属節では接続法（soit）が用いられます。"
    },
    {
        "id": "q_sub_14",
        "tags": ["#subjunctive_basic", "#grammar", "#B1"],
        "type": "choice",
        "text": "Mettez le verbe [finir] au subjonctif présent : 'Il faut que vous ___ ce travail ce soir.' (あなたたちは今晩この仕事を終えねばならない)",
        "options": ["finissiez", "finissez", "finirez", "finirez"],
        "answerIndex": 0,
        "acceptedAnswers": ["finissiez"],
        "explanation": "finir の二人称複数 (vous) 接続法現在は「finissiez」です。"
    },
    {
        "id": "q_sub_15",
        "tags": ["#subjunctive_basic", "#grammar", "#B1"],
        "type": "choice",
        "text": "Complétez : 'Bien qu'il ___ fatigué, Jeanne continue de prier.' (疲れているにもかかわらず、ジャンヌは祈り続ける)",
        "options": ["soit", "est", "était", "sera"],
        "answerIndex": 0,
        "acceptedAnswers": ["soit"],
        "explanation": "譲歩を表す接続詞「bien que」の後は必ず接続法（soit）になります。"
    },

    # ==========================================
    # 3. #obligation_il_faut_que (q_obli_05 ~ q_obli_12)
    # ==========================================
    {
        "id": "q_obli_05",
        "tags": ["#obligation_il_faut_que", "#subjunctive_basic", "#B1"],
        "type": "choice",
        "text": "Complétez : 'Il faut que nous ___ les portes de la forteresse.' (要塞の門を閉めなければならない)",
        "options": ["fermions", "fermons", "fermerons", "fermeriez"],
        "answerIndex": 0,
        "acceptedAnswers": ["fermions"],
        "explanation": "「Il faut que」の後は接続法を用います。fermer の nous 形接続法は「fermions」です。"
    },
    {
        "id": "q_obli_06",
        "tags": ["#obligation_il_faut_que", "#subjunctive_basic", "#B1"],
        "type": "choice",
        "text": "Complétez : 'Il faut qu'ils ___ le signal avant l'assaut.' (突撃の前に合図を出さなければならない)",
        "options": ["donnent", "donneront", "donnaient", "donnassent"],
        "answerIndex": 0,
        "acceptedAnswers": ["donnent"],
        "explanation": "donner の ils に対する接続法現在は「donnent」です。"
    },
    {
        "id": "q_obli_07",
        "tags": ["#obligation_il_faut_que", "#subjunctive_basic", "#B1"],
        "type": "choice",
        "text": "Complétez : 'Il faut que le dauphin ___ confiance en Jeanne.' (王太子はジャンヌを信頼しなければならない)",
        "options": ["ait", "a", "aura", "avait"],
        "answerIndex": 0,
        "acceptedAnswers": ["ait"],
        "explanation": "avoir の三人称単数接続法現在は「ait」です（Il faut qu'il ait...）。"
    },
    {
        "id": "q_obli_08",
        "tags": ["#obligation_il_faut_que", "#subjunctive_basic", "#B1"],
        "type": "choice",
        "text": "Complétez : 'Il faut que vous ___ le roi à Reims.' (あなたたちは王をランスへ導かねばならない)",
        "options": ["meniez", "menez", "meneriez", "menerez"],
        "answerIndex": 0,
        "acceptedAnswers": ["meniez"],
        "explanation": "mener の vous 接続法現在は「meniez」です。"
    },
    {
        "id": "q_obli_09",
        "tags": ["#obligation_il_faut_que", "#subjunctive_basic", "#B1"],
        "type": "choice",
        "text": "Complétez : 'Il faut que je ___ cette lettre au commandant.' (私はこの手紙を司令官に届けねばならない)",
        "options": ["remette", "remets", "remettais", "remettrai"],
        "answerIndex": 0,
        "acceptedAnswers": ["remette"],
        "explanation": "remettre の je に対する接続法現在は「remette」です。"
    },
    {
        "id": "q_obli_10",
        "tags": ["#obligation_il_faut_que", "#subjunctive_basic", "#B1"],
        "type": "choice",
        "text": "Complétez : 'Il faut que nous ___ prêts pour le combat.' (私たちは戦いに備えておかなければならない)",
        "options": ["soyons", "sommes", "étions", "serons"],
        "answerIndex": 0,
        "acceptedAnswers": ["soyons"],
        "explanation": "être の nous に対する接続法現在は「soyons」です。"
    },
    {
        "id": "q_obli_11",
        "tags": ["#obligation_il_faut_que", "#subjunctive_basic", "#B1"],
        "type": "choice",
        "text": "Complétez : 'Il faut qu'elle ___ la vérité au conseil.' (彼女は評議会に真実を語らねばならない)",
        "options": ["dise", "dit", "disait", "dira"],
        "answerIndex": 0,
        "acceptedAnswers": ["dise"],
        "explanation": "dire の elle に対する接続法現在は「dise」です。"
    },
    {
        "id": "q_obli_12",
        "tags": ["#obligation_il_faut_que", "#subjunctive_basic", "#B1"],
        "type": "choice",
        "text": "Complétez : 'Il faut que vous ___ la sauce sans arrêt.' (ソースを絶え間なくかき混ぜなければなりません)",
        "options": ["remuiez", "remuez", "remuerez", "remueriez"],
        "answerIndex": 0,
        "acceptedAnswers": ["remuiez"],
        "explanation": "remuer の vous 接続法現在は「remuiez」です。"
    },

    # ==========================================
    # 4. #object_pronouns_direct_indirect (q_obj_di_06 ~ q_obj_di_15)
    # ==========================================
    {
        "id": "q_obj_di_06",
        "tags": ["#object_pronouns_direct_indirect", "#grammar", "#A2"],
        "type": "choice",
        "text": "Remplacez l'objet indirect : 'Le roi parle à son ministre.' ➔ 'Le roi ___ parle.' (王は大臣に話す ➔ 王は彼に話す)",
        "options": ["lui", "le", "leur", "y"],
        "answerIndex": 0,
        "acceptedAnswers": ["lui"],
        "explanation": "三人称単数の間接目的語（à son ministre）は「lui」で置き換えます。"
    },
    {
        "id": "q_obj_di_07",
        "tags": ["#object_pronouns_direct_indirect", "#grammar", "#A2"],
        "type": "choice",
        "text": "Remplacez l'objet : 'Jeanne donne le drapeau aux soldats.' ➔ 'Jeanne ___ donne le drapeau.' (ジャンヌは兵士たちに旗を渡す)",
        "options": ["leur", "les", "lui", "y"],
        "answerIndex": 0,
        "acceptedAnswers": ["leur"],
        "explanation": "三人称複数の間接目的語（aux soldats = à + 複数）は「leur」で置き換えます。"
    },
    {
        "id": "q_obj_di_08",
        "tags": ["#object_pronouns_direct_indirect", "#grammar", "#A2"],
        "type": "choice",
        "text": "Remplacez l'objet direct : 'Le chef prépare la viande.' ➔ 'Le chef ___ prépare.' (シェフは肉を調理する)",
        "options": ["la", "le", "lui", "en"],
        "answerIndex": 0,
        "acceptedAnswers": ["la"],
        "explanation": "女性単数の直接目的語（la viande）は代名詞「la」で置き換えます。"
    },
    {
        "id": "q_obj_di_09",
        "tags": ["#object_pronouns_direct_indirect", "#grammar", "#A2"],
        "type": "choice",
        "text": "Remplacez les objets : 'Le roi donne la couronne au dauphin.' ➔ 'Le roi ___ ___ donne.' (王は王太子の彼にそれを授ける)",
        "options": ["la lui", "lui la", "le lui", "la leur"],
        "answerIndex": 0,
        "acceptedAnswers": ["la lui"],
        "explanation": "直接目的語（la）と三人称間接目的語（lui）が並ぶ語順は「直接(le/la/les) ＋ 間接(lui/leur)」です。"
    },
    {
        "id": "q_obj_di_10",
        "tags": ["#object_pronouns_direct_indirect", "#grammar", "#A2"],
        "type": "choice",
        "text": "Complétez : 'Ce message est secret, ne ___ le montre pas !' (この手紙は秘密だ、彼に見せるな！)",
        "options": ["lui", "le", "leur", "y"],
        "answerIndex": 0,
        "acceptedAnswers": ["lui"],
        "explanation": "否定の命令法では「ne + 間接(lui) + 直接(le) + 動詞 + pas」の語順になります。"
    },
    {
        "id": "q_obj_di_11",
        "tags": ["#object_pronouns_direct_indirect", "#grammar", "#A2"],
        "type": "choice",
        "text": "Complétez : 'Vous avez vu les chevaliers ? - Oui, je ___ ai vus.' (騎士たちを見ましたか？ - はい、見ました)",
        "options": ["les", "leur", "en", "lui"],
        "answerIndex": 0,
        "acceptedAnswers": ["les"],
        "explanation": "複数の直接目的語（les chevaliers）は代名詞「les」で受けます。"
    },
    {
        "id": "q_obj_di_12",
        "tags": ["#object_pronouns_direct_indirect", "#grammar", "#A2"],
        "type": "choice",
        "text": "Complétez : 'Le messager apporte les lettres à la reine.' ➔ 'Il ___ apporte les lettres.' (使者は王妃に手紙を届ける)",
        "options": ["lui", "la", "leur", "y"],
        "answerIndex": 0,
        "acceptedAnswers": ["lui"],
        "explanation": "女性であっても三人称単数の間接目的語（à la reine）は「lui」となります。"
    },
    {
        "id": "q_obj_di_13",
        "tags": ["#object_pronouns_direct_indirect", "#grammar", "#A2"],
        "type": "choice",
        "text": "Complétez : 'Donnez-___ la carte, s'il vous plaît.' (私に地図をください)",
        "options": ["moi", "me", "m'", "mon"],
        "answerIndex": 0,
        "acceptedAnswers": ["moi"],
        "explanation": "肯定命令形の後ろに置く一人称代名詞は強勢形の「-moi」になります。"
    },
    {
        "id": "q_obj_di_14",
        "tags": ["#object_pronouns_direct_indirect", "#grammar", "#A2"],
        "type": "choice",
        "text": "Complétez : 'Il nous a téléphoné et nous ___ a expliqué la situation.' (彼は私たちに電話し、状況を説明してくれた)",
        "options": ["nous", "lui", "leur", "vous"],
        "answerIndex": 0,
        "acceptedAnswers": ["nous"],
        "explanation": "私たちに（間接目的語）説明する ➔ 「nous a expliqué」となります。"
    },
    {
        "id": "q_obj_di_15",
        "tags": ["#object_pronouns_direct_indirect", "#grammar", "#A2"],
        "type": "choice",
        "text": "Complétez : 'Jeanne écoute les voix qui ___ parlent.' (ジャンヌは彼女に語りかける声を聞く)",
        "options": ["lui", "la", "le", "leur"],
        "answerIndex": 0,
        "acceptedAnswers": ["lui"],
        "explanation": "ジャンヌに（parler à Jeanne）語りかけるので間接目的語「lui」を用います。"
    },

    # ==========================================
    # 5. #imparfait (q_imp_06 ~ q_imp_15)
    # ==========================================
    {
        "id": "q_imp_06",
        "tags": ["#imparfait", "#grammar", "#A2"],
        "type": "choice",
        "text": "Mettez le verbe [faire] à l'imparfait : 'À cette époque, il ___ très froid en hiver.' (当時、冬はとても寒かった)",
        "options": ["faisait", "faissait", "a fait", "fit"],
        "answerIndex": 0,
        "acceptedAnswers": ["faisait"],
        "explanation": "faire の三人称単数半過去は「faisait」です。"
    },
    {
        "id": "q_imp_07",
        "tags": ["#imparfait", "#grammar", "#A2"],
        "type": "choice",
        "text": "Mettez le verbe [pouvoir] à l'imparfait : 'Nous ne ___ pas traverser le fleuve.' (私たちは川を渡ることができなかった)",
        "options": ["pouvions", "pouvons", "pourrions", "pûmes"],
        "answerIndex": 0,
        "acceptedAnswers": ["pouvions"],
        "explanation": "pouvoir の nous に対する半過去形は「pouvions」です。"
    },
    {
        "id": "q_imp_08",
        "tags": ["#imparfait", "#grammar", "#A2"],
        "type": "choice",
        "text": "Mettez le verbe [vouloir] à l'imparfait : 'Le roi ___ agrandir son territoire.' (王は領土を拡大したいと思っていた)",
        "options": ["voulait", "veut", "voulut", "voudrait"],
        "answerIndex": 0,
        "acceptedAnswers": ["voulait"],
        "explanation": "vouloir の三人称単数半過去形は「voulait」です。"
    },
    {
        "id": "q_imp_09",
        "tags": ["#imparfait", "#grammar", "#A2"],
        "type": "choice",
        "text": "Mettez le verbe [prendre] à l'imparfait : 'Chaque matin, les moines ___ leur repas en silence.' (毎朝、修道士たちは沈黙の中で食事をとっていた)",
        "options": ["prenaient", "preniez", "prenait", "prirent"],
        "answerIndex": 0,
        "acceptedAnswers": ["prenaient"],
        "explanation": "prendre の三人称複数半過去形は「prenaient」です（過去の習慣）。"
    },
    {
        "id": "q_imp_10",
        "tags": ["#imparfait", "#grammar", "#A2"],
        "type": "choice",
        "text": "Mettez le verbe [aller] à l'imparfait : 'Tu ___ souvent à la messe ?' (君はよくミサに通っていたの？)",
        "options": ["allais", "allait", "alliez", "vas"],
        "answerIndex": 0,
        "acceptedAnswers": ["allais"],
        "explanation": "aller の二人称単数 (tu) 半過去形は「allais」です。"
    },
    {
        "id": "q_imp_11",
        "tags": ["#imparfait", "#grammar", "#A2"],
        "type": "choice",
        "text": "Mettez le verbe [avoir] à l'imparfait : 'Les soldats ___ faim et soif.' (兵士たちは飢えと渇きを抱えていた)",
        "options": ["avaient", "avaient eu", "ont eu", "avaient"],
        "answerIndex": 0,
        "acceptedAnswers": ["avaient"],
        "explanation": "avoir の三人称複数 (ils) 半過去形は「avaient」です。"
    },
    {
        "id": "q_imp_12",
        "tags": ["#imparfait", "#grammar", "#A2"],
        "type": "choice",
        "text": "Mettez le verbe [vivre] à l'imparfait : 'Elle ___ dans un petit village de Lorraine.' (彼女はロレーヌの小さな村に住んでいた)",
        "options": ["vivait", "vit", "a vécu", "vivais"],
        "answerIndex": 0,
        "acceptedAnswers": ["vivait"],
        "explanation": "vivre の三人称単数半過去形は「vivait」です。"
    },
    {
        "id": "q_imp_13",
        "tags": ["#imparfait", "#grammar", "#A2"],
        "type": "choice",
        "text": "Mettez le verbe [être] à l'imparfait : 'Vous ___ les plus fidèles chevaliers.' (あなたたちは最も忠実な騎士たちだった)",
        "options": ["étiez", "êtes", "fûtes", "étions"],
        "answerIndex": 0,
        "acceptedAnswers": ["étiez"],
        "explanation": "être の二人称複数 (vous) 半過去形は「étiez」です。"
    },
    {
        "id": "q_imp_14",
        "tags": ["#imparfait", "#grammar", "#A2"],
        "type": "choice",
        "text": "Mettez le verbe [savoir] à l'imparfait : 'Personne ne ___ comment défendre le pont.' (誰も橋をどう防衛すべきか知らなかった)",
        "options": ["savait", "sait", "sut", "sachait"],
        "answerIndex": 0,
        "acceptedAnswers": ["savait"],
        "explanation": "savoir の三人称単数半過去形は「savait」です。"
    },
    {
        "id": "q_imp_15",
        "tags": ["#imparfait", "#grammar", "#A2"],
        "type": "choice",
        "text": "Mettez le verbe [devoir] à l'imparfait : 'Le peuple ___ payer de lourds impôts.' (民衆は重税を払わねばならなかった)",
        "options": ["devait", "doit", "dut", "devrait"],
        "answerIndex": 0,
        "acceptedAnswers": ["devait"],
        "explanation": "devoir の三人称単数半過去形は「devait」です。"
    },

    # ==========================================
    # 6. #imparfait_vs_past_compose (q_ivspc_06 ~ q_ivspc_15)
    # ==========================================
    {
        "id": "q_ivspc_06",
        "tags": ["#imparfait_vs_past_compose", "#grammar", "#B1"],
        "type": "choice",
        "text": "Choisissez les temps corrects : 'Pendant que les archers ___, l'ennemi ___.' (弓兵が撃っていた時、敵が突撃してきた)",
        "options": ["tiraient / a chargé", "ont tiré / chargeait", "tiraient / chargeait", "ont tiré / a chargé"],
        "answerIndex": 0,
        "acceptedAnswers": ["tiraient / a chargé"],
        "explanation": "継続中の背景動作には半過去（tiraient）、突発的に起こった完了動作には複合過去（a chargé）を用います。"
    },
    {
        "id": "q_ivspc_07",
        "tags": ["#imparfait_vs_past_compose", "#grammar", "#B1"],
        "type": "choice",
        "text": "Complétez : 'Quand le roi ___ la nouvelle, il ___ furieux.' (王はその知らせを聞いた時、激怒した[状態になった])",
        "options": ["a appris / était", "apprenait / a été", "a appris / a été", "apprenait / était"],
        "answerIndex": 0,
        "acceptedAnswers": ["a appris / était"],
        "explanation": "知らせを聞いた瞬間（点・複合過去: a appris）と、その時の心理状態（半過去: était）の組み合わせです。"
    },
    {
        "id": "q_ivspc_08",
        "tags": ["#imparfait_vs_past_compose", "#grammar", "#B1"],
        "type": "choice",
        "text": "Complétez : 'Hier à 15 heures, nous ___ dans la cuisine quand l'alarme ___.' (昨日の15時、厨房で作業していたら警報が鳴った)",
        "options": ["travaillions / a sonné", "avons travaillé / sonnait", "travaillions / sonnait", "avons travaillé / a sonné"],
        "answerIndex": 0,
        "acceptedAnswers": ["travaillions / a sonné"],
        "explanation": "作業中（継続・半過去）に警報が鳴り響いた（割り込み・複合過去）を表します。"
    },
    {
        "id": "q_ivspc_09",
        "tags": ["#imparfait_vs_past_compose", "#grammar", "#B1"],
        "type": "choice",
        "text": "Complétez : 'Il ___ beau, alors l'armée ___ sa marche.' (天気が良かったので、軍は進軍を開始した)",
        "options": ["faisait / a commencé", "a fait / commençait", "faisait / commençait", "a fait / a commencé"],
        "answerIndex": 0,
        "acceptedAnswers": ["faisait / a commencé"],
        "explanation": "天候の描写（半過去: faisait）と、進軍を開始した出来事（複合過去: a commencé）です。"
    },
    {
        "id": "q_ivspc_10",
        "tags": ["#imparfait_vs_past_compose", "#grammar", "#B1"],
        "type": "choice",
        "text": "Complétez : 'Soudain, un chevalier ___ dans la salle.' (突然、一人の騎士が広間に入ってきた)",
        "options": ["est entré", "entrait", "était entré", "entre"],
        "answerIndex": 0,
        "acceptedAnswers": ["est entré"],
        "explanation": "「Soudain（突然）」などの副詞がある明確な一回限りの出来事には複合過去を用います。"
    },
    {
        "id": "q_ivspc_11",
        "tags": ["#imparfait_vs_past_compose", "#grammar", "#B1"],
        "type": "choice",
        "text": "Complétez : 'Autrefois, le château ___ entouré d'eau.' (昔、その城は水に囲まれていた)",
        "options": ["était", "a été", "fut", "serait"],
        "answerIndex": 0,
        "acceptedAnswers": ["était"],
        "explanation": "「Autrefois（かつて）」に代表される過去の継続的状態描写には半過去（était）を用います。"
    },
    {
        "id": "q_ivspc_12",
        "tags": ["#imparfait_vs_past_compose", "#grammar", "#B1"],
        "type": "choice",
        "text": "Complétez : 'Pendant que Jeanne ___, les troupes l'ont écoutée.' (ジャンヌが演説している間、軍勢は彼女に耳を傾けた)",
        "options": ["parlait", "a parlé", "parlerait", "parle"],
        "answerIndex": 0,
        "acceptedAnswers": ["parlait"],
        "explanation": "「Pendant que（〜している間）」に導かれる背景動作には半過去を用います。"
    },
    {
        "id": "q_ivspc_13",
        "tags": ["#imparfait_vs_past_compose", "#grammar", "#B1"],
        "type": "choice",
        "text": "Complétez : 'En 1429, Jeanne d'Arc ___ Orléans.' (1429年、ジャンヌ・ダルクはオルレアンを解放した)",
        "options": ["a libéré", "libérait", "libère", "avait libéré"],
        "answerIndex": 0,
        "acceptedAnswers": ["a libéré"],
        "explanation": "明確な年号を伴う歴史的完結事実には複合過去（a libéré）を用います。"
    },
    {
        "id": "q_ivspc_14",
        "tags": ["#imparfait_vs_past_compose", "#grammar", "#B1"],
        "type": "choice",
        "text": "Complétez : 'Tout à coup, le ciel ___ sombre.' (突然、空が暗くなった)",
        "options": ["est devenu", "devenait", "devenant", "devient"],
        "answerIndex": 0,
        "acceptedAnswers": ["est devenu"],
        "explanation": "「Tout à coup（突如として）」による変化の瞬間には複合過去（est devenu）が適します。"
    },
    {
        "id": "q_ivspc_15",
        "tags": ["#imparfait_vs_past_compose", "#grammar", "#B1"],
        "type": "choice",
        "text": "Complétez : 'Comme nous ___ très fatigués, nous nous sommes arrêtés.' (とても疲れていたので、私たちは立ち止まった)",
        "options": ["étions", "avons été", "fûmes", "serions"],
        "answerIndex": 0,
        "acceptedAnswers": ["étions"],
        "explanation": "立ち止まる原因となった過去の状態描写には半過去（étions）を用います。"
    },

    # ==========================================
    # 7. #pronouns_y_en (q_yen_05 ~ q_yen_14)
    # ==========================================
    {
        "id": "q_yen_05",
        "tags": ["#pronouns_y_en", "#grammar", "#B1"],
        "type": "choice",
        "text": "Remplacez : 'Vous allez à Orléans ? - Oui, nous ___ allons.' (オルレアンに行きますか？ - はい、そこへ行きます)",
        "options": ["y", "en", "les", "lui"],
        "answerIndex": 0,
        "acceptedAnswers": ["y"],
        "explanation": "前置詞 à + 場所（à Orléans）を受ける代名詞は「y」です。"
    },
    {
        "id": "q_yen_06",
        "tags": ["#pronouns_y_en", "#grammar", "#B1"],
        "type": "choice",
        "text": "Remplacez : 'Combien de chevaux avez-vous ? - J'___ ai dix.' (何頭の馬をお持ちですか？ - 10頭持っています)",
        "options": ["en", "y", "les", "des"],
        "answerIndex": 0,
        "acceptedAnswers": ["en"],
        "explanation": "数量詞（dix）を伴う名詞の代名詞化には「en」を用います。"
    },
    {
        "id": "q_yen_07",
        "tags": ["#pronouns_y_en", "#grammar", "#B1"],
        "type": "choice",
        "text": "Remplacez : 'Tu penses à cette bataille ? - Oui, j'___ pense souvent.' (あの戦いのことを考えている？ - うん、よく考えているよ)",
        "options": ["y", "en", "la", "lui"],
        "answerIndex": 0,
        "acceptedAnswers": ["y"],
        "explanation": "動詞 penser à + 事物（à cette bataille）を受ける中性代名詞は「y」です。"
    },
    {
        "id": "q_yen_08",
        "tags": ["#pronouns_y_en", "#grammar", "#B1"],
        "type": "choice",
        "text": "Remplacez : 'Il revient de Paris ? - Oui, il ___ revient.' (彼はパリから戻ってきたの？ - はい、そこから戻りました)",
        "options": ["en", "y", "de là", "le"],
        "answerIndex": 0,
        "acceptedAnswers": ["en"],
        "explanation": "起点（de + 場所: de Paris）を受ける中性代名詞は「en」です。"
    },
    {
        "id": "q_yen_09",
        "tags": ["#pronouns_y_en", "#grammar", "#B1"],
        "type": "choice",
        "text": "Remplacez : 'Avez-vous du pain ? - Non, nous n'___ avons plus.' (パンはありますか？ - いいえ、もうありません)",
        "options": ["en", "y", "le", "de"],
        "answerIndex": 0,
        "acceptedAnswers": ["en"],
        "explanation": "部分冠詞の名詞（du pain）を代名詞で受ける場合は「en」を用います。"
    },
    {
        "id": "q_yen_10",
        "tags": ["#pronouns_y_en", "#grammar", "#B1"],
        "type": "choice",
        "text": "Complétez : 'Allez-___ ! C'est le moment d'attaquer !' (そこへ行け！ 攻撃の時だ！)",
        "options": ["y", "en", "le", "lui"],
        "answerIndex": 0,
        "acceptedAnswers": ["y"],
        "explanation": "肯定命令形「Allez-y !（さあ行け！）」は定番表現です。"
    },
    {
        "id": "q_yen_11",
        "tags": ["#pronouns_y_en", "#grammar", "#B1"],
        "type": "choice",
        "text": "Remplacez : 'Il parle de son plan ? - Oui, il ___ parle avec ses généraux.' (彼は計画について話している？ - はい、それについて話しています)",
        "options": ["en", "y", "le", "lui"],
        "answerIndex": 0,
        "acceptedAnswers": ["en"],
        "explanation": "parler de + 事物（de son plan）を受ける中性代名詞は「en」です。"
    },
    {
        "id": "q_yen_12",
        "tags": ["#pronouns_y_en", "#grammar", "#B1"],
        "type": "choice",
        "text": "Remplacez : 'Elle participe à la guerre ? - Oui, elle ___ participe.' (彼女は戦争に参加している？ - はい、参加しています)",
        "options": ["y", "en", "la", "lui"],
        "answerIndex": 0,
        "acceptedAnswers": ["y"],
        "explanation": "participer à + 事物（à la guerre）を受ける代名詞は「y」です。"
    },
    {
        "id": "q_yen_13",
        "tags": ["#pronouns_y_en", "#grammar", "#B1"],
        "type": "choice",
        "text": "Remplacez : 'Tu veux de la soupe ? - Oui, j'___ veux bien, merci.' (スープは欲しい？ - うん、欲しいな、ありがとう)",
        "options": ["en", "y", "la", "de"],
        "answerIndex": 0,
        "acceptedAnswers": ["en"],
        "explanation": "部分冠詞（de la soupe）の代名詞化は「en」です。"
    },
    {
        "id": "q_yen_14",
        "tags": ["#pronouns_y_en", "#grammar", "#B1"],
        "type": "choice",
        "text": "Complétez : 'N'___ ayez pas peur !' (それを恐れてはいけない！)",
        "options": ["en", "y", "le", "les"],
        "answerIndex": 0,
        "acceptedAnswers": ["en"],
        "explanation": "avoir peur de quelque chose の代名詞化により「N'en ayez pas peur」となります。"
    },

    # ==========================================
    # 8. #conditional_present (q_cond_05 ~ q_cond_14)
    # ==========================================
    {
        "id": "q_cond_05",
        "tags": ["#conditional_present", "#grammar", "#B1"],
        "type": "choice",
        "text": "Mettez le verbe [pouvoir] au conditionnel présent : '___-vous m'apporter de l'eau ?' (お水を持ってきていただけますでしょうか？)",
        "options": ["Pourriez", "Pouvez", "Pouviez", "Pourrez"],
        "answerIndex": 0,
        "acceptedAnswers": ["Pourriez", "pourriez"],
        "explanation": "pouvoir の vous 条件法現在は「Pourriez」で、丁寧な依頼を表します。"
    },
    {
        "id": "q_cond_06",
        "tags": ["#conditional_present", "#grammar", "#B1"],
        "type": "choice",
        "text": "Mettez le verbe [aimer] au conditionnel présent : 'J'___ rencontrer le roi.' (王にお会いしたいのですが)",
        "options": ["aimerais", "aime", "aimais", "aimerai"],
        "answerIndex": 0,
        "acceptedAnswers": ["aimerais"],
        "explanation": "aimer の je 条件法現在は「aimerais」で、丁寧な希望（〜したい）を表します。"
    },
    {
        "id": "q_cond_07",
        "tags": ["#conditional_present", "#grammar", "#B1"],
        "type": "choice",
        "text": "Mettez le verbe [être] au conditionnel présent : 'Ce ___ un grand honneur.' (それは大変な名誉なことでしょう)",
        "options": ["serait", "sera", "était", "soit"],
        "answerIndex": 0,
        "acceptedAnswers": ["serait"],
        "explanation": "être の三人称単数条件法現在は「serait」です。"
    },
    {
        "id": "q_cond_08",
        "tags": ["#conditional_present", "#grammar", "#B1"],
        "type": "choice",
        "text": "Mettez le verbe [faire] au conditionnel présent : 'Que ___-vous à ma place ?' (もし私の立場なら何をなさいますか？)",
        "options": ["feriez", "faites", "faisiez", "ferez"],
        "answerIndex": 0,
        "acceptedAnswers": ["feriez"],
        "explanation": "faire の vous 条件法現在は「feriez」です。"
    },
    {
        "id": "q_cond_09",
        "tags": ["#conditional_present", "#grammar", "#B1"],
        "type": "choice",
        "text": "Mettez le verbe [avoir] au conditionnel présent : 'Nous ___ besoin de renforts.' (私たちは援軍が必要になるかもしれません)",
        "options": ["aurions", "avons", "avions", "aurons"],
        "answerIndex": 0,
        "acceptedAnswers": ["aurions"],
        "explanation": "avoir の nous 条件法現在は「aurions」です。"
    },
    {
        "id": "q_cond_10",
        "tags": ["#conditional_present", "#grammar", "#B1"],
        "type": "choice",
        "text": "Mettez le verbe [devoir] au conditionnel présent : 'Tu ___ te reposer un peu.' (少し休んだほうがいいよ)",
        "options": ["devrais", "dois", "devais", "devras"],
        "answerIndex": 0,
        "acceptedAnswers": ["devrais"],
        "explanation": "devoir の tu 条件法現在「devrais」は助言（〜すべきだ）を表します。"
    },
    {
        "id": "q_cond_11",
        "tags": ["#conditional_present", "#grammar", "#B1"],
        "type": "choice",
        "text": "Mettez le verbe [falloir] au conditionnel présent : 'Il ___ négocier avec eux.' (彼らと交渉すべきでしょう)",
        "options": ["faudrait", "faut", "fallait", "faudra"],
        "answerIndex": 0,
        "acceptedAnswers": ["faudrait"],
        "explanation": "falloir の条件法現在は「faudrait」で、控えめな必要性を表します。"
    },
    {
        "id": "q_cond_12",
        "tags": ["#conditional_present", "#grammar", "#B1"],
        "type": "choice",
        "text": "Mettez le verbe [savoir] au conditionnel présent : 'Je ne ___ vous dire la réponse.' (お答えすることはできかねます)",
        "options": ["saurais", "sais", "savais", "saurai"],
        "answerIndex": 0,
        "acceptedAnswers": ["saurais"],
        "explanation": "savoir の je 条件法現在は「saurais」です。"
    },
    {
        "id": "q_cond_13",
        "tags": ["#conditional_present", "#grammar", "#B1"],
        "type": "choice",
        "text": "Mettez le verbe [vouloir] au conditionnel présent : 'Le chevalier ___ partir à l'aube.' (その騎士は夜明けに出発したいと望んでいる)",
        "options": ["voudrait", "veut", "voulait", "voudra"],
        "answerIndex": 0,
        "acceptedAnswers": ["voudrait"],
        "explanation": "vouloir の三人称単数条件法現在は「voudrait」です。"
    },
    {
        "id": "q_cond_14",
        "tags": ["#conditional_present", "#grammar", "#B1"],
        "type": "choice",
        "text": "Mettez le verbe [aller] au conditionnel présent : 'Où ___-tu si tu avais le choix ?' (もし選べるならどこへ行く？)",
        "options": ["irais", "vas", "allais", "iras"],
        "answerIndex": 0,
        "acceptedAnswers": ["irais"],
        "explanation": "aller の tu 条件法現在は「irais」です。"
    },

    # ==========================================
    # 9. #si_clauses_present (q_si_05 ~ q_si_12)
    # ==========================================
    {
        "id": "q_si_05",
        "tags": ["#si_clauses_present", "#grammar", "#B1"],
        "type": "choice",
        "text": "Complétez : 'Si nous attaquons maintenant, nous ___ la bataille.' (もし今攻撃すれば、私たちは戦いに勝つだろう)",
        "options": ["gagnerons", "gagnions", "gagnerions", "avons gagné"],
        "answerIndex": 0,
        "acceptedAnswers": ["gagnerons"],
        "explanation": "「Si + 直説法現在, 直説法未来」は現実的な仮定と将来の帰結を表します。"
    },
    {
        "id": "q_si_06",
        "tags": ["#si_clauses_present", "#grammar", "#B1"],
        "type": "choice",
        "text": "Complétez : 'Si le roi le veut, la paix ___ proclamée.' (王が望むなら、平和が宣言されるだろう)",
        "options": ["sera", "serait", "était", "soit"],
        "answerIndex": 0,
        "acceptedAnswers": ["sera"],
        "explanation": "Si節が直説法現在（veut）なので、主節は単純未来（sera）となります。"
    },
    {
        "id": "q_si_07",
        "tags": ["#si_clauses_present", "#grammar", "#B1"],
        "type": "choice",
        "text": "Complétez : 'Si vous avez faim, ___ cette soupe chaude.' (もしお腹が空いているなら、この温かいスープをお召し上がりください)",
        "options": ["prenez", "prendrez", "prendriez", "preniez"],
        "answerIndex": 0,
        "acceptedAnswers": ["prenez"],
        "explanation": "「Si + 現在, 命令形」の構文で、条件に応じた指示を表します。"
    },
    {
        "id": "q_si_08",
        "tags": ["#si_clauses_present", "#grammar", "#B1"],
        "type": "choice",
        "text": "Complétez : 'Si les renforts n'arrivent pas, la forteresse ___ tomber.' (もし援軍が来なければ、要塞は陥落するだろう)",
        "options": ["va", "allait", "irait", "aille"],
        "answerIndex": 0,
        "acceptedAnswers": ["va"],
        "explanation": "近接未来（va tomber）または単純未来が主節に来ます。"
    },
    {
        "id": "q_si_09",
        "tags": ["#si_clauses_present", "#grammar", "#B1"],
        "type": "choice",
        "text": "Complétez : 'Si tu es prêt, nous ___ tout de suite.' (もし準備ができているなら、すぐに出発しよう)",
        "options": ["partons", "partions", "partirions", "partîmes"],
        "answerIndex": 0,
        "acceptedAnswers": ["partons"],
        "explanation": "「Si + 現在, 現在形」で確実な行動を宣言します。"
    },
    {
        "id": "q_si_10",
        "tags": ["#si_clauses_present", "#grammar", "#B1"],
        "type": "choice",
        "text": "Complétez : 'Si vous trouvez la relique, ___ la moi !' (もしその聖遺物を見つけたら、私に届けてくれ！)",
        "options": ["apportez", "apporterez", "apporteriez", "apportiez"],
        "answerIndex": 0,
        "acceptedAnswers": ["apportez"],
        "explanation": "条件に基づく命令形「apportez-la-moi !」です。"
    },
    {
        "id": "q_si_11",
        "tags": ["#si_clauses_present", "#grammar", "#B1"],
        "type": "choice",
        "text": "Complétez : 'Si la pluie s'arrête, les archers ___ tirer.' (雨が止めば、弓兵たちは矢を射ることができる)",
        "options": ["pourront", "pouvaient", "pourraient", "puissent"],
        "answerIndex": 0,
        "acceptedAnswers": ["pourront"],
        "explanation": "Si + 現在（s'arrête）に対し、主節は単純未来（pourront）になります。"
    },
    {
        "id": "q_si_12",
        "tags": ["#si_clauses_present", "#grammar", "#B1"],
        "type": "choice",
        "text": "Complétez : 'Si tu vois le danger, ___ immédiatement !' (もし危険を見かけたら、直ちに警告せよ！)",
        "options": ["avertis", "avertiras", "avertirais", "avertissais"],
        "answerIndex": 0,
        "acceptedAnswers": ["avertis"],
        "explanation": "二人称単数の命令形（avertis !）です。"
    },

    # ==========================================
    # 10. #passive_voice (q_pass_05 ~ q_pass_14)
    # ==========================================
    {
        "id": "q_pass_05",
        "tags": ["#passive_voice", "#grammar", "#B1"],
        "type": "choice",
        "text": "Transformez à la voix passive : 'Le roi signe le traité.' ➔ 'Le traité ___ par le roi.' (条約は国王によって署名される)",
        "options": ["est signé", "a signé", "était signé", "sera signé"],
        "answerIndex": 0,
        "acceptedAnswers": ["est signé"],
        "explanation": "現在形の受動態は「êtreの現在形(est) ＋ 過去分詞(signé) ＋ par ...」です。"
    },
    {
        "id": "q_pass_06",
        "tags": ["#passive_voice", "#grammar", "#B1"],
        "type": "choice",
        "text": "Complétez au passé composé passif : 'La forteresse ___ par les troupes françaises.' (要塞はフランス軍によって奪還された)",
        "options": ["a été reprise", "a repris", "était reprise", "est reprise"],
        "answerIndex": 0,
        "acceptedAnswers": ["a été reprise"],
        "explanation": "複合過去の受動態は「a été ＋ 過去分詞(女性形: reprise)」です。"
    },
    {
        "id": "q_pass_07",
        "tags": ["#passive_voice", "#grammar", "#B1"],
        "type": "choice",
        "text": "Complétez : 'Jeanne d'Arc a été capturée ___ les Bourguignons.' (ジャンヌ・ダルクはブルゴーニュ派によって捕縛された)",
        "options": ["par", "de", "pour", "avec"],
        "answerIndex": 0,
        "acceptedAnswers": ["par"],
        "explanation": "受動態における動作主は前置詞「par」で導かれます。"
    },
    {
        "id": "q_pass_08",
        "tags": ["#passive_voice", "#grammar", "#B1"],
        "type": "choice",
        "text": "Complétez : 'Le roi était respecté ___ tout son peuple.' (王は全国民から敬愛されていた)",
        "options": ["de", "par", "avec", "en"],
        "answerIndex": 0,
        "acceptedAnswers": ["de"],
        "explanation": "感情・敬意を表す動詞（respecter, aimer等）の受動態では動作主に「de」を用いることが一般的です。"
    },
    {
        "id": "q_pass_09",
        "tags": ["#passive_voice", "#grammar", "#B1"],
        "type": "choice",
        "text": "Complétez au futur passif : 'Les remparts ___ bientôt reconstruits.' (城壁はまもなく再建されるだろう)",
        "options": ["seront", "sont", "étaient", "auront été"],
        "answerIndex": 0,
        "acceptedAnswers": ["seront"],
        "explanation": "単純未来の受動態は「seront ＋ 過去分詞」です。"
    },
    {
        "id": "q_pass_10",
        "tags": ["#passive_voice", "#grammar", "#B1"],
        "type": "choice",
        "text": "Complétez : 'Les terres ont été confisquées ___ le roi de France.' (領地はフランス王によって没収された)",
        "options": ["par", "de", "pour", "à"],
        "answerIndex": 0,
        "acceptedAnswers": ["par"],
        "explanation": "具体的な没収行為の動作主は「par」で導きます。"
    },
    {
        "id": "q_pass_11",
        "tags": ["#passive_voice", "#grammar", "#B1"],
        "type": "choice",
        "text": "Complétez : 'Ce plat traditionnel est préparé ___ notre grand chef.' (この伝統料理は私たちの総料理長によって作られます)",
        "options": ["par", "de", "avec", "sur"],
        "answerIndex": 0,
        "acceptedAnswers": ["par"],
        "explanation": "調理行為の動作主は「par」を用います。"
    },
    {
        "id": "q_pass_12",
        "tags": ["#passive_voice", "#grammar", "#B1"],
        "type": "choice",
        "text": "Complétez : 'Toutes les villes ___ occupées pendant la guerre.' (戦争中、すべての都市が占領されていた)",
        "options": ["étaient", "avaient", "furent", "soient"],
        "answerIndex": 0,
        "acceptedAnswers": ["étaient"],
        "explanation": "半過去の受動態「étaient occupées（占領されていた）」です。"
    },
    {
        "id": "q_pass_13",
        "tags": ["#passive_voice", "#grammar", "#B1"],
        "type": "choice",
        "text": "Mettez au passif : 'On a découvert un secret.' ➔ 'Un secret ___.' (秘密が発見された)",
        "options": ["a été découvert", "est découvert", "était découvert", "a découvert"],
        "answerIndex": 0,
        "acceptedAnswers": ["a été découvert"],
        "explanation": "複合過去の受動態「a été découvert」です。"
    },
    {
        "id": "q_pass_14",
        "tags": ["#passive_voice", "#grammar", "#B1"],
        "type": "choice",
        "text": "Complétez : 'Ces lois ___ promulguées l'année prochaine.' (これらの法律は来年発布される予定だ)",
        "options": ["seront", "sont", "étaient", "seraient"],
        "answerIndex": 0,
        "acceptedAnswers": ["seront"],
        "explanation": "来年のことなので未来形受動態「seront promulguées」になります。"
    },

    # ==========================================
    # 11. #futur_simple (q_fut_05 ~ q_fut_12)
    # ==========================================
    {
        "id": "q_fut_05",
        "tags": ["#futur_simple", "#grammar", "#A2"],
        "type": "choice",
        "text": "Mettez le verbe [être] au futur simple : 'Demain, je ___ à la cour royale.' (明日、私は宮廷にいるだろう)",
        "options": ["serai", "serais", "suis", "seras"],
        "answerIndex": 0,
        "acceptedAnswers": ["serai"],
        "explanation": "être の je 単純未来は「serai」です（-ai 語尾）。"
    },
    {
        "id": "q_fut_06",
        "tags": ["#futur_simple", "#grammar", "#A2"],
        "type": "choice",
        "text": "Mettez le verbe [avoir] au futur simple : 'Vous ___ toutes les ressources nécessaires.' (あなたたちは必要な資源をすべて手にいれるだろう)",
        "options": ["aurez", "auriez", "avez", "aviez"],
        "answerIndex": 0,
        "acceptedAnswers": ["aurez"],
        "explanation": "avoir の vous 単純未来は「aurez」です。"
    },
    {
        "id": "q_fut_07",
        "tags": ["#futur_simple", "#grammar", "#A2"],
        "type": "choice",
        "text": "Mettez le verbe [aller] au futur simple : 'Nous ___ jusqu'au bout de notre mission.' (私たちは使命の最後まで行くだろう)",
        "options": ["irons", "irions", "allons", "allions"],
        "answerIndex": 0,
        "acceptedAnswers": ["irons"],
        "explanation": "aller の nous 単純未来は「irons」です。"
    },
    {
        "id": "q_fut_08",
        "tags": ["#futur_simple", "#grammar", "#A2"],
        "type": "choice",
        "text": "Mettez le verbe [faire] au futur simple : 'Le royaume ___ de grandes choses.' (王国は偉大なことを成し遂げるだろう)",
        "options": ["fera", "ferait", "fait", "feras"],
        "answerIndex": 0,
        "acceptedAnswers": ["fera"],
        "explanation": "faire の三人称単数単純未来は「fera」です。"
    },
    {
        "id": "q_fut_09",
        "tags": ["#futur_simple", "#grammar", "#A2"],
        "type": "choice",
        "text": "Mettez le verbe [pouvoir] au futur simple : 'Ils ___ franchir les murailles.' (彼らは城壁を突破できるだろう)",
        "options": ["pourront", "pourraient", "peuvent", "pouvaient"],
        "answerIndex": 0,
        "acceptedAnswers": ["pourront"],
        "explanation": "pouvoir の三人称複数単純未来は「pourront」です。"
    },
    {
        "id": "q_fut_10",
        "tags": ["#futur_simple", "#grammar", "#A2"],
        "type": "choice",
        "text": "Mettez le verbe [venir] au futur simple : 'Le messager ___ ce soir.' (使者は今晩やって来るだろう)",
        "options": ["viendra", "viendrait", "vient", "venait"],
        "answerIndex": 0,
        "acceptedAnswers": ["viendra"],
        "explanation": "venir の三人称単数単純未来は「viendra」です。"
    },
    {
        "id": "q_fut_11",
        "tags": ["#futur_simple", "#grammar", "#A2"],
        "type": "choice",
        "text": "Mettez le verbe [savoir] au futur simple : 'Bientôt, tu ___ toute la vérité.' (まもなく、君はすべての真実を知ることになるだろう)",
        "options": ["sauras", "saurais", "sais", "savais"],
        "answerIndex": 0,
        "acceptedAnswers": ["sauras"],
        "explanation": "savoir の tu 単純未来は「sauras」です。"
    },
    {
        "id": "q_fut_12",
        "tags": ["#futur_simple", "#grammar", "#A2"],
        "type": "choice",
        "text": "Mettez le verbe [voir] au futur simple : 'Vous ___ la grandeur de notre cité.' (あなたたちは我が都市の壮大さを目にすることでしょう)",
        "options": ["verrez", "verriez", "voyez", "voyiez"],
        "answerIndex": 0,
        "acceptedAnswers": ["verrez"],
        "explanation": "voir の vous 単純未来は「verrez」です。"
    },

    # ==========================================
    # 12. #past_compose (q_pc_06 ~ q_pc_15)
    # ==========================================
    {
        "id": "q_pc_06",
        "tags": ["#past_compose", "#grammar", "#A2"],
        "type": "choice",
        "text": "Complétez avec le bon auxiliaire : 'Le roi ___ parti pour la croisade.' (王は十字軍へ出発した)",
        "options": ["est", "a", "était", "sera"],
        "answerIndex": 0,
        "acceptedAnswers": ["est"],
        "explanation": "partir は往来発着の動詞のため助動詞「être」を用います（est parti）。"
    },
    {
        "id": "q_pc_07",
        "tags": ["#past_compose", "#grammar", "#A2"],
        "type": "choice",
        "text": "Complétez avec le bon auxiliaire : 'Les marchands ___ vendu toutes leurs épices.' (商人たちはスパイスをすべて売った)",
        "options": ["ont", "sont", "avaient", "étaient"],
        "answerIndex": 0,
        "acceptedAnswers": ["ont"],
        "explanation": "vendre は他動詞のため助動詞「avoir」を用います（ont vendu）。"
    },
    {
        "id": "q_pc_08",
        "tags": ["#past_compose", "#grammar", "#A2"],
        "type": "choice",
        "text": "Mettez au passé composé : 'Jeanne (arriver) ___ à Chinon.' (ジャンヌはシノンに到着した)",
        "options": ["est arrivée", "a arrivé", "est arrivé", "a arrivée"],
        "answerIndex": 0,
        "acceptedAnswers": ["est arrivée"],
        "explanation": "arriver は être 助動詞をとり、主語 Jeanne（女性単数）に過去分詞が一致して「est arrivée」となります。"
    },
    {
        "id": "q_pc_09",
        "tags": ["#past_compose", "#grammar", "#A2"],
        "type": "choice",
        "text": "Mettez au passé composé : 'Les chevaliers (mourir) ___ au combat.' (騎士たちは戦いで命を落とした)",
        "options": ["sont morts", "ont mort", "ont mouru", "sont mort"],
        "answerIndex": 0,
        "acceptedAnswers": ["sont morts"],
        "explanation": "mourir は être 助動詞をとり、男性複数一致で「sont morts」となります。"
    },
    {
        "id": "q_pc_10",
        "tags": ["#past_compose", "#grammar", "#A2"],
        "type": "choice",
        "text": "Mettez le verbe [prendre] au passé composé : 'Nous ___ le contrôle de la ville.' (私たちは町の支配権を握った)",
        "options": ["avons pris", "sommes pris", "avons prendu", "avons prennent"],
        "answerIndex": 0,
        "acceptedAnswers": ["avons pris"],
        "explanation": "prendre の過去分詞は不規則の「pris」で、助動詞 avoir を用います。"
    },
    {
        "id": "q_pc_11",
        "tags": ["#past_compose", "#grammar", "#A2"],
        "type": "choice",
        "text": "Mettez le verbe [devenir] au passé composé : 'Il ___ un grand souverain.' (彼は偉大な君主となった)",
        "options": ["est devenu", "a devenu", "est deveni", "a devu"],
        "answerIndex": 0,
        "acceptedAnswers": ["est devenu"],
        "explanation": "devenir は助動詞 être をとります（est devenu）。"
    },
    {
        "id": "q_pc_12",
        "tags": ["#past_compose", "#grammar", "#A2"],
        "type": "choice",
        "text": "Mettez le verbe [écrire] au passé composé : 'Le pape ___ une lettre importante.' (教皇は重要な親書を書いた)",
        "options": ["a écrit", "est écrit", "a écrié", "a écris"],
        "answerIndex": 0,
        "acceptedAnswers": ["a écrit"],
        "explanation": "écrire の過去分詞は「écrit」で、助動詞 avoir を用います。"
    },
    {
        "id": "q_pc_13",
        "tags": ["#past_compose", "#grammar", "#A2"],
        "type": "choice",
        "text": "Mettez le verbe [naître] au passé composé : 'Le prince ___ en Normandie.' (王子はノルマンディーで生まれた)",
        "options": ["est né", "a né", "a naît", "est néé"],
        "answerIndex": 0,
        "acceptedAnswers": ["est né"],
        "explanation": "naître は助動詞 être をとり、過去分詞は「né」です。"
    },
    {
        "id": "q_pc_14",
        "tags": ["#past_compose", "#grammar", "#A2"],
        "type": "choice",
        "text": "Mettez le verbe [faire] au passé composé : 'Qu'est-ce que vous ___ hier ?' (昨日あなたは何をしましたか？)",
        "options": ["avez fait", "êtes fait", "avez fais", "avez fat"],
        "answerIndex": 0,
        "acceptedAnswers": ["avez fait"],
        "explanation": "faire の過去分詞は「fait」です（vous avez fait）。"
    },
    {
        "id": "q_pc_15",
        "tags": ["#past_compose", "#grammar", "#A2"],
        "type": "choice",
        "text": "Mettez le verbe [descendre] au passé composé : 'Les archers ___ de la tour.' (弓兵たちは塔から降りてきた)",
        "options": ["sont descendus", "ont descendu", "sont descendu", "ont descendus"],
        "answerIndex": 0,
        "acceptedAnswers": ["sont descendus"],
        "explanation": "自動詞としての descendre は助動詞 être をとり、主語に性数一致します（sont descendus）。"
    },

    # ==========================================
    # 13. #past_participle_agreement (q_ppa_06 ~ q_ppa_14)
    # ==========================================
    {
        "id": "q_ppa_06",
        "tags": ["#past_participle_agreement", "#grammar", "#B1"],
        "type": "choice",
        "text": "Accordez le participe passé : 'Les lettres que le roi a (écrire) ___ sont scellées.' (王が書いた手紙は封印されている)",
        "options": ["écrites", "écrit", "écrite", "écrits"],
        "answerIndex": 0,
        "acceptedAnswers": ["écrites"],
        "explanation": "直接目的語（que = les lettres, 女性複数）が動詞の前に先行しているため、過去分詞は「écrites」と一致します。"
    },
    {
        "id": "q_ppa_07",
        "tags": ["#past_participle_agreement", "#grammar", "#B1"],
        "type": "choice",
        "text": "Accordez le participe passé : 'Voici les épées qu'ils ont (forger) ___.' (これが彼らが鍛え上げた剣だ)",
        "options": ["forgées", "forgé", "forgée", "forgés"],
        "answerIndex": 0,
        "acceptedAnswers": ["forgées"],
        "explanation": "先行詞 les épées（女性複数）が目的語として先行するため「forgées」となります。"
    },
    {
        "id": "q_ppa_08",
        "tags": ["#past_participle_agreement", "#grammar", "#B1"],
        "type": "choice",
        "text": "Accordez le participe passé : 'Elles se sont (rencontrer) ___ à Paris.' (彼女たちはパリで出会った)",
        "options": ["rencontrées", "rencontré", "rencontrée", "rencontrés"],
        "answerIndex": 0,
        "acceptedAnswers": ["rencontrées"],
        "explanation": "相互的代名動詞（se = 直接目的語, 女性複数 elles）のため「rencontrées」と一致します。"
    },
    {
        "id": "q_ppa_09",
        "tags": ["#past_participle_agreement", "#grammar", "#B1"],
        "type": "choice",
        "text": "Accordez le participe passé : 'La reine est (venir) ___ avec sa cour.' (王妃は宮廷を引き連れてやって来た)",
        "options": ["venue", "venu", "venues", "venus"],
        "answerIndex": 0,
        "acceptedAnswers": ["venue"],
        "explanation": "助動詞 être の場合、過去分詞は主語（la reine, 女性単数）と一致して「venue」になります。"
    },
    {
        "id": "q_ppa_10",
        "tags": ["#past_participle_agreement", "#grammar", "#B1"],
        "type": "choice",
        "text": "Accordez le participe passé : 'Les tartes ? Le pâtissier les a (cuire) ___ ce matin.' (タルトですか？ パティシエが今朝それらを焼きました)",
        "options": ["cuites", "cuit", "cuite", "cuits"],
        "answerIndex": 0,
        "acceptedAnswers": ["cuites"],
        "explanation": "直接目的語代名詞「les」（les tartes, 女性複数）が先行するため「cuites」と一致します。"
    },
    {
        "id": "q_ppa_11",
        "tags": ["#past_participle_agreement", "#grammar", "#B1"],
        "type": "choice",
        "text": "Accordez le participe passé : 'Combien de villes ont-ils (prendre) ___ ?' (彼らはいくつの都市を攻略したのか？)",
        "options": ["prises", "pris", "prise", "prient"],
        "answerIndex": 0,
        "acceptedAnswers": ["prises"],
        "explanation": "疑問詞 Combien de villes（女性複数）が先行しているため「prises」と一致します。"
    },
    {
        "id": "q_ppa_12",
        "tags": ["#past_participle_agreement", "#grammar", "#B1"],
        "type": "choice",
        "text": "Accordez le participe passé : 'Les troupes sont (partir) ___ à l'aube.' (部隊は夜明けに出発した)",
        "options": ["parties", "parti", "partie", "partis"],
        "answerIndex": 0,
        "acceptedAnswers": ["parties"],
        "explanation": "主語 les troupes（女性複数）＋ 助動詞 être のため「parties」となります。"
    },
    {
        "id": "q_ppa_13",
        "tags": ["#past_participle_agreement", "#grammar", "#B1"],
        "type": "choice",
        "text": "Accordez le participe passé : 'Elle s'est (laver) ___ les mains.' (彼女は手を洗った)",
        "options": ["lavé", "lavée", "lavés", "lavées"],
        "answerIndex": 0,
        "acceptedAnswers": ["lavé"],
        "explanation": "代名動詞で直接目的語が後続する（les mains）場合、過去分詞は一致せず不変（lavé）となります。"
    },
    {
        "id": "q_ppa_14",
        "tags": ["#past_participle_agreement", "#grammar", "#B1"],
        "type": "choice",
        "text": "Accordez le participe passé : 'La bataille a (commencer) ___ à midi.' (戦いは正午に始まった)",
        "options": ["commencé", "commencée", "commencés", "commencées"],
        "answerIndex": 0,
        "acceptedAnswers": ["commencé"],
        "explanation": "助動詞 avoir で目的語が先行していないため、過去分詞は不変の「commencé」です。"
    },

    # ==========================================
    # 14. #comparative (q_comp_06 ~ q_comp_13)
    # ==========================================
    {
        "id": "q_comp_06",
        "tags": ["#comparative", "#grammar", "#A2"],
        "type": "choice",
        "text": "Complétez la comparaison : 'Ce vin est ___ que l'autre.' (このワインはもう一方のものより優れている[美味しい])",
        "options": ["meilleur", "plus bon", "mieux", "plus bien"],
        "answerIndex": 0,
        "acceptedAnswers": ["meilleur"],
        "explanation": "bon（良い・美味しい）の優等比較級は不規則で「meilleur」となります（plus bon は不可）。"
    },
    {
        "id": "q_comp_07",
        "tags": ["#comparative", "#grammar", "#A2"],
        "type": "choice",
        "text": "Complétez : 'Le roi d'Angleterre est ___ puissant que le duc.' (イングランド王は公爵よりも強大である)",
        "options": ["plus", "très", "mieux", "bien"],
        "answerIndex": 0,
        "acceptedAnswers": ["plus"],
        "explanation": "形容詞の優等比較級は「plus + 形容詞 + que」です。"
    },
    {
        "id": "q_comp_08",
        "tags": ["#comparative", "#grammar", "#A2"],
        "type": "choice",
        "text": "Complétez : 'Cette épée est ___ lourde que celle-ci.' (この剣はあれほど重くはない[同等または劣等])",
        "options": ["moins", "mieux", "pire", "petit"],
        "answerIndex": 0,
        "acceptedAnswers": ["moins"],
        "explanation": "劣等比較級は「moins + 形容詞 + que」です。"
    },
    {
        "id": "q_comp_09",
        "tags": ["#comparative", "#grammar", "#A2"],
        "type": "choice",
        "text": "Complétez : 'Il cuisine ___ que son frère.' (彼は兄より上手に料理する)",
        "options": ["mieux", "meilleur", "plus bien", "plus bon"],
        "answerIndex": 0,
        "acceptedAnswers": ["mieux"],
        "explanation": "副詞 bien（上手に・良く）の比較級は不規則で「mieux」となります。"
    },
    {
        "id": "q_comp_10",
        "tags": ["#comparative", "#grammar", "#A2"],
        "type": "choice",
        "text": "Complétez l'égalité : 'Jeanne est ___ courageuse que les chevaliers.' (ジャンヌは騎士たちと同じくらい勇敢だ)",
        "options": ["aussi", "autant", "égal", "plus"],
        "answerIndex": 0,
        "acceptedAnswers": ["aussi"],
        "explanation": "形容詞・副詞の同等比較級は「aussi + 形容詞 + que」です（名詞なら autant de）。"
    },
    {
        "id": "q_comp_11",
        "tags": ["#comparative", "#grammar", "#A2"],
        "type": "choice",
        "text": "Complétez la quantité : 'Nous avons ___ de flèches que l'ennemi.' (私たちは敵と同じだけの矢を持っている)",
        "options": ["autant", "aussi", "plus", "moins"],
        "answerIndex": 0,
        "acceptedAnswers": ["autant"],
        "explanation": "名詞の数量の同等比較は「autant de + 名詞 + que」です。"
    },
    {
        "id": "q_comp_12",
        "tags": ["#comparative", "#grammar", "#A2"],
        "type": "choice",
        "text": "Complétez : 'La situation est ___ que la semaine dernière.' (状況は先週よりも悪い)",
        "options": ["pire", "plus mauvais", "plus mal", "mieux"],
        "answerIndex": 0,
        "acceptedAnswers": ["pire"],
        "explanation": "mauvais（悪い）の比較級は「pire」（または plus mauvais）です。"
    },
    {
        "id": "q_comp_13",
        "tags": ["#comparative", "#grammar", "#A2"],
        "type": "choice",
        "text": "Complétez : 'Cette sauce est ___ parfumée que la précédente.' (このソースは前のものより香り豊かだ)",
        "options": ["plus", "mieux", "très", "beaucoup"],
        "answerIndex": 0,
        "acceptedAnswers": ["plus"],
        "explanation": "形容詞 parfumée の比較級は「plus parfumée que」です。"
    },

    # ==========================================
    # 15. #superlative (q_super_06 ~ q_super_13)
    # ==========================================
    {
        "id": "q_super_06",
        "tags": ["#superlative", "#grammar", "#A2"],
        "type": "choice",
        "text": "Complétez : 'Louis IX était le roi le ___ juste de son époque.' (ルイ9世は当時最も公正な王であった)",
        "options": ["plus", "très", "mieux", "meilleur"],
        "answerIndex": 0,
        "acceptedAnswers": ["plus"],
        "explanation": "最上級の構造は「le/la/les plus + 形容詞」です（le plus juste）。"
    },
    {
        "id": "q_super_07",
        "tags": ["#superlative", "#grammar", "#A2"],
        "type": "choice",
        "text": "Complétez : 'C'est la ___ soupe de tout le royaume !' (これは王国中で一番美味しいスープだ！)",
        "options": ["meilleure", "plus bonne", "mieux", "plus bien"],
        "answerIndex": 0,
        "acceptedAnswers": ["meilleure"],
        "explanation": "bon の女性最上級は「la meilleure」です（plus bonne は不可）。"
    },
    {
        "id": "q_super_08",
        "tags": ["#superlative", "#grammar", "#A2"],
        "type": "choice",
        "text": "Complétez : 'Ce sont les guerriers les ___ braves.' (彼らは最も勇敢な戦士たちだ)",
        "options": ["plus", "mieux", "meilleurs", "très"],
        "answerIndex": 0,
        "acceptedAnswers": ["plus"],
        "explanation": "複数の最上級は「les plus + 形容詞」です。"
    },
    {
        "id": "q_super_09",
        "tags": ["#superlative", "#grammar", "#A2"],
        "type": "choice",
        "text": "Complétez : 'C'est le chevalier qui combat le ___.' (彼が最も巧みに戦う騎士だ)",
        "options": ["mieux", "meilleur", "plus bon", "plus bien"],
        "answerIndex": 0,
        "acceptedAnswers": ["mieux"],
        "explanation": "動詞を修飾する副詞 bien の最上級は「le mieux」です。"
    },
    {
        "id": "q_super_10",
        "tags": ["#superlative", "#grammar", "#A2"],
        "type": "choice",
        "text": "Complétez : 'La forteresse la ___ difficile à prendre était imprenable.' (最も攻略が困難な要塞は難攻不落だった)",
        "options": ["plus", "très", "mieux", "beaucoup"],
        "answerIndex": 0,
        "acceptedAnswers": ["plus"],
        "explanation": "女性名詞の最上級「la plus difficile」です。"
    },
    {
        "id": "q_super_11",
        "tags": ["#superlative", "#grammar", "#A2"],
        "type": "choice",
        "text": "Complétez : 'C'est le chemin le ___ court pour aller à Orléans.' (これがオルレアンへ行く一番近い道です)",
        "options": ["plus", "mieux", "meilleur", "très"],
        "answerIndex": 0,
        "acceptedAnswers": ["plus"],
        "explanation": "最上級「le plus court（最短の）」です。"
    },
    {
        "id": "q_super_12",
        "tags": ["#superlative", "#grammar", "#A2"],
        "type": "choice",
        "text": "Complétez : 'C'est la ___ décision possible.' (それは可能な中で最悪の決断だ)",
        "options": ["pire", "plus mauvaise", "plus pire", "moins bonne"],
        "answerIndex": 0,
        "acceptedAnswers": ["pire"],
        "explanation": "mauvais の最上級「la pire（最悪の）」です。"
    },
    {
        "id": "q_super_13",
        "tags": ["#superlative", "#grammar", "#A2"],
        "type": "choice",
        "text": "Complétez : 'Ce restaurant sert les plats les ___ raffinés.' (このレストランは最も洗練された料理を出す)",
        "options": ["plus", "mieux", "meilleurs", "très"],
        "answerIndex": 0,
        "acceptedAnswers": ["plus"],
        "explanation": "最上級「les plus raffinés」です。"
    }
]

print(f"Total new questions prepared: {len(new_questions)}")

# Load existing DB
db_path = os.path.join("rpg", "questions_db.json")
with open(db_path, "r", encoding="utf-8") as f:
    existing_db = json.load(f)

existing_ids = set(q["id"] for q in existing_db if "id" in q)
added = 0
for q in new_questions:
    if q["id"] not in existing_ids:
        existing_db.append(q)
        added += 1

with open(db_path, "w", encoding="utf-8") as f:
    json.dump(existing_db, f, ensure_ascii=False, indent=2)

print(f"Successfully added {added} questions to {db_path}! Total questions now: {len(existing_db)}")
