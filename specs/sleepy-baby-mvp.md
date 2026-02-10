# Feature: Sleepy Baby MVP

**Specification:** specs/sleepy-baby-mvp.md

---

## 1. Overview

### What & Why
Sleepy Baby is a mobile app that helps parents track baby sleep and predict optimal nap times based on age-appropriate sleep windows. Babies have a maximum awake time between naps that varies by age (e.g., ~1–1.5 hours at 3 months). Missing the window leads to overtiredness. Existing solutions like Huckleberry hide predictions behind push notifications and a premium paywall — if you dismiss the notification or have notifications off, you're blind. Sleepy Baby puts the answer to "when should the baby sleep next?" front and center every time you open the app.

### Target Users & Success Metrics
- **Users:** Parents with babies who need to manage nap schedules
- **Success Metrics:**
  - _To be defined - not yet discussed_

---

## 2. User Journey

### Primary Workflow: Check Next Sleep Window
**When:** Parent opens the app to see when the baby should sleep next

**Steps:**
1. User opens the app
2. System displays current baby state (awake or sleeping) and countdown/time estimate to next sleep window
3. User sees the projected day plan with upcoming naps and estimated bedtime

**Success:** Parent immediately knows when the next nap should happen and can plan accordingly

**Edge Cases:**
- No sleep logged today: App displays a message indicating it needs sleep data to generate predictions. User must log at least one wake/sleep event to bootstrap the day plan.
- Bedtime transition: Day planner shows projected bedtime as the last entry, plus expected wake time the next morning. Next day starts fresh from actual wake time.

### Secondary Workflow: Log Sleep
**When:** Baby falls asleep or wakes up

**Steps:**
1. User taps start button when baby falls asleep
2. System records sleep start time and updates baby state to "sleeping"
3. User taps stop button when baby wakes up
4. System records wake time, updates baby state to "awake", and recalculates the day plan — all downstream naps and bedtime shift based on actual wake time

**Success:** Sleep entry is recorded and day plan dynamically recalculates

**Edge Cases:**
- Forgot to log: User can add a past sleep entry manually (see Edit Past Sleep workflow) with retroactive start/end times.
- Accidental tap: User can delete the in-progress sleep entry to undo an accidental start.

### Tertiary Workflow: Edit Past Sleep Entries
**When:** User needs to fix a wrong time or add a forgotten nap

**Steps:**
1. User navigates to sleep history
2. System displays past sleep entries grouped by day (reverse chronological). Each day section shows a stack of cards — each card displays: nap label (Nap 1, Nap 2, Night Sleep), time range, and duration. Nap and night sleep entries are visually distinguished.
3. User taps a card to edit an existing entry, or taps the add button (+) to create a new past entry
4. System updates records and recalculates the day plan if the edit affects today

**Success:** Past entries are corrected and the day plan reflects accurate data

**Edge Cases:**
- _To be defined - not yet discussed_

---

## 3. Requirements

### Must Have (Core Features)
* **Sleep Tracking:** Start/stop button to record when baby falls asleep and wakes up. Must be operable one-handed.

* **Manual Editing:** Users can edit past sleep entries (fix times) and add entries they forgot to log.

* **Main Screen — Current State:** Displays whether the baby is currently awake or sleeping, plus a countdown or time estimate to the next sleep window. This is the primary screen users see when opening the app.

* **Dynamic Day Planner:** Projects a full day schedule of naps and bedtime based on the baby's age and corresponding sleep windows. Recalculates automatically as actual sleep is logged — if a nap happens late, everything downstream shifts.

* **Onboarding — Baby Birthdate:** On first launch, a simple screen asks for the baby's birthdate. Age is auto-calculated from this. No name or other fields required.

* **Age-Based Sleep Windows:** Sleep window durations are determined by baby age (derived from birthdate entered at onboarding). Windows get longer and nap count decreases as baby grows. The app uses conservative (shorter) values from expert ranges to avoid overtiredness.

  | Age (mo) | Wake window (h) | Naps/day | Nap length (h) | Bedtime |
  |----------|----------------|----------|----------------|---------|
  | 0–1 | 0.5–1.0 (0.75) | 5–6 | 0.5–2.0 (1.0) | 7:00–8:00 pm |
  | 1–2 | 1.0–2.0 (1.5) | 5–6 | 0.5–2.0 (1.0) | 7:00–8:00 pm |
  | 2–3 | 1.0–2.0 (1.5) | 4–5 | 0.5–2.0 (1.0) | 7:00–8:00 pm |
  | 3–4 | 1.25–2.5 (1.9) | 4–5 | 0.5–2.0 (1.0) | 6:30–7:30 pm |
  | 4–6 | 2.0–3.0 (2.5) | 3–4 | 0.5–2.0 (1.25) | 6:30–8:00 pm |
  | 6–9 | 2.5–3.5 (3.0) | 2–3 | 1.0–2.0 (1.5) | 6:30–7:30 pm |
  | 9–12 | 3.0–4.0 (3.5) | 2 | 1.0–2.0 (1.5) | 6:30–7:30 pm |
  | 12–18 | 4.0–5.0 (4.5) | 1–2 | 1.0–3.0 (2.0) | 7:00–8:00 pm |
  | 18–24 | 4.0–6.0 (5.0) | 1 | 1.0–3.0 (2.0) | 7:00–8:00 pm |

  Sources: AAP/AASM recommendations, Cleveland Clinic (Dr. Barrett), Mayo Clinic, Weissbluth pediatric sleep guides. Where experts differed, conservative (shorter) wake windows were used.

* **Sleep History:** Users can view and edit past sleep entries. MVP format: simple card list grouped by day (reverse chronological, today first with "Today" badge). Each card shows nap label (Nap 1/2/3, Night Sleep), time range (start → end), and duration. Nap vs night entries are visually distinct. Floating add button (+) for new entries. Tap any card to edit. Post-MVP: mini timeline header per day with wake window duration color-coded green/orange on each card (v1.1), then collapsible timeline hybrid — collapsed by default, tap to expand, today auto-expanded (v1.2).

### Out of Scope
* Push notifications / reminders
* Multi-baby support
* Caregiver sharing / multi-user
* User accounts / authentication / cloud sync
* Sleep analytics / trends / insights
* Integration with wearables or smart monitors

### Constraints & Dependencies
* **UX:** Must work well on mobile — one-handed use while holding a baby is the primary interaction mode
* **Technical:** React Native with Expo. Local-only data storage, no backend. App store distribution via EAS Build.
* **Timeline:** No hard deadline. Quality over speed. Alex personally motivated to have something usable before second child arrives.

---

## 4. Open Questions

### Needs Answer Before Implementation
_None — all product questions resolved_

### Resolved
**Q1:** What format should the sleep history view take? **Resolved:** Simple card list for MVP. Phased evolution: mini timeline header (v1.1), collapsible timeline hybrid with today auto-expanded (v1.2). Decided 2026-02-10, design review.

### Assumptions We're Making
1. **Single baby per account:** MVP supports only one baby. This simplifies data model and UI. If wrong, data model may need restructuring.

2. **Manual tracking only:** No automatic sleep detection (wearables, sound, motion). All sleep data comes from user taps or manual entry. If wrong, integration layer needed.

3. **Local-only data storage:** No user accounts, no cloud sync. Data lives on-device only. If wrong, need backend and auth from the start.

4. **Standard pediatric sleep guidelines:** Sleep window durations sourced from AAP/AASM, Cleveland Clinic, Mayo Clinic, and Weissbluth. Conservative (shorter) values used when sources disagree. If wrong, data table can be adjusted without architectural changes.

---

# Technical Specification: Sleepy Baby MVP

**Feature Spec:** specs/sleepy-baby-mvp.md (Product Specification section above)
**Author:** Generated by Claude Code
**Status:** Draft

---

## 1. Technical Approach

React Native with Expo. Web target for local development (browser-based dev loop, no emulators required). Native builds via EAS Build for app store distribution. Android focus for dev team; iOS testing handled by dedicated testers. Local-only data persistence, no backend. The core technical challenge is the dynamic day planner algorithm that projects nap times based on age-appropriate sleep windows and recalculates as actual sleep is logged. Storage library depends on React Native ecosystem options.

---

## 2. System Changes

### New Components/Capabilities
_To be defined - not yet discussed_

### Modifications to Existing Components
_N/A — greenfield project_

---

## 3. Architecture

_To be defined - not yet discussed_

---

## 4. Architectural Context

### Architecture Patterns
_To be defined - not yet discussed_

### Relevant ADRs
_None yet_

### Architecture Guidelines
_To be defined - not yet discussed_

---

## 5. Technical Specifications

### API Contracts
_To be defined - not yet discussed_

### Data Models
_To be defined - not yet discussed_

### Event Models
_To be defined - not yet discussed_

---

## 6. Integrations

### Internal System Integrations
_N/A — greenfield project_

### External System Integrations
_To be defined - not yet discussed_

### New Libraries/Dependencies
_To be defined - not yet discussed_

---

## 7. Testing Requirements

### Test Coverage Standards
_To be defined - not yet discussed_

### Critical Test Scenarios
_To be defined - not yet discussed_

### Test Data Requirements
_To be defined - not yet discussed_

---

## 8. Open Questions

### Needs Answer Before Implementation
**Q1:** What local storage library? (Platform decided: React Native with Expo — evaluate React Native-compatible options)
  - Owner: Engineering
  - Needed by: Before development
  - Context: Affects data model implementation and query capabilities

### Assumptions We're Making
1. **Greenfield project:** No existing codebase or infrastructure to integrate with. If wrong, need to assess existing systems.

2. **No backend required:** Local-only data, no authentication, no cloud sync. Confirmed for MVP scope.

3. **Web target parity:** Expo's web target provides sufficient fidelity for development. If wrong, may need emulator-based dev workflow. (Sara to verify)

---

## Action Items

### Decisions Required
- [x] **Platform choice:** React Native with Expo (decided 2026-02-10)
- [x] **History view format:** Simple card list for MVP (decided 2026-02-10, design review)
- [ ] **Local storage library:** evaluate React Native/Expo-compatible options

### Research
- [x] **Sleep window data:** Researched — see Age-Based Sleep Windows table in Requirements. Sources: AAP, Cleveland Clinic, Mayo Clinic, Weissbluth.
- [ ] **Competitive analysis:** Review Huckleberry and other sleep tracking apps for UX patterns to adopt or avoid

### Design
- [ ] **Main screen:** Design the primary view — baby state, countdown to next sleep window, day planner
- [ ] **Day planner:** Design the dynamic schedule view showing projected naps and bedtime
- [ ] **Sleep tracking interaction:** Design start/stop button, delete flow for accidental taps
- [ ] **Onboarding:** Design first-launch birthdate entry screen
- [ ] **Sleep history:** Design view/edit/add interface for card list format

### Technical
- [ ] **Project scaffolding:** Set up Expo project, build tooling, CI
- [ ] **Data model:** Define local storage schema for sleep entries and baby profile
- [ ] **Sleep window algorithm:** Implement day planner projection and recalculation logic
- [ ] **Technical spec:** Fill in architecture, components, and testing sections
- [ ] **Verify Expo web target** works for React Native dev loop (Owner: Sara)

### Validation
- [ ] **Validate assumptions** with team: single baby, manual only, local-only, standard guidelines
- [ ] **Define success metrics** for MVP

---

## References
- **Transcript:** transcripts/2026-02/2026-02-10-planning-sleepy-baby-mvp-kickoff.md
- **Transcript:** transcripts/2026-02/2026-02-10-technical-platform-decision-react-native-with-expo.md
- **Transcript:** Design review: history view mockups (Option A selected for MVP)
- **Mockups:** mockups/option-a-simple-list.html (MVP), mockups/option-c-cards-mini-timeline.html (post-MVP reference)
- **Research:** research/Age-Appropriate Baby Sleep & Nap Schedule.pdf (sleep window data)
