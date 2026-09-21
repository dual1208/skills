---
name: grill-with-docs
description: Work through a design in question rounds, updating the glossary and architecture decision records as answers settle the plan.
disable-model-invocation: true
---

# Grill with Docs

Run the /grilling and /domain-modeling skills together. Preserve both parts: a careful discussion in rounds and written records of what has been agreed.

Read the existing design notes, CONTEXT.md, and relevant ADRs first. Use the user's words and carry forward decisions already made.

In each round, ask the independent questions that can be answered now, with a recommendation and reason for each. Wait for the user's answers before asking questions that depend on them. Look up available facts yourself.

After each answered round:

- Update agreed terms in CONTEXT.md.
- Record significant design decisions and their reasons in ADRs, following domain-modeling's guidance.
- Keep unresolved questions and assumptions in the design notes, separate from accepted decisions.
- Briefly tell the user what was recorded, then continue with the next round.

Keep these documents short and concrete. Do not invent terminology to fill a glossary, create an ADR for every answer, or describe a proposed feature as deployed. If an accepted decision changes, preserve why it changed instead of silently rewriting its history.

Finish according to the grilling skill: confirm the agreed design before acting on it. Do not make the user repeat confirmation already given.
