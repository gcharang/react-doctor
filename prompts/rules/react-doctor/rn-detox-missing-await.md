# `react-doctor/rn-detox-missing-await`

Prepend await to the Detox action, waitFor chain, or expect(element(...)) assertion: await element(by.id('submit')).tap()

- **Category:** React Native
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** react-native
- **Enabled when:** framework=react-native and capabilities=react-native

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires only in Detox test files (filename matching /(\.e2e\.[cm]?[jt]sx?$)|((^|\/)e2e\/)/) on a bare ExpressionStatement whose expression is a CallExpression (so the statement is NOT already an AwaitExpression) ending in a member-call terminal method that is not then/catch/finally, where findChainRoot walks the .callee.object chain to a root identifier that is either element(...) with a terminal in DETOX_ELEMENT_ACTIONS (tap, multiTap, longPress, longPressAndDrag, swipe, scroll, scrollTo, scrollToIndex, scrollToElement, typeText, replaceText, clearText, tapReturnKey, tapBackspaceKey, pinch, setColumnToValue, setDatePickerDate, performAccessibilityAction, adjustSliderToPosition), or waitFor(...), or expect(...) whose first argument is itself an element(...)/web(...) call. False positives to suppress: a call that IS awaited or returned (await element(...).tap(), return element(...).tap() — these are not bare CallExpression statements), a .then/.catch/.finally-handled chain (element(...).tap().then(done)), a bare element(by.id('x')) or element(...).atIndex(0) with no action terminal (matcher construction only), an element(...) passed as an argument inside another awaited call (the multiline waitFor(element(...)) case), a plain Jest expect(value).toBe(3) where the subject is not element/web, and matcher construction assigned to a variable (const el = element(...)).

## Fix prompt

Use this once validation confirms the diagnostic is real.

Prepend await to the un-awaited Detox call so it serializes with Detox's synchronization: change element(by.id('submit')).tap() to await element(by.id('submit')).tap(), waitFor(element(...)).toBeVisible().withTimeout(2000) to await waitFor(...)..., and expect(element(...)).toBeVisible() to await expect(element(...)).toBeVisible(). Ensure the enclosing test/step callback is async; if the chain is returned or already handled with .then/.catch/.finally leave it as is.
