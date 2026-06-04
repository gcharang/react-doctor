# `react-doctor/nextjs-no-font-link`

`import { Inter } from "next/font/google"` — self-hosted, zero layout shift, no render-blocking requests

- **Category:** Next.js
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** nextjs
- **Enabled when:** framework=nextjs and capabilities=nextjs

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a <link> JSX element whose href literal matches fonts.googleapis.com. Other CDN font hosts (Adobe Fonts, Fontshare, Bunny Fonts) are NOT detected. Dynamic or templated hrefs are skipped.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Use next/font/google: import { Inter } from 'next/font/google'; const inter = Inter({ subsets: ['latin'] }); then apply inter.className on <body> (or inter.variable to expose a CSS variable). Self-hosts the font at build time, eliminating layout shift and the extra DNS round-trip. https://nextjs.org/docs/app/api-reference/components/font
