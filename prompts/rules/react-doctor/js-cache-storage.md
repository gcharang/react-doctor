# `react-doctor/js-cache-storage`

Cache repeated `localStorage`/`sessionStorage` reads in a local variable — each access serializes/deserializes

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

The rule fires when localStorage.getItem or sessionStorage.getItem is called 2 or more times with the same string-literal key anywhere in the file. False positive when calls live in mutually exclusive code paths that don't both run in one pass, or you intentionally re-read because another tab / extension may have mutated the storage between reads.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Read once into a local const and reuse the variable. Each getItem is a synchronous main-thread call that may block on disk I/O and JSON parsing. If you need cross-tab freshness, register window.addEventListener('storage', ...) once and update the cached value only when the storage event fires. https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event
