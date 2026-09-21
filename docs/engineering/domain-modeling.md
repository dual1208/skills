Quickstart:

```bash
npx skills add dual1208/skills --skill=domain-modeling
```

```bash
npx skills update domain-modeling
```

[Source](https://github.com/dual1208/skills/tree/main/skills/engineering/domain-modeling)

## What it does

Helps everyone use the same words for the same things and records important design decisions with their reasons. It starts with your language; it does not invent synonyms when an existing word is clear.

Agreed meanings belong in CONTEXT.md. Significant choices belong in architecture decision records (ADRs). When used during question rounds, it updates those documents after each answered round rather than waiting until the whole discussion ends.

## When to reach for it

Type `/domain-modeling`, or the agent uses it when discussing ambiguous project terms or editing CONTEXT.md or an ADR. Use it when a word means different things to different people, or an important decision needs a written explanation.

## Prerequisites

Use it in the relevant project. It follows existing glossary and ADR locations and creates documents only when there is something useful to record.

## Short documents, clear status

A glossary entry can be a term and one sentence. An ADR can be a paragraph explaining the choice and why it was made. ADRs are useful for consequential choices with real alternatives whose reasons would otherwise be hard to recover.

Proposals and unanswered questions stay visibly unresolved. A document must not turn an assumption into your decision or describe a local test as a production deployment.

## Where it fits

[Grill-with-docs](https://github.com/dual1208/skills/tree/main/skills/engineering/grill-with-docs) combines question rounds with these document updates. [Codebase-design](https://github.com/dual1208/skills/tree/main/skills/engineering/codebase-design) helps examine concrete implementation choices. [Ask-matt](https://github.com/dual1208/skills/tree/main/skills/engineering/ask-matt) lists other workflows.
