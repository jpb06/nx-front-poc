import CssBaseline from '@mui/material/CssBaseline';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { initialize, mswDecorator } from 'msw-storybook-addon'
import { withNextRouter } from '@gogaille/storybook-addon-next-router'

import { appTheme } from '@theme';

import { AppThemeProvider } from "./../../components/src/molecules/providers/app-theme.provider"

// Initialize MSW
initialize({ onUnhandledRequest: 'bypass' });

export const parameters = {
  backgrounds: {
    default: 'dark'
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'iphone12',
  },
  controls: { sort: 'requiredFirst' },
  actions: { argTypesRegex: '^on[A-Z].*' },
  msw: {
    handlers: {},
  },
}

export const decorators = [
  (Story, context) => (
    <>
      <meta name="theme-color" content={appTheme.palette.primary.main} />
      <AppThemeProvider>
        <CssBaseline />
        <Story />
      </AppThemeProvider>
    </>
  ),
    withNextRouter({
      pathname: 'storybook',
      push() {},
      query: {},
      events: {
        on: () => {},
        off: () => {},
      },
    }),
    mswDecorator,
]

