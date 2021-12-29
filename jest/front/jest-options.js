const { pathsToModuleNameMapper } = require('ts-jest');

const {
  compilerOptions: { paths: tsconfigPaths },
} = require('../../tsconfig.base');

const getJestOptions = (coverageDirectory) => {
  const pathLevel = Array(coverageDirectory.split('/').length)
    .fill('..')
    .join('/');

  /**
   * @type {import('ts-jest/dist/types').InitialOptionsTsJest}
   **/
  const options = {
    displayName: 'front',
    preset: `${pathLevel}/jest/jest.preset.js`,
    moduleNameMapper: {
      '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': 'identity-obj-proxy',
      ...pathsToModuleNameMapper(tsconfigPaths, { prefix: '.' }),
    },
    transform: {
      '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
      '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/next/babel'] }],
    },
    transformIgnorePatterns: ['/node_modules/'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    coverageDirectory: `${pathLevel}/coverage/${coverageDirectory}`,
    globalSetup: `${pathLevel}/jest/front/jest.setup-env.js`,
    setupFilesAfterEnv: [`${pathLevel}/jest/front/jest.setup.js`],
    watchPlugins: [
      'jest-watch-typeahead/filename',
      'jest-watch-typeahead/testname',
    ],
    snapshotSerializers: ['@emotion/jest/serializer'],
    collectCoverageFrom: [
      '**/*.{ts,tsx}',
      '!**/*.d.ts',
      '!**/index.ts',
      '!**/*.type.ts',
    ],
    coverageReporters: ['json-summary', 'text', 'lcov'],
  };

  return options;
};

module.exports = getJestOptions;
