import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';

import { useFetchData } from './../../useFetchData';
import { SignupMutationArgs, GqlAuthOutput } from '../types/api-types';

export type SignupResult = {
  signup: GqlAuthOutput;
};

export const useSignupMutation = (
  options?: UseMutationOptions<SignupResult, unknown, SignupMutationArgs>
): UseMutationResult<SignupResult, unknown, SignupMutationArgs> => {
  const mutation = `mutation Signup($email: String!, $lastName: String!, $firstName: String!, $password: String!) {
    signup(email: $email, lastName: $lastName, firstName: $firstName, password: $password) {
      id
email
lastName
firstName
joinDate
role
token
    }
  }`;

  return useMutation<SignupResult, unknown, SignupMutationArgs>({
    mutationFn: useFetchData(mutation),
    ...options,
  });
};
