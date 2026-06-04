# `react-doctor/rn-list-data-mapped`

Wrap the projection in `useMemo(() => items.map(...), [items])` so the list's `data` prop has a stable reference across parent renders

- **Category:** React Native
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** react-native
- **Enabled when:** framework=react-native and capabilities=react-native

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm the data prop on FlatList, FlashList, LegendList, SectionList, or VirtualizedList is an inline .map(...) or .filter(...) call — a fresh array per parent render busts referential equality and forces the list to re-key every row. False positive when the parent essentially never re-renders, but the useMemo fix is free.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Hoist the projection: const rows = useMemo(() => items.map(toRow), [items]) (or move the transform up to wherever items is fetched/derived), then pass data={rows}. Virtualization windows stop resetting and keyExtractor matching stays cheap across renders. See https://reactnative.dev/docs/optimizing-flatlist-configuration
