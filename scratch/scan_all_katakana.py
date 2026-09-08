import json
import re
import os
import glob
import sys
sys.stdout.reconfigure(encoding='utf-8')

workspace = r"C:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"

def scan_file(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        text = f.read()
    
    # Check for pattern: french_word (カタカナ)
    # e.g., mon (モン), ton (トン), etc.
    matches = re.findall(r'([a-zA-ZàâäéèêëîïôöùûüçœæÀÂÄÉÈÊËÎÏÔÖÙÛÜÇŒÆ\'-]{2,}\s*[\(（][\u30A0-\u30FFー・\s]+[\)）])', text)
    if matches:
        print(f"=== {os.path.relpath(filepath, workspace)} (Total {len(matches)} matches) ===")
        # show sample
        unique_matches = list(set(matches))[:10]
        print(f"  Samples: {unique_matches}")

# Check data/*.json
for p in glob.glob(os.path.join(workspace, "data", "*.json")):
    scan_file(p)

# Check rpg/*.json and rpg/**/*.json
for p in glob.glob(os.path.join(workspace, "rpg", "**", "*.json"), recursive=True):
    scan_file(p)

