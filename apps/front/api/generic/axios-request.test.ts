import { msw } from '@tests/msw';
import { genericGetUrl } from '@tests/msw/handlers/generic-get.interceptor';

import { axiosRequest } from './axios-request';

describe('axiosRequest function', () => {
  const data = 'cool';
  const method = 'GET';

  it('should throw on axios errors', async () => {
    msw.genericGet(500, data);

    await expect(
      axiosRequest({
        url: genericGetUrl,
        method,
      })
    ).rejects.toStrictEqual(data);
  });

  it('should throw an error if there is no result', async () => {
    msw.genericGet(200, {});

    await expect(
      axiosRequest({
        url: genericGetUrl,
        method,
      })
    ).rejects.toThrow(`${method} ${genericGetUrl} returned no result`);
  });

  it('should return result', async () => {
    const method = 'GET';
    msw.genericGet(200, {
      result: data,
    });

    const result = await axiosRequest({
      url: genericGetUrl,
      method,
    });

    expect(result).toStrictEqual(data);
  });
});
