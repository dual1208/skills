Quickstart:

```bash
npx skills add dual1208/skills --skill=improve-codebase-architecture
```

```bash
npx skills update improve-codebase-architecture
```

[Source](https://github.com/dual1208/skills/tree/main/skills/engineering/improve-codebase-architecture)

## What it does

Reviews a concrete area of the codebase, explains worthwhile changes, and uses an accurate visual report when that helps. It uses the real system as the baseline: a local experiment is labeled separately and proposed components are never shown as already deployed.

After you choose a change, it discusses unresolved decisions in question rounds and updates the glossary and ADRs as answers settle the design. Choices you have already made carry forward.

## When to reach for it

Invoke this by typing `/improve-codebase-architecture`; the agent does not invoke it on its own. Use it when you want to make an existing system easier to understand, maintain, or test. You can name a specific area to review.

## Prerequisites

Use it in the repository being reviewed. It reads relevant code, instructions, CONTEXT.md, and ADRs. Claims about a running deployment require deployment evidence, not just source files.

## The report and discussion

Each proposed change explains the current behavior, the problem, what would change, the cost, and how to check it. One worthwhile change is enough. The report does not manufacture candidates to fill a template or rename your concepts to fit a vocabulary.

The discussion groups independent questions into rounds, gives recommendations, and waits for your answers before asking dependent questions. After each answered round, agreed terms go into CONTEXT.md and significant decisions go into ADRs. Open choices remain visible as open choices.

## Where it fits

Use [codebase-design](https://github.com/dual1208/skills/tree/main/skills/engineering/codebase-design) for focused interface work. [Grill-with-docs](https://github.com/dual1208/skills/tree/main/skills/engineering/grill-with-docs) starts the question-and-document workflow directly. [Ask-matt](https://github.com/dual1208/skills/tree/main/skills/engineering/ask-matt) maps the remaining workflows.
