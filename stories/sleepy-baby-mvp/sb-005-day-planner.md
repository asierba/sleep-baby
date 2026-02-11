# Day Planner

## Description
As a parent, I want to see a projected daily schedule of naps and bedtime that recalculates as I log actual sleep, so I can plan my day around the baby's sleep needs. This is the killer feature — a dynamic schedule that adapts in real-time.

## Acceptance Criteria
- Day planner shows projected nap times and bedtime for the full day
- Projections are based on baby's age, wake windows, and expected nap count for age
- Schedule recalculates automatically when a new sleep session is logged
- Completed naps are visually distinguished from projected naps
- If a nap runs long or short, all subsequent projections shift accordingly
- Bedtime estimate adjusts based on remaining naps and wake windows
- Day planner accounts for the correct number of naps per day based on age bracket
- When all projected naps are complete, only bedtime remains in the schedule
- Planner is accessible from the main screen without deep navigation

## Technical Notes
- [DECISION PENDING: Day planner recalculation algorithm — deferred to implementation time]
- Inputs: baby age → wake window + nap count, actual logged sleep entries for today
- Must handle edge cases: late first nap, skipped nap, extra-long nap

## Size
Large (5–10 days) — 9 ACs

## Dependencies
- Blocked by: SB-001 (Baby Onboarding) — needs baby age for sleep parameters
- Blocked by: SB-002 (Sleep Tracking) — needs logged sleep data
- Blocked by: SB-003 (Next Sleep Prediction) — shares wake window calculation logic

## Reference
- Specification: specs/sleepy-baby-mvp.md
