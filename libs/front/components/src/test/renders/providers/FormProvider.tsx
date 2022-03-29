import {
  DefaultValues,
  FormProvider as RHFProvider,
  useForm,
} from 'react-hook-form';

import { WrapperResult } from './types/wrapper-result.type';

/**
 * Use this wrapper only for unit test of components related to react-hook-form.
 */

export function FormProvider<TForm>(
  defaultValues: DefaultValues<TForm>
): WrapperResult {
  const Wrapper: React.FC = ({ children }) => {
    const useFormMethods = useForm({ mode: 'all', defaultValues });

    return <RHFProvider {...useFormMethods}>{children}</RHFProvider>;
  };

  return { wrapper: Wrapper };
}
