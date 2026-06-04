# `react-doctor/nextjs-no-side-effect-in-get-handler`

Move the side effect to a POST handler and use a <form> or fetch with method POST — GET requests can be triggered by prefetching and are vulnerable to CSRF

- **Category:** Security
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** nextjs
- **Enabled when:** framework=nextjs and capabilities=nextjs

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on an exported GET in a route.ts/route.js handler when EITHER (a) the route path contains a destructive segment ('/logout', '/log-out', '/signout', '/sign-out', '/unsubscribe', '/delete', '/remove', '/revoke', '/cancel', '/deactivate'), OR (b) the body contains a real server-state write: a cookie mutation ('cookies().set/.append/.delete', incl. aliased or 'await cookies()'), a mutating 'fetch(url, { method: "POST"|"PUT"|"DELETE"|"PATCH" })', or a DB-style mutation method ('.create/.insert/.update/.upsert/.delete/.remove/.destroy/.set/.append') on an UNSAFE receiver. CONFIRM only (b)-type writes that mutate persistent state (DB row, cookie, external resource) or a module-level cache, and all (a) destructive-segment hits. SUPPRESS as FALSE POSITIVE when the flagged call only mutates a local, in-memory object used to build the response — these are intended and harmless: '<url>.searchParams.set/.append/.delete' or 'new URL(...).searchParams...' (query-string building for a redirect), 'response.headers.set/.append/.delete' or chained 'NextResponse.json({...}).headers.set(...)' (outgoing response headers), any locally-constructed 'new Headers()/Map()/Set()/WeakMap()/WeakSet()/URLSearchParams()/FormData()/Response()/NextResponse()' and its mutations, an alias of any of those ('const res = NextResponse.json(...); res.headers.set(...)'), and 'headers().set(...)' / '(await headers()).set(...)' from next/headers (ReadonlyHeaders — would throw, never a write). Diagnostic tell: a message with a bare '.set()'/'.delete()'/'.append()' and NO receiver name (no 'db.'/'prisma.'/'cookies()' prefix) almost always means a searchParams/headers FP — verify the receiver before confirming. Cron routes ('/cron/*', '/jobs/cron/*') are exempt.

## Fix prompt

Use this once validation confirms the diagnostic is real.

First confirm the flagged call is a REAL state mutation, not in-memory response building (URL.searchParams, response headers, locally-built Headers/Map/URLSearchParams) — if it is the latter, suppress; no fix is needed. PRINCIPLE: a GET must be safe and idempotent because browsers, link prefetch, link previews, and crawlers issue GETs without user intent and without CSRF protection; any handler that changes server state on GET is exploitable. For a CONFIRMED write apply the narrowest correct fix: (A) Cookie/session writes ('cookies().set/.delete', logout/signout) — move the mutation into a POST handler and invoke it from a Server Action bound to a '<button>'/'<form>', not a link, e.g. 'async function logout(){ "use server"; (await cookies()).delete("session"); redirect("/") }'. (B) DB/external mutations ('db.update().set()', 'prisma.x.create()', mutating 'fetch') — rename 'export async function GET' to 'POST' and update callers to 'fetch(url,{ method: "POST" })' or a '<form method="post">'; add an origin/CSRF check for auth-gated mutations. (C) Token-exchange/confirmation links that MUST be GET-reachable from an email (OAuth callback, magic-link verify) — keep GET but make the write single-use and idempotent (consume a one-time token, no-op on replay) rather than mechanically switching to POST, which would break the email link. ANTI-PATTERN: do NOT blindly rename every flagged GET to POST — that breaks legitimate GET-only redirect/confirm flows and does nothing for the searchParams/headers false positives. Fix the actual unsafe write, or suppress if there is none. https://nextjs.org/docs/app/api-reference/file-conventions/route
