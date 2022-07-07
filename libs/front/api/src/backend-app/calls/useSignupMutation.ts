import { AxiosMutationOptions } from '../../wrappers/react-query/types/axios-mutation-options.type';
import { useAxiosMutation } from '../../wrappers/react-query/useAxiosMutation';
import {
  path,
  RequestBody,
  SignupError,
  SignupSuccess,
} from './../specs/UsersController/signup';

export const useSignupMutation = (
  options?: AxiosMutationOptions<SignupSuccess, SignupError, RequestBody>
) =>
  useAxiosMutation<SignupSuccess, SignupError, RequestBody>(
    'backend-app',
    path,
    'POST',
    options
  );
