import json
import os

workspace_dir = r"c:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"
db_path = os.path.join(workspace_dir, "rpg", "questions_db.json")

new_questions = [
    # 1. #comparative
    {
        "id": "q_comp_01",
        "tags": ["#comparative"],
        "type": "choice",
        "text": "Complétez avec le comparatif de supériorité (plus) : 'Ce pain est ___ cuit que l'autre.' (このパンはもう一方よりもよく焼けている)",
        "options": ["plus", "moins", "aussi", "mieux"],
        "answerIndex": 0,
        "acceptedAnswers": ["plus"],
        "explanation": "優等比較級は「plus + 形容詞/副詞 + que」の形を取ります。"
    },
    {
        "id": "q_comp_02",
        "tags": ["#comparative"],
        "type": "choice",
        "text": "Complétez avec le comparatif d'infériorité (moins) : 'Cette sauce est ___ salée que celle d'hier.' (このソースは昨日のものほど塩辛くない)",
        "options": ["moins", "plus", "aussi", "pire"],
        "answerIndex": 0,
        "acceptedAnswers": ["moins"],
        "explanation": "劣等比較級は「moins + 形容詞/副詞 + que」の形を取ります。"
    },
    {
        "id": "q_comp_03",
        "tags": ["#comparative"],
        "type": "choice",
        "text": "Complétez avec le comparatif d'égalité (aussi) : 'Le four A est ___ chaud que le four B.' (オーブンAはオーブンBと同じくらい熱い)",
        "options": ["aussi", "plus", "moins", "autant"],
        "answerIndex": 0,
        "acceptedAnswers": ["aussi"],
        "explanation": "同等比較級は「aussi + 形容詞/副詞 + que」の形を取ります。"
    },
    {
        "id": "q_comp_04",
        "tags": ["#comparative"],
        "type": "choice",
        "text": "Choisissez la bonne phrase : 'Le chef travaille ___ vite que l'apprenti.' (シェフは見習いよりも速く働く)",
        "options": ["plus", "aussi", "moins", "très"],
        "answerIndex": 0,
        "acceptedAnswers": ["plus"],
        "explanation": "比較級「〜よりも速く」は plus vite que となります。"
    },
    {
        "id": "q_comp_05",
        "tags": ["#comparative"],
        "type": "choice",
        "text": "Complétez avec le comparatif d'infériorité : 'Les pommes sont ___ chères en hiver qu'en été.' (リンゴは夏より冬の方が安くない/安い)",
        "options": ["moins", "plus", "aussi", "pire"],
        "answerIndex": 0,
        "acceptedAnswers": ["moins"],
        "explanation": "「夏ほど高くない（＝安い）」を表現するには劣等比較級 moins ... que を使用します。"
    },

    # 2. #superlative
    {
        "id": "q_super_01",
        "tags": ["#superlative"],
        "type": "choice",
        "text": "Complétez avec le superlatif : 'C'est ___ grand gâteau du monde !' (これは世界で最も大きいケーキだ！)",
        "options": ["le plus", "la plus", "les plus", "le moins"],
        "answerIndex": 0,
        "acceptedAnswers": ["le plus"],
        "explanation": "最上級は「定冠詞 + plus/moins + 形容詞」の形を取ります。gâteau（男性単数）に合わせて定冠詞は le になります。"
    },
    {
        "id": "q_super_02",
        "tags": ["#superlative"],
        "type": "choice",
        "text": "Complétez avec le superlatif : 'Ce restaurant est ___ célèbre de la ville.' (このレストランは街で最も有名だ)",
        "options": ["le plus", "la plus", "les plus", "plus"],
        "answerIndex": 0,
        "acceptedAnswers": ["le plus"],
        "explanation": "restaurant（男性単数）に対する最上級なので le plus célèbre になります。"
    },
    {
        "id": "q_super_03",
        "tags": ["#superlative"],
        "type": "choice",
        "text": "Complétez avec le superlatif de minorité (moins) : 'Voici ___ chère bouteille de vin de notre cave.' (これが私たちのセラーで最も高価ではない[安い]ワインボトルだ)",
        "options": ["la moins", "le moins", "les moins", "la plus"],
        "answerIndex": 0,
        "acceptedAnswers": ["la moins"],
        "explanation": "bouteille（女性単数名詞）を修飾するため、女性単数定冠詞の la を使用して la moins とします。"
    },
    {
        "id": "q_super_04",
        "tags": ["#superlative"],
        "type": "choice",
        "text": "Quel est le superlatif irrégulier de 'bon' ? 'Quel est ___ plat de la carte ?' (メニューの中で最も美味しい料理はどれですか？)",
        "options": ["le meilleur", "le plus bon", "le pire", "la meilleure"],
        "answerIndex": 0,
        "acceptedAnswers": ["le meilleur"],
        "explanation": "bon の優等最上級は不規則変化し、le plus bon ではなく le meilleur となります。"
    },
    {
        "id": "q_super_05",
        "tags": ["#superlative"],
        "type": "choice",
        "text": "Quel est le superlatif irrégulier de 'mauvais' ? 'Ce sont ___ conditions de travail.' (これらは最悪の労働条件だ)",
        "options": ["les pires", "les plus mauvaises", "les meilleures", "les pires-mauvaises"],
        "answerIndex": 0,
        "acceptedAnswers": ["les pires"],
        "explanation": "mauvais の最上級は不規則変化して les pires（最悪の）となります。"
    },

    # 3. #object_pronouns_direct_indirect
    {
        "id": "q_obj_di_01",
        "tags": ["#object_pronouns_direct_indirect"],
        "type": "choice",
        "text": "Remplissez le vide : 'Le chef ___ explique la recette.' (シェフは私たちにレシピを説明する)",
        "options": ["nous", "le", "la", "leur"],
        "answerIndex": 0,
        "acceptedAnswers": ["nous"],
        "explanation": "expliquer qc à qn（人に物事を説明する）の構造です。「私たちに」は間接目的語代名詞の nous になります。"
    },
    {
        "id": "q_obj_di_02",
        "tags": ["#object_pronouns_direct_indirect"],
        "type": "choice",
        "text": "Choisissez la bonne place des pronoms : 'Je ___ ___ apporte le plat.' (私は彼にそれを[料理を]持って行きます)",
        "options": ["le lui", "lui le", "la lui", "lui la"],
        "answerIndex": 0,
        "acceptedAnswers": ["le lui"],
        "explanation": "直接目的語(le)と間接目的語(lui/彼に)が並ぶ時の順序は「直接 ➔ 間接（le lui / la lui / les leur）」となります。"
    },
    {
        "id": "q_obj_di_03",
        "tags": ["#object_pronouns_direct_indirect"],
        "type": "choice",
        "text": "Choisissez la bonne place des pronoms : 'Elle ___ ___ montre la cuisine.' (彼女は私たちにそれを見せる)",
        "options": ["nous la", "la nous", "nous le", "le nous"],
        "answerIndex": 0,
        "acceptedAnswers": ["nous la"],
        "explanation": "1・2人称（me, te, nous, vous）と3人称直接目的語（le, la, les）が並ぶ時は「1・2人称 ➔ 3人称（nous la）」の順になります。"
    },
    {
        "id": "q_obj_di_04",
        "tags": ["#object_pronouns_direct_indirect"],
        "type": "choice",
        "text": "Choisissez la bonne place : 'Nous ___ ___ prêtons nos couteaux.' (私たちは彼らにそれらを[包丁を]貸す)",
        "options": ["les leur", "leur les", "les lui", "lui les"],
        "answerIndex": 0,
        "acceptedAnswers": ["les leur"],
        "explanation": "直接目的語(les)と間接目的語(leur/彼らに)が並ぶ順序は「直接 ➔ 間接」となり、les leur となります。"
    },
    {
        "id": "q_obj_di_05",
        "tags": ["#object_pronouns_direct_indirect"],
        "type": "choice",
        "text": "Remplissez les vides : 'Tu ___ ___ passes le sel ?' (私にそれを[塩を]回してくれますか？)",
        "options": ["me le", "le me", "moi le", "le moi"],
        "answerIndex": 0,
        "acceptedAnswers": ["me le"],
        "explanation": "平叙文・疑問文では、1人称間接代名詞 me が直接代名詞 le の前に来て me le となります。"
    },

    # 4. #imperative_with_pronouns
    {
        "id": "q_imp_pr_01",
        "tags": ["#imperative_with_pronouns"],
        "type": "choice",
        "text": "Complétez la commande affirmative (肯定命令) : 'Donnez-___-___.' (それを私にください)",
        "options": ["le-moi", "me-le", "la-moi", "moi-le"],
        "answerIndex": 0,
        "acceptedAnswers": ["le-moi"],
        "explanation": "肯定命令形での代名詞の語順は「動詞 - 直接 - 間接」の順になり、me は強変化形の moi となります (Donnez-le-moi)。"
    },
    {
        "id": "q_imp_pr_02",
        "tags": ["#imperative_with_pronouns"],
        "type": "choice",
        "text": "Complétez la commande négative (否定命令) : 'Ne ___ ___ donnez pas.' (それを私に与えないでください)",
        "options": ["me le", "le moi", "le me", "moi le"],
        "answerIndex": 0,
        "acceptedAnswers": ["me le"],
        "explanation": "否定命令文では、通常の代名詞の語順（主語の直後と同じ位置）に戻るため、Ne me le donnez pas となります。"
    },
    {
        "id": "q_imp_pr_03",
        "tags": ["#imperative_with_pronouns"],
        "type": "choice",
        "text": "Complétez la commande affirmative : 'Prépare-___-___ pour ce soir.' (それらを彼女のために準備しなさい)",
        "options": ["les-lui", "lui-les", "les-leur", "leur-les"],
        "answerIndex": 0,
        "acceptedAnswers": ["les-lui"],
        "explanation": "肯定命令形なので「動詞 - 直接(les) - 間接(lui)」の順にハイフンで繋ぎます。"
    },
    {
        "id": "q_imp_pr_04",
        "tags": ["#imperative_with_pronouns"],
        "type": "choice",
        "text": "Complétez la commande négative : 'Ne ___ ___ dis pas.' (それを彼/彼女に言ってはいけない)",
        "options": ["le lui", "lui le", "le me", "lui la"],
        "answerIndex": 0,
        "acceptedAnswers": ["le lui"],
        "explanation": "否定命令文の代名詞順序は「直接(le) ➔ 間接(lui)」になり、Ne le lui dis pas となります。"
    },
    {
        "id": "q_imp_pr_05",
        "tags": ["#imperative_with_pronouns"],
        "type": "choice",
        "text": "Complétez la commande affirmative : 'Apporte-___-___ rapidement.' (それを[女性名詞の spatule を]彼らに持って行きなさい)",
        "options": ["la-leur", "leur-la", "la-lui", "lui-la"],
        "answerIndex": 0,
        "acceptedAnswers": ["la-leur"],
        "explanation": "肯定命令形での順序は「動詞 - 直接(la) - 間接(leur)」になり、Apporte-la-leur となります。"
    },

    # 5. #past_compose
    {
        "id": "q_pc_01",
        "tags": ["#past_compose"],
        "type": "choice",
        "text": "Remplissez le vide pour la structure de base du passé composé : 'J'___ préparé la tarte.' (私はタルトを準備しました)",
        "options": ["ai", "suis", "a", "es"],
        "answerIndex": 0,
        "acceptedAnswers": ["ai"],
        "explanation": "ほとんどの動詞は助動詞として avoir（現在形）をとります。Je のときの活用 is ai になります。"
    },
    {
        "id": "q_pc_02",
        "tags": ["#past_compose"],
        "type": "choice",
        "text": "Remplissez le vide : 'Nous ___ fini le service à minuit.' (私たちは深夜12時に営業サービスを終えた)",
        "options": ["avons", "sommes", "avez", "ont"],
        "answerIndex": 0,
        "acceptedAnswers": ["avons"],
        "explanation": "finir は avoir を助動詞とするため、Nous avons fini となります。"
    },
    {
        "id": "q_pc_03",
        "tags": ["#past_compose"],
        "type": "choice",
        "text": "Remplissez le vide : 'Tu ___ coupé les oignons ?' (君はタマネギを切りましたか？)",
        "options": ["as", "es", "a", "est"],
        "answerIndex": 0,
        "acceptedAnswers": ["as"],
        "explanation": "couper の過去における助動詞は avoir です。Tu の活用は as になります。"
    },
    {
        "id": "q_pc_04",
        "tags": ["#past_compose"],
        "type": "choice",
        "text": "Remplissez le vide : 'Le chef ___ vérifié la cuisson.' (シェフは焼き加減をチェックしました)",
        "options": ["a", "est", "as", "es"],
        "answerIndex": 0,
        "acceptedAnswers": ["a"],
        "explanation": "主語 Le chef（三人称単数）に対する avoir の現在形は a となります。"
    },
    {
        "id": "q_pc_05",
        "tags": ["#past_compose"],
        "type": "choice",
        "text": "Remplissez le vide : 'Ils ___ acheté des légumes.' (彼らは野菜を買いました)",
        "options": ["ont", "sont", "avons", "avez"],
        "answerIndex": 0,
        "acceptedAnswers": ["ont"],
        "explanation": "三人称複数 Ils に対する avoir の活用は ont となります。"
    },

    # 6. #auxiliary_selection
    {
        "id": "q_aux_01",
        "tags": ["#auxiliary_selection"],
        "type": "choice",
        "text": "Sélectionnez le bon auxiliaire (助動詞) : 'Le sous-chef ___ allé au marché.' (スーシェフは市場へ行きました)",
        "options": ["est", "a", "va", "fait"],
        "answerIndex": 0,
        "acceptedAnswers": ["est"],
        "explanation": "移動を表す動詞 aller（行く）は、過去の助動詞として être を取ります。"
    },
    {
        "id": "q_aux_02",
        "tags": ["#auxiliary_selection"],
        "type": "choice",
        "text": "Sélectionnez le bon auxiliaire : 'Nous ___ partis tard hier.' (私たちは昨日遅くに出発しました)",
        "options": ["sommes", "avons", "allons", "faisons"],
        "answerIndex": 0,
        "acceptedAnswers": ["sommes"],
        "explanation": "往来発着を表す動詞 partir（出発する）は助動詞に être を取ります。"
    },
    {
        "id": "q_aux_03",
        "tags": ["#auxiliary_selection"],
        "type": "choice",
        "text": "Sélectionnez le bon auxiliaire : 'Elle ___ restée en cuisine.' (彼女は厨房に残りました)",
        "options": ["est", "a", "va", "y a"],
        "answerIndex": 0,
        "acceptedAnswers": ["est"],
        "explanation": "rester（残る）は状態の継続・滞在を表す往来発着の仲間なので、助動詞に être を取ります。"
    },
    {
        "id": "q_aux_04",
        "tags": ["#auxiliary_selection"],
        "type": "choice",
        "text": "Sélectionnez le bon auxiliaire : 'Ils ___ devenus de grands cuisiniers.' (彼らは一人前の料理人になった)",
        "options": ["sont", "ont", "vont", "font"],
        "answerIndex": 0,
        "acceptedAnswers": ["sont"],
        "explanation": "変化を表す動詞 devenir（〜になる）は助動詞に être を取ります。"
    },
    {
        "id": "q_aux_05",
        "tags": ["#auxiliary_selection"],
        "type": "choice",
        "text": "Sélectionnez le bon auxiliaire : 'Je ___ tombé pendant le service.' (私は営業中に転んだ)",
        "options": ["suis", "ai", "vais", "fais"],
        "answerIndex": 0,
        "acceptedAnswers": ["suis"],
        "explanation": "tombé（転ぶ・落ちる）は移動・状態変化を表すため、助動詞に être を取ります。"
    },

    # 7. #past_participle_agreement
    {
        "id": "q_ppa_01",
        "tags": ["#past_participle_agreement"],
        "type": "choice",
        "text": "Choisissez le bon participe passé avec être : 'Elle est ___ tard hier.' (彼女は昨日遅くに来た)",
        "options": ["venue", "venu", "venus", "venues"],
        "answerIndex": 0,
        "acceptedAnswers": ["venue"],
        "explanation": "助動詞 être の場合、過去分詞は主語（Elle: 女性単数）の性と数に一致して女性単数形 venue となります。"
    },
    {
        "id": "q_ppa_02",
        "tags": ["#past_participle_agreement"],
        "type": "choice",
        "text": "Choisissez le bon participe passé avec avoir (直接目的語が前にある場合) : 'La tarte que j'ai ___ était délicieuse.' (私が焼いたタルトは美味しかった)",
        "options": ["cuite", "cuit", "cuits", "cuites"],
        "answerIndex": 0,
        "acceptedAnswers": ["cuite"],
        "explanation": "関係代名詞 que（修飾される名詞 tarte: 女性単数）が関係節内で動詞の前に位置するため、過去分詞 cuit は女性単数形 cuite に性数一致します。"
    },
    {
        "id": "q_ppa_03",
        "tags": ["#past_participle_agreement"],
        "type": "choice",
        "text": "Choisissez le bon participe passé : 'Les clients sont ___ nombreux ce midi.' (本日のお昼、お客様は多く到着した)",
        "options": ["arrivés", "arrivé", "arrivée", "arrivées"],
        "answerIndex": 0,
        "acceptedAnswers": ["arrivés"],
        "explanation": "助動詞 être のため、過去分詞は主語（Les clients: 男性複数）に一致して arrivés となります。"
    },
    {
        "id": "q_ppa_04",
        "tags": ["#past_participle_agreement"],
        "type": "choice",
        "text": "Choisissez le bon participe passé : 'Les assiettes que nous avons ___ sont propres.' (私たちが洗ったお皿はきれいだ)",
        "options": ["lavées", "lavé", "lavés", "lavée"],
        "answerIndex": 0,
        "acceptedAnswers": ["lavées"],
        "explanation": "関係代名詞 que の先行詞である assiettes（女性複数）が動詞の前にあるため、過去分詞は女性複数形 lavées に一致します。"
    },
    {
        "id": "q_ppa_05",
        "tags": ["#past_participle_agreement"],
        "type": "choice",
        "text": "Choisissez le bon participe passé : 'Mes sœurs sont ___ nous voir.' (私の姉妹たちが私たちに会いに来た)",
        "options": ["venues", "venu", "venus", "venue"],
        "answerIndex": 0,
        "acceptedAnswers": ["venues"],
        "explanation": "主語 Mes sœurs（女性複数）かつ助動詞 être なので、過去分詞は女性複数形 venues に一致します。"
    },

    # 8. #imparfait
    {
        "id": "q_imp_01",
        "tags": ["#imparfait"],
        "type": "choice",
        "text": "Remplissez le vide avec l'imparfait : 'Quand j'___ jeune, je voulais être chef.' (私は若かった頃、シェフになりたかった)",
        "options": ["étais", "avais", "serais", "fus"],
        "answerIndex": 0,
        "acceptedAnswers": ["étais"],
        "explanation": "過去の継続的な状態や背景を表すには半過去（imparfait）を使います。être の一人称単数半過去は étais です。"
    },
    {
        "id": "q_imp_02",
        "tags": ["#imparfait"],
        "type": "choice",
        "text": "Complétez à l'imparfait : 'Le restaurant ___ beaucoup de clients.' (そのレストランは[当時]多くのお客さんがいた)",
        "options": ["avait", "a", "ayant", "eut"],
        "answerIndex": 0,
        "acceptedAnswers": ["avait"],
        "explanation": "avoir の三人称単数半過去形は avait となります。"
    },
    {
        "id": "q_imp_03",
        "tags": ["#imparfait"],
        "type": "choice",
        "text": "Complétez à l'imparfait : 'Nous ___ le pain nous-mêmes.' (私たちは[当時]パンを自分たちで作っていた)",
        "options": ["faisions", "faisons", "fassions", "ferons"],
        "answerIndex": 0,
        "acceptedAnswers": ["faisions"],
        "explanation": "faire の半過去複数一人称（nous）は faisons の語幹に半過去語尾 -ions がついて faisions となります。"
    },
    {
        "id": "q_imp_04",
        "tags": ["#imparfait"],
        "type": "choice",
        "text": "Complétez à l'imparfait : 'Tu ___ toujours attention aux détails.' (君はいつも細部に気をつけていた)",
        "options": ["faisais", "fais", "feras", "fisses"],
        "answerIndex": 0,
        "acceptedAnswers": ["faisais"],
        "explanation": "faire の二人称単数（tu）の半過去形は faisais です。"
    },
    {
        "id": "q_imp_05",
        "tags": ["#imparfait"],
        "type": "choice",
        "text": "Complétez à l'imparfait : 'Les clients ___ satisfaits.' (お客様たちは満足していた)",
        "options": ["étaient", "sont", "seront", "furent"],
        "answerIndex": 0,
        "acceptedAnswers": ["étaient"],
        "explanation": "être の三人称複数（ils/elles）の半過去形は étaient となります。"
    },

    # 9. #imparfait_vs_past_compose
    {
        "id": "q_ivspc_01",
        "tags": ["#imparfait_vs_past_compose"],
        "type": "choice",
        "text": "Choisissez le bon temps (半過去と複合過去の使い分け) : 'Je cuisinais quand le chef ___.' (私が料理をしていた時、シェフが入ってきた)",
        "options": ["est entré", "entrait", "entre", "sera entré"],
        "answerIndex": 0,
        "acceptedAnswers": ["est entré"],
        "explanation": "「〜していた（動作の背景：半過去 cuisinais）」という状態の中に、「シェフが入ってきた（突発的・完了した1回の動作：複合過去）」が起きたため、est entré を使用します。"
    },
    {
        "id": "q_ivspc_02",
        "tags": ["#imparfait_vs_past_compose"],
        "type": "choice",
        "text": "Choisissez le bon temps : 'Hier, il ___ beau, alors nous avons fait le service dehors.' (昨日、天気がよかったので、私たちは外で接客サービスをした)",
        "options": ["faisait", "a fait", "fait", "fera"],
        "answerIndex": 0,
        "acceptedAnswers": ["faisait"],
        "explanation": "天候や状態など、過去の出来事の『背景・状況』を説明する文脈では半過去 faisait を使用します。"
    },
    {
        "id": "q_ivspc_03",
        "tags": ["#imparfait_vs_past_compose"],
        "type": "choice",
        "text": "Choisissez le bon temps : 'Soudain, le four ___ de fonctionner.' (突然、オーブンが動かなくなった)",
        "options": ["a arrêté", "arrêtait", "arrête", "arrêtera"],
        "answerIndex": 0,
        "acceptedAnswers": ["a arrêté"],
        "explanation": "Soudain（突然）という特定の時間において「（オーブンが）止まった」という1回限りの完了アクションを表すため、複合過去 a arrêté になります。"
    },
    {
        "id": "q_ivspc_04",
        "tags": ["#imparfait_vs_past_compose"],
        "type": "choice",
        "text": "Choisissez le bon temps : 'Pendant que je lavais les légumes, le client ___.' (私が野菜を洗っている間に、顧客が到着した)",
        "options": ["est arrivé", "arrivait", "arrive", "arrivera"],
        "answerIndex": 0,
        "acceptedAnswers": ["est arrivé"],
        "explanation": "野菜を洗っている動作の最中（半過去）に、顧客の到着という単発の出来事（複合過去）が起きた状況を表します。"
    },
    {
        "id": "q_ivspc_05",
        "tags": ["#imparfait_vs_past_compose"],
        "type": "choice",
        "text": "Choisissez le bon temps : 'Nous ___ en train de manger quand le téléphone a sonné.' (電話が鳴ったとき、私たちは食べている最中だった)",
        "options": ["étions", "avons été", "sommes", "serons"],
        "answerIndex": 0,
        "acceptedAnswers": ["étions"],
        "explanation": "「〜している最中だった」という過去の継続していた背景状態なので半過去 étions となります。"
    },

    # 10. #relative_pronouns_basic
    {
        "id": "q_rel_01",
        "tags": ["#relative_pronouns_basic"],
        "type": "choice",
        "text": "Choisissez le bon pronom relatif (関係代名詞) : 'C'est le chef ___ dirige la cuisine.' (これが厨房を取り仕切るシェフです)",
        "options": ["qui", "que", "dont", "où"],
        "answerIndex": 0,
        "acceptedAnswers": ["qui"],
        "explanation": "関係節内で主語の役割をする関係代名詞は qui になります（qui dirige = 彼が率いる）。"
    },
    {
        "id": "q_rel_02",
        "tags": ["#relative_pronouns_basic"],
        "type": "choice",
        "text": "Choisissez the bon pronom relatif : 'Le plat ___ vous avez préparé est excellent.' (あなたが準備した料理は素晴らしい)",
        "options": ["que", "qui", "dont", "où"],
        "answerIndex": 0,
        "acceptedAnswers": ["que"],
        "explanation": "関係節内で直接目的語の役割をする関係代名詞は que になります（vous avez préparé le plat ➔ que vous avez...）。"
    },
    {
        "id": "q_rel_03",
        "tags": ["#relative_pronouns_basic"],
        "type": "choice",
        "text": "Choisissez le bon pronom relatif : 'Je cherche le couteau ___ est sur la table.' (私はテーブルの上にある包丁を探している)",
        "options": ["qui", "que", "où", "dont"],
        "answerIndex": 0,
        "acceptedAnswers": ["qui"],
        "explanation": "関係節内で動詞 est の主語として働くため qui を選択します。"
    },
    {
        "id": "q_rel_04",
        "tags": ["#relative_pronouns_basic"],
        "type": "choice",
        "text": "Choisissez le bon pronom relatif : 'Les légumes ___ nous utilisons sont bio.' (私たちが使っている野菜はオーガニックだ)",
        "options": ["que", "qui", "dont", "où"],
        "answerIndex": 0,
        "acceptedAnswers": ["que"],
        "explanation": "nous utilisons (直接目的語) にあたる野菜を関係節に繋ぐため、直接目的格の que となります。"
    },
    {
        "id": "q_rel_05",
        "tags": ["#relative_pronouns_basic"],
        "type": "choice",
        "text": "Choisissez le bon pronom relatif : 'L'apprenti ___ travaille dur réussira.' (熱心に働く見習いは成功するだろう)",
        "options": ["qui", "que", "où", "dont"],
        "answerIndex": 0,
        "acceptedAnswers": ["qui"],
        "explanation": "関係節内で動詞 travaille の主語として働くため qui を使用します。"
    },

    # 11. #conjunctions_basic
    {
        "id": "q_conj_01",
        "tags": ["#conjunctions_basic"],
        "type": "choice",
        "text": "Choisissez la bonne conjonction (接続詞) : 'Je ne mange pas de viande ___ je suis végétarien.' (私はベジタリアンなので肉を食べない)",
        "options": ["parce que", "mais", "donc", "quand"],
        "answerIndex": 0,
        "acceptedAnswers": ["parce que"],
        "explanation": "理由（〜だから、〜なので）を説明する接続詞は parce que（because）になります。"
    },
    {
        "id": "q_conj_02",
        "tags": ["#conjunctions_basic"],
        "type": "choice",
        "text": "Choisissez la bonne conjonction : 'Le four est cassé, ___ nous ne pouvons pas cuire le pain.' (オーブンが壊れている。したがって、私たちはパンを焼くことができない)",
        "options": ["donc", "mais", "parce que", "si"],
        "answerIndex": 0,
        "acceptedAnswers": ["donc"],
        "explanation": "結果や帰結（したがって、だから）を表す接続詞は donc（therefore, so）になります。"
    },
    {
        "id": "q_conj_03",
        "tags": ["#conjunctions_basic"],
        "type": "choice",
        "text": "Choisissez la bonne conjonction : 'Le service était difficile, ___ les clients étaient contents.' (接客サービスは大変だったが、お客様たちは満足していた)",
        "options": ["mais", "donc", "parce que", "ou"],
        "answerIndex": 0,
        "acceptedAnswers": ["mais"],
        "explanation": "逆接（しかし、だが）を表す接続詞は mais（but）になります。"
    },
    {
        "id": "q_conj_04",
        "tags": ["#conjunctions_basic"],
        "type": "choice",
        "text": "Choisissez la bonne conjonction : 'Nous fermons le restaurant ___ c'est lundi.' (月曜日なので、私たちはレストランを閉める)",
        "options": ["parce que", "donc", "mais", "puisque"],
        "answerIndex": 0,
        "acceptedAnswers": ["parce que"],
        "explanation": "「月曜日だから」という直接の理由を提示する parce que が最適です。"
    },
    {
        "id": "q_conj_05",
        "tags": ["#conjunctions_basic"],
        "type": "choice",
        "text": "Choisissez la bonne conjonction : 'Il a bien travaillé, ___ le chef l'a récompensé.' (彼はよく働いた。だから、シェフは彼にご褒美をあげた)",
        "options": ["donc", "mais", "parce que", "comme"],
        "answerIndex": 0,
        "acceptedAnswers": ["donc"],
        "explanation": "文脈的に「よく働いた、その結果（だから）〜された」という因果関係を導くため donc を使います。"
    },

    # 12. #gerund_participle
    {
        "id": "q_gp_01",
        "tags": ["#gerund_participle"],
        "type": "choice",
        "text": "Complétez la structure du gérondif (ジェロンディフ) : 'Il s'est coupé le doigt ___ coupant les légumes.' (彼は野菜を切りながら指を切った)",
        "options": ["en", "par", "de", "pour"],
        "answerIndex": 0,
        "acceptedAnswers": ["en"],
        "explanation": "ジェロンディフは「en + 現在分詞」の形を取り、同時進行する動作や手段・原因などを表します。"
    },
    {
        "id": "q_gp_02",
        "tags": ["#gerund_participle"],
        "type": "choice",
        "text": "Choisissez le proverbe correct utilisant le gérondif : 'C'est ___ que l'on devient forgeron.' (習うより慣れよ / 鍛錬によって職人になる)",
        "options": ["en forgeant", "forger", "forgé", "en forge"],
        "answerIndex": 0,
        "acceptedAnswers": ["en forgeant"],
        "explanation": "「鍛えることによって（手段・方法）」を en + 現在分詞（forgeant）のジェロンディフで表しています。"
    },
    {
        "id": "q_gp_03",
        "tags": ["#gerund_participle"],
        "type": "choice",
        "text": "Complétez : '___ la sauce, elle a ajusté le sel.' (ソースの味見をしながら、彼女は塩加減を調整した)",
        "options": ["En goûtant", "Goûter", "Goûté", "En goût"],
        "answerIndex": 0,
        "acceptedAnswers": ["En goûtant"],
        "explanation": "「味見をしながら」という同時進行の動作を、goûter の現在分詞 goûtant に en をつけたジェロンディフで表現します。"
    },
    {
        "id": "q_gp_04",
        "tags": ["#gerund_participle"],
        "type": "choice",
        "text": "Remplissez le vide : 'Il travaille tout ___ écoutant de la musique.' (彼は音楽を聴きながらずっと働いている)",
        "options": ["en", "à", "de", "pour"],
        "answerIndex": 0,
        "acceptedAnswers": ["en"],
        "explanation": "tout en + 現在分詞 でジェロンディフの同時動作（〜しながら）を強調する構文になります。"
    },
    {
        "id": "q_gp_05",
        "tags": ["#gerund_participle"],
        "type": "choice",
        "text": "Complétez : 'Nous apprenons le français ___ cuisinant.' (私たちは料理をしながらフランス語を学んでいる)",
        "options": ["en", "par", "pour", "de"],
        "answerIndex": 0,
        "acceptedAnswers": ["en"],
        "explanation": "cuisinant（cuisiner の現在分詞）とセットにして「料理をしながら（ジェロンディフ）」を表すため en を用います。"
    }
]

def main():
    with open(db_path, 'r', encoding='utf-8') as f:
        questions = json.load(f)

    existing_ids = {q['id'] for q in questions}
    added_count = 0
    for q in new_questions:
        if q['id'] not in existing_ids:
            questions.append(q)
            existing_ids.add(q['id'])
            added_count += 1

    with open(db_path, 'w', encoding='utf-8') as f:
        json.dump(questions, f, ensure_ascii=False, indent=2)
    print(f"Added {added_count} new French grammar questions to database.")

if __name__ == '__main__':
    main()
