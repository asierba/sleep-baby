# ADR-001: Use React Native with Expo over PWA for mobile platform

**Date:** 2026-02-10
**Status:** Accepted
**Decision-makers:** Sara, Mike, Alex
**Consulted:** _None identified_
**Informed:** _To be defined - not yet discussed_

---

## Context and Problem Statement

The Sleepy Baby team needed to decide on the application platform before proceeding with the technical specification. The two options under consideration were React Native (with Expo) and a Progressive Web App (PWA). The primary tension was between developer experience (simple setup, fast iteration) and the requirement for app store distribution. Discussion source: [Platform Decision transcript](../transcripts/2026-02/2026-02-10-technical-platform-decision-react-native-with-expo.md).

## Decision Drivers

* Developer experience — minimal local toolchain, no emulators or Xcode/Android Studio required for daily work
* App store distribution — non-negotiable requirement for CEO/project approval
* Fast iteration during MVP — browser-based development loop preferred
* Team capacity — dedicated iOS testers available, dev team focuses on Android and web

## Considered Options

* React Native with Expo (web target for development, EAS Build for distribution)
* Progressive Web App (PWA) — validate market first, shift to native later

## Decision Outcome

Chosen option: "React Native with Expo", because it provides a web-like development experience via the Expo web target while preserving a native app store distribution path through EAS Build. This satisfies both the developer experience concern and the app store requirement without compromising either.

### Consequences

* Good, because developers get a browser-based dev loop (expo start --web) with hot reload — same as building a web app
* Good, because app store path is preserved — same codebase compiles to native iOS and Android
* Good, because no local native toolchain required — cloud builds via EAS Build handle store distribution
* Good, because Expo Go app enables on-device testing via QR code without local builds
* Neutral, because iOS testing is deferred to dedicated testers rather than the dev team
* Neutral, because native build pipelines are deferred until after core features are working
* Bad, because [ASSUMPTION: Expo web target works as described for the full React Native codebase — Sara to verify]

### Confirmation

* Sara verifies that Expo web target runs the same React Native codebase in the browser with full hot reload
* Dev team successfully runs `expo start --web` and iterates on components in the browser
* EAS Build produces a working store build from the same codebase

## Pros and Cons of the Options

### React Native with Expo

Uses Expo framework on top of React Native. Web target for local development, Expo Go for on-device preview, EAS Build for store builds.

* Good, because browser-based dev loop requires zero native toolchain setup
* Good, because single codebase targets web, Android, and iOS
* Good, because EAS Build handles native compilation in the cloud
* Good, because Expo Go enables quick on-device testing via QR code
* Neutral, because developers can optionally set up Android emulator if desired
* Bad, because depends on Expo ecosystem and EAS Build service availability
* Bad, because [ASSUMPTION: all React Native components render correctly on web target — needs verification]

### Progressive Web App (PWA)

Build as a standard web application first, validate the market, then potentially shift to native later.

* Good, because simplest possible developer setup — standard web technologies
* Good, because fastest path to market validation
* Good, because no dependency on Expo or React Native ecosystem
* Bad, because no app store presence — non-negotiable requirement for project approval
* Bad, because would require a full rewrite or significant migration to go native later
* Bad, because lacks access to native device APIs that may be needed

## More Information

The team unanimously agreed on this decision. Mike's initial preference for PWA was resolved when Sara explained the Expo web target workflow, which provides equivalent developer experience while keeping the app store path open. Alex confirmed dedicated iOS testing resources are available, allowing the dev team to focus on Android and web during MVP development.
