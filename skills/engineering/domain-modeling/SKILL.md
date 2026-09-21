---
name: domain-modeling
description: Clarify project terminology and record agreed meanings or consequential design decisions. Use when discussing ambiguous terms or editing CONTEXT.md or an ADR.
---

# Domain Modeling

Help people use the same words for the same things. The goal is less confusion, not a larger vocabulary.

## Use the user's language

Start with words the user and project already use. Keep a familiar term if it describes the concept accurately. Introduce a new term only when an actual distinction would otherwise remain confusing, and explain that distinction with a concrete example.

When the user corrects a term, use the correction and update the glossary. An assistant-written glossary does not overrule the user. For example, if the user calls ordinary website behavior "camouflage", do not rename it "cover" without a necessary distinction.

Ask for clarification when a word has materially different meanings and context does not resolve them. Do not turn ordinary wording into a terminology interview. When a meaning or relationship remains ambiguous, try a concrete example or edge case to expose the difference before proposing new terms.

## Check facts separately

Use code and deployment evidence to check how the system behaves. Distinguish current implementation, running deployment, local experiments, and proposals. If the glossary and evidence disagree, explain the actual difference; do not assume the user is wrong because a document says otherwise.

## Maintain the glossary

Use the relevant CONTEXT.md, following an existing CONTEXT-MAP.md if the project has one. Create a glossary only when there is a useful agreed term to record.

Keep entries short: the term and its meaning, with a concrete example when helpful. Record rejected synonyms only when they caused real confusion. Keep deployment status, detailed design plans, and implementation notes in their appropriate documents.

Use [CONTEXT-FORMAT.md](CONTEXT-FORMAT.md) when writing entries.

## Keep documents current during question rounds

When used with grilling or grill-with-docs, update documents after each answered round. Record agreed meanings in CONTEXT.md and significant decisions in ADRs while their reasons are fresh. Put open choices and assumptions in design notes, clearly marked as unresolved. Do not wait until the end of the whole interview to save what has been settled.

## Record significant decisions

An architecture decision record (ADR) preserves what was chosen, why, and the tradeoff. Use one when the choice is costly to reverse, would surprise a future reader without context, and involved real alternatives. Keep it as short as the decision allows.

Do not record a proposal as an accepted decision or create a record for a routine wording correction. Use [ADR-FORMAT.md](ADR-FORMAT.md) when a decision record is warranted.
