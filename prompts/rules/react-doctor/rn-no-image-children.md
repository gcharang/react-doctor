# `react-doctor/rn-no-image-children`

> Auto-generated from the rule's metadata — no standalone fix recipe is published for this rule. The guidance below comes from the rule definition in this fork.

- **Title:** Children inside react-native <Image>
- **Severity:** error
- **Category:** Bugs
- **Framework:** react-native

## Recommendation

React Native's `<Image>` can't render children. Use `<ImageBackground>` (same `source`/`style` props) to layer content over an image.
