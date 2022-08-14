import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  ns: ['common'],
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
  appendNamespaceToMissingKey: true,
  missingKeyNoValueFallbackToKey: true,
  resources: { en: {} },
});

export { i18n };
