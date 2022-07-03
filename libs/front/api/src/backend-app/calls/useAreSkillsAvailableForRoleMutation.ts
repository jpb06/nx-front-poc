import { AxiosMutationOptions } from '../../wrappers/react-query/types/axios-mutation-options.type';
import { useAxiosMutation } from '../../wrappers/react-query/useAxiosMutation';
import {
  path,
  AreSkillsAvailableForRoleError,
  AreSkillsAvailableForRoleSuccess,
  RequestBody,
} from './../specs/SkillsController/areSkillsAvailableForRole';

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
