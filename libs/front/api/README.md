# 🧩 `front-api-lib` lib 🧩

This library contains:

- Types extracted from the backend swagger.
- Axios wrappers.
- react-query wrappers.
- Queries and mutations used by our frontend(s).
- Msw handlers associated with these queries, to be used in integration tests and in our storybook stories.

## ⚡ CLI

| Description        | Command                      |
| ------------------ | ---------------------------- |
| ⚠️ Linting the app | `pnpm nx lint front-api-lib` |

### 🔶 Useful flags

| flag                 | Description                                        |
| -------------------- | -------------------------------------------------- |
| ⬛ `--skip-nx-cache` | disables nx caching; the command will be ran fully |
| ⬛ `--verbose`       | prints additional error stack trace on failure     |
