# `react-doctor/rn-no-deep-imports`

> Auto-generated from the rule's metadata — no standalone fix recipe is published for this rule. The guidance below comes from the rule definition in this fork.

- **Title:** Deep import into react-native internals
- **Severity:** warn
- **Category:** Bugs
- **Framework:** react-native

## Recommendation

Import the symbol from `react-native` (the package root) instead of the deprecated `react-native/Libraries/...` subpath, which RFC 0894 removes on upgrade.
