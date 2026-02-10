---
type: transcript
id: transcripts/2026-02/2026-02-10-planning-sleepy-baby-mvp-kickoff.md
title: "Sleepy Baby MVP Kickoff"
meeting_type: "planning"
meeting_date: "2026-02-10"
participants:
  - "Alex"
  - "Mike"
  - "Sara"
created: "2026-02-10T00:00:00Z"
labels:
  - "transcript"
  - "planning"
  - "2026-02"
---

# Sleepy Baby MVP Kickoff

**Date:** 2026-02-10
**Type:** Planning
**Participants:** Alex, Mike, Sara

---

## Summary

Kickoff meeting for Sleepy Baby — a mobile app helping parents track baby sleep and predict optimal nap times based on age-appropriate sleep windows. The team defined MVP scope: sleep tracking via start/stop with manual editing, a main screen showing current baby state and next sleep window countdown, and a dynamic day planner that recalculates as actual sleep is logged.

## Key Decisions

1. **MVP core features defined** — Sleep tracking (start/stop + manual editing), main screen showing current state and next sleep window, and dynamic day planner that recalculates based on logged sleep.
2. **Notifications deferred from MVP** — Core experience is pull-based (open app to see info). Notifications can be layered on later.
3. **Platform decision deferred** — Must work well on mobile (one-handed use), but native vs PWA vs web to be decided after feature spec.
4. **Multi-baby and caregiver sharing deferred** — Single-baby, single-user experience first.
5. **Sleep history format TBD** — Users need to view and edit past entries, but presentation (list, timeline, chart) to be decided during design.
6. **No hard deadline** — Quality over speed; Alex personally motivated to have something usable before second child arrives.

## Action Items

1. **Sara** — Set up the project board (no due date)
2. **Team** — Draft the spec and reconvene (no due date)

## Open Questions

1. **Sleep history presentation** — What format should the history view take? (list, timeline, chart) — deferred to design phase.
2. **Platform choice** — Native iOS, React Native, or responsive web app? — deferred to after feature spec.

## Raw Transcript

Alex: Alright, thanks everyone for joining. This is the kick-off for Sleepy Baby. I want to walk through the problem space, define our MVP scope, and make sure we're aligned before we start building.

Mike: Sounds good. Let's do it.

Alex: So the problem. Babies have what's called "sleep windows" — a maximum amount of awake time between naps. At 3 months it's roughly 1 to 1.5 hours. As the baby grows, the windows get longer and the number of naps drops. If you miss the window, the baby gets overtired and everything goes sideways — harder to fall asleep, worse sleep quality, cranky baby.

Sara: And parents are supposed to just... know when the window is closing?

Alex: That's the thing. Most parents either guess, watch for sleepy cues which are easy to miss, or use an app like Huckleberry. Huckleberry has a "sweet spot" prediction feature but it's behind a premium paywall, and the UX has real problems.

Mike: What kind of problems?

Alex: The prediction only surfaces through push notifications. There's no way to open the app and just see "next nap in 45 minutes." You either get a notification or you don't. And if you dismiss it or have notifications off, you're blind. The information should be front and center when you open the app, not buried behind a push notification.

Sara: So what's our value proposition?

Alex: A dead-simple app where the main screen answers one question: "when should the baby sleep next?" You open it and immediately see the baby's current state — awake or sleeping — plus a countdown or time estimate to the next sleep window. That's the primary interaction.

Mike: How does the app know the baby's sleep pattern?

Alex: Manual tracking. Parent taps a button when the baby falls asleep, taps again when they wake up. Same model as Huckleberry and every other sleep tracker. You can also edit entries after the fact — fix a wrong time, add a nap you forgot to log.

Sara: What about viewing sleep history?

Alex: That's needed but the format is TBD. Could be a list, a timeline, a chart. We don't need to decide now. The requirement is: users can view and edit past sleep entries. We'll figure out the best presentation during design.

Mike: You mentioned a day planner feature earlier. Is that in scope for MVP?

Alex: Yes, I think it has to be. This is the killer feature. Based on the baby's age and the corresponding sleep windows, the app projects a full day schedule. "Nap 1 at 9:00, nap 2 at 12:30, nap 3 at 3:00, bedtime at 6:30." And crucially, it recalculates as the day progresses. If the first nap happens late, everything downstream shifts automatically.

Sara: So it's a dynamic schedule, not a static one.

Alex: Exactly. That's the key differentiator. The baby doesn't follow a clock, but having a projected plan helps parents organize their day — when to plan errands, when to expect the next window, when bedtime is likely to land.

Mike: What about notifications? Are those in scope?

Alex: Optional and not in the MVP. Some parents will want a reminder before a sleep window closes, others find notifications intrusive. The core experience is pulling up the app and seeing the info. Notifications are a nice-to-have we can layer on later.

Sara: Any decisions on platform? Native app, PWA, web?

Alex: Not yet, and I want to explicitly defer that. The constraint is it must work well on mobile — you're using it one-handed while holding a baby. But whether that's a native iOS app, React Native, or a responsive web app, let's decide after we've specced the features.

Mike: What about multi-baby support, or sharing between caregivers?

Alex: Out of scope for now. Let's nail the single-baby, single-user experience first. We can expand to household sharing and multiple children later.

Sara: Timeline? Any hard deadlines?

Alex: I've got a second kid arriving soon, so I'm personally motivated to have something usable before that. But no hard external deadline — quality over speed. Let's focus on getting the core right.

Mike: Alright, so to summarize the MVP scope: sleep tracking via start/stop button with manual editing, a main screen showing current state and next sleep window, and a dynamic day plan that recalculates based on actual logged sleep. Notifications, multi-baby, caregiver sharing, and platform choice are all deferred.

Alex: That's it. Let's start with the spec and go from there.

Sara: I'll set up the project board. Let's reconvene once the spec is drafted.

Mike: Sounds good. Let's build it.
