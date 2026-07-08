import json
import os
import re

ALL_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
CATEGORIES = ["Vocabulary", "Grammar", "Theory", "Service", "Philosophy", "Techniques", "Brigade", "Equipment", "General", "Verbs"]

def validate():
    print("Starting automated database validation...")
    errors = []
    ids = set()
    
    data_dir = os.path.join(os.path.dirname(__file__), '..', 'data')
    
    for level in ALL_LEVELS:
        filepath = os.path.join(data_dir, f'knowledge_{level}.json')
        if not os.path.exists(filepath):
            errors.append(f"Missing file: {filepath}")
            continue
            
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                items = json.load(f)
        except Exception as e:
            errors.append(f"Failed to parse JSON for {filepath}: {e}")
            continue
            
        if not isinstance(items, list):
            errors.append(f"Root elements must be a list in {filepath}")
            continue
            
        for idx, item in enumerate(items):
            loc = f"{filepath} [item {idx}]"
            
            # Required fields
            for field in ["id", "category", "level", "tags"]:
                if field not in item:
                    errors.append(f"Missing required field '{field}' at {loc}")
            
            if "id" in item:
                iid = item["id"]
                if not re.match(r"^(kb_|vocab_|gram_|cuis_)[a-z0-9_]+$", iid):
                    errors.append(f"Invalid ID format '{iid}' at {loc}. Must start with kb_, vocab_, gram_, or cuis_ and contain only lowercase letters, digits, and underscores.")
                if iid in ids:
                    errors.append(f"Duplicate ID found: '{iid}' at {loc}")
                ids.add(iid)
                
            if "category" in item:
                cat = item["category"]
                if cat not in CATEGORIES:
                    errors.append(f"Invalid category '{cat}' at {loc}. Allowed: {CATEGORIES}")
                    
            if "level" in item:
                lvl = item["level"]
                if lvl != level:
                    errors.append(f"Level mismatch '{lvl}' (expected '{level}') at {loc}")
                    
            if "tags" in item and not isinstance(item["tags"], list):
                errors.append(f"'tags' must be a list of strings at {loc}")
                
            # Vocabulary specific validation
            if "french" in item or "japanese" in item:
                if not item.get("french") or not item.get("japanese"):
                    errors.append(f"Vocabulary item must have both 'french' and 'japanese' at {loc}")
                    
            # Grammar schema validation
            if "grammar" in item:
                g = item["grammar"]
                if not isinstance(g, dict):
                    errors.append(f"'grammar' must be an object at {loc}")
                else:
                    for gfield in ["topic", "explanation_ja", "explanation_en"]:
                        if gfield not in g or not g[gfield]:
                            errors.append(f"Missing '{gfield}' in grammar section at {loc}")
                            
            # Cuisine schema validation
            if "cuisine" in item:
                c = item["cuisine"]
                if not isinstance(c, dict):
                    errors.append(f"'cuisine' must be an object at {loc}")
                else:
                    for cfield in ["topic", "content_fr", "content_en", "content_ja"]:
                        if cfield not in c or not c[cfield]:
                            errors.append(f"Missing '{cfield}' in cuisine section at {loc}")
                            
            # Examples validation
            if "examples" in item:
                exs = item["examples"]
                if not isinstance(exs, list):
                    errors.append(f"'examples' must be a list at {loc}")
                else:
                    for eidx, ex in enumerate(exs):
                        for efield in ["fr", "en", "ja"]:
                            if efield not in ex or not ex[efield]:
                                errors.append(f"Missing '{efield}' in examples[{eidx}] at {loc}")

    if errors:
        print("\n[FAILED] VALIDATION FAILED with following errors:")
        for err in errors:
            print(f" - {err}")
        return False
    else:
        print("\n[PASSED] VALIDATION PASSED! All database structures are unified and valid.")
        return True

if __name__ == "__main__":
    import sys
    success = validate()
    sys.exit(0 if success else 1)
