# Plates

The illustrations behind the home page's chapters, and the tools that make them. Nothing in
this folder is deployed: the finished plates are in `public/plates/`, and where each layer sits
(depth, position) is in `src/lib/plates.ts`.

The cutting scripts write greyscale layers to `layers/`. `tone.py` then maps each one through a
colour ramp from `tones.json` (cyanotype blue, with orange where the light falls) and writes the
finished plates to `public/plates/`. The tones are baked in rather than applied by the browser,
so scrolling stays cheap; plates look the same in both themes.

| Plate | What it is | Made with |
| --- | --- | --- |
| Highveld (opener and chapter 01) | Storm sky, power station on the horizon, pylon, cosmos | `layers.py` cut-outs |
| Control room (chapter 02) | Desk in front of the room | `room_planes.py`, BiRefNet matte |
| Forge (chapter 03) | Hearth, fire and sparks in front of the wall | `room_planes.py`, BiRefNet matte plus Depth Anything V2 |
| Writing desk (chapter 04) | Desk, typewriter and lamp in front of the walls | `room_planes.py`, BiRefNet matte plus a desk polygon |
| Pattern | Circuit "damask" behind every page | `circuit_tile.py` |

Sources and their Pixabay pages are in [CREDITS.md](CREDITS.md).

## Rebuilding

Python 3 with Pillow, NumPy and SciPy. The two models also need PyTorch and Transformers, and
download from Hugging Face on first use: Depth Anything V2 Small (Apache-2.0) and BiRefNet (MIT).
The mattes are kept in `masks/` and the greyscale layers in `layers/`, so changing a tone only
needs `tone.py`, and `room_planes.py` only needs a model for `--depth-min`.

Run everything from the repository root, with `python -I` because the scripts read downloaded files:

```bash
python -I art/tools/layers.py art/jobs.json art/sources art/layers
python -I art/tools/birefnet_mask.py art/sources/control-344231/power-plant-344231_1280.jpg art/masks/control.png
python -I art/tools/room_planes.py art/sources/control-344231/power-plant-344231_1280.jpg art/layers/rooms/control --mask art/masks/control.png --cut "270,320 648,320 648,452 270,452"
python -I art/tools/room_planes.py art/sources/forge-1561656/fire-1561656_1280.jpg art/layers/rooms/forge --mask art/masks/forge.png --depth-min 0.45
python -I art/tools/room_planes.py art/sources/desk-2584166/dark-2584166_1280.jpg art/layers/rooms/desk --mask art/masks/desk.png --add "398,503 880,490 990,560 1140,800 1185,853 470,853"
python -I art/tools/circuit_tile.py art/sources/circuit-5315089/circuit-5315089_1280.jpg art/layers/texture/circuit-tile.webp 380 180 420
python -I art/tools/portrait.py src/assets/henard-gertzen.png art/layers/portrait public/plates/portrait
python -I art/tools/tone.py art/tones.json art/layers public/plates
```

`layers.py` is copied from the Synodalia denomination-page skill. Its cut modes: `full` (the
whole photo), `png` (the file's own transparency), `sky` (bright sky becomes transparent) and
`skyline` (solid below the first dark run in each column).

## Rules the plates follow

- One coherent scene each; nothing floats. Things move with what they stand on: the desk
  polygon moves with the typewriter, the pylon's legs sink below the frame.
- Layers rise as the page scrolls, nearer ones faster, so a front plane only ever uncovers the
  strip just below its lower edges; each back plane fills the front's footprint from the
  pixels below it. Bottom-anchored cut-outs sink below the frame far enough to never lift clear.
- Key subjects sit beside the cards, not behind them: cards cover the middle of each plate.
- Phones never download a plate.
