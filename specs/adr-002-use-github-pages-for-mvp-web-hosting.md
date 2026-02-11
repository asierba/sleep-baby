# ADR-002: Use GitHub Pages for MVP Web Hosting

**Date:** 2026-02-11
**Status:** Accepted

## Context

The Sleepy Baby MVP needs static web hosting for the Expo web build. The web build serves as a testing environment during development — the primary distribution channel is the mobile app via app stores (ADR-001). The team needed a hosting provider that is free, simple, and low-friction for a trunk-based development workflow. The team also valued the learning opportunity of setting up GitHub Pages with GitHub Actions, a skill not yet in the team's repertoire.

## Decision

Use GitHub Pages with a GitHub Actions deployment workflow, because it is completely free, requires no additional vendor accounts, has zero lock-in for static builds, and provides a learning opportunity for the team.

Key aspects:
- **GitHub Actions workflow** — `npx expo export --platform web` builds static files, then deploys to GitHub Pages on push to `main`.
- **Hash routing** — Expo's default hash-based routing avoids SPA routing issues on GitHub Pages (no server-side rewrite needed).
- **No preview deployments** — acceptable for trunk-based development; not needed for MVP.
- **No custom domain** — the web build is for testing only; the default `*.github.io` URL is sufficient.

## Alternatives Considered

- **Vercel:** Team already has a free-tier account with a small frontend deployed. Excellent DX with automatic preview deployments and SPA routing support. Rejected because the team wanted the GitHub Pages learning experience, and Vercel's extra features (preview deploys, automatic SPA routing) are not needed for the MVP testing workflow. Easy to switch to later if needed.
- **Netlify:** Similar feature set to Vercel. Rejected because it would require a new account with no meaningful advantage over GitHub Pages for static hosting, and the team has no existing familiarity.
- **EAS Hosting (Expo):** Native Expo integration for web hosting. Rejected because it would deepen Expo ecosystem lock-in (already a concern from ADR-001) and is a relatively new, less mature service.

## Consequences

- Zero hosting cost — GitHub Pages has no bandwidth limits that matter for a testing-only web build.
- No new vendor accounts or services to manage — everything stays within GitHub.
- The team gains experience with GitHub Pages and GitHub Actions deployment workflows.
- Switching to another provider later is trivial — just change where the `dist/` folder is deployed.
- No preview deployments per PR — acceptable trade-off for trunk-based development, but may need revisiting if the team adopts feature branches later.
