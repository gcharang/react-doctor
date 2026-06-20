# `react-doctor/mdx-ssr-execution-risk`

Compiling untrusted MDX with the full pipeline runs attacker-supplied JSX and expressions on your server, which can lead to code execution.

- **Category:** Security
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** production source files (.js/.ts/.jsx/.tsx, etc.); test/build/doc/generated paths skipped

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when an MDX library surface (`@mdx-js/mdx`, `next-mdx-remote`, or `MDXRemote`/`compileMDX`/`evaluateMdx`) is followed within ~700 chars by an untrusted-source or dangerous-flag marker: `repo`/`customer`/`tenant`/`user-content|markdown|mdx|input|provided|generated|submitted`/`untrusted`/`searchParams`/`req.`/`request.`/`fetch(`/`prisma.`/`db.`/`database`/`rehypeRaw`/`allowDangerousHtml`. Comments are stripped first. FALSE POSITIVE: the file compiles its own first-party, build-time MDX (docs/blog content from the repo's own `content/` directory) with no attacker-controlled source — generic library usage co-occurring with a word like `content` is not itself a vulnerability; a bare `evaluate`/`compile` not tied to an MDX surface is also excluded.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Never compile or evaluate attacker-controlled MDX with the full pipeline. For untrusted content, use a constrained compiler: disable JSX, expressions, and raw HTML (do not enable `rehype-raw` or `allowDangerousHtml`), render through a sandbox with an allowlisted component set, and prefer plain Markdown that cannot run code. Do not cache one tenant's rendered output where another tenant can read it.
