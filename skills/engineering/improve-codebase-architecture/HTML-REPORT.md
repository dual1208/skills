# Architecture report

Write a readable report that shows what exists and what would change. Adapt its length to the problem; it need not be a catalog of candidates.

## Save and show it

Unless the user specifies a destination, save a new report as architecture-review-<timestamp>.html in the OS temporary directory. For a correction, update the existing report and mark the correction clearly.

Use a self-contained HTML document with local CSS. Use Mermaid or SVG when they make the relationships clearer; a CDN is optional, not a requirement. Keep basic content readable if a diagram library fails to load.

Open the report using the available viewer and give the user its absolute path. Inspect the rendered result, including the diagrams, before claiming it was visually checked.

## What to show

Start with the actual system and the evidence used. For a deployed system, the left-hand diagram should say "Deployed now" and contain only verified deployed processes, ports, or behavior.

Show proposed changes under "Proposed", never as if they already run. Put experiments in a separate area labeled "Local experiment only", with their location and limitations. A prototype must not quietly replace the deployed baseline.

For each worthwhile change, include:
- A plain title describing the action.
- The specific files or running processes involved.
- The problem, in one concrete sentence.
- A current/proposed diagram when useful.
- What improves, what it costs, and how to test it.

Recommend the best next step. Do not create extra cards or abstract benefit labels to satisfy a template.

## Language

Use the words the user already understands. Keep technical names such as TCP, TLS, SSH, or a function name when needed for accuracy. Explain an unfamiliar term at first use if the user needs it to make a decision.

Write "both clients use the same certificate checks", not "leverage across clients". Write "changing this rule takes one edit", not "locality improves". Write the actual rule instead of calling it an invariant.

Describe a missing feature as missing. Describe a new helper as a new process if that is what will run. Avoid making a proposed addition sound like an existing feature being rearranged.

## Layout

Use clear headings, readable body text, restrained colors, and enough space around diagrams. Stack comparisons on narrow screens. Diagram labels must fit without shrinking into unreadable text.

Keep the report focused on the user's decision. Do not make them learn a design vocabulary to understand their own system.
