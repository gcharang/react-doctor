# `react-doctor/artifact-baas-authority-surface`

Shipping Firebase/Supabase client config with your collection and authorization-field names in a browser bundle hands attackers a map of your data model, which is dangerous when server-side rules do not enforce access.

- **Category:** Security
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** browser artifacts only (generated bundles, .map, public/, dist/assets, .next/static, out/, storybook-static); server build output (.next/server, .output/server) skipped

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires only in a browser-shipped artifact (a generated/minified bundle, a `.map`, or a file under `public/`, `dist/assets/`, `.next/static/`, `out/`, or `storybook-static/`) that contains BOTH Firebase/Supabase client config (e.g. `initializeApp`/`getFirestore`/`createClient` within ~700 chars of `apiKey`/`authDomain`/`projectId`/`databaseURL`/`storageBucket`/`supabase`/`SUPABASE_URL`) AND an authority surface: a `collection(...)` reference to sensitive collections (users, orgs, sessions, documents, profiles, …), a `from(...)` table (users, profiles, organizations, memberships), or an authorization-field name like `ownerId`/`creatorId`/`providerId`/`orgId`/`tenantId`/`workspaceId`/`role`/`roles`/`isAdmin`. FALSE POSITIVE to suppress: the BaaS config is genuinely public AND every collection/field is fully enforced by server-side Firestore/Storage rules or Supabase RLS, so the shipped names are only a low-value reconnaissance map rather than an access path. Note the collection/field list is partly tuned to regression fixtures, so an arbitrary collection name may not match.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Client config is never secret, so enforce the authorization boundary on the server: write Firestore/Storage security rules (or Supabase RLS policies) that tie every read and write to `request.auth.uid`, immutable ownership, and tenant or role membership, so knowing the collection names and field shape grants nothing. Keep owner, tenant, and role fields server-derived and immutable from the client. Code-splitting admin-only screens out of the public bundle reduces what attackers can learn, but enforcing the rules matters more.
