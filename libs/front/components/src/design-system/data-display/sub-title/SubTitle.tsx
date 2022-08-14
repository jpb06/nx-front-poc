import { Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

import { appTheme } from '@front/theme';

export const SubTitle = ({ children }: PropsWithChildren<unknown>) => (
  <Typography
    variant="body1"
    sx={{
      color: appTheme.appColors.amber,
      textAlign: 'center',
    }}
  >
    {children}
  </Typography>
);
