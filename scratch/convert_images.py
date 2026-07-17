import os
import glob
from PIL import Image

def main():
    assets_dir = os.path.join("assets", "story")
    data_dir = os.path.join("data", "story")
    
    print(f"Scanning for PNG files in {assets_dir}...")
    png_files = glob.glob(os.path.join(assets_dir, "**", "*.png"), recursive=True)
    print(f"Found {len(png_files)} PNG files.")
    
    converted_count = 0
    total_saved_bytes = 0
    
    for png_path in png_files:
        try:
            # Determine WebP output path
            base, _ = os.path.splitext(png_path)
            webp_path = base + ".webp"
            
            # Get original file size
            orig_size = os.path.getsize(png_path)
            
            # Open and convert image
            with Image.open(png_path) as img:
                # Pillow's WebP saver automatically handles transparency (RGBA)
                img.save(webp_path, "WEBP", quality=80)
            
            # Get new file size
            new_size = os.path.getsize(webp_path)
            saved = orig_size - new_size
            total_saved_bytes += saved
            
            print(f"Converted: {png_path} -> {webp_path}")
            print(f"  Size: {orig_size / (1024*1024):.2f}MB -> {new_size / 1024:.1f}KB (Saved {saved / (1024*1024):.2f}MB)")
            
            # Remove original PNG file
            os.remove(png_path)
            converted_count += 1
        except Exception as e:
            print(f"[ERROR] Failed to convert {png_path}: {e}")
            
    print(f"\nSuccessfully converted {converted_count} files.")
    print(f"Total space saved: {total_saved_bytes / (1024*1024):.2f} MB")
    
    print(f"\nUpdating string references in {data_dir}...")
    json_files = glob.glob(os.path.join(data_dir, "**", "*.json"), recursive=True)
    
    for json_path in json_files:
        try:
            with open(json_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Replace .png references with .webp
            new_content = content.replace(".png", ".webp")
            
            with open(json_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
                
            print(f"Updated references in: {json_path}")
        except Exception as e:
            print(f"[ERROR] Failed to update references in {json_path}: {e}")

if __name__ == "__main__":
    main()
