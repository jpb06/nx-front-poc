require('@testing-library/jest-dom/extend-expect');
const { matchers } = require('@emotion/jest');

jest.mock('next/dist/client/router', () => require('next-router-mock'));

const {
  mswServer,
} = require('./../../../libs/front/components/src/test/msw/mswServer');

beforeAll(() => {
  mswServer.listen({ onUnhandledRequest: 'error' });
});
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

expect.extend(matchers);
