# `react-doctor/preact-no-react-hooks-import`

Import hooks from `preact/hooks` (or `preact/compat`), not `react`: import { useState } from "preact/hooks"

- **Category:** Preact
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** preact
- **Enabled when:** framework=preact and capabilities=preact
- **Documentation:** <https://preactjs.com/guide/v10/hooks/>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on an ImportDeclaration whose source Literal value is exactly "react" that has one or more named ImportSpecifier identifiers in REACT_HOOK_NAMES (useCallback, useContext, useDebugValue, useDeferredValue, useEffect, useId, useImperativeHandle, useInsertionEffect, useLayoutEffect, useMemo, useReducer, useRef, useState, useSyncExternalStore, useTransition); the default specifier is ignored, so `import React, { useState } from "react"` still fires on useState while `import React from "react"` alone does not. Only one report is emitted per statement, listing every matched hook. False positive: non-hook named imports from react such as `import { Fragment, Children } from "react"` (a VALID fixture with zero diagnostics — the import stays, only hook specifiers are matched) and imports from "preact/hooks" or "preact/compat" (never flagged since the source only matches value === "react"). The engine gates this on pure-preact (Preact present AND no react package); if react IS installed alongside Preact the project is using preact/compat aliasing and importing hooks from "react" is the intended compat usage, so suppress there.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Move the hook names off the `react` import and onto `preact/hooks`, e.g. change `import { useState, useEffect } from "react"` to `import { useState, useEffect } from "preact/hooks"`; if the same statement also pulls non-hook React API, split it so hooks come from preact/hooks (or from "preact/compat" when broader React surface is needed) and leave the rest. This keeps hooks on the same Preact module instance the renderer drives and avoids the "Cannot read properties of undefined (reading '__H')" runtime crash from loading a second hook state copy. See https://preactjs.com/guide/v10/hooks/
