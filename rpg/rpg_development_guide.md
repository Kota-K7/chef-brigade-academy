# RPG 開発ガイド - 問題タグ紐付け ＆ 出題テンプレート

このガイドは、RPGモード（歴史体験 / 修行ストーリー）の問題集データベース `questions_db.json` に問題を追加・編集するための開発用リファレンスです。

---

## 1. タグ ➔ 章 ➔ 文法・リファレンス 紐付け一覧

| タグ | 対応章 (History) | 対応話 (Story) | 学習文法・内容 | 紐づく参考資料 (Reference ID) |
| :--- | :--- | :--- | :--- | :--- |
| **`#greetings`** | 第0章 | 第0-1話 | 基本挨拶、会話、コミュニケーション | (基本表現) |
| **`#pronunciation`** | 第0章 | - | アルファベット、母音・子音の発音 | - |
| **`#noun_gender`** | 第0章 | 第0-1話 | 名詞の性（男性・女性名詞）、名詞の語順 | `ref_gender_nouns` |
| **`#articles`** | 第0章 | 第0-1話 | 不定冠詞（un, une, des）および定冠詞（le, la, les） | `ref_articles` |
| **`#etre`** | 第0章 | 第0-1話 | 存在動詞 `être` の直説法現在活用 | `ref_essential_irregular_verbs` |
| **`#avoir`** | 第0章 | 第0-1話 | 所有動詞 `avoir` の直説法現在活用 | `ref_essential_irregular_verbs` |
| **`#demonstrative_cest`** | 第0章 | - | 提示表現 `c'est` / `ce sont` | `ref_demonstrative_cest` |
| **`#subjects`** | 第0章 | 第0-1話 | 主語人称代名詞（je, tu, il, elle...） | `ref_pronouns` |
| **`#basic_adjectives`**| 第0章 | 第0-1話 | 基礎的な形容詞の語順と意味 | `ref_adjectives` |
| **`#negation`** | 第0章 | 第0-1話 | 否定文 (`ne ... pas`)、否定の `de` | `ref_negation` |
| **`#numbers`** | 第0章 | 第0-2話 | 数字 (1〜20、および大きな数字) | `ref_time_expressions` |
| **`#plurals`** | 第0章 | 第0-2話 | 名詞・形容詞の複数形、複数定冠詞 | `ref_plurals` |
| **`#units`** | 第0章 | 第0-2話 | 計量単位、部分冠詞的な `kilo(s) de...` | `ref_cuisine_vocabulary` |
| **`#nationality`** | 第0章 | - | 国籍の形容詞表現、主頭大文字ルール | `ref_adjectives` |
| **`#regional_culture`**| 第0章 | - | 各地方の郷土料理・歴史文化 | (歴史解説) |
| **`#verbs`**| - | 第1-1話 | 動詞の3つのグループ（第1、第2、第3群） | `ref_verb_groups` |
| **`#transitive_intransitive`**| - | 第1-1話 | 自動詞・他動詞の区別 | - |
| **`#indicative_present`**| - | 第1-1話 | 直説法現在の規則活用と概念 | `ref_verb_groups` |
| **`#verbs`**| - | 第1-1話 | 動詞活用の規則変化パターン | `ref_verb_groups` |
| **`#irregular_verbs_major`**| - | 第1-1話 | être / avoir 以外の主要不規則動詞 | `ref_essential_irregular_verbs` |
| **`#verbs`**| 第1章 | 第1-1話 | 第一群(-er)・第二群(-ir)規則動詞の活用 | `ref_verb_groups` |
| **`#questions`** | 第1章 | 第1-2話 | 疑問文の形成（イントネーション、est-ce que, 倒置）| `ref_questions` |
| **`#question_words`** | 第1章 | 第1-2話 | 疑問詞（où, quand, pourquoi, comment...） | `ref_questions` |
| **`#possessive_adjectives`**| - | 第1-2話 | 所有形容詞（mon, ma, mes, ton, ta, tes...） | `ref_adjectives` |
| **`#demonstrative_adjectives`**| - | 第1-2話 | 指示形容詞（ce, cet, cette, ces） | `ref_adjectives` |
| **`#prepositions`** | 第1章 | - | 場所・方向の前置詞（à, de, dans, sur, sous...）| `ref_prepositions` |
| **`#basic_adjectives`**| - | 第1-3話 | 形容詞の性数一致規則 | `ref_adjectives` |
| **`#basic_adjectives`** | - | 第1-3話 | 形容詞の配置ルール（名詞の前か後ろか） | `ref_adjectives` |
| **`#interrogative_adjectives`**| -| 第1-3話 | 疑問形容詞（quel, quelle, quels, quelles） | `ref_questions` |
| **`#partitive_articles`**| - | 第1-3話 | 部分冠詞（du, de la, de l'）の用法 | `ref_articles` |
| **`#contracted_articles`**| - | 第2-1話 | 前置詞 à/de と定冠詞の縮約（au, aux, du, des）| `ref_articles` |
| **`#near_future`** | 第2章 | 第2-3話 | 近接未来（`aller` + 不定詞） | `ref_time_expressions` |
| **`#near_past`** | - | 第2-3話 | 近接過去（`venir` + `de` + 不定詞） | `ref_time_expressions` |
| **`#imperative`** | 第2章 | 第2-2話 | 命令形（Tutoie/Vouvoie、規則変化） | `ref_imperative` |
| **`#object_pronouns_basic`**| 第2章 | - | 目的語代名詞の基本（直接・間接） | `ref_pronouns` |
| **`#irregular_verbs_1`** | 第2章 | - | 重要動詞 `faire` `prendre` `mettre` `venir` 活用 | `ref_essential_irregular_verbs` |
| **`#passive_pronominal_verbs`**| -| 第2-3話 | 受動的な代名動詞（se ...）の用法 | `ref_pronominal_verbs` |
| **`#imperative_with_pronouns`**| -| 第3-1話 | 命令法と目的語代名詞の結合規則 | `ref_imperative` |
| **`#object_pronouns_direct_indirect`**| -| 第3-1話 | 直接・間接目的語代名詞の語順 | `ref_pronouns` |
| **`#past_compose`** | 第3章 | - | 複合過去（passé composé）の基本構造 | `ref_time_expressions` |
| **`#auxiliary_selection`**| 第3章 | - | 助動詞 `avoir` / `être` の使い分け基準 | `ref_time_expressions` |
| **`#past_participle_agreement`**| 第3章| - | 過去分詞の性数一致（être助動詞および直接目的語先行）| `ref_time_expressions` |
| **`#comparative`** | 第3章 | - | 比較級（plus, moins, aussi ... que） | `ref_comparatives` |
| **`#superlative`** | 第3章 | - | 最上級（le plus, le moins ...） | `ref_comparatives` |
| **`#imparfait`** | 第4章 | - | 半過去（imparfait）の活用と概念 | `ref_time_expressions` |
| **`#imparfait_vs_past_compose`**| 第4章 | - | 半過去と複合過去の使い分け | `ref_time_expressions` |
| **`#relative_pronouns_basic`**| 第4章 | 第3-3話 | 関係代名詞 `qui` / `que` の基本 | `ref_relative_pronouns` |
| **`#conjunctions_basic`**| 第4章 | - | 接続詞（parce que, mais, donc） | `ref_conjunctions` |
| **`#gerund_participle`** | - | 第4-2話 | 現在分詞、ジェロンディフ、過去分詞 | - |
| **`#conditional_present`**| 第5章 | - | 条件法現在（活用と丁寧な用法） | `ref_conditional` |
| **`#polite_expressions`**| 第5章 | - | 条件法を用いた丁寧表現（Je voudrais... / On pourrait...）| `ref_conditional` |
| **`#si_clauses_present`**| 第5章 | - | 現実的・可能性のある仮定（Si + 現在形, 現在/未来形）| `ref_conditional` |
| **`#pronouns_y_en`** | 第5章 | - | 中性代名詞 `y` および `en` の使い分け | `ref_pronouns` |
| **`#subjunctive_basic`**| 第6章 | - | 接続法現在（活用と基本的な用法） | `ref_subjunctive` |
| **`#emotions`** | 第6章 | - | 感情を表す形容詞・動詞と接続法の結合 | `ref_subjunctive` |
| **`#obligation_il_faut_que`**| 第6章| - | 必要・義務の表現（`il faut que` + 接続法） | `ref_subjunctive` |
| **`#conjunctions_advanced`**| 第7章 | - | 接続詞の応用（譲歩、目的、時間） | `ref_conjunctions` |
| **`#logical_connectives`**| 第7章 | - | 論理的接続語（cependant, pourtant, en revanche...）| `ref_conjunctions` |
| **`#passive_voice`** | 第8章 | - | 被動態（受動態）の文法と時制 | `ref_passive` |
| **`#pronominal_verbs`** | 第8章 | - | 代名動詞（再帰、相互、受動、本質的） | `ref_pronominal_verbs` |
| **`#causative_faire`** | 第8章 | - | 使役表現（`faire` + 不定詞） | `ref_causative` |
| **`#pluperfect`** | 第9章 | - | 大過去（plus-que-parfait）の活用 | `ref_time_expressions` |
| **`#conditional_past`** | 第9章 | - | 条件法過去（過去の事実と異なる仮定） | `ref_conditional` |
| **`#hypothetical_si_clauses`**| 第9章 | - | 事実と異なる過去の仮定（Si + 大過去, 条件法過去）| `ref_conditional` |
| **`#grammar_review`** | 第10章 | - | 文法総復習（時制、接続法、関係代名詞の総合） | - |
| **`#nuance_expressions`**| 第11章 | - | 同義語の使い分け、ニュアンスの表現 | - |
| **`#synonyms`** | 第11章 | - | 類義語と文脈に応じた単語選択 | - |
| **`#polite_criticism`**| 第11章 | - | レシピや料理に対する丁寧な評価・批判表現 | - |
| **`#newspaper_style`** | 第12-13章| - | 報道体、論文で使われる書き言葉表現 | - |
| **`#abstract_vocabulary`**| 第12-13章| - | 料理のコンセプトや美学を語る抽象語彙 | - |
| **`#metaphorical_expressions`**| 第12-13章| -| 料理の風味やテクスチャを伝える比喩表現 | - |
| **`#cultural_expressions`**| 第14-15章| - | フランスの食文化、料理の歴史的言及表現 | - |
| **`#debate_expressions`**| 第14-15章| - | 討論、意見主張、反論、説得の表現 | - |
| **`#presentation_style`**| 第14-15章| - | 料理のプレゼン、コンセプト解説表現 | - |
| **`#culinary_philosophy`**| 第14-15章| - | 自身の料理哲学、味覚の探求に関する高度表現 | - |

---

## 2. クイズデータ構造テンプレート (JSON書式)

`rpg/questions_db.json` に問題を追加する際は、以下の5つのいずれかのフォーマットに従って記述してください。

### ① 4択問題 (choice)
```json
{
  "id": "q_unique_choice_id",
  "tags": ["#tag_name"],
  "type": "choice",
  "text": "フランス語の質問テキストをここに記述します。\\n(日本語の翻訳や補足を記述します。)",
  "options": [
    "選択肢 A (正解)",
    "選択肢 B",
    "選択肢 C",
    "選択肢 D"
  ],
  "answerIndex": 0,
  "explanation": "解説テキスト。正解の理由や文法事項のポイントを説明します。"
}
```

### ② スペル入力 / 打ち込み (typing)
```json
{
  "id": "q_unique_typing_id",
  "tags": ["#tag_name"],
  "type": "typing",
  "text": "「私は包丁を持っています」にあたるフランス語を入力してください。",
  "options": ["J'ai un couteau.", "J'ai un casserole.", "Je suis un couteau.", "J'ai le couteau."],
  "answerIndex": 0,
  "acceptedAnswers": [
    "J'ai un couteau.",
    "j'ai un couteau",
    "J'ai un couteau"
  ],
  "explanation": "主語が Je (j') のとき、avoir の活用は ai となります。"
}
```

### ③ 並び替え (scramble)
```json
{
  "id": "q_unique_scramble_id",
  "tags": ["#tag_name"],
  "type": "scramble",
  "text": "「私は新人です」となるようにフランス語を並び替えてください。",
  "words": ["nouveau.", "Je", "suis"],
  "answer": "Je suis nouveau.",
  "acceptedAnswers": ["Je suis nouveau.", "je suis nouveau"],
  "explanation": "Je（主語） + suis（動詞 être の現在形） + nouveau（形容詞：新人）の順になります。"
}
```

### ④ 穴埋め (cloze)
```json
{
  "id": "q_unique_cloze_id",
  "tags": ["#tag_name"],
  "type": "cloze",
  "text": "空欄に入る正しい動詞を入力または選択してください。\\n私たちは包丁を持っています。: Nous [avons] des couteaux.",
  "clozeText": "Nous [avons] des couteaux.",
  "options": ["avons", "avez", "ont", "sommes"],
  "answerIndex": 0,
  "acceptedAnswers": ["avons"],
  "explanation": "主語が Nous のとき、動詞 avoir の活用は avons になります。"
}
```

### ⑤ マッチング / ペア結び (matching)
```json
{
  "id": "q_unique_matching_id",
  "tags": ["#tag_name"],
  "type": "matching",
  "text": "フランス語と正しい日本語訳のペアを結びつけてください。",
  "pairs": [
    {"left": "Bonjour", "right": "こんにちは"},
    {"left": "Merci", "right": "ありがとう"},
    {"left": "S'il vous plaît", "right": "お願いします"}
  ],
  "explanation": "基本的な日常会話の挨拶表現と日本語訳の対応ペアです。"
}
```
