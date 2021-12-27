require('@testing-library/jest-dom/extend-expect');
import { matchers } from '@emotion/jest';
import { server } from '../msw/server';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

expect.extend(matchers);
