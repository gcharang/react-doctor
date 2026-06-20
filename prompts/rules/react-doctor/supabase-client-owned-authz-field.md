# `react-doctor/supabase-client-owned-authz-field`

When the client writes authorization columns (`ownerId`, `orgId`, `role`, `isAdmin`) to Supabase, an attacker can forge them and escalate their own access.

- **Category:** Security
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** client (browser-bundled) production source files; server dirs (api/backend/server/middleware/route/functions/lambdas/workers, *.server.*) skipped

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires in client (browser) code only when BOTH signals are present: (a) a Supabase write — `supabase…insert(`/`upsert(`/`update(`, or `.from(...)` followed by `insert`/`upsert`/`update(` with an object/array-literal argument — that includes an authorization column (`ownerId`, `creatorId`, `userId`, `orgId`, `tenantId`, `role`, or `isAdmin`), and (b) a sensitive-field name (`ownerId|creatorId|userId|uid|providerId|orgId|tenantId|teamId|workspaceId|role|roles|isAdmin|admin`, with `Id`/`ID` variants) appearing in the file. The two-signal gate avoids flagging files that merely mention these names. FALSE POSITIVE: the written value comes from a trusted server context the client only echoes back (an authenticated session id, or a column an RLS `with check` policy independently re-verifies) rather than raw client input — confirm whether RLS actually constrains the column server-side.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Stop sending owner, org, tenant, or role columns from the client; let the database set them. Default `user_id` to `auth.uid()`, derive org and role from server-owned membership rows, and enforce it with an RLS `with check` policy so a forged `ownerId` or `role` in the payload is rejected. Move any genuinely privileged write behind a server route or a `security definer` Postgres function that validates the actor.
