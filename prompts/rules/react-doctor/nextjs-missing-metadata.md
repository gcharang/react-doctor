# `react-doctor/nextjs-missing-metadata`

Add `export const metadata = { title: '...', description: '...' }` or `export async function generateMetadata()`

- **Category:** Next.js
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** nextjs
- **Enabled when:** framework=nextjs and capabilities=nextjs

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Triggers on App Router pages (files matching /page.{tsx,jsx,ts,js}) that don't export a top-level metadata constant, generateMetadata function, or generateMetadata variable. The rule skips routes likely behind auth (paths or route groups named dashboard, admin, settings, account, internal, manage, console, portal, auth, onboarding, app, ee, protected) where SEO doesn't matter. Pages Router files are not checked.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Add export const metadata: Metadata = { title: '...', description: '...' } (import Metadata from 'next'), or export async function generateMetadata({ params }) for dynamic data. Metadata declared in a parent layout.tsx is inherited and also satisfies the rule. https://nextjs.org/docs/app/api-reference/functions/generate-metadata
