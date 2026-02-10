---
type: transcript
id: transcripts/2026-02/2026-02-10-technical-platform-decision-react-native-with-expo.md
title: "Platform Decision — React Native with Expo"
meeting_type: "technical"
meeting_date: "2026-02-10"
participants:
  - "Sara"
  - "Mike"
  - "Alex"
created: "2026-02-10T00:00:00Z"
labels:
  - "transcript"
  - "technical"
  - "2026-02"
---

# Platform Decision — React Native with Expo

**Date:** 2026-02-10
**Type:** Technical
**Participants:** Sara, Mike, Alex

---

## Summary

The team debated React Native vs PWA for the Sleepy Baby app. They decided on React Native with Expo, using the web target for local development to avoid emulator setup. App store distribution will use EAS Build, with iOS testing handled by dedicated testers.

## Key Decisions

1. **React Native with Expo over PWA** — Chose React Native with Expo as the platform, providing both web development convenience and a native app store path.
2. **Web target for local development** — Developers will use Expo's web target for day-to-day work, no emulators or Xcode/Android Studio required.
3. **Cloud builds via EAS** — Store builds will use Expo's EAS Build service; no local native toolchain needed.
4. **Android focus for dev team, iOS handled separately** — Dev team focuses on Android and web. Dedicated people will handle iOS testing and builds.

## Action Items

1. **Verify Expo web target works as described** — Sara mentioned she'd need to verify that Expo lets you run the same React Native codebase in the browser. *Owner: Sara | Due: TBD*

## Open Questions

_No open questions were raised._

## Raw Transcript

Sara: Alright, we need to settle the platform question before we can move forward on the technical spec. The options on the table are React Native or PWA. What are your thoughts?

Mike: My main concern is developer experience. If we go React Native, do we target both Android and iOS? Do I need to run emulators locally? I need Xcode, Android Studio, all of that? Honestly, if React Native is going to be a burden for dev setup, I'd rather start with a PWA — validate the market first and shift to native later.

Sara: That's a fair concern. But what if we use React Native with Expo and just use the web target for local development? I'd need to verify this, but I believe Expo lets you run the same React Native codebase in the browser. If that works, developers wouldn't need emulators at all for day-to-day work. Would that be good enough for everybody?

Mike: Wait, so I'd just run it in the browser like a normal web app? Same hot reload and everything?

Sara: Exactly. Expo supports a web target. You run expo start with the web flag, it opens in your browser. Same codebase, same components, fast iteration. When you need to test on a real phone, you can use the Expo Go app — just scan a QR code, no local build required. And for actual store builds, Expo has a cloud build service called EAS Build. No one needs Xcode on their machine.

Mike: That changes things. So the dev workflow is basically the same as building a web app?

Sara: For the MVP, yes. You write React Native components, but your daily dev loop is entirely browser-based.

Alex: OK this sounds promising. But I need to be clear about one thing — we need this to be in the app stores at some point. That's non-negotiable. I need to promise this to the CEO or the project won't get approved. I hope you understand.

Sara: Absolutely. React Native with Expo gives us that path. The same codebase compiles to native iOS and Android. We just defer setting up those build pipelines until after the core features are working.

Mike: Yeah, that makes sense. I guess we can start like this — build for web in React Native, build the pipelines with that in mind, demo from there, and later start adding Android and iOS testing. We can even learn the mobile-specific parts while we work on the MVP. Developers won't need to test locally on both platforms. Maybe Android is enough for us. Alex mentioned there will be other people handling iOS builds and testing.

Alex: Correct. We'll have dedicated people for iOS testing. The dev team can focus on Android and web.

Sara: So the plan is: React Native with Expo. Web target for local development, no emulators required. Cloud builds via EAS for store distribution when we're ready. Android emulator optional for devs who want it. iOS handled by dedicated testers and CI.

Alex: That works for me. Let's go with it.

Mike: Agreed. Simple setup, app store path covered. Best of both worlds.
