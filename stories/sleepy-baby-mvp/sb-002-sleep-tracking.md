# Sleep Tracking

## Description
As a parent, I want to tap a single button to record when my baby falls asleep and wakes up, so I can easily track sleep with one hand while holding the baby.

## Acceptance Criteria
- Main screen shows a large, prominent start/stop button usable one-handed
- Tapping the button when baby is awake starts a sleep session and records fall-asleep time
- Tapping the button when baby is sleeping ends the session and records wake-up time
- Current baby state (awake or sleeping) is clearly displayed on the main screen
- Elapsed sleep duration is shown while baby is sleeping
- Sleep sessions persist across app restarts
- Session data includes start time, end time, and calculated duration

## Technical Notes
- Large tap targets per competitive analysis (all top apps use one-touch controls)
- React Native with Expo (ADR-001)
- Local storage for sleep session persistence
## Dependencies
- Blocked by: SB-001 (Baby Onboarding) — needs baby profile to exist

## Reference
- Specification: specs/sleepy-baby-mvp.md
