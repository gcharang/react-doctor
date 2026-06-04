# `react-doctor/jsx-fragments`

Pick one fragment style across the codebase — use the <></> shorthand by default.

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** off by default (opt-in)
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-fragments>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

In the default "syntax" mode, fires on an attribute-less `<React.Fragment>...</React.Fragment>` or `<Fragment>...</Fragment>` that has a closing tag — it wants you to swap to the `<></>` shorthand. In the opt-in "element" mode, the direction flips and it fires on every `<></>` shorthand instead. Not a false positive but the key non-trigger to recognize: a fragment carrying any attribute (most commonly `key`, e.g. `<Fragment key="k">`) or a self-closing `<Fragment />` with no closing element is intentionally left alone, since the shorthand cannot express a key.

## Fix prompt

Use this once validation confirms the diagnostic is real.

In the default "syntax" mode, rewrite the verbose fragment to the shorthand: `<React.Fragment><Foo /></React.Fragment>` becomes `<><Foo /></>`. If the fragment needs a `key` or other attribute, leave it as `<Fragment key="k">` — the shorthand has no slot for props. Under "element" mode the fix is the reverse: expand `<></>` into `<React.Fragment>...</React.Fragment>`. This is purely stylistic, so just pick the one form your codebase has standardized on. See https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-fragments
