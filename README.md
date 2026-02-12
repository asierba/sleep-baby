# Sleepy Baby

A baby sleep tracking app built with React Native and Expo.

## Development

```bash
npm install
npm run web
```

| Script | Description |
|---|---|
| `npm run web` | Start Expo dev server for web |
| `npm run typecheck` | Run TypeScript compiler |
| `npm run lint` | Run ESLint |
| `npm run format` | Check Prettier formatting |
| `npm run format:fix` | Auto-fix Prettier formatting |
| `npm test` | Run Jest tests |

Pre-commit hooks (via [Husky](https://typicode.github.io/husky/)) run linting and tests automatically. Installed on `npm install`.

## Deployment

Pushes to `main` automatically build and deploy to [GitHub Pages](https://asierba.github.io/sleep-baby/) via GitHub Actions.
