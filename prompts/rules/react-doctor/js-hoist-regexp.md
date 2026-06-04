# `react-doctor/js-hoist-regexp`

Hoist `new RegExp(...)` (or large regex literals) to a module-level constant so it isn't recompiled on every loop iteration

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

The rule fires on new RegExp(...) (identifier callee) anywhere inside a loop body (for / for...in / for...of / while / do-while). Regex literals like /foo/g are NOT flagged. False positive only if the pattern is built from a value that changes per iteration — in that case cache via a Map<pattern, RegExp> instead.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Move to a module-level const FOO_REGEX = /pattern/flags; (the literal form is compiled once at parse time and is fastest) or const FOO_REGEX = new RegExp(pattern); declared above the loop. RegExp construction parses the pattern and compiles a state machine — avoid paying that cost N times. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
