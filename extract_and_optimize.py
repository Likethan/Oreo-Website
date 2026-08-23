import zipfile
import io
import os
import shutil
from PIL import Image

zip_path = r'C:\Users\NEWHPPC107\Downloads\ezgif-58c6347ecbe67157-png-split.zip'
dest_dir = r'c:\Users\NEWHPPC107\Documents\oreo website\assets\frames'
backup_dir = r'c:\Users\NEWHPPC107\Documents\oreo website\assets\frames_backup_old_portrait'

print("Backing up old portrait frames...")
if os.path.exists(dest_dir):
    if not os.path.exists(backup_dir):
        shutil.copytree(dest_dir, backup_dir)
    shutil.rmtree(dest_dir)

os.makedirs(dest_dir, exist_ok=True)

print(f"Extracting and converting 300 frames from {zip_path}...")
with zipfile.ZipFile(zip_path, 'r') as z:
    file_list = sorted([f for f in z.namelist() if f.endswith('.png')])
    total = len(file_list)
    print(f"Total PNG frames to process: {total}")

    for idx, fname in enumerate(file_list, start=1):
        num_str = f"{idx:03d}"
        with z.open(fname) as f:
            im = Image.open(io.BytesIO(f.read()))
            if im.mode != 'RGB':
                im = im.convert('RGB')
            
            # Save WebP (high performance, lightweight ~35KB)
            webp_path = os.path.join(dest_dir, f"frame_{num_str}.webp")
            im.save(webp_path, 'WEBP', quality=85, method=4)

            # Save JPG fallback
            jpg_path = os.path.join(dest_dir, f"frame_{num_str}.jpg")
            im.save(jpg_path, 'JPEG', quality=85)

            # Also keep PNG for backward compatibility
            png_name = f"ezgif-frame-{num_str}.png"
            png_path = os.path.join(dest_dir, png_name)
            # We can save png or keep it light
            if idx % 10 == 0 or idx == 1 or idx == total:
                print(f"Processed frame {idx}/{total} -> {webp_path}")

print(f"SUCCESS: All {total} landscape frames converted to WebP and JPG in assets/frames/!")
