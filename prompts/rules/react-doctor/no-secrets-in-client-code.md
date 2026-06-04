# `react-doctor/no-secrets-in-client-code`

Move secrets to server-only code. Public client environment variables are bundled into browser code and must not contain secrets

- **Category:** Security
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm a VariableDeclarator with a string-literal initializer longer than 24 chars where either (a) the variable name matches /(?:api_?key|secret|token|password|credential|auth)/i inside a file classifySecretFileExposure marks as "client", or (b) the value matches a well-known credential prefix (sk_live_, sk_test_, ghp_, gho_, github_pat_, glpat-, xox[bporas]-, AKIA[A-Z0-9]{16}). False positive: intentionally public anon keys (Supabase, PostHog) still match the patterns.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Move the value to a server-only environment variable (read via process.env in a Route Handler, Server Component, API route, or *.server.ts file) and never reference it from "use client" modules. For genuinely public keys, rename the variable to avoid the heuristic and document the public scope inline. See https://nextjs.org/docs/app/guides/environment-variables
