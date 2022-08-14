# 🚀 `frontend-app` app 🚀

Our frontend app, containing a signup form.

## ⚡ CLI

| Description                              | Command                           |
| ---------------------------------------- | --------------------------------- |
| 🛠️ Build                                 | `pnpm nx build frontend-app`      |
| 🚀 Launching frontend-append (port 3000) | `pnpm nx serve frontend-app`      |
| ⚠️ Linting the app                       | `pnpm nx lint frontend-app`       |
| ✔️ Type checking using tsc               | `pnpm nx type-check frontend-app` |
| ✅ Launching tests                       | `pnpm nx test frontend-app`       |
| 🕵️ Run sonarcloud command                | `pnpm nx sonar frontend-app`      |

### 🔶 Useful flags

| flag                 | Description                                        |
| -------------------- | -------------------------------------------------- |
| ⬛ `--skip-nx-cache` | disables nx caching; the command will be ran fully |
| ⬛ `--verbose`       | prints additional error stack trace on failure     |

### 🔶 Tests flags

#### 🧿 Launching tests in watch mode:

```bash
pnpm nx test frontend-app --watch
```

#### 🧿 Launching all tests in watch mode:

```bash
pnpm nx test frontend-app --watchAll
```

#### 🧿 Targetting a set of tests (spec files in that example):

```bash
pnpm nx test frontend-app --testFile=spec
```
