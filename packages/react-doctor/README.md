<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/react-doctor-readme-logo-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="./assets/react-doctor-readme-logo-light.svg">
  <img alt="React Doctor" src="./assets/react-doctor-readme-logo-light.svg" width="134" height="36">
</picture>

[![version](https://img.shields.io/npm/v/react-doctor?style=flat&colorA=000000&colorB=000000)](https://npmjs.com/package/react-doctor)
[![downloads](https://img.shields.io/npm/dt/react-doctor.svg?style=flat&colorA=000000&colorB=000000)](https://npmjs.com/package/react-doctor)

Your agent writes bad React, this catches it.

React Doctor deterministically scans your codebase and finds issues across state & effects, performance, architecture, security, and accessibility.

Works for all React frameworks and libraries - Next.js, Vite, TanStack, React Native, Expo, you name it.

[Source & rule recipes →](https://github.com/gcharang/react-doctor)

> **This is a hardened fork.** It runs from the pinned source in this branch instead of the npm-published package, and every doc/recipe link, agent playbook, score, and telemetry path is served from (or computed inside) this repo rather than the react.doctor website — see the `pinned` branch. `main` tracks upstream.

## Install

### 1. Quick start

Run this at your project root to get an audit.

```bash
npx github:gcharang/react-doctor#pinned
```

https://github.com/user-attachments/assets/07cc88d9-9589-44c3-aa73-5d603cb1c570

### 2. Install for agents

Once you have an audit, you can install the skill for your coding agent to learn from the issues and fix them in the future.

```bash
npx github:gcharang/react-doctor#pinned install
```

Works with Claude Code, Cursor, Codex, OpenCode, and many more.

### 3. Run in CI (GitHub Actions) for your team

[![GitHub Action](https://img.shields.io/badge/GitHub%20Action-React%20Doctor-000000?style=flat&labelColor=000000&logo=githubactions&logoColor=white)](https://github.com/marketplace/actions/react-doctor)

Add the reusable GitHub Action from Marketplace to scan every pull request, show inline annotations, and leave findings where reviewers already look.

```yaml
name: React Doctor

on:
  pull_request:
    types: [opened, synchronize, reopened, ready_for_review]

permissions:
  contents: read
  pull-requests: write
  issues: write

concurrency:
  group: react-doctor-${{ github.event.pull_request.number || github.ref }}
  cancel-in-progress: true

jobs:
  react-doctor:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: gcharang/react-doctor@pinned
```

`@pinned` tracks this fork's hardened branch (the Action defaults to running `github:gcharang/react-doctor#pinned`). For maximum immutability, pin to a full commit SHA on `pinned` instead:

```yaml
- uses: gcharang/react-doctor@<commit-sha-on-pinned>
```

### 4. Configure rules in `doctor.config.ts`

Configure with a `doctor.config.ts` (or `.js`, `.mjs`, `.cjs`, `.json`, `.jsonc`) in your project root.

```ts
// doctor.config.ts
import type { ReactDoctorConfig } from "react-doctor/api";

export default {
  lint: true,
  rules: {
    "react-doctor/no-array-index-as-key": "off",
  },
} satisfies ReactDoctorConfig;
```

Prefer JSON? Use `doctor.config.json`:

```jsonc
{
  "$schema": "https://raw.githubusercontent.com/gcharang/react-doctor/pinned/packages/website/public/schema/config.json",
  "lint": true,
}
```

## Telemetry

Disabled on this fork. The upstream CLI reports crashes and anonymous usage counters to Sentry; the `pinned` branch blanks the Sentry DSN, so nothing leaves your machine. Scoring is also computed locally (no diagnostics are sent anywhere). To opt back in to your _own_ Sentry project, set the `SENTRY_DSN` env var.

## Contributing

[Issues welcome!](https://github.com/gcharang/react-doctor/issues)

MIT-licensed
