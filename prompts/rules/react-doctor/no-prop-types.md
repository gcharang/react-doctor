# `react-doctor/no-prop-types`

Move propTypes to TypeScript types: `type Props = { value: number }; function Component(props: Props)` — React 19 ignores runtime propTypes

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://react.dev/blog/2024/12/05/react-19#removed-proptypes-and-defaultprops>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on two idioms whose receiver is a Capitalized identifier/class name: (1) an AssignmentExpression with operator '=' whose left is a MemberExpression with a 'propTypes' property (Identifier key, or computed Literal 'propTypes') on an Identifier object that passes the uppercase-name test, e.g. Component.propTypes = { value: PropTypes.number }; and (2) a static PropertyDefinition keyed 'propTypes' inside a ClassBody whose class (ClassDeclaration/ClassExpression id, or the VariableDeclarator id binding a ClassExpression) is uppercase-named, e.g. class Component { static propTypes = {...} }. The uppercase-receiver heuristic deliberately excludes lowercase objects, so config.propTypes = {...} or options.propTypes is never flagged — suppress those as well as any non-component object that happens to expose a propTypes field. The rule is version-gated upstream in the oxlint plugin source (requires react:19), so a flagged finding is already on a React 19+ project; still suppress if you can establish the code is genuinely pre-React-19, where propTypes still runs.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Delete the propTypes object (and the prop-types import) and describe the contract with a TypeScript prop type instead: type ComponentProps = { value: number; onChange: (v: number) => void }, then annotate the component as function Component(props: ComponentProps) or class Component extends React.Component<ComponentProps>. propTypes also validated values at runtime — React 19 no longer does — so for props carrying genuinely untrusted external data, add an explicit runtime check or schema parse (e.g. zod) in the component body rather than relying on the removed propTypes mechanism. See https://react.dev/blog/2024/12/05/react-19#removed-proptypes-and-defaultprops
