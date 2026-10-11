import type { APIRoute, GetStaticPaths } from 'astro';
import { getCaseStudies, getPosts } from '../../lib/content';
import { renderOg, type OgCard } from '../../lib/og';
import { pages, site } from '../../site';

// One Open Graph image per standalone page, case study and post: /og/<page path>.png
export const getStaticPaths = (async () => {
  const [studies, posts] = await Promise.all([getCaseStudies(), getPosts()]);
  const cards: (OgCard & { slug: string })[] = [
    ...Object.entries(pages).map(([path, meta]) =>
      path === '/'
        ? { slug: 'index', kicker: site.tagline, title: site.hero.title, description: site.hero.subtitle }
        : { slug: path.slice(1, -1), kicker: site.tagline, title: meta.title, description: meta.description },
    ),
    ...studies.map((s) => ({
      slug: `case-studies/${s.id}`,
      kicker: 'Case study',
      title: s.data.title,
      description: s.data.summary,
    })),
    ...posts
      .filter((p) => !p.data.externalUrl)
      .map((p) => ({ slug: `writing/${p.id}`, kicker: 'Writing', title: p.data.title, description: p.data.description })),
  ];
  return cards.map(({ slug, ...card }) => ({ params: { slug }, props: card }));
}) satisfies GetStaticPaths;

export const GET: APIRoute<OgCard> = async ({ props }) =>
  new Response(new Uint8Array(await renderOg(props)), { headers: { 'Content-Type': 'image/png' } });
