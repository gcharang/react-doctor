# `react-doctor/autocomplete-valid`

Use a valid HTML autofill token in autoComplete.

- **Category:** Accessibility
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/autocomplete-valid>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on input, textarea, select, form (plus any configured inputComponents) carrying an autoComplete prop whose value is a static string containing a token outside the known HTML autofill set — each space-separated token is checked, with section-* prefixes allowed (e.g. autoComplete='name foo' fires on 'foo'). Only literal strings are inspected: an expression value like autoComplete={token} or autoComplete={x || 'name'} is skipped because the static check yields no string. False positive: a genuinely valid token the rule's subset omits (the rule uses a partial WHATWG list, e.g. 'webauthn' or some 'cc-*'/address variants may be missing) — confirm against the WHATWG autofill spec before silencing.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Replace the invalid value with a recognized WHATWG autofill token, e.g. autoComplete='email' or autoComplete='current-password'; use autoComplete='off'/'on' to toggle, and prefix grouped fields with section- (autoComplete='section-billing cc-number'). For a custom wrapper that renders a real input, register it via the rule's inputComponents setting so it is validated rather than guessing. See https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/autocomplete-valid
