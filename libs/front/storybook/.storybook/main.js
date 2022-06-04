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

    config.resolve.fallback = {
      timers: require.resolve('timers-browserify'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      stream: require.resolve('stream-browserify'),
      zlib: require.resolve('browserify-zlib'),
    };
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'next-i18next': 'react-i18next',
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
