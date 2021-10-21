import { yupResolver } from '@hookform/resolvers/yup';
import { BaseSyntheticEvent } from 'react';
import { Control, useForm } from 'react-hook-form';

import { useSignupMutation } from '@api/useSignupMutation';

import { formDefaultValues } from './../logic/form.default-values';
import { schema } from './../logic/form.schema';
import { FormModel } from './../types/form-model.type';

const SIMULATE_ERROR_ON_SIGNUP = false;

type SignupFormHook = {
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  control: Control<FormModel, object>;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
};

export const useSignupForm = (): SignupFormHook => {
  const { control, handleSubmit } = useForm<FormModel>({
    defaultValues: formDefaultValues,
    resolver: yupResolver(schema),
  });

  const {
    isLoading,
    isError,
    error,
    mutate: signup,
  } = useSignupMutation({
    onSuccess: (data) => {
      // eslint-disable-next-line no-console
      console.info(JSON.stringify(data, null, 2));
    },
  });

  const onSubmit = handleSubmit((data) => {
    signup({ error: SIMULATE_ERROR_ON_SIGNUP, ...data });
  });

  return {
    onSubmit,
    control,
    isLoading,
    isError,
    error,
  };
};
