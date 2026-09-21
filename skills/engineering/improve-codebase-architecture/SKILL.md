---
name: improve-codebase-architecture
description: Review a codebase for concrete design problems and explain worthwhile changes with an accurate visual report.
disable-model-invocation: true
---

# Improve Codebase Architecture

Find changes that make a real behavior easier to understand, use, change, or test. Explain the changes in ordinary English.

## Scope and evidence

Use the area the user names. Otherwise inspect recent changes and relevant code to choose a useful scope. Read applicable instructions, the project's glossary, and relevant recorded decisions. If a proposal conflicts with an accepted ADR, identify the conflict and explain why revisiting the decision may be justified; do not silently override it.

Use codebase-design for design checks when available. Its technical vocabulary is not a required vocabulary for the report.

Establish the current state before drawing it:
- Repository code shows what is implemented in that checkout.
- A local experiment shows only what that experiment did.
- Deployed behavior needs runtime or deployment evidence.
- Proposed changes belong only in the proposed picture.

When the user asks about a deployed system, use that system as the baseline. Never substitute a local prototype for it. If an experiment is relevant, label it separately with where it ran. If evidence is unavailable, state that instead of filling in the picture.

A second agent may inspect a substantial, independent part when delegation is authorized and useful. A review does not require delegation.

## Choose useful changes

Trace concrete operations and look for repeated coordination, confusing responsibility, unnecessary configuration, or tests that miss actual failures.

For each candidate, identify:
- The current behavior and supporting files or runtime evidence.
- The specific problem.
- What would change.
- A concrete benefit and its cost.
- How the change would be checked.

Ask what would happen if a suspected abstraction were removed: does its work disappear, or must callers repeat it? Use this to assess the design, not as a slogan in the report.

Present only candidates supported by evidence. A single useful change is enough. If the requested capability does not exist, say that adding it is new implementation work rather than inventing existing design defects.

## Present the review

When a visual report helps, use [HTML-REPORT.md](HTML-REPORT.md). If the user requests another format, use it.

Use the user's words and familiar technical names. Titles should describe an action, such as "Add camouflage in front of frps." Explain benefits with concrete consequences, not labels such as "leverage", "locality", or "invariants".

Clearly label current state, local tests, and proposals in both prose and diagrams. Say whether anything was changed or deployed.

## Discuss the chosen change in rounds

For an exploratory review with several meaningful choices, recommend one and ask which the user wants to explore. If the user already chose an area, use it; do not ask them to choose it again.

Once a change is chosen, use the /grilling and /domain-modeling skills together: ask questions in rounds and update the documents as answers settle the design. The user can also start this workflow directly with /grill-with-docs.

In each round, ask the questions that can be answered independently with what is already known. Give a recommendation and explain its tradeoff. Wait for the answers before asking questions that depend on them. Look up facts yourself. Carry forward decisions already made; do not restart a completed discussion or turn wording corrections into a new interview.

After each answered round, update agreed terms in CONTEXT.md and record significant decisions as ADRs. Keep unresolved choices visible in the design notes. Use plain language in both questions and documents. A proposal must not become an accepted ADR without an actual decision.

Finish when the important decisions are settled and the user confirms the design, then continue with implementation already authorized by the request. If the user explicitly asks to skip the interview, follow that instruction.
