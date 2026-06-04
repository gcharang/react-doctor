# `react-doctor/rn-list-recyclable-without-types`

Add `getItemType={item => item.kind}` so FlashList keeps separate recycle pools per item type — heterogeneous rows shouldn't share recycled cells

- **Category:** React Native
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** react-native
- **Enabled when:** framework=react-native and capabilities=react-native

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Verify FlashList or LegendList has recycleItems enabled (bare attribute, ={true}, or a dynamic value) and lacks getItemType. False positive: when renderItem always returns the same component shape, recycling is safe without getItemType — only matters when renderItem branches between headers, separators, message bubbles, or other heterogeneous trees.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Add getItemType={(item) => item.kind} — return a short stable string per item shape ("header", "message", "separator"). FlashList keeps a separate recycle pool per type so a header never mounts into a row cell, killing flickers and measurement errors. See https://shopify.github.io/flash-list/docs/usage/
