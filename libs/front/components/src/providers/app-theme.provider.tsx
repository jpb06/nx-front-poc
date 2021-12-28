import { ThemeProvider as MUThemeProvider } from '@mui/material/styles';
import { PropsWithChildren } from 'react';

import { appTheme } from '@front/theme';

type Props = Record<never, never>;

export const AppThemeProvider = ({
  children,
}: PropsWithChildren<Props>): JSX.Element => {
  return <MUThemeProvider theme={appTheme}>{children}</MUThemeProvider>;
};
