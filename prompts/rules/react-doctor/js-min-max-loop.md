# `react-doctor/js-min-max-loop`

Use `Math.min(...array)` / `Math.max(...array)` instead of sorting just to read the first or last element

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

The rule fires on arr.sort()[0] (literal index 0) or arr.sort()[expr - 1] (BinaryExpression with operator '-' and literal 1 on the right) — i.e. grabbing the smallest or largest after sorting. False positive when .sort() uses a custom comparator that orders by something other than numeric values (string length, date, custom field) — Math.min/max won't replicate that.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Replace with Math.min(...arr) or Math.max(...arr) — O(n) instead of O(n log n), and avoids the in-place mutation that .sort() performs on the original array (a common subtle bug). For arrays larger than ~100k elements use a manual for loop to dodge the spread argument-length limit. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min
