# `react-doctor/anchor-has-content`

Add visible or aria-labelled text inside every `<a>`.

- **Category:** Accessibility
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/anchor-has-content>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on an `<a>` element (or a component mapped to `a` via the jsx-a11y `components` setting) that has no accessible content: no non-empty text child, no non-hidden JSX-element child, no `dangerouslySetInnerHTML` or `children` prop, and no `title` or `aria-label` attribute. Expression children that are literally `null` or `undefined` don't count as content (so `<a>{undefined}</a>` and `<a>{null}</a>` fire), and a child whose only element is `aria-hidden` is treated as absent. False positive: the rule only accepts `title`/`aria-label` even though its message mentions `aria-labelledby` — an anchor labelled solely via `aria-labelledby` (e.g. `<a aria-labelledby="lbl" href="/x" />`) is still flagged despite being accessible.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Give the anchor accessible content: visible text (`<a href="/docs">Documentation</a>`), a non-hidden child element, or a `title`/`aria-label`. For an icon-only link, label it: `<a href="/x" aria-label="Open settings"><Icon aria-hidden /></a>`. If the anchor is already labelled by `aria-labelledby` (which this rule doesn't recognize), add an inline eslint-disable on that line with a brief justification. See https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/anchor-has-content
