import json
import os

downloads_file = r"C:\Users\kotya\Downloads\newly_added_words.json"
workspace_dir = r"c:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"

if os.path.exists(downloads_file):
    with open(downloads_file, 'r', encoding='utf-8') as f:
        try:
            downloaded_words = json.load(f)
            print(f"Downloaded file: {len(downloaded_words)} words.")
            if downloaded_words:
                print("First word example from download:")
                print(json.dumps(downloaded_words[0], ensure_ascii=False, indent=2))
        except Exception as e:
            print("Failed to parse downloaded json:", e)
else:
    print("Downloaded file not found.")

levels = ["A1", "A2", "B1", "B2", "C1", "C2"]
for lvl in levels:
    p = os.path.join(workspace_dir, "data", f"knowledge_{lvl}.json")
    if os.path.exists(p):
        with open(p, 'r', encoding='utf-8') as f:
            try:
                words = json.load(f)
                vocab_count = sum(1 for w in words if "french" in w)
                grammar_count = sum(1 for w in words if "grammar" in w)
                cuisine_count = sum(1 for w in words if "cuisine" in w)
                print(f"knowledge_{lvl}.json: Total={len(words)}, Vocab={vocab_count}, Grammar={grammar_count}, Cuisine={cuisine_count}")
            except Exception as e:
                print(f"Failed to parse {p}:", e)
    else:
        print(f"{p} not found.")
