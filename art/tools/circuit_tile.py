"""Kaleidoscope tile from the approved circuit-traces photo: crop a square, keep the bright traces
as an alpha mask, mirror into a 2x2 repeat. Writes the tile and, optionally, a repeated preview.
    python -I art/tools/circuit_tile.py art/sources/circuit-5315089/circuit-5315089_1280.jpg art/layers/texture/circuit-tile.webp 380 180 420 [preview.png]
tone.py turns its alpha into one pre-coloured tile per theme, shown at 240 px per repeat."""
import sys
import numpy as np
from PIL import Image, ImageOps, ImageFilter

src, out = sys.argv[1:3]
x, y, s = map(int, sys.argv[3:6])
preview = sys.argv[6] if len(sys.argv) > 6 else None
g = ImageOps.grayscale(Image.open(src)).crop((x, y, x + s, y + s))
g = ImageOps.autocontrast(g, cutoff=1).filter(ImageFilter.GaussianBlur(0.6))
a = np.asarray(g, dtype=float)
lo, hi = np.percentile(a, 62), np.percentile(a, 90)
alpha = np.clip((a - lo) / (hi - lo), 0, 1)
quad = Image.fromarray((alpha * 255).astype(np.uint8), 'L')
tile = Image.new('L', (2 * s, 2 * s))
tile.paste(quad, (0, 0))
tile.paste(ImageOps.mirror(quad), (s, 0))
tile.paste(ImageOps.flip(quad), (0, s))
tile.paste(ImageOps.flip(ImageOps.mirror(quad)), (s, s))
tile = tile.resize((320, 320), Image.LANCZOS)  # shown at 240 px; faint enough that this is sharp enough
rgba = Image.merge('RGBA', (Image.new('L', tile.size, 255),) * 3 + (tile,))
rgba.save(out, 'WEBP', quality=50, alpha_quality=50, method=6)  # only the alpha matters: it's a mask
print(out, rgba.size)
if not preview:
    sys.exit()
# preview: 4x3 repeats at the 240px display size, teal-blue on paper
small = tile.resize((240, 240), Image.LANCZOS)
pv = Image.new('RGB', (960, 720), (245, 241, 232))
ink = Image.new('RGB', (240, 240), (46, 90, 128))
for i in range(4):
    for j in range(3):
        pv.paste(ink, (i * 240, j * 240), small.point(lambda v: int(v * 0.35)))
pv.save(preview)
