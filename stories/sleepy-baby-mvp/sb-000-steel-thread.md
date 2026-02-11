# SB-000: Steel Thread — Project Scaffolding & Pipeline

## Description
Scaffold a React Native + Expo hello world app with a CI/CD pipeline that builds the web target and deploys it to GitHub Pages (ADR-002). Validates the full build-to-deploy chain before any feature work begins.

## Acceptance Criteria
- A React Native + Expo project is initialized with a hello world screen
- A CI/CD pipeline builds the Expo web target on every push to main
- The pipeline runs linting and tests before deploying
- The web build is deployed and accessible at a public GitHub Pages URL
- The pipeline runs green end-to-end with the hello world app
