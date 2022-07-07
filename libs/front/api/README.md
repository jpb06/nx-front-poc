# 🧩 `front-api-lib` lib 🧩

This library contains:

- the types extracted from the backend swagger.
- The wrappers on axios.
- The wrappers on react-query.
- the queries and mutations used by our frontend(s).
- the msw handlers associated with these queries, to be used in integration tests and in our storybook stories.

## ⚡ CLI

| Description         | Command                                         |
| ------------------- | ----------------------------------------------- |
| ⚠️ Linting the app  | `pnpm exec nx run front-api-lib:lint`           |
| ⚙️ generating types | `pnpm exec nx run front-api-lib:generate-types` |

### 🔶 Useful flags

| flag                 | Description                                        |
| -------------------- | -------------------------------------------------- |
| ⬛ `--skip-nx-cache` | disables nx caching; the command will be ran fully |
| ⬛ `--verbose`       | prints additional error stack trace on failure     |
