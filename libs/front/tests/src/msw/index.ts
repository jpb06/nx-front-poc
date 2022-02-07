import { areSkillsAvailableForRoleMutation } from './handlers/are-skills-available-for-role-mutation.interceptor';
import { genericGet, genericGetUrl } from './handlers/generic-get.interceptor';
import { rolesQuery } from './handlers/roles-query.interceptor';
import { signupMutation } from './handlers/signup-mutation.interceptor';
import { skillsQuery } from './handlers/skills-query.interceptor';
import { userDataQuery } from './handlers/user-data-query.interceptor';

export const msw = {
  genericGet,
  genericGetUrl,
  rolesQuery,
  signupMutation,
  skillsQuery,
  userDataQuery,
  areSkillsAvailableForRoleMutation,
};
