# `react-doctor/rn-scrollview-flex-in-content-container`

Replace `flex: <positive number>` on contentContainerStyle with `flexGrow: 1`

- **Category:** React Native
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** react-native
- **Enabled when:** framework=react-native and capabilities=react-native
- **Documentation:** <https://reactnative.dev/docs/scrollview#contentcontainerstyle>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a JSXOpeningElement whose resolved name is ScrollView, FlatList, SectionList, VirtualizedList, KeyboardAwareScrollView, FlashList, or LegendList that has a contentContainerStyle prop resolving to an object literal containing a `flex` key whose value is a numeric Literal greater than 0 — either inline ({{ flex: 1 }}) or via one level of binding to a StyleSheet.create({ container: { flex: 1 } }) map referenced as styles.container or styles['container']. False positive: the rule correctly stays silent and you should too when flex is 0 or negative (intentional RN non-flexible / shrink-to-min modes), when the value is non-literal/dynamic (flex: value), when flexGrow or flexBasis appears alongside flex (author is deliberately overriding a shorthand slot), when flex sits on `style` rather than `contentContainerStyle`, on non-scroll components like View, when the style comes from a plain object literal that is NOT StyleSheet.create, when the StyleSheet key is missing or computed dynamically (styles[key]), or in test-like files (tagged test-noise).

## Fix prompt

Use this once validation confirms the diagnostic is real.

On the scroll container's contentContainerStyle, replace the `flex: <number>` shorthand with `flexGrow: 1` (e.g. contentContainerStyle={{ flexGrow: 1 }} or the matching StyleSheet.create entry { flexGrow: 1 }). In React Native `flex: 1` expands to flexBasis: 0, which collapses the content container to zero height once the inner content exceeds the viewport on small devices; flexGrow: 1 keeps the fill-remaining-space behavior without the basis-0 collapse. Leave flex: 0, negative flex, or a flex paired with an explicit flexGrow/flexBasis untouched, since those are deliberate. See https://reactnative.dev/docs/scrollview#contentcontainerstyle
