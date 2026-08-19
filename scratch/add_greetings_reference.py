import json

ref_file = 'data/grammar_reference.json'

new_ref = {
    "id": "ref_greetings",
    "title_fr": "Les salutations de base",
    "title_en": "Basic Greetings and Introductions",
    "title_ja": "基本の挨拶と自己紹介",
    "definition_fr": "Apprenez les expressions quotidiennes pour saluer, remercier et se présenter en français.",
    "definition_ja": "フランス語の最も基本的な挨拶、感謝の表現、そして自己紹介のフレーズです。厨房や日常生活で頻繁に使用される重要な表現を学びましょう。",
    "sections": [
      {
        "type": "table",
        "title": "1. 基本の挨拶 (Salutations quotidiennes)",
        "headers": [
          "表現",
          "発音/解説",
          "意味・シチュエーション"
        ],
        "rows": [
          [
            "Bonjour",
            "ボンジュール",
            "おはよう / こんにちは（日中の一般的な挨拶）"
          ],
          [
            "Bonsoir",
            "ボンソワール",
            "こんばんは（夕方以降の挨拶）"
          ],
          [
            "Merci",
            "メルスィ",
            "ありがとう（感謝を伝える表現）"
          ],
          [
            "S'il vous plaît",
            "シル・ヴ・プレ",
            "お願いします / ください（丁寧な依頼・注文の表現）"
          ],
          [
            "Enchanté",
            "アンシャンテ",
            "はじめまして"
          ],
          [
            "Au revoir",
            "オ・ルヴォワール",
            "さようなら / 失礼します（別れ際の挨拶）"
          ],
          [
            "À bientôt",
            "ア・ビアント",
            "また近いうちに！"
          ]
        ]
      },
      {
        "type": "table",
        "title": "2. 自己紹介とやり取り (Se présenter et échanger)",
        "headers": [
          "フレーズ",
          "意味",
          "解説"
        ],
        "rows": [
          [
            "Je m'appelle ...",
            "私の名前は ... です。",
            "自己紹介の基本フレーズです。（例: Je m'appelle Camille.）"
          ],
          [
            "Comment vous vous appelez ?",
            "お名前は何ですか？",
            "相手の名前を尋ねる丁寧な質問です。"
          ],
          [
            "Je suis ...",
            "私は ... です。",
            "主語 Je + être動詞 suis を使った自己紹介です。"
          ],
          [
            "Ça va ?",
            "元気？ / 調子はどう？",
            "カジュアルな挨拶です。返答も「Ça va.（元気だよ）」となります。"
          ],
          [
            "De rien.",
            "どういたしまして。",
            "Merci に対する最も一般的な返答表現です。"
          ]
        ]
      }
    ]
}

print(f"Loading {ref_file}...")
with open(ref_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Prepend the new reference
# Check if ref_greetings is already there
exists = any(item.get('id') == 'ref_greetings' for item in data)
if exists:
    print("ref_greetings already exists, replacing it at index 0...")
    data = [item for item in data if item.get('id') != 'ref_greetings']

data.insert(0, new_ref)

print(f"Writing back to {ref_file}...")
with open(ref_file, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Done adding greetings reference!")
