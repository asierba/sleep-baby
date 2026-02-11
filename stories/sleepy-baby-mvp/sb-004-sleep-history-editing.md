# Sleep History & Editing

## Description
As a parent, I want to view past sleep entries and edit them, so I can fix wrong times or add naps I forgot to log. MVP uses a simple card list grouped by day.

## Acceptance Criteria
- Sleep entries are displayed as cards grouped by day
- Each card shows nap name (e.g., "Nap 1"), time range, and duration
- Entries within each day are in reverse chronological order
- Tapping a card opens it for editing with large tap targets
- Parent can edit start and end times of a past entry
- Parent can manually add a sleep entry they forgot to log
- Parent can delete an incorrect entry
- Changes to entries trigger recalculation of predictions and day planner

## Technical Notes
- MVP design: Option A — simple card list (see mockups/sleep-history/option-a-simple-list.html)
- Post-MVP: v1.1 adds mini timeline header, v1.2 adds collapsible hybrid
- Large tap targets per competitive analysis

## Size
Medium (3–5 days) — 8 ACs

## Dependencies
- Blocked by: SB-001 (Baby Onboarding) — needs baby profile
- Blocked by: SB-002 (Sleep Tracking) — needs sleep data to display

## Reference
- Specification: specs/sleepy-baby-mvp.md (Sleep History View section)
