const { pathsToModuleNameMapper } = require('ts-jest/utils');

const {
  compilerOptions: { paths: tsconfigPaths },
} = require('./tsconfig');

/** @type {import('@jest/types').Config.InitialOptions} */

module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>'],
  globalSetup: '<rootDir>/jest/jest.setup.env.ts',
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/jest/modules-mappers/file.stub.ts',
    ...pathsToModuleNameMapper(tsconfigPaths, { prefix: '<rootDir>/src' }),
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/jest/jest.setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
  transform: {
    '^.+\\.(ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!src/tests-related/**',
    '!src/types/**',
    '!src/pages/**/*.tsx',
    '!src/components/**/*.styles.ts',
    '!src/api/**',
  ],
};
