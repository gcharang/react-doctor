# `react-doctor/rn-no-deep-imports`

Import from the "react-native" package root, not the deprecated "react-native/Libraries/..." subpath: import { Alert } from "react-native"

- **Category:** React Native
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** react-native
- **Enabled when:** framework=react-native and capabilities=react-native

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on an ImportDeclaration, re-export ExportNamedDeclaration (one with a source), or ExportAllDeclaration whose module string starts with "react-native/Libraries/" AND whose final path segment is one of the curated PUBLIC_RN_ROOT_EXPORTS (View, Text, Image, ScrollView, FlatList, TextInput, Pressable, Button, StyleSheet, Alert, Animated, Platform, Dimensions, Keyboard, StatusBar, etc.) — or any path under "react-native/Libraries/NewAppScreen", which gets a tailored message. Default and named value imports both count; a mixed import like { View, type ViewProps } still fires because a value specifier is present. Suppress: it must NOT fire on a pure type-only import/re-export — "import type { ViewProps } from ..." OR the inline all-type form "import { type ColorSchemeName } from ..." / "export { type ViewProps } from ..." — since many RN internal types are not root-exported. Also suppress on Codegen/internal-only deep paths with no root equivalent whose leaf segment is NOT in the set (TurboModule/RCTExport, Image/resolveAssetSource, Utilities/PolyfillFunctions), on namespace-module sub-exports like { linear } from "react-native/Libraries/Animated/Easing" (root only exports the Easing object), on tooling subpaths outside Libraries/ ("react-native/jest-preset", "react-native/jest/setup"), on relative paths that merely contain the substring ("./react-native/Libraries/Alert/Alert"), and on jest.mock("react-native/Libraries/...") calls since those are not import statements.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Rewrite the module string from the deprecated internal subpath to the package root: change import { Alert } from "react-native/Libraries/Alert/Alert" to import { Alert } from "react-native" (same for default imports like import View from ".../View/View" becoming import View from "react-native", and for re-exports: export { Text } from "react-native/Libraries/Text/Text" becoming export { Text } from "react-native"). For any "react-native/Libraries/NewAppScreen" path, repoint it to the extracted package instead: import { Colors } from "@react-native/new-app-screen". Do not touch type-only or internal-only deep imports the rule left alone.
