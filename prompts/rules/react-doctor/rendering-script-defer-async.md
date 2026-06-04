# `react-doctor/rendering-script-defer-async`

Add `defer` for DOM-dependent scripts or `async` for independent ones (analytics). In Next.js, use `<Script strategy="afterInteractive" />` instead

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm a JSX <script src=...> opening element that lacks BOTH defer and async attributes. The rule skips type='module' (deferred by default) and non-executable type values like application/ld+json. Render-blocking scripts halt HTML parsing until they download, parse, and execute — directly inflating LCP and FCP.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Add defer for scripts that depend on the parsed DOM (most app code) or async for independent third-party scripts (analytics, ads). In Next.js prefer next/script with <Script src=... strategy="afterInteractive" /> so the framework owns scheduling. See https://web.dev/articles/efficiently-load-third-party-javascript#use-async-or-defer
