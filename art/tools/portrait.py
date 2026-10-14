"""The cut-out portrait for the home page's gauge: a greyscale layer (tone.py tones it) and a
colour copy that fades in when you hover over it.

    python -I art/tools/portrait.py src/assets/henard-gertzen.png art/layers/portrait public/plates/portrait
"""
import sys
from pathlib import Path

from PIL import Image, ImageOps

src, layers, public = sys.argv[1], Path(sys.argv[2]), Path(sys.argv[3])
face = Image.open(src).convert('RGBA')
grey = ImageOps.grayscale(face.convert('RGB'))
Image.merge('RGBA', (grey, grey, grey, face.getchannel('A'))).save(layers / 'henard.webp', quality=88)
face.save(public / 'henard-colour.webp', quality=82, method=6)
for f in (layers / 'henard.webp', public / 'henard-colour.webp'):
    print(f, f.stat().st_size // 1024, 'KB')
