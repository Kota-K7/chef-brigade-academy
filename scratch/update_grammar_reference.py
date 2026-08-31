import os
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

workspace_dir = os.path.abspath(r"C:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy")
ref_path = os.path.join(workspace_dir, "data", "grammar_reference.json")

with open(ref_path, "r", encoding="utf-8") as f:
    ref_data = json.load(f)

# Helper to find items by id
def find_item(ref_id):
    return next((item for item in ref_data if item["id"] == ref_id), None)

# --- 1. Expand ref_negation (Negation) ---
neg_item = find_item("ref_negation")
if neg_item:
    # Update definition to be more beginner friendly
    neg_item["definition_ja"] = "動詞を ne と pas で挟む最も基本的な否定の表現です。「もはや〜ない」「決して〜ない」といった他の否定表現の違いや、否定文の際に直接目的語の冠詞が de (d') に変化する重要なルール（否定のde）について、基礎から分かりやすく解説します。"
    
    # Check if our new explanation is already there
    has_ex = any(s.get("title") == "💡 否定表現の使い分けと違い" for s in neg_item["sections"])
    if not has_ex:
        new_section = {
            "type": "info",
            "title": "💡 否定表現の使い分けと違い",
            "content_ja": "フランス語では、ne と pas の代わりに別の言葉を組み合わせることで、多様な否定を表現できます。基本構造はすべて【ne ＋ 動詞 ＋ 否定語】です。\n\n1. **ne ... pas (〜ない)**\n   もっとも一般的な否定です。「していない」という事実だけを伝えます。\n   *例: Je ne mange pas. (私は食べません)*\n\n2. **ne ... plus (もはや〜ない / もう〜ない)**\n   「以前は〜していたが、今はもう〜していない」という変化を表します。満腹のときや、禁煙したときなどに使います。\n   *例: Je ne mange plus. (私はもう食べません ※満腹なので)*\n\n3. **ne ... jamais (決して〜ない / 一度も〜ない)**\n   頻度が0%であることを表します。「絶対に〜しない」「これまで一度も〜したことがない」という場合に多用します。\n   *例: Je ne mange jamais. (私は決して食べません ※アレルギーがある時など)*\n\n4. **ne ... rien (何も〜ない)**\n   否定の対象が「物事（nothing）」になります。直接目的語の代わりに rien を置きます。\n   *例: Je ne mange rien. (私は何も食べません)*\n\n5. **ne ... personne (誰も〜ない)**\n   否定の対象が「人（nobody）」になります。\n   *例: Je ne vois personne. (私は誰の姿も見えません)*"
        }
        # Insert before the examples section
        examples_idx = next((idx for idx, s in enumerate(neg_item["sections"]) if s.get("type") == "examples"), len(neg_item["sections"]))
        neg_item["sections"].insert(examples_idx, new_section)
        print("SUCCESS: Expanded ref_negation")

# --- 2. Expand ref_greetings (Greetings) ---
greet_item = find_item("ref_greetings")
if greet_item:
    greet_item["definition_ja"] = "フランス語の最も基本的な挨拶、感謝の表現、自己紹介、および「出会った時の喜び」を伝えるフレーズです。厨房や日常生活で頻繁に使用される重要な表現を学びましょう。"
    
    has_応用 = any("応用的な挨拶" in s.get("title", "") for s in greet_item["sections"])
    if not has_応用:
        sec_apply = {
            "type": "table",
            "title": "3. 応用的な挨拶・出会いの表現 (Expressions de rencontre)",
            "headers": [
                "フレーズ",
                "意味",
                "解説"
            ],
            "rows": [
                [
                    "Ravi de vous rencontrer.",
                    "お会いできて嬉しいです。",
                    "初対面の人に対して「お会いできて嬉しい」と伝える、非常に丁寧で上品な表現です。"
                ],
                [
                    "Ravi de te rencontrer.",
                    "君に会えて嬉しいよ。",
                    "親しい間柄や同世代の同僚に「会えて嬉しい」と伝えるカジュアルな表現です。"
                ],
                [
                    "Enchanté / Enchantée",
                    "はじめまして",
                    "「光栄です」を意味する定番の挨拶です。話し手が女性の場合は末尾に e を付けて Enchantée と書きますが、発音は同じです。"
                ]
            ]
        }
        sec_apply_info = {
            "type": "info",
            "title": "💡 関連単語の補足",
            "content_ja": "* **ravi** (ラヴィ): 喜んで、非常に嬉しい（形容詞。主語が女性なら ravie と綴りますが発音は同じです）\n* **rencontrer** (ランコントレ): 出会う、会う（第一群規則動詞）\n* **rencontre** (ランコントル): 出会い（女性名詞）\n\n「Ravi(e) de + 動詞の原形」で「〜して嬉しい」という感情を表すことができます。フランス語では、形容詞の後ろに動詞を続ける場合、前置詞 de を挟むのが基本ルールです。"
        }
        greet_item["sections"].append(sec_apply)
        greet_item["sections"].append(sec_apply_info)
        print("SUCCESS: Expanded ref_greetings")

# --- 3. Expand ref_adjective_agreement (Adjective Agreement) ---
adj_item = find_item("ref_adjective_agreement")
if adj_item:
    has_nationality = any("国籍" in s.get("title", "") for s in adj_item["sections"])
    if not has_nationality:
        sec_nat = {
            "type": "table",
            "title": "3. 国籍を表す形容詞 (Adjectifs de Nationalité)",
            "headers": [
                "国籍 (意味)",
                "男性単数",
                "女性単数",
                "男性複数",
                "女性複数",
                "発音と変化のポイント"
            ],
            "rows": [
                [
                    "フランスの / フランス人",
                    "français (フランセ)",
                    "française (フランセーズ)",
                    "français (フランセ)",
                    "françaises (フランセーズ)",
                    "女性形になると末尾の s が濁って「ズ」と発音されます。男性複数は単数と同形です。"
                ],
                [
                    "日本の / 日本人",
                    "japonais (ジャポネ)",
                    "japonaise (ジャポネーズ)",
                    "japonais (ジャポネ)",
                    "japonaises (ジャポネーズ)",
                    "フランス語と同様に、女性形になると末尾の s を発音します（ジャポネーズ）。"
                ],
                [
                    "イタリアの / イタリア人",
                    "italien (イタリヤン)",
                    "italienne (イタリエンヌ)",
                    "italiens (イタリヤン)",
                    "italiennes (イタリエンヌ)",
                    "語尾が -ien で終わるものは、女性形で n を重ねて e をつけます (-ienne)。"
                ]
            ]
        }
        sec_nat_info = {
            "type": "info",
            "title": "💡 国籍形容詞の大文字・小文字ルール",
            "content_ja": "国籍を表す単語は、**形容詞**として使う場合と**名詞（〜人）**として使う場合で、語頭を大文字にするか小文字にするかのルールが異なります。これは記述問題で非常によく狙われます。\n\n* **形容詞として使う場合 (小文字で開始):**\n  名詞の後ろに置いて「〜国製の、〜国の」と修飾します。\n  *例: le vin français (フランスのワイン)*\n  *例: la cuisine japonaise (日本料理)*\n\n* **名詞（〜人）として使う場合 (大文字で開始):**\n  主語に対する国籍の紹介などで使います。\n  *例: Ils sont Japonais. (彼らは日本人です)*\n  *例: Elle est Française. (彼女はフランス人女性です)*"
        }
        
        # Insert before the last examples/info sections if they exist
        examples_idx = next((idx for idx, s in enumerate(adj_item["sections"]) if s.get("type") == "examples"), len(adj_item["sections"]))
        adj_item["sections"].insert(examples_idx, sec_nat)
        adj_item["sections"].insert(examples_idx + 1, sec_nat_info)
        print("SUCCESS: Expanded ref_adjective_agreement")

# --- 4. Expand ref_near_future_past (Near Future / Past) ---
time_item = find_item("ref_near_future_past")
if time_item:
    has_intro = any("どういう場合に使うか" in s.get("title", "") for s in time_item["sections"])
    if not has_intro:
        sec_intro = {
            "type": "info",
            "title": "💡 近接未来・近接過去はなぜ超便利なのか？",
            "content_ja": "フランス語の動詞の過去形や未来形は、本来とても複雑な動詞の形（語尾の変化）を覚える必要があります。\nしかし、この「近接未来」と「近接過去」を使えば、**現在形（aller と venir）と動詞の原形（辞書に載っている形）を組み合わせるだけ**で、日常会話のほぼすべての未来と過去の予定を表現できてしまいます！\n初学者にとって、最も早く実用的な文を話せるようになるための「最強の裏技表現」です。"
        }
        time_item["sections"].insert(0, sec_intro)
        print("SUCCESS: Expanded ref_near_future_past")

# --- 5. Expand ref_auxiliaries (Auxiliaries for Passé Composé) ---
aux_item = find_item("ref_auxiliaries")
if aux_item:
    has_intro = any("複合過去の基本概念" in s.get("title", "") for s in aux_item["sections"])
    if not has_intro:
        sec_intro = {
            "type": "info",
            "title": "💡 過去の出来事を話す「複合過去 (Passé Composé)」の基本概念",
            "content_ja": "フランス語の日常会話で「〜した（過去の事実）」を報告するときに最もよく使われるのが「複合過去」です。\n英語の現在完了形（have + 過去分詞）と形がそっくりですが、フランス語では「〜した」という**単なる過去の事実・動作**を表すために使います。\n\n【基本形】**[助動詞の現在形 (avoir または être)] ＋ [動詞の過去分詞 (Participe Passé)]**\n\n*   **ほとんどの動詞:** 助動詞に **`avoir`** を使います。\n*   **移動を表す一部の自動詞・代名動詞:** 助動詞に **`être`** を使います。"
        }
        aux_item["sections"].insert(0, sec_intro)
        print("SUCCESS: Expanded ref_auxiliaries")

# Save back to grammar_reference.json
with open(ref_path, "w", encoding="utf-8") as f:
    json.dump(ref_data, f, ensure_ascii=False, indent=2)

print("All updates to grammar_reference.json saved successfully.")
