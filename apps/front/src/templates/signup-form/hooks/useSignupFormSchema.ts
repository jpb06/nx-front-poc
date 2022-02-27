import * as zod from 'zod';

import { TranslationsKey } from '@translations';

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
  // Translations keys
  const firstNameRequired: TranslationsKey = 'firstNameRequired';
  const lastNameRequired: TranslationsKey = 'lastNameRequired';
  const passwordRequired: TranslationsKey = 'passwordRequired';
  const roleRequired: TranslationsKey = 'roleRequired';

  const { skillsAvailabilityForRole, skillsCount } = useSignupFormRefinements();

  const schema: zod.ZodSchema<FormModel> = zod
    .object({
      userName: zod.string().optional(),
      firstName: zod.string().min(1, firstNameRequired),
      lastName: zod.string().min(1, lastNameRequired),
      password: zod.string().min(1, passwordRequired),
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
