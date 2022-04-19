import { PropsWithChildren } from 'react';
import {
  DefaultValues,
  FormProvider as RHFProvider,
  useForm,
} from 'react-hook-form';

import { TestWrapper } from './types/test-wrapper.type';

/**
 * Use this wrapper only for unit test of components related to react-hook-form.
 */

export function FormProvider<TForm>(
  defaultValues: DefaultValues<TForm>
): TestWrapper {
  const Wrapper = ({ children }: PropsWithChildren<unknown>) => {
    const useFormMethods = useForm({ mode: 'all', defaultValues });

    return <RHFProvider {...useFormMethods}>{children}</RHFProvider>;
  };

  return Wrapper;
}
