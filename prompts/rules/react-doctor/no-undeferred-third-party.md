# `react-doctor/no-undeferred-third-party`

Use `next/script` with `strategy="lazyOnload"` or add the `defer` attribute

- **Category:** Bundle Size
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm a JSX <script> opening element (lowercase HTML tag — the rule does not match <Script> from next/script) with a src attribute and neither defer nor async on the attribute list. False positive: a deliberately blocking analytics or polyfill snippet that must execute before subsequent inline scripts run.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Add defer (preserves execution order, runs after parsing) or async (runs ASAP, unordered) to the tag, or — in Next.js — replace it with <Script src="..." strategy="lazyOnload" /> from next/script so it loads after hydration without blocking first paint. See https://nextjs.org/docs/app/api-reference/components/script
