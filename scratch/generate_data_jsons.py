import json
import re

def extract_js_array(file_path, var_name):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Use regex to find the start of the array or object
    pattern = rf"export\s+const\s+{var_name}\s*=\s*([\[{{].*?[\]}}]);"
    match = re.search(pattern, content, re.DOTALL)
    if not match:
        # Fallback: maybe without semicolon or slightly different format
        pattern = rf"export\s+const\s+{var_name}\s*=\s*([\[{{].*?[\]}}])\s*(?=export|const|$)"
        match = re.search(pattern, content, re.DOTALL)
        
    if not match:
        raise ValueError(f"Could not find variable {var_name} in {file_path}")
        
    raw_js = match.group(1)
    
    # Strip comments (e.g. // comment)
    raw_js = re.sub(r"//.*$", "", raw_js, flags=re.MULTILINE)
    
    # Wrap unquoted keys in double quotes for dishes only
    # e.g.,   sole_normande: { -> "sole_normande": {
    if var_name == "dishes":
        raw_js = re.sub(r"^\s*(\w+)\s*:", r'"\1":', raw_js, flags=re.MULTILINE)
    
    # Let's fix trailing commas if any
    raw_js = re.sub(r",\s*([\]}])", r"\1", raw_js)
    
    # Parse
    try:
        return json.loads(raw_js)
    except json.JSONDecodeError as e:
        # If it fails, print a snippet to debug
        print(f"JSON decode failed for {var_name}.")
        raise e

def main():
    # 1. Extract dishes
    print("Extracting dishes...")
    try:
        # cuisine_dishes.js exports an object of objects
        dishes_data = extract_js_array("js/views/cuisine_dishes.js", "dishes")
        # Convert object of objects to list of objects with "id" key
        dishes_list = []
        for dish_id, dish_info in dishes_data.items():
            dish_info["id"] = dish_id
            dishes_list.append(dish_info)
            
        with open("data/dishes.json", "w", encoding="utf-8") as f:
            json.dump(dishes_list, f, ensure_ascii=False, indent=2)
        print(f"Wrote {len(dishes_list)} dishes to data/dishes.json")
    except Exception as e:
        print("Failed to process dishes:", e)
        
    # 2. Extract French cheeses
    print("Extracting French cheeses...")
    try:
        cheeses_data = extract_js_array("js/views/ingredients/cheese_wine.js", "cheeseCutsFr")
        with open("data/cheeses.json", "w", encoding="utf-8") as f:
            json.dump(cheeses_data, f, ensure_ascii=False, indent=2)
        print(f"Wrote {len(cheeses_data)} cheeses to data/cheeses.json")
    except Exception as e:
        print("Failed to process cheeses:", e)
        
    # 3. Extract wines
    print("Extracting wines...")
    try:
        wines_data = extract_js_array("js/views/ingredients/cheese_wine.js", "wineCuts")
        with open("data/wines.json", "w", encoding="utf-8") as f:
            json.dump(wines_data, f, ensure_ascii=False, indent=2)
        print(f"Wrote {len(wines_data)} wines to data/wines.json")
    except Exception as e:
        print("Failed to process wines:", e)

if __name__ == "__main__":
    main()
