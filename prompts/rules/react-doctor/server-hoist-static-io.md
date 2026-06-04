# `react-doctor/server-hoist-static-io`

Hoist the read to module scope: `const FONT_DATA = await fetch(new URL('./fonts/Inter.ttf', import.meta.url)).then(r => r.arrayBuffer())` runs once at module load

- **Category:** Server
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Rule inspects two handler shapes: exported async functions named after HTTP verbs (GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD) in App Router route.ts files, and the default async export in pages/api/... files. Inside the body it walks for fs.readFileSync / readFile / readdir / stat / access (sync or promise) and fetch(new URL(path, import.meta.url)). Calls that reference handler parameters like req or params are already excluded.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Hoist the read to module scope so it runs once at module load instead of every request: const FONT_DATA = await fetch(new URL('./fonts/Inter.ttf', import.meta.url)).then(r => r.arrayBuffer()). Top-level await is supported in Next.js route modules. For build-time data, an import with an asset loader is even cheaper. See https://nextjs.org/docs/app/api-reference/file-conventions/route
