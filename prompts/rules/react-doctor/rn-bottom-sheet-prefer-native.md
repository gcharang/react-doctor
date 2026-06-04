# `react-doctor/rn-bottom-sheet-prefer-native`

Use `<Modal presentationStyle="formSheet">` (RN v7+) for native gesture handling and snap points

- **Category:** React Native
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** react-native
- **Enabled when:** framework=react-native and capabilities=react-native

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm the file imports @gorhom/bottom-sheet, react-native-bottom-sheet, react-native-modal-bottom-sheet, or react-native-raw-bottom-sheet — all run gestures and animation on the JS thread. False positive on projects pinned below React Native 0.76 where the native form-sheet Modal API isn't available yet.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Replace with the built-in Modal using presentationStyle="formSheet" plus sheetAllowedDetents (e.g. [0.5, 1]) — gestures, detents, and dismissal run on the OS modal stack instead of the JS thread. Requires RN 0.76+ (iOS first, Android still maturing). See https://reactnative.dev/docs/modal#presentationstyle-ios
