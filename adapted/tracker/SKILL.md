---
name: tracker
description: Resolve where a repo's issues, specs, and tickets live — GitHub Issues via gh, GitLab via glab, or local markdown under .scratch/ — by detecting it from the repo rather than requiring setup. Read when another skill needs to create, read, label, or link an issue, ticket, or spec and the destination isn't already known.
---

# Tracker

Where issues, specs, and tickets go for the repo you're in. This replaces the
one-time setup wizard the upstream pack required: **detect, don't configure.**
Nothing here needs to be run before other skills work.

## Resolution order

Take the first that matches. Do the detection silently — it's a fact, not a
decision, so don't spend a question on it (see `house-rules`).

1. **An explicit repo config.** If `docs/agents/issue-tracker.md` exists, it
   wins outright — read it and follow it. A repo that has recorded its
   convention has opted out of detection. Same for an `## Agent skills` section
   in `CLAUDE.md` or `AGENTS.md` that names a tracker.
2. **An existing convention in the repo.** A populated `.scratch/*/issues/`
   directory, a `specs/` or `docs/prd/` tree already in use — match it. The
   convention the repo already has beats the one you'd pick.
3. **GitHub**, if `git remote -v` points at `github.com` *and* `gh auth status`
   succeeds. Use the `gh` CLI.
4. **GitLab**, if a remote points at `gitlab.com` or a self-hosted GitLab *and*
   `glab` is installed and authenticated.
5. **Local markdown** — the fallback, and a perfectly good answer. One file per
   issue under `.scratch/<feature>/issues/`. Works with no remote, no auth, no
   network.

State which one you resolved to, in one clause, the first time it matters in a
session: "Tracking locally under `.scratch/auth-rework/issues/`." Then stop
mentioning it.

## Local markdown layout

The fallback needs a shape, so here it is.

```
.scratch/<feature>/
  spec.md                 # the spec, if to-spec produced one
  issues/
    01-<slug>.md
    02-<slug>.md
```

Each issue file:

```markdown
---
id: 02-token-refresh
status: todo          # todo | in-progress | done | blocked
role: ready-for-agent # see Triage roles below
blocked-by: [01-session-store]
---

# Token refresh

## What
...

## Done when
- [ ] ...
```

`blocked-by` is a **list of issue ids in this directory** — the local stand-in
for a real tracker's native blocking links. A ticket is workable when every id
in its `blocked-by` has `status: done`. Resolve the frontier by reading the
files; there's no query engine, and you don't need one at this scale.

Add `.scratch/` to `.gitignore` unless the repo already commits it. If the repo
commits it, keep committing it — match what's there.

## Triage roles

Five canonical roles, used by `triage`. On a real tracker these are labels; in
local markdown they're the `role:` frontmatter field. The label strings default
to the role names themselves:

`needs-triage` · `needs-info` · `ready-for-agent` · `ready-for-human` · `wontfix`

If the repo's tracker already uses different strings for the same concepts
(`bug:triage` for `needs-triage`, say), **apply the existing ones** rather than
creating near-duplicate labels. Check `gh label list` / `glab label list` before
creating any label.

## Domain docs

Default: **single-context** — one `CONTEXT.md` and `docs/adr/` at the repo root.
This fits nearly every repo; use it without asking.

Use **multi-context** — a root `CONTEXT-MAP.md` pointing at per-context
`CONTEXT.md` files — only where the repo is genuinely a multi-package monorepo
(`pnpm-workspace.yaml`, a `workspaces` field, a populated `packages/*` each with
its own `src/`). Absence of those signals means single-context.

## Pull requests

Treat external PRs as a request surface (i.e. run `triage` over them) **only**
if the repo's `docs/agents/issue-tracker.md` says so. Default off — don't raise
it, don't ask about it.
