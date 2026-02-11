# SB-000: Steel Thread — Project Scaffolding & Pipeline

## Description
Scaffold a React Native + Expo hello world app with a CI/CD pipeline that builds the web target and deploys it to a static hosting provider. Validates the full build-to-deploy chain before any feature work begins.

## Acceptance Criteria
- A React Native + Expo project is initialized with a hello world screen
- A CI/CD pipeline builds the Expo web target on every push to main
- The web build is deployed and accessible at a public URL
- The pipeline runs green end-to-end with the hello world app
