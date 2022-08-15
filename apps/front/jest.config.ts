/* eslint-disable */
import { getJestOptions } from '../../libs/front/jest/jest-options';

const options = getJestOptions('front', 'apps/front', ['!src/pages/**/*.tsx']);

export default options;
