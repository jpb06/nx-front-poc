const { transformTsPaths } = require('ts-paths-transform');
import type { Config } from '@jest/types';

const { compilerOptions } = require('./../../../tsconfig.json');

export const getJestOptions = (
  displayName: string,
  coverageDirectory: string,
  collectCoverageFrom: Array<string>
) => {
  const pathLevel = Array(coverageDirectory.split('/').length)
    .fill('..')
    .join('/');

  const options: Config.InitialOptions = {
    resolver: `${pathLevel}/libs/front/jest/resolver.js`,
    logHeapUsage: true,
    testEnvironment: 'jest-environment-jsdom',
    displayName,
    preset: `${pathLevel}/jest.preset.js`,
    moduleNameMapper: {
      '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': 'identity-obj-proxy',
      ...transformTsPaths(compilerOptions.paths, {
        prefix: '<RootDir>/../../',
        //  debug: true,
      }),
    },
    transform: {
      '^.+\\.[tj]sx?$': [
        '@swc/jest',
        {
          jsc: {
            parser: {
              syntax: 'typescript',
            },
            target: 'es2021',
            transform: {
              react: {
                runtime: 'automatic',
              },
            },
          },
        },
      ],
    },
    transformIgnorePatterns: ['/node_modules/'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    coverageDirectory: `${pathLevel}/coverage/${coverageDirectory}`,
    globalSetup: `${pathLevel}/libs/front/jest/jest.setup-env.js`,
    setupFilesAfterEnv: [`${pathLevel}/libs/front/jest/jest.setup.js`],
    watchPlugins: [
      'jest-watch-typeahead/filename',
      'jest-watch-typeahead/testname',
    ],
    snapshotSerializers: ['@emotion/jest/serializer'],
    collectCoverageFrom: [
      '**/*.{ts,tsx}',
      '!jest.config.ts',
      '!**/*.d.ts',
      '!**/index.ts',
      '!**/*.type.ts',
      '!**/*.stories.tsx',
      ...collectCoverageFrom,
    ],
    coverageReporters: ['json-summary', 'text', 'lcov'],
  };

  return options;
};
