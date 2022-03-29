import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import React from 'react';

import { appTheme } from '../../../theme/app-theme';
import { WrapperResult } from './types/wrapper-result.type';

export const ThemeProvider = (): WrapperResult => {
  const Wrapper: React.FC = ({ children }) => {
    return <MuiThemeProvider theme={appTheme}>{children}</MuiThemeProvider>;
  };

  return { wrapper: Wrapper };
};
