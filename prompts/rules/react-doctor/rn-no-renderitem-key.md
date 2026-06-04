# `react-doctor/rn-no-renderitem-key`

Remove the no-op `key` from the JSX row that renderItem returns and set `keyExtractor` (or `item.key`) on the list instead.

- **Category:** React Native
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** react-native
- **Enabled when:** framework=react-native and capabilities=react-native
- **Documentation:** <https://reactnative.dev/docs/flatlist#keyextractor>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a JSXAttribute named renderItem, renderSectionHeader, or renderSectionFooter (RENDER_ITEM_PROP_NAMES) sits on a list element whose resolved name is FlatList, SectionList, VirtualizedList, FlashList, or LegendList (REACT_NATIVE_LIST_COMPONENTS), the prop value is an arrow or function expression, and a top-level returned JSXElement's own opening element carries a key — it unwraps parens and TS `as`, descends into ternary consequent/alternate and ||/?? branches, and reports each offending return path independently. False positive boundary, all of which the rule already skips: key on a descendant nested inside the returned row (e.g. <Tag key> inside an item.tags.map within the returned <View>), key on JSX produced by a nested helper function declared inside renderItem (recursion stops at function-like nodes), renderItem on a non-list component like <Carousel>, renderItem returning null, and ordinary list-rendering via items.map outside any renderItem prop.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Delete the key prop from the JSX element renderItem returns (e.g. change `renderItem={({ item }) => <Row key={item.id} value={item.value} />}` to `renderItem={({ item }) => <Row value={item.value} />}`) since React Native lists key rows from keyExtractor or item.key, not from this inner key. Then ensure the list itself supplies keys: add `keyExtractor={(item) => String(item.id)}` to the FlatList/SectionList/FlashList (or rely on a real item.key field). For multiple return paths, strip key from each returned row. See https://reactnative.dev/docs/flatlist#keyextractor
