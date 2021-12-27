import { DefaultRequestBody, rest } from 'msw';

import { server } from '../server';

export const genericGetUrl = 'https://cool.org/get';

export const genericGet = (status: number, result: DefaultRequestBody) =>
  server.use(
    rest.get(genericGetUrl, (_, res, ctx) =>
      res(ctx.status(status), ctx.json(result))
    )
  );
