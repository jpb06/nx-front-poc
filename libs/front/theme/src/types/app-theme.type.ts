import { Theme } from '@mui/material';

import { AppColor } from './app-color.type';

export interface AppTheme extends Theme {
  appColors: {
    [key in AppColor]: string;
  };
}
