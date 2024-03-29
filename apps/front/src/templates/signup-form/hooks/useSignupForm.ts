import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { BaseSyntheticEvent } from 'react';
import { Control, useForm } from 'react-hook-form';
import useLocalStorageState from 'use-local-storage-state';

import { useSignupMutation } from '@front/api';
import { SignupError } from '@front/api/types/signup';

import { useCustomErrorMap } from './useCustomErrorMap';
import { useSignupFormSchema, FormModel } from './useSignupFormSchema';

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
  const schema = useSignupFormSchema();
  const customErrorMap = useCustomErrorMap();

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

  const [, setToken] = useLocalStorageState('token');

  const {
    isLoading,
    isError,
    error,
    mutate: signup,
  } = useSignupMutation({
    onSuccess: async (data) => {
      if (data) {
        setToken(data.token);
        queryClient.setQueryData(['user-data'], (_: unknown) => data);
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
