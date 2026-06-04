# `react-doctor/rn-prefer-expo-image`

Use `<Image>` from `expo-image` instead of `react-native` — same prop API, plus disk + memory caching, placeholders, and crossfades

- **Category:** React Native
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** react-native
- **Enabled when:** framework=react-native and capabilities=react-native

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

The rule fires on any ImportSpecifier whose imported name is Image and whose source is exactly "react-native". It doesn't check whether the imported Image is actually rendered, and it misses namespace imports like import * as RN from "react-native". False positive: a bare-workflow or non-Expo project that can't add expo-image as a dependency.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Run npx expo install expo-image and change the import to import { Image } from "expo-image". The API maps cleanly — source, style, and contentFit are drop-in — and you gain disk plus memory caching, blurhash and thumbhash placeholders, and crossfades via the transition prop. See https://docs.expo.dev/versions/latest/sdk/image/
