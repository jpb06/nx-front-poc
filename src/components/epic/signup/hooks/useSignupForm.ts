import { yupResolver } from '@hookform/resolvers/yup';
import {
  DeepPartial,
  SubmitHandler,
  UnpackNestedValue,
  useForm,
} from 'react-hook-form';
import * as yup from 'yup';

import { FormModel } from '../children/SignupForm';

type SignupFormProps<T> = {
  schema: yup.SchemaOf<FormModel>;
  defaultValues: UnpackNestedValue<DeepPartial<T>>;
};

export const useSignupForm = <T>(props: SignupFormProps<T>) => {
  const { control, handleSubmit } = useForm<T>({
    defaultValues: props.defaultValues,
    resolver: yupResolver(props.schema),
  });

  const onSubmit: SubmitHandler<T> = (data) => {
    console.log(data);
  };

  return {
    control,
    onSubmit: handleSubmit(onSubmit),
  };
};
