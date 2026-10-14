/**
 * Site-wide settings. Anything still wrapped in {{TODO: ...}} is a placeholder:
 * the newsletter form and analytics stay switched off until their value is real.
 */
export const site = {
  name: 'Henard Gertzen',
  url: 'https://henard-gertzen.github.io',
  tagline: 'AI enablement for .NET and Angular teams',
  hero: {
    title: 'Full-stack developer who builds with coding agents.',
    subtitle: 'Enterprise .NET and Angular, Claude Code set up to follow a team’s standards, and games made in Godot.',
  },
  email: 'henardgertzen@gmail.com',
  location: 'South Africa (UTC+2)',
  links: {
    github: 'https://github.com/Henard-Gertzen',
    linkedin: 'https://www.linkedin.com/in/henard-g-5b4267199',
  },
  // The resume PDF, linked from the Contact page. It's printed from src/pages/cv by
  // `npm run cv` (see the README); a {{TODO}} here hides the link.
  cv: '/cv.pdf',

  // Kit form ID: the number in the form's embed URL (app.kit.com/forms/<id>/...).
  kitFormId: '10032559',
  // Web3Forms access key for the contact form (web3forms.com; free, no account).
  // Until it's set, the Contact page shows only the email link.
  web3formsKey: '{{TODO: Web3Forms access key}}',
  // GoatCounter site code: the "<code>" in https://<code>.goatcounter.com.
  goatCounter: 'henard',
};

/** Title and description for each standalone page; also drives its Open Graph image. */
export const pages = {
  '/': {
    title: 'Henard Gertzen | Full-stack developer who builds with coding agents',
    description:
      'Full-stack .NET and Angular developer in South Africa. I set up Claude Code to follow a team’s standards, build tooling for coding agents, and make games in Godot.',
  },
  '/case-studies/': {
    title: 'Case studies',
    description: 'How I made coding agents follow real teams’ standards, with baselines, results and what didn’t work.',
  },
  '/projects/': {
    title: 'Projects',
    description: 'Agent harnesses and tooling for Claude Code, plus games made in Godot.',
  },
  '/writing/': {
    title: 'Writing',
    description: 'What coding agents actually are, and how to get them to follow a team’s standards.',
  },

  '/contact/': {
    title: 'Contact',
    description: 'What I do: full-stack .NET and Angular development, and AI harnesses for coding agents. How to get in touch.',
  },
  '/feed/': {
    title: 'Follow by RSS',
    description: 'Get new posts from Henard Gertzen in your feed reader, or by email.',
  },
  '/about/': {
    title: 'About',
    description: 'Henard Gertzen: a South African developer who makes coding agents behave like members of the team.',
  },
} as const;

export type PagePath = keyof typeof pages;
