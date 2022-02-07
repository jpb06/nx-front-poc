# 🔥 mui-rhf-sandbox 🔥

[![Front deployment](https://img.shields.io/github/deployments/jpb06/mui-rhf-sandbox/production?label=front%20deploy&logo=vercel&logoColor=white)](https://mui-rhf-sandbox.vercel.app/)
[![Back deployment](https://img.shields.io/github/deployments/jpb06/mui-rhf-sandbox/rhf-mui-nx-sandbox-back?label=back%20deploy&logo=heroku&logoColor=dodgerblue)](https://rhf-mui-nx-sandbox-back.herokuapp.com/)
![Github workflow](https://img.shields.io/github/workflow/status/jpb06/mui-rhf-sandbox/tests%20and%20sonarcloud%20scan?label=last%20workflow&logo=github-actions)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=jpb06_mui-rhf-sandbox&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jpb06_mui-rhf-sandbox)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=jpb06_mui-rhf-sandbox&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=jpb06_mui-rhf-sandbox)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=jpb06_mui-rhf-sandbox&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=jpb06_mui-rhf-sandbox)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=jpb06_mui-rhf-sandbox&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=jpb06_mui-rhf-sandbox)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=jpb06_mui-rhf-sandbox&metric=coverage)](https://sonarcloud.io/summary/new_code?id=jpb06_mui-rhf-sandbox)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=jpb06_mui-rhf-sandbox&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=jpb06_mui-rhf-sandbox)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=jpb06_mui-rhf-sandbox&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=jpb06_mui-rhf-sandbox)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=jpb06_mui-rhf-sandbox&metric=bugs)](https://sonarcloud.io/summary/new_code?id=jpb06_mui-rhf-sandbox)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=jpb06_mui-rhf-sandbox&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jpb06_mui-rhf-sandbox)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=jpb06_mui-rhf-sandbox&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=jpb06_mui-rhf-sandbox)
![Last commit](https://img.shields.io/github/last-commit/jpb06/mui-rhf-sandbox?logo=git)

Here is a little POC to help our team move forward with our stack! ✨

## ⚡ Getting started

```bash
# using fnm to set node version - https://github.com/Schniz/fnm
fnm use

# Installing dependencies
pnpm i

# starting backend and frontend in parallel
pnpm dev front,back
# on windows 
pnpm dev "front,back"

# run all tests
pnpm test-all

# launch cypress tests in watch mode
pnpm nx run front-e2e:e2e --watch

# launch storybook locally
pnpm nx run front-components:storybook
```

## ⚡ Managing multiple apps and their shared code

We will be using [Nx](https://nx.dev) to make sure we can use several frontend apps, and to share code between them. Nx also has a cloud service that does pretty cool stuffs, like caching runs results, allowing us to save a lot of time for parts of the codebase that had no changes.

## ⚡ Subjects

### 🔶 [Forms handling](./docs/react-hook-form.md)

### 🔶 [Storybook](./docs/storybook.md)

### 🔶 [Tests](./docs/tests.md)

### 🔶 [Cypress](./docs/cypress.md)

## ⚡ Projects

|                 Project                           |           Description                                                     |
| ------------------------------------------------ | --------------------------------------------------------------------- |
| 🚀 [`front`](./apps/front/README.md) app  | Our frontend app, containing a signup form |
| 🚀 [`front-e2e`](./apps/front-e2e/README.md) app  | Our end to end testing code using cypress |
| 🚀 [`back`](./apps/back/README.md) app  | Our backend app, relying on an in-memory dataset|
| 🧩 [`front-api`](./libs/front/api/README.md) lib  |Our api types, extracted from the backend swagger|
| 🧩 [`front-components`](./libs/front/components/README.md) lib  |Our generic components and the MUI theme shared by all our frontend apps|
| 🧩 [`front-tests`](./libs/front/tests/README.md) lib  |Tests utils for both the front app and the generic components lib|
| 🧩 [`front-translations`](./libs/front/translations/README.md) lib  |Stub implementation for the translation of our UI.|

## ⚡ CLI

### 🔶 nx CLI

nx comes with [its own CLI](https://nx.dev/l/n/getting-started/nx-cli). Here is a short list of commands that may be handy:

| Description                                           | Command                                                               |
| ------------------------------------------------ | --------------------------------------------------------------------- |
| 🆘 Get help!!!| `pnpm nx help` |
| 🚀 Run backend and frontend locally                  | `pnpm dev "front,back"` or `nx run-many --target=serve --projects="front,back" --parallel`                                              |
| ▶️ Run an action on one project                             | `pnpm nx run <project>:<action>`           |
| ▶️ Run an action on all projects                             | `pnpm nx run-many --target=<action> --all`           |
| ▶️ Run an action on a set of projects                         | `pnpm nx run-many --target=<action> --projects=<project1>,<project2>`              |
| ▶️ Run an action only on projects containing changes | `pnpm nx affected:<action>`                                              |
| ✅ Run tests for a project (watch)         | `pnpm test-changes <project>` or `pnpm nx test --project=<project> --watch`                                        |
| ✅ Run all tests for a project (watchAll)     | `pnpm test-dev <project>` or `pnpm nx test --project=<project> --watchAll`                                                |
| ✅ Run all tests                                  | `pnpm test-all` or `pnpm nx run-many --target=test --parallel --all`                                                       |
| 🗃️ Create a new front app or lib                           | `pnpm nx g @nrwl/react:app <appname>` or  `pnpm nx g @nrwl/react:lib <appname>`                                                  |
| 🗃️ Create a new backend app or lib                            | `pnpm nx g @nrwl/nest:app <appname>` or `pnpm nx g @nrwl/nest:lib <appname>`                                                   |
| 🗃️ Create a vanilla node lib                            | `pnpm nx g @nrwl/node:lib <libname>`                                                   |
| 📊 Dependencies graph                             | `pnpm nx dep-graph`                                                   |

### 🔶 Actions

Actions are defined by project in `project.json` files. Here are a few standard actions:

| Action                                           | Description                                                               |
| ------------------------------------------------ | --------------------------------------------------------------------- |
| 🛠️ build  | Builds the app/lib. Use `--prod` flag for a production build |
| 🚀 serve  | Runs the app  |
| ⚠️ lint  | Run the linter against project files  |
| ✔️ type-check  | Uses `tsc --noEmit` to validate types against project files |
| ✅ test  | Runs tests |
| ☑️ e2e  | Runs end to end tests |

### 🔶 Useful flags

| flag                                           | Description                                                               |
| ------------------------------------------------ | --------------------------------------------------------------------- |
| ⬛  `--target=x`  | specifies which action to run |
| ⬛  `--skip-nx-cache`  | disables nx caching; the command will be ran fully |
| ⬛  `--verbose`  | prints additional error stack trace on failure
| ⬛  `--projects=x,x`  | `run-many`: specifies which projects to run the action against |
| ⬛  `--parallel=x`  | `run-many`: allows x tasks to be ran in parallel |
