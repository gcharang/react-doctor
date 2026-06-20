# `react-doctor/firebase-permissive-rules`

A Firebase rule of `if true` or `if request.auth != null` leaves data open to everyone (or to every signed-in user), treating sign-in as authorization and exposing other users' data.

- **Category:** Security
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** Firebase rules files only (firestore.rules, storage.rules, database.rules.json)

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires only in Firebase rules files (`firestore.rules`, `storage.rules`, `database.rules.json`) on an `allow <op>: if <cond>` where the operation is `read`/`write`/`create`/`update`/`delete`/`list`/`get` (or `read, write`) and the condition is either the literal `true` (open to everyone) or `request.auth != null` (open to any signed-in user — treating authentication as authorization). This is the Chattr/Firewreck failure mode. FALSE POSITIVE to suppress: an `allow read: if true` on data that is genuinely intended to be PUBLIC (a public catalog/landing collection with no per-user/tenant scoping required), or an `if request.auth != null` on a collection where membership in the project IS the complete intended access policy and no narrower owner/tenant boundary exists.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Replace blanket conditions with ownership or membership checks that bind each rule to the caller and the resource, for example `allow read, write: if request.auth != null && request.auth.uid == resource.data.ownerId`, and gate tenant collections on a membership lookup. Make authority fields immutable on update and validate them on create. Reserve `if true` for data meant to be world-readable, and never treat `request.auth != null` as enough authorization for per-user or per-tenant data.
