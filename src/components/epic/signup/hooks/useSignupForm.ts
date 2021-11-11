import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { BaseSyntheticEvent } from 'react';
import { Control, useForm } from 'react-hook-form';

import { SignupError } from '@api/swagger-types/UsersController/signup';
import { useSignupMutation } from '@api/useSignupMutation';

import { formDefaultValues } from '../logic/form.default-values';
import { schema } from '../logic/form.schema';
import { FormModel } from '../types/form-model.type';

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
    resolver: yupResolver(schema),
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
