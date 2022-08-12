import { Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

import { getAppColorFor } from '@front/theme';

export const Title = ({ children }: PropsWithChildren<unknown>) => (
  <Typography
    variant="h5"
    sx={{
      color: getAppColorFor('darkCyan'),
    }}
  >
    {children}
  </Typography>
);
