const getJestOptions = require('../../jest/front/jest-options');

module.exports = getJestOptions('apps/front', ['!src/pages/**/*.tsx']);