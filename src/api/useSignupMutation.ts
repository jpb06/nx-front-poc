import { AxiosMutationOptions } from './generic/types/axios-mutation-options.type';
import { useAxiosMutation } from './generic/useAxiosMutation';
import {
  path,
  RequestBody,
  SignupError,
  SignupSuccess,
} from './types/dynamic/UsersController/signup';

export const useSignupMutation = (
  options?: AxiosMutationOptions<SignupSuccess, SignupError, RequestBody>
) =>
  useAxiosMutation<SignupSuccess, SignupError, RequestBody>(
    path,
    'POST',
    options
  );
