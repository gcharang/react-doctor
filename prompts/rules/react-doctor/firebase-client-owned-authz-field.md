# `react-doctor/firebase-client-owned-authz-field`

When the client writes ownership or role fields (`ownerId`, `orgId`, `role`, `isAdmin`) to Firebase/Supabase, an attacker can forge them and grant themselves access.

- **Category:** Security
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** client-side production source only (server dirs api/server/functions/middleware/routes and *.server.* files skipped) where the file shows Firebase/Supabase evidence in its path or content

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires only in CLIENT-side production source (server dirs like `api/`/`server/`/`functions/`/`middleware/` and `*.server.*` files are excluded) where the file shows Firebase/Supabase evidence — the words `firebase`/`firestore`/`supabase`, or a `setDoc(`/`addDoc(` call, in the path or content. Within that file it matches a client write — `setDoc(`/`updateDoc(`/`addDoc(`, or a `collection(...).set|update|add(` — occurring within ~700 chars of an authority-field name: `ownerId`/`creatorId`/`providerId`/`orgId`/`tenantId`/`workspaceId`/`ghostOrg`/`role`/`roles`/`isAdmin`. FALSE POSITIVE to suppress: already guarded — an in-house data writer that merely shares a method name like `updateDoc(...)` without any Firebase/Supabase evidence is skipped; a remaining FP is a write where the authority field is server-derived/immutable and re-validated by Firestore rules or RLS (e.g. the client echoes its own already-authenticated `uid` that the rules pin to `request.auth.uid`), rather than a value an attacker could forge.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Do not let the client set authority fields. Write `ownerId`, `tenantId`, `role`, and `isAdmin` on the server (a callable/cloud function or your backend) from the authenticated identity, and enforce them in Firestore/Storage rules (or Supabase RLS) so a forged client write is rejected. For example, require `request.auth.uid == request.resource.data.ownerId` on create and make the field immutable on update. Never write `isAdmin`/`role` from client code.
