# `react-doctor/rn-list-missing-estimated-item-size`

Add estimatedItemSize so FlashList/LegendList sizes its initial container pool correctly: <FlashList data={items} estimatedItemSize={64} />

- **Category:** React Native
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** react-native
- **Enabled when:** framework=react-native and capabilities=react-native

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a JSXOpeningElement whose local name resolves via getImportedNameFromModule back to the canonical export FlashList from @shopify/flash-list or LegendList from @legendapp/list (aliased imports like `import { FlashList as List }` still fire), AND the element has a `data` prop, AND it has neither an `estimatedItemSize` nor an `estimatedListSize` attribute. False positive: any element already passing one of those sizing hints (estimatedListSize counts, including LegendList's `estimatedListSize={{ height, width }}`); a placeholder `data={[]}` empty-array literal (skipped as a render-with-no-data branch); an abstract wrapper with no `data` prop such as `<FlashList {...props} />`; a FlashList/LegendList imported from a local wrapper or non-Shopify/non-Legend package, or a same-named local component declared in-file with no import; a namespaced `<Shopify.FlashList>` (no local binding to verify); and plain react-native FlatList/SectionList which are out of scope and have built-in defaults.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Add an estimatedItemSize prop set to the average row height in pixels, e.g. <FlashList data={items} renderItem={renderItem} estimatedItemSize={64} />, so the recycler allocates its initial container pool to match real rows instead of a hard-coded default that mismatches and flashes blank cells on fast scroll. For LegendList you may instead pass the richer estimatedListSize={{ height, width }} hint. Measure a representative row to pick the number rather than guessing.
