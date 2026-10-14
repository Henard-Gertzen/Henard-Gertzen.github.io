# Copied from the Synodalia denomination-page skill (scripts/layers.py).
"""Turn approved source images into grey, alpha-cut parallax layers (WebP), ready for CSS tone filters.

Usage: layers.py <jobs.json> <sources_dir> <out_dir>
Each job: {"name", "file", "crop": [l, t, r, b] | null, "width", "cut": "full" | "sky" | "rembg" | "png",
           "sky": [lo, hi] (luminance ramp to transparent, for "sky"), "fade_bottom": 0..1, "fade_top": 0..1}
Runs rembg in-process, so call it with the rembg venv's Python for "rembg" jobs.
"""
import json, pathlib, sys
from PIL import Image, ImageOps, ImageFilter, ImageChops

jobs = json.loads(pathlib.Path(sys.argv[1]).read_text(encoding='utf-8'))
src, out = pathlib.Path(sys.argv[2]), pathlib.Path(sys.argv[3])
out.mkdir(parents=True, exist_ok=True)


def ramp(h, w, start, from_top):
    """Vertical alpha ramp: opaque, then fading to 0 over the last `start` fraction."""
    g = Image.new('L', (1, h))
    edge = round(h * (1 - start))
    for y in range(h):
        yy = (h - 1 - y) if from_top else y
        g.putpixel((0, y), 255 if yy < edge else round(255 * (h - 1 - yy) / max(1, h - 1 - edge)))
    return g.resize((w, h))


for job in jobs:
    im = Image.open(src / job['file'])
    im = ImageOps.exif_transpose(im).convert('RGBA')
    if job.get('crop'):
        im = im.crop(tuple(job['crop']))
    w = job['width']
    im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    grey = ImageOps.autocontrast(im.convert('L'), cutoff=0.5)
    cut = job['cut']
    if cut == 'png':
        alpha = im.getchannel('A')
    elif cut == 'full':
        alpha = Image.new('L', im.size, 255)
    elif cut == 'sky':
        lo, hi = job['sky']
        # bright sky -> transparent, with a soft ramp between lo and hi
        alpha = grey.point(lambda v: 255 if v <= lo else (0 if v >= hi else round(255 * (hi - v) / (hi - lo))))
        alpha = alpha.filter(ImageFilter.MedianFilter(3))
    elif cut == 'skyline':
        # Solid below the first dark run in each column, so flare streaks can't punch holes in a ridge.
        import numpy as np
        g = np.asarray(grey, dtype=np.int16)
        k = job.get('smooth', 9)
        found = np.zeros(g.shape[1], bool)
        top = np.zeros(g.shape[1])
        # try the strict threshold first, then looser ones for columns washed out by glare
        for thr in [job['thr']] + job.get('fallback_thr', []):
            dark = g < thr
            run = dark[:-4] & dark[1:-3] & dark[2:-2] & dark[3:-1] & dark[4:]
            hit = run.any(axis=0) & ~found
            top[hit] = run.argmax(axis=0)[hit]
            found |= hit
        # Columns washed out by glare (plus a margin, to drop ragged glare edges) are bridged with a
        # quadratic saddle between the good columns on either side. This invents terrain, so it is
        # only for plates labelled as composite illustrations.
        cols = np.arange(g.shape[1])
        m = job.get('gap_margin', 0)
        gap = ~found
        if m:
            gap = np.convolve(gap.astype(int), np.ones(2 * m + 1, int), mode='same') > 0
        x = 0
        while x < len(cols):
            if not gap[x]:
                x += 1
                continue
            x1 = x
            while x1 < len(cols) and gap[x1]:
                x1 += 1
            left, right = x - 1, x1
            y0 = top[left] if left >= 0 else top[right]
            y1 = top[right] if right < len(cols) else y0
            dip = job.get('saddle', 0.12) * (x1 - x)
            yc = max(y0, y1) + dip
            t = (cols[x:x1] - left) / max(1, right - left)
            top[x:x1] = (1 - t) ** 2 * y0 + 2 * (1 - t) * t * yc + t ** 2 * y1
            x = x1
        pad = np.pad(top, k // 2, mode='edge')
        top = np.array([np.median(pad[i:i + k]) for i in range(len(top))]).astype(int)
        rows = np.arange(g.shape[0])[:, None]
        a = np.where(rows >= top[None, :], 255, 0).astype(np.uint8)
        a[np.clip(top - 1, 0, g.shape[0] - 1), np.arange(g.shape[1])] = 128
        alpha = Image.fromarray(a, 'L')
    elif cut == 'rembg':
        # Apache-2.0 model; rembg's default (BRIA RMBG-2.0) is non-commercial and must not be used
        from rembg import new_session, remove
        session = new_session(job.get('model', 'isnet-general-use'))
        alpha = remove(im.convert('RGB'), session=session).getchannel('A')
    else:
        raise SystemExit(f'unknown cut {cut}')
    if job.get('fade_bottom'):
        alpha = ImageChops.multiply(alpha, ramp(im.height, im.width, job['fade_bottom'], False))
    if job.get('fade_top'):
        alpha = ImageChops.multiply(alpha, ramp(im.height, im.width, job['fade_top'], True))
    if job.get('cap'):
        grey = grey.point(lambda v, c=job['cap']: min(v, c))
    layer = Image.merge('LA', (grey, alpha)).convert('RGBA')
    # name may include a kit folder, e.g. "southern-africa/sky"; a phone-sized copy is written alongside
    dest = out / f"{job['name']}.webp"
    dest.parent.mkdir(parents=True, exist_ok=True)
    q = job.get('quality', 74)
    aq = job.get('alpha_quality', 100)
    layer.save(dest, 'WEBP', quality=q, alpha_quality=aq, method=6)
    sizes = [f'{dest.stat().st_size // 1024} KB']
    for vw in job.get('variants', [640]):
        if vw < layer.width:
            small = layer.resize((vw, round(layer.height * vw / layer.width)), Image.LANCZOS)
            vdest = out / f"{job['name']}-{vw}.webp"
            small.save(vdest, 'WEBP', quality=q, alpha_quality=aq, method=6)
            sizes.append(f'{vw}px {vdest.stat().st_size // 1024} KB')
    print(job['name'], layer.size, ', '.join(sizes))
