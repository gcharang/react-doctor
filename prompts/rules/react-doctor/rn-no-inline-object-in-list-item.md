# `react-doctor/rn-no-inline-object-in-list-item`

Hoist style/object props outside renderItem (StyleSheet.create, useMemo at list scope, or pass primitives) so memo() row components stop bailing

- **Category:** React Native
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** react-native
- **Enabled when:** framework=react-native and capabilities=react-native

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Verify a JSX prop inside renderItem, renderSectionHeader, or renderSectionFooter is an inline object literal (style={{...}}, user={{...}}, etc.) — a fresh object reference per row per render. False positive when the row component isn't wrapped in React.memo: there's no shallow compare to break, just GC pressure from extra allocations.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Move static styles into const styles = StyleSheet.create({ row: {...} }) and pass style={styles.row}. For per-row dynamic objects, build a stable lookup with useMemo at list scope and pass primitives (id, value) into the memoized row so it composes its own style. See https://reactnative.dev/docs/optimizing-flatlist-configuration
