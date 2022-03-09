/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import CssBaseline from '@mui/material/CssBaseline';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { themes } from '@storybook/theming';

import { appTheme } from '@theme';

import { AppThemeProvider } from './../../components/src/molecules/providers/app-theme.provider';

// Initialize MSW
initialize({ onUnhandledRequest: 'bypass' });

export const parameters = {
  backgrounds: {
    default: 'dark',
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
  nextRouter: {
    Provider: RouterContext.Provider,
  },
  darkMode: {
    dark: { ...themes.dark, appBg: 'black' },
    light: { ...themes.normal, appBg: 'lightgrey' },
  },
};

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
  mswDecorator,
];
