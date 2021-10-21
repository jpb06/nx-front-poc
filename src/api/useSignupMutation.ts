import { useMutation, UseMutationOptions } from 'react-query';

import { FormModel } from '@components/epic/signup/types/form-model.type';
import { delay } from '@logic/delay';

export const useSignupMutation = (
  options?: Omit<
    UseMutationOptions<FormModel, Error, FormModel & { error?: boolean }>,
    'mutationFn'
  >
) => {
  return useMutation(
    ({ error, ...data }) =>
      delay(2000).then(() => {
        if (error) throw new Error('test signup error');
        return data;
      }),
    options
  );
};
