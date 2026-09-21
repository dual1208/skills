---
name: grilling
description: Stress-test a plan or design through question rounds. Use when the user asks to grill an idea, challenge assumptions, or work through design decisions.
---

# Grilling

Interview the user until the important decisions are settled and you share an understanding of the plan. Challenge weak assumptions and explain tradeoffs in ordinary English. Keep track of which decisions depend on others; do not make the user learn names for that bookkeeping.

## Ask in rounds

Ask all currently answerable, independent questions together in a round. Number each question and include your recommended answer with a short reason. Then wait for the user's answers.

A question belongs in a later round if its answer depends on an unanswered question or an unfinished investigation. After each reply, carry forward the answers, revise the remaining questions, and ask the next round. Do not ask again about decisions already settled unless new evidence changes the tradeoff.

Use this format, or the available question tool with the same information:

```text
Round 1

Q1. [A concrete question]
Recommendation: [Your answer and why.]

Q2. [An independent question]
Recommendation: [Your answer and why.]
```

If a question tool has a size limit, use several batches within the same round. Keep dependent questions for the next round. If the user prefers one question at a time, follow that preference.

## Find facts; ask about decisions

Look up facts available in the code, filesystem, tools, documentation, or running system. Do not ask the user to supply information you can verify yourself. Use an independent sub-agent for a substantial investigation when useful, while continuing questions that do not depend on its result. Smaller lookups can be done directly.

Ask the user about consequential choices and preferences. Give enough context to make each question answerable. Do not silently turn your recommendation or an unanswered question into their decision.

## Finish the discussion

The discussion is complete when the important decisions and their consequences have been addressed, with no unresolved choice silently assumed. Summarize the agreed plan and ask the user to confirm the shared understanding before acting on it. Prior explicit confirmation counts; do not require it again.

When used with grill-with-docs, save agreed terms and decisions after each answered round using domain-modeling. Keep unresolved questions separate from accepted decisions.
