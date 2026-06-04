# `react-doctor/anchor-is-valid`



- **Category:** Accessibility
- **Severity:** warn
- **Source:** oxlint-builtin:jsx-a11y
- **Framework:** global
- **Enabled when:** always (unless customRulesOnly=true)
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/anchor-is-valid>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on <a> elements that are missing href, have an invalid href ('#', 'javascript:void(0)', null, undefined), or are used as buttons (onClick with no real navigation target). False positive: legacy Next.js patterns nesting an href-less <a> inside <Link> — modern next/link no longer needs the inner anchor, so update the Link instead of suppressing.

## Fix prompt

Use this once validation confirms the diagnostic is real.

If the element triggers an action, swap it for <button type='button' onClick={...}> and restyle to look like a link. If it navigates, give href a real URL or path (not '#' or 'javascript:void(0)'). In Next.js App Router, use <Link href='/path'> directly — no inner <a> tag. See https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/anchor-is-valid
