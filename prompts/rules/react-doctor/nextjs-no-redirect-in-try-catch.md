# `react-doctor/nextjs-no-redirect-in-try-catch`

Move the redirect/notFound call outside the try block, or add `unstable_rethrow(error)` in the catch

- **Category:** Next.js
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** nextjs
- **Enabled when:** framework=nextjs and capabilities=nextjs

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Flags direct calls to redirect, permanentRedirect, notFound, forbidden, or unauthorized anywhere inside a try block. These throw a special NEXT_REDIRECT/NEXT_NOT_FOUND error that the catch will silently swallow, breaking navigation. Matches by callee identifier name only — false positive if a same-named local function is being called instead of the next/navigation export.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Move the redirect/notFound call after the try/catch so its special error escapes, OR import unstable_rethrow from next/navigation and call unstable_rethrow(error) as the first statement of every catch block before any other handling logic. https://nextjs.org/docs/app/api-reference/functions/unstable_rethrow
