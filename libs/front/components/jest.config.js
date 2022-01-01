const getJestOptions = require('../../../jest/front/jest-options');

module.exports = getJestOptions('libs/front/components', ['!src/**/*.styles.ts', '!src/test/**/*', '!src/providers/**/*']);