import re

with open('rpg/history/draft_story.md', 'r', encoding='utf-8') as f:
    lines = f.readlines()

issues = []

for idx, line in enumerate(lines[26:], start=27):
    stripped = line.strip()
    if not stripped:
        continue
    
    # Check for unclosed brackets or mismatched quotes
    open_brackets = stripped.count('「')
    close_brackets = stripped.count('」')
    if open_brackets != close_brackets:
        issues.append(f"Line {idx}: Bracket mismatch (「: {open_brackets}, 」: {close_brackets}) -> {stripped[:80]}...")
    
    # Check for missing arrows between multiple speakers on one line
    # If there are multiple ':' or '：' followed by '「' not preceded by '→' or at line start
    # Match pattern: after closing bracket '」', if there is a character name without '→'
    m = re.findall(r'」\s*([A-Za-z0-9_ぁ-んァ-ヶ一-龥]+[（\(].*?[）\)]?[：:])', stripped)
    if m:
        issues.append(f"Line {idx}: Missing '→' after '」': Found {m} -> {stripped[:80]}...")
    
    # Check background tag formatting
    if '[背景:' in stripped or '[背景：' in stripped:
        if not stripped.endswith(']'):
            issues.append(f"Line {idx}: Background tag formatting issue -> {stripped}")

print(f"Total syntax/formatting issues detected: {len(issues)}")
for iss in issues:
    print(f"  - {iss}")
