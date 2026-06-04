# `react-doctor/no-react-dom-deprecated-apis`

Switch the legacy `react-dom` root API (`render` / `hydrate` / `unmountComponentAtNode`) to `createRoot` / `hydrateRoot` / `root.unmount()` from `react-dom/client`. Replace `findDOMNode` with a ref. The whole `react-dom/test-utils` entry point is removed in React 19 — use `act` from `react` and `fireEvent` / `render` from `@testing-library/react`. Only enabled on projects detected as React 18+.

- **Category:** Architecture
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on named imports of render / hydrate / unmountComponentAtNode / findDOMNode from react-dom, on member access through a react-dom namespace or default import (ReactDOM.render), and on every import from react-dom/test-utils (the whole entry point is removed in React 19). Only enabled on detected React 18+ projects. Verify the import truly resolves to the react-dom package and not a local mock or shim.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Switch root creation to createRoot(container).render(<App />) from react-dom/client; use hydrateRoot(container, <App />) for SSR; keep the root reference and call root.unmount() instead of unmountComponentAtNode. Replace findDOMNode by accepting a ref and reading ref.current. Replace react-dom/test-utils with act from react and render / fireEvent from @testing-library/react. See https://react.dev/blog/2022/03/08/react-18-upgrade-guide#updates-to-client-rendering-apis
