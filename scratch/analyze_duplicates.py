import json
import os
import sys

def main():
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except AttributeError:
        pass

    data_dir = 'data'
    levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
    
    # Load all files
    db = {}
    for lvl in levels:
        path = os.path.join(data_dir, f'knowledge_{lvl}.json')
        if os.path.exists(path):
            with open(path, 'r', encoding='utf-8') as f:
                db[lvl] = json.load(f)
        else:
            db[lvl] = []

    print("--- 1. Items in knowledge_A1.json with level='A2' ---")
    a2_in_a1 = []
    for idx, item in enumerate(db['A1']):
        if item.get('level') == 'A2':
            a2_in_a1.append(item)
            print(f"Index {idx}: ID={item.get('id')}, French='{item.get('french')}', Category={item.get('category')}")
            
    print("\n--- 2. Checking if these A2-in-A1 items already exist in knowledge_A2.json ---")
    a2_ids = {item.get('id') for item in db['A2']}
    a2_french = {item.get('french').lower() if item.get('french') else '' for item in db['A2']}
    
    for item in a2_in_a1:
        iid = item.get('id')
        fr = item.get('french', '').lower()
        exists_id = iid in a2_ids
        exists_fr = fr in a2_french
        print(f"ID={iid} ('{item.get('french')}'): Exists in A2 by ID? {exists_id}, by French? {exists_fr}")

    print("\n--- 3. Checking duplicate IDs within each file ---")
    for lvl in levels:
        ids = []
        for item in db[lvl]:
            iid = item.get('id')
            if iid:
                ids.append(iid)
        duplicates = set([x for x in ids if ids.count(x) > 1])
        if duplicates:
            print(f"Level {lvl} has duplicate IDs: {duplicates}")

    print("\n--- 4. Checking duplicate French words within each file ---")
    for lvl in levels:
        words = []
        for item in db[lvl]:
            fr = item.get('french')
            if fr:
                words.append(fr.lower())
        duplicates = set([x for x in words if words.count(x) > 1])
        if duplicates:
            print(f"Level {lvl} has duplicate French words: {duplicates}")

if __name__ == "__main__":
    main()
