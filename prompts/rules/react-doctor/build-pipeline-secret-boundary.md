# `react-doctor/build-pipeline-secret-boundary`

Installing dependencies while CI secrets are in the environment lets a malicious package's lifecycle script read those secrets, which risks supply-chain compromise.

- **Category:** Security
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** CI/build config files only (.github/workflows/*.yml, Dockerfile, docker-compose.yml, vercel.json, next.config.*, netlify.toml); package.json excluded

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires in a CI/build config file (a `.github/workflows/*.yml`, `Dockerfile`, `docker-compose.yml`, `vercel.json`, `next.config.*`, or `netlify.toml`; `package.json` is excluded) when a dependency install (`npm`/`pnpm`/`yarn`/`bun` `install`/`ci`) appears within ~700 characters of a `secrets.<NAME>` reference (in either order) AND `--ignore-scripts` does NOT appear between them. The concern: untrusted dependency lifecycle scripts can execute while CI secrets are in the environment, enabling secret exfiltration or supply-chain compromise. FALSE POSITIVE to suppress: the install and the secret are in genuinely separate jobs/steps that do not share an environment, or the install is already hardened (`--ignore-scripts`, isolated runner) even though the literal flag is not inside the ~700-char window the regex inspects.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Install dependencies in a step that has no secrets in its environment, using `npm ci --ignore-scripts` (or the pnpm/yarn/bun equivalent). Inject secrets only into a later, minimal step that runs your own trusted code (signing, publish, deploy). Pin and lock dependencies, install on an isolated runner, and scope each secret to the narrowest job that needs it so a postinstall script cannot read it.
