# 🧩 `front-storybook` lib 🧩

Our library responsible for building storybook and launching it in dev mode.

## ⚡ CLI

|                 Description                           |           Command                                                     |
| ------------------------------------------------ | --------------------------------------------------------------------- |
| 🛠️ Building storybook |`NODE_ENV=production pnpm exec nx run storybook:build`|
| 🎁 Launching storybook in dev mode |`pnpm exec nx run storybook:dev`|

### 🔶 Useful flags

| flag                                           | Description                                                               |
| ------------------------------------------------ | --------------------------------------------------------------------- |
| ⬛  `--skip-nx-cache`  | disables nx caching; the command will be ran fully |
| ⬛  `--verbose`  | prints additional error stack trace on failure
