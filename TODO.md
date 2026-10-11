# TODO

Everything on the site that is still a placeholder. Run `npm run todos` for the
live list with file and line numbers; this file groups the same 38 placeholders
by what needs doing.

Placeholders render as yellow `{{TODO: ...}}` chips so nothing unfinished can
pass as real. Each section says whether its placeholders are **visible** on the
live site or **hidden** (drafts, or settings the site leaves out until they're set).

## Accounts: `src/site.ts`

- [x] Kit: form `10032559`, redirecting to `/subscribed/` after signup.
- [x] GoatCounter: `henard` (henard.goatcounter.com).

## Not built yet

- [ ] **Case study** (hidden draft, 18 placeholders):
  `src/content/case-studies/claude-code-abp-angular-conventions.md`. Client, role,
  period, tooling, both metrics (baseline, after, method) and all six sections.
  Anonymised throughout: no Sygnio, client or product names. Then remove
  `draft: true` and set `featured: true` to put it in the home page's Proof row.
  Until then the Case studies page says the first one is in progress.
- [ ] **Eval suite** (hidden draft, 7 placeholders):
  `src/content/projects/eval-suite.md`. Name, summary, status, repo URL, two
  highlights, stack. Then remove `draft: true`; `featured: true` also puts it in
  the home page's Proof row.
- [ ] **Draft post** (hidden, 7 placeholders):
  `src/content/posts/claude-code-abp-team-standards.md`. Fill the outline from the
  case study, then remove `draft: true` to publish.
- [ ] **CV** (hidden): put an updated PDF at `public/cv.pdf` and set
  `cv: '/cv.pdf'` in `src/site.ts`; the Download button then appears on Work with
  me. The 2024 student CV stays on the
  `legacy-3d-site` branch.

## Waiting on links or bookings

- [ ] **Load Shedding Steam page**: nothing on the site yet. When the page is live,
  add a `links` entry to `src/content/projects/load-shedding.md`.
- [ ] **First workshop booking** (hidden draft, 3 placeholders):
  `src/content/talks/claude-code-rollout-workshop.md`. Host, date, location, then
  remove `draft: true`. Until something is booked, the Talks page says "Nothing
  booked yet".

## Workshop: `src/site.ts` (hidden)

- [ ] **Price** (`workshop.price`) and **format** (`workshop.format`). Neither
  shows on the Work with me page until it's set.
- [ ] Confirm the workshop agenda on the Work with me page (harness, context, evals).
  It's visible now, so edit it if it isn't what you'd run.

## Facts to check (not placeholders)

I wrote these from your LinkedIn profile, your 2024 CV, the READMEs of your
Synodalia repos and my notes from your game projects. Please confirm they're
accurate:

- **About** (from LinkedIn): based in Secunda; first WordPress sites in a
  high-school holiday job (DYOPTRI, 2017 to 2018); BSc IT at North-West
  University, 2021 to 2024, with freelance design alongside; full-stack developer
  since 2025, React/Next.js then enterprise .NET and Angular. The current
  employer is deliberately not named.
- **Writing**: links your LinkedIn article "The Lazy Optimizer" (6 Aug 2026).
- **Directorate Harness**: NO_COLOR 171 → 118 tokens (-31%); profile costs of 162
  (solo), 945 (directorate) and 312 (operative) tokens. From its BENCHMARKS.md.
- **pwsh-axi**: 87 tests, CI on Node 20 and 22. From the repo description.
- **Load Shedding**: 60 to 80 seeded bot runs per difficulty cell; deterministic
  dynamic difficulty; GDScript chosen for a browser demo.
- **Nuke France**: six Shorts rendered from a script; browser performance work.
- **The Paracelsian**: four milestones, 53 automated tests; ML matting pipeline.
- **Ides of Plunder**: seeded world bit-exact with its browser prototype.
- **Coblynau**: from its README (damage calculator on a worker thread, material
  limits that explain refusals, Blender-generated assets). Private repo, no link.
- **University** (from the repos and your 2024 CV): Share2Teach (CMPG 323,
  final-year group project, 2024); chat app (CMPG 315, 95% for the Networks
  project); text messaging app (networks group task, 2024); Skreenkinikor
  (CMPG 223, 2023). Only the two public repos are linked.
