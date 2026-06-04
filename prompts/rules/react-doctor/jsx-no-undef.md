# `react-doctor/jsx-no-undef`

Import the component or fix the typo so the JSX element name resolves to a real binding.

- **Category:** Correctness
- **Severity:** error
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-undef>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a JSX opening element whose name resolves to an identifier with no binding in scope: a capitalized plain tag (<App />, <Foo />), or the ROOT object of a member expression regardless of case (<App.Foo />, <appp.foo.Bar /> both fire when the root is unbound). Lowercase intrinsic tags (<img />, <x-gif />), namespaced names (<Foo:Bar />), and the known globals globalThis/window/document/console/React/self/this are skipped. False positive: scope resolution is best-effort — shadowing and same-name imports from multiple modules are approximated, so a name bound somewhere reachable may be accepted even when the chosen binding is wrong; confirm the intended import or declaration actually exists before treating a report as a genuine typo.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Import the missing component or fix the typo so the element name resolves: add the import (import App from './App') or correct the spelling (<Appp /> -> <App />). For member expressions, ensure the root object is in scope — import the namespace, e.g. import * as Icons from './icons' for <Icons.Star />. If you actually meant an intrinsic/custom HTML element, lowercase the tag name so it is treated as an intrinsic tag rather than a (capitalized) component reference. See https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-undef
