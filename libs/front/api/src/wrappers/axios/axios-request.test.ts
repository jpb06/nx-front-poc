import { axiosRequest } from './axios-request';
import { genericGetUrl, getHandler } from './get.msw-handler';

describe('axiosRequest function', () => {
  const data = 'cool';
  const method = 'GET';

  it('should throw on axios errors', async () => {
    getHandler(500, data, true);

    await expect(
      axiosRequest({
        url: genericGetUrl,
        method,
      })
    ).rejects.toStrictEqual(data);
  });

  it('should throw an error if there is no result', async () => {
    getHandler(200, {}, true);

    await expect(
      axiosRequest({
        url: genericGetUrl,
        method,
      })
    ).rejects.toThrow(`${method} ${genericGetUrl} returned no result`);
  });

  it('should return result', async () => {
    const method = 'GET';
    getHandler(
      200,
      {
        result: data,
      },
      true
    );

    const result = await axiosRequest({
      url: genericGetUrl,
      method,
    });

    expect(result).toStrictEqual(data);
  });
});
