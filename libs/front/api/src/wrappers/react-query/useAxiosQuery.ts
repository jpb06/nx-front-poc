import { Method } from 'axios';
import { useQuery } from 'react-query';

import { axiosRequest } from '../axios/axios-request';
import { UnWrapResult } from '../axios/types/unwrap-result.type';
import { QueryResult } from './types/query-result.type';

export const useAxiosQuery = <TSuccess, TError>(
  key: string | Array<unknown>,
  url: string,
  method: Method,
  data: unknown = undefined,
  options = {}
): QueryResult<TSuccess, TError> =>
  useQuery<UnWrapResult<TSuccess> | undefined, TError, UnWrapResult<TSuccess>>(
    key,
    () => axiosRequest<TSuccess>({ method, url, data }),
    options
  );
