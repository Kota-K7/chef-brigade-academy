import os
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

workspace_dir = os.path.abspath(r"C:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy")
ref_path = os.path.join(workspace_dir, "data", "grammar_reference.json")

with open(ref_path, "r", encoding="utf-8") as f:
    ref_data = json.load(f)

print(f"Total topics in grammar_reference: {len(ref_data)}")
print("-" * 80)

# Topics we already expanded
expanded_topics = ["ref_negation", "ref_greetings", "ref_adjective_agreement", "ref_near_future_past", "ref_auxiliaries"]

for item in ref_data:
    item_id = item["id"]
    title = item.get("title_ja", "無題")
    
    if item_id in expanded_topics:
        print(f"[{item_id}] {title} -> (Already expanded by us)")
        continue
        
    sections = item.get("sections", [])
    
    # Check what kind of sections we have
    table_count = sum(1 for s in sections if s.get("type") == "table")
    info_count = sum(1 for s in sections if s.get("type") == "info")
    example_count = sum(1 for s in sections if s.get("type") == "examples")
    other_count = len(sections) - (table_count + info_count + example_count)
    
    # Check text details
    info_titles = [s.get("title", "無題") for s in sections if s.get("type") == "info"]
    
    # Simple score of how "detailed" it is
    total_chars = 0
    for s in sections:
        if s.get("type") == "info":
            total_chars += len(s.get("content_ja", ""))
        elif s.get("type") == "table":
            # Count cell characters
            for row in s.get("rows", []):
                total_chars += sum(len(str(c)) for c in row)
    
    status = "Adequate" if (info_count > 0 and total_chars > 300) else "Basic / Needs Expansion"
    
    print(f"[{item_id}] {title}")
    print(f"  - Sections: {len(sections)} (Tables: {table_count}, Info/Column: {info_count}, Examples: {example_count})")
    if info_titles:
        print(f"  - Columns: {info_titles}")
    print(f"  - Content volume: {total_chars} chars")
    print(f"  - Status: **{status}**")
    print("-" * 50)
