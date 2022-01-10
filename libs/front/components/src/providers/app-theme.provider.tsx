import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { PropsWithChildren } from 'react';

import { appTheme } from '@theme';

type Props = Record<never, never>;

export const AppThemeProvider = ({
  children,
}: PropsWithChildren<Props>): JSX.Element => {
  return <MUIThemeProvider theme={appTheme}>{children}</MUIThemeProvider>;
};
