import { Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

import { getAppColorFor } from '@front/theme';

export const SubTitle = ({ children }: PropsWithChildren<unknown>) => (
  <Typography
    variant="body1"
    sx={{
      color: getAppColorFor('amber'),
      textAlign: 'center',
    }}
  >
    {children}
  </Typography>
);
