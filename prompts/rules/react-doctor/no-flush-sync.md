# `react-doctor/no-flush-sync`

Use startTransition for non-urgent updates — flushSync forces a sync flush that skips View Transitions and concurrent rendering

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm an ImportDeclaration whose source is exactly "react-dom" with a named specifier flushSync. The rule reports the import (one diagnostic per file) rather than every call site. False positive: integrating with a non-React imperative library that must observe a fully-committed DOM before its next line runs (e.g. before scrollIntoView).

## Fix prompt

Use this once validation confirms the diagnostic is real.

Replace the flushSync wrapper with startTransition for non-urgent updates so React can batch and run View Transition snapshots. Only keep flushSync when a third-party API genuinely needs the DOM committed synchronously, and never inside a transition you want animated — flushSync silently drops the View Transition. See https://react.dev/reference/react-dom/flushSync
