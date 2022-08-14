import { Box, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { alpha } from '@mui/material/styles';
import { PropsWithChildren } from 'react';

import { spinKeyframe } from '@front/logic';
import { appTheme } from '@front/theme';

export type GlobalIndicatorProps = {
  hasTopMargin: boolean;
  title: string;
  Icon: OverridableComponent<SvgIconTypeMap>;
};

export const GlobalIndicator = ({
  hasTopMargin,
  title,
  Icon,
  children,
}: PropsWithChildren<GlobalIndicatorProps>) => (
  <Box
    component="div"
    sx={{
      textAlign: 'center',
      color: alpha(appTheme.appColors.darkCyan, 0.8),
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
