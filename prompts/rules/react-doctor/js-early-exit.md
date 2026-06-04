# `react-doctor/js-early-exit`

Add an early `return` / `continue` to flatten deep nesting and short-circuit when the predicate is already known

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

The rule fires on a single-branch chain of nested ifs (each consequent is a block containing exactly one IfStatement) reaching depth >= 3 — i.e. if { if { if { if { ... } } } } with no else branches and no sibling statements. False positive only if you're outside a function or loop where return/continue is impossible.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Invert each guard up front: if (!precondition) return; if (!nextCondition) return; ..., leaving the happy path un-indented at the outermost level. In a loop use continue instead. Drops cognitive load and prevents indentation creep when new branches get added later. https://refactoring.guru/replace-nested-conditional-with-guard-clauses
