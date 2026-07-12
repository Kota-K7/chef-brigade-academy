import json
import os
import sys

try:
    sys.stdout.reconfigure(encoding='utf-8')
except AttributeError:
    pass

CATEGORIES = [
    "Vocabulary", "Grammar", "Theory", "Service", 
    "Philosophy", "Techniques", "Brigade", "Equipment", 
    "General", "Verbs"
]

def capitalize_term(s):
    if not s:
        return s
    s = s.strip()
    return s[0].upper() + s[1:]

def add_pos_to_japanese(item):
    ja = item.get("japanese", "").strip()
    if not ja:
        return
    
    # Check if already has POS prefix like (Nom), (Verbe), etc.
    if ja.startswith("(") or ja.startswith("（"):
        # Check if it starts with known POS patterns
        if any(ja.startswith(prefix) for prefix in ["(Nom)", "(Verbe)", "(Adj)", "(Adv)", "（Nom）", "（Verbe）", "（Adj）", "（Adv）"]):
            return
            
    tags = item.get("tags", [])
    pos_prefix = ""
    if "Verbe" in tags:
        pos_prefix = "(Verbe) "
    elif "Nom" in tags:
        pos_prefix = "(Nom) "
    elif "Adj" in tags or "Adjectif" in tags:
        pos_prefix = "(Adj) "
    elif "Adv" in tags or "Adverbe" in tags:
        pos_prefix = "(Adv) "
        
    if pos_prefix:
        item["japanese"] = pos_prefix + ja

def sort_key(item):
    cat = item.get("category", "")
    try:
        cat_idx = CATEGORIES.index(cat)
    except ValueError:
        cat_idx = len(CATEGORIES)
        
    sort_text = ""
    if "french" in item and item["french"]:
        sort_text = item["french"].lower()
    elif "grammar" in item and isinstance(item["grammar"], dict):
        sort_text = item["grammar"].get("topic", "").lower()
    elif "cuisine" in item and isinstance(item["cuisine"], dict):
        sort_text = item["cuisine"].get("topic", "").lower()
    elif "id" in item:
        sort_text = item["id"].lower()
        
    return (cat_idx, sort_text)

def main():
    data_dir = 'data'
    
    # Load A1, A2, B2 databases
    a1_path = os.path.join(data_dir, 'knowledge_A1.json')
    a2_path = os.path.join(data_dir, 'knowledge_A2.json')
    b2_path = os.path.join(data_dir, 'knowledge_B2.json')
    
    with open(a1_path, 'r', encoding='utf-8') as f:
        a1_items = json.load(f)
    with open(a2_path, 'r', encoding='utf-8') as f:
        a2_items = json.load(f)
    with open(b2_path, 'r', encoding='utf-8') as f:
        b2_items = json.load(f)
        
    # --- 1. Clean up B2 Level Duplicates ---
    # (vocab_degorger and vocab_singer will be kept in B2 but removed from A2)
    # So we don't need to modify B2's items themselves unless there are other issues.
    
    # --- 2. Clean up A2 Level ---
    # Remove duplicate vocab_sauter, vocab_degorger, vocab_singer from A2
    cleaned_a2 = []
    seen_a2_ids = set()
    for item in a2_items:
        iid = item.get("id")
        # sauter is kept in A2 (as the primary definition), but we remove duplicate entries if any
        # degorger and singer are removed from A2 because they exist as B2 terms
        if iid in ["vocab_degorger", "vocab_singer"]:
            print(f"Removing {iid} from A2 (moves/kept in B2)")
            continue
        if iid in seen_a2_ids:
            print(f"Removing duplicate ID {iid} from A2")
            continue
        seen_a2_ids.add(iid)
        cleaned_a2.append(item)
    a2_items = cleaned_a2

    # --- 3. Clean up A1 Level ---
    # Identify items to move to A2, or correct level to A1
    a2_items_to_move = []
    cleaned_a1 = []
    seen_a1_ids = set()
    
    # We want to remove duplicate entries of manger and grand (retaining first ones)
    for item in a1_items:
        iid = item.get("id")
        
        # Remove vocab_sauter from A1 because it belongs to A2
        if iid == "vocab_sauter":
            print("Removing vocab_sauter from A1 (kept in A2)")
            continue
            
        # Deduplicate manger and grand (by ID or french term)
        if iid in seen_a1_ids:
            print(f"Removing duplicate ID {iid} from A1")
            continue
            
        # Check cross-level mismatches in A1
        if item.get("level") == "A2":
            # List of cooking terms to move to A2
            cooking_terms_to_move = ["vocab_hacher", "vocab_remuer", "vocab_mijoter", "vocab_eplucher", "vocab_bouillir"]
            if iid in cooking_terms_to_move:
                print(f"Moving {iid} ({item.get('french')}) from A1 to A2")
                item["level"] = "A2"
                a2_items_to_move.append(item)
            else:
                # Correct level to A1 for oignon, recette, frais, salé, sucré, délicieux
                print(f"Correcting level to A1 for {iid} ({item.get('french')}) in A1")
                item["level"] = "A1"
                seen_a1_ids.add(iid)
                cleaned_a1.append(item)
        else:
            seen_a1_ids.add(iid)
            cleaned_a1.append(item)
            
    a1_items = cleaned_a1
    a2_items.extend(a2_items_to_move)
    
    # --- 4. Process Formatting (A1 and A2) ---
    # Capitalize French/English and prepend Japanese POS tags for A1 and A2 items
    for item in a1_items:
        if "french" in item and item["french"]:
            item["french"] = capitalize_term(item["french"])
        if "english" in item and item["english"]:
            item["english"] = capitalize_term(item["english"])
        if "french" in item or "japanese" in item:
            add_pos_to_japanese(item)
        
    for item in a2_items:
        if "french" in item and item["french"]:
            item["french"] = capitalize_term(item["french"])
        if "english" in item and item["english"]:
            item["english"] = capitalize_term(item["english"])
        if "french" in item or "japanese" in item:
            add_pos_to_japanese(item)
        
    # --- 5. Sorting and Re-ordering ---
    a1_items.sort(key=sort_key)
    a2_items.sort(key=sort_key)
    
    # Write back clean JSON files
    with open(a1_path, 'w', encoding='utf-8') as f:
        json.dump(a1_items, f, ensure_ascii=False, indent=2)
    with open(a2_path, 'w', encoding='utf-8') as f:
        json.dump(a2_items, f, ensure_ascii=False, indent=2)
        
    print("Database cleanup completed successfully!")

if __name__ == "__main__":
    main()
