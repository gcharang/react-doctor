# `react-doctor/rn-list-callback-per-row`

Hoist the handler with useCallback at list scope and pass the row id as a primitive prop, so the row's memo() shallow-compare actually hits

- **Category:** React Native
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** react-native
- **Enabled when:** framework=react-native and capabilities=react-native

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Verify an onPress, onLongPress, onPressIn, onPressOut, onSelect, or onClick JSX attribute inside renderItem is an inline arrow or function expression — that's a new closure for every row on every render. Lower-impact false positive when the row component isn't wrapped in React.memo (no shallow compare to break).

## Fix prompt

Use this once validation confirms the diagnostic is real.

Hoist the handler at list scope (const onPressRow = useCallback((id) => ..., [])), pass id={item.id} into the memo-wrapped row component, and call onPress={() => onPressRow(id)} inside the row (or use a tiny wrapper component). The row's shallow compare then hits and avoids re-render. See https://react.dev/reference/react/useCallback
