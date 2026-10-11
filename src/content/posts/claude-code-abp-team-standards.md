---
title: "How I make Claude Code write ABP/.NET code to team standards"
description: "The harness, context and evals that take a coding agent from code that compiles to code your reviewers accept."
date: 2026-10-11
tags: ["claude-code", "abp", "dotnet", "context-engineering", "evals"]
draft: true
---

> Draft outline. Every section below is a prompt for what to write, not finished text.

## The gap: compiles vs. mergeable

- Out of the box an agent writes plausible, generic .NET. ABP has strong opinions (layers, application services, DTOs, permissions, localization) and the agent doesn't know which ones your team follows.
- The cost lands on reviewers: {{TODO: one anonymised example of a review comment that kept coming back}}.
- The thesis: treat the agent like a new hire. Give it the onboarding, the guardrails and a way to check its own work.

## 1. Write the standards down where the agent reads them

- A short root CLAUDE.md, with per-layer notes close to the code: Domain, Application, EntityFrameworkCore, HttpApi, and the Angular app.
- State rules as rules ("application services return DTOs, never entities"), not as essays.
- {{TODO: what you learned about length and placement, and what the agent ignored}}

## 2. Show, don't describe: exemplar files

- Point at one or two "golden" files per pattern instead of describing the pattern in prose.
- {{TODO: which exemplars worked best, e.g. an entity end to end}}

## 3. Make conventions checkable

- Turn the rules that matter into checks the agent can run: analyzers, architecture tests, lint rules.
- Run them in hooks so the agent sees failures before a reviewer does.
- {{TODO: which checks you added and which ones caught the most}}

## 4. Skills for the repeatable ABP tasks

- One skill per recurring job, e.g. a new entity end to end: entity, repository, application service, DTOs, permissions, localization, Angular proxy and page.
- {{TODO: which skills you built and how often they're used}}

## 5. Evals: prove it got better

- A fixed task set, scored against the conventions, run before and after each change to the setup.
- Baseline → after: {{TODO: link the case study numbers once they're filled in}}

## What didn't work

- {{TODO: at least one thing you tried and dropped}}

## Wrap-up

- The checklist version of this post.
- Link to the case study and the Work with me page.
