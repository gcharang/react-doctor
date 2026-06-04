# `react-doctor/js-flatmap-filter`

Use `.flatMap(item => condition ? [value] : [])` — transforms and filters in a single pass instead of creating an intermediate array

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

The rule fires only on exactly arr.map(fn).filter(Boolean) or arr.map(fn).filter(x => x) (identity arrow). False positive if fn legitimately returns 0, '', NaN, null, or undefined that you want to keep — filter(Boolean) strips those, so the developer may have been relying on that to drop falsy results.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Rewrite as arr.flatMap(item => { const result = transform(item); return result ? [result] : []; }) so the transform-and-filter happens in one pass with no intermediate array. Preserve the original filter(Boolean) falsy-stripping semantics in your conditional (e.g. don't accidentally keep 0 or empty strings if they should be dropped). https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap
