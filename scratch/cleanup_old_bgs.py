import os

# Only delete the exact original files that were moved to backgrounds/
from copy_backgrounds import mapping

deleted_count = 0
not_found_count = 0

for src_rel in mapping.keys():
    full_path = os.path.join(r"c:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy", src_rel.replace('/', os.sep))
    if os.path.exists(full_path):
        os.remove(full_path)
        print(f"Deleted source file: {src_rel}")
        deleted_count += 1
    else:
        print(f"Already removed or not found: {src_rel}")
        not_found_count += 1

print(f"\nCleanup complete. Deleted {deleted_count} files, Not found: {not_found_count}.")
