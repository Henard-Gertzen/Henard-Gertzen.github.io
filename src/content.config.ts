import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// A `{{TODO: ...}}` placeholder can stand in for any value that isn't known yet.
const todo = z.string().regex(/^\{\{TODO:[^}]*\}\}$/);
const todoOr = <T extends z.ZodType>(schema: T) => z.union([schema, todo]);

// Files starting with an underscore (like _template.md) are ignored.
const markdown = (base: string) => glob({ pattern: '**/[^_]*.md', base });

const metric = z.object({
  label: z.string(),
  before: z.union([z.string(), z.number()]),
  after: z.union([z.string(), z.number()]),
  unit: z.string().optional(),
  note: z.string().optional(),
});

const caseStudies = defineCollection({
  loader: markdown('./src/content/case-studies'),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    client: z.string(),
    role: z.string(),
    period: z.string(),
    stack: z.array(z.string()),
    metrics: z.array(metric).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(100),
    draft: z.boolean().default(false),
  }),
});

const posts = defineCollection({
  loader: markdown('./src/content/posts'),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: todoOr(z.coerce.date()),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // Set for posts published elsewhere (LinkedIn, a guest post): the list links out.
    externalUrl: todoOr(z.url()).optional(),
    outlet: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: markdown('./src/content/projects'),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    group: z.enum(['tooling', 'games']),
    kind: z.string(),
    status: z.string(),
    links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
    highlights: z.array(z.string()).default([]),
    stack: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(100),
  }),
});

const talks = defineCollection({
  loader: markdown('./src/content/talks'),
  schema: z.object({
    title: z.string(),
    kind: z.enum(['talk', 'workshop', 'podcast']),
    event: z.string(),
    date: todoOr(z.coerce.date()),
    location: z.string().optional(),
    url: todoOr(z.url()).optional(),
    slides: todoOr(z.url()).optional(),
  }),
});

export const collections = { caseStudies, posts, projects, talks };
