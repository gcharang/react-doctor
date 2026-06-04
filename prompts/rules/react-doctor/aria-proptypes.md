# `react-doctor/aria-proptypes`

Give each aria-* attribute a value matching its WAI-ARIA type (boolean, token, integer, ID, ID-list, etc.).

- **Category:** Accessibility
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/aria-proptypes>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a known aria-* attribute (case-insensitive) carries a statically-evaluable value that violates its WAI-ARIA type — e.g. aria-hidden="yes" (needs 'true'/'false'), aria-level={`abc`} or aria-level={"false"} (needs an integer), aria-sort="descnding" or aria-relevant="additions removalss" (off the allowed token set) — or when a value-less attribute whose type forbids a bare form is used (aria-level, aria-sort, aria-relevant alone). False positive boundary: any non-literal value passes unchecked — identifiers, member expressions (aria-hidden={foo.bar}), null/undefined, JSX elements, ternaries, and interpolated templates for string/id/id-list types (aria-labelledby={`${id}-label`}) — so only flag a hardcoded literal, never a dynamic expression.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Replace the literal with a value of the attribute's required type: 'true'/'false' for booleans like aria-hidden, 'true'/'false'/'mixed' for aria-checked/aria-pressed, a finite number for aria-level/aria-valuenow (aria-level={2}), a valid token for aria-sort ('ascending'|'descending'|'none'|'other') or aria-current, or a space-separated ID list for aria-labelledby/aria-describedby. If the value is genuinely computed at runtime, hoist it into an expression (aria-checked={isChecked ? 'true' : 'false'}) so the static check sees a non-literal. See https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/aria-proptypes
