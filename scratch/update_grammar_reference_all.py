import os
import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

workspace_dir = os.path.abspath(r"C:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy")
ref_path = os.path.join(workspace_dir, "data", "grammar_reference.json")

with open(ref_path, "r", encoding="utf-8") as f:
    ref_data = json.load(f)

# Helper to find items by id
def find_item(ref_id):
    return next((item for item in ref_data if item["id"] == ref_id), None)

# Define all the new info sections to append
expansions = {
    "ref_definite_indefinite_articles": {
        "type": "info",
        "title": "💡 定冠詞 (the) と 不定冠詞 (a) のイメージ使い分け",
        "content_ja": "フランス語の冠詞は、英語の a と the の使い分けとよく似ていますが、厨房での実践例を考えるとより直感的に理解できます。\n\n1. **不定冠詞 (un, une, des) ＝「どれでも良い1つ」**\n   話し手と聞き手の中で、まだ特定されていない新しいモノを指します。\n   *例: Apportez-moi **une** casserole. (どれでもいいから鍋を1つ持ってきて)*\n   料理長は特定の鍋を指定しているのではなく、「加熱用の鍋が1個欲しい」という機能だけを求めています。\n\n2. **定冠詞 (le, la, les) ＝「話題になっているそのモノ」**\n   お互いが「どれのことか分かっている特定のもの」を指します。\n   *例: Nettoyez **la** casserole. (その鍋を洗って)*\n   この場合、洗うべき鍋は「さっき調理に使った、汚れているあの鍋」とお互いに特定できているため定冠詞になります。"
    },
    "ref_verb_groups": {
        "type": "info",
        "title": "💡 フランス語動詞の『3つのグループ』と攻略のコツ",
        "content_ja": "フランス語の動詞は何千とありますが、すべて以下の3つのどれかに分類され、ルールが分かれば攻略は難しくありません。\n\n*   **第1群規則動詞 (-er動詞) ＝ 全動詞の約90%！**\n    原形が `-er` で終わる動詞です。活用（語尾変化）のルールが完全に一定であるため、最初の1つ（例: `couper` や `préparer`）を覚えれば、残り数千個の動詞もすべて同じように活用させることができます。初学者はまずここを完璧にするのが最短ルートです。\n*   **第2群規則動詞 (-ir動詞) ＝ 規則変化のもう1つのグループ**\n    原形が `-ir` で終わり、複数形で `-iss-` という音が入る規則動詞（例: `finir` [仕上げる] など）です。これも完全にルール通りに変化します。\n*   **第3群不規則動詞 ＝ 最重要の例外メンバー**\n    `être`, `avoir`, `aller`, `faire` など、日常会話や助動詞として超多用される動詞がここに含まれます。これらはルールから外れて変化するため個別に暗記する必要がありますが、数としてはごく一部です。"
    },
    "ref_time_expressions": {
        "type": "info",
        "title": "💡 厨房で役立つ！時間・曜日を指定する際の前置詞",
        "content_ja": "時間やスケジュールを文章の中で正しく伝えるためには、単語だけでなく前置詞との組み合わせが重要です。\n\n1. **時刻の指定 ＝ `à` を使う**\n   特定の時間を指す時は前置詞 `à` (〜に) を用います。\n   *例: Le service commence **à** 18 heures. (サービスは18時に始まります)*\n\n2. **曜日の指定 ＝ 前置詞は不要！**\n   「月曜日に」と言う場合、英語の on Monday のような前置詞は使わず、曜日単体、または定冠詞 `le` を付けます。\n   *例: Je travaille **lundi**. (私は月曜日に働きます)*\n   *例: Le restaurant est fermé **le lundi**. (レストランは毎週月曜日が定休日です ※le をつけると「毎週〜」になります)*\n\n3. **期間や季節の指定 ＝ `en` または `dans` を使う**\n   「3分以内に」「〜ヶ月で」など、所要時間や期間を表す前置詞です。\n   *例: Ce plat est prêt **dans** 5 minutes. (この料理は5分以内に準備できます)*"
    },
    "ref_numbers": {
        "type": "info",
        "title": "💡 なぜフランス語の 70〜99 は足し算や掛け算になるのか？",
        "content_ja": "フランス語を学び始めた誰もが驚くのが、70以上の数字の特殊な数え方です。これはかつてこの地域にいたケルト人が「20進法（20を1つのまとまりとする）」を使っていた名残です。\n\n*   **70 (soixante-dix) ＝「60 ＋ 10」**\n    60 (soixante) の後ろに10 (dix) を足して表現します。71は「60 ＋ 11 (soixante-onze)」となります。\n*   **80 (quatre-vingts) ＝「4 × 20」**\n    20 (vingt) が 4つ (quatre) ある、という掛け算で表現します。\n*   **90 (quatre-vingt-dix) ＝「4 × 20 ＋ 10」**\n    80 (quatre-vingt) の後ろにさらに 10 (dix) を足します。91は「4 × 20 ＋ 11 (quatre-vingt-onze)」となります。\n\n**【慣れるためのコツ】**\n最初は戸惑いますが、「70代は60ベースで数える」「90代は80ベースで数える」とグループで意識し、電卓のボタンや時計の文字盤をイメージして口に馴染ませるのが一番の近道です。"
    },
    "ref_prepositions": {
        "type": "info",
        "title": "💡 空間を表す前置詞（sur, sous, dans）のイメージ関係",
        "content_ja": "厨房では、食材や器具の「位置」を正確に指示する必要があるため、以下の空間前置詞のイメージを頭に叩き込むのが重要です。\n\n*   **`sur` (〜の上に) ＝ 表面に接触して乗っているイメージ**\n    *例: Le poisson est **sur** la planche. (魚はまな板の上にあります)*\n*   **`sous` (〜の下に) ＝ 何かの影・下側に位置するイメージ**\n    *例: Les poubelles sont **sous** le plan de travail. (ゴミ箱は作業台の下にあります)*\n*   **`dans` (〜の中に) ＝ 3次元の箱や液体の中に包まれているイメージ**\n    *例: Les légumes sont **dans** le bol. (野菜はボウルの中に入っています)*\n*   **`devant` (前) / `derrière` (後ろ) ＝ 表裏の位置関係**\n    *例: Posez l'assiette **devant** le client. (皿をお客様の前に置いてください)*"
    },
    "ref_non_finite_forms": {
        "type": "info",
        "title": "💡 不定詞（原形）と現在分詞はどういう場合に使う？",
        "content_ja": "動詞の活用変化をしない「非定形動詞」は、文章をスマートに繋ぐために非常に便利です。\n\n1. **不定詞（原形） ＝ 動作そのものを名詞や目的語にする**\n   フランス語では、主動詞（例: *Je veux...* や *Il faut...*）の直後や、前置詞（例: *pour* や *sans*）の後に動詞を置く場合、必ず動詞の原形（不定詞）にします。\n   *例: Ce couteau est **pour couper** la viande. (この包丁は肉を**切るための**ものです)*\n\n2. **現在分詞 ＝「〜しながら（並行する動作）」を表す**\n   フランス語の現在分詞は、前置詞 `en` と組み合わせることで「ジェロンディフ（〜しながら）」という同時動作を表す副詞的な表現になります。\n   *例: Elle travaille **en écoutant** de la musique. (彼女は音楽を**聴きながら**働いています)*"
    },
    "ref_contracted_articles": {
        "type": "info",
        "title": "💡 縮約冠詞（au, duなど）はなぜ起こるのか？",
        "content_ja": "フランス語では、前置詞 `à` (〜に/へ) や `de` (〜の/から) の直後に男性単数定冠詞 `le` や複数定冠詞 `les` が来ると、発音を滑らかにするために、2つの単語が合体して1つの単語（縮約冠詞）になります。\n\n*   **`à` ＋ `le` ＝ `au`** (オ)  ※ `à le` と言うのは禁止です！\n    *例: Je vais **au** marché. (私は市場へ行きます)*\n*   **`à` ＋ `les` ＝ `aux`** (オ) \n    *例: Pensez **aux** clients. (お客様たちのことを考えてください)*\n*   **`de` ＋ `le` ＝ `du`** (デュ) ※ `de le` と言うのは禁止です！\n    *例: C'est le plat **du** jour. (今日のメニュー[その日の料理]です)*\n*   **`de` ＋ `les` ＝ `des`** (デ)\n    *例: C'est la table **des** enfants. (子供たちのテーブルです)*\n\n※女性単数定冠詞 `la` や、エリジオンした `l'` の前では縮約は起こりません（例: `à la cuisine`, `de l'eau` のまま）。"
    },
    "ref_demonstrative_cest": {
        "type": "info",
        "title": "💡 目の前のものを紹介・特定する『C'est ...』と『Ce sont ...』",
        "content_ja": "目の前にある料理や食材、または人を指して「これは〜です」「これらは〜です」と説明する表現です。日常会話でも接客でも毎日使う最重要フレーズです。\n\n1. **C'est ... ＝ 単数のものを指す (これは〜だ)**\n   直後に「単数名詞」を置きます。英語の This is / It is に相当します。\n   *例: **C'est** une spécialité locale. (これは地元の名物料理です)*\n\n2. **Ce sont ... ＝ 複数のものを指す (これらは〜だ)**\n   直後に「複数名詞」を置きます。英語の These are / They are に相当します。\n   *例: **Ce sont** des assiettes chaudes. (これらは温かいお皿です)*\n\n※否定文にする場合は動詞 `est` を ne...pas で挟み、**`Ce n'est pas ...`** (これは〜ではない) となります。"
    },
    "ref_imperative": {
        "type": "info",
        "title": "💡 厨房の号令！命令形はどういう場面で使う？",
        "content_ja": "レシピの指示や、厨房内での作業指示・号令で使われる表現です。英語と同様に「主語を省いて動詞から始める」ため構造はシンプルです。\n\n**【誰に向かって指示するかによる使い分け】**\n*   **tu（君）に対する命令 ＝ 同僚や後輩に対して「〜して」**\n    *例: **Coupe** les oignons ! (玉ねぎを切って！)*\n*   **vous（あなた/あなた達）に対する命令 ＝ 目上の人、顧客、または複数名に対して「〜してください / 〜しろ」**\n    レシピ本に書かれている指示も、通常はこの vous に対する命令形が使われます。\n    *例: **Mélangez** bien. (よく混ぜてください)*\n*   **nous（私たち）に対する命令 ＝ 「〜しましょう（Let's）」**\n    *例: **Commençons** le service ! (サービスを開始しましょう！)*"
    },
    "ref_object_pronouns": {
        "type": "info",
        "title": "💡 日本語の語順にそっくり？代名詞が動詞の『前』に来る法則",
        "content_ja": "フランス語の「目的語代名詞（それを、彼に、など）」のルールは、日本人にとって実は非常に理解しやすい特徴があります。なぜなら**語順が日本語と全く同じになるから**です！\n\n*   **肯定文の語順:**\n    *   英語: I eat **it**. (主語 ＋ 動詞 ＋ 目的語)\n    *   日本語: 私は **それを** 食べます。 (主語 ＋ 目的語 ＋ 動詞)\n    *   フランス語: Je **le** mange. (主語 ＋ 目的語 ＋ 動詞)\n    このように、フランス語では代名詞が**動詞の直前**に移動するため、日本語の感覚のまま配置することができます。\n\n*   **否定文の語順:**\n    否定文にする場合も、代名詞は動詞と一体化したまま ne と pas に挟まれます。\n    *例: Je **ne** le mange **pas**. (私はそれを食べません)*"
    },
    "ref_pronominal_verbs": {
        "type": "info",
        "title": "💡 自分自身に動作を返す『代名動詞』のイメージ",
        "content_ja": "動詞の原形の前に `se` (自分自身を) を伴う動詞を「代名動詞」と呼びます。「動作が他者ではなく、主語自身に向かう」というニュアンスを表します。\n\n*   **一般動詞との対比:**\n    *   `lever` (〜を起こす/持ち上げる) -> *Je lève la main.* (私は手を挙げる)\n    *   `se lever` (自分自身を起こす ＝ 起きる) -> *Je **me** lève.* (私は起きる)\n*   **人称代名詞の変化:**\n    主語に合わせて、動詞の前の代名詞も以下のように変化します。\n    *   `je` -> **`me`** (私は自分を) / `tu` -> **`te`** (君は自分を) / `il/elle/on` -> **`se`** (彼/彼女は自分を)\n    *   `nous` -> **`nous`** (私たちは自分たちを) / `vous` -> **`vous`** (あなた方は自分を) / `ils/elles` -> **`se`**"
    },
    "ref_conditional": {
        "type": "info",
        "title": "💡 レストランの丁寧な注文で必須の『条件法（Je voudrais...）』",
        "content_ja": "「条件法現在」は、英語の would に相当し、控えめな希望や、相手に対する丁寧な依頼を表現するために欠かせない大人のマナー表現です。\n\n*   **直接的（子供っぽい表現）:**\n    *   *Je veux un café. (私はコーヒーが欲しい。)* ※ veux は vouloir の直接現在。「〜をよこせ」という強いニュアンスになり、飲食店などでは不躾に聞こえます。\n*   **間接的・丁寧（大人の表現）:**\n    *   *Je **voudrais** un café, s'il vous plaît. (コーヒーを頂きたいのですが、お願いします。)*\n    このように、「条件法」にすることで「もし可能であれば〜したい」というクッションが入り、非常に好印象で上品な注文になります。"
    },
    "ref_passive": {
        "type": "info",
        "title": "💡 フランス語では『受動態』をあまり使わない？",
        "content_ja": "フランス語にも「主語 ＋ être ＋ 過去分詞 ＋ par (〜によって)」という受動態（受け身）の文法は存在します。\nしかし、フランス語は「動作を誰が行ったか（能動）」をはっきりさせることを好むため、英語ほど受動態を多用しません。\n\n**【フランス語が受動態の代わりに好む表現】**\n1.  **代名動詞の受動用法**\n    モノが主語で「〜される」と言う場合、代名動詞を使って表現します。\n    *例: Ce plat **se prépare** rapidement. (この料理は素早く準備されます[準備される性質がある])*\n2.  **一般の人を表す `on` を主語にする**\n    *例: **On** sert le fromage avant le dessert. (デザートの前にチーズが提供されます ※直訳: 私たちはチーズを提供する)*"
    },
    "ref_subjunctive": {
        "type": "info",
        "title": "💡 事実ではなく主観を表す『接続法』の魔法",
        "content_ja": "フランス語の「接続法（Subjonctif）」は、客観的な「事実」をそのまま伝える普通の時制（直説法）とは異なり、話し手の心の中の**「感情」「願望」「疑い」「義務（〜する必要がある）」**という主観フィルターを通した世界を表現する特別なモードです。\n\n*   **直説法現在 (客観的な事実):**\n    *   *Tu es prêt. (君は準備ができている。)*\n*   **接続法現在 (主観・義務のフィルター):**\n    *   *Il faut que tu **sois** prêt. (君は準備ができていなければならない。)*\n    このように、「〜する必要がある（Il faut que...）」という主観が入ると、直説法の `es` ではなく、接続法独自の活用形である `sois` に変化します。主に `que` で繋がれた従属節の中で発動するのが特徴です。"
    }
}

modified_count = 0
for ref_id, new_section in expansions.items():
    item = find_item(ref_id)
    if item:
        # Check if already added
        has_sec = any(s.get("title") == new_section["title"] for s in item.get("sections", []))
        if not has_sec:
            # We want to insert the explanation at section index 0 or before examples
            sections = item.setdefault("sections", [])
            
            # Find insertion point (usually index 0, or after basic tables, but let's put it at index 0 for maximum visibility, or index 1 if there is a basic table at 0)
            if len(sections) > 0 and sections[0].get("type") == "table" and "1." in sections[0].get("title", ""):
                sections.insert(1, new_section)
            else:
                sections.insert(0, new_section)
                
            modified_count += 1
            print(f"SUCCESS: Expanded {ref_id} with info section: '{new_section['title']}'")

if modified_count > 0:
    with open(ref_path, "w", encoding="utf-8") as f:
        json.dump(ref_data, f, ensure_ascii=False, indent=2)
    print(f"All {modified_count} modifications written to database.")
else:
    print("No changes needed. All topics were already expanded.")
