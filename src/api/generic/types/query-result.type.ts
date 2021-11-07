import { QueryObserverResult } from 'react-query';

import { UnWrapResult } from './unwrap-result.type';

export type QueryResult<TSuccess, TError> = QueryObserverResult<
  UnWrapResult<TSuccess>,
  TError
>;
