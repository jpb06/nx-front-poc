import 'react-i18next';

import common from './assets/locales/en/common.json';
import forms from './assets/locales/en/forms.json';
import signupPage from './assets/locales/en/signupPage.json';
import userInfosPage from './assets/locales/en/userInfosPage.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof common;
      forms: typeof forms;
      userInfosPage: typeof userInfosPage;
      signupPage: typeof signupPage;
    };
  }
}
