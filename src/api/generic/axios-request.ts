import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

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
    const response: AxiosResponse<WithResult<UnWrapResult<TResult>>> =
      await axios.request({
        method,
        url,
        data,
        ...config,
      });

    if (!response.data.result) {
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
