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

Set `featured: true` to open the home page's Agent Tooling chapter with it.

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
  caption: "A few words"       # optional: shown under it on the home page
order: 5                      # lower comes first
draft: false                  # optional: true hides it outside `npm run dev`
---
```

On the home page, tooling projects get a card each in the Agent Tooling chapter; games with a
`cover` get a card each in the Games chapter, and the rest share its "Also on the Workbench"
card. Featured case studies open the Agent Tooling chapter. Cover images are resized and
converted to WebP at build time, so a full-size PNG or JPG is fine.

### The "Recently" log: `src/content/log.yaml`

The dated list in the home page's first chapter (the newest four). Add an entry when you ship,
write or start something; it's sorted by date, so order in the file doesn't matter.

```yaml
- id: nuke-france            # any unique name
  date: 2026-10-06
  text: Shipped Nuke France, a game I made in a weekend
  href: https://de-jonkheer.itch.io/nuke-france   # optional
```

## Site settings: `src/site.ts`

Your email, links, the hero copy, the CV path, the Kit form ID, the Web3Forms
access key and the GoatCounter code. The page titles and descriptions used for
SEO and link previews are there too.

- **Newsletter:** the signup form posts straight to Kit, with no third-party
  script. It stays disabled until `kitFormId` is set. In Kit, set the form's
  redirect URL to `/subscribed/`.
- **Contact form:** posts straight to Web3Forms, which emails you the message and
  sends the visitor to `/contact/sent/`. It stays hidden until `web3formsKey` is set.
- **Analytics:** GoatCounter (no cookies, no banner). The script only loads once
  `goatCounter` is set, and then only after the page has finished loading.
- **CV:** the resume is a page, `src/pages/cv/`, laid out for A4 in the site's style.
  After `npm run build`, `npm run cv` prints it with headless Chrome to `public/cv.pdf`
  (commit that; the Contact page links it). The public version describes the current
  employer without naming it and has no phone number. In a local `.env` (git-ignored), set
  `CV_EMPLOYER` and `CV_LINKEDIN_PDF` for a LinkedIn version (employer named, no phone), and
  `CV_PHONE` and `CV_PRIVATE_PDF` for an applications version: the build then also makes
  `/cv/linkedin/` and `/cv/private/`, and `npm run cv` prints them there. GitHub never sees
  the `.env`, so those versions are never deployed.

## SEO

Every page gets a title, description, canonical URL and an Open Graph image.
The images are generated at build time (`src/pages/og/`) from the page's title
and description, so new posts and case studies get one automatically. The
sitemap is at `/sitemap-index.xml`.

## Design

The home page is a long-form, illustrated feature, after the GKSA page in the Synodalia
project: an opener, an "at a glance" card, four chapters and a title block to close. Each
chapter's cards scroll over a framed plate; the frame stays put and the plates dissolve from one
chapter to the next.

- **Type:** Bricolage Grotesque for the name, headings and numbers; Source Serif 4 for text;
  JetBrains Mono for small labels, dates and chips.
- **Colour:** warm paper and ink by day, the Load Shedding navy by night. Safety orange marks
  things (kicker tags, drop caps, rules, bullets). Every colour is a token at the top of
  `src/styles/global.css`, written as `light-dark(light, dark)`.
- **Plates:** photo composites from Pixabay, toned like cyanotypes with orange where the light
  falls. Each layer drifts by its depth as the page scrolls; the cut-out front pieces move more
  than the backgrounds. Recipes are in `src/lib/plates.ts`; the files, sources, credits and the
  scripts that make them are in `art/` (see `art/README.md`). Phones never load a plate.
- **Devices:** a gauge dial around the portrait that turns as you scroll (hover over the
  portrait for colour), hex-nut chapter emblems, punch-card corners on the cards, crop and
  registration marks on the plates, boxed drop caps, and a title block for contact details.
  A circuit "damask" pattern sits behind every page.
- **Motion:** the plates' parallax, their dissolves and the dial are CSS scroll-driven
  animations, so they move in step with the scroll (browsers without them get still plates that
  scroll away at the end of each chapter). Also page cross-fades and the theme-switch wipe. All
  movement is off for `prefers-reduced-motion`; the dissolves stay.
- **JavaScript:** revealing each plate as its chapter comes near, the colour portrait on hover,
  the phone chapter bar, the theme switch, the copy button and the footer clock.

## Deploying

Pushing to `main` runs `.github/workflows/static.yml`, which builds the site and
publishes `dist/` to GitHub Pages. In the repository settings, Pages must be set
to deploy from **GitHub Actions**.
