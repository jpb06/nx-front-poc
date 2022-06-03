import { getJestOptions } from '../../jest/front/jest-options';

const options = getJestOptions('front', 'apps/front', ['!src/pages/**/*.tsx']);

export default options;
