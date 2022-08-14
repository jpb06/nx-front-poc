# 🧩 `front-logic-lib` lib 🧩

Our shared logic, to be used in several apps.

## ⚡ CLI

| Description                | Command                                  |
| -------------------------- | ---------------------------------------- |
| ⚠️ Linting the app         | `pnpm nx run lint front-logic-lib`       |
| ✔️ Type checking using tsc | `pnpm nx run type-check front-logic-lib` |
| ✅ Launching tests         | `pnpm nx run test front-logic-lib`       |
| 🕵️ Run sonarcloud command  | `pnpm nx run sonar front-logic-lib`      |

### 🔶 Useful flags

| flag                 | Description                                        |
| -------------------- | -------------------------------------------------- |
| ⬛ `--skip-nx-cache` | disables nx caching; the command will be ran fully |
| ⬛ `--verbose`       | prints additional error stack trace on failure     |

### 🔶 Tests flags

#### 🧿 Launching tests in watch mode:

```bash
pnpm nx test front-logic-lib --watch
```

#### 🧿 Launching all tests in watch mode:

```bash
pnpm nx test front-logic-lib --watchAll
```

#### 🧿 Targetting a set of tests (spec files in that example):

```bash
pnpm nx test front-logic-lib --testFile=spec
```
