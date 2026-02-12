# ADR-004: Use Jest and React Native Testing Library with Integration-First Testing Strategy

**Date:** 2026-02-11
**Status:** Accepted

## Context

The Sleepy Baby project needs a testing strategy and tooling before feature development begins. SB-000 (Steel Thread) requires tests to run in the CI pipeline before deployment. The team wants tests that give confidence in user-facing behavior rather than testing implementation details, and wants accessibility built into the testing workflow from the start.

## Decision

Use Jest as the test runner and React Native Testing Library (RNTL) for component tests, following Kent C. Dodds' integration testing philosophy: test components the way users interact with them, mock only external services, and use accessibility-first query selectors.

Key aspects:
- **Jest with jest-expo preset** — Handles all React Native/Expo transform configuration out of the box.
- **React Native Testing Library** — Renders components and provides user-centric queries.
- **Integration tests as the primary test type** — Test realistic user flows through composed components, not isolated units. "The more your tests resemble the way your software is used, the more confidence they can give you."
- **Mock boundary: external services only** — Mock APIs, device sensors, async storage, and other external dependencies. Never mock internal modules or component internals.
- **[Query priority](https://testing-library.com/docs/queries/about/#priority) (accessibility-first):**
  1. `getByRole` — Top preference. Queries the accessibility tree. Use with `name` option.
  2. `getByLabelText` — Best for form fields. Users find form elements by their labels.
  3. `getByPlaceholderText` — Fallback when labels aren't available (placeholder is not a substitute for a label).
  4. `getByText` — For non-interactive elements where text content is how users find them.
  5. `getByDisplayValue` — For form elements with current filled-in values.
  6. `getByAltText` — For elements with alt text (images).
  7. `getByTitle` — Less reliable, not consistently read by screenreaders.
  8. `getByTestId` — Last resort. The user cannot see or hear test IDs. Use only when no semantic query works.
- **No testing implementation details** — Don't assert on component state, internal method calls, or render counts.

## Alternatives Considered

- **Jest only (no RNTL):** Simpler setup — just unit tests for business logic, defer component testing. Rejected because the team wants to test user behavior from day one, and adding RNTL later means retrofitting tests and potentially building components without accessibility in mind.
- **Vitest + RNTL:** Vitest is faster (ESM-native, HMR-based watch mode) and has minimal config for web projects. Rejected because there is no official Expo preset for Vitest — React Native's Metro bundler transforms require manual configuration that jest-expo handles automatically. Not worth the integration risk for an MVP.

## Consequences

- Tests describe user behavior, making them resilient to refactors — changing component internals doesn't break tests.
- Accessibility-first queries force the team to build accessible components by default. If you can't query an element by role or label, the component has an accessibility gap.
- jest-expo preset eliminates React Native transform configuration — zero setup friction.
- Mocking only external services keeps tests realistic and catches integration bugs between internal modules.
- Integration tests are slower than pure unit tests but catch more real bugs and give higher confidence per test.
- The query priority list serves as a team reference for code review — reviewers can flag test ID usage when a semantic query would work.
