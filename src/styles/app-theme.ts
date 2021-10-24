import { createTheme, Theme } from '@mui/material';
import { amber, cyan, red } from '@mui/material/colors';

export type AppColor = 'white' | 'amber' | 'cyan' | 'darkCyan';

export interface AppTheme extends Theme {
  appColors: {
    [key in AppColor]: string;
  };
}

export const theme: AppTheme = {
  ...createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: cyan[900],
      },
      secondary: {
        main: red[900],
      },
      background: { paper: '#1e1e3a' },
    },
  }),
  appColors: {
    white: '#fff',
    amber: amber[800],
    cyan: cyan[300],
    darkCyan: cyan[700],
  },
};

export const getAppColorFor =
  (color: AppColor) =>
  (theme: Theme): string =>
    (theme as AppTheme).appColors[color];
