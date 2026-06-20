# `react-doctor/firebase-query-filter-as-auth`

Relying on a client-side Firestore `.where('userId', '==', …)` filter for access control is unsafe, because a client can drop the filter and read everyone's data.

- **Category:** Security
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** client (non-server) production source files (.js/.ts/.jsx/.tsx); server/api/route dirs and test/build/doc/generated paths skipped

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when client code calls `.where('<field>', '==', …)` where `<field>` is an auth-shaped key — `uid`, `userId`/`userID`, `ownerId`/`ownerID`, `orgId`/`orgID`, `tenantId`/`tenantID`, or `role` — i.e. a Firestore query that scopes results by identity/tenant/role. The concern: a client query filter is not an access-control boundary, since a client can issue the same query without it. FALSE POSITIVE: the matching `.where(...)` is only UX/data-scoping AND the project's Firestore security rules already enforce the same `request.auth.uid`/membership check server-side — then the filter is defense-in-depth, not the sole gate. Only the literal `==` operator on a literal field-name string is matched.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Treat the client `.where(...)` as convenience only and enforce access in `firestore.rules`: inside the `match` block require `request.auth != null` and compare the document against `request.auth.uid` (or a trusted memberships/roles collection via `get()`), so reads and writes are denied regardless of the query. Keep the filter for scoping, never for security.
