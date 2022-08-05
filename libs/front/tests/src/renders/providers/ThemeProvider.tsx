import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import React, { PropsWithChildren } from 'react';

import { appTheme } from '@front/theme';

import { TestWrapper } from './types/test-wrapper.type';

export const ThemeProvider = (): TestWrapper => {
  const Wrapper = ({ children }: PropsWithChildren<unknown>) => (
    <MuiThemeProvider theme={appTheme}>{children}</MuiThemeProvider>
  );

  return Wrapper;
};
