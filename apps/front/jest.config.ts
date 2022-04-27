import getJestOptions from '../../jest/front/jest-options';

module.exports = getJestOptions('apps/front', ['!src/pages/**/*.tsx']);
