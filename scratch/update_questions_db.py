import json
import re
import os
import sys
sys.stdout.reconfigure(encoding='utf-8')

workspace = r"C:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"
qdb_path = os.path.join(workspace, "rpg", "questions_db.json")

with open(qdb_path, "r", encoding="utf-8") as f:
    questions = json.load(f)

print(f"Loaded {len(questions)} questions from questions_db.json")

# Enhanced explanations for comparative and superlative questions
enhanced_comp_super_exps = {
    "q_comp_01": "優等比較級は「plus + 形容詞/副詞 + que (〜より…だ)」の構造を取ります。ここでは形容詞 cuit（焼けた）を挟み、「plus cuit que」となります。",
    "q_comp_02": "劣等比較級は「moins + 形容詞/副詞 + que (〜より…でない)」の構造を取ります。主語 Cette sauce（女性単数）に合わせて形容詞 salée と性数一致し、「moins salée que」となります。",
    "q_comp_03": "同等比較級は「aussi + 形容詞/副詞 + que (〜と同じくらい…だ)」の構造を取ります。形容詞 chaud を修飾して「aussi chaud que」となります（※数量名詞の場合は autant de を用います）。",
    "q_comp_04": "副詞 vite（速く）の優等比較級は「plus + 副詞 + que」で「plus vite que（〜より速く）」となります。",
    "q_comp_05": "「夏ほど高くない（＝安い）」という劣等比較を表すため、「moins + 形容詞 + que」を使用します。主語 Les pommes（女性複数）に合わせて chères と性数一致します。",
    "q_comp_06": "形容詞 bon（良い・美味しい）の優等比較級は完全不規則変化し、plus bon ではなく「meilleur(e)(s)」となります。主語 Ce vin（男性単数）に合わせて「meilleur」となります。",
    "q_comp_07": "形容詞 puissans（強大な）の優等比較級は「plus + 形容詞 + que」で構成され、「plus puissant que」となります。",
    "q_comp_08": "「〜ほど重くない」という劣等比較級は「moins + 形容詞 + que」です。主語 Cette épée（女性単数）に合わせて lourde と性数一致します。",
    "q_comp_09": "副詞 bien（よく・上手に）の比較級は完全不規則変化で「mieux（より上手に）」となります（※ plus bien は不可）。動詞 cuisiner を修飾します。",
    "q_comp_10": "形容詞 courageuse（勇敢な: 女性単数）の同等比較級は「aussi + 形容詞 + que」で「aussi courageuse que」となります。",
    "q_comp_11": "名詞の数量を比較する同等比較級は「autant de + 名詞 + que」となります。形容詞の aussi と混同しないよう注意が必要です。",
    "q_comp_12": "形容詞 mauvais（悪い）の比較級は不規則変化で「pire」（または plus mauvais）となります。「状況が先週よりも悪い」を表します。",
    "q_comp_13": "形容詞 parfumée（香り高い: 女性単数）の優等比較級は「plus + 形容詞 + que」で「plus parfumée que」となります。",
    "q_super_01": "最上級の基本構造は「定冠詞 (le/la/les) + plus/moins + 形容詞 (+ de ...)」です。修飾名詞 gâteau（男性単数）に合わせて定冠詞 le を用い、「le plus grand」となります。",
    "q_super_02": "最上級の構造は「定冠詞 + plus + 形容詞」です。restaurant（男性単数）を修飾するため「le plus célèbre」となります。",
    "q_super_03": "劣等最上級は「定冠詞 + moins + 形容詞」です。修飾名詞 bouteille（女性単数）に合わせて定冠詞 la を用い、「la moins chère」となります。",
    "q_super_04": "形容詞 bon（美味しい・良い）の最上級は完全不規則変化し、le plus bon ではなく「le / la / les meilleur(e)(s)」となります。plat（男性単数）なので「le meilleur」です。",
    "q_super_05": "形容詞 mauvais（悪い）の最上級は不規則変化で「les pires（最悪の）」となります。複数名詞 conditions に合わせて複数形 pires を用います。",
    "q_super_06": "最上級の構造は「定冠詞 + plus + 形容詞」です。名詞の後ろに形容詞が置かれる場合、定冠詞を再度重ねて「le roi le plus juste」となります。",
    "q_super_07": "形容詞 bon の女性単数最上級は不規則変化で「la meilleure」となります（※ la plus bonne は不可）。女性名詞 soupe に一致します。",
    "q_super_08": "複数名詞 guerriers（戦士たち）を修飾する最上級は「les plus + 形容詞（複数一致）」で「les plus braves」となります。",
    "q_super_09": "動詞 combattre（戦う）を修飾する副詞 bien の最上級は常に無変化で「le mieux（最も巧みに・最もよく）」となります。",
    "q_super_10": "女性名詞 forteresse（要塞）を修飾する最上級は女性定冠詞 la を用いて「la plus difficile」となります。",
    "q_super_11": "男性名詞 chemin（道）を修飾する最上級は男性定冠詞 le を用いて「le plus court」となります。",
    "q_super_12": "形容詞 mauvais の女性単数最上級は不規則変化で「la pire（最悪の）」となります。女性名詞 décision に一致します。",
    "q_super_13": "男性複数名詞 plats を修飾する最上級は複数定冠詞 les を用いて「les plus raffinés」と性数一致します。"
}

# Specific lemma mappings for questions needing base form attached
# Format: qid: base_form_string (e.g. "manger", "bon", etc.)
lemma_map = {
    # Comparative & Superlative
    "q_comp_01": "cuire",
    "q_comp_02": "salé",
    "q_comp_03": "chaud",
    "q_comp_04": "vite",
    "q_comp_05": "cher",
    "q_comp_06": "bon",
    "q_comp_07": "puissant",
    "q_comp_08": "lourd",
    "q_comp_09": "bien",
    "q_comp_10": "courageux",
    "q_comp_12": "mauvais",
    "q_comp_13": "parfumé",
    "q_super_01": "grand",
    "q_super_02": "célèbre",
    "q_super_03": "cher",
    "q_super_04": "bon",
    "q_super_05": "mauvais",
    "q_super_06": "juste",
    "q_super_07": "bon",
    "q_super_08": "brave",
    "q_super_09": "bien",
    "q_super_10": "difficile",
    "q_super_11": "court",
    "q_super_12": "mauvais",
    "q_super_13": "raffiné",

    # Basic Adjectives & Adjective Agreement
    "q_adj_01": "petit",
    "q_adj_02": "frais",
    "q_adj_03": "chaud",
    "q_adj_04": "délicieux",
    "q_adj_05": "blanc",
    "q_adj_06": "bon",
    "q_adj_07": "nouveau",
    "q_adj_08": "vieux",
    "q_adj_09": "grand",
    "q_adj_10": "sec",
    "q_adj_11": "vert",
    "q_adj_12": "rouge",
    "q_adj_13": "noir",
    "q_career_1_3_adj_1": "chaud",
    "q_career_1_3_adj_2": "frais",
    "q_career_1_3_adj_pos_1": "bon",
    "q_career_1_3_adj_pos_2": "rouge",

    # Indicative Present & Verbs
    "q_pres_01": "être",
    "q_pres_02": "avoir",
    "q_pres_03": "aller",
    "q_pres_04": "faire",
    "q_pres_05": "manger",
    "q_pres_06": "finir",
    "q_pres_07": "prendre",
    "q_pres_08": "venir",
    "q_pres_09": "pouvoir",
    "q_pres_10": "vouloir",
    "q_pres_11": "devoir",
    "q_pres_12": "savoir",
    "q_pres_13": "mettre",
    "q_pres_14": "voir",
    "q_career_0_2_etre_1": "être",
    "q_career_0_2_etre_2": "être",
    "q_career_0_3_avoir_1": "avoir",
    "q_career_0_3_avoir_2": "avoir",
    "q_career_1_1_verb_er_1": "manger",
    "q_career_1_1_verb_er_2": "couper",
    "q_career_1_2_irreg_1": "faire",
    "q_career_1_2_irreg_2": "prendre",

    # Near Future & Near Past
    "q_career_2_3_near_future_1": "aller",
    "q_career_2_3_near_future_2": "aller",
    "q_career_2_3_near_past_1": "venir",
    "q_career_2_3_near_past_2": "venir",
    "q_nf_01": "aller",
    "q_nf_02": "aller",
    "q_nf_03": "aller",
    "q_np_01": "venir",
    "q_np_02": "venir",
    "q_np_03": "venir",

    # Passé Composé & Auxiliaries & Agreement
    "q_pc_01": "avoir",
    "q_pc_02": "avoir",
    "q_pc_03": "être",
    "q_pc_04": "avoir",
    "q_pc_05": "être",
    "q_pc_06": "partir",
    "q_pc_07": "vendre",
    "q_pc_08": "arriver",
    "q_pc_09": "mourir",
    "q_pc_10": "faire",
    "q_pc_11": "prendre",
    "q_pc_12": "finir",
    "q_pc_13": "voir",
    "q_aux_01": "aller",
    "q_aux_02": "partir",
    "q_aux_03": "préparer",
    "q_aux_04": "finir",
    "q_aux_05": "venir",
    "q_ppa_01": "arriver",
    "q_ppa_02": "cuire",
    "q_ppa_03": "partir",
    "q_ppa_04": "manger",
    "q_ppa_05": "préparer",
    "q_ppa_06": "écrire",
    "q_ppa_07": "forger",
    "q_ppa_08": "rencontrer",
    "q_ppa_09": "perdre",
    "q_ppa_10": "cuire",
    "q_ppa_11": "prendre",
    "q_ppa_12": "construire",
    "q_ppa_13": "laver",
    "q_career_3_2_pc_1": "préparer",
    "q_career_3_2_pc_2": "finir",
    "q_career_3_2_aux_1": "partir",
    "q_career_3_2_ppa_1": "venir",
    "q_career_3_2_ppa_2": "cuire",

    # Imparfait & Imparfait vs PC
    "q_imp_01": "être",
    "q_imp_02": "avoir",
    "q_imp_03": "faire",
    "q_imp_04": "vouloir",
    "q_imp_05": "cuisiner",
    "q_imp_06": "travailler",
    "q_imp_07": "aimer",
    "q_imp_08": "pouvoir",
    "q_imp_09": "savoir",
    "q_imp_10": "devoir",
    "q_imp_11": "prendre",
    "q_imp_12": "vivre",
    "q_imp_13": "régner",
    "q_ivspc_01": "entrer",
    "q_ivspc_02": "faire",
    "q_ivspc_03": "arriver",
    "q_ivspc_04": "travailler",
    "q_ivspc_05": "commencer",
    "q_ivspc_06": "dormir",
    "q_ivspc_07": "partir",
    "q_ivspc_08": "manger",
    "q_ivspc_09": "sonner",
    "q_ivspc_10": "écrire",
    "q_career_3_3_imp_1": "être",
    "q_career_3_3_imp_2": "avoir",
    "q_career_3_3_ivspc_1": "entrer",
    "q_career_3_3_ivspc_2": "commencer",

    # Futur Simple
    "q_fut_01": "préparer",
    "q_fut_02": "goûter",
    "q_fut_03": "être",
    "q_fut_04": "avoir",
    "q_fut_05": "aller",
    "q_fut_06": "faire",
    "q_fut_07": "venir",
    "q_fut_08": "voir",
    "q_fut_09": "pouvoir",
    "q_fut_10": "vouloir",
    "q_fut_11": "savoir",
    "q_fut_12": "prendre",
    "q_fut_13": "finir",
    "q_career_4_1_fut_1": "préparer",
    "q_career_4_1_fut_2": "être",

    # Conditionnel
    "q_cond_01": "vouloir",
    "q_cond_02": "devoir",
    "q_cond_03": "aimer",
    "q_cond_04": "pouvoir",
    "q_cond_05": "faire",
    "q_cond_06": "être",
    "q_cond_07": "avoir",
    "q_cond_08": "aller",
    "q_cond_09": "venir",
    "q_cond_10": "savoir",
    "q_career_4_1_cond_1": "vouloir",
    "q_career_4_1_cond_2": "aimer",

    # Subjonctif
    "q_sub_01": "cuire",
    "q_sub_02": "faire",
    "q_sub_03": "être",
    "q_sub_04": "avoir",
    "q_sub_05": "aller",
    "q_sub_06": "venir",
    "q_sub_07": "prendre",
    "q_sub_08": "savoir",
    "q_sub_09": "pouvoir",
    "q_sub_10": "vouloir",
    "q_sub_11": "finir",
    "q_sub_12": "mettre",
    "q_sub_13": "préparer",
    "q_career_4_3_sub_1": "faire",
    "q_career_4_3_sub_2": "être",

    # Imperative & Imperative with pronouns
    "q_career_2_2_imperative_1": "couper",
    "q_career_2_2_imperative_2": "finir",
    "q_imp_01_cmd": "laisser",
    "q_imp_02_cmd": "ajouter",
    "q_imp_03_cmd": "faire",
    "q_imp_pr_01": "donner",
    "q_imp_pr_02": "donner",
    "q_imp_pr_03": "apporter",
    "q_imp_pr_04": "passer",
    "q_imp_pr_05": "servir",

    # Passive & Pronominal & Causative & Si Clauses
    "q_pass_01": "être",
    "q_pass_02": "être",
    "q_pass_03": "être",
    "q_pass_04": "être",
    "q_pass_05": "être",
    "q_pass_06": "reprendre",
    "q_pass_09": "reconstruire",
    "q_pass_12": "occuper",
    "q_pass_13": "découvrir",
    "q_pass_14": "promulguer",
    "q_pronom_01": "se lever",
    "q_pronom_02": "se laver",
    "q_pronom_03": "se préparer",
    "q_career_2_3_passive_pronominal_1": "se préparer",
    "q_pv_add_01": "se servir",
    "q_causative_01": "faire",
    "q_causative_02": "bouillir",
    "q_causative_03": "cuire",
    "q_causative_04": "refroidir",
    "q_causative_05": "monter",
    "q_si_01": "laisser",
    "q_si_02": "ajouter",
    "q_si_03": "être",
    "q_si_04": "avoir",
    "q_si_05": "faire",
    "q_si_06": "venir",
    "q_si_07": "prendre",
    "q_si_08": "aller",
    "q_si_09": "partir",
    "q_si_10": "apporter",
    "q_si_11": "pouvoir",
    "q_si_12": "avertir",
    "q_gp_01": "couper",
    "q_gp_02": "forger"
}

def clean_katakana_from_text(text):
    if not isinstance(text, str):
        return text
    
    # Remove French pronunciation note in katakana: e.g. "avez (ヴザヴェ)", "l'eau (ロー)", "revoir (オ・ルヴォワール)", "Bonjour（ボンジュール）"
    # Specific targeted phonetic kana patterns
    phonetic_patterns = [
        r'\s*[\(（]ヴザヴェ[\)）]',
        r'\s*[\(（]ロー[\)）]',
        r'\s*[\(（]アン・シェフ[\)）]',
        r'\s*[\(（]リュイル[\)）]',
        r'\s*[\(（]ブフ[\)）]',
        r'\s*[\(（]ポール[\)）]',
        r'\s*[\(（]ヴォー[\)）]',
        r'\s*[\(（]アニョー[\)）]',
        r'\s*[\(（]カナール[\)）]',
        r'\s*[\(（]プレ[\)）]',
        r'\s*[\(（]ポワヴル[\)）]',
        r'\s*[\(（]ユイル・ドリーブ[\)）]',
        r'\s*[\(（]ファリーヌ[\)）]',
        r'\s*[\(（]ウフ[\)）]',
        r'\s*[\(（]シュクル[\)）]',
        r'\s*[\(（]ヴィネグル[\)）]',
        r'\s*[\(（]ヴァン[\)）]',
        r'\s*[\(（]ミザンプラス[\)）]',
        r'\s*[\(（]オ・ルヴォワール[\)）]',
        r'\s*[\(（]ボンソワール[\)）]',
        r'\s*[\(（]ボンジュール[\)）]',
        r'\s*[\(（]パルダン[\)）]',
        r'\s*[\(（]ドゥマン[\)）]',
        r'\s*[\(（]ロティール[\)）]',
        r'\s*[\(（]フルーレ[\)）]',
        r'\s*[\(（]リトー[\)）]',
        r'\s*[\(（]タブリエ[\)）]',
        r'\s*[\(（]トック[\)）]',
        r'\s*[\(（]フエ[\)）]',
        r'\s*[\(（]ジェロンディフ[\)）]',
        r'\s*[\(（]ドゥ[\)）]',
        r'\s*[\(（]モン[\)）]',
        r'\s*[\(（]トン[\)）]',
        r'\s*[\(（]ソン[\)）]',
        r'\s*[\(（]マ[\)）]',
        r'\s*[\(（]タ[\)）]',
        r'\s*[\(（]サ[\)）]',
        r'\s*[\(（]メ[\)）]',
        r'\s*[\(（]テ[\)）]',
        r'\s*[\(（]セ[\)）]',
        r'\s*[\(（]ノートル[\)）]',
        r'\s*[\(（]ヴォートル[\)）]',
        r'\s*[\(（]ルール[\)）]',
        r'\s*[\(（]プティ[\)）]',
        r'\s*[\(（]プティトゥ[\)）]',
        r'\s*[\(（]フランセ[\)）]',
        r'\s*[\(（]フランセーズ[\)）]',
        r'\s*[\(（]ジャポネ[\)）]',
        r'\s*[\(（]ジャポネーズ[\)）]',
        r'\s*[\(（]イタリヤン[\)）]',
        r'\s*[\(（]イタリエンヌ[\)）]',
        r'\s*[\(（]サン[\)）]',
        r'\s*[\(（]ミル[\)）]',
        r'\s*[\(（]プルミエ[\)）]',
        r'\s*[\(（]プルミエール[\)）]',
        r'\s*[\(（]ケル[\)）]',
        r'\s*[\(（]ス ソン[\)）]',
        r'\s*[\(（]セットニオン[\)）]'
    ]
    for pat in phonetic_patterns:
        text = re.sub(pat, '', text)
    
    return text

# Process all questions
updated_count = 0
for q in questions:
    qid = q.get("id", "")
    text = q.get("text", "")
    exp = q.get("explanation", "")
    
    # 1. Clean katakana pronunciation from text and explanation
    text = clean_katakana_from_text(text)
    exp = clean_katakana_from_text(exp)
    
    # 2. Check if this is a comparative or superlative question for explanation enhancement
    if qid in enhanced_comp_super_exps:
        exp = enhanced_comp_super_exps[qid]
    
    # 3. Attach lemma/base form if applicable
    if qid in lemma_map:
        lemma = lemma_map[qid]
        # Check if lemma is already in text
        # If not, add (lemma) before the Japanese translation or at appropriate position
        if f"({lemma})" not in text and f"[{lemma}]" not in text and f"'{lemma}'" not in text:
            # Pattern: text ends with (日本語訳) -> insert (lemma) before (日本語訳)
            m = re.search(r'(\s*\([^\(\)]*[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]+[^\(\)]*\)\s*)$', text)
            if m:
                jp_part = m.group(1)
                base_part = text[:m.start(1)].rstrip()
                text = f"{base_part} ({lemma}) {jp_part.strip()}"
            else:
                text = f"{text} ({lemma})"
    
    q["text"] = text
    q["explanation"] = exp

with open(qdb_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, ensure_ascii=False, indent=2)

print("Updated questions_db.json successfully.")

