---
name: code-review
description: Review the changes since a fixed point (commit, branch, tag, or merge-base) along two axes — Standards (does the code follow this repo's documented coding standards?) and Spec (does the code match what the originating issue/PRD asked for?). Runs both reviews in parallel sub-agents and reports them side by side. Use when the user wants to review a branch, a PR, work-in-progress changes, or asks to "review since X".
---

Two-axis review of the diff between `HEAD` and a fixed point the user supplies:

- **Standards** — does the code conform to this repo's documented coding standards?
- **Spec** — does the code faithfully implement the originating issue / PRD / spec?

The two axes are kept **separate** so neither masks the other, then this skill
reports them side by side.

**Run both axes inline, in sequence, by default.** Per `house-rules`, don't
spawn subagents unless the user asked for them. Inline costs one context window
and gains determinism. Delegate to two parallel `general-purpose` sub-agents
**only** when the user explicitly asks to parallelise, or when the diff is large
enough (roughly >2000 changed lines) that one context can't hold both passes —
and say which you chose.

Running inline puts both axes in the same context, so the separation has to be
enforced by discipline instead: complete the Standards pass and write its
findings down **before** reading the spec. Don't let a spec requirement excuse a
smell, or a clean standards pass soften a missing requirement.

Resolve the issue tracker per the `tracker` skill when you need to fetch the
originating issue.

## Process

### 1. Pin the fixed point

Whatever the user said is the fixed point — a commit SHA, branch name, tag, `main`, `HEAD~5`, etc. If they didn't specify one, ask for it.

Capture the diff command once: `git diff <fixed-point>...HEAD` (three-dot, so the comparison is against the merge-base). Also note the list of commits via `git log <fixed-point>..HEAD --oneline`.

Before going further, confirm the fixed point resolves (`git rev-parse <fixed-point>`) and the diff is non-empty. A bad ref or empty diff should fail here — not inside two parallel sub-agents.

### 2. Identify the spec source

Look for the originating spec, in this order:

1. Issue references in the commit messages (`#123`, `Closes #45`, GitLab `!67`, etc.) — fetch via whatever the `tracker` skill resolved to.
2. A path the user passed as an argument.
3. A PRD/spec file under `docs/`, `specs/`, or `.scratch/` matching the branch name or feature.
4. If nothing is found, ask the user where the spec is. If they say there isn't one, the **Spec** sub-agent will skip and report "no spec available".

### 3. Identify the standards sources

Anything in the repo that documents how code should be written, such as `CODING_STANDARDS.md` or `CONTRIBUTING.md`.

On top of whatever the repo documents, the Standards axis always carries the **smell baseline** below — a fixed set of Fowler code smells (_Refactoring_, ch.3) that applies even when a repo documents nothing. Two rules bind it:

- **The repo overrides.** A documented repo standard always wins; where it endorses something the baseline would flag, suppress the smell.
- **Always a judgement call.** Each smell is a labelled heuristic ("possible Feature Envy"), never a hard violation — and, like any standard here, skip anything tooling already enforces.

Each smell reads *what it is* → *how to fix*; match it against the diff:

- **Mysterious Name** — a function, variable, or type whose name doesn't reveal what it does or holds. → rename it; if no honest name comes, the design's murky.
- **Duplicated Code** — the same logic shape appears in more than one hunk or file in the change. → extract the shared shape, call it from both.
- **Feature Envy** — a method that reaches into another object's data more than its own. → move the method onto the data it envies.
- **Data Clumps** — the same few fields or params keep travelling together (a type wanting to be born). → bundle them into one type, pass that.
- **Primitive Obsession** — a primitive or string standing in for a domain concept that deserves its own type. → give the concept its own small type.
- **Repeated Switches** — the same `switch`/`if`-cascade on the same type recurs across the change. → replace with polymorphism, or one map both sites share.
- **Shotgun Surgery** — one logical change forces scattered edits across many files in the diff. → gather what changes together into one module.
- **Divergent Change** — one file or module is edited for several unrelated reasons. → split so each module changes for one reason.
- **Speculative Generality** — abstraction, parameters, or hooks added for needs the spec doesn't have. → delete it; inline back until a real need shows.
- **Message Chains** — long `a.b().c().d()` navigation the caller shouldn't depend on. → hide the walk behind one method on the first object.
- **Middle Man** — a class or function that mostly just delegates onward. → cut it, call the real target direct.
- **Refused Bequest** — a subclass or implementer that ignores or overrides most of what it inherits. → drop the inheritance, use composition.

### 4. Run the two axes

**Default — inline, in sequence.** Standards first, written down in full, then
Spec. Don't read the spec until the Standards findings are committed to the
transcript; that ordering is what keeps the axes from contaminating each other
without a process boundary to enforce it.

**Standards pass** — against the diff, using the standards-source files from
step 3 plus the smell baseline above:

> Per file/hunk where relevant, report (a) every place the diff violates a
> documented standard, citing the standard (file + rule); and (b) any baseline
> smell, named, with the hunk quoted. Distinguish hard violations from
> judgement calls — documented-standard breaches can be hard, baseline smells
> are always judgement calls, and a documented repo standard overrides the
> baseline. Skip anything tooling enforces. Under 400 words.

**Spec pass** — against the diff and the spec from step 2:

> Report (a) requirements the spec asked for that are missing or partial;
> (b) behaviour in the diff that wasn't asked for (scope creep); (c)
> requirements that look implemented but where the implementation looks wrong.
> Quote the spec line for each finding. Under 400 words.

If the spec is missing, skip the Spec pass and note this in the final report.

**When delegating instead** (user asked to parallelise, or the diff is too big
for one context — see the note at the top): send one message with two
`general-purpose` `Agent` calls carrying the two briefs verbatim. The Standards
agent has no access to this skill, so **paste the smell baseline into its prompt
in full**. Then aggregate as below.

### 5. Aggregate

Present the two reports under `## Standards` and `## Spec` headings, verbatim or lightly cleaned. Do **not** merge or rerank findings — the two axes are deliberately separate (see _Why two axes_).

End with a one-line summary: total findings per axis, and the worst issue _within each axis_ (if any). Don't pick a single winner across axes — that's the reranking the separation exists to prevent.

## Why two axes

A change can pass one axis and fail the other:

- Code that follows every standard but implements the wrong thing → **Standards pass, Spec fail.**
- Code that does exactly what the issue asked but breaks the project's conventions → **Spec pass, Standards fail.**

Reporting them separately stops one axis from masking the other.
