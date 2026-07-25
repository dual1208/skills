---
name: grilling
description: A relentless one-question-at-a-time interview that stress-tests a plan, design, or idea before any code is written, optionally recording what it settles into CONTEXT.md and ADRs. Use when the user says "grill me", "grill this", "stress-test", "poke holes in", "interview me", "challenge my thinking", or wants a design interrogated rather than implemented.
---

# Grilling

Interview the user relentlessly about a plan, decision, or idea until you reach
a genuinely shared understanding. This is the one skill where the autonomy rule
in `house-rules` is suspended on purpose — the pausing *is* the product.

## The discipline

Treat the subject as a **decision tree**. Walk each branch, resolving
dependencies between decisions one at a time.

- **One question per turn.** Wait for the answer before the next. Asking three
  at once is bewildering and produces shallow answers to all three.
- **Attach a recommended answer to every question.** Never ask an open "what do
  you think?" — give your pick and your reason, so the user can accept it in a
  word or push back with a specific objection. This is what makes the interview
  fast instead of exhausting.
- **Look up facts, ask only decisions.** If something is discoverable from the
  filesystem, the git history, a tool, or the network — go find it. Never spend
  a question on a fact. The *decisions* are the user's; put each one to them and
  wait.
- **Order by dependency.** A question whose answer depends on an unresolved
  question comes later. If you find yourself guessing at a prior answer to phrase
  the current question, you're asking out of order.
- **Do not start building.** Not a scaffold, not a "quick sketch". The output of
  a grilling is understanding, and possibly documents — never an implementation.
  Stop when the user confirms the understanding is shared.

## With or without a paper trail

Two modes. Pick by asking once at the start, or infer from context.

**Stateless** (default when there's no repo, or the subject isn't code): the
conversation is the artifact. Save nothing.

**With docs** (default when you're in a repo and the subject is that codebase):
run `domain-modeling` alongside. As terms get challenged and decisions
crystallise, write them down *the moment they settle*, not at the end —
vocabulary into `CONTEXT.md`, hard-to-reverse decisions into an ADR under
`docs/adr/`. A decision recorded three turns after it was made is already
distorted.

## Where it goes next

When the understanding is shared, hand off rather than sprawl:

- Multi-session build → `to-spec`, then `to-tickets`, then `implement`.
- Single-session build → `implement` directly, in this same context window.
- A question that needs a *runnable* answer (does this state model feel right?
  what should this UI look like?) → detour through `prototype`.
- Idea still wrapped in fog, too big to hold in one session → `wayfinder`.

Keep the grilling, the spec, and the tickets in **one unbroken context window**
so they build on the same thinking. If the session gets long before you reach
`to-tickets`, don't push on degraded — `handoff` and continue fresh.
