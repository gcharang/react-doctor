# `react-doctor/lang`

Use a valid BCP-47 language tag on `<html lang>` (e.g. `en` / `en-US`).

- **Category:** Accessibility
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/lang>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a `<html>` element (including `<HTML>` or a component resolved to "html" via jsx-a11y polymorphic/components settings) whose `lang` prop is invalid: explicitly `lang={undefined}` or `lang={null}`, or a static string whose value fails BCP-47 validation — the primary subtag must match a known ISO-639 tag and every `-`/`_`-separated subtag must be alphanumeric. A dynamic value like `lang={foo}` is NOT flagged. False positive: the primary-tag set is a partial, hand-maintained ISO-639 list, so a genuinely valid but uncommon or newer language tag absent from that set is wrongly reported.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Set `lang` to a valid BCP-47 / IANA language tag — `<html lang="en">` or a region-qualified `<html lang="en-US">`, script-qualified `<html lang="zh-Hans">` as needed. Never leave it as `lang={undefined}` or `lang={null}`; if the value is computed, ensure it always resolves to a real tag. If the linter rejects a tag you've confirmed is valid (e.g. a rare ISO-639 code), it's a known gap in the rule's partial tag list — suppress that line with a justifying comment. See https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/lang
