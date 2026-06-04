# `react-doctor/client-localstorage-no-version`

Bake a version into the storage key (e.g. "myKey:v1"); a future schema change can ignore old data instead of crashing on it

- **Category:** Correctness
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm the call is localStorage.setItem or sessionStorage.setItem with a string-literal key that lacks a version suffix — the rule's regex /(?:[._:-]v\d+|@\d+|\bv\d+\b)/i already accepts keys like "prefs:v1", "cache@1", or "stateV2" — AND whose second argument is a literal JSON.stringify(...) call. False positive: the serialized payload itself already encodes a schema version field.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Append a version suffix to the storage key (e.g. "prefs" becomes "prefs:v1") and, on read, drop or migrate data from older keys so a future shape change skips stale entries instead of crashing JSON.parse. Bump the suffix anytime the stored shape changes. See https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
