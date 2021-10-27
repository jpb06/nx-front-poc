require('@testing-library/jest-dom/extend-expect');
const { matchers } = require('@emotion/jest');

const { server } = require('../src/tests-related/msw/server');

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

expect.extend(matchers);
