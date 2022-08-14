import { Theme } from '@mui/material';
import { SxProps } from '@mui/system';

import { AppColor, appTheme } from '@front/theme';

export const withThemeColor = (color: AppColor): SxProps<Theme> => {
  return {
    color: appTheme.appColors[color],
  };
};
