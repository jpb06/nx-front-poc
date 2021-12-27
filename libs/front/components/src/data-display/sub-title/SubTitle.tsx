import { Typography } from '@mui/material';

import { getAppColorFor } from '@front/theme';

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
