# ⚡ Storybook

## 🔶 Why using storybook?

Storybook is a great tool. We can use it to help both developers and our product team.

### 🧿 Better visibility on existing features

It's easier for the dev team to find out if a component already exists and if it fits the new use case we need to implement. Developers can also better understand how a component is meant to be used and if edge cases are taken into account.

### 🧿 Giving visibility to the product team

We can use storybook to demonstrate each part of our work to the product team. The idea is to break down user stories in milestones that can be independently validated.

Let's take an example:
I was given a signup feature to deliver. We have a few questions to address during the conception phase:

#### 🔻 Interactions with our backend(s)

> Which endpoints will be called and what will be their input and output?

#### 🔻 Components tree

> Following the [atomic design](./frontend-architecture.md) architecture, what kind of components tree do we need?
>
> ❇️ Will we use contexts? Why?
>
> ❇️ Will we use atomic state (jotai)?
>
> ❇️ Will we use some generic components or shared hooks, and if so which ones?
>
> ❇️ Will we need local state? At which level of the tree?
>
> ❇️ What will be the level of genericity or specialization of each component or hook?
>
> > Generic being used in several apps, specialized being used only in that story.

#### 🔻 Technical debt

> ❇️ Are we sure everything is at the right level? Should we refactor existing code to limit specialization ?
>
> > The more specialized code we add, the bigger our codebase becomes. This is usually not desirable because it means our maintenance perimenter is increased. There is cases when factorization is actually a **bad move** however. For example when we are talking about functionally distinct things that will have unrelated maintenance agendas.
>
> ❇️ Is what we just designed easy to understand and to alter?
>
> > `A plan that cannot be changed is a bad one.` and all that sort of things.

etc, etc.

But let's focus on the component tree for now. Doing it allows us to easily define our delivery milestones:

![Diagram](./assets/signup.png)

In our example, and following [this plan](./frontend-architecture.md), we can demonstrate one template (the final delivery), two organisms and two molecules (milestones).

These are the specialized elements for our story while others are generic items that may already exist in our codebase. Of course, if we have to create a generic component, we would have to add it to storybook and get it validated as well then!

## 🔶 Storybook categories

The point is to have only one storybook for all our ecosystem, that may be made of several apps. That storybook will also contain generic components defined in libraries.

We can follow the following diagram to organize stories within storybook:

![Diagram](./assets/storybook.png)

## 🔶 Setting up storybook

### 🧿 Creating a library

The first step is to create a library with the `@nrwl/node` plugin:

```bash
pnpm nx g @nrwl/node:lib storybook
```

### 🧿 Configuring storybook

The next step is to configure storybook. Storybook configuration is defined in a `.storybook` folder that is typically at repo root level. In our case, we will create it in our new library.

### Tweaking storybook config

The main part of the configuration is defined in the `main.js` file. Our goal here is to include the stories of all our apps and our libs. We also need to include static files defined in the `public` folder of next apps and in the `assets` of our libs.

```js
const tsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

/** @type {import("@storybook/react/types/index").StorybookConfig} */
const storybookMainConfig = {
  // Defining our add-ons
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-viewport',
    '@storybook/addon-links',
    'storybook-addon-next-router',
    'storybook-dark-mode',
    'storybook-react-i18next',
  ],
  // Pulling stories from all the folders of the repo
  stories: ['../../../../**/*.stories.mdx', '../../../../**/*.stories.tsx'],
  // Including static files (images for example)
  staticDirs: [
    '../../../../apps/front/public',
    '../../../../libs/front/components/assets',
  ],
  webpackFinal: async (config) => {
    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      // Handling typescript
      new tsconfigPathsPlugin({
        configFile: './libs/front/storybook/.storybook/tsconfig.json',
        extensions: config.resolve.extensions,
      }),
    ];

    // [...]

    return config;
  },
  features: { emotionAlias: false },
};
```

### 🧿 Defining library tasks

Finally, let's define the tasks that can be executed for our library. We want to be able to build storybook and launch it in dev mode. We can use `@nrwl/storybook` for this:

project.json

```json
{
  "root": "libs/front/storybook",
  "projectType": "library",
  "targets": {
    "dev": {
      "executor": "@nrwl/storybook:storybook",
      "options": {
        "uiFramework": "@storybook/react",
        "port": 4400,
        "config": {
          "configFolder": "libs/front/storybook/.storybook"
        }
      },
      "configurations": {
        "ci": {
          "quiet": true
        }
      }
    },
    "build": {
      "executor": "@nrwl/storybook:build",
      "outputs": ["{options.outputPath}"],
      "options": {
        "uiFramework": "@storybook/react",
        "outputPath": "dist/apps/storybook",
        "config": {
          "configFolder": "libs/front/storybook/.storybook"
        }
      },
      "configurations": {
        "ci": {
          "quiet": true
        }
      }
    }
  },
  "tags": []
}
```

Cool! Now we can use the following commands:

```bash
// Launching storybook in watch mode (dev)
pnpm nx run storybook:dev

// Building storybook
pnpm nx run storybook:build
```
