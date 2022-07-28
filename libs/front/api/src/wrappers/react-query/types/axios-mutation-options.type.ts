import { UseMutationOptions } from '@tanstack/react-query';

import { UnWrapResult } from '../../axios/types/unwrap-result.type';

export type AxiosMutationOptions<TData, TError, TVariables> = Omit<
  UseMutationOptions<UnWrapResult<TData> | undefined, TError, TVariables>,
  'mutationFn'
>;
