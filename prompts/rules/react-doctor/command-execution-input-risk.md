# `react-doctor/command-execution-input-risk`

Passing caller-controlled input into a shell command lets an attacker run arbitrary commands on your server (remote code execution).

- **Category:** Security
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** production script source files (.js/.ts/.tsx/.py/.php); tests, build/scripts, docs, generated, and repo dev-tooling (tools/, scripts/, management/commands, build/gulpfile/gruntfile) skipped

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires in production script source (`.js/.ts/.tsx/.py/.php`) when a command-execution primitive is called with caller-shaped input nearby in the same call. Sinks: bare `exec`/`execSync`/`spawn`/`spawnSync`/`system`/`passthru`/`proc_open`/`shell_exec` (method calls like `regex.exec(...)` or `store.query.exec(...)` are excluded), or `os.system`/`subprocess.run|Popen|call`/`child_process`/`cp.exec`/`spawn…`. It fires only when, within the call's own argument list (~220 chars, not bleeding past the closing `)`), it also sees `req.`/`request.`/`params.`/`query.`/`body.`/`searchParams`/PHP `$_GET`/`$_POST`/`$_REQUEST`, an explicit `shell=true`/`shell: true`, or a Python f-string interpolation like `f'… {value} …'`. FALSE POSITIVE to suppress: a fixed or argv-array command whose only dynamic value is trusted, non-request data (a constant, validated, or allowlisted value) — the request token / `f'{…}'` / `shell=true` is what trips it, so confirm the interpolated value truly derives from an external caller. Repo tooling (`tools/`, `scripts/`, `management/commands/`, `build`/`gulpfile`/`gruntfile`) is already exempt as argv-driven, not web-facing.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Never build a shell command from caller input. Use the array form with a fixed executable and pass arguments as a list (`execFile('convert', [safeName])`, `spawn(cmd, argsArray)`, Python `subprocess.run([...], shell=False)`) so no shell parses the input, and remove `shell: true`/`shell=True`. Validate every dynamic argument against a strict allowlist, reject shell metacharacters, and resolve and bound any filenames or paths. Prefer a native library API over shelling out.
