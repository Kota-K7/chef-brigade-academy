import json
import re
import os
import sys
sys.stdout.reconfigure(encoding='utf-8')

workspace = r"C:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"
ref_path = os.path.join(workspace, "data", "grammar_reference.json")

with open(ref_path, "r", encoding="utf-8") as f:
    refs = json.load(f)

print(f"Loaded {len(refs)} references.")

# 1. Check if ref_comparative_superlative already exists
existing_comp = next((r for r in refs if r.get("id") == "ref_comparative_superlative"), None)

new_comp_super_ref = {
  "id": "ref_comparative_superlative",
  "title_fr": "Le comparatif et le superlatif",
  "title_en": "Comparatives and Superlatives",
  "title_ja": "比較級と最上級",
  "definition_fr": "Exprimez la supériorité, l'égalité ou l'infériorité entre deux ou plusieurs éléments avec les adjectifs, adverbes, noms et verbes.",
  "definition_ja": "2つ以上の対象の性質、状態、数量、動作の程度を比較して「〜より…だ」「最も…だ」と表現する文法です。形容詞・副詞・名詞・動詞の比較構造、修飾する名詞との性数一致、および不規則変化（meilleur, mieux, pire など）を学びましょう。",
  "sections": [
    {
      "type": "table",
      "title": "1. 形容詞・副詞の比較級 (Le comparatif des adjectifs)",
      "headers": [
        "比較の種類",
        "基本構造",
        "例文 (フランス語)",
        "日本語訳と解説"
      ],
      "rows": [
        [
          "優等比較 (より〜だ)",
          "plus + 形容詞/副詞 + que ...",
          "Ce couteau est plus tranchant que l'autre.\nCette sauce est plus salée que celle d'hier.",
          "「〜よりも…だ」。形容詞は修飾する主語・名詞の性数に合わせて一致させます（salée = 女性単数）。"
        ],
        [
          "同等比較 (同じくらい〜だ)",
          "aussi + 形容詞/副詞 + que ...",
          "Le four A est aussi chaud que le four B.\nJeanne est aussi courageuse que les chevaliers.",
          "「〜と同じくらい…だ」。形容詞の場合は aussi を用います（※名詞の数量の場合は autant de を用いるので注意）。"
        ],
        [
          "劣等比較 (〜ほど…でない)",
          "moins + 形容詞/副詞 + que ...",
          "Cette préparation est moins grasse que la recette originale.",
          "「〜よりも…でない / 〜ほど…ではない」。形容詞は主語に合わせて性数一致します。"
        ]
      ]
    },
    {
      "type": "table",
      "title": "2. 最上級の構造 (Le superlatif)",
      "headers": [
        "最上級の種類",
        "基本構造",
        "例文 (フランス語)",
        "日本語訳と解説"
      ],
      "rows": [
        [
          "優等最上級 (最も〜)",
          "le / la / les plus + 形容詞 (+ de ...)",
          "C'est le plus grand gâteau du monde.\nC'est la décision la plus sage de l'équipe.\nCe sont les plus beaux plats.",
          "「（〜の中で）最も…だ」。定冠詞（le, la, les）は名詞の性数に一致します。名詞の後ろに形容詞を置く場合、定冠詞を名詞と形容詞の前で2回繰り返します（la décision la plus sage）。"
        ],
        [
          "劣等最上級 (最も〜でない)",
          "le / la / les moins + 形容詞 (+ de ...)",
          "Voici la moins chère bouteille de vin de notre cave.\nC'est le plat le moins calorique de la carte.",
          "「（〜の中で）最も…でない / 一番控えめな」。性数に応じて定冠詞（le/la/les）を選択します。"
        ]
      ]
    },
    {
      "type": "table",
      "title": "3. 特殊な不規則比較級・最上級 (Formes irrégulières)",
      "headers": [
        "原形 (品詞・意味)",
        "比較級 (〜より...)",
        "最上級 (最も...)",
        "解説と注意点"
      ],
      "rows": [
        [
          "bon / bonne / bons / bonnes\n(形容詞: 良い・美味しい)",
          "meilleur / meilleure / meilleurs / meilleures\n(※ plus bon は不可)",
          "le / la / les meilleur(e)(s)\n(※ le plus bon は不可)",
          "bon の優等比較級・最上級は完全不規則変化します。修飾する名詞の性数に合わせて meilleur(e)(s) と性数一致させます。"
        ],
        [
          "bien\n(副詞: よく・上手に)",
          "mieux\n(※ plus bien は不可)",
          "le mieux\n(不変)",
          "動詞を修飾する副詞 bien の比較級は mieux、最上級は常に le mieux（無変化）となります。"
        ],
        [
          "mauvais / mauvaise / mauvais / mauvaises\n(形容詞: 悪い)",
          "pire / pires\n(または plus mauvais)",
          "le / la / les pire(s)\n(または le plus mauvais)",
          "「より悪い / 最悪の」。抽象的な悪さや深刻度には pire / le pire が頻繁に用いられます。"
        ],
        [
          "petit / petite\n(形容詞: 小さい・少ない)",
          "moindre / moindres\n(または plus petit)",
          "le / la / les moindre(s)\n(または le plus petit)",
          "物理的なサイズには plus petit を用い、重要度・程度・重要性などの抽象概念には moindre を用います。"
        ]
      ]
    },
    {
      "type": "table",
      "title": "4. 数量（名詞）および動詞の比較 (Comparatif des quantités et verbes)",
      "headers": [
        "対象",
        "構造",
        "例文 (フランス語)",
        "日本語訳と解説"
      ],
      "rows": [
        [
          "数量・名詞の比較",
          "plus de + 名詞 + que ...\nautant de + 名詞 + que ...\nmoins de + 名詞 + que ...",
          "Nous avons autant de commandes que d'habitude.\nIl a ajouté plus de beurre que nécessaire.",
          "名詞の数量を比較する場合、de（子音前）/ d'（母音前）を挟みます。同等比較は aussi ではなく autant de を用いる点に注意してください。"
        ],
        [
          "動詞（動作）の比較",
          "動詞 + plus que ...\n動詞 + autant que ...\n動詞 + moins que ...",
          "Le chef travaille plus que les autres.\nIl mange autant que son frère.",
          "動作の程度を比較する場合、動詞の直後に plus / autant / moins を置きます。"
        ]
      ]
    }
  ]
}

if existing_comp:
    idx = refs.index(existing_comp)
    refs[idx] = new_comp_super_ref
else:
    # insert after ref_adjective_agreement if possible
    adj_idx = next((i for i, r in enumerate(refs) if r.get("id") == "ref_adjective_agreement"), len(refs))
    refs.insert(adj_idx + 1, new_comp_super_ref)

# 2. Clean Katakana pronunciation from grammar_reference.json
# Remove patterns like "mon (モン)", "ton (トン)", "petit (プティ)", "quel (ケル)" etc.
def clean_katakana_from_cell(cell):
    if not isinstance(cell, str):
        return cell
    
    # Specific known word replacements
    # 1. Pronouns / Articles / Adjectives in parenthesized katakana: e.g. "mon (モン)" -> "mon"
    # Match: (french_letters) (katakana)
    # We want to remove the (katakana) part when it is pure pronunciation note
    # Pattern: r'(\b[a-zA-ZàâäéèêëîïôöùûüçœæÀÂÄÉÈÊËÎÏÔÖÙÛÜÇŒÆ\'-]+)\s*[\(（]([\u30A0-\u30FFー・\s]+)[\)）]'
    def sub_fn(m):
        fr_word = m.group(1)
        katakana = m.group(2).strip()
        # If katakana is just phonetic reading (like モン, トン, プティ, フランセ, etc.)
        # Exclude cases where it's a real Japanese noun/explanation (though in grammar terms it's almost always phonetic)
        return fr_word

    # Handle "C'est (セ)" -> "C'est", "Ce sont (ス ソン)" -> "Ce sont"
    cleaned = re.sub(r"([a-zA-ZàâäéèêëîïôöùûüçœæÀÂÄÉÈÊËÎÏÔÖÙÛÜÇŒÆ\'-]+(?:\s+[a-zA-ZàâäéèêëîïôöùûüçœæÀÂÄÉÈÊËÎÏÔÖÙÛÜÇŒÆ\'-]+)?)\s*[\(（]([\u30A0-\u30FFー・\s]+)[\)）]", r"\1", cell)
    
    # Clean up double spaces or leftover formatting
    cleaned = re.sub(r' +', ' ', cleaned)
    return cleaned

# Also clean header / column if header is "発音" or "発音/解説"
for ref in refs:
    # clean definition/titles
    for sec in ref.get("sections", []):
        headers = sec.get("headers", [])
        rows = sec.get("rows", [])
        
        # Check if there is a header named "発音" or "発音/解説" or "発音・注意点"
        # In ref_greetings: headers = ["表現", "発音/解説", "意味・シチュエーション"]
        # If "発音/解説", we can change it to "解説"
        new_headers = []
        for h in headers:
            if h == "発音":
                new_headers.append("解説")
            elif h == "発音/解説":
                new_headers.append("解説")
            elif h == "発音・注意点":
                new_headers.append("注意点")
            elif h == "発音と変化のポイント":
                new_headers.append("変化のポイント")
            else:
                new_headers.append(h)
        sec["headers"] = new_headers
        
        # Clean rows
        new_rows = []
        for row in rows:
            new_row = []
            for col_idx, c in enumerate(row):
                if isinstance(c, str):
                    c_clean = clean_katakana_from_cell(c)
                    # If this column was purely pronunciation in greetings (e.g. "ボンジュール"), we can put greeting notes or leave empty
                    if ref.get("id") == "ref_greetings" and col_idx == 1:
                        # map greetings pronunciation to notes
                        greetings_notes = {
                            "ボンジュール": "日中の標準的な挨拶。最も頻繁に使われます。",
                            "ボンソワール": "夕方〜夜（日が落ちてから）の挨拶。",
                            "メルスィ": "感謝を伝える最も基本的な表現。",
                            "シル・ヴ・プレ": "vousに対する丁寧な依頼表現（直訳: もしあなたがお気に召すなら）。",
                            "アンシャンテ": "初対面の挨拶。女性が言う場合は Enchantée と綴ります。",
                            "オ・ルヴォワール": "別れ際の標準的な表現（直訳: 再び会うまで）。",
                            "ア・ビアント": "「また近いうちに」という意味の親しい挨拶。"
                        }
                        if c in greetings_notes:
                            c_clean = greetings_notes[c]
                    # ref_essential_irregular_verbs: Faire, Aller, Venir, Prendre pronunciation col
                    if ref.get("id") == "ref_essential_irregular_verbs" and col_idx == 2 and sec.get("headers")[col_idx] == "解説":
                        # If cell is just katakana like "ジュ フェ", replace with grammatical note
                        if re.fullmatch(r'[\u30A0-\u30FFー・\s]+', c.strip()):
                            c_clean = "-"
                    # ref_numbers: if col is purely katakana, replace with '-' or note
                    if ref.get("id") == "ref_numbers":
                        if re.fullmatch(r'[\u30A0-\u30FFー・\s]+', c.strip()):
                            c_clean = "-"
                    if ref.get("id") == "ref_time_expressions":
                        if re.fullmatch(r'[\u30A0-\u30FFー・\s]+', c.strip()):
                            c_clean = "-"
                    if ref.get("id") == "ref_contracted_articles":
                        if re.fullmatch(r'[\u30A0-\u30FFー・\s]+', c.strip()):
                            c_clean = "-"
                    new_row.append(c_clean)
                else:
                    new_row.append(c)
            new_rows.append(new_row)
        sec["rows"] = new_rows

with open(ref_path, "w", encoding="utf-8") as f:
    json.dump(refs, f, ensure_ascii=False, indent=2)

print("Updated grammar_reference.json successfully.")
