import { Method } from 'axios';
import { useMutation } from 'react-query';

import { axiosRequest } from '../axios/axios-request';
import { UnWrapResult } from '../axios/types/unwrap-result.type';
import { AxiosMutationOptions } from './types/axios-mutation-options.type';
import { MutationResult } from './types/mutation-result.type';

export const useAxiosMutation = <TData, TError, TVariables>(
  url: string,
  method: Method,
  options?: AxiosMutationOptions<TData, TError, TVariables>
): MutationResult<TData, TError, TVariables> =>
  useMutation<UnWrapResult<TData> | undefined, TError, TVariables>(
    (data: TVariables) => axiosRequest<TData>({ method, url, data }),
    options
  );
