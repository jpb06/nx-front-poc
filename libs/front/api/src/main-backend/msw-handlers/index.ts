import { areSkillsAvailableForRoleMutation } from './useAreSkillsAvailableForRoleMutation.handler';
import { rolesQuery } from './useRolesQuery.handler';
import { signupMutation } from './useSignupMutation.handler';
import { skillsQuery } from './useSkillsQuery.handler';
import { userDataQuery } from './useUserDataQuery.handler';

export const msw = {
  areSkillsAvailableForRoleMutation,
  rolesQuery,
  signupMutation,
  skillsQuery,
  userDataQuery,
};
