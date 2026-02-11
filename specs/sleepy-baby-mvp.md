# Feature: Sleepy Baby MVP

## What

A mobile app helping parents track baby sleep and predict optimal nap times based on age-appropriate sleep windows. Parents tap a button when the baby falls asleep and again when they wake up; entries can be edited after the fact. The main screen answers one question — "when should the baby sleep next?" — showing the baby's current state (awake or sleeping) and a countdown to the next sleep window. A dynamic day planner projects the full day's schedule (nap times and bedtime) based on the baby's age, and recalculates automatically as actual sleep is logged.

## Why

Existing apps like Huckleberry hide sleep predictions behind push notifications and a premium paywall — parents need immediate, front-and-center visibility into their baby's next sleep window.

## What We're NOT Doing

- Push notifications (core experience is pull-based; can layer on later)
- Multi-baby support (single baby first)
- Caregiver sharing (single user first)
- Platform decision (deferred to after feature spec)

## Open Questions

- [OPEN QUESTION: What format should the sleep history view take — list, timeline, or chart? Deferred to design phase]
- [OPEN QUESTION: Platform choice — native iOS, React Native, or responsive web app? Deferred to after feature spec]
- [OPEN QUESTION: What is the source for age-appropriate sleep window data? Pediatric guidelines, custom research, or configurable by user?]
- [ASSUMPTION: Baby's age or birthdate must be configured during onboarding to calculate appropriate sleep windows]
- [ASSUMPTION: Sleep window durations are based on established pediatric sleep guidelines (e.g., 3 months = 1-1.5h wake window)]

---

# Tech Spec: Sleepy Baby MVP

**Feature Spec:** specs/sleepy-baby-mvp.md

## Key Decisions

_To be defined — no technical decisions made yet. Platform and architecture deferred to after feature spec._

## Dependencies

_To be defined — not yet discussed._

## Open Questions

- [DECISION PENDING: Platform — native iOS vs React Native vs responsive web app — depends on team skills and UX requirements]
- [OPEN QUESTION: How should the day planner recalculation algorithm work? What inputs beyond baby age and last wake time?]
- [ASSUMPTION: App must work well on mobile with one-handed use as a hard UX constraint]
