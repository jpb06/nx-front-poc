import {
  path,
  RequestBody,
  SignupError,
  SignupSuccess,
} from '@front/api/users/signup';

import { AxiosMutationOptions } from '../generic/types/axios-mutation-options.type';
import { useAxiosMutation } from '../generic/useAxiosMutation';

export const useSignupMutation = (
  options?: AxiosMutationOptions<SignupSuccess, SignupError, RequestBody>
) =>
  useAxiosMutation<SignupSuccess, SignupError, RequestBody>(
    path,
    'POST',
    options
  );
