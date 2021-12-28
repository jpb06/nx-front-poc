import { mockedRoles } from './mocked-data/mocked-roles';
import { mockedSignedUser } from './mocked-data/mocked-signed-user';
import { mockedSkills } from './mocked-data/mocked-skills';
//
import { mockNextRouter } from './mocks/mock.next.router';
//
import { genericGet } from './msw/handlers/generic-get.interceptor';
import { rolesQuery } from './msw/handlers/roles-query.interceptor';
import { signupMutation } from './msw/handlers/signup-mutation.interceptor';
import { skillsQuery } from './msw/handlers/skills-query.interceptor';
import { userDataQuery } from './msw/handlers/user-data-query.interceptor';
import { server } from './msw/server';

export const mockedData = {
  mockedRoles,
  mockedSignedUser,
  mockedSkills,
};

export const mocks = {
  mockNextRouter,
};

export const msw = {
  genericGet,
  rolesQuery,
  signupMutation,
  skillsQuery,
  userDataQuery,
  server,
};
