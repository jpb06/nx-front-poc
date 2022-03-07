import axios, { AxiosRequestConfig, Method } from 'axios';

import { delay } from '@logic';

import { UnWrapResult } from './types/unwrap-result.type';

type AxiosRequestProps = {
  url: string;
  method: Method;
  data?: unknown;
  config?: AxiosRequestConfig;
};

type WithResult<T> = { result?: T };

export const axiosRequest = async <TResult>({
  url,
  method,
  data = {},
  config = {},
}: AxiosRequestProps): Promise<UnWrapResult<TResult> | undefined> => {
  try {
    const [response] = await Promise.all([
      axios.request<WithResult<UnWrapResult<TResult>>>({
        method,
        url,
        data,
        ...config,
      }),
      delay(500), // ensuring every operation takes al least half a sec
    ]);

    if (response.data.result === undefined) {
      throw new Error(`${method} ${url} returned no result`);
    }

    return response.data.result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw error;
    }
  }
};
