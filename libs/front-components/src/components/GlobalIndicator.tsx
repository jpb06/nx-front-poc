import { Box, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { cyan } from '@mui/material/colors';
import { alpha } from '@mui/material/styles';
import { keyframes } from '@mui/styled-engine';
import React from 'react';

interface GlobalIndicatorProps {
  hasTopMargin: boolean;
  title: string;
  Icon: OverridableComponent<SvgIconTypeMap>;
}

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const GlobalIndicator: React.FC<GlobalIndicatorProps> = ({
  hasTopMargin,
  title,
  Icon,
  children,
}) => (
  <Box
    component="div"
    sx={{
      textAlign: 'center',
      color: alpha(cyan[700], 0.8),
      marginTop: hasTopMargin ? 15 : 0,
    }}
  >
    <Icon
      sx={{
        height: 100,
        width: 100,
        animation: `${spin} 2s linear infinite`,
      }}
    />
    <Box
      component="div"
      sx={{
        fontSize: 'x-large',
        fontWeight: '600',
      }}
    >
      {title}
    </Box>
    <Box component="span" sx={{ color: 'white' }}>
      {children}
    </Box>
  </Box>
);
