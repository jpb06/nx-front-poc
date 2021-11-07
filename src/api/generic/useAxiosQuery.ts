import { Method } from 'axios';
import { useQuery } from 'react-query';

import { axiosRequest } from './axios-request';
import { QueryResult } from './types/query-result.type';
import { UnWrapResult } from './types/unwrap-result.type';

export const useAxiosQuery = <TSuccess, TError>(
  key: string | Array<unknown>,
  url: string,
  method: Method,
  data = undefined,
  options = {}
): QueryResult<TSuccess, TError> =>
  useQuery<UnWrapResult<TSuccess> | undefined, TError, UnWrapResult<TSuccess>>(
    key,
    () => axiosRequest<TSuccess>({ method, url, data }),
    options
  );
