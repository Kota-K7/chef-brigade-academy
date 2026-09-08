import json
import re
import os
import glob
import sys
sys.stdout.reconfigure(encoding='utf-8')

workspace = r"C:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"

def clean_file(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    original = content
    # Remove targeted phonetic kana patterns
    phonetic_patterns = [
        r'Bonjour（ボンジュール）',
        r'Bonjour\s*[\(（]ボンジュール[\)）]',
        r'Bonsoir\s*[\(（]ボンソワール[\)）]',
        r'Au revoir\s*[\(（]オ・ルヴォワール[\)）]',
        r'mon\s*[\(（]モン[\)）]',
        r'ton\s*[\(（]トン[\)）]',
        r'son\s*[\(（]ソン[\)）]',
        r'ma\s*[\(（]マ[\)）]',
        r'ta\s*[\(（]タ[\)）]',
        r'sa\s*[\(（]サ[\)）]',
        r'mes\s*[\(（]メ[\)）]',
        r'tes\s*[\(（]テ[\)）]',
        r'ses\s*[\(（]セ[\)）]',
        r'notre\s*[\(（]ノートル[\)）]',
        r'votre\s*[\(（]ヴォートル[\)）]',
        r'leur\s*[\(（]ルール[\)）]',
        r'nos\s*[\(（]ノー[\)）]',
        r'vos\s*[\(（]ヴォ[\)）]',
        r'leurs\s*[\(（]ルール[\)）]',
        r'petit\s*[\(（]プティ[\)）]',
        r'petite\s*[\(（]プティトゥ[\)）]',
        r'petits\s*[\(（]プティ[\)）]',
        r'petites\s*[\(（]プティトゥ[\)）]',
        r'de（ドゥ）',
        r'de\s*[\(（]ドゥ[\)）]',
        r'C\'est\s*[\(（]セ[\)）]',
        r'Ce sont\s*[\(（]ス ソン[\)）]',
        r'cet oignon\s*[\(（]セットニオン[\)）]',
        r'vingt\s*[\(（]ヴァン[\)）]',
        r'cent\s*[\(（]サン[\)）]',
        r'mille\s*[\(（]ミル[\)）]',
        r'premier\s*[\(（]プルミエ[\)）]',
        r'première\s*[\(（]プルミエール[\)）]'
    ]
    
    for pat in phonetic_patterns:
        # If replacing, keep the french part
        def sub_repl(m):
            matched_str = m.group(0)
            # Remove the parenthesized kana
            return re.sub(r'[\(（][\u30A0-\u30FFー・\s]+[\)）]', '', matched_str)
        content = re.sub(pat, sub_repl, content)
    
    if content != original:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Cleaned {os.path.relpath(filepath, workspace)}")

for p in glob.glob(os.path.join(workspace, "rpg", "**", "*.json"), recursive=True):
    clean_file(p)

for p in glob.glob(os.path.join(workspace, "data", "*.json")):
    clean_file(p)

for p in glob.glob(os.path.join(workspace, "*.md")):
    clean_file(p)

