# `react-doctor/img-redundant-alt`

Drop redundant words like 'image' / 'photo' / 'picture' from alt text and describe the content instead.

- **Category:** Accessibility
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/img-redundant-alt>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on an <img> (or a component mapped via the components setting) carrying a STATIC alt whose text contains a whole-word, case-insensitive match of "image", "photo", or "picture" — checked across string literals, {'string'} containers, and each individual template-literal quasi piece. Word boundaries are enforced, so "Photography", "ImageMagick", and "helloImage" do NOT fire, and aria-hidden/screen-reader-hidden images are skipped entirely. False positive: only the static quasi text of a template is scanned, so interpolated values like alt={`a ${photo}`} never fire even when the variable is literally named photo — and a dynamic alt={altVar} is invisible to the check, so a confirmed redundant word must come from author-written static text.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Rewrite the alt to describe what the image conveys, dropping the redundant noun a screen reader already announces — e.g. alt="Photo of a friend" becomes alt="A friend smiling at the beach". If the image is purely decorative use alt="" (or aria-hidden), and if it is genuinely redundant context, remove the offending word rather than the whole description. See https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/img-redundant-alt
