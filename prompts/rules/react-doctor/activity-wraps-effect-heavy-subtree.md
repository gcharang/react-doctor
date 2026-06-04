# `react-doctor/activity-wraps-effect-heavy-subtree`

Audit the `<Activity>` subtree: every hide/show cycle tears down and recreates every `useEffect`/`useLayoutEffect` inside, so move subscriptions and effect-driven setState chains outside the boundary or pre-resolve the data above it.

- **Category:** State & Effects
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://react.dev/reference/react/Activity>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires only on React 19.2+ when a JSX element resolving to React's `Activity`/`unstable_Activity` (named import, alias like `unstable_Activity as UA`, or `<React.Activity>` where the namespace object is React's default import or `* as React` binding) has a `mode` prop whose value is a NON-static, toggleable expression such as `mode={open ? "visible" : "hidden"}`, AND it wraps at least one capitalized same-file child component (collected from JSXOpeningElement JSXIdentifier names, excluding the locally-bound Activity name) whose function body contains one or more `useEffect`/`useLayoutEffect` calls. False positive — suppress when: (1) `mode` is a static literal (`mode="hidden"`, `mode="visible"`, `mode={"hidden"}`) or absent (default visible), since a pinned boundary has no hide/show cycle; (2) the wrapped child is a member-expression tag like `<Charts.Bar />`, which is skipped during child collection (the trailing identifier is never looked up) even when a same-file `Bar` helper with effects exists, because such children resolve through an external namespace; (3) the boundary element ITSELF is a member-expression like `<Calendar.Activity>` whose namespace object (`import * as Calendar from "./calendar"`) is not React's default/`* as React` binding — the detector rejects it at boundary detection so it never fires even though its same-file `<Entry />` child is effectful; (4) the wrapped component is imported from another module (v1 is same-file only); (5) the children have no effect hooks; or (6) the tag is a user component named `Activity` imported from a non-react module. Toggling the effects intentionally on hide/show (a subscription that genuinely should pause while hidden) is benign-by-design and should be suppressed.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Decide whether the inner Effects belong inside the Activity boundary at all: a toggleable `<Activity mode={open ? "visible" : "hidden"}>` tears down and recreates every wrapped `useEffect`/`useLayoutEffect` on each hide/show, causing a remount storm on dense screens. Lift subscriptions, observers, and effect-driven setState chains into a parent that stays mounted across the toggle, or pre-resolve the data above the boundary and pass it down as props so the hidden subtree holds state without re-running effects; reserve effects that truly must restart on show inside the boundary. Alternatively pin the mode statically if the subtree never actually toggles. See https://react.dev/reference/react/Activity
