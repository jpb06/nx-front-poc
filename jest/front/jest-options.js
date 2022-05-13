const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./../../tsconfig.front.json');

const getJestOptions = (coverageDirectory, ignoredFilesForCoverage) => {
  const pathLevel = Array(coverageDirectory.split('/').length)
    .fill('..')
    .join('/');

  /** @type {import('@jest/types').Config.InitialOptions} */
  const options = {
    logHeapUsage: true,
    displayName: 'front',
    preset: `${pathLevel}/jest/jest.preset.js`,
    moduleNameMapper: {
      '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': 'identity-obj-proxy',
      ...pathsToModuleNameMapper(
        compilerOptions.paths /*, { prefix: '<rootDir>/' } */
      ),
    },
    transform: {
      //'^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
      '^.+\\.[tj]sx?$': [
        'babel-jest',
        {
          presets: ['@nrwl/next/babel'],
          plugins: [
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            ['@babel/plugin-proposal-private-methods', { loose: true }],
            [
              '@babel/plugin-proposal-private-property-in-object',
              { loose: true },
            ],
          ],
        },
      ],
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
      '!**/*.stories.tsx',
      ...ignoredFilesForCoverage,
    ],
    coverageReporters: ['json-summary', 'text', 'lcov'],
  };

  return options;
};

module.exports = getJestOptions;
