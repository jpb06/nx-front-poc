import { useQueryClient } from 'react-query';
import * as zod from 'zod';

import { TranslationsKey } from '@translations';

import { useAreSkillsAvailableForRoleMutation } from '../../../api/main-backend/useAreSkillsAvailableForRoleMutation';
import { FormModel } from './useSignupFormSchema';

type SkillsAvailabilityForRoleRefinementPredicate = Pick<
  FormModel,
  'idRole' | 'idSkills'
>;
type SkillsCountRefinementPredicate = Pick<FormModel, 'idSkills'>;

export const useSignupFormRefinements = () => {
  const { mutateAsync } = useAreSkillsAvailableForRoleMutation({
    mutationKey: 'AreSkillsAvailableForRoleMutation',
  });
  const queryClient = useQueryClient();

  const atMostThreeSkills: TranslationsKey = 'atMostThreeSkills';

  const skillsAvailabilityForRole = async (
    { idRole, idSkills }: SkillsAvailabilityForRoleRefinementPredicate,
    ctx: zod.RefinementCtx
  ) => {
    let invalidSkillsIds: Array<number> | undefined = queryClient.getQueryData([
      'skillsAvailableForRole',
      idRole,
      idSkills,
    ]);

    if (!invalidSkillsIds) {
      invalidSkillsIds = await mutateAsync(
        {
          idRole,
          idSkills,
        },
        {
          onSuccess: (result) => {
            queryClient.setQueryData(
              ['skillsAvailableForRole', idRole, idSkills],
              () => result
            );
          },
        }
      );
    }

    if (invalidSkillsIds && invalidSkillsIds.length > 0) {
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        message: invalidSkillsIds.join(','),
        path: ['idSkills'],
        fatal: true,
      });
    }
  };

  const skillsCount = (
    { idSkills }: SkillsCountRefinementPredicate,
    ctx: zod.RefinementCtx
  ) => {
    if (idSkills.length > 3) {
      ctx.addIssue({
        code: zod.ZodIssueCode.too_big,
        message: atMostThreeSkills,
        path: ['idSkills'],
        fatal: true,
        maximum: 3,
        type: 'array',
        inclusive: true,
      });
    }
  };

  return {
    skillsAvailabilityForRole,
    skillsCount,
  };
};
