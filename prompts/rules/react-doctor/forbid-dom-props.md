# `react-doctor/forbid-dom-props`

Configure forbidden DOM props via the `forbidDomProps.forbid` setting to keep disallowed attributes off DOM nodes.

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** off by default (opt-in)
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/forbid-dom-props>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires only when a prop is configured in the `forbidDomProps.forbid` setting AND that prop name appears as a JSX attribute on a lowercase DOM tag (e.g. <div id> when `id` is forbidden); a per-prop `disallowedFor` list narrows it to specific tags (e.g. `accept` only on <form>). PascalCase components (<Foo>, <this.Foo>), namespaced tags (<fbt:param>), and props delivered only via spread (<div {...props} />) are never flagged. False positive: a forbidden prop that is intentionally required on one element — confirm the team's convention actually forbids it there rather than suppressing blindly, since this rule is purely a project-defined policy with no inherent correctness signal.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Remove or rename the forbidden attribute to the project-sanctioned alternative the policy intends — for example swap a banned `className` for the team's preferred prop, or drop `accept` from <form> and place it on the <input> instead (<input type="file" accept="video/*" />). If the prop genuinely belongs there, either narrow the rule's `disallowedFor` list to exclude that tag or add a justified disable comment on that line. See https://oxc.rs/docs/guide/usage/linter/rules/react/forbid-dom-props
