# `react-doctor/plugin-update-trust-risk`

Downloading and running an update or plugin without verifying its integrity lets an attacker ship malicious code to your users.

- **Category:** Security
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** production source files plus config/CI files (package.json, Dockerfile, docker-compose.yml, .github/workflows/*.yml, vercel.json, next.config.*, netlify.toml); test/doc/generated source skipped

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when an updater-shaped trigger (`repoUrl`/`updateUrl`/`UpdateApp`/`InstallApp`/`auto-updater`/`installer`/`curl`/`wget`, but not `curl -T`/`--upload-file`) is followed within ~250 chars by a concrete executable artifact (`.zip`/`.exe`/`.dmg`/`.appimage`/`.msi`/`.deb`/`.rpm`/`.tar.gz`) or a pipe-to-shell (`| bash`/`| sh`); for `.js`/`.ts` source files it additionally requires a real execution surface (`child_process`/`execa`/`os.system`/`subprocess`/`Deno.run`/`autoUpdater`/`electron-updater`, or an `exec`/`spawn` call). Comments are stripped first. FALSE POSITIVE: the download already verifies a hash/signature before use (`sha256sum`, `--checksum`, `EXPECTED_SHA`, `gpg --verify`, a `.sha256` file), which suppresses the finding, or a docs/snippet component merely DISPLAYS an install command with no execution surface (skipped for source files).

## Fix prompt

Use this once validation confirms the diagnostic is real.

Verify integrity before running any downloaded update or plugin: check a pinned SHA-256 (or `gpg --verify` a signature) and abort on mismatch. Pin the update or repository URL to a trusted host (no user-supplied `repoUrl`), serve it over HTTPS, and never pipe a download straight into a shell (`curl … | sh`). Keep custom-repository or third-party plugin installs behind an explicit user confirmation.
