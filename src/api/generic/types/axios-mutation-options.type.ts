import { UseMutationOptions } from 'react-query';

import { UnWrapResult } from './unwrap-result.type';

export type AxiosMutationOptions<TData, TError, TVariables> = Omit<
  UseMutationOptions<UnWrapResult<TData> | undefined, TError, TVariables>,
  'mutationFn'
>;
