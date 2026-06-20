# `react-doctor/path-traversal-risk`

Building a filesystem path from request input lets an attacker use `..` or absolute paths to read or write files outside the intended directory.

- **Category:** Security
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** production source files (.js/.ts/.jsx/.tsx, etc.); test/build/doc/generated and dev-tooling paths (`tools/`, `scripts/`, `management/commands/`, build/gulpfile/gruntfile) skipped

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when `readFile`/`readFileSync`/`writeFile`/`writeFileSync(` takes a first argument that is — or a template literal containing — request data (`req.`/`request.`/`params.`/`query.`/`body.`/`parsed.`), or when `path.join(`/`path.resolve(` includes one of those accessors. A negative lookbehind keeps a literal filename segment like `'render-query.js'` (the `query.` inside a string) from matching, and comments are stripped first. FALSE POSITIVE: the request value is already validated/normalized against a fixed base directory (basename-only, traversal rejected) before the fs/`path` call — the static check sees the accessor but not the upstream sanitization — or the matched `req.`/`query.` is a property of a non-request object that happens to share the name.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Map user-visible identifiers to server-owned paths (look up an allowlisted filename by id) instead of joining caller input directly. When a path must come from input, take only `path.basename(...)`, then `path.resolve(BASE, input)` and confirm the result still starts with `BASE` so `..` or absolute paths cannot escape. Never pass `req`, `params`, `query`, or `body` data into `fs` calls unchecked.
