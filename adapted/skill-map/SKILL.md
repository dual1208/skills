---
name: skill-map
description: Router over the installed skill pack — which skill fits the situation, how the engineering flow fits together, and what each skill hands off to. Use when the user asks "which skill should I use", "what skills do I have", "what can you do here", or when you need to pick between several plausible skills for a task.
---

# Skill Map

The installed pack, and how its pieces relate. A **flow** is a path through the
skills: most work runs along one main flow, with on-ramps merging onto it.

## Always underneath

- **`house-rules`** — the operating contract: autonomy level, environment,
  elevation, delegation, reporting. Every other skill assumes it. Read it when
  deciding *how* to act, not *what* to do.
- **`token-economy`** — cheapest-path heuristics: which CLI tool, how to bound
  search and read output, when to batch. Reach for it on anything that touches
  many files or produces a lot of output.
- **`tracker`** — where this repo's issues, specs, and tickets live. Detected,
  never configured. Consulted by the spec/ticket/triage skills.

## Main flow: idea → shipped

1. **`grilling`** — sharpen the idea by relentless one-question-at-a-time
   interview. In a repo, it runs `domain-modeling` alongside so decisions land
   in `CONTEXT.md` and ADRs as they're made.
2. **Question needs a runnable answer?** Detour through **`prototype`** —
   throwaway code that answers one design question. Keep the answer, delete the
   code.
3. **Multi-session build?**
   - **Yes** → **`to-spec`** (synthesise the thread into a spec), then
     **`to-tickets`** (tracer-bullet slices with blocking edges), then
     **`implement`** per ticket, clearing context between each.
   - **No** → **`implement`** right here.
4. **`implement`** drives **`tdd`** at agreed seams and closes with
   **`code-review`** before committing.

Keep steps 1–3 in **one context window** — the grilling, spec, and tickets
should build on the same thinking. If the session runs long before `to-tickets`,
don't push on degraded: **`handoff`** and continue fresh.

## On-ramps

- **Something's broken** → **`diagnosing-bugs`**. For bugs that resist a first
  glance: intermittent flakes, regressions, performance cliffs. It refuses to
  theorise before it has a tight feedback loop that already goes red.
- **Incoming issues piling up** → **`triage`**. Only for issues you didn't
  create; tickets from `to-tickets` are already agent-ready.
- **A huge, foggy effort** → **`wayfinder`**. Charts a map of *decision*
  tickets and resolves them one at a time until the route is clear. It plans,
  it doesn't build — when the fog lifts it hands off to `to-spec`. Slow and
  dense; save it for work genuinely too big for one session.
- **Merge or rebase conflict** → **`resolving-merge-conflicts`**.

## Vocabulary layers

Reach for these when the *words* are the problem, or let other skills pull them
in:

- **`codebase-design`** — deep modules: a lot of behaviour behind a small
  interface at a clean seam. Spoken by `tdd` and
  `improve-codebase-architecture`.
- **`domain-modeling`** — actively sharpening the project's domain language and
  recording decisions as ADRs. The discipline `grilling` drives.

## Standalone

- **`research`** — establish facts from primary sources, leave a cited Markdown
  file. Feeds the thinking; doesn't replace it.
- **`code-review`** — two-axis review (Standards + Spec) of a diff against a
  fixed point. Useful on its own, not just at the end of `implement`.
- **`tdd`** — the red-green loop plus what makes a test worth keeping.
- **`improve-codebase-architecture`** — survey for deepening opportunities,
  reported as HTML. Upkeep, not feature work.
- **`teach`** — learn a concept over multiple sessions, current directory as a
  stateful workspace.
- **`writing-great-skills`** — how to author a skill that triggers reliably and
  behaves predictably.
- **`handoff`** — compact this conversation into a document a fresh session can
  pick up. Forks the context; `/compact` continues it.

## Operations

- **`psmux-ops`** — Windows admin work through the elevated `agent-admin`
  session. Reach for it on access-denied, `winget` exit 1602, service/registry
  changes, or to fan out parallel background jobs.

## Output compression

- **`caveman`** — ultra-compressed responses, ~65% fewer output tokens.
  **Off by default**; switch on with `/caveman [lite|full|ultra]`, off with
  "stop caveman". Never applies to security warnings, irreversible-action
  confirmations, code, or commit messages.
- **`caveman-commit`** / **`caveman-review`** — terse commit messages and
  review comments.
- **`caveman-compress`** — shrink a memory/context file in place, keeping a
  readable backup.
- **`caveman-stats`** / **`caveman-help`** — session token numbers, and the
  reference card.
- **`cavecrew`** — compressed subagents. Only when the user asks to delegate.

## Picking between neighbours

| Situation | Skill |
|---|---|
| Idea is vague, one session's worth | `grilling` |
| Idea is vague, many sessions' worth | `wayfinder` |
| Design question needs running code | `prototype` |
| Facts are missing | `research` |
| Agreed, needs building | `implement` |
| Built, needs checking | `code-review` |
| Broken, cause unknown | `diagnosing-bugs` |
| Broken, cause known | just fix it — no skill needed |
