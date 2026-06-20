# `react-doctor/nextjs-no-edge-og-runtime`

Remove `export const runtime = "edge"` from OG image route files so they use the default Node.js runtime

- **Category:** Next.js
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** nextjs
- **Enabled when:** framework=nextjs and capabilities=nextjs
- **Documentation:** <https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires only when the file path (normalized via normalizeFilename) matches OG_IMAGE_FILE_PATTERN /(opengraph-image|twitter-image)\d*\.(?:tsx?|jsx?|mts|mjs)$/ — Next.js App Router metadata image routes like opengraph-image.tsx or twitter-image2.ts — AND that file has a top-level ExportNamedDeclaration whose declaration is a VariableDeclaration with a VariableDeclarator whose id is the Identifier `runtime` initialized to a Literal whose value is exactly the string "edge" (export const runtime = 'edge'). Suppress if the export sets runtime to anything other than the literal "edge" (e.g. "nodejs", or a non-literal/computed/template value, which the detector treats as null and never reports), or if the `runtime = 'edge'` export lives in a file that is not an opengraph-image/twitter-image route — the isOgImageFile guard means a regular route.ts or page.tsx deliberately on Edge is fine and not flagged here.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Delete the `export const runtime = 'edge'` line from the OG image file so it falls back to the default Node.js runtime, which supports custom fonts loaded from disk, filesystem (fs) access, and larger response payloads than Edge; if you want it explicit, `export const runtime = 'nodejs'` is the equivalent of deleting the line (nodejs IS the default Node.js runtime, and the rule never fires on it). Only keep `runtime = 'edge'` if the route genuinely requires Edge — in which case knowingly accept its limitations: no disk-loaded fonts, restricted fs access, and smaller response size caps. See https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
