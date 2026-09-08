import json
import re
import os
import glob
import sys
sys.stdout.reconfigure(encoding='utf-8')

workspace = r"C:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"

# 1. Check data/grammar_reference.json
with open(os.path.join(workspace, "data", "grammar_reference.json"), "r", encoding="utf-8") as f:
    grammars = json.load(f)

print("=== Scanning grammar_reference.json for Katakana pronunciation ===")
for g in grammars:
    g_id = g.get("id")
    title = g.get("title_ja")
    # check sections
    for s_idx, sec in enumerate(g.get("sections", [])):
        headers = sec.get("headers", [])
        rows = sec.get("rows", [])
        # Check if header has "発音"
        for h_idx, h in enumerate(headers):
            if "発音" in h:
                print(f"[{g_id}] Section {s_idx} ('{sec.get('title')}') header has '{h}' at col {h_idx}")
        # Check for patterns like "mon (モン)", "ton (トン)", "（...）" in rows
        for r_idx, row in enumerate(rows):
            for c_idx, cell in enumerate(row):
                if isinstance(cell, str):
                    matches = re.findall(r'[a-zA-ZàâäéèêëîïôöùûüçœæÀÂÄÉÈÊËÎÏÔÖÙÛÜÇŒÆ\'-]+\s*[\(（][\u30A0-\u30FFー・\s]+[\)）]', cell)
                    if matches:
                        print(f"[{g_id}] Sec {s_idx} Row {r_idx} Col {c_idx}: {cell} -> Matches: {matches}")

