import { Theme } from '@mui/material';
import { SxProps } from '@mui/system';

import { AppColor } from '../../../theme/types/app-color.type';
import { getAppColorFor } from '../../../theme/util/get-app-color-for';

export const withThemeColor = (color: AppColor): SxProps<Theme> => {
  const themeColor = getAppColorFor(color);

  return {
    color: themeColor,
  };
};
