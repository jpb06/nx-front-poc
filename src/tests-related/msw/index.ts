import { genericGet } from './handlers/generic-get.interceptor';
import { rolesQuery } from './handlers/roles-query.interceptor';
import { signupMutation } from './handlers/signup-mutation.interceptor';
import { skillsQuery } from './handlers/skills-query.interceptor';

export const msw = {
  genericGet,
  rolesQuery,
  signupMutation,
  skillsQuery,
};
