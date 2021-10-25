import '@testing-library/jest-dom/extend-expect';

import { server } from '../src/mocks/server';

const { matchers } = require('@emotion/jest');

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

expect.extend(matchers);
