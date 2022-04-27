const getJestOptions = require('../../jest/front/jest-options');

const options = getJestOptions('apps/front', ['!src/pages/**/*.tsx']);
export default options;
