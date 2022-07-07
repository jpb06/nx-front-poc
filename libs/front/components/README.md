# 🧩 `front-components-lib` lib 🧩

Our shared components, to be used in several apps.

## ⚡ CLI

| Description                | Command                                       |
| -------------------------- | --------------------------------------------- |
| ⚠️ Linting the app         | `pnpm nx run front-components-lib:lint`       |
| ✔️ Type checking using tsc | `pnpm nx run front-components-lib:type-check` |
| ✅ Launching tests         | `pnpm nx run front-components-lib:test`       |
| 🕵️ Run sonarcloud command  | `pnpm exec nx run front-components-lib:sonar` |

### 🔶 Useful flags

| flag                 | Description                                        |
| -------------------- | -------------------------------------------------- |
| ⬛ `--skip-nx-cache` | disables nx caching; the command will be ran fully |
| ⬛ `--verbose`       | prints additional error stack trace on failure     |
