/**
 * The illustrated plates: where each layer sits and how far it rises as the page scrolls past.
 * The layer files are in public/plates/, already toned (see art/README.md for how they are made).
 */

export interface Layer {
  /** Path without extension: `${src}.webp` is 1280 px wide, `${src}-640.webp` a smaller copy. */
  src: string;
  /** The 1280 px file's size, so the browser can reserve the space. */
  size: [number, number];
  /** How far the layer rises as the page scrolls past: 0 stays put, bigger is nearer. */
  depth: number;
  /** A fill layer covers the whole frame (object-fit: cover); the others are placed. */
  fill?: boolean;
  left?: string;
  bottom?: string;
  width?: string;
  /** object-position for fill layers. */
  position?: string;
}

export interface Plate {
  layers: Layer[];
}

const room = (name: string, size: [number, number], extra: Partial<Layer> = {}): Layer[] => [
  { src: `/plates/rooms/${name}-back`, size, depth: 0.03, fill: true, ...extra },
  { src: `/plates/rooms/${name}-front`, size, depth: 0.17, fill: true, ...extra },
];

export const plates = {
  highveld: {
    layers: [
      { src: '/plates/highveld/sky', size: [1280, 854], depth: 0.04, fill: true, position: '50% 70%' },
      { src: '/plates/highveld/towers', size: [1280, 252], depth: 0.1, left: '-10%', bottom: '-5%', width: '120%' },
      { src: '/plates/highveld/pylon', size: [1280, 728], depth: 0.22, left: '-14%', bottom: '-13%', width: '62%' },
      { src: '/plates/highveld/cosmos', size: [1280, 853], depth: 0.5, left: '64%', bottom: '-26%', width: '46%' },
    ],
  },
  control: { layers: room('control', [1280, 853], { position: '50% 60%' }) },
  // Widened so the fire sits in the strip left of the cards.
  forge: { layers: room('forge', [1280, 950], { left: '-50%', width: '150%', position: '50% 70%' }) },
  desk: { layers: room('desk', [1280, 853], { position: '50% 50%' }) },
} satisfies Record<string, Plate>;

/** The photos the plates are made from, for the credits page; art/CREDITS.md also has their source folders. */
export const plateCredits = [
  { label: 'Storm', usedFor: 'The sky in the Highveld plate and behind the portrait', href: 'https://pixabay.com/photos/storm-thunderstorm-super-cell-3158852/' },
  { label: 'Power station', usedFor: 'The power station and grass on the Highveld horizon', href: 'https://pixabay.com/photos/nuclear-power-plant-chimneys-6574531/' },
  { label: 'Pylon', usedFor: 'The pylon in the Highveld plate and beside the portrait', href: 'https://pixabay.com/vectors/electricity-pylon-silhouette-5202532/' },
  { label: 'Cosmos', usedFor: 'The cosmos flowers in the Highveld foreground', href: 'https://pixabay.com/photos/cosmos-field-flower-cosmos-4756999/' },
  { label: 'Control room', usedFor: 'The control room plate', href: 'https://pixabay.com/photos/power-plant-conducting-electronic-344231/' },
  { label: 'Forge', usedFor: 'The forge plate', href: 'https://pixabay.com/photos/fire-wrought-forge-1561656/' },
  { label: 'Writing desk', usedFor: 'The writing desk plate', href: 'https://pixabay.com/photos/dark-room-office-table-chair-lamp-2584166/' },
  { label: 'Circuit board', usedFor: 'The background pattern', href: 'https://pixabay.com/photos/circuit-electric-trace-computer-5315089/' },
];
