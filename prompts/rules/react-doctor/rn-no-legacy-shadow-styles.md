# `react-doctor/rn-no-legacy-shadow-styles`

Use `boxShadow` for cross-platform shadows on the new architecture instead of platform-specific shadow properties

- **Category:** React Native
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** react-native
- **Enabled when:** framework=react-native and capabilities=react-native

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Verify the style object — inline style={{...}}, an entry inside a style={[...]} array, or a value passed to StyleSheet.create({...}) — sets shadowColor, shadowOffset, shadowOpacity, shadowRadius, or elevation. False positive on legacy-architecture apps where boxShadow isn't supported yet; the platform-specific props remain the only option there.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Replace with the cross-platform boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)" (CSS-style syntax that works on both iOS and Android under the New Architecture). Use filter: "drop-shadow(...)" for shadows that need to follow alpha or irregular shapes. Requires RN 0.76+ with the New Architecture. See https://reactnative.dev/docs/view-style-props#boxshadow
