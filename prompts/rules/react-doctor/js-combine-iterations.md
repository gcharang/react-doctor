# `react-doctor/js-combine-iterations`

Combine `.map().filter()` (or similar chains) into a single pass with `.reduce()` or a `for...of` loop to avoid iterating the array twice

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

The rule fires on chained calls where both methods are in {map, filter, forEach, flatMap} — e.g. arr.map(fn).filter(pred) or arr.filter(pred).map(fn). The exact arr.map(fn).filter(Boolean) and arr.map(fn).filter(x => x) shapes are intentionally skipped (covered by js-flatmap-filter). False positive when the intermediate array is genuinely used elsewhere, or N is tiny enough that the extra pass is negligible.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Collapse into one pass with arr.flatMap(item => keep(item) ? [transform(item)] : []), arr.reduce((acc, item) => ..., []), or a plain for...of loop pushing into one output array. Avoids both the intermediate allocation and the second full traversal. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap
