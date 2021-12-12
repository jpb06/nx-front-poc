import { DefaultRequestBody, rest } from 'msw';

import { server } from '../server';

export const userDataQuery = (status: number, result: DefaultRequestBody) =>
  server.use(
    rest.get('*/user-data-path', (_, res, ctx) =>
      res(ctx.status(status), ctx.json({ result }))
    )
  );
