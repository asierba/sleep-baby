# ADR-003: Use ESLint and Prettier for Code Linting and Formatting

**Date:** 2026-02-11
**Status:** Accepted

## Context

The Sleepy Baby project needs code quality and formatting tooling before feature development begins. SB-000 (Steel Thread) requires linting to run in the CI pipeline before deployment. The team needs consistent code style enforcement across contributors without manual style debates.

## Decision

Use ESLint for code quality rules and Prettier for code formatting, with typescript-eslint for TypeScript support (TypeScript adopted as the project language). ESLint catches bugs and enforces code quality patterns; Prettier handles all formatting decisions automatically.

Key aspects:
- **ESLint** — Code quality rules (unused variables, import errors, React hooks rules, accessibility checks via eslint-plugin-react-native-a11y).
- **Prettier** — Opinionated formatter for all code style decisions (indentation, quotes, semicolons). Ends formatting debates.
- **typescript-eslint** — Type-aware linting rules that leverage TypeScript's type system.
- **CI enforcement** — Both tools run in the GitHub Actions pipeline before deployment.

## Alternatives Considered

- **Biome:** Single tool replacing both ESLint and Prettier. Significantly faster execution. Rejected because React Native ecosystem support is still maturing — fewer plugins, less community documentation, and no equivalent to eslint-plugin-react-native-a11y. Easy to revisit as Biome's RN support grows.
- **ESLint only (no Prettier):** Simpler single-tool setup. Rejected because ESLint's formatting rules are deprecated in favor of dedicated formatters, and without Prettier the team would still have formatting inconsistencies and debates.

## Consequences

- Two tools to configure and maintain, but both are industry standard with extensive React Native/Expo documentation.
- Prettier eliminates all formatting discussions — code style is automated.
- typescript-eslint provides type-aware linting that catches bugs TypeScript alone misses.
- Accessibility linting (a11y plugin) aligns with the testing strategy's accessibility-first approach (ADR-004).
- New contributors get instant feedback on code quality and style via editor integration and CI.
