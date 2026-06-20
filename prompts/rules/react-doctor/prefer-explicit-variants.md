# `react-doctor/prefer-explicit-variants`

Split into explicit variant components: render `<ThreadComposer />` and `<EditMessageComposer />` instead of one component switching subtrees on boolean props.

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires only on a component (a FunctionDeclaration passing isComponentDeclaration, or an arrow/function-expression VariableDeclarator passing isComponentAssignment) whose first param is an ObjectPattern destructuring 2 or more boolean-prefixed props (isBooleanPrefixedPropName, pattern /^(?:is|has|should|can|show|hide|enable|disable|with)[A-Z]/ — so hasIcon, showHeader, canEdit, shouldRender, withBorder qualify too, not just is*) — BOOLEAN_PROP_VARIANT_BRANCH_THRESHOLD is 2 — where 2 or more of those distinct props each drive a ConditionalExpression whose test is the bare binding or its `!` negation and whose BOTH arms (after stripping Prettier parens) are JSX elements or fragments; renamed (`isThread: showThread`) and defaulted (`isPrimary = false`) bindings are followed. SUPPRESS if any of: only one such prop switches subtrees while the rest are non-JSX value picks (`isThread ? \"Thread\" : \"Channel\"`) or visibility toggles with a null arm (`isThread ? <ThreadHeader /> : null`) — the both-arms-must-be-JSX gate rejects these; the booleans are cross-cutting state/responsive/auth names in the curated CROSS_CUTTING_STATE_BOOLEAN_NAMES set (isLoading, isError, isOpen, isMobile, isAuthenticated, isDark, etc.), which are intentionally ignored as ordinary conditional UI; the conditions are useState/local booleans or non-boolean-prefixed props (status, mode) rather than destructured props; or the ternaries live inside a nested render-prop/handler/inner-component function, which the walker prunes since they don't select THIS component's output. Real residual FP from the name-only heuristic: detection sees no TS types at this AST layer, so a prop whose name merely matches a boolean prefix but is not actually a mutually-exclusive variant flag (e.g. a `showCount`/`hasItems`-style prop driving two genuinely orthogonal, independently-composable JSX slots) can match even though splitting into separate components would not improve it.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Extract each boolean-driven branch into its own named variant component and let the caller pick, instead of one component multiplying variants internally: replace `function Composer({ isThread, isEditing }) { return <div>{isThread ? <ThreadHeader/> : <ChannelHeader/>}{isEditing ? <EditActions/> : <DefaultActions/>}</div> }` with distinct components such as `ThreadComposer` and `EditMessageComposer` (or `ChannelComposer`), each rendering one clear path with no boolean switching, and have the parent render the right variant directly. If the two booleans are truly orthogonal, hoist the smaller switch up to where the parent already knows which mode it is in so the leaf renders unconditionally.
