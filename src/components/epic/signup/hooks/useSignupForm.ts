import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { BaseSyntheticEvent } from 'react';
import { Control, useForm } from 'react-hook-form';

import { SignupError } from '@api/swagger-types/UsersController/signup';
import { useSignupMutation } from '@api/useSignupMutation';

import { formDefaultValues } from '../logic/form.default-values';
import { schema, FormModel } from '../logic/form.schema';

type SignupFormHook = {
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  control: Control<FormModel, object>;
  isLoading: boolean;
  isError: boolean;
  error: SignupError | null;
};

export const useSignupForm = (): SignupFormHook => {
  const { control, handleSubmit } = useForm<FormModel>({
    defaultValues: formDefaultValues,
    resolver: zodResolver(schema),
  });
  const router = useRouter();

  const {
    isLoading,
    isError,
    error,
    mutate: signup,
  } = useSignupMutation({
    onSuccess: (data) => {
      // eslint-disable-next-line no-console
      console.info(JSON.stringify(data, null, 2));
      router.push('home');
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
