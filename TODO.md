# TODO

Everything on the site that is still a placeholder. Run `npm run todos` for the
live list with file and line numbers; this file groups the same 46 placeholders
by what needs doing.

Placeholders render as yellow `{{TODO: ...}}` chips so nothing unfinished can
pass as real. Each section says whether its placeholders are **visible** on the
live site or **hidden** (drafts, or settings the site leaves out until they're set).

## Accounts: `src/site.ts`

- [ ] **Kit form ID** (`kitFormId`). Visible: the signup form shows the chip and
  stays disabled until this is set. Create the form in Kit, copy the number from
  the form's embed code (`app.kit.com/forms/<id>/subscriptions`), and set the
  form's redirect to `https://henard-gertzen.github.io/subscribed/`.
- [ ] **GoatCounter site code** (`goatCounter`). Hidden: no analytics script loads
  until it's set. The code is the `<code>` in `https://<code>.goatcounter.com`.

## Not built yet

- [ ] **Case study** (visible, 18 placeholders):
  `src/content/case-studies/claude-code-abp-angular-conventions.md`. Client, role,
  period, tooling, both metrics (baseline, after, method) and all six sections.
  Anonymised throughout: no Sygnio, client or product names.
- [ ] **Eval suite** (visible, 7 placeholders): `src/content/projects/eval-suite.md`.
  Name, summary, status, repo URL, two highlights, stack. It's a featured Proof
  card on the home page.
- [ ] **LinkedIn article** (visible, 4 placeholders):
  `src/content/posts/linkedin-article.md`. Title, summary, date and URL once it's
  published. It stays out of the RSS feed until the date and URL are real.
- [ ] **Draft post** (hidden, 7 placeholders):
  `src/content/posts/claude-code-abp-team-standards.md`. Fill the outline from the
  case study, then remove `draft: true` to publish.
- [ ] **CV** (visible): put an updated PDF at `public/cv.pdf` and set
  `cv: '/cv.pdf'` in `src/site.ts`. The 2024 student CV stays on the
  `legacy-3d-site` branch.

## Waiting on links or bookings

- [ ] **Nuke France itch.io URL** (visible): `src/content/projects/nuke-france.md`.
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

## About: `src/pages/about.astro` (visible)

- [ ] One or two sentences on your current work, without naming the employer or
  its clients. To come from your LinkedIn profile.

## Facts to check (not placeholders)

I wrote these from your old site, your 2024 CV, the READMEs of your Synodalia
repos and my notes from your game projects. Please confirm they're accurate:

- **About**: grew up in Secunda; first WordPress client sites while still at
  school (DYOPTRI, 2017 to 2018); BSc IT at North-West University, 2021 to 2024.
- **Directorate Harness**: NO_COLOR 171 → 118 tokens (-31%); profile costs of 162
  (solo), 945 (directorate) and 312 (operative) tokens. From its BENCHMARKS.md.
- **pwsh-axi**: 87 tests, CI on Node 20 and 22. From the repo description.
- **Load Shedding**: 60 to 80 seeded bot runs per difficulty cell; deterministic
  dynamic difficulty; GDScript chosen for a browser demo.
- **Nuke France**: six Shorts rendered from a script; browser performance work.
- **The Paracelsian**: four milestones, 53 automated tests; ML matting pipeline.
- **Ides of Plunder**: seeded world bit-exact with its browser prototype.
