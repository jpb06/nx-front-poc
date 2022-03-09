import { UseMutationResult } from 'react-query';

import { UnWrapResult } from '../../axios/types/unwrap-result.type';

export type MutationResult<TData, TError, TVariables> = UseMutationResult<
  UnWrapResult<TData> | undefined,
  TError,
  TVariables
>;
