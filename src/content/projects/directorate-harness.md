---
title: "Directorate Harness"
kind: "Harness"
summary: "A bootloader and environment manager for Claude Code on Windows: one `dh` command that gives a solo agent and an orchestrated team the same tools, defaults and skills, working in place in your repository."
status: "Private for now"
links:
  - label: "Repository"
    href: "{{TODO: public harness repo URL}}"
highlights:
  - "Every claim in the README carries a number measured on a real machine"
  - "Setting NO_COLOR cut a sample PowerShell output from 171 to 118 tokens (-31%), so the harness configures it instead of asking the agent"
  - "Each agent profile's context cost is measured: 162 tokens for solo, 945 for the full orchestration profile"
  - "Ideas that failed measurement are recorded in BENCHMARKS.md instead of shipped"
stack: ["Claude Code", "Node.js", "PowerShell", "Git worktrees"]
group: tooling
featured: true
order: 1
---
