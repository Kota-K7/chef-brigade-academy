# 📊 事前解説・文法リファレンス 整合性整合レポート

各チャプターの「事前解説スライドの指定（JSON）」と「文法リファレンスの実際の内容（grammar_reference.json）」の紐付けを抽出し、整合性をチェックした結果です。

## ⚠️ 検出された不整合・警告一覧

- chapter_0.json - 第1話: 目覚めと試練: ページ「存在動詞 être 活用」に 'être' が指定されていますが、実際の内容は「4. Prendre (取る・食べる・飲む・注文を取る)」です。
- chapter_1.json - 第1-7話: 決戦前夜！アレシア包囲戦（前編） 〜二重の防壁ライン〜: ページ「名詞・形容詞の複数形」に '複数形' が指定されていますが、実際の内容は「性の影響：冠詞と形容詞の一致」です。
- chapter_2.json - 第2-1話: 時代はゲルマンへ！ 運命の交差: ページ「存在動詞 être 活用」に 'être' が指定されていますが、実際の内容は「4. Prendre (取る・食べる・飲む・注文を取る)」です。
- chapter_2.json - 第2-9話: カール大帝の死と帝国の分裂: ページ「近接過去 (venir de + 原形)」に 'aller/venir' が指定されていますが、実際の内容は「2. 近接過去 (Le Passé Récent) : 〜したばかりだ」です。
- chapter_career_0.json - 第0-2話：最初の注文 (La Première Commande): ページ「複数名詞と冠詞」に '複数形' が指定されていますが、実際の内容は「3. 十の位 (20〜60) と一の位の組み合わせ, 4. 特殊な70〜99の構造 (60+10, 4x20, 4x20+10)」です。
- chapter_career_1.json - 第1-1話：料理人の言葉の型: ページ「【復習】être / avoir の現在形活用」に 'être' が指定されていますが、実際の内容は「4. Prendre (取る・食べる・飲む・注文を取る), 調理現場での使い方のポイント」です。
- chapter_career_2.json - 第2-1話：食材と料理の架け橋: ページ「【復習】être と avoir の直説法現在活用」に 'être' が指定されていますが、実際の内容は「4. Prendre (取る・食べる・飲む・注文を取る), 調理現場での使い方のポイント」です。
- chapter_career_4.json - 第4-3話：絶対の基準と使役動詞: ページ「感情を表す接続法」のインデックス 2 が範囲外です。

## 📋 事前解説マッピング一覧表

| ファイル / エピソード | 事前解説タイトル | スライドの指定タイトル | 参照Topic ID | 参照S-Idx | 実際の内容セクションタイトル | 直後の戦闘指定タグ | 状態 |
|---|---|---|---|---|---|---|---|
| chapter_0.json<br>第1話: 目覚めと試練 | 歴史ストーリー学習の進め方 | 直接記述 (ページなし) | `N/A` | `N/A` | 直接テキスト記述あり | なし | **OK** |
| chapter_0.json<br>第1話: 目覚めと試練 | 事前解説 | 基本の挨拶 | `ref_greetings` | `[0]` | 1. 基本の挨拶 (Salutations quotidiennes) | `#regional_culture`(5), `#etre`(2) | **OK** |
|  |  | 存在動詞 être 活用 | `ref_essential_irregular_verbs` | `[3]` | 4. Prendre (取る・食べる・飲む・注文を取る) |  | **WARNING (être mismatch)** |
| chapter_0.json<br>第2話: 憧れの市場 | 事前解説 | フランス語の数字表現 | `ref_numbers` | `[0]` | 1. 0〜16 (完全暗記ゾーン) | `#vegetables`(5), `#numbers`(2) | **OK** |
| chapter_0.json<br>第2話: 憧れの市場 | 事前解説 | 食材の数量と単位 | `ref_numbers` | `[1]` | 2. 17〜19 (10 + 7〜9) | `#ingredients`(3), `#units`(4) | **OK** |
| chapter_0.json<br>第3話: 銀のペンダント | 事前解説 | 基本の挨拶と自己紹介 | `ref_greetings` | `[0]` | 1. 基本の挨拶 (Salutations quotidiennes) | `#greetings`(5), `#subjects`(2) | **OK** |
|  |  | 主語人称代名詞 | `ref_subjects` | `[0]` | Les pronoms personnels sujets (主語人称代名詞) |  | **OK** |
| chapter_0.json<br>第3話: 銀のペンダント | 事前解説 | 国籍と挨拶の応用 | `ref_greetings` | `[1]` | 2. 自己紹介とやり取り (Se présenter et échanger) | `#regional_culture`(1), `#numbers`(1), `#units`(1), `#nationality`(1), `#greetings`(3) | **OK** |
| chapter_1.json<br>第1-1話: ハゲ頭の総司令官 | 事前解説 (Préparation) | 第一・第二群規則動詞の現在形 | `ref_verb_groups` | `[1, 2]` | Verbes culinaires essentiels (重要な調理動詞), À retenir (重要) | `#regular_verbs_1_2`(4), `#indicative_present`(3) | **OK** |
|  |  | 直説法現在 | `ref_present_indicative` | `[0]` | Verbes réguliers : Préparer (-er動詞の規則変化) |  | **OK** |
| chapter_1.json<br>第1-1話: ハゲ頭の総司令官 | 事前解説 (Préparation) | 動詞活用の規則変化パターン | `ref_conjugation_patterns` | `[0]` | 1. Être (être型) | `#verb_conjugation_patterns`(3), `#indicative_present`(4) | **OK** |
| chapter_1.json<br>第1-2話: カエサル夜の大特訓会 | 事前解説 (Préparation) | 動詞の3つのグループ | `ref_verb_groups` | `[0]` | Les trois groupes (3つのグループ) | `#three_verb_groups`(4), `#regular_verbs_1_2`(3) | **OK** |
| chapter_1.json<br>第1-2話: カエサル夜の大特訓会 | 事前解説 (Préparation) | 主要不規則動詞の活用 | `ref_essential_irregular_verbs` | `[0, 1]` | 1. Faire (する・作る・調理する), 2. Aller (行く / 近接未来助動詞) | `#irregular_verbs_major`(3), `#three_verb_groups`(4) | **OK** |
| chapter_1.json<br>第1-3話: 倒れた通訳〜ガリア農村へ〜 | 事前解説 (Préparation) | 疑問文の3つの作り方 | `ref_questions` | `[0]` | 1. 疑問文の3つの作り方 (Trois façons de poser une question) | `#questions`(4), `#question_words`(3) | **OK** |
| chapter_1.json<br>第1-3話: 倒れた通訳〜ガリア農村へ〜 | 事前解説 (Préparation) | 厨房で頻出する疑問詞 | `ref_questions` | `[1]` | 2. 厨房で頻出する疑問詞 (Mots interrogatifs en cuisine) | `#questions`(3), `#question_words`(4) | **OK** |
| chapter_1.json<br>第1-4話: 英雄ウェルキンゲトリクスの登場と静かなる村 | 事前解説 (Préparation) | 場所を表す前置詞 (Prepositions de Lieu) | `ref_prepositions` | `[0]` | 1. 基本的な前置詞と用法 (Prépositions de base) | `#prepositions_place`(4), `#prepositions`(3) | **OK** |
| chapter_1.json<br>第1-4話: 英雄ウェルキンゲトリクスの登場と静かなる村 | 事前解説 (Préparation) | 前置詞による指示・質問 | `ref_prepositions` | `[0]` | 1. 基本的な前置詞と用法 (Prépositions de base) | `#prepositions_place`(4), `#questions`(3) | **OK** |
|  |  | 基本的な質問形式 | `ref_questions` | `[0]` | 1. 疑問文の3つの作り方 (Trois façons de poser une question) |  | **OK** |
| chapter_1.json<br>第1-5話: アウァーリクムの戦い 〜司令官 of 朝トレと兵糧攻め〜 | 事前解説 (Préparation) | 指示形容詞 (ce / cette / ces) | `ref_demonstrative_adjectives` | `[0]` | 指示形容詞 形態・使い分け一覧表 | `#demonstrative_adjectives`(4), `#possessive_adjectives`(3) | **OK** |
| chapter_1.json<br>第1-5話: アウァーリクムの戦い 〜司令官 of 朝トレと兵糧攻め〜 | 事前解説 (Préparation) | 所有形容詞 (mon / ton / son / notre...) | `ref_possessive_adjectives` | `[0]` | 所有形容詞 完全一覧表 | `#demonstrative_adjectives`(3), `#possessive_adjectives`(2), `#prepositions_place`(2) | **OK** |
| chapter_1.json<br>第1-6話: ゲルゴウィアの包囲戦 〜カエサル軍、痛恨の敗北〜 | 事前解説 (Préparation) | 重要不規則動詞 (aller / venir) | `ref_essential_irregular_verbs` | `[0, 1]` | 1. Faire (する・作る・調理する), 2. Aller (行く / 近接未来助動詞) | `#irregular_verbs_1`(4), `#transitive_intransitive`(3) | **OK** |
| chapter_1.json<br>第1-6話: ゲルゴウィアの包囲戦 〜カエサル軍、痛恨の敗北〜 | 事前解説 (Préparation) | 自動詞と他動詞の概念 | `ref_verb_groups` | `[0]` | Les trois groupes (3つのグループ) | `#transitive_intransitive`(3), `#irregular_verbs_1`(2), `#demonstrative_adjectives`(2) | **OK** |
| chapter_1.json<br>第1-7話: 決戦前夜！アレシア包囲戦（前編） 〜二重の防壁ライン〜 | 事前解説 | 名詞・形容詞の複数形 | `ref_noun_genders` | `[1]` | 性の影響：冠詞と形容詞の一致 | `#plurals`(4), `#units`(3) | **WARNING (plural mismatch)** |
| chapter_1.json<br>第1-7話: 決戦前夜！アレシア包囲戦（前編） 〜二重の防壁ライン〜 | 事前解説 | 否定文と否定のde | `ref_negation` | `[0]` | 1. 基本的な否定文の作り方 | `#negation_de`(3), `#plurals`(2), `#irregular_verbs_1`(2) | **OK** |
| chapter_1.json<br>第1-8話: アレシア包囲戦（中編） 〜英雄の無双と武人の誇り〜 | 事前解説 | 動詞と前置詞の結合 | `ref_prepositions` | `[0]` | 1. 基本的な前置詞と用法 (Prépositions de base) | `#verb_preposition_structures`(4), `#plurals`(3) | **OK** |
| chapter_1.json<br>第1-8話: アレシア包囲戦（中編） 〜英雄の無双と武人の誇り〜 | 事前解説 | 命令法（指示と号令） | `ref_imperative` | `[0]` | 1. 命令形の作り方 (Formation de l'impératif) | `#imperative_basic`(4), `#verb_preposition_structures`(3) | **OK** |
| chapter_1.json<br>第1-9話: アレシア包囲戦（後編）〜英雄と皇帝の決着〜 | 事前解説 | 命令文の動詞変化 | `ref_imperative` | `[0]` | 1. 命令形の作り方 (Formation de l'impératif) | `#verb_preposition_structures`(4), `#imperative_basic`(3) | **OK** |
| chapter_1.json<br>第1-9話: アレシア包囲戦（後編）〜英雄と皇帝の決着〜 | 事前解説 | 否定命令と代名詞 | `ref_imperative_with_pronouns` | `[0]` | 1. 肯定命令文での語順（動詞 - 代名詞） | `#verb_preposition_structures`(3), `#imperative_basic`(2), `#plurals`(2) | **OK** |
| chapter_1.json<br>第1-9話: アレシア包囲戦（後編）〜英雄と皇帝の決着〜 | 事前解説 | 第1章 文法総復習 | `ref_sentence_structure` | `[0]` | 1. フランス語の基本語順 (L'ordre des mots) | `#imperative_basic`(3), `#negation_de`(3), `#three_verb_groups`(3), `#regular_verbs_1_2`(3) | **OK** |
| chapter_1.json<br>第1-10話: 外伝 あるガリア人青年の記録 | 事前解説 | 動詞の現在形復習 | `ref_present_indicative` | `[0]` | Verbes réguliers : Préparer (-er動詞の規則変化) | `#regular_verbs_1_2`(4), `#questions`(3) | **OK** |
| chapter_1.json<br>第1-10話: 外伝 あるガリア人青年の記録 | 事前解説 | 疑問文と疑問詞の復習 | `ref_questions` | `[0]` | 1. 疑問文の3つの作り方 (Trois façons de poser une question) | `#regular_verbs_1_2`(4), `#irregular_verbs_major`(3) | **OK** |
| chapter_1.json<br>第1-10話: 外伝 あるガリア人青年の記録 | 事前解説 | 場所の前置詞と指示形容詞 | `ref_prepositions` | `[0]` | 1. 基本的な前置詞と用法 (Prépositions de base) | `#prepositions_place`(4), `#demonstrative_adjectives`(4), `#irregular_verbs_major`(4) | **OK** |
| chapter_1.json<br>第1-10話: 外伝 あるガリア人青年の記録 | 事前解説 | 第1章 総合テスト対策 | `ref_sentence_structure` | `[0]` | 1. フランス語の基本語順 (L'ordre des mots) | `#regular_verbs_1_2`(3), `#irregular_verbs_major`(3), `#imperative_basic`(3), `#negation_de`(3) | **OK** |
| chapter_2.json<br>第2-1話: 時代はゲルマンへ！ 運命の交差 | 事前解説 (Préparation) | 定冠詞と不定冠詞 | `ref_definite_indefinite_articles` | `[0]` | 定冠詞 (Les Articles Définis) | `#articles`(3), `#noun_gender`(2), `#etre`(2) | **OK** |
|  |  | 名詞の性（男性・女性名詞） | `ref_noun_genders` | `[0]` | 名詞の性（男性・女性）の基本概念 |  | **OK** |
| chapter_2.json<br>第2-1話: 時代はゲルマンへ！ 運命の交差 | 事前解説 (Préparation) | 存在動詞 être 活用 | `ref_essential_irregular_verbs` | `[3]` | 4. Prendre (取る・食べる・飲む・注文を取る) | `#noun_gender`(3), `#etre`(2), `#avoir`(2) | **WARNING (être mismatch)** |
| chapter_2.json<br>第2-1話: 時代はゲルマンへ！ 運命の交差 | 事前解説 (Préparation) | 所有動詞 avoir 活用 | `ref_essential_irregular_verbs` | `[4]` | 調理現場での使い方のポイント | `#etre`(3), `#noun_gender`(3), `#verbs`(3), `#articles`(3) | **OK** |
| chapter_2.json<br>第2-2話: 運命の出会い、水辺のハプニング | 事前解説 (Préparation) | 否定文の作り方 (ne ... pas) | `ref_negation` | `[0]` | 1. 基本的な否定文の作り方 | `#negation`(4), `#noun_gender`(3) | **OK** |
| chapter_2.json<br>第2-2話: 運命の出会い、水辺のハプニング | 事前解説 (Préparation) | 場所・方向の前置詞 | `ref_prepositions` | `[0]` | 1. 基本的な前置詞と用法 (Prépositions de base) | `#prepositions`(4), `#contracted_articles`(3) | **OK** |
| chapter_2.json<br>第2-2話: 運命の出会い、水辺のハプニング | 事前解説 (Préparation) | 前置詞と定冠詞の縮約 | `ref_contracted_articles` | `[0, 1]` | 1. 前置詞 à と定冠詞の縮約 (à + article), 2. 前置詞 de と定冠詞の縮約 (de + article) | `#contracted_articles`(3), `#negation`(3), `#noun_gender`(3), `#prepositions`(3) | **OK** |
| chapter_2.json<br>第2-7話: カール大帝、ローマ皇帝戴冠 | 事前解説 (Préparation) | 代名動詞の受動用法 | `ref_pronominal_verbs` | `[1]` | 2. 厨房で頻出する受動用法 | `#imperative`(4), `#near_past`(3) | **OK** |
| chapter_2.json<br>第2-7話: カール大帝、ローマ皇帝戴冠 | 事前解説 (Préparation) | 代名動詞の受動用法 | `ref_pronominal_verbs` | `[1]` | 2. 厨房で頻出する受動用法 | `#near_past`(4), `#imperative`(3) | **OK** |
| chapter_2.json<br>第2-7話: カール大帝、ローマ皇帝戴冠 | 事前解説 (Préparation) | 代名動詞の受動用法 | `ref_pronominal_verbs` | `[1]` | 2. 厨房で頻出する受動用法 | `#passive_pronominal_verbs`(4), `#near_future`(4), `#numbers`(4) | **OK** |
| chapter_2.json<br>第2-8話: カール大帝の帝国とルネサンス | 事前解説 (Préparation) | 部分冠詞の基本用法 | `ref_partitive_articles` | `[0]` | 部分冠詞の形態表 | `#greetings`(7) | **OK** |
| chapter_2.json<br>第2-8話: カール大帝の帝国とルネサンス | 事前解説 (Préparation) | 形容詞の位置と性数一致 | `ref_adjective_agreement` | `[0]` | 1. 基本ルール (例: petit = 小さい) | `#greetings`(7) | **OK** |
| chapter_2.json<br>第2-8話: カール大帝の帝国とルネサンス | 事前解説 (Préparation) | 前置詞と定冠詞の縮約 | `ref_contracted_articles` | `[0, 1]` | 1. 前置詞 à と定冠詞の縮約 (à + article), 2. 前置詞 de と定冠詞の縮約 (de + article) | `#greetings`(12) | **OK** |
| chapter_2.json<br>第2-9話: カール大帝の死と帝国の分裂 | 事前解説 (Préparation) | 命令法（指示と号令） | `ref_imperative` | `[0]` | 1. 命令形の作り方 (Formation de l'impératif) | `#near_future`(4), `#imperative`(3) | **OK** |
| chapter_2.json<br>第2-9話: カール大帝の死と帝国の分裂 | 事前解説 (Préparation) | 近接過去 (venir de + 原形) | `ref_near_future_past` | `[1]` | 2. 近接過去 (Le Passé Récent) : 〜したばかりだ | `#near_past`(4), `#verbs`(3) | **WARNING (aller/venir mismatch)** |
| chapter_2.json<br>第2-9話: カール大帝の死と帝国の分裂 | 事前解説 (Préparation) | 縮約冠詞と近接未来の総合 | `ref_contracted_articles` | `[0]` | 1. 前置詞 à と定冠詞の縮約 (à + article) | `#contracted_articles`(4), `#verbs`(4), `#near_future`(4) | **OK** |
| chapter_career_0.json<br>第0-1話：フランス料理店へようこそ | 今日の学習目標 | 直接記述 (ページなし) | `N/A` | `N/A` | 直接テキスト記述あり | なし | **OK** |
| chapter_career_0.json<br>第0-1話：フランス料理店へようこそ | 事前解説 (Préparation) | 基本語順と平叙文・否定文の作り方 | `ref_sentence_structure` | `[0, 1, 2]` | 1. フランス語の基本語順 (L'ordre des mots), 2. 否定文の作り方 (La négation simple), 3. 前置詞と冠詞の位置ルール | `#greetings`(3), `#subjects`(4) | **OK** |
|  |  | 基本の平叙文 (自己紹介・出身) | `custom` | `N/A` | カスタムデータテーブル |  | **OK** |
|  |  | 挨拶・基本コミュニケーション | `custom` | `N/A` | カスタムデータテーブル |  | **OK** |
|  |  | 主語人称代名詞 (Les pronoms sujets) | `ref_subjects` | `[0]` | Les pronoms personnels sujets (主語人称代名詞) |  | **OK** |
| chapter_career_0.json<br>第0-1話：フランス料理店へようこそ | 事前解説 (Préparation) | 動詞 être の現在形活用 | `custom` | `N/A` | カスタムデータテーブル | `#etre`(2), `#avoir`(3), `#subjects`(2) | **OK** |
|  |  | 動詞 avoir の現在形活用 | `custom` | `N/A` | カスタムデータテーブル |  | **OK** |
| chapter_career_0.json<br>第0-1話：フランス料理店へようこそ | 事前解説 (Préparation) | 否定文 (ne...pas) の構造 | `ref_negation` | `[0, 1]` | 1. 基本的な否定文の作り方, 否定の de のルール (La règle du 'de' de négation) | `#negation`(4), `#etre`(2), `#avoir`(2), `#greetings`(2), `#subjects`(2) | **OK** |
| chapter_career_0.json<br>第0-2話：最初の注文 (La Première Commande) | 今日の学習目標 | 直接記述 (ページなし) | `N/A` | `N/A` | 直接テキスト記述あり | なし | **OK** |
| chapter_career_0.json<br>第0-2話：最初の注文 (La Première Commande) | 事前解説 (Préparation) | 定冠詞と不定冠詞の使い分け | `ref_definite_indefinite_articles` | `[0, 2]` | 定冠詞 (Les Articles Définis), 不定冠詞 (Les Articles Indéfinis) | `#articles`(3), `#noun_genders`(2), `#numbers`(1), `#negation`(1) | **OK** |
|  |  | 数字と計量表現 | `ref_numbers` | `[0]` | 1. 0〜16 (完全暗記ゾーン) |  | **OK** |
| chapter_career_0.json<br>第0-2話：最初の注文 (La Première Commande) | 事前解説 (Préparation) | 複数名詞と冠詞 | `ref_numbers` | `[2, 3]` | 3. 十の位 (20〜60) と一の位の組み合わせ, 4. 特殊な70〜99の構造 (60+10, 4x20, 4x20+10) | `#numbers`(3), `#articles`(2), `#etre`(1), `#avoir`(1) | **WARNING (plural mismatch)** |
|  |  | 数字 11〜20 | `ref_numbers` | `[1]` | 2. 17〜19 (10 + 7〜9) |  | **OK** |
|  |  | 否定文 (ne...pas) の復習 | `ref_negation` | `[0, 1]` | 1. 基本的な否定文の作り方, 否定の de のルール (La règle du 'de' de négation) |  | **OK** |
| chapter_career_0.json<br>第0-2話：最初の注文 (La Première Commande) | 事前解説 (Préparation) | 動詞 être の複数形活用 | `custom` | `N/A` | カスタムデータテーブル | `#subjects`(2), `#etre`(2), `#avoir`(2), `#negation`(2), `#articles`(2), `#numbers`(2) | **OK** |
|  |  | 動詞 avoir の複数形活用 | `custom` | `N/A` | カスタムデータテーブル |  | **OK** |
| chapter_career_1.json<br>第1-1話：料理人の言葉の型 | 今日の学習目標 | 直接記述 (ページなし) | `N/A` | `N/A` | 直接テキスト記述あり | なし | **OK** |
| chapter_career_1.json<br>第1-1話：料理人の言葉の型 | 事前解説 (Préparation) | 動詞の3つのグループ | `ref_verb_groups` | `[0]` | Les trois groupes (3つのグループ) | `#verbs`(1), `#transitive_intransitive`(1), `#indicative_present`(1), `#greetings`(1), `#subjects`(1), `#etre`(1), `#avoir`(1) | **OK** |
|  |  | 自動詞と他動詞の区別 | `ref_types_of_verbs` | `[0, 1]` | 1. Verbes transitifs (他動詞 - 目的語が必要), 2. Verbes intransitifs (自動詞 - 目的語が不要) |  | **OK** |
|  |  | 直説法現在の概念 | `ref_present_indicative` | `[0]` | Verbes réguliers : Préparer (-er動詞の規則変化) |  | **OK** |
| chapter_career_1.json<br>第1-1話：料理人の言葉の型 | 事前解説 (Préparation) | 動詞活用の規則変化パターン | `ref_conjugation_patterns` | `[0]` | 1. Être (être型) | `#verbs`(4), `#articles`(1), `#numbers`(1), `#negation`(1) | **OK** |
|  |  | 第1群・第2群規則動詞の活用 | `ref_verb_groups` | `[1, 2]` | Verbes culinaires essentiels (重要な調理動詞), À retenir (重要) |  | **OK** |
| chapter_career_1.json<br>第1-1話：料理人の言葉の型 | 事前解説 (Préparation) | 主要不規則動詞の現在形活用 | `ref_essential_irregular_verbs` | `[0, 1, 2]` | 1. Faire (する・作る・調理する), 2. Aller (行く / 近接未来助動詞), 3. Venir (来る / 近接過去助動詞) | `#irregular_verbs_major`(4), `#verbs`(4), `#etre`(1), `#avoir`(1), `#negation`(1), `#articles`(1) | **OK** |
|  |  | 【復習】être / avoir の現在形活用 | `ref_essential_irregular_verbs` | `[3, 4]` | 4. Prendre (取る・食べる・飲む・注文を取る), 調理現場での使い方のポイント |  | **WARNING (être mismatch)** |
| chapter_career_1.json<br>第1-2話：問いかけと指示の交差点 | 今日の学習目標 | 直接記述 (ページなし) | `N/A` | `N/A` | 直接テキスト記述あり | なし | **OK** |
| chapter_career_1.json<br>第1-2話：問いかけと指示の交差点 | 事前解説 (Préparation) | 疑問文の3つの作り方 | `ref_questions` | `[0]` | 1. 疑問文の3つの作り方 (Trois façons de poser une question) | `#questions`(3), `#question_words`(2), `#verbs`(1), `#indicative_present`(1) | **OK** |
|  |  | 厨房で頻出する疑問詞 | `ref_questions` | `[1]` | 2. 厨房で頻出する疑問詞 (Mots interrogatifs en cuisine) |  | **OK** |
| chapter_career_1.json<br>第1-2話：問いかけと指示の交差点 | 事前解説 (Préparation) | 所有形容詞 | `ref_possessive_adjectives` | `[0]` | 所有形容詞 完全一覧表 | `#possessive_adjectives`(1), `#demonstrative_adjectives`(2), `#prepositions`(2), `#verbs`(1), `#irregular_verbs_major`(1) | **OK** |
|  |  | 指示形容詞 | `ref_demonstrative_adjectives` | `[0]` | 指示形容詞 形態・使い分け一覧表 |  | **OK** |
|  |  | 場所・方向の前置詞 | `ref_prepositions` | `[0]` | 1. 基本的な前置詞と用法 (Prépositions de base) |  | **OK** |
| chapter_career_1.json<br>第1-2話：問いかけと指示の交差点 | 事前解説 (Préparation) | 【復習】否定文の構造と語順 | `ref_negation` | `[0]` | 1. 基本的な否定文の作り方 | `#negation`(2), `#questions`(2), `#prepositions`(2), `#possessive_adjectives`(1), `#demonstrative_adjectives`(1), `#irregular_verbs_major`(2), `#verbs`(2) | **OK** |
|  |  | 疑問文と否定文の組み合わせ | `custom` | `N/A` | カスタムデータテーブル |  | **OK** |
| chapter_career_1.json<br>第1-3話：料理を彩る言葉たち | 今日の学習目標 | 直接記述 (ページなし) | `N/A` | `N/A` | 直接テキスト記述あり | なし | **OK** |
| chapter_career_1.json<br>第1-3話：料理を彩る言葉たち | 事前解説 (Préparation) | 形容詞の性数一致 | `ref_adjective_agreement` | `[0]` | 1. 基本ルール (例: petit = 小さい) | `#basic_adjectives`(5), `#question_words`(1), `#questions`(1) | **OK** |
|  |  | 形容詞の配置ルール | `ref_adjective_agreement` | `[1]` | 2. 厨房でよく使う形容詞の変化パターン一覧 |  | **OK** |
| chapter_career_1.json<br>第1-3話：料理を彩る言葉たち | 事前解説 (Préparation) | 疑問形容詞 quel の用法 | `ref_questions` | `[2]` | 3. 疑問形容詞 quel の性数変化 (L'adjectif interrogatif 'quel') | `#interrogative_adjectives`(2), `#partitive_articles`(2), `#possessive_adjectives`(1), `#demonstrative_adjectives`(1), `#prepositions`(1) | **OK** |
|  |  | 部分冠詞の用法と冠詞全体の使い分け | `ref_partitive_articles` | `[0]` | 部分冠詞の形態表 |  | **OK** |
| chapter_career_1.json<br>第1-3話：料理を彩る言葉たち | 事前解説 (Préparation) | 形容詞、疑問形容詞、部分冠詞の総まとめ | `custom` | `N/A` | カスタムデータテーブル | `#basic_adjectives`(4), `#interrogative_adjectives`(2), `#partitive_articles`(2), `#articles`(1), `#verbs`(1), `#irregular_verbs_major`(1), `#questions`(1) | **OK** |
|  |  | 【復習】冠詞全体の使い分け | `ref_definite_indefinite_articles` | `[0, 2]` | 定冠詞 (Les Articles Définis), 不定冠詞 (Les Articles Indéfinis) |  | **OK** |
|  |  | 副詞（adverbs）の基本 | `ref_adverbs` | `[0, 2]` | 1. 様態の副詞（-ment で終わる副詞の作り方）, 頻度・時間を表す副詞の位置 |  | **OK** |
| chapter_career_2.json<br>第2-1話：食材と料理の架け橋 | 今日の学習目標 | 直接記述 (ページなし) | `N/A` | `N/A` | 直接テキスト記述あり | なし | **OK** |
| chapter_career_2.json<br>第2-1話：食材と料理の架け橋 | 事前解説 (Préparation) | 前置詞と定冠詞の縮約 | `ref_contracted_articles` | `[0, 1]` | 1. 前置詞 à と定冠詞の縮約 (à + article), 2. 前置詞 de と定冠詞の縮約 (de + article) | `#contracted_articles`(3), `#demonstrative_cest`(2), `#partitive_articles`(1), `#basic_adjectives`(1) | **OK** |
|  |  | 提示表現 c'est / ce sont | `ref_demonstrative_cest` | `[0]` | 1. 基本構造 (C'est / Ce sont) |  | **OK** |
| chapter_career_2.json<br>第2-1話：食材と料理の架け橋 | 事前解説 (Préparation) | 場所・方向の前置詞 | `ref_prepositions` | `[0]` | 1. 基本的な前置詞と用法 (Prépositions de base) | `#contracted_articles`(1), `#demonstrative_cest`(2), `#prepositions`(2), `#etre`(1), `#avoir`(1) | **OK** |
|  |  | 前置詞と冠詞の縮約 | `ref_contracted_articles` | `[0, 1]` | 1. 前置詞 à と定冠詞の縮約 (à + article), 2. 前置詞 de と定冠詞の縮約 (de + article) |  | **OK** |
| chapter_career_2.json<br>第2-1話：食材と料理の架け橋 | 事前解説 (Préparation) | 前置詞の縮約と提示表現の総まとめ | `ref_contracted_articles` | `[0]` | 1. 前置詞 à と定冠詞の縮約 (à + article) | `#contracted_articles`(2), `#demonstrative_cest`(2), `#prepositions`(2), `#basic_adjectives`(1), `#question_words`(1), `#etre`(2), `#avoir`(2) | **OK** |
|  |  | 【復習】être と avoir の直説法現在活用 | `ref_essential_irregular_verbs` | `[3, 4]` | 4. Prendre (取る・食べる・飲む・注文を取る), 調理現場での使い方のポイント |  | **WARNING (être mismatch)** |
| chapter_career_2.json<br>第2-2話：厨房に響く号令 | 今日の学習目標 | 直接記述 (ページなし) | `N/A` | `N/A` | 直接テキスト記述あり | なし | **OK** |
| chapter_career_2.json<br>第2-2話：厨房に響く号令 | 事前解説 (Préparation) | 命令法の作り方 | `ref_imperative` | `[0]` | 1. 命令形の作り方 (Formation de l'impératif) | `#imperative`(3), `#irregular_verbs_1`(2), `#etre`(1), `#avoir`(1) | **OK** |
|  |  | 重要不規則動詞の活用 | `ref_essential_irregular_verbs` | `[0, 1]` | 1. Faire (する・作る・調理する), 2. Aller (行く / 近接未来助動詞) |  | **OK** |
| chapter_career_2.json<br>第2-2話：厨房に響く号令 | 事前解説 (Préparation) | 目的語人称代名詞 | `ref_object_pronouns` | `[0]` | 1. 目的格代名詞の分類 (Directs et Indirects) | `#imperative`(1), `#object_pronouns_basic`(2), `#irregular_verbs_1`(2), `#prepositions`(1), `#contracted_articles`(1) | **OK** |
|  |  | 命令文での代名詞の語順 | `ref_object_pronouns` | `[1]` | 2. 命令文での特殊な語順と変化 |  | **OK** |
| chapter_career_2.json<br>第2-2話：厨房に響く号令 | 事前解説 (Préparation) | 命令法と代名詞の総まとめ | `ref_object_pronouns` | `[1]` | 2. 命令文での特殊な語順と変化 | `#imperative`(2), `#object_pronouns_basic`(2), `#irregular_verbs_1`(2), `#demonstrative_cest`(1), `#contracted_articles`(1), `#questions`(2), `#prepositions`(2) | **OK** |
|  |  | 【復習】重要不規則動詞の活用 | `ref_essential_irregular_verbs` | `[0, 1, 2]` | 1. Faire (する・作る・調理する), 2. Aller (行く / 近接未来助動詞), 3. Venir (来る / 近接過去助動詞) |  | **OK** |
| chapter_career_2.json<br>第2-3話：料理人として説明する | 今日の学習目標 | 直接記述 (ページなし) | `N/A` | `N/A` | 直接テキスト記述あり | なし | **OK** |
| chapter_career_2.json<br>第2-3話：料理人として説明する | 事前解説 (Préparation) | 近接未来と近接過去 | `ref_near_future_past` | `[0, 1]` | 1. 近接未来 (Le Futur Proche) : 〜するつもりだ / 〜しそうだ, 2. 近接過去 (Le Passé Récent) : 〜したばかりだ | `#near_future`(3), `#near_past`(2), `#irregular_verbs_1`(1), `#imperative`(1) | **OK** |
| chapter_career_2.json<br>第2-3話：料理人として説明する | 事前解説 (Préparation) | 代名動詞（受動用法） | `ref_pronominal_verbs` | `[1]` | 2. 厨房で頻出する受動用法 | `#passive_pronominal_verbs`(3), `#near_future`(1), `#near_past`(1), `#object_pronouns_basic`(1), `#irregular_verbs_1`(1) | **OK** |
| chapter_career_2.json<br>第2-3話：料理人として説明する | 事前解説 (Préparation) | 近接時制と代名動詞の総まとめ | `ref_near_future_past` | `[0]` | 1. 近接未来 (Le Futur Proche) : 〜するつもりだ / 〜しそうだ | `#near_future`(2), `#near_past`(2), `#passive_pronominal_verbs`(2), `#imperative`(1), `#object_pronouns_basic`(1), `#contracted_articles`(2), `#irregular_verbs_1`(2) | **OK** |
|  |  | 【復習】目的語代名詞と命令形 | `ref_object_pronouns` | `[1]` | 2. 命令文での特殊な語順と変化 |  | **OK** |
| chapter_career_3.json<br>第3-1話：繊細なる計量と指示 | 今日の学習目標 | 直接記述 (ページなし) | `N/A` | `N/A` | 直接テキスト記述あり | なし | **OK** |
| chapter_career_3.json<br>第3-1話：繊細なる計量と指示 | 事前解説 (Préparation) | 比較級と最上級の作り方 | `custom` | `N/A` | カスタムデータテーブル | `#comparative`(2), `#superlative`(1), `#object_pronouns_direct_indirect`(1), `#contracted_articles`(1), `#partitive_articles`(1), `#imperative`(1) | **OK** |
|  |  | 目的語代名詞の語順 | `ref_object_pronouns` | `[0]` | 1. 目的格代名詞の分類 (Directs et Indirects) |  | **OK** |
| chapter_career_3.json<br>第3-1話：繊細なる計量と指示 | 事前解説 (Préparation) | 肯定命令形における2つの代名詞の結合 | `ref_imperative_with_pronouns` | `[0]` | 1. 肯定命令文での語順（動詞 - 代名詞） | `#imperative_with_pronouns`(1), `#object_pronouns_direct_indirect`(1), `#comparative`(1), `#superlative`(1), `#object_pronouns_basic`(1), `#imperative`(1), `#basic_adjectives`(1) | **OK** |
|  |  | 否定命令形における2つの代名詞の語順 | `ref_imperative_with_pronouns` | `[1]` | 2. 否定命令文での語順（通常の語順） |  | **OK** |
| chapter_career_3.json<br>第3-1話：繊細なる計量と指示 | 事前解説 (Préparation) | 比較級、最上級、目的語代名詞2つの結合の総まとめ | `custom` | `N/A` | カスタムデータテーブル | `#imperative_with_pronouns`(2), `#object_pronouns_direct_indirect`(2), `#comparative`(2), `#superlative`(2), `#near_future`(1), `#near_past`(1), `#object_pronouns_basic`(2) | **OK** |
|  |  | 【復習】近接未来と近接過去 | `ref_near_future_past` | `[0]` | 1. 近接未来 (Le Futur Proche) : 〜するつもりだ / 〜しそうだ |  | **OK** |
| chapter_career_3.json<br>第3-2話：過去の足跡と複合過去 | 今日の学習目標 | 直接記述 (ページなし) | `N/A` | `N/A` | 直接テキスト記述あり | なし | **OK** |
| chapter_career_3.json<br>第3-2話：過去の足跡と複合過去 | 事前解説 (Préparation) | 複合過去の基本構造 | `ref_auxiliaries` | `[0]` | Avoir : majorité des verbes (大半の動詞は avoir を助動詞とする) | `#past_compose`(2), `#auxiliary_selection`(2), `#etre`(1), `#avoir`(1), `#subjects`(1) | **OK** |
|  |  | êtreを助動詞にとる動詞 | `ref_auxiliaries` | `[1]` | Être : mouvements et changements (移動・状態変化を表す自動詞は être を使用) |  | **OK** |
| chapter_career_3.json<br>第3-2話：過去の足跡と複合過去 | 事前解説 (Préparation) | êtreを助動詞とする場合の過去分詞の性数一致 | `custom` | `N/A` | カスタムデータテーブル | `#past_compose`(1), `#auxiliary_selection`(1), `#past_participle_agreement`(2), `#comparative`(1), `#superlative`(1), `#object_pronouns_direct_indirect`(1) | **OK** |
|  |  | avoirを助動詞とする場合の過去分詞の性数一致 | `custom` | `N/A` | カスタムデータテーブル |  | **OK** |
| chapter_career_3.json<br>第3-2話：過去の足跡と複合過去 | 事前解説 (Préparation) | 複合過去と性数一致の総まとめ | `custom` | `N/A` | カスタムデータテーブル | `#past_compose`(4), `#auxiliary_selection`(2), `#past_participle_agreement`(2), `#object_pronouns_direct_indirect`(1), `#imperative_with_pronouns`(1), `#near_past`(1), `#demonstrative_cest`(1) | **OK** |
|  |  | 【復習】目的語代名詞と複合過去の組み合わせ | `custom` | `N/A` | カスタムデータテーブル |  | **OK** |
| chapter_career_3.json<br>第3-3話：語り継がれる過去と理由 | 今日の学習目標 | 直接記述 (ページなし) | `N/A` | `N/A` | 直接テキスト記述あり | なし | **OK** |
| chapter_career_3.json<br>第3-3話：語り継がれる過去と理由 | 事前解説 (Préparation) | 半過去（imparfait）の活用と概念 | `custom` | `N/A` | カスタムデータテーブル | `#imparfait`(3), `#imparfait_vs_past_compose`(2), `#past_compose`(1), `#auxiliary_selection`(1) | **OK** |
|  |  | 半過去と複合過去の使い分け | `custom` | `N/A` | カスタムデータテーブル |  | **OK** |
| chapter_career_3.json<br>第3-3話：語り継がれる過去と理由 | 事前解説 (Préparation) | 関係代名詞 qui / que の基本 | `ref_relative_pronouns` | `[0, 1]` | 1. 関係代名詞 qui と que の役割と使い分け, qui と que の簡単な見分け方とエリジオン | `#relative_pronouns_basic`(1), `#conjunctions_basic`(2), `#gerund_participle`(2), `#imparfait`(1), `#imparfait_vs_past_compose`(1) | **OK** |
|  |  | 接続詞（parce que / mais / donc） | `custom` | `N/A` | カスタムデータテーブル |  | **OK** |
|  |  | 現在分詞とジェロンディフ | `ref_non_finite_forms` | `[0]` | 1. Infinitif (不定詞 - 辞書形) |  | **OK** |
| chapter_career_3.json<br>第3-3話：語り継がれる過去と理由 | 事前解説 (Préparation) | 半過去、複合過去、関係代名詞、接続詞の総まとめ | `custom` | `N/A` | カスタムデータテーブル | `#imparfait`(2), `#imparfait_vs_past_compose`(2), `#relative_pronouns_basic`(2), `#conjunctions_basic`(1), `#gerund_participle`(1), `#past_compose`(2), `#past_participle_agreement`(1), `#comparative`(1) | **OK** |
|  |  | 【復習】過去分詞の性数一致と比較級 | `custom` | `N/A` | カスタムデータテーブル |  | **OK** |
| chapter_career_4.json<br>第4-1話：未来のソースと丁寧な願い | 今日の学習目標 | 直接記述 (ページなし) | `N/A` | `N/A` | 直接テキスト記述あり | なし | **OK** |
| chapter_career_4.json<br>第4-1話：未来のソースと丁寧な願い | 事前解説 (Préparation) | 単純未来 (Futur simple) | `ref_time_expressions` | `[0]` | 1. 曜日 (Les jours de la semaine) | `#futur_simple`(1), `#conditional_present`(2), `#polite_expressions`(2), `#past_compose`(1), `#imparfait`(1) | **OK** |
|  |  | 条件法現在 (Conditionnel présent) と丁寧な表現 | `ref_conditional` | `[0]` | 1. 条件法現在の語幹と活用（丁寧な表現・アドバイス） |  | **OK** |
| chapter_career_4.json<br>第4-1話：未来のソースと丁寧な願い | 事前解説 (Préparation) | 中性代名詞 y と en | `ref_pronouns` | `[1]` | 2. 中性代名詞 y の使い方 (場所・間接目的の代用) | `#pronouns_y_en`(2), `#futur_simple`(2), `#conditional_present`(2), `#object_pronouns_direct_indirect`(1) | **OK** |
| chapter_career_4.json<br>第4-1話：未来のソースと丁寧な願い | 事前解説 (Préparation) | 未来表現と中性代名詞の総まとめ | `custom` | `N/A` | カスタムデータテーブル | `#futur_simple`(4), `#conditional_present`(2), `#pronouns_y_en`(2), `#near_future`(2), `#object_pronouns_direct_indirect`(2) | **OK** |
|  |  | 【復習】近接未来と目的語代名詞 | `custom` | `N/A` | カスタムデータテーブル |  | **OK** |
| chapter_career_4.json<br>第4-2話：もしもの話とつまみ食い | 今日の学習目標 | 直接記述 (ページなし) | `N/A` | `N/A` | 直接テキスト記述あり | なし | **OK** |
| chapter_career_4.json<br>第4-2話：もしもの話とつまみ食い | 事前解説 (Préparation) | 条件節 (Si + 現在形, 単純未来) | `ref_conditional` | `[1]` | 2. Si を用いた条件節・仮定表現 | `#si_clauses_present`(3), `#futur_simple`(2), `#conditional_present`(1), `#pronouns_y_en`(1) | **OK** |
| chapter_career_4.json<br>第4-2話：もしもの話とつまみ食い | 事前解説 (Préparation) | 受動態の基本構造 (La voix passive) | `ref_passive` | `[0]` | 1. 受動態の基本構造と性数一致 | `#passive_voice`(3), `#past_participle_agreement`(2), `#si_clauses_present`(1), `#past_compose`(1) | **OK** |
|  |  | 複合過去の受動態と性数一致 | `ref_passive` | `[1]` | 2. 時制の変化（現在形・複合過去・未来形） |  | **OK** |
| chapter_career_4.json<br>第4-2話：もしもの話とつまみ食い | 事前解説 (Préparation) | 条件節と受動態の総まとめ | `custom` | `N/A` | カスタムデータテーブル | `#si_clauses_present`(4), `#passive_voice`(2), `#futur_simple`(2), `#imparfait_vs_past_compose`(2), `#comparative`(2) | **OK** |
|  |  | 【復習】複合過去と半過去の使い分け | `custom` | `N/A` | カスタムデータテーブル |  | **OK** |
| chapter_career_4.json<br>第4-3話：絶対の基準と使役動詞 | 今日の学習目標 | 直接記述 (ページなし) | `N/A` | `N/A` | 直接テキスト記述あり | なし | **OK** |
| chapter_career_4.json<br>第4-3話：絶対の基準と使役動詞 | 事前解説 (Préparation) | 接続法現在 (Subjonctif) | `ref_subjunctive` | `[0]` | 1. 義務・必要性の表現 (Il faut que + 接続法) | `#subjunctive_basic`(3), `#obligation_il_faut_que`(2), `#passive_voice`(1), `#si_clauses_present`(1) | **OK** |
|  |  | 必要・義務の表現 (Il faut que + 接続法) | `ref_subjunctive` | `[1]` | 2. 感情や要望の接続法 |  | **OK** |
| chapter_career_4.json<br>第4-3話：絶対の基準と使役動詞 | 事前解説 (Préparation) | 使役動詞 (faire + 不定詞) | `ref_causative_faire` | `[0]` | 1. 使役構文の基本パターンと語順 | `#causative_faire`(3), `#subjunctive_basic`(2), `#obligation_il_faut_que`(1), `#imparfait`(1) | **OK** |
|  |  | 感情を表す接続法 | `ref_subjunctive` | `[2]` | ⚠️ Index 2 範囲外 (全 2 セクション) |  | **ERROR (Index)** |
| chapter_career_4.json<br>第4-3話：絶対の基準と使役動詞 | 事前解説 (Préparation) | 接続法と使役表現の総まとめ | `custom` | `N/A` | カスタムデータテーブル | `#subjunctive_basic`(2), `#causative_faire`(2), `#obligation_il_faut_que`(2), `#relative_pronouns_basic`(2), `#gerund_participle`(2), `#pronouns_y_en`(2) | **OK** |
|  |  | 【復習】関係代名詞とジェロンディフ | `custom` | `N/A` | カスタムデータテーブル |  | **OK** |
| chapter_career_4.json<br>第4-4話：夏の終わりと、また会う日まで | 今日の学習目標 | 直接記述 (ページなし) | `N/A` | `N/A` | 直接テキスト記述あり | なし | **OK** |
| chapter_career_4.json<br>第4-4話：夏の終わりと、また会う日まで | 事前解説 (Préparation) | 過去時制の総復習 | `custom` | `N/A` | カスタムデータテーブル | `#past_compose`(1), `#imparfait`(2), `#imparfait_vs_past_compose`(1), `#object_pronouns_direct_indirect`(1), `#imperative_with_pronouns`(1), `#gerund_participle`(1) | **OK** |
|  |  | 目的語代名詞の総復習 | `custom` | `N/A` | カスタムデータテーブル |  | **OK** |
| chapter_career_4.json<br>第4-4話：夏の終わりと、また会う日まで | 事前解説 (Préparation) | 未来と条件節の総復習 | `custom` | `N/A` | カスタムデータテーブル | `#futur_simple`(2), `#conditional_present`(1), `#si_clauses_present`(1), `#passive_voice`(1), `#causative_faire`(1), `#subjunctive_basic`(1) | **OK** |
|  |  | 高度な文法構造の総復習 | `custom` | `N/A` | カスタムデータテーブル |  | **OK** |
| chapter_career_4.json<br>第4-4話：夏の終わりと、また会う日まで | 事前解説 (Préparation) | A1〜A2 文法総復習・最終チェック | `custom` | `N/A` | カスタムデータテーブル | `#past_compose`(1), `#imparfait`(1), `#futur_simple`(1), `#conditional_present`(1), `#subjunctive_basic`(1), `#passive_voice`(1), `#causative_faire`(1), `#pronouns_y_en`(5) | **OK** |