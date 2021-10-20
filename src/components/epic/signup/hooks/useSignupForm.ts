import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useSignupMutation } from '@api/useSignupMutation';

import { formDefaultValues } from '../logic/form.default-values';
import { schema } from '../logic/form.schema';
import { FormModel } from '../types/form-model.type';

export const useSignupForm = () => {
  const { status, mutate } = useSignupMutation();

  const { control, handleSubmit } = useForm<FormModel>({
    defaultValues: formDefaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormModel> = (data) => {
    // eslint-disable-next-line no-console
    console.info(data);
    mutate();
  };

  return {
    control,
    onSubmit: handleSubmit(onSubmit),
    status,
  };
};
