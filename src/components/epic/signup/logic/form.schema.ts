import * as yup from 'yup';

import { rolesTypes } from '@api/useRolesQuery';

import { FormModel } from '../types/form-model.type';

export const schema: yup.SchemaOf<FormModel> = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  password: yup.string().required(),
  role: yup.string().oneOf(rolesTypes).required(),
  skills: yup.array(yup.number().required()),
});
