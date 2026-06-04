# `react-doctor/jsx-no-useless-fragment`

Drop the fragment when it wraps a single child or holds multiple children directly under an HTML tag.

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** off by default (opt-in)
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-useless-fragment>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a fragment (`<></>`, `<Fragment>`, or `<React.Fragment>`) with fewer than two meaningful children — whitespace-only text containing a newline is treated as padding and ignored, so `<><Foo /></>` and `<div><>foo</></div>` both trip the single-child path. It also fires, separately, on a fragment with 2+ children sitting directly inside a lowercase HTML element (e.g. `<div><>{"a"}{"b"}</></div>`), since the element can hold the children directly; this HTML-element branch only triggers when the single-child check did not already report. Several escape hatches suppress it: a `key` attribute, any `{call()}` child (e.g. `<>{items.map(...)}</>`), a single text-only child whose parent is not itself JSX (`content={<>text</>}`), and `allowExpressions: true` which permits `<>{expr}</>`. False positive: a single-child fragment kept intentionally to widen the return type to `ReactNode` or to keep a conditional symmetric (`show ? <>{children}</> : null`) — confirm only when the wrapper is genuinely redundant.

## Fix prompt

Use this once validation confirms the diagnostic is real.

For a single-child fragment, remove the wrapper and return its lone child directly: `<><Foo /></>` becomes `<Foo />`, and `<div><>foo</></div>` becomes `<div>foo</div>`. For the multi-child-inside-HTML case, drop the fragment and let the element hold the children: `<div><>{"a"}{"b"}</></div>` becomes `<div>{"a"}{"b"}</div>`. For an empty `<></>` or `<Fragment />`, delete it entirely or replace it with the value it was standing in for; if a single-child wrapper is deliberate (broadening the return type to `ReactNode` or keeping branches symmetric), enable `allowExpressions` for the `<>{expr}</>` case or leave it as-is rather than collapsing. See https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-useless-fragment
