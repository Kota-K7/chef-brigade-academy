import json
import re

def clean_str(s):
    s = s.lower()
    s = re.sub(r"[.,!?;:・]", "", s)
    s = re.sub(r"\s+", " ", s)
    return s.strip()

with open('rpg/questions_db.json', 'r', encoding='utf-8') as f:
    db = json.load(f)

with open('scratch/broken_questions_report.txt', 'w', encoding='utf-8') as out:
    def print_to_file(*args, **kwargs):
        print(*args, file=out, **kwargs)

    print_to_file(f"Total questions loaded: {len(db)}")

    scramble_errors = []
    choice_errors = []
    cloze_errors = []
    typing_errors = []
    matching_errors = []

    for q in db:
        q_id = q.get('id')
        q_type = q.get('type')
        
        if q_type == 'scramble':
            words = q.get('words', [])
            answer = q.get('answer', '')
            
            clean_words_str = clean_str(" ".join(words))
            clean_words = sorted([w for w in clean_words_str.split(" ") if w])
            
            clean_ans_str = clean_str(answer)
            clean_ans_words = sorted([w for w in clean_ans_str.split(" ") if w])
            
            if clean_words != clean_ans_words:
                scramble_errors.append({
                    'id': q_id,
                    'text': q.get('text'),
                    'words': words,
                    'answer': answer,
                    'clean_words': clean_words,
                    'clean_ans_words': clean_ans_words
                })
                
        elif q_type == 'choice':
            options = q.get('options', [])
            ans_idx = q.get('answerIndex')
            accepted = q.get('acceptedAnswers', [])
            
            if not options:
                choice_errors.append({'id': q_id, 'err': 'No options'})
            elif ans_idx is None or not (isinstance(ans_idx, int)):
                choice_errors.append({'id': q_id, 'err': f'Invalid answerIndex: {ans_idx}'})
            elif ans_idx < 0 or ans_idx >= len(options):
                choice_errors.append({'id': q_id, 'err': f'answerIndex {ans_idx} out of range for options size {len(options)}'})
            else:
                # Check if options[ans_idx] matches accepted answers
                opt_ans = options[ans_idx]
                if accepted and opt_ans not in accepted:
                    choice_errors.append({'id': q_id, 'err': f'Option at answerIndex ({opt_ans}) not in acceptedAnswers {accepted}'})
                    
        elif q_type == 'cloze':
            options = q.get('options', [])
            ans_idx = q.get('answerIndex')
            cloze_text = q.get('clozeText', '')
            accepted = q.get('acceptedAnswers', [])
            
            if not options:
                cloze_errors.append({'id': q_id, 'err': 'No options'})
            elif ans_idx is None or not (isinstance(ans_idx, int)):
                cloze_errors.append({'id': q_id, 'err': f'Invalid answerIndex: {ans_idx}'})
            elif ans_idx < 0 or ans_idx >= len(options):
                cloze_errors.append({'id': q_id, 'err': f'answerIndex {ans_idx} out of range'})
            else:
                opt_ans = options[ans_idx]
                if accepted and opt_ans not in accepted:
                    cloze_errors.append({'id': q_id, 'err': f'Option at answerIndex ({opt_ans}) not in acceptedAnswers {accepted}'})
                
                # Check if cloze_text has bracketed answer and it matches
                match = re.search(r'\[([^\]]+)\]', cloze_text)
                if match:
                    inside = match.group(1)
                    # Check if it matches accepted answers
                    if accepted and inside not in accepted:
                        cloze_errors.append({'id': q_id, 'err': f'Cloze bracket value [{inside}] not in acceptedAnswers {accepted}'})
                else:
                    cloze_errors.append({'id': q_id, 'err': f'No bracketed word in clozeText: "{cloze_text}"'})

        elif q_type == 'typing':
            accepted = q.get('acceptedAnswers', [])
            if not accepted:
                typing_errors.append({'id': q_id, 'err': 'No acceptedAnswers'})
                
        elif q_type == 'matching':
            pairs = q.get('pairs', [])
            if not pairs:
                matching_errors.append({'id': q_id, 'err': 'No pairs'})
            else:
                for p in pairs:
                    if 'left' not in p or 'right' not in p:
                        matching_errors.append({'id': q_id, 'err': f'Invalid pair: {p}'})

    print_to_file(f"\n--- Scramble Errors ({len(scramble_errors)}) ---")
    for err in scramble_errors:
        print_to_file(f"ID: {err['id']}")
        print_to_file(f"  Text: {err['text']}")
        print_to_file(f"  Words: {err['words']}")
        print_to_file(f"  Answer: {err['answer']}")
        print_to_file(f"  Cleaned Words: {err['clean_words']}")
        print_to_file(f"  Cleaned Ans:   {err['clean_ans_words']}")

    print_to_file(f"\n--- Choice Errors ({len(choice_errors)}) ---")
    for err in choice_errors:
        print_to_file(f"ID: {err['id']}: {err['err']}")

    print_to_file(f"\n--- Cloze Errors ({len(cloze_errors)}) ---")
    for err in cloze_errors:
        print_to_file(f"ID: {err['id']}: {err['err']}")

    print_to_file(f"\n--- Typing Errors ({len(typing_errors)}) ---")
    for err in typing_errors:
        print_to_file(f"ID: {err['id']}: {err['err']}")

    print_to_file(f"\n--- Matching Errors ({len(matching_errors)}) ---")
    for err in matching_errors:
        print_to_file(f"ID: {err['id']}: {err['err']}")

