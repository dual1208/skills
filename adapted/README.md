# adapted/ — personal skill pack

A rewrite of this repo's promoted skills for **anfan's** workstation, plus the
adapted caveman pack from the sibling `caveman` fork. Upstream `skills/` is left
untouched so `git pull` from `mattpocock/skills` still merges cleanly; this
directory is the thing that actually gets installed.

## Install

```bash
node adapted/install.mjs              # install into ~/.claude
node adapted/install.mjs --dry-run    # preview
node adapted/install.mjs --uninstall  # remove (uses the recorded manifest)
```

Copies rather than symlinks — Windows symlinks need developer mode or
elevation, and installing must never provoke a UAC prompt. Re-run after a pull
to resync. `~/.claude` is shared by the Claude Code CLI and Claude Desktop, so
one install covers both.

The installer backs `settings.json` up to `~/.claude/backups/` before every
write, and refuses to touch it if it doesn't already parse as JSON — a malformed
settings file is silently discarded *in full* by Claude Code, taking your
permissions with it.

## What changed from upstream

**Zero-config tracker.** `setup-matt-pocock-skills` is gone. The new `tracker`
skill *detects* where issues live — explicit repo config, then existing repo
convention, then GitHub via `gh`, then GitLab via `glab`, then local markdown
under `.scratch/`. No setup step gates the other skills any more.

**Inline over delegation.** `code-review` and `research` spawned subagents
unconditionally. Both now run inline by default and delegate only when
explicitly asked or when the work genuinely won't fit one context. `cavecrew`
gained a precondition saying the same thing. This matches the house rule that
subagents start cold and re-derive context you already hold.

**Invocation retuned for auto-firing.** `implement`, `to-spec`, `to-tickets`,
`triage`, and `writing-great-skills` were user-invoked only; they now
auto-trigger on intent, with trigger phrasing in their descriptions. Left
human-initiated because they're expensive or stateful: `wayfinder`,
`improve-codebase-architecture`, `handoff`, `teach`.

**Merged aliases.** `grill-me` and `grill-with-docs` were one-line wrappers over
`grilling`; folded into `grilling` as a stateless/with-docs mode switch.

**Dropped.** `personal/` (hardcoded WSL Obsidian path), `misc/` (shoehorn and
ai-hero-cli specific), `in-progress/`, `deprecated/`. Also `git-guardrails`,
which blocks git commands via hooks and works against this machine's deliberate
bypass-permissions posture.

**New, machine-specific.**

- `house-rules` — the operating contract every other skill assumes.
- `token-economy` — cheapest-path heuristics; the *how* behind CLAUDE.md's
  token rules.
- `psmux-ops` — Windows admin work through the elevated `agent-admin` psmux
  session. Documents the verified mechanism, including that
  `new-window -t <session>` silently no-ops from an unattached shell.
- `tracker` — see above.
- `skill-map` — router over the actual installed set, including caveman.

## Layout

`install.mjs` treats any directory here containing a `SKILL.md` as a skill, so
adding one means creating a folder. It also pulls from `../caveman/adapted`
(skills), `../caveman/adapted-agents` (subagents), and `../caveman/src/hooks`
(the mode hooks + statusline).
