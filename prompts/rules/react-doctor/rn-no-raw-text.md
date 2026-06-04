# `react-doctor/rn-no-raw-text`

Wrap text in a `<Text>` component: `<Text>{value}</Text>` — raw strings outside `<Text>` crash on React Native

- **Category:** React Native
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** react-native
- **Enabled when:** framework=react-native and capabilities=react-native

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a JSXElement whose tag is NOT in the text allowlist (Text/TextInput/Typography/Paragraph/Span/H1-H6) and contains none of the keywords (Text/Title/Label/Heading/Caption/Subtitle/Typography/Paragraph/Description/Body) has a direct child that is non-whitespace JSXText, or a JSXExpressionContainer wrapping a string/number Literal or TemplateLiteral. Files with a 'use dom' directive, *.web.tsx, and subtrees inside a 'Platform.OS === "web"' branch are skipped. The crash it prevents ('Text strings must be rendered within a <Text>') happens ONLY when the parent resolves to a React Native host primitive (View, ScrollView, Pressable, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, etc.) — confirm those. FALSE POSITIVES to SUPPRESS: (1) the parent tag is a lowercase HTML DOM element ('div','span','label','a','li','p','h1'-'h6','select','option', styled.div, or a ref typed HTMLDivElement / a CSS import / className-style props) — the file is React-DOM/react-native-web/styled-components/browser-extension code where raw text is valid HTML and never crashes, even if package detection ran on it; (2) the parent is a custom component that itself renders its children inside a <Text> — text-rendering wrappers such as 'PrimaryButton','SecondaryButton','LinkButton','Chip','Badge','Pill','MenuItem','Tab','ListItem','Button' — these pass the raw string into their own internal <Text>, so the keyword-allowlist miss is harmless. When in doubt, treat a button/link/chip-like custom wrapper rendering DOM as a suppress, not a confirm.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Principle: the value must reach a <Text> before it hits a React Native host primitive — wrap it, don't just relabel the parent. (A) Direct fix on an RN primitive: 'return <View>{count} items</View>' becomes 'return <View><Text>{count} items</Text></View>'; coalesce sibling raw nodes into ONE Text with a template literal — '<Text>{`${selectedPage} of ${pageCount} pages`}</Text>' — not several adjacent <Text> nodes. (B) Single chars, numbers, and ternaries that resolve to a string still need a Text: '<View><Text>{isFocused ? "" : "Click to enable"}</Text></View>'. (C) If the parent is a custom component you own (e.g. a button) make IT render its children in <Text> internally, then '<MyButton>Save</MyButton>' is correct everywhere and the rule stops flagging callers. ANTI-PATTERNS: do NOT 'fix' by renaming the parent to sneak in an allowlist keyword (e.g. wrapping in a no-op <Label>) just to silence the linter — that suppresses without rendering text safely; and do NOT add <Text> around content already inside a DOM/web element ('div','span','a', styled.div) — on web that is valid HTML and a stray <Text> is wrong, so suppress instead. See https://reactnative.dev/docs/text
