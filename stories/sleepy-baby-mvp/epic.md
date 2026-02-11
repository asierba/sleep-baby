# Epic: Sleepy Baby MVP

## Description
A mobile app helping parents track baby sleep and predict optimal nap times based on age-appropriate sleep windows. Parents tap a button when the baby falls asleep and again when they wake up. The main screen answers "when should the baby sleep next?" with a countdown and dynamic day planner.

## Reference
- Specification: specs/sleepy-baby-mvp.md
- Tech: React Native with Expo (ADR-001)

## User Stories
This Epic contains 7 INVEST-compliant user stories.

0. [SB-000: Steel Thread](./sb-000-steel-thread.md) — Project scaffolding & CI/CD pipeline
1. [SB-001: Baby Onboarding](./sb-001-baby-onboarding.md) — Setup baby profile
2. [SB-002: Sleep Tracking](./sb-002-sleep-tracking.md) — Start/stop sleep logging
3. [SB-003: Next Sleep Prediction](./sb-003-next-sleep-prediction.md) — Main screen countdown
4. [SB-004: Sleep History & Editing](./sb-004-sleep-history-editing.md) — View/edit past entries
5. [SB-005: Day Planner](./sb-005-day-planner.md) — Projected daily schedule
6. [SB-006: Branding & Visual Identity](./sb-006-branding-visual-identity.md) — App icon, splash screen, display name

## Implementation Order
0. SB-000: Steel Thread (no dependencies — must complete first)
1. SB-001: Baby Onboarding (depends on SB-000)
2. SB-002: Sleep Tracking (depends on SB-001)
3. SB-003 + SB-004: Next Sleep Prediction + Sleep History (parallel, depend on SB-001 + SB-002)
4. SB-005: Day Planner (depends on SB-001 + SB-002 + SB-003)
5. SB-006: Branding & Visual Identity (depends on SB-000, parallel to SB-001+)
