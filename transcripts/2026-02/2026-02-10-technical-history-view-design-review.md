---
type: transcript
id: transcripts/2026-02/2026-02-10-technical-history-view-design-review.md
title: "History View Design Review"
meeting_type: "technical"
meeting_date: "2026-02-10"
participants:
  - "Priya"
  - "Alex"
  - "Mike"
created: "2026-02-10T00:00:00Z"
labels:
  - "transcript"
  - "technical"
  - "2026-02"
---

# History View Design Review

**Date:** 2026-02-10
**Type:** Technical
**Participants:** Priya, Alex, Mike

---

## Summary

Design review of four sleep history screen mockup options (A-D) presented by Priya. After evaluating trade-offs between visual density, editability, and build complexity, the team aligned on shipping Option A (simple card list) for MVP, with a phased plan to evolve toward Alex's collapsible timeline hybrid post-launch.

## Key Decisions

1. **MVP history view is Option A (simple card list)** — Prioritizes editability and build simplicity over visual timeline features. Cards show nap name, time range, and duration with large tap targets.
2. **Phased evolution roadmap agreed** — v1.1 adds mini timeline header per day (visual only, no interaction logic); v1.2 adds collapsible hybrid (collapsed timeline bars by default, tap to expand cards, today auto-expanded).

## Action Items

_No action items were assigned during this meeting. Mockups already exist at `mockups/sleep-history/`._

## Open Questions

_No open questions were raised._

## Raw Transcript

Priya: Hey everyone! So I put together four HTML mockups for the sleep history screen — the open question from the spec about what format it should take. I'll walk through them quickly.

Priya: Option A is a simple card list. Each day has a stack of cards showing nap name, time range, and duration. You tap any card to edit. It's the simplest to build and the edit UX is great — big tap targets, works fine one-handed. The downside is you get zero visual sense of when during the day things happened.

Priya: Option B goes full visual. Each day is a horizontal timeline bar where purple blocks represent sleep and gaps represent awake time. You can instantly see the rhythm of the day and compare days vertically. But tapping those small blocks to edit is fiddly, especially one-handed.

Priya: Option C combines both. Each day gets a mini timeline bar at the top for visual context, then full card entries below. I also added an "awake before" field on each card showing the wake window duration, color-coded green or orange. That directly ties into the app's core value. Edit UX stays good because you're tapping cards, not tiny blocks.

Priya: Option D is the most ambitious — a full week at a glance with all 7 days stacked as timeline bars. You tap a day to expand the detail below. Great for spotting patterns across the week, but it's the most complex to build.

Priya: My recommendation is Option C. Best balance of information density, editability, and build effort.

Alex: I love C. It's as good as B for the visual overview but you can also click into the cards as easily as in A. But what if we just collapse the actual cards and show the timeline by default? Then when you tap on a day it expands the cards. That gives us B by default and C on demand. What do you think Priya?

Priya: That's a really smart mashup. So default view looks like B — timeline bars only — and when you tap a day it expands to reveal the C-style cards underneath. I like it. Today should auto-expand since that's what you most likely want to edit. The expand-collapse animation needs to feel snappy. The only risk is content jumping around when you expand a mid-screen day, but that's solvable with scroll-to-top on expand. Mike, from a build perspective, does a collapsible wrapper per day feel reasonable for MVP?

Mike: Yeah that sounds awesome, but I'm afraid it will take us quite a bit of time to build. I can see loads of features in the UI — the timeline rendering, the collapsible sections, the animations, the scroll handling. It's basically too complex for an MVP. What if we just go with Option A first and expand later? I'm not saying we won't do it, I'm just saying where priorities should be.

Priya: Fair point. The collapsible timeline with animations and scroll handling is a lot of polish for a first pass. The core job of the history screen is just "find an entry, tap it, fix it." Option A nails that. Here's what I'd propose: MVP ships Option A. Then v1.1 adds the mini timeline header per day — that's mostly a visual component, no interaction logic. Then v1.2 makes it collapsible with Alex's hybrid idea — collapsed by default, tap to expand, today auto-expanded.

Alex: Yeah, I think this is a good compromise. The CEO values time to market, so this phased approach is the best. Great call Mike.

Priya: Perfect, so we're aligned. History view for MVP is Option A — simple card list. We'll evolve it into the collapsible timeline hybrid post-launch. I'll keep the mockups as reference for the later phases.
