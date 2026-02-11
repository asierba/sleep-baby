# Feature: Sleepy Baby MVP

## What

A mobile app helping parents track baby sleep and predict optimal nap times based on age-appropriate sleep windows. Parents tap a button when the baby falls asleep and again when they wake up; entries can be edited after the fact. The main screen answers one question — "when should the baby sleep next?" — showing the baby's current state (awake or sleeping) and a countdown to the next sleep window. A dynamic day planner projects the full day's schedule (nap times and bedtime) based on the baby's age, and recalculates automatically as actual sleep is logged.

## Why

Existing apps like Huckleberry hide sleep predictions behind push notifications and a premium paywall — parents need immediate, front-and-center visibility into their baby's next sleep window.

## What We're NOT Doing

- Push notifications (core experience is pull-based; can layer on later)
- Multi-baby support (single baby first)
- Caregiver sharing (single user first)

## Sleep History View

**MVP (v1.0): Simple card list** (Option A — `mockups/sleep-history/option-a-simple-list.html`)
- Entries grouped by day, each card shows: nap name, time range, duration
- Large tap targets — tap any card to edit
- Reverse chronological within each day

**Post-MVP evolution:**
- v1.1: Add mini timeline header per day (visual only, no interaction — see Option C mockup)
- v1.2: Collapsible hybrid — collapsed timeline bars by default, tap day to expand cards, today auto-expanded (Alex's mashup of Options B + C)

Design mockups for all options preserved at `mockups/sleep-history/`.

## Competitive Context

8 competitor apps analyzed (Huckleberry, Baby Tracker/Nighp, Baby Connect, Glow Baby, Nanit, Wonder Weeks, Nanni AI, Nara Baby Tracker). Key findings:

**UX patterns to adopt:**
- One-touch, large controls for one-handed start/stop (all top apps)
- Front-and-center next-nap prediction on main screen (Nanni SleepGenie, Nanit NextNap)
- Dark mode for nighttime use (Baby Connect)
- Editable past entries via tap-to-edit (Baby Tracker, Baby Connect)
- Minimal onboarding — only baby name + DOB (Glow, Huckleberry)
- Charts + timelines for sleep history (Baby Connect, Nara)

**UX patterns to avoid:**
- Paywalled predictions (Huckleberry Plus, Glow Premium, Nanit subscription)
- Cluttered multi-feature screens (Baby Connect, Glow ads/popups)
- Cumbersome time-math for logging past naps (Baby Connect)
- Over-promising AI accuracy (Nanni cry analysis)

**Core differentiator validated:** No free app shows next-nap prediction front-and-center without paywall. This is the biggest gap in the market.

## Sleep Window Reference Data

Evidence-based data from AAP, Cleveland Clinic, Weissbluth, Mayo Clinic. Conservative (shorter) wake windows used when sources conflict.

| Age (mo) | Wake Window (h) | Naps/day | Nap Length (h) | Daytime Sleep (h) | Night Sleep (h) | Total Sleep (h) | Bedtime |
|-----------|-----------------|----------|----------------|--------------------|-----------------|-----------------|---------|
| 0–1 | 0.5–1.0 (0.75) | 5–6 | 0.5–2.0 (1.0) | 6–8 (7) | 8–10 (9) | 14–17 (16) | 7:00–8:00 pm |
| 1–2 | 1.0–2.0 (1.5) | 5–6 | 0.5–2.0 (1.0) | 5–7 (6) | 9–11 (10) | 14–17 (16) | 7:00–8:00 pm |
| 2–3 | 1.0–2.0 (1.5) | 4–5 | 0.5–2.0 (1.0) | 5–6 (5.5) | 9–11 (10) | 14–17 (16) | 7:00–8:00 pm |
| 3–4 | 1.25–2.5 (1.9) | 4–5 | 0.5–2.0 (1.0) | 5–6 (5.5) | 10–11 (10.5) | 14–17 (16) | 6:30–7:30 pm |
| 4–6 | 2.0–3.0 (2.5) | 3–4 | 0.5–2.0 (1.25) | 3.5–5.0 (4.25) | 9–12 (10.5) | 12–15 (13.5) | 6:30–8:00 pm |
| 6–9 | 2.5–3.5 (3.0) | 2–3 | 1.0–2.0 (1.5) | 2.5–4.0 (3.25) | 10–12 (11) | 12–15 (13.5) | 6:30–7:30 pm |
| 9–12 | 3.0–4.0 (3.5) | 2 | 1.0–2.0 (1.5) | 2.0–3.0 (2.5) | 11–12 (11.5) | 12–15 (13.5) | 6:30–7:30 pm |
| 12–18 | 4.0–5.0 (4.5) | 1–2 | 1.0–3.0 (2.0) | 1.0–3.0 (2.0) | 10–12 (11) | 11–14 (12.5) | 7:00–8:00 pm |
| 18–24 | 4.0–6.0 (5.0) | 1 | 1.0–3.0 (2.0) | 1.0–3.0 (2.0) | 10–12 (11) | 11–14 (12.5) | 7:00–8:00 pm |

Sources: AAP/AASM sleep recommendations, Cleveland Clinic (Dr. Barrett) wake windows, Mayo Clinic nap patterns, Weissbluth pediatric sleep guides, Taking Cara Babies (toddler bedtime).

## Open Questions

- [ASSUMPTION: Baby's age or birthdate must be configured during onboarding to calculate appropriate sleep windows]

---

# Tech Spec: Sleepy Baby MVP

**Feature Spec:** specs/sleepy-baby-mvp.md

## Key Decisions

- **React Native with Expo** — Web target for local development, EAS Build for store distribution (ADR-001)
- **Android focus for dev team** — iOS testing handled by dedicated testers (ADR-001)

## Dependencies

_To be defined — not yet discussed._

## Open Questions

- [OPEN QUESTION: How should the day planner recalculation algorithm work? What inputs beyond baby age and last wake time?]
- [ASSUMPTION: App must work well on mobile with one-handed use as a hard UX constraint — confirmed by competitive analysis: all top apps use large, easy buttons for one-handed use; Baby Connect adds voice (Siri/Alexa) and Apple Watch support]
