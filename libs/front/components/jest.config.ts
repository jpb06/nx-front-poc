const getJestOptions = require('../../../jest/front/jest-options');

const options = getJestOptions('libs/front/components', [
  '!src/**/*.styles.ts',
  '!src/test/**/*',
  '!src/providers/**/*',
]);
export default options;
