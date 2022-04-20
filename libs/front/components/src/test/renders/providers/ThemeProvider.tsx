import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import React, { PropsWithChildren } from 'react';

import { appTheme } from '../../../theme/app-theme';
import { TestWrapper } from './types/test-wrapper.type';

export const ThemeProvider = (): TestWrapper => {
  const Wrapper = ({ children }: PropsWithChildren<unknown>) => {
    return <MuiThemeProvider theme={appTheme}>{children}</MuiThemeProvider>;
  };

  return Wrapper;
};
