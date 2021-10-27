import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

type AxiosRequestProps = {
  url: string;
  method: Method;
  data?: unknown;
  config?: AxiosRequestConfig;
};

export const axiosRequest = async <TResult>({
  url,
  method,
  data = {},
  config = {},
}: AxiosRequestProps): Promise<TResult | undefined> => {
  const result: AxiosResponse<TResult> = await axios.request({
    method,
    url,
    data,
    ...config,
  });

  if (!result.data) {
    throw new Error(`${method} ${url} returned no result`);
  }

  return result.data;
};
