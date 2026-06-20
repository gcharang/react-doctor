# `react-doctor/no-jsx-element-type`

Widen the return type from JSX.Element to React.ReactNode: function App(): React.ReactNode

- **Category:** Correctness
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when a function's return-type annotation is exactly the qualified name JSX.Element — a TSTypeReference whose typeName is a TSQualifiedName with left Identifier named JSX and right Identifier named Element — checked on the returnType of FunctionDeclaration, ArrowFunctionExpression, FunctionExpression, ambient declare function (TSDeclareFunction), and TSMethodSignature. It deliberately still fires even when a local namespace JSX shadows the global one. False positive to suppress: any return type that is NOT the bare JSX.Element qualified name — React.JSX.Element (its TSQualifiedName left is itself a qualified name, not the Identifier JSX), React.ReactElement, or React.ReactNode (all valid), no annotation at all, or a non-JSX type like string/void. Also suppress when JSX.Element appears somewhere other than a function return type, e.g. a variable annotation const element: JSX.Element = <div /> — that position is not reported.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Replace the JSX.Element return annotation with React.ReactNode, e.g. function App(): React.ReactNode { ... } or const App = (): React.ReactNode => <div />. JSX.Element is too narrow because it excludes the null, string, number, and fragment values components legitimately return; React.ReactNode covers all of them. If the component truly always returns a single element and you need that guarantee, React.ReactElement is the narrower correct choice — but never JSX.Element. Ensure React (or ReactNode) is imported.
