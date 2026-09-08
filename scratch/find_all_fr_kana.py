import json
import re
import os
import glob
import sys
sys.stdout.reconfigure(encoding='utf-8')

workspace = r"C:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"

def check_file(p):
    with open(p, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Matches patterns like "Bonjour（ボンジュール）" or "de（ドゥ）" or "mon (モン)"
    matches = re.findall(r'([a-zA-ZàâäéèêëîïôöùûüçœæÀÂÄÉÈÊËÎÏÔÖÙÛÜÇŒÆ\'-]{2,})\s*[\(（]([\u30A0-\u30FFー・\s]+)[\)）]', content)
    if matches:
        print(f"\n--- {os.path.relpath(p, workspace)} ({len(matches)} matches) ---")
        for fr, kana in matches:
            print(f"  {fr} -> （{kana}）")

for p in glob.glob(os.path.join(workspace, "rpg", "**", "*.json"), recursive=True):
    check_file(p)

for p in glob.glob(os.path.join(workspace, "data", "*.json")):
    check_file(p)

