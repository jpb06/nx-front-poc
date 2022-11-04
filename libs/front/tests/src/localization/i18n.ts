import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    ns: ['common', 'cool'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    appendNamespaceToMissingKey: true,
    missingKeyNoValueFallbackToKey: true,
    resources: { en: {} },

    react: {
      useSuspense: false,
    },
  });

export { i18n };
