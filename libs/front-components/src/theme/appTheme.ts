import { createTheme } from '@mui/material';
import { amber, cyan, red } from '@mui/material/colors';

export type AppColor = 'white' | 'amber' | 'cyan' | 'darkCyan';

declare module "@mui/material/styles" {
  interface Theme {
    appColors: Record<AppColor, string>;
  }

  interface ThemeOptions {
    appColors: Record<AppColor, string>;
  }
}

export const appTheme = createTheme({
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
  appColors: {
    white: '#fff',
    amber: amber[800],
    cyan: cyan[300],
    darkCyan: cyan[700],
  },
});