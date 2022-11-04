require('@testing-library/jest-dom/extend-expect');
const { matchers } = require('@emotion/jest');

jest.mock('next/dist/client/router', () => require('next-router-mock'));
jest.mock('next-i18next', () => require('react-i18next'));

const { mswServer } = require('./../../../libs/front/api/src/msw/mswServer');

beforeAll(() => {
  mswServer.listen({ onUnhandledRequest: 'error' });
});
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

expect.extend(matchers);
