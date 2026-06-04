# `react-doctor/html-has-lang`



- **Category:** Accessibility
- **Severity:** warn
- **Source:** oxlint-builtin:jsx-a11y
- **Framework:** global
- **Enabled when:** always (unless customRulesOnly=true)
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/html-has-lang>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a JSX <html> element without a lang prop, or with lang set to an empty string. The rule only inspects the literal <html> tag in the current file. False positive: in Next.js App Router, lang is set on <html> in the root layout — a deeper file rendering its own <html> usually indicates a different structural problem, not a missed attribute.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Add a BCP 47 language code: <html lang='en'> for English, <html lang='en-US'> for regional variants, or <html lang={locale}> driven from i18n state. Screen readers use lang to switch pronunciation rules and dictionaries; without it, they fall back to the user's OS language and mispronounce content. See https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/html-has-lang
