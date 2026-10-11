import { getCollection, type CollectionEntry } from 'astro:content';

type Dated = Date | string;

/** Drafts show up in `npm run dev` and never in a production build. */
export const published = ({ data }: { data: { draft?: boolean } }) => import.meta.env.DEV || !data.draft;

/** Real dates sort by time; a {{TODO}} date sorts as "unknown". */
const time = (date: Dated, unknown: number) => (date instanceof Date ? date.valueOf() : unknown);

export async function getPosts() {
  const posts = await getCollection('posts', published);
  return posts.sort((a, b) => time(b.data.date, -Infinity) - time(a.data.date, -Infinity));
}

export async function getCaseStudies() {
  const studies = await getCollection('caseStudies', published);
  return studies.sort((a, b) => a.data.order - b.data.order);
}

export async function getProjects(group: CollectionEntry<'projects'>['data']['group']) {
  const projects = await getCollection('projects', (entry) => entry.data.group === group && published(entry));
  return projects.sort((a, b) => a.data.order - b.data.order);
}

/** Upcoming talks (and ones without a date yet) soonest first, then past talks newest first. */
export async function getTalks() {
  const talks = await getCollection('talks', published);
  const now = Date.now();
  const upcoming = talks
    .filter(({ data }) => time(data.date, Infinity) >= now)
    .sort((a, b) => time(a.data.date, Infinity) - time(b.data.date, Infinity));
  const past = talks
    .filter(({ data }) => time(data.date, Infinity) < now)
    .sort((a, b) => time(b.data.date, 0) - time(a.data.date, 0));
  return { upcoming, past };
}

export const postHref = (post: CollectionEntry<'posts'>) => post.data.externalUrl ?? `/writing/${post.id}/`;

export const tagSlug = (tag: string) => tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export function formatDate(date: Dated) {
  if (!(date instanceof Date)) return date;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
}

export const isoDate = (date: Dated) => (date instanceof Date ? date.toISOString().slice(0, 10) : undefined);

export function readingMinutes(markdown = '') {
  const words = markdown.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}
