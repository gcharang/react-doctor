# `react-doctor/local-rpc-native-bridge-risk`

A localhost or native bridge that accepts loose origins and exposes install/update or shell commands lets a malicious web page drive native actions on the user's machine.

- **Category:** Security
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** production source files (.js/.ts/.jsx/.tsx, etc.); test/build/doc/generated paths skipped

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a localhost/bridge token (`127.0.0.1`, `localhost`, `Access-Control-Allow-Origin`, or `websocket`/`WebSocket`) is followed within ~700 chars by a native-capability command: `UpdateApp`, `InstallApp`, `child_process`, or a bare `exec(File)(Sync)`/`spawn(Sync)(` call (a negative lookbehind excludes method calls like `regex.exec(`). Comments are stripped first. FALSE POSITIVE: the localhost reference and the command are unrelated code that merely co-occur within the window, or the apparent command is a generic verb (`install`/`update`/`includes`/`indexOf` used as ordinary state updates or dev-server helpers) — those generic verbs are deliberately NOT matched, only concrete native-capability calls are.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Treat the local server as a trust boundary: parse the request `Origin` with `new URL(...)` and check it against an exact allowlist (never substring or `includes` matching, never `Access-Control-Allow-Origin: *`), require a per-request nonce or CSRF token, and expose only narrow, named methods. Never let a web page trigger `exec`/`spawn` or native install/update; gate any privileged command behind out-of-band user confirmation and signed payloads.
