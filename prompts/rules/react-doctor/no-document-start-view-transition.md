# `react-doctor/no-document-start-view-transition`

Render a <ViewTransition> component and update inside startTransition / useDeferredValue — React calls startViewTransition for you

- **Category:** Correctness
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Confirm a direct document.startViewTransition(...) MemberExpression call. False positive: imperative callers outside React (a vanilla DOM helper, a non-React micro-frontend, or a script tag) where the <ViewTransition> component is not in scope and React is not orchestrating the update.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Wrap the DOM-mutating state update in startTransition (or useDeferredValue / Suspense) and render a <ViewTransition> boundary around the affected subtree — React's integration calls document.startViewTransition for you and assigns matching viewTransitionName values, so manual calls fight the auto-generated names. See https://react.dev/reference/react/ViewTransition
