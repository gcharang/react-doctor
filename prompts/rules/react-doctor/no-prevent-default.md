# `react-doctor/no-prevent-default`

Use `<form action={serverAction}>` (works without JS) or `<button>` instead of `<a>` with preventDefault

- **Category:** Correctness
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Rule fires on <form onSubmit={handler}> or <a onClick={handler}> whose handler is an inline arrow or function expression containing any .preventDefault() call. <button> is intentionally exempt because <button type='submit'> has a legitimate default action. False positive: a custom Link component that renders as <a> and intercepts navigation for a router the AST cannot see.

## Fix prompt

Use this once validation confirms the diagnostic is real.

For forms, replace the JS handler with a Server Action via <form action={serverAction}> so submission works without JavaScript and gets progressive enhancement for free. For anchors, use a <button> when triggering an action or the router's <Link> when navigating — never <a href='#'> with preventDefault(). See https://react.dev/reference/react-dom/components/form
