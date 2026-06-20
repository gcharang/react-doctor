# `react-doctor/postmessage-origin-risk`

Reading `event.data` in a `message` handler without checking `event.origin` lets any other window send data your code trusts, which can lead to cross-site scripting or data theft.

- **Category:** Security
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** production source files (.js/.ts/.jsx/.tsx); test/scripts/docs/generated paths and any file path containing "worker" skipped

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a message handler — a `*.addEventListener('message', ...)` call or a `*.onmessage =` assignment — reads `event.data` (also matched on `e`/`evt`/`msg`/`message`.data) without an origin/sender check appearing before that read. An origin check is any `origin` reference (a helper call like `isTrustedOrigin(event)` or a destructured binding; `original` is excluded) or an `event.source ===`/`!==` comparison; if the check is ordered after the first `.data` read it still fires. Same-application channels are exempt — MessagePort/Worker/BroadcastChannel/WebSocket/EventSource/SSE targets (`port`, `worker`, `channel`, `broadcast`, `socket`, `ws`, `sse`, `eventsource`, `self.onmessage`, `source.`) and files whose path contains "worker" are skipped. FALSE POSITIVE: real origin validation the static check can't see textually before the read — e.g. it lives in a deeply nested helper whose name lacks "origin", or the first `.data` access is benign (logging) and a genuine guard follows; confirm only when `event.data` is consumed with no exact-origin allowlist check.

## Fix prompt

Use this once validation confirms the diagnostic is real.

At the top of the handler, compare `event.origin` for exact equality against a known origin (`if (event.origin !== EXPECTED_ORIGIN) return;`), never an `endsWith`/`includes`/regex match an attacker domain can satisfy. Optionally also confirm `event.source` is the expected window or iframe. Treat any parent or child frame as attacker-controlled and read `event.data` only after the check passes.
