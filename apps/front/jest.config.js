const { pathsToModuleNameMapper } = require('ts-jest');

const {
  compilerOptions: { paths: tsconfigPaths },
} = require('./tsconfig');

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  displayName: 'front',
  preset: '../../jest.preset.js',
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
  coverageDirectory: '../../coverage/apps/front',
  globalSetup: '<rootDir>/jest/jest.setup.env.js',
  setupFilesAfterEnv: ['<rootDir>/jest/jest.setup.js'],
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
    '!pages/**/*.tsx',
    '!**/*.type.ts',
    '!api/swagger-types/**'
  ],
  coverageReporters: ['json-summary', 'text', 'lcov'],
};
