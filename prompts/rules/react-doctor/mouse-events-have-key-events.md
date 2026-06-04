# `react-doctor/mouse-events-have-key-events`

Pair mouse events with their keyboard equivalents.

- **Category:** Accessibility
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/mouse-events-have-key-events>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on an intrinsic HTML element (not custom components like <MyElement>) when a hover-in handler with a bound value (default onMouseOver) lacks a matching onFocus, or a hover-out handler (default onMouseOut) lacks a matching onBlur — onFocus={undefined} or onBlur={undefined} also fires, while a bare valueless attribute is skipped. The watched handlers are configurable via the hoverInHandlers/hoverOutHandlers settings. False positive: a spread like <div onMouseOver={fn} {...props} /> can forward onFocus/onBlur at runtime, but the static check can't see inside props and still flags it.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Add the keyboard counterpart on the same element so keyboard and AT users get the same behavior: pair onMouseOver with onFocus and onMouseOut with onBlur, e.g. <div onMouseOver={show} onFocus={show} onMouseOut={hide} onBlur={hide} />. Reuse the same handler when the effect is identical, and remove any onFocus={undefined}/onBlur={undefined} that defeats the pairing. If the matching handler is genuinely injected via spread props, verify it at runtime before suppressing. See https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/mouse-events-have-key-events
