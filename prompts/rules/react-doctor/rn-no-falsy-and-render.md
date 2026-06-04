# `react-doctor/rn-no-falsy-and-render`

Guard numeric-looking conditions: {count > 0 && <X/>}, {Boolean(count) && <X/>}, or {count ? <X/> : null}

- **Category:** React Native
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** react-native
- **Enabled when:** framework=react-native and capabilities=react-native
- **Documentation:** <https://react.dev/learn/conditional-rendering#logical-and-operator->

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a LogicalExpression with operator '&&' whose right side is a JSXElement or JSXFragment, whose parent is a JSXExpressionContainer (or another '&&' LogicalExpression), and whose left side isLikelyNumericExpression: a `.length` MemberExpression, an Identifier whose name passes isNumericName (exact word from count/length/total/size/num/index/amount/quantity/offset/width/height/duration/progress/score/rank/level/step/max/min/sum/avg/depth/balance/age/weight/volume/distance/speed/rate/ratio/percent/percentage, a camelCase suffix like itemCount/pageSize, or a _suffix like item_count), or a MemberExpression whose property name passes isNumericName (e.g. data.totalCount). The concern is that when the left value is 0, `{0 && <X/>}` renders the bare number 0, which crashes outside <Text> on React Native. False positive: it must NOT flag boolean/string/object-named lefts (isVisible, enabled, title, user), names that begin with a boolean prefix is/has/can/should/did/will/show/hide/enable/disable followed by an uppercase letter even if numeric-sounding (isPage, hasCount, showTotal are deliberately excluded), an already-guarded comparison `count > 0 &&`, a ternary `count ? <X/> : null`, a right side that is not JSX (`{count && \"text\"}`), an `&&` not inside JSX, or any expression in a `\"use dom\"` directive file (those render as real DOM, not RN). The detector does NO value/type/flow analysis — it matches names and `.length` shape only.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Stop the numeric left operand from leaking a raw 0 into the render: convert the condition to an explicit boolean. Use a comparison like `{count > 0 && <X/>}` or `{items.length > 0 && <X/>}`, wrap it as `{Boolean(count) && <X/>}`, or switch to a ternary `{count ? <X/> : null}`. Prefer the comparison when you know the numeric semantics, since it reads clearest. Do not leave a bare numeric expression on the left of `&&` in JSX. See https://react.dev/learn/conditional-rendering#logical-and-operator-
