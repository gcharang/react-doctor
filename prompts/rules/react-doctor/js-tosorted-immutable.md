# `react-doctor/js-tosorted-immutable`

Use `array.toSorted()` (ES2023) instead of `[...array].sort()` for immutable sorting without the spread allocation

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

The rule fires only on [...arr].sort(...) — an ArrayExpression containing exactly one SpreadElement, followed by .sort(). False positive when your runtime target is below ES2023 and Array.prototype.toSorted is not polyfilled (requires Node 20+, Safari 16+, Chrome 110+, Firefox 115+).

## Fix prompt

Use this once validation confirms the diagnostic is real.

Replace [...arr].sort(fn) with arr.toSorted(fn) — same immutable behavior without allocating the intermediate spread array. Companion non-mutating methods from the same proposal: toReversed, toSpliced, and with. Defined by the ES2023 'change Array by copy' proposal. https://github.com/tc39/proposal-change-array-by-copy
