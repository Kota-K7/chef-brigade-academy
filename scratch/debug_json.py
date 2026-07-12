import sys

try:
    sys.stdout.reconfigure(encoding='utf-8')
except AttributeError:
    pass

with open('data/knowledge_A1.json', 'r', encoding='utf-8') as f:
    content = f.read()

pos = content.find("vocab_plat")
if pos != -1:
    line_num = content[:pos].count('\n') + 1
    print(f"'vocab_plat' found at line {line_num} (pos {pos})")
    start_line = max(1, line_num - 5)
    end_line = line_num + 35
    lines = content.splitlines()
    for l in range(start_line - 1, min(len(lines), end_line)):
        print(f"{l+1}: {lines[l]}")
else:
    print("'vocab_plat' not found")
