import json
import re

ref_path = "data/grammar_reference.json"

def bold_endings():
    with open(ref_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    # 1. Conjugation patterns: ref_present_indicative
    # 2. Irregular verbs: ref_essential_irregular_verbs
    # 3. Auxiliaries / conjugation patterns: ref_conjugation_patterns, ref_auxiliaries
    # 4. Imperative: ref_imperative
    # 5. Near future / past: ref_near_future_past
    # 6. Pronominal verbs: ref_pronominal_verbs

    for topic in data:
        tid = topic["id"]
        
        if tid == "ref_present_indicative":
            # Table 1: Préparer (-er)
            # Table 2: Finir (-ir)
            for sec in topic["sections"]:
                if sec.get("type") == "table":
                    title = sec.get("title", "")
                    if "Préparer" in title:
                        for row in sec["rows"]:
                            verb = row[1]
                            # Bold endings for préparer: e, es, e, ons, ez, ent
                            if verb.endswith("ent"):
                                row[1] = verb[:-3] + "<b>ent</b>"
                            elif verb.endswith("ons"):
                                row[1] = verb[:-3] + "<b>ons</b>"
                            elif verb.endswith("es"):
                                row[1] = verb[:-2] + "<b>es</b>"
                            elif verb.endswith("ez"):
                                row[1] = verb[:-2] + "<b>ez</b>"
                            elif verb.endswith("e"):
                                row[1] = verb[:-1] + "<b>e</b>"
                    elif "Finir" in title:
                        for row in sec["rows"]:
                            verb = row[1]
                            # Bold endings for finir: is, is, it, issons, issez, issent
                            if verb.endswith("issons"):
                                row[1] = verb[:-6] + "<b>issons</b>"
                            elif verb.endswith("issez"):
                                row[1] = verb[:-5] + "<b>issez</b>"
                            elif verb.endswith("issent"):
                                row[1] = verb[:-6] + "<b>issent</b>"
                            elif verb.endswith("is"):
                                row[1] = verb[:-2] + "<b>is</b>"
                            elif verb.endswith("it"):
                                row[1] = verb[:-2] + "<b>it</b>"
                    elif "不規則動詞" in title:
                        for row in sec["rows"]:
                            # columns: je/j', nous, ils/elles
                            for c in [1, 2, 3]:
                                val = row[c]
                                # bold common irregular endings or whole word if short
                                if val in ["suis", "sommes", "sont", "ai", "avons", "ont"]:
                                    if val == "suis": row[c] = "su<b>is</b>"
                                    elif val == "sommes": row[c] = "som<b>mes</b>"
                                    elif val == "sont": row[c] = "s<b>ont</b>"
                                    elif val == "ai": row[c] = "<b>ai</b>"
                                    elif val == "avons": row[c] = "av<b>ons</b>"
                                    elif val == "ont": row[c] = "<b>ont</b>"
                                elif val in ["fais", "faisons", "font", "vais", "allons", "vont"]:
                                    if val == "fais": row[c] = "fai<b>s</b>"
                                    elif val == "faisons": row[c] = "fais<b>ons</b>"
                                    elif val == "font": row[c] = "f<b>ont</b>"
                                    elif val == "vais": row[c] = "vai<b>s</b>"
                                    elif val == "allons": row[c] = "all<b>ons</b>"
                                    elif val == "vont": row[c] = "v<b>ont</b>"

        elif tid == "ref_essential_irregular_verbs":
            # 1. Faire, 2. Aller, 3. Venir, 4. Prendre
            for sec in topic["sections"]:
                if sec.get("type") == "table" and "rows" in sec:
                    for row in sec["rows"]:
                        verb = row[1]
                        # Faire: fais, fais, fait, faisons, faites, font
                        if "Faire" in sec.get("title", ""):
                            if verb == "fais": row[1] = "fai<b>s</b>"
                            elif verb == "fait": row[1] = "fai<b>t</b>"
                            elif verb == "faisons": row[1] = "fais<b>ons</b>"
                            elif verb == "faites": row[1] = "fai<b>tes</b>"
                            elif verb == "font": row[1] = "f<b>ont</b>"
                        # Aller: vais, vas, va, allons, allez, vont
                        elif "Aller" in sec.get("title", ""):
                            if verb == "vais": row[1] = "vai<b>s</b>"
                            elif verb == "vas": row[1] = "va<b>s</b>"
                            elif verb == "va": row[1] = "va"
                            elif verb == "allons": row[1] = "all<b>ons</b>"
                            elif verb == "allez": row[1] = "all<b>ez</b>"
                            elif verb == "vont": row[1] = "v<b>ont</b>"
                        # Venir: viens, viens, vient, venons, venez, viennent
                        elif "Venir" in sec.get("title", ""):
                            if verb == "viens": row[1] = "vien<b>s</b>"
                            elif verb == "vient": row[1] = "vien<b>t</b>"
                            elif verb == "venons": row[1] = "ven<b>ons</b>"
                            elif verb == "venez": row[1] = "ven<b>ez</b>"
                            elif verb == "viennent": row[1] = "vienn<b>ent</b>"
                        # Prendre: prends, prends, prend, prenons, prenez, prennent
                        elif "Prendre" in sec.get("title", ""):
                            if verb == "prends": row[1] = "prend<b>s</b>"
                            elif verb == "prend": row[1] = "prend"
                            elif verb == "prenons": row[1] = "pren<b>ons</b>"
                            elif verb == "prenez": row[1] = "pren<b>ez</b>"
                            elif verb == "prennent": row[1] = "prenn<b>ent</b>"

        elif tid == "ref_conjugation_patterns":
            # Être, Avoir, Aller
            for sec in topic["sections"]:
                if sec.get("type") == "table" and "rows" in sec:
                    title = sec.get("title", "")
                    for row in sec["rows"]:
                        verb = row[1]
                        if "Être" in title:
                            if verb == "suis": row[1] = "su<b>is</b>"
                            elif verb == "es": row[1] = "<b>es</b>"
                            elif verb == "est": row[1] = "<b>est</b>"
                            elif verb == "sommes": row[1] = "som<b>mes</b>"
                            elif verb == "êtes": row[1] = "êt<b>es</b>"
                            elif verb == "sont": row[1] = "s<b>ont</b>"
                        elif "Avoir" in title:
                            if verb == "ai": row[1] = "<b>ai</b>"
                            elif verb == "as": row[1] = "<b>as</b>"
                            elif verb == "a": row[1] = "<b>a</b>"
                            elif verb == "avons": row[1] = "av<b>ons</b>"
                            elif verb == "avez": row[1] = "av<b>ez</b>"
                            elif verb == "ont": row[1] = "<b>ont</b>"
                        elif "Aller" in title:
                            if verb == "vais": row[1] = "vai<b>s</b>"
                            elif verb == "vas": row[1] = "va<b>s</b>"
                            elif verb == "va": row[1] = "va"
                            elif verb == "allons": row[1] = "all<b>ons</b>"
                            elif verb == "allez": row[1] = "all<b>ez</b>"
                            elif verb == "vont": row[1] = "v<b>ont</b>"

        elif tid == "ref_auxiliaries":
            # Être, Avoir
            for sec in topic["sections"]:
                if sec.get("type") == "table" and "rows" in sec:
                    title = sec.get("title", "")
                    for row in sec["rows"]:
                        # check if the row lists forms of etre or avoir
                        for c in range(len(row)):
                            val = row[c]
                            if val in ["suis", "es", "est", "sommes", "êtes", "sont", "ai", "as", "a", "avons", "avez", "ont"]:
                                if val == "suis": row[c] = "su<b>is</b>"
                                elif val == "es": row[c] = "<b>es</b>"
                                elif val == "est": row[c] = "<b>est</b>"
                                elif val == "sommes": row[c] = "som<b>mes</b>"
                                elif val == "êtes": row[c] = "êt<b>es</b>"
                                elif val == "sont": row[c] = "s<b>ont</b>"
                                elif val == "ai": row[c] = "<b>ai</b>"
                                elif val == "as": row[c] = "<b>as</b>"
                                elif val == "a": row[c] = "<b>a</b>"
                                elif val == "avons": row[c] = "av<b>ons</b>"
                                elif val == "avez": row[c] = "av<b>ez</b>"
                                elif val == "ont": row[c] = "<b>ont</b>"

        elif tid == "ref_imperative":
            # Coupe, Coupez, Coupons, Prends, Prenez, Prenons
            for sec in topic["sections"]:
                if sec.get("type") == "table" and "rows" in sec:
                    for row in sec["rows"]:
                        # Example cell contains: "Coupe les tomates !\nPrends la poêle !"
                        example = row[2]
                        # Let's bold the endings in the example commands!
                        # Coupe -> Coupe (no s), Coupez -> Coup<b>ez</b>, Coupons -> Coup<b>ons</b>
                        # Prends -> Prends (ends with s), Prenez -> Pren<b>ez</b>, Prenons -> Pren<b>ons</b>
                        lines = example.split("\n")
                        new_lines = []
                        for l in lines:
                            if l.startswith("Coupe "):
                                l = l.replace("Coupe", "Coup<b>e</b>")
                            elif l.startswith("Coupez "):
                                l = l.replace("Coupez", "Coup<b>ez</b>")
                            elif l.startswith("Coupons "):
                                l = l.replace("Coupons", "Coup<b>ons</b>")
                            elif l.startswith("Prends "):
                                l = l.replace("Prends", "Prend<b>s</b>")
                            elif l.startswith("Prenez "):
                                l = l.replace("Prenez", "Pren<b>ez</b>")
                            new_lines.append(l)
                        row[2] = "\n".join(new_lines)

        elif tid == "ref_pronominal_verbs":
            # me prépare, te laves, se prépare, nous lavons, vous préparez, se préparent
            # se préparer, se manger
            for sec in topic["sections"]:
                if sec.get("type") == "table" and "rows" in sec:
                    title = sec.get("title", "")
                    if "再帰代名詞" in title:
                        for row in sec["rows"]:
                            ex = row[2] # "Je me prépare."
                            if "prépare" in ex:
                                if "Je me" in ex: ex = ex.replace("prépare", "prépar<b>e</b>")
                                elif "Vous vous" in ex: ex = ex.replace("préparez", "prépar<b>ez</b>")
                                elif "Ils se" in ex: ex = ex.replace("préparent", "prépar<b>ent</b>")
                            elif "laves" in ex: ex = ex.replace("laves", "lav<b>es</b>")
                            elif "lavons" in ex: ex = ex.replace("lavons", "lav<b>ons</b>")
                            elif "prêt" in ex: pass
                            row[2] = ex
                            
                            # Bold the pronoun
                            pron = row[1]
                            row[1] = f"<b>{pron}</b>"
                    elif "受動用法" in title:
                        for row in sec["rows"]:
                            # se préparer, se manger
                            row[0] = row[0].replace("se", "<b>se</b>")
                            # Ça se prépare -> Ça <b>se</b> prépar<b>e</b>
                            ex = row[2]
                            ex = ex.replace("se prépare", "<b>se</b> prépar<b>e</b>")
                            ex = ex.replace("se mange", "<b>se</b> mang<b>e</b>")
                            row[2] = ex

    with open(ref_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print("Grammar reference conjugations bolding completed.")

if __name__ == "__main__":
    bold_endings()
