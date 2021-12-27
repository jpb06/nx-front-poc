import { Typography } from '@mui/material';

import { getAppColorFor } from '@front/theme';

export const Title: React.FC = ({ children }) => (
  <Typography
    variant="h5"
    sx={{
      color: getAppColorFor('darkCyan'),
    }}
  >
    {children}
  </Typography>
);
