import {
  path,
  AreSkillsAvailableForRoleError,
  AreSkillsAvailableForRoleSuccess,
  RequestBody,
} from '@api/skills/areSkillsAvailableForRole';

import { AxiosMutationOptions } from '../generic/types/axios-mutation-options.type';
import { useAxiosMutation } from '../generic/useAxiosMutation';

export const useAreSkillsAvailableForRoleMutation = (
  options?: AxiosMutationOptions<
    AreSkillsAvailableForRoleSuccess,
    AreSkillsAvailableForRoleError,
    RequestBody
  >
) =>
  useAxiosMutation<
    AreSkillsAvailableForRoleSuccess,
    AreSkillsAvailableForRoleError,
    RequestBody
  >(path, 'POST', options);
