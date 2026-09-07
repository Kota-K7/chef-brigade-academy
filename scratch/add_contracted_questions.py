import json

with open('rpg/questions_db.json', 'r', encoding='utf-8') as f:
    db = json.load(f)

new_questions = [
    {
        "id": "q_contracted_articles_history_1",
        "tags": ["#contracted_articles", "#history", "#A1", "#A2"],
        "type": "typing",
        "text": "「王は教皇の命令に反対した」は「Le roi s'est opposé ___ ordres du pape.」です。前置詞 à と定冠詞 les の縮約形を入力してください。\n(Complétez : Le roi s'est opposé ___ ordres du pape. (à + les))",
        "acceptedAnswers": ["aux"],
        "explanation": "à + les (複数名詞の前) は aux に縮約されます。"
    },
    {
        "id": "q_contracted_articles_history_2",
        "tags": ["#contracted_articles", "#history", "#A1", "#A2"],
        "type": "typing",
        "text": "「彼は教皇の権威に従う」は「Il obéit ___ autorité du pape.」です。autorité は母音で始まる女性名詞なので、à と定冠詞はどのように置かれますか？\n(Complétez : Il obéit ___ autorité du pape. (à + l'))",
        "acceptedAnswers": ["à l'", "à l’"],
        "explanation": "母音で始まる単数名詞の前では縮約せず、à l' となります。"
    },
    {
        "id": "q_contracted_articles_history_3",
        "tags": ["#contracted_articles", "#history", "#A1", "#A2"],
        "type": "typing",
        "text": "「騎士たちは城の門へ進む」は「Les chevaliers avancent ___ portes du château.」です。前置詞 à と定冠詞 les の縮約形を入力してください。\n(Complétez : Les chevaliers avancent ___ portes du château. (à + les))",
        "acceptedAnswers": ["aux"],
        "explanation": "à + les は aux に縮約されます。"
    },
    {
        "id": "q_contracted_articles_history_4",
        "tags": ["#contracted_articles", "#history", "#A1", "#A2"],
        "type": "typing",
        "text": "「教皇の命令」は「les ordres ___ pape」です。pape（教皇）は男性名詞なので、de と定冠詞 le の縮約形を入力してください。\n(Complétez : les ordres ___ pape (de + le))",
        "acceptedAnswers": ["du"],
        "explanation": "de + le (男性単数) は du に縮約されます。"
    },
    {
        "id": "q_contracted_articles_history_5",
        "tags": ["#contracted_articles", "#history", "#A1", "#A2"],
        "type": "typing",
        "text": "「都市の破壊」は「la destruction ___ villes」です。villes（都市）は複数名詞なので、de と定冠詞 les の縮約形を入力してください。\n(Complétez : la destruction ___ villes (de + les))",
        "acceptedAnswers": ["des"],
        "explanation": "de + les (複数名詞の前) は des に縮約されます。"
    },
    {
        "id": "q_contracted_articles_history_6",
        "tags": ["#contracted_articles", "#history", "#A1", "#A2"],
        "type": "typing",
        "text": "「彼は教会に行く」は「Il va ___ église.」です。église は母音で始まる女性名詞なので、à と定冠詞はどのように置かれますか？\n(Complétez : Il va ___ église. (à + l'))",
        "acceptedAnswers": ["à l'", "à l’"],
        "explanation": "母音で始まる名詞の前ではエリジオンが起き、à l' となります。"
    },
    {
        "id": "q_contracted_articles_history_7",
        "tags": ["#contracted_articles", "#history", "#A1", "#A2"],
        "type": "typing",
        "text": "「王国の歴史」は「l'histoire ___ royaume」です。royaume（王国）は男性名詞なので、de と定冠詞 le の縮約形を入力してください。\n(Complétez : l'histoire ___ royaume (de + le))",
        "acceptedAnswers": ["du"],
        "explanation": "de + le は du に縮約されます。"
    },
    {
        "id": "q_contracted_articles_history_8",
        "tags": ["#contracted_articles", "#history", "#A1", "#A2"],
        "type": "typing",
        "text": "「彼は大聖堂の前にいる」は「Il est devant la porte ___ cathédrale.」です。cathédrale（大聖堂）は子音で始まる女性単数名詞なので、de と定冠詞はどのように置かれますか？\n(Complétez : devant la porte ___ cathédrale (de + la))",
        "acceptedAnswers": ["de la"],
        "explanation": "女性単数名詞の前では de la となり、縮約は起こりません。"
    },
    {
        "id": "q_contracted_articles_history_9",
        "tags": ["#contracted_articles", "#history", "#A1", "#A2"],
        "type": "typing",
        "text": "「十字軍の兵士たち」は「les soldats ___ croisades」です。croisades（十字軍）は複数名詞なので、de と定冠詞 les の縮約形を入力してください。\n(Complétez : les soldats ___ croisades (de + les))",
        "acceptedAnswers": ["des"],
        "explanation": "de + les は des に縮約されます。"
    },
    {
        "id": "q_contracted_articles_history_10",
        "tags": ["#contracted_articles", "#history", "#A1", "#A2"],
        "type": "typing",
        "text": "「王は宮殿に到着した」は「Le roi est arrivé ___ palais.」です。palais（宮殿）は男性単数名詞なので、à と定冠詞 le の縮約形を入力してください。\n(Complétez : Le roi est arrivé ___ palais. (à + le))",
        "acceptedAnswers": ["au"],
        "explanation": "à + le は au に縮約されます。"
    }
]

existing_ids = {q['id'] for q in db}
added = 0
for q in new_questions:
    if q['id'] not in existing_ids:
        db.append(q)
        added += 1

with open('rpg/questions_db.json', 'w', encoding='utf-8') as f:
    json.dump(db, f, ensure_ascii=False, indent=2)

print(f'Added {added} new contracted articles questions. Total questions in DB: {len(db)}')
