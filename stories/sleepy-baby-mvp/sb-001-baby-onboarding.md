# Baby Onboarding

## Description
As a parent, I want to set up my baby's profile with date of birth, so the app can calculate age-appropriate sleep windows. This is the entry point — minimal onboarding with only the essentials.

## Acceptance Criteria
- Parent is prompted for baby's date of birth on first launch
- App calculates baby's current age in months from DOB
- Baby profile persists across app restarts
- Only DOB is required — no other setup steps
- Parent can edit baby's DOB after initial setup

## Technical Notes
- Sleep window reference data embedded in app (see spec table: age brackets 0–1mo through 18–24mo)
- React Native with Expo (ADR-001)
- Local storage for baby profile persistence
## Mockups
- [Onboarding](../../mockups/onboarding.html)

## Dependencies
None — start here.

## Reference
- Specification: specs/sleepy-baby-mvp.md
