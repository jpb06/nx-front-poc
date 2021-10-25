import { useMutation, UseMutationOptions } from 'react-query';

import { FormModel } from '@components/epic/signup/types/form-model.type';

import { signup } from './fakeApi/signup';

export const useSignupMutation = (
  options?: Omit<UseMutationOptions<FormModel, Error, FormModel>, 'mutationFn'>
) => {
  return useMutation(signup, options);
};
