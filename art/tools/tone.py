"""Tone the greyscale layers in art/layers/ and write the finished plates to public/plates/.

    python -I art/tools/tone.py art/tones.json art/layers public/plates

Each layer (and its -640/-320 copies) is mapped through a colour ramp: its grey value picks a
colour along the ramp's stops, the way an SVG feComponentTransfer table does. Plates keep these
tones in both themes. Each pattern tile's alpha becomes one pre-coloured tile per theme.
Baking the tones here, instead of with SVG filters in the browser, keeps scrolling cheap.
"""
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image

config = json.loads(Path(sys.argv[1]).read_text(encoding='utf-8'))
src, out = Path(sys.argv[2]), Path(sys.argv[3])


def ramp(values, stops):
    return np.interp(values, np.linspace(0, 1, len(stops)), stops)


for name, tone in config['layers'].items():
    r = config['ramps'][tone]
    files = sorted(src.glob(f'{name}.webp')) + sorted(src.glob(f'{name}-[0-9]*.webp'))
    if not files:
        raise SystemExit(f'no layer files for {name}')
    for f in files:
        im = Image.open(f).convert('RGBA')
        a = np.asarray(im, np.float64) / 255
        lum = 0.2126 * a[..., 0] + 0.7152 * a[..., 1] + 0.0722 * a[..., 2]
        rgb = np.stack([ramp(lum, r['r']), ramp(lum, r['g']), ramp(lum, r['b'])], -1)
        rgb8 = (np.clip(rgb, 0, 1) * 255 + 0.5).astype(np.uint8)
        dest = out / f.relative_to(src)
        dest.parent.mkdir(parents=True, exist_ok=True)
        alpha = (a[..., 3] * 255 + 0.5).astype(np.uint8)
        if alpha.min() == 255:
            Image.fromarray(rgb8, 'RGB').save(dest, 'WEBP', quality=76, method=6)
        else:
            Image.fromarray(np.dstack([rgb8, alpha]), 'RGBA').save(dest, 'WEBP', quality=78, alpha_quality=95, method=6)
        print(dest.relative_to(out), tone, dest.stat().st_size // 1024, 'KB')

for name, themes in config['patterns'].items():
    alpha = np.asarray(Image.open(src / f'{name}.webp').convert('RGBA'), np.float64)[..., 3]
    for theme, (r, g, b, strength) in themes.items():
        tile = np.zeros(alpha.shape + (4,), np.uint8)
        tile[..., :3] = (r, g, b)
        tile[..., 3] = (alpha * strength + 0.5).astype(np.uint8)
        dest = out / f'{name}-{theme}.webp'
        dest.parent.mkdir(parents=True, exist_ok=True)
        Image.fromarray(tile, 'RGBA').save(dest, 'WEBP', quality=60, alpha_quality=60, method=6)
        print(dest.relative_to(out), theme, dest.stat().st_size // 1024, 'KB')
