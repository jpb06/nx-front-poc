import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { BaseSyntheticEvent } from 'react';
import { Control, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';

import { SignupError } from '@api/users/signup';

import { useSignupMutation } from '../../../api';
import { customErrorMap } from '../../../logic/forms/customErrorMap';
import { useFormSchema, FormModel } from './useSignupFormSchema';

type SignupFormHook = {
  onSubmit: (
    e?: BaseSyntheticEvent<object, unknown, unknown> | undefined
  ) => Promise<void>;
  control: Control<FormModel, object>;
  isLoading: boolean;
  isError: boolean;
  error: SignupError | null;
};

export const useSignupForm = (): SignupFormHook => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const schema = useFormSchema();
  const { control, handleSubmit } = useForm<FormModel>({
    defaultValues: {
      lastName: '',
      firstName: '',
      password: '',
      idSkills: [],
    },
    resolver: zodResolver(schema, {
      errorMap: customErrorMap,
    }),
  });

  const {
    isLoading,
    isError,
    error,
    mutate: signup,
  } = useSignupMutation({
    onSuccess: async (data) => {
      if (data) {
        queryClient.setQueryData('user-data', (_) => data);
        await router.push('home');
      }
    },
  });

  const onSubmit = handleSubmit((data) => {
    signup(data);
  });

  return {
    onSubmit,
    control,
    isLoading,
    isError,
    error,
  };
};
