import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

// Satori reads WOFF but not WOFF2, so the static Fontsource packages supply the files.
const fontFile = (pkg: string, file: string) => readFile(join(process.cwd(), 'node_modules', '@fontsource', pkg, 'files', file));

let fonts: Promise<Parameters<typeof satori>[1]['fonts']> | undefined;
const loadFonts = () =>
  (fonts ??= Promise.all([
    fontFile('bricolage-grotesque', 'bricolage-grotesque-latin-800-normal.woff'),
    fontFile('bricolage-grotesque', 'bricolage-grotesque-latin-600-normal.woff'),
    fontFile('source-serif-4', 'source-serif-4-latin-400-normal.woff'),
  ]).then(([display, displaySemi, serif]) => [
    { name: 'Display', data: display, weight: 800 as const, style: 'normal' as const },
    { name: 'Display', data: displaySemi, weight: 600 as const, style: 'normal' as const },
    { name: 'Serif', data: serif, weight: 400 as const, style: 'normal' as const },
  ]));

const h = (type: string, style: Record<string, unknown>, children?: unknown) => ({ type, props: { style, children } });

export interface OgCard {
  kicker: string;
  title: string;
  description: string;
}

/** Renders a 1200×630 PNG card in the site's light theme. */
export async function renderOg({ kicker, title, description }: OgCard) {
  const titleSize = title.length > 70 ? 60 : title.length > 45 ? 70 : 80;
  const svg = await satori(
    h(
      'div',
      {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '64px 72px',
        background: '#f7f4ee',
        color: '#1a1814',
        borderTop: '16px solid #0b6847',
      },
      [
        h('div', { display: 'flex', alignItems: 'center', gap: 18, fontFamily: 'Display', fontWeight: 600, fontSize: 28 }, [
          h('div', { width: 22, height: 22, background: '#0b6847' }),
          h('div', { display: 'flex' }, 'Henard Gertzen'),
          h('div', { display: 'flex', color: '#4d473e', marginLeft: 8 }, `/ ${kicker}`),
        ]),
        h('div', { display: 'flex', flexDirection: 'column', gap: 28 }, [
          h(
            'div',
            { display: 'flex', fontFamily: 'Display', fontWeight: 800, fontSize: titleSize, lineHeight: 1.02, letterSpacing: '-0.035em' },
            title,
          ),
          h('div', { display: 'flex', fontFamily: 'Serif', fontSize: 30, lineHeight: 1.35, color: '#4d473e', maxWidth: 980 }, description),
        ]),
        h(
          'div',
          { display: 'flex', justifyContent: 'space-between', paddingTop: 22, borderTop: '3px solid #1a1814', fontFamily: 'Display', fontWeight: 600, fontSize: 24 },
          [h('div', { display: 'flex' }, 'henard-gertzen.github.io'), h('div', { display: 'flex', color: '#0b6847' }, 'AI enablement')],
        ),
      ],
    ) as Parameters<typeof satori>[0],
    { width: 1200, height: 630, fonts: await loadFonts() },
  );
  return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
}
