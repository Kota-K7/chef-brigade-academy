import zipfile
import os
import shutil
from PIL import Image

def main():
    zip_path = 'icons/app-icons.zip'
    out_dir = 'icons'
    
    if not os.path.exists(zip_path):
        print(f"Error: {zip_path} not found. Please make sure the zip file is placed correctly.")
        return
        
    print(f"Extracting icons from {zip_path}...")
    
    # zipファイル内のパスと、icons/ ディレクトリ内の出力ファイル名のマッピング
    mappings = {
        'android/icon-72.png': 'icon-72.png',
        'android/icon-96.png': 'icon-96.png',
        'android/icon-144.png': 'icon-144.png',
        'android/icon-192.png': 'icon-192.png',
        'android/icon-512.png': 'icon-512.png',
        'ios/icon-120.png': 'icon-120.png',
        'ios/icon-152.png': 'icon-152.png',
        'ios/icon-167.png': 'icon-167.png',
        'ios/icon-180.png': 'icon-180.png',
    }
    
    # 出力先ディレクトリの作成（念のため）
    os.makedirs(out_dir, exist_ok=True)
    
    with zipfile.ZipFile(zip_path, 'r') as z:
        for zip_name, dest_name in mappings.items():
            dest_path = os.path.join(out_dir, dest_name)
            try:
                # ZIPから画像データを読み込んで書き込み
                data = z.read(zip_name)
                with open(dest_path, 'wb') as f:
                    f.write(data)
                print(f"Extracted {zip_name} -> {dest_path}")
            except KeyError:
                print(f"Warning: {zip_name} not found in zip.")
                
    # apple-touch-icon.png の作成 (180x180 のコピー)
    src_180 = os.path.join(out_dir, 'icon-180.png')
    dest_apple = os.path.join(out_dir, 'apple-touch-icon.png')
    if os.path.exists(src_180):
        shutil.copy(src_180, dest_apple)
        print(f"Copied {src_180} -> {dest_apple}")
    else:
        print("Warning: icon-180.png was not extracted, skipped apple-touch-icon.png copy.")
        
    # 384x384 アイコンの生成 (512x512 からリサイズ)
    src_512 = os.path.join(out_dir, 'icon-512.png')
    dest_384 = os.path.join(out_dir, 'icon-384.png')
    if os.path.exists(src_512):
        with Image.open(src_512) as img:
            img_resized = img.resize((384, 384), Image.Resampling.LANCZOS)
            img_resized.save(dest_384, 'PNG')
            print(f"Generated 384x384 icon -> {dest_384}")
    else:
        print("Warning: icon-512.png was not extracted, skipped 384x384 generation.")
            
    # favicon.ico の生成 (512x512 から 16x16, 32x32, 48x48 形式を含むマルチサイズICOを生成)
    dest_ico = 'favicon.ico'
    if os.path.exists(src_512):
        with Image.open(src_512) as img:
            img16 = img.resize((16, 16), Image.Resampling.LANCZOS)
            img32 = img.resize((32, 32), Image.Resampling.LANCZOS)
            img48 = img.resize((48, 48), Image.Resampling.LANCZOS)
            img16.save(dest_ico, format='ICO', append_images=[img32, img48])
            print(f"Generated favicon.ico with sizes (16, 32, 48) -> {dest_ico}")
    else:
        print("Warning: icon-512.png not found, skipped favicon.ico generation.")

if __name__ == '__main__':
    main()
