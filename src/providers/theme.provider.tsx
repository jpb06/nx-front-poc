import { ThemeProvider as MUThemeProvider } from '@mui/material/styles';
import { PropsWithChildren } from 'react';

import { theme } from '@theme';

type Props = Record<never, never>;

export const ThemeProvider = ({ children }: PropsWithChildren<Props>) => {
  return <MUThemeProvider theme={theme}>{children}</MUThemeProvider>;
};
