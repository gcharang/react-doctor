# `react-doctor/nextjs-no-native-script`

`import Script from "next/script"` — use `strategy="afterInteractive"` for analytics or `"lazyOnload"` for widgets

- **Category:** Next.js
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** nextjs
- **Enabled when:** framework=nextjs and capabilities=nextjs

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Flags a native <script> JSX element unless its type literal is non-executable (anything other than text/javascript, application/javascript, or module — e.g. application/ld+json, text/template). Structured-data JSON-LD blocks are correctly ignored.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Use import Script from 'next/script' and pick a strategy: afterInteractive (default) for analytics and tag managers, lazyOnload for chat widgets and heatmaps, beforeInteractive for critical polyfills (root layout only), or worker for offloading to a web worker. https://nextjs.org/docs/app/api-reference/components/script
