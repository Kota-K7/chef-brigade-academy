import re

c3_path = "scratch/compile_chapter_3_full.py"
with open(c3_path, 'r', encoding='utf-8') as f:
    code = f.read()

# Replace "type": "battle" with "type": "fixedBattle"
code = code.replace('"type": "battle"', '"type": "fixedBattle"')

# Also replace enemy nested object in draft scripts if any
with open(c3_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("Updated compile_chapter_3_full.py")
