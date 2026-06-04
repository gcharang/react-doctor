# `react-doctor/nextjs-no-head-import`

Use the Metadata API instead: `export const metadata = { title: '...' }` or `export async function generateMetadata()`

- **Category:** Next.js
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** nextjs
- **Enabled when:** framework=nextjs and capabilities=nextjs

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Triggers only when import ... from 'next/head' appears in a file whose path contains /app/. Pages Router files (under /pages/) may legitimately use next/head and are not flagged. False positive if /app/ appears coincidentally in a path that isn't actually the App Router (e.g. a monorepo named 'app').

## Fix prompt

Use this once validation confirms the diagnostic is real.

Delete the next/head import and <Head> JSX. Export metadata (static) or generateMetadata (dynamic) from the page or layout. Use file conventions like icon.tsx, opengraph-image.tsx, robots.ts, and sitemap.ts for non-meta tags; return arbitrary <meta> via generateMetadata. https://nextjs.org/docs/app/getting-started/metadata-and-og-images
