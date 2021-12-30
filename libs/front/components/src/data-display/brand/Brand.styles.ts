import { Theme } from '@mui/material';
import { SxProps } from '@mui/system';

import { AppColor, getAppColorFor } from '@theme';

export const withThemeColor = (color: AppColor): SxProps<Theme> => {
  const themeColor = getAppColorFor(color);

  return {
    color: themeColor,
  };
};
