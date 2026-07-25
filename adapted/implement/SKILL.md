---
name: implement
description: Build a piece of work from an existing spec, ticket, or agreed plan — driving TDD at pre-agreed seams, typechecking as it goes, and closing with a code review before commit. Use when the user says "implement this", "build it", "make it so", "work the tickets", or points at a spec/ticket and asks for the code.
---

# Implement

Build the work described in the spec, ticket, or plan. **Run to completion** —
per `house-rules`, don't stop halfway to ask whether to continue.

## Before you start

- Resolve the tracker (`tracker`) if you need to read a ticket or close it.
- Read `CONTEXT.md` and any ADRs covering the area you're touching, so names and
  interfaces match the project's existing vocabulary.
- If the work spans multiple tickets, work them **blockers-first**, and clear
  context between tickets. One ticket per context window keeps each build
  sharp.
- **Branch first if you're on the default branch.** Never build directly on
  `main`/`master`.

## The loop

Drive `tdd` at pre-agreed seams — red, green, refactor, one slice at a time.
Where a seam wasn't agreed, pick one and say which; don't silently skip the
tests.

Run **typechecking** and the **single test file** you're working in frequently —
they're the cheap feedback. Run the **full suite once at the end**, not on every
cycle.

Reach for `codebase-design` vocabulary when deciding where a new module's
interface goes, and `diagnosing-bugs` if something breaks in a way you can't
immediately explain.

## Closing out

1. Run `code-review` over the diff — both axes, against the originating spec or
   ticket.
2. Fix what it surfaces, or record why a finding is being accepted.
3. Run the full test suite and typecheck once more if you changed anything.
4. **Commit to the current branch.** Push or open a PR only if the user asked —
   that's outward-facing.
5. Update the ticket's status on the tracker.

Report what you built, what the review found, and the state of the tests. If a
test is failing, say so with its output; never report done over a red suite.
