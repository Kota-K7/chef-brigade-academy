import os
from PIL import Image
from collections import deque

workspace_dir = r"c:\Users\kotya\.gemini\antigravity-ide\scratch\chef-brigade-academy"
chapter_1_dir = os.path.join(workspace_dir, "assets", "story", "chapter_1")

def make_black_transparent(img_path):
    print(f"Making background transparent: {img_path}")
    with Image.open(img_path) as img:
        # Convert to RGBA
        rgba = img.convert("RGBA")
        data = rgba.load()
        w, h = rgba.size
        
        # Border-seeded flood fill for near-black background
        visited = set()
        queue = deque()
        
        # Seed from all border pixels
        threshold = 20 # RGB values under 20 are considered background black
        
        # Top and bottom borders
        for x in range(w):
            for y in [0, h - 1]:
                c = data[x, y]
                if c[0] < threshold and c[1] < threshold and c[2] < threshold:
                    queue.append((x, y))
                    visited.add((x, y))
                    
        # Left and right borders
        for y in range(h):
            for x in [0, w - 1]:
                c = data[x, y]
                if c[0] < threshold and c[1] < threshold and c[2] < threshold:
                    if (x, y) not in visited:
                        queue.append((x, y))
                        visited.add((x, y))
                        
        print(f"  Starting flood fill from {len(queue)} boundary seed pixels...")
        
        # BFS Flood Fill
        while queue:
            x, y = queue.popleft()
            # Set alpha of background pixel to 0 (fully transparent)
            c = data[x, y]
            data[x, y] = (c[0], c[1], c[2], 0)
            
            for nx, ny in [(x+1, y), (x-1, y), (x, y+1), (x, y-1)]:
                if 0 <= nx < w and 0 <= ny < h:
                    if (nx, ny) not in visited:
                        nc = data[nx, ny]
                        if nc[0] < threshold and nc[1] < threshold and nc[2] < threshold:
                            visited.add((nx, ny))
                            queue.append((nx, ny))
                            
        # Save back as WEBP
        rgba.save(img_path, "WEBP", quality=90)
        print(f"  Saved transparent sprite back to {img_path}")

def convert_to_webp():
    print("Scanning for non-webp images in chapter_1 assets...")
    for fn in os.listdir(chapter_1_dir):
        if not fn.endswith('.webp'):
            base, ext = os.path.splitext(fn)
            ext = ext.lower()
            if ext in ['.png', '.jpg', '.jpeg']:
                src_path = os.path.join(chapter_1_dir, fn)
                dest_path = os.path.join(chapter_1_dir, base + ".webp")
                
                print(f"Converting: {fn} -> {base}.webp")
                orig_size = os.path.getsize(src_path)
                
                with Image.open(src_path) as img:
                    img.save(dest_path, "WEBP", quality=80)
                    
                new_size = os.path.getsize(dest_path)
                saved = orig_size - new_size
                print(f"  Size: {orig_size / (1024*1024):.2f}MB -> {new_size / 1024:.1f}KB (Saved {saved / (1024*1024):.2f}MB)")
                
                # Delete original file
                os.remove(src_path)

def main():
    # 1. First make the black backgrounds of the two target Labienus sprites transparent
    for fn in ['ラヴィエヌス呆れ.webp', 'ラヴィエヌス呆れ白黒.webp']:
        fp = os.path.join(chapter_1_dir, fn)
        if os.path.exists(fp):
            make_black_transparent(fp)
        else:
            print(f"Warning: {fn} not found in {chapter_1_dir}")
            
    # 2. Convert new images to webp
    convert_to_webp()

if __name__ == "__main__":
    main()
