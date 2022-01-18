import { langEn } from './lang/lang.en';
import { translationsKeys } from './types/translations-keys.type';

export const t = (key?: string): string => {
  if (!key) {
    return '';
  }

  if (!translationsKeys.includes(key)) {
    throw new Error(`No translation for key '${key}'`);
  }

  return langEn[key];
};
