# `react-doctor/jsx-no-target-blank`

Add rel="noreferrer" (or "noopener") whenever using target="_blank".

- **Category:** Security
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-target-blank>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on an <a> (or <form> when forms:true, plus any configured linkComponents/formComponents) whose target resolves to "_blank" (case-insensitive, including ternary branches) while its href/action is external — contains "//" — or dynamic, and its rel attribute does not include "noreferrer" (or "noopener"/"noreferrer" when allowReferrer:true). A literal internal/relative href without "//" (e.g. href="/path") does NOT trigger by default, and the static check excludes dynamic links only under enforceDynamicLinks:"never". Note that a non-string rel — bare identifier, function call (rel={getRel()}), or non-string literal (rel={true}, rel={3}, rel={null}) — is treated as UNSAFE and IS flagged when paired with an external/dynamic href. Non-trigger: an <a target="_blank"> with NO href (e.g. rel={relValue} alone) is not flagged regardless of rel, since the rule only reports when the link's href/action is external or dynamic.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Add rel="noreferrer" alongside target="_blank" to stop the new tab from accessing window.opener and leaking the referrer: <a href="https://x.com" target="_blank" rel="noreferrer">. Use "noopener noreferrer" for older-browser coverage, or "noopener" only if allowReferrer is enabled and you intentionally keep the referrer. A dynamic rel (variable, function call, or non-string literal) does not satisfy the rule — pass a string literal that contains noreferrer, and for conditional links ensure every ternary branch that yields "_blank" also yields a rel containing noreferrer. See https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-target-blank
