# Sleep History & Editing

## Description
As a parent, I want to view past sleep entries and edit them, so I can fix wrong times or add naps I forgot to log. MVP uses a simple card list grouped by day.

## Acceptance Criteria
- Sleep entries are displayed as cards grouped by day
- Each card shows entry name (e.g., "Nap 1", "Night Sleep"), time range, and duration
- Night sleep entries are visually distinguished from nap entries
- Entries within each day are in reverse chronological order
- Tapping a card opens it for editing with large tap targets
- Parent can edit start and end times of a past entry
- Parent can manually add a sleep entry they forgot to log
- Parent can delete an incorrect entry
- Changes to entries trigger recalculation of predictions and day planner

## Technical Notes
- MVP design: Option A — simple card list
- Post-MVP: v1.1 adds mini timeline header, v1.2 adds collapsible hybrid
- Large tap targets per competitive analysis

## Mockups
- [Option A: Simple list](../../mockups/sleep-history/option-a-simple-list.html) (MVP)
- [Option B: Timeline](../../mockups/sleep-history/option-b-timeline.html)
- [Option C: Cards + mini timeline](../../mockups/sleep-history/option-c-cards-mini-timeline.html)
- [Option D: Weekly overview](../../mockups/sleep-history/option-d-weekly-overview.html)

## Dependencies
- Blocked by: SB-001 (Baby Onboarding) — needs baby profile
- Blocked by: SB-002 (Sleep Tracking) — needs sleep data to display

## Reference
- Specification: specs/sleepy-baby-mvp.md (Sleep History View section)
