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
  build: {
    // The stylesheet is small; inlining it removes the only render-blocking request.
    inlineStylesheets: 'always',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/subscribed'),
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
      provider: fontProviders.fontsource(),
      name: 'Bricolage Grotesque',
      cssVariable: '--font-display',
      weights: ['500 800'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['sans-serif'],
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
