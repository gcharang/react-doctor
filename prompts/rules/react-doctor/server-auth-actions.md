# `react-doctor/server-auth-actions`

Add `const session = await auth()` at the top and throw/redirect if unauthorized before any data access

- **Category:** Server
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on an EXPORTED async server action (named export, default export, or exported 'const fn = async' — file has top-level 'use server' or the fn carries its own 'use server') when NONE of its first 10 top-level statements contains a session-verification call: a bare call to auth()/getSession()/getServerSession()/getUser()/currentUser()/requireAuth()/checkAuth()/verifyAuth()/authenticate()/getAuth()/validateSession(), or a '.getUser()' on an auth-namespaced receiver (auth./clerk./session./supabase.auth…). Calls nested inside a non-invoked helper, a '.then()' callback, or another closure do NOT count, so a privileged action that gates only inside a helper it never calls still fires correctly. CONFIRM when the action does real privileged work on caller input with no gate: triggering background jobs (tasks.trigger/batchTrigger), reading/writing files or DB, mutating shared server state, or initializing subsystems. KEY FALSE POSITIVE — the action IS the authentication/credential-establishing endpoint, so no prior session can exist: login, signIn, signup/register, OAuth callback, magic-link or OTP verify (verifyAuthCode), password reset/forgot, email verification. Tell: its name and body call credential primitives like 'supabase.auth.signInWithPassword()', 'auth.signUpViaEmail()', 'auth.verifyAuthCode()', 'signUp()' (these are NOT in the helper list, so the rule misfires), and it lives under an auth/login/(auth) route. Also suppress genuinely public actions (contact form, newsletter, public search) and actions where auth is provably enforced by middleware on that route segment.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Principle: a server action is an unauthenticated public POST endpoint — verify the CALLER's session and authorization before touching data, never trust caller-supplied ids. (A) Gate first: make the FIRST statement establish identity and bail on failure — 'const session = await auth(); if (!session?.user) redirect("/login");' (NextAuth: 'getServerSession(authOptions)'; Clerk: 'const { userId } = await auth(); if (!userId) throw new Error("Unauthorized")'; Supabase: 'const { data: { user } } = await supabase.auth.getUser(); if (!user) redirect("/login")'). (B) Authorize, not just authenticate: after identity, check the caller may act on THIS resource — derive the owning user/org from the session and compare to the target row; never accept a userId/orgId straight from params as proof of access. (C) Centralize once: if many actions share the gate, extract 'const { user } = await requireUser()' that throws, and call it as the action's first line (the rule recognizes requireAuth/checkAuth). Anti-pattern: do NOT bolt an auth() call on as a no-op just to silence the rule, and do NOT add a gate to credential-establishing actions (login/signup/OAuth-callback/OTP-verify/password-reset) — those legitimately run for anonymous callers; instead rely on rate-limiting, CAPTCHA/Turnstile, and input validation there. See https://nextjs.org/docs/app/building-your-application/authentication
