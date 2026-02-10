---
type: story
id: story-1
spec: specs/sleepy-baby-mvp.md
title: Onboarding & Project Foundation
status: todo
size: small
dependencies: []
blocks: [story-2, story-3, story-4]
labels: [full-stack, foundation]
created: 2026-02-10
---

# Story: Onboarding & Project Foundation

**As a** parent using the app for the first time
**I want** to enter my baby's birthdate and have the app ready to use
**So that** the app can calculate age-appropriate sleep windows

---

## Acceptance Criteria

### AC1: First launch shows onboarding
- **Given** the app is launched for the first time (no baby profile exists)
- **When** the app opens
- **Then** the onboarding screen is displayed with birthdate entry fields (MM/DD/YYYY)
- **And** a privacy note is visible explaining data stays on-device

### AC2: Live age preview
- **Given** the user is on the onboarding screen
- **When** they enter a valid birthdate
- **Then** a live age preview is displayed (e.g., "3 months old — typically 4-5 naps/day")

### AC3: Birthdate saved and navigation
- **Given** the user has entered a valid birthdate
- **When** they confirm the entry
- **Then** the birthdate is saved to the local SQLite database
- **And** the user is navigated to the main screen

### AC4: Subsequent launches skip onboarding
- **Given** a baby profile already exists in the database
- **When** the app is opened
- **Then** the main screen is displayed directly (onboarding is skipped)

### AC5: Invalid birthdate handling
- **Given** the user is on the onboarding screen
- **When** they enter an invalid or future date
- **Then** the confirm button remains disabled
- **And** appropriate validation feedback is shown

---

## Technical Notes

- Expo project scaffolding with expo-router (file-based routing)
- SQLite database setup with `baby` and `sleep_entry` tables
- Repository pattern for data access layer
- React context for baby state management
- Mockup reference: mockups/onboarding.html

**References:**
- Spec: [../../specs/sleepy-baby-mvp.md]
