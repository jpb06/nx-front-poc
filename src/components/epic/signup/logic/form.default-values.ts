import { FormModel } from '../types/form-model.type';

export const formDefaultValues: FormModel = {
  lastName: '',
  firstName: '',
  password: '',
  idRole: '' as unknown as number,
  idSkills: [],
};
