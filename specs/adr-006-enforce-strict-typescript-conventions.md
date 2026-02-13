# ADR-006: Enforce Strict TypeScript Conventions

**Date:** 2026-02-13
**Status:** Accepted

## Context

During implementation of baby profile persistence (SB-001), we encountered issues with loose TypeScript patterns: non-null assertions (`!`), implicit `any` through type assertions (`as`), and nullable types leaking through third-party libraries. These patterns hide bugs that only surface at runtime. The project already uses `strict: true` in tsconfig, but this doesn't cover all unsafe patterns.

## Decision

Enforce maximum TypeScript strictness through two layers:

**1. tsconfig — additional compiler options beyond `strict: true`:**
- `noUncheckedIndexedAccess` — array/object index access includes `| undefined`, forcing explicit checks
- `noImplicitReturns` — all code paths must return explicitly
- `noFallthroughCasesInSwitch` — switch cases must break/return
- `exactOptionalPropertyTypes` — distinguishes `undefined` from "missing" in optional properties

**2. ESLint — ban unsafe language features the compiler allows:**
- `@typescript-eslint/no-non-null-assertion` — ban `!` operator; use narrowing or early returns instead
- `@typescript-eslint/no-explicit-any` — ban explicit `any`; use `unknown` and narrow
- `@typescript-eslint/no-unsafe-type-assertion` — ban `as` casts; use type guards or generics

Both layers run in CI (typecheck + lint), so violations block merges.

## Alternatives Considered

- **tsconfig `strict: true` only (current state):** Catches implicit `any` and null issues but allows explicit `any`, `!` assertions, and `as` casts. Rejected because these patterns caused real issues during development.
- **ESLint rules only (no extra tsconfig options):** Would catch the banned patterns but miss compiler-level checks like unchecked index access. Rejected because the compiler catches errors earlier and more reliably than lint rules.

## Consequences

- Forces developers to handle nullability explicitly through narrowing, early returns, or type guards — producing safer code.
- Third-party libraries with loose types (e.g., `DateType = string | number | Date | null | undefined`) require explicit handling at the boundary rather than `as` casts.
- `noUncheckedIndexedAccess` may require extra null checks on array access patterns, adding verbosity but catching real out-of-bounds bugs.
- Existing code must be updated to comply — any current `!` or `as` usage must be refactored before enabling the rules.
