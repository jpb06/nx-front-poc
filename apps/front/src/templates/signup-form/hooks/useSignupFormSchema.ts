import { useTranslation } from 'next-i18next';
import * as zod from 'zod';

import { useSignupFormRefinements } from './useSignupFormRefinements';

export type FormModel = {
  userName?: string;
  firstName: string;
  lastName: string;
  password: string;
  idRole: number;
  idSkills: number[];
};

export const useSignupFormSchema = () => {
  const { t } = useTranslation('forms');
  const { skillsAvailabilityForRole, skillsCount } = useSignupFormRefinements();

  const roleRequired = t('roleRequired');

  const schema: zod.ZodSchema<FormModel> = zod
    .object({
      userName: zod.string().optional(),
      firstName: zod.string().min(1, t('firstNameRequired')),
      lastName: zod.string().min(1, t('lastNameRequired')),
      password: zod.string().min(1, t('passwordRequired')),
      idRole: zod
        .number({
          required_error: roleRequired,
        })
        .gte(0, roleRequired),
      idSkills: zod
        .preprocess((v) => parseInt(zod.string().parse(v), 10), zod.number())
        .array(),
    })
    .superRefine(skillsAvailabilityForRole)
    .superRefine(skillsCount);

  return schema;
};
