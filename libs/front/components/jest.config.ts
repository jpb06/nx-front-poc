import { getJestOptions } from '../../../jest/front/jest-options';

const options = getJestOptions('front-components', 'libs/front/components', [
  '!src/**/*.styles.ts',
  '!src/test/**/*',
  '!src/providers/**/*',
]);

export default options;
