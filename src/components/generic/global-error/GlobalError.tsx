import { Box, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { cyan } from '@mui/material/colors';
import { alpha } from '@mui/material/styles';
import React from 'react';

interface GlobalErrorProps {
  hasTopMargin: boolean;
  title: string;
  Icon: OverridableComponent<SvgIconTypeMap>;
}

export const GlobalError: React.FC<GlobalErrorProps> = ({
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
        animationName: '$spin',
        animationDuration: '600ms',
        animationIterationCount: '1',
        animationTimingFunction: 'linear',
      }}
    />
    <Box
      component="div"
      sx={{
        fontSize: 'xx-large',
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
