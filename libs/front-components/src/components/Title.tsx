import { Typography } from '@mui/material';
import { useAppColor } from '../utils/useAppColor';

export const Title: React.FC = ({ children }) => (
  <Typography
    variant="h5"
    sx={{
      color: useAppColor('darkCyan'),
    }}
  >
    {children}
  </Typography>
);
