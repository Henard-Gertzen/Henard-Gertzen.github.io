---
title: "pwsh-axi"
kind: "Agent tooling"
summary: "A Windows diagnostics CLI for agents: processes, ports, services, event logs and system facts as token-efficient TOON, with honest exit codes and idempotent changes."
status: "Private, demo on request"
highlights:
  - "87 tests, CI on Node 20 and 22"
  - "Measured against raw PowerShell: it wins where an answer joins two sources and ties where one cmdlet already answers, and the README says so"
  - "Claims that didn't survive testing were removed and listed under 'What this does not do'"
stack: ["Node.js", "PowerShell 7", "TOON"]
group: tooling
order: 4
---
