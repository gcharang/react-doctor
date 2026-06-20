# `react-doctor/active-static-asset`

A browser-reachable SVG that contains a `<script>` tag or `on*` event handler runs that code in your origin when someone opens it, which can lead to cross-site scripting.

- **Category:** Security
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** browser-reachable `.svg` assets (public/, dist/assets, .next/static, out/, generated bundles, .map) for the executable-SVG branch; production source (.js/.ts/.tsx) and config/CI files (next.config, vercel.json, Dockerfile, workflow YAML, netlify.toml) for the config/embed branch; server build output (.next/server, .output/server) skipped

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Two detection branches. (1) For a `.svg` file that is browser-reachable (under `public/`, `dist/assets/`, `.next/static/`, `out/`, a generated bundle, or a `.map`), it fires when the SVG body contains a `<script` tag or an inline `on{load,error,click,mouseover}=` event handler — an executable SVG that runs script when opened same-origin (escalated to an error-level finding). (2) For production source (`.js/.ts/.tsx`) or config/CI files, it fires on the literal `dangerouslyAllowSVG: true` or an `<object|embed|iframe>` whose `data`/`src` points at a `.svg` file. FALSE POSITIVE to suppress: a first-party, fully-trusted SVG you author whose script/handlers are intentional and never mixed with user-uploaded SVGs, or a `dangerouslyAllowSVG: true` config where every served SVG is sanitized/first-party and the response already sets an attachment disposition and a script-blocking CSP.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Serve SVGs as inert images: reference them with `<img src=...>` instead of `<object>`, `<embed>`, or `<iframe>`, so embedded scripts and handlers never run. If you must serve raw SVG, sanitize it first (for example DOMPurify with the SVG profile) to strip `<script>` and `on*` handlers, deliver it from a cookieless origin with `Content-Disposition: attachment`, and set a `Content-Security-Policy` that blocks `script-src` and `object-src`. Avoid `dangerouslyAllowSVG: true` in Next image config unless every SVG is first-party and sanitized.
