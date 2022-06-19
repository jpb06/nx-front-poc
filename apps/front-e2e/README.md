# 🚀 `front-e2e-app` app 🚀

Cypress tests for our `front` app

## ⚡ CLI

| Description                                 | Command                                      |
| ------------------------------------------- | -------------------------------------------- |
| ⚠️ Linting the app                          | `pnpm exec nx run front-e2e-app:lint`        |
| ✅ Launching end to end tests               | `pnpm exec nx run front-e2e-app:e2e`         |
| ✅ Launching end to end tests in watch mode | `pnpm exec nx run front-e2e-app:e2e --watch` |

### 🔶 Useful flags

| flag                 | Description                                        |
| -------------------- | -------------------------------------------------- |
| ⬛ `--skip-nx-cache` | disables nx caching; the command will be ran fully |
| ⬛ `--verbose`       | prints additional error stack trace on failure     |
