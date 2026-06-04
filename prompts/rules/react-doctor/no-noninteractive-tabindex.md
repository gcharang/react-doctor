# `react-doctor/no-noninteractive-tabindex`

Reserve tabIndex for interactive elements or interactive roles; remove it from non-interactive ones.

- **Category:** Accessibility
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-noninteractive-tabindex>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a native HTML element that is neither inherently interactive nor carrying an interactive/allowed role has a tabIndex resolving to a non-negative integer (tabIndex="0", tabIndex={0}, or positive) — e.g. <div tabIndex="0" /> or <article tabIndex={0} />. Negative values (tabIndex="-1"), role="tabpanel" or interactive roles (button, menu, grid, listbox…), interactive tags, and custom components are exempt; non-HTML element names are skipped entirely. False positive: by default allowExpressionValues is true, so a dynamic value like <div tabIndex={someVar} /> or role={cond ? "button" : "link"} is NOT flagged — only configs that set allowExpressionValues:false make expression containers fire.

## Fix prompt

Use this once validation confirms the diagnostic is real.

If the element is genuinely non-interactive, drop the tabIndex entirely so it stays out of the tab order; assistive tech already provides traversal. If you need it focusable only programmatically (e.g. to move focus after an action), use tabIndex={-1} instead of 0. If it is actually meant to be operable, give it a real interactive role plus keyboard handlers — <div role="button" tabIndex={0} onClick={…} onKeyDown={…} /> — or use a native <button>. See https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-noninteractive-tabindex
