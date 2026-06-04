# `react-doctor/media-has-caption`

Add a `<track kind="captions">` child to every `<audio>` / `<video>`.

- **Category:** Accessibility
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/media-has-caption>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on any `<audio>` or `<video>` element (plus names mapped to them via the jsx-a11y `audio`/`video`/`components` settings) that lacks a direct child `<track>` whose `kind` is a static string literal equal to "captions" (case-insensitive); a `kind="subtitles"` track, a bare `<track>`, or a media element with no children all still fire. Statically truthy `muted` — bare `muted`, `muted={true}`, or `muted="true"` — suppresses it, but `muted={false}` does not. False positive: a `<track kind={captionsKind} />` whose kind comes from a variable or any non-literal expression is invisible to the static check and reported even when it resolves to "captions" at runtime.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Add a captions track as a direct child of the media element: `<video><track kind="captions" src="captions.vtt" srcLang="en" label="English" /></video>`. The `kind` must be a literal string "captions" (subtitles do not satisfy the rule); if the value must be dynamic, the static check can't verify it, so keep a literal `kind="captions"` or guard with a justified eslint-disable on that line. For media that is genuinely silent, mark it `muted` to opt out. See https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/media-has-caption
