---
name: psmux-ops
description: Run Windows administrator work through the existing elevated psmux session named agent-admin, multiplexing detached child windows with logs and exit markers instead of triggering a UAC prompt. Use whenever a command needs admin rights, a winget install returns exit 1602, an installer or service change fails with access denied, or several long jobs should run in parallel in the background.
---

# psmux Ops

Administrator work happens in the **already-elevated psmux session named
`agent-admin`** — "the sudo psmux session". Never open a second elevated
session, never trigger another UAC prompt, never ask the master to click
anything.

## When you need this

- A command fails with access denied / requires elevation.
- `winget install` returns exit **1602** — that's a UAC prompt refused by
  `--disable-interactivity`, not a broken package. Re-dispatch it here.
- Service, registry, driver, or `Program Files` changes.
- Several long jobs that should run in parallel without blocking the session.

Everything else runs unelevated. Reaching for elevation you don't need is a bug.

## The mechanism

You are **not attached** to the session, which is the thing that trips people
up: `psmux new-window -t agent-admin` exits 0 and silently creates nothing,
because `new-window` targets the *current* session and there isn't one.

Two working shapes:

**One-shot** — run in the session's own window, read the pane back:

```bash
psmux send-keys -t agent-admin '<powershell command>' Enter
sleep 3
psmux capture-pane -p -t agent-admin | tail -20
```

**Multiplexed** — send a `new-window` command *into* the session, so it executes
inside an elevated context and the child inherits elevation:

```bash
LOG='C:\Users\anfan\AppData\Local\Temp\<job>.log'
psmux send-keys -t agent-admin "psmux new-window -d -n <unique-name> -- powershell -NoProfile -Command \"<cmd> 2>&1 | Out-File -Encoding utf8 '$LOG'; 'EXIT=' + \$LASTEXITCODE | Out-File -Append -Encoding utf8 '$LOG'\"" Enter
```

Then poll the log for the marker rather than watching the pane:

```bash
until rg -q '^EXIT=' /c/Users/anfan/AppData/Local/Temp/<job>.log 2>/dev/null; do sleep 3; done
tail -5 /c/Users/anfan/AppData/Local/Temp/<job>.log
```

The detached window **exits on its own** when the command finishes — it won't
show up in `psmux lsw -t agent-admin` afterwards, and that's success, not
failure. The log is the source of truth.

## Rules

- **Unique window name per job.** `-n install-bottom`, not `-n work`. Parallel
  jobs each get their own window and their own log file.
- **Always an exit marker.** Without `EXIT=` you cannot distinguish "still
  running" from "died silently".
- **Logs go to the temp dir**, not the workspace. Clean them up when done.
- **Never log credentials** or raw authentication data. If a command takes a
  secret, don't echo it and don't redirect a transcript that contains it.
- **Record apply and rollback.** Every admin change reports both, in the same
  message:

  > Applied: `winget install --id Clement.bottom …`
  > Rollback: `winget uninstall --id Clement.bottom`

- Quote back the shortest decisive line from the log, not the whole thing.

## Verifying the session

```bash
psmux ls                                  # agent-admin should be listed
psmux capture-pane -p -t agent-admin | tail -5
```

To confirm it is genuinely elevated:

```bash
psmux send-keys -t agent-admin "([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)" Enter
psmux capture-pane -p -t agent-admin | tail -3   # expect: True
```

If `agent-admin` is gone entirely, **stop and tell the master** — recreating it
requires a UAC prompt, which is theirs to approve, not yours to provoke.
