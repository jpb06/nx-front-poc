import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import * as zod from 'zod';

import { useAreSkillsAvailableForRoleMutation } from '@front/api';

import { FormModel } from './useSignupFormSchema';

type SkillsAvailabilityForRoleRefinementPredicate = Pick<
  FormModel,
  'idRole' | 'idSkills'
>;
type SkillsCountRefinementPredicate = Pick<FormModel, 'idSkills'>;

export const useSignupFormRefinements = () => {
  const { t } = useTranslation('forms');
  const { mutateAsync } = useAreSkillsAvailableForRoleMutation({
    mutationKey: ['AreSkillsAvailableForRoleMutation'],
  });
  const queryClient = useQueryClient();

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
        message: t('atMostThreeSkills'),
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
