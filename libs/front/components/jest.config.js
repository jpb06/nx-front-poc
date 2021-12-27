const { pathsToModuleNameMapper } = require('ts-jest');

const {
  compilerOptions: { paths: tsconfigPaths },
} = require('./tsconfig');

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  displayName: 'front',
  preset: '../../../jest.preset.js',
  moduleNameMapper: {
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': 'identity-obj-proxy',
    ...pathsToModuleNameMapper(tsconfigPaths, { prefix: '<rootDir>' }),
  },
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/next/babel'] }],
  },
  transformIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/front/components',
  globalSetup: '../tests/src/jest-config/jest.setup-env.ts',
  setupFilesAfterEnv: ['../tests/src/jest-config/jest.setup.ts'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  snapshotSerializers: ['@emotion/jest/serializer'],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/index.ts',
    '!jest/**',
    '!tests-related/**',
    '!**/*.type.ts',
  ],
  coverageReporters: ['json-summary', 'text', 'lcov'],
};
