# `react-doctor/nextjs-no-vercel-og-import`

Replace the @vercel/og import with import { ImageResponse } from "next/og"

- **Category:** Next.js
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** nextjs
- **Enabled when:** framework=nextjs and capabilities=nextjs
- **Documentation:** <https://nextjs.org/docs/app/api-reference/functions/image-response>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on any ImportDeclaration whose source string literal is exactly "@vercel/og" — the sole predicate is node.source?.value === "@vercel/og", so it matches default, named (ImageResponse), namespace, and side-effect imports alike, regardless of which symbols are pulled in. Because the match is exact equality, the predicate does NOT match a subpath like "@vercel/og/something" or a re-export through a local wrapper module, so those will never be flagged. Real caveat to verify before applying the fix: the detector has no version awareness, so confirm the project is on Next.js 14+ — next/og only exists from Next 14.0.0, where ImageResponse moved there from @vercel/og (on 13.3.x–13.x it lives at next/server, and Next < 13.3 must import @vercel/og directly). Suppress if the project is on Next < 14 and genuinely cannot import from next/og.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Change the import source from "@vercel/og" to "next/og", keeping the same named bindings, e.g. replace import { ImageResponse } from "@vercel/og" with import { ImageResponse } from "next/og"; Next.js bundles @vercel/og, so importing it directly duplicates code and risks a version mismatch between your dependency and the bundled copy. Only do this on Next.js 14+, where next/og exists; on Next 13.3–13.x import ImageResponse from "next/server" instead, and on Next < 13.3 keep the @vercel/og import. https://nextjs.org/docs/app/api-reference/functions/image-response
