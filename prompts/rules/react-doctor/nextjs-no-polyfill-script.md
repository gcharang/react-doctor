# `react-doctor/nextjs-no-polyfill-script`

Next.js includes polyfills for fetch, Promise, Object.assign, Array.from, and 50+ others automatically

- **Category:** Next.js
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** nextjs
- **Enabled when:** framework=nextjs and capabilities=nextjs

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Matches <script> or <Script> whose src literal contains polyfill.io, polyfill.min.js, or cdn.polyfill. This is also a security signal — polyfill.io was hijacked in a 2024 supply-chain attack that injected malware into 100k+ sites.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Delete the polyfill script. Next.js automatically polyfills fetch, Promise, Object.assign, Array.from, URL, Symbol, and 50+ others based on each user's browser via your browserslist config. If you actually need a single missing API, install the targeted package (e.g. core-js feature) instead of a kitchen-sink CDN. https://nextjs.org/docs/architecture/supported-browsers
