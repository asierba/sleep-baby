---
type: story
id: story-2
spec: specs/sleepy-baby-mvp.md
title: Sleep Tracking & Current State
status: todo
size: medium
dependencies: [story-1]
blocks: [story-3]
labels: [full-stack, core]
created: 2026-02-10
---

# Story: Sleep Tracking & Current State

**As a** parent
**I want** to tap a single button when my baby falls asleep or wakes up and see the current state at a glance
**So that** I have an accurate record of sleep and always know if my baby is awake or sleeping

---

## Acceptance Criteria

### AC1: Start sleep tracking
- **Given** the baby is in "awake" state
- **When** the user taps the start button
- **Then** a sleep entry is created with the current time as `started_at`
- **And** the baby state switches to "sleeping"

### AC2: Stop sleep tracking
- **Given** the baby is in "sleeping" state
- **When** the user taps the stop button
- **Then** the current sleep entry is updated with the current time as `ended_at`
- **And** the baby state switches to "awake"

### AC3: Awake state display
- **Given** the baby is awake
- **When** the user views the main screen
- **Then** the screen shows "Awake" status
- **And** elapsed time since last wake is displayed

### AC4: Sleeping state display
- **Given** the baby is sleeping
- **When** the user views the main screen
- **Then** the screen shows "Sleeping" status
- **And** current nap duration is displayed

### AC5: Delete accidental sleep entry
- **Given** the baby is in "sleeping" state (sleep was just started)
- **When** the user taps delete/undo
- **Then** a confirmation dialog is shown
- **And** upon confirmation, the in-progress sleep entry is deleted and state returns to "awake"

### AC6: One-handed operation
- **Given** the user is holding a baby
- **When** they need to start or stop tracking
- **Then** the start/stop button is large enough and positioned for easy one-handed thumb reach

---

## Technical Notes

- Start/stop button in hero section of main screen
- Sleep entry CRUD operations via repository layer
- Delete via link below stop button + confirmation dialog
- Mockup references: mockups/main-screen-awake.html, mockups/main-screen-sleeping.html, mockups/sleep-tracking-interaction.html

**References:**
- Spec: [../../specs/sleepy-baby-mvp.md]
