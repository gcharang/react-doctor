# `react-doctor/rn-no-scrollview-mapped-list`

Use FlashList, LegendList, or FlatList — `<ScrollView>{items.map(...)}</ScrollView>` mounts every row in memory

- **Category:** React Native
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** react-native
- **Enabled when:** framework=react-native and capabilities=react-native

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

The rule fires on a ScrollView JSXElement whose direct child is a JSXExpressionContainer wrapping a CallExpression with a .map member call. Only the literal element name "ScrollView" is matched, so Animated.ScrollView and namespace forms are not flagged. False positive: a short fixed-length array (under about ten rows) where virtualization overhead outweighs the mount cost.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Swap to FlashList from @shopify/flash-list (best perf), LegendList from @legendapp/list, or FlatList. Pass the array via the data prop with a memoised renderItem, set estimatedItemSize on FlashList, and move surrounding JSX into ListHeaderComponent and ListFooterComponent so they don't break row recycling. See https://shopify.github.io/flash-list/
