# SB-000: Steel Thread — Project Scaffolding & Pipeline

## Description
Scaffold a React Native + Expo hello world app in TypeScript with a CI/CD pipeline that builds the web target and deploys it to GitHub Pages (ADR-002). Includes code quality tooling — ESLint + Prettier (ADR-003) and Jest + React Native Testing Library (ADR-004). Validates the full build-to-deploy chain before any feature work begins.

## Acceptance Criteria
- A React Native + Expo project is initialized with a hello world screen in TypeScript
- ESLint and Prettier are configured and pass with zero errors/warnings (ADR-003)
- Jest and React Native Testing Library are configured with at least one passing test (ADR-004)
- TypeScript compiles with strict mode enabled
- A pre-commit git hook runs linting and tests before each commit (Husky + lint-staged)
- A CI/CD pipeline builds the Expo web target on every push to main
- The pipeline runs TypeScript compilation, linting, and tests before deploying
- The web build is deployed and accessible at a public GitHub Pages URL
- The pipeline runs green end-to-end with the hello world app
