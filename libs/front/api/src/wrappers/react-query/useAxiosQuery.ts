import { AxiosRequestConfig, Method } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

import { axiosRequest } from '../axios/axios-request';
import { UnWrapResult } from '../axios/types/unwrap-result.type';
import { QueryResult } from './types/query-result.type';

type AxiosQueryProps<TSuccess, TError> = {
  key: string | Array<unknown>;
  url: string;
  method: Method;
  data?: unknown;
  options?: UseQueryOptions<
    UnWrapResult<TSuccess> | undefined,
    TError,
    UnWrapResult<TSuccess>
  >;
  config?: AxiosRequestConfig;
};

export const useAxiosQuery = <TSuccess, TError>({
  key,
  url,
  method,
  data = undefined,
  options = {},
  config = {},
}: AxiosQueryProps<TSuccess, TError>): QueryResult<TSuccess, TError> =>
  useQuery<UnWrapResult<TSuccess> | undefined, TError, UnWrapResult<TSuccess>>(
    key,
    () => axiosRequest<TSuccess>({ method, url, data, config }),
    options
  );
