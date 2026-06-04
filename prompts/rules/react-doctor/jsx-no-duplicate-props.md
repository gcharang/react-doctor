# `react-doctor/jsx-no-duplicate-props`



- **Category:** Correctness
- **Severity:** error
- **Source:** oxlint-builtin:react
- **Framework:** global
- **Enabled when:** always (unless customRulesOnly=true)
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-duplicate-props.html>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a single JSX opening element lists the same prop name twice (<App foo={2} bar foo={3} />); React keeps only the last value and silently drops the earlier ones. Oxc's comparison is case-sensitive — <Foo bar bAr /> is intentionally allowed, since the eslint-plugin-react ignoreCase: true behavior is not ported. False positives are essentially nonexistent.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Pick the one value you actually want and delete the duplicate. If you meant to layer defaults under an override, spread the base first and put the explicit override after: <Foo {...defaultProps} foo={3} /> so the precedence is visible in source order. See https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-duplicate-props.html
