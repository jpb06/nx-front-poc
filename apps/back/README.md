# 🚀 `backend-app` app 🚀

Our backend app, relying on an in-memory dataset.

## ⚡ CLI

| Description                             | Command                              |
| --------------------------------------- | ------------------------------------ |
| 🛠️ Build                                | `pnpm exec nx run backend-app:build` |
| 🚀 Launching backend-append (port 3001) | `pnpm exec nx run backend-app:serve` |
| ⚠️ Linting the app                      | `pnpm exec nx run backend-app:lint`  |
| ✅ Launching tests                      | `pnpm exec nx run backend-app:test`  |

### 🔶 Useful flags

| flag                 | Description                                        |
| -------------------- | -------------------------------------------------- |
| ⬛ `--skip-nx-cache` | disables nx caching; the command will be ran fully |
| ⬛ `--verbose`       | prints additional error stack trace on failure     |
