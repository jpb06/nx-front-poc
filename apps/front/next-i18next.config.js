const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
  },
  defaultNS: 'common',
  localePath: path.resolve(`apps/front/public/locales`),
};
