# `react-doctor/no-autofocus`



- **Category:** Accessibility
- **Severity:** warn
- **Source:** oxlint-builtin:jsx-a11y
- **Framework:** global
- **Enabled when:** always (unless customRulesOnly=true)
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-autofocus>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on any JSX element with the autoFocus prop set to anything other than false (so autoFocus, autoFocus={true}, and autoFocus={undefined} all trigger). By default both DOM elements and custom components are checked; ignoreNonDOM: true skips PascalCase components. False positive: a modal/dialog where focus must move to a specific element on open as part of intentional focus management.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Remove the autoFocus prop. If focus must move on mount (e.g. when a dialog opens), use a ref + useEffect to call .focus() imperatively only in that scenario, or rely on a focus-trap library that respects user context. Auto-focus on page load disorients screen reader users and steals focus before they finish reading prior content. See https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-autofocus
