const { pathsToModuleNameMapper } = require('ts-jest');

const {
  compilerOptions: { paths: tsconfigPaths },
} = require('./tsconfig');

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globalSetup: '<rootDir>/jest/jest.setup.env.js',
  moduleNameMapper: {
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': 'identity-obj-proxy',
    ...pathsToModuleNameMapper(tsconfigPaths, { prefix: '<rootDir>/src' }),
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/', '<rootDir>/cypress/'],
  setupFilesAfterEnv: ['<rootDir>/jest/jest.setup.js'],
  transformIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.(ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  snapshotSerializers: ['@emotion/jest/serializer'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/index.ts',
    '!**/node_modules/**',
    '!src/tests-related/**',
    '!src/pages/**/*.tsx',
    '!src/**/*.type.ts',
    '!src/api/swagger-types/**'
  ],
  coverageReporters: ['json-summary', 'text', 'lcov'],
};
