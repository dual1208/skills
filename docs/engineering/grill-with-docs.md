Quickstart:

```bash
npx skills add dual1208/skills --skill=grill-with-docs
```

```bash
npx skills update grill-with-docs
```

[Source](https://github.com/dual1208/skills/tree/main/skills/engineering/grill-with-docs)

## What it does

Works through a design in question rounds and writes down what you agree. After each answered round it updates the glossary and records significant decisions as ADRs, so the reasons are preserved while they are fresh.

Questions that can be answered independently arrive together, each with a recommendation. Questions that depend on your answers wait for the next round. The agent looks up available facts itself and uses your words in the questions and documents.

## When to reach for it

Invoke this by typing `/grill-with-docs`; the agent does not invoke it on its own. Use it when you want to challenge a design and keep the resulting decisions in the project.

## Prerequisites

Use it in the project where the documents belong. It reads existing design notes, CONTEXT.md, and ADRs, then carries forward earlier decisions.

## What gets recorded

Agreed terms go into CONTEXT.md. Significant choices and their reasons go into ADRs. Open questions stay in the design notes, clearly unresolved. There is no requirement to invent a term or an ADR for every answer.

The discussion ends when the important choices are settled and you confirm the shared understanding. Confirmation already given counts; you do not have to repeat it.

## Where it fits

This combines [grilling](https://github.com/dual1208/skills/tree/main/skills/productivity/grilling) with [domain-modeling](https://github.com/dual1208/skills/tree/main/skills/engineering/domain-modeling). It can follow an [architecture review](https://github.com/dual1208/skills/tree/main/skills/engineering/improve-codebase-architecture) or start directly from an idea. [Ask-matt](https://github.com/dual1208/skills/tree/main/skills/engineering/ask-matt) maps the other workflows.
