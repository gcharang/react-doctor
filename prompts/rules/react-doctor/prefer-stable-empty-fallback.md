# `react-doctor/prefer-stable-empty-fallback`

Hoist a module-level const EMPTY = [] (or {}) and use it as the || / ?? fallback so the memoised child sees a stable reference

- **Category:** Performance
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a JSXAttribute whose value is a JSXExpressionContainer holding a LogicalExpression with operator || or ??, where the RIGHT side is an empty array literal [] or empty object literal {} (zero elements/properties, parens stripped) and the LEFT side is a stable expression — a bare Identifier, ThisExpression, or non-computed member chain like props.posts or props.data.records — AND the attribute sits on a same-file component the memo registry marks as 'memoised' per memoStatusForJsxOpeningName, i.e. wrapped in any registry-recognized memoising HOC (HOC_NAMES_FOR_MEMOISATION: memo, React.memo, observer, observable, lazy, React.lazy, withTracking), including memo(forwardRef(...)) since detection keys off the OUTERMOST call, AND the JSX is inside a function scope. Excludes intrinsic HTML elements like div, JSX at module level, and JSXEmptyExpression. False positive to suppress: the component is NOT actually memoised (plain arrow component, or forwardRef alone without a memoising wrapper) so the stable-reference concern does not apply; the fallback is non-empty (props.posts || props.fallback); the left side is itself an allocation/call (makeItems() || []) which jsx-no-new-array-as-prop already covers; or the inverted shape [] || value / {} ?? value, which is dead code, not this footgun.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Hoist the empty literal to a module-level constant so its reference is stable across renders: declare const EMPTY_ITEMS = [] (or const EMPTY_CONFIG = {}) at module scope, then replace the inline fallback with it, e.g. posts={props.posts || EMPTY_ITEMS}. Reuse one shared EMPTY constant for every same-shaped fallback. If many props need this, consider also memoising the value with useMemo, but a hoisted constant is sufficient and cheapest for a literal [] / {}.
