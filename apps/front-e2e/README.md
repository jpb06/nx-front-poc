# 🚀 `front-e2e` app 🚀

Cypress tests for our `front` app

## ⚡ CLI

| Description                                 | Command                                  |
| ------------------------------------------- | ---------------------------------------- |
| ⚠️ Linting the app                          | `pnpm exec nx run front-e2e:lint`        |
| ✅ Launching end to end tests               | `pnpm exec nx run front-e2e:e2e`         |
| ✅ Launching end to end tests in watch mode | `pnpm exec nx run front-e2e:e2e --watch` |

### 🔶 Useful flags

| flag                 | Description                                        |
| -------------------- | -------------------------------------------------- |
| ⬛ `--skip-nx-cache` | disables nx caching; the command will be ran fully |
| ⬛ `--verbose`       | prints additional error stack trace on failure     |

### WIP cucumber

pnpm way :

```bash
pnpm nx run front-e2e:e2e -e TAGS="@Cool" --skip-nx-cache
pnpm nx run front-e2e:e2e --env.TAGS="@Cool" --skip-nx-cache
```

Trying to use cypress-tags:

```bash
./node_modules/.bin/cypress-tags run -e TAGS="@Cool"
```

Issue with cypress-tags: [Reading cypress config](https://github.com/TheBrainFamily/cypress-cucumber-preprocessor/blob/7031d0283330bca814d6923d35d984224622b4cf/cypress-tags.js#L33).

Issues :

- [nx](https://github.com/nrwl/nx/search?q=cucumber&type=issues)
- [cucumber preprocessor](https://github.com/TheBrainFamily/cypress-cucumber-preprocessor/search?q=monorepo&type=issues)
