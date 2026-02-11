# Baby Onboarding

## Description
As a parent, I want to set up my baby's profile with name and date of birth, so the app can calculate age-appropriate sleep windows. This is the entry point — minimal onboarding with only the essentials.

## Acceptance Criteria
- Parent is prompted for baby name and date of birth on first launch
- App calculates baby's current age in months from DOB
- App selects the correct sleep window parameters (wake window, naps/day, nap length, bedtime range) based on age bracket
- Baby profile persists across app restarts
- Only name and DOB are required — no other setup steps
- Parent can edit baby name and DOB after initial setup

## Technical Notes
- Sleep window reference data embedded in app (see spec table: age brackets 0–1mo through 18–24mo)
- React Native with Expo (ADR-001)
- Local storage for baby profile persistence

## Size
Small (1–3 days) — 6 ACs

## Dependencies
None — start here.

## Reference
- Specification: specs/sleepy-baby-mvp.md
