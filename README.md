# henard-gertzen.github.io

My portfolio: AI enablement for .NET/ABP and Angular teams. A static
[Astro](https://astro.build) site, deployed to GitHub Pages by GitHub Actions on
every push to `main`.

The previous 3D site lives on the `legacy-3d-site` branch.

## Run it

Needs Node 22.12 or newer.

```bash
npm install
npm run dev      # http://localhost:4321, drafts included
npm run build    # type-check, then build to dist/
npm run preview  # serve dist/ locally
npm run todos    # list every {{TODO: ...}} placeholder left
```

## Adding content

Everything lives in `src/content/` as Markdown. Drop in a `.md` file and the site
picks it up: the file name becomes the URL. The frontmatter is checked at build
time (`src/content.config.ts`), so a missing or misspelled field fails the build
with a clear message.

Anything you don't know yet can be a placeholder: `{{TODO: what's missing}}`. It
renders as a yellow chip so it can't pass as real, and `npm run todos` lists it.
In the frontmatter you can also use inline code in `backticks`.

### A blog post: `src/content/posts/my-post.md`

```markdown
---
title: "How I make Claude Code write ABP/.NET code to team standards"
description: "One sentence, used in lists, search results and link previews."
date: 2026-11-02
tags: ["claude-code", "abp"]
draft: true   # optional: drafts show in `npm run dev` only
---

The post, in Markdown. Code blocks are highlighted for light and dark themes.
```

Tags get their own pages at `/writing/tags/<tag>/`. Published posts go into the
RSS feed at `/rss.xml`.

**A post published elsewhere** (LinkedIn, a guest post) gets the same frontmatter
plus `externalUrl` and `outlet`, and no body. It's listed with the other posts and
links straight out:

```yaml
externalUrl: "https://www.linkedin.com/pulse/..."
outlet: "LinkedIn"
```

### A case study: `src/content/case-studies/my-client.md`

Copy `src/content/case-studies/_template.md` (files starting with `_` are
ignored), rename it, and fill it in. It has the fixed sections: Context, Problem,
What I built, How I measured, Results, What didn't work. Stack is rendered from
the frontmatter.

Metrics are what make a case study scannable. Each one renders as a
**before → after** row in the same format everywhere:

```yaml
metrics:                                  # illustrative numbers
  - label: "Review rounds per agent-authored PR"
    before: 4.2
    after: 1.3
    unit: "rounds"
    note: "Median over 30 PRs each side"   # optional
```

Keep case studies anonymised: no employer, client or product names.

Set `featured: true` to list it under "Built" on the home page.

### A project: `src/content/projects/my-project.md`

```yaml
---
title: "pwsh-axi"
kind: "Agent tooling"         # the small label above the title
summary: "One or two sentences."
status: "Open source"
group: tooling                # tooling, or games for the "Built with AI" section
links:
  - label: "Repository"
    href: "https://github.com/..."
highlights:                   # short, concrete, ideally measured
  - "87 tests, CI on Node 20 and 22"
stack: ["Node.js", "PowerShell 7"]
cover:                        # optional screenshot, next to the .md file
  src: "./images/pwsh-axi.png"
  alt: "What the screenshot shows"
tagline: "Six words or so"     # optional: its line in the home page's Built list
featured: false               # true lists it under Built on the home page
order: 5                      # lower comes first
draft: false                  # optional: true hides it outside `npm run dev`
---
```

The home page's Built list shows featured case studies first, then featured
projects, each with its `tagline`. Cover images are resized and converted to WebP at build
time, so a full-size PNG or JPG is fine.

### The "Recently" log: `src/content/log.yaml`

The dated list on the home page. Add an entry when you ship, write or start
something; it's sorted by date, so order in the file doesn't matter.

```yaml
- id: nuke-france            # any unique name
  date: 2026-10-06
  text: Shipped Nuke France, a game I made in a weekend
  href: https://de-jonkheer.itch.io/nuke-france   # optional
```

## Site settings: `src/site.ts`

Your email, links, the hero copy, the CV path, the Kit form ID and the
GoatCounter code. The page titles and descriptions used for
SEO and link previews are there too.

- **Newsletter:** the signup form posts straight to Kit, with no third-party
  script. It stays disabled until `kitFormId` is set. In Kit, set the form's
  redirect URL to `/subscribed/`.
- **Analytics:** GoatCounter (no cookies, no banner). The script only loads once
  `goatCounter` is set.
- **CV:** put the PDF at `public/cv.pdf` and set `cv: '/cv.pdf'`; a download link
  then appears on the Contact page.

## SEO

Every page gets a title, description, canonical URL and an Open Graph image.
The images are generated at build time (`src/pages/og/`) from the page's title
and description, so new posts and case studies get one automatically. The
sitemap is at `/sitemap-index.xml`.

## Design

The aim is a site that reads as made by a person, not generated: the checklist
of "AI design tells" in the frontend-design skill was the guide.

- **Type:** Bricolage Grotesque for the name, headings and numbers; Source Serif 4
  for everything else. JetBrains Mono only for code. No uppercase labels.
- **Colour:** neutral paper and true-black ink; safety orange from Load Shedding
  marks things (underlines, bullets, the brand square, button hover) and is never
  used for body text in light mode. Dark mode is the game's navy. Every colour is
  a token at the top of `src/styles/global.css`, written as `light-dark(light, dark)`.
- **Structure:** lists, not cards. Dates, plain sentences and real screenshots do
  the work; no numbered sections, eyebrows or "→" links.
- **Motion:** only in answer to the visitor: page cross-fades, the theme switch
  wipe, underline and button transitions. All off for `prefers-reduced-motion`.
- **JavaScript:** the theme toggle, the copy button and the footer clock.

## Deploying

Pushing to `main` runs `.github/workflows/static.yml`, which builds the site and
publishes `dist/` to GitHub Pages. In the repository settings, Pages must be set
to deploy from **GitHub Actions**.
