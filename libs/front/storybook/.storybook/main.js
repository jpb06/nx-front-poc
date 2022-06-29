const rootMain = require('../../../../.storybook/main');

/** @type {import("@storybook/react/types/index").StorybookConfig} */
const storybookMainConfig = {
  ...rootMain,

  core: { ...rootMain.core, builder: 'webpack5' },

  stories: [
    ...rootMain.stories,
    '../../../../**/*.stories.mdx',
    '../../../../**/*.stories.tsx',
  ],
  staticDirs: [
    '../../../../apps/front/public',
    '../../../../libs/front/components/assets',
  ],
  addons: [...rootMain.addons, '@nrwl/react/plugins/storybook'],
  webpackFinal: async (config, { configType }) => {
    // apply any global webpack configs that might have been specified in .storybook/main.js
    if (rootMain.webpackFinal) {
      config = await rootMain.webpackFinal(config, { configType });
    }

    /**
     * Fixes issue with `next-i18next` and is ready for webpack@5
     * @see https://github.com/isaachinman/next-i18next/issues/1012#issuecomment-792697008
     * @see https://github.com/storybookjs/storybook/issues/4082#issuecomment-758272734
     * @see https://webpack.js.org/migrate/5/
     */
    config.resolve.fallback = {
      fs: false,
      http: false,
      https: false,
      timers: false,
      stream: false,
      zlib: false,
      path: false, //require.resolve('path-browserify'),
    };

    return config;
  },
  features: { emotionAlias: false },
  env: (config) => ({
    ...config,
    NEXT_PUBLIC_API_URL: 'https://rhf-mui-nx-sandbox-api.com',
  }),
};

module.exports = storybookMainConfig;
