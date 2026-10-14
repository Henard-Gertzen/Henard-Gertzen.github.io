---
# Copy this file, rename it (the file name becomes the URL), and fill it in.
# Files starting with "_" are ignored by the site.
title: "Short, outcome-first title"
summary: "One sentence a hiring manager can read in five seconds: what changed, for whom."
client: "Anonymised description, e.g. 'B2B SaaS team, 12 developers, ABP and Angular'"
role: "What you did, e.g. 'AI enablement lead'"
period: "e.g. 'Jan to Mar 2026'"
stack: ["Claude Code", ".NET", "ABP Framework", "Angular"]
metrics:
  # Each metric renders as "before → after". Keep them comparable: same unit, same method.
  # The numbers below only illustrate the format.
  - label: "Review rounds per agent-authored PR"
    before: 4.2
    after: 1.3
    unit: "rounds"
    note: "Median over 30 PRs each side" # optional: how it was measured
featured: false # true opens the home page's Agent Tooling chapter with it
order: 10 # lower comes first
draft: true # drafts show in `npm run dev` only
---

## Context

Who the team is, what the codebase looks like, and how they used coding agents before. No names.

## Problem

What the agent got wrong, with one concrete (anonymised) example, and what it cost.

## What I built

The harness, the context and the evals: what each one is and why.

## How I measured

How the baseline was taken, how "after" was taken, the sample size, and what was held constant.

## Results

What the numbers above mean, including anything that got worse.

## What didn't work

At least one approach you tried and dropped, and why.
