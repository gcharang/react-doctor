# `react-doctor/jotai-tq-use-raw-query-atom`

Derive the field once, then subscribe to the derived atom: const dataAtom = atom((get) => get(queryAtom).data)

- **Category:** State & Effects
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires when useAtomValue(x) or useAtom(x) is called with an Identifier x that the rule has resolved to a jotai-tanstack-query query atom — either a file-local binding initialized from atomWithQuery, atomWithSuspenseQuery, atomWithInfiniteQuery, or atomWithSuspenseInfiniteQuery imported from "jotai-tanstack-query" (alias-tracked via the import's local name), or a binding imported from a non-jotai/non-react module whose name matches /(SuspenseInfiniteQuery|SuspenseQuery|InfiniteQuery|Query)Atom$/. False positives to suppress: it does NOT fire on useSetAtom (write-only, no value subscription), on atomWithMutation atoms (the result is the imperative trigger, not an observer envelope), on a derived atom like atom((get) => get(queryAtom).data) — which is exactly the fix and is correct to consume directly — on plain jotai atom(0) values, on atomWithQuery imported from a local path like "./my-atoms" rather than the real package, or on a non-identifier argument like useAtomValue(makeAtom()). A cross-file binding named *QueryAtom that is NOT actually a jotai-tq atom (a naming clash) is also a false positive worth suppressing.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Do not subscribe to the raw query atom; TanStack rebuilds the QueryObserverResult envelope on every observer notify (refetch, focus, no-op cache hit), so every direct consumer re-renders even when its field did not change. Instead derive the specific field once into its own atom and subscribe to that: const dataAtom = atom((get) => get(userQueryAtom).data); const data = useAtomValue(dataAtom). Create a separate derived atom per field you read (data, isPending, error) so each consumer only re-renders when its field changes.
