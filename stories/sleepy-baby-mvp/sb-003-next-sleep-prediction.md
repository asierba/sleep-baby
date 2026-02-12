# Next Sleep Prediction

## Description
As a parent, I want to see when my baby should sleep next as soon as I open the app, so I can prepare for the next nap without doing time math. This is the core differentiator — front-and-center prediction with no paywall.

## Acceptance Criteria
- Main screen shows a countdown to the next sleep window based on baby's age and last wake time
- Countdown updates in real-time (minute-by-minute at minimum)
- When the baby is sleeping, screen shows elapsed sleep duration instead of countdown
- Wake window calculation uses the age-appropriate sleep window data from the baby's age bracket
- Prediction recalculates immediately when a sleep session ends (new wake time)
- When wake window is exceeded, display clearly indicates the baby is overdue for sleep
- Prediction is visible immediately on app open — no navigation required

## Technical Notes
- Wake window ranges per age bracket (see spec table)
- Use conservative (shorter) wake windows when sources conflict
- Core differentiator validated: no free app shows next-nap prediction front-and-center
## Dependencies
- Blocked by: SB-001 (Baby Onboarding) — needs baby age for wake window lookup
- Blocked by: SB-002 (Sleep Tracking) — needs last wake time from tracking data

## Reference
- Specification: specs/sleepy-baby-mvp.md
