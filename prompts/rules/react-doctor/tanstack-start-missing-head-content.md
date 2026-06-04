# `react-doctor/tanstack-start-missing-head-content`

Add `<HeadContent />` inside `<head>` in your __root route — without it, route `head()` meta tags are silently dropped

- **Category:** TanStack Start
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** tanstack-start
- **Enabled when:** framework=tanstack-start and capabilities=tanstack-start

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires only in files matching __root.(ts|tsx|js|jsx) that contain no JSX element whose tag name is HeadContent. The check is local to the file — the rule does not follow imports. False positive: HeadContent is rendered indirectly through an imported layout component the rule cannot inspect.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Import HeadContent from @tanstack/react-router and render <HeadContent /> inside the <head> of the root component's HTML shell. Without it, meta tags returned from each route's head() function are silently dropped, including title, description, OG tags, and link/script entries. See https://tanstack.com/start/latest/docs/framework/react/api/router/HeadContentComponent
