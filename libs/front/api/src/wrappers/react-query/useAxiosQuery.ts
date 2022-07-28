import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosRequestConfig, Method } from 'axios';

import { axiosRequest } from '../axios/axios-request';
import { UnWrapResult } from '../axios/types/unwrap-result.type';
import { getUrl } from './get-url';
import { Backend } from './types/backend.type';
import { QueryResult } from './types/query-result.type';

type AxiosQueryProps<TSuccess, TError> = {
  key: Array<unknown>;
  backend: Backend;
  path: string;
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
  backend,
  path,
  method,
  data = undefined,
  options = {},
  config = {},
}: AxiosQueryProps<TSuccess, TError>): QueryResult<TSuccess, TError> => {
  const url = getUrl(backend, path);

  return useQuery<
    UnWrapResult<TSuccess> | undefined,
    TError,
    UnWrapResult<TSuccess>
  >(
    key,
    () =>
      axiosRequest<TSuccess>({
        method,
        url,
        data,
        config,
      }),
    options
  );
};
