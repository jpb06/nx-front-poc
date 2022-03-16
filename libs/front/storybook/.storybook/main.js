const tsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

/** @type {import("@storybook/react/types/index").StorybookConfig} */
const storybookMainConfig = {
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-viewport',
    '@storybook/addon-links',
    'storybook-addon-next-router',
    'storybook-dark-mode',
    'storybook-react-i18next',
  ],
  stories: [
    '../../../../**/*.stories.mdx', 
    '../../../../**/*.stories.tsx'
  ],
  staticDirs: [
    '../../../../apps/front/public',
    '../../../../libs/front/components/assets',
  ],
  webpackFinal: async (config) => {
    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new tsconfigPathsPlugin({
        configFile: './libs/front/storybook/.storybook/tsconfig.json',
        extensions: config.resolve.extensions,
      }),
    ];

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'next-i18next': 'react-i18next',
    }

    return config;
  },
  features: { emotionAlias: false },
};

// No way to use @nrwl/react/plugins/storybook for now, since it relies on webpack 5. See:
// https://github.com/mswjs/msw-storybook-addon/issues/58
// https://github.com/mswjs/msw-storybook-addon/issues/47

// const storybookMainConfig = {
//   addons: [
//     '@storybook/addon-essentials',
//     '@nrwl/react/plugins/storybook',
//     '@storybook/addon-viewport',
//     '@storybook/addon-links'
//   ],
//   core: { builder: 'webpack5' },
//   stories: [
//     '../../../../**/*.stories.mdx',
//     '../../../../**/*.stories.tsx',
//   ],
//   staticDirs: [
//     '../../../../apps/front/public',
//     '../../../../libs/front/components/assets'
//   ],
//   features: { emotionAlias: false },
// }

module.exports = storybookMainConfig;
