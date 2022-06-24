import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const localesPath = './../../translations/assets/locales';

const getNamespaces = (webpackContext) =>
  webpackContext
    .keys()
    .map((path) => path.replace('./', '').replace('.json', ''));

const namespaces = getNamespaces(
  require.context(`${localesPath}/en`, false, /.json/)
);
const supportedLanguages = ['en', 'fr'];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    react: {
      useSuspense: false,
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    defaultNS: 'common',
    ns: namespaces,
    supportedLngs: supportedLanguages,
  });

supportedLanguages.forEach((lang) => {
  let notFoundNamespacesCount = 0;

  namespaces.forEach((namespace) => {
    try {
      const file = require(`${localesPath}/${lang}/${namespace}.json`);
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

export { i18n };
