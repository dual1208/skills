---
name: token-economy
description: Cheapest-path heuristics for getting a task done in the fewest tokens — which CLI tool to reach for, how to bound search and read output, when to batch calls, and when to switch on caveman mode. Use when a task involves searching or reading many files, when output is about to be large or repetitive, when a session is running long, or when the user asks to save tokens, be brief, or work more efficiently.
---

# Token Economy

Tokens are the budget. Spend them on thinking; never on transport. This skill is
the *how* behind the token-economy section of `CLAUDE.md`.

The default failure is not being too slow — it's hauling bytes through context
that never needed to be there. A file read whole to use six lines, a `find`
walking `node_modules`, a 400-line log pasted to quote one error.

## Search

Never `find | grep`. Reach in this order:

| Need | Tool | Note |
|---|---|---|
| Content match | `rg` | Bound with `-m`, `--glob`, `-l` when you only need paths |
| Filename match | `fd` | `-t f`, `-e ts`, `-HI` to include hidden/ignored |
| Content, huge tree | `ag` | Comparable to `rg`; use whichever is warm |
| Structural edit | `sd` | `sd 'old' 'new' $(fd -e ts)` beats a `sed` incantation |

Rules that matter more than the tool choice:

- **Ask for paths first, content second.** `rg -l` then read the two files that
  matter. Reading twelve files to find one is the expensive mistake.
- **Always cap.** `head_limit`, `-m/--max-count`, `--glob '!node_modules'`.
  An uncapped search on a monorepo can cost more than the entire task.
- **Count before you list.** `rg -c` tells you whether a listing is worth
  pulling in at all.

## Read

- Read the **slice**, not the file — ranged reads with `offset`/`limit`. Whole
  files are for files you'll actually use whole.
- **Never re-read a file you just wrote or edited.** The write would have errored
  if it failed. Verification by re-reading is pure waste.
- Prefer a targeted `rg -n 'symbol' -A 5` over opening the file to look for it.
- `bat -pp` over `cat` when you do need to display something — no pager, no
  decoration.

## Call shape

- **Batch independent calls into one block.** Two searches that don't depend on
  each other belong in the same message.
- Chain in the shell rather than round-tripping: `cmd1 && cmd2` in one call, not
  two calls with a model turn between them. Each round trip re-sends context.
- Dispatch genuinely long jobs (installs, builds, test suites) to the
  background and poll, instead of blocking a turn on them.

## Output

- **Don't narrate tool calls.** "Now I'll search for X" costs tokens and tells
  the reader nothing they won't see.
- **Don't echo back** file contents you just wrote, or the user's request.
- **Never paste a long log.** Quote the shortest decisive line — the assertion,
  the stack frame that names your code, the exit code.
- No decorative tables, no emoji, no summary-of-the-summary.
- When output is unavoidably long or repetitive, switch on `caveman` mode
  (`/caveman` or `/caveman ultra`) for roughly 65% fewer output tokens with
  technical substance intact.

## Process

- **Check installed skills before improvising a process.** Re-deriving a
  workflow the pack already encodes is the most expensive thing you can do.
- Don't spawn subagents on your own initiative — each one starts cold and
  re-derives context you already hold. See `house-rules`.
- Don't re-litigate settled decisions or re-establish facts already in the
  transcript.

## The one thing not to economise on

Correctness signals. Never skip running the tests, never trim the diff you're
reviewing, never guess at an API instead of checking it. A wrong answer
delivered cheaply costs a whole extra session — which is the worst token trade
available.
