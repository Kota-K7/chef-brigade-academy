import os
import re
import json
import subprocess

# Ensure Pillow is installed
try:
    from PIL import Image
except ImportError:
    print("Installing Pillow...")
    subprocess.run(["pip", "install", "pillow"], check=True)
    from PIL import Image

asset_dir = r"c:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy\assets\story\chapter_2"
json_path = r"c:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy\rpg\history\chapter_2.json"

converted_count = 0
deleted_count = 0

print("Scanning directory:", asset_dir)

# 1. Convert files to WebP
for filename in os.listdir(asset_dir):
    if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
        old_path = os.path.join(asset_dir, filename)
        
        # Determine new filename
        base_name = os.path.splitext(filename)[0]
        new_filename = base_name + ".webp"
        new_path = os.path.join(asset_dir, new_filename)
        
        try:
            # Open and convert
            with Image.open(old_path) as img:
                img.save(new_path, "WEBP", quality=85)
            print(f"Converted: {filename} -> {new_filename}")
            converted_count += 1
            
            # Delete original
            os.remove(old_path)
            print(f"Deleted original: {filename}")
            deleted_count += 1
        except Exception as e:
            print(f"Failed to convert {filename}: {e}")

print(f"Conversion complete. Converted {converted_count} files, deleted {deleted_count} originals.")

# 2. Update JSON paths
if os.path.exists(json_path):
    print("Updating image paths in JSON:", json_path)
    try:
        with open(json_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Replace occurrences like assets/story/chapter_2/XXX.jpg or XXX.png to XXX.webp
        # Match only when inside double quotes
        def replace_ext(match):
            path = match.group(0)
            # Replace extension at the end
            updated = re.sub(r'\.(jpg|jpeg|png)$', '.webp', path, flags=re.IGNORECASE)
            return updated
            
        # Regex to find references to jpg, jpeg, png in the assets directory
        pattern = r'assets/story/chapter_2/[^"\')]+\.(jpg|jpeg|png)'
        updated_content = re.sub(pattern, replace_ext, content, flags=re.IGNORECASE)
        
        with open(json_path, "w", encoding="utf-8") as f:
            f.write(updated_content)
        print("JSON paths updated successfully!")
    except Exception as e:
        print("Failed to update JSON:", e)
else:
    print("JSON file not found:", json_path)
