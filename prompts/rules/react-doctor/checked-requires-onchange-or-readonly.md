# `react-doctor/checked-requires-onchange-or-readonly`

Pair `checked` with `onChange={…}` (controlled) or `readOnly` (display-only), and never combine `checked` with `defaultChecked`.

- **Category:** Correctness
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/checked-requires-onchange-or-readonly>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on an `<input>` (any type, including checkbox and radio) or a `React.createElement('input', {...})` call that has a `checked` attribute/prop but no sibling `onChange` or `readOnly` — `checked` with any value (`checked`, `checked={true}`, `checked={false}`, `checked={cond ? a : b}`) triggers it. It also fires when both `checked` and `defaultChecked` appear on the same input, since those are mutually exclusive controlled/uncontrolled modes. False positive: `onChange`/`readOnly` arriving through a spread (`<input checked {...props} />` or `createElement('input', {...rest})`) — spread elements aren't statically inspected, so the companion handler can be present invisibly.

## Fix prompt

Use this once validation confirms the diagnostic is real.

For a controlled checkbox add an `onChange` handler that updates the state driving `checked`: `<input type="checkbox" checked={isOn} onChange={e => setIsOn(e.target.checked)} />`. For a display-only value, add `readOnly` instead. If you want React to manage the initial state internally, drop `checked` and use `defaultChecked`; and when both `checked` and `defaultChecked` are present, remove whichever doesn't match your control mode — keep exactly one. See https://oxc.rs/docs/guide/usage/linter/rules/react/checked-requires-onchange-or-readonly
