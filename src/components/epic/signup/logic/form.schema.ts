import * as yup from 'yup';

import { FormModel } from '../types/form-model.type';

export const schema: yup.SchemaOf<FormModel> = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  password: yup.string().required(),
  idRole: yup
    .number()
    .transform((val) => (isNaN(val) ? undefined : val))
    .required(),
  idSkills: yup
    .array(yup.number().required())
    .min(2, 'You need to select at least two skills'),
});
