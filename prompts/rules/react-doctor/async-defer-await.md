# `react-doctor/async-defer-await`

Move the `await` after the synchronous early-return guard so the skip path stays fast

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm an awaited variable declaration (e.g. const x = await foo()) immediately followed by an if (...) return ...; whose test AND consequent reference NONE of the awaited bindings. False positive: the early-return uses the awaited value (e.g. if (!user) return null; after const user = await fetch...) — those are legitimate guards.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Reorder so the synchronous early-return runs first, then the await: if (skip) return defaultValue; const x = await something(). The function only pays the network/IO latency on the path that actually needs the data. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
