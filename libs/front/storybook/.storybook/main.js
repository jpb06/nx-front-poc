/** @type {import("@storybook/react/types/index").StorybookConfig} */
const storybookMainConfig = {
  addons: [
    '@storybook/addon-essentials',
    '@nrwl/react/plugins/storybook', 
    '@storybook/addon-viewport', 
    '@storybook/addon-links'
  ],
  core: { builder: 'webpack5' },
  stories: [
    '../../../../**/*.stories.mdx',
    '../../../../**/*.stories.tsx',
  ],
  staticDirs: [
    '../../../../apps/front/public', 
    '../../../../libs/front/components/assets'
  ],
  webpackFinal: async (config, { configType }) => {
    return config;
  },
  features: { emotionAlias: false },
}

module.exports = storybookMainConfig