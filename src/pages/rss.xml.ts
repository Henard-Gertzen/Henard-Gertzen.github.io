import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getPosts, postHref } from '../lib/content';
import { isTodo } from '../lib/todo';
import { pages, site } from '../site';

export const GET: APIRoute = async ({ site: siteUrl }) => {
  // Drafts and posts still missing a real date or link stay out of the feed.
  const posts = (await getPosts()).filter(
    (post) => !post.data.draft && post.data.date instanceof Date && !isTodo(postHref(post)),
  );

  return rss({
    title: `${site.name}: Writing`,
    description: pages['/writing/'].description,
    site: siteUrl ?? site.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date as Date,
      link: postHref(post),
      categories: post.data.tags,
    })),
    customData: '<language>en</language>',
  });
};
