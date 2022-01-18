import { langEn } from '../lang/lang.en';

export const translationsKeys = Object.keys(langEn);
export type TranslationsKey = keyof typeof langEn;
