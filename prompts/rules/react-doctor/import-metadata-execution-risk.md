# `react-doctor/import-metadata-execution-risk`

Evaluating imported metadata or file contents (EXIF, manifests, presets, uploads, archives) as code lets an attacker achieve remote code execution.

- **Category:** Security
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** production source files (.js/.ts/.jsx/.tsx, etc.); test/build/doc/generated paths skipped

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when an execution sink — `eval`, `new Function`, `vm.runIn…`, or `child_process`/`cp`.`exec`/`spawn` (and, when the file also imports a process module like `child_process`/`execa`/`subprocess`/`Deno.run`, a bare `exec(File)(Sync)`/`spawn(Sync)(`) — is followed inside the same statement (≤200 chars, no `;`) by a lowercase taint word: `exif`, `metadata`, `manifest`, `preset`, `plugin`, `upload`, `dropped`/`drops`, `archive`, `zip`, `unzip`, or `untar`. Comments are stripped before matching. FALSE POSITIVE: the taint word is a quoted string-literal argument (e.g. `spawnSync('claude', ['plugin', …])`) — static argument values are not matched — or it is part of a SCREAMING_CASE constant (`PLUGIN_ID`) or camelCase type (`WorkflowMetadata`), which the case-sensitive match excludes; a bare `spawn(`/`exec(` with no process-module evidence (xstate/redux-saga effects) is also ignored.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Never pass imported or derived metadata into an execution sink. Parse EXIF, manifests, and presets with a real parser and validate them against a strict schema (for example Zod) before use; extract archives with a library that writes to a sandboxed directory and checks for path and zip-slip traversal. If a subprocess is truly required, run a fixed binary with an explicit, validated argument array (never a shell string) and pass the metadata as inert data, not as the command.
