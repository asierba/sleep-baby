---
type: story
id: story-4
spec: specs/sleepy-baby-mvp.md
title: Sleep History & Manual Editing
status: todo
size: medium
dependencies: [story-1]
blocks: []
labels: [full-stack]
created: 2026-02-10
---

# Story: Sleep History & Manual Editing

**As a** parent
**I want** to view past sleep entries and fix wrong times or add forgotten naps
**So that** the app has accurate data and predictions stay reliable

---

## Acceptance Criteria

### AC1: History grouped by day
- **Given** sleep entries exist across multiple days
- **When** the user navigates to the sleep history screen
- **Then** entries are displayed as cards grouped by day in reverse chronological order
- **And** today's group shows a "Today" badge

### AC2: Card content
- **Given** a sleep entry exists
- **When** it is displayed as a card
- **Then** the card shows: nap label (Nap 1, Nap 2, Night Sleep), time range (start → end), and duration

### AC3: Visual distinction
- **Given** both nap and night sleep entries exist
- **When** the history screen is displayed
- **Then** nap and night sleep entries are visually distinguished

### AC4: Edit existing entry
- **Given** the user is viewing the history screen
- **When** they tap a card
- **Then** an edit view opens allowing start and end time modification
- **And** saving updates the entry in the database

### AC5: Add past entry
- **Given** the user is on the history screen
- **When** they tap the floating (+) button
- **Then** a form opens for creating a new entry with manual start and end times
- **And** the entry is saved and appears in the correct day group

### AC6: Edits trigger day plan recalculation
- **Given** the user edits or adds an entry for today
- **When** the changes are saved
- **Then** the day plan on the main screen recalculates to reflect the updated data

### AC7: Delete existing entry
- **Given** the user is editing an entry
- **When** they choose to delete it
- **Then** a confirmation is shown
- **And** upon confirmation the entry is removed and the day plan recalculates if affected

---

## Technical Notes

- History screen accessible via navigation (tab or header link)
- Card list with day section headers
- Edit screen reused for both edit and add flows (prefilled vs empty)
- Recalculation triggers day planner algorithm for today's entries
- Mockup reference: mockups/sleep-history/option-a-simple-list.html

**References:**
- Spec: [../../specs/sleepy-baby-mvp.md]
