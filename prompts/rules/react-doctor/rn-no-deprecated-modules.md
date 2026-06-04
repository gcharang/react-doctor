# `react-doctor/rn-no-deprecated-modules`

Import from the community package instead — deprecated modules were removed from the react-native core

- **Category:** React Native
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** react-native
- **Enabled when:** framework=react-native and capabilities=react-native

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm the named import comes from "react-native" (not a community package) and the specifier matches one of the removed core modules: AsyncStorage, Picker, PickerIOS, DatePickerIOS, DatePickerAndroid, ProgressBarAndroid, ProgressViewIOS, SafeAreaView, Slider, ViewPagerAndroid, WebView, NetInfo, CameraRoll, Clipboard, ImageEditor, MaskedViewIOS. All were extracted to community packages.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Install the community replacement named in the lint message and update the import (e.g. @react-native-async-storage/async-storage, @react-native-community/slider, react-native-webview). SafeAreaView should migrate to react-native-safe-area-context with SafeAreaProvider at the app root. Many replacements require pod install / native linking. See https://reactnative.directory
