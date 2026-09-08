import json
import re
import os
import sys
sys.stdout.reconfigure(encoding='utf-8')

workspace = r"C:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"

with open(os.path.join(workspace, "rpg", "questions_db.json"), "r", encoding="utf-8") as f:
    questions = json.load(f)

# Import the dictionary
from test_lemma_dict import known_verb_forms, known_adjective_forms

target_tags = set([
    '#present_indicative', '#indicative_present', '#verbs', '#verb_groups',
    '#past_compose', '#imparfait', '#imparfait_vs_past_compose',
    '#futur_simple', '#future_tenses', '#near_future', '#near_past',
    '#subjunctive', '#subjunctive_basic',
    '#conditional', '#conditional_present',
    '#imperative', '#imperative_with_pronouns',
    '#passive', '#passive_voice',
    '#pronominal_verbs', '#passive_pronominal_verbs',
    '#basic_adjectives', '#adjective_agreement', '#comparative', '#superlative',
    '#past_participle_agreement', '#auxiliary_selection', '#gerund_participle',
    '#si_clauses_present', '#si_clauses_imparfait', '#causative_faire'
])

def extract_lemma_for_question(q):
    qid = q.get("id", "")
    text = q.get("text", "")
    ans = q.get("answer", "") or ""
    exp = q.get("explanation", "") or ""
    choices = q.get("choices", []) or []
    tags = q.get("tags", [])

    # Check if text already has lemma like "(manger)", "[manger]", "(couper - tu)"
    if re.search(r'\[[a-zA-ZàâäéèêëîïôöùûüçœæÀÂÄÉÈÊËÎÏÔÖÙÛÜÇŒÆ\'-]+\]', text):
        return None, "Already has bracketed lemma"
    if re.search(r'\([a-zA-ZàâäéèêëîïôöùûüçœæÀÂÄÉÈÊËÎÏÔÖÙÛÜÇŒÆ\'-]+\s*-\s*[a-zA-Z]+\)', text):
        return None, "Already has dash lemma"

    # Specific question IDs manual overrides or direct matches
    manual_overrides = {
        # Comparative & Superlative
        "q_comp_01": "cuire", # cuit
        "q_comp_02": "salé", # salée
        "q_comp_03": "chaud", # chaud
        "q_comp_04": "vite", # vite
        "q_comp_05": "cher", # chères
        "q_comp_06": "bon", # meilleur
        "q_comp_07": "puissant", # puissant
        "q_comp_08": "lourd", # lourde
        "q_comp_09": "bien", # mieux
        "q_comp_10": "courageux", # courageuse
        "q_comp_11": "flèche", # quantité
        "q_comp_12": "mauvais", # pire
        "q_comp_13": "parfumé", # parfumée
        "q_super_01": "grand", # grand
        "q_super_02": "célèbre", # célèbre
        "q_super_03": "cher", # chère
        "q_super_04": "bon", # meilleur
        "q_super_05": "mauvais", # pires
        "q_super_06": "juste", # juste
        "q_super_07": "bon", # meilleure
        "q_super_08": "brave", # braves
        "q_super_09": "bien", # mieux
        "q_super_10": "difficile", # difficile
        "q_super_11": "court", # court
        "q_super_12": "mauvais", # pire
        "q_super_13": "raffiné", # raffinés

        # Auxiliaries & Past Participles
        "q_aux_01": "aller",
        "q_aux_02": "partir",
        "q_aux_03": "préparer",
        "q_aux_04": "finir",
        "q_aux_05": "venir",
        "q_ppa_01": "arriver", # Elle est arrivée
        "q_ppa_02": "cuire", # La tarte que j'ai cuite
        "q_ppa_03": "partir",
        "q_ppa_04": "manger",
        "q_ppa_05": "préparer",

        # Imparfait vs Past Compose
        "q_ivspc_01": "entrer",
        "q_ivspc_02": "faire",
        "q_ivspc_03": "arriver",
        "q_ivspc_04": "travailler",
        "q_ivspc_05": "commencer",

        # Passive
        "q_pass_01": "préparer",
        "q_pass_02": "couper",
        "q_pass_03": "servir",
        "q_pass_04": "dresser",
        "q_pass_05": "cuire",

        # Si clauses
        "q_si_01": "laisser",
        "q_si_02": "ajouter",
        "q_si_03": "être",
        "q_si_04": "avoir",
        "q_si_05": "faire",
    }

    if qid in manual_overrides:
        return manual_overrides[qid], "manual"

    # Try to find lemma from answer
    clean_ans = re.sub(r"[^a-zA-ZàâäéèêëîïôöùûüçœæÀÂÄÉÈÊËÎÏÔÖÙÛÜÇŒÆ'-]", "", ans.strip().lower())
    if clean_ans in known_verb_forms:
        return known_verb_forms[clean_ans], "verb_dict"
    if clean_ans in known_adjective_forms:
        return known_adjective_forms[clean_ans], "adj_dict"

    # Try from choices
    for c in choices:
        c_clean = re.sub(r"[^a-zA-ZàâäéèêëîïôöùûüçœæÀÂÄÉÈÊËÎÏÔÖÙÛÜÇŒÆ'-]", "", c.strip().lower())
        if c_clean in known_verb_forms:
            return known_verb_forms[c_clean], "choice_verb"
        if c_clean in known_adjective_forms:
            return known_adjective_forms[c_clean], "choice_adj"

    # Try from explanation
    m = re.search(r'動詞\s*([a-zA-ZàâäéèêëîïôöùûüçœæÀÂÄÉÈÊËÎÏÔÖÙÛÜÇŒÆ\'-]+)', exp)
    if m:
        return m.group(1), "exp_verb"
    m = re.search(r'形容詞\s*([a-zA-ZàâäéèêëîïôöùûüçœæÀÂÄÉÈÊËÎÏÔÖÙÛÜÇŒÆ\'-]+)', exp)
    if m:
        return m.group(1), "exp_adj"

    return None, "unknown"

unresolved = []
resolved = []

for q in questions:
    tags = q.get("tags", [])
    if any(t in target_tags for t in tags):
        lemma, method = extract_lemma_for_question(q)
        if method.startswith("Already"):
            resolved.append((q["id"], "Already OK", q["text"]))
        elif lemma:
            resolved.append((q["id"], lemma, q["text"]))
        else:
            unresolved.append(q)

print(f"Total target: {len(resolved) + len(unresolved)}")
print(f"Resolved: {len(resolved)}, Unresolved: {len(unresolved)}")

if unresolved:
    print("\n--- Unresolved Questions ---")
    for q in unresolved:
        print(f"ID: {q['id']}, Tags: {q.get('tags')}")
        print(f"  Text: {q['text']}")
        print(f"  Ans: {q.get('answer')}, Choices: {q.get('choices')}")
        print(f"  Exp: {q.get('explanation')}")

