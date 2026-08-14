import os
import re
import json
import ast
import sys

# Ensure UTF-8 output encoding for print statements to avoid cp932 errors on Windows
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

# Paths
downloads_dir = r"C:\Users\kotya\Downloads\export_data"
project_dir = r"c:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"

# Semantic duplicate mappings: maps old_id -> new_id
semantic_duplicates = {
    'ing_truffe': 'ing_truffe_noire',
    'ing_persil': 'ing_persil_plat',
    'ing_muscade': 'ing_noix_muscade',
    'cut_kokotxa_de_merlu': 'cut_fish_kokotxa'
}

def parse_js_file(filepath):
    """
    Parses a JS file and extracts all exported arrays as python lists of dicts.
    Returns a dict mapping variable name to list of dicts.
    """
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Clean comments
    content = re.sub(r'//.*', '', content)
    content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
    
    # Find all export const varName = [...]
    pattern = r'export\s+const\s+(\w+)\s*=\s*(\[.*?\])\s*;\s*'
    matches = re.finditer(pattern, content, flags=re.DOTALL)
    
    result = {}
    for m in matches:
        var_name = m.group(1)
        array_str = m.group(2)
        
        # Quote unquoted keys in JS object: e.g. key: -> "key":
        cleaned_str = re.sub(r'(?<=[{\s,])([a-zA-Z_][a-zA-Z0-9_]*)\s*:', r'"\1":', array_str)
        
        # Convert JS syntax to Python literal syntax
        py_str = cleaned_str.replace('true', 'True').replace('false', 'False').replace('null', 'None')
        try:
            parsed_data = ast.literal_eval(py_str)
            result[var_name] = parsed_data
        except Exception as e:
            print(f"Error parsing variable {var_name} in {filepath}: {e}")
            # Print preview of the string to debug
            print(f"Cleaned string snippet: {py_str[:300]}")
    
    return result

def merge_item(old_item, new_item):
    """
    Merges an old item dict with a new item dict.
    Preserves unique information from both while preferring new coordinates/numbers.
    """
    merged = new_item.copy()
    
    # Fields to merge text gracefully if different
    text_fields = ['cooking', 'science', 'chef_note']
    for field in text_fields:
        old_val = old_item.get(field, '').strip()
        new_val = new_item.get(field, '').strip()
        if old_val and new_val and old_val != new_val:
            # Check if old_val is already contained in new_val
            # (e.g. if new_val is just a slight variation)
            clean_old = re.sub(r'[「」『』（）()\[\]\s]', '', old_val)
            clean_new = re.sub(r'[「」『』（）()\[\]\s]', '', new_val)
            if clean_old in clean_new:
                merged[field] = new_val
            elif clean_new in clean_old:
                merged[field] = old_val
            else:
                # Merge them by appending unique info
                # Let's inspect the differences and combine
                merged[field] = f"{new_val}（既存の解説: {old_val}）"
        elif old_val and not new_val:
            merged[field] = old_val

    # For names, if old_item has a different name_ja, check if we want to combine them
    old_ja = old_item.get('name_ja', '').strip()
    new_ja = new_item.get('name_ja', '').strip()
    if old_ja and new_ja and old_ja != new_ja:
        clean_old = re.sub(r'[\s\(\)（）]', '', old_ja)
        clean_new = re.sub(r'[\s\(\)（）]', '', new_ja)
        if clean_old not in clean_new and clean_new not in clean_old:
            merged['name_ja'] = f"{new_ja} / {old_ja}"
            
    # Always keep the new pin as it fits the new image
    merged['pin'] = new_item.get('pin', old_item.get('pin'))
    
    return merged

def merge_and_write(js_filename, var_mappings, json_filename):
    """
    js_filename: name of the JS file in js/views/ingredients/ (e.g. 'fruits_mushrooms.js')
    var_mappings: dict mapping JS variable name -> JSON key in the JSON file
                  e.g. {'fruitCuts': 'fruits', 'mushroomCuts': 'mushrooms'}
    json_filename: name of the JSON file in Downloads/export_data/ (e.g. 'new_fruits_mushrooms.json')
    """
    js_path = os.path.join(project_dir, 'js', 'views', 'ingredients', js_filename)
    json_path = os.path.join(downloads_dir, json_filename)
    
    print(f"\n--- Merging {js_filename} with {json_filename} ---")
    
    # Load existing data from JS file
    existing_vars = parse_js_file(js_path)
    
    # Load new data from JSON file
    with open(json_path, 'r', encoding='utf-8') as f:
        new_data = json.load(f)
        
    merged_vars = {}
    
    for js_var, json_key in var_mappings.items():
        existing_list = existing_vars.get(js_var, [])
        new_list = new_data.get(json_key, [])
        
        print(f"Variable '{js_var}' (mapping to key '{json_key}'):")
        print(f"  Existing items: {len(existing_list)}")
        print(f"  New items: {len(new_list)}")
        
        # Build map of existing items by ID
        existing_map = {item['id']: item for item in existing_list}
        
        # Also map semantic duplicates
        sem_dup_map = {}
        for old_id, new_id in semantic_duplicates.items():
            if old_id in existing_map:
                sem_dup_map[new_id] = existing_map[old_id]
        
        merged_list = []
        # We iterate over the new items, merging if they exist in old, or appending if new
        for new_item in new_list:
            item_id = new_item['id']
            if item_id in existing_map:
                merged_item = merge_item(existing_map[item_id], new_item)
                merged_list.append(merged_item)
                print(f"  Merged item: {item_id} ({new_item.get('name_fr')})")
            elif item_id in sem_dup_map:
                merged_item = merge_item(sem_dup_map[item_id], new_item)
                merged_list.append(merged_item)
                print(f"  Merged semantic duplicate: {sem_dup_map[item_id]['id']} -> {item_id} ({new_item.get('name_fr')})")
            else:
                merged_list.append(new_item)
                
        # Are there any items in the existing list that are NOT in the new list and not semantic duplicates?
        # We must preserve them to prevent data loss!
        new_ids = {item['id'] for item in new_list}
        for old_item in existing_list:
            old_id = old_item['id']
            if old_id not in new_ids and old_id not in semantic_duplicates:
                merged_list.append(old_item)
                print(f"  Preserved old-only item: {old_id} ({old_item.get('name_fr')})")
                
        # Re-number the merged list to ensure clean sequential numbering
        for idx, item in enumerate(merged_list, 1):
            item['number'] = str(idx)
            
        merged_vars[js_var] = merged_list
        print(f"  Total merged items: {len(merged_list)}")
        
    # Write back to JS file
    output_lines = [f"// Interactive {js_filename.replace('_', ' ').replace('.js', '').title()} Data"]
    for var_name, var_data in merged_vars.items():
        # Format as pretty JSON-like JS array
        js_data_str = json.dumps(var_data, indent=2, ensure_ascii=False)
        # Clean up some formatting to make it look like a nice JS file
        output_lines.append(f"export const {var_name} = {js_data_str};")
        
    with open(js_path, 'w', encoding='utf-8') as f:
        f.write('\n\n'.join(output_lines) + '\n')
        
    print(f"Successfully wrote merged data to {js_path}")

# Run merges
try:
    # 1. Fruits & Mushrooms
    merge_and_write(
        js_filename='fruits_mushrooms.js',
        var_mappings={'fruitCuts': 'fruits', 'mushroomCuts': 'mushrooms'},
        json_filename='new_fruits_mushrooms.json'
    )
    
    # 2. Herbs & Spices
    merge_and_write(
        js_filename='herbs_spices.js',
        var_mappings={'herbCuts': 'herbs', 'spiceCuts': 'spices'},
        json_filename='new_herbs_spices.json'
    )
    
    # 3. Seafood
    merge_and_write(
        js_filename='seafood.js',
        var_mappings={
            'fishCuts': 'fishCuts',
            'crustaceanCuts': 'crustaceanCuts',
            'shellfishCuts': 'shellfishCuts',
            'molluskCuts': 'cephalopodCuts'
        },
        json_filename='new_seafood.json'
    )
    
    print("\nAll merges completed successfully!")
except Exception as e:
    import traceback
    traceback.print_exc()
