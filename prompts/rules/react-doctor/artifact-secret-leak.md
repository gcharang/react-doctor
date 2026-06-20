# `react-doctor/artifact-secret-leak`

A live credential (API key, token, or connection string) sits in a browser bundle or static asset, so anyone can read it, and it must be treated as compromised.

- **Category:** Security
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** browser artifacts only (generated bundles, .map, public/, dist/assets, .next/static, out/, storybook-static); documentation (.md/.mdx) and server build output skipped

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires only in a browser-shipped artifact (generated/minified bundle, `.map`, or under `public/`/`dist/assets/`/`.next/static/`/`out/`/`storybook-static/`; `.md`/`.mdx` docs excluded) whose content matches a known secret-VALUE shape: AWS access keys (`AKIA…`/`ASIA…`, `AWS_SECRET_ACCESS_KEY=…`), GitHub `ghp_`/`gho_`/`github_pat_`, GitLab `glpat-`, Slack `xox[baprs]-` tokens and incoming-webhook URLs, Discord webhook URLs, Stripe/RevenueCat `sk_live`/`sk_test`/`rk_…`, OpenAI `sk-…`, Anthropic `sk-ant-api…`, Linear `lin_api`/`lin_oauth_`, Vercel `vercel_`, Sentry `sntrys_`, Mailgun `key-<hex>`, npm `npm_`, SendGrid `SG.…`, Supabase `sb_secret_`/`service_role`, PEM `-----BEGIN … PRIVATE KEY-----`, plus `postgres|mysql|mongodb|redis://user:pass@host.tld` connection strings. FALSE POSITIVE to suppress: largely pre-filtered — DB URLs with documented placeholder passwords (`password`, `changeme`, `${VAR}`, `<...>`) or dotless/localhost hosts are skipped; a remaining FP is a string that merely matches a prefix shape but is a known-dummy/example value, not a live credential.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Remove the credential from everything that ships to the browser (bundles, source maps, static assets) and rotate it now, because a shipped secret is already exposed. Move every call that needs it behind server-only code (API route, server action, edge or serverless function) and read the key from a server-only env var there. Never embed database or service connection URLs in client code; proxy that access through your backend.
