import { appTheme } from '../app-theme';
import { AppColor } from '../types/app-color.type';

export const getAppColorFor = (color: AppColor): string =>
  appTheme.appColors[color];
