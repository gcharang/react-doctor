# `react-doctor/rn-no-image-children`

Replace <Image> with <ImageBackground> to render content over the image: <ImageBackground source={src}>...children...</ImageBackground>

- **Category:** React Native
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** react-native
- **Enabled when:** framework=react-native and capabilities=react-native
- **Documentation:** <https://reactnative.dev/docs/imagebackground>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a JSXElement whose opening tag resolves (via getImportedNameFromModule) to the Image export of "react-native" — including aliased imports like `import { Image as RNImage }` — that has at least one meaningful child per isMeaningfulImageChild: a JSXElement/JSXFragment, non-whitespace JSXText, or a JSXExpressionContainer holding anything other than {null}, {false}, {undefined}, or a {/* comment */}. False positive boundary, all explicitly NOT flagged: a self-closing `<Image source={src} />`, whitespace-only or empty children, `{null}`/`{false}`/`{undefined}` conditional-render escape hatches, an `<Image>` imported from expo-image or any local/custom module (the OSS corpus showed next/image and Skia's <Image> as the dominant same-name look-alikes), and `<ImageBackground>` which legitimately renders children.

## Fix prompt

Use this once validation confirms the diagnostic is real.

React Native's <Image> drops children silently at runtime — it renders nothing. Swap it for <ImageBackground>, which takes the same source/style props and is the documented way to layer content over an image: change `<Image source={src} style={s}>{overlay}</Image>` to `<ImageBackground source={src} style={s}>{overlay}</ImageBackground>` and update the import to `import { ImageBackground } from "react-native"`. See https://reactnative.dev/docs/imagebackground
