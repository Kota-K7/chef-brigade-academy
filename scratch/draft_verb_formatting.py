import json
import re

with open('rpg/questions_db.json', 'r', encoding='utf-8') as f:
    db = json.load(f)

verb_tags = {
    '#etre', '#avoir', '#verbs', '#irregular_verbs_major', '#irregular_verbs_1',
    '#past_compose', '#imparfait', '#subjunctive_basic', '#futur_simple', '#conditional_present'
}

# Mapping of question ID to specific infinitive verb for questions where it's not easily regexed:
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
}

changes = []

for q in db:
    q_id = q.get('id')
    q_type = q.get('type')
    q_tags = q.get('tags', [])
    text = q.get('text', '')
    
    # We only care about questions that ask about conjugations (choice, cloze, typing)
    if q_type not in ['choice', 'cloze', 'typing']:
        continue
        
    has_verb_tag = any(t in verb_tags for t in q_tags)
    if not has_verb_tag:
        continue
        
    # Check if there is already brackets around the verb.
    # Exclude general questions about verb classifications like "第一群規則動詞" or "不定詞"
    if "第一群" in text or "第二群" in text or "第三群" in text or "分類" in text or "規則" in text:
        # Check if they actually ask about a specific conjugation:
        if not ("の現在形活用" in text or "の活用" in text or "の過去" in text or "の未来" in text):
            continue
            
    # Try to find verb name in the text
    # e.g., "動詞 être の現在形", "動詞 couper の Je", "finir の現在形活用"
    verb = None
    
    # 1. Check manual mapping first
    if q_id in manual_infinitives:
        verb = manual_infinitives[q_id]
    else:
        # 2. Match "動詞 <verb_name>" or "動詞 <verb_name> の"
        match1 = re.search(r'動詞\s+([a-zA-Zâêîôûäëïöüéèàùç\']+)', text)
        if match1:
            verb = match1.group(1)
        else:
            # 3. Match "<verb_name> の現在形活用" or "<verb_name> の活用"
            match2 = re.search(r'([a-zA-Zâêîôûäëïöüéèàùç\']+)\s+の(?:現在形活用|活用|現在形)', text)
            if match2:
                verb = match2.group(1)
            else:
                # 4. Match "(<verb_name>)" in the Japanese text, e.g. "finir の現在形"
                match3 = re.search(r'([a-zA-Zâêîôûäëïöüéèàùç\']+)\s+の', text)
                if match3:
                    verb = match3.group(1)

    if verb:
        # Clean verb name (remove any trailing spaces or punctuation)
        verb = verb.strip()
        # If it's already bracketed, don't change
        if f"[{verb}]" in text:
            continue
            
        # Propose replacement
        # We want to replace the occurrences of the verb in the Japanese part of the prompt
        # (usually before the parentheses) with [verb].
        # For example, "動詞 être の" -> "動詞 [être] の"
        # "finir の現在形活用" -> "[finir] の現在形活用"
        
        new_text = text
        # If it's manual, we can append it if not present, or replace
        if q_id in manual_infinitives:
            # For these, let's insert it nicely.
            # E.g. "Remplissez le vide : 'Nous ___ fini le service'"
            # -> "Remplissez le vide (動詞 [avoir]) : ..."
            # Let's inspect where to insert:
            # Find the colon or parenthesis
            if "Remplissez le vide" in text:
                new_text = text.replace("Remplissez le vide", f"Remplissez le vide (動詞 [{verb}])")
            elif "Complétez" in text:
                new_text = text.replace("Complétez", f"Complétez (動詞 [{verb}])")
            elif "Si j'avais" in text:
                # E.g. "Si j'avais du temps, je ___" -> add (動詞 [faire])
                new_text = text.replace("Complétez :", f"Complétez (動詞 [{verb}]) :")
            else:
                # Fallback: append at the beginning of the parenthesis or at the end
                new_text = text + f" [{verb}]"
        else:
            # Replace '動詞 <verb>' with '動詞 [<verb>]'
            new_text = re.sub(rf'動詞\s+{re.escape(verb)}', f'動詞 [{verb}]', new_text)
            # Replace '<verb> の' with '[<verb>] の'
            new_text = re.sub(rf'\b{re.escape(verb)}\b\s+の', f'[{verb}] の', new_text)
            # Also replace the French part if it specifies it in parenthesis like (finir) -> ([finir])
            new_text = re.sub(rf'\({re.escape(verb)}\)', f'([{verb}])', new_text)
            
        if new_text != text:
            changes.append({
                'id': q_id,
                'old': text,
                'new': new_text,
                'verb': verb
            })

with open('scratch/proposed_verb_changes.txt', 'w', encoding='utf-8') as out:
    out.write(f"Total proposed changes: {len(changes)}\n\n")
    for chg in changes:
        out.write(f"ID: {chg['id']} (Verb: {chg['verb']})\n")
        out.write(f"  Old: {chg['old']}\n")
        out.write(f"  New: {chg['new']}\n\n")
