/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import CssBaseline from '@mui/material/CssBaseline';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { themes } from '@storybook/theming';

import { appTheme } from '@front/theme';
import { AppThemeProvider } from '@front/components/molecules';
import { WithSnackbar } from '@front/components/organisms';

import { i18n } from './i18next';

// Initialize MSW
initialize({
  onUnhandledRequest: 'bypass',
  serviceWorker: {
    url: `./mockServiceWorker.js`,
    options: { scope: '/' },
  },
});

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
  i18n,
  locale: 'en',
  locales: {
    en: { right: '🇬🇧', title: 'English' },
    fr: { right: '🇫🇷', title: 'Français' },
  },
};

export const decorators = [
  mswDecorator,
  (Story, context) => (
    <>
      <meta name="theme-color" content={appTheme.palette.primary.main} />
      <AppThemeProvider>
        <WithSnackbar>
          <CssBaseline />
          <Story />
        </WithSnackbar>
      </AppThemeProvider>
    </>
  ),
];
