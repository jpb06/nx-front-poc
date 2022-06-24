import { getJestOptions } from '../jest/jest-options';

const options = getJestOptions(
  'front-components-lib',
  'libs/front/components',
  ['!src/**/*.styles.ts', '!src/test/**/*', '!src/providers/**/*']
);

export default options;
