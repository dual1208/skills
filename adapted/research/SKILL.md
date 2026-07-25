---
name: research
description: Investigate a question against primary sources — official docs, source code, specs, first-party APIs — and capture the findings as a cited Markdown file in the repo. Use when the user wants a topic researched, API or library facts established, a technology compared, or reading legwork done before a design decision.
---

# Research

Answer a question from **primary sources** and leave a cited artifact behind.

## Run it inline

Do the reading yourself, in this session. Per `house-rules`, don't spawn a
background agent unless the user explicitly asked to delegate — an agent starts
cold, re-derives the context you already hold, and returns a summary you then
have to verify anyway.

Delegate only when the user says so, or when the reading is genuinely
open-ended enough to blow the session's context *and* you don't need the
findings to continue. Then it's:

```bash
claude --bg --name "Research: <question>" "<the brief below>"
```

## The brief

1. **Follow every claim to the source that owns it.** Official documentation,
   the library's own source, the RFC or spec, the first-party API reference.
   A blog post, a Stack Overflow answer, or a model's recollection is a *lead*,
   not a source — chase it to the primary and cite that.
2. **Prefer the installed version.** Facts about a dependency come from the copy
   in `node_modules` / site-packages / the lockfile, not from the latest docs
   online. Version skew is the most common way research goes quietly wrong —
   note the version you checked against.
3. **Separate what you verified from what you inferred.** If a claim rests on
   reasoning rather than a source, mark it. An unmarked inference is the
   expensive failure mode: it reads exactly like a fact.
4. **Say what you couldn't establish.** A named gap is useful; a confident guess
   papering over it is not.

## The artifact

Write findings to a **single Markdown file**, each claim carrying its source as
a link or a `file:line` reference.

Save it where the repo already keeps such notes — match the existing convention
(`docs/`, `notes/`, `.scratch/`). If there is none, put it somewhere sensible
and **say where** in your report. Don't create a new top-level directory for one
file.

Structure it question-first: the question, the answer in a few lines, then the
evidence. A reader should be able to stop after the top section.

## Where it goes next

Research **feeds** the thinking, it doesn't replace it. The file is something to
take into `grilling` or `to-spec` — not a decision in itself.
