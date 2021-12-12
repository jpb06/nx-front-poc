import { Typography } from '@mui/material';

import { getAppColorFor } from '@styles/app-theme';

export const SubTitle: React.FC = ({ children }) => (
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
