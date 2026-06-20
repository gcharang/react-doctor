# `react-doctor/no-img-lazy-with-high-fetchpriority`

> Auto-generated from the rule's metadata — no standalone fix recipe is published for this rule. The guidance below comes from the rule definition in this fork.

- **Title:** Lazy image with high fetchPriority
- **Severity:** warn
- **Category:** Performance
- **Framework:** global

## Recommendation

Don't combine `loading="lazy"` with `fetchPriority="high"`. A high-priority image (usually the LCP) should load eagerly; a lazy image is by definition not high priority.
