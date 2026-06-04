# `react-doctor/jsx-pascal-case`

Rename custom JSX components to PascalCase.

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-pascal-case>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a JSX element whose name starts with an uppercase letter but whose name (or any dotted/namespaced segment of it) isn't PascalCase — first char uppercase plus at least one later lowercase letter or digit — e.g. <Test_component />, <YMCA />, <Styled.h1 />. Lowercase-first names are treated as HTML tags and skipped, single-char segments are skipped, and a leading underscore is stripped before the check (allowLeadingUnderscore defaults to true here, unlike upstream OXC). False positive / non-trigger to watch: a member expression whose ROOT segment is lowercase (<qualification.BadName /> or <styled.button />) is skipped entirely, so later non-PascalCase segments go unreported — and with allowNamespace on, only the first segment is validated, letting <Foo.Bad_Name /> slip through.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Rename the component (and each dotted segment) to PascalCase: <Test_component /> becomes <TestComponent />, <Styled.h1 /> becomes <Styled.H1 />. If the all-caps name is an intentional acronym component (e.g. <YMCA />), either rename it (<Ymca />) or opt in via the allowAllCaps setting; for known import-alias wrappers add the exact name to the rule's ignore glob list rather than editing call sites. Leading-underscore aliases like <_ContextMenu /> are already allowed by default. See https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-pascal-case
