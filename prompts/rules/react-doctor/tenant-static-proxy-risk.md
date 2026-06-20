# `react-doctor/tenant-static-proxy-risk`

Building an asset path from a client-supplied tenant, subdomain, or workspace value lets one tenant read another tenant's files.

- **Category:** Security
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** server route source files only — server-context dirs (api/backend/server/functions/lambdas/workers, *.server.*) plus middleware.* and route.* entrypoints

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires in server route code when an asset-fetch call — `fetch(`, `path.join(`, `getObject*(`, `GetObjectCommand(`, `getSignedUrl(`, or `createReadStream(` — has, within its own argument list (~200 chars), a tenant identifier composed into the path: a `${…}` interpolation referencing `tenant`/`subdomain`/`workspace`/`hostPattern`/`organizationId|Slug`, or a bare `tenant|subdomain|workspace(Id|Slug|Name)?` token used as a path segment. The tenant token must sit inside the call's arguments (a nearby `.org` domain literal is excluded, and a bare `params`/`fetch` pairing alone does not match). FALSE POSITIVE: the tenant value is already bound to the authenticated org or trusted host and only namespaces the path (not attacker-chosen), or the call targets a fixed bucket where the segment is canonicalized and traversal-checked — confirm the tenant cannot point at another tenant's prefix.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Derive the tenant and asset prefix from the authenticated session or the trusted host, never from a client-supplied subdomain or route param. After decoding, canonicalize the path and reject `..`, absolute, and scheme-bearing segments before reading, and confine object-store access to the caller's own prefix. For `fetch`, allowlist the destination host so a tenant value cannot redirect the request off-bucket or to an internal address.
