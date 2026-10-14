"""Salient-object matte with BiRefNet (MIT licence, cached from The Paracelsian).

    python -I birefnet_mask.py <photo> <mask.png> [--width 1280]
Writes an 8-bit matte at the photo's (resized) size: white = object.
"""
import argparse

import numpy as np
import torch
from PIL import Image, ImageOps
from torchvision import transforms


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('photo')
    ap.add_argument('mask')
    ap.add_argument('--width', type=int, default=1280)
    a = ap.parse_args()

    from transformers import AutoModelForImageSegmentation
    model = AutoModelForImageSegmentation.from_pretrained('ZhengPeng7/BiRefNet', trust_remote_code=True)
    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    model.to(device).eval()
    prep = transforms.Compose([
        transforms.Resize((1024, 1024)),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225]),
    ])
    img = ImageOps.exif_transpose(Image.open(a.photo)).convert('RGB')
    img = img.resize((a.width, round(img.height * a.width / img.width)), Image.LANCZOS)
    with torch.no_grad():
        pred = model(prep(img).unsqueeze(0).to(device))[-1].sigmoid().cpu()[0, 0].numpy()
    m = Image.fromarray((pred * 255).astype(np.uint8)).resize(img.size, Image.BILINEAR)
    m.save(a.mask)
    print(a.mask, m.size, 'coverage %.2f' % (np.asarray(m) > 128).mean())


if __name__ == '__main__':
    main()
