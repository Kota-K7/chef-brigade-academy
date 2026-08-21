import json
import re

# Load the questions database
with open('rpg/questions_db.json', 'r', encoding='utf-8') as f:
    db = json.load(f)

# 1. Fix scramble questions
scramble_fixes = {
    'q_va_11': {
        'words': ["couteau.", "un", "J'ai"]
    },
    'q_ne_11': {
        'words': ["couteau.", "pas", "de", "n'ai", "Je"]
    }
}

# 2. Infinitive bracket additions config
verb_tags = {
    '#etre', '#avoir', '#verbs', '#irregular_verbs_major', '#irregular_verbs_1',
    '#past_compose', '#imparfait', '#subjunctive_basic', '#futur_simple', '#conditional_present'
}

manual_infinitives = {
    'q_pc_01': 'avoir',
    'q_pc_02': 'avoir',
    'q_pc_03': 'avoir',
    'q_pc_04': 'avoir',
    'q_pc_05': 'avoir',
    'q_imp_01': 'être',
    'q_imp_02': 'avoir',
    'q_imp_03': 'faire',
    'q_imp_04': 'faire',
    'q_imp_05': 'être',
    'q_sub_01': 'cuire',
    'q_sub_02': 'faire',
    'q_sub_03': 'être',
    'q_sub_04': 'connaître',
    'q_sub_05': 'être',
    'q_fut_01': 'préparer',
    'q_fut_02': 'goûter',
    'q_fut_03': 'fermer',
    'q_fut_04': 'créer',
    'q_cond_01': 'vouloir',
    'q_cond_02': 'devoir',
    'q_cond_03': 'faire',
    'q_cond_04': 'vouloir',
    'q_gp_01': 'couper',
    'q_gp_03': 'goûter',
    'q_gp_04': 'écouter',
    'q_gp_05': 'cuisiner',
    'q_causative_01': 'faire',
    'q_causative_02': 'faire',
    'q_causative_03': 'faire',
    'q_causative_04': 'faire',
    'q_causative_05': 'faire',
    'q_verb_etre_add_9': 'être'
}

patched_count = 0
verb_patched_count = 0

for q in db:
    q_id = q.get('id')
    q_type = q.get('type')
    q_tags = q.get('tags', [])
    text = q.get('text', '')
    
    # Apply scramble fixes
    if q_id in scramble_fixes:
        for k, v in scramble_fixes[q_id].items():
            q[k] = v
        patched_count += 1
        continue
        
    # Apply verb brackets formatting
    if q_type not in ['choice', 'cloze', 'typing']:
        continue
        
    has_verb_tag = any(t in verb_tags for t in q_tags)
    if not has_verb_tag:
        continue
        
    if "第一群" in text or "第二群" in text or "第三群" in text or "分類" in text or "規則" in text:
        if not ("の現在形活用" in text or "の活用" in text or "の過去" in text or "の未来" in text):
            continue
            
    verb = None
    if q_id in manual_infinitives:
        verb = manual_infinitives[q_id]
    else:
        match1 = re.search(r'動詞\s+([a-zA-Zâêîôûäëïöüéèàùç\']+)', text)
        if match1:
            verb = match1.group(1)
        else:
            match2 = re.search(r'([a-zA-Zâêîôûäëïöüéèàùç\']+)\s+の(?:現在形活用|活用|現在形)', text)
            if match2:
                verb = match2.group(1)
            else:
                match3 = re.search(r'([a-zA-Zâêîôûäëïöüéèàùç\']+)\s+の', text)
                if match3:
                    verb = match3.group(1)

    if verb:
        verb = verb.strip()
        if f"[{verb}]" in text:
            continue
            
        new_text = text
        if q_id == 'q_verb_etre_add_9':
            new_text = text.replace("est の不定形動詞は何ですか？", "est の不定形動詞 [être] は何ですか？")
        elif q_id in manual_infinitives:
            if "Remplissez le vide" in text:
                new_text = text.replace("Remplissez le vide", f"Remplissez le vide (動詞 [{verb}])")
            elif "Complétez" in text:
                new_text = text.replace("Complétez", f"Complétez (動詞 [{verb}])")
            elif "Si j'avais" in text:
                new_text = text.replace("Complétez :", f"Complétez (動詞 [{verb}]) :")
            else:
                new_text = text + f" [{verb}]"
        else:
            new_text = re.sub(rf'動詞\s+{re.escape(verb)}', f'動詞 [{verb}]', new_text)
            new_text = re.sub(rf'\b{re.escape(verb)}\b\s+の', f'[{verb}] の', new_text)
            new_text = re.sub(rf'\({re.escape(verb)}\)', f'([{verb}])', new_text)
            
        if new_text != text:
            q['text'] = new_text
            verb_patched_count += 1

print(f"Scramble questions patched: {patched_count}")
print(f"Verb conjugation questions formatted: {verb_patched_count}")

# Save the patched questions database
with open('rpg/questions_db.json', 'w', encoding='utf-8') as f:
    json.dump(db, f, ensure_ascii=False, indent=2)
