import { theme } from './app-theme';
import { AppColor } from './types/app-color.type';

export const getAppColorFor = (color: AppColor) => theme.appColors[color];
