# `react-doctor/js-set-map-lookups`

Use a `Set` or `Map` for repeated membership tests / keyed lookups — `Array.includes`/`find` is O(n) per call

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

The rule fires on arr.includes(...) or arr.indexOf(...) inside a loop body. Receivers that look like strings (string literals, template literals, String(x), chained string-returning methods like .toLowerCase(), DOM string props like textContent / href / className, or identifiers named text / url / html / json / etc.) are intentionally skipped. Remaining false positives are small arrays (< ~10 items) or arrays rebuilt per iteration.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Build once before the loop: const lookupSet = new Set(items); then use lookupSet.has(value) for O(1) membership checks. For value-to-data lookups, use a Map. Total cost drops from O(n*m) to O(n+m). https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
