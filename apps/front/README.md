# 🚀 `front` app 🚀

Our frontend app, containing a signup form.

## ⚡ CLI

|                 Description                           |           Command                                                     |
| ------------------------------------------------ | --------------------------------------------------------------------- |
| 🛠️ Build  |`pnpm exec nx run front:build`|
| 🚀 Launching frontend (port 3000) |`pnpm exec nx run front:serve`|
| ⚠️ Linting the app |`pnpm exec nx run front:lint`|
| ✔️ Type checking using tsc |`pnpm exec nx run front:type-check`|
| ✅ Launching tests |`pnpm exec nx run front:test`|
| 🕵️ Run sonarcloud command |`pnpm exec nx run front:sonar`|

### 🔶 Useful flags

| flag                                           | Description                                                               |
| ------------------------------------------------ | --------------------------------------------------------------------- |
| ⬛  `--skip-nx-cache`  | disables nx caching; the command will be ran fully |
| ⬛  `--verbose`  | prints additional error stack trace on failure
