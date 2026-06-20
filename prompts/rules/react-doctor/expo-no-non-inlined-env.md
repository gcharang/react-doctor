# `react-doctor/expo-no-non-inlined-env`

Use static dotted access: process.env.EXPO_PUBLIC_NAME (computed/destructured reads aren't inlined and are undefined at runtime)

- **Category:** React Native
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** react-native
- **Enabled when:** framework=react-native and capabilities=react-native
- **Documentation:** <https://docs.expo.dev/guides/environment-variables/>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on two AST shapes in an Expo app file: (1) a computed MemberExpression whose object is the static `process.env` member (process.Identifier . env.Identifier, non-computed) — and it fires UNLESS the computed key is a string Literal that does NOT start with `EXPO_PUBLIC_` (the source skips only that case via isNonExpoPublicLiteralKey at line 66), so a dynamic key `process.env[key]` AND an `EXPO_PUBLIC_` string-literal key `process.env["EXPO_PUBLIC_SECRET_TOKEN"]` both fire, while a non-`EXPO_PUBLIC_` string-literal key is skipped; (2) a VariableDeclarator whose id is an ObjectPattern and whose init is `process.env`, i.e. `const { EXPO_PUBLIC_API_URL } = process.env`. False positives to SUPPRESS: a literal computed key that does NOT start with EXPO_PUBLIC_, such as `process.env["JEST_WORKER_ID"]` or optional-chained `process.env?.["EXPO_DEBUG"]` — these are runtime/tooling probes expected to be absent in the bundle and the rule already skips them (verify the literal key text); static dotted access `process.env.EXPO_PUBLIC_API_URL`; whole-object aliasing `const env = process.env` (no ObjectPattern); computed access on an unrelated object like `config.env[key]`; and any Node/build-time file the engine should not have flagged anyway — *.config.[cm]?[jt]sx?, files under scripts//tools//tooling//cli//bin/, Expo Router `+api`/`+html` routes, `*.server.*` modules, and test files (*.test.*, *.spec.*, __tests__/, *.e2e.*).

## Fix prompt

Use this once validation confirms the diagnostic is real.

Rewrite the env read as a static, dotted, literal access so babel-preset-expo can inline it at build time: replace destructuring `const { EXPO_PUBLIC_API_URL } = process.env` with `const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL`, and replace computed access `process.env["EXPO_PUBLIC_API_URL"]` or `process.env[key]` with `process.env.EXPO_PUBLIC_API_URL`. The key must be a literal property name written with dot notation and prefixed `EXPO_PUBLIC_`; dynamic keys cannot be inlined at all, so hardcode the specific var name rather than indexing by a variable. Move any genuinely server/Node-only var that must NOT ship to the client out of client code into a config, *.server.*, or `+api` route file instead. See https://docs.expo.dev/guides/environment-variables/
