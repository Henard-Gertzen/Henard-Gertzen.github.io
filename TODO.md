# TODO

Everything on the site that is still a placeholder. Each one renders as a yellow
`{{TODO: ...}}` chip until it's replaced, so nothing unfinished can pass as real.

Run `npm run todos` for the live list with file and line numbers. This file
groups the same 63 placeholders by what you need to do. Placeholders in the
draft post only show in `npm run dev`; everything else is visible on the live
site.

## Accounts and settings: `src/site.ts`

- [ ] **Kit form ID** (`kitFormId`). Create a form in Kit, copy the number from its
  embed URL (`app.kit.com/forms/<id>/...`), and set the form's redirect URL to
  `https://henard-gertzen.github.io/subscribed/`. Until then the signup form is disabled.
- [ ] **GoatCounter site code** (`goatCounter`). Create a free site at goatcounter.com
  and set the code (the `<code>` in `https://<code>.goatcounter.com`). Until then no
  analytics script loads.
- [ ] **CV** (`cv`). Put an updated PDF at `public/cv.pdf` and set `cv: '/cv.pdf'`.
  The 2024 student CV stays on the `legacy-3d-site` branch.
- [ ] **Workshop price** (`workshop.price`).
- [ ] **Workshop duration and format** (`workshop.format`).

## Case study: `src/content/case-studies/claude-code-abp-angular-conventions.md`

Anonymised throughout: no Sygnio, client or product names.

- [ ] Client: team size and domain
- [ ] Your role
- [ ] Period
- [ ] Eval and CI tooling used (Stack)
- [ ] Metric 1: baseline PR review rounds
- [ ] Metric 1: PR review rounds after
- [ ] Metric 1: how and over how many PRs it was measured
- [ ] Metric 2: baseline eval pass rate
- [ ] Metric 2: eval pass rate after
- [ ] Metric 2: number of eval tasks and how each is scored
- [ ] Context section
- [ ] Problem section, with one concrete anonymised example
- [ ] What I built: harness
- [ ] What I built: context
- [ ] What I built: evals
- [ ] How I measured section
- [ ] Results section
- [ ] What didn't work section

## Projects: `src/content/projects/`

- [ ] `directorate-harness.md`: public harness repo URL
- [ ] `eval-suite.md`: real name, one-sentence summary, status, repo URL, two
  highlights (task count and coverage, how a task is scored), stack
- [ ] `claude-code-plugin.md`: real name, one-sentence summary, status, repo URL,
  two highlights (most useful skill or hook, a measured result), stack
- [ ] `the-directorate.md`: repo URL, if it goes public
- [ ] `pwsh-axi.md`: repo URL, if it goes public
- [ ] `load-shedding.md`: Steam page URL
- [ ] `nuke-france.md`: itch.io URL

## Writing: `src/content/posts/`

- [ ] `linkedin-article.md`: title, one-sentence summary, publish date, URL. It
  stays out of the RSS feed until the date and URL are real.
- [ ] `claude-code-abp-team-standards.md` (draft): seven placeholders in the outline
  (a recurring review comment, CLAUDE.md length and placement, best exemplars,
  checks added, skills built, link to the case study numbers, what didn't work).
  Remove `draft: true` to publish.

## Talks: `src/content/talks/`

- [ ] `claude-code-rollout-workshop.md`: host or event, date, location
- [ ] `first-talk.md`: title, event, date, location, event page URL. Or delete the
  file until you have a real talk.

## Pages

- [ ] `src/pages/about.astro`: one or two sentences on your current work, without
  naming the employer or its clients
- [ ] `src/pages/work-with-me.astro`: confirm the workshop agenda (harness, context,
  evals) or replace it

## Facts to check (not placeholders)

I wrote these from your old site, your 2024 CV, the READMEs of your Synodalia
repos and my notes from your game projects. Please confirm they're accurate and
that you're happy to publish them:

- **Hero line**: sharpened to "I make coding agents write code your team would
  merge." Your original is one edit away in `src/site.ts` (`hero.title`).
- **About**: grew up in Secunda; first WordPress client sites while still at
  school (DYOPTRI, 2017 to 2018); BSc IT at North-West University, 2021 to 2024.
- **Directorate Harness**: NO_COLOR 171 → 118 tokens (-31%); profile costs of 162
  tokens (solo) and 945 (directorate). From its BENCHMARKS.md.
- **pwsh-axi**: 87 tests, CI on Node 20 and 22. From the repo description.
- **The Directorate, Directorate Harness, pwsh-axi** are private repos today. Their
  descriptions are public on the site now; check that's fine and that none of them
  contain Sygnio material.
- **Load Shedding**: 60 to 80 seeded bot runs per difficulty cell; deterministic
  dynamic difficulty; GDScript chosen for a browser demo.
- **Nuke France**: six Shorts rendered from a script; browser performance work.
- **The Paracelsian**: four milestones, 53 automated tests; ML matting pipeline.
- **Ides of Plunder**: seeded world bit-exact with its browser prototype.
