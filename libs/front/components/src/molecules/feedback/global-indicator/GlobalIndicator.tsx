import { Box, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { alpha } from '@mui/material/styles';
import React from 'react';

import { spinKeyframe } from '../../../logic/keyframes/spin.keyframe';
import { getAppColorFor } from '../../../theme';

export type GlobalIndicatorProps = {
  hasTopMargin: boolean;
  title: string;
  Icon: OverridableComponent<SvgIconTypeMap>;
};

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
      color: alpha(getAppColorFor('darkCyan'), 0.8),
      marginTop: hasTopMargin ? 15 : 0,
    }}
  >
    <Icon
      sx={{
        height: 100,
        width: 100,
        animation: `${spinKeyframe} 1.3s linear`,
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
