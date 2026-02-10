---
type: story
id: story-3
spec: specs/sleepy-baby-mvp.md
title: Day Planner & Sleep Predictions
status: todo
size: large
dependencies: [story-1, story-2]
blocks: []
labels: [full-stack, core, algorithm]
created: 2026-02-10
---

# Story: Day Planner & Sleep Predictions

**As a** parent
**I want** to see when my baby should sleep next and the full projected day schedule
**So that** I can plan my day around nap times and avoid overtiredness

---

## Acceptance Criteria

### AC1: Countdown to next sleep window
- **Given** the baby is awake and sleep entries exist for today
- **When** the user views the main screen
- **Then** a prominent countdown to the next sleep window is displayed

### AC2: Projected day schedule
- **Given** the baby has a known age and today's sleep data exists
- **When** the user views the main screen
- **Then** a vertical timeline shows completed naps (solid) and projected naps (dashed)
- **And** projected bedtime is shown as the last entry

### AC3: Approximate time display
- **Given** projected nap times are calculated
- **When** they are displayed on the timeline
- **Then** times are shown as approximate (e.g., "around 2:15 pm")

### AC4: Dynamic recalculation
- **Given** the day plan is displayed
- **When** a new sleep entry is logged (nap ends late or early)
- **Then** all downstream projected naps and bedtime shift accordingly

### AC5: No sleep data today
- **Given** no sleep entries exist for today
- **When** the user views the main screen
- **Then** a message prompts the user to log a wake or sleep event to bootstrap the day plan

### AC6: Baby currently sleeping
- **Given** the baby is currently sleeping
- **When** the day plan is calculated
- **Then** the algorithm projects wake time from average nap length for the age bracket
- **And** continues projecting subsequent naps from that estimated wake time

### AC7: Bedtime transition
- **Given** the last wake window pushes into the bedtime range
- **When** the day plan is calculated
- **Then** bedtime is shown as the final entry
- **And** expected wake time the next morning is displayed

### AC8: Age-based sleep windows
- **Given** the baby's birthdate is stored
- **When** the day plan algorithm runs
- **Then** sleep window duration, nap count, and nap length are derived from the age bracket table using conservative (shorter) values

---

## Technical Notes

- Pure function: `projectDayPlan(babyAgeMonths, todaySleepEntries) → DayPlan`
- Sleep window lookup table from spec (AAP/AASM sources, conservative values)
- Algorithm: last wake time + wake window → next nap, repeat until naps/day reached, then project bedtime
- Called on app open and after each log/edit
- Mockup references: mockups/main-screen-awake.html (timeline section)

**References:**
- Spec: [../../specs/sleepy-baby-mvp.md]
