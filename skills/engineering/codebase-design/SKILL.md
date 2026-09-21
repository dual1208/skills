---
name: codebase-design
description: Design or simplify code so callers have less to configure and maintainers can make changes in fewer places. Use when reviewing interfaces, responsibilities, dependencies, or testability.
---

# Codebase Design

Help the user understand what the code does today, what should change, and the tradeoff. Prefer a small, useful interface that keeps callers from having to coordinate implementation details.

## Explain the actual change

- Start with the user's problem and a concrete example. Name the relevant process, function, file, input, or output.
- Use the user's established terms. Keep familiar technical words when they are accurate; there is no banned-synonym list.
- Explain benefits as consequences: "changing the timeout takes one edit" or "both clients use the same certificate checks." Labels such as "locality" and "leverage" are not explanations.
- Use specialist terminology only when the distinction matters. Explain it briefly with an example if the user has not used it.
- A skill's vocabulary is a reasoning aid, not a required format for the answer. If the user rejects a term, use their clearer wording and update the relevant glossary.

## Establish what exists

Read the relevant code and configuration before proposing a change. For deployment questions, verify the running processes and listeners when possible.

Keep deployed behavior, repository code, local experiments, and proposals distinct. A local test is not evidence that a feature is deployed. Label diagrams "Deployed now", "Local experiment only", or "Proposed" as appropriate. State what could not be verified.

## Design checks

1. What must a caller know, configure, and do in the right order?
2. Can the implementation take responsibility for more of that work without hiding a meaningful choice or failure?
3. Which real callers benefit? Which files would change together afterward?
4. If this abstraction disappeared, would its complexity disappear too, or be repeated in callers?
5. Can tests exercise the same behavior that callers use?

In this skill, a module is code with an interface and an implementation. The interface includes configuration, ordering, errors, and performance expectations as well as methods and types. "Deep module" is shorthand for useful behavior behind a small interface; it does not describe file size or process count.

Combine code when it gives one place clear responsibility for a real behavior. Preserve separate processes or permissions when they serve a deployment or security need. Do not create extra abstractions merely to fit a diagram.

## Dependencies and tests

Accept dependencies where replacement or controlled testing is useful. Do not add an adapter framework for hypothetical alternatives. One concrete implementation can still justify an interface when there is an actual testing or ownership need; the number of implementations is evidence, not a mechanical rule.

Test observable results and important failure behavior. Keep implementation details private where possible. Preserve regression coverage when restructuring tests.

Read [DEEPENING.md](DEEPENING.md) when reorganizing coupled code and its tests. Read [DESIGN-IT-TWICE.md](DESIGN-IT-TWICE.md) when materially different designs need comparison. Use only the parts relevant to the user's request.
