import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import { AppThemeProvider } from "./../src/providers/app-theme.provider"

export const parameters = {
  backgrounds: {
    default: 'dark'
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'iphone12',
  },
};

export const decorators = [
  (Story, context) => (
    <AppThemeProvider><Story /></AppThemeProvider>
  )
]


