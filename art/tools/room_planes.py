"""Split one photo into a back plane and a front plane for a parallax plate.

    python -I room_planes.py <photo> <out-prefix> [--mask m.png] [--depth-min 0.45]
                             [--add "x,y x,y ..."]... [--cut "x,y x,y ..."]... [--preview p.png]

front = union of: a BiRefNet matte (--mask), pixels nearer than --depth-min on a Depth Anything V2
        depth map, and --add polygons (what the objects stand on, so nothing slides on its table);
        minus --cut polygons. Polygons are in the photo's pixels at 1280 px wide.
back  = the photo with the front's footprint filled by carrying the pixels below it up: the front
        rises faster than the back as the page scrolls, so it only ever uncovers the strip just
        below its lower edges.
Both are greyscale WebP (toned by tone.py) with -640 copies.
"""
import argparse
import pathlib

import numpy as np
from PIL import Image, ImageDraw, ImageOps
from scipy import ndimage


def push_pull(a, known):
    if min(a.shape) < 4:
        k = known.sum()
        return np.full_like(a, (a * known).sum() / k if k else a.mean())
    h2, w2 = (a.shape[0] + 1) // 2 * 2, (a.shape[1] + 1) // 2 * 2
    ap = np.pad(a * known, ((0, h2 - a.shape[0]), (0, w2 - a.shape[1])), mode='edge')
    kp = np.pad(known, ((0, h2 - a.shape[0]), (0, w2 - a.shape[1])), mode='edge')
    ks = kp.reshape(h2 // 2, 2, w2 // 2, 2).sum((1, 3))
    vs = ap.reshape(h2 // 2, 2, w2 // 2, 2).sum((1, 3))
    small = push_pull(np.where(ks > 0, vs / np.maximum(ks, 1e-6), 0), (ks > 0).astype(float))
    up = np.repeat(np.repeat(small, 2, 0), 2, 1)[:a.shape[0], :a.shape[1]]
    return a * known + ndimage.gaussian_filter(up, 1) * (1 - known)


def polygon(size, spec):
    im = Image.new('L', size, 0)
    ImageDraw.Draw(im).polygon([tuple(float(v) for v in pt.split(',')) for pt in spec.split()], fill=255)
    return np.asarray(im, np.float64) / 255


def save(lum, alpha, prefix, q):
    l = Image.fromarray(np.clip(lum, 0, 255).astype(np.uint8))
    a = Image.fromarray(np.clip(alpha * 255, 0, 255).astype(np.uint8))
    im = Image.merge('RGBA', (l, l, l, a))
    p = pathlib.Path(f'{prefix}.webp')
    p.parent.mkdir(parents=True, exist_ok=True)
    kw = dict(quality=q, alpha_quality=90, method=6)
    im.save(p, **kw)
    small = p.with_name(f'{p.stem}-640.webp')
    im.resize((640, round(im.height * 640 / im.width)), Image.LANCZOS).save(small, **kw)
    print(p.name, im.size, p.stat().st_size // 1024, 'KB |', small.stat().st_size // 1024, 'KB')


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('photo')
    ap.add_argument('out_prefix')
    ap.add_argument('--mask')
    ap.add_argument('--depth-min', type=float)
    ap.add_argument('--add', action='append', default=[])
    ap.add_argument('--cut', action='append', default=[])
    ap.add_argument('--preview')
    a = ap.parse_args()

    rgb = ImageOps.exif_transpose(Image.open(a.photo)).convert('RGB')
    rgb = rgb.resize((1280, round(rgb.height * 1280 / rgb.width)), Image.LANCZOS)
    g = np.asarray(ImageOps.autocontrast(rgb.convert('L'), cutoff=0.5), np.float64)
    front = np.zeros_like(g)
    if a.mask:
        m = np.asarray(Image.open(a.mask).convert('L').resize(rgb.size, Image.BILINEAR), np.float64) / 255
        front = np.maximum(front, np.clip((m - 0.35) / 0.3, 0, 1))
    if a.depth_min is not None:
        from transformers import pipeline
        est = pipeline('depth-estimation', model='depth-anything/Depth-Anything-V2-Small-hf', device=0)
        d = np.asarray(est(rgb)['depth'].resize(rgb.size, Image.BICUBIC), np.float32)
        d = np.clip((d - np.percentile(d, 1)) / (np.percentile(d, 99.5) - np.percentile(d, 1)), 0, 1)
        d = ndimage.gaussian_filter(ndimage.median_filter(d, size=7), 1.0)
        front = np.maximum(front, np.clip((d - a.depth_min + 0.03) / 0.06, 0, 1))
    for spec in a.add:
        front = np.maximum(front, polygon(rgb.size, spec))
    for spec in a.cut:
        front = front * (1 - polygon(rgb.size, spec))
    # Close pinholes so the back never shows through in speckles, then a soft edge.
    front = ndimage.grey_closing(front, size=(7, 7))
    front = ndimage.gaussian_filter(front, 0.9)

    hole = ndimage.binary_dilation(front > 0.03, iterations=3)
    # Carry the nearest known pixel below each hole pixel up into it (done as "from above" on the
    # flipped image), blended with a smooth fill where there is nothing below.
    gf, holef = g[::-1], hole[::-1]
    known = ~holef
    src = ndimage.gaussian_filter(gf, 1.2)
    rows = np.arange(gf.shape[0])[:, None]
    near = np.maximum.accumulate(np.where(known, rows, -1), axis=0)
    smear = np.where(near >= 0, src[np.clip(near, 0, None), np.arange(gf.shape[1])[None, :]], 0)
    smooth = push_pull(gf, known.astype(float))
    fill = ndimage.uniform_filter(np.where(near >= 0, 0.75 * smear + 0.25 * smooth, smooth), 5)
    back = np.where(holef, fill, gf)[::-1]

    save(back, np.ones_like(g), f'{a.out_prefix}-back', 74)
    save(g, front, f'{a.out_prefix}-front', 78)

    if a.preview:
        tint = np.stack([g * 0.55 + 115 * front, g * 0.55, g * 0.55], -1)
        h, w = g.shape
        sheet = Image.new('RGB', (w * 2, h), 'white')
        sheet.paste(Image.fromarray(np.clip(tint, 0, 255).astype(np.uint8)), (0, 0))
        sheet.paste(Image.fromarray(back.astype(np.uint8)).convert('RGB'), (w, 0))
        sheet.resize((w, h // 2)).save(a.preview)


if __name__ == '__main__':
    main()
