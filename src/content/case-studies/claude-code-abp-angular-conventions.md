---
title: "Making Claude Code follow ABP and Angular conventions"
summary: "How I set up the harness, context and evals so Claude Code writes ABP/.NET and Angular code that passes review against a team's own conventions."
client: "Product team on ABP Framework (.NET) and Angular {{TODO: team size and domain, anonymised}}"
role: "{{TODO: your role, e.g. AI enablement lead}}"
period: "{{TODO: period, e.g. Mar to Aug 2026}}"
stack:
  - "Claude Code"
  - ".NET"
  - "ABP Framework"
  - "Angular"
  - "{{TODO: eval and CI tooling used}}"
metrics:
  - label: "Review rounds per agent-authored PR"
    before: "{{TODO: baseline PR review rounds}}"
    after: "{{TODO: PR review rounds after}}"
    note: "{{TODO: how and over how many PRs this was measured}}"
  - label: "Convention checks passed in the eval suite"
    before: "{{TODO: baseline eval pass rate}}"
    after: "{{TODO: eval pass rate after}}"
    unit: "%"
    note: "{{TODO: number of eval tasks and how each is scored}}"
featured: false # true when written: puts it back in the home page Proof row
order: 1
draft: true # hidden until written; remove to publish
---

## Context

{{TODO: two or three sentences on the team, the codebase and how they used Claude Code before. Anonymised: no company, client or product names.}}

## Problem

{{TODO: what the agent got wrong, with one concrete anonymised example: which ABP layer or Angular convention it ignored, and what that cost reviewers.}}

## What I built

I worked in three layers:

- **Harness:** {{TODO: settings, permissions, hooks and commands, and how the team installs them}}
- **Context:** {{TODO: what went into CLAUDE.md and skills for this codebase, and which exemplar files the agent is pointed at}}
- **Evals:** {{TODO: the task set, how each task is scored against the conventions, and how often it runs}}

## How I measured

{{TODO: how the baseline was taken (sample size, period), how the "after" numbers were taken, and what was held constant (model, tasks, reviewers).}}

## Results

{{TODO: what the numbers above mean in practice, including anything that got worse or didn't move.}}

## What didn't work

{{TODO: at least one approach you tried and dropped, and why.}}
