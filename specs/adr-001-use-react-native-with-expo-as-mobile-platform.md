# ADR-001: Use React Native with Expo as Mobile Platform

**Date:** 2026-02-10
**Status:** Accepted

## Context

The Sleepy Baby team needed to choose a platform for the mobile app. The key tension was between developer experience (simple setup, no emulators, fast iteration) and the non-negotiable requirement for app store distribution. The two options considered were React Native with Expo and a Progressive Web App (PWA).

## Decision

Use React Native with Expo, because it provides a web-based local development workflow (no emulators or native toolchains required) while maintaining a clear path to native iOS and Android app store distribution via EAS Build.

Key aspects of the decision:
- **Web target for local development** — Developers use Expo's web target for day-to-day work, iterating in the browser with hot reload.
- **Cloud builds via EAS** — Store builds use Expo's EAS Build service; no local Xcode or Android Studio required.
- **Android focus for dev team** — Developers focus on Android and web. Dedicated testers handle iOS builds and testing.

## Alternatives Considered

- **PWA:** Rejected because it lacks a direct native app store distribution path. App store presence was a non-negotiable business requirement. PWA was considered as a validate-first-then-migrate approach, but React Native with Expo's web target offered the same developer convenience without needing a later platform migration.

## Consequences

- Developers get a web-like development workflow with minimal setup friction.
- The same codebase compiles to native iOS and Android, avoiding a future rewrite.
- The team depends on Expo and EAS Build as key infrastructure — vendor lock-in to the Expo ecosystem.
- iOS-specific issues may surface late since the dev team won't test on iOS day-to-day.
