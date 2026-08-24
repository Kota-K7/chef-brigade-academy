import os
import glob
from PIL import Image

workspace_dir = r"c:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"
chapter_2_dir = os.path.join(workspace_dir, "assets", "story", "chapter_2")

def main():
    print(f"Scanning for PNG/JPG files in {chapter_2_dir}...")
    image_files = glob.glob(os.path.join(chapter_2_dir, "*.png")) + glob.glob(os.path.join(chapter_2_dir, "*.jpg"))
    print(f"Found {len(image_files)} image files.")

    converted_count = 0
    total_saved_bytes = 0

    for img_path in image_files:
        try:
            base, ext = os.path.splitext(img_path)
            # Skip if it is already webp or directory
            if ext.lower() == ".webp":
                continue
                
            webp_path = base + ".webp"
            orig_size = os.path.getsize(img_path)
            
            with Image.open(img_path) as img:
                # Save as WEBP
                img.save(webp_path, "WEBP", quality=80)
                
            new_size = os.path.getsize(webp_path)
            saved = orig_size - new_size
            total_saved_bytes += saved
            
            print(f"Converted: {img_path} -> {webp_path}")
            print(f"  Size: {orig_size / 1024:.1f}KB -> {new_size / 1024:.1f}KB (Saved {saved / 1024:.1f}KB)")
            
            # Remove original file
            os.remove(img_path)
            converted_count += 1
        except Exception as e:
            print(f"[ERROR] Failed to convert {img_path}: {e}")
            
    print(f"\nSuccessfully converted {converted_count} files.")
    print(f"Total space saved: {total_saved_bytes / (1024*1024):.2f} MB")

if __name__ == "__main__":
    main()
