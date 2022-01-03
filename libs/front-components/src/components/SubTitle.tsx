import { Typography } from '@mui/material';
import { useAppColor } from '../utils/useAppColor';

export const SubTitle: React.FC = ({ children }) => (
  <Typography
    variant="body1"
    sx={{
      color: useAppColor('amber'),
      textAlign: 'center',
    }}
  >
    {children}
  </Typography>
);
