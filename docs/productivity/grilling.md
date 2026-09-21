Quickstart:

```bash
npx skills add dual1208/skills --skill=grilling
```

```bash
npx skills update grilling
```

[Source](https://github.com/dual1208/skills/tree/main/skills/productivity/grilling)

## What it does

Stress-tests a plan through question rounds. Each round asks the independent questions that can be answered now and gives a recommendation for each. It waits for your answers before asking questions that depend on them.

The agent looks up facts available in the code, tools, documentation, or running system. It asks you about choices and preferences, rather than asking you to do its research.

## When to reach for it

Type `/grilling`, or the agent uses it when you ask to grill an idea, challenge assumptions, or work through design decisions. Use [grill-with-docs](https://github.com/dual1208/skills/tree/main/skills/engineering/grill-with-docs) when the discussion should also update a project glossary and ADRs.

## How rounds work

If two decisions can be made independently, they belong in the same round. If the second depends on the first answer, it waits. Your replies change which questions need asking next. A settled decision is not asked again unless new evidence changes the tradeoff.

The discussion ends when the important decisions are settled and you confirm the shared understanding. The agent does not silently treat an unanswered question as agreement.

## Where it fits

This is the question workflow used by [grill-with-docs](https://github.com/dual1208/skills/tree/main/skills/engineering/grill-with-docs) and [grill-me](https://github.com/dual1208/skills/tree/main/skills/productivity/grill-me). [Ask-matt](https://github.com/dual1208/skills/tree/main/skills/engineering/ask-matt) helps choose among the other workflows.
