# `react-doctor/repository-secret-file`

A committed env file, credential, or token is exposed to anyone with repo access and must be rotated, even after you remove it.

- **Category:** Security
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** repository credential/config files only — .env* files, .npmrc, and *credential*/service-account/firebase-admin/google-or-gcp-service-account*.{json,env,pem,key}; redacted *.example/*.sample/*.template/*.dist/*.defaults and test paths skipped

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires only on committed credential/config FILES — any `.env*` file, `.npmrc`, or a `*credential(s)*`/`service-account`/`serviceAccount`/`firebase-admin`/`google-service-account`/`gcp-service-account*.{json,env,pem,key}` file — whose CONTENTS contain either a hard secret value (AWS `AKIA…`, `github_pat_`/`gh*_`, GitLab `glpat-`, Slack `xox*`, Stripe `sk_live/test_`, Anthropic `sk-ant-…`, npm token, SendGrid `SG.…`, a Slack/Discord webhook URL, `service_role`, a `-----BEGIN … PRIVATE KEY-----`, or a real `postgres://user:pass@host/` URL) or a public-env secret name. Redacted templates (`.env.example`/`.sample`/`.template`/`.dist`/`.defaults`, `*example|sample|template*` files) and test fixtures are exempt. FALSE POSITIVE: a placeholder/sample value the patterns still caught — though the DB-URL pattern already skips common `user:password@localhost` docker/compose placeholders, so a remaining hit is usually a real credential; verify the value is fake before suppressing.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Delete the file from the working tree, purge it from git history (for example `git filter-repo`), and add its path to `.gitignore`. Rotate every credential it held, because a committed secret is compromised even after removal. Keep only a redacted `*.example`/`*.template` checked in, and load real secrets at runtime from a secrets manager or an untracked local env file.
