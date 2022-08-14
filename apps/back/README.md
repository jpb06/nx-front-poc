# 🚀 `backend-app` app 🚀

Our backend app, relying on an in-memory dataset.

## ⚡ CLI

| Description                                                                         | Command                             |
| ----------------------------------------------------------------------------------- | ----------------------------------- |
| ⚙️ Writing the swagger json spec of the backend in `libs/api/src/swaggers`          | `pnpm nx swagger-file backend-app`  |
| ⚙️ Generating api types from the swagger file written using `swagger-file` task     | `pnpm nx api-types backend-app`     |
| 🛠️ Build                                                                            | `pnpm nx build backend-app`         |
| 🛠️ Building the app to launch it in dry run mode, just to generate the swagger spec | `pnpm nx build-swagger backend-app` |
| 🚀 Launching backend-append (port 3001)                                             | `pnpm nx serve backend-app`         |
| ⚠️ Linting the app                                                                  | `pnpm nx lint backend-app`          |
| ✅ Launching tests                                                                  | `pnpm nx test backend-app`          |

### 🔶 Useful flags

| flag                 | Description                                        |
| -------------------- | -------------------------------------------------- |
| ⬛ `--skip-nx-cache` | disables nx caching; the command will be ran fully |
| ⬛ `--verbose`       | prints additional error stack trace on failure     |
