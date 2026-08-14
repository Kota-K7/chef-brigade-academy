import os
import re
import json

workspace_dir = r"c:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"
draft_path = os.path.join(workspace_dir, "story_drafts.txt")
story_dest_dir = os.path.join(workspace_dir, "rpg", "story")
questions_path = os.path.join(workspace_dir, "rpg", "questions_db.json")
grammar_ref_path = os.path.join(workspace_dir, "data", "grammar_reference.json")

char_map = {
    "佐伯": "saeki",
    "エロディ": "elodie",
    "ガエル": "gael",
    "ピエール": "jean_pierre",
    "満": "kanetake",
    "主人公": "hero",
    "全員": None
}

# --- Questions to add ---
new_questions = [
    # #three_verb_groups
    {
        "id": "q_career_1_1_three_verb_groups_1",
        "tags": ["#three_verb_groups", "#basic", "#A1"],
        "type": "choice",
        "text": "フランス語の動詞 'couper' (切る) は何群動詞ですか？\n(À quel groupe appartient le verbe 'couper' ?)",
        "options": ["第1群動詞 (-er)", "第2群動詞 (-ir)", "第3群動詞 (不規則)", "第4群動詞"],
        "answerIndex": 0,
        "explanation": "couper は規則的な変化をする第1群動詞 (-er動詞) に分類されます。"
    },
    {
        "id": "q_career_1_1_three_verb_groups_2",
        "tags": ["#three_verb_groups", "#basic", "#A1"],
        "type": "choice",
        "text": "フランス語の動詞 'finir' (終わる・仕上げる) は何群動詞ですか？\n(À quel groupe appartient le verbe 'finir' ?)",
        "options": ["第1群動詞", "第2群動詞 (-ir)", "第3群動詞", "助動詞"],
        "answerIndex": 1,
        "explanation": "finir は現在分詞が finissant となる規則的な第2群動詞 (-ir動詞) です。"
    },
    {
        "id": "q_career_1_1_three_verb_groups_3",
        "tags": ["#three_verb_groups", "#basic", "#A1"],
        "type": "choice",
        "text": "不規則な変化をする 'faire' (する・作る) や 'aller' (行く) は何群動詞に分類されますか？\n(Dans quel groupe classe-t-on 'faire' et 'aller' ?)",
        "options": ["第1群動詞", "第2群動詞", "第3群動詞 (不規則動詞)", "規則動詞"],
        "answerIndex": 2,
        "explanation": "不規則動詞はすべて第3群動詞に分類されます。aller も例外的に第3群です。"
    },
    {
        "id": "q_career_1_1_three_verb_groups_4",
        "tags": ["#three_verb_groups", "#basic", "#A1"],
        "type": "typing",
        "text": "第一群規則動詞の不定詞（原形）の末尾は、一般的にどの2文字で終わりますか？\n(Par quelles deux lettres se termine l'infinitif des verbes du premier groupe ?)",
        "acceptedAnswers": ["er", "ER"],
        "explanation": "第一群動詞の原形の語尾は -er になります（例：couper, préparer）。"
    },
    {
        "id": "q_career_1_1_three_verb_groups_5",
        "tags": ["#three_verb_groups", "#basic", "#A1"],
        "type": "typing",
        "text": "第二群規則動詞の不定詞（原形）の末尾は、一般的にどの2文字で終わりますか？\n(Par quelles deux lettres se termine l'infinitif des verbes du deuxième groupe ?)",
        "acceptedAnswers": ["ir", "IR"],
        "explanation": "第二群動詞の原形の語尾は -ir になります（例：finir, choisir）。"
    },
    # #transitive_intransitive
    {
        "id": "q_career_1_1_transitive_intransitive_1",
        "tags": ["#transitive_intransitive", "#basic", "#A1"],
        "type": "choice",
        "text": "直接目的語（「〜を」にあたる言葉）を直接取る動詞を何と呼びますか？\n(Comment appelle-t-on un verbe qui a besoin d'un complément d'objet direct ?)",
        "options": ["他動詞 (Verbe transitif)", "自動詞 (Verbe intransitif)", "助動詞", "代名動詞"],
        "answerIndex": 0,
        "explanation": "直接目的語（〜を）を伴う動詞は「他動詞」と呼ばれます。"
    },
    {
        "id": "q_career_1_1_transitive_intransitive_2",
        "tags": ["#transitive_intransitive", "#basic", "#A1"],
        "type": "choice",
        "text": "目的語を取らず、主語自身の動作や移動などを表す動詞を何と呼びますか？\n(Comment appelle-t-on un verbe sans complément d'objet ?)",
        "options": ["他動詞", "自動詞 (Verbe intransitif)", "非人称動詞", "受動動詞"],
        "answerIndex": 1,
        "explanation": "目的語を必要としない動詞は「自動詞」と呼ばれます。"
    },
    {
        "id": "q_career_1_1_transitive_intransitive_3",
        "tags": ["#transitive_intransitive", "#basic", "#A1"],
        "type": "choice",
        "text": "動詞 'couper' (切る) は自動詞・他動詞のどちらですか？\n(Le verbe 'couper' est-il transitif ou intransitif ?)",
        "options": ["他動詞 (Transitif)", "自動詞 (Intransitif)"],
        "answerIndex": 0,
        "explanation": "「〜を切る」という目的語をとるため、couper は他動詞です。"
    },
    {
        "id": "q_career_1_1_transitive_intransitive_4",
        "tags": ["#transitive_intransitive", "#basic", "#A1"],
        "type": "choice",
        "text": "動詞 'aller' (行く) は自動詞・他動詞のどちらですか？\n(Le verbe 'aller' est-il transitif ou intransitif ?)",
        "options": ["他動詞 (Transitif)", "自動詞 (Intransitif)"],
        "answerIndex": 1,
        "explanation": "「行く」は目的語をとらないため、自動詞です。"
    },
    # #indicative_present
    {
        "id": "q_career_1_1_indicative_present_1",
        "tags": ["#indicative_present", "#basic", "#A1"],
        "type": "choice",
        "text": "フランス語の「直説法現在」が表すことができる時制・ニュアンスとして、正しくないものはどれか。\n(Qu'est-ce qui n'est pas exprimé par le présent de l'indicatif ?)",
        "options": ["現在の状態や事実", "現在の習慣的動作", "過去の完了した事実", "近い未来の予定"],
        "answerIndex": 2,
        "explanation": "直説法現在は、現在の状態、事実、習慣、近い未来の予定を表すことができますが、過去の完了した事実は表せません。"
    },
    {
        "id": "q_career_1_1_indicative_present_2",
        "tags": ["#indicative_present", "#basic", "#A1"],
        "type": "typing",
        "text": "「私は玉ねぎを切ります」は「Je ___ les oignons.」です。動詞 couper の Je に対する現在形活用を入力してください。\n(Complétez : Je ___ les oignons. (couper))",
        "acceptedAnswers": ["coupe"],
        "explanation": "Je に対する第一群動詞の現在形語尾は -e (coupe) になります。"
    },
    {
        "id": "q_career_1_1_indicative_present_3",
        "tags": ["#indicative_present", "#basic", "#A1"],
        "type": "typing",
        "text": "「私たちは生地を仕上げます」は「Nous ___ la pâte.」です。動詞 finir の Nous に対する現在形活用を入力してください。\n(Complétez : Nous ___ la pâte. (finir))",
        "acceptedAnswers": ["finissons"],
        "explanation": "Nous に対する第二群動詞の現在形語尾は -issons (finissons) になります。"
    },
    # #verb_conjugation_patterns
    {
        "id": "q_career_1_1_verb_conjugation_patterns_1",
        "tags": ["#verb_conjugation_patterns", "#applied", "#A1"],
        "type": "typing",
        "text": "第一群規則動詞（-er）の二人称単数（tu）の現在形活用語尾はどの2文字になりますか？\n(Quelle est la terminaison du présent des verbes en -er pour 'tu' ?)",
        "acceptedAnswers": ["es", "ES"],
        "explanation": "tu に対する第一群動詞の現在形語尾は -es になります（例：tu coupes）。"
    },
    {
        "id": "q_career_1_1_verb_conjugation_patterns_2",
        "tags": ["#verb_conjugation_patterns", "#applied", "#A1"],
        "type": "typing",
        "text": "第一群規則動詞（-er）の三人称複数（ils / elles）の現在形活用語尾はどの3文字になりますか？\n(Quelle est la terminaison du présent des verbes en -er pour 'ils/elles' ?)",
        "acceptedAnswers": ["ent", "ENT"],
        "explanation": "ils/elles に対する第一群動詞の現在形語尾は -ent になります（例：ils coupent）。"
    },
    {
        "id": "q_career_1_1_verb_conjugation_patterns_3",
        "tags": ["#verb_conjugation_patterns", "#applied", "#A1"],
        "type": "typing",
        "text": "第二群規則動詞（-ir）の現在形において、複数人称（nous, vous, ils）で共通して挿入される綴りは何ですか？\n(Quelle syllabe insère-t-on au pluriel des verbes en -ir ?)",
        "acceptedAnswers": ["iss", "ISS"],
        "explanation": "-ir 動詞（第二群）の複数人称の活用形には -iss- が入ります（例：finissons, finissez, finissent）。"
    },
    # #regular_verbs_1_2
    {
        "id": "q_career_1_1_regular_verbs_1_2_1",
        "tags": ["#regular_verbs_1_2", "#applied", "#A1"],
        "type": "typing",
        "text": "「君は生地を仕上げる」は「Tu ___ la pâte.」です。空欄に finir の現在形活用を入力してください。\n(Complétez : Tu ___ la pâte. (finir))",
        "acceptedAnswers": ["finis"],
        "explanation": "tu に対する finir の現在形は finis です。"
    },
    {
        "id": "q_career_1_1_regular_verbs_1_2_2",
        "tags": ["#regular_verbs_1_2", "#applied", "#A1"],
        "type": "typing",
        "text": "「私たちは野菜を切る」は「Nous ___ les légumes.」です。空欄に couper の現在形活用を入力してください。\n(Complétez : Nous ___ les légumes. (couper))",
        "acceptedAnswers": ["coupons"],
        "explanation": "nous に対する couper の現在形は coupons です。"
    },
    {
        "id": "q_career_1_1_regular_verbs_1_2_3",
        "tags": ["#regular_verbs_1_2", "#applied", "#A1"],
        "type": "typing",
        "text": "「あなた方はソースを仕上げる」は「Vous ___ la sauce.」です。空欄に finir の現在形活用を入力してください。\n(Complétez : Vous ___ la sauce. (finir))",
        "acceptedAnswers": ["finissez"],
        "explanation": "vous に対する finir の現在形は finissez です。"
    },
    {
        "id": "q_career_1_1_regular_verbs_1_2_4",
        "tags": ["#regular_verbs_1_2", "#applied", "#A1"],
        "type": "typing",
        "text": "「彼らはトマトを切る」は「Ils ___ les tomates.」です。空欄に couper の現在形活用を入力してください。\n(Complétez : Ils ___ les tomates. (couper))",
        "acceptedAnswers": ["coupent"],
        "explanation": "ils に対する couper の現在形は coupent です。"
    },
    # #irregular_verbs_major
    {
        "id": "q_career_1_1_irregular_verbs_major_1",
        "tags": ["#irregular_verbs_major", "#mixed", "#A1"],
        "type": "typing",
        "text": "「私はレストランに行く」は「Je ___ au restaurant.」です。動詞 aller の現在形活用を入力してください。\n(Complétez : Je ___ au restaurant. (aller))",
        "acceptedAnswers": ["vais"],
        "explanation": "Je に対する aller の現在形は vais です。"
    },
    {
        "id": "q_career_1_1_irregular_verbs_major_2",
        "tags": ["#irregular_verbs_major", "#mixed", "#A1"],
        "type": "typing",
        "text": "「私たちは仕込みをする」は「Nous ___ la mise en place.」です。動詞 faire の現在形活用を入力してください。\n(Complétez : Nous ___ la mise en place. (faire))",
        "acceptedAnswers": ["faisons"],
        "explanation": "Nous に対する faire の現在形は faisons です。"
    },
    {
        "id": "q_career_1_1_irregular_verbs_major_3",
        "tags": ["#irregular_verbs_major", "#mixed", "#A1"],
        "type": "typing",
        "text": "「あなた方はパリから来ます」は「Vous ___ de Paris.」です。動詞 venir の現在形活用を入力してください。\n(Complétez : Vous ___ de Paris. (venir))",
        "acceptedAnswers": ["venez"],
        "explanation": "Vous に対する venir の現在形は venez です。"
    },
    {
        "id": "q_career_1_1_irregular_verbs_major_4",
        "tags": ["#irregular_verbs_major", "#mixed", "#A1"],
        "type": "typing",
        "text": "「彼らはパンを作る」は「Ils ___ du pain.」です。動詞 faire の現在形活用を入力してください。\n(Complétez : Ils ___ du pain. (faire))",
        "acceptedAnswers": ["font"],
        "explanation": "Ils に対する faire の現在形は font です。"
    },
    {
        "id": "q_career_1_1_irregular_verbs_major_5",
        "tags": ["#irregular_verbs_major", "#mixed", "#A1"],
        "type": "typing",
        "text": "「彼女は厨房に行く」は「Elle ___ à la cuisine.」です。動詞 aller の現在形活用を入力してください。\n(Complétez : Elle ___ à la cuisine. (aller))",
        "acceptedAnswers": ["va"],
        "explanation": "Elle に対する aller の現在形は va です。"
    },
    # #questions
    {
        "id": "q_career_1_2_questions_1",
        "tags": ["#questions", "#basic", "#A1"],
        "type": "typing",
        "text": "「君は準備ができている？」を est-ce que を使って尋ねると「Est-ce que tu ___ prêt ?」です。空欄にêtreの活用を入力してください。\n(Complétez : Est-ce que tu ___ prêt ?)",
        "acceptedAnswers": ["es"],
        "explanation": "Est-ce que の後ろは通常の主語＋動詞の語順になります。"
    },
    {
        "id": "q_career_1_2_questions_2",
        "tags": ["#questions", "#basic", "#A1"],
        "type": "typing",
        "text": "「何をしているのですか？」を倒置疑問文で表すと「Que ___-tu ?」です。空欄に faire の活用を入力してください。\n(Complétez : Que ___-tu ?)",
        "acceptedAnswers": ["fais"],
        "explanation": "動詞 faire と主語 tu をハイフンで繋ぎ倒置します。"
    },
    {
        "id": "q_career_1_2_questions_3",
        "tags": ["#questions", "#basic", "#A1"],
        "type": "typing",
        "text": "「これで完璧ですか？」は「Est-ce que c'est ___ ?」です。空欄に入る「完璧な」を意味するフランス語（男性単数）を入力してください。\n(Complétez : Est-ce que c'est ___ ? (perfect))",
        "acceptedAnswers": ["parfait"],
        "explanation": "parfait は「完璧な」を意味する形容詞です。"
    },
    # #question_words
    {
        "id": "q_career_1_2_question_words_1",
        "tags": ["#question_words", "#basic", "#A1"],
        "type": "typing",
        "text": "「私のナイフはどこですか？」は「___ est mon couteau ?」です。空欄に入る疑問詞を入力してください（アクサン記号を含めてください）。\n(Complétez : ___ est mon couteau ? (Where))",
        "acceptedAnswers": ["Où", "où"],
        "explanation": "場所を尋ねる疑問詞は Où (どこ) です。"
    },
    {
        "id": "q_career_1_2_question_words_2",
        "tags": ["#question_words", "#basic", "#A1"],
        "type": "typing",
        "text": "「なぜ止まっているのですか？」は「___ tu t'arrêtes ?」です。空欄に入る疑問詞を入力してください。\n(Complétez : ___ tu t'arrêtes ? (Why))",
        "acceptedAnswers": ["Pourquoi", "pourquoi"],
        "explanation": "理由を尋ねる疑問詞は Pourquoi (なぜ) です。"
    },
    {
        "id": "q_career_1_2_question_words_3",
        "tags": ["#question_words", "#basic", "#A1"],
        "type": "typing",
        "text": "「いつそれを買うのですか？」は「___ tu vas l'acheter ?」です。空欄に入る疑問詞を入力してください。\n(Complétez : ___ tu vas l'acheter ? (When))",
        "acceptedAnswers": ["Quand", "quand"],
        "explanation": "時間を尋ねる疑問詞は Quand (いつ) です。"
    },
    {
        "id": "q_career_1_2_question_words_4",
        "tags": ["#question_words", "#basic", "#A1"],
        "type": "typing",
        "text": "「それはいくらですか？」は「___ ça coûte ?」です。空欄に入る疑問詞を入力してください。\n(Complétez : ___ ça coûte ? (How much))",
        "acceptedAnswers": ["Combien", "combien"],
        "explanation": "金額や数量を尋ねる疑問詞は Combien です。"
    },
    {
        "id": "q_career_1_2_question_words_5",
        "tags": ["#question_words", "#basic", "#A1"],
        "type": "typing",
        "text": "「どうやってそれをするのですか？」は「___ tu fais ça ?」です。空欄に入る疑問詞を入力してください。\n(Complétez : ___ tu fais ça ? (How))",
        "acceptedAnswers": ["Comment", "comment"],
        "explanation": "手段や状態を尋ねる疑問詞は Comment (どのように) です。"
    },
    # #possessive_adjectives
    {
        "id": "q_career_1_2_possessive_adjectives_1",
        "tags": ["#possessive_adjectives", "#applied", "#A1"],
        "type": "typing",
        "text": "「私のペティナイフ（couteau / 男性単数）」は「___ couteau」です。空欄に入る所有形容詞を入力してください。\n(Complétez : ___ couteau (my knife))",
        "acceptedAnswers": ["mon"],
        "explanation": "couteau は男性単数名詞なので、「私の」は mon になります。"
    },
    {
        "id": "q_career_1_2_possessive_adjectives_2",
        "tags": ["#possessive_adjectives", "#applied", "#A1"],
        "type": "typing",
        "text": "「私のスパチュラ（spatule / 女性単数）」は「___ spatule」です。空欄に入る所有形容詞を入力してください。\n(Complétez : ___ spatule (my spatula))",
        "acceptedAnswers": ["ma"],
        "explanation": "spatule は女性単数名詞なので、「私の」は ma になります。"
    },
    {
        "id": "q_career_1_2_possessive_adjectives_3",
        "tags": ["#possessive_adjectives", "#applied", "#A1"],
        "type": "typing",
        "text": "「私のナイフ（複数形）」は「___ couteaux」です。空欄に入る所有形容詞を入力してください。\n(Complétez : ___ couteaux (my knives))",
        "acceptedAnswers": ["mes"],
        "explanation": "複数名詞の前では、性が男性でも女性でも「私の」は mes になります。"
    },
    {
        "id": "q_career_1_2_possessive_adjectives_4",
        "tags": ["#possessive_adjectives", "#applied", "#A1"],
        "type": "typing",
        "text": "「君のプリン（flan / 男性単数）」は「___ flan」です。空欄に入る所有形容詞を入力してください。\n(Complétez : ___ flan (your flan))",
        "acceptedAnswers": ["ton"],
        "explanation": "flan は男性単数名詞なので、「君の」は ton になります。"
    },
    # #demonstrative_adjectives
    {
        "id": "q_career_1_2_demonstrative_adjectives_1",
        "tags": ["#demonstrative_adjectives", "#applied", "#A1"],
        "type": "typing",
        "text": "「この引き出し（tiroir / 男性単数）」は「___ tiroir」です。空欄に入る指示形容詞を入力してください。\n(Complétez : ___ tiroir (this drawer))",
        "acceptedAnswers": ["ce"],
        "explanation": "男性単数名詞の前（子音始まり）では、指示形容詞は ce です。"
    },
    {
        "id": "q_career_1_2_demonstrative_adjectives_2",
        "tags": ["#demonstrative_adjectives", "#applied", "#A1"],
        "type": "typing",
        "text": "「このスパチュラ（spatule / 女性単数）」は「___ spatule」です。空欄に入る指示形容詞を入力してください。\n(Complétez : ___ spatule (this spatula))",
        "acceptedAnswers": ["cette"],
        "explanation": "女性単数名詞の前では、指示形容詞は cette です。"
    },
    {
        "id": "q_career_1_2_demonstrative_adjectives_3",
        "tags": ["#demonstrative_adjectives", "#applied", "#A1"],
        "type": "typing",
        "text": "「これらのナイフ（couteaux / 複数）」は「___ couteaux」です。空欄に入る指示形容詞を入力してください。\n(Complétez : ___ couteaux (these knives))",
        "acceptedAnswers": ["ces"],
        "explanation": "複数名詞の前では、指示形容詞は ces です。"
    },
    {
        "id": "q_career_1_2_demonstrative_adjectives_4",
        "tags": ["#demonstrative_adjectives", "#applied", "#A1"],
        "type": "typing",
        "text": "「このオーブン（four / 男性単数）」は「___ four」です。空欄に入る指示形容詞を入力してください。\n(Complétez : ___ four (this oven))",
        "acceptedAnswers": ["ce"],
        "explanation": "four は子音で始まる男性単数名詞なので ce になります。母音で始まる男性単数名詞の前では cet です。"
    },
    # #prepositions
    {
        "id": "q_career_1_2_prepositions_1",
        "tags": ["#prepositions", "#applied", "#A1"],
        "type": "typing",
        "text": "「冷蔵庫の中に」は「___ le frigo」です。空欄に入る前置詞を入力してください。\n(Complétez : ___ le frigo (in the fridge))",
        "acceptedAnswers": ["dans"],
        "explanation": "空間の中に、を表す前置詞は dans です。"
    },
    {
        "id": "q_career_1_2_prepositions_2",
        "tags": ["#prepositions", "#applied", "#A1"],
        "type": "typing",
        "text": "「テーブルの上に」は「___ la table」です。空欄に入る前置詞を入力してください。\n(Complétez : ___ la table (on the table))",
        "acceptedAnswers": ["sur"],
        "explanation": "何かの表面の上に接触して置かれている状態は前置詞 sur です。"
    },
    {
        "id": "q_career_1_2_prepositions_3",
        "tags": ["#prepositions", "#applied", "#A1"],
        "type": "typing",
        "text": "「引き出しの下に」は「___ le tiroir」です。空欄に入る前置詞を入力してください。\n(Complétez : ___ le tiroir (under the drawer))",
        "acceptedAnswers": ["sous"],
        "explanation": "〜の下に、を表す前置詞は sous です。"
    },
    # #adjective_agreement
    {
        "id": "q_career_1_3_adjective_agreement_1",
        "tags": ["#adjective_agreement", "#basic", "#A1"],
        "type": "typing",
        "text": "「大きくて赤いトマト（複数）」は「de grandes tomates ___」です。rouge を正しい形に一致させて入力してください。\n(Complétez : de grandes tomates ___ (rouge))",
        "acceptedAnswers": ["rouges"],
        "explanation": "tomates は女性複数名詞なので、形容詞 rouge に s をつけて rouges にします。"
    },
    {
        "id": "q_career_1_3_adjective_agreement_2",
        "tags": ["#adjective_agreement", "#basic", "#A1"],
        "type": "typing",
        "text": "「冷たい水（eau / 女性単数）」は「de l'eau ___」です。froid を正しい形に一致させて入力してください。\n(Complétez : de l'eau ___ (froid))",
        "acceptedAnswers": ["froide"],
        "explanation": "eau は女性単数名詞なので、形容詞 froid に e をつけて froide にします。"
    },
    # #adjective_position
    {
        "id": "q_career_1_3_adjective_position_1",
        "tags": ["#adjective_position", "#basic", "#A1"],
        "type": "choice",
        "text": "フランス語で「赤いトマト」と言う場合、形容詞 rouge は名詞 tomates の前・後ろのどちらに置きますか？\n(Où place-t-on l'adjectif de couleur 'rouge' ?)",
        "options": ["名詞の後ろ (tomates rouges)", "名詞の前 (rouges tomates)"],
        "answerIndex": 0,
        "explanation": "色を表す形容詞は、フランス語では名詞の後ろに置くのがルールです。"
    },
    {
        "id": "q_career_1_3_adjective_position_2",
        "tags": ["#adjective_position", "#basic", "#A1"],
        "type": "choice",
        "text": "フランス語で「大きいトマト」と言う場合、形容詞 grand / grande は名詞 tomates の前・後ろのどちらに置きますか？\n(Où place-t-on l'adjectif 'grand/grande' ?)",
        "options": ["名詞の前 (grandes tomates)", "名詞の後ろ (tomates grandes)"],
        "answerIndex": 0,
        "explanation": "grand/petit, bon/mauvais などの頻出かつ短い形容詞は名詞の前に置かれます。"
    },
    # #interrogative_adjectives
    {
        "id": "q_career_1_3_interrogative_adjectives_1",
        "tags": ["#interrogative_adjectives", "#applied", "#A1"],
        "type": "typing",
        "text": "「どの小麦粉（farine / 女性単数）を使いますか？」は「___ farine utilise-t-on ?」です。空欄に疑問形容詞を入力してください。\n(Complétez : ___ farine utilise-t-on ?)",
        "acceptedAnswers": ["Quelle", "quelle"],
        "explanation": "farine は女性単数名詞なので、女性単数形の Quelle を使用します。"
    },
    {
        "id": "q_career_1_3_interrogative_adjectives_2",
        "tags": ["#interrogative_adjectives", "#applied", "#A1"],
        "type": "typing",
        "text": "「どの塩（sel / 男性単数）を使いますか？」は「___ sel utilises-tu ?」です。空欄に疑問形容詞を入力してください。\n(Complétez : ___ sel utilises-tu ?)",
        "acceptedAnswers": ["Quel", "quel"],
        "explanation": "sel は男性単数名詞なので、男性単数形の Quel を使用します。"
    },
    # #partitive_articles
    {
        "id": "q_career_1_3_partitive_articles_1",
        "tags": ["#partitive_articles", "#applied", "#A1"],
        "type": "typing",
        "text": "「水（eau / 女性単数・母音始まり）」に部分冠詞をつけると「___ eau」になります。空欄の冠詞を入力してください（エリジオンに注意してください）。\n(Complétez : ___ eau)",
        "acceptedAnswers": ["de l'"],
        "explanation": "母音・無声の h で始まる数えられない名詞には、部分冠詞 de l' を使用します。"
    },
    {
        "id": "q_career_1_3_partitive_articles_2",
        "tags": ["#partitive_articles", "#applied", "#A1"],
        "type": "typing",
        "text": "「バター（beurre / 男性単数）」に部分冠詞をつけると「___ beurre」になります。空欄の冠詞を入力してください。\n(Complétez : ___ beurre)",
        "acceptedAnswers": ["du"],
        "explanation": "男性単数の数えられない名詞には、部分冠詞 du を使用します。"
    },
    {
        "id": "q_career_1_3_partitive_articles_3",
        "tags": ["#partitive_articles", "#applied", "#A1"],
        "type": "typing",
        "text": "「塩（sel / 男性単数）」に部分冠詞をつけると「___ sel」になります。空欄の冠詞を入力してください。\n(Complétez : ___ sel)",
        "acceptedAnswers": ["du"],
        "explanation": "男性単数の数えられない名詞なので、部分冠詞 du を使用します。"
    },
    {
        "id": "q_career_1_3_partitive_articles_4",
        "tags": ["#partitive_articles", "#applied", "#A1"],
        "type": "typing",
        "text": "「小麦粉（farine / 女性単数）」に部分冠詞をつけると「___ farine」になります。空欄の冠詞を入力してください。\n(Complétez : ___ farine)",
        "acceptedAnswers": ["de la"],
        "explanation": "女性単数の数えられない名詞なので、部分冠詞 de la を使用します。"
    }
]

def update_questions_db():
    print(f"Updating questions database: {questions_path}...")
    with open(questions_path, 'r', encoding='utf-8') as f:
        db = json.load(f)
    
    # Check duplicates and append
    existing_ids = {q["id"] for q in db}
    appended_count = 0
    for nq in new_questions:
        if nq["id"] not in existing_ids:
            db.append(nq)
            appended_count += 1
            
    with open(questions_path, 'w', encoding='utf-8') as f:
        json.dump(db, f, ensure_ascii=False, indent=2)
    print(f"Appended {appended_count} new questions to database. Total is now {len(db)}.")

def update_grammar_reference():
    print(f"Checking grammar reference database: {grammar_ref_path}...")
    with open(grammar_ref_path, 'r', encoding='utf-8') as f:
        refs = json.load(f)
        
    ref_questions_entry = {
        "id": "ref_questions",
        "title_fr": "La Formation des Questions et les Mots Interrogatifs",
        "title_en": "Question Formation and Question Words",
        "title_ja": "疑問文の形成と疑問詞",
        "definition_fr": "Les différentes manières de poser une question et l'utilisation des pronoms, adjectifs et adverbes interrogatifs en cuisine.",
        "definition_ja": "フランス語での疑問文の作り方（イントネーション、Est-ce que、倒置）および厨房で頻出する疑問詞（où, quand, pourquoi, comment, combien）と疑問形容詞（quel）の整理です。",
        "sections": [
            {
                "type": "table",
                "title": "1. 疑問文の3つの作り方 (Trois façons de poser une question)",
                "headers": ["形式", "作り方と特徴", "例文", "和訳"],
                "rows": [
                    [
                        "イントネーション (Intonation)",
                        "肯定文のままで語尾だけを上げる。最もカジュアルで、口頭の会話で多用されます。",
                        "Tu vas le couper ?",
                        "君、それ切るの？"
                    ],
                    [
                        "Est-ce que をつける",
                        "文頭に Est-ce que を置くだけ。最も標準的で、丁寧さと使いやすさのバランスが取れています。",
                        "Est-ce que tu vas le couper ?",
                        "君はそれを切るのですか？"
                    ],
                    [
                        "主語と動詞の倒置 (Inversion)",
                        "動詞と主語代名詞を入れ替えてハイフンで繋ぐ。最も丁寧でフォーマルな表現です。",
                        "Vas-tu le couper ?",
                        "君はそれを切るつもりですか？"
                    ]
                ]
            },
            {
                "type": "table",
                "title": "2. 厨房で頻出する疑問詞 (Mots interrogatifs en cuisine)",
                "headers": ["疑問詞", "意味", "例文", "和訳"],
                "rows": [
                    ["Où", "どこ (場所)", "Où est mon couteau ?", "私のナイフはどこ？"],
                    ["Pourquoi", "なぜ (理由)", "Pourquoi tu t'arrêtes ?", "なぜ止まっているの？"],
                    ["Quand", "いつ (時間)", "Quand tu vas l'acheter ?", "いつそれを買うの？"],
                    ["Comment", "どのように (手段・状態)", "Comment tu fais ça ?", "どうやってそれをするの？"],
                    ["Combien (de)", "どのくらい / いくら (数量・金額)", "Combien ça coûte ?", "いくらですか？"]
                ]
            },
            {
                "type": "table",
                "title": "3. 疑問形容詞 quel の性数変化 (L'adjectif interrogatif 'quel')",
                "headers": ["性・数", "疑問形容詞", "修飾名詞の例", "例文と和訳"],
                "rows": [
                    ["男性・単数", "quel (ケル)", "sel (塩 / 男性)", "Quel sel tu utilises ? (どの塩を使う？)"],
                    ["女性・単数", "quelle (ケル)", "farine (小麦粉 / 女性)", "Quelle farine on utilise ? (どの小麦粉を使う？)"],
                    ["男性・複数", "quels (ケル)", "légumes (野菜 / 男性複)", "Quels légumes tu coupes ? (どの野菜を切る？)"],
                    ["女性・複数", "quelles (ケル)", "casseroles (鍋 / 女性複)", "Quelles casseroles sont prêtes ? (どの鍋が準備できていますか？)"]
                ]
            }
        ]
    }
    
    # Check if ref_questions already exists
    exists = False
    for r in refs:
        if r["id"] == "ref_questions":
            exists = True
            break
            
    if not exists:
        refs.append(ref_questions_entry)
        with open(grammar_ref_path, 'w', encoding='utf-8') as f:
            json.dump(refs, f, ensure_ascii=False, indent=2)
        print("Appended ref_questions topic to grammar_reference.json.")
    else:
        print("ref_questions topic already exists in grammar_reference.json.")

if __name__ == "__main__":
    update_questions_db()
    update_grammar_reference()
