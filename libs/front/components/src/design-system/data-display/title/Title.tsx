import { Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

import { appTheme } from '@front/theme';

export const Title = ({ children }: PropsWithChildren<unknown>) => (
  <Typography
    variant="h5"
    sx={{
      color: appTheme.appColors.darkCyan,
    }}
  >
    {children}
  </Typography>
);
