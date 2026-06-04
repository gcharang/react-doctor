# `react-doctor/rn-no-legacy-expo-packages`

Migrate to the recommended replacement package — legacy Expo packages are no longer maintained

- **Category:** React Native
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** react-native
- **Enabled when:** framework=react-native and capabilities=react-native

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Verify the import source is expo-av (or any subpath like expo-av/Audio) or expo-permissions (or any subpath). Both are deprecated and removed in newer Expo SDKs. Not really a false positive on a maintained Expo project — pinning to an older SDK only buys time.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Replace expo-av with expo-audio for audio playback/recording and expo-video for video; both expose cleaner hook-based APIs. Replace expo-permissions by calling each module's own request method (Camera.requestCameraPermissionsAsync(), Notifications.requestPermissionsAsync(), etc.). See https://docs.expo.dev/versions/latest/sdk/audio/
