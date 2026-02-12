# ADR-005: Drop a11y ESLint Plugin, Rely on RNTL Query Priority for Accessibility

**Date:** 2026-02-12
**Status:** Accepted

## Context

ADR-003 specified `eslint-plugin-react-native-a11y` for accessibility linting. During SB-000 implementation, the plugin could not be installed — its latest release (3.5.1, Nov 2024) only supports ESLint 3–8, and the project uses ESLint 9 with flat config.

The plugin is effectively unmaintained: Formidable Labs has no active maintainer ([issue #166](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/issues/166)), and a community PR adding ESLint 9 support ([PR #167](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/167)) has been unreviewed for ~9 months. There is no realistic timeline for ESLint 9 compatibility.

## Decision

Drop `eslint-plugin-react-native-a11y` from the linting stack. Rely on RNTL's accessibility-first query priority (ADR-004) as the primary mechanism for enforcing accessible components. All other aspects of ADR-003 remain unchanged — ESLint, Prettier, typescript-eslint, and CI enforcement still apply.

This works because ADR-004's query priority (`getByRole` > `getByLabelText` > ... > `getByTestId`) forces developers to build accessible components: if you can't query an element by role or label, the test itself reveals the accessibility gap. This is a stronger enforcement than lint rules, which can be suppressed with `eslint-disable` comments.

## Alternatives Considered

- **Use `@eslint/compat` to shim the plugin for ESLint 9:** Technically possible, but adds a compatibility layer for an unmaintained plugin. Fragile and not worth the maintenance burden.
- **Pin ESLint to v8 to keep the plugin:** ESLint 8 is EOL (Oct 2024). Pinning to a dead version for one plugin sacrifices security patches and ecosystem compatibility.
- **Wait for the community PR to merge:** No maintainer is reviewing it. Blocking on an unmaintained dependency is not viable.

## Consequences

- Accessibility enforcement shifts entirely to test time (RNTL queries) rather than lint time. This is a later feedback loop but a stronger one — tests verify actual rendered output, not just static code patterns.
- If the plugin ships ESLint 9 support in the future (or a maintained fork appears), it can be added back as a complementary check.
- The Biome alternative noted in ADR-003 becomes slightly more attractive since the a11y plugin was one reason for preferring ESLint's ecosystem.
