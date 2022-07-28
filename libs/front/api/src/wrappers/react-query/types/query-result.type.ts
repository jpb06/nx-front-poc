import { QueryObserverResult } from '@tanstack/react-query';

import { UnWrapResult } from '../../axios/types/unwrap-result.type';

export type QueryResult<TSuccess, TError> = QueryObserverResult<
  UnWrapResult<TSuccess>,
  TError
>;
