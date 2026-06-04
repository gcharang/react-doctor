# `react-doctor/no-access-key`

Don't use `accessKey` — it conflicts with assistive-technology shortcuts.

- **Category:** Accessibility
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-access-key>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on any JSX element carrying an `accessKey` attribute (matched case-insensitively, so `accesskey` and `acCesSKeY` count) whose value is a string literal (`accessKey="h"`), a non-empty expression container (`accessKey={accessKey}`, `accessKey={"y"}`), or any template literal — even one that only interpolates `undefined` like `` accessKey={`${undefined}`} ``. The only carve-outs are the bare `undefined` identifier (`accessKey={undefined}`), an empty expression container `{}`, and a value-less attribute. False positive: there is essentially none — every value-bearing `accessKey` genuinely creates the conflict, so confirm unless the value provably resolves to `undefined` at runtime, which the static check can't see through a variable.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Remove the `accessKey` attribute entirely — `<button accessKey="s">Save</button>` becomes `<button>Save</button>`. Author-assigned access keys collide with screen-reader and OS-level keyboard shortcuts, so there is no safe value to keep; if a keyboard shortcut is genuinely required, implement it with a documented, user-discoverable handler instead of `accessKey`. See https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-access-key
