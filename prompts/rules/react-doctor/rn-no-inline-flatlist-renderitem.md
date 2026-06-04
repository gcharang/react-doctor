# `react-doctor/rn-no-inline-flatlist-renderitem`

Extract renderItem to a named function or wrap in useCallback to avoid re-creating on every render

- **Category:** React Native
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** react-native
- **Enabled when:** framework=react-native and capabilities=react-native

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Verify renderItem on FlatList, SectionList, VirtualizedList, or FlashList is an inline arrow or function expression — a fresh reference each parent render that defeats the list's bail-out and re-runs renderItem for every visible row. Lower priority when the parent re-renders rarely, but still worth fixing on interactive screens.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Extract: const renderItem = useCallback(({ item }) => <Row item={item} />, [/* stable deps */]) and pass renderItem={renderItem}. Pair with a stable keyExtractor and a React.memo-wrapped Row so windowing and row memoization both pay off. See https://reactnative.dev/docs/optimizing-flatlist-configuration
