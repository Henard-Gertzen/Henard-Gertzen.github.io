// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { todoMarks } from './src/lib/todo-marks.ts';

export default defineConfig({
  site: 'https://henard-gertzen.github.io',
  trailingSlash: 'ignore',
  // Standard HTML whitespace: Astro 7's default ('jsx') drops the space where
  // prose wraps onto a new line before a link.
  compressHTML: true,
  redirects: {
    '/work-with-me': '/contact',
  },
  build: {
    // The stylesheet is small; inlining it removes the only render-blocking request.
    inlineStylesheets: 'always',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/subscribed') && !page.includes('/contact/sent'),
    }),
  ],
  markdown: {
    processor: satteri({ hastPlugins: [todoMarks] }),
    shikiConfig: {
      themes: { light: 'github-light-default', dark: 'github-dark-default' },
      defaultColor: false,
    },
  },
  fonts: [
    {
      // The weight + optical-size variable file: 77 KB against 131 KB for the full
      // font, whose width axis the site never uses.
      provider: fontProviders.local(),
      name: 'Bricolage Grotesque',
      cssVariable: '--font-display',
      fallbacks: ['sans-serif'],
      options: {
        variants: [
          {
            src: ['@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-opsz-normal.woff2'],
            weight: '200 800',
            style: 'normal',
          },
        ],
      },
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Source Serif 4',
      cssVariable: '--font-body',
      // Static files: the variable font (with its optical-size axis) is ~6x larger.
      weights: [400, 600],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      fallbacks: ['serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'JetBrains Mono',
      cssVariable: '--font-mono',
      weights: ['400 700'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['monospace'],
    },
  ],
});
