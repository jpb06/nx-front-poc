import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const ns = ['common', 'forms', 'signupPage', 'userInfosPage'];
const supportedLngs = ['en', 'fr'];

const getNamespaces = (webpackContext) =>
  webpackContext
    .keys()
    .map((path) => path.replace('./', '').replace('.json', ''));

const namespaces = getNamespaces(
  require.context(`./../../translations/assets/locales/en`, false, /.json/)
);

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    //debug: true,
    lng: 'en',
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: namespaces,
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    supportedLngs,
  });

supportedLngs.forEach((lang) => {
  let notFoundNamespacesCount = 0;

  ns.forEach((namespace) => {
    try {
      const file = require(`./../../translations/assets/locales/${lang}/${namespace}.json`);
      i18n.addResourceBundle(lang, namespace, file);
    } catch (err) {
      notFoundNamespacesCount++;
    }
  });

  if (notFoundNamespacesCount > 0) {
    console.warn(
      `${notFoundNamespacesCount} namespaces not found for "${lang}"`
    );
  }
});

const i18nInstance = i18n.cloneInstance();

export { i18nInstance as i18n };
