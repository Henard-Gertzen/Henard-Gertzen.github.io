/**
 * Site-wide settings. Anything still wrapped in {{TODO: ...}} is a placeholder:
 * the newsletter form and analytics stay switched off until their value is real.
 */
export const site = {
  name: 'Henard Gertzen',
  url: 'https://henard-gertzen.github.io',
  tagline: 'AI enablement for .NET and Angular teams',
  hero: {
    title: 'I make coding agents write code your team would merge.',
    subtitle: 'Harness engineering, context engineering and evals for .NET/ABP and Angular teams.',
  },
  email: 'henardgertzen@gmail.com',
  location: 'South Africa (UTC+2)',
  links: {
    github: 'https://github.com/Henard-Gertzen',
    linkedin: 'https://www.linkedin.com/in/henard-g-5b4267199',
  },
  // Drop the PDF in public/ and set this to its path, e.g. '/cv.pdf'. Until then
  // the Work with me page leaves the CV link out.
  cv: '{{TODO: updated CV PDF (put it in public/cv.pdf, then set this to /cv.pdf)}}',

  // Kit form ID: the number in the form's embed URL (app.kit.com/forms/<id>/...).
  kitFormId: '10032559',
  // GoatCounter site code: the "<code>" in https://<code>.goatcounter.com.
  goatCounter: 'henard',
};

/** Title and description for each standalone page; also drives its Open Graph image. */
export const pages = {
  '/': {
    title: 'Henard Gertzen | Coding agents that follow your team’s standards',
    description:
      'Harness engineering, context engineering and evals that make Claude Code write .NET/ABP and Angular code your team would merge.',
  },
  '/case-studies/': {
    title: 'Case studies',
    description: 'How I made coding agents follow real teams’ standards, with baselines, results and what didn’t work.',
  },
  '/projects/': {
    title: 'Projects',
    description: 'Agent harnesses, evals and tooling for Claude Code, plus games built by orchestrating coding agents.',
  },
  '/writing/': {
    title: 'Writing',
    description: 'What coding agents actually are, and how to make them write code your team would merge.',
  },

  '/work-with-me/': {
    title: 'Work with me',
    description: 'What I do: full-stack .NET and Angular development, and AI harnesses for coding agents. How to get in touch.',
  },
  '/about/': {
    title: 'About',
    description: 'Henard Gertzen: a South African developer who makes coding agents behave like members of the team.',
  },
} as const;

export type PagePath = keyof typeof pages;
