Quickstart:

```bash
npx skills add dual1208/skills --skill=codebase-design
```

```bash
npx skills update codebase-design
```

[Source](https://github.com/dual1208/skills/tree/main/skills/engineering/codebase-design)

## What it does

Helps you design code that gives callers less to coordinate and maintainers fewer places to change. It explains the actual behavior and tradeoff in ordinary English, using your established terms.

It checks the code before describing it. Deployed behavior, repository code, local experiments, and proposals stay clearly labeled; a working local test never becomes evidence of a deployed feature.

## When to reach for it

Type `/codebase-design`, or the agent uses it when reviewing interfaces, responsibilities, dependencies, or tests. Use it when a caller needs too much knowledge of how another part works, or a small change requires edits in many places.

## Useful questions

What does a caller have to configure or do in the right order? Can the implementation handle that work? If a proposed abstraction disappeared, would its work disappear too, or would every caller need to repeat it?

These questions should produce a concrete explanation, such as “both clients use the same certificate checks.” They should not produce a list of design slogans. A small interface is useful when it hides work the caller should not have to manage.

## Where it fits

Use this directly or through [improve-codebase-architecture](https://github.com/dual1208/skills/tree/main/skills/engineering/improve-codebase-architecture) for a broader review. [Domain-modeling](https://github.com/dual1208/skills/tree/main/skills/engineering/domain-modeling) records agreed terms when they need clarification. [Ask-matt](https://github.com/dual1208/skills/tree/main/skills/engineering/ask-matt) lists the other workflows.
