import { roles } from './mocked-data/mocked-roles';
import { signedUser } from './mocked-data/mocked-signed-user';
import { skills } from './mocked-data/mocked-skills';
//
import { nextRouter } from './mocks/mock.next.router';
//
import { msw } from './msw/index';
import { server } from './msw/server';

export const mockedData = {
  roles,
  signedUser,
  skills,
};

export const mocks = {
  nextRouter,
};

export { msw, server };
